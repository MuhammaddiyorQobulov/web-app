<script setup>
import { onMounted } from "vue";
import useOrdersStore from "@/store/order";
import OrderBox from "@/components/OrderBox.vue";
const ordersStore = useOrdersStore();
onMounted(() => {
  ordersStore.getUserOrders();
});
</script>
<template>
  <div class="orders flex container">
    <div class="order" v-for="order in ordersStore.orders" :key="order._id">
      <order-box v-for="p in order.products" :key="p._id" :product="p" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables";
.orders {
  flex-direction: column-reverse;
  .order {
    border: 1px solid $shadow-light;
    padding: 2rem;
    display: flex;
    overflow: hidden;
    gap: 1rem;
    flex-direction: column;
    width: max-content;
    border-radius: 8px;
    margin: 1rem;
  }
}
</style>
