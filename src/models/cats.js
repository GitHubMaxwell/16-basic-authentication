//////////////////////////////////////////////////////////////////////


import mongoose from 'mongoose';
const Cat = mongoose.Schema({
  name: { type: String, uppercase: true, required:true },
  color: { type: String, uppercase: true, required:true },

});

export default mongoose.model('cats', Cat);



//////////////////////////////////////////////////////////////////////
// need to obliterate all the data to test the get and post etc
// but you dont want to do that so you have a test DB
// DO THE BELOW
//////////////////////////////////////////////////////////////////////
// import mongoose, {Schema} from 'mongoose';

// const schema = Schema({
//   name: { type: String, default: 'Garfield', required:true },
//   color: { type: String, required:true },
// });

// this is important when deploying
// const skipInit = process.env.NODE_ENV === 'test';

// export default mongoose.model('Cat', schema, 'cat', skipInit);