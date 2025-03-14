import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CreateGame from "../views/CreateGame.vue";
import AjoutJoueurs from "../views/AjoutJoueurs.vue";
import GestionAdministrations from "../views/GestionAdministrations.vue";
import CreationTournoi from "../views/CreationTournoi.vue";
import SynchronizePlayers from "../views/SynchronizePlayers.vue";
import Infos from "../views/Infos.vue";

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
  {
    path: "/creation-tournoi",
    name: "CreationTournoi",
    component: CreationTournoi,
  },
  {
    path: "/synchronisation-joueurs",
    name: "SynchronizePlayers",
    component: SynchronizePlayers,
  },
  {
    path: "/infos",
    name: "Infos",
    component: Infos, // Ajoutez la nouvelle route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
