<script setup>
import useProductsData from "@/store/products";
import useTypeStore from "@/store/type";
import { onMounted, ref } from "vue";
import CTable from "./components/CTable.vue";
import { ProductsColumn } from "./components/columns";
import ModalComponent from "@/components/ModalComponent.vue";
import AddProduct from "./components/AddProduct.vue";
import EditProduct from "./components/EditProduct.vue";
import { PlusIcon } from "@/assets/icons/plus";
onMounted(() => {
  productsStore.getProducts();
  typeStore.getTypes();
});

const typeStore = useTypeStore();
const productsStore = useProductsData();
const isEdit = ref(false);
const isDelete = ref(false);
const isAdd = ref(false);
const productId = ref(null);

const DeleteSubmmit = () => {
  productsStore.deleteProduct(productId.value);
  isDelete.value = false;
};
</script>
<template>
  <div class="wrapper">
    <div class="top">
      <h1>Products</h1>
      <div class="create-btn" @click="isAdd = true">
        <button class="btn">Add</button>
        <plus-icon />
      </div>
    </div>
    <div class="products">
      <c-table
        :data="productsStore.products"
        :loading="productsStore.isFetching"
        :tagsType="typeStore.types"
        :columns="
          ProductsColumn(
            (id) => {
              isEdit = true;
              productId = id;
            },
            (id) => {
              isDelete = true;
              productId = id;
            }
          )
        "
      />
    </div>
    <modal-component
      v-if="isAdd"
      @closeModal="
        () => {
          isAdd = false;
        }
      "
    >
      <add-product
        :data="productsStore.product"
        @onClick="
          () => {
            isAdd = false;
          }
        "
      />
    </modal-component>
    <modal-component
      v-if="isEdit"
      @closeModal="
        () => {
          isEdit = false;
        }
      "
    >
      <edit-product
        :id="productId"
        @onClick="
          () => {
            isEdit = false;
          }
        "
      />
    </modal-component>
    <modal-component
      v-if="isDelete"
      @closeModal="
        () => {
          isDelete = false;
        }
      "
    >
      <p class="bold-4">Mahsulotni o'chirishni istaysizmi!</p>
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
@import "@/styles/variables.scss";
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  .top {
    display: flex;
    justify-content: space-between;
  }
  .create-btn {
    display: flex;
    margin-bottom: 1rem;
    margin-left: auto;
    gap: 1rem;
    align-items: center;
    color: $black;
    cursor: pointer;
    padding: 0.5rem 1.5rem;
    border: 4px dashed $primary;
    width: max-content;
    border-radius: 8px;
    transition: 0.3s ease-in-out;
    user-select: none;
    .btn {
      font-size: 18px;
      cursor: pointer;
      background: transparent;
      border: none;
      padding: 0;
    }

    &:active {
      transform: scale(0.95);
    }
    &:hover {
      border-color: $btn-success;
    }
  }
  .modal-form {
    width: 500px;

    .avatar {
      .upload-list-inline >>> .ant-upload-list-item {
        float: left;
        width: 200px;
        margin-right: 8px;
      }
      .upload-list-inline >>> .ant-upload-animate-enter {
        animation-name: uploadAnimateInlineIn;
      }
      .upload-list-inline >>> .ant-upload-animate-leave {
        animation-name: uploadAnimateInlineOut;
      }
    }
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
}
</style>
