from flask import Flask, jsonify, abort
from backend.scraper import CoronaScraper
from backend.generator import DataGenerator
from backend.helper import CONFIRMED, DEATHS, RECOVERED, ndarray_to_list

app = Flask(__name__)

def initialize():
  scraper = CoronaScraper()
  scraper.download_reports()
  generator = DataGenerator(scraper.get_reports(), scraper.get_valid_countries())
  return scraper, generator

scraper, generator = initialize()

@app.route('/')
def index():
  return jsonify(scraper.valid_countries)

@app.route('/covid19/<string:country>', methods=['GET'])
def get_data(country):
  try:
    data = {
      "country": country,
      CONFIRMED: {
        "x": ndarray_to_list(generator.X(CONFIRMED)),
        "y": ndarray_to_list(generator.y(CONFIRMED, country)),
        "unit": "cases"
      },
      DEATHS: {
        "x": ndarray_to_list(generator.X(DEATHS)),
        "y": ndarray_to_list(generator.y(DEATHS, country)),
        "unit": "cases per day"
      },
      RECOVERED: {
        "x": ndarray_to_list(generator.X(RECOVERED)),
        "y": ndarray_to_list(generator.y(RECOVERED, country)),
        "unit": "change in cases per day"
      }
    }
    return jsonify(data)
  except Exception:
    print("HERE")
    abort(404)

if __name__ == "__main__":
  app.run(debug=True)