import axios from "axios";
import baseURL from "@/utils/api/url.js";
import { message } from "ant-design-vue";
const api = axios.create({
  baseURL: baseURL + "api",
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
    message.error(error.response.data.message);
    if (error.response && error.response.status == 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default {
  get(endpoint, params, headers) {
    return api.get(endpoint, { params }, headers);
  },
  post(endpoint, data, headers) {
    return api.post(endpoint, data, headers);
  },
  put(endpoint, data, headers) {
    return api.put(endpoint, data, headers);
  },
  delete(endpoint, data, headers) {
    return api.delete(endpoint, data, headers);
  },
};
