import React from "react";

function CountryData({ props }) {
    const country = props;
    const countryLanguages = country.languages.map((language, i) => (
        <li key={i}>{language.name}</li>
    ));
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
            />
        </div>
    );
}

export default CountryData;
