import axios from 'axios';

const API = axios.create({ baseURL: process.env.URL});
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const uploadImage = (newPost) => API.post('/upload/', newPost)

export const Post = (newPost) => API.post('/post', newPost); 