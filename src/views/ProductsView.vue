<script setup>
import ProductBox from "@/components/CProduct.vue";
import useCartsStore from "@/store/carts";
import useProductsData from "@/store/products";
import CartsModal from "@/layouts/CartsModal.vue";
import { onMounted } from "vue";
import useTypeStore from "@/store/type";
import FilterTag from "@/components/FilterTag.vue";
import { useRouter, useRoute } from "vue-router";

const productsStore = useProductsData();
const cartsStore = useCartsStore();
const typeStore = useTypeStore();
const router = useRouter();
const route = useRoute();
onMounted(() => {
  productsStore.getProducts({type:route.query.type});
  typeStore.getTypes();
  cartsStore.getUserCarts();
});
const filterByType = (type) => {
  router.push({ query: { type } });
  productsStore.getProducts({ type });
};
</script>
<template>
  <div class="home">
    <div class="main-image">
      <img src="@/assets/images/main-bg.png" alt="" />
    </div>
    <div class="filters container">
      <filter-tag title="Hammasi" @onClick="filterByType" />
      <filter-tag
        v-for="item in typeStore.types"
        :key="item._id"
        :title="item.title"
        :type="item.type"
        @onClick="filterByType(item.type)"
      />
    </div>
    <div v-for="t in typeStore.types" :key="t._id">
      <div v-if="productsStore.products.length">
        <div
          v-if="productsStore.filterByType(t.type).length > 0"
          class="wrapper container"
        >
          <h1 class="type-title bold-4">{{ t.title }}</h1>
          <div class="products">
            <product-box
              v-for="p in productsStore.filterByType(route.query.type || 'all')"
              :key="p._id"
              :product="p"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="!productsStore.products.length" class="wrapper container">
      Bunday turgagi mahsulotlar hozircha mavjud emas!
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
  .filters {
    display: flex;
    gap: 1rem;
    padding: 2rem 0;
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
