import React from 'react'
import Person from './Person'

const Persons = ({persons, nameFilter, deletePersonId}) => persons.filter(person => person.name.toLowerCase().includes(nameFilter)).map(person =>
    <Person key={person.name} name={person.name} number={person.number} deletePerson={() => deletePersonId(person.id)} />
  )

export default Persons