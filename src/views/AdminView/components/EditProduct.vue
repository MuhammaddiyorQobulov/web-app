<script setup>
import useTypeStore from "@/store/type";
import { ref } from "vue";
const typeStore = useTypeStore();
const { defineEmits, defineProps } = "vue";

defineProps({
  data: Object,
});
const imgRef = ref(null);
const product = {
  title: "",
  price: "",
  description: "",
  type: "",
};

const emits = defineEmits(["onClick"]);
const EditSubmit = () => {
  emits("onClick");
  console.log(product);
};
</script>

<template>
  <div class="modal-edit">
    <h1>Edit</h1>
    <form action="" @submit.prevent="EditSubmit">
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
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<style></style>
