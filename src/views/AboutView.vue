<template>
  <div class="about" @click="mainStore.increment">{{ mainStore.count }}</div>
</template>

<script setup>
import useMainStore from "../store/main.pinia.js";
const mainStore = useMainStore();
</script>

<style scoped lang="scss"></style>
