"""
COVID-19 Coronavirus Tracker RESTful API
"""

import logging
from flask_cors import CORS
from flask import Flask
from apscheduler.schedulers.background import BackgroundScheduler

from api.routes import main
from api.initialize import initialize_app


def create_app(scheduler: BackgroundScheduler):
    app = Flask(__name__)
    CORS(app)

    # configuring the logger
    logging.basicConfig(level=logging.INFO)
    logger = app.logger

    # intialize data structures for app
    initialize_app(scheduler)

    with app.app_context():
        # register blueprints
        app.register_blueprint(main)

        return app
