// import mongoose from 'mongoose';
import mongoose, {Schema} from 'mongoose';

const Dog = mongoose.Schema({
  name: { type: String, uppercase: true, required:true },
  color: { type: String, uppercase: true, required:true },
  //will make the dog constructor have a cat, what, youve never heard of Catdog

  ////////////////////////////////////////////

  //this wont have all the Cat data in it it will just have the Cat id
  //make sure the refs name is either Cat or cats / check the docs

  cat : {type: Schema.Types.ObjectId, ref : 'cats'},

  ////////////////////////////////////////////
});

export default mongoose.model('dogs', Dog);
//dogs is the name of the schemas