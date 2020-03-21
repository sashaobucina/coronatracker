from flask import Flask, jsonify, abort
from flask_cors import CORS
from scraper import CoronaScraper
from generator import DataGenerator
from helper import CONFIRMED, DEATHS, RECOVERED, to_data

app = Flask(__name__)
CORS(app)

def initialize():
  scraper = CoronaScraper()
  scraper.download_reports()
  generator = DataGenerator(scraper.get_reports(), scraper.get_valid_countries())
  return scraper, generator

scraper, generator = initialize()

@app.route('/valid-countries')
def index():
  return jsonify(scraper.valid_countries)

@app.route('/covid19/<string:country>', methods=['GET'])
def get_data(country):
  try:
    X, confirmed = generator.generate(CONFIRMED, country)
    deaths = generator.y(DEATHS, country)
    recovered = generator.y(RECOVERED, country)

    print("HERE")

    data = to_data(X, confirmed, deaths, recovered)
    return jsonify(data)
  except Exception:
    abort(404)

if __name__ == "__main__":
  app.run(debug=True)