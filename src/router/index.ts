import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/creation-jeu",
    name: "CreateGame",
    component: () => import("../views/admin/CreateGame.vue"),
    meta: { requiresAdmin: true },
  },
  {
    path: "/ajout-joueurs",
    name: "AjoutJoueurs",
    component: () => import("../views/admin/AjoutJoueurs.vue"),
    meta: { requiresAdmin: true },
  },
  {
    path: "/gestion-administrations",
    name: "GestionAdministrations",
    component: () => import("../views/admin/GestionAdministrations.vue"),
    meta: { requiresAdmin: true },
  },
  {
    path: "/creation-tournoi",
    name: "CreationTournoi",
    component: () => import("../views/admin/CreationTournoi.vue"),
    meta: { requiresAdmin: true },
  },
  {
    path: "/synchronisation-joueurs",
    name: "SynchronizePlayers",
    component: () => import("../views/admin/SynchronizePlayers.vue"),
    meta: { requiresAdmin: true },
  },
  {
    path: "/tournois-a-venir",
    name: "TournoisAVenir",
    component: () => import("../views/TournoisAVenir.vue"),
  },
  {
    path: "/classement",
    name: "Classement",
    component: () => import("../views/Classement.vue"),
  },
  {
    path: "/membres",
    name: "Membres",
    component: () => import("../views/Membres.vue"),
  },
  {
    path: "/gestion-badges",
    name: "GestionBadges",
    component: () => import("../views/admin/GestionBadges.vue"),
    meta: { requiresAdmin: true },
  },
  {
    path: "/profil/:id",
    name: "Profil",
    component: () => import("../views/Profil.vue"),
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
    component: () => import("../views/AnnouncementList.vue"),
  },
  {
    path: "/annonces/nouveau",
    name: "NewAnnouncement",
    component: () => import("../views/AnnouncementEditor.vue"),
    meta: { requiresAdmin: true },
  },
  {
    path: "/annonces/:id",
    name: "AnnouncementDetail",
    component: () => import("../views/AnnouncementDetail.vue"),
  },
  {
    path: "/annonces/:id/edit",
    name: "EditAnnouncement",
    component: () => import("../views/AnnouncementEditor.vue"),
    meta: { requiresAdmin: true },
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: () => import("../views/Calendar.vue"),
    meta: { title: "Calendrier des Tournois" },
  },
  {
    path: "/tournois/:id",
    name: "tournament-details",
    component: () => import("../views/Tournament.vue"),
    meta: {
      requiresAuth: false,
      title: "Détails du tournoi",
    },
  },
  {
    path: "/gestion-saisons",
    name: "GestionSaisons",
    component: () => import("../views/admin/GestionSaisons.vue"),
    meta: { requiresAdmin: true },
  },
  {
    path: "/badges",
    name: "badges",
    component: () => import("../views/Badges.vue"),
    meta: {
      title: "Badges - ACS",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
