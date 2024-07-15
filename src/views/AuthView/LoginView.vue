<script setup>
import useAuthStore from "@/store/auth";
import { reactive } from "vue";
const authStore = useAuthStore();
const authData = reactive({
  username: null,
  password: null,
});

const handleLogin = () => {
  authStore.LoginUser(authData);
};
</script>
<template>
  <div class="login">
    <form @submit.prevent="handleLogin">
      <h1>Login</h1>
      <div class="username">
        <label for="username">Username</label>
        <input
          v-model="authData.username"
          type="text"
          name="username"
          id="username"
        />
      </div>
      <div class="password">
        <label for="password">Password</label>
        <input
          v-model="authData.password"
          type="password"
          name="password"
          id="password"
        />
      </div>
      <div class="avatar-upload">
        <label for="avatar">Avatar</label>
        <input type="file" name="avatar" id="avatar" />
      </div>
      <button type="submit">Login</button>
    </form>
    <router-link to="/registration">Register</router-link>
  </div>
</template>

<style scoped lang="scss"></style>
