import axios from 'axios';

const API_URL = 'http://localhost:7182';

const getData = (endpoint) => {
  return axios.get(`${API_URL}/${endpoint}`);
};

const createData = (endpoint, data) => {
  return axios.post(`${API_URL}/${endpoint}`, data);
};

const updateData = (endpoint, id, data) => {
  return axios.put(`${API_URL}/${endpoint}/${id}`, data);
};

const deleteData = (endpoint, id) => {
  return axios.delete(`${API_URL}/${endpoint}/${id}`);
};

const apiService = {
  getData,
  createData,
  updateData,
  deleteData,
};

export default apiService;
