from apscheduler.schedulers.background import BackgroundScheduler

import api.jobs as jobs
import api.util.urls as urls
from api.generator import DataGenerator
from api.scrapers.jhu_scraper import JHUScraper
from api.scrapers.news_scraper import NewsScraper
from api.scrapers.travel_scraper import TravelAlertScraper


# instantiate data structures
generator = DataGenerator()
jhu_scraper = JHUScraper(urls.JHU)
news_scraper = NewsScraper(urls.GOOGLE_NEWS, {"news": [], "updated": None})
travel_scraper = TravelAlertScraper(
    urls.IATA,
    {
        "description": "No travel alerts available...",
        "updated": None,
        "supported": False,
    },
)


def initialize_scheduler(scheduler: BackgroundScheduler):
    """ Start the scheduler to run background jobs. """
    jobs.add_job(
        scheduler,
        func=jobs.data_collection_job,
        interval=12,
        args=[jhu_scraper, generator],
    )
    jobs.add_job(scheduler, func=jobs.scrape_job, interval=2, args=[news_scraper])
    jobs.add_job(scheduler, func=jobs.scrape_job, interval=24, args=[travel_scraper])

    scheduler.start()


def initialize_app(scheduler: BackgroundScheduler):
    """ Initialize necessary components of the app. """
    jobs.data_collection_job(jhu_scraper, generator)
    jobs.scrape_job(news_scraper)
    jobs.scrape_job(travel_scraper)

    initialize_scheduler(scheduler)
