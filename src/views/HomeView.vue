<script setup>
import ProductBox from "@/components/CProduct.vue";

const products = [
  {
    id: 1,
    imgUrl: "https://picsum.photos/id/237/200/300",
    title: "Product 1",
    cost: 100,
  },
  {
    id: 2,
    imgUrl: "https://picsum.photos/id/238/200/300",
    title: "Product 2",
    cost: 200,
  },
  {
    id: 3,
    imgUrl: "https://picsum.photos/id/239/200/300",
    title: "Product 3",
    cost: 300,
  },
  {
    id: 4,
    imgUrl: "https://picsum.photos/id/240/200/300",
    title: "Product 4",
    cost: 400,
  },
  {
    id: 5,
    imgUrl: "https://picsum.photos/id/241/200/300",
    title: "Product 5",
    cost: 500,
  },
  {
    id: 6,
    imgUrl: "https://picsum.photos/id/242/200/300",
    title: "Product 6",
    cost: 600,
  },
  {
    id: 7,
    imgUrl: "https://picsum.photos/id/243/200/300",
    title: "Product 7",
    cost: 700,
  },
  {
    id: 8,
    imgUrl: "https://picsum.photos/id/244/200/300",
    title: "Product 8",
    cost: 800,
  },
];
</script>
<template>
  <div class="home">
    <div class="main-image">
      <img src="@/assets/images/main-bg.png" alt="" />
    </div>

    <div class="wrapper container">
      <h1 class="type-title bold-4">Products</h1>
      <div class="products">
        <product-box v-for="i in products" :key="i" :product="i" />
      </div>
    </div>

  </div>
</template>
<style scoped lang="scss">
.home {
  width: 100%;
  .main-image {
    img {
      width: 100%;
      height: max-content;
    }
  }
  .wrapper {        
    padding: 4rem 0;
    .type-title {
      margin: 2rem 0;
    }
    .products {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1.5rem;
    }
  }
}
</style>
