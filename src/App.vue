<script setup>
import HeaderComponent from "@/components/HeaderComponent.vue";
import CFooter from "@/components/CFooter.vue";
</script>
<template>
  <header-component class="container" />
  <router-view />
  <c-footer />
</template>

<style scoped lang="scss"></style>
