<script setup>
import useProductsData from "@/store/products";
import useTypeStore from "@/store/type";
import { onMounted } from "vue";
import baseUrl from "@/utils/api/url";
import moment from "moment";

const productsStore = useProductsData();
const typeStore = useTypeStore();
onMounted(() => {
  productsStore.getProducts();
  typeStore.getTypes();
});
const columns = [
  {
    title: "Rasm",
    dataIndex: "imgUrl",
    key: "imgUrl",
  },
  {
    name: "Nomi",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Tavsifi",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Narxi",
    key: "price",
    dataIndex: "price",
  },
  {
    title: "Turi",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Yaratilgan sanasi",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Amallar",
    key: "action",
    edit: {
      title: "Tahrirlash",
      function: () => {
        console.log("edit");
      },
    },
    delete: {
      title: "O'chirish",
      function: () => {
        console.log("delete");
      },
    },
  },
];
</script>
<template>
  <div class="wrapper">
    <p>Products</p>
    <div class="products">
      <a-table
        :columns="columns"
        :data-source="productsStore.products"
        :pagination="{ position: ['bottomLeft'] }"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'title'">
            <span>
              {{ column.name }}
            </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'imgUrl'">
            <div class="img flex">
              <img :src="baseUrl + record.imgUrl" alt="Image" />
            </div>
          </template>
          <template v-if="column.key === 'title'">
            <a>
              {{ record.title }}
            </a>
          </template>
          <template v-else-if="column.key === 'type'">
            <span>
              <a-tag
                :key="record.name"
                color="green"
                v-if="typeStore.types.length"
              >
                {{ typeStore.types.find((t) => t.type === record.type).title }}
              </a-tag>
            </span>
          </template>

          <template v-else-if="column.key === 'date'">
            <span>
              {{ moment(record.date).format("DD/MM/YYYY") }}
            </span>
          </template>
          <template v-else-if="column.key === 'action'">
            <span class="actions">
              <a @click="column.edit.function">{{ column.edit.title }}</a>
              <a-divider type="vertical" />
              <a @click="column.delete.function">{{ column.delete.title }}</a>
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  .img {
    overflow: hidden;
    width: 100px;
    height: 100px;
    border: 1px solid $shadow-light;
    img {
      max-height: 100%;
    }
  }

  .actions {
    display: flex;
    gap: 10px;
  }
}
</style>
