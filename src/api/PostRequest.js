import axios from 'axios';

const API = axios.create({ baseURL: process.env.URL });
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});


export const getPostByUsername = (username) => API.get(`/post/userPostByUsername/${username}`);
export const getAllPost = () => API.get(`/post/get-all`);
export const likedPost = (postId) => API.put(`/post/like/${postId}`);