import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5003/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      //
    }
    return Promise.reject(error);
  }
);

export default {
  get(endpoint, params) {
    return api.get(endpoint, { params });
  },
  post(endpoint, data) {
    return api.post(endpoint, data);
  },
  put(endpoint, data) {
    return api.put(endpoint, data);
  },
  delete(endpoint, data) {
    return api.delete(endpoint, data);
  },
};
