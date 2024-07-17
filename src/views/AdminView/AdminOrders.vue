<template>
  <div>
    <p>Admin Orders</p>
  </div>
</template>

<script setup>
import useAuthStore from "@/store/auth";
import { onMounted } from "vue";

const authStore = useAuthStore();

onMounted(() => {
  authStore.GetUser();
});
</script>

<style scoped lang="scss"></style>
