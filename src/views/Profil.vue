<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\Profil.vue -->
<template>
  <div class="container mx-auto p-4 bg-neon-gradient min-h-screen">
    <h1 class="text-4xl text-white mb-8 neon-text">
      Profil de {{ player?.username }}
    </h1>
    <div v-if="player">
      <h2 class="text-2xl text-white mb-4">Badges</h2>
      <ul class="text-white">
        <li v-for="badge in player.badges" :key="badge._id">
          <img
            :src="badge.imageUrl"
            alt="Badge Image"
            class="h-10 w-10 inline-block mr-2"
          />
          {{ badge.title }}
        </li>
      </ul>
      <h2 class="text-2xl text-white mt-8 mb-4">Statistiques</h2>
      <p class="text-white">
        Nombre de victoires : {{ playerRanking?.totalVictories }}
      </p>
      <p class="text-white">
        Nombre de tournois : {{ playerRanking?.totalTournaments }}
      </p>
      <h2 class="text-2xl text-white mt-8 mb-4">Tournois</h2>
      <ul class="text-white">
        <li v-for="tournament in player.tournaments" :key="tournament._id">
          {{ tournament.name }}
        </li>
      </ul>
    </div>
    <div v-else class="text-white">Chargement...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import playerService from "../services/playerService";
import type { Player, PlayerRanking } from "../services/playerService";

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

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
