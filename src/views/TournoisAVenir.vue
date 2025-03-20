<template>
  <div class="container mx-auto p-8 pt-20">
    <h1 class="text-4xl text-white mb-8 neon-text font-audiowide text-center">
      Tournois à venir
    </h1>

    <!-- Filtres -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-black bg-opacity-60 p-6 rounded-lg border border-pink-500 shadow-lg shadow-pink-500/20"
    >
      <div>
        <label for="game" class="block text-lg text-white mb-2 font-orbitron">
          <span class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-pink-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
              />
            </svg>
            Filtrer par jeu
          </span>
        </label>
        <select
          id="game"
          v-model="selectedGame"
          @change="fetchTournaments"
          class="w-full p-3 text-white bg-gray-900 border border-pink-500 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent font-orbitron"
        >
          <option value="">Tous les jeux</option>
          <option v-for="game in games" :key="game._id" :value="game._id">
            {{ game.name }}
          </option>
        </select>
      </div>
      <div class="flex items-center">
        <label class="cyberpunk-checkbox-container">
          <input
            type="checkbox"
            v-model="showFinished"
            @change="fetchTournaments"
            class="hidden"
          />
          <div class="cyberpunk-checkbox flex items-center">
            <div
              class="checkbox-visual relative w-6 h-6 bg-gray-800 border border-pink-500 mr-3"
            >
              <div
                v-if="showFinished"
                class="absolute inset-1 bg-pink-500"
              ></div>
            </div>
            <span class="text-white font-orbitron"
              >Afficher les tournois passés</span
            >
          </div>
        </label>
      </div>
      <!-- Ordre de tri -->
      <div class="flex items-center">
        <label class="cyberpunk-checkbox-container">
          <input type="checkbox" v-model="sortAscending" class="hidden" />
          <div class="cyberpunk-checkbox flex items-center">
            <div
              class="checkbox-visual relative w-6 h-6 bg-gray-800 border border-pink-500 mr-3"
            >
              <div
                v-if="sortAscending"
                class="absolute inset-1 bg-pink-500"
              ></div>
            </div>
            <span class="text-white font-orbitron">
              Ordre chronologique
              <span class="ml-1 text-sm text-gray-400">
                ({{ sortAscending ? "ancien → récent" : "récent → ancien" }})
              </span>
            </span>
          </div>
        </label>
      </div>
    </div>

    <!-- Notifications -->
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />

    <!-- Avertissement connexion -->
    <div
      v-if="!user"
      class="mb-8 p-4 bg-red-900 text-white rounded border border-red-600 shadow-md flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mr-2 text-red-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      Veuillez vous connecter pour pouvoir vous inscrire aux tournois.
    </div>

    <!-- Liste des tournois -->
    <div v-if="filteredTournaments.length > 0">
      <tournament-card
        v-for="tournament in filteredTournaments"
        :key="tournament._id"
        :tournament="tournament"
        :user="user"
        :show-participants="
          tournament._id ? showParticipants[tournament._id] : false
        "
        :show-description="
          tournament._id ? showDescription[tournament._id] : false
        "
        :is-checked-in="
          tournament._id ? checkedInPlayers[tournament._id] : false
        "
        :show-other-rankings="
          tournament._id ? showOtherRankings[tournament._id] : false
        "
        @toggle-tab="toggleTab"
        @open-registration="openRegistrationPopup"
        @check-in="checkIn"
        @toggle-other-rankings="toggleOtherRankings"
      />
    </div>

    <!-- Message pas de tournois -->
    <div
      v-else
      class="flex flex-col items-center justify-center p-12 bg-black bg-opacity-60 rounded-lg border border-pink-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 text-pink-500 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p class="text-white text-center text-xl font-orbitron">
        Pas de tournois trouvés.
      </p>
    </div>

    <!-- Modal de confirmation -->
    <ConfirmationDialog
      v-if="showPopup"
      :title="'Confirmation'"
      :message="`Voulez-vous ${
        actionType === 'register' ? 'vous inscrire' : 'vous désinscrire'
      } au tournoi ${selectedTournament?.name} en tant que ${user?.username} ?`"
      @confirm="confirmAction"
      @cancel="closePopup"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import gameService from "../services/gameService";
import tournamentService from "../services/tournamentService";
import playerService from "../services/playerService";
import { useUserStore } from "../stores/userStore";
import Toast from "@/shared/Toast.vue";
import type { Game, Tournament } from "../types";
import ConfirmationDialog from "@/shared/ConfirmationDialog.vue";
import TournamentCard from "@/components/tournois-a-venir/TournamentCard.vue";

// Regroupement et organisation des états du composant
// SECTION: État du composant
//-------------------------------------------------------

// États globaux
const games = ref<Game[]>([]);
const tournaments = ref<Tournament[]>([]);
const success = ref<string | null>(null);
const error = ref<string | null>(null);

// États de filtrage et d'affichage
const selectedGame = ref<string>("");
const showFinished = ref<boolean>(false);
const sortAscending = ref<boolean>(false);

// États d'interface et d'interaction
const showParticipants = ref<{ [key: string]: boolean }>({});
const showDescription = ref<{ [key: string]: boolean }>({});
const showOtherRankings = ref<{ [key: string]: boolean }>({});
const checkedInPlayers = ref<{ [key: string]: boolean }>({});

// États du modal de confirmation
const showPopup = ref<boolean>(false);
const selectedTournament = ref<Tournament | null>(null);
const actionType = ref<string>("register"); // "register" ou "unregister"

//-------------------------------------------------------
// SECTION: Store et propriétés calculées
//-------------------------------------------------------

// Accès au store utilisateur
const userStore = useUserStore();
const user = computed(() => userStore.user);

/**
 * Filtre et trie les tournois selon les critères sélectionnés
 * - Filtre par jeu sélectionné
 * - Filtre par statut (terminé ou à venir)
 * - Trie par date (ascendant ou descendant)
 */
const filteredTournaments = computed(() => {
  // Appliquer d'abord les filtres pour réduire le nombre d'éléments à trier
  let filtered = tournaments.value;

  // Filtre par jeu si un jeu est sélectionné
  if (selectedGame.value) {
    filtered = filtered.filter((t) => t.game._id === selectedGame.value);
  }

  // Filtre par statut (terminé/à venir)
  if (!showFinished.value) {
    filtered = filtered.filter((t) => !t.finished);
  }

  // Tri chronologique configurable
  const sortMultiplier = sortAscending.value ? 1 : -1;

  return filtered.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return (dateA - dateB) * sortMultiplier;
  });
});

//-------------------------------------------------------
// SECTION: Récupération des données
//-------------------------------------------------------

/**
 * Récupère la liste des tournois depuis l'API
 * et vérifie les check-ins de l'utilisateur
 */
const fetchTournaments = async () => {
  // Réinitialiser les états de check-in
  checkedInPlayers.value = {};

  // Récupérer tous les tournois
  tournaments.value = await tournamentService.getTournaments();

  // Vérifier l'état de check-in du joueur pour chaque tournoi
  if (user.value) {
    const player = await playerService.getPlayerByIdUser(user.value._id);
    if (player && player._id) {
      tournaments.value.forEach((tournament) => {
        if (tournament._id) {
          checkedInPlayers.value[tournament._id] =
            (tournament.checkIns &&
              player._id &&
              tournament.checkIns[player._id]) ||
            false;
        }
      });
    }
  }
};

//-------------------------------------------------------
// SECTION: Gestion des onglets des tournois
//-------------------------------------------------------

/**
 * Gère la bascule entre les différents onglets d'un tournoi
 * @param tournamentId - ID du tournoi
 * @param tab - Nom de l'onglet ('participants' ou 'description')
 */
const toggleTab = (tournamentId: string, tab: string) => {
  if (tab === "participants") {
    showParticipants.value[tournamentId] =
      !showParticipants.value[tournamentId];
    if (showParticipants.value[tournamentId]) {
      showDescription.value[tournamentId] = false;
    }
  } else if (tab === "description") {
    showDescription.value[tournamentId] = !showDescription.value[tournamentId];
    if (showDescription.value[tournamentId]) {
      showParticipants.value[tournamentId] = false;
    }
  }
};

/**
 * Bascule l'affichage des autres classements pour un tournoi
 * @param tournamentId - ID du tournoi
 */
const toggleOtherRankings = (tournamentId: string) => {
  console.log("Toggle Other Rankings appelé pour le tournoi:", tournamentId);

  // Débogage - valeur avant changement
  console.log("État avant toggle:", showOtherRankings.value[tournamentId]);

  // S'assurer que l'objet existe
  if (!showOtherRankings.value) {
    showOtherRankings.value = {};
  }

  // Créer un nouvel objet pour forcer la réactivité
  const updatedState = { ...showOtherRankings.value };
  updatedState[tournamentId] = !updatedState[tournamentId];
  showOtherRankings.value = updatedState;

  // Débogage - valeur après changement
  console.log("État après toggle:", showOtherRankings.value[tournamentId]);
};
//-------------------------------------------------------
// SECTION: Gestion des inscriptions aux tournois
//-------------------------------------------------------

/**
 * Ouvre le popup de confirmation pour l'inscription ou désinscription
 * @param tournament - Objet tournoi
 * @param type - Type d'action ("register" ou "unregister")
 */
const openRegistrationPopup = (tournament: Tournament, type: string) => {
  selectedTournament.value = tournament;
  actionType.value = type;
  showPopup.value = true;
};

/**
 * Ferme le popup de confirmation
 */
const closePopup = () => {
  showPopup.value = false;
  // Réinitialisation différée pour éviter les changements visuels pendant la transition de sortie
  setTimeout(() => {
    selectedTournament.value = null;
    actionType.value = "register";
  }, 300); // Correspondant à la durée de l'animation fadeOut
};

/**
 * Exécute l'action d'inscription ou de désinscription après confirmation
 */
const confirmAction = async () => {
  if (selectedTournament.value && user.value) {
    try {
      if (actionType.value === "register" && selectedTournament.value._id) {
        // Inscription au tournoi
        await tournamentService.registerPlayer(
          selectedTournament.value._id,
          user.value._id
        );
        showMessage("success", "Inscription réussie !");
      } else {
        if (selectedTournament.value._id) {
          // Désinscription du tournoi
          await tournamentService.unregisterPlayer(
            selectedTournament.value._id,
            user.value._id
          );
        }
        showMessage("success", "Désinscription réussie !");
      }
      fetchTournaments();
      closePopup();
    } catch (error) {
      console.error("Erreur lors de l'action:", error);
      showMessage("error", `Erreur lors de l'action.`);
    }
  }
};

/**
 * Change l'état de check-in d'un joueur pour un tournoi avec retour visuel immédiat
 * @param tournamentId - ID du tournoi
 * @param checkedIn - Nouvel état de check-in
 */
const checkIn = async (tournamentId: string, checkedIn: boolean) => {
  // Optimistic UI: mettre à jour l'interface avant que la requête soit terminée
  checkedInPlayers.value[tournamentId] = checkedIn;

  try {
    if (user.value) {
      await tournamentService.checkInPlayer(
        tournamentId,
        user.value._id,
        checkedIn
      );

      showMessage(
        "success",
        checkedIn ? "Check-in confirmé !" : "Check-in annulé."
      );
    }
  } catch (error) {
    // En cas d'erreur, remettre l'état précédent
    checkedInPlayers.value[tournamentId] = !checkedIn;
    console.error("Erreur lors du check-in:", error);
    showMessage(
      "error",
      `Erreur: Impossible de ${
        checkedIn ? "confirmer" : "annuler"
      } le check-in.`
    );
  }
};

//-------------------------------------------------------
// SECTION: Utilitaires et formatage
//-------------------------------------------------------

/**
 * Affiche un message de notification temporaire
 * @param type - Type de message ("success" ou "error")
 * @param message - Contenu du message
 * @param duration - Durée d'affichage en ms (défaut: 3000ms)
 */
const showMessage = (
  type: "success" | "error",
  message: string,
  duration: number = 3000
) => {
  // Réinitialiser tout message précédent
  success.value = null;
  error.value = null;

  // Définir le nouveau message
  if (type === "success") {
    success.value = message;
  } else {
    error.value = message;
  }

  // Auto-effacement après la durée spécifiée
  setTimeout(() => {
    if (type === "success") {
      success.value = null;
    } else {
      error.value = null;
    }
  }, duration);
};

//-------------------------------------------------------
// SECTION: Cycle de vie du composant
//-------------------------------------------------------

/**
 * Initialise les états de check-in pour l'utilisateur connecté
 */
const initializeCheckInStates = async () => {
  checkedInPlayers.value = {};

  if (!user.value) return;

  try {
    const player = await playerService.getPlayerByIdUser(user.value._id);
    if (!player?._id) return;

    tournaments.value.forEach((tournament) => {
      if (tournament._id) {
        checkedInPlayers.value[tournament._id] = !!(
          tournament.checkIns &&
          player._id &&
          tournament.checkIns[player._id]
        );
      }
    });
  } catch (error) {
    console.error("Erreur lors de l'initialisation des check-ins:", error);
  }
};

/**
 * Initialise les états d'interface pour les accordéons et onglets
 */
const initializeUIStates = () => {
  // Initialiser tous les accordéons comme fermés par défaut
  tournaments.value.forEach((tournament) => {
    if (tournament._id) {
      showOtherRankings.value[tournament._id] = false;
      showParticipants.value[tournament._id] = false;
      showDescription.value[tournament._id] = false;
    }
  });
};

/**
 * Initialisation du composant au montage
 */
onMounted(async () => {
  try {
    // Chargement parallèle des jeux et tournois pour plus de rapidité
    const [gamesResult, tournamentsResult] = await Promise.all([
      gameService.getGames(),
      tournamentService.getTournaments(),
    ]);

    games.value = gamesResult;
    tournaments.value = tournamentsResult;

    // Initialisation des états d'interface
    await initializeCheckInStates();
    initializeUIStates();
  } catch (error) {
    console.error("Erreur lors de l'initialisation:", error);
    showMessage("error", "Erreur lors du chargement des données");
  }
});
</script>

<style scoped>
/* Base et layout */
.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Styles pour le checkbox cyberpunk */
.cyberpunk-checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-visual {
  position: relative;
  transition: all 0.2s ease;
  box-shadow: 0 0 2px #ec4899;
}

.cyberpunk-checkbox:hover .checkbox-visual {
  box-shadow: 0 0 8px #ec4899;
}

/* Animation pour le fade in */
.animate__fadeIn {
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
