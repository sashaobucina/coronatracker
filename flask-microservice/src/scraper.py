import csv
import os
import re
import feedparser
from datetime import datetime
import pandas as pd
import tempfile
from socket import timeout
import urllib.parse
import urllib.error as request_err
import urllib.request as request
from bs4 import BeautifulSoup
from http.client import HTTPException
from selenium import webdriver
from selenium.common.exceptions import (
    ElementClickInterceptedException,
    ElementNotInteractableException,
)

from generator import DataGenerator
from preprocess import process_data, process_dates
from util import CONFIRMED, DEATHS, RECOVERED, clip, get_utc_time, grep


class WebScraper:
    def __init__(self, logger, base_url, empty_response):
        self.cache = {}
        self.logger = logger
        self.base_url = base_url
        self.empty_response = empty_response

    def scrape(self):
        raise NotImplementedError

    def get_data(self, key):
        return self.cache.get(key, self.empty_response)


class GithubScraper(WebScraper):
    def __init__(self, logger, base_url, empty_response=""):
        super().__init__(logger, base_url, empty_response)
        self.valid_countries = []

    def scrape(self):
        """
        Collects timeseries COVD-19 data and returns a dictionary of Pandas DFs for each
        type of reported case.

        Data recovered from John Hopkins CSSE repository.
        """
        self.logger.info("Loading data if available...")

        reports = {}
        report_types = [CONFIRMED, DEATHS, RECOVERED]

        for report_type in report_types:
            # encapsulate data retrieval in try-catch block to prevent denial of service
            try:
                url = f"{self.base_url}/time_series_covid19_{report_type}_global.csv"
                req = request.urlopen(url)
            except request_err.HTTPError as e:
                self.logger.error(
                    f"Could not scrape data for report type '{report_type}' - {str(e)}"
                )
                continue

            # check the status code
            if req.status != 200:
                self.logger.error(f"Request failed: {req.info()}")
                return

            # convert data to str if returned a successful response
            req_str = req.read().decode("utf")

            # save to tempfile and process it with pandas; close after done processing
            fd, path = tempfile.mkstemp()
            try:
                with os.fdopen(fd, "w") as tmp:
                    tmp.write(req_str)
                    df = pd.read_csv(path, sep=",")
                    reports[report_type] = df
                    self.valid_countries += df["Country/Region"].tolist()
                    self.valid_countries = list(set(self.valid_countries))
            finally:
                os.remove(path)

        self.valid_countries.sort()

        if len(reports) == len(report_types):
            self.logger.info("Loaded data successfully!")
        else:
            diff = list(set(report_types) - set(reports.keys()))
            self.logger.error(f"Missing the following reports: {diff}")

        self.cache = reports

    def load_from_backup(self, directory):
        """
        Collect all the data from a local backup
        """
        self.logger.info(f"Loading data from backup date {directory}...")

        reports = {}
        report_types = [CONFIRMED, DEATHS, RECOVERED]
        relative_path = os.path.join("backups", directory)

        if not os.path.exists(relative_path):
            self.logger.error(f"Path to backup does not exist! - {relative_path}")
            return

        if not os.path.isdir(relative_path):
            self.logger.error(f"Path provided is not a directory! - {relative_path}")
            return

        # walk through backup files
        for report_type in report_types:
            filename = f"time_series_covid19_{report_type}_global.csv"
            full_path = os.path.join(relative_path, filename)

            if not os.path.exists(full_path):
                self.logger.error(
                    f"File '{filename}' for report type '{report_type}' does not exist in backups!"
                )
                continue

            df = pd.read_csv(full_path)
            reports[report_type] = df
            self.valid_countries += df["Country/Region"].tolist()
            self.valid_countries = list(set(self.valid_countries))

        # last post-processing steps
        self.valid_countries.sort()

        if len(reports) == len(report_types):
            self.logger.info("Loaded data successfully!")
        else:
            diff = list(set(report_types) - set(reports.keys()))
            self.logger.error(f"Missing the following reports: {diff}")

        self.cache = reports


class GoogleNewsScraper(WebScraper):
    def __init__(self, logger, base_url, empty_response):
        super().__init__(logger, base_url, empty_response)

        self.timeout = 2
        # set the countries that can be queried
        self.supported_countries = [
            "Canada",
            "US",
            "United Kingdom",
            "Germany",
            "France",
            "Italy",
            "Spain",
            "China",
            "Russia",
            "Serbia",
        ]

    def scrape(self):
        """
        Scrape Google News for top news stories about COVID-19 for each supported country.
        """
        for country in self.supported_countries:
            self._scrape(country)

        self.logger.info("Finished scraping all the news!")

    def _scrape(self, country):
        self.logger.info(f"Scraping news for {country}...")

        url = self._construct_url(country)
        rss = feedparser.parse(url)

        # get the top Google news entries from the RSS feed
        idx, feed = 0, []
        while idx < 100 and idx < len(rss.entries):
            try:
                entry = rss.entries[idx]
                link, published, title = entry.link, entry.published, entry.title

                self.logger.debug(f"Processing {link}...")

                response = (
                    request.urlopen(link, timeout=self.timeout)
                    .read()
                    .decode("utf-8", "ignore")
                )
                soup = BeautifulSoup(response, "html.parser")

                description = clip(self._get_metatag(soup, name="description"))
                image = self._get_metatag(soup, name="image")

                feed.append(
                    {
                        "description": description,
                        "link": link,
                        "image": image,
                        "published": published,
                        "title": title,
                    }
                )

            except (
                request_err.HTTPError,
                request_err.URLError,
                HTTPException,
                timeout,
            ) as e:
                self.logger.debug(f"{str(e)} - {link}")
                feed.append(
                    {
                        "description": None,
                        "link": link,
                        "image": None,
                        "published": published,
                        "title": title,
                    }
                )
                continue

            except AttributeError as e:
                self.logger.error(str(e))
                continue

            finally:
                idx += 1

        self.cache[country] = {"news": feed, "updated": get_utc_time()}

        self.logger.info(
            f"Finished scraping news for {country} - collected {len(feed)} stories!"
        )

    def get_supported_countries(self):
        """
        Return the supported countries that news can be extracted from
        """
        return self.supported_countries

    def _construct_url(self, country):
        """
        Construct URL that contacts the Google News RSS feed
        """
        query = urllib.parse.quote(f"Coronavirus {country}")
        return f"{self.base_url}?q={query}"

    def _get_metatag(self, soup, name):
        """
        Extract meta tag data from given HTML parse tree
        """
        tag = soup.find("meta", property=f"og:{name}")
        return tag["content"].strip() if tag else None


class TravelAlertScraper(WebScraper):
    def scrape(self):
        """
        Scrape IATA for travel alerts through selenium
        """
        self.logger.info("Scraping for new travel alerts...")

        # instantiate webdriver component in headless mode
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--remote-debugging-port=9222")
        chrome_options.add_argument("window-size=1920,1080")
        driver = webdriver.Chrome(chrome_options=chrome_options)
        driver.get(self.base_url)

        css = 'path[class*="svgMap-country"]'
        elements = driver.find_elements_by_css_selector(css)

        for i, element in enumerate(elements):
            try:
                self.logger.debug(f"Processing element {i} out of {len(elements) - 1}")
                element.click()

                title = driver.find_elements_by_class_name("svgMap-tooltip-title")
                content = driver.find_elements_by_class_name("svgMap-tooltip-content")

                if title and content:
                    country = self._rename(title[0].text)

                    # get travel alert description
                    content_list = content[0].text.split("\n")
                    description = "\n".join(content_list[1:])

                    # get last published date
                    updated_str = content_list[0]
                    updated = re.search(r"\d{2}.\d{2}.\d{4}", updated_str)
                    if updated:
                        updated = (
                            datetime.strptime(updated.group(), "%d.%m.%Y")
                            .date()
                            .strftime("%b %d, %Y")
                        )

                    self.cache[country] = {
                        "description": description,
                        "updated": updated,
                        "supported": True,
                    }

            except (
                ElementClickInterceptedException,
                ElementNotInteractableException,
            ) as e:
                self.logger.debug(str(e))
                continue

        self.logger.info(
            f"Finished scraping travel alerts for {len(self.cache)} countries!"
        )
        driver.quit()

    def _rename(self, country):
        """ Rename countries to lower case, and perform some common renamings. """
        if country == "United States":
            country = "US"
        if country == "The Mainland of China":
            country = "China"
        if country == "Korea (Rep.)":
            country = "Korea, South"

        return country.lower()


if __name__ == "__main__":
    # TESTING ONLY
    scraper = GithubScraper(
        None,
        "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series",
    )
    scraper.scrape()
    reports = scraper.cache
    valid_countries = scraper.valid_countries

    data = process_data(reports, valid_countries)
    dates = process_dates(reports)
    confirmed = data[CONFIRMED]
    deaths = data[DEATHS]

    generator = DataGenerator(dates, data, valid_countries)
    top_movers = generator.top_movers()

    countries, top10 = generator.top_contributors()
