<script setup>
import ProductBox from "@/components/CProduct.vue";
import useCartsStore from "@/store/carts";
import useProductsData from "@/store/products";
import CartsModal from "@/layouts/CartsModal.vue";
import { onMounted } from "vue";
import useTypeStore from "@/store/type";
import FilterTag from "@/components/FilterTag.vue";
import { useRouter, useRoute } from "vue-router";
import { Empty } from "ant-design-vue";
import MainSearch from "@/components/MainSearch.vue";
const productsStore = useProductsData();
const cartsStore = useCartsStore();
const typeStore = useTypeStore();
const router = useRouter();
const route = useRoute();
onMounted(() => {
  productsStore.getProducts();
  typeStore.getTypes();
  cartsStore.getUserCarts();
});
const filterByType = (type) => {
  router.push({ query: { type } });
};
</script>
<template>
  <div class="home">
    <div class="main-image">
      <img src="@/assets/images/main-bg.png" alt="" />
    </div>
    <div class="search-bar container flex" v-if="route.path == '/'">
      <main-search @onChange="(a) => (productsStore.searchValue = a)" />
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
      <div v-if="productsStore.filterByType(route.query.type).length">
        <div
          v-if="
            (!route.query.type || t.type === route.query.type) &&
            productsStore
              .filterByType(t.type)
              .findIndex((p) => p.type == t.type) !== -1
          "
          class="wrapper container"
        >
          <h1 class="type-title bold-4">{{ t.title }}</h1>
          <div class="products">
            <product-box
              v-for="p in productsStore.filterByType(t.type)"
              :key="p._id"
              :product="p"
            />
          </div>
        </div>
      </div>
    </div>
    <Empty
      v-if="!productsStore.filterByType(route.query.type).length"
      description="Bunday turgagi mahsulotlar hozircha mavjud emas!"
      class="wrapper container"
    />
  </div>
  <carts-modal v-if="cartsStore.carts && cartsStore.carts.length" />
</template>
<style scoped lang="scss">
@import "@/styles/variables";
@import "@/styles/responsive";
.home {
  width: 100%;
  .main-image {
    img {
      width: 100%;
    }
  }
  .filters {
    display: flex;
    gap: 1rem;
    padding: 2rem 0;
    width: calc(100% - 10vw);
    height: 35px;
    overflow: scroll;
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

@include screen("sm") {
  .home {
    .filters {
      gap: 0;
      padding: 0.5rem;
    }
    .products {
      justify-content: center;
    }
  }
}
@include screen("md") {
  .home {
    .filters {
      padding: 0.5rem;
    }
    .products {
      justify-content: center;
    }
  }
}
</style>
