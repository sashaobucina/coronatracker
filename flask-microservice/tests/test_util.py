import pytest
import numpy as np
import os
import re
import sys

# append src directory to system path in order to import tests
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
sys.path.append(os.path.join(ROOT, "src"))

import util


def test_json_like():
    labels = ["date", "num_cases"]
    dates, cases = ["1/1/20", "1/2/20", "1/3/20"], [100, 200, 300]
    actual = util.json_like(labels, [dates, cases])
    expected = [{'date': '1/1/20', 'num_cases': 100}, {'date': '1/2/20', 'num_cases': 200}, {'date': '1/3/20', 'num_cases': 300}]
    assert actual == expected


def test_numpy_to_native():
    val = 5
    assert util.numpy_to_native(val) is val
    assert util.numpy_to_native(np.int(val)) == val


def test_div():
    assert util.div(5, 0) == 0.0
    assert util.div(5, 2) == 5 / 2


def test_ndarray_to_list():
    lst = [1, 2, 3]
    assert util.ndarray_to_list(lst) is lst

    np_lst = np.array(lst)
    assert util.ndarray_to_list(np_lst) == lst



def test_get_percent_below():
    assert util.get_percent_below(5, 0) == 100.0
    assert util.get_percent_below(0, 5) == 100.0
    assert util.get_percent_below(5, 5) == 0.0
    assert util.get_percent_below(2, 4) == 50.0
    assert util.get_percent_below(4, 3) == -33.3


def test_get_percent_change():
    assert util.get_percent_change(2, 2) == 0.0
    assert util.get_percent_change(2, 0) == 0.0
    assert util.get_percent_change(0, 2) == -100.0
    assert util.get_percent_change(3, 2) == 50.0
    assert util.get_percent_change(4, 3) == 33.33


def test_clip():
    s = ""
    assert util.clip(s) == "No description available..."

    s = "Less than 200 characters"
    assert util.clip(s) == s

    s = "<text>" * 34
    actual = util.clip(s)
    assert len(actual) == 203
    assert actual[-3:] == "..."


def test_get_utc_time():
    time = util.get_utc_time()
    assert re.match(r"^[A-z]{3} \d{2}, \d{4} \d{2}:\d{2}:\d{2} UTC", time) is not None


if __name__ == "__main__":
    pytest.main(["test_util.py"])
