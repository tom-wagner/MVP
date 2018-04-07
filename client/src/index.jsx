import React from 'react';
import ReactDOM from 'react-dom';
import WeatherInfo from './WeatherInfo.jsx'
import RecentQueries from './RecentQueries.jsx'

import axios from 'axios'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      weatherData: {
        'stillLoading': true
      },
      recentQueries: [],
      averageOfLastTenQueries: null
    }
    this.getAndPostWeather = this.getAndPostWeather.bind(this);
  }

  getAndPostWeather(zipCode) {
    console.log('firing!!');
    let options = {
      method: 'POST',
      url: '/weather',
    }
    if (typeof zipCode === 'string') { options.data = { zipCode: zipCode }}
    return axios(options)
      .then((result) => {
        this.setState({
          weatherData: result.data
        });
        console.log('weatherData', this.state.weatherData);
        this.getRecentQueries();
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

        // DETERMINE AVERAGE OF LAST TEN QUERIES
        var cumulativeTemp = 0;
        for (var i = 1; i < results.data.length; i++) {
          cumulativeTemp += results.data[i].currentConditions.temp_F;
        }
        var averageOfLast10 = (cumulativeTemp / (results.data.length - 1)).toFixed(2) / 1;

        this.setState({
          recentQueries: results.data.slice(1),
          averageOfLastTenQueries: averageOfLast10
        })
        console.log('queries', this.state);
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount() {
    this.getAndPostWeather();
  }

  render() {
    return (
      <div>
        <WeatherInfo getAndPostWeather={this.getAndPostWeather}
                     weatherData={this.state.weatherData}
                     average={this.state.averageOfLastTenQueries}
        />
        <RecentQueries recentQueries={this.state.recentQueries} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
