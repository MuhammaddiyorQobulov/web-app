<script setup>
import { LogoIcon } from "@/assets/icons/logo";
import useAuthStore from "@/store/auth";
import { onBeforeMount } from "vue";
import { OrdersIcon } from "@/assets/icons/orders";
import { TickIcon } from "@/assets/icons/tick";
import { useRoute, useRouter } from "vue-router";
import UserOverlay from "@/components/UserOverlay.vue";
import { ProcessIcon } from "@/assets/icons/process";
const router = useRouter();
const authStore = useAuthStore();
const route = useRoute();
onBeforeMount(async () => {
  await authStore.CurrentUser();
  if (!authStore.user.roles.includes("DELIVER" || "ADMIN")) {
    router.push("/");
  }
});
</script>
<template>
  <div>
    <div class="wrapper">
      <div class="sidebar">
        <div class="logo">
          <router-link to="/">
            <logo-icon />
          </router-link>
        </div>
        <div class="menus">
          <router-link
            class="link"
            to="/deliver/new-orders"
            :class="route.path === '/deliver/new-orders' && 'active'"
          >
            <process-icon class="icon" />
            <h3 class="menu-title">Yangi buyurtmalar</h3>
            <p class="muted">Kelgan buyurtmalarni kuztish</p>
          </router-link>
          <router-link
            class="link"
            to="/deliver/my-orders"
            :class="route.path === '/deliver/my-orders' && 'active'"
          >
            <orders-icon class="icon" />
            <h3 class="menu-title">Jarayondagi buyurtmalar wefwef weferg</h3>
            <p class="muted">Kuryer olgan barcha jarayondagi buyurtmalari</p>
          </router-link>
          <router-link
            class="link"
            to="/deliver/delivered-orders"
            :class="route.path === '/deliver/delivered-orders' && 'active'"
          >
            <tick-icon class="icon" />
            <h3 class="menu-title">Yetkazilgan</h3>
            <p class="muted">Yetkazib berilgan buyurtmalar</p>
          </router-link>
        </div>
      </div>
      <div class="rigth-side">
        <div class="header">
          <user-overlay />
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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
      // box-shadow: 6px 1.5px 4px 4px $shadow-light;
      height: 70px;
      box-shadow: 0 -1px 0.5px 0.5px inset $shadow-light;
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
