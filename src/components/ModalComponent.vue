<script setup>
import { CloseIcon } from "@/assets/icons/close";
import { defineEmits } from "vue";

const emits = defineEmits(["closeModal"]);
</script>

<template>
  <div class="filter-modal" @click="emits('closeModal')">
    <div class="overlay">
      <div class="modal" @click.stop>
        <slot />
        <div @click="emits('closeModal')" class="close-icon">
          <close-icon />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/responsive";
@import "@/styles/variables";
.filter-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    padding: 2rem;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: $white;
    border-radius: 10px;
    overflow: hidden;
  }
  .close-icon {
    position: absolute;
    cursor: pointer;
    top: 2%;
    right: 2.5%;
    width: 25px;
  }
}

@include screen("sm") {
  .filter-modal {
    .modal {
      transform: scale(0.7);
    }
  }
}
</style>
