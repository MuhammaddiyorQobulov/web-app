<script setup>
import { onMounted } from "vue";
import useOrderStore from "@/store/order";
import OrderBox from "@/components/OrderBox.vue";

const ordersStore = useOrderStore();
onMounted(() => {
  ordersStore.getUserOrders();
  ordersStore.getStatuses();
});
</script>
<template>
  <div class="orders flex container">
    <div class="order" v-for="order in ordersStore.orders" :key="order._id">
      <order-box v-for="p in order.products" :key="p._id" :product="p" />
      <div class="infos flex">
        <div class="status" :class="order.status.toLowerCase()">
          {{ ordersStore.statusTitle(order.status) }}
        </div>

        <div class="total">
          <p class="total-title">Jami tolo'v uchun:</p>
          <p class="total-cost bold-4">
            {{ order.total }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables";
.orders {
  flex-direction: column-reverse;
  .order {
    border: 1px solid $grey;
    padding: 2rem;
    display: flex;
    overflow: hidden;
    gap: 1rem;
    flex-direction: column;
    width: max-content;
    border-radius: 8px;
    margin: 1rem;
  }
  .total {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 1rem;
    &-title {
      font-size: 20px;
    }
    &-cost {
      font-size: 30px;
    }
  }
  .infos {
    justify-content: space-between;
  }
  .status {
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    width: max-content;
    font-weight: 500;
    &.new {
      color: $btn-info;
      background: rgba($btn-info, 0.15);
    }
    &.rejected {
      color: $btn-danger;
      background: rgba($btn-danger, 0.15);
    }
    &.delivered {
      color: $btn-success;
      background: rgba($btn-success, 0.15);
    }
    &.delivering {
      color: $btn-warning;
      background: rgba($btn-warning, 0.15);
    }
  }
}
</style>
