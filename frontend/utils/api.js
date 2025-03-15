import axios from "axios";

const API_URL = "http://localhost:5000/api/clients";

export const getClients = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getClientById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const addClient = async (clientData) => {
    await axios.post(API_URL, clientData);
};

export const updateClient = async (id, clientData) => {
    await axios.put(`${API_URL}/${id}`, clientData);
};

export const deleteClient = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
