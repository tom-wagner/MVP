import React from 'react';
import ReactDOM from 'react-dom';

function RecentQueries({recentQueries}) {
  
  if (recentQueries.length) {
    const listItems = recentQueries.map((query) => {
      return (
        <li key={query._id} >User Location: {query.cityInfo.cityName}
          <ul>
            <li>Temperature: {query.currentConditions.temp_F}{'\xB0'}</li>
            <li>Feels like: {query.currentConditions.feelsLike_F}{'\xB0'}</li>
            <img src={query.currentConditions.icon_url} alt=""/>
          </ul>
        </li>
      );
    });

    return (
      <div className="recentQueries">
        <h2>Weather for other recent "Do You Need An Umbrella?" Users:</h2>
        <div>
          <ul>
            {listItems}
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{'marginTop': '15px'}}>
        Please wait while other recent queries load!
      </div>
    );
  }
  
}

module.exports = RecentQueries;