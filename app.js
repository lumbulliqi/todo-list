var express = require('express');
var path = require('path');
// init app
var app = express();
// end init app
var bodyParser= require('body-parser');
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// end Body parser middleware
// setup template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
// end setup template engine
// mongodb setup
const MongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb://localhost:27017/todo';
//end mongodb setup
// connect mongodb
MongoClient.connect(mongoURL, function(err, database){
  console.log('MongoDB Connected');
  if(err){
      console.log(err);
  }
  todos = database.collection('todos')
});
// end connect mongodb
// routes
app.get('/', function(req, res){
  todos.find({}).toArray(function(err, docs){
    console.log(docs);
    if (err) {
      console.log(err);
    }
    res.render('index', {docs: docs});
  })
});

app.get('/todos/edit/:id', function(req, res){
  res.render('show');
});

app.get('/todos/:id', function(req, res){
  res.render('show');
});

app.post('/todos/add', function(req, res){
  todos.insert({title: req.body.title, description: req.body.description}, function(err, result){
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  })
});

app.post('/todos/update/:id', function(req, res){
  res.redirect('/');
});
app.get('/todos/delete/:id', function(req, res){
  res.redirect('/');
});
// end routes


app.listen(5000, function(){
  console.log('App listening at http://localhost:5000');
});
