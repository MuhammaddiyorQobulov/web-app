import { defineStore } from "pinia";
import api from "@/utils/api/api";
import { message } from "ant-design-vue";
const useCartsStore = defineStore("CartsStore", {
  state: () => ({
    carts: null,
    total: 0,
    comment: "",
    userId: null,
    isFetching: false,
    error: null,
  }),
  actions: {
    async createOrder(data) {
      try {
        await api.post("/orders", data);
        this.carts = null;
        this.total = 0;
        this.error = null;
        message.success("Sizning buyurtmangiz qabul qilindi");
      } catch (err) {
        this.error = err.message;
        message.error("Sizning buyurtmangiz qabul qilinmadi");
      }
    },
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
        this.error = null;
        message.success("Sizning savatingizga mahsulot qo'shildi");
      } catch (err) {
        this.error = err.message;
        message.error("Sizning savatingizga mahsulot qo'shilmadi");
      }
    },
    async removeCart(productId) {
      this.isFetching = true;
      try {
        await api.put(`/user-cart`, {
          productId,
        });
        this.getUserCarts();
        message.success("Sizning savatingizdan mahsulot o'chirildi");
      } catch (err) {
        this.error = err.message;
        message.error("Sizning savatingizdan mahsulot o'chirilmadi");
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
