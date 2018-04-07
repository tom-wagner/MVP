import React from 'react';
import ReactDOM from 'react-dom';

class WeatherInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      userInput: ''
    });
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({userInput: event.target.value});
  }

  render() {
    if (this.props.weatherData.stillLoading === true) {
      return (
        <div className="weatherInfo">Please wait momentarily while the page loads!</div>
      );
    } else {

      var defaultDivStyle = {
        'margin': '10px',
        'padding': '10px',
        'border': '3px solid black',
      }

      // CONDITIONALLY CONFIGURE UMBRELLA ANALYSIS
      if (this.props.weatherData.currentConditions.forecastRainToday > 0) {
        var divStyle = {
          'backgroundColor': '#f4f142',
          'border': '3px solid red',
          'margin': '10px',
          'padding': '10px'
        }
        var umbrellaAnalysis = (
          <div style={divStyle} className="rain">
            <h4>Umbrella Analysis:</h4>
            <p>Analysis conducted for: {this.props.weatherData.cityInfo.cityName}, {this.props.weatherData.cityInfo.state}</p>
            <p className="todayResult"><b>{this.props.weatherData.strings.today} {this.props.weatherData.currentConditions.forecastRainToday.toFixed(2)}" of rain is expected today.</b></p>
          </div>
        )
      } else {
        var divStyle = {
          'backgroundColor': '#3bf22e',
          'border': '3px solid black',
          'margin': '10px',
          'padding': '10px'
        } 
        var umbrellaAnalysis = (
          <div style={divStyle} className="noRain">
            <h4>Umbrella Analysis:</h4>
            <p>Analysis conducted for: {this.props.weatherData.cityInfo.cityName}, {this.props.weatherData.cityInfo.state}</p>
            <p className="todayResult"><b>{this.props.weatherData.strings.today} {this.props.weatherData.currentConditions.forecastRainToday.toFixed(2)}" of rain is expected today.</b></p>
          </div>
        )
      }

      // CONDITIONALLY CONFIGURE AVERAGE TEMP DIV
      if (this.props.weatherData.currentConditions.temp_F > this.props.average) {
        var tempDiv = (
          <div>
          <div>
            <p style={{'color': 'red'}}><b>Lucky you!!! The current temp in {this.props.weatherData.cityInfo.cityName} of {this.props.weatherData.currentConditions.temp_F}{'\xB0'} is warmer than the average temp of recent queries by other users, {this.props.average}{'\xB0'}.</b></p>
          </div>
          </div>
        );
      } else {
        var tempDiv = (
          <div>
            <p style={{'color': 'blue'}}><b>Brrrrrrr!!! The current temp in {this.props.weatherData.cityInfo.cityName} of {this.props.weatherData.currentConditions.temp_F}{'\xB0'} is colder than the average temp of recent queries by other users, {this.props.average}{'\xB0'}.</b></p>
          </div>
        );
      }

      // CONDITIONALLY CONFIGURE UMBRELLA DIV
      if (this.props.weatherData.currentConditions.forecastRainToday > 0) {
        var umbrellaDiv = (
          <div style={defaultDivStyle} className="howStrong">
            <h4>How Strong Does Your Umbrella Need to Be?</h4>
            <p className="strengthResult">{this.props.weatherData.wind.strengthReq}</p>
            <p className="rec">Given the wind we recommend the {this.props.weatherData.wind.rec}</p>
            <img style={{ "display": "inline", "width": "25%", "height": "25%" /* "float": "right" */}} className="umbrellaPic" src={this.props.weatherData.wind.umbrellaURL} alt=""/>
            <p className="recBasis">What people are saying: <i>"{this.props.weatherData.wind.why}"</i></p>
          </div>
        )
      } else {
        var umbrellaDiv = (
          <div></div>
        )
      }


      // RENDER
      return (
        <div className="weatherInfo">
          <div style={{'margin': '10px', 'padding': '10px'}}>
            <h2>Will You Need an Umbrella Today?</h2>
          </div>
          {umbrellaAnalysis}
          {umbrellaDiv}
          <div style={defaultDivStyle} className="today">
            <h4>Today's Full Forecast:</h4>
            <p>Current Conditions: {this.props.weatherData.currentConditions.weather}</p>
            <img src={this.props.weatherData.currentConditions.icon_url} alt=""/>
            <p>Current Temperature: {this.props.weatherData.currentConditions.temp_F}{'\xB0'}</p>
            {tempDiv}
            <p>Feels Like{'\u2122'}: {this.props.weatherData.currentConditions.temp_F}{'\xB0'}</p>
            <p>Wind: {this.props.weatherData.currentConditions.wind_mph} MPH</p>
            <p>Today's Outlook: {this.props.weatherData.forecast.current.description}</p>
            <p><i>Forecast {this.props.weatherData.currentConditions.timestampString}</i></p>
          </div>
          {/* <div className="threeDay">
            <h4>Three-day Outlook:</h4>
          </div> */}
          <div style={defaultDivStyle} className="userInput">
            <h2>Check the weather for a different location:</h2>
            Zip Code: <input type="text" /*defaultValue="Enter a ZipCode"*/ value={this.state.userInput} onChange={this.handleChange}/>
            <input type="submit" value="Submit" onClick={() => {this.props.getAndPostWeather(this.state.userInput)}} />
          </div>
        </div>
      );
    }
  }
}

module.exports = WeatherInfo;