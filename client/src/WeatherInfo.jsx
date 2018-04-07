import React from 'react';
import ReactDOM from 'react-dom';

class WeatherInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      userInput: null
    });
    
  }
  


  render() {
    if (this.props.weatherData.stillLoading === true) {
      return (
        <div className="weatherInfo">Please wait momentarily while the page loads!</div>
      );
    } else {
      return (
        <div className="weatherInfo">
          <h1>Will You Need an Umbrella Today?</h1>
          <div className="doYouNeedOne">
            <h4>Umbrella Analysis:</h4>
            <p>Analysis conducted for: {this.props.weatherData.cityInfo.cityName}, {this.props.weatherData.cityInfo.state}</p>

          </div>
          <div className="howStrong">
            <h4>How Strong Does Your Umbrella Need to Be?</h4>
          </div>
          <div className="today">
            <h4>Today's Full Forecast:</h4>
          </div>
          <div className="threeDay">
            <h4>Three-day Outlook:</h4>
          </div>
          <div className="userInput">
            <h4>Check the weather for a different location:</h4>
            <input type="submit" value="Check The Weather For Your Current Location!" onClick={() => {getAndPostWeather()}} />
          </div>
        </div>
      );
    }
  }
}

// function WeatherInfo({getAndPostWeather, weatherData}) {

//   if (weatherData.stillLoading === true) {
//     return (
//       <div>Please wait momentarily while the page loads!</div>
//     );
//   } else {
//     return (
//       <div>
//         <h1>Will Need an Umbrella Today?</h1>
//         <p>Umbrella Analysis Conducted For: {weatherData.cityInfo.cityName}, {weatherData.cityInfo.state}</p>
//         <div class="doYouNeedOne">

//         </div>
//         <div class="doYouNeedOne">

//         </div>
//         <input type="submit" value="Check The Weather For Your Current Location!" onClick={() => {getAndPostWeather()}} />
//       </div>
//     );
//   }


// }


module.exports = WeatherInfo;