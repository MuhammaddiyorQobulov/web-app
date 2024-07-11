import api from "@/utils/api/api";
import { defineStore } from "pinia";

const useTypeStore = defineStore("TypeStore", {
  state: () => ({
    types: [],
  }),
  actions: {
    async getTypes() {
      try {
        const res = await api.get("/types");
        this.types = res.data;
      } catch (err) {
        console.log(err.message);
      }
    },
  },
});
export default useTypeStore;
