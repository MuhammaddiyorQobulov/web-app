import api from "@/utils/api/api";
import { defineStore } from "pinia";

const useOrderStore = defineStore("OrderStore", {
  state: () => ({
    orders: [],
    statuses: [],
    error: null,
    isFetching: false,
  }),

  actions: {
    filterBystatus(status) {
      if (status == "all") return this.orders;
      return this.orders.filter((o) => o.status === status);
    },
    async getUserOrders() {
      this.isFetching = true;
      try {
        const res = await api.get("/orders/user-orders");
        this.orders = res.data;
        this.error = null;
      } catch (err) {
        console.error(err.message);
        this.error = err.message;
      } finally {
        this.isFetching = false;
      }
    },
    async getStatuses() {
      this.isFetching = true;
      try {
        const res = await api.get("/orders/status");
        this.statuses = res.data;
      } catch (err) {
        console.log(err.message);
      } finally {
        this.isFetching = false;
      }
    },

    async deliverOrder(id) {
      this.isFetching = true;
      try {
        await api.put(`/orders/${id}`, {
          status: "IN_PROCESS",
        });
        this.getUserOrders();
      } catch (err) {
        console.log(err.message);
      } finally {
        this.isFetching = false;
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

    async getAllOrders(data) {
      this.isFetching = true;
      try {
        const res = await api.get("/orders", data);
        this.orders = res.data;
        this.error = null;
      } catch (err) {
        console.error(err.message);
        this.error = err.message;
      } finally {
        this.isFetching = false;
      }
    },
  },
});
export default useOrderStore;
