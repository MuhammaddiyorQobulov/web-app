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

    <a-dropdown v-model:visible="visible">
      <a class="ant-dropdown-link user" @click.prevent>
        <div class="avatar">
          <user-icon />
        </div>
        <p>User Name</p>
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="1">Profile</a-menu-item>
          <a-menu-item key="2">Buyurtmalar</a-menu-item>
          <a-menu-item key="3">Korzinka</a-menu-item>
          <a-menu-divider />
          <a-menu-item key="4">Chiqish</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
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
    gap: 0.5rem;
    cursor: pointer;
    .avatar {
      width: 40px;
      height: 40px;
      border: 1px solid black;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
