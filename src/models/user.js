'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  // username/password has been passed in from the client as raw text text so its unencrypted
  username: {type: String, required: true, unique:true},
  password: {type: String, required: true},
});

//with pre you pass next in in the CB
//mongoose middleware
userSchema.pre('save', function(next) {
  //the pre (mongoose) prevents the save from happening untill the code below is run
  //before we save and stor in the DB we need to do some extra stuff
  //so in order to not break rule of storing unencrypted passwords we need to hash the password
  //bcrypt.hash(text, rounds youre hashing)
  bcrypt.hash(this.password,10)
  //returns a promise that resolves to the hashed password
    .then(hashedPassword => {
      // the raw text version doesnt really exist anymore so we re-assign the this.password field to the newly hashed password
      this.password = hashedPassword;
      //this next is makes the action continue onto saving
      next();
    })
    .catch( error => {throw error;});
});

userSchema.statics.authenticate = function(auth) {
  let query = {username:auth.username};
  return this.findOne(query)
    .then(user => user && user.comparePassword(auth.password))
    .catch(error => {throw error;});
};

//whats wrong with methods
userSchema.methods.comparePassword = function(password) {
  //using bcrypt library's method compare that takes in the raw text entered attempted password and compares it with the hashed password
  
  //this returns a promise that returns the contextual "this" but if valid resolves to false then it returns null which also resolves to false and will probably end up in a .catch()
  //the unencrypted password hopefully is being send over HTTPS
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
};

//whats wrong with methods
userSchema.methods.generateToken = function() {
  //whats going on with the jwt dependency and the sign method
  // a way of generating an identifier that says that it has checked and confirmed your password and youll be able to hold that client-side for an amount of time
  //dont want anyone to have access to that identifier
  // it will be signed and the process will use the SECRET
  return jwt.sign({id:this._id}, process.env.APP_SECRET || 'change it');
};

export default mongoose.model('users', userSchema);
