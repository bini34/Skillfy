// src/services/authService.js
import axios from 'axios';

const API_URL = 'https://localhost:7182/api/account'

const register = (FName, lName, Email, role, password) => {
  console.log(FName)
  console.log(lName)
  console.log(Email)
  console.log(role)
  console.log(password)

  return axios.post(`${API_URL}/register`, {
    FName,
    lName,
    Email,
    role,
    password,
  });
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.message)
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.log("Server did not respond. Please try again later.")
      throw new Error('Server did not respond. Please try again later.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("An unexpected error occurred.")
      throw new Error('An unexpected error occurred.');

    }
  }
};


const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
