import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // caso precise enviar cookies/sessão
});

export default api;
