import Axios from 'axios';

export const api = Axios.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 8000,
    withCredentials: true
});