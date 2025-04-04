import axios from 'axios';

const API = axios.create({ baseURL: process.env.URL });

export const signUP = (formData) => API.post('public/signup', formData);

export const logIN = (formData) => API.post('/public/login', formData);
