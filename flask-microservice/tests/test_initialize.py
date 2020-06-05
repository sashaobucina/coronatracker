import pytest
from apscheduler.schedulers.background import BackgroundScheduler

from api.initialize import initialize_scheduler


@pytest.fixture(scope="module")
def scheduler():
    scheduler = BackgroundScheduler()
    yield scheduler

    scheduler.shutdown()


def test_initialize_scheduler(scheduler: BackgroundScheduler):
    # scheduler should not be running before initialization
    assert not scheduler.running
    assert scheduler.get_jobs() == []

    initialize_scheduler(scheduler)

    # ensure scheduler running in background
    assert scheduler.running

    # ensure all jobs registered
    jobs = scheduler.get_jobs()
    assert len(jobs) == 3
    for job in jobs:
        print(job.name)
        assert job.name in ["data_collection_job", "scrape_job"]


if __name__ == "__main__":
    pytest.main("test_initialize.py")
