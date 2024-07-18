import api from "@/utils/api/api";
import { defineStore } from "pinia";

const useOrderStore = defineStore("OrderStore", {
  state: () => ({
    orders: null,
    statuses: [],
    error: null,
  }),

  actions: {
    async getUserOrders() {
      try {
        const res = await api.get("/orders/user-orders");
        this.orders = res.data;
        this.error = null;
      } catch (err) {
        console.error(err.message);
        this.error = err.message;
      }
    },
    async getStatuses() {
      try {
        const res = await api.get("/orders/status");
        this.statuses = res.data;
      } catch (err) {
        console.log(err.message);
      }
    },
    filter(status) {
      if (!status) return this.orders;
      return this.orders.filter((o) => o.status === status);
    },
    statusTitle(status) {
      return (
        this.statuses.length &&
        this.statuses.find((s) => s.status === status).title
      );
    },
  },
});
export default useOrderStore;
