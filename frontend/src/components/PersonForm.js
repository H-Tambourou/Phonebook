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
    const personObject = {
        name: props.newName,
        number: props.number
    }
    const updatedPerson = props.persons.find(person => person.name.toLowerCase() === props.newName.toLowerCase());
    if(updatedPerson){

        services
            .updateNumber(updatedPerson.id, personObject)
            .then(response => {
                services
                    .getAll()
                    .then(response =>{
                        props.setPersons(response.data)
                    });
                props.setNumber('');
                props.setNewName('');
    
            })
    }
    else{
        services
            .create(personObject)
            .then(response => {
                props.setPersons(props.persons.concat(response.data));
                props.setNumber('');
                props.setNewName('');
            })
    }
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