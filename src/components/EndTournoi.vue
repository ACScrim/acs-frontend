<template>
  <div>
    <div class="mb-4">
      <label for="winningTeam" class="block text-gray-700"
        >Équipe Gagnante</label
      >
      <select
        id="winningTeam"
        v-model="winningTeam"
        class="mt-1 block w-full"
        required
      >
        <option v-for="team in teams" :key="team._id" :value="team._id">
          {{ team.name }}
        </option>
      </select>
    </div>
    <div class="mb-4">
      <label for="score" class="block text-gray-700">Score</label>
      <input
        type="number"
        id="score"
        v-model="score"
        class="mt-1 block w-full"
        required
      />
    </div>
    <button
      @click="endTournament"
      class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      Terminer le Tournoi
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const winningTeam = ref("");
const score = ref(0);
const teams = ref([]);

const fetchTeams = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/tournaments/${tournamentId}`
  );
  teams.value = response.data.teams;
};

const endTournament = async () => {
  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/tournaments/${tournamentId}`,
    {
      winningTeam: winningTeam.value,
      score: score.value,
    }
  );
  console.log("Tournoi terminé:", response.data);
};

fetchTeams();
</script>
