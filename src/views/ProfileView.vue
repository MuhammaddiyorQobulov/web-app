<script setup>
import useAuthStore from "@/store/auth";
import baseUrl from "@/utils/api/url";
import { HandleColor } from "./AdminView/components/columns";
import { EditIcon } from "@/assets/icons/edit";
import ModalComponent from "@/components/ModalComponent.vue";
import { ref } from "vue";
const authStore = useAuthStore();
const imgRef = ref(null);
const isModal = ref(false);
const UserRole = (role) => {
  switch (role) {
    case "ADMIN":
      return "Admin";
    case "USER":
      return "Foydalanuvchi";
    case "DELIVER":
      return "Kuryer";
    default:
      return "Foydalanuvchi";
  }
};
const FormSubmit = async () => {
  await authStore.EditProfile({
    avatar: imgRef.value.files[0],
  });
  if (!authStore.error) {
    location.reload();
  }
};
const CloseModal = (value) => {
  isModal.value = value;
  !value && authStore.defaultUser();
};
</script>
<template>
  <div class="container profile">
    <div class="avatar">
      <img :src="baseUrl + authStore.user.avatar" alt="avatar" />
    </div>
    <div class="user-infos">
      <div class="info">
        <h2>Username :</h2>
        <h1>{{ authStore.user.username }}</h1>
      </div>
      <div class="info">
        <h2>Telefon :</h2>
        <h2>{{ authStore.user.phone }}</h2>
      </div>
      <div class="roles info">
        <h2>Rollar :</h2>
        <a-tag
          class="role"
          :color="HandleColor(role)"
          v-for="role in authStore.user.roles"
          :key="role"
        >
          {{ UserRole(role) }}
        </a-tag>
      </div>
      <div class="info">
        <button @click="CloseModal(true)" class="edit btn warning">
          Tahrirlash <edit-icon />
        </button>
      </div>
    </div>
  </div>
  <modal-component v-if="isModal" @closeModal="CloseModal(false)">
    <form @submit.prevent="FormSubmit" class="modal-form">
      <h1>Edit</h1>
      <a-row :gutter="[16, 32]">
        <a-col span="12" class="input-group">
          <label for="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            v-model="authStore.user.username"
          />
        </a-col>
        <a-col span="12" class="input-group">
          <label for="phone">Phone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            v-model="authStore.user.phone"
          />
        </a-col>
        <a-col span="8" class="input-group">
          <label for="oldPassword">Old Password</label>
          <input
            type="oldPassword"
            name="oldPassword"
            id="oldPassword"
            v-model="authStore.user.oldPassword"
          />
        </a-col>
        <a-col span="8" class="input-group">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="authStore.user.password"
          />
        </a-col>
        <a-col span="8" class="input-group">
          <label for="confirm">Confirm</label>
          <input
            type="password"
            name="confirm"
            id="confirm"
            v-model="authStore.user.confirm"
          />
        </a-col>
        <a-col span="12" class="input-group">
          <label for="avatar">Avatar</label>
          <input ref="imgRef" type="file" name="avatar" id="avatar" />
        </a-col>
      </a-row>
      <button type="submit" class="btn warning">Tahrirlash</button>
    </form>
  </modal-component>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/responsive";
.profile {
  padding: 4rem 0;
  display: flex;
  gap: 4rem;
  width: calc(100% - 10vw);
  justify-content: center;
  .avatar {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 5px solid $grey;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
    }
  }
  .user-infos {
    height: 100%;
    .info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .edit {
      margin-left: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      gap: 0.5rem;
      margin-top: 3rem;
      color: $black !important;
    }
    .roles {
      gap: 0.5rem;
      .role {
        padding: 0.2rem 0.5rem;
        border-radius: 10px;
        font-size: 12px;
        height: max-content;
      }
    }
  }
}
.modal-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 50rem;
  h1 {
    font-size: 20px;
  }

  .btn {
    width: max-content;
    height: max-content;
    margin-left: auto;
    color: $black !important;
  }
}

@media screen and (max-width: 810px) {
  .profile {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    .avatar {
      width: 150px;
      height: 150px;
    }
    .user-infos {
      h2 {
        font-size: 16px;
      }
      h1 {
        font-size: 18px;
      }
    }
  }
}
</style>
