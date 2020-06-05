import re
from datetime import datetime, timezone

from api.util.np_util import ndarray_to_list


# Constants
CONFIRMED = "confirmed"
DEATHS = "deaths"
RECOVERED = "recovered"


def json_like(labels, data):
    """ Convert data to represent a JSON-like structure. """
    data = [ndarray_to_list(datum) for datum in data]
    zipped_data = zip(*data)
    return [dict(zip(labels, row)) for row in zipped_data]


def clip(s):
    """
    Return a shortened version of the string, or a placeholder message if empty
    """
    if not s:
        return "No description available..."
    if len(s) > 200:
        s = s[:200].strip() + "..."
    return s


def get_utc_time():
    """ Get the current UTC time. """
    return datetime.now(tz=timezone.utc).strftime("%b %d, %Y %H:%M:%S %Z")


if __name__ == "__main__":
    pass
