// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export const getProducts = () => API.get("products/");
export const getCategories = () => API.get("categories/");

// si implementas login con tokens
export const login = (data) => API.post("token/", data);
export const refreshToken = (data) => API.post("token/refresh/", data);
