import { defineStore } from "pinia";
import api from "@/utils/api/api";
const useProductsData = defineStore("ProductsStore", {
  state: () => ({
    products: [],
    error: null,
  }),
  actions: {
    async getProducts() {
      try {
        const res = await api.get("/products");
        this.products = res.data;
        this.error = null;
      } catch (err) {
        console.log(err.message);
        this.error = err.message;
      }
    },
    filterByType(type) {
      if (!type) return this.products;
      return this.products.filter((p) => p.type == type);
    },
  },
});

export default useProductsData;
