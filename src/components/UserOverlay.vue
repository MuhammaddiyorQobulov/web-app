<script setup>
import { DownOutlined } from "@ant-design/icons-vue";
import { UsersIcon } from "@/assets/icons/users";
import baseUrl from "@/utils/api/url";
import useAuthStore from "@/store/auth";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
</script>

<template>
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
        <router-link v-if="route.path != '/profile'" to="/profile">
          <a-menu-item key="1">Profile</a-menu-item>
        </router-link>

        <router-link v-if="route.path != '/orders'" to="/orders">
          <a-menu-item key="2">Buyurtmalar</a-menu-item>
        </router-link>

        <router-link v-if="route.path != '/carts'" to="/carts">
          <a-menu-item key="3">Korzinka</a-menu-item>
        </router-link>

        <router-link
          v-if="authStore.isAdmin && !route.path.includes('/admin')"
          to="/admin/products"
        >
          <a-menu-item key="5">Admin Paneli</a-menu-item>
        </router-link>

        <router-link
          v-if="
            (authStore.isAdmin || !authStore.user.roles.indexOf('DELIVER')) &&
            !route.path.includes('/deliver')
          "
          to="/deliver/new-orders"
        >
          <a-menu-item key="6">Kuryer Paneli</a-menu-item>
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
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/responsive.scss";

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

@include screen("sm") {
  .user {
    .avatar {
      height: 25px;
      width: 25px;
    }
    .name {
      display: none;
    }
  }
  .anticon {
    display: none;
  }
}
@include screen("md") {
  .user {
    .avatar {
      height: 25px;
      width: 25px;
    }
    .name {
      display: none;
    }
  }
  .anticon {
    display: none;
  }
}
</style>
