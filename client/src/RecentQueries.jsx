import React from 'react';
import ReactDOM from 'react-dom';

function RecentQueries({recentQueries}) {
  
  if (recentQueries.length) {
    const listItems = recentQueries.map((query) => {
      console.log(query);
      return (
        <li>{query.cityInfo.cityName}</li>
      )
    });
    // console.log('rQ', recentQueries);

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