import { defineStore } from "pinia";

const useCartsStore = defineStore("CartsStore", {
  state: () => ({
    carts: [],
    comment: "",
  }),
  actions: {
    addCart(cart) {
      if (this.carts.find((i) => i._id === cart._id)) return;
      this.carts = [...this.carts, { ...cart, count: 1 }];
    },
    removeCart(id) {
      this.carts = this.carts.filter((i) => i._id == id);
    },
    handleCount(id, count) {
      this.carts = this.carts.map((i) => {
        if (i._id === id) {
          i.count = count;
        }
        return i;
      });
    },
    totalCost() {
      let cost = 0;
      this.carts.forEach((i) => {
        cost += i.price * i.count;
      });
      return cost;
    },
  },
});

export default useCartsStore;
