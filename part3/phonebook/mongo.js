const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://chris3d:${password}@cluster0.kyf9i30.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)



if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({name, number})
  mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
    return person.save()
  })
  .then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    return mongoose.connection.close()
  })
  .catch(error => console.log(error))
} else {
  mongoose
    .connect(url)
    .then((result) => {
      console.log('connected')
      Person.find({}).then(result => {
        result.forEach(p => console.log(p.name, p.number))
        mongoose.connection.close()
      })
      
    })
}
