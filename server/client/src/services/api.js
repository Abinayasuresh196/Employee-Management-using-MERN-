import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor
API.interceptors.response.use(
  res => res,
  err => {
    toast.error(err.response?.data?.message || "Something went wrong");
    return Promise.reject(err);
  }
);

export default API;
