<script setup>
import useProductsData from "@/store/products";
import useTypeStore from "@/store/type";
import { onMounted, ref } from "vue";
import CTable from "./components/CTable.vue";
import { ProductsColumn } from "./components/columns";
import ModalComponent from "@/components/ModalComponent.vue";
import AddProduct from "./components/AddProduct.vue";
import EditProduct from "./components/EditProduct.vue";
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
  console.log(productId.value);
  isDelete.value = false;
};
</script>
<template>
  <div class="wrapper">
    <p>Products</p>
    <button @click="isAdd = true">Add</button>
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
      <div class="modal-edit">
        <form action="" @submit.prevent="DeleteSubmmit">
          <button type="submit">Delete</button>
        </form>
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
}
</style>
