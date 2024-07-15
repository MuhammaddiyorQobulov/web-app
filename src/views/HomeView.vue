<script setup>
import HeaderComponent from "@/layouts/HeaderComponent.vue";
import CFooter from "@/layouts/CFooter.vue";
</script>
<template>
  <header-component class="container" />
  <router-view />
  <c-footer />
</template>
<style scoped lang="scss"></style>
