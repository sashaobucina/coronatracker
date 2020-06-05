import logging
import feedparser
from bs4 import BeautifulSoup
import urllib.parse
import urllib.request as request
import urllib.error as request_err
from http.client import HTTPException
from socket import timeout, error as SocketError

from api.scrapers.scraper import BaseScraper
from api.util.misc import clip, get_utc_time


class NewsScraper(BaseScraper):
    """ Class that scrapes and caches Google news results for COVID-19. """

    def __init__(self, base_url, empty_response):
        super().__init__(base_url, empty_response)
        self.logger = logging.getLogger("NewsScraper")

        # set the countries that can be queried
        self.supported_countries = [
            "Canada",
            "US",
            "United Kingdom",
            "Germany",
            "France",
            "Italy",
            "Spain",
            "China",
            "Russia",
            "Serbia",
        ]
        self.timeout = 2

    def scrape(self):
        """
        Scrape Google News for top news stories about COVID-19 for each supported country.
        """
        for country in self.supported_countries:
            self._scrape(country)

        self.logger.info("Finished scraping all the news!")

    def _scrape(self, country):
        self.logger.info(f"Scraping news for {country}...")

        url = self._construct_url(country)
        rss = feedparser.parse(url)

        # get the top Google news entries from the RSS feed
        idx, feed = 0, []
        while idx < 100 and idx < len(rss.entries):
            try:
                entry = rss.entries[idx]
                link, published, title = entry.link, entry.published, entry.title

                self.logger.debug(f"Processing {link}...")

                response = (
                    request.urlopen(link, timeout=self.timeout)
                    .read()
                    .decode("utf-8", "ignore")
                )
                soup = BeautifulSoup(response, "html.parser")

                description = clip(self._get_metatag(soup, name="description"))
                image = self._get_metatag(soup, name="image")

                feed.append(
                    {
                        "description": description,
                        "link": link,
                        "image": image,
                        "published": published,
                        "title": title,
                    }
                )

            except (
                request_err.HTTPError,
                request_err.URLError,
                HTTPException,
                SocketError,
                timeout,
            ) as e:
                self.logger.debug(f"{str(e)} - {link}")
                feed.append(
                    {
                        "description": None,
                        "link": link,
                        "image": None,
                        "published": published,
                        "title": title,
                    }
                )
                continue

            except AttributeError as e:
                self.logger.error(str(e))
                continue

            finally:
                idx += 1

        self.cache[country] = {"news": feed, "updated": get_utc_time()}

        self.logger.info(
            f"Finished scraping news for {country} - collected {len(feed)} stories!"
        )

    def get_supported_countries(self):
        """
        Return the supported countries that news can be extracted from
        """
        return self.supported_countries

    def check_cache(self):
        return len(self.cache) == 0

    def _construct_url(self, country):
        """
        Construct URL that contacts the Google News RSS feed
        """
        query = urllib.parse.quote(f"Coronavirus {country}")
        return f"{self.base_url}?q={query}"

    def _get_metatag(self, soup, name):
        """
        Extract meta tag data from given HTML parse tree
        """
        tag = soup.find("meta", property=f"og:{name}")
        return tag["content"].strip() if (tag and "content" in tag.attrs) else None


if __name__ == "__main__":
    pass
