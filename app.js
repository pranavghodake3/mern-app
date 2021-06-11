global.__base = __dirname + '/';
const express = require('express');
const mongoose = require('mongoose');
const app = express();
var cors = require('cors');
const port = 9002;
const connectionUrl = 'mongodb+srv://pranavghodake:Pranav123@cluster0.kadev.mongodb.net/pranav-twitter?retryWrites=true&w=majority';

// Middlewares
console.log('Global base path: '+__base)
app.use(cors());
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/tweets', require('./routes/tweets'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));


// DB Connection
mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// Endpoints
app.get('/', (req, res)=>{
    res.status(200).json({name: "Welcome to the Twitter APIs in express js."});
})

// Listen
app.listen(port, function (req, res){
    console.log("Running http://localhost:"+port);
});