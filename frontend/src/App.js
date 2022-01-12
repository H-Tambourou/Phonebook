import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import services from './services';
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterNames, setFilterNames] = useState([]);
  
  const hook = () => {
    services
      .getAll()
      .then(response => {
        console.log('this is the response', response.data);
        setPersons(response.data);
      })
  }
  useEffect(hook, []);

  return (
    <div className='App'>
      <h1>Phonebook</h1>
      <Filter 
      persons={persons}
      setFilterName={setFilterName}
      setFilterNames={setFilterNames}
      setFilter={setFilter}
      filterName={filterName}
      />
      <h2>Add New</h2>
      <PersonForm 
      newName={newName}
      setNewName={setNewName}
      setNumber={setNumber}
      number={number}
      persons={persons}
      setPersons={setPersons}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterNames={filterNames} filter={filter} setPersons={setPersons}/>
    </div>
  )
}

export default App;