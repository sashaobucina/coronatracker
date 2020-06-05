import os
import copy
import json
import pytest
import numpy as np

from api.generator import DataGenerator


def read_file(filename: str):
    dir_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "example_data")
    path = os.path.join(dir_path, filename)

    with open(path, "r") as f:
        json_output = f.read()
    return json_output


@pytest.fixture(scope="module")
def generator():
    d = json.loads(read_file("example_report.json"))

    reports = d["reports"]
    dates = d["dates"]
    valid_countries = d["countries"]

    return DataGenerator(dates, reports, valid_countries)


@pytest.mark.parametrize(
    "new_dates, new_reports, new_countries",
    [
        ([], {}, []),
        (["1/5/20"], {"confirmed": {"France": np.array([0])}}, ["France", "Spain"]),
    ],
)
def test_overwrite(generator, new_dates, new_reports, new_countries):
    copied_generator = copy.deepcopy(generator)
    copied_generator.overwrite(
        dates=new_dates, reports=new_reports, countries=new_countries
    )

    assert copied_generator.get_dates() == new_dates
    assert copied_generator.get_valid_countries() == new_countries
    assert copied_generator.reports == new_reports


def test_get_country_data(generator):
    assert np.array_equal(
        generator.get_country_data("Canada", "confirmed"), np.array([5, 10, 20])
    )


def test_get_country_data_fails(generator):
    with pytest.raises(ValueError):
        generator.get_country_data("Canada", "unknown")


def test_get_all_data(generator):
    report_type = "confirmed"
    expected = json.loads(read_file("expected_all_data.json"))
    actual = generator.get_all_data(report_type)

    assert actual == expected


# def test_top_movers(generator):
#     pass


def test_top_contributors(generator):
    d = json.loads(read_file("expected_top_contributors.json"))
    expected_countries, expected_data = d["countries"], d["data"]
    actual_countries, actual_data = generator.top_contributors()

    assert expected_countries == actual_countries
    assert expected_data == actual_data


def test_get_country_summary(generator: DataGenerator):
    expected = json.loads(read_file("expected_country_summary.json"))
    actual = generator.get_country_summary("China")

    assert expected == actual


if __name__ == "__main__":
    pytest.main("test_generator.py")
