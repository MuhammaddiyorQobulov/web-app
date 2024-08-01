<script setup>
import useAuthStore from "@/store/auth";
import { reactive } from "vue";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const authData = reactive({
  username: null,
  password: null,
});

const router = useRouter();
const handleLogin = async () => {
  await authStore.LoginUser(authData);

  if (!authStore.error) {
    authStore.SetToken(authStore.token);
    router.push("/");
  }
};
</script>
<template>
  <div class="wrapper flex">
    <div class="login">
      <form @submit.prevent="handleLogin">
        <h1>Login</h1>
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
        <div class="submit-btn">
          <button class="btn" type="submit">Login</button>
        </div>

        <router-link to="/registration">Ro'yhatdan o'tish</router-link>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/responsive";
.wrapper {
  background: url("@/assets/images/main-bg.png") no-repeat center;
  background-size: cover;
  height: 100vh;

  .login {
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
        }
      }
    }
  }
}

@include screen("sm") {
  .wrapper {
    .login {
      transform: scale(0.7);
    }
  }
}
@include screen("md") {
  .wrapper {
    .login {
      transform: scale(0.8);
    }
  }
}
</style>
