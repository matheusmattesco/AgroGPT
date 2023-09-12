import axios from "axios";

const api = axios.create({
    baseURL : 'https://localhost:7181',
    
})

export default api;