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
app.post('/weather', function(req, res) {

  // Check for zipCode on POST request
  if (req.body.zipCode !== undefined) {
    var userLocation = req.body.zipCode;
  } else {
    var userLocation = 'autoip';
  }

  let weatherData = {};

  getCurrentConditions(userLocation)
    .then(conditions => {
      weatherData.conditionsResp = conditions.data;
      getForecast(userLocation)
        .then(forecast => {
          weatherData.forecastResp = forecast.data;

          console.log(weatherData.forecastResp.forecast);

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
              elevation: Number(weatherData.conditionsResp.current_observation.display_location.elevation) * 3.28084,
            },
            currentConditions: {
              timestampString: weatherData.conditionsResp.current_observation.observation_time,
              weather: weatherData.conditionsResp.current_observation.weather,
              temp_F: Number(weatherData.conditionsResp.current_observation.temp_f),
              feelsLike_F: Number(weatherData.conditionsResp.current_observation.feelslike_f),
              wind_mph: Number(weatherData.conditionsResp.current_observation.wind_mph),
              wind_gust_mph: Number(weatherData.conditionsResp.current_observation.wind_gust_mph),
              icon: weatherData.conditionsResp.current_observation.icon,
              icon_url: weatherData.conditionsResp.current_observation.icon_url,
              forecastRainOneHr: Number(weatherData.conditionsResp.current_observation.precip_1hr_metric) / 25.4,
              forecastRainToday: Number(weatherData.conditionsResp.current_observation.precip_today_metric) / 25.4
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

          // ADD TO DATABASE:
          save(keyDetails).then(() => {
            console.log('post to database successful!!');

            // set strength requirement based on wind
            if (keyDetails.currentConditions.wind_gust_mph > 30) {
              keyDetails.wind = {
                'strengthReq': 'You will need an incredibly sturdy umbrella today as wind gusts are expected to exceed 30 MPH!!',
                'umbrellaURL': 'http://www.gustbuster.com/image/122458140.png',
                'rec': 'GustBuster ',
                'why': 'With a lifetime warranty and incredible strength, the GustBuster is our pick to literally weather the storm, whether that be a hurricane or a typhoon.'
              }
            } else if (keyDetails.currentConditions.wind_gust_mph > 15) {
              keyDetails.wind = {
                'strengthReq': 'You will need a fairly strong umbrella today as wind gusts are expected to exceed 15 MPH.',
                'umbrellaURL': 'https://cdn.shopify.com/s/files/1/0227/0033/products/Davek_Solo_Umbrella_Open.jpg?v=1518984397',
                'rec': 'DAVEK SOLO',
                'why': 'Power and grace all in an umbrella that fits in your carry-on bag. Truly a great umbrella.'
              }
            } else {
              keyDetails.wind = {
                'strengthReq': 'Any umbrella should do as it is not expected to be that windy today. Have a splendid day!',
                'umbrellaURL': 'http://www.ocanadagear.com/graphics/umbrella-hat1.jpg',
                'rec': 'Canada Umbrella Hat',
                'why': 'The ultimate mix of style and utility. With a Canada umbrella hat you\'ll look great and your hands will still be free!'
              }
            }

            // set strings for whether an umbrella is required
            keyDetails.umbrellaReq = {
              'today': keyDetails.currentConditions.forecastRainToday > 0 ? true : false,
              'day2': keyDetails.forecast.day1.rain_all_day > 0 ? true : false,
              'day3': keyDetails.forecast.day1.rain_all_day > 0 ? true : false
            }

            keyDetails.strings = {
              'today': keyDetails.umbrellaReq.today ? 'You will need an umbrella today as' : 'You will not need an umbrella as',
              'day2': keyDetails.umbrellaReq.day2 ? 'You will need an umbrella tomorrow as' : 'You will not need an umbrella tomorrow!',
              'day3': keyDetails.umbrellaReq.day3 ? 'Make sure to grab your umbrella!' : 'No umbrella required!'
            }


            res.status(200).send(keyDetails);
          })
          .catch((err) => {
            console.log('err line98 on server', err);
          });

        });
    })
    .catch(err => {
      console.error('console logging err server-side line 104', err);
      res.status(500).send('server issues');
    })
});

// React fires off GET request at page load for recent data
app.get('/recentQueries', function(req, res) {
  getRecords().then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    console.log(err);
    res.status(500).send('Server error!!');
  })

});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

