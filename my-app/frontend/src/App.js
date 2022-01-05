import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ nameFilter, setNameFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ notification, setNotification ] = useState({ message: null })

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.findIndex(person => person.name === newName) !== -1) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const person = persons.find(p => p.name === newName)
          const changedPerson = { ...person, number: newNumber }

          personService
            .update(person.id, changedPerson)
              .then(replacedPerson => {
              setPersons(persons.map(p => p.id !== person.id ? p : replacedPerson))
              showNotification(`Updated number for ${person.name}`, 'success')
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
               showNotification(`${person.name} was already deleted from server`, 'error')
              setPersons(persons.filter(p => p.id !== person.id))
            })
        }
    } else {
        const personObject = {
            name: newName,
            number: newNumber
        }
        personService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            showNotification(`Added ${newName}`, 'success')
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            showNotification(error.response.data.error, 'error')
          })
    }
  }

  const deletePersonId = id => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) { 
      personService
          .deleteNumber(id)
          .then(returnedId => {
            setPersons(persons.filter(p => p.id !== id))
            showNotification(`Deleted ${person.name}`, 'success')
          })
          .catch(error => {
            showNotification(`${person.name} was already deleted from server`, 'error')
            setPersons(persons.filter(p => p.id !== id))
          })
    }
  }

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} nameFilter={nameFilter} deletePersonId={deletePersonId} />
    </div>
  )

}

export default App