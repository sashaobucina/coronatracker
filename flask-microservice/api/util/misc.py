import re
from api.util.np_util import ndarray_to_list


# Constants
CONFIRMED = "confirmed"
DEATHS = "deaths"
RECOVERED = "recovered"

THRESHOLDS = {
    CONFIRMED: 1000,
    DEATHS: 50,
    RECOVERED: -1
}


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


if __name__ == "__main__":
    pass
