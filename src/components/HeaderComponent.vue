<script setup>
import { LogoIcon } from "@/assets/icons/logo";
import { UserIcon } from "@/assets/icons/user";
import MainSearch from "../components/MainSearch.vue";
</script>
<template>
  <div class="header">
    <div class="logo">
      <LogoIcon />
    </div>
    <div class="search-bar">
      <main-search />
    </div>
    <div class="user">
      <div class="avatar">
        <user-icon />
      </div>
      <div class="user-name">User Name</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 16px 24px;
  .logo {
  }
  .search-bar {
    width: 500px;
  }
  .user {
    display: flex;
    align-items: center;
    gap: 1rem;
    .avatar {
      width: 50px;
      height: 50px;
      border: 1px solid black;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
