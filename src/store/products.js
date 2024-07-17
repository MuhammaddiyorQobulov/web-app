import { defineStore } from "pinia";
import api from "@/utils/api/api";
const useProductsData = defineStore("ProductsStore", {
  state: () => ({
    products: [],
    searchValue: "",
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
      if (!type)
        return this.products.filter((p) =>
          p.title.toLowerCase().includes(this.searchValue.toLowerCase())
        );
      return this.products.filter(
        (p) =>
          p.type == type &&
          p.title.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    },
  },
});

export default useProductsData;
