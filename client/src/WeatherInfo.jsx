import React from 'react';
import ReactDOM from 'react-dom';

function WeatherInfo({getAndPostWeather, weatherData}) {

  return (
    <div>
      {/* <h4>Current Weather: {weatherData.cityInfo.cityName}</h4> */}
      {/* <h4>Current Weather: {weatherData.cityInfo.cityName}, {weatherData.cityInfo.state || weatherData.cityInfo.country}</h4> */}
      <input type="submit" value="Check The Weather For Your Current Location!" onClick={() => {getAndPostWeather()}} />
    </div>
  );

}


module.exports = WeatherInfo;