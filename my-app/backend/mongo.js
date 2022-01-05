const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://teemuo-fullstack:${password}@cluster0-pufz2.mongodb.net/phonebook?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


/* ADD A PERSON */

if (process.argv[3] && process.argv[4]) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
      
    person.save().then(response => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
        mongoose.connection.close();
    })
} else {
/* LIST PEOPLE */

    Person.find({}).then(result => {
        result.forEach(person => {
        console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })  
}