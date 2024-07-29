<script setup>
import { defineProps } from "vue";
import baseUrl from "@/utils/api/url";
import { EditIcon } from "@/assets/icons/edit";
import { DeleteIcon } from "@/assets/icons/delete";
import moment from "moment";
import { EyeIcon } from "@/assets/icons/eye";
import { HandleColor } from "./columns";
const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  loading: { type: Boolean, default: null },
  tagsType: { type: Array, default: () => [] },
});
</script>

<template>
  <a-table
    :columns="props.columns"
    :data-source="props.data"
    :pagination="{ position: ['bottomLeft'] }"
    :rowKey="(col) => col.key"
    :loading="props.loading"
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
      <template v-if="column.key === 'avatar'">
        <div class="avatar flex">
          <img :src="baseUrl + record.avatar" alt="Image" />
        </div>
      </template>
      <template v-if="column.key === 'title'">
        <a>
          {{ record.title }}
        </a>
      </template>

      <template v-if="column.key === 'index'">
        <a> {{ record._id.substring(record._id.length - 4) }} </a>
      </template>
      <template v-else-if="column.dataIndex === 'type'">
        <a-tag
          :key="record.name"
          :color="HandleColor(record[column.key])"
          v-if="props.tagsType.length"
        >
          {{
            props.tagsType.find((t) => t[column.key] === record[column.key])
              .title
          }}
        </a-tag>
      </template>
      <template v-else-if="column.dataIndex === 'roles'">
        <a-tag
          v-for="role in record.roles"
          :key="role"
          :color="HandleColor(role)"
        >
          {{ role }}
        </a-tag>
      </template>

      <template v-else-if="column.key === 'date'">
        <span>
          {{ moment(record.date).format("DD/MM/YYYY") }}
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span class="actions">
          <a @click="column.edit.function(record._id)"><edit-icon /></a>
          <a-divider type="vertical" />
          <a @click="column.delete.function(record._id)"><delete-icon /></a>
        </span>
      </template>

      <template v-else-if="column.key === 'view'">
        <span class="actions">
          <a @click="column.edit.function(record._id)"><eye-icon /></a>
        </span>
      </template>
    </template>
  </a-table>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";
.img {
  overflow: hidden;
  width: 100px;
  height: 100px;
  border: 1px solid $shadow-light;
  img {
    max-height: 100%;
  }
}
.avatar {
  overflow: hidden;
  width: 60px;
  height: 60px;
  border: 1px solid $shadow-light;
  img {
    max-height: 100%;
  }
}

.actions {
  display: flex;
  gap: 10px;
}
</style>
