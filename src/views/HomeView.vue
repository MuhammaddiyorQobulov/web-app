<script setup>
import ProductBox from "@/components/CProduct.vue";
import useCartsStore from "@/store/carts";
import useProductsData from "@/store/products";
const productStore = useProductsData();
const cartsStore = useCartsStore();
const { products } = productStore;

const addToCart = (cart) => {
  cartsStore.addCart(cart);
};
</script>
<template>
  <div class="home">
    <div class="main-image">
      <img src="@/assets/images/main-bg.png" alt="" />
    </div>
    <div class="wrapper container">
      <h1 class="type-title bold-4">Products</h1>
      <div class="products">
        <product-box v-for="p in products" @addToCart="addToCart(p)" :key="p.id" :product="p" />
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
