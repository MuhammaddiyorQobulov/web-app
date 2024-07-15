import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CartsView from "@/views/CartsView.vue";
import LoginView from "@/views/AuthView/LoginView.vue";
import RegistrationView from "@/views/AuthView/RegistrationVIew.vue";

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
    path: "/",
    name: "home",
    meta: { requiresAuth: true },
    component: HomeView,
    children: [
      {
        path: "/carts",
        name: "carts",
        component: CartsView,
      },

      {
        path: "/:pathMatch(.*)*",
        redirect: { name: "home" },
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
