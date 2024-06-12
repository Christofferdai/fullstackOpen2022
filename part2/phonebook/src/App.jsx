import { useState, useEffect } from 'react'
import apiService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    apiService.getAll().then(initialPersons => setPersons(initialPersons))
  },[])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    const updatedSearch = event.target.value
    setShowAll(false)
    setSearch(updatedSearch)
  }



  const addNewPerson = (event) => {
    event.preventDefault()
    const samePerson = persons.find(p => p.name === newName)
      if (samePerson) {
        if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const updatedPerson = {...samePerson, number:newNumber}
          apiService.update(samePerson.id, updatedPerson).then(setPersons(persons.map(p => p.name === newName ? updatedPerson : p)))
        }
        return 
      }
    
    const newPerson = { name: newName, number: newNumber}
    apiService.create(newPerson).then((addedPerson) => {
      setPersons(persons.concat(addedPerson))

    })
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (confirm(`Delete ${personToDelete.name}?`)) {
      apiService.deletePerson(id).then(() => setPersons(persons.filter(p => p.id !== id)))
    }
    
  }
  const personToShow = showAll ? persons:persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addNewPerson={addNewPerson} /> 
      <h2>Numbers</h2>
      <Persons personsToShow={personToShow} deletePerson={deletePerson} />
      
    </div>
  )
}

export default App