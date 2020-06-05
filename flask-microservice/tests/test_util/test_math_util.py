import pytest

from api.util.math_util import div, get_percent_below, get_percent_change


@pytest.mark.parametrize("dividend, divisor, expected", [(5, 0, 0.0), (5, 2, 2.5)])
def test_div(dividend, divisor, expected):
    assert div(dividend, divisor) == expected


@pytest.mark.parametrize(
    "val1, val2, expected",
    [
        (5, 0, 100.0),
        (0, 5, 100.0),
        (5, 5, 0.0),
        (2, 4, 50.0),
        (4, 3, -33.3)
    ]
)
def test_get_percent_below(val1, val2, expected):
    assert get_percent_below(val1, val2) == expected


@pytest.mark.parametrize(
    "val1, val2, expected",
    [
        (2, 2, 0.0),
        (2, 0, 0.0),
        (0, 2, -100.0),
        (3, 2, 50.0),
        (4, 3, 33.33)
    ]
)
def test_get_percent_change(val1, val2, expected):
    assert get_percent_change(val1, val2) == expected


if __name__ == "__main__":
    pytest.main("test_math_util.py")
