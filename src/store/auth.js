import api from "@/utils/api/api";
import { defineStore } from "pinia";

const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    user: null,
    token: null,
    error: null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      }
      localStorage.setItem("token", token);
    },
    async LoginUser(data) {
      try {
        const res = await api.post("/auth/login", data);

        this.token = res.data.token;
        this.error = null;
        return res.data.token;
      } catch (err) {
        this.error = err.message;
      }
    },
    async RegistrationUser(data) {
      try {
        const res = await api.post("/auth/registration", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.token = res.data.token;
        this.error = null;
        return res.data.token;
      } catch (err) {
        this.error = err.message;
      }
    },
  },
});

export default useAuthStore;
