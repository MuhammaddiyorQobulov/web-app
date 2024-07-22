<script setup>
import { defineEmits, defineProps, onMounted } from "vue";
import useAuthStore from "@/store/auth";

const emits = defineEmits(["onClick"]);
const props = defineProps({
  userId: { type: String, required: true },
});

onMounted(() => {
  authStore.getOneUser(props.userId);
});
const authStore = useAuthStore();
</script>

<template>
  <form
    v-if="authStore.editingUser"
    @submit.prevent="emits('onClick')"
    class="edit-form"
  >
    <h1>Edit User</h1>
    <a-select
      v-model:value="authStore.editingUser.roles"
      label-in-value
      mode="multiple"
      :loading="authStore.isFetching"
      style="width: 100%"
      :width="400"
      :options="[
        {
          value: 'ADMIN',
          label: 'Admin',
        },
        {
          value: 'DELIVER',
          label: 'Kuryer',
        },
        {
          value: 'USER',
          label: 'Foydalanuvchi',
        },
      ]"
      @change="
        (value) => {
          authStore.editingUser.roles = [...value.map((v) => v.key)];
        }
      "
    />
    <div class="actions">
      <button class="btn warning" @click="() => (isDelete = false)">
        Cancel
      </button>
      <button class="btn danger" type="submit">Submit</button>
    </div>
  </form>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";
.edit-form {
  width: 400px;
  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    height: 100%;
    margin-top: 1rem;
    .btn {
      padding: 5px 10px;
      background-color: $primary;
      color: $black;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>
