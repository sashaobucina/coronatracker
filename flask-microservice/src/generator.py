import numpy as np
from util import div, numpy_to_native, CONFIRMED, DEATHS

class DataGenerator:
  """
  Aggregates and generates data for the following microservice endpoints:
    - /valid-countries
    - /top-movers
    - /covid19/<country>
  """
  def __init__(self, dates=[], reports={}, valid_countries=[]):
    self.dates = dates
    self.reports = reports
    self.valid_countries = valid_countries

  def get_dates(self):
    """
    Return all the dates from the inception of the virus, to now.
    """
    return self.dates

  def get_valid_countries(self):
    """
    Return all the countries that are being tracked.
    """
    return sorted(self.valid_countries + ["Global"])

  def get_country_data(self, country, report_type):
    """
    Return the number of cases given the report type and country

    Preconditions:
      - country in self.valid_countries
      - report_type in ["Confirmed", "Deaths"]
    """
    if report_type not in self.reports:
      raise ValueError(f"Invalid report type given - {report_type}")

    return self.reports[report_type][country]

  def top_movers(self):
    """
    Return a dictionary containing the top movers for both confirmed cases and deaths.
    """
    top_movers = {k: {} for k, _ in self.reports.items()}
    thresholds = {
      DEATHS: 50,
      CONFIRMED: 1000
    }

    # populate the movers dict
    for report_type, report in self.reports.items():
      movers = {}

      for country in self.valid_countries:
        data = report[country]

        # skip countries with no data
        if len(data) < 2:
          continue

        value1 = numpy_to_native(data[-1])
        value2 = numpy_to_native(data[-2])

        diff = value1 - value2

        # only process countries with more than 1000 cases and up-to date info
        threshold = thresholds[report_type]
        if value1 < threshold or diff <= 0:
          continue

        percentage_diff = div((value1 - value2), value2) * 100
        movers[country] = (percentage_diff, diff, value1)

      # sort all movers
      sorted_movers = list(sorted(movers.items(), key=lambda kv: kv[1][0]))

      # get top movers and accumulate them
      top_movers[report_type]["top_gainers"] = sorted_movers[::-1]
      top_movers[report_type]["top_losers"] = sorted_movers[:]

    return top_movers

  def top_contributors(self):
    """
    Return the data associated with countries that have the most confirmed cases.

    Only aggregate the top 10 contributors
    """
    confirmed = self.reports[CONFIRMED]
    contributions = [(country, confirmed[country][-1]) for country in self.valid_countries]
    top10 = sorted(contributions, key=lambda x: x[1], reverse=True)[:10]

    countries, top10_data = [], []
    for country, _ in top10:
      countries.append(country)
      top10_data.append(self.get_country_data(country, report_type=CONFIRMED))

    return countries, top10_data
