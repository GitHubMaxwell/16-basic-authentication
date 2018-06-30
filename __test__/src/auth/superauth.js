'use strict';
// import superagent from 'superagent';
//need superagent to make the mock http calls
import supertest from 'supertest';
import {
  server,
} from '../../../src/app.js';
import mongoose from 'mongoose';
//need mongoose to 
import app from '../../../src/app.js';
//need app to run the server
const mockRequest = supertest(server);

import { Mockgoose } from 'mockgoose';

const mockgoose = new Mockgoose(mongoose);

afterAll((done) => {
  mongoose.disconnect().then(() => {
    done();
  }).catch((err) => {
    console.error(err);
    done();
  });
});

describe('AUTH MODULE', () => {

  beforeAll((done) => {
    mockgoose.prepareStorage().then(function () {
      mongoose.connect('mongodb://localhost/lab_16').then(() => done());
    });
  });

  afterEach((done) => {
    mockgoose.helper.reset().then(() => {
      done();
    });
  });

  it('gets a 400 on bad login', () => {
    return supertest.post('/api/signup')
    // dont give it a .auth
    //   .auth()
      //superagent will do all the base64 encoding for us in this .auth
      .catch(response => {
        // console.log('BAD RES.STATUS: ',response.status);
        expect(response.status).toEqual(400);
      });
  });

  it('gets a 401 on bad login', () => {
    return supertest.get('/api/signin')
      .auth('derp','maxwell')
      //superagent will do all the base64 encoding for us in this .auth
      .catch(response => {
        console.log('BAD RES.STATUS: ',response.status);
        expect(response.status).toEqual(401);
      });
  });

  it('gets a 200 on good login', () => {
    let user = {
      username : 'max',
      password : 'maxwell',
    };

    return supertest.post('/api/signup')
      .send(user)
      .then(() => {
        return supertest.get('/api/signin')
          .auth('max', 'maxwell')
          .then(res => {
            expect(res.statusCode).toEqual(200);
          });
      });
    // return supertest.get('http://localhost:8080/api/signin')
    //   .auth('max','maxwell')
    //   .then(response => {
    //     console.log('GOOD RES.STATUS: ',response.status);
    //     expect(response.statusCode).toEqual(200);
    //   })
    //   .catch(err => {
    //     console.log('ERR ',err);
    //   });
  });

});