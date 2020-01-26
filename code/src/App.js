import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryData from "./Components/part2/ex11-14/CountryData";
const App = () => {
    const [countries, setCountries] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("");
    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all").then(response => {
            console.log("fetching....");
            setCountries(response.data);
        });
    }, []);
    useEffect(() => {}, [countries]);
    useEffect(() => {
        setFilter(inputValue.toLowerCase());
    }, [inputValue]);
    const inputChangeHandler = event => {
        setInputValue(event.target.value);
    };
    const filteredCountries =
        countries && filter
            ? countries.filter(country =>
                  country.name.toLowerCase().includes(filter)
              )
            : null;

    const filteredResult = filteredCountries
        ? filteredCountries.map(fl => <p key={fl.alpha2Code}>{fl.name}</p>)
        : "please enter filter";
    return (
        <div>
            <h1>Country Data</h1>
            Find countries:
            <input value={inputValue} onChange={inputChangeHandler} />
            <div>
                {filteredCountries && filteredResult.length > 10 ? (
                    "Too many matches, please specify filter"
                ) : filteredResult.length === 1 ? (
                    <CountryData props={filteredCountries} />
                ) : (
                    filteredResult
                )}
            </div>
        </div>
    );
};

export default App;
