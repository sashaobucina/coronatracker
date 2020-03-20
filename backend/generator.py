import numpy as np

class DataGenerator:
  def __init__(self, reports, valid_countries):
    self.reports = reports
    self.valid_countries = valid_countries
    self._clean_dfs()

  def _clean_dfs(self):
    for report_type, raw_df in self.reports.items():
      df = raw_df.drop(['Lat', 'Long'], axis=1).set_index(["Country/Region", "Province/State"])
      self.reports[report_type] = df

  def X(self, report_type: str) -> list:
    if report_type not in self.reports:
      raise ValueError("Invalid report type given!")

    df = self.reports[report_type]
    return df.columns.values


  def y(self, report_type: str, country: str) -> list:
    if report_type not in self.reports:
      raise ValueError(f"Invalid report type given - {report_type}")

    df = self.reports[report_type]

    # get only the country values and sum up all provinces
    np_arr = df.xs((country)).values
    return np.nan_to_num(np_arr.sum(axis=0))


  def generate(self, report_type, country):
    if country not in self.valid_countries:
      raise ValueError("Invalid country set!")
    return self.X(report_type), self.y(report_type, country)


if __name__ == "__main__":
  pass