import React from 'react'

const Filter = ({ filter, setFilter }) => {

  const handleFilterChange = (event) => setFilter(event.target.value)

  return (
    <form>
      filter shown with...<input value={filter} onChange={handleFilterChange} />
    </form>
  )
}

export default Filter