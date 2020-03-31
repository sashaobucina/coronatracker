import os
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

scraper = CoronaScraper()
generator = DataGenerator({}, [])

def initialize():
  global scraper, generator
  scraper.download_reports()
  generator = DataGenerator(scraper.get_reports(), scraper.get_valid_countries())
  print(generator.valid_countries[0])

# populate the data generator and web scraper
initialize()

# schedule job to update data every 3 hours
scheduler = BackgroundScheduler()
scheduler.add_job(func=initialize, trigger="interval", hours=3)
scheduler.start()

""" Routes """
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
    print(str(e))
    abort(404)

# shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())

if __name__ == "__main__":
  app.run(debug=False, host="0.0.0.0")
