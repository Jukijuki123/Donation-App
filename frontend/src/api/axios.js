import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
        alert("Tidak dapat terhubung ke server");
        }
        return Promise.reject(error);
    }
    );

export default api;
