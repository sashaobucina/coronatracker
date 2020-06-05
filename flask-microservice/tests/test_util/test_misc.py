import pytest
import re

from api.util.misc import json_like, clip, get_utc_time


@pytest.mark.parametrize(
    "input_str, clipped_str",
    [
        ("", "No description available..."),
        (None, "No description available..."),
        ("Less than 200 characters", "Less than 200 characters"),
        ("<text>" * 34, "<text>" * 33 + "<t..."),
    ],
)
def test_clip(input_str, clipped_str):
    assert clip(input_str) == clipped_str


def test_json_like():
    labels = ["date", "num_cases"]
    dates, cases = ["1/1/20", "1/2/20", "1/3/20"], [100, 200, 300]
    actual = json_like(labels, [dates, cases])
    expected = [
        {"date": "1/1/20", "num_cases": 100},
        {"date": "1/2/20", "num_cases": 200},
        {"date": "1/3/20", "num_cases": 300},
    ]
    assert actual == expected


def test_get_utc_time():
    time = get_utc_time()
    assert re.match(r"^[A-z]{3} \d{2}, \d{4} \d{2}:\d{2}:\d{2} UTC", time) is not None


if __name__ == "__main__":
    pytest.main("test_misc.py")
