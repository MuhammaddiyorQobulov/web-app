<script setup>
import CartItem from "@/components/CartItem.vue";
import useCartsStore from "@/store/carts";
import { onMounted, reactive, ref } from "vue";
import useOrderStore from "@/store/order";
import ModalComponent from "@/components/ModalComponent.vue";
import { useRouter } from "vue-router";
const orderStore = useOrderStore();
const cartsStore = useCartsStore();
const router = useRouter();
onMounted(() => {
  cartsStore.getUserCarts();
});
const data = reactive({
  comment: "",
  address: "",
  phone: "",
});

const isModal = ref(false);
const toggleModal = (arg) => {
  isModal.value = arg;
};

const order = () => {
  try {
    orderStore.createOrder(data);
  } catch (err) {
    console.log(err.message);
  } finally {
    toggleModal(false);
    router.push("/orders");
    location.reload();
  }
};
</script>
<template>
  <div class="carts container">
    <div class="wrapper">
      <h1>Korzinka</h1>
      <div class="items" v-if="cartsStore.carts.length">
        <div v-for="i in cartsStore.carts" :key="i">
          <cart-item :productId="i._id" />
        </div>
      </div>

      <h2 class="empty" v-else>Tanlangan mahsulotlar mavjud emas</h2>
      <div class="total flex">
        <p class="bold-4 total-title">Umumiy summa:</p>
        <h2 class="bold-4 total-cost">{{ cartsStore.total }} so'm</h2>
        <button class="btn warning" @click="toggleModal(true)">
          Buyurtma berish
        </button>
      </div>
      <modal-component v-if="isModal" @closeModal="toggleModal(false)">
        <h2>Buyurtma rasmiylashtirish</h2>
        <div class="input-group flex">
          <label for="comment" class="bold-4"
            >Buyurtma uchun qo'shimcha izoh qoldiring</label
          >
          <textarea
            name="textarea"
            id="comment"
            rows="6"
            v-model="data.comment"
          />
        </div>
        <div class="input-group flex">
          <label for="address" class="bold-4"
            >Buyurtma uchun manzil qoldiring (yetkazib beruvchiga)</label
          >
          <textarea
            name="textarea"
            id="address"
            rows="2"
            v-model="data.address"
          />
        </div>
        <div class="input-group flex">
          <label for="phone" class="bold-4">Telefon raqam qoldiring!</label>
          <input
            name="phone"
            class="phone"
            id="phone"
            placeholder="+998YYXXXxxxx"
            v-model="data.phone"
            type="tel"
          />
        </div>
        <div class="modal-total flex">
          <div class="bold-4 modal-cost">
            <h2>{{ cartsStore.total }}</h2>
            <p class="muted">so'm</p>
          </div>
          <button class="btn warning" @click="order">
            Buyurtmani rasmiylashtirish
          </button>
        </div>
      </modal-component>
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
    }
    .empty {
      text-align: center;
      border: 1px solid $btn-danger;
      background: rgba($btn-danger, 0.2);
      color: $btn-danger;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 3rem;
    }
    .input-group {
      margin-top: 1rem;
      flex-direction: column;
      align-items: start;
      gap: 1rem;
      textarea {
        width: calc(100% - 1rem);
        font-size: 20px;
        outline: none;
        padding: 0.5rem;
      }
      input {
        background: transparent;
        padding: 0.5rem;
        border-radius: 8px;
        width: calc(100% - 1rem);
        border: 1px solid $shadow-light;
      }
    }
    .total {
      justify-content: space-between;
      margin-top: 2rem;
      &-cost {
        font-size: 40px;
      }
      &-title {
        font-size: 25px;
      }
    }
    .modal {
      &-cost {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 35px;
      }
      &-total {
        flex-direction: column;
        gap: 1rem;
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
