import React from 'react';
import services from '../services';

const PersonForm = (props) => {
    
    const handleName = (e) => {
        e.preventDefault();
        props.setNewName(e.target.value);
      };
    
    const handleNumber = (e) => {
    e.preventDefault();
    props.setNumber(e.target.value);
    }
    
    const handleSubmit = (e) => {
    e.preventDefault();
    // const updatedPerson = props.persons.filter(person => person.name === props.newName);
    // if(updatedPerson.length !== 0){
    //     const personObject = updatedPerson[0];
    //     console.log(personObject)
    //    if(!window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)){
    //        return
    //    }
    //    services
    //     .updateNumber(personObject.id, personObject)
    //     .then(response =>{
    //         props.setPersons(props.persons.map(person => person.id !== personObject.id ? person : response.data))
    //     })
    //     .catch(e => console.log(e))
    //     return
    // }
    const names = props.persons.map(person => person.name);
    for (const name of names){
        if(name.toLowerCase() === props.newName.toLowerCase()){

        window.alert(`${props.newName} is already added to phonebook`)
        return
        }
    }
    const personObject = {
        name: props.newName,
        number: props.number
    }
    services
        .create(personObject)
        .then(response => {
            props.setPersons(props.persons.concat(response.data));
            props.setNumber('');
            props.setNewName('');
        })
    // props.setPersons(props.persons.concat({name: props.newName, number: props.number}));
    // props.setNumber('')
    // props.setNewName('');
    }
    return(
        <div>
            <form>
                <div>
                name: <input value={props.newName} onChange={handleName}/> <br/>
                number: <input value={props.number} onChange={handleNumber}/>
                </div>
                <div>
                <button type="submit" onClick={handleSubmit}>add</button>
                </div>
            </form>
        </div>
    )
}
export default PersonForm;