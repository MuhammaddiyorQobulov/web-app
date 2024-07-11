import { defineStore } from "pinia";

const useMainStore = defineStore("main", {
  state: () => ({
    quantity: 0,
  }),
  actions: {
    increment() {
      this.quantity++;
    },
  },
});

export default useMainStore;
