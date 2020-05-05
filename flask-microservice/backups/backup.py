from datetime import date
import os
import subprocess
import urllib.request as request

CONFIRMED_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
DEATHS_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"
RECOVERED_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv"

ABSOLUTE_PATH = "/Users/sashaobucina/repos/coding_projects/coronatracker/flask-microservice/backups"

def backup(url):
  # get current date
  curr_date = date.today().strftime("%Y-%m-%d")
  curr_time = date.today().strftime("%Y-%m-%d %H:%M:%S") 

  # request data for confirmed and deaths
  print(f"{curr_time}: Requesting data from {url}...")
  response = request.urlopen(url)

  if response.status != 200:
    print(f"Was not able to access {url} - Status code {response.status}")
    exit(1)

  response_str = response.read().decode("utf")

  # create directory w/ current date if not present already
  dir_name = os.path.join(ABSOLUTE_PATH, curr_date)
  if not os.path.exists(dir_name):
    os.makedirs(dir_name)

  # save requested files to directory (overwrite if needed)
  file_name = url.split("/")[-1]
  full_path = os.path.join(dir_name, file_name)
  with open(full_path, "w+") as f:
    print(f"Writing data for {curr_date} to {full_path}")
    f.write(response_str)

  # wrote to file successfully, add the changes using git
  try:
    subprocess.run(["git", "add", dir_name], check=True, capture_output=True)
    subprocess.run(["git", "commit", "-m", f"Add backup for {curr_date}"], check=True, capture_output=True)
    subprocess.run(["git", "push"], check=True, capture_output=True)
  except subprocess.CalledProcessError as grepexc:
    print(f"Exited with non-zero return code {grepexc.returncode}: {grepexc.output}")

if __name__ == "__main__":
  for url in [CONFIRMED_URL, DEATHS_URL, RECOVERED_URL]:
    backup(url)
  print()