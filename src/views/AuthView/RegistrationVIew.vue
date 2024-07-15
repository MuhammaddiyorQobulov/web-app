<script setup>
import { reactive, ref } from "vue";
import useAuthStore from "@/store/auth";
const authStore = useAuthStore();
const authData = reactive({
  username: null,
  password: null,
  confirm: null,
});
const imgRef = ref(null);
const handleRegistration = () => {
  authStore.RegistrationUser({
    ...authData,
    avatar: imgRef.value.files[0],
  });
};
</script>
<template>
  <div class="registration">
    <form @submit.prevent="handleRegistration">
      <h1>Registration</h1>
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
      <div class="confirm">
        <label for="confirm">Confirm</label>
        <input
          v-model="authData.confirm"
          type="password"
          name="confirm"
          id="confirm"
        />
      </div>
      <div class="avatar-upload">
        <label for="avatar">Avatar</label>
        <input ref="imgRef" type="file" name="avatar" id="avatar" />
      </div>
      <button type="submit">Registration</button>
    </form>
    <router-link to="/login">Login</router-link>
  </div>
</template>

<style scoped lang="scss"></style>
