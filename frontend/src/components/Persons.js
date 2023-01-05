import React, { useEffect } from 'react'
import Person from './Person'
import phonebookService from '../services/phonebook'

const Persons = ({ persons, filter, setPersons }) => {

  const hook = () => {
    phonebookService
      .getAll()
      .then(response => {setPersons(response)})

  }

  useEffect(hook, [])

  const personsToShow = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))


  return(
    <div>
      {personsToShow.map(person => <Person key={person.id} person={person} persons={persons} setPersons={setPersons} />)}
    </div>
  )
}

export default Persons