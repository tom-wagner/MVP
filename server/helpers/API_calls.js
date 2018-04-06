// ZIP CODE: http://api.wunderground.com/api/key/forecast10day/q/10029.json

// USER LOCATION: http://api.wunderground.com/api/key/forecast10day/q/autoip.json

// Resources: https://apigee.com/resources/wunderground?apig_cc=1

// More resources: https://www.wunderground.com/weather/api/d/docs?d=index

var axios = require('axios');
var {apiKey} = require('../../config.js');

function getCurrentConditions(zip, callback) {
  return axios({
    method: 'GET',
    url: `http://api.wunderground.com/api/${apiKey}/conditions/q/${zip}.json`,
    responseType: 'blob'
  })
}

function getForecast(zip = 'autoip') {
  return axios({
    method: 'GET',
    url: `http://api.wunderground.com/api/${apiKey}/forecast/q/${zip}.json`
  })
}

exports.getForecast = getForecast;
exports.getCurrentConditions = getCurrentConditions;









