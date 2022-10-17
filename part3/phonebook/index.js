require('dotenv').config()

const Person = require('./models/person')

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const person = require('./models/person')
app.use(express.json())
morgan.token('content', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content',{
    skip: function (req, res) { return !res.body }
  }))
app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then( persons => {
        response.json(persons)
    })
    
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`)
    
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({
            error: "name is missing"
        })
    }
    if (!body.number) {
        response.status(400).json({
            error: "number is missing"
        })
    }
    // Person.find({name: body.name}, (err, data) => {
        // if(err) {
        //     console.log(err)
        // }else {
        //     if(data.length) {
        //         return response.status(400).json({
        //             error: "name must be unique"
        //         })
        //     }
            
        // }
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

// })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id, (err, person) => {
        if(err) {
            console.log(err)
        } else {
            console.log(person);
        }
    })
  
    response.status(204).end()
})
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})