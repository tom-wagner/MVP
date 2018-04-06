var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var {save, getRecords} = require(path.join(__dirname, '/database/db.js'));
var {getForecast, getCurrentConditions} = require(path.join(__dirname, '/helpers/API_calls.js'));

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())



// React fires off GET request at page load for current location
  // req.body.zipCode --> user location
app.post('/Conditions_And_Forecast', function(req, res) {
  var userLocation = req.body.zipCode || 10029;

  let weatherData = {};

  getCurrentConditions(userLocation)
    .then(conditions => {
      console.log('conditions!!');
      weatherData.conditionsResp = conditions.data;
      getForecast(userLocation)
        .then(forecast => {
          console.log('forecast!!');
          weatherData.forecastResp = forecast.data;

          console.log(weatherData);

          // FORMAT OBJECT TO BE SENT TO THE DATABASE:
          var keyDetails = {
            cityInfo: {
              cityName: weatherData.conditionsResp.current_observation.display_location.city,
              state: weatherData.conditionsResp.current_observation.display_location.state,
              country: weatherData.conditionsResp.current_observation.display_location.country,
              zip: Number(weatherData.conditionsResp.current_observation.display_location.zip),
              tz_short: weatherData.conditionsResp.current_observation.local_tz_short,
              lat: Number(weatherData.conditionsResp.current_observation.observation_location.latitude),
              lon: Number(weatherData.conditionsResp.current_observation.observation_location.longitude),
              elevation: weatherData.conditionsResp.current_observation.observation_location.elevation,
            },
            currentConditions: {
              timestamp: weatherData.forecastResp.forecast.txt_forecast.date,
              temp_F: Number(weatherData.conditionsResp.current_observation.temp_f),
              feelsLike_F: Number(weatherData.conditionsResp.current_observation.feelslike_f),
              wind_mph: Number(weatherData.conditionsResp.current_observation.wind_mph),
              wind_gust_mph: Number(weatherData.conditionsResp.current_observation.wind_gust_mph),
              icon: weatherData.conditionsResp.current_observation.icon,
              icon_url: weatherData.conditionsResp.current_observation.icon_url,
              forecastRainOneHr: Number(weatherData.conditionsResp.current_observation.precip_1hr_in),
              forecastRainToday: Number(weatherData.conditionsResp.current_observation.precip_today_in)
            },
            forecast: {
              current: {
                title: weatherData.forecastResp.forecast.txt_forecast.forecastday[0].title,
                description: weatherData.forecastResp.forecast.txt_forecast.forecastday[0].fcttext,
                icon: weatherData.forecastResp.forecast.txt_forecast.forecastday[0].icon,
                icon_url: weatherData.forecastResp.forecast.txt_forecast.forecastday[0].icon_url,
              },
              day1: {
                epoch: Number(weatherData.forecastResp.forecast.simpleforecast.forecastday[0].date.epoch),
                date_string: weatherData.forecastResp.forecast.simpleforecast.forecastday[0].date.pretty,
                high: Number(weatherData.forecastResp.forecast.simpleforecast.forecastday[0].high.fahrenheit),
                low: Number(weatherData.forecastResp.forecast.simpleforecast.forecastday[0].low.fahrenheit),
                conditions: weatherData.forecastResp.forecast.simpleforecast.forecastday[0].conditions,
                icon: weatherData.forecastResp.forecast.simpleforecast.forecastday[0].icon,
                icon_url: weatherData.forecastResp.forecast.simpleforecast.forecastday[0].icon_url,
                rain_all_day: Number(weatherData.forecastResp.forecast.simpleforecast.forecastday[0].qpf_allday.in)
              },
              day2: {
                epoch: Number(weatherData.forecastResp.forecast.simpleforecast.forecastday[1].date.epoch),
                date_string: weatherData.forecastResp.forecast.simpleforecast.forecastday[1].date.pretty,
                high: Number(weatherData.forecastResp.forecast.simpleforecast.forecastday[1].high.fahrenheit),
                low: Number(weatherData.forecastResp.forecast.simpleforecast.forecastday[1].low.fahrenheit),
                conditions: weatherData.forecastResp.forecast.simpleforecast.forecastday[1].conditions,
                icon: weatherData.forecastResp.forecast.simpleforecast.forecastday[1].icon,
                icon_url: weatherData.forecastResp.forecast.simpleforecast.forecastday[1].icon_url,
                rain_all_day: Number(weatherData.forecastResp.forecast.simpleforecast.forecastday[1].qpf_allday.in)
              },
              day3: {
                epoch: Number(weatherData.forecastResp.forecast.simpleforecast.forecastday[2].date.epoch),
                date_string: weatherData.forecastResp.forecast.simpleforecast.forecastday[2].date.pretty,
                high: Number(weatherData.forecastResp.forecast.simpleforecast.forecastday[2].high.fahrenheit),
                low: Number(weatherData.forecastResp.forecast.simpleforecast.forecastday[2].low.fahrenheit),
                conditions: weatherData.forecastResp.forecast.simpleforecast.forecastday[2].conditions,
                icon: weatherData.forecastResp.forecast.simpleforecast.forecastday[2].icon,
                icon_url: weatherData.forecastResp.forecast.simpleforecast.forecastday[2].icon_url,
                rain_all_day: Number(weatherData.forecastResp.forecast.simpleforecast.forecastday[2].qpf_allday.in)
              }
            }
          }

          console.log('getting here!!', keyDetails);

          // ADD TO DATABASE:
          save(keyDetails).then(() => {
            console.log('post to database successful!!')
            res.status(200).send(weatherData);
          })
          .catch((err) => {
            console.log('err line98:', err);
          });

        });
    })
    .catch(err => {
      console.error('console logging err server-side', err);
      res.status(500).send('server issues');
    })
});

app.post('/specificLocation', function(req, res) {

});




app.listen(3000, function() {
  console.log('listening on port 3000!');
});

