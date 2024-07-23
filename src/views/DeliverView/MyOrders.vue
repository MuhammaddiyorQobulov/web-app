<script setup>
import { onMounted, reactive, ref } from "vue";
import useOrdersStore from "@/store/order.js";
import CTable from "./components/CTable.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import OrderBox from "@/components/OrderBox.vue";
import { OrdersColumn } from "./components/columns";
import { Empty } from "ant-design-vue";
import { HandleColor } from "./components/columns";
import useDeliverStore from "@/store/deliver";
const deliverStore = useDeliverStore();
const ordersStore = useOrdersStore();
const isModal = ref(false);
const order = reactive({});
onMounted(async () => {
  deliverStore.getDeliverOrders();
  ordersStore.getStatuses();
});
const finishDelivering = (id, status) => {
  deliverStore.updateDeliverOrder(id, { status });
  isModal.value = false;
  deliverStore.getDeliverOrders();
};
</script>

<template>
  <div>
    <h1>Delivered</h1>
    <c-table
      v-if="deliverStore.orders"
      :data="deliverStore.orders"
      :tagsType="ordersStore.statuses"
      :columns="[
        ...OrdersColumn,
        {
          key: 'view',
          title: 'Ko`rish',
          edit: {
            title: 'eye-icon',
            function: (id) => {
              isModal = true;
              order = deliverStore.orders.find((o) => o._id === id);
            },
          },
        },
      ]"
      :loading="ordersStore.isFetching"
    />
    <div v-else>
      <Empty description="Delivered orders not found" />
    </div>

    <modal-component @closeModal="isModal = false" v-if="isModal && order">
      <div class="modal-top">
        <h1>Single Order</h1>
        <a-tag class="status" :color="HandleColor(order.status)">
          {{ order.status }}
        </a-tag>
      </div>
      <order-box v-for="p in order.products" :product="p" :key="p" />
      <div disabled class="actions" v-if="order.status == 'DELIVERING'">
        <button
          class="btn success"
          @click="() => finishDelivering(order._id, 'DELIVERED')"
        >
          Yetkazildi
        </button>
        <button
          class="btn danger"
          @click="() => finishDelivering(order._id, 'CANCELED')"
        >
          Bekor qilindi
        </button>
        <button
          class="btn warning"
          @click="() => finishDelivering(order._id, 'RETURNED')"
        >
          Qaytarildi
        </button>
      </div>
    </modal-component>
  </div>
</template>

<style scoped lang="scss">
.modal-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.actions {
  display: flex;
  gap: 1rem;
}
</style>
