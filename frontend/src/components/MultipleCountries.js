import React from 'react'

const MultipleCountries = ({ countriesToShow, setFilter }) => {


  const handleShowClick = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      {countriesToShow.map(country =>
        <div key={country.name.common}>
          {country.name.common}
          <button value={country.name.common} onClick={handleShowClick}>show</button>
        </div>)}
    </div>
  )
}

export default MultipleCountries