import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CreateGame from "../views/CreateGame.vue";
import AjoutJoueurs from "../views/AjoutJoueurs.vue";
import GestionAdministrations from "../views/GestionAdministrations.vue";
import CreationTournoi from "../views/CreationTournoi.vue";
import SynchronizePlayers from "../views/SynchronizePlayers.vue";
import TournoisAVenir from "../views/TournoisAVenir.vue";
import Classement from "../views/Classement.vue";
import Membres from "../views/Membres.vue";
import GestionBadges from "../views/GestionBadges.vue";
import Profil from "../views/Profil.vue"; // Import du composant Profil

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
    path: "/tournois-a-venir",
    name: "TournoisAVenir",
    component: TournoisAVenir,
  },
  {
    path: "/classement",
    name: "Classement",
    component: Classement,
  },
  {
    path: "/membres",
    name: "Membres",
    component: Membres,
  },
  {
    path: "/gestion-badges",
    name: "GestionBadges",
    component: GestionBadges,
  },
  {
    path: "/profil/:id", // Ajout de la route pour le profil
    name: "Profil",
    component: Profil,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
