// ZIP CODE: http://api.wunderground.com/api/key/forecast10day/q/10029.json

// USER LOCATION: http://api.wunderground.com/api/key/forecast10day/q/autoip.json

// Resources: https://apigee.com/resources/wunderground?apig_cc=1

// More resources: https://www.wunderground.com/weather/api/d/docs?d=index

var axios = require('axios');
// if (!process.env.aiKey) {
//   var {apiKey} = require('../../config.js');
}

function getCurrentConditions(zip) {
  return axios({
    method: 'GET',
    url: `http://api.wunderground.com/api/${process.env.apiKey || apiKey}/conditions/q/${zip}.json`,
    responseType: 'blob'
  })
}

function getForecast(zip) {
  return axios({
    method: 'GET',
    url: `http://api.wunderground.com/api/${process.env.apiKey || apiKey}/forecast/q/${zip}.json`
  })
}

exports.getForecast = getForecast;
exports.getCurrentConditions = getCurrentConditions;









