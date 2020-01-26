import React, { useState, useEffect } from "react";
import axios from "axios";
import FilteredResult from "./Components/part2/ex11-14/FilteredResult";
const App = () => {
    const [countries, setCountries] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("");
    const [clickedCountry, setClickedCountry] = useState(null);

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all").then(response => {
            console.log("fetching....");
            setCountries(response.data);
        });
    }, []);
    useEffect(() => {
        setFilter(inputValue.toLowerCase());
    }, [inputValue]);
    const inputChangeHandler = event => {
        setInputValue(event.target.value);
        setClickedCountry("");
    };
    const filteredCountries =
        countries && filter
            ? countries.filter(country =>
                  country.name.toLowerCase().includes(filter)
              )
            : null;
    const showClickHandler = fl => {
        setClickedCountry(fl);
    };
    return (
        <div>
            <h1>Country Data</h1>
            Find countries:
            <input value={inputValue} onChange={inputChangeHandler} />
            <FilteredResult
                props={filteredCountries}
                clickedCountry={clickedCountry}
                showClickHandler={showClickHandler}
            />
        </div>
    );
};

export default App;
