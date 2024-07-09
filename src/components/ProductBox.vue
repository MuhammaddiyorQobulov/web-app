<template>
  <a-col :xs="12" :sm="12" :md="10" :lg="8" :xl="6" :xxl="4" class="product">
    <img class="img" src="@/assets/images/product2.png" alt="" />
    <p>Salat Nasuaz</p>
    <p>87.000 so'm</p>
  </a-col>
</template>

<script setup></script>

<style scoped lang="scss">
.product {
  .img {
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
  }
}
</style>
