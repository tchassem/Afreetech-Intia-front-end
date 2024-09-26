import axios from 'axios';

const API_URL = 'http://localhost:8080/api/assurances';

export const getAssurances = async () => {
  return await axios.get(API_URL);
};

export const getAssuranceById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const createAssurance = async (assurance) => {
  return await axios.post(API_URL, assurance);
};

export const updateAssurance = async (id, assurance) => {
  return await axios.put(`${API_URL}/${id}`, assurance);
};

export const deleteAssurance_ = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
