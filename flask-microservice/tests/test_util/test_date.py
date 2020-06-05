import re
import pytest

from api.util.date import get_utc_time, is_date


def test_get_utc_time():
    time = get_utc_time()
    assert re.match(r"^[A-z]{3} \d{2}, \d{4} \d{2}:\d{2}:\d{2} UTC", time) is not None


@pytest.mark.parametrize(
    "date_str, fuzzy, expected",
    [
        ("1990-12-1", False, True),
        ("2005/3", False, True),
        ("Jan 19, 1990", False, True),
        ("today is 2019-03-27", False, False),
        ("Monday at 12:01am", False, True),
        ("xyz_not_a_date", False, False),
        ("yesterday", False, False),
        ("today is 2019-03-27", True, True),
    ],
)
def test_is_date(date_str, fuzzy, expected):
    assert is_date(date_str, fuzzy=fuzzy) == expected


if __name__ == "__main__":
    pytest.main("test_date.py")
