import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/userStore";

// Routes publiques
const publicRoutes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/tournois-a-venir",
    name: "TournoisAVenir",
    component: () => import("../views/TournoisAVenir.vue"),
    meta: { title: "Tournois à venir" },
  },
  {
    path: "/classement",
    name: "Classement",
    component: () => import("../views/Classement.vue"),
    meta: { title: "Classement" },
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
      title: "Détails du tournoi",
    },
  },
  {
    path: "/badges",
    name: "badges",
    component: () => import("../views/Badges.vue"),
    meta: {
      title: "Badges",
    },
  },
  {
    path: "/auth-error",
    name: "AuthError",
    component: () => import("../views/AuthError.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
    meta: { title: "Page introuvable" },
  },
];

// Routes nécessitant une authentification
const authRoutes = [
  {
    path: "/membres",
    name: "Membres",
    component: () => import("../views/Membres.vue"),
    meta: { requiresAuth: true, title: "Membres" },
  },
  {
    path: "/profil/:id",
    name: "Profil",
    component: () => import("../views/Profil.vue"),
    meta: { requiresAuth: true, title: "Profil joueur" },
  },
  {
    path: "/propositions-jeux",
    name: "GameProposals",
    component: () => import("../views/GameProposal.vue"),
    meta: { requiresAuth: true, title: "Propositions de jeux" },
  },
  {
    path: "/player-level",
    name: "PlayerLevel",
    component: () => import("../views/PlayerLevel.vue"),
    meta: { requiresAuth: true, title: "Niveau du joueur" },
  },
];

// Routes administratives
const adminRoutes = [
  {
    path: "/creation-jeu",
    name: "CreateGame",
    component: () => import("../views/admin/CreateGame.vue"),
    meta: { requiresAuth: true, requiresAdmin: true, title: "Création de jeu" },
  },
  {
    path: "/ajout-joueurs",
    name: "AjoutJoueurs",
    component: () => import("../views/admin/AjoutJoueurs.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: "Ajout de joueurs",
    },
  },
  {
    path: "/gestion-administrations",
    name: "GestionAdministrations",
    component: () => import("../views/admin/GestionAdministrations.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: "Gestion des admins",
    },
  },
  {
    path: "/creation-tournoi",
    name: "CreationTournoi",
    component: () => import("../views/admin/CreationTournoi.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: "Création de tournoi",
    },
  },
  {
    path: "/synchronisation-joueurs",
    name: "SynchronizePlayers",
    component: () => import("../views/admin/SynchronizePlayers.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: "Synchronisation des joueurs",
    },
  },
  {
    path: "/gestion-badges",
    name: "GestionBadges",
    component: () => import("../views/admin/GestionBadges.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: "Gestion des badges",
    },
  },
  {
    path: "/gestion-saisons",
    name: "GestionSaisons",
    component: () => import("../views/admin/GestionSaisons.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: "Gestion des saisons",
    },
  },
  {
    path: "/gestion-niveaux",
    name: "GestionNiveaux",
    component: () => import("../views/admin/GestionNiveaux.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: "Gestion des niveaux",
    },
  },
  {
    path: "/parametres",
    name: "UserSettings",
    component: () => import("../views/UserSettings.vue"),
    meta: { requiresAuth: true, title: "Informations Profil" },
  },
];

// Combinaison de toutes les routes
const routes = [...publicRoutes, ...authRoutes, ...adminRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Garde de navigation pour vérifier l'authentification
router.beforeEach(async (to, _, next) => {
  const userStore = useUserStore();

  if (to.meta.title) {
    document.title = `${to.meta.title} | ACS`;
  } else {
    document.title = "Alors ça scrim ?";
  }

  // Tentative de récupérer l'utilisateur si nous n'en avons pas déjà un
  if (!userStore.user && !to.path.includes("/auth-error")) {
    try {
      await userStore.fetchUser();
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
    }
  }

  // Vérifier si la route nécessite une authentification
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    // Rediriger vers la page de connexion avec l'URL de retour
    next({
      path: "/",
      query: { redirect: to.fullPath },
    });
  }
  // Vérifier si la route nécessite des droits admin
  else if (
    to.meta.requiresAdmin &&
    (!userStore.isLoggedIn || !userStore.isAdmin)
  ) {
    next({ path: "/auth-error" });
  } else {
    // Si pas de restrictions ou utilisateur autorisé, continuer
    next();
  }
});

export default router;
