import { defineStore } from "pinia";

const useCartsStore = defineStore("carts", {
  state: () => ({
    carts: [
      {
        id: "1",
        imgUrl: "https://picsum.photos/id/237/200/300",
        title: "Product 1",
        cost: 100,
        count: 1,
      },
      {
        id: "2",
        imgUrl: "https://picsum.photos/id/238/200/300",
        title: "Product 2",
        cost: 200,
        count: 1,
      },
    ],
    comment: "",
  }),
  actions: {
    addCart(cart) {
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
        cost += i.cost * i.count;
      });
      return cost;
    },
  },
});
export default useCartsStore;
