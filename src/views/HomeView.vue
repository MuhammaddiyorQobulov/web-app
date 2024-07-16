<script setup>
import HeaderComponent from "@/layouts/HeaderComponent.vue";
import CFooter from "@/layouts/CFooter.vue";
import { onMounted } from "vue";
import useAuthStore from "@/store/auth";
const authStore = useAuthStore();
onMounted(() => {
  authStore.GetUser();
});
</script>
<template>
  <header-component class="container" />
  <router-view />
  <c-footer />
</template>
<style scoped lang="scss"></style>
