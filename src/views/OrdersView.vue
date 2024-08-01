<script setup>
import { onMounted, ref } from "vue";
import useOrderStore from "@/store/order";
import OrderBox from "@/components/OrderBox.vue";
import { useRoute, useRouter } from "vue-router";
import FilterTag from "@/components/FilterTag.vue";
import { Empty } from "ant-design-vue";
import moment from "moment";

const router = useRouter();
const route = useRoute();
const ordersStore = useOrderStore();
const activeKey = ref([]);
const filterByStatus = (type) => {
  router.push({ query: { type } });
};

onMounted(() => {
  ordersStore.getUserOrders();
  ordersStore.getStatuses();
});
</script>
<template>
  <div class="wrapper flex" v-if="ordersStore.orders">
    <div class="orders flex container">
      <a-collapse class="collapses" v-model:activeKey="activeKey" accordion>
        <a-collapse-panel
          class="order"
          v-for="order in ordersStore.filter(route.query.type)"
          :key="order._id"
          :header="moment(order.date).format('YYYY-MM-DD HH:mm:ss')"
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
        </a-collapse-panel>
      </a-collapse>
      <Empty
        description="Bunday turgagi mahsulotlar hozircha mavjud emas!"
        v-if="!ordersStore.filter(route.query.type).length"
        class="empty"
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
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables";
@import "@/styles/responsive";
.wrapper {
  width: 100%;
}
.collapses {
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
}

.empty {
  width: 100%;
}

.orders {
  flex-direction: column-reverse;
  align-items: start;
  padding: 1rem 0 2rem 0;
  max-width: calc(100% - 20vw);
  .order {
    border: 1px solid $grey;
    display: flex;
    overflow: hidden;
    gap: 1rem;
    flex-direction: column;
    width: calc(100% - 2rem);
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
      white-space: nowrap;
    }
    &-cost {
      font-size: 30px;
    }
  }
  .infos {
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 1rem;
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
    max-width: 100%;
    gap: 1rem;
    overflow: scroll;
    padding-bottom: 0.5rem;
    margin: 1rem 0;
  }
}

@media screen and (max-width: 600px) {
  .orders {
    .filter-status {
      margin: 0.5rem 0;
    }
    .infos {
      .total {
        &-title {
          font-size: 16px;
        }
        &-cost {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
