import axios from "axios";

const API = axios.create({ baseURL:process.env.REACT_APP_URL});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
  });

export const getUser = (username) => API.get(`/user/${username}`);
export const updateUser = (formData) => API.put(`/user`, formData);
export const getAllUser = () => API.get('/user/unFollowedUser')
export const getFollowedUser=()=> API.get('/user/followedUser')
export const followUnfollowUser = (username) => API.put(`/user/${username}`)
export const getUnfollowedUser=()=>API.get(`/user/unFollowedUser`)
export const deleteUser = () => API.delete(`/user`);
  