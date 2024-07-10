<script setup>
import { LogoIcon } from "@/assets/icons/logo";
import { UserIcon } from "@/assets/icons/user";
import MainSearch from "../components/MainSearch.vue";
import { DownOutlined } from "@ant-design/icons-vue";
</script>
<template>
  <div class="header">
    <div class="logo">
      <LogoIcon />
    </div>
    <div class="search-bar">
      <main-search />
    </div>

    <a-dropdown>
      <a class="ant-dropdown-link user" @click.prevent>
        <div class="avatar">
          <user-icon />
        </div>
        <p>User Name</p>
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <router-link to="/#">
            <a-menu-item key="1">Profile</a-menu-item>
          </router-link>

          <router-link to="/#">
            <a-menu-item key="2">Buyurtmalar</a-menu-item>
          </router-link>

          <router-link to="/carts">
            <a-menu-item key="3">Korzinka</a-menu-item>
          </router-link>

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
  border-bottom: 1px solid $shadow-light;
  padding: 16px 24px;

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
