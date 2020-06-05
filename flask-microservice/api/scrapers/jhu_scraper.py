import os
import logging
import tempfile
import pandas as pd
import urllib.request as request
import urllib.error as request_err

from api.scrapers.scraper import BaseScraper
from api.scrapers.scraper import BaseScraper
from api.util.misc import CONFIRMED, DEATHS, RECOVERED


class JHUScraper(BaseScraper):
    """ Class that scrapes and caches the JHU repository for data about virus. """

    def __init__(self, base_url, empty_response=""):
        super().__init__(base_url, empty_response)
        self.logger = logging.getLogger("JHUScraper")
        self.valid_countries = []

    def scrape(self):
        """
        Collects timeseries COVD-19 data and returns a dictionary of Pandas DFs for each
        type of reported case.

        Data recovered from John Hopkins CSSE repository.
        """
        self.logger.info("Loading data if available...")

        reports = {}
        report_types = [CONFIRMED, DEATHS, RECOVERED]
        try:
            for report_type in report_types:
                # encapsulate data retrieval in try-catch block to prevent denial of service
                try:
                    url = (
                        f"{self.base_url}/time_series_covid19_{report_type}_global.csv"
                    )
                    req = request.urlopen(url)
                except request_err.HTTPError as e:
                    self.logger.error(
                        f"Could not scrape data for report type '{report_type}' - {str(e)}"
                    )
                    continue

                # check the status code
                if req.status != 200:
                    self.logger.error(f"Request failed: {req.info()}")
                    return

                # convert data to str if returned a successful response
                req_str = req.read().decode("utf")

                # save to tempfile and process it with pandas; close after done processing
                fd, path = tempfile.mkstemp()
                try:
                    with os.fdopen(fd, "w") as tmp:
                        tmp.write(req_str)
                        df = pd.read_csv(path, sep=",")
                        reports[report_type] = df
                        self.valid_countries += df["Country/Region"].tolist()
                        self.valid_countries = list(set(self.valid_countries))
                finally:
                    os.remove(path)

            self.valid_countries.sort()

            # handle unsuccessful load
            if len(reports) != len(report_types):
                diff = list(set(report_types) - set(reports.keys()))
                self.logger.error(f"Missing the following reports: {diff}")
                return False

            self.logger.info("Loaded data successfully!")
            self.cache = reports

            return True
        except Exception as e:
            self.logger.error(e)
            return False

    def load_from_backup(self):
        """
        Collect all the data from a local backup
        """
        self.logger.warning(f"Reverting to load data from backup...")

        reports = {}
        report_types = [CONFIRMED, DEATHS, RECOVERED]
        relative_path = os.path.join("backups", "latest")

        if not os.path.exists(relative_path):
            self.logger.error(f"Path to backup does not exist! - {relative_path}")
            return

        if not os.path.isdir(relative_path):
            self.logger.error(f"Path provided is not a directory! - {relative_path}")
            return

        # walk through backup files
        for report_type in report_types:
            filename = f"time_series_covid19_{report_type}_global.csv"
            full_path = os.path.join(relative_path, filename)

            if not os.path.exists(full_path):
                self.logger.error(
                    f"File '{filename}' for report type '{report_type}' does not exist in backups!"
                )
                continue

            df = pd.read_csv(full_path)
            reports[report_type] = df
            self.valid_countries += df["Country/Region"].tolist()
            self.valid_countries = list(set(self.valid_countries))

        # last post-processing steps
        self.valid_countries.sort()

        # handle unsuccessful load
        if len(reports) != len(report_types):
            diff = list(set(report_types) - set(reports.keys()))
            self.logger.error(f"Missing the following reports: {diff}")
            return

        self.logger.info("Loaded data successfully!")
        self.cache = reports

    def check_cache(self):
        return len(self.valid_countries) == 0 or len(self.cache) == 0

    def get_valid_countries(self):
        """ Return valid countries JHU supports """
        return self.valid_countries

    def get_cache(self):
        """ Return cached data """
        return self.cache


if __name__ == "__main__":
    pass
