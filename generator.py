from helper import valid_countries

class DataGenerator:
  def __init__(self, reports, country):
    self.reports = reports
    self.country = country

    self._clean_dfs()

  def _clean_dfs(self):
    for report_type, raw_df in self.reports.items():
      df = raw_df.drop(['Lat', 'Long'], axis=1).set_index(["Country/Region", "Province/State"])
      self.reports[report_type] = df

  def set_country(self, country):
    countries = valid_countries(self.reports)
    if country not in countries:
      print("Country selected is not valid!")
      print(f"Choose from the following: {str(countries)}")
      return

    self.country = country

  def X(self, report_type: str) -> list:
    if report_type not in self.reports:
      raise ValueError("Invalid report type given!")

    df = self.reports[report_type]
    return df.columns.values.tolist()

  def y(self, report_type: str) -> list:
    if report_type not in self.reports:
      raise ValueError(f"Invalid report type given - {report_type}")

    df = self.reports[report_type]

    # get only the country values and sum up all provinces
    np_arr = df.xs((self.country)).values
    return np_arr.sum(axis=0).tolist()

  def generate(self, report_type):
    return self.X(report_type), self.y(report_type)


if __name__ == "__main__":
  pass