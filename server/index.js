var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var db = require(path.join(__dirname, '/database/db.js'));
var {getForecast, getCurrentConditions} = require(path.join(__dirname, '/helpers/API_calls.js'));

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

// React fires off GET request at page load for current location
  // req.body.zipCode --> user location
app.get('/Conditions_And_Forecast', function(req, res) {
  var userLocation = req.body.zipCode || 10029;

  let clientResponse = {};

  getCurrentConditions(userLocation)
    .then(conditions => {
      clientResponse.conditionsResp = conditions.data;
      getForecast(userLocation)
        .then(forecast => {
          console.log('forecast response', forecast);
          clientResponse.forecastResp = forecast.data;
          res.status(200).send(clientResponse);
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('server issues');
    })
});




app.listen(3000, function() {
  console.log('listening on port 3000!');
});

