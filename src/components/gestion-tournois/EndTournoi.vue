<template>
  <div
    class="p-8 bg-gray-900/70 border border-purple-500/30 rounded-xl shadow-lg shadow-purple-500/20 backdrop-blur-md relative overflow-hidden"
  >
    <!-- Sélection du jeu et du tournoi - inchangé -->
    <h1 class="text-4xl text-white mb-8 neon-text">Terminer un Tournoi</h1>

    <!-- Sélection du jeu et du tournoi -->
    <div
      class="mb-8 p-6 bg-gray-800/70 rounded-xl border border-cyan-500/30 shadow-md shadow-cyan-500/20"
    >
      <div class="flex items-center gap-3 mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-cyan-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clip-rule="evenodd"
          />
        </svg>
        <h2 class="font-['Orbitron'] font-semibold text-lg text-cyan-400">
          Tournoi sélectionné
        </h2>
      </div>

      <!-- Affichage du tournoi ou message si aucun tournoi sélectionné -->
      <div
        v-if="selectedTournamentDetails"
        class="bg-gray-900/60 p-4 rounded-lg border border-cyan-500/30"
      >
        <p class="text-white mb-2">
          <span class="text-cyan-400 font-['Orbitron'] font-semibold"
            >Nom:</span
          >
          {{ selectedTournamentDetails.name }}
        </p>
        <p class="text-white mb-2" v-if="selectedTournamentDetails.date">
          <span class="text-cyan-400 font-['Orbitron'] font-semibold"
            >Date:</span
          >
          {{ formatLocalDate(selectedTournamentDetails.date) }}
        </p>
        <p
          v-if="selectedTournamentDetails.discordChannelName"
          class="text-white"
        >
          <span class="text-cyan-400 font-['Orbitron'] font-semibold"
            >Discord:</span
          >
          {{ selectedTournamentDetails.discordChannelName }}
        </p>
        <p
          v-if="selectedTournamentDetails.finished"
          class="mt-2 text-sm px-3 py-1 bg-emerald-900/20 border border-emerald-500/50 rounded-full inline-block text-emerald-300"
        >
          <span class="font-['Orbitron']">Tournoi terminé</span>
        </p>
      </div>
      <div
        v-else
        class="bg-gray-900/60 p-4 rounded-lg border border-red-500/30 text-gray-400 italic"
      >
        Veuillez sélectionner un tournoi dans le menu en haut de la page
      </div>
    </div>

    <!-- Détails du tournoi -->
    <div v-if="selectedTournamentDetails">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <!-- Statut du tournoi -->
        <div
          v-if="selectedTournamentDetails.finished"
          class="p-4 bg-emerald-500/20 border border-emerald-500 rounded-lg shadow-md shadow-emerald-500/20"
        >
          <div
            class="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2"
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
              <span class="font-['Orbitron'] font-semibold text-emerald-300">
                Ce tournoi est déjà terminé
              </span>
            </div>

            <button
              @click="confirmUnfinishTournament()"
              class="cyberpunk-btn-amber flex items-center justify-center py-2 px-4 font-['Orbitron'] text-sm rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1.5 relative z-10"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="relative z-10">Annuler la finalisation</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Affichage des équipes avec possibilité de mettre à jour les classements -->
    <div v-if="teams.length > 0">
      <!-- Bouton pour terminer le tournoi -->
      <div
        v-if="
          selectedTournamentDetails &&
          !selectedTournamentDetails.finished &&
          hasRankings()
        "
        class="mb-6 p-6 bg-gray-900/70 rounded-lg border border-purple-500/30 shadow-lg shadow-purple-500/20"
      >
        <div
          class="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h3
              class="text-lg font-['Orbitron'] font-bold text-purple-400 mb-2"
            >
              Finaliser le tournoi
            </h3>
            <p class="text-white/70 text-sm">
              Une fois le tournoi terminé, les rankings seront verrouillés et
              les résultats comptabilisés dans le classement des joueurs.
            </p>
          </div>
          <button
            @click="confirmFinishTournament()"
            class="cyberpunk-btn-green flex items-center justify-center py-3 px-6 font-['Orbitron'] font-semibold rounded-lg self-end"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 relative z-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="relative z-10">Terminer le tournoi</span>
          </button>
        </div>
      </div>

      <!-- Cards des équipes - Grid layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(team, index) in teams"
          :key="index"
          :class="[
            'p-6 bg-gray-800/70 rounded-xl border shadow-md transition-all duration-300',
            getRankingBorderClass(team.ranking),
          ]"
        >
          <div
            class="flex items-center mb-4 pb-2 border-b border-opacity-30"
            :class="getRankingBorderBottomClass(team.ranking)"
          >
            <h3
              class="text-xl font-['Orbitron'] font-semibold"
              :class="getRankingTextClass(team.ranking)"
            >
              {{ team.name || `Équipe ${index + 1}` }}
            </h3>
          </div>

          <!-- Liste des joueurs -->
          <div class="mb-4">
            <h4 class="text-sm font-['Orbitron'] text-white/70 mb-2">
              Membres de l'équipe:
            </h4>
            <ul class="space-y-2 max-h-40 overflow-y-auto pr-2">
              <li
                v-for="player in team.players"
                :key="player._id"
                class="p-3 bg-gray-900/80 text-white border rounded-lg font-['Orbitron'] text-sm flex items-center gap-2"
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
                {{ player.username }}
              </li>
            </ul>
          </div>

          <!-- Rang de l'équipe -->
          <div class="mt-4">
            <label class="block text-white/80 font-['Orbitron'] text-sm mb-2"
              >Position dans le classement:</label
            >
            <div class="flex flex-wrap gap-2">
              <button
                v-for="rank in maxRanking"
                :key="rank"
                @click="setRanking(team._id, rank)"
                :class="[
                  'cyberpunk-btn px-4 py-2 rounded-lg font-bold transition-all text-sm relative z-10',
                  getRankingButtonClass(rank, team.ranking === rank),
                ]"
                :disabled="selectedTournamentDetails?.finished"
              >
                {{ getRankingLabel(rank) }}
              </button>
              <button
                @click="setRanking(team._id, 0)"
                :class="[
                  'px-4 py-2 rounded-lg font-bold transition-all text-sm',
                  team.ranking === 0
                    ? 'bg-gray-500/90 text-white'
                    : 'bg-gray-700/70 text-white hover:bg-gray-600/90',
                ]"
                :disabled="selectedTournamentDetails?.finished"
              >
                Non classé
              </button>
            </div>
          </div>
          <div class="mt-6 border-t border-emerald-500/30 pt-4">
            <label
              class="flex items-center gap-2 text-white/80 font-['Orbitron'] text-sm mb-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-emerald-400"
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
            </label>

            <!-- Remplacer la section problématique par celle-ci -->
            <div class="relative">
              <!-- Badge indiquant le score actuel (au-dessus de l'input au lieu d'être superposé) -->

              <div class="flex items-center">
                <input
                  v-model.number="teamScores[team._id]"
                  type="number"
                  min="0"
                  :class="[
                    'w-20 bg-gray-900/80 border rounded-l-lg px-3 py-2 text-white text-center font-bold',
                    team.score > 0
                      ? 'border-emerald-500/70' // Supprimé le pl-24 qui décalait le texte
                      : 'border-emerald-500/40',
                    !selectedTournamentDetails?.finished
                      ? 'focus:outline-none focus:ring-1 focus:ring-emerald-500'
                      : '',
                  ]"
                  :disabled="selectedTournamentDetails?.finished"
                />
                <button
                  @click="updateScore(team._id, teamScores[team._id])"
                  class="cyberpunk-btn-emerald h-[38px] px-3 rounded-r-lg relative overflow-hidden border-l-0 flex items-center"
                  :disabled="selectedTournamentDetails?.finished"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 relative z-10"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="relative z-10 text-xs font-['Orbitron'] ml-1"
                    >OK</span
                  >
                </button>
              </div>

              <!-- Badge avec score actuel en haut à droite (conservé pour l'aspect visuel) -->
              <div
                v-if="team.score > 0"
                class="absolute right-0 -top-3 bg-emerald-900/80 text-emerald-400 px-2 py-0.5 text-xs font-bold rounded border border-emerald-500 shadow-sm shadow-emerald-500/50"
              >
                {{ team.score }} pts
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toasts -->
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />

    <!-- Confirmation Dialog -->
    <ConfirmationDialog
      v-if="showConfirmationDialog"
      :title="'Confirmer la fin du tournoi'"
      :message="'Êtes-vous sûr de vouloir terminer ce tournoi ? Les résultats seront comptabilisés dans le classement des joueurs. Le rôle sera supprimé du discord.'"
      @confirm="finishTournament"
      @cancel="showConfirmationDialog = false"
    />
    <!-- Confirmation Dialog pour annuler la finalisation -->
    <ConfirmationDialog
      v-if="showUnfinishConfirmationDialog"
      title="Confirmer l'annulation de la finalisation"
      message="Êtes-vous sûr de vouloir annuler la finalisation de ce tournoi ? Les points attribués aux joueurs seront recalculés lors de la prochaine finalisation."
      @confirm="unfinishTournament"
      @cancel="showUnfinishConfirmationDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import gameService from "../../services/gameService";
import tournamentService from "../../services/tournamentService";
import ConfirmationDialog from "@/shared/ConfirmationDialog.vue";
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

const teamScores = ref<Record<string, number>>({});

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
      teamScores.value[team._id] = team.score || 0;
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
        teamScores.value[teamId] = score;
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

const getRankingBorderBottomClass = (rank: number): string => {
  switch (rank) {
    case 1:
      return "border-space-gold";
    case 2:
      return "border-space-silver";
    case 3:
      return "border-space-bronze";
    case 4:
      return "border-blue-500";
    case 0:
      return "border-gray-600";
    default:
      return "border-purple-500";
  }
};

const getRankingTextClass = (rank: number): string => {
  switch (rank) {
    case 1:
      return "text-space-gold";
    case 2:
      return "text-space-silver";
    case 3:
      return "text-space-bronze";
    case 4:
      return "text-blue-500";
    case 0:
      return "text-white";
    default:
      return "text-purple-500";
  }
};

/**
 * Détermine la classe CSS pour les boutons de classement
 */
const getRankingButtonClass = (rank: number, isActive: boolean): string => {
  if (!isActive) return "bg-gray-700/70 text-white hover:bg-gray-600/90";

  switch (rank) {
    case 1:
      return "cyberpunk-btn-gold"; // À ajouter dans votre CSS
    case 2:
      return "cyberpunk-btn-silver"; // À ajouter dans votre CSS
    case 3:
      return "cyberpunk-btn-bronze"; // À ajouter dans votre CSS
    case 4:
      return "cyberpunk-btn-blue";
    default:
      return "cyberpunk-btn-purple";
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
