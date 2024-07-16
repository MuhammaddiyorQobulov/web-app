import api from "@/utils/api/api";
import { defineStore } from "pinia";

const useOrderStore = defineStore("OrderStore", {
  state: () => ({
    orders: [],
    error: null,
  }),
  actions: {
    async createOrder(data) {
      try {
        const res = await api.post("/orders", data);
        this.orders = res.data;
        console.log("orders" + res.data);
        this.error = null;
      } catch (err) {
        console.error(err.message);
        this.error = err.message;
      }
    },
  },
});
export default useOrderStore;
