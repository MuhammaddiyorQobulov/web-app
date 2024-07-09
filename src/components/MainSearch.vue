<script setup>
import { SearchIcon } from "@/assets/icons/search";
import { ref, defineEmits } from "vue";
import { CloseIcon } from "@/assets/icons/close";

const emit = defineEmits(["onChange"]);
const handleSearch = () => {
  emit("onChange", model.value);
};
const model = ref("");
</script>

<template>
  <form @submit.prevent="handleSearch">
    <label for="search">
      <search-icon />
    </label>
    <input
      v-model="model"
      @input="handleSearch"
      type="text"
      id="search"
      placeholder="Izlash"
      @change="handleSearch"
    />
    <div class="close" v-if="model.trim()" @click="model = ''">
      <close-icon />
    </div>
  </form>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";

form {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 7px;
  padding: 10px;
  border: 1px solid $grey;
  input {
    border: none;
    outline: none;
    font-size: 15px;
    background: transparent;
    width: 100%;
  }
  label {
    color: $grey;
  }
  .close {
    cursor: pointer;
    &:active {
      transform: scale(0.9);
    }
  }
}
</style>
