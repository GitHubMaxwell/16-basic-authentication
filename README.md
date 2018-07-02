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
* run npm test to see passing POST and GET tests
* test with postman:
* start MongoDB with mongod
* start nodemon with npm start

* in postman you can try /api/signup POST route and the /api/signin GET route
* for the POST route you need to pass it a JSON body like {"username":"max","email":"max@maxwell.com","password":"maxwell"}

* then for the GET you need to choose the Authorization tab and select "Basic" from the dropdown menu and then enter the username, password, and email that you have just entered in the above POST