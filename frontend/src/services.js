import axios from 'axios';

const baseUrl = 'https://secret-ocean-82038.herokuapp.com/api/persons';

const getAll = () => {
    return axios.get(baseUrl);
}

const create = newObject => {
    return axios.post(baseUrl, newObject);
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`);
}
const updateNumber = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}
const services = {
    getAll : getAll,
    create : create,
    remove : remove,
    updateNumber : updateNumber,
}
export default services;