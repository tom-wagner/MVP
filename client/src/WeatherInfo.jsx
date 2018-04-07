import React from 'react';
import ReactDOM from 'react-dom';

function WeatherInfo({getAndPostWeather}) {
  return (
    <div>
      <p>This is the WeatherInfo div!!</p>
      <input type="submit" value="submit" onClick={getAndPostWeather} />
    </div>
  );
}


module.exports = WeatherInfo;