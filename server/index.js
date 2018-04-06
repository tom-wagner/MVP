var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var db = require(path.join(__dirname, '/database/db.js'));
var helpers = require(path.join(__dirname, '/helpers/API_calls.js'));



var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.post('/', function(req, res) {
  
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});