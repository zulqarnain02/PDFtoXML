// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
  // baseURL:'https://pdftoxml-api.onrender.com/api/auth',
});



export default instance;


export const apiurl = "http://localhost:5000"

// export const apiurl="https://pdftoxml-api.onrender.com"
