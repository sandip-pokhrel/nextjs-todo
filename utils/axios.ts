import axios from "axios";

export const API = axios.create({
    baseURL: 'https://swapi.dev/api/',
    timeout: 5000,
    // headers: {'X-Custom-Header': 'foobar'}
  });