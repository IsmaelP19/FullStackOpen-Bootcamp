import React, {useState} from "react"
import Note from "./Note"
import noteService from '../services/notes'

const Notes = ({notes, setNotes, setErrorMessage}) => {

  const [showAll, setShowAll] = useState(true)
  


  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportance = () => setShowAll(!showAll)

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService.update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote))
      })
      .catch(error => {
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => {setErrorMessage(null)}, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return(
    <div>
      <div>
        <button onClick={toggleImportance}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
    </div>
  )
}

export default Notes