<script setup>
import { LogoIcon } from "@/assets/icons/logo";
import useAuthStore from "@/store/auth";
import { onMounted } from "vue";
import { OrdersIcon } from "@/assets/icons/orders";
import { DownOutlined } from "@ant-design/icons-vue";
import { TickIcon } from "@/assets/icons/tick";
import { StatisticsIcon } from "@/assets/icons/statistics";
import { ProductIcon } from "@/assets/icons/product";
import { UsersIcon } from "@/assets/icons/users";
import { useRoute, useRouter } from "vue-router";
import baseUrl from "@/utils/api/url";

const router = useRouter();
const authStore = useAuthStore();
const route = useRoute();
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
        <div class="menus">
          <router-link
            class="link"
            to="/admin/products"
            :class="route.path === '/admin/products' && 'active'"
          >
            <product-icon class="icon" />
            <h3 class="menu-title">Mahsulotlar</h3>
            <p class="muted">Mahsulotlar ustidan boshqarish</p>
          </router-link>
          <router-link
            class="link"
            to="/admin/orders"
            :class="route.path === '/admin/orders' && 'active'"
          >
            <orders-icon class="icon" />
            <h3 class="menu-title">Buyurtmalar</h3>
            <p class="muted">Kelgan buyurtmalarni kuztish</p>
          </router-link>
          <router-link
            class="link"
            to="/admin/delivered"
            :class="route.path === '/admin/delivered' && 'active'"
          >
            <tick-icon class="icon" />
            <h3 class="menu-title">Yetkazilgan</h3>
            <p class="muted">Yetkazib berilgan buyurtmalar</p>
          </router-link>
          <router-link
            class="link"
            to="/admin/statistics"
            :class="route.path === '/admin/statistics' && 'active'"
          >
            <statistics-icon class="icon" />
            <h3 class="menu-title">Statistika</h3>
            <p class="muted">Umimuy statistik malumotlar</p>
          </router-link>
          <router-link
            class="link"
            to="/admin/users"
            :class="route.path === '/admin/users' && 'active'"
          >
            <users-icon class="icon" />
            <h3 class="menu-title">Foydalanuvchilar</h3>
            <p class="muted">Foydalanuvchilarni boshqarish</p>
          </router-link>
        </div>
      </div>
      <div class="rigth-side">
        <div class="header">
          <a-dropdown v-if="authStore.token">
            <a class="ant-dropdown-link user" @click.prevent>
              <div class="avatar">
                <img
                  class="img"
                  v-if="authStore.user.avatar"
                  :src="baseUrl + authStore.user.avatar"
                  alt=""
                />
                <users-icon v-else />
              </div>
              <p>{{ authStore.user.username }}</p>
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu>
                <router-link v-if="route.path != '/#'" to="/#">
                  <a-menu-item key="1">Profile</a-menu-item>
                </router-link>

                <router-link v-if="route.path != '/orders'" to="/orders">
                  <a-menu-item key="2">Buyurtmalar</a-menu-item>
                </router-link>

                <router-link v-if="route.path != '/carts'" to="/carts">
                  <a-menu-item key="3">Korzinka</a-menu-item>
                </router-link>

                <router-link v-if="!authStore.isAdmin" to="/admin">
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
        <div class="body">
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

  .icon {
    float: left;
    padding: 0.5rem;
  }
  .sidebar {
    width: 20%;
    background: rgba($primary, 0.2);
    padding: 1rem 2rem;
    box-shadow: 1px 0px 1px 1px $shadow-light;
    .logo {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
    }
    .menus {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      color: red;
      .link {
        border-radius: 10px;
        padding: 0.5rem;
        border: 1px solid $shadow-light;
      }
      .active {
        background: rgba($primary, 0.8);
      }

      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
      }
      .menu-title {
        color: rgba($black, 87%);
        font-weight: 500;
        line-height: 20px;
      }
    }
  }

  .rigth-side {
    width: 80%;
    height: 100%;
    .header {
      padding: 0 2rem;
      display: flex;
      justify-content: end;
      box-shadow: 6px 1.5px 4px 4px $shadow-light;
      height: 70px;

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
      height: calc(100% - 70px - 4rem);
      overflow-y: scroll;
      overflow-x: hidden;
      padding: 2rem;
    }
  }
}
</style>
