import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'

const Filter = ({search, handleSearchChange}) => (
  <div>
    filter shown with <input value={search} onChange={handleSearchChange} />
  </div>
)
const PersonForm = ({newName,newNumber,handleSubmit, handleNameChange, handleNumberChange}) => (
  <form onSubmit={handleSubmit}>
    <div>name: <input value={newName} onChange={handleNameChange}/></div>
    <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
    <div><button type="submit">add</button></div>
  </form>
)
const Persons = ({personsToShow, handleDelete}) => (
  <ul>
    {personsToShow.map(person => <li key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button></li>)}
  </ul>
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    
    setShowAll(false)
    setSearch(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    if (persons.find(person => person.name === newName) ) {
      const personToModify = persons.find(person => person.name === newName)
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        axios
          .put(`http://localhost:3001/persons/${personToModify.id}`, {...personToModify, number: newNumber})
          .then(response => {
            setPersons(persons.map(p => p.id !== personToModify.id ? p : response.data))
            
          })
      }
      setNewName('') 
      setNewNumber('')
      setMessage(`Changed ${newPerson.name}'s number`)
      setTimeout(() => setMessage(null), 3000)
      return
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage(`Added ${newPerson.name}`)
        setTimeout(() => setMessage(null), 3000)
        setNewName('')
        setNewNumber('')
      })
  }
  const handleDelete = id => {
    if (window.confirm(`Delete ${persons[id-1].name}?`)) {
      const copy = [...persons]
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(response => {
          personService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons)
            })
        })
    }
    
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(search.toUpperCase()))
  

   return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App