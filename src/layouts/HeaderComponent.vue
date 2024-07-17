<script setup>
import { LogoIcon } from "@/assets/icons/logo";
import { UserIcon } from "@/assets/icons/user";
import MainSearch from "@/components/MainSearch.vue";
import { DownOutlined } from "@ant-design/icons-vue";
import useAuthStore from "@/store/auth";
import { useRoute, useRouter } from "vue-router";
import useProductsData from "@/store/products";

const authStore = useAuthStore();
const productsStore = useProductsData();
const route = useRoute();
const router = useRouter();
</script>
<template>
  <div class="header">
    <router-link to="/">
      <LogoIcon />
    </router-link>
    <div class="search-bar" v-if="route.path == '/'">
      <main-search @onChange="(a) => (productsStore.searchValue = a)" />
    </div>

    <a-dropdown v-if="authStore.token">
      <a class="ant-dropdown-link user" @click.prevent>
        <div class="avatar">
          <img
            class="img"
            v-if="authStore.user.avatar"
            :src="'http://localhost:5003/' + authStore.user.avatar"
            alt=""
          />
          <user-icon v-else />
        </div>
        <p>{{ authStore.user.username }}</p>
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <router-link to="/#">
            <a-menu-item key="1">Profile</a-menu-item>
          </router-link>

          <router-link to="/orders">
            <a-menu-item key="2">Buyurtmalar</a-menu-item>
          </router-link>

          <router-link to="/carts">
            <a-menu-item key="3">Korzinka</a-menu-item>
          </router-link>

          <router-link to="/admin-panel" v-if="authStore.isAdmin">
            <a-menu-item key="5">Admin Paneli</a-menu-item>
          </router-link>
          <a-menu-divider />
          <a-menu-item
            key="4"
            @click="
              () => {
                authStore.LogOut();
                router.push('/login');
              }
            "
            >Chiqish</a-menu-item
          >
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
  position: sticky;
  top: 0;
  left: 0;
  background: $white;
  box-shadow: 0 -1px 0.5px 0.5px inset $shadow-light;
  z-index: 10;

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
      overflow: hidden;
      .img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
