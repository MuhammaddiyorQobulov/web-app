<script setup>
import ProductBox from "@/components/ProductBox.vue";
</script>
<template>
  <div class="home">
    <div class="main-image">
      <img src="@/assets/images/main-bg.png" alt="" />
    </div>

    <a-row :gutter="[32, 32]" class="products container">
      <product-box v-for="i in 8" :key="i" />
    </a-row>
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
  .products {
    justify-content: center;
  }
}
</style>
