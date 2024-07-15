<script setup>
import { LogoIcon } from "@/assets/icons/logo";
import { UserIcon } from "@/assets/icons/user";
import MainSearch from "../components/MainSearch.vue";
import { DownOutlined } from "@ant-design/icons-vue";
import useAuthStore from "@/store/auth";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
onMounted(() => {
  authStore.GetUser();
});
</script>
<template>
  <div class="header">
    <router-link to="/">
      <LogoIcon />
    </router-link>
    <div class="search-bar">
      <main-search />
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

          <router-link to="/#">
            <a-menu-item key="2">Buyurtmalar</a-menu-item>
          </router-link>

          <router-link to="/carts">
            <a-menu-item key="3">Korzinka</a-menu-item>
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
      overflow: hidden;
      .img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
