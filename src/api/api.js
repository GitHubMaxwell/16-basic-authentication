'use strict';
import express from 'express';
import Cat from '../models/cats.js';
import Dog from '../models/dogs.js';

import sendJSON from '../middleware/sendJSON.js';
import badReq from '../middleware/badReq.js';
import noId from '../middleware/noId.js';

const router = express.Router();

//dynamic model finder
// import modelFinder from '../middleware/models.js';
// router.param('model', modelFinder);

router.get('/api/v1/cats/:id', (req,res,next) => {
  // GET - test 200, returns a resource with a valid body
  // GET - test 404, respond with 'not found' for valid requests made with an id that was not found
  if(!req.params.id) {
    noId(res);
  }
  //also write something that handles an id given, checked, and not found
  Cat.findById(req.params.id)
    .then( data => sendJSON(res,data))
    .catch( next );
});

router.get('/api/v1/cats', (req, res, next) => {
  Cat.find({})
    .populate('dogs')
    .exec()//this quits the mongoose async / populate is async
    .then( data => {
      res.send(data);})
    .catch( next);
});

//post route for dogs

router.get('/api/v1/dogs', (req, res, next) => {
  Dog.find()
    .populate('cats')
    .exec()//this quits the mongoose async / populate is async
    .then( data => {
      console.log('DATA DOG: ', data);
      sendJSON(data);})
    .catch(err => {
      console.log('ERROR: ', err);
    });
});

router.post('/api/v1/cats', (req,res,next) => {
// POST - test 200, returns a resource for requests made with a valid body
  if(!Object.keys(req.body).length) {
    throw badReq(res);
  }

  let newCat = new Cat(req.body);
  newCat.save()
    .then( data => sendJSON(res,data))
    .catch( next);
});

router.put('/api/v1/cats/:id', (req,res,next) => {
// PUT - test 200, returns a resource with an updated body
// PUT - test 404, responds with 'not found' for valid requests made with an id that was not found
  console.log('PUT REQ.BODY: ', req.body);
  if(!Object.keys(req.body).length) {
    console.log('INSIDE FAILED PUT: ', req.body);
    throw badReq(res);
  }
  if(!req.params.id) {
    noId(res);
    throw err;
  }

  let updateTarget = { _id: `${req.params.id}` };
  let updateContent;

  if(req.body.name){
    updateContent = { name : `${req.body.name}`};
  } else {
    updateContent = { color : `${req.body.color}`};
  }
  Cat.findOneAndUpdate(updateTarget, updateContent)
    .then( data => {
      //update the sendJSON to give back the UPDATED object
      sendJSON(res,data);
    })
    .catch( next );
});

router.delete('/api/v1/cats/:id', (req,res,next) => {
  Cat.remove({_id: `${req.params.id}`})
  //findOneDelete
    .then( data => sendJSON(res,data))
    .catch( next );
});

//i have it named like this to prevent misshaps
router.delete('/api/v1/deleteall/cats', (req,res,next) => {
  Cat.deleteMany({})
    .then( data => sendJSON(res,data))
    .catch( next );
});

export default router;