import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  let [city, setCity] = useState("");
  let [retrieve, setRetrieved] = useState(false);
  let [weather, setWeather] = useState({});

  function showTemperature(response) {
    setRetrieved(true);
    setWeather({
      temp: response.data.temperature.current,
      humidity: response.data.temperature.humidity,
      wind: response.data.wind.speed,
      icon: response.data.condition.icon_url,
    });
    console.log(response.data);
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

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="Search" placeholder="Enter a city.." onChange={changeCity} />
      <input type="submit" value="Search" />
    </form>
  );

  if (retrieve) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temp)}°C</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>
            <img src={weather.icon} alt="Weather Icon" />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}