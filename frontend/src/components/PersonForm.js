import React, { useState } from 'react'
import phonebookService from '../services/phonebook'

const PersonForm = ({ persons, setPersons, setMessage }) => {

  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(p => p.name === newName)
    const message =`${newName} is already added to phonebook. Replace the old number with a new one?`
    if(person && newNumber !== '') {

      if(window.confirm(message)) {
        const changedPerson = { ...person, number: newNumber }
        phonebookService
          .update(person.id, changedPerson)
          .then(response => {
            setPersons(persons.map(p => p.id !== person.id ? p : response))
            setNewName('')
            setNewNumber('')
            setMessage([`Changed ${person.name}'s number`, 'success'])
            setTimeout(() => {setMessage([])}, 5000)
          })
          .catch(error => {
            setMessage([error.response.data.error, 'error'])
            setTimeout(() => {setMessage([])}, 9000)
          })
      }

    } else if (newName !== '' && newNumber !== '') {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      phonebookService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage([`Added ${returnedPerson.name}`, 'success'])
          setTimeout(() => {setMessage([])}, 5000)
        })
        .catch(error => {
          setMessage([error.response.data.error, 'error'])
          setTimeout(() => {setMessage([])}, 9000)
          console.log(error.response.data)
        })

    } else {
      setMessage(['Please fill in both fields', 'error'])
      setTimeout(() => {setMessage([])}, 5000)
    }
  }

  const handlePersonChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  return(
    <div>
      <form onSubmit={addPerson}>
        <div>
        name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm