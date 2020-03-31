# APP: https://coronatracker-rest.herokuapp.com/

heroku login
heroku container:login
./docker-init.sh
heroku container:push web -a coronatracker-rest
heroku container:release web -a coronatracker-rest