import {
  Mockgoose,
} from 'mockgoose';
// mockgoose wraps itself around mongoose model so instead of interacting with Mongo itll interact with mockgoose and only test in memory but LIKE mongo
import mongoose from 'mongoose';

// import supertest from 'supertest';
/////////// not uppercase {Server}???
// import {server} from '../../../src/app.js';
// const mockRequest = supertest(server);

// jest.setTimeout(10000);
//try with 30seconds
//has set to 30000 in video

const mockgoose = new Mockgoose(mongoose);

import Cat from '../../../src/models/cats_model.js';
//when you do an import you can call it whatever you want

// const API_URL = '/api/v1/cats';

afterAll(() => {
  mongoose.connection.close();
  console.log('CLOSED Mongoose Connection');
});

describe('CAT MODEL', () => {
  //beforeAll / check to see what your IP address is / mongoose says to use either:
  // 127.0.0.1
  // localhost
  // also is the URI supposed to be just cats or api/v1/cat(s)???
  // eventually have API_URL

  beforeAll((done) => {
    mockgoose.prepareStorage().then(() => {
      mongoose.connect('mongodb://127.0.0.1/cat').then(() => {
        done();
      });
    });
  });

  afterEach((done) => {
    mockgoose.helper.reset().then(done);
    //i had this accidentally as mongoose.helper...
  });

  //need a done in it because it involves asynchornous
  //dont foget to put one in the catch
  it('should give an empty array back', () => {
    return Cat.find().then(data => {
      // fail('FAILED');
      //always put a fail with async code tests 
      console.log('PASSS');
      expect(data).toEqual([]);
    })
      .catch(err => {
        console.log('ERROORRRRRR ',err);
      });
    // expect(mockRequest).toBeDefined();
  });

  //   xit('check if mockRequest exists', () => {
  //     expect(mockRequest).toBeDefined();
  //   });

  //async code passes without handling the promises with return or done
  it('should create a new cat', () => {
    let cat =  new Cat ({name: 'MAX', color: 'brown'});

    return cat.save().then(data => {
      console.log('POST Success DATA ', data);
      expect(data.name).toEqual('MAX');
    })
      .catch(err => {
        console.error('POST ERROR ',err);
        expect(false).toBe(true);
      });
  });


  it('should get a collection of created singers', () => {
    let newCat = {name: 'John', color: 'white'};
    // rather than new Cat({info}) you can do Cat.create(newCat)
    // you NEED a return before Cat.create
    return Cat.create(newCat).then(data => {
      expect(data.name).toBe(newCat.name);
      expect(data.color).toBe(newCat.color);
      //the above tests to see if we created a new one
      //so below we want to make sure it shows up in the list
      
      return Cat.find().then(data => {
        console.log('POST Success DATA ', data);
        expect(data[0].name).toBe('John');
        expect(data[0].color).toBe('white');
        expect(data.length).toEqual(1);
      })
        .catch(err => {
          console.error('ERROR ',err);
          expect(false).toBe(true);
        });
    });
  });

  it('should find one by id', () => {
    let newCat = {name: 'Danny', color: 'black'};

    return Cat.create(newCat).then(data => {
      expect(data.name).toBe(newCat.name);
      expect(data.color).toBe(newCat.color);
      //the above tests to see if we created a new one
      //so below we want to make sure it shows up in the list
      return Cat.findById(data._id).then(data => {
        console.log('DATA ID success ', data._id);
        expect(data.name).toBe('Danny');
      }).catch(err => {
        console.error('ERROR ',err);
        expect(false).toBe(true);
      });
    });
  });

});