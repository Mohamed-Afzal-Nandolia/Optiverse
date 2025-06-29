import axios from "axios";
import { BASE_URL } from "../../../config.js";
 
// User Login and Registration
export const registerUser = (data) => axios.post(`${BASE_URL}/api/register/`, data);
export const loginUser = (data) => axios.post(`${BASE_URL}/api/login/`, data);
// export const verifyToken = (token) => axios.post(`${BASE_URL}/api/verify-token/`, {token: token});
export const createPost = (data) => axios.post(`${BASE_URL}/feed/create-post/`, data)
export const getAllPost = (userId, filters) =>
  axios.get(`${BASE_URL}/feed/get_all_post/`, {
    params: { 
      user: userId ,
      filters: JSON.stringify(filters),
    },
  });
export const getPostWithId = (userId, filters) =>
  axios.get(`${BASE_URL}/feed/get_all_post/`, {
    params: { 
      user: userId,
      filters: JSON.stringify(filters),
    },
  });