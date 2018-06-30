'use strict';
import superagent from 'superagent';
//need superagent to make the mock http calls
import mongoose from 'mongoose';
// import user from '../../../src/models/user.js';
import app from '../../../src/app.js';
//need app to run the server

function ranName() {
  return {
    username: `${Math.random()*(1000-1) + 1}`,
    password: 'password',
  };
}

describe('AUTH MODULE', () => {

  const PORT = 8080;

  beforeAll(()=> {
    mongoose.connect('mongodb://localhost:27017');
    app.start(PORT);
    // done();
  });

  afterAll(()=> {
    app.stop();
    mongoose.connection.close();
  });

  // afterEach((done)=> {
  //   user.remove({}, () => {
  //     console.log('DELETING MODEL');
  //     done();
  //   });
  // });

  it('gets a 400 on bad login', () => {
    return superagent.post('http://localhost:8080/api/signup')
    // dont give it a .auth
    //   .auth()
      //superagent will do all the base64 encoding for us in this .auth
      .catch(response => {
        // console.log('BAD RES.STATUS: ',response.status);
        expect(response.status).toEqual(400);
      });
  });

  it('gets a 401 on bad login', () => {
    return superagent.get('http://localhost:8080/api/signin')
      .auth('derp','maxwell')
      //superagent will do all the base64 encoding for us in this .auth
      // .then(response => {
      //   // expect(response.statusCode).toEqual(200);
      // })
      .catch(response => {
        // console.log('BAD RES.STATUS: ',response.status);
        expect(response.status).toEqual(401);
      });
  });

  it('gets a 200 on good login', () => {
    let user = ranName();
    console.log('USER NAME: ', user);


    return superagent.post('http://localhost:8080/api/signup')
      // .auth('max','maxwell')
      .send(user)
      //in this form the 
      .then( res => {
        console.log('RES: ', res.status);

        return superagent.get('http://localhost:8080/api/signin')
          .auth(user)
          .then(response => {
            console.log('GOOD RES.STATUS: ',response.status);
            expect(response.statusCode).toEqual(200);
          });
      });
  });
});