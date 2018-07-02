'use strict';

import express from 'express';
//importing express in order to use the Router constructor
import User from '../models/user.js';
//importing User to have access to make a new user
import auth from '../middleware/middleware.js';
//importing auth to validate/create JWT ???
import badReq from '../middleware/badReq.js';

const router = express.Router();

router.post('/api/signup', (req,res,next) => {
  //if there isnt a req.body send back an error 400
  if(!Object.keys(req.body).length){
    badReq(res);
  }
  //make a new user
  let user = new User(req.body);
  //save the user
  user.save()
  //on successful save send back the user without generateToken method applied to it
    .then(user => {
    //   console.log('USER after HASHING: ', user);
      res.send(user.generateToken());
    })
    //generateToken is a method in User
    .catch(next);
});

router.get('/api/signin', auth, (req, res) => {
  console.log('REQ.BODY ', req.body);
  // if(!Object.keys(req.body).length){
  //   badReq(res);
  // }
  // the auth middleware will run before we even get to the res.cookie part of this code
  res.cookie('Token', req.token);
  res.send('Hi');
});

export default router;