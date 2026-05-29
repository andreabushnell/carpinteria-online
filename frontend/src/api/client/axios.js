import axios from "axios";

const axiosClient = axios.create({
    baseURL: "/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Session expired. Logging out...");
            
            localStorage.removeItem("access_token");
            
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
