import csv
# from collections import defaultdict
import os
import pandas as pd
import tempfile
import urllib.request as request
from selenium import webdriver

from generator import DataGenerator
from visualizer import visualize

class CoronaScraper():
  def __init__(self):
    self.user = "CSSEGISandData"
    self.repo = "COVID-19"
    self.daily_path = "csse_covid_19_data/csse_covid_19_daily_reports"
    self.time_path = "csse_covid_19_data/csse_covid_19_time_series"

    self.daily_git_url = f"https://api.github.com/repos/{self.user}/{self.repo}/contents/{self.daily_path}"
    self.time_git_url = f"https://raw.githubusercontent.com/{self.user}/{self.repo}/master/{self.time_path}"

    self.reports = {}

  def download_reports(self):
    """
    Collects timeseries COVD-19 data and returns a dictionary of Pandas DFs.
    """
    reports = {}

    for report_type in ["Confirmed", "Deaths", "Recovered"]:
      url = f"{self.time_git_url}/time_series_19-covid-{report_type}.csv"
      print(f"Requesting GitHub raw file from {url}...\n")
      req = request.urlopen(url)

      # check the status code
      if req.status != 200:
        print(f"Invalid URL given: {url}")
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
      finally:
        os.remove(path)

    if len(reports) > 0:
      self.reports = reports
    return self

  def get_reports(self):
    return self.reports

  def get_report(self, report_type: str):
    return self.reports.get(report_type, d=None)

def main():
  # scrape the timeseries report for COVID-19
  scraper = CoronaScraper()
  reports = CoronaScraper.download_reports().get_reports()

  # init generator for a country
  gen = DataGenerator(reports, "Canada")

if __name__ == "__main__":
  reports = CoronaScraper().download_reports().get_reports()
  can_gen = DataGenerator(reports, "Canada")

  for case in ["Confirmed", "Deaths", "Recovered"]:
    X, y = can_gen.generate(case)
    visualize(X, y, can_gen.country, case)
