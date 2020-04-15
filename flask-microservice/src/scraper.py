import csv
import os
import pandas as pd
import tempfile
import urllib.request as request

from generator import DataGenerator
from preprocess import process_data, process_dates
from util import CONFIRMED, DEATHS

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

    for report_type in ["confirmed", "deaths"]:
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
        with os.fdopen(fd, 'w')as tmp:
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
