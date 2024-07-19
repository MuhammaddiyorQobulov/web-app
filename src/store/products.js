import { defineStore } from "pinia";
import api from "@/utils/api/api";
import { message } from "ant-design-vue";
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
    async getProduct(id) {
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
        message.success("Yangi mahsulot yaratildi");
        this.error = null;
      } catch (err) {
        console.log(err.message);
        this.error = err.message;
      }
    },
    async editProduct(id, data) {
      try {
        await api.put(
          `/products/${id}`,
          {
            title: data.title,
            type: data.type,
            price: data.price,
            description: data.description,
            picture: data.picture,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.getProducts();
        message.success("Mahsulot ma'lumotlari o'zgartirildi");
        this.error = null;
      } catch (err) {
        console.log(err.message);
        this.error = err.message;
      }
    },
    async deleteProduct(id) {
      try {
        await api.delete(`/products/${id}`);
        this.getProducts();
        message.success("Mahsulot o'chirildi");
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
