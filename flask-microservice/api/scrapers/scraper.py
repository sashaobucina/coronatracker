from abc import ABC, abstractmethod


class BaseScraper(ABC):
    """ Base class for scrapers that collect and cache data. """

    def __init__(self, base_url, empty_response):
        self.cache = {}
        self.base_url = base_url
        self.empty_response = empty_response

    @abstractmethod
    def scrape(self) -> None:
        """ Scrape source for data and store to cache. """
        pass

    def get_data(self, key):
        """ Get data from cache given a data key. """
        return self.cache.get(key, self.empty_response)

    @abstractmethod
    def check_cache(self) -> bool:
        """ Checks if the contents of the cache are empty. """
        pass
