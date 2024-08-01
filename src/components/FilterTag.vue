<script setup>
import { defineProps, defineEmits } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const props = defineProps({
  title: String,
  type: {
    type: String,
    default: undefined,
  },
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
@import "@/styles/responsive";
@import "@/styles/variables";
.filter-tag {
  background: $shadow-light;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  white-space: nowrap;
  cursor: pointer;
}

.active {
  background: $grey;
  color: $white;
}

@include screen("sm") {
  .filter-tag {
    transform: scale(0.7);
  }
}
</style>
