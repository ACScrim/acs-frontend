<template>
  <div
    class="p-8 bg-gray-900/70 border border-purple-500/30 rounded-xl shadow-lg shadow-purple-500/20 backdrop-blur-md relative overflow-hidden"
  >
    <SpaceHeader
      title="STATUT DES CHECK-INS"
      :decorated="true"
      mission="CHECKIN-STATUS-2025"
    >
      <template #badge v-if="selectedTournamentDetails">
        <SpaceBadge variant="secondary" size="lg">
          {{ getCheckedInCount() }}/{{
            selectedTournamentDetails.players.length
          }}
        </SpaceBadge>
      </template>
    </SpaceHeader>
    <!-- Information du tournoi sélectionné -->
    <SpaceCard variant="primary" :stars="true" className="mb-6">
      <template #header>
        <div class="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-space-primary-light"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            />
          </svg>
          <SpaceTitle size="lg">Tournoi sélectionné</SpaceTitle>
        </div>
      </template>

      <!-- Affichage du tournoi -->
      <div v-if="selectedTournamentDetails">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="flex items-center space-x-3">
            <span class="text-space-text-muted text-sm">Nom:</span>
            <span class="text-space-text font-mono">{{
              selectedTournamentDetails.name
            }}</span>
          </div>
          <div
            v-if="selectedTournamentDetails.date"
            class="flex items-center space-x-3"
          >
            <span class="text-space-text-muted text-sm">Date:</span>
            <span class="text-space-text font-mono">
              {{
                new Date(selectedTournamentDetails.date).toLocaleDateString(
                  "fr-FR"
                )
              }}
            </span>
          </div>
        </div>
        <SpaceBadge
          v-if="selectedTournamentDetails.finished"
          variant="error"
          size="md"
        >
          Tournoi terminé
        </SpaceBadge>
      </div>
      <div v-else>
        <SpaceAlert variant="warning" className="text-center">
          Veuillez sélectionner un tournoi dans le menu en haut de la page
        </SpaceAlert>
      </div>
    </SpaceCard>
    <!-- Détails du tournoi et statuts des check-ins -->
    <SpaceCard
      v-if="selectedTournamentDetails"
      variant="secondary"
      :stars="true"
      className="mb-6"
    >
      <template #header>
        <div class="flex flex-col gap-4">
          <SpaceTitle size="xl" :decorated="true">
            {{ selectedTournamentDetails.name }}
          </SpaceTitle>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex flex-col">
              <span class="text-space-text-muted text-sm">Date</span>
              <span class="text-space-text font-mono text-lg">
                {{ new Date(selectedTournamentDetails.date).toLocaleString() }}
              </span>
            </div>
            <div class="flex flex-col">
              <span class="text-space-text-muted text-sm">Joueurs</span>
              <span class="text-space-text font-mono text-lg">
                {{ selectedTournamentDetails.players.length }}
              </span>
            </div>
            <div class="flex flex-col">
              <span class="text-space-text-muted text-sm">Check-ins</span>
              <span class="text-space-text font-mono text-lg">
                {{ getCheckedInCount() }} /
                {{ selectedTournamentDetails.players.length }}
              </span>
            </div>
          </div>
        </div>
      </template>

      <!-- Barre de progression -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-2">
          <span class="text-space-text-muted text-sm"
            >Progression des check-ins</span
          >
          <span class="text-space-primary-light font-mono text-sm">
            {{ getCheckedInPercentage() }}%
          </span>
        </div>
        <div
          class="w-full bg-space-bg-light rounded-full h-3 relative overflow-hidden"
        >
          <div
            class="h-full bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 rounded-full transition-all duration-500 ease-out relative shadow-lg"
            :style="{ width: getCheckedInPercentage() + '%' }"
          >
            <div class="absolute inset-0 bg-white/30 animate-pulse"></div>
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
            ></div>
          </div>
        </div>
        <div class="text-center text-space-accent-light text-sm mt-2 font-mono">
          {{ getCheckedInPercentage() }}% des joueurs ont confirmé leur présence
        </div>
      </div>

      <!-- Grille des joueurs -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SpaceCard
          v-for="player in selectedTournamentDetails.players"
          :key="player._id"
          variant="dark"
          :stars="false"
          :className="`relative transform transition-all hover:scale-105 duration-300 ${
            player._id && selectedTournamentDetails?.checkIns?.[player._id]
              ? 'player-checked-in'
              : ''
          }`"
        >
          <!-- Badge de statut -->
          <div class="absolute top-3 right-3">
            <SpaceBadge
              :variant="
                player._id && selectedTournamentDetails?.checkIns?.[player._id]
                  ? 'success'
                  : 'error'
              "
              size="sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  v-if="
                    player._id &&
                    selectedTournamentDetails?.checkIns?.[player._id]
                  "
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
                <path
                  v-else
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
              {{
                player._id && selectedTournamentDetails?.checkIns?.[player._id]
                  ? "Présent"
                  : "Absent"
              }}
            </SpaceBadge>
          </div>

          <!-- Avatar et informations -->
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
              <div
                class="w-12 h-12 bg-space-bg rounded-full flex items-center justify-center border border-space-primary/30"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-space-primary-light"
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
            </div>

            <div class="flex-1 min-w-0">
              <h3 class="text-space-text font-mono font-semibold truncate mb-2">
                {{ player.username }}
              </h3>

              <!-- Date d'inscription -->
              <div
                v-if="
                  player._id &&
                  selectedTournamentDetails?.registrationDates?.[player._id]
                "
                class="flex items-center gap-2 mb-3 text-xs text-space-text-muted"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3"
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

              <!-- Bouton de check-in -->
              <SpaceButton
                @click="player._id ? togglePlayerCheckIn(player._id) : null"
                :variant="
                  player._id &&
                  selectedTournamentDetails?.checkIns?.[player._id]
                    ? 'error'
                    : 'success'
                "
                size="sm"
                className="w-full"
              >
                {{
                  player._id &&
                  selectedTournamentDetails?.checkIns?.[player._id]
                    ? "Annuler le check-in"
                    : "Marquer présent"
                }}
              </SpaceButton>
            </div>
          </div>
        </SpaceCard>
      </div>

      <template #footer>
        <div class="flex justify-center">
          <SpaceButton
            @click="() => fetchTournamentDetails()"
            variant="primary"
            size="lg"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
            Rafraîchir les statuts
          </SpaceButton>
        </div>
      </template>
    </SpaceCard>
    <!-- États vides ou chargement -->
    <SpaceCard
      v-else-if="selectedTournament && !selectedTournamentDetails"
      variant="dark"
      :stars="true"
      className="text-center py-12"
    >
      <SpaceLoader text="Chargement des informations du tournoi..." />
    </SpaceCard>

    <SpaceCard
      v-else-if="tournaments.length > 0 && !selectedTournament"
      variant="dark"
      :stars="true"
      className="text-center py-12"
    >
      <div class="flex flex-col items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-space-primary-light"
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
        <SpaceTitle size="lg" className="text-space-text-muted">
          Veuillez sélectionner un tournoi pour voir les statuts des check-ins
        </SpaceTitle>
      </div>
    </SpaceCard>

    <SpaceCard
      v-else-if="selectedGame && tournaments.length === 0"
      variant="dark"
      :stars="true"
      className="text-center py-12"
    >
      <div class="flex flex-col items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-space-accent-light"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z"
            clip-rule="evenodd"
          />
        </svg>
        <SpaceTitle size="lg" className="text-space-text-muted">
          Aucun tournoi actif pour ce jeu
        </SpaceTitle>
      </div>
    </SpaceCard>
    <!-- Toast spatial pour les notifications -->
    <Toast v-if="toast.show" :type="toast.type" :message="toast.message" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import gameService from "../../services/gameService";
import tournamentService from "../../services/tournamentService";
import Toast from "../../shared/Toast.vue";
import type { Game, Tournament, Player } from "../../types";

// Accepter les props du parent
const props = defineProps<{
  selectedGame: string;
  selectedTournament: string;
}>();

const games = ref<Game[]>([]);
const tournaments = ref<Tournament[]>([]);

const toast = ref({ show: false, message: "", type: "success" });

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

// Fonction pour basculer le check-in d'un joueur
const togglePlayerCheckIn = async (playerId: string) => {
  if (
    !selectedTournamentDetails.value ||
    !props.selectedTournament ||
    !playerId
  )
    return;

  try {
    const player = selectedTournamentDetails.value.players.find(
      (p) => p._id === playerId
    );
    if (!player || !player.userId) {
      toast.value = {
        show: true,
        message: "Impossible de trouver l'utilisateur associé à ce joueur",
        type: "error",
      };
      setTimeout(() => {
        toast.value.show = false;
      }, 3000);
      return;
    }

    const isCurrentlyCheckedIn =
      selectedTournamentDetails.value.checkIns?.[playerId] || false;

    await tournamentService.checkInPlayer(
      props.selectedTournament,
      player.userId, // Utiliser le userId au lieu du playerId
      !isCurrentlyCheckedIn
    );

    // Mettre à jour les détails du tournoi
    await fetchTournamentDetails(); // Afficher une notification
    toast.value = {
      show: true,
      message: isCurrentlyCheckedIn
        ? "Check-in annulé avec succès"
        : "Joueur marqué comme présent",
      type: "success",
    };

    setTimeout(() => {
      toast.value.show = false;
    }, 4000);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du check-in:", error);
    toast.value = {
      show: true,
      message: "Erreur lors de la mise à jour du check-in",
      type: "error",
    };

    setTimeout(() => {
      toast.value.show = false;
    }, 4000);
  }
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
/* Styles personnalisés pour la barre de progression */
.progress-bar-container {
  position: relative;
  overflow: hidden;
}

.progress-bar-glow {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  width: 100px;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100px);
  }
  100% {
    transform: translateX(calc(100vw + 100px));
  }
}

/* Animation de brillance pour la barre de progression */
@keyframes animate-shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: animate-shimmer 2s infinite;
}

/* Animation d'apparition pour les cartes */
.player-card-enter-active {
  transition: all 0.3s ease-out;
}

.player-card-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* Effet hover pour les cartes de joueurs */
.player-card:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

/* Animation du badge de statut */
.status-badge {
  transition: all 0.3s ease;
}

.status-badge:hover {
  transform: scale(1.05);
}

/* Styles pour les cartes de joueurs avec check-in */
.player-checked-in {
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.1),
    rgba(5, 150, 105, 0.05)
  ) !important;
  border-color: rgba(16, 185, 129, 0.4) !important;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.2) !important;
}

.player-checked-in:hover {
  box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.3) !important;
  border-color: rgba(16, 185, 129, 0.6) !important;
}
</style>
