# APP: https://coronatracker-rest.herokuapp.com/

heroku login
heroku container:login
./docker-init.sh
heroku container:push web -a coronatracker-rest
heroku container:release web -a coronatracker-rest

# open the microservice or use the url above
heroku open -a coronatracker-rest