import os
import re
import pytest
import pandas as pd

from api.preprocess import process_data, process_dates

COUNTRIES = ["Canada", "Spain", "US", "Australia"]
REPORT_TYPES = ["confirmed", "deaths", "recovered"]


@pytest.fixture(scope="module")
def reports():
    FILE_NAME = "time_series_covid19_{0}_global.csv"
    DIR = os.path.join(os.path.dirname(os.path.realpath(__file__)), "example_data")

    reports = {}
    for report_type in REPORT_TYPES:
        path = os.path.join(DIR, FILE_NAME.format(report_type))
        df = pd.read_csv(path)
        reports[report_type] = df

    return reports


@pytest.fixture(scope="module")
def dates(reports):
    regex = r"\d{1,2}/\d{1,2}/\d{1,2}"
    return [col for col in reports["confirmed"].columns if re.match(regex, col)]


def test_process_dates(reports, dates):
    assert dates == process_dates(reports)


def test_process_data(reports, dates):
    processed_reports = process_data(reports=reports, countries=COUNTRIES)

    # ensure each report type represented
    assert list(processed_reports.keys()) == REPORT_TYPES

    # check processed data includes all countries and correct totals
    actual = []
    for report_type in processed_reports:
        processed_data = processed_reports[report_type]

        # ensure all countries are in the report
        assert list(processed_data.keys()) == COUNTRIES + ["Global"]

        # ensure all dates accounted for
        assert all(
            len(country_data) == len(dates) for country_data in processed_data.values()
        )

        # ensure all data is of correct dimension
        assert all(country_data.ndim == 1 for country_data in processed_data.values())

        actual.append(
            (
                processed_data["Australia"][-1],
                processed_data["US"][-1],
                processed_data["Global"][-1],
            )
        )

    # ensure data values align
    expected = [
        (2405, 1103461, 1365837),
        (24, 64943, 92797),
        (2265, 164015, 301094),
    ]
    assert actual == expected


if __name__ == "__main__":
    pytest.main("test_preprocess.py")
