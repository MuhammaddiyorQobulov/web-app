import { createRouter, createWebHistory } from "vue-router";
import ProductsView from "@/views/ProductsView.vue";
import CartsView from "@/views/CartsView.vue";
import LoginView from "@/views/AuthView/LoginView.vue";
import RegistrationView from "@/views/AuthView/RegistrationVIew.vue";
import HomeView from "@/views/HomeView.vue";
import OrdersView from "@/views/OrdersView.vue";
import AdminPanel from "@/views/AdminView/AdminPanel.vue";
import NotFound from "@/views/404View.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/registration",
    name: "registration",
    component: RegistrationView,
  },
  {
    path: "/admin-panel",
    name: "admin-panel",
    component: AdminPanel,
  },
  {
    path: "/",
    name: "home",
    meta: { requiresAuth: true },
    component: HomeView,
    children: [
      {
        path: "/",
        name: "products",
        component: ProductsView,
      },
      {
        path: "/carts",
        name: "carts",
        component: CartsView,
      },
      {
        path: "/orders",
        name: "orders",
        component: OrdersView,
      },
      {
        path: "/:pathMatch(.*)*",
        component: NotFound,
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
function isAuthenticated() {
  return !!localStorage.getItem("token");
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
