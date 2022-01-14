const express = require('express');
const app = express();
const morgan = require('morgan'); //logging
const cors = require('cors'); // allow request from other origins
require('dotenv').config();//makes the environment variable available globally
const Person = require('./models/person');


//middleware
app.use(cors())
app.use(express.json());//parser
app.use(morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  }))

//Routes

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        response.send(`
            <h1> Phonebook has info for ${persons.length} people </h1> 
            <p>${new Date()}</p>
        `);
    })
});

//test to insure deploy deployment
app.get('/', (req, res) => { res.send('Hello from Express!')});

//Get all person
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons =>{
    response.json(persons)
    })
});

// get a specific user 
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            response.json(person)
            if (person) {
                person.json(note)
            } else{
                response.status(404).end()
            }
        })
        .catch(e => next(e))
});

// delete  a person from the phonebook
app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    Person.findByIdAndDelete(id)
        .then(() =>{
            response.status(204).end();
        })
        .catch(e => next(e))
})

//add a new person to the phonebook
app.post('/api/persons', (request, response, next) => {
    const newPerson = new Person({
        name: request.body.name, 
        number: request.body.number,
        date: new Date(),
    });

    newPerson.save()
    .then(savedPerson => {
        response.json(savedPerson);
    })
    .catch(e => next(e))

})

//update number
app.put('/api/persons/:id', (request, response, next) => {
    const person = {
        name: request.body.name,
        number: request.body.number
    }
    Person.findByIdAndUpdate(request.params.id, person, {new: true})// {new: true} new object instead of original 
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON())
        })
        .catch(e => next(e))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if(error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id'})
    }
    next(error)
}
app.use(errorHandler)// has to be the last loaded middleware

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})