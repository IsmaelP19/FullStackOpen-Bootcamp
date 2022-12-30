import React, {useState} from 'react';
import ReactDOMClient from 'react-dom/client';


const Display = ({text}) => <h1>{text}</h1>


const Button = ({handleClick, text}) =>  <button onClick={handleClick}>{text}</button>
  

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const randomNumber = (max) => Math.floor(Math.random() * max)


const App = ({anecdotes}) => {
  const firstRandom = randomNumber(anecdotes.length)


  const [selected, setSelected] = useState({
    index: firstRandom,
    anecdote: anecdotes[firstRandom], 
    votes: [...Array(anecdotes.length).fill(0)]
  })
  
  const handleClick = () => {
    const newIndex = randomNumber(anecdotes.length)
    setSelected({...selected, index: newIndex, anecdote: anecdotes[newIndex]})
  }

  const vote = () => {
    const newVotes = [...selected.votes]
    newVotes[selected.index] += 1
    setSelected({...selected, votes: newVotes })
  }

  console.log(selected)
  const maxVoted = selected.votes.indexOf(Math.max(...selected.votes))
  console.log(maxVoted)

  return (
    <div>
      <Display text="Anecdote of the day" />
      <h3>{selected.anecdote}</h3>
      <h4>has {selected.votes[selected.index]} votes</h4>
      <Button handleClick={vote} text="vote" />
      <Button handleClick={handleClick} text="next anecdote" />

      <Display text="Anecdote with most votes" />
      <h3>{anecdotes[maxVoted]}</h3>
      <h4>has {selected.votes[maxVoted]} votes</h4>
    </div>
  )
}





// Always the same
const container = document.getElementById('root')
const root = ReactDOMClient.createRoot(container)
root.render(<App anecdotes={anecdotes} />)
