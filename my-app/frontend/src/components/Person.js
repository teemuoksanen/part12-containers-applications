import React from 'react'

const Person = ({name, number, deletePerson}) => 
    <div>
        {name} {number}
        <button onClick={deletePerson}>delete</button>
    </div>

export default Person