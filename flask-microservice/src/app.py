import atexit
import os
import logging
import numpy as np
from threading import Thread

from apscheduler.schedulers.background import BackgroundScheduler
from flask import Flask, jsonify, abort
from flask_cors import CORS

from scraper import CoronaScraper, GoogleNewsScraper
from generator import DataGenerator
from preprocess import process_data, process_dates
import util

app = Flask(__name__)
CORS(app)

# configuring the logger
logging.basicConfig(level=logging.INFO)
logger = app.logger

# setting up proper port
PORT = os.environ.get("PORT", 5000)

scraper = CoronaScraper(logger)
news_scraper = GoogleNewsScraper(logger)
generator = DataGenerator()

def initialize_data():
  global scraper, generator, logger
  logger.info("Updating data if available...")

  # scraping COVID-19 data
  scraper.download_reports()
  reports, countries = scraper.reports, scraper.valid_countries
  dates = process_dates(reports)
  data = process_data(reports, countries)

  generator = DataGenerator(dates, data, countries)

def initialize_news():
  # scraping COVID-19 news
  thread = Thread(target=news_scraper.scrape_all, args=())
  thread.start()

# populate the data generator and web scraper, populate news as well
initialize_data()
initialize_news()

# schedule jobs in background
scheduler = BackgroundScheduler()
scheduler.add_job(func=initialize_data, trigger="interval", hours=12)
scheduler.add_job(func=initialize_news, trigger="interval", hours=2)
scheduler.start()

###################### Routes ######################
@app.route('/')
def index():
  return jsonify("Microservice is live, use the '/valid-countries', '/top-movers', '/top-contributors', '/peak-data', '/cases', '/cases/<country>', '/news/country/<country>', '/news/supported-countries' endpoints for further functionality")

@app.route('/valid-countries')
def get_countries():
  response = generator.get_valid_countries()
  return jsonify(response)

@app.route('/top-movers')
def get_top_movers():
  response = generator.top_movers()
  return jsonify(response)

@app.route('/top-contributors')
def get_top_contributors():
  try:
    labels, data = generator.top_contributors()
    summary = generator.get_summary()

    # graph data
    dates = generator.get_dates()
    labels += ["date"]
    data += [dates]

    response = {
      "date": dates[-1],
      "summary": summary,
      "graph": {
        "labels": labels,
        "contributors": util.json_like(labels, data)
      }
    }
    return jsonify(response)
  except Exception as e:
    logger.error(str(e))
    abort(404)

@app.route('/peak-data')
def peak_data():
  response = generator.get_peak_data()
  return jsonify(response)

@app.route('/cases')
def all_data():
  response = generator.get_all_data(util.CONFIRMED)
  return jsonify(response)

@app.route('/cases/<string:country>', methods=['GET'])
def country_data(country):
  try:
    dates = generator.get_dates()
    confirmed = generator.get_country_data(country, util.CONFIRMED)
    deaths = generator.get_country_data(country, util.DEATHS)
    recovered = generator.get_country_data(country, util.RECOVERED)

    labels = ["date", util.CONFIRMED, util.DEATHS, util.RECOVERED]
    drv1_confirmed, drv1_deaths, drv1_recovered = np.gradient(confirmed), np.gradient(deaths), np.gradient(recovered)
    drv2_confirmed, drv2_deaths, drv2_recovered = np.gradient(drv1_confirmed), np.gradient(drv1_deaths), np.gradient(drv1_recovered)

    overall = util.json_like(labels, [dates, confirmed, deaths, recovered])
    first_derivative = util.json_like(labels, [dates, drv1_confirmed, drv1_deaths, drv1_recovered])
    second_derivative = util.json_like(labels, [dates, drv2_confirmed, drv2_deaths, drv2_recovered])

    summary = {
      util.CONFIRMED: generator.get_country_summary(country, util.CONFIRMED),
      util.DEATHS: generator.get_country_summary(country, util.DEATHS),
      util.RECOVERED: generator.get_country_summary(country, util.RECOVERED)
    }

    response = {
      "date": dates[-1],
      "overall": overall,
      "first_derivative_data": first_derivative,
      "second_derivative_data": second_derivative,
      "summary": summary
    }
    return jsonify(response)

  except Exception as e:
    logger.error(str(e))
    abort(404)

@app.route('/news/supported-countries')
def get_supported_countries():
  response = news_scraper.get_supported_countries()
  return jsonify(response)

@app.route('/news/country/<string:country>')
def get_news(country):
  response = news_scraper.get_news(country)
  return jsonify(response)

# shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=PORT)
