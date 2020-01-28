import React, { useState, useEffect } from "react";
import WeatherData from "./WeatherData";
import axios from "axios";

function CountryData({ props }) {
    const country = props;
    const countryLanguages = country.languages.map((language, i) => (
        <li key={i}>{language.name}</li>
    ));
    const [weatherData, setWeatherData] = useState(null);
    useEffect(() => {
        axios
            .get("http://api.weatherstack.com/current", {
                params: {
                    access_key: process.env.REACT_APP_WEATHER_API_KEY,
                    query: country.capital
                }
            })
            .then(response => {
                console.log("fetching weather data...");
                setWeatherData(response.data);
            });
    }, [country.capital]);
    return (
        <div>
            <h2>{country.name}</h2>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <h3>Languages</h3>
            <ul>{countryLanguages}</ul>
            <img
                src={country.flag}
                style={{ width: "250px", height: "auto" }}
                alt="country flag"
            />
            {weatherData ? <WeatherData weatherData={weatherData} /> : null}
        </div>
    );
}

export default CountryData;
