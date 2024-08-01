<script setup>
import { LogoIcon } from "@/assets/icons/logo";
import UserOverlay from "@/components/UserOverlay.vue";
</script>
<template>
  <div class="navbar">
    <router-link to="/">
      <logo-icon />
    </router-link>

    <user-overlay />
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/responsive.scss";
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 16px 24px;
  position: sticky;
  top: 0;
  left: 0;
  background: $white;
  box-shadow: 0 -1px 0.5px 0.5px inset $shadow-light;
  z-index: 10;
}

@include screen("sm") {
  .navbar {
    height: 20px;
    svg {
      height: 30px;
    }
  }
}
@include screen("md") {
  .navbar {
    height: 20px;
    svg {
      height: 30px;
    }
  }
}
</style>
