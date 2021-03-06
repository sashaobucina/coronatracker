import numpy as np

from api.util.np_util import numpy_to_native
from api.util.misc import CONFIRMED, DEATHS, RECOVERED
from api.util.math_util import div, get_percent_below, get_percent_change


class DataGenerator:
    """
    Aggregates and generates data for the following microservice endpoints:
        - /valid-countries
        - /top-movers
        - /cases/<country>
    """

    def __init__(self, dates=[], reports={}, valid_countries=[]):
        self.dates = dates
        self.reports = reports
        self.valid_countries = valid_countries

    def overwrite(self, dates=[], reports={}, countries=[]):
        """ Overwrite data generator object with new data. """
        self.dates = dates
        self.reports = reports
        self.valid_countries = countries

    def get_dates(self):
        """
        Return all the dates from the inception of the virus, to now.
        """
        return self.dates

    def get_valid_countries(self):
        """
        Return all the countries that are being tracked.
        """
        return self.valid_countries

    def get_country_data(self, country, report_type):
        """
        Return the number of cases given the report type and country

        Preconditions:
        - country in self.valid_countries
        - report_type in ["confirmed", "deaths", "recovered"]
        """
        if report_type not in self.reports:
            raise ValueError(f"Invalid report type given - {report_type}")

        return self.reports[report_type][country]

    def get_all_data(self, report_type):
        """
        Return the number of cases for all countries, throughout time.

        Preconditions:
        - report_type in ["confirmed", "deaths", "recovered"]
        """
        data = []
        report = self.reports[report_type]
        for i, date in enumerate(self.dates):
            data.append(
                {
                    "date": date,
                    "data": [
                        {
                            "country": country,
                            "value": numpy_to_native(report[country][i]),
                        }
                        for country in self.valid_countries
                    ],
                }
            )
        return data

    def top_movers(self, thresholds={CONFIRMED: -1, DEATHS: -1, RECOVERED: -1}):
        """
        Return a dictionary containing the top movers for both confirmed cases, deaths, and recovered cases.
        """
        top_movers = {k: {} for k, _ in self.reports.items()}

        # populate the movers dict
        for report_type, report in self.reports.items():
            movers = []

            for country in self.valid_countries:
                data = report[country]

                # skip countries with no data
                if len(data) < 2:
                    continue

                value1 = numpy_to_native(data[-1])
                value2 = numpy_to_native(data[-2])

                diff = value1 - value2

                # only process countries with more than 1000 cases and up-to date info
                threshold = thresholds[report_type]
                if value1 < threshold or diff <= 0:
                    continue

                percentage_diff = get_percent_change(value1, value2)
                movers.append(
                    {
                        "country": country,
                        "change": diff,
                        "percentChange": percentage_diff,
                        "totalCases": value1,
                    }
                )

            # sort all movers
            sorted_movers = list(sorted(movers, key=lambda d: d["percentChange"]))

            # get top movers and accumulate them
            top_movers[report_type]["top_gainers"] = sorted_movers[::-1]
            top_movers[report_type]["top_losers"] = sorted_movers[:]

        # add last updated date
        top_movers["date"] = self.dates[-1]

        return top_movers

    def top_contributors(self):
        """
        Return the data associated with countries that have the most confirmed cases.

        Only aggregate the top 10 contributors
        """
        top10 = self._get_top10(self.reports[CONFIRMED])

        countries, top10_data = [], []
        for country in top10:
            countries.append(country)
            top10_data.append(self.get_country_data(country, report_type=CONFIRMED))

        return countries, top10_data

    def get_country_summary(self, country, report_type=CONFIRMED):
        """
        Get the summary for a specific country and report type.
        """
        country_data = self.get_country_data(country, report_type)
        changes = np.diff(country_data)
        new_cases, old_cases = changes[-1], changes[-2]
        idx, peak = self._get_peak(changes)
        days_since = (len(self.dates) - 1) - (idx + 1)

        return {
            "country": country,
            "total": numpy_to_native(country_data[-1]),
            "newCases": numpy_to_native(new_cases),
            "maxCases": numpy_to_native(peak),
            "percentBelow": numpy_to_native(get_percent_below(new_cases, peak)),
            "daysSince": numpy_to_native(days_since),
            "percentChange": numpy_to_native(
                get_percent_change(country_data[-1], country_data[-2])
            ),
        }

    def get_summary(self):
        """
        Get a summary for the top 10 countries in confirmed cases.
        """
        summary = {CONFIRMED: [], DEATHS: [], RECOVERED: []}

        for report_type in self.reports:
            report = self.reports[CONFIRMED]
            top10 = self._get_top10(report)
            for i, country in enumerate(top10):
                summary[report_type].append(
                    self.get_country_summary(country, report_type)
                )

        return summary

    def get_peak_data(self):
        """
        Get data corresponding to the peak amount of cases for all valid countries.
        """
        full_peak_data = {}

        for report_type, report in self.reports.items():
            peak_data = []
            for country in self.valid_countries:
                country_data = report[country]
                num_cases = country_data[-1]

                # dont account for countries with less than 5000 cases
                if num_cases < 1000:
                    continue

                # get changes per day
                changes = np.diff(country_data)
                recent = changes[-1]

                # ignore countries w/ negative change; usually result of changing data source for tracking cases
                if recent < 0:
                    continue

                # get peak
                idx, peak = self._get_peak(changes)
                peak_date = self.dates[idx + 1]

                # percent diff between recent and peak
                percent_below = get_percent_below(recent, peak)

                # days since recent and peak
                days_since = (len(self.dates) - 1) - (idx + 1)

                # aggregate all data needed
                peak_data.append(
                    {
                        "country": country,
                        "daysSince": numpy_to_native(days_since),
                        "percentBelow": numpy_to_native(percent_below),
                        "newCases": numpy_to_native(recent),
                        "peak": numpy_to_native(peak),
                        "peakDate": peak_date,
                    }
                )

            peak_data = sorted(peak_data, key=lambda d: d["daysSince"], reverse=True)
            full_peak_data[report_type] = peak_data

        # add last updated date
        full_peak_data["date"] = self.dates[-1]

        return full_peak_data

    def _get_top10(self, report):
        """
        Return a sorted list of the top 10 countries by confirmed cases.
        """
        contributions = [
            (country, report[country][-1]) for country in self.valid_countries
        ]
        top10 = sorted(contributions, key=lambda x: x[1], reverse=True)[:10]

        # only return the countries
        return [x[0] for x in top10]

    def _get_peak(self, changes):
        """
        Get the max amount and corresponding index from a given 1-D list.
        """
        idx = changes.argmax(axis=0)
        return idx, changes[idx]
