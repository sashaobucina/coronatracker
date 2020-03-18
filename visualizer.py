import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import numpy as np

from helper import _convert_to_dates

def visualize(X, y, region, case):
  # convert date strings to datetime
  X = _convert_to_dates(X)

  # create subplots and set the top title
  fig, (ax1, ax2, ax3) = plt.subplots(nrows=3, figsize=(10, 10))
  fig.suptitle(f"# of {case} - {region}", fontsize=14)

  # plot the original data
  plot(X, y, ax1)

  # plot data for first derivative
  y = np.gradient(np.array(y, dtype=int))
  plot(X, y, ax2, axhline=True)

  # plot data for second derivative
  y = np.gradient(y)
  plot(X, y, ax3, axhline=True)

  # save the figure
  plt.savefig(f"data/{region}-{case}-timeseries.png")

  # show the figure
  plt.show()

def plot(X, y, ax=None, axhline=False):
  if ax is None:
    ax = plt.gca()

  formatter = mdates.DateFormatter("%Y-%m-%d")
  locator = mdates.WeekdayLocator()
  ax.xaxis.set_major_formatter(formatter)
  ax.xaxis.set_major_locator(locator)
  ax.plot(X, y)
  if axhline:
    ax.axhline(color='red', linewidth=0.5)
  ax.set_xlabel('Time')
  ax.set_ylabel('Cases')

if __name__ == "__main__":
  pass