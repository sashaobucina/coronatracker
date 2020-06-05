import re
import logging
from datetime import datetime
from selenium import webdriver
from selenium.common.exceptions import (
    ElementClickInterceptedException,
    ElementNotInteractableException,
)

from api.scrapers.scraper import BaseScraper

class TravelAlertScraper(BaseScraper):
    """ Class that scrapes IATA and caches travel alerts about COVID-19. """

    def __init__(self, base_url, empty_response):
        super().__init__(base_url, empty_response)
        self.logger = logging.getLogger("TravelAlertScraper")

    def scrape(self):
        """
        Scrape IATA for travel alerts through selenium
        """
        self.logger.info("Scraping for new travel alerts...")

        # instantiate webdriver component in headless mode
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--remote-debugging-port=9222")
        chrome_options.add_argument("window-size=1920,1080")
        driver = webdriver.Chrome(chrome_options=chrome_options)
        driver.get(self.base_url)

        css = 'path[class*="svgMap-country"]'
        elements = driver.find_elements_by_css_selector(css)

        for i, element in enumerate(elements):
            try:
                self.logger.debug(f"Processing element {i} out of {len(elements) - 1}")
                element.click()

                title = driver.find_elements_by_class_name("svgMap-tooltip-title")
                content = driver.find_elements_by_class_name("svgMap-tooltip-content")

                if title and content:
                    country = self._rename(title[0].text)

                    # get travel alert description
                    content_list = content[0].text.split("\n")
                    description = "\n".join(content_list[1:])

                    # get last published date
                    updated_str = content_list[0]
                    updated = re.search(r"\d{2}.\d{2}.\d{4}", updated_str)
                    if updated:
                        updated = (
                            datetime.strptime(updated.group(), "%d.%m.%Y")
                            .date()
                            .strftime("%b %d, %Y")
                        )

                    self.cache[country] = {
                        "description": description,
                        "updated": updated,
                        "supported": True,
                    }

            except (
                ElementClickInterceptedException,
                ElementNotInteractableException,
            ) as e:
                self.logger.debug(str(e))
                continue

        self.logger.info(
            f"Finished scraping travel alerts for {len(self.cache)} countries!"
        )
        driver.quit()
    
    def check_cache(self):
        return len(self.cache) == 0

    def _rename(self, country):
        """ Rename countries to lower case, and perform some common renamings. """
        if country == "United States":
            country = "US"
        if country == "The Mainland of China":
            country = "China"
        if country == "Korea (Rep.)":
            country = "Korea, South"

        return country.lower()