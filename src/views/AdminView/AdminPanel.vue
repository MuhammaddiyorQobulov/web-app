<script setup>
import { LogoIcon } from "@/assets/icons/logo";
import useAuthStore from "@/store/auth";
import { onMounted } from "vue";

const authStore = useAuthStore();

onMounted(() => {
  authStore.GetUser();
});
</script>
<template>
  <div>
    <div class="wrapper">
      <div class="sidebar">
        <div class="logo">
          <logo-icon />
        </div>
        <div class="menu">
          <router-link to="/admin/products"
            ><h3 class="menu-title">Mahsulotlar</h3>
            <p class="muted">Mahsulotlar ustidan boshqarish</p>
          </router-link>
          <router-link to="/admin/orders"
            ><h3 class="menu-title">Buyurtmalar</h3>
            <p class="muted">Kelgan buyurtmalarni kuztish</p>
          </router-link>
          <router-link to="/admin/delivered"
            ><h3 class="menu-title">Yetkazilgan</h3>
            <p class="muted">Yetkazib berilgan buyurtmalar</p>
          </router-link>
          <router-link to="/admin/statistics"
            ><h3 class="menu-title">Statistika</h3>
            <p class="muted">Umimuy statistik malumotlar</p>
          </router-link>
          <router-link to="/admin/users"
            ><h3 class="menu-title">Foydalanuvchilar</h3>
            <p class="muted">Foydalanuvchilarni boshqarish</p>
          </router-link>
        </div>
      </div>
      <div class="rigth-side">
        <div class="header container">
          <a class="ant-dropdown-link user" @click.prevent>
            <div class="avatar">
              <img
                class="img"
                v-if="authStore.user.avatar"
                :src="'htt/' + authStore.user.avatar"
                alt=""
              />
              <user-icon v-else />
            </div>
            <p>{{ authStore.user.username }}</p>
            <DownOutlined />
          </a>
        </div>
        <div class="body container">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";
.wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
  border: 1px solid red;
  .sidebar {
    border: 2px solid $shadow-light;
    width: 20%;
    .logo {
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;
    }
    .menu {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  .rigth-side {
    width: 80%;
    .header {
      border: 1px solid blue;
      display: flex;
      justify-content: end;
      .user {
        padding: 1rem 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        margin-left: auto;
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
    .body {
    }
  }
}
</style>
