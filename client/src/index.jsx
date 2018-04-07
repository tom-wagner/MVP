import React from 'react';
import ReactDOM from 'react-dom';
import WeatherInfo from './WeatherInfo.jsx'
import RecentQueries from './RecentQueries.jsx'

import axios from 'axios'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      weatherData: {},
      recentQueries: []
    }
    this.getAndPostWeather = this.getAndPostWeather.bind(this);
  }

  getAndPostWeather(zipCode) {
    let options = {
      method: 'POST',
      url: '/weather',
    }
    // console.log('this is zip: ', zipCode);
    if (typeof zipCode === 'number') { options.data = { zipCode: zipCode }}

    return axios(options)
      .then((result) => {
        this.setState({
          weatherData: result.data
        });
        console.log('weatherData', this.state.weatherData);
      })
      .catch(err => {
        console.log(err);
      })
  }

  getRecentQueries() {
    let options = {
      method: 'GET',
      url: '/recentQueries'
    }
    return axios(options)
      .then((results) => {
        this.setState({
          recentQueries: results
        })
        console.log('queries', this.state.recentQueries);
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount() {
    this.getAndPostWeather();
    this.getRecentQueries();
  }

  render() {
    return (
      <div>
        <h1>Do You Need An Umbrella?</h1>
        <WeatherInfo getAndPostWeather={this.getAndPostWeather} weatherData={this.state.weatherData} />
        <RecentQueries recentQueries={this.state.recentQueries} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));





var dummyData = {
  "cityInfo": {
      "cityName": "Denver",
      "state": "CO",
      "country": "US",
      "zip": 80218,
      "tz_short": "MDT",
      "lat": 39.73,
      "lon": -104.97,
      "elevation": 5298.884684
  },
  "currentConditions": {
      "timestampString": "Last Updated on April 6, 8:35 PM MDT",
      "weather": "Overcast",
      "temp_F": 25.2,
      "feelsLike_F": 25,
      "wind_mph": 0,
      "wind_gust_mph": 0,
      "icon": "cloudy",
      "icon_url": "http://icons.wxug.com/i/c/k/nt_cloudy.gif",
      "forecastRainOneHr": 0,
      "forecastRainToday": 0.03937007874015748
  },
  "forecast": {
      "current": {
          "title": "Friday",
          "description": "Chance of snow showers early. Lows overnight in the mid 20s.",
          "icon": "chancesnow",
          "icon_url": "http://icons.wxug.com/i/c/k/chancesnow.gif"
      },
      "day1": {
          "epoch": 1523062800,
          "date_string": "7:00 PM MDT on April 06, 2018",
          "high": 49,
          "low": 24,
          "conditions": "Chance of Snow",
          "icon": "chancesnow",
          "icon_url": "http://icons.wxug.com/i/c/k/chancesnow.gif",
          "rain_all_day": 0.01
      },
      "day2": {
          "epoch": 1523149200,
          "date_string": "7:00 PM MDT on April 07, 2018",
          "high": 60,
          "low": 41,
          "conditions": "Mostly Cloudy",
          "icon": "mostlycloudy",
          "icon_url": "http://icons.wxug.com/i/c/k/mostlycloudy.gif",
          "rain_all_day": 0.13
      },
      "day3": {
          "epoch": 1523235600,
          "date_string": "7:00 PM MDT on April 08, 2018",
          "high": 62,
          "low": 37,
          "conditions": "Chance of Rain",
          "icon": "chancerain",
          "icon_url": "http://icons.wxug.com/i/c/k/chancerain.gif",
          "rain_all_day": 0.02
      }
  },
  "time": "2018-04-07T02:35:48.255Z",
  "_id": "5ac82e844fe7b048adb95741",
  "created_at": "2018-04-07T02:35:48.263Z",
  "updatedAt": "2018-04-07T02:35:48.263Z",
  "__v": 0
}