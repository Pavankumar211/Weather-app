import React, { useState } from 'react';

const api = {
  key: "5a2825bd3f03e7c095a94ef00da0c306",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {

  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState('')
  
  const search = e => {
    if(e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={((typeof weather.main != "undefined") && weather.main.temp > 28) ? "app-main": "app" }>
      <main>
        <div className="search-box">
          <input 
            type = "text"
            placeholder = "search..."
            className = "search-bar"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location"> {weather.name}, {weather.sys.country} </div>
              <div className="date"> {dateBuilder(new Date())} </div>
            </div>
            <div className = "weather-box">
              <div className="temp">{Math.floor(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
          ) : (<div className="unknown-location">Enter any location ?</div>)  }
        
      </main>
    </div>
  );
 
}

export default App;
