FROM python:3.6

# install google chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN apt-get -y update
RUN apt-get install -y google-chrome-stable

# install chromedriver
RUN apt-get install -yqq unzip
RUN wget -O /tmp/chromedriver.zip http://chromedriver.storage.googleapis.com/`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`/chromedriver_linux64.zip
RUN unzip /tmp/chromedriver.zip chromedriver -d /usr/local/bin/

# set display port to avoid crash
ENV DISPLAY=:99

# copy requirements into image
COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

# install all necessary python modules
RUN pip install -r requirements.txt

# copy main module
COPY ./wsgi.py /app

# copy code
COPY ./api /app/api

# copy backup file
COPY ./backups/latest /app/backups

EXPOSE 5000

ENTRYPOINT [ "python" ]

CMD [ "wsgi.py" ]