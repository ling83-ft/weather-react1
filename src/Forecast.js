import React from "react";
import './App.css';

export default function Forecast(props) {
    return(
    <div>
         {props.forecast.map(function (forecasts, index) {
          return (
    <div key={index} className="weather-forecast-day">
    <div className="weather-forecast-date"></div>
    <div className="weather-forecast-icon">
    <img src={forecasts.icon_url} alt="Weather icon" /></div>
    <div className="weather-forecast-temperatures">
      <div className="weather-forecast-temperature">
        <strong>{forecasts.temp}°</strong>
      </div>
      </div>
      </div>
          );
        })}

  </div>);
}