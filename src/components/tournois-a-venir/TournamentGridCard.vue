<template>
  <SpaceCard
    :variant="tournament.finished ? 'success' : 'primary'"
    :stars="true"
    :interactive="true"
    :hover="true"
    :decorated="true"
    :className="
      [
        'tournament-grid-card h-full',
        tournament.finished ? 'finished-tournament' : '',
      ].join(' ')
    "
    @click="navigateToTournamentDetails"
  >
    <!-- Image du jeu ou placeholder avec effet spatial -->
    <div class="aspect-[16/9] overflow-hidden relative -mx-6 -mt-6 mb-4">
      <div
        v-if="tournament.game.imageUrl && !imageError"
        class="w-full h-full overflow-hidden"
      >
        <img
          :src="tournament.game.imageUrl"
          :alt="tournament.game.name"
          class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          @error="handleImageError"
        />
        <!-- Overlay pour améliorer la visibilité du texte -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-space-bg via-transparent to-transparent opacity-80"
        ></div>
      </div>
      <div
        v-else
        class="w-full h-full bg-space-bg-light/30 flex items-center justify-center"
      >
        <!-- Icône de jeu comme placeholder -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-20 w-20 text-space-primary/70"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
          />
        </svg>
      </div>

      <!-- Badge statut du tournoi avec meilleure visibilité -->
      <div class="absolute top-3 right-3">
        <SpaceBadge
          v-if="tournament.finished"
          variant="success"
          size="sm"
          className="flex items-center gap-1 font-bold shadow-md"
          style="
            background-color: rgba(var(--space-success-rgb), 0.9);
            padding: 0.35rem 0.7rem;
          "
        >
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
          Terminé
        </SpaceBadge>
      </div>
    </div>

    <!-- Informations du tournoi -->
    <div class="tournament-info space-y-4">
      <!-- Nom du tournoi -->
      <h3 class="text-xl font-heading text-space-text line-clamp-1">
        {{ tournament.name }}
      </h3>

      <!-- Détails du tournoi -->
      <div class="space-y-2 text-sm">
        <!-- Date et heure -->
        <div class="flex items-center text-space-text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2 text-space-primary"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            />
          </svg>
          <div class="flex items-center">
            <SpaceBadge variant="secondary" size="sm" className="mr-2">
              {{ getWeekday(tournament.date) }}
            </SpaceBadge>
            <span>{{ formatLocalDate(tournament.date) }}</span>
          </div>
        </div>

        <!-- Jeu -->
        <div class="flex items-center text-space-text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2 text-space-secondary"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{{ tournament.game.name }}</span>
        </div>

        <!-- Participants -->
        <div class="flex items-center text-space-text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2 text-space-accent"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
            />
          </svg>
          <span :class="participantsTextClass">{{ formatParticipants() }}</span>
          <SpaceBadge
            v-if="isTournamentFull"
            variant="error"
            size="sm"
            className="ml-2"
          >
            COMPLET
          </SpaceBadge>
        </div>
      </div>

      <!-- Boutons d'action -->
      <div
        v-if="!tournament.finished && user"
        class="flex flex-col space-y-2 mt-6"
        @click.stop
      >
        <!-- Bouton inscription / liste d'attente -->
        <SpaceButton
          v-if="!isUserRegistered && !isUserInWaitlist"
          @click="handleRegistration"
          :variant="isTournamentFull ? 'secondary' : 'primary'"
          className="w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3H6a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V7z"
              clip-rule="evenodd"
            />
          </svg>
          {{ isTournamentFull ? "Rejoindre la liste d'attente" : "S'inscrire" }}
        </SpaceButton>

        <!-- Bouton quitter la liste d'attente -->
        <SpaceButton
          v-else-if="isUserInWaitlist"
          @click="$emit('open-registration', tournament, 'unregister-waitlist')"
          variant="outline"
          className="w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
              clip-rule="evenodd"
            />
          </svg>
          Quitter la liste d'attente
        </SpaceButton>

        <!-- Bouton check-in -->
        <SpaceButton
          v-else-if="isCheckInAvailable && isUserRegistered"
          @click="$emit('check-in', tournament._id, !isCheckedIn)"
          :variant="isCheckedIn ? 'success' : 'accent'"
          className="w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
              clip-rule="evenodd"
            />
          </svg>
          {{ isCheckedIn ? "Check-in confirmé" : "Check-in" }}
        </SpaceButton>

        <!-- Bouton désinscription -->
        <SpaceButton
          v-else-if="isUserRegistered"
          @click="$emit('open-registration', tournament, 'unregister')"
          variant="outline"
          className="w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
              clip-rule="evenodd"
            />
          </svg>
          Se désinscrire
        </SpaceButton>

        <!-- Bouton définir niveau -->
        <SpaceButton
          v-if="
            isUserRegistered && !hasPlayerLevelForGame && !tournament.finished
          "
          @click.stop="redirectToPlayerLevel"
          variant="secondary"
          className="w-full mt-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          Définir votre niveau
        </SpaceButton>
      </div>
    </div>

    <!-- Éléments décoratifs spatiaux pour le tournoi fini -->
    <div
      v-if="tournament.finished"
      class="absolute -bottom-3 -right-3 transform rotate-45 w-20 h-20 pointer-events-none opacity-30"
    >
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        class="text-space-success"
      >
        <polygon
          points="50,0 61,35 97,35 68,57 79,91 50,70 21,91 32,57 3,35 39,35"
          fill="currentColor"
        />
      </svg>
    </div>
  </SpaceCard>
</template>

<script setup lang="ts">
// ================================================
// #region 1. IMPORTS ET CONFIGURATION DE BASE
// ================================================
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import type { Tournament } from "../../types";
import playerGameLevelService from "../../services/playerGameLevelService";
// #endregion

// ================================================
// #region 2. PROPS ET ÉMISSIONS
// ================================================
/**
 * Props du composant
 * @prop {Tournament} tournament - Le tournoi à afficher
 * @prop {Object} user - L'utilisateur connecté (peut être null)
 * @prop {Boolean} isCheckedIn - Indique si l'utilisateur est enregistré pour le check-in
 * @prop {Boolean} redirectOnClick - Si true, redirige vers la page de détail du tournoi lors du clic
 * @prop {String} currentPlayerId - ID du joueur actuel
 */
const props = defineProps({
  tournament: {
    type: Object as () => Tournament,
    required: true,
  },
  user: {
    type: Object,
    default: null,
  },
  isCheckedIn: {
    type: Boolean,
    default: false,
  },
  redirectOnClick: {
    type: Boolean,
    default: true,
  },
  currentPlayerId: {
    type: String,
    default: null,
  },
});

/**
 * Événements émis par le composant
 * @event open-registration - Ouvre le modal d'inscription (register/unregister/waitlist)
 * @event check-in - Gère l'enregistrement du check-in
 * @event show-level-prompt - Affiche le modal pour définir le niveau du joueur
 */
const emit = defineEmits([
  "open-registration",
  "check-in",
  "show-level-prompt",
]);
// #endregion

// ================================================
// #region 3. ÉTAT LOCAL ET RÉFÉRENCES
// ================================================
const router = useRouter(); // Router pour la navigation
const imageError = ref(false); // Indique si l'image du jeu n'a pas pu être chargée
const hasPlayerLevelForGame = ref(false); // Indique si le joueur a défini un niveau pour ce jeu
// #endregion

// ================================================
// #region 4. GESTION DU NIVEAU DU JOUEUR
// ================================================
/**
 * Vérifie si le joueur actuel a défini un niveau pour le jeu du tournoi
 * Met à jour la référence hasPlayerLevelForGame
 */
const checkPlayerLevel = async () => {
  // Si aucun ID joueur ou jeu n'est disponible, mettre à false
  if (!props.currentPlayerId || !props.tournament?.game?._id) {
    hasPlayerLevelForGame.value = false;
    return;
  }

  try {
    // Vérifier si le niveau existe pour ce jeu
    const gameId = props.tournament.game._id;
    const playerLevel = await playerGameLevelService.getPlayerLevelForGame(
      props.currentPlayerId,
      gameId
    );

    // Mettre à jour la valeur de la ref
    hasPlayerLevelForGame.value = !!playerLevel;
  } catch (error) {
    console.error("Erreur lors de la vérification du niveau:", error);
    hasPlayerLevelForGame.value = false;
  }
};

/**
 * Redirige l'utilisateur vers la page de définition de niveau
 * Passe les paramètres nécessaires dans l'URL pour traitement ultérieur
 */
const redirectToPlayerLevel = () => {
  const gameId = props.tournament.game._id;
  const tournamentId = props.tournament._id;

  // Empêcher la navigation vers la page du tournoi
  router.push({
    path: "/player-level",
    query: {
      gameId: gameId,
      tournamentId: tournamentId,
      redirect: router.currentRoute.value.fullPath,
    },
  });
};
// #endregion

// ================================================
// #region 5. LOGIQUE D'INSCRIPTION ET DE TOURNOI
// ================================================
/**
 * Détermine si le tournoi est complet basé sur le nombre de places et de joueurs
 */
const isTournamentFull = computed(() => {
  return (
    props.tournament.playerCap > 0 &&
    props.tournament.players.length >= props.tournament.playerCap
  );
});

/**
 * Détermine si l'utilisateur actuel est sur la liste d'attente
 */
const isUserInWaitlist = computed(() => {
  if (!props.currentPlayerId || !props.tournament.waitlistPlayers) return false;

  return props.tournament.waitlistPlayers.some((waitlistId) => {
    if (typeof waitlistId === "object") {
      return waitlistId._id === props.currentPlayerId;
    }
    return waitlistId === props.currentPlayerId;
  });
});

/**
 * Détermine si l'utilisateur actuel est inscrit au tournoi
 */
const isUserRegistered = computed(() => {
  return props.user
    ? props.tournament.players.some(
        (player) => player.userId === props.user?._id
      )
    : false;
});

/**
 * Détermine si la période de check-in est active
 * Basé soit sur la date de rappel Discord, soit sur une période de 24h avant le tournoi
 */
const isCheckInAvailable = computed(() => {
  const tournamentDate = new Date(props.tournament.date);
  const now = new Date();

  // Si la date discordReminderDate est définie, l'utiliser comme début de la période de check-in
  if (props.tournament.discordReminderDate) {
    const reminderDate = new Date(props.tournament.discordReminderDate);
    // Check-in disponible si on est après la date de rappel et avant la date du tournoi
    return now >= reminderDate && now < tournamentDate;
  } else {
    // Comportement par défaut: 24h avant le tournoi si discordReminderDate n'est pas défini
    const diff = tournamentDate.getTime() - now.getTime();
    return diff > 0 && diff <= 24 * 60 * 60 * 1000;
  }
});

/**
 * Gère le processus d'inscription avec vérification du niveau
 * Si le joueur n'a pas de niveau défini, déclenche le modal de définition de niveau
 */
const handleRegistration = async () => {
  // Vérifier que l'on a bien l'ID du joueur et du jeu
  if (!props.currentPlayerId || !props.tournament?.game?._id) {
    // Sinon, simplement ouvrir la modale d'inscription normalement
    emit(
      "open-registration",
      props.tournament,
      isTournamentFull.value ? "waitlist" : "register"
    );
    return;
  }

  try {
    // Vérifier si le niveau existe pour ce jeu
    const gameId = props.tournament.game._id;
    const playerLevel = await playerGameLevelService.getPlayerLevelForGame(
      props.currentPlayerId,
      gameId
    );

    // Si aucun niveau n'est défini, demander d'en définir un via l'événement
    if (!playerLevel) {
      emit("show-level-prompt", props.tournament.game, props.tournament._id);
    } else {
      // Sinon ouvrir la modale d'inscription normalement
      emit(
        "open-registration",
        props.tournament,
        isTournamentFull.value ? "waitlist" : "register"
      );
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du niveau:", error);
    // En cas d'erreur, continuer avec l'inscription
    emit(
      "open-registration",
      props.tournament,
      isTournamentFull.value ? "waitlist" : "register"
    );
  }
};
// #endregion

// ================================================
// #region 6. HELPERS ET FORMATAGE
// ================================================
/**
 * Obtient le jour de la semaine en français à partir d'une date
 * @param {string} dateString - La date au format ISO
 * @returns {string} Le jour de la semaine en français
 */
const getWeekday = (dateString: string) => {
  const date = new Date(dateString);
  const weekdays = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  return weekdays[date.getDay()];
};

/**
 * Formate une date ISO en format français lisible
 * @param {string} dateString - La date au format ISO
 * @returns {string} La date formatée
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
 * Formate le texte du nombre de participants avec ou sans capacité maximale
 * @returns {string} Le texte formaté pour l'affichage
 */
const formatParticipants = () => {
  const playerCount = props.tournament.players
    ? props.tournament.players.length
    : 0;

  // Si un cap est défini (supérieur à 0), on l'affiche
  if (props.tournament.playerCap && props.tournament.playerCap > 0) {
    return `${playerCount}/${props.tournament.playerCap} joueurs`;
  }

  // Sinon, on affiche simplement le nombre de joueurs
  return `${playerCount} participants`;
};

/**
 * Détermine la classe CSS pour le texte du nombre de participants
 * basé sur le ratio de remplissage du tournoi
 */
const participantsTextClass = computed(() => {
  if (!props.tournament.playerCap || props.tournament.playerCap <= 0) {
    return "text-space-text";
  }

  const playerCount = props.tournament.players
    ? props.tournament.players.length
    : 0;
  const ratio = playerCount / props.tournament.playerCap;

  if (ratio >= 1) return "text-space-error font-medium"; // Complet
  if (ratio >= 0.75) return "text-space-warning font-medium"; // Presque plein
  if (ratio >= 0.5) return "text-space-success"; // À moitié plein
  return "text-space-text-muted"; // Peu rempli
});
// #endregion

// ================================================
// #region 7. NAVIGATION ET INTERACTIONS
// ================================================
/**
 * Gère l'erreur de chargement de l'image du jeu
 * Active l'affichage du SVG de remplacement
 */
const handleImageError = () => {
  imageError.value = true;
};

/**
 * Gère la navigation vers la page de détail du tournoi
 * Ne se déclenche que si redirectOnClick est true
 */
const navigateToTournamentDetails = () => {
  if (props.redirectOnClick && props.tournament._id) {
    router.push(`/tournois/${props.tournament._id}`);
  }
};
// #endregion

// ================================================
// #region 8. CYCLE DE VIE DU COMPOSANT
// ================================================
/**
 * Au montage du composant, vérifier si le joueur a défini un niveau
 * pour le jeu du tournoi
 */
onMounted(() => {
  checkPlayerLevel();
});
// #endregion
</script>

<style scoped>
.tournament-grid-card {
  min-height: 450px;
  display: flex;
  flex-direction: column;
}

.tournament-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

/* Effet de scan spatial */
@keyframes scan-line {
  0% {
    top: 0;
    opacity: 0.5;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

.tournament-grid-card:hover::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--space-primary-light),
    transparent
  );
  animation: scan-line 2s ease-out;
  pointer-events: none;
  z-index: 10;
}

/* Limiteur de lignes */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Effet de scintillement pour les étoiles */
.star-effect {
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: white;
  border-radius: 50%;
  animation: twinkle 4s ease-in-out infinite;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.5);
  }
}

/* Ajustements responsive */
@media (max-width: 640px) {
  .tournament-grid-card {
    min-height: 400px;
  }
}

.finished-tournament {
  border: 2px solid var(--space-success) !important;
  box-shadow: 0 0 10px rgba(var(--space-success-rgb), 0.3) !important;
}
</style>
