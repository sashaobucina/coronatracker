import os
import atexit
from apscheduler.schedulers.background import BackgroundScheduler

from api import create_app


@atexit.register
def shutdown_scheduler():
    """ Shut down scheduler when exiting app. """
    scheduler.shutdown()


scheduler = BackgroundScheduler()
app = create_app(scheduler)

if __name__ == "__main__":
    PORT = os.environ.get("PORT", 5000)
    app.run(host="0.0.0.0", port=PORT)
