import { createRouter, createWebHistory } from "vue-router";
import HamburgerOverlay from "../views/HamburgerOverlay.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HamburgerOverlay",
      component: HamburgerOverlay,
    }
  ],
});

export default router;
