<script setup>
import ProductBox from "@/components/CProduct.vue";
import useCartsStore from "@/store/carts";
import useProductsData from "@/store/products";
import CartsModal from "@/layouts/CartsModal.vue";
import { onMounted } from "vue";
import useTypeStore from "@/store/type";

const productsStore = useProductsData();
const cartsStore = useCartsStore();
const typeStore = useTypeStore();

const addToCart = (cart) => {
  cartsStore.addCart(cart);
};

onMounted(() => {
  productsStore.getProducts();
  typeStore.getTypes();
  console.log(typeStore.types);
});
</script>
<template>
  <div class="home">
    <div class="main-image">
      <img src="@/assets/images/main-bg.png" alt="" />
    </div>
    <div v-for="t in typeStore.types" :key="t._id">
      <div v-if="productsStore.products.length">
        <div
          v-if="productsStore.filterByType(t.type).length"
          class="wrapper container"
        >
          <h1 class="type-title bold-4">{{ t.title }}</h1>
          <div class="products">
            <product-box
              v-for="p in productsStore.filterByType(t.type)"
              @addToCart="addToCart(p)"
              :key="p._id"
              :product="p"
            />
          </div>
        </div>
      </div>
      <div v-else class="wrapper container">Mahsulotlar topilmadi!</div>
    </div>
  </div>
  <carts-modal v-if="cartsStore.carts.length" />
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
    padding: 2rem 0;
    .type-title {
      margin: 2rem 0;
    }
    .products {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
    }
  }
}
</style>
