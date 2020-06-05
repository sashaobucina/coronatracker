import numpy as np

from api.util.date import is_date
from api.util.misc import CONFIRMED, DEATHS, RECOVERED


def process_dates(reports: dict):
    """
    Extract the dates from the scraped reports
    """
    confirmed = reports[CONFIRMED]
    deaths = reports[DEATHS]
    recovered = reports[RECOVERED]

    dates1 = [col for col in confirmed.columns if is_date(col)]
    dates2 = [col for col in deaths.columns if is_date(col)]
    dates3 = [col for col in recovered.columns if is_date(col)]

    # fail-fast mechanism
    assert dates1 == dates2
    assert dates2 == dates3

    return dates1


def process_data(reports: dict, countries: list):
    """
    Clean up and organize the data from the scraped reports to be used for searching by a per-country 
    basis
    """
    processed = {}
    idxs = ["Country/Region"]
    columns = ["Lat", "Long", "Province/State"]

    # process data for each report type (confirmed & deaths)
    for report_type, raw_df in reports.items():
        data = {}
        df = raw_df.drop(columns, axis=1).set_index(idxs)

        # get sequential data for each country
        global_data = np.zeros(df.shape[1])
        for country in countries:
            country_data = df.xs(country).to_numpy()
            if country_data.ndim > 1:
                country_data = np.nan_to_num(country_data.sum(axis=0))
            global_data += country_data
            data[country] = country_data

        data["Global"] = global_data
        processed[report_type] = data

    return processed
