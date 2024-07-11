import { defineStore } from "pinia";
import api from "@/utils/api/api";
const useCartsStore = defineStore("CartsStore", {
  state: () => ({
    carts: [],
    total: 0,
    comment: "",
  }),
  actions: {
    async addCart(userId, productId, quantity) {
      try {
        const res = await api.post(`/user-cart/${userId}`, {
          quantity,
          productId,
        });
        const { products, total } = res.data;
        this.carts = products;
        this.total = total;
      } catch (err) {
        console.error(err.message);
      }
    },
    removeCart(id) {
      this.carts = this.carts.filter((i) => i._id == id);
    },
    async getUserCarts(id) {
      try {
        const res = await api.get(`/user-cart/${id}`);
        const { products, total } = res.data;
        this.carts = products;
        this.total = total;
      } catch (err) {
        console.error(err.message);
      }
    },
  },
});

export default useCartsStore;
