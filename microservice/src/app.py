import os
import logging
import atexit

from apscheduler.schedulers.background import BackgroundScheduler
from flask import Flask, jsonify, abort
from flask_cors import CORS

from scraper import CoronaScraper
from generator import DataGenerator
from util import CONFIRMED, DEATHS, to_data

app = Flask(__name__)
if os.environ.get("ENV", "") != "prod":
  CORS(app)

# configuring the logger
logging.basicConfig(level=logging.INFO)
logger = app.logger

# setting up proper port
PORT = os.environ.get("PORT", 5000)

scraper = CoronaScraper(logger)
generator = DataGenerator({}, [])

def initialize():
  global scraper, generator, logger
  logger.info("Updating data if available...")
  scraper.download_reports()
  generator = DataGenerator(scraper.get_reports(), scraper.get_valid_countries())

# populate the data generator and web scraper
initialize()

# schedule job to update data every 3 hours
scheduler = BackgroundScheduler()
scheduler.add_job(func=initialize, trigger="interval", hours=3)
scheduler.start()

""" Routes """
@app.route('/')
def index():
  return jsonify("Microservice is live, use the '/valid-countries', 'covid19/<country>' endpoints for further functionality")

@app.route('/valid-countries')
def get_countries():
  return jsonify(scraper.valid_countries)

@app.route('/covid19/<string:country>', methods=['GET'])
def get_data(country):
  try:
    X, confirmed = generator.generate(CONFIRMED, country)
    _, deaths = generator.generate(DEATHS, country)

    data = to_data(X, confirmed, deaths)
    return jsonify(data)
  except Exception as e:
    logger.error(str(e))
    abort(404)

# shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=PORT)
