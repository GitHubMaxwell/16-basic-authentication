'use strict';

import User from '../models/user.js';

export default (req, res, next) => {

  let authenticate = (auth) => {
    User.authenticate(auth)
      .then(user => {
        if(!user) {
          getAuth();
        }
        else {
          //assign req.token the value of the results of generateToken in the user.js file
          req.token = user.generateToken();
          //once complete this next points to???
          next();
        }
      });
  };

  //this is denying the person entry
  let getAuth = () => {
    next({
      status:401,
      statusMessage:'Unauthorized',
      message:'Invalid User ID/Password',
    });
  };

  // this file runs this FIRST, the two above items are just function declarations that may be called later
  // a try says im going to try the code below that MIGHT fail, if it fails catch(e)
  // prevents the need to have a bunch of if this if that just run the code expecting it to work and have the right info and if it doesnt work then catch the error
  try {
    let auth = {};
    // console.log('REQ.HEADERS: ',req.headers);
    // console.log('REQ.HEADERS.Authorization: ',req.headers.authorization);
    let authHeader = req.headers.authorization;
    //req.get.authorization is another way to do this
    //its not req.Authorization??

    if(!authHeader) {
      //if no header then deny them entry
      return getAuth();
    }
    //if there is an authHeader and it matches the case insensitive word "basic" do the logic below
    // theres also "bearer" authentication which we will implement in Lab 17
    if(authHeader.match(/basic/i)){
      // this all PARSES out the authHeader to be used in the authenticate function
      let base64Header = authHeader.replace(/Basic\s+/i, '');
      //this removes the "basic" and leaves the Base64 encoded piece
      let base64Buffer = Buffer.from(base64Header, 'base64');
      //we need to un-encode the Base64 so we use Buffer method from Node to decode base64Header from 'base64' to hex??
      //   console.log('BASE 64 BUFFER: ',base64Buffer);
      let bufferString = base64Buffer.toString();
      //change that 'base64 buffer' into a string
      let [username,password] = bufferString.split(':');
      //some cool array destructuring action
      auth = {username,password};

      //this is the first declartion up top that will take take the newly formed {username,password}
      authenticate(auth);
    }

  }
  catch(e) {
    next(e);
  }

};