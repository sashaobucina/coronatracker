import numpy as np
from util import div, numpy_to_native, CONFIRMED, DEATHS

class DataGenerator:
  def __init__(self, reports: dict, valid_countries: list):
    self.reports = reports
    self.valid_countries = [country for country in valid_countries if country != "Global"]
    self._clean_dfs()

  def _clean_dfs(self):
    for report_type, raw_df in self.reports.items():
      self.reports[report_type] = \
        raw_df.drop(['Lat', 'Long'], axis=1).set_index(["Country/Region", "Province/State"])

  def X(self, report_type: str) -> list:
    """
    Generate the dates so far of reported cases.
    """
    if report_type not in self.reports:
      raise ValueError("Invalid report type given!")

    df = self.reports[report_type]
    return df.columns.values


  def y(self, report_type: str, country="global") -> list:
    """
    Generate the reported numbers given a the type of report and a country.

    Precondidtion:
      report_type in ["confirmed", "deaths"]

    """
    if report_type not in self.reports:
      raise ValueError(f"Invalid report type given - {report_type}")

    df = self.reports[report_type]

    # get only the country values and sum up all provinces
    if country != "global":
      country_arr = df.xs((country)).values
      return np.nan_to_num(country_arr.sum(axis=0))

    # get all the country values and summing them together
    else:
      global_arr = np.zeros(df.shape[1])
      for country in self.valid_countries:
        country_arr = df.xs((country)).values
        summed = np.nan_to_num(country_arr.sum(axis=0))
        global_arr += summed
      return global_arr


  def generate(self, report_type, country):
    """
    Accumulate both the x and y values of a query.
    """
    if country == "Global":
      return self.X(report_type), self.y(report_type)

    if country not in self.valid_countries:
      raise ValueError("Invalid country set!")

    return self.X(report_type), self.y(report_type, country)

  def top_movers(self):
    movers = {k: {} for (k, _) in self.reports.items()}

    # populate the movers dict
    for report_type, df in self.reports.items():
      last, sec_last = df.columns[-1], df.columns[-2]
      for country in self.valid_countries:
        row = df.xs(country)
        value1 = numpy_to_native(row[last][0])
        value2 = numpy_to_native(row[sec_last][0])
        diff = value1 - value2

        # only process countries with more than 1000 cases and up-to date info
        threshold = 1000 if report_type == CONFIRMED else 100
        if value1 < threshold or diff == 0:
          continue

        percentage_diff = div((value1 - value2), value2) * 100
        movers[report_type][country] = (percentage_diff, diff, value1)

    # sort by top gainers and top losers by case category
    top_movers = {k: {} for (k, _) in self.reports.items()}
    for report_type, mover in movers.items():
      # sort all movers and convert to list
      sorted_movers = list(sorted(mover.items(), key=lambda kv: kv[1][0]))

      # get top movers from all movers and accumulate them in top movers dict, by case category
      top_gainers = sorted_movers[-1:-11:-1]
      top_losers = sorted_movers[0:10]
      top_movers[report_type]["top_gainers"] = top_gainers
      top_movers[report_type]["top_losers"] = top_losers

    return top_movers


if __name__ == "__main__":
  pass
