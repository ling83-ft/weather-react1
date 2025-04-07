import React, { useState } from "react";
import axios from "axios";
//import Forecast from './Forecast'

export default function Search() {
  let [city, setCity] = useState("");
  let [retrieve, setRetrieved] = useState(false);
  let [weather, setWeather] = useState({});
  let [forecast, setForecast] = useState([]);

  function showTemperature(response) {
    setRetrieved(true);
    let date = new Date(response.data.time * 1000);
    let dayFormat = formatDate(date);
    setWeather({
      city: response.data.city,
      temp: response.data.temperature.current,
      humidity: response.data.temperature.humidity,
      wind: response.data.wind.speed,
      icon: response.data.condition.icon_url,
      condition: response.data.condition.description,
      day: dayFormat,
    });
    getForecast(response.data.city);
    console.log(response.data);
    console.log(forecast);
  }

  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (hours < 10) {
      hours = `0${hours}`;
    }

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }

  function handleSubmit(event) {
    event.preventDefault();

    let api_key = "4a38ba6a1f4e46ao3f0t9673657bc0fc";
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${api_key}`;
    axios.get(url).then(showTemperature);
  }
  function changeCity(event) {
    setCity(event.target.value);
  }

  // function formatDay(timestamp) {
  //   let date = new Date(timestamp * 1000);
  //   let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  //   return days[date.getDay()];
  // }

  function displayForecast(response) {
    response.data.daily.forEach(function (day, index) {
      if (index < 5) {
        setForecast([
          {
            index: index,
            icon_url: day.condition.icon_url,
            temp: day.temperature.maximum,
          },
        ]);
      }
    });

    console.log(response.data);
  }

  function getForecast(city) {
    //call api and search city
    let apiKey = "4a38ba6a1f4e46ao3f0t9673657bc0fc";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }

  let form = (
    <header>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="Search"
          className="search-form-input"
          placeholder="Enter a city.."
          onChange={changeCity}
        />
        <input type="submit" value="Search" className="search-form-btn" />
      </form>
    </header>
  );
  let footer = (
    <footer>
      <p>
        <a
          href="https://github.com/ling83-ft/weather-react1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open-source code
        </a>{" "}
        by Feiling
      </p>
    </footer>
  );

  if (retrieve) {
    return (
      <div>
        <main>
          {form}
          <div className="weather-app-data">
            <div>
              <h1 className="weather-app-city">{weather.city}</h1>
              <p className="weather-app-details">
                <span>{weather.day}</span>,<span>{weather.condition}</span>
                <br />
                Humidity: <strong>{weather.humidity}%</strong>, Wind:
                <strong>{weather.wind}km/h</strong>
              </p>
            </div>
            <div className="weather-app-temperature-container">
              <div className="weather-app-icon">
                <img
                  src={weather.icon}
                  className="weather-app-icon"
                  alt="Weather Icon"
                />
              </div>
              <div className="weather-app-temperature">
                {Math.round(weather.temp)}
              </div>
              <div className="weather-app-unit">°C</div>
            </div>
            <div className="weather-forecast"></div>
          </div>
        </main>
        {footer}
      </div>
    );
  } else {
    return (
      <main>
        {form} {footer}
      </main>
    );
  }
}
