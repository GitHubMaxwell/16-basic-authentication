![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) 16: Basic Auth
===

## Travis Badge
[![Build Status](https://travis-ci.com/GitHubMaxwell/16-basic-authentication.svg?branch=max-lab16)](https://travis-ci.com/GitHubMaxwell/16-basic-authentication)

## Links

* TRAVIS: https://travis-ci.com/GitHubMaxwell/16-basic-authentication
* HEROKU: https://lab16-max.herokuapp.com/
* GitHUB PR:

## Steps
* fork/clone code
* npm install
* run npm test without having Nodemon (npm start) running but has MongoDB running with mongod in terminal
* test with postman:
* start MongoDB with mongod
* start nodemon with npm start

* in postman you can try /api/signup POST route and the /api/signin GET route
* for the POST you need to pass it a JSON body like so{"username":"max","password":"maxwell"}

* then for the GET you nee to choose the AUthorization tab and select Basic and then enter the username and password that you have just enter in the post