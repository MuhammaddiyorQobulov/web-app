<script setup>
import useProductsData from "@/store/products";
import useTypeStore from "@/store/type";
import { onMounted, ref } from "vue";
const typeStore = useTypeStore();
const productsStore = useProductsData();
const { defineEmits, defineProps } = "vue";

const props = defineProps({
  id: { type: String, required: true },
});
onMounted(() => {
  productsStore.getProduct(props.id);
});
const imgRef = ref(null);

const emits = defineEmits(["onClick"]);
const EditSubmit = () => {
  productsStore.editProduct(props.id, {
    ...productsStore.product,
    picture: imgRef.value.files[0],
  });
  emits("onClick");
};
</script>

<template>
  <div class="modal-form" v-if="productsStore.product">
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
            <label for="type"> Type</label>
            <select v-model="productsStore.product.type" name="type" id="type">
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
      <button type="submit">Save</button>
    </form>
  </div>
  <div v-else>Loading...</div>
</template>

<style></style>
