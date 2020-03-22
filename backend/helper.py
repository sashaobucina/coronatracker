import datetime
import numpy as np

CONFIRMED = "Confirmed"
DEATHS = "Deaths"
RECOVERED = "Recovered"

def _convert_to_dates(dates: str):
  return [datetime.datetime.strptime(d, "%m/%d/%y").date() for d in dates]

def to_data(X, confirmed, deaths, recovered):
  data = {
    "overall" : [],
    "first_derivative_data": [],
    "second_derivative_data": []
  }
  drv1 = np.gradient(confirmed)
  drv2 = np.gradient(drv1)

  for x, c, d, r, dydx1, dydx2 in zip(X, confirmed, deaths, recovered, drv1, drv2):
    x = ndarray_to_list(x)
    data["overall"].append(
      {
        "date": x,
        CONFIRMED: ndarray_to_list(c),
        DEATHS: ndarray_to_list(d),
        RECOVERED: ndarray_to_list(r)
      }
    )

    data["first_derivative_data"].append(
      {
        "date": x,
        "First Derivative": ndarray_to_list(dydx1),
      }
    )

    data["second_derivative_data"].append(
      {
        "date": x,
        "Second Derivative": ndarray_to_list(dydx2)
      }
    )

  return data

def ndarray_to_list(arr):
  if type(arr).__module__ == np.__name__:
    return arr.tolist()
  return arr