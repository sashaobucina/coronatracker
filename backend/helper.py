import datetime
import numpy as np

CONFIRMED = "Confirmed"
DEATHS = "Deaths"
RECOVERED = "Recovered"

def _convert_to_dates(dates: str):
  return [datetime.datetime.strptime(d, "%m/%d/%y").date() for d in dates]

def to_data(X, confirmed, deaths, recovered):
  data = []
  confirmed_drv1 = np.gradient(confirmed)
  confirmed_drv2 = np.gradient(confirmed_drv1)

  for x, cy, cd1y, cd2y, dy, ry in zip(X, confirmed, confirmed_drv1, confirmed_drv2, deaths, recovered):
    data.append(
      {
        "name": ndarray_to_list(x),
        CONFIRMED: ndarray_to_list(cy),
        f"{CONFIRMED}-drv1": ndarray_to_list(cd1y),
        f"{CONFIRMED}-drv2": ndarray_to_list(cd2y),
        DEATHS: ndarray_to_list(dy),
        RECOVERED: ndarray_to_list(ry)
      }
    )

  return data

def ndarray_to_list(arr):
  if type(arr).__module__ == np.__name__:
    return arr.tolist()
  return arr

def fill_with_zeros(y, y_orig):
  diff = len(y) - len(y_orig)

  if diff <= 0:
    return y_orig
  return np.pad(y_orig, (diff, 0), mode='constant')