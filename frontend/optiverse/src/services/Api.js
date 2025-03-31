import axios from "axios";
import { BASE_URL } from "../../../config.js";
 
// User Login and Registration
export const registerUser = (data) => axios.post(`${BASE_URL}/api/register/`, data);
export const loginUser = (data) => axios.post(`${BASE_URL}/api/login/`, data);
