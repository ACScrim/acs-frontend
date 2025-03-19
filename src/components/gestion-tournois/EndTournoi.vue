<!-- filepath: d:\Dev\ACS\acs-frontend\src\components\EndTournoi.vue -->
<template>
  <div class="container mx-auto p-4 bg-neon-gradient min-h-screen">
    <!-- Sélection du jeu et du tournoi -->
    <h1 class="text-4xl text-white mb-8 neon-text">Terminer un Tournoi</h1>
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
        <strong>Date:</strong>
        {{ formatLocalDate(selectedTournamentDetails.date) }}
      </p>
      <p class="text-white">
        <strong>Discord Channel:</strong>
        {{ selectedTournamentDetails.discordChannelName }}
      </p>
    </div>

    <!-- Affichage des équipes avec possibilité de mettre à jour les classements -->
    <div v-if="teams.length > 0">
      <h2 class="text-xl font-bold mb-4 text-white">Équipes et Classements</h2>

      <!-- Instructions -->
      <div
        class="mb-6 p-4 bg-gray-900 bg-opacity-70 rounded-lg border border-purple-500"
      >
        <p class="text-white">
          Attribuez un rang à chaque équipe : 1 pour la première place, 2 pour
          la deuxième, etc. Plusieurs équipes peuvent avoir le même rang (ex:
          deux équipes à la 1ère place). Déclarer un vainqueur met fin au
          tournoi et il n'est plus possible de modifier.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(team, index) in teams"
          :key="index"
          :class="[
            'mb-4 p-4 rounded shadow team-card',
            getRankingClass(team.ranking),
          ]"
        >
          <div class="flex items-center mb-2">
            <h3 class="text-xl font-bold text-white">{{ team.name }}</h3>
          </div>
          <ul>
            <li
              v-for="player in team.players"
              :key="player._id"
              class="p-2 bg-gray-700 rounded mb-2 text-white"
            >
              {{ player.username }}
            </li>
          </ul>
          <div class="flex items-center mt-4">
            <div class="w-full bg-gray-800 p-3 rounded-lg">
              <label class="block text-white mb-2"
                >Position dans le classement:</label
              >
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="rank in maxRanking"
                  :key="rank"
                  @click="setRanking(team._id, rank)"
                  :class="[
                    'px-4 py-2 rounded-lg font-bold transition-all',
                    team.ranking === rank
                      ? getRankingButtonActiveClass(rank)
                      : 'bg-gray-700 text-white hover:bg-gray-600',
                  ]"
                  :disabled="!!winningTeamId"
                >
                  {{ getRankingLabel(rank) }}
                </button>
                <button
                  @click="setRanking(team._id, 0)"
                  :class="[
                    'px-4 py-2 rounded-lg font-bold transition-all',
                    team.ranking === 0
                      ? 'bg-gray-500 text-white'
                      : 'bg-gray-700 text-white hover:bg-gray-600',
                  ]"
                  :disabled="!!winningTeamId"
                >
                  Non classé
                </button>
              </div>
            </div>
          </div>
          <button
            v-if="team.ranking === 1"
            @click="confirmFinishTournament(team._id)"
            class="mt-4 px-6 py-3 text-lg font-bold text-white bg-green-500 rounded shadow neon-button hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            :disabled="!!winningTeamId"
          >
            Déclarer Vainqueur
          </button>
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
      :message="'Êtes-vous sûr de vouloir déclarer cette équipe comme gagnante ? Cette action est irréversible.'"
      @confirm="finishTournament"
      @cancel="showConfirmationDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import gameService from "../../services/gameService";
import tournamentService from "../../services/tournamentService";
import ConfirmationDialog from "@/shared/ConfirmationDialog.vue";
import type { Game, Tournament, Team, Player } from "../../types";
import Toast from "@/shared/Toast.vue";

/**
 * =============================================================
 * ÉTAT DU COMPOSANT
 * =============================================================
 */

/** Liste des jeux disponibles */
const games = ref<Game[]>([]);

/** Liste des tournois pour le jeu sélectionné */
const tournaments = ref<Tournament[]>([]);

/** ID du jeu sélectionné */
const selectedGame = ref("");

/** ID du tournoi sélectionné */
const selectedTournament = ref("");

/** Détails du tournoi sélectionné */
const selectedTournamentDetails = ref<
  (Tournament & { players: Player[] }) | null
>(null);

/** Liste des équipes du tournoi */
const teams = ref<Team[]>([]);

/** ID de l'équipe gagnante si le tournoi est terminé */
const winningTeamId = ref<string | null>(null);

/** Contrôle l'affichage de la boîte de dialogue de confirmation */
const showConfirmationDialog = ref(false);

/** ID de l'équipe à désigner comme gagnante */
const teamToFinish = ref<string | null>(null);

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
const fetchTournamentsByGame = async () => {
  if (selectedGame.value) {
    tournaments.value = await tournamentService.getTournamentsByGame(
      selectedGame.value
    );
  }
};

/**
 * Récupère les détails complets d'un tournoi sélectionné
 * Appelée quand l'utilisateur sélectionne un tournoi dans le select
 */
const fetchTournamentDetails = async () => {
  if (selectedTournament.value) {
    selectedTournamentDetails.value = await tournamentService.getTournamentById(
      selectedTournament.value
    );
    // Si des équipes existent déjà, les afficher
    if (selectedTournamentDetails.value.teams) {
      teams.value = selectedTournamentDetails.value.teams || [];
      winningTeamId.value =
        selectedTournamentDetails.value.winningTeam?._id ?? null;
    }
  }
};

/**
 * =============================================================
 * GESTION DU CLASSEMENT DES ÉQUIPES
 * =============================================================
 */

/**
 * Met à jour le classement d'une équipe
 *
 * @param teamId - Identifiant de l'équipe à mettre à jour
 * @param ranking - Nouveau classement à assigner (1 pour premier, etc.)
 */
const setRanking = async (teamId: string, ranking: number) => {
  if (selectedTournament.value) {
    try {
      // Appel à l'API
      await tournamentService.updateTeamRanking(
        selectedTournament.value,
        teamId,
        ranking
      );

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

/**
 * Détermine la classe CSS à appliquer en fonction du classement
 * pour styliser les cartes d'équipe
 *
 * @param rank - Rang de l'équipe
 * @returns Nom de classe CSS pour l'apparence de la carte
 */
const getRankingClass = (rank: number): string => {
  switch (rank) {
    case 1:
      return "gold-team";
    case 2:
      return "silver-team";
    case 3:
      return "bronze-team";
    case 4:
      return "fourth-team";
    default:
      return rank > 0 ? `rank-${rank}-team` : "unranked-team";
  }
};

/**
 * Détermine la classe CSS pour les boutons de classement actifs
 *
 * @param rank - Rang correspondant au bouton
 * @returns Nom de classe CSS pour l'apparence du bouton actif
 */
const getRankingButtonActiveClass = (rank: number): string => {
  switch (rank) {
    case 1:
      return "bg-yellow-500 text-black";
    case 2:
      return "bg-gray-300 text-black";
    case 3:
      return "bg-yellow-700 text-white";
    case 4:
      return "bg-blue-500 text-white";
    default:
      return "bg-purple-500 text-white";
  }
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
 *
 * @param teamId - Identifiant de l'équipe à déclarer gagnante
 */
const confirmFinishTournament = (teamId: string) => {
  teamToFinish.value = teamId;
  showConfirmationDialog.value = true;
};

/**
 * Termine le tournoi en déclarant une équipe gagnante
 * Appelée après confirmation par l'utilisateur
 */
const finishTournament = async () => {
  if (selectedTournament.value && teamToFinish.value) {
    await tournamentService.finishTournament(
      selectedTournament.value,
      teamToFinish.value
    );
    winningTeamId.value = teamToFinish.value;
    showConfirmationDialog.value = false;
    showMessage("success", "Tournoi terminé avec succès !");
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

/**
 * Récupère les jeux au chargement initial du composant
 */
onMounted(() => {
  fetchGames();
});
</script>

<style scoped>
/* Container principal */
.container {
  padding: 2rem;
  background: linear-gradient(
    135deg,
    rgba(13, 6, 23, 0.9) 0%,
    rgba(29, 7, 66, 0.8) 100%
  );
  border-radius: 1rem;
  border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.2);
  backdrop-filter: blur(10px);
}

/* Titre principal avec effet néon */
.neon-text {
  font-family: "Audiowide", cursive;
  color: #ffffff;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff,
    0 0 40px #ff00ff;
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
    text-shadow: 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff,
      0 0 50px #ff00ff;
  }
}

/* Label avec effet néon */
.neon-label {
  font-family: "Orbitron", sans-serif;
  font-weight: 600;
  color: #22d3ee;
  text-shadow: 0 0 5px rgba(34, 211, 238, 0.7);
  margin-bottom: 0.5rem;
  display: block;
  letter-spacing: 1px;
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
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2306b6d4'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.5em;
  box-shadow: 0 0 8px rgba(6, 182, 212, 0.3);
  transition: all 0.3s ease;
}

select:focus {
  outline: none;
  border-color: #06b6d4;
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.5);
}

/* Grille des équipes */
.grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* Carte d'équipe */
.team-card {
  position: relative;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: rgba(31, 41, 55, 0.7);
  border: 2px solid rgba(139, 92, 246, 0.5);
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.4),
    inset 0 0 10px rgba(139, 92, 246, 0.2);
  transition: all 0.3s ease;
  overflow: hidden;
}

.team-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #ec4899, #8b5cf6);
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.5),
    inset 0 0 15px rgba(236, 72, 153, 0.3);
}

/* Styles spécifiques aux équipes selon leur classement */
.gold-team {
  background: linear-gradient(
    135deg,
    rgba(234, 179, 8, 0.2),
    rgba(161, 98, 7, 0.3)
  );
  border: 2px solid rgba(234, 179, 8, 0.7);
  box-shadow: 0 0 20px rgba(234, 179, 8, 0.6);
}
.gold-team::before {
  background: linear-gradient(90deg, #eab308, #ca8a04);
}

.silver-team {
  background: linear-gradient(
    135deg,
    rgba(203, 213, 225, 0.2),
    rgba(148, 163, 184, 0.3)
  );
  border: 2px solid rgba(203, 213, 225, 0.7);
  box-shadow: 0 0 20px rgba(203, 213, 225, 0.6);
}
.silver-team::before {
  background: linear-gradient(90deg, #cbd5e1, #94a3b8);
}

.bronze-team {
  background: linear-gradient(
    135deg,
    rgba(180, 83, 9, 0.2),
    rgba(146, 64, 14, 0.3)
  );
  border: 2px solid rgba(180, 83, 9, 0.7);
  box-shadow: 0 0 20px rgba(180, 83, 9, 0.6);
}
.bronze-team::before {
  background: linear-gradient(90deg, #b45309, #92400e);
}

.fourth-team {
  background: linear-gradient(
    135deg,
    rgba(37, 99, 235, 0.2),
    rgba(29, 78, 216, 0.3)
  );
  border: 2px solid rgba(37, 99, 235, 0.7);
  box-shadow: 0 0 20px rgba(37, 99, 235, 0.6);
}
.fourth-team::before {
  background: linear-gradient(90deg, #2563eb, #1d4ed8);
}

.unranked-team {
  background: linear-gradient(
    135deg,
    rgba(31, 41, 55, 0.2),
    rgba(17, 24, 39, 0.3)
  );
  border: 2px solid rgba(75, 85, 99, 0.7);
  box-shadow: 0 0 10px rgba(75, 85, 99, 0.4);
}
.unranked-team::before {
  background: linear-gradient(90deg, #4b5563, #374151);
}

/* Ajouter des styles pour les équipes au-delà du 4ème rang */
[class*="rank-"] {
  background: linear-gradient(
    135deg,
    rgba(109, 40, 217, 0.2),
    rgba(79, 70, 229, 0.3)
  );
  border: 2px solid rgba(109, 40, 217, 0.7);
  box-shadow: 0 0 20px rgba(109, 40, 217, 0.4);
}

[class*="rank-"]::before {
  background: linear-gradient(90deg, #6d28d9, #4f46e5);
}

/* Liste de joueurs */
ul {
  list-style-type: none;
  padding: 0;
  margin: 1rem 0;
}

li {
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  background-color: rgba(55, 65, 81, 0.8);
  border-radius: 0.375rem;
  font-family: "Orbitron", sans-serif;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  border: 1px solid rgba(139, 92, 246, 0.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

li:hover {
  background-color: rgba(75, 85, 99, 0.8);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 0 8px rgba(139, 92, 246, 0.3);
}

li::before {
  content: "▶";
  color: #a78bfa;
  margin-right: 0.5rem;
  font-size: 0.75rem;
}

/* Boutons */
button {
  font-family: "Orbitron", sans-serif;
  font-weight: 600;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

/* Bouton de mise à jour */
.bg-blue-500 {
  background: linear-gradient(45deg, #2563eb, #3b82f6);
  color: white;
  border: 1px solid rgba(59, 130, 246, 0.5);
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
}

.bg-blue-500:hover {
  background: linear-gradient(45deg, #3b82f6, #60a5fa);
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
  transform: translateY(-2px);
}

.bg-blue-500:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Bouton déclarer vainqueur */
.bg-green-500 {
  background: linear-gradient(45deg, #10b981, #34d399);
  color: white;
  border: 1px solid rgba(16, 185, 129, 0.5);
  border-radius: 0.375rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);
  width: 100%;
  margin-top: 1rem;
  text-transform: uppercase;
}

.bg-green-500:hover {
  background: linear-gradient(45deg, #34d399, #6ee7b7);
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.6);
  transform: translateY(-2px);
}

.bg-green-500:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Effet de brillance qui balaie le bouton */
button::before {
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

button:hover::before {
  left: 100%;
}
</style>
