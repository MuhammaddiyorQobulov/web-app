import api from "@/utils/api/api";
import { defineStore } from "pinia";

const useDeliverStore = defineStore("DeliverStore", {
  state: () => ({
    orders: [],
  }),
  actions: {
    async getDeliverOrders(data) {
      try {
        const res = await api.get("/deliver", data);
        this.orders = res.data;
      } catch (err) {
        console.log(err.message);
      }
    },
    async updateDeliverOrder(id, data) {
      try {
        await api.put(`/deliver/${id}`, data);
        location.reload();
      } catch (err) {
        console.log(err.message);
      }
    },
  },
});
export default useDeliverStore;
