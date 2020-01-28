import React from "react";

function WeatherData({ weatherData }) {
    return (
        <div>
            <h3>Weather in {weatherData.location.name}</h3>
            <b>temperature</b>: {weatherData.current.temperature} Celsius
            <div>
                <img
                    src={weatherData.current.weather_icons}
                    alt="weather icons"
                />
            </div>
        </div>
    );
}

export default WeatherData;
