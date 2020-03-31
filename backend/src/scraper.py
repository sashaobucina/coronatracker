import csv
import os
import pandas as pd
import tempfile
import urllib.request as request

from generator import DataGenerator

class CoronaScraper():
  def __init__(self):
    self.reports = {}
    self.valid_countries = []
    self.base_url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series"

  def download_reports(self):
    """
    Collects timeseries COVD-19 data and returns a dictionary of Pandas DFs for each
    type of reported case.
    """
    reports = {}

    for report_type in ["confirmed", "deaths"]:
      url = f"{self.base_url}/time_series_covid19_{report_type}_global.csv"
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
          self.valid_countries += df["Country/Region"].tolist()
          self.valid_countries = list(set(self.valid_countries))
      finally:
        os.remove(path)

    self.valid_countries.append("Global")
    self.valid_countries.sort()

    if len(reports) > 0:
      self.reports = reports
    return self

  def get_reports(self):
    return self.reports

  def get_report(self, report_type: str):
    return self.reports.get(report_type, d=None)

  def get_valid_countries(self):
    return self.valid_countries

if __name__ == "__main__":
  pass
