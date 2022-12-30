import React from "react"
import Weather from "./Weather"

const SimpleCountry = ({country}) => {

  const capital = country.capital.map(capital => capital).join(', ')
  

  return (
    <div>
    <h1>{country.name.common}</h1>
    <div>capital {capital}</div>
    <div>population {country.population}</div>
    <h2>languages</h2>
    <ul>
      {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
    </ul>
    <img src={country.flags.png} alt="flag" width="100" />

    <Weather capital={country.capital} />
  </div>
  )
}

export default SimpleCountry