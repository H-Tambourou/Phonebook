import React from 'react';

const Filter = ({ filterName, setFilterNames, persons, setFilter, setFilterName }) => {
    
    const handleFilter = (e) => {
        e.preventDefault();
        setFilterName(e.target.value);
        const filtered = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()));
        console.log('filter is', filtered);
        setFilterNames(filtered);
        setFilter(true);
    
      }

    return(
        <div>
             filter shown with: <input value={filterName} onChange={handleFilter}/>
        </div>
    )
};
export default Filter;