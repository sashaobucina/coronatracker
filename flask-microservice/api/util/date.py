from dateutil.parser import parse
from datetime import datetime, timezone


def get_utc_time():
    """ Get the current UTC time. """
    return datetime.now(tz=timezone.utc).strftime("%b %d, %Y %H:%M:%S %Z")


def is_date(string, fuzzy=True):
    """
    Return whether the string can be interpreted as a date.
    CREDIT: https://stackoverflow.com/a/25341965/7120095

    :param string: str, string to check for date
    :param fuzzy: bool, ignore unknown tokens in string if True
    """
    try:
        parse(string, fuzzy=fuzzy)
        return True
    except ValueError:
        return False


if __name__ == "__main__":
    pass
