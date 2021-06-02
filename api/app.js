const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
const port = 9001;
const connectionUrl = 'mongodb+srv://pranavghodake:Pranav123@cluster0.kadev.mongodb.net/pranav-twitter?retryWrites=true&w=majority';
var TweetModel = require('./models/TweetModel');
var UserModel = require('./models/UserModel');

// Middlewares
app.use(cors());
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use(express.json());


// DB Connection
mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// Endpoints
app.get('/', (req, res)=>{
    res.status(200).send({name: "Hello Bro"});
})

app.get('/tweets', (req, res)=>{
  // Tweet.find().lean().exec(function (err, tweets) {
  //   res.status(200).send(tweets);
  // });


  let tweets = [
    {
      id: 1,
      user: {
        id: 1,
        name: 'Pranav',
        email: 'pranavghodake',
        profile: 'http://localhost:9001/images/user1.jpeg'
      },
      content: 'Going on walks, meeting up with friends, the pandemic robbed them of all the little things that gave them happiness. So, make an effort, have a wholehearted conversation with them and bring out the most beautiful thing in this world - their smiles'
    },
    {
      id: 2,
      user: {
        id: 2,
        name: 'Sid',
        email: 'sidghodake',
        profile: 'http://localhost:9001/images/user2.png'
      },
      content: 'Sid tweet gdsfg dsfg sdfg sd fgds fg dsf gsd fgdsfgdsfg ertertegwe rgwewew wegwerg ewrg wergeerge er guergu erg u ewru urg erg heurhgherugh oheuurhg iuherogihwoer erh herighoerh ehrg herugh oerhgherogh'
    }
  ];
  res.status(200).send(tweets);
})

app.post('/tweets', (req, res)=>{
  var tweet_instance = new TweetModel({ content: req.body.content });

  tweet_instance.save(function (err) {
    if (err) return handleError(err);
    res.send(req.body);
  });
})

app.post('/createusers', (req, res)=>{
  var user_instance = new UserModel({ 
    name: req.body.name,
    email: req.body.email,
    profile: req.body.profile
  });

  user_instance.save(function (err) {
    if (err) return handleError(err);
    res.send(req.body);
  });
})


// Listen
app.listen(port, function (req, res){
    console.log("Running http://localhost:"+port);
});