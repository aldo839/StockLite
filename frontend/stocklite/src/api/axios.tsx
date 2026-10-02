import axios from "axios";
import type { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create ({
    baseURL: '/localhost:8080/api'
})

export default api