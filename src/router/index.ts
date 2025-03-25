import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CreateGame from "../views/admin/CreateGame.vue";
import GestionAdministrations from "../views/admin/GestionAdministrations.vue";
import SynchronizePlayers from "../views/admin/SynchronizePlayers.vue";
import TournoisAVenir from "../views/TournoisAVenir.vue";
import Classement from "../views/Classement.vue";
import Membres from "../views/Membres.vue";
import GestionBadges from "../views/admin/GestionBadges.vue";
import Profil from "../views/Profil.vue"; // Import du composant Profil
import AjoutJoueurs from "../views/admin/AjoutJoueurs.vue";
import CreationTournoi from "../views/admin/CreationTournoi.vue";
import AnnouncementList from "../views/AnnouncementList.vue";
import AnnouncementDetail from "../views/AnnouncementDetail.vue";
import AnnouncementEditor from "../views/AnnouncementEditor.vue";

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
    path: "/profil/:id",
    name: "Profil",
    component: Profil,
  },
  {
    path: "/auth-error",
    name: "AuthError",
    component: () => import("../views/AuthError.vue"),
  },
  {
    path: "/propositions-jeux",
    name: "GameProposals",
    component: () => import("../views/GameProposal.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/annonces",
    name: "AnnouncementList",
    component: AnnouncementList,
  },
  {
    path: "/annonces/nouveau",
    name: "NewAnnouncement",
    component: AnnouncementEditor,
    meta: { requiresAdmin: true },
  },
  {
    path: "/annonces/:id",
    name: "AnnouncementDetail",
    component: AnnouncementDetail,
  },
  {
    path: "/annonces/:id/edit",
    name: "EditAnnouncement",
    component: AnnouncementEditor,
    meta: { requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
