import { defineStore } from "pinia";
import api from "@/utils/api/api";
const useProductsData = defineStore("ProductsStore", {
  state: () => ({
    products: [],
    product: null,
    searchValue: "",
    error: null,
    isFetching: false,
  }),
  actions: {
    async getProducts() {
      this.isFetching = true;
      try {
        const res = await api.get("/products");
        this.products = res.data;
        this.error = null;
      } catch (err) {
        console.log(err.message);
        this.error = err.message;
      } finally {
        this.isFetching = false;
      }
    },
    async SingleProduct(id) {
      this.isFetching = true;
      try {
        const res = await api.get(`/products/${id}`);
        this.product = res.data;
        this.error = null;
      } catch (err) {
        console.log(err.message);
      } finally {
        this.isFetching = false;
      }
    },
    async createProduct(data) {
      try {
        const res = await api.post("/products", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.products.push(res.data);
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
