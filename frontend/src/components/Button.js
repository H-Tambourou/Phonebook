import React from 'react';
import services from '../services';

export default function Button({ id, setPersons, name }) {
    const handleDelete = () => {
        if(!window.confirm(`Delete ${name} ?`)){
            return
        }
        services
            .remove(id)
            .then(response => {
                services
                    .getAll()
                    .then(response =>{
                        setPersons(response.data)
                    })
    
            })
            .catch(e => console.log(e))
    }
    return <button onClick={handleDelete}>delete</button>
}
