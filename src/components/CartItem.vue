<script setup>
import { defineProps } from "vue";
import { CloseIcon } from "@/assets/icons/close";
import { PlusIcon } from "@/assets/icons/plus";
import { MinusIcon } from "@/assets/icons/minus";
import useCartsStore from "@/store/carts";
import baseUrl from "@/utils/api/url";
const cartsStore = useCartsStore();
const props = defineProps({
  productId: {
    type: String,
    required: true,
  },
});
const item = cartsStore.getOneCart(props.productId);
</script>
<template>
  <a-row v-if="item" :gutter="[16, 16]" class="item flex">
    <div class="close-icon" @click="cartsStore.removeCart(item._id)">
      <close-icon />
    </div>
    <div class="image">
      <img :src="baseUrl + item.imgUrl" alt="image" />
    </div>
    <a-col
      :xs="24"
      :sm="12"
      :lg="8"
      :xl="10"
      :xxl="6"
      class="content flex"
    >
      <h2 class="title bold-4">{{ item.title }}</h2>

      <div class="flex">
        <div class="amount">{{ item.quantity }}</div>
        <pre> x </pre>
        <p>{{ item.price }}</p>
        <pre> = </pre>
        <p class="bold-4">{{ item.price * item.quantity }} so'm</p>
      </div>
    </a-col>
    <a-col class="quantity flex">
      <button
        @click="cartsStore.addCart(item._id, item.quantity - 1)"
        :disabled="item.quantity <= 1"
        class="btn danger"
      >
        <minus-icon />
      </button>
      <button
        @click="cartsStore.addCart(item._id, item.quantity + 1)"
        class="btn success"
      >
        <plus-icon />
      </button>
    </a-col>
    <a-col span="24" class="description">
      {{ item.description }}
    </a-col>
  </a-row>
</template>

<style scoped lang="scss">
@import "@/styles/variables";
.item {
  width: 100%;
  align-items: center;
  margin: 0 !important;
  border-bottom: 1px solid $shadow-light;
  padding: 2rem 0;
  .close-icon {
    background: $shadow-light;
    width: 15px;
    height: 15px;
    color: $white;
    padding: 0.5rem;
    border-radius: 100%;
    margin-right: 1rem;
    cursor: pointer;
    &:active {
      transform: scale(0.9);
    }
  }
  .image {
    position: relative;
    width: 200px;
    height: 120px;
    padding: 0 !important;
    border-radius: 8px;
    overflow: hidden;
    img {
      position: absolute;
      display: block;
      width: 100%;
    }
  }
  .content {
    flex-direction: column;
    gap: 0.5rem;
    .amount {
      background: $btn-danger;
      color: $white;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
    }
  }

  .quantity {
    gap: 0.5rem;
    button {
      padding: 0.4rem 0.8rem;
      background: transparent;
      border-radius: 4px;
      border: none;
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
  .description {
    text-align: center;
  }
}
</style>
