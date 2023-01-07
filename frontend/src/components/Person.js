import React from 'react'
import phonebookService from '../services/phonebook'

const Person = ({ person, persons, setPersons }) => {

  const handleClick = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .remove(person.id)
        // eslint-disable-next-line no-unused-vars
        .then( () => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  return (
    <div>
      {person.name} {person.number}
      <button style={{ margin: '0 0 10px 10px' }} onClick={handleClick}>Delete</button>
    </div>
  )
}

export default Person