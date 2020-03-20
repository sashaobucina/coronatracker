import datetime
import numpy as np

CONFIRMED = "Confirmed"
DEATHS = "Deaths"
RECOVERED = "Recovered"

def _convert_to_dates(dates: str):
  return [datetime.datetime.strptime(d, "%m/%d/%y").date() for d in dates]

def ndarray_to_list(arr):
  if type(arr).__module__ == np.__name__:
    return arr.tolist()
  return arr