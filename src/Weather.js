import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "094780c710fa4efd669f0df8c3991927";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let formOne = (
    <form onSubmit={handleSubmit}>
      <h1>Weather Application</h1>
      <input type="search" placeholder="Enter a city.." onChange={updateCity} />
      <button type="Submit" class="btn btn-primary w-100">
        Search
      </button>
      <h2>Tehran</h2>
      <ul>
        <li>
          <strong>Temperature: 26 °C</strong>
        </li>
        <li>
          <strong>Description: clear sky </strong>
        </li>
        <li>
          <strong>Humidity: 14%</strong>
        </li>
        <li>
          <strong>Wind: 3.09 km/h</strong>
        </li>
      </ul>
      <div class="icon">
        <img
          src={"http://openweathermap.org/img/wn/01n@2x.png"}
          alt={weather.description}
        />
      </div>
    </form>
  );

  let formTwo = (
    <form onSubmit={handleSubmit}>
      <h1>Weather Application</h1>
      <input type="search" placeholder="Enter a city.." onChange={updateCity} />
      <button type="Submit" class="btn btn-primary w-100">
        Search
      </button>
    </form>
  );

  if (loaded) {
    return (
      <div>
        {formTwo}
        <h2> {city}</h2>
        <ul>
          <li>
            <strong>Temperature: {Math.round(weather.temperature)}°C</strong>
          </li>
          <li>
            <strong>Description: {weather.description}</strong>
          </li>
          <li>
            <strong>Humidity: {weather.humidity}%</strong>
          </li>
          <li>
            <strong>Wind: {weather.wind}km/h</strong>
          </li>
        </ul>
        <div class="icon">
          <img src={weather.icon} alt={weather.description} />
        </div>
      </div>
    );
  } else {
    return formOne;
  }
}
