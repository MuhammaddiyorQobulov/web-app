<script setup>
import useProductsData from "@/store/products";
import useTypeStore from "@/store/type";
import { onMounted, ref } from "vue";
import CTable from "./components/CTable.vue";
import { ProductsColumn } from "./components/columns";
import ModalComponent from "@/components/ModalComponent.vue";
import baseUrl from "@/utils/api/url";
onMounted(() => {
  productsStore.getProducts();
  typeStore.getTypes();
});

const typeStore = useTypeStore();
const productsStore = useProductsData();
const isEdit = ref(false);
const isDelete = ref(false);
const productId = ref(null);

const EditSubmit = () => {
  isEdit.value = false;
  console.log(productsStore.product);
};
const DeleteSubmmit = () => {
  console.log(productId.value);
  isDelete.value = false;
};
</script>
<template>
  <div class="wrapper">
    <p>Products</p>
    <div class="products">
      <c-table
        :data="productsStore.products"
        :loading="productsStore.isFetching"
        :tagsType="typeStore.types"
        :columns="
          ProductsColumn(
            (id) => {
              isEdit = true;
              productsStore.SingleProduct(id);
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
      v-if="isEdit && productsStore.product"
      @closeModal="
        () => {
          isEdit = false;
        }
      "
    >
      <div class="modal-edit">
        <h1>Edit</h1>
        <form action="" @submit.prevent="EditSubmit">
          <a-row :gutter="[16, 32]">
            <a-col :span="12">
              <div class="input-group">
                <label for="name">Name</label>
                <input
                  v-model="productsStore.product.title"
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
            </a-col>
            <a-col :span="12">
              <div class="input-group">
                <label for="price">Price</label>
                <input
                  v-model="productsStore.product.price"
                  type="text"
                  name="price"
                  id="price"
                />
              </div>
            </a-col>
            <a-col :span="24">
              <div class="input-group">
                <label for="description">Description</label>
                <textarea
                  v-model="productsStore.product.description"
                  type="text"
                  name="description"
                  id="description"
                  rows="6"
                />
              </div>
            </a-col>
            <a-col :span="12">
              <div class="input-group">
                <label for="type">Product Type</label>
                <select
                  v-model="productsStore.product.type"
                  name="type"
                  id="type"
                >
                  <option
                    v-for="t in typeStore.types"
                    :key="t.type"
                    :value="t.type"
                  >
                    {{ t.title }}
                  </option>
                </select>
              </div>
            </a-col>
            <a-col :span="12">
              <div class="input-group avatar-upload">
                <label for="avatar">Product Image</label>
                <a-upload
                  :action="(file) => console.log(file)"
                  list-type="picture-card"
                  :default-file-list="[
                    {
                      url: baseUrl + productsStore.product.imgUrl,
                    },
                  ]"
                  id="avatar"
                >
                  <a-button>+</a-button>
                </a-upload>
              </div>
            </a-col>
          </a-row>
          <button type="submit">Save</button>
        </form>
      </div>
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

  .modal-edit {
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
