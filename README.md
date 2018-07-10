![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) 16: Basic Auth
===

## Travis Badge
[![Build Status](https://travis-ci.com/GitHubMaxwell/16-basic-authentication.svg?branch=max-lab16)](https://travis-ci.com/GitHubMaxwell/16-basic-authentication)

## Links

* TRAVIS: https://travis-ci.com/GitHubMaxwell/16-basic-authentication
* HEROKU: https://lab16-max.herokuapp.com/
* GitHUB PR: https://github.com/GitHubMaxwell/16-basic-authentication/pull/1

## Steps
* fork/clone code
* npm install
* run npm test to see passing POST and GET tests
* test with postman:
* start MongoDB with mongod
* start nodemon with npm start

=================
* i dont believe you need this but heres the MONGOD_URI and other env variables (if your testing locally dont use the heroku one)
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/lab-16
MONGODB_URI=mongodb://heroku_96zz0t43:bbucc67tofc0ijds65kpl7upvp@ds231951.mlab.com:31951/heroku_96zz0t43
APP_SECRET=maxwell
```
To Test with Heroku

1. First you need to do a sign up POST request on `https://lab16-max.herokuapp.com/api/signup` with a Body like this `{"username": "max", "password": "maxwell", "email": "max@maxwell.com"}`. You'll get a 200 OK on success and a 400 bad request on failure

2. The you can do a sign in GET request on `https://lab16-max.herokuapp.com/api/signin`. Go the the Authorization tab and select Basic Auth from the list. enter the above username and password and press send. youll recieve 200 OK on success and a 401 on failure.