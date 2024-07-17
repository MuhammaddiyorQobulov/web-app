<script setup>
import { onMounted } from "vue";
import useOrderStore from "@/store/order";
import OrderBox from "@/components/OrderBox.vue";
import { useRoute, useRouter } from "vue-router";
import FilterTag from "@/components/FilterTag.vue";
import { Empty } from "ant-design-vue";

const router = useRouter();
const route = useRoute();
const ordersStore = useOrderStore();
const filterByStatus = (type) => {
  router.push({ query: { type } });
};

onMounted(() => {
  ordersStore.getUserOrders();
  ordersStore.getStatuses();
});
</script>
<template>
  <div class="orders flex container">
    <div
      class="order"
      v-for="order in ordersStore.filter(route.query.type)"
      :key="order._id"
    >
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

    <Empty
      description="Bunday turgagi mahsulotlar hozircha mavjud emas!"
      v-if="!ordersStore.filter(route.query.type).length"
      class="wrapper container"
    />

    <div class="filter-status">
      <filter-tag title="Barchasi" @onClick="filterByStatus" />
      <filter-tag
        v-for="item in ordersStore.statuses"
        :key="item.status"
        :title="item.title"
        :type="item.status"
        @onClick="filterByStatus(item.status)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables";
.orders {
  flex-direction: column-reverse;
  padding: 1rem 0 2rem 0;
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
  .filter-status {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
  }
}
</style>
