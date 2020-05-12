import csv
import os
import feedparser
import pandas as pd
import tempfile
from socket import timeout
import urllib.parse
import urllib.error as request_err
import urllib.request as request
from bs4 import BeautifulSoup
from http.client import HTTPException

from generator import DataGenerator
from preprocess import process_data, process_dates
from util import CONFIRMED, DEATHS, RECOVERED, clip

class CoronaScraper():
  def __init__(self, logger):
    self.logger = logger
    self.reports = {}
    self.valid_countries = []
    self.base_url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series"

  def download_reports(self):
    """
    Collects timeseries COVD-19 data and returns a dictionary of Pandas DFs for each
    type of reported case.

    Data recovered from John Hopkins CSSE repository.
    """
    reports = {}

    for report_type in [CONFIRMED, DEATHS, RECOVERED]:
      url = f"{self.base_url}/time_series_covid19_{report_type}_global.csv"
      req = request.urlopen(url)

      # check the status code
      if req.status != 200:
        self.logger.error(f"Request failed: {req.info()}")
        return

      # convert data to str if returned a successful response
      req_str = req.read().decode('utf')

      # save to tempfile and process it with pandas; close after done processing
      fd, path = tempfile.mkstemp()
      try:
        with os.fdopen(fd, 'w') as tmp:
          tmp.write(req_str)
          df = pd.read_csv(path, sep=",")
          reports[report_type] = df
          self.valid_countries += df["Country/Region"].tolist()
          self.valid_countries = list(set(self.valid_countries))
      finally:
        os.remove(path)

    self.valid_countries.sort()

    if len(reports) > 0:
      self.reports = reports
    return self

class GoogleNewsScraper:
  def __init__(self, logger):
    self.cache = {}
    self.logger = logger
    self.base_url = 'https://news.google.com/rss/search'
    self.timeout = 2

    # set the countries that can be queried
    self.supported_countries = [
      "Canada",
      "US",
      "Great Britian",
      "Germany",
      "France",
      "Italy",
      "Spain",
      "China",
      "Russia",
      "Serbia"
    ]

  def scrape_all(self):
    """
    Scrape Google News for top news stories about COVID-19 for each supported country.
    """
    for country in self.supported_countries:
      self._scrape(country)

    self.logger.info("Finished scraping all news!")

  def _scrape(self, country):
    self.logger.info(f"Getting news for {country}...")

    url = self._construct_url(country)
    rss = feedparser.parse(url)

    # get the top Google news entries from the RSS feed
    idx, feed = 0, []
    while idx < 50 and idx < len(rss.entries):
      try:
        entry = rss.entries[idx]
        link, published, title = entry.link, entry.published, entry.title

        self.logger.debug(f"Processing {link}...")

        response = request.urlopen(link, timeout=self.timeout).read().decode("utf-8", "ignore")
        soup = BeautifulSoup(response, 'html.parser')

        description = clip(self._get_metatag(soup, name="description"))
        image = self._get_metatag(soup, name="image")

        feed.append({
          "description": description,
          "link": link,
          "image": image,
          "published": published,
          "title": title
        })

      except (request_err.HTTPError, request_err.URLError, HTTPException, timeout) as e:
        self.logger.debug(f"{str(e)} - {link}")
        feed.append({
          "description": None,
          "link": link,
          "image": None,
          "published": published,
          "title": title
        })
        continue

      except AttributeError as e:
        self.logger.error(str(e))
        continue

      finally:
        idx += 1

    self.cache[country] = feed

  def get_news(self, country):
    """
    Get all the news on COVID-19 given a specific country
    """
    return self.cache.get(country, [])

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

if __name__ == "__main__":
  # TESTING ONLY
  scraper = CoronaScraper(None)
  reports = scraper.download_reports().reports
  valid_countries = scraper.valid_countries

  data = process_data(reports, valid_countries)
  dates = process_dates(reports)
  confirmed = data[CONFIRMED]
  deaths = data[DEATHS]

  generator = DataGenerator(dates, data, valid_countries)
  top_movers = generator.top_movers()

  countries, top10 = generator.top_contributors()
