from flask import Flask, jsonify, abort
from backend.scraper import CoronaScraper
from backend.generator import DataGenerator
from backend.helper import CONFIRMED, DEATHS, RECOVERED, to_data

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
    X, confirmed = generator.generate(CONFIRMED, country)
    deaths = generator.y(DEATHS, country)
    recovered = generator.y(RECOVERED, country)

    data = to_data(X, confirmed, deaths, recovered)

    res = {
      "country": country,
      "data": data
    }
    return jsonify(res)
  except Exception:
    abort(404)

if __name__ == "__main__":
  app.run(debug=True)