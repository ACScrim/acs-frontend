<template>
  <div class="team-management-container">
    <!-- En-tête -->
    <h1 class="cyber-title">Gestion des Équipes</h1>

    <!-- Sélection du jeu et du tournoi -->
    <div class="selection-container">
      <div class="form-group">
        <label for="game" class="form-label">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
            />
          </svg>
          Sélectionner un jeu
        </label>
        <div class="select-wrapper">
          <select
            id="game"
            v-model="selectedGame"
            @change="fetchTournamentsByGame"
          >
            <option value="" disabled selected>Choisissez un jeu</option>
            <option v-for="game in games" :key="game._id" :value="game._id">
              {{ game.name }}
            </option>
          </select>
          <div class="select-arrow"></div>
        </div>
      </div>

      <div class="form-group" v-if="tournaments.length > 0">
        <label for="tournament" class="form-label">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            />
          </svg>
          Sélectionner un tournoi
        </label>
        <div class="select-wrapper">
          <select
            id="tournament"
            v-model="selectedTournament"
            @change="fetchTournamentDetails"
          >
            <option value="" disabled selected>Choisissez un tournoi</option>
            <option
              v-for="tournament in tournaments"
              :key="tournament._id"
              :value="tournament._id"
            >
              {{ tournament.name }}
            </option>
          </select>
          <div class="select-arrow"></div>
        </div>
      </div>
      <div
        v-else-if="selectedGame && tournaments.length === 0"
        class="empty-state"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z"
            clip-rule="evenodd"
          />
        </svg>
        <p>Aucun tournoi disponible pour ce jeu</p>
      </div>
    </div>

    <!-- Détails du tournoi -->
    <div v-if="selectedTournamentDetails" class="tournament-details">
      <div class="details-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z"
            clip-rule="evenodd"
          />
        </svg>
        <h2>Détails du tournoi</h2>
      </div>
      <div class="details-grid">
        <div class="detail-item">
          <span class="detail-label">Nom:</span>
          <span class="detail-value">{{ selectedTournamentDetails.name }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Date:</span>
          <span class="detail-value">{{
            new Date(selectedTournamentDetails.date).toLocaleString()
          }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Discord Channel:</span>
          <span class="detail-value">{{
            selectedTournamentDetails.discordChannelName
          }}</span>
        </div>
      </div>
    </div>

    <!-- Génération des équipes -->
    <div v-if="selectedTournamentDetails" class="teams-generator">
      <div class="generator-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
          />
        </svg>
        <h2>Génération des équipes</h2>
      </div>
      <div class="generator-form">
        <div class="form-group">
          <label for="numTeams" class="form-label">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z"
                clip-rule="evenodd"
              />
            </svg>
            Nombre d'équipes
          </label>
          <div class="input-wrapper">
            <input
              type="number"
              id="numTeams"
              v-model="numTeams"
              min="2"
              max="10"
            />
            <div class="input-glow"></div>
          </div>
        </div>
        <button @click="generateTeams" class="neon-button-purple">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clip-rule="evenodd"
            />
          </svg>
          Générer les équipes
        </button>
      </div>
    </div>

    <!-- Affichage des équipes avec drag and drop -->
    <div v-if="teams.length > 0" class="teams-display">
      <div class="teams-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path
            fill-rule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
            clip-rule="evenodd"
          />
        </svg>
        <h2>Composition des équipes</h2>
      </div>

      <div class="teams-grid">
        <div v-for="(team, index) in teams" :key="index" class="team-card">
          <div class="team-name">
            <input
              type="text"
              v-model="team.name"
              placeholder="Nom de l'équipe"
            />
            <div class="input-glow"></div>
          </div>
          <vue-draggable-next
            v-model="team.players"
            group="players"
            @end="onDragEnd"
            class="player-list"
          >
            <div
              v-for="player in team.players"
              :key="player._id"
              class="player-item"
            >
              <span class="player-name">{{ player.username }}</span>
              <div class="player-grip">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <!-- Placeholder when empty -->
            <div v-if="team.players.length === 0" class="empty-team">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              <p>Déposez un joueur ici</p>
            </div>
          </vue-draggable-next>
        </div>
      </div>

      <div class="button-group">
        <button @click="saveTeams" class="neon-button-green">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          Valider les équipes
        </button>
        <button @click="saveTeamDefinitive" class="neon-button-pink">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          Valider les équipes définitives
        </button>
      </div>
    </div>

    <!-- Ajouter cette ligne avant la fermeture de template -->
    <ConfirmationDialog
      v-if="showConfirmationDialog"
      title="Valider les équipes définitives"
      message="Attention ! Cette action est irréversible et va finaliser les équipes du tournoi. Les canaux Discord seront créés automatiquement. Voulez-vous continuer ?"
      @confirm="confirmTeamDefinitive"
      @cancel="cancelConfirmation"
    />

    <!-- Messages d'état -->
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import gameService from "../../services/gameService";
import tournamentService from "../../services/tournamentService";
import type { Game, Tournament, Team, Player } from "../../types";
import { VueDraggableNext } from "vue-draggable-next"; // Importer vue-draggable-next
import Toast from "@/shared/Toast.vue";
import ConfirmationDialog from "@/shared/ConfirmationDialog.vue"; // Importer le composant ConfirmationDialog

const games = ref<Game[]>([]);
const tournaments = ref<Tournament[]>([]);
const selectedGame = ref("");
const selectedTournament = ref("");
const error = ref<string | null>(null);
const success = ref<string | null>(null);

const showConfirmationDialog = ref(false); // Ajouter cette ligne

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
    const allTournaments = await tournamentService.getTournamentsByGame(
      selectedGame.value
    );
    tournaments.value = allTournaments.filter(
      (tournament) => !tournament.finished
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
  // Ne rien faire pour l'instant
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
      showMessage("success", "Equipes enregistrées avec succès !");
    }
  }
};

const saveTeamDefinitive = async () => {
  showConfirmationDialog.value = true;
};

const confirmTeamDefinitive = async () => {
  showConfirmationDialog.value = false;

  if (selectedTournament.value && selectedTournamentDetails.value) {
    try {
      const updatedTournament = {
        ...selectedTournamentDetails.value,
        teams: teams.value,
        game: selectedTournamentDetails.value.game,
        finished: true,
      };

      await tournamentService.updateTournament(
        selectedTournament.value,
        updatedTournament
      );

      await tournamentService.createDiscordChannels(teams.value);
      showMessage(
        "success",
        "Équipes définitives enregistrées avec succès et canaux Discord créés !"
      );

      // Réinitialiser les champs si nécessaire ou rediriger l'utilisateur
      // fetchTournamentDetails(); // Actualiser les détails du tournoi
    } catch (err) {
      showMessage(
        "error",
        "Une erreur est survenue lors de la validation des équipes"
      );
      console.error("Erreur lors de la validation des équipes:", err);
    }
  }
};

const cancelConfirmation = () => {
  showConfirmationDialog.value = false;
};

const showMessage = (type: "success" | "error", message: string) => {
  if (type === "success") {
    success.value = message;
    error.value = null;
  } else {
    error.value = message;
    success.value = null;
  }
  setTimeout(() => {
    success.value = null;
    error.value = null;
  }, 5000);
};

// Charger les jeux au montage du composant
onMounted(() => {
  fetchGames();
});
</script>

<style scoped>
/* Container principal */
.team-management-container {
  padding: 2rem;
  background: rgba(13, 6, 23, 0.7);
  border-radius: 1rem;
  border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

/* Animation de grille en fond (lignes horizontales et verticales) */
.team-management-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      rgba(139, 92, 246, 0.03) 25%,
      rgba(139, 92, 246, 0.03) 26%,
      transparent 27%,
      transparent 74%,
      rgba(139, 92, 246, 0.03) 75%,
      rgba(139, 92, 246, 0.03) 76%,
      transparent 77%
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      rgba(139, 92, 246, 0.03) 25%,
      rgba(139, 92, 246, 0.03) 26%,
      transparent 27%,
      transparent 74%,
      rgba(139, 92, 246, 0.03) 75%,
      rgba(139, 92, 246, 0.03) 76%,
      transparent 77%
    );
  background-size: 50px 50px;
  z-index: -1;
}

/* Titre principal avec effet néon */
.cyber-title {
  font-family: "Audiowide", cursive;
  font-size: 2.5rem;
  color: #ffffff;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff;
  letter-spacing: 2px;
  margin-bottom: 2rem;
  text-align: center;
  animation: pulsate 2s infinite alternate;
}

@keyframes pulsate {
  0% {
    text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff;
  }
  100% {
    text-shadow: 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff;
  }
}

/* Container de sélection */
.selection-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(23, 25, 35, 0.7);
  border-radius: 0.75rem;
  border: 1px solid rgba(6, 182, 212, 0.3);
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
}

/* Groupe de formulaire */
.form-group {
  margin-bottom: 1rem;
  width: 100%;
}

/* Label du formulaire */
.form-label {
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  color: #06b6d4;
  margin-bottom: 0.5rem;
  font-family: "Orbitron", sans-serif;
  font-weight: 600;
  text-shadow: 0 0 5px rgba(6, 182, 212, 0.7);
}

/* Container pour le select */
.select-wrapper {
  position: relative;
  width: 100%;
}

/* Select stylisé */
select {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: rgba(17, 24, 39, 0.8);
  color: white;
  border: 1px solid rgba(6, 182, 212, 0.5);
  border-radius: 0.5rem;
  font-family: "Orbitron", sans-serif;
  appearance: none;
  box-shadow: 0 0 8px rgba(6, 182, 212, 0.3);
  transition: all 0.3s ease;
}

select:focus {
  outline: none;
  border-color: #06b6d4;
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.5);
}

/* Flèche personnalisée pour le select */
.select-arrow {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #06b6d4;
  pointer-events: none;
}

/* Container d'input */
.input-wrapper {
  position: relative;
  width: 100%;
}

/* Input stylisé */
input {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: rgba(17, 24, 39, 0.8);
  color: white;
  border: 1px solid rgba(6, 182, 212, 0.5);
  border-radius: 0.5rem;
  font-family: "Orbitron", sans-serif;
  box-shadow: 0 0 8px rgba(6, 182, 212, 0.3);
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #06b6d4;
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.5);
}

/* Effet de lueur pour les inputs */
.input-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0.5rem;
  pointer-events: none;
  transition: box-shadow 0.3s ease;
}

input:focus + .input-glow {
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.7);
}

/* Détails du tournoi */
.tournament-details {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(23, 25, 35, 0.7);
  border-radius: 0.75rem;
  border: 1px solid rgba(236, 72, 153, 0.3);
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.2);
}

.details-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.details-header svg {
  color: #ec4899;
}

.details-header h2 {
  font-family: "Orbitron", sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #f0abfc;
  text-shadow: 0 0 5px rgba(240, 171, 252, 0.7);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.detail-item {
  padding: 0.75rem;
  background: rgba(31, 41, 55, 0.7);
  border-radius: 0.5rem;
  border: 1px solid rgba(236, 72, 153, 0.2);
}

.detail-label {
  display: block;
  font-family: "Orbitron", sans-serif;
  font-size: 0.875rem;
  color: #ec4899;
  margin-bottom: 0.25rem;
}

.detail-value {
  font-family: "Orbitron", sans-serif;
  font-weight: 600;
  color: #f9fafb;
}

/* Générateur d'équipes */
.teams-generator {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(23, 25, 35, 0.7);
  border-radius: 0.75rem;
  border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.2);
}

.generator-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.generator-header svg {
  color: #8b5cf6;
}

.generator-header h2 {
  font-family: "Orbitron", sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #a78bfa;
  text-shadow: 0 0 5px rgba(167, 139, 250, 0.7);
}

.generator-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Affichage des équipes */
.teams-display {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(23, 25, 35, 0.7);
  border-radius: 0.75rem;
  border: 1px solid rgba(16, 185, 129, 0.3);
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.2);
}

.teams-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.teams-header svg {
  color: #10b981;
}

.teams-header h2 {
  font-family: "Orbitron", sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #34d399;
  text-shadow: 0 0 5px rgba(52, 211, 153, 0.7);
}

.teams-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

/* Carte d'équipe */
.team-card {
  padding: 1.5rem;
  background: rgba(31, 41, 55, 0.7);
  border-radius: 0.75rem;
  border: 1px solid rgba(16, 185, 129, 0.2);
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.team-card:hover {
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
  border-color: rgba(16, 185, 129, 0.4);
}

.team-name {
  position: relative;
  margin-bottom: 0.5rem;
}

.team-name input {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: rgba(17, 24, 39, 0.8);
  color: white;
  border: 1px solid rgba(16, 185, 129, 0.5);
  border-radius: 0.5rem;
  font-family: "Orbitron", sans-serif;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.3);
  transition: all 0.3s ease;
}

.team-name input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.5);
}

.team-name .input-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0.5rem;
  pointer-events: none;
  transition: box-shadow 0.3s ease;
}

.team-name input:focus + .input-glow {
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.7);
}

/* Liste des joueurs */
.player-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.player-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: rgba(17, 24, 39, 0.8);
  color: white;
  border: 1px solid rgba(16, 185, 129, 0.5);
  border-radius: 0.5rem;
  font-family: "Orbitron", sans-serif;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.3);
  transition: all 0.3s ease;
}

.player-item:hover {
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.5);
}

.player-grip {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background: rgba(31, 41, 55, 0.7);
  border-radius: 0.25rem;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.3);
}

.empty-team {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  background: rgba(17, 24, 39, 0.8);
  color: rgba(16, 185, 129, 0.5);
  border: 1px solid rgba(16, 185, 129, 0.5);
  border-radius: 0.5rem;
  font-family: "Orbitron", sans-serif;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.3);
  transition: all 0.3s ease;
}

.empty-team p {
  margin-left: 0.5rem;
}

.neon-button-purple {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: rgba(139, 92, 246, 0.7);
  color: white;
  border: 1px solid rgba(139, 92, 246, 0.5);
  border-radius: 0.5rem;
  font-family: "Orbitron", sans-serif;
  font-weight: 600;
  text-shadow: 0 0 5px rgba(139, 92, 246, 0.7);
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
  transition: all 0.3s ease;
}

.neon-button-purple:hover {
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
}

.neon-button-green {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: rgba(16, 185, 129, 0.7);
  color: white;
  border: 1px solid rgba(16, 185, 129, 0.5);
  border-radius: 0.5rem;
  font-family: "Orbitron", sans-serif;
  font-weight: 600;
  text-shadow: 0 0 5px rgba(16, 185, 129, 0.7);
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
  transition: all 0.3s ease;
}

.neon-button-green:hover {
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap; /* Pour qu'ils passent à la ligne sur mobile */
}

/* Style pour le bouton définitif rose */
.neon-button-pink {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: rgba(236, 72, 153, 0.7);
  color: white;
  border: 1px solid rgba(236, 72, 153, 0.5);
  border-radius: 0.5rem;
  font-family: "Orbitron", sans-serif;
  font-weight: 600;
  text-shadow: 0 0 5px rgba(236, 72, 153, 0.7);
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.3);
  transition: all 0.3s ease;
}

.neon-button-pink:hover {
  background: rgba(236, 72, 153, 0.8);
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
  transform: translateY(-2px);
}

.neon-button-pink:active {
  transform: translateY(1px);
}
</style>
