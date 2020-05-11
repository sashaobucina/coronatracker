import csv
from http.client import HTTPException
import os
import feedparser
import pandas as pd
import tempfile
from socket import timeout
import urllib.parse
import urllib.error as request_err
import urllib.request as request
from bs4 import BeautifulSoup

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
    self.supported_countries = {
      "Canada": { "lang": "en-CA", "iso": "CA", "num_stories": 50 },
      "US": { "lang": "en-US", "iso": "US", "num_stories": 25 },
      "Great Britian": { "lang": "en-GB", "iso": "GB", "num_stories": 25 },
      "Germany": { "lang": "de", "iso": "DE", "num_stories": 25 },
      "France": { "lang": "fr", "iso": "FR", "num_stories": 25 },
      "Italy": { "lang": "it", "iso": "IT", "num_stories": 25 },
      "Serbia": { "lang": "rs", "iso": "RS", "num_stories": 25 }
    }


  def scrape(self, country):
    """
    Scrape Google News for a given country
    """
    self.logger.info(f"Getting news for {country}...")

    info = self.supported_countries[country]
    lang, iso, num_stories = info["lang"], info["iso"], info["num_stories"]
    self._scrape(country, lang=lang, iso=iso, num_stories=num_stories)


  def _scrape(self, country, lang, iso, num_stories):
    # parse the RSS feed
    url = self._construct_url(lang=lang, iso=iso)
    rss = feedparser.parse(url)

    # get the top 10 google news entries
    idx, feed = 0, []
    while idx < num_stories and idx < len(rss.entries):
      try:
        entry = rss.entries[idx]
        link, published, title = entry.link, entry.published, entry.title

        self.logger.debug(f"Processing {link}...")

        # get html content of link
        res = request.urlopen(link, timeout=1).read()
        soup = BeautifulSoup(res, 'html.parser', from_encoding="iso-8859-1")

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
        self.logger.warn(f"{str(e)} - {link}")
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
    if not country in self.cache:
      self.scrape(country)
    return self.cache.get(country, [])

  def clear_cache(self):
    """
    Clear cache of news results so that new ones can be processed
    """
    self.cache = {}

  def get_supported_countries(self):
    """
    Return the supported countries that news can be extracted from
    """
    return list(self.supported_countries.keys())


  def _construct_url(self, lang, iso):
    return f"{self.base_url}?q=COVID-19&hl={lang}&gl={iso}&ceid={iso}"


  def _get_metatag(self, soup, name):
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
