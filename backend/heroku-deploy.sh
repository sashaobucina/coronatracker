# APP: https://coronatracker-rest.herokuapp.com/

heroku login
heroku container: login
heroku container: push web -a coronatracker-rest
heroku container: release -a coronatracker-rest