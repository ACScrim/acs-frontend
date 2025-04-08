<!-- filepath: d:\Dev\ACS\acs-frontend\src\components\VoirCheckIn.vue -->
<template>
  <div class="check-in-container">
    <h1 class="cyber-title">Statut des Check-ins</h1>

    <!-- Information du tournoi sélectionné -->
    <div class="tournament-selection-info">
      <div class="info-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="tournament-icon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clip-rule="evenodd"
          />
        </svg>
        <h2>Tournoi sélectionné</h2>
      </div>

      <!-- Affichage du tournoi -->
      <div v-if="selectedTournamentDetails" class="tournament-info-box">
        <div class="info-item">
          <span class="info-label">Nom:</span>
          <span class="info-value">{{ selectedTournamentDetails.name }}</span>
        </div>
        <div class="info-item" v-if="selectedTournamentDetails.date">
          <span class="info-label">Date:</span>
          <span class="info-value">
            {{
              new Date(selectedTournamentDetails.date).toLocaleDateString(
                "fr-FR"
              )
            }}
          </span>
        </div>
        <div
          v-if="selectedTournamentDetails.finished"
          class="tournament-status finished"
        >
          <span>Tournoi terminé</span>
        </div>
      </div>
      <div v-else class="tournament-info-empty">
        Veuillez sélectionner un tournoi dans le menu en haut de la page
      </div>
    </div>

    <!-- Détails du tournoi et statuts des check-ins -->
    <div v-if="selectedTournamentDetails" class="tournament-details-container">
      <div class="tournament-header">
        <h2 class="tournament-name">{{ selectedTournamentDetails.name }}</h2>
        <div class="tournament-stats">
          <div class="stat-item">
            <span class="stat-label">Date:</span>
            <span class="stat-value">{{
              new Date(selectedTournamentDetails.date).toLocaleString()
            }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Joueurs:</span>
            <span class="stat-value">{{
              selectedTournamentDetails.players.length
            }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Check-ins:</span>
            <span class="stat-value"
              >{{ getCheckedInCount() }} /
              {{ selectedTournamentDetails.players.length }}</span
            >
          </div>
        </div>
      </div>

      <div class="check-in-progress">
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: getCheckedInPercentage() + '%' }"
          ></div>
        </div>
        <div class="progress-text">
          {{ getCheckedInPercentage() }}% des joueurs ont fait leur check-in
        </div>
      </div>

      <div class="players-grid">
        <!-- Carte de joueur dans players-grid -->
        <div
          v-for="player in selectedTournamentDetails.players"
          :key="player._id"
          :class="[
            'player-card',
            {
              'checked-in':
                player._id && selectedTournamentDetails?.checkIns?.[player._id],
            },
          ]"
        >
          <div class="player-avatar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="player-info">
            <div class="player-name">{{ player.username }}</div>

            <!-- Ajout de la date d'inscription -->
            <div
              v-if="
                player._id &&
                selectedTournamentDetails?.registrationDates?.[player._id]
              "
              class="registration-date"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Inscrit le {{ formatRegistrationDate(player._id) }}</span>
            </div>

            <div
              :class="[
                'check-in-status',
                {
                  'status-yes':
                    player._id &&
                    selectedTournamentDetails?.checkIns?.[player._id],
                  'status-no': !(
                    player._id &&
                    selectedTournamentDetails?.checkIns?.[player._id]
                  ),
                },
              ]"
            >
              <svg
                v-if="
                  player._id &&
                  selectedTournamentDetails?.checkIns?.[player._id]
                "
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
              {{
                player._id && selectedTournamentDetails?.checkIns?.[player._id]
                  ? "Check-in confirmé"
                  : "En attente"
              }}
            </div>
          </div>
        </div>
      </div>

      <div class="actions-container">
        <button class="refresh-button" @click="() => fetchTournamentDetails()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clip-rule="evenodd"
            />
          </svg>
          Rafraîchir les statuts
        </button>
      </div>
    </div>

    <!-- État vide ou chargement -->
    <div
      v-else-if="selectedTournament && !selectedTournamentDetails"
      class="empty-state loading"
    >
      <svg
        class="animate-spin h-10 w-10"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <p>Chargement des informations du tournoi...</p>
    </div>

    <div
      v-else-if="tournaments.length > 0 && !selectedTournament"
      class="empty-state"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16"
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
      <p>Veuillez sélectionner un tournoi pour voir les status des check-ins</p>
    </div>

    <div
      v-else-if="selectedGame && tournaments.length === 0"
      class="empty-state"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z"
          clip-rule="evenodd"
        />
      </svg>
      <p>Aucun tournoi actif pour ce jeu</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import gameService from "../../services/gameService";
import tournamentService from "../../services/tournamentService";
import type { Game, Tournament, Player } from "../../types";

// Accepter les props du parent
const props = defineProps<{
  selectedGame: string;
  selectedTournament: string;
}>();

const games = ref<Game[]>([]);
const tournaments = ref<Tournament[]>([]);

const selectedTournamentDetails = ref<
  (Tournament & { players: Player[] }) | null
>(null);

// Récupérer la liste des jeux
const fetchGames = async () => {
  games.value = await gameService.getGames();
};

// Récupérer les tournois pour un jeu sélectionné
const fetchTournamentsByGame = async (gameId: string) => {
  if (gameId) {
    const allTournaments = await tournamentService.getTournamentsByGame(gameId);
    tournaments.value = allTournaments.filter(
      (tournament) => !tournament.finished
    );
  }
};
// Récupérer les détails d'un tournoi sélectionné
const fetchTournamentDetails = async (tournamentId?: string) => {
  const id = tournamentId || props.selectedTournament;
  if (id) {
    selectedTournamentDetails.value = await tournamentService.getTournamentById(
      id
    );
  }
};

// Calculer le nombre de joueurs ayant fait leur check-in
const getCheckedInCount = () => {
  if (
    !selectedTournamentDetails.value ||
    !selectedTournamentDetails.value.checkIns
  )
    return 0;

  return Object.values(selectedTournamentDetails.value.checkIns).filter(Boolean)
    .length;
};

// Fonction pour formater la date d'inscription
const formatRegistrationDate = (playerId: string) => {
  if (!selectedTournamentDetails.value?.registrationDates?.[playerId]) {
    return "N/A";
  }

  const date = new Date(
    selectedTournamentDetails.value.registrationDates[playerId]
  );

  // Format: "DD/MM/YYYY à HH:MM"
  return date.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Calculer le pourcentage de check-ins
const getCheckedInPercentage = () => {
  if (
    !selectedTournamentDetails.value ||
    !selectedTournamentDetails.value.players.length
  )
    return 0;

  const count = getCheckedInCount();
  const total = selectedTournamentDetails.value.players.length;
  return Math.round((count / total) * 100);
};

// Charger les données initiales
onMounted(() => {
  fetchGames();

  // Si un jeu est déjà sélectionné depuis les props
  if (props.selectedGame) {
    fetchTournamentsByGame(props.selectedGame);

    // Si un tournoi est déjà sélectionné depuis les props
    if (props.selectedTournament) {
      fetchTournamentDetails();
    }
  }
});

// Observer les changements sur les propriétés
watch(
  () => props.selectedGame,
  async (newValue) => {
    if (newValue) {
      await fetchTournamentsByGame(newValue);
    }
  }
);

watch(
  () => props.selectedTournament,
  async (newValue) => {
    if (newValue) {
      await fetchTournamentDetails();
    }
  }
);
</script>

<style scoped>
/* Container principal */
.check-in-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem;
  background: rgba(13, 6, 23, 0.7);
  border-radius: 1rem;
  border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

/* Effet de grille en arrière-plan */
.check-in-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      to right,
      rgba(139, 92, 246, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: -1;
  transform: perspective(500px) rotateX(10deg);
  opacity: 0.3;
}

/* Titre principal avec effet néon */
.cyber-title {
  font-family: "Audiowide", cursive;
  font-size: 2.5rem;
  color: #ffffff;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff,
    0 0 40px #ff00ff;
  position: relative;
  letter-spacing: 2px;
}

/* Grille de sélection */
.selection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* Groupe de formulaire */
.form-group {
  margin-bottom: 1rem;
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
.cyber-select {
  width: 100%;
  padding: 0.75rem 1rem;
  color: white;
  background-color: rgba(17, 24, 39, 0.8);
  border: 1px solid rgba(6, 182, 212, 0.5);
  border-radius: 0.5rem;
  font-family: "Orbitron", sans-serif;
  box-shadow: 0 0 8px rgba(6, 182, 212, 0.3);
  transition: all 0.3s ease;
  appearance: none;
}

.cyber-select:focus {
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

/* Container des détails du tournoi */
.tournament-details-container {
  background: rgba(17, 24, 39, 0.7);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-top: 1rem;
  border: 1px solid rgba(6, 182, 212, 0.3);
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
}

/* En-tête du tournoi */
.tournament-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(139, 92, 246, 0.3);
  padding-bottom: 1rem;
}

/* Nom du tournoi */
.tournament-name {
  font-family: "Orbitron", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #f0abfc;
  text-shadow: 0 0 5px rgba(240, 171, 252, 0.7);
}

/* Stats du tournoi */
.tournament-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #a78bfa;
  font-family: "Orbitron", sans-serif;
}

.stat-value {
  font-size: 1.125rem;
  color: white;
  font-family: "Orbitron", sans-serif;
  font-weight: 600;
}

/* Barre de progression des check-ins */
.check-in-progress {
  margin-bottom: 2rem;
}

.progress-bar {
  height: 0.75rem;
  background: rgba(55, 65, 81, 0.5);
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #8b5cf6, #ec4899);
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
  transition: width 0.5s ease;
}

.progress-text {
  text-align: center;
  color: #a78bfa;
  font-family: "Orbitron", sans-serif;
  font-size: 0.875rem;
}

/* Grille des joueurs */
.players-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

/* Carte de joueur */
.player-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: rgba(31, 41, 55, 0.5);
  border-radius: 0.5rem;
  border: 1px solid rgba(107, 114, 128, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.player-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 0.25rem;
  height: 100%;
  background: #ef4444;
  opacity: 0.7;
}

.player-card.checked-in::before {
  background: #10b981;
}

.player-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Avatar du joueur */
.player-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: rgba(17, 24, 39, 0.7);
  border-radius: 50%;
  color: #a78bfa;
}

/* Informations du joueur */
.player-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.player-name {
  font-family: "Orbitron", sans-serif;
  font-weight: 600;
  color: white;
  margin-bottom: 0.3rem;
}

/* Statut de check-in */
.check-in-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-family: "Orbitron", sans-serif;
}

.status-yes {
  color: #10b981;
}

.status-no {
  color: #ef4444;
}

/* Conteneur d'actions */
.actions-container {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

/* Bouton de rafraîchissement */
.refresh-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(45deg, #2563eb, #3b82f6);
  color: white;
  font-family: "Orbitron", sans-serif;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
  position: relative;
  overflow: hidden;
}

.refresh-button:hover {
  background: linear-gradient(45deg, #3b82f6, #60a5fa);
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
  transform: translateY(-2px);
}

.refresh-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: all 0.6s ease;
}

.refresh-button:hover::before {
  left: 100%;
}

/* États vides */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: rgba(17, 24, 39, 0.5);
  border-radius: 0.75rem;
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: #a78bfa;
}

.empty-state svg {
  margin-bottom: 1rem;
}

.empty-state p {
  font-family: "Orbitron", sans-serif;
  text-align: center;
}

/* État de chargement */
.empty-state.loading {
  color: #8b5cf6;
}

/* Animation de rotation */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Media queries pour responsive */
@media (max-width: 768px) {
  .check-in-container {
    padding: 1rem;
  }

  .cyber-title {
    font-size: 2rem;
  }

  .tournament-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
}

.registration-date {
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  color: #a78bfa;
  margin-bottom: 0.4rem;
  padding: 0.15rem 0.4rem;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 0.25rem;
  width: fit-content;
  border-left: 2px solid rgba(139, 92, 246, 0.5);
}

.registration-date svg {
  color: #c4b5fd; /* Violet plus clair */
  min-width: 16px;
}

/* Nouveaux styles pour l'affichage du tournoi sélectionné */
.tournament-selection-info {
  background: rgba(17, 24, 39, 0.7);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(6, 182, 212, 0.3);
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
}

.info-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.tournament-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #06b6d4;
}

.info-header h2 {
  font-family: "Orbitron", sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #06b6d4;
  text-shadow: 0 0 5px rgba(6, 182, 212, 0.5);
}

.tournament-info-box {
  background: rgba(13, 6, 23, 0.6);
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid rgba(6, 182, 212, 0.2);
}

.info-item {
  margin-bottom: 0.5rem;
}

.info-label {
  color: #06b6d4;
  font-family: "Orbitron", sans-serif;
  font-weight: 500;
  margin-right: 0.5rem;
}

.info-value {
  color: white;
}

.tournament-status {
  margin-top: 0.75rem;
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-family: "Orbitron", sans-serif;
  font-size: 0.75rem;
}

.tournament-status.finished {
  background-color: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.5);
  color: rgb(252, 165, 165);
}

.tournament-info-empty {
  background: rgba(13, 6, 23, 0.6);
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #9ca3af;
  font-style: italic;
  text-align: center;
}
</style>
