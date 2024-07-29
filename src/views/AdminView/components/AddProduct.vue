<script setup>
import useProductsData from "@/store/products";
import useTypeStore from "@/store/type";
import { message } from "ant-design-vue";
import { ref } from "vue";

const productsStore = useProductsData();
const typeStore = useTypeStore();
const { defineEmits } = "vue";
const emits = defineEmits(["onClick"]);
const imgRef = ref(null);
const product = {
  title: "",
  price: "",
  description: "",
  type: "",
};

const AddSubmit = () => {
  if (
    !product.title ||
    !product.price ||
    !product.description ||
    !product.type
  ) {
    message.error("Ma'lumotlarni to'liq to'ldiring");
    return;
  }
  if (!imgRef.value.files[0]) {
    message.error("Rasm tanlang");
    return;
  }
  productsStore.createProduct({ ...product, picture: imgRef.value.files[0] });
  emits("onClick");
};
</script>

<template>
  <div class="modal-form">
    <h1>Add</h1>
    <form action="" @submit.prevent="AddSubmit">
      <a-row :gutter="[16, 32]">
        <a-col :span="12">
          <div class="input-group">
            <label for="name">Name</label>
            <input v-model="product.title" type="text" name="name" id="name" />
          </div>
        </a-col>
        <a-col :span="12">
          <div class="input-group">
            <label for="price">Price</label>
            <input
              v-model="product.price"
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
              v-model="product.description"
              type="text"
              name="description"
              id="description"
              rows="6"
            />
          </div>
        </a-col>
        <a-col :span="12">
          <div class="input-group">
            <label for="type"> Type</label>
            <select v-model="product.type" name="type" id="type">
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
            <label for="img">Product Image</label>
            <input ref="imgRef" type="file" name="img" id="img" />
          </div>
        </a-col>
      </a-row>
      <button class="btn warning" type="submit">Save</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";
.btn {
  margin-top: 1rem;
  color: $black !important;
}
</style>
