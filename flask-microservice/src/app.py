import atexit
import os
import logging
import numpy as np

from apscheduler.schedulers.background import BackgroundScheduler
from flask import Flask, jsonify, abort
from flask_cors import CORS

from scraper import CoronaScraper
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
generator = DataGenerator()

def initialize():
  global scraper, generator, logger
  logger.info("Updating data if available...")
  scraper.download_reports()
  reports, countries = scraper.reports, scraper.valid_countries
  dates = process_dates(reports)
  data = process_data(reports, countries)

  generator = DataGenerator(dates, data, countries)

# populate the data generator and web scraper
initialize()

# schedule job to update data every 3 hours
scheduler = BackgroundScheduler()
scheduler.add_job(func=initialize, trigger="interval", hours=3)
scheduler.start()

###################### Routes ######################
@app.route('/')
def index():
  return jsonify("Microservice is live, use the '/valid-countries', '/top-movers', '/top-contributors', '/peak-data', '/cases', '/cases/<country>' endpoints for further functionality")

@app.route('/valid-countries')
def get_countries():
  return jsonify(generator.get_valid_countries())

@app.route('/top-movers')
def get_top_movers():
  return jsonify(generator.top_movers())

@app.route('/top-contributors')
def get_top_contributors():
  labels, data = generator.top_contributors()
  labels += ["date"]
  data += [generator.get_dates()]

  response = {
    "labels": labels,
    "contributors": util.json_like(labels, data)
  }
  return jsonify(response)

@app.route('/peak-data')
def peak_data():
  response = generator.get_peak_data(report_type=util.CONFIRMED)
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

    labels = ["date", util.CONFIRMED, util.DEATHS]
    drv1_confirmed, drv1_deaths = np.gradient(confirmed), np.gradient(deaths)
    drv2_confirmed, drv2_deaths = np.gradient(drv1_confirmed), np.gradient(drv1_deaths)

    overall = util.json_like(labels, [dates, confirmed, deaths])
    first_derivative = util.json_like(labels, [dates, drv1_confirmed, drv1_deaths])
    second_derivative = util.json_like(labels, [dates, drv2_confirmed, drv2_deaths])

    response = {
      "overall": overall,
      "first_derivative_data": first_derivative,
      "second_derivative_data": second_derivative
    }

    return jsonify(response)

  except Exception as e:
    logger.error(str(e))
    abort(404)

# shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=PORT)
