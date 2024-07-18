import { defineStore } from "pinia";
import api from "@/utils/api/api";
const useCartsStore = defineStore("CartsStore", {
  state: () => ({
    carts: null,
    total: 0,
    comment: "",
    userId: null,
    isFetching: false,
  }),
  actions: {
    async addCart(productId, quantity) {
      this.isFetching = true;
      try {
        const res = await api.post(`/user-cart`, {
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
      this.isFetching = true;
      try {
        await api.put(`/user-cart`, {
          productId,
        });
        this.getUserCarts();
      } catch (err) {
        console.log(err.message);
      } finally {
        this.isFetching = false;
      }
    },
    async getUserCarts() {
      this.isFetching = true;
      try {
        const res = await api.get(`/user-cart`);
        const { products, total } = res.data;
        this.carts = products;
        this.total = total;
      } catch (err) {
        console.error(err.message);
      } finally {
        this.isFetching = false;
      }
    },
    getOneCart(id) {
      return this.carts.find((i) => id == i._id);
    },
  },
});

export default useCartsStore;
