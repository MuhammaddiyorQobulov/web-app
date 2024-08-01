<script setup>
import { CartIcon } from "@/assets/icons/cart";
import useCartsStore from "@/store/carts";
const cartsStore = useCartsStore();
</script>
<template>
  <div class="carts-modal flex">
    <div class="total">
      <p>Tanlangan:</p>
      <p class="bold-4">{{ cartsStore.carts.length }}ta</p>
      <p>Jami narx:</p>
      <p class="bold-4">{{ cartsStore.total }}</p>
    </div>
    <router-link to="/carts">
      <div class="cart">
        <cart-icon />
        <h2 class="bold-4">Savatcha</h2>
      </div>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables";
@import "@/styles/responsive";
.carts-modal {
  position: fixed;
  width: 400px;
  height: max-content;
  left: calc((100% - 400px - 1rem) / 2);
  bottom: 20px;
  z-index: 1;
  background: $white;
  border-radius: 10px;
  justify-content: space-between;
  overflow: hidden;
  height: 60px;
  box-shadow: #000 0px 0px 20px 1px;

  .total {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 1rem;
    gap: 5px;
    justify-content: start;
  }
  .cart {
    display: flex;
    color: black;
    background: $btn-warning;
    gap: 0.5rem;
    padding: 1rem;
    list-style: none;
    text-decoration: none;
  }
}

@include screen("sm") {
  .carts-modal {
    transform: scale(0.7);
    bottom: 10px;
  }
}
</style>
