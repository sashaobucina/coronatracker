import datetime
import numpy as np

CONFIRMED = "confirmed"
DEATHS = "deaths"
RECOVERED = "recovered"

def to_data(X, confirmed, deaths):
  """
  Transform the data into a JSON-type object to be sent as a response.
  """
  data = {
    "overall" : [],
    "first_derivative_data": [],
    "second_derivative_data": []
  }
  drv1 = np.gradient(confirmed)
  drv2 = np.gradient(drv1)

  for x, c, d, dydx1, dydx2 in zip(X, confirmed, deaths, drv1, drv2):
    x = _ndarray_to_list(x)
    data["overall"].append(
      {
        "date": x,
        CONFIRMED: _ndarray_to_list(c),
        DEATHS: _ndarray_to_list(d),
      }
    )

    data["first_derivative_data"].append(
      {
        "date": x,
        "first_derivative": _ndarray_to_list(dydx1),
      }
    )

    data["second_derivative_data"].append(
      {
        "date": x,
        "second_derivative": _ndarray_to_list(dydx2)
      }
    )

  return data

def _convert_to_dates(dates: str):
  return [datetime.datetime.strptime(d, "%m/%d/%y").date() for d in dates]

def _is_numpy(obj):
  return type(obj).__module__ == np.__name__

def _ndarray_to_list(arr):
  return arr.tolist() if _is_numpy(arr) else arr

def numpy_to_native(value):
  return value.item() if _is_numpy(value) else value

def div(divided, divisor):
  return divided / divisor if divisor != 0 else 0