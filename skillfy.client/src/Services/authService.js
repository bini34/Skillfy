// src/services/authService.js
import axios from 'axios';

const API_URL = 'https://localhost:7182/api/account';

const register =  async (FName, lName, Email, role, password) => {
  try{
    const response = await axios.post(`${API_URL}/register`, {
    FName,
    lName,
    Email,
    role,
    password,
  });
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }
  return response.data;
} catch (error) {
  if (error.response) {
    throw error.response.data;
  } else if (error.request) {
    throw new Error('Server did not respond. Please try again later.');
  } else {
    throw new Error('An unexpected error occurred.');
  }
}
}

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw new Error('Server did not respond. Please try again later.');
    } else {
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
