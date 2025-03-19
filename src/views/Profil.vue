<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\Profil.vue -->
<template>
  <div class="container mx-auto p-4 pt-20 min-h-screen">
    <div v-if="player" class="max-w-4xl mx-auto">
      <!-- En-tête du profil -->
      <div
        class="bg-black/50 backdrop-blur-2xl rounded-lg p-8 mb-8 border border-pink-500 shadow-lg shadow-pink-500/30"
      >
        <h1 class="text-5xl text-white mb-4 neon-text text-center">
          {{ player.username }}
        </h1>
        <div class="flex justify-center">
          <div
            class="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          ></div>
        </div>
      </div>

      <!-- Section des badges -->
      <div
        class="bg-black/75 rounded-lg p-8 mb-8 border border-purple-500 shadow-lg shadow-purple-500/30 transform transition-all hover:scale-[1.02]"
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
        </h2>
        <div
          v-if="player.badges && player.badges.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          <div
            v-for="badge in player.badges"
            :key="badge._id"
            class="flex flex-col items-center p-4 bg-gray-800 bg-opacity-70 rounded-lg transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
          >
            <img
              :src="badge.imageUrl"
              alt="Badge Image"
              class="h-16 w-16 mb-3 rounded-full border-2 border-purple-500 glow-badge"
            />
            <span class="text-white text-center">{{ badge.title }}</span>
          </div>
        </div>
        <div v-else class="text-gray-400 text-center italic">
          Aucun badge pour le moment
        </div>
      </div>

      <!-- Section des statistiques -->
      <div
        class="bg-black/75 bg-opacity-50 rounded-lg p-8 mb-8 border border-cyan-500 shadow-lg shadow-cyan-500/30 transform transition-all hover:scale-[1.02]"
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
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div class="bg-gray-800 bg-opacity-70 p-6 rounded-lg text-center">
            <div class="text-4xl font-bold text-pink-500 mb-2">
              {{ playerRanking?.totalVictories || 0 }}
            </div>
            <div class="text-gray-300">Victoires</div>
          </div>
          <div class="bg-gray-800 bg-opacity-70 p-6 rounded-lg text-center">
            <div class="text-4xl font-bold text-cyan-500 mb-2">
              {{ playerRanking?.totalTournaments || 0 }}
            </div>
            <div class="text-gray-300">Tournois</div>
          </div>
        </div>
      </div>

      <!-- Section des tournois -->
      <div
        class="bg-black/75 bg-opacity-50 rounded-lg p-8 border border-pink-500 shadow-lg shadow-pink-500/30 transform transition-all hover:scale-[1.02]"
      >
        <!-- filepath: d:\Dev\ACS\acs-frontend\src\views\Profil.vue -->
        <!-- Remplacer l'icône SVG actuelle dans la section des tournois -->

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
            <!-- Icône d'arbre de tournoi / bracket -->
            <path d="M2 2v5h5" />
            <path d="M2 7h12v5H2z" />
            <path d="M14 4v8" />
            <path d="M14 12h5v5h-5z" />
            <path d="M19 17h3v5h-3z" />
            <path d="M8 12v5h6" />
            <path d="M8 17h3v5H8z" />
          </svg>
          Tournois
        </h2>
        <div
          v-if="
            playerRanking?.tournamentsParticipated &&
            playerRanking.tournamentsParticipated.length > 0
          "
        >
          <ul class="space-y-4">
            <li
              v-for="tournament in playerRanking.tournamentsParticipated"
              :key="tournament._id"
              class="bg-gray-800 bg-opacity-70 p-4 rounded-lg flex items-center justify-between transform transition-all hover:bg-gray-700"
            >
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-3 text-pink-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-white font-semibold">{{
                  tournament.name
                }}</span>
              </div>
              <span class="text-gray-400">{{
                new Date(tournament.date).toLocaleDateString()
              }}</span>
            </li>
          </ul>
        </div>
        <div v-else class="text-gray-400 text-center italic">
          Aucun tournoi pour le moment
        </div>
      </div>
    </div>

    <!-- État de chargement -->
    <div v-else class="flex justify-center items-center h-64">
      <div class="animate-pulse flex flex-col items-center">
        <div
          class="w-20 h-20 border-4 border-t-pink-500 border-r-transparent border-b-cyan-500 border-l-transparent rounded-full animate-spin"
        ></div>
        <p class="mt-4 text-white">Chargement du profil...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import playerService from "../services/playerService";
import type { Player, PlayerRanking } from "../types";

const route = useRoute();
const player = ref<Player | null>(null);
const playerRanking = ref<PlayerRanking | null>(null);

const fetchPlayerProfile = async () => {
  try {
    const playerId = route.params.id as string;
    player.value = await playerService.getPlayerProfile(playerId);
    const rankings = await playerService.getPlayerRankings();
    playerRanking.value =
      rankings.find((ranking) => ranking.playerId === playerId) || null;
  } catch (error) {
    console.error("Erreur lors de la récupération du profil du joueur:", error);
  }
};

onMounted(() => {
  fetchPlayerProfile();
});
</script>

<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\Profil.vue -->
<style scoped>
.glow-badge {
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.7);
}

/* Animation pour les cartes */
.transform {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Styles pour les titres de section */
h2 {
  letter-spacing: 1px;
}

/* Style pour les statistiques */
.text-4xl {
  font-family: "Orbitron", sans-serif;
  letter-spacing: 2px;
}
</style>
