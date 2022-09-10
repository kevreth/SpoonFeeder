import { createRouter, createWebHistory } from "vue-router";
import IndexPage from "../views/IndexPage.vue";
import HamburgerOverlay from "../views/HamburgerOverlay.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "IndexPage",
      component: IndexPage
    },
    {
      path: "/overlay",
      name: "HamburgerOverlay",
      component: HamburgerOverlay
    }
  ],
});

export default router;
