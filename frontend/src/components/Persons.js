import React from 'react';
import Button from './Button';

const Persons = (props) => {
    return(
        <div>
            {(props.filter && (props.filterNames.length !==0)) ?
        props.filterNames.map(person => <p key={person.id}>{person.name} {person.number}<Button id={person.id} setPersons={props.setPersons} name={person.name}/></p>) :
        props.persons.map(person => <p key={person.id}>{person.name} {person.number}<Button id={person.id} setPersons={props.setPersons} name={person.name}/></p>)
      }
        </div>
    )
};
export default Persons;