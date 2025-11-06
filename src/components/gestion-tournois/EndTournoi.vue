<template>
  <div
    class="p-8 bg-gray-900/70 border border-purple-500/30 rounded-xl shadow-lg shadow-purple-500/20 backdrop-blur-md relative overflow-hidden"
  >
    <SpaceHeader
      title="FINALISATION DU TOURNOI"
      :decorated="true"
      mission="END-TOURNAMENT-2025"
    >
      <template #badge v-if="selectedTournamentDetails">
        <SpaceBadge
          :variant="
            selectedTournamentDetails.finished ? 'success' : 'secondary'
          "
          size="lg"
        >
          {{ selectedTournamentDetails.finished ? "Terminé" : "En cours" }}
        </SpaceBadge>
      </template>
    </SpaceHeader>

    <!-- Information du tournoi sélectionné -->
    <Card variant="primary" :stars="true" className="mb-6">
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
          <Title size="lg">Tournoi sélectionné</Title>
        </div>
      </template>

      <!-- Affichage du tournoi ou message si aucun tournoi sélectionné -->
      <div v-if="selectedTournamentDetails">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div class="flex flex-col">
            <span class="text-space-text-muted text-sm">Nom</span>
            <span class="text-space-text font-mono text-lg">
              {{ selectedTournamentDetails.name }}
            </span>
          </div>
          <div v-if="selectedTournamentDetails.date" class="flex flex-col">
            <span class="text-space-text-muted text-sm">Date</span>
            <span class="text-space-text font-mono text-lg">
              {{ formatLocalDate(selectedTournamentDetails.date) }}
            </span>
          </div>
          <div
            v-if="selectedTournamentDetails.discordChannelName"
            class="flex flex-col"
          >
            <span class="text-space-text-muted text-sm">Discord</span>
            <span class="text-space-text font-mono text-lg">
              {{ selectedTournamentDetails.discordChannelName }}
            </span>
          </div>
        </div>
        <SpaceBadge
          v-if="selectedTournamentDetails.finished"
          variant="success"
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
    </Card>

    <!-- Statut du tournoi -->
    <Card
      v-if="selectedTournamentDetails && selectedTournamentDetails.finished"
      variant="accent"
      :stars="true"
      className="mb-6"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <Title size="lg" className="text-green-400">
              Ce tournoi est déjà terminé
            </Title>
          </div>
          <Button
            @click="confirmUnfinishTournament()"
            variant="warning"
            size="md"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
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
            Annuler la finalisation
          </Button>
        </div>
      </template>
    </Card>
    <!-- Affichage des équipes avec possibilité de mettre à jour les classements -->
    <div v-if="teams.length > 0">
      <!-- Bouton pour terminer le tournoi -->
      <SpaceCard
        v-if="
          selectedTournamentDetails &&
          !selectedTournamentDetails.finished &&
          hasRankings()
        "
        variant="accent"
        :stars="true"
        className="mb-6"
      >
        <template #header>
          <div class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-space-accent-light"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <Title size="lg">Finaliser le tournoi</Title>
          </div>
        </template>

        <div
          class="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <p class="text-space-text-muted">
            Une fois le tournoi terminé, les rankings seront verrouillés et les
            résultats comptabilisés dans le classement des joueurs.
          </p>
          <SpaceButton
            @click="confirmFinishTournament()"
            variant="success"
            size="lg"
            className="self-end"
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
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
            Terminer le tournoi
          </SpaceButton>
        </div>
      </SpaceCard>
      <!-- Cards des équipes - Grid layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SpaceCard
          v-for="(team, index) in teams"
          :key="index"
          :variant="getRankingCardVariant(team.ranking)"
          :stars="team.ranking > 0"
          :className="getRankingCardClass(team.ranking)"
        >
          <template #header>
            <div class="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                :class="getRankingTextClass(team.ranking)"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857M19 12a3 3 0 11-6 0 3 3 0 016 0zm-4 8a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <SpaceTitle
                size="lg"
                :className="getRankingTextClass(team.ranking)"
              >
                {{ team.name || `Équipe ${index + 1}` }}
              </SpaceTitle>
            </div>
          </template>

          <!-- Badge de rang si l'équipe est classée -->
          <div v-if="team.ranking > 0" class="mb-4">
            <SpaceBadge
              :variant="getRankingBadgeVariant(team.ranking)"
              size="lg"
            >
              {{ getRankingLabel(team.ranking) }}
            </SpaceBadge>
          </div>

          <!-- Liste des joueurs -->
          <div class="mb-6">
            <SpaceTitle size="sm" className="text-space-text-muted mb-3">
              Membres de l'équipe:
            </SpaceTitle>
            <div class="space-y-2 max-h-40 overflow-y-auto">
              <div
                v-for="player in team.players"
                :key="player._id"
                class="p-3 bg-space-surface-light rounded-lg border flex items-center gap-2"
                :class="getRankingBorderClass(team.ranking, 'opacity-40')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  :class="getRankingTextClass(team.ranking)"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span class="text-space-text text-sm">{{
                  player.username
                }}</span>
              </div>
            </div>
          </div>

          <!-- Rang de l'équipe -->
          <div class="mb-6">
            <SpaceTitle size="sm" className="text-space-text-muted mb-3">
              Position dans le classement:
            </SpaceTitle>
            <div class="flex flex-wrap gap-2">
              <SpaceButton
                v-for="rank in maxRanking"
                :key="rank"
                @click="setRanking(team._id, rank)"
                :variant="
                  team.ranking === rank
                    ? getRankingButtonVariant(rank)
                    : 'ghost'
                "
                size="sm"
                :disabled="selectedTournamentDetails?.finished"
              >
                {{ getRankingLabel(rank) }}
              </SpaceButton>
              <SpaceButton
                @click="setRanking(team._id, 0)"
                :variant="team.ranking === 0 ? 'secondary' : 'ghost'"
                size="sm"
                :disabled="selectedTournamentDetails?.finished"
              >
                Non classé
              </SpaceButton>
            </div>
          </div>
          <!-- Score de l'équipe -->
          <div class="border-t border-space-border pt-4">
            <div class="flex items-center justify-between mb-3">
              <SpaceTitle size="sm" className="text-space-text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-space-accent-light inline mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                Score de l'équipe:
              </SpaceTitle>
              <!-- Badge avec score actuel -->
              <div v-if="team.score > 0">
                <SpaceBadge variant="accent" size="sm">
                  {{ team.score }} pts
                </SpaceBadge>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <SpaceInput
                v-model="teamScores[team._id]"
                type="number"
                min="0"
                className="w-20 text-center"
                :disabled="selectedTournamentDetails?.finished"
              />
              <SpaceButton
                @click="
                  updateScore(team._id, parseInt(teamScores[team._id]) || 0)
                "
                variant="accent"
                size="sm"
                :disabled="selectedTournamentDetails?.finished"
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </template>
                OK
              </SpaceButton>
            </div>
          </div></SpaceCard
        >
      </div>
    </div>

    <!-- Toasts -->
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />
    <!-- Modal de confirmation de fin de tournoi -->
    <Modal
      v-model="showConfirmationDialog"
      title="MISSION: TERMINER TOURNOI"
      className="max-w-lg"
    >
      <template #header>
        <div class="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-space-error"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <Title size="lg" className="text-space-error">
            CONFIRMATION REQUISE
          </Title>
        </div>
      </template>

      <div class="space-y-4">
        <SpaceAlert variant="warning">
          <div class="text-space-text">
            <strong>Attention :</strong> Cette action est irréversible !
          </div>
        </SpaceAlert>

        <div class="text-space-text-muted leading-relaxed">
          Êtes-vous sûr de vouloir terminer ce tournoi ? Les conséquences seront
          :
        </div>

        <div
          class="space-y-2 bg-space-bg-light/20 p-4 rounded-lg border border-space-primary/20"
        >
          <div class="flex items-center gap-2 text-space-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-space-success"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span
              >Les résultats seront comptabilisés dans le classement des
              joueurs</span
            >
          </div>
          <div class="flex items-center gap-2 text-space-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-space-error"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Le rôle Discord du tournoi sera supprimé</span>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <Button
            @click="showConfirmationDialog = false"
            variant="ghost"
            size="md"
          >
            Annuler
          </Button>
          <Button @click="finishTournament" variant="error" size="md">
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
            Terminer le tournoi
          </Button>
        </div>
      </template>
    </Modal>

    <!-- Modal de confirmation d'annulation de finalisation -->
    <Modal
      v-model="showUnfinishConfirmationDialog"
      title="MISSION: ANNULER FINALISATION"
      className="max-w-lg"
    >
      <template #header>
        <div class="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-space-warning"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <Title size="lg" className="text-space-warning">
            ANNULATION FINALISATION
          </Title>
        </div>
      </template>

      <div class="space-y-4">
        <SpaceAlert variant="info">
          <div class="text-space-text">
            Cette action permettra de modifier à nouveau les résultats du
            tournoi.
          </div>
        </SpaceAlert>

        <div class="text-space-text-muted leading-relaxed">
          Êtes-vous sûr de vouloir annuler la finalisation de ce tournoi ?
        </div>

        <div
          class="bg-space-bg-light/20 p-4 rounded-lg border border-space-secondary/20"
        >
          <div class="flex items-center gap-2 text-space-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-space-info"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
            <span
              >Les points attribués aux joueurs seront recalculés lors de la
              prochaine finalisation</span
            >
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <Button
            @click="showUnfinishConfirmationDialog = false"
            variant="ghost"
            size="md"
          >
            Annuler
          </Button>
          <Button @click="unfinishTournament" variant="warning" size="md">
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
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
            Annuler la finalisation
          </Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import gameService from "../../services/gameService";
import tournamentService from "../../services/tournamentService";
import Modal from "@/components/ui/molecules/Modal.vue";
import type { Game, Tournament, Team, Player } from "../../types";
import Toast from "@/shared/Toast.vue";

/**
 * Définir les props et les émissions
 */
const props = defineProps<{
  selectedGame: string;
  selectedTournament: string;
}>();

/**
 * =============================================================
 * ÉTAT DU COMPOSANT
 * =============================================================
 */

/** Liste des jeux disponibles */
const games = ref<Game[]>([]);

/** Liste des tournois pour le jeu sélectionné */
const tournaments = ref<Tournament[]>([]);

/** Détails du tournoi sélectionné */
const selectedTournamentDetails = ref<
  (Tournament & { players: Player[] }) | null
>(null);

/** Liste des équipes du tournoi */
const teams = ref<Team[]>([]);

const teamScores = ref<Record<string, string>>({});

// Variable pour la boîte de dialogue de confirmation d'annulation
const showUnfinishConfirmationDialog = ref(false);

/** Contrôle l'affichage de la boîte de dialogue de confirmation */
const showConfirmationDialog = ref(false);

/** Message d'erreur à afficher */
const error = ref<string | null>(null);

/** Message de succès à afficher */
const success = ref<string | null>(null);

/**
 * =============================================================
 * FONCTIONS DE RÉCUPÉRATION DES DONNÉES
 * =============================================================
 */

/**
 * Récupère la liste de tous les jeux disponibles
 */
const fetchGames = async () => {
  games.value = await gameService.getGames();
};

/**
 * Récupère les tournois pour un jeu sélectionné
 * Appelée quand l'utilisateur change de jeu dans le select
 */
const fetchTournamentsByGame = async (gameId: string) => {
  if (gameId) {
    const allTournaments = await tournamentService.getTournamentsByGame(gameId);
    tournaments.value = allTournaments;
  }
};

/**
 * Récupère les détails complets d'un tournoi sélectionné
 * Appelée quand l'utilisateur sélectionne un tournoi dans le select
 */
const fetchTournamentDetails = async (tournamentId?: string) => {
  const id = tournamentId || props.selectedTournament;
  if (id) {
    selectedTournamentDetails.value = await tournamentService.getTournamentById(
      id
    );
    // Si des équipes existent déjà, les afficher
    if (selectedTournamentDetails.value.teams) {
      teams.value = selectedTournamentDetails.value.teams || [];
      initTeamScores(); // Initialiser les scores
    }
  }
};

// Initialiser les scores pour chaque équipe
const initTeamScores = () => {
  if (teams.value.length > 0) {
    teams.value.forEach((team) => {
      teamScores.value[team._id] = (team.score || 0).toString();
    });
  }
};

/**
 * =============================================================
 * GESTION DU CLASSEMENT DES ÉQUIPES
 * =============================================================
 */

/**
 * Met à jour le classement d'une équipe
 */
const setRanking = async (teamId: string, ranking: number) => {
  // Utiliser props.selectedTournament au lieu de selectedTournament.value
  const tournamentId = props.selectedTournament;

  if (tournamentId) {
    try {
      // Appel à l'API
      await tournamentService.updateTeamRanking(tournamentId, teamId, ranking);

      // Mise à jour immédiate dans l'interface
      const teamToUpdate = teams.value.find((t) => t._id === teamId);
      if (teamToUpdate) {
        teamToUpdate.ranking = ranking;
      }

      showMessage(
        "success",
        `Classement mis à jour : ${getRankingLabel(ranking)}`
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du classement:", error);
      showMessage("error", "Erreur lors de la mise à jour du classement");
    }
  } else {
    showMessage("error", "Aucun tournoi sélectionné");
  }
};

/**
 * Met à jour le score d'une équipe
 */
const updateScore = async (teamId: string, score: number) => {
  // Utiliser props.selectedTournament au lieu de selectedTournament.value
  const tournamentId = props.selectedTournament;

  if (tournamentId) {
    try {
      // Appel à l'API
      await tournamentService.updateTeamScore(tournamentId, teamId, score);

      // Mettre à jour localement
      const teamToUpdate = teams.value.find((t) => t._id === teamId);
      if (teamToUpdate) {
        teamToUpdate.score = score;
        // Mettre à jour le nom dans l'interface avec "Pts" pour correspondre au backend
        const baseName = teamToUpdate.name.replace(/ \(\d+ Pts\)$/, "");
        teamToUpdate.name = `${baseName} (${score} Pts)`;

        // S'assurer que le score reste modifiable dans l'input
        teamScores.value[teamId] = score.toString();
      }

      showMessage("success", `Score de l'équipe mis à jour : ${score} Pts`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du score:", error);
      showMessage("error", "Erreur lors de la mise à jour du score");
    }
  } else {
    showMessage("error", "Aucun tournoi sélectionné");
  }
};

/**
 * Affiche la boîte de dialogue de confirmation avant d'annuler la finalisation du tournoi
 */
const confirmUnfinishTournament = () => {
  showUnfinishConfirmationDialog.value = true;
};

/**
 * Annule la finalisation d'un tournoi
 */
const unfinishTournament = async () => {
  // Utiliser props.selectedTournament au lieu de selectedTournament.value
  const tournamentId = props.selectedTournament;

  if (tournamentId) {
    try {
      // Utiliser la fonction pour annuler la finalisation du tournoi
      await tournamentService.unmarkTournamentAsFinished(tournamentId);

      // Fermer la boîte de dialogue et rafraîchir les détails
      showUnfinishConfirmationDialog.value = false;

      // Rafraîchir les détails du tournoi
      await fetchTournamentDetails();

      showMessage(
        "success",
        "La finalisation du tournoi a été annulée. Vous pouvez maintenant modifier à nouveau les classements."
      );
    } catch (error) {
      console.error("Erreur lors de l'annulation de finalisation:", error);
      showMessage(
        "error",
        "Erreur lors de l'annulation de la finalisation du tournoi"
      );
    }
  } else {
    showMessage("error", "Aucun tournoi sélectionné");
  }
};

/**
 * Calcule le nombre maximum de rangs possibles
 * en fonction du nombre d'équipes dans le tournoi
 */
const maxRanking = computed(() => teams.value.length);

/**
 * Convertit un rang numérique en libellé formaté avec emoji
 *
 * @param rank - Rang de l'équipe (1 pour 1er, 2 pour 2ème, etc.)
 * @returns Libellé formaté avec emoji pour les 3 premiers rangs
 */
const getRankingLabel = (rank: number): string => {
  switch (rank) {
    case 1:
      return "🥇 Or";
    case 2:
      return "🥈 Argent";
    case 3:
      return "🥉 Bronze";
    case 4:
      return "4ème place";
    default:
      return `${rank}ème place`;
  }
};

const getRankingCardVariant = (rank: number): string => {
  switch (rank) {
    case 1:
      return "gold"; // Utilise le variant gold de SpaceCard
    case 2:
      return "silver"; // Utilise le variant silver de SpaceCard
    case 3:
      return "bronze"; // Utilise le variant bronze de SpaceCard
    default:
      return "secondary";
  }
};

const getRankingCardClass = (rank: number): string => {
  // Ajouter des styles supplémentaires pour renforcer l'effet visuel
  switch (rank) {
    case 1:
      return "shadow-space-gold/50 shadow-2xl"; // Ombre dorée plus prononcée
    case 2:
      return "shadow-space-silver/50 shadow-2xl"; // Ombre argentée plus prononcée
    case 3:
      return "shadow-space-bronze/50 shadow-2xl"; // Ombre bronze plus prononcée
    case 4:
      return "shadow-blue-400/30 shadow-lg";
    case 0:
      return "";
    default:
      return "shadow-space-accent/20 shadow-md";
  }
};

const getRankingBadgeVariant = (rank: number): string => {
  switch (rank) {
    case 1:
      return "warning"; // Or - warning donne un effet doré
    case 2:
      return "secondary"; // Argent
    case 3:
      return "accent"; // Bronze/Orange
    default:
      return "primary";
  }
};

const getRankingButtonVariant = (rank: number): string => {
  switch (rank) {
    case 1:
      return "warning"; // Or - plus visible quand sélectionné
    case 2:
      return "secondary"; // Argent - plus visible quand sélectionné
    case 3:
      return "accent"; // Bronze - plus visible quand sélectionné
    default:
      return "primary";
  }
};

const getRankingBorderClass = (
  rank: number,
  opacityClass = "opacity-70"
): string => {
  switch (rank) {
    case 1:
      return `border-space-gold shadow-space-gold/20 ${opacityClass}`;
    case 2:
      return `border-space-silver shadow-space-silver/20 ${opacityClass}`;
    case 3:
      return `border-space-bronze shadow-space-bronze/20 ${opacityClass}`;
    case 4:
      return `border-blue-500 shadow-blue-500/20 ${opacityClass}`;
    case 0:
      return "border-gray-600 shadow-gray-600/20";
    default:
      return `border-purple-500 shadow-purple-500/20 ${opacityClass}`;
  }
};
const getRankingTextClass = (rank: number): string => {
  switch (rank) {
    case 1:
      return "text-space-gold"; // Utilise la couleur or du thème space
    case 2:
      return "text-space-silver"; // Utilise la couleur argent du thème space
    case 3:
      return "text-space-bronze"; // Utilise la couleur bronze du thème space
    case 4:
      return "text-blue-400";
    case 0:
      return "text-white";
    default:
      return "text-purple-400";
  }
};

/**
 * Vérifie si au moins une équipe a un ranking défini
 * Utilisé pour activer/désactiver le bouton "Terminer le tournoi"
 */
const hasRankings = (): boolean => {
  return teams.value.some((team) => team.ranking > 0);
};

/**
 * =============================================================
 * UTILITAIRES ET FORMATAGE
 * =============================================================
 */

/**
 * Formate une date au format local français
 *
 * @param dateString - Date au format ISO ou chaîne de caractères
 * @returns Date formatée selon les conventions françaises
 */
const formatLocalDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * =============================================================
 * GESTION DE LA FIN DU TOURNOI
 * =============================================================
 */

/**
 * Affiche la boîte de dialogue de confirmation avant de terminer le tournoi
 */
const confirmFinishTournament = () => {
  showConfirmationDialog.value = true;
};

/**
 * Termine le tournoi après confirmation
 */
const finishTournament = async () => {
  // Utiliser props.selectedTournament au lieu de selectedTournament.value
  const tournamentId = props.selectedTournament;

  if (tournamentId) {
    try {
      // Utiliser la fonction spécialisée pour marquer le tournoi comme terminé
      await tournamentService.markTournamentAsFinished(tournamentId);

      // Fermer la boîte de dialogue et rafraîchir les détails
      showConfirmationDialog.value = false;

      // Rafraîchir les détails du tournoi
      await fetchTournamentDetails();

      showMessage(
        "success",
        "Tournoi terminé avec succès ! Les équipes classées en 1ère position sont considérées comme gagnantes."
      );
    } catch (error) {
      console.error("Erreur lors de la finalisation du tournoi:", error);
      showMessage("error", "Erreur lors de la finalisation du tournoi");
    }
  } else {
    showMessage("error", "Aucun tournoi sélectionné");
  }
};

/**
 * =============================================================
 * GESTION DES NOTIFICATIONS
 * =============================================================
 */

/**
 * Affiche un message temporaire de succès ou d'erreur
 *
 * @param type - Type de message ('success' ou 'error')
 * @param message - Contenu du message à afficher
 */
const showMessage = (type: "success" | "error", message: string) => {
  if (type === "success") {
    success.value = message;
    error.value = null;
  } else {
    error.value = message;
    success.value = null;
  }
  // Masquer le message après 3 secondes
  setTimeout(() => {
    success.value = null;
    error.value = null;
  }, 3000);
};

/**
 * =============================================================
 * CYCLE DE VIE DU COMPOSANT
 * =============================================================
 */

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
      await fetchTournamentDetails(newValue);
    }
  }
);

/**
 * Récupère les jeux au chargement initial du composant
 */
onMounted(() => {
  fetchGames();

  // Si un jeu est déjà sélectionné depuis les props
  if (props.selectedGame) {
    fetchTournamentsByGame(props.selectedGame);

    // Si un tournoi est déjà sélectionné depuis les props
    if (props.selectedTournament) {
      fetchTournamentDetails(props.selectedTournament);
    }
  }
});
</script>

<style scoped></style>
