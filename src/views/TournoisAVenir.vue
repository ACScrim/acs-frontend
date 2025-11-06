<template>
  <SpaceContainer>
    <!-- En-tête de la page avec style NASA -->
    <SpaceHeader
      title="TOURNOIS À VENIR"
      mission="TOURNAMENTS-EXPLORER"
      :showMissionInfo="true"
    >
      <template #badge v-if="filteredTournaments.length > 0">
        <SpaceBadge variant="accent" size="lg">
          {{ filteredTournaments.length }}
        </SpaceBadge>
      </template>
    </SpaceHeader>

    <div class="flex flex-col gap-6 mt-6">
      <!-- Filtres -->
      <SpaceCard variant="dark" className="mb-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- Sélecteur de jeux -->
          <div class="space-y-4">
            <label
              for="game"
              class="mb-2 font-nasa text-color-primary-light flex items-center gap-2"
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
              <span>FILTRER PAR JEU</span>
            </label>
            <div class="relative">
              <select
                id="game"
                v-model="selectedGame"
                class="w-full rounded-lg border border-color-primary/30 bg-color-bg-light text-color-text px-4 py-2 appearance-none focus:ring-2 focus:ring-color-primary/30 focus:outline-none transition-all duration-300"
              >
                <option value="">Tous les jeux</option>
                <option v-for="game in games" :key="game._id" :value="game._id">
                  {{ game.name }}
                </option>
              </select>
              <div
                class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-space-primary"
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
          <div class="space-y-4">
            <label class="block mb-2 font-nasa text-color-secondary-light"
              >OPTIONS DE FILTRAGE</label
            >
            <div class="space-y-3">
              <!-- Option 1: Afficher les tournois passés -->
              <div class="flex items-center gap-3">
                <SpaceToggle
                  v-model="showFinished"
                  className="bg-space-secondary/20"
                />
                <span class="text-space-text text-sm">
                  Afficher uniquement les tournois terminés
                </span>
              </div>

              <!-- Option 2: Ordre chronologique -->
              <div class="flex items-center gap-3">
                <SpaceToggle
                  v-model="sortAscending"
                  className="bg-space-secondary/20"
                />
                <span class="text-space-text text-sm">
                  Ordre chronologique
                  <span class="text-xs text-space-text-muted ml-1">
                    ({{
                      sortAscending ? "ancien → nouveau" : "nouveau → ancien"
                    }})
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </SpaceCard>

      <!-- Notification pour les utilisateurs non connectés - placée en dehors de la carte des filtres -->
      <SpaceAlert v-if="!user" variant="info" className="mb-6">
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </template>
        <div class="flex flex-col">
          <span class="font-heading text-sm">Authentification requise</span>
          <span class="text-xs text-space-text-muted mt-1"
            >Connectez-vous pour vous inscrire aux tournois</span
          >
          <SpaceButton
            @click="loginWithDiscord"
            variant="primary"
            size="sm"
            className="mt-2 self-end"
          >
            <svg
              class="w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              fill="currentColor"
            >
              <path
                d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"
              />
            </svg>
            Connexion
          </SpaceButton>
        </div>
      </SpaceAlert>

      <!-- Notifications -->
      <Toast v-if="error" type="error" :message="error" />
      <Toast v-if="success" type="success" :message="success" />

      <!-- Affichage du loader pendant le chargement -->
      <div v-if="isLoading" class="flex justify-center py-12">
        <SpaceLoader text="Transmission des données en cours..." />
      </div>

      <!-- Liste des tournois -->
      <div v-else-if="filteredTournaments.length > 0">
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
            @unregister-caster="unregisterCaster"
          />
        </div>

        <!-- Pagination -->
        <div class="mt-6">
          <SpacePagination
            v-if="filteredTournaments.length > itemsPerPage"
            :current-page="currentPage"
            :total-pages="totalPages"
            @prev-page="prevPage"
            @next-page="nextPage"
            @page-select="goToPage"
          />
        </div>
      </div>

      <!-- Message pas de tournois -->
      <SpaceTerminal
        v-else
        command="list_tournaments --all"
        title="SYSTÈME DE RECHERCHE"
        showCursor
        className="my-8"
      >
        <div class="text-space-error font-mono">
          Erreur 404: Aucun tournoi n'a été trouvé.
        </div>
        <div class="text-space-text-muted mt-2">
          Essayez de modifier vos critères de recherche ou revenez plus tard
          lorsque de nouveaux tournois seront programmés.
        </div>
      </SpaceTerminal>
    </div>

    <!-- Modal de niveau requis -->
    <SpaceModal v-model="showLevelPrompt" title="NIVEAU DE JEU REQUIS">
      <div class="space-y-4">
        <p class="text-space-text">
          Vous n'avez pas encore défini votre niveau pour
          <span class="text-space-primary-light font-bold">{{
            levelPromptGameName
          }}</span
          >.
        </p>
        <p class="text-space-text-muted">
          Définir votre niveau aide à l'organisation des tournois et au
          matchmaking. Vous pouvez:
        </p>
        <div class="space-y-3 mt-4">
          <SpaceButton
            @click="goToLevelDefinition"
            variant="primary"
            className="w-full"
          >
            Définir mon niveau maintenant
          </SpaceButton>
          <SpaceButton
            @click="registerWithoutLevel"
            variant="outline"
            className="w-full"
          >
            S'inscrire sans définir de niveau
          </SpaceButton>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <SpaceButton @click="closeLevelPrompt" variant="ghost" size="sm">
            Annuler
          </SpaceButton>
        </div>
      </template>
    </SpaceModal>

    <!-- Modal de confirmation d'inscription/désinscription -->
    <SpaceModal
      v-model="showPopup"
      :title="`CONFIRMATION D'${
        actionType === 'register' || actionType === 'waitlist'
          ? 'INSCRIPTION'
          : 'ANNULATION'
      }`"
    >
      <div class="space-y-4">
        <p class="text-space-text">
          Voulez-vous
          <span class="text-space-primary-light font-bold">
            {{
              actionType === "register"
                ? "vous inscrire"
                : actionType === "waitlist"
                ? "rejoindre la liste d'attente"
                : actionType === "unregister-waitlist"
                ? "quitter la liste d'attente"
                : "vous désinscrire"
            }}
          </span>
          au tournoi
          <span class="text-space-secondary-light font-bold">
            {{ selectedTournament?.name }} </span
          >?
        </p>

        <div
          v-if="actionType === 'register' || actionType === 'waitlist'"
          class="bg-space-bg-light/20 p-3 rounded-lg border border-space-bg-light/30"
        >
          <p class="text-space-text-muted text-sm">
            <span v-if="actionType === 'register'">
              N'oubliez pas de venir vous check-in 24h avant le début du tournoi
              pour confirmer votre participation.
            </span>
            <span v-else>
              Vous serez automatiquement inscrit si des places se libèrent.
            </span>
          </p>
        </div>

        <div
          v-if="
            actionType === 'unregister' || actionType === 'unregister-waitlist'
          "
          class="bg-space-error/10 p-3 rounded-lg border border-space-error/20"
        >
          <p class="text-space-text-muted text-sm">
            <span v-if="actionType === 'unregister'">
              Attention: Si vous vous désinscrivez, votre place sera attribuée à
              une personne en liste d'attente.
            </span>
            <span v-else>
              Vous ne serez plus contacté si des places se libèrent.
            </span>
          </p>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-2">
          <SpaceButton @click="closePopup" variant="outline" size="sm">
            Annuler
          </SpaceButton>
          <SpaceButton
            @click="confirmAction"
            :variant="
              actionType === 'unregister' ||
              actionType === 'unregister-waitlist'
                ? 'error'
                : 'primary'
            "
          >
            Confirmer
          </SpaceButton>
        </div>
      </template>
    </SpaceModal>
  </SpaceContainer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import gameService from "../services/gameService";
import { useUserStore } from "../stores/userStore";
import Toast from "@/shared/Toast.vue";
import type { Game, Tournament } from "../types";
import TournamentGridCard from "@/components/tournois-a-venir/TournamentGridCard.vue";
import playerService from "../services/playerService";
import { useRouter, useRoute } from "vue-router";

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
 * Désinscrit un caster
 * @param tournamentId
 * @param userId
 */
const unregisterCaster = async (tournamentId: string, userId: string) => {
  try {
    await tournamentService.unregisterPlayerAsCaster(tournamentId, userId);

    await fetchTournaments();
  } catch (error) {
    console.error("Erreur lors de l'action:", error);
    showMessage("error", `Erreur lors de l'action.`);
    closePopup();
  }
}

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
watch([selectedGame], async () => {
  currentPage.value = 1;

  // Recharger les tournois uniquement lorsque le jeu sélectionné change
  await fetchTournaments();

  // Si l'utilisateur est connecté, vérifier les états de check-in
  if (user.value) {
    await checkUserCheckIns(user.value._id);
  }
});

// Ajouter un watch spécifique pour les filtres locaux qui ne nécessitent pas de rechargement
watch([showFinished, sortAscending], () => {
  currentPage.value = 1;
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
/* Animations subtiles pour les éléments interactifs */
.space-transition {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Effets de survol spécifiques à cette vue */
.space-hover-glow:hover {
  box-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.4);
}

/* Gestion améliorée des transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Gestion des sélecteurs custom */
select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.3);
}

/* Style pour les toggles */
.toggle-track {
  transition: background-color 0.3s;
}

.toggle-thumb {
  transition: transform 0.3s;
}
</style>
