import api from "@/utils/api/api";
import { defineStore } from "pinia";

const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    user: {
      username: null,
      avatar: null,
      role: [],
      id: null,
    },
    token: localStorage.getItem("token") || null,
    error: null,
  }),

  actions: {
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
    async GetUser() {
      try {
        const res = await api.get("/auth/user");
        this.user = {
          username: res.data.username,
          avatar: res.data.avatar,
          roles: res.data.roles,
          _id: res.data._id,
        };
        this.error = null;
      } catch (err) {
        this.error = err.message;
      }
    },

    LogOut() {
      this.token = null;
      this.user = {
        username: null,
        avatar: null,
        roles: [],
        _id: null,
      };
      localStorage.removeItem("token");
    },

    SetToken(token) {
      this.token = token;
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      }
      localStorage.setItem("token", token);
    },
  },
});

export default useAuthStore;
