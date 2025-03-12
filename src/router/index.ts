import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CreateGame from "../views/CreateGame.vue";

const routes = [
  { path: "/", component: Home },
  {
    path: "/creation-jeu",
    name: "CreateGame",
    component: CreateGame,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
