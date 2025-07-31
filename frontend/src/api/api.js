import axios from 'axios';


export const axiosInstance = axios.create({
    baseURL: "https://job-board-fullstack.onrender.com",
})