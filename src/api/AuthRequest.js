import axios from 'axios';

const API = axios.create({ baseURL: "https://socialapp-983a.onrender.com/social/"});

export const signUP = (formData) => API.post('/public/signup', formData);

export const logIN = (formData) => API.post('/public/login', formData);
