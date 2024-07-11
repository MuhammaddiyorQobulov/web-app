import { defineStore } from "pinia";
import api from "@/utils/api/api";
const useCartsStore = defineStore("CartsStore", {
  state: () => ({
    carts: [],
    total: 0,
    comment: "",
    userId: "668e8fd60d8d2ae42463aea3",
  }),
  actions: {
    async addCart(productId, quantity) {
      try {
        const res = await api.post(`/user-cart/${this.userId}`, {
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
    async removeCart(productId) {
      try {
        await api.put(`/user-cart/${this.userId}`, {
          productId,
        });
        this.getUserCarts();
      } catch (err) {
        console.log(err.message);
      }
    },
    async getUserCarts() {
      try {
        const res = await api.get(`/user-cart/${this.userId}`);
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
