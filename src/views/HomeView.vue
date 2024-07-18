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
  <div class="home">
    <header-component class="container" />
    <router-view />
    <c-footer  class="footer"/>
  </div>
</template>
<style scoped lang="scss">
.home {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  .footer{
    margin-top: auto;
  }
}
</style>
