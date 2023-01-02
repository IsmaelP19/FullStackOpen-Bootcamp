import React, {useState, useEffect} from "react"
import axios from "axios"
import MultipleCountries from "./MultipleCountries"
import SimpleCountry from "./SimpleCountry"


const Countries = ({filter, setFilter}) => {

  const [countries, setCountries] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  
  useEffect(hook, [])

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (countriesToShow.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if (countriesToShow.length > 1) { 
    return (
      <MultipleCountries countriesToShow={countriesToShow} filter={filter} setFilter={setFilter}  />
    )
  } else if (countriesToShow.length === 1) { 
    return (
      <SimpleCountry country={countriesToShow[0]}/>
    )
  } else {
    return (
      <div>
        No matches
      </div>
    )
  }


}

export default Countries