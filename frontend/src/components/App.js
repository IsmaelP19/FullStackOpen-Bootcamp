import React, { useState } from 'react' 
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'


// TODO: Phonebook
const App = () => {
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState([])

  
  const [filter, setFilter] = useState('')
  

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message[0]} type={message[1]} />

      <Filter filter={filter} setFilter={setFilter} />

      <h3> Add a new </h3>

      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} />

      <h2>Numbers</h2>
    
      <Persons persons={persons} filter={filter} setPersons={setPersons} />
    </div>
  )
}

/*
// TODO: Countries
const App = () => {

  const [filter, setFilter] = useState('')



  return(
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <Countries filter={filter} setFilter={setFilter}/>
    </div>

  )



}


const App = () => {

  const [notes, setNotes] = useState([])

  const hook = () => {
    noteService.getAll().then(response => {
        setNotes(response)
      })
  }

  useEffect(hook, [])

  return(
    <div>
      <Notes notes={notes} setNotes={setNotes} />
      <NoteForm notes={notes} setNotes={setNotes}/>
      <Footer />
    </div>
  )
}
*/

export default App