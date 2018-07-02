'use strict';
import {
  Mockgoose,
} from 'mockgoose';
import mongoose from 'mongoose';
import supertest from 'supertest';
import {server} from '../../../src/app.js';
const mockRequest = supertest(server);
const mockgoose = new Mockgoose(mongoose);
require('dotenv').config();

jest.setTimeout(60000);

afterAll( () => {
  mongoose.connection.close();
});

describe('AUTH MODULE', () => {

  beforeAll( (done) => {
    mockgoose.prepareStorage().then(()=>{
      mongoose.connect('mongodb://localhost:27017/lab-16-test').then(()=>{
        done();
      });
    });
  });

  afterEach((done)=>{
    mockgoose.helper.reset().then(done);
  });

  it('POST - test 400, if no request body has been provided or the body is invalid', () => {
    return mockRequest.post('/api/signup')
      // dont give it a .auth
      // .auth()
      // superagent will do all the base64 encoding for us in this .auth
      .catch(response => {
        // console.log('BAD RES.STATUS: ',response.status);
        expect(response.status).toEqual(400);
      });
  });

  it('POST - test 200, if the request body has been provided and is valid', () => {
    let user = {username: 'khoa', password: 'khoawell', email: 'khoa@khoawell.com'};
    return mockRequest.post('/api/signup')
      .send(user)
      .then(response => {
        expect(response.status).toEqual(200);
      });
  });

  it('GET - test 401, if the user could not be authenticated', () => {
    return mockRequest.get('/api/signin')
      .auth('derp','maxwell')
      //superagent will do all the base64 encoding for us in this .auth
      .catch(response => {
        // console.log('BAD RES.STATUS: ',response.status);
        expect(response.status).toEqual(401);
      });
  });

  it('GET - test 200, responds with token for a request with a valid basic authorization header', () => {
    let user = {username: 'khoa', password: 'khoawell', email: 'khoa@khoawell.com'};
    console.log('USER NAME: ', user);

    return mockRequest.post('/api/signup')
      .send(user)
      .then( res => {
        console.log('RES: ', res.status);

        return mockRequest.get('/api/signin')
          .auth('khoa','khoawell')
          .then(response => {
            expect(response.statusCode).toEqual(200);
          });
      });
  });

});