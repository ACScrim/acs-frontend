import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CreateGame from "../views/CreateGame.vue";
import AjoutJoueurs from "../views/AjoutJoueurs.vue";
import GestionAdministrations from "../views/GestionAdministrations.vue";

const routes = [
  { path: "/", component: Home },
  {
    path: "/creation-jeu",
    name: "CreateGame",
    component: CreateGame,
  },
  {
    path: "/ajout-joueurs",
    name: "AjoutJoueurs",
    component: AjoutJoueurs,
  },
  {
    path: "/gestion-administrations",
    name: "GestionAdministrations",
    component: GestionAdministrations,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
