import datetime

def _convert_to_dates(dates: str):
  return [datetime.datetime.strptime(d, "%m/%d/%y").date() for d in dates]

def valid_countries(reports):
  countries = []
  for _, df in reports.items():
    countries += df["Country/Region"].tolist()
  return set(countries)