<template>
  <div class="container mx-auto p-4 bg-neon-gradient min-h-screen">
    <!-- Sélection du jeu et du tournoi -->
    <h1 class="text-4xl text-white mb-8 neon-text">Gestion des Équipes</h1>
    <div class="mb-4">
      <label for="game" class="block text-lg text-white mb-2 neon-label"
        >Sélectionner un jeu</label
      >
      <select
        id="game"
        v-model="selectedGame"
        @change="fetchTournamentsByGame"
        class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <option v-for="game in games" :key="game._id" :value="game._id">
          {{ game.name }}
        </option>
      </select>
    </div>
    <div class="mb-4" v-if="tournaments.length > 0">
      <label for="tournament" class="block text-lg text-white mb-2 neon-label"
        >Sélectionner un tournoi</label
      >
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

    <!-- Détails du tournoi -->
    <div v-if="selectedTournamentDetails">
      <h2 class="text-xl font-bold mb-4 text-white">Détails du tournoi</h2>
      <p class="text-white">
        <strong>Nom:</strong> {{ selectedTournamentDetails.name }}
      </p>
      <p class="text-white">
        <strong>Date:</strong> {{ selectedTournamentDetails.date }}
      </p>
      <p class="text-white">
        <strong>Discord Channel:</strong>
        {{ selectedTournamentDetails.discordChannelName }}
      </p>
    </div>

    <!-- Génération des équipes -->
    <div v-if="selectedTournamentDetails">
      <label for="numTeams" class="block text-lg text-white mb-2 neon-label"
        >Entrer le nombre d'équipes</label
      >
      <input
        type="number"
        id="numTeams"
        v-model="numTeams"
        class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
      <button
        @click="generateTeams"
        class="mt-4 px-6 py-3 text-lg font-bold text-white bg-pink-500 rounded shadow neon-button hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        Générer les équipes
      </button>
    </div>

    <!-- Affichage des équipes avec drag and drop -->
    <div v-if="teams.length > 0">
      <h2 class="text-xl font-bold mb-4 text-white">Équipes</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(team, index) in teams"
          :key="index"
          class="mb-4 p-4 bg-gray-800 rounded shadow"
        >
          <div class="flex items-center mb-2">
            <input
              type="text"
              v-model="team.name"
              class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <vue-draggable-next
            v-model="team.players"
            group="players"
            @end="onDragEnd"
            class="space-y-2"
          >
            <div
              v-for="player in team.players"
              :key="player._id"
              class="p-2 bg-gray-700 rounded cursor-move text-white"
            >
              {{ player.username }}
            </div>
            <!-- Ajouter un div pour gérer l'état du bloc vide -->
            <div
              v-if="team.players.length === 0"
              class="p-2 text-gray-400 text-center"
            >
              Aucune équipe - Déplacez un joueur ici
            </div>
          </vue-draggable-next>
        </div>
      </div>
      <button
        @click="saveTeams"
        class="mt-4 px-6 py-3 text-lg font-bold text-white bg-green-500 rounded shadow neon-button hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Valider
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import gameService from "../services/gameService";
import tournamentService from "../services/tournamentService";
import type { Game } from "../services/gameService";
import type { Tournament, Team } from "../services/tournamentService";
import type { Player } from "../services/playerService";
import { VueDraggableNext } from "vue-draggable-next"; // Importer vue-draggable-next

const games = ref<Game[]>([]);
const tournaments = ref<Tournament[]>([]);
const selectedGame = ref("");
const selectedTournament = ref("");

const selectedTournamentDetails = ref<
  (Tournament & { players: Player[] }) | null
>(null);
const numTeams = ref(2);

const teams = ref<Team[]>([]);

// Récupérer la liste des jeux
const fetchGames = async () => {
  games.value = await gameService.getGames();
};

// Récupérer les tournois pour un jeu sélectionné
const fetchTournamentsByGame = async () => {
  if (selectedGame.value) {
    tournaments.value = await tournamentService.getTournamentsByGame(
      selectedGame.value
    );
  }
};

// Récupérer les détails d'un tournoi sélectionné
const fetchTournamentDetails = async () => {
  if (selectedTournament.value) {
    selectedTournamentDetails.value = await tournamentService.getTournamentById(
      selectedTournament.value
    );
    // Si des équipes existent déjà, les afficher
    if (selectedTournamentDetails.value.teams) {
      teams.value = selectedTournamentDetails.value.teams;
    }
  }
  console.log(teams);
};

// Générer les équipes
const generateTeams = async () => {
  if (selectedTournament.value && numTeams.value > 0) {
    const response = await tournamentService.generateTeams(
      selectedTournament.value,
      numTeams.value
    );
    teams.value = response.teams ?? [];
  }
};

// Gérer la fin d'un drag and drop
const onDragEnd = () => {
  console.log("Joueur déplacé");
};

// Enregistrer les équipes en base de données
const saveTeams = async () => {
  if (selectedTournament.value) {
    if (selectedTournamentDetails.value) {
      const updatedTournament = {
        ...selectedTournamentDetails.value,
        teams: teams.value,
        game: selectedTournamentDetails.value.game,
      };
      await tournamentService.updateTournament(
        selectedTournament.value,
        updatedTournament
      );
      alert("Équipes enregistrées avec succès !");
    }
    alert("Équipes enregistrées avec succès !");
  }
};

// Charger les jeux au montage du composant
onMounted(() => {
  fetchGames();
});
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

.toast {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 10px, 0 0 20px;
}

.error-toast {
  background: #ff3864;
  color: white;
  box-shadow: 0 0 10px #ff3864, 0 0 20px #ff3864;
}

.success-toast {
  background: #28a745;
  color: white;
  box-shadow: 0 0 10px #28a745, 0 0 20px #28a745;
}
</style>
