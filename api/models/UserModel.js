var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  profile_url: String,
  following: [],
  followers: [],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserModel', UserSchema);
