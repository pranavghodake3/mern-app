var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TweetModelSchema = new Schema({
  content: String,
  user: { type: Schema.Types.ObjectId, ref: 'UserModel' },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TweetModel', TweetModelSchema);
