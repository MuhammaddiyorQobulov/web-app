<script setup>
import { onMounted, reactive, ref } from "vue";
import CTable from "./components/CTable.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import useAuthStore from "@/store/auth";
import { Empty } from "ant-design-vue";
import { UsersColumn } from "./components/columns";
import EditUser from "./components/EditUser.vue";
const isEdit = ref(false);
const isDelete = ref(false);
const userId = ref(null);
const authStore = useAuthStore();
const user = reactive({});
onMounted(() => {
  authStore.GetUsers();
});
const DeleteSubmmit = async () => {
  await authStore.DeleteUser(userId.value);
  if (!authStore.error) {
    isDelete.value = false;
  }
};

const EditSubmmit = async () => {
  await authStore.EditUser(userId.value);
  if (!authStore.error) {
    isEdit.value = false;
  }
};
</script>

<template>
  <div>
    <h1>Users</h1>
    <c-table
      v-if="authStore.users"
      :data="authStore.users"
      :columns="[
        ...UsersColumn,
        {
          title: 'Amallar',
          key: 'action',
          width: 100,
          edit: {
            title: 'edit',
            function: (id) => {
              isEdit = true;
              userId = id;
            },
          },
          delete: {
            title: 'delete',
            function: (id) => {
              isDelete = true;
              userId = id;
            },
          },
        },
      ]"
      :loading="authStore.isFetching"
    />

    <div v-else>
      <Empty description="Users not found" />
    </div>

    <modal-component @closeModal="isEdit = false" v-if="isEdit && user">
      <edit-user @onClick="EditSubmmit" :userId="userId" />
    </modal-component>

    <modal-component
      v-if="isDelete"
      @closeModal="
        () => {
          isDelete = false;
        }
      "
    >
      <p class="bold-4">Foydalanuvchini o'chirib yuborishni istaysizmi!</p>
      <div class="modal-delete">
        <button class="btn warning" @click="() => (isDelete = false)">
          Cancel
        </button>
        <button class="btn danger" @click="DeleteSubmmit">Delete</button>
      </div>
    </modal-component>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables";
.modal-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.modal-delete {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  height: 100%;
  .btn {
    padding: 5px 10px;
    background-color: $primary;
    color: $black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
