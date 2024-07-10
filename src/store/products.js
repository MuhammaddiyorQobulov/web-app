import { defineStore } from "pinia";

const useProductsData = defineStore("products", {
  state: () => ({
    products: [
      {
        id: "1",
        imgUrl: "https://picsum.photos/id/237/200/300",
        name: "Product 1",
        price: 100,
      },
      {
        id: "2",
        imgUrl: "https://picsum.photos/id/238/200/300",
        name: "Product 2",
        price: 200,
      },
      {
        id: "3",
        imgUrl: "https://picsum.photos/id/239/200/300",
        name: "Product 3",
        price: 300,
      },
      {
        id: "4",
        imgUrl: "https://picsum.photos/id/240/200/300",
        name: "Product 4",
        price: 400,
      },
      {
        id: "5",
        imgUrl: "https://picsum.photos/id/241/200/300",
        name: "Product 5",
        price: 500,
      },
      {
        id: "6",
        imgUrl: "https://picsum.photos/id/242/200/300",
        name: "Product 6",
        price: 600,
      },
      {
        id: "7",
        imgUrl: "https://picsum.photos/id/243/200/300",
        name: "Product 7",
        price: 700,
      },
      {
        id: "8",
        imgUrl: "https://picsum.photos/id/244/200/300",
        name: "Product 8",
        price: 800,
      },
    ],
  }),
});

export default useProductsData;
