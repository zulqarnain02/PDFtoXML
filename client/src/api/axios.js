// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api/auth',
  // baseURL:'https://pdftoxml-api.onrender.com/api/auth',
});



export default instance;


export const apiurl = import.meta.env.VITE_API_URL || "http://localhost:5000"

// export const apiurl="https://pdftoxml-api.onrender.com"
