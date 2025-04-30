<template>
  <div class="container mx-auto p-4 sm:p-8 pt-16 sm:pt-24">
    <h1
      class="text-3xl sm:text-4xl text-white mb-6 sm:mb-8 neon-text font-audiowide text-center"
    >
      Tournois à venir
    </h1>

    <!-- Filtres -->
    <div
      class="cyberpunk-panel-purple bg-black/75 backdrop-blur-sm rounded-lg border border-pink-500/70 shadow-lg shadow-pink-500/30 p-3 sm:p-6 mb-4 sm:mb-8"
    >
      <!-- Sélecteur de jeux -->
      <div class="mb-4 sm:mb-6">
        <label
          for="game"
          class="relative flex items-center gap-1 sm:gap-2 font-orbitron text-sm sm:text-base text-pink-400 mb-2 sm:mb-3 cyberpunk-label-pink"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
            />
          </svg>
          <span class="text-xs sm:text-base tracking-wider"
            >FILTRER PAR JEU</span
          >
          <div
            class="h-px flex-grow bg-gradient-to-r from-pink-500 to-transparent mx-2 opacity-70 hidden sm:block"
          ></div>
        </label>
        <div class="relative group">
          <select
            id="game"
            v-model="selectedGame"
            @change="fetchTournaments"
            class="cyberpunk-select-pink w-full p-2 sm:p-2.5 text-xs sm:text-sm text-pink-300 bg-gray-900/80 border-2 border-pink-500/70 rounded-md font-orbitron focus:outline-none focus:border-pink-400 transition-all appearance-none cursor-pointer"
          >
            <option value="">Tous les jeux</option>
            <option v-for="game in games" :key="game._id" :value="game._id">
              {{ game.name }}
            </option>
          </select>

          <!-- Effet de contour néon sur hover -->
          <div
            class="cyberpunk-select-glow-pink absolute inset-0 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          ></div>

          <!-- Icône personnalisée -->
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-pink-400 cyberpunk-icon-pink"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Options de filtrage -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <!-- Option 1: Afficher les tournois passés -->
        <div class="cyberpunk-toggle-container">
          <label class="cyberpunk-toggle">
            <input
              type="checkbox"
              v-model="showFinished"
              @change="fetchTournaments"
              class="hidden"
            />
            <div class="cyberpunk-toggle-slider">
              <div class="cyberpunk-toggle-knob">
                <div class="cyberpunk-toggle-knob-highlight"></div>
              </div>
            </div>
            <span
              class="cyberpunk-toggle-label font-orbitron text-white text-xs sm:text-sm ml-2 sm:ml-3"
            >
              Afficher uniquement les tournois terminés
            </span>
          </label>
        </div>

        <!-- Option 2: Ordre chronologique -->
        <div class="cyberpunk-toggle-container">
          <label class="cyberpunk-toggle">
            <input type="checkbox" v-model="sortAscending" class="hidden" />
            <div class="cyberpunk-toggle-slider">
              <div class="cyberpunk-toggle-knob">
                <div class="cyberpunk-toggle-knob-highlight"></div>
              </div>
            </div>
            <span class="cyberpunk-toggle-label font-orbitron text-white ml-3">
              Ordre chronologique
              <span class="text-xs text-gray-400 ml-1">
                ({{ sortAscending ? "ancien → nouveau" : "nouveau → ancien" }})
              </span>
            </span>
          </label>
        </div>
      </div>
    </div>
    <!-- Notifications -->
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />

    <!-- Remplacer l'avertissement de connexion actuel par celui-ci -->
    <!-- Message d'authentification avec design responsive amélioré -->
    <div
      v-if="!user"
      class="mb-4 sm:mb-8 cyberpunk-alert-container overflow-hidden"
    >
      <div
        class="cyberpunk-alert flex flex-col sm:flex-row items-start sm:items-center"
      >
        <!-- Partie supérieure (visible sur mobile) avec icône et texte -->
        <div class="flex items-center w-full sm:w-auto mb-3 sm:mb-0">
          <div class="alert-icon-container flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="alert-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="alert-content ml-3">
            <span class="font-audiowide text-sm sm:text-base">
              ACCÈS RESTREINT
            </span>
            <span class="font-orbitron text-xs sm:text-sm opacity-80">
              Authentification requise pour l'inscription aux tournois
            </span>
          </div>
        </div>

        <!-- Bouton de connexion Discord (pleine largeur sur mobile) -->
        <button
          @click="loginWithDiscord"
          class="cyberpunk-btn-sm flex items-center justify-center w-full sm:w-auto sm:ml-auto mt-2 sm:mt-0"
          aria-label="Se connecter"
        >
          <span class="btn-text">CONNEXION</span>
          <span class="btn-glitch"></span>
        </button>
      </div>
    </div>

    <!-- Affichage du loader pendant le chargement -->
    <div v-if="isLoading" class="my-8 sm:my-12">
      <CyberpunkLoader />
    </div>

    <!-- Liste des tournois -->
    <div v-if="filteredTournaments.length > 0">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
      >
        <tournament-grid-card
          v-for="tournament in paginatedTournaments"
          :key="tournament._id"
          :tournament="tournament"
          :user="user"
          :is-checked-in="
            tournament._id ? checkedInPlayers[tournament._id] : false
          "
          :current-player-id="currentPlayerId"
          @open-registration="openRegistrationPopup"
          @check-in="checkIn"
          @show-level-prompt="showLevelPromptModal"
        />
      </div>

      <!-- Pagination (inchangée) -->
      <CyberpunkPagination
        v-if="filteredTournaments.length > itemsPerPage"
        class="mt-6 sm:mt-8"
        :current-page="currentPage"
        :total-pages="totalPages"
        prev-label="&laquo; Précédent"
        next-label="Suivant &raquo;"
        color="pink"
        :show-dots="totalPages > 5"
        @prev-page="prevPage"
        @next-page="nextPage"
        @page-select="goToPage"
      />
    </div>

    <!-- Ajout du composant LevelPromptModal à la fin du template -->
    <LevelPromptModal
      :show="showLevelPrompt"
      :game-name="levelPromptGameName"
      @confirm="goToLevelDefinition"
      @close="closeLevelPrompt"
      @register-without-level="registerWithoutLevel"
    />

    <!-- Message pas de tournois -->
    <CyberTerminal
      v-if="filteredTournaments.length === 0"
      command="list_tournaments --all"
      errorCode="404_NO_TOURNAMENTS"
      message="Aucun tournoi n'a été trouvé."
    />

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
import { ref, computed, onMounted, watch } from "vue";
import gameService from "../services/gameService";
import { useUserStore } from "../stores/userStore";
import Toast from "@/shared/Toast.vue";
import type { Game, Tournament } from "../types";
import ConfirmationDialog from "@/shared/ConfirmationDialog.vue";
import TournamentGridCard from "@/components/tournois-a-venir/TournamentGridCard.vue";
import CyberpunkLoader from "@/shared/CyberpunkLoader.vue";
import CyberpunkPagination from "../shared/CyberpunkPagination.vue";
import CyberTerminal from "@/shared/CyberTerminal.vue";
import playerService from "../services/playerService";
import LevelPromptModal from "@/shared/LevelPromptModal.vue"; // Ajoutez cet import
import { useRouter, useRoute } from "vue-router"; // Ajoutez cet import

// Regroupement et organisation des états du composant
// SECTION: État du composant
//-------------------------------------------------------
// États pour la modale de niveau de jeu
const showLevelPrompt = ref(false);
const levelPromptGameId = ref("");
const levelPromptGameName = ref("");
const levelPromptTournamentId = ref("");
const router = useRouter();
const route = useRoute();

// États globaux
const games = ref<Game[]>([]);
const success = ref<string | null>(null);
const error = ref<string | null>(null);
const isLoading = ref<boolean>(false); // Nouvel état pour le chargement
const currentPlayerId = computed(() => userStore.playerId);

// États de filtrage et d'affichage
const selectedGame = ref<string>("");
const showFinished = ref<boolean>(false);
const sortAscending = ref<boolean>(true);

// États d'interface et d'interaction
const checkedInPlayers = ref<{ [key: string]: boolean }>({});

// États du modal de confirmation
const showPopup = ref<boolean>(false);
const selectedTournament = ref<Tournament | null>(null);
const actionType = ref<string>("register"); // "register" ou "unregister"

// États de pagination
const currentPage = ref<number>(1);
const itemsPerPage = ref<number>(6); // Nombre de tournois par page

import tournamentService from "../services/tournamentService";
const tournaments = ref<Tournament[]>([]);

//-------------------------------------------------------
// SECTION: Store et propriétés calculées
//-------------------------------------------------------

// Accès au store utilisateur
const userStore = useUserStore();
const user = computed(() => userStore.user);

/**
 * Récupère tous les tournois et applique les filtres
 */
const filteredTournaments = computed(() => {
  // Utiliser les tournois stockés localement au lieu du store
  let filtered = tournaments.value;

  // Filtre par jeu si un jeu est sélectionné
  if (selectedGame.value) {
    filtered = filtered.filter((t) => t.game._id === selectedGame.value);
  }

  // Filtre par statut (terminé/à venir)
  if (showFinished.value) {
    // Si la case est cochée, afficher UNIQUEMENT les tournois terminés
    filtered = filtered.filter((t) => t.finished === true);
  } else {
    // Sinon, afficher UNIQUEMENT les tournois à venir (non terminés)
    filtered = filtered.filter((t) => t.finished !== true);
  }

  // Tri chronologique configurable
  const sortMultiplier = sortAscending.value ? 1 : -1;

  return filtered.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return (dateA - dateB) * sortMultiplier;
  });
});

/**
 * Vérifie si un tournoi est plein (cap atteint)
 */
const isTournamentFull = (tournament: Tournament) => {
  return (
    tournament.playerCap > 0 &&
    tournament.players.length >= tournament.playerCap
  );
};

/**
 * Vérifie si l'utilisateur est en liste d'attente pour un tournoi donné
 */
const isUserInWaitlist = (tournament: Tournament) => {
  if (!userStore.playerId || !tournament.waitlistPlayers) return false;

  return tournament.waitlistPlayers.some((waitlistId) => {
    if (typeof waitlistId === "object") {
      return waitlistId._id === userStore.playerId;
    } else {
      return waitlistId === userStore.playerId;
    }
  });
};
//-------------------------------------------------------
// SECTION: Récupération des données
//-------------------------------------------------------

/**
 * Récupère les tournois directement depuis le service sans mise en cache
 */
const fetchTournaments = async () => {
  isLoading.value = true;
  try {
    // Appel direct au service sans passer par le store
    tournaments.value = await tournamentService.getTournaments();

    // Vérifier les check-ins si un utilisateur est connecté
    if (user.value) {
      await checkUserCheckIns(user.value._id);
    }
  } catch (error) {
    console.error("Erreur lors du chargement des tournois:", error);
  } finally {
    isLoading.value = false;
  }
};

/**
 * Vérifie les check-ins d'un utilisateur
 */
const checkUserCheckIns = async (userId: string) => {
  try {
    // Ici, nous pouvons utiliser directement userStore.playerId
    // si nous sommes sûrs qu'il est déjà chargé
    const playerId = userStore.playerId;

    if (playerId) {
      tournaments.value.forEach((tournament) => {
        if (tournament._id) {
          checkedInPlayers.value[tournament._id] =
            (tournament.checkIns && tournament.checkIns[playerId]) || false;
        }
      });
    } else {
      // Fallback au cas où le playerId n'est pas encore disponible dans le store
      const player = await playerService.getPlayerByIdUser(userId);
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
  } catch (err) {
    console.error("Erreur lors de la vérification des check-ins:", err);
  }
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

  // Déterminer le type d'action en fonction de l'état du joueur
  if (type === "register") {
    // Si le tournoi est plein et l'utilisateur n'est pas déjà en liste d'attente, proposer la liste d'attente
    if (isTournamentFull(tournament) && !isUserInWaitlist(tournament)) {
      actionType.value = "waitlist";
    } else {
      actionType.value = "register";
    }
  } else if (type === "unregister") {
    // Si l'utilisateur est en liste d'attente, c'est une désinscription de la liste d'attente
    if (isUserInWaitlist(tournament)) {
      actionType.value = "unregister-waitlist";
    } else {
      actionType.value = "unregister";
    }
  } else {
    // Cas explicites pour waitlist et unregister-waitlist
    actionType.value = type;
  }

  showPopup.value = true;
};

/**
 * Déclenche le processus d'authentification Discord
 * Redirige l'utilisateur vers l'autorisation OAuth2 de Discord
 */
const loginWithDiscord = () => {
  try {
    // Récupération des variables d'environnement pour OAuth2
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_DISCORD_REDIRECT_URI;

    // Vérification de la configuration
    if (!clientId || !redirectUri) {
      error.value = "Configuration Discord manquante";
      return;
    }

    // Redirection vers la page d'autorisation Discord
    window.location.href = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=identify+guilds+email`;
  } catch (err) {
    // Gestion des erreurs d'authentification
    error.value = "Impossible de se connecter à Discord. Veuillez réessayer.";
    console.error("Erreur d'authentification Discord:", err);
  }
};

/**
 * Affiche la modale pour définir le niveau de jeu
 */
const showLevelPromptModal = (game: Game, tournamentId: string) => {
  levelPromptGameId.value = game._id || "";
  levelPromptGameName.value = game.name;
  levelPromptTournamentId.value = tournamentId;
  showLevelPrompt.value = true;
};
/**
 * Redirige vers la page de définition de niveau avec inscription automatique
 */
const goToLevelDefinition = () => {
  router.push({
    path: "/player-level",
    query: {
      gameId: levelPromptGameId.value,
      redirect: route.fullPath,
      tournamentId: levelPromptTournamentId.value,
      autoRegister: "true", // Important: ceci doit être une chaîne, pas un boolean
    },
  });
};

/**
 * Ferme la popup de définition de niveau
 */
const closeLevelPrompt = () => {
  showLevelPrompt.value = false;
  levelPromptGameId.value = "";
  levelPromptGameName.value = "";
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
      let success = false;

      if (
        (actionType.value === "register" || actionType.value === "waitlist") &&
        selectedTournament.value._id
      ) {
        // Même endpoint pour l'inscription normale et la liste d'attente
        await tournamentService.registerPlayer(
          selectedTournament.value._id,
          user.value._id
        );
        success = true;

        if (success) {
          showMessage(
            "success",
            actionType.value === "register"
              ? "Inscription réussie ! N'oublie pas de venir te check-in 24h avant le tournoi."
              : "Vous avez été ajouté à la liste d'attente. Vous serez automatiquement inscrit si des places se libèrent."
          );
        }
      } else if (
        (actionType.value === "unregister" ||
          actionType.value === "unregister-waitlist") &&
        selectedTournament.value._id
      ) {
        // Même endpoint pour la désinscription normale et de la liste d'attente
        await tournamentService.unregisterPlayer(
          selectedTournament.value._id,
          user.value._id
        );
        success = true;

        if (success) {
          showMessage(
            "success",
            actionType.value === "unregister"
              ? "Désinscription réussie ! Triste de te voir partir :("
              : "Vous avez été retiré de la liste d'attente."
          );
        }
      }

      // Recharger les données pour voir les changements
      if (success) {
        await fetchTournaments();
      }

      closePopup();
    } catch (error) {
      console.error("Erreur lors de l'action:", error);
      showMessage("error", `Erreur lors de l'action.`);
    }
  }
};

/**
 * Inscrit l'utilisateur au tournoi sans définir son niveau
 */
const registerWithoutLevel = async () => {
  if (!user.value || !levelPromptTournamentId.value) return;

  try {
    // Fermer la modale
    closeLevelPrompt();

    // Appel au service pour inscrire le joueur
    await tournamentService.registerPlayer(
      levelPromptTournamentId.value,
      user.value._id
    );

    // Afficher un message de succès
    showMessage(
      "success",
      "Inscription réussie ! N'oubliez pas de venir vous check-in 24h avant le tournoi."
    );

    // Recharger les données des tournois
    await fetchTournaments();
  } catch (error) {
    console.error("Erreur lors de l'inscription sans niveau:", error);
    showMessage(
      "error",
      "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
    );
  }
};

/**
 * Change l'état de check-in d'un joueur pour un tournoi avec retour visuel immédiat
 */
const checkIn = async (tournamentId: string, checkedIn: boolean) => {
  if (user.value) {
    // Update optimiste de l'interface
    if (tournamentId in checkedInPlayers.value) {
      checkedInPlayers.value[tournamentId] = checkedIn;
    }

    try {
      // Appel direct au service
      await tournamentService.checkInPlayer(
        tournamentId,
        user.value._id,
        checkedIn
      );

      // Si le check-in est annulé, supprimer l'entrée du localStorage
      if (!checkedIn) {
        localStorage.removeItem(`checkin-reminded-${tournamentId}`);
      }
      showMessage(
        "success",
        checkedIn ? "Check-in confirmé !" : "Check-in annulé."
      );

      // Recharger les données pour refléter le changement
      await fetchTournaments();
    } catch (err) {
      // En cas d'erreur, remettre l'état précédent
      if (tournamentId in checkedInPlayers.value) {
        checkedInPlayers.value[tournamentId] = !checkedIn;
      }

      console.error("Erreur lors du check-in:", err);
      showMessage(
        "error",
        `Erreur: Impossible de ${
          checkedIn ? "confirmer" : "annuler"
        } le check-in.`
      );
    }
  }
};

//-------------------------------------------------------
// SECTION: Pagination
//-------------------------------------------------------

/**
 * Calcule le nombre total de pages pour la pagination
 */
const totalPages = computed(() => {
  return Math.ceil(filteredTournaments.value.length / itemsPerPage.value);
});

/**
 * Retourne les tournois pour la page courante
 */
const paginatedTournaments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredTournaments.value.slice(start, end);
});

/**
 * Fonctions de navigation pour la pagination
 */
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
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
 * Réinitialise la pagination quand les filtres changent
 */
watch([selectedGame, showFinished, sortAscending], async () => {
  currentPage.value = 1;

  // Si l'utilisateur est connecté, vérifier les états de check-in
  if (user.value) {
    await checkUserCheckIns(user.value._id);
  }
});
onMounted(async () => {
  try {
    // Chargement parallèle des jeux et tournois pour plus de rapidité
    const [gamesResult] = await Promise.all([
      gameService.getGames(),
      fetchTournaments(), // Utilise le store avec cache
    ]);

    games.value = gamesResult;
  } catch (error) {
    console.error("Erreur lors de l'initialisation:", error);
    // Gérer l'erreur...
  }
});
</script>

<style scoped>
/* Base et layout */
.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Panel cyberpunk avec esthétique rose */
.cyberpunk-panel-pink {
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 15px),
    calc(100% - 15px) 100%,
    0 100%
  );
  background: radial-gradient(
      circle at top right,
      rgba(236, 72, 153, 0.2),
      transparent 60%
    ),
    linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(15, 23, 42, 0.9));
  position: relative;
}

.cyberpunk-panel-pink::before {
  content: "";
  position: absolute;
  right: 15px;
  bottom: 0;
  width: 30px;
  height: 2px;
  background: rgba(236, 72, 153, 0.7);
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.7);
}

.cyberpunk-panel-pink::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 15px;
  width: 2px;
  height: 30px;
  background: rgba(236, 72, 153, 0.7);
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.7);
}

/* Label avec teinte rose */
.cyberpunk-label-pink {
  text-shadow: 0 0 5px rgba(236, 72, 153, 0.7);
  letter-spacing: 1px;
}

.cyberpunk-label-pink svg {
  filter: drop-shadow(0 0 2px rgba(236, 72, 153, 0.7));
}

/* Select avec style rose */
.cyberpunk-select-pink {
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% 100%,
    10px 100%,
    0 calc(100% - 10px)
  );
  background: linear-gradient(
    135deg,
    rgba(8, 8, 16, 0.95),
    rgba(14, 23, 36, 0.95)
  );
  box-shadow: inset 0 0 10px rgba(236, 72, 153, 0.3),
    0 0 5px rgba(236, 72, 153, 0.3);
  text-shadow: 0 0 3px rgba(236, 72, 153, 0.7);
  caret-color: #ec4899;
  position: relative;
  z-index: 1;
  letter-spacing: 0.5px;
  padding-right: 2.5rem !important;
  color: #ec4899;
  border: 2px solid rgba(236, 72, 153, 0.7);
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

/* Style au focus */
.cyberpunk-select-pink:focus {
  outline: none;
  border-color: #ec4899;
  box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.5);
  animation: pulse-glow-pink 2s infinite;
}

/* Effet de lueur rose sur survol */
.cyberpunk-select-glow-pink {
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.7);
  border: 2px solid rgba(236, 72, 153, 0.8);
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% 100%,
    10px 100%,
    0 calc(100% - 10px)
  );
  transform: scale(1.01);
  z-index: 0;
}

/* Icône avec effet rose */
.cyberpunk-icon-pink {
  filter: drop-shadow(0 0 2px rgba(236, 72, 153, 0.7));
  transition: transform 0.3s ease;
}

.cyberpunk-select-pink:focus
  + .cyberpunk-select-glow-pink
  + div
  .cyberpunk-icon-pink,
.group:hover .cyberpunk-icon-pink {
  transform: translateY(2px);
  filter: drop-shadow(0 0 4px rgba(236, 72, 153, 0.9));
}

/* Styles pour les options du select */
.cyberpunk-select-pink option {
  background-color: #0f172a;
  color: #fbcfe8;
  font-family: "Orbitron", sans-serif;
}

/* Animation de pulsation rose */
@keyframes pulse-glow-pink {
  0% {
    box-shadow: inset 0 0 10px rgba(236, 72, 153, 0.3),
      0 0 5px rgba(236, 72, 153, 0.3);
  }
  50% {
    box-shadow: inset 0 0 15px rgba(236, 72, 153, 0.4),
      0 0 10px rgba(236, 72, 153, 0.4);
  }
  100% {
    box-shadow: inset 0 0 10px rgba(236, 72, 153, 0.3),
      0 0 5px rgba(236, 72, 153, 0.3);
  }
}

/* Nouveaux styles pour le toggle cyberpunk */
.cyberpunk-toggle-container {
  display: flex;
  align-items: center;
}

.cyberpunk-toggle {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.cyberpunk-toggle-slider {
  position: relative;
  width: 44px;
  height: 24px;
  background-color: rgba(31, 41, 55, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(236, 72, 153, 0.5);
  transition: all 0.3s ease;
  overflow: hidden;
}

.cyberpunk-toggle-slider::before {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  background-color: #0f172a;
  border-radius: 50%;
  transform: translateX(0);
  transition: all 0.3s ease;
  z-index: 1;
}

.cyberpunk-toggle input:checked + .cyberpunk-toggle-slider {
  background-color: rgba(236, 72, 153, 0.3);
  border-color: rgba(236, 72, 153, 0.8);
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.4);
}

.cyberpunk-toggle input:checked + .cyberpunk-toggle-slider::before {
  transform: translateX(20px);
  background-color: #ec4899;
}

.cyberpunk-toggle-label {
  user-select: none;
}

.cyberpunk-toggle-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #334155;
  transition: transform 0.3s ease;
  z-index: 1;
}

.cyberpunk-toggle
  input:checked
  + .cyberpunk-toggle-slider
  .cyberpunk-toggle-knob {
  transform: translateX(20px);
  background-color: #ec4899;
}

.cyberpunk-toggle-knob-highlight {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.8), transparent);
  transition: opacity 0.3s ease;
}

.cyberpunk-toggle
  input:checked
  + .cyberpunk-toggle-slider
  .cyberpunk-toggle-knob-highlight {
  opacity: 1;
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

/* Animation des transitions de page */
.page-transition-enter-active,
.page-transition-leave-active {
  transition: all 0.3s ease;
}

.page-transition-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-transition-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.cyber-transition-container {
  min-height: 200px;
  position: relative;
}

.cyberpunk-date-input {
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% 100%,
    10px 100%,
    0 calc(100% - 10px)
  );
  background: linear-gradient(
    135deg,
    rgba(8, 8, 16, 0.95),
    rgba(14, 23, 36, 0.95)
  );
  box-shadow: inset 0 0 10px rgba(236, 72, 153, 0.3),
    0 0 5px rgba(236, 72, 153, 0.3);
  color: #ec4899;
  border: 2px solid rgba(236, 72, 153, 0.7);
  padding-right: 10px !important;
}

/* Personnaliser l'icône du calendrier */
.cyberpunk-date-input::-webkit-calendar-picker-indicator {
  filter: invert(0.5) sepia(1) saturate(5) hue-rotate(300deg); /* Teinte rose */
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.cyberpunk-date-input::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}

/* Effet de lueur rose sur survol */
.cyberpunk-date-glow-pink {
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.7);
  border: 2px solid rgba(236, 72, 153, 0.8);
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% 100%,
    10px 100%,
    0 calc(100% - 10px)
  );
  transform: scale(1.01);
  z-index: 0;
}

/* Style au focus */
.cyberpunk-date-input:focus {
  outline: none;
  border-color: #ec4899;
  box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.5);
  animation: pulse-glow-pink 2s infinite;
}

/* Styles responsives supplémentaires */
@media (max-width: 640px) {
  .cyberpunk-panel-purple {
    clip-path: polygon(
      0 0,
      100% 0,
      100% calc(100% - 10px),
      calc(100% - 10px) 100%,
      0 100%
    );
  }

  .cyberpunk-toggle-label {
    letter-spacing: 0;
  }

  .cyberpunk-toggle-slider {
    width: 36px;
    height: 20px;
  }

  .cyberpunk-toggle-knob {
    width: 14px;
    height: 14px;
  }

  .cyberpunk-toggle
    input:checked
    + .cyberpunk-toggle-slider
    .cyberpunk-toggle-knob {
    transform: translateX(16px);
  }

  .cyberpunk-select-pink {
    clip-path: polygon(
      0 0,
      calc(100% - 8px) 0,
      100% 8px,
      100% 100%,
      8px 100%,
      0 calc(100% - 8px)
    );
  }

  .neon-text {
    font-size: 1.875rem; /* text-3xl */
  }
}

/* Optimisations pour les écrans très petits (< 370px) */
@media (max-width: 370px) {
  .cyberpunk-toggle-label {
    font-size: 0.7rem;
  }

  .neon-text {
    font-size: 1.5rem;
  }

  .container {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}

/* Ajout d'une transition plus fluide pour les éléments */
.cyberpunk-panel-purple,
.cyberpunk-select-pink,
.cyberpunk-toggle-slider,
.cyberpunk-toggle-knob {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Ajuster l'animation de pulsation sur mobile pour des performances optimales */
@media (max-width: 640px) {
  @keyframes pulse-glow-pink {
    0%,
    100% {
      box-shadow: inset 0 0 5px rgba(236, 72, 153, 0.3),
        0 0 3px rgba(236, 72, 153, 0.3);
    }
    50% {
      box-shadow: inset 0 0 10px rgba(236, 72, 153, 0.4),
        0 0 8px rgba(236, 72, 153, 0.4);
    }
  }
}

/* Style cyberpunk pour l'alerte de connexion */
.cyberpunk-alert-container {
  position: relative;
  background: linear-gradient(
    90deg,
    rgba(31, 19, 24, 0.9),
    rgba(17, 24, 39, 0.9)
  );
  border-left: 2px solid rgba(236, 72, 153, 0.8);
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.6),
    0 0 10px rgba(236, 72, 153, 0.4);
  clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%);
}

.cyberpunk-alert-container::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 15px;
  height: 15px;
  background-color: rgba(236, 72, 153, 0.8);
  clip-path: polygon(0 0, 100% 0, 100% 100%);
}

.cyberpunk-alert {
  display: flex;
  padding: 0.75rem 1.25rem;
  position: relative;
  overflow: hidden;
}

.cyberpunk-alert::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(236, 72, 153, 0.1),
    transparent
  );
  animation: alertGlow 3s infinite;
}
.alert-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(236, 72, 153, 0.2);
  border: 1px solid rgba(236, 72, 153, 0.5);
  border-radius: 50%;
  margin-right: 1rem;
  position: relative;
  overflow: hidden;
}

.alert-icon-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    rgba(236, 72, 153, 0.4) 0%,
    transparent 70%
  );
  animation: pulse 2s infinite;
}

.alert-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: rgba(236, 72, 153, 0.9);
  filter: drop-shadow(0 0 2px rgba(236, 72, 153, 0.8));
  z-index: 1;
}

.alert-content {
  display: flex;
  flex-direction: column;
  color: white;
  text-shadow: 0 0 5px rgba(236, 72, 153, 0.7);
}

/* Modifications pour le bouton */
.cyberpunk-btn-sm {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background: rgba(236, 72, 153, 0.2);
  border: 1px solid rgba(236, 72, 153, 0.6);
  color: rgba(236, 72, 153, 1);
  font-family: "Orbitron", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
}

.cyberpunk-btn-sm:hover {
  background: rgba(236, 72, 153, 0.3);
  color: white;
  text-shadow: 0 0 5px rgba(236, 72, 153, 0.7);
}

.btn-text {
  position: relative;
  z-index: 1;
}

.btn-glitch {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(236, 72, 153, 0.3),
    transparent
  );
  opacity: 0;
}

.cyberpunk-btn-sm:hover .btn-glitch {
  animation: glitch 1s infinite;
  opacity: 1;
}

@keyframes alertGlow {
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

@keyframes glitch {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@media (max-width: 640px) {
  .alert-icon-container {
    width: 2rem;
    height: 2rem;
    margin-right: 0.75rem;
  }

  .alert-icon {
    width: 1rem;
    height: 1rem;
  }

  .cyberpunk-btn-sm {
    padding: 0.25rem 0.75rem;
    font-size: 0.7rem;
  }
}
</style>
