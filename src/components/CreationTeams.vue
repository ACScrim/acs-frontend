<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen p-8 bg-neon-gradient"
  >
    <h1 class="text-4xl text-white mb-8 neon-text">Gestion des Tournois</h1>
    <div class="mb-6 form-group">
      <label for="game" class="block text-lg text-white mb-2 neon-label">
        Sélectionner un Jeu
      </label>
      <select
        id="game"
        v-model="selectedGame"
        @change="fetchTournaments"
        class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <option v-for="game in games" :key="game._id" :value="game._id">
          {{ game.name }}
        </option>
      </select>
    </div>
    <div class="mb-6 form-group" v-if="tournaments.length > 0">
      <label for="tournament" class="block text-lg text-white mb-2 neon-label">
        Sélectionner un Tournoi
      </label>
      <select
        id="tournament"
        v-model="selectedTournament"
        @change="fetchTournamentDetails"
        class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <option
          v-for="tournament in tournaments"
          :key="tournament._id"
          :value="tournament._id"
        >
          {{ tournament.name }}
        </option>
      </select>
    </div>
    <div v-if="tournamentDetails">
      <h2 class="text-2xl text-white mb-4 neon-text">Détails du Tournoi</h2>
      <form @submit.prevent="updateTournament" class="w-full max-w-lg">
        <div class="mb-6 form-group">
          <label for="name" class="block text-lg text-white mb-2 neon-label">
            Nom du Tournoi
          </label>
          <input
            type="text"
            id="name"
            v-model="tournamentDetails.name"
            class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div class="mb-6 form-group">
          <label for="date" class="block text-lg text-white mb-2 neon-label">
            Date
          </label>
          <input
            type="date"
            id="date"
            v-model="tournamentDetails.date"
            class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div class="mb-6 form-group">
          <label
            for="discordChannelName"
            class="block text-lg text-white mb-2 neon-label"
          >
            Nom du Channel Discord
          </label>
          <input
            type="text"
            id="discordChannelName"
            v-model="tournamentDetails.discordChannelName"
            class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div class="mb-6 form-group">
          <label
            for="numTeams"
            class="block text-lg text-white mb-2 neon-label"
          >
            Nombre d'Équipes
          </label>
          <input
            type="number"
            id="numTeams"
            v-model="numTeams"
            @change="createTeams"
            class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
            min="1"
            required
          />
        </div>
        <div v-for="(team, index) in teams" :key="index" class="mb-4">
          <label
            :for="'team-' + index"
            class="block text-lg text-white mb-2 neon-label"
          >
            Nom de l'Équipe {{ index + 1 }}
          </label>
          <input
            type="text"
            :id="'team-' + index"
            v-model="team.name"
            class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <div class="mt-2">
            <div
              v-for="player in team.players"
              :key="player._id"
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {{ player.username }}
              <button
                @click="removePlayerFromTeam(player, index)"
                class="ml-2 text-red-500"
              >
                x
              </button>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <h3 class="text-lg font-bold mb-2 text-white">Joueurs Disponibles</h3>
          <div
            v-for="player in availablePlayers"
            :key="player._id"
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"
            @click="addPlayerToTeam(player)"
          >
            {{ player.username }}
          </div>
        </div>
        <button
          type="submit"
          class="px-6 py-3 text-lg font-bold text-white bg-pink-500 rounded shadow neon-button hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          Mettre à Jour le Tournoi
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import gameService from "../services/gameService";
import tournamentService from "../services/tournamentService";
import type { Game } from "../services/gameService";
import type { Tournament } from "../services/tournamentService";
import type { Player } from "../services/playerService";

const games = ref<Game[]>([]);
const tournaments = ref<Tournament[]>([]);
const selectedGame = ref<string | null>(null);
const selectedTournament = ref(null);
const tournamentDetails = ref<Tournament | null>(null);
const numTeams = ref(1);
const teams = ref<{ name: string; players: Player[] }[]>([]);
const availablePlayers = ref<Player[]>([]);

const fetchGames = async () => {
  try {
    games.value = await gameService.getGames();
  } catch (error) {
    console.error("Erreur lors de la récupération des jeux:", error);
  }
};

const fetchTournaments = async () => {
  try {
    if (selectedGame.value) {
      tournaments.value = await tournamentService.getTournamentsByGame(
        selectedGame.value
      );
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des tournois:", error);
  }
};

const fetchTournamentDetails = async () => {
  try {
    if (selectedTournament.value) {
      tournamentDetails.value = await tournamentService.getTournamentById(
        selectedTournament.value
      );
    }
    if (
      tournamentDetails.value &&
      Array.isArray(tournamentDetails.value.players)
    ) {
      availablePlayers.value = tournamentDetails.value
        .players as unknown as Player[];
    } else {
      availablePlayers.value = [];
    }
    createTeams();
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails du tournoi:",
      error
    );
  }
};

const createTeams = () => {
  teams.value = Array.from(
    { length: numTeams.value },
    (_, index): { name: string; players: Player[] } => ({
      name: `Équipe ${index + 1}`,
      players: [],
    })
  );
};

const addPlayerToTeam = (player: {
  _id?: string | undefined;
  username: string;
}) => {
  const teamIndex = teams.value.findIndex((team) => team.players.length < 5); // Limite de 5 joueurs par équipe
  if (teamIndex !== -1) {
    teams.value[teamIndex].players.push(player);
    availablePlayers.value = availablePlayers.value.filter(
      (p) => p._id !== player._id
    );
  }
};

const removePlayerFromTeam = (player, teamIndex) => {
  teams.value[teamIndex].players = teams.value[teamIndex].players.filter(
    (p) => p._id !== player._id
  );
  availablePlayers.value.push(player);
};

const updateTournament = async () => {
  try {
    const updatedTournament = {
      ...tournamentDetails.value,
      teams: teams.value,
    };
    await tournamentService.updateTournament(
      selectedTournament.value,
      updatedTournament
    );
    alert("Tournoi mis à jour avec succès !");
  } catch (error) {
    console.error("Erreur lors de la mise à jour du tournoi:", error);
  }
};

fetchGames();
</script>

<style scoped>
.bg-neon-gradient {
  background: linear-gradient(
    135deg,
    #0d0221 0%,
    #45125e 40%,
    #a22561 80%,
    #ff3864 100%
  );
}

.neon-text {
  font-family: "Streamster", cursive;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff,
    0 0 40px #ff00ff;
}

.neon-input {
  background: #1a1a1a;
  box-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff;
  transition: box-shadow 0.3s ease;
}

.neon-input:focus {
  outline: none;
  box-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff;
}

.neon-button {
  font-size: 1rem;
  background: #ff00ff;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.neon-button:hover {
  background: #e600e6;
  box-shadow: 0 0 20px #ff00ff, 0 0 30px #ff00ff;
}
</style>
