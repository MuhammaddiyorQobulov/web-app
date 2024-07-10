import { defineStore } from "pinia";

const useCartsStore = defineStore("carts", {
  state: () => ({
    carts: [],
    comment: "",
  }),
  actions: {
    addCart(cart) {
      if (this.carts.find((i) => i.id === cart.id)) return;
      this.carts = [...this.carts, { ...cart, count: 1 }];
    },
    removeCart(id) {
      console.log(this.carts.filter((i) => i.id !== id));
      this.carts = this.carts.filter((i) => i.id !== id);
    },
    handleCount(id, count) {
      this.carts = this.carts.map((i) => {
        if (i.id === id) {
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
