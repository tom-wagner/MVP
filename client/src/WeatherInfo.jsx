import React from 'react';
import ReactDOM from 'react-dom';

class WeatherInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      userInput: ''
    });
    this.handleChange = this.handleChange.bind(this);
    // this.getAndPostWeather = this.props.getAndPostWeather.bind(this);
  }

  handleChange(event) {
    this.setState({userInput: event.target.value})
    console.log(this.state.userInput);
  }

  // btnTapped() {
  //   console.log('clicked!!');
  // }

  render() {
    if (this.props.weatherData.stillLoading === true) {
      return (
        <div className="weatherInfo">Please wait momentarily while the page loads!</div>
      );
    } else {
      return (
        <div className="weatherInfo">
          <h1>Will You Need an Umbrella Today?</h1>
          <div className="doYouNeedOneToday">
            <h4>Umbrella Analysis:</h4>
            <p>Analysis conducted for: {this.props.weatherData.cityInfo.cityName}, {this.props.weatherData.cityInfo.state}</p>
            <p className="todayResult">{this.props.weatherData.strings.today} {this.props.weatherData.currentConditions.forecastRainToday.toFixed(2)} inches of rain is expected today.</p>
          </div>
          <div className="howStrong">
            <h4>How Strong Does Your Umbrella Need to Be?</h4>
            <p className="strengthResult">{this.props.weatherData.wind.strengthReq}</p>
            <p className="rec">Given the wind we recommend the {this.props.weatherData.wind.rec}</p>
            <img style={{ "display": "inline", "width": "25%", "height": "25%" /* "float": "right" */}} className="umbrellaPic" src={this.props.weatherData.wind.umbrellaURL} alt=""/>
            <p className="recBasis">What people are saying: <i>"{this.props.weatherData.wind.why}"</i></p>
          </div>
          <div className="today">
            <h4>Today's Full Forecast:</h4>
            <p>Current Conditions: {this.props.weatherData.currentConditions.weather}</p>
            <img src={this.props.weatherData.currentConditions.icon_url} alt=""/>
            <p>Current Temperature: {this.props.weatherData.currentConditions.temp_F}{'\xB0'}</p>
            <p>Feels Like{'\u2122'}: {this.props.weatherData.currentConditions.temp_F}{'\xB0'}</p>
            <p>Wind: {this.props.weatherData.currentConditions.wind_mph} MPH</p>
            <p>Today's Outlook: {this.props.weatherData.forecast.current.description}</p>
            <p><i>Forecast {this.props.weatherData.currentConditions.timestampString}</i></p>
          </div>
          {/* <div className="threeDay">
            <h4>Three-day Outlook:</h4>
          </div> */}
          <div className="userInput">
            <h4>Check the weather for a different location:</h4>
            <input type="text" /*defaultValue="Enter a ZipCode"*/ value={this.state.userInput} onChange={this.handleChange}/>
            <input type="submit" value="Submit" onClick={() => {this.props.getAndPostWeather(this.state.userInput)}} />
          </div>
        </div>
      );
    }
  }
}

module.exports = WeatherInfo;