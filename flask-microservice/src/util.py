import datetime
import numpy as np

# Constants
CONFIRMED = "confirmed"
DEATHS = "deaths"
RECOVERED = "recovered"

def json_like(labels, data):
  """
  Convert data to represent a JSON-like structure.

  >>> labels = ["date", "num_cases"]
  >>> cases, dates = [100, 200, 300], ["1/1/20", "1/2/20", "1/3/20"]
  >>> json_like(labels, [dates, cases])
  [{'date': '1/1/20', 'num_cases': 100}, {'date': '1/2/20', 'num_cases': 200}, {'date': '1/3/20', 'num_cases': 300}]
  """
  data = [ndarray_to_list(datum) for datum in data]
  zipped_data = zip(*data)
  return [dict(zip(labels, row)) for row in zipped_data]

def numpy_to_native(value):
  """
  Convert int64 numpy base to native Python int
  """
  return value.item() if _is_numpy(value) else value

def div(divided, divisor):
  """
  Perform safe division.
  """
  return divided / divisor if divisor != 0 else 0

def _is_numpy(obj):
  """
  Check if object is a NumPy object
  """
  return type(obj).__module__ == np.__name__

def ndarray_to_list(arr):
  """
  Convert NumPy array to a Python list if applicable.
  """
  return arr.tolist() if _is_numpy(arr) else arr

def get_percent_below(value1, value2):
  """
  Return how much percent value1 is lower than value2.
  """
  return round((1 - div(value1, value2)) * 100, 1)

def get_percent_change(value1, value2):
  """
  Return the percent change from value2 to value1.
  """
  return round(div((value1 - value2), value2) * 100, 2)

def clip(s):
  if s is None or len(s) == 0:
    return "No description available..."
  if len(s) > 200:
    s = s[:200].strip() + "..."
  return s
