const express = require('express');
const morgan = require('morgan'); //logging
const cors = require('cors'); // allow request from other origins

const app = express();

//middleware
app.use(cors())
app.use(express.json());
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

let persons = [
    { 
        id: 1,
        name: "Arto Hellas", 
        number: "040-123456"
    },
    { 
        id: 2,
        name: "Ada Lovelace", 
        number: "39-44-5323523"
    },
    { 
        id: 3,
        name: "Dan Abramov", 
        number: "12-43-234345"
    },
    { 
        id: 4,
        name: "Mary Poppendieck", 
        number: "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/info', (request, response) => {
    response.send(`
    <h1> Phonebook has info for ${persons.length} people </h1> 
    <p>${new Date()}</p>
    `);
})
//test to insure deploy deployment
app.get('/', (req, res) => { res.send('Hello from Express!')});
// get a specific user 
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(person => person.id == id);
    console.log(person)

    if(person){
        response.json(person);
    }else{
        console.log(person);
        response.status(404).end()
    }
})
// delete  a person from the phonebook
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    persons = persons.filter(person => person.id != id);
    response.status(204).end();
})

//add a new person to the phonebook
const generateId = () => {
    const maxId = persons.length > 0
    ? Math.max(...persons.map(person => person.id))
    : 0
    return maxId + 1;
}
app.post('/api/persons', (request, response) => {
    const newPerson = {
        id: generateId(),
        name: request.body.name, 
        number: request.body.number,
    };
    const found = persons.find(person => person.name == newPerson.name);
    if(found){
        response.status(404);
        response.send('name must be unique');
    }else{
        persons = persons.concat(newPerson);
        response.json(newPerson);
    }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})