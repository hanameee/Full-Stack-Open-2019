import React, { useState } from "react";
import CountryData from "./CountryData";

function FilteredResult({ props, clickedCountry, showClickHandler }) {
    if (props === null) return <p>Please enter filter</p>;
    else if (props.length === 1) {
        const country = props[0];
        return <CountryData props={country} />;
    } else if (props.length > 10) {
        return <p>Too many matches, please specify filter</p>;
    } else {
        return (
            <div>
                {props.map(fl => (
                    <div key={fl.alpha2Code}>
                        {fl.name}{" "}
                        <button onClick={() => showClickHandler(fl)}>
                            show
                        </button>
                    </div>
                ))}
                {clickedCountry ? <CountryData props={clickedCountry} /> : null}
            </div>
        );
    }
}

export default FilteredResult;
