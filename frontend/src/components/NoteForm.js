import React, { useState } from 'react'
import noteService from '../services/notes'

const NoteForm = ({ notes, setNotes, user, setMessage }) => {

  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() > 0.5,
    }

    if (noteObject.content.length < 3) {
      setMessage(['content must be at least 3 characters long', 'error'])
      setTimeout(() => {
        setMessage([])
      }, 5000)
      return
    }

    noteService.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => setNewNote(event.target.value)

  const form = () => {
    return(
      <div>
        <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange} />
          <button type="submit">save</button>
        </form>
      </div>
    )
  }

  const formContainer = () => {
    return(
      <div>
        <p> {user.name} logged-in</p>
        {form()}
      </div>
    )
  }

  return(
    <div>
      { user !== null && formContainer()}
    </div>
  )
}

export default NoteForm