import axios from 'axios';

const API_URL = 'http://localhost:8080/api/clients';

export const getClients = async () => {
  return await axios.get(API_URL);
};

export const getClientById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const createClient = async (client) => {
  return await axios.post(API_URL, client);
};

export const updateClient = async (id, client) => {
  return await axios.put(`${API_URL}/${id}`, client);
};

export const deleteClient = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
