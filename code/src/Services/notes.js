import axios from "axios";
const baseURL = "api/notes";

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseURL);
    return request.then(response => {
        return response.data;
    });
};

const getSpecific = id => {
    const request = axios.get(`${baseURL}/${id}`);
    return request.then(response => {
        return response.data;
    });
};

const create = async newObject => {
    const config = {
        headers: { Authorization: token }
    };
    const response = await axios.post(baseURL, newObject, config);
    return response.data;
};

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject);
    return request.then(response => response.data);
};

const remove = id => {
    const request = axios.delete(`${baseURL}/${id}`);
    return request.then(response => response.data);
};

export default {
    getAll,
    getSpecific,
    create,
    update,
    remove,
    setToken
};
