<script setup>
import { onMounted, reactive, ref } from "vue";
import useOrdersStore from "@/store/order.js";
import CTable from "./components/CTable.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import OrderBox from "@/components/OrderBox.vue";
import { OrdersColumn } from "./components/columns";
import { Empty } from "ant-design-vue";
import { HandleColor } from "./components/columns";

const ordersStore = useOrdersStore();
const isModal = ref(false);
const order = reactive({});
onMounted(() => {
  ordersStore.getAllOrders({ status: "NEW" });
  ordersStore.getStatuses();
});
</script>

<template>
  <div>
    <h1>Orders</h1>

    <c-table
      v-if="ordersStore.orders"
      :data="ordersStore.orders"
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
              order = ordersStore.orders.find((o) => o._id === id);
              console.log(order);
            },
          },
        },
      ]"
      :loading="ordersStore.isFetching"
    />
    <div v-else>
      <Empty description="Orders not found" />
    </div>

    <modal-component @closeModal="isModal = false" v-if="isModal && order">
      <div class="modal-top">
        <h1>Single Order</h1>
        <a-tag class="status" :color="HandleColor(order.status)">
          {{ order.status }}
        </a-tag>
      </div>
      <order-box v-for="p in order.products" :product="p" :key="p" />
      <div class="get-order" v-if="!order.deliverId && order.status == 'NEW'">
        <a-button type="primary" @click="ordersStore.deliverOrder(order._id)">
          Buyurtmani olish
        </a-button>
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
</style>
