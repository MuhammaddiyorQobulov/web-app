import api from "@/utils/api/api";
import { defineStore } from "pinia";
import { message } from "ant-design-vue";
const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    user: {
      username: null,
      avatar: null,
      roles: [],
      id: null,
    },
    users: [],
    token: localStorage.getItem("token") || null,
    isAdmin: false,
    isFetching: false,
    editingUser: null,
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
        // message.success("Siz ro'yhatdan o'tdingiz");
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
        message.success("Siz ro'yhatdan o'tdingiz");
        return res.data.token;
      } catch (err) {
        this.error = err.message;
        // message.error("Iltimos, qaytadan kiriting");
      }
    },
    async CurrentUser() {
      try {
        const { data } = await api.get("/auth/user");
        this.user = {
          username: data.username,
          avatar: data.avatar,
          roles: data.roles,
          _id: data._id,
        };
        this.ToggleAdmin(data.roles);
        this.error = null;
      } catch (err) {
        this.error = err.message;
      }
    },
    async GetUsers() {
      this.isFetching = true;
      try {
        const { data } = await api.get("/auth/users");
        this.users = data;
        this.error = null;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.isFetching = false;
      }
    },
    async getOneUser(id) {
      this.isFetching = true;
      try {
        const { data } = await api.get(`/auth/users/${id}`);
        this.error = null;
        this.editingUser = data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.isFetching = false;
      }
    },
    async EditUser(id) {
      this.isFetching = true;
      try {
        await api.put(`/auth/users/${id}`, { roles: this.editingUser.roles });
        this.GetUsers();
        message.success("Foydalanuvchi o'zgartirildi");
        this.error = null;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.isFetching = false;
      }
    },
    async DeleteUser(id) {
      this.isFetching = true;
      try {
        await api.delete(`/auth/users/${id}`);
        this.GetUsers();
        message.success("Foydalanuvchi o'chirildi");
        this.error = null;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.isFetching = false;
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
      location.reload();
    },

    SetToken(token) {
      this.token = token;
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      }
      localStorage.setItem("token", token);
    },
    ToggleAdmin(roles) {
      if (roles.includes("ADMIN")) {
        this.isAdmin = true;
      }
    },
  },
});

export default useAuthStore;
