<script setup>
import { reactive, ref } from "vue";
import useAuthStore from "@/store/auth";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const authData = reactive({
  username: null,
  password: null,
  confirm: null,
});

const imgRef = ref(null);
const router = useRouter();
const handleRegistration = async () => {
  await authStore.RegistrationUser({
    ...authData,
    avatar: imgRef.value.files[0],
  });
  if (!authStore.error) {
    authStore.SetToken(authStore.token);
    router.push("/");
  }
};
</script>
<template>
  <div class="wrapper flex">
    <div class="registration">
      <form @submit.prevent="handleRegistration">
        <h1>Registration</h1>
        <div class="input-group username">
          <label for="username">Username</label>
          <input
            v-model="authData.username"
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div class="input-group password">
          <label for="password">Password</label>
          <input
            v-model="authData.password"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div class="input-group confirm">
          <label for="confirm">Confirm</label>
          <input
            v-model="authData.confirm"
            type="password"
            name="confirm"
            id="confirm"
          />
        </div>
        <div class="input-group avatar-upload">
          <label for="avatar">Avatar</label>
          <input ref="imgRef" type="file" name="avatar" id="avatar" />
        </div>
        <div class="submit-btn">
          <button class="btn" type="submit">Registration</button>
        </div>
        <p>
          Agar oldin ro'yhatdan o'tkan bo'lsangiz
          <router-link to="/login">Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";
.wrapper {
  background: url("@/assets/images/main-bg.png") no-repeat center;
  background-size: cover;
  height: 100vh;
  .registration {
    form {
      margin: 4rem 0;
      background: $white;
      display: flex;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      flex-direction: column;
      gap: 1rem;
      width: 360px;
      padding: 2rem;
      border-radius: 10px;
      .input-group {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        input {
          background: transparent;
          padding: 0.5rem;
          border-radius: 8px;
          border: 1px solid $shadow-light;
        }
      }
      .submit-btn {
        position: relative;
        .btn {
          width: 100%;
          border: none;
          padding: 0.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          background: $primary;
          &:active {
            transform: scale(0.99);
          }
        }
      }
    }
  }
}
</style>
