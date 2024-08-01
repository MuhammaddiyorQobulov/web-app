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
@import "@/styles/responsive";
form {
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
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

@include screen("sm") {
  form {
    transform: scale(0.8);
    padding: 5px;
  }
}
@include screen("md") {
  form {
    transform: scale(0.8);
    padding: 5px;
  }
}
</style>
