<template>
  <Container>
    <!-- En-tête de la page avec thème Halloween -->
    <Header
      title="TOURNOIS À VENIR"
      mission="TOURNAMENTS-EXPLORER"
      :showMissionInfo="true"
    >
      <template #badge v-if="filteredTournaments.length > 0">
        <Badge variant="accent" size="lg">
          {{ filteredTournaments.length }}
        </Badge>
      </template>
    </Header>

    <div class="flex flex-col gap-6 mt-6">
      <!-- Filtres -->
      <Card variant="dark" className="mb-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- Sélecteur de jeux -->
          <div class="space-y-4">
            <label
              for="game"
              class="mb-2 font-body text-color-primary-light flex items-center gap-2"
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
                class="w-full rounded-lg border border-color-primary/30 bg-color-bg-light text-color-text px-4 py-2 appearance-none focus:ring-2 focus:ring-color-primary/30 focus:outline-none mystical-transition"
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
                  class="h-5 w-5 text-color-primary"
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
            <label class="block mb-2 font-body text-color-secondary-light"
              >OPTIONS DE FILTRAGE</label
            >
            <div class="space-y-3">
              <!-- Option 1: Afficher les tournois passés -->
              <div class="flex items-center gap-3">
                <Toggle
                  v-model="showFinished"
                  className="bg-color-secondary/20"
                />
                <span class="text-color-text text-sm">
                  Afficher uniquement les tournois terminés
                </span>
              </div>

              <!-- Option 2: Ordre chronologique -->
              <div class="flex items-center gap-3">
                <Toggle
                  v-model="sortAscending"
                  className="bg-color-secondary/20"
                />
                <span class="text-color-text text-sm">
                  Ordre chronologique
                  <span class="text-xs text-color-text-muted ml-1">
                    ({{
                      sortAscending ? "ancien → nouveau" : "nouveau → ancien"
                    }})
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <!-- Notification pour les utilisateurs non connectés - placée en dehors de la carte des filtres -->
      <Alert v-if="!user" variant="info" className="mb-6">
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
          <span class="text-xs text-color-text-muted mt-1"
            >Connectez-vous pour vous inscrire aux tournois</span
          >
          <Button
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
          </Button>
        </div>
      </Alert>

      <!-- Notifications -->
      <Toast v-if="error" type="error" :message="error" />
      <Toast v-if="success" type="success" :message="success" />

      <!-- Affichage du loader pendant le chargement -->
      <div v-if="isLoading" class="flex justify-center py-12">
        <Loader text="Transmission des données en cours..." />
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
          <Pagination
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
      <Terminal
        v-else
        command="list_tournaments --all"
        title="SYSTÈME DE RECHERCHE"
        showCursor
        className="my-8"
      >
        <div class="text-color-error font-mono">
          Erreur 404: Aucun tournoi n'a été trouvé.
        </div>
        <div class="text-color-text-muted mt-2">
          Essayez de modifier vos critères de recherche ou revenez plus tard
          lorsque de nouveaux tournois seront programmés.
        </div>
      </Terminal>
    </div>

    <!-- Modal de niveau requis -->
    <Modal v-model="showLevelPrompt" title="NIVEAU DE JEU REQUIS">
      <div class="space-y-4">
        <p class="text-color-text">
          Vous n'avez pas encore défini votre niveau pour
          <span class="text-color-primary-light font-bold">{{
            levelPromptGameName
          }}</span
          >.
        </p>
        <p class="text-color-text-muted">
          Définir votre niveau aide à l'organisation des tournois et au
          matchmaking. Vous pouvez:
        </p>
        <div class="space-y-3 mt-4">
          <Button
            @click="goToLevelDefinition"
            variant="primary"
            className="w-full"
          >
            Définir mon niveau maintenant
          </Button>
          <Button
            @click="registerWithoutLevel"
            variant="outline"
            className="w-full"
          >
            S'inscrire sans définir de niveau
          </Button>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <Button @click="closeLevelPrompt" variant="ghost" size="sm">
            Annuler
          </Button>
        </div>
      </template>
    </Modal>

    <!-- Modal de confirmation d'inscription/désinscription -->
    <Modal
      v-model="showPopup"
      :title="`CONFIRMATION D'${
        actionType === 'register' || actionType === 'waitlist'
          ? 'INSCRIPTION'
          : 'ANNULATION'
      }`"
    >
      <div class="space-y-4">
        <p class="text-color-text">
          Voulez-vous
          <span class="text-color-primary-light font-bold">
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
          <span class="text-color-secondary-light font-bold">
            {{ selectedTournament?.name }} </span
          >?
        </p>

        <div
          v-if="actionType === 'register' || actionType === 'waitlist'"
          class="bg-color-bg-light/20 p-3 rounded-lg border border-color-bg-light/30"
        >
          <p class="text-color-text-muted text-sm">
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
          class="bg-color-error/10 p-3 rounded-lg border border-color-error/20"
        >
          <p class="text-color-text-muted text-sm">
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
          <Button @click="closePopup" variant="outline" size="sm">
            Annuler
          </Button>
          <Button
            @click="confirmAction"
            :variant="
              actionType === 'unregister' ||
              actionType === 'unregister-waitlist'
                ? 'error'
                : 'primary'
            "
          >
            Confirmer
          </Button>
        </div>
      </template>
    </Modal>
  </Container>
</template>

<script setup lang="ts">
//-------------------------------------------------------
// IMPORTS ET TYPES
//-------------------------------------------------------
import { ref, computed, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "../stores/userStore";
import gameService from "../services/gameService";
import tournamentService from "../services/tournamentService";
import playerService from "../services/playerService";
import Toast from "@/shared/Toast.vue";
import TournamentGridCard from "@/components/tournois-a-venir/TournamentGridCard.vue";
import type { Game, Tournament } from "../types";

//-------------------------------------------------------
// ÉTAT RÉACTIF ET STORES
//-------------------------------------------------------

// Store utilisateur et navigation
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

// États principaux
const tournaments = ref<Tournament[]>([]);
const games = ref<Game[]>([]);
const isLoading = ref(false);

// États de filtrage et tri
const selectedGame = ref("");
const showFinished = ref(false);
const sortAscending = ref(true);

// États d'interface et modales
const showPopup = ref(false);
const showLevelPrompt = ref(false);
const selectedTournament = ref<Tournament | null>(null);
const actionType = ref("register");

// États pour la modale de niveau de jeu
const levelPromptGameId = ref("");
const levelPromptGameName = ref("");
const levelPromptTournamentId = ref("");

// États d'interaction
const checkedInPlayers = ref<{ [key: string]: boolean }>({});

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(6);

// Système de notifications
const success = ref<string | null>(null);
const error = ref<string | null>(null);

//-------------------------------------------------------
// PROPRIÉTÉS CALCULÉES - AUTHENTIFICATION
//-------------------------------------------------------

/**
 * Référence à l'utilisateur connecté
 * @returns L'utilisateur connecté ou null
 */
const user = computed(() => userStore.user);

/**
 * ID du joueur actuellement connecté
 * @returns ID du joueur ou null
 */
const currentPlayerId = computed(() => userStore.playerId);

//-------------------------------------------------------
// PROPRIÉTÉS CALCULÉES - FILTRAGE ET TRI
//-------------------------------------------------------

/**
 * Filtre et trie les tournois selon les critères sélectionnés
 * @returns Liste des tournois filtrés et triés
 */
const filteredTournaments = computed(() => {
  let filtered = tournaments.value;

  // Filtre par jeu sélectionné
  if (selectedGame.value) {
    filtered = filtered.filter(
      (tournament) => tournament.game?._id === selectedGame.value
    );
  }

  // Filtre par statut (terminé/à venir)
  if (showFinished.value) {
    // Afficher uniquement les tournois terminés
    filtered = filtered.filter((tournament) => tournament.finished === true);
  } else {
    // Afficher uniquement les tournois à venir (non terminés)
    filtered = filtered.filter((tournament) => tournament.finished !== true);
  }

  // Tri chronologique optimisé
  const sortMultiplier = sortAscending.value ? 1 : -1;

  return filtered.sort((a, b) => {
    // Validation des dates avec fallback
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;

    // Gestion des dates invalides
    if (isNaN(dateA) && isNaN(dateB)) return 0;
    if (isNaN(dateA)) return 1;
    if (isNaN(dateB)) return -1;

    return (dateA - dateB) * sortMultiplier;
  });
});

//-------------------------------------------------------
// PROPRIÉTÉS CALCULÉES - PAGINATION
//-------------------------------------------------------

/**
 * Calcule le nombre total de pages pour la pagination
 * @returns Nombre total de pages
 */
const totalPages = computed(() => {
  return Math.ceil(filteredTournaments.value.length / itemsPerPage.value);
});

/**
 * Retourne les tournois à afficher sur la page courante
 * @returns Liste des tournois paginés
 */
const paginatedTournaments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredTournaments.value.slice(start, end);
});

//-------------------------------------------------------
// PROPRIÉTÉS CALCULÉES - UTILITAIRES TOURNOIS
//-------------------------------------------------------

/**
 * Vérifie si un tournoi est plein (capacité atteinte)
 * @param tournament - Le tournoi à vérifier
 * @returns true si le tournoi est plein
 */
const isTournamentFull = (tournament: Tournament): boolean => {
  if (!tournament || !tournament.playerCap || !tournament.players) {
    return false;
  }
  return (
    tournament.playerCap > 0 &&
    tournament.players.length >= tournament.playerCap
  );
};

/**
 * Vérifie si l'utilisateur est en liste d'attente pour un tournoi
 * @param tournament - Le tournoi à vérifier
 * @returns true si l'utilisateur est en liste d'attente
 */
const isUserInWaitlist = (tournament: Tournament): boolean => {
  const playerId = userStore.playerId;

  if (!playerId || !tournament?.waitlistPlayers) {
    return false;
  }

  return tournament.waitlistPlayers.some((waitlistId) => {
    // Gestion des objets Player avec _id
    if (typeof waitlistId === "object" && waitlistId && "_id" in waitlistId) {
      return waitlistId._id === playerId;
    }
    // Gestion des IDs directs (string)
    if (typeof waitlistId === "string") {
      return waitlistId === playerId;
    }
    return false;
  });
};

//-------------------------------------------------------
// FONCTIONS DE PAGINATION
//-------------------------------------------------------

/**
 * Passe à la page précédente si possible
 */
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

/**
 * Passe à la page suivante si possible
 */
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

/**
 * Va à une page spécifique
 * @param page - Numéro de la page cible
 */
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
//-------------------------------------------------------
// FONCTIONS DE CHARGEMENT DES DONNÉES
//-------------------------------------------------------

/**
 * Charge les tournois depuis le service
 */
const fetchTournaments = async () => {
  isLoading.value = true;
  try {
    tournaments.value = await tournamentService.getTournaments();

    // Vérifier les check-ins si un utilisateur est connecté
    if (user.value) {
      await checkUserCheckIns(user.value._id);
    }
  } catch (error) {
    console.error("Erreur lors du chargement des tournois:", error);
    showMessage("error", "Erreur lors du chargement des tournois");
  } finally {
    isLoading.value = false;
  }
};

/**
 * Vérifie les statuts de check-in d'un utilisateur
 * @param userId - ID de l'utilisateur
 */
const checkUserCheckIns = async (userId: string): Promise<void> => {
  if (!userId) return;

  try {
    const playerId = userStore.playerId;

    if (playerId) {
      // Utilisation de l'ID du joueur depuis le store
      tournaments.value.forEach((tournament) => {
        if (tournament._id && tournament.checkIns) {
          checkedInPlayers.value[tournament._id] =
            tournament.checkIns[playerId] || false;
        }
      });
    } else {
      // Fallback : récupération de l'ID joueur via le service
      const player = await playerService.getPlayerByIdUser(userId);

      if (player?._id) {
        tournaments.value.forEach((tournament) => {
          if (tournament._id && tournament.checkIns && player._id) {
            checkedInPlayers.value[tournament._id] =
              tournament.checkIns[player._id] || false;
          }
        });
      }
    }
  } catch (err) {
    console.error("Erreur lors de la vérification des check-ins:", err);
  }
};

//-------------------------------------------------------
// FONCTIONS DE GESTION DES INSCRIPTIONS
//-------------------------------------------------------

/**
 * Ouvre le popup de confirmation pour l'inscription ou désinscription
 * @param tournament - Objet tournoi
 * @param type - Type d'action ("register", "unregister", "waitlist", etc.)
 */
const openRegistrationPopup = (tournament: Tournament, type: string) => {
  selectedTournament.value = tournament;

  // Déterminer le type d'action en fonction de l'état du joueur
  if (type === "register") {
    // Si le tournoi est plein et l'utilisateur n'est pas déjà en liste d'attente
    if (isTournamentFull(tournament) && !isUserInWaitlist(tournament)) {
      actionType.value = "waitlist";
    } else {
      actionType.value = "register";
    }
  } else if (type === "unregister") {
    // Si l'utilisateur est en liste d'attente
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
 * Désinscrit un caster d'un tournoi
 * @param tournamentId - ID du tournoi
 * @param userId - ID de l'utilisateur
 */
const unregisterCaster = async (tournamentId: string, userId: string) => {
  try {
    await tournamentService.unregisterPlayerAsCaster(tournamentId, userId);
    await fetchTournaments();
    showMessage("success", "Caster désinscrit avec succès");
  } catch (error) {
    console.error("Erreur lors de la désinscription du caster:", error);
    showMessage("error", "Erreur lors de la désinscription du caster");
    closePopup();
  }
};

/**
 * Démarre le processus d'authentification Discord OAuth2
 */
const loginWithDiscord = () => {
  try {
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_DISCORD_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      showMessage("error", "Configuration Discord manquante");
      return;
    }

    window.location.href = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=identify+guilds+email`;
  } catch (err) {
    console.error("Erreur d'authentification Discord:", err);
    showMessage("error", "Impossible de se connecter à Discord");
  }
};

/**
 * Affiche la modale pour définir le niveau de jeu
 * @param game - Objet jeu
 * @param tournamentId - ID du tournoi
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
      autoRegister: "true",
    },
  });
};

/**
 * Ferme la modale de définition de niveau et réinitialise les données
 */
const closeLevelPrompt = () => {
  showLevelPrompt.value = false;
  levelPromptGameId.value = "";
  levelPromptGameName.value = "";
  levelPromptTournamentId.value = "";
};

/**
 * Ferme la modale de confirmation avec animation
 */
const closePopup = () => {
  showPopup.value = false;
  // Réinitialisation différée pour éviter les changements visuels pendant la transition
  setTimeout(() => {
    selectedTournament.value = null;
    actionType.value = "register";
  }, 300);
};

/**
 * Confirme et exécute l'action d'inscription/désinscription sélectionnée
 */
const confirmAction = async () => {
  if (!selectedTournament.value || !user.value) return;

  try {
    let success = false;

    if (
      (actionType.value === "register" || actionType.value === "waitlist") &&
      selectedTournament.value._id
    ) {
      await tournamentService.registerPlayer(
        selectedTournament.value._id,
        user.value._id
      );
      success = true;

      const message =
        actionType.value === "register"
          ? "Inscription réussie ! N'oublie pas de venir te check-in 24h avant le tournoi."
          : "Vous avez été ajouté à la liste d'attente. Vous serez automatiquement inscrit si des places se libèrent.";

      showMessage("success", message);
    } else if (
      (actionType.value === "unregister" ||
        actionType.value === "unregister-waitlist") &&
      selectedTournament.value._id
    ) {
      await tournamentService.unregisterPlayer(
        selectedTournament.value._id,
        user.value._id
      );
      success = true;

      const message =
        actionType.value === "unregister"
          ? "Désinscription réussie ! Triste de te voir partir :("
          : "Vous avez été retiré de la liste d'attente.";

      showMessage("success", message);
    }

    if (success) {
      await fetchTournaments();
    }
    closePopup();
  } catch (error) {
    console.error("Erreur lors de l'action:", error);
    showMessage("error", "Erreur lors de l'action");
  }
};

/**
 * Inscrit l'utilisateur au tournoi sans définir son niveau de jeu
 */
const registerWithoutLevel = async () => {
  if (!user.value || !levelPromptTournamentId.value) return;

  // Stocker l'ID du tournoi avant de fermer la modale
  const tournamentId = levelPromptTournamentId.value;

  try {
    closeLevelPrompt();

    await tournamentService.registerPlayer(
      tournamentId,
      user.value._id
    );

    showMessage(
      "success",
      "Inscription réussie ! N'oubliez pas de venir vous check-in 24h avant le tournoi."
    );

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
 * Gère le check-in/check-out d'un joueur pour un tournoi
 * @param tournamentId - ID du tournoi
 * @param checkedIn - Nouvel état du check-in (true = check-in, false = check-out)
 */
const checkIn = async (tournamentId: string, checkedIn: boolean) => {
  if (!user.value) return;

  // Mise à jour optimiste de l'interface
  if (tournamentId in checkedInPlayers.value) {
    checkedInPlayers.value[tournamentId] = checkedIn;
  }

  try {
    await tournamentService.checkInPlayer(
      tournamentId,
      user.value._id,
      checkedIn
    );

    // Gestion du localStorage pour les rappels
    if (!checkedIn) {
      localStorage.removeItem(`checkin-reminded-${tournamentId}`);
    }

    showMessage(
      "success",
      checkedIn ? "Check-in confirmé !" : "Check-in annulé."
    );

    await fetchTournaments();
  } catch (err) {
    // En cas d'erreur, rétablir l'état précédent
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
};

//-------------------------------------------------------
// FONCTIONS UTILITAIRES
//-------------------------------------------------------

/**
 * Affiche un message de notification temporaire
 * @param type - Type de message ("success" ou "error")
 * @param message - Contenu du message à afficher
 * @param duration - Durée d'affichage en millisecondes (défaut: 3000ms)
 */
const showMessage = (
  type: "success" | "error",
  message: string,
  duration: number = 3000
) => {
  // Réinitialiser les messages précédents
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
// WATCHERS ET CYCLE DE VIE
//-------------------------------------------------------

/**
 * Fonction de debounce pour limiter les appels répétitifs
 * @param fn - Fonction à debouncer
 * @param wait - Délai d'attente en millisecondes
 * @returns Fonction debouncée
 */
function debounce<T extends (...args: any[]) => any>(fn: T, wait = 300) {
  let t: any;
  return (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

const debouncedResetPagination = debounce(() => {
  currentPage.value = 1;
}, 250);

// Watcher pour les changements de jeu sélectionné - recharge les données
watch([selectedGame], async () => {
  currentPage.value = 1;
  await fetchTournaments();

  if (user.value) {
    await checkUserCheckIns(user.value._id);
  }
});

// Watcher pour les filtres locaux - pas besoin de recharger les données
watch([showFinished, sortAscending], debouncedResetPagination);

/**
 * Initialise le composant au montage
 */
onMounted(async () => {
  try {
    // Chargement parallèle des jeux et tournois pour optimiser les performances
    const [gamesResult] = await Promise.all([
      gameService.getGames(),
      fetchTournaments(),
    ]);

    games.value = gamesResult;
  } catch (error) {
    console.error("Erreur lors de l'initialisation:", error);
    showMessage("error", "Erreur lors de l'initialisation de la page");
  }
});
</script>

<style scoped>
/* ========================================================= */
/* TRANSITIONS ET ANIMATIONS HALLOWEEN                       */
/* ========================================================= */

/* Transitions mystiques de base */
.mystical-transition {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.mystical-transition:hover {
  box-shadow: var(--shadow-glow-primary);
  transform: translateY(-1px);
}

/* Animations d'apparition mystique pour les cartes */
.tournament-card-enter {
  animation: mystical-appear 0.6s ease-out;
}

@keyframes mystical-appear {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
    filter: blur(3px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

/* Effets de transition pour les modales */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

/* ========================================================= */
/* ÉLÉMENTS INTERACTIFS                                     */
/* ========================================================= */

/* Sélecteurs avec effets mystiques */
select {
  transition: all 0.3s ease;
}

select:focus {
  outline: none;
  box-shadow: var(--shadow-glow-primary);
  border-color: var(--color-primary);
}

select:hover {
  box-shadow: 0 0 8px rgba(var(--color-primary-rgb), 0.2);
  border-color: var(--color-primary-light);
}

/* Toggles Halloween */
.toggle-track {
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.toggle-track:hover {
  box-shadow: 0 0 8px rgba(var(--color-accent-rgb), 0.3);
}

.toggle-thumb {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.toggle-thumb:hover {
  box-shadow: var(--shadow-toggle-thumb);
}

/* ========================================================= */
/* EFFETS DE SURVOL SPÉCIALISÉS                            */
/* ========================================================= */

/* Effets de lueur Halloween pour les composants */
.tournament-hover-glow:hover {
  box-shadow: var(--shadow-glow-primary);
}

.filter-hover-glow:hover {
  box-shadow: var(--shadow-glow-accent);
}

/* Boutons mystiques */
.mystical-button:hover {
  box-shadow: var(--shadow-glow-secondary);
  transform: translateY(-2px);
}

/* ========================================================= */
/* RESPONSIVE DESIGN                                        */
/* ========================================================= */

/* Adaptations mobiles Halloween */
@media (max-width: 768px) {
  .mystical-transition {
    transition: all 0.3s ease;
  }

  .tournament-hover-glow:hover {
    transform: none;
  }

  .mystical-button:hover {
    transform: translateY(-1px);
  }
}

/* Optimisation pour les préférences d'accessibilité */
@media (prefers-reduced-motion: reduce) {
  .mystical-transition,
  .tournament-card-enter,
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
    animation: none;
  }
}
</style>
