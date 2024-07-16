<script setup>
import { defineProps, defineEmits } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const props = defineProps({
  title: String,
  type: String,
});
const emits = defineEmits(["onClick"]);
</script>
<template>
  <div
    class="filter-tag"
    :class="{ active: route.query.type === props.type }"
    @click="emits('onClick')"
  >
    {{ props.title }}
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables";
.filter-tag {
  background: $shadow-light;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}

.active {
  background: $grey;
  color: $white;
}
</style>
