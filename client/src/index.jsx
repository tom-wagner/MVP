import React from 'react';
import ReactDOM from 'react-dom';
import WeatherInfo from './WeatherInfo.jsx'
import RecentQueries from './RecentQueries.jsx'

import axios from 'axios'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {

    }
    this.getAndPostWeather = this.getAndPostWeather.bind(this);
  }

  getAndPostWeather(zip) {
    let options = {
      method: 'POST',
      url: '/weather',
    }
    if (zip) { options.params = { zipCode: zip }}

    return axios(options)
      .then((result) => {

      })
  }

  render () {
    return (
      <div>
        <h1>Do You Need An Umbrella?</h1>
        <WeatherInfo getAndPostWeather={this.getAndPostWeather} />
        <RecentQueries />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));