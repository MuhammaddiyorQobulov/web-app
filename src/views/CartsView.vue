<script setup>
import CartItem from "@/components/CartItem.vue";
import useCartsStore from "@/store/carts";
import { ref } from "vue";
const cartsStore = useCartsStore();
const comment = ref("");
</script>
<template>
  <div class="carts container">
    <div class="wrapper">
      <h1>Korzinka</h1>
      <div class="items">
        <div
          v-if="cartsStore.carts.length"
          v-for="i in cartsStore.carts"
          :key="i.id"
        >
          <cart-item :item="i" />
        </div>
        <h2 class="empty" v-else>Tanlangan mahsulotlar mavjud emas</h2>
      </div>
      <div class="comments flex">
        <label for="input" class="bold-4"
          >Buyurtma uchun qo'shimcha izoh qoldiring</label
        >
        <textarea
          name="textarea"
          id="input"
          rows="6"
          v-model="cartsStore.comment"
        />
      </div>
      <div class="total flex">
        <p class="bold-4 total-cost">Umumiy summa:</p>
        <h2 class="bold-4 total-cost">{{ cartsStore.totalCost() }} so'm</h2>
        <button class="btn warning">Buyurtma berish</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";
.carts {
  display: flex;
  width: calc(100% - 10vw);
  .wrapper {
    width: 100%;
    padding: 2rem 20rem;
    .items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;

      .empty {
        text-align: center;
        border: 1px solid $btn-danger;
        background: rgba($btn-danger, 0.2);
        color: $btn-danger;
        padding: 1rem;
        border-radius: 8px;
      }
    }
    .comments {
      margin-top: 4rem;
      flex-direction: column;
      align-items: start;
      gap: 1rem;
      textarea {
        width: 100%;
        font-size: 20px;
        outline: none;
        padding: 0.5rem;
      }
    }
    .total {
      justify-content: space-between;
      margin-top: 2rem;
      &-cost {
        font-size: 40px;
      }
    }
    .btn {
      padding: 1rem 2rem;
      border: none;
      border-radius: 8px;
      color: #000 !important;
      font-size: 20px;
      cursor: pointer;
      &:active {
        background: $btn-info !important;
        transform: scale(0.95);
      }
    }
  }
}
</style>
