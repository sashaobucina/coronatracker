import numpy as np
from flask import current_app, abort, jsonify, Blueprint

from api.util.misc import CONFIRMED, DEATHS, RECOVERED, THRESHOLDS, json_like
from api.initialize import generator, news_scraper, travel_scraper

main = Blueprint("main", __name__)

###################### Routes ######################
@main.route("/")
def index():
    return jsonify(
        "Microservice is live, use the '/valid-countries', '/top-movers', "
        + "'/top-contributors', '/peak-data', '/cases', '/cases/<country>', "
        + "'/news/country/<country>', '/news/supported-countries' endpoints for further functionality"
    )


@main.route("/valid-countries")
def get_countries():
    response = generator.get_valid_countries()
    return jsonify(response)


@main.route("/top-movers")
def get_top_movers():
    response = generator.top_movers(thresholds=THRESHOLDS)
    return jsonify(response)


@main.route("/top-contributors")
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
            "graph": {"labels": labels, "contributors": json_like(labels, data)},
        }
        return jsonify(response)
    except Exception as e:
        current_app.logger.error(str(e))
        abort(404)


@main.route("/peak-data")
def peak_data():
    response = generator.get_peak_data()
    return jsonify(response)


@main.route("/cases")
def all_data():
    response = generator.get_all_data(CONFIRMED)
    return jsonify(response)


@main.route("/cases/<string:country>", methods=["GET"])
def country_data(country):
    try:
        dates = generator.get_dates()
        confirmed = generator.get_country_data(country, CONFIRMED)
        deaths = generator.get_country_data(country, DEATHS)
        recovered = generator.get_country_data(country, RECOVERED)

        labels = ["date", CONFIRMED, DEATHS, RECOVERED]
        drv1_confirmed, drv1_deaths, drv1_recovered = (
            np.gradient(confirmed),
            np.gradient(deaths),
            np.gradient(recovered),
        )
        drv2_confirmed, drv2_deaths, drv2_recovered = (
            np.gradient(drv1_confirmed),
            np.gradient(drv1_deaths),
            np.gradient(drv1_recovered),
        )

        overall = json_like(labels, [dates, confirmed, deaths, recovered])
        first_derivative = json_like(
            labels, [dates, drv1_confirmed, drv1_deaths, drv1_recovered]
        )
        second_derivative = json_like(
            labels, [dates, drv2_confirmed, drv2_deaths, drv2_recovered]
        )

        summary = {
            CONFIRMED: generator.get_country_summary(country, CONFIRMED),
            DEATHS: generator.get_country_summary(country, DEATHS),
            RECOVERED: generator.get_country_summary(country, RECOVERED),
        }

        travel_alert = travel_scraper.get_data(country.lower())

        response = {
            "date": dates[-1],
            "overall": overall,
            "first_derivative_data": first_derivative,
            "second_derivative_data": second_derivative,
            "summary": summary,
            "travel": travel_alert,
        }
        return jsonify(response)

    except Exception as e:
        current_app.logger.error(str(e))
        abort(404)


@main.route("/news/supported-countries")
def get_supported_countries():
    response = news_scraper.get_supported_countries()
    return jsonify(response)


@main.route("/news/country/<string:country>")
def get_news(country):
    response = news_scraper.get_data(country)
    return jsonify(response)
