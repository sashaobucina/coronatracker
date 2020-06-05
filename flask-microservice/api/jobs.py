from bisect import insort
from threading import Thread
from apscheduler.schedulers.background import BackgroundScheduler

from api.generator import DataGenerator
from api.scrapers.scraper import BaseScraper
from api.scrapers.jhu_scraper import JHUScraper
from api.preprocess import process_data, process_dates


def add_job(scheduler: BackgroundScheduler, func, interval, args=[]):
    """ Add job to scheduler with provided args. """
    scheduler.add_job(func=func, args=args, trigger="interval", hours=interval)


def scrape_job(scraper: BaseScraper) -> None:
    """ Create job that launches thread to scrape for fresh data. """
    thread = Thread(target=scraper.scrape, args=())
    thread.start()


def data_collection_job(jhu_scraper: JHUScraper, generator: DataGenerator):
    """
    Collect data by scraping the JHU repository, and then preprocess the data 
    and store it in a data generator instance.
    """
    # scrape JHU for COVID-19 data
    success = jhu_scraper.scrape()
    if not success and jhu_scraper.check_cache():
        jhu_scraper.load_from_backup()

    # retrieve scraped JHU data
    reports = jhu_scraper.get_cache()
    countries = jhu_scraper.get_valid_countries()

    # process scraped JHU data
    dates = process_dates(reports)
    data = process_data(reports, countries)
    insort(countries, "Global")
    generator.overwrite(dates, data, countries)


if __name__ == "__main__":
    pass
