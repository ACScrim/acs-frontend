<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\Profil.vue -->
<template>
  <div class="container mx-auto p-4 pt-20 min-h-screen">
    <!-- État d'erreur -->
    <div
      v-if="error"
      class="max-w-4xl mx-auto bg-red-900/20 border border-red-500 rounded-lg p-8 text-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-12 w-12 mx-auto text-red-500 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h2 class="text-xl text-red-300 mb-4">{{ error }}</h2>
      <button
        @click="fetchPlayerProfile"
        class="px-4 py-2 bg-red-900/40 border border-red-500 text-red-300 rounded-md font-orbitron hover:bg-red-900/60 transition-colors"
      >
        Réessayer
      </button>
    </div>

    <!-- Profil du joueur -->
    <div v-else-if="player" class="max-w-4xl mx-auto">
      <!-- En-tête du profil -->
      <div
        class="bg-black/50 backdrop-blur-2xl rounded-lg p-8 mb-8 border border-pink-500 shadow-lg shadow-pink-500/30"
      >
        <div class="flex items-center justify-center mb-4">
          <div class="avatar-container mr-4">
            <img
              v-if="user && user.avatarUrl"
              :src="user.avatarUrl"
              alt="Avatar"
              class="h-24 w-24 rounded-full object-cover border-2 border-pink-500 shadow-glow-pink"
              loading="lazy"
              @error="handleImageError"
            />
            <div
              v-else
              class="h-24 w-24 rounded-full bg-gray-800 flex items-center justify-center border-2 border-pink-500"
            >
              <span class="text-pink-500 text-3xl font-bold">{{
                getInitials(player.username)
              }}</span>
            </div>
          </div>
          <h1
            class="text-4xl sm:text-5xl text-white neon-text font-audiowide capitalize"
          >
            {{ player.username }}
          </h1>
        </div>
        <div class="flex justify-center">
          <div
            class="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          ></div>
        </div>
      </div>

      <!-- Section des statistiques - Version simplifiée -->
      <div
        class="bg-black/75 rounded-lg p-8 mb-8 border border-cyan-500 shadow-lg shadow-cyan-500/30 transform transition-all hover:scale-[1.02] duration-300"
      >
        <h2 class="text-3xl text-white mb-6 neon-text-cyan flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-3 text-cyan-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
            />
          </svg>
          Statistiques
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            class="bg-gray-800/70 p-4 rounded-lg text-center transform transition-all hover:scale-105 hover:bg-gray-800/90 duration-300"
          >
            <div class="text-3xl font-bold text-pink-500 mb-1">
              {{ playerRanking?.totalVictories || 0 }}
            </div>
            <div class="text-gray-300 text-sm">Victoires</div>
          </div>
          <div
            class="bg-gray-800/70 p-4 rounded-lg text-center transform transition-all hover:scale-105 hover:bg-gray-800/90 duration-300"
          >
            <div class="text-3xl font-bold text-cyan-500 mb-1">
              {{ playerRanking?.totalTournaments || 0 }}
            </div>
            <div class="text-gray-300 text-sm">Tournois</div>
          </div>
        </div>
      </div>

      <!-- Section des badges -->
      <div
        class="bg-black/75 rounded-lg p-8 mb-8 border border-purple-500 shadow-lg shadow-purple-500/30 transform transition-all hover:scale-[1.02] duration-300"
      >
        <h2 class="text-3xl text-white mb-6 neon-text-purple flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-3 text-purple-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          Badges
          <span class="text-sm text-gray-400 ml-2">({{ badgeCount }})</span>
        </h2>
        <div
          v-if="hasBadges"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <div
            v-for="badge in player.badges"
            :key="badge._id"
            class="flex flex-col items-center p-4 bg-gray-800/70 rounded-lg transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 duration-300 cursor-pointer"
            @click="selectBadge(badge)"
          >
            <img
              :src="badge.imageUrl"
              :alt="badge.title"
              class="h-16 w-16 mb-3 rounded-full border-2 border-purple-500 glow-badge object-cover"
              loading="lazy"
              @error="handleImageError"
            />
            <span class="text-white text-center font-orbitron text-sm">{{
              badge.title
            }}</span>
          </div>
        </div>
        <div
          v-else
          class="text-gray-400 text-center italic bg-gray-800/50 p-6 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 mx-auto text-gray-500 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Aucun badge obtenu pour le moment
        </div>
      </div>

      <!-- Section des tournois -->
      <div
        class="bg-black/75 rounded-lg p-8 border border-pink-500 shadow-lg shadow-pink-500/30 transform transition-all hover:scale-[1.02] duration-300"
      >
        <h2 class="text-3xl text-white mb-6 neon-text flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-3 text-pink-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M2 2v5h5" />
            <path d="M2 7h12v5H2z" />
            <path d="M14 4v8" />
            <path d="M14 12h5v5h-5z" />
            <path d="M19 17h3v5h-3z" />
            <path d="M8 12v5h6" />
            <path d="M8 17h3v5H8z" />
          </svg>
          Tournois
          <span class="text-sm text-gray-400 ml-2"
            >({{ tournamentCount }})</span
          >
        </h2>
        <!-- Section des tournois -->
        <div v-if="hasTournaments">
          <ul class="space-y-4">
            <li
              v-for="tournament in playerRanking?.tournamentsParticipated || []"
              :key="tournament._id"
              class="bg-gray-800/70 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between transform transition-all hover:bg-gray-700/90 duration-300"
            >
              <div class="flex items-center mb-2 sm:mb-0">
                <div
                  class="h-8 w-8 rounded-full bg-pink-500/20 flex items-center justify-center mr-3 border border-pink-500/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-pink-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <span class="text-white font-orbitron">{{
                  tournament.name
                }}</span>
              </div>
              <div class="flex items-center space-x-4">
                <span class="text-gray-400 text-sm">{{
                  formatDate(tournament.date)
                }}</span>
                <span
                  v-if="tournament && 'rank' in tournament"
                  class="px-3 py-1 rounded text-xs font-orbitron"
                  :class="getRankingClass(tournament.rank ?? 0)"
                >
                  {{ getRankingLabel(tournament.rank ?? 0) }} /
                  {{ tournament.numberOfTeams }}
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div
          v-else
          class="text-gray-400 text-center italic bg-gray-800/50 p-6 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 mx-auto text-gray-500 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Aucun tournoi pour le moment
        </div>
      </div>
    </div>

    <!-- État de chargement -->
    <div
      v-else
      class="max-w-4xl mx-auto pt-12"
      role="status"
      aria-live="polite"
    >
      <CyberpunkLoader />
    </div>

    <!-- Modal détail badge -->
    <div
      v-if="selectedBadge"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm"
      @click="selectedBadge = null"
    >
      <div
        class="bg-gray-900 border-2 border-purple-500 rounded-lg p-6 max-w-md mx-4 transform transition-all duration-300 scale-100 shadow-2xl shadow-purple-500/30"
        @click.stop
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-orbitron text-purple-400 neon-text-purple">
            Détails du badge
          </h3>
          <button
            @click="selectedBadge = null"
            class="text-gray-400 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="flex flex-col items-center mb-4">
          <img
            :src="selectedBadge.imageUrl"
            :alt="selectedBadge.title"
            class="h-24 w-24 rounded-full border-2 border-purple-500 glow-badge mb-4"
          />
          <h4 class="text-xl text-white font-orbitron">
            {{ selectedBadge.title }}
          </h4>
          <p class="text-gray-400 mt-2 text-center">
            {{ selectedBadge.description || "Aucune description disponible" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import playerService from "../services/playerService";
import userService from "../services/userService";
import type { Player, PlayerRanking, Badge, User } from "../types";
import CyberpunkLoader from "@/shared/CyberpunkLoader.vue"; // Importer le composant de loader

//-------------------------------------------------------
// SECTION: Définition des états
//-------------------------------------------------------

/**
 * Données principales du profil
 */
const player = ref<Player | null>(null); // Données du joueur
const user = ref<User | null>(null); // Utilisateur associé au joueur
const playerRanking = ref<PlayerRanking | null>(null); // Classement du joueur

/**
 * États UI
 */
const loading = ref(true); // État de chargement
const error = ref<string | null>(null); // Message d'erreur
const selectedBadge = ref<Badge | null>(null); // Badge sélectionné pour affichage détaillé

/**
 * Accès aux paramètres de route
 */
const route = useRoute();

//-------------------------------------------------------
// SECTION: Formatage et utilitaires
//-------------------------------------------------------

/**
 * Formatte une date au format français
 * @param dateString - Date à formater
 * @returns Date formatée en français (ex: "15 mars 2023")
 */
const formatDate = (dateString: string | Date) => {
  try {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  } catch (err) {
    console.error("Erreur de formatage de date:", err);
    return "Date inconnue";
  }
};

/**
 * Extrait les initiales d'un nom d'utilisateur
 * @param username - Nom d'utilisateur
 * @returns Première lettre du nom en majuscule
 */
const getInitials = (username: string) => {
  if (!username) return "?";
  return username.charAt(0).toUpperCase();
};

/**
 * Gère les erreurs de chargement d'image
 * Remplace l'image par un placeholder en cas d'échec
 * @param e - Événement d'erreur
 */
const handleImageError = (e: Event) => {
  if (e.target instanceof HTMLImageElement) {
    e.target.src = "https://via.placeholder.com/100?text=?";
  }
};

//-------------------------------------------------------
// SECTION: Actions utilisateur
//-------------------------------------------------------

/**
 * Sélectionne un badge pour afficher ses détails dans une modal
 * @param badge - Badge à afficher
 */
const selectBadge = (badge: Badge) => {
  selectedBadge.value = badge;
};

//-------------------------------------------------------
// SECTION: Propriétés calculées
//-------------------------------------------------------

/**
 * Vérifie si le joueur possède des badges
 */
const hasBadges = computed(
  () => player.value?.badges && player.value.badges.length > 0
);

/**
 * Compte le nombre de badges du joueur
 */
const badgeCount = computed(() => player.value?.badges?.length || 0);

/**
 * Vérifie si le joueur a participé à des tournois
 */
const hasTournaments = computed(
  () =>
    playerRanking.value?.tournamentsParticipated &&
    playerRanking.value.tournamentsParticipated.length > 0
);

/**
 * Compte le nombre de tournois auxquels le joueur a participé
 */
const tournamentCount = computed(
  () => playerRanking.value?.tournamentsParticipated?.length || 0
);

//-------------------------------------------------------
// SECTION: Récupération des données
//-------------------------------------------------------

/**
 * Récupère toutes les données du profil joueur:
 * - Informations du joueur
 * - Données de l'utilisateur associé
 * - Classement et historique des tournois
 */
const fetchPlayerProfile = async () => {
  loading.value = true;
  error.value = null;

  try {
    const playerId = route.params.id as string;

    // Récupération des données du joueur
    const playerData = await playerService.getPlayerProfile(playerId);
    player.value = playerData;

    // Récupération de l'utilisateur associé pour l'avatar
    if (player.value && player.value.userId) {
      try {
        const userData = await userService.getUserById(player.value.userId);
        user.value = userData;
      } catch (userErr) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur:",
          userErr
        );
        // Ne pas bloquer le reste du chargement si l'utilisateur n'est pas trouvé
      }
    }

    // Récupération du classement et de l'historique des tournois
    try {
      const rankings = await playerService.getPlayerRankings();
      playerRanking.value =
        rankings.find((ranking) => ranking.playerId === playerId) || null;
    } catch (rankErr) {
      console.error("Erreur lors de la récupération du classement:", rankErr);
      // Ne pas bloquer le reste du chargement si le classement n'est pas disponible
    }
  } catch (err) {
    console.error("Erreur lors de la récupération du profil du joueur:", err);
    error.value = "Impossible de charger le profil de ce joueur.";
  } finally {
    loading.value = false;
  }
};

/**
 * Obtient le libellé correspondant au classement
 * @param rank - Rang de l'équipe (1 pour 1er, 2 pour 2ème, etc.)
 * @returns Libellé formaté avec emoji pour les 3 premiers rangs
 */
const getRankingLabel = (rank: number): string => {
  if (!rank) return "Non classé";

  switch (rank) {
    case 1:
      return "🥇 Or";
    case 2:
      return "🥈 Argent";
    case 3:
      return "🥉 Bronze";
    default:
      return `${rank}ème`;
  }
};

/**
 * Obtient la classe CSS correspondant au rang pour styliser les badges
 * @param rank - Rang de l'équipe
 * @returns Classe CSS pour l'apparence du badge
 */
const getRankingClass = (rank: number): string => {
  if (!rank) return "bg-gray-700 text-gray-300 border border-gray-600";

  switch (rank) {
    case 1:
      return "bg-yellow-500/70 text-yellow-900 border border-yellow-400";
    case 2:
      return "bg-gray-300/70 text-gray-800 border border-gray-200";
    case 3:
      return "bg-amber-700/70 text-amber-100 border border-amber-600";
    default:
      return "bg-purple-700/70 text-white border border-purple-600";
  }
};

//-------------------------------------------------------
// SECTION: Cycle de vie du composant
//-------------------------------------------------------

/**
 * Initialisation du composant au montage
 * Charge les données du profil joueur
 */
onMounted(() => {
  fetchPlayerProfile();
});
</script>

<style scoped>
/* Variables CSS */

/* Effets de néon */
.neon-text {
  color: white;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 15px #ff00ff;
}

.neon-text-purple {
  color: white;
  text-shadow: 0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 15px #a855f7;
}

.neon-text-cyan {
  color: white;
  text-shadow: 0 0 10px #06b6d4, 0 0 20px #06b6d4, 0 0 15px #06b6d4;
}

/* Effets de lueur */
.glow-badge {
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.7);
}

.shadow-glow-pink {
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
}

/* Animation pour les cartes */
.transform {
  transition: all 0.3s ease;
}

/* Styles pour les titres de section et textes */
h2 {
  letter-spacing: 1px;
}

.text-3xl,
.text-4xl {
  font-family: "Orbitron", sans-serif;
  letter-spacing: 1px;
}

/* Animations */
@keyframes pulse {
  0%,
  100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}

.animate-pulse-subtle {
  animation: pulse 2s infinite;
}

/* Animation au survol des éléments */
.hover\:scale-\[1\.02\]:hover {
  transform: scale(1.02);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

.font-audiowide {
  font-family: "Audiowide", cursive;
}
</style>
