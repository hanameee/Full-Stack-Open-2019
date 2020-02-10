import axios from "axios";
const baseURL = "api/people";

const getAll = () => {
    const request = axios.get(baseURL);
    return request.then(response => response.data);
};

const getOne = id => {
    const request = axios.get(`${baseURL}/${id}`);
    return request.then(response => response.data);
};

const create = newObject => {
    const request = axios.post(baseURL, newObject);
    return request.then(response => response.data);
};

const update = (id, newObject) => {
    console.log(id, newObject);
    const request = axios.put(`${baseURL}/${id}`, newObject);
    return request.then(response => response.data);
};
// delete is reserved word
const remove = id => {
    return axios.delete(`${baseURL}/${id}`);
};

export default {
    getAll,
    getOne,
    create,
    update,
    remove
};
