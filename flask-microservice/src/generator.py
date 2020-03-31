import numpy as np

class DataGenerator:
  def __init__(self, reports: dict, valid_countries: list):
    self.reports = reports
    self.valid_countries = valid_countries
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
      for country in filter(lambda x: x != "Global", self.valid_countries):
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


if __name__ == "__main__":
  pass