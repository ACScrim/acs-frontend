<template>
  <Card
    :variant="getTournamentCardVariant"
    :stars="true"
    :interactive="true"
    :hover="true"
    :decorated="true"
    :className="getTournamentCardClass"
    @click="navigateToTournamentDetails"
  >
    <!-- Image du jeu ou placeholder -->
    <div
      class="tournament-image aspect-[16/9] overflow-hidden relative -mx-6 -mt-6 mb-4"
    >
      <div
        v-if="tournament.game.imageUrl && !imageError"
        class="game-image-container w-full h-full overflow-hidden"
      >
        <img
          :src="tournament.game.imageUrl"
          :alt="tournament.game.name"
          class="game-image w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          @error="handleImageError"
        />
        <!-- Overlay pour améliorer la visibilité du texte -->
        <div
          class="image-overlay absolute inset-0 bg-gradient-to-t from-color-bg via-transparent to-transparent opacity-80"
        ></div>
      </div>
      <div
        v-else
        class="game-placeholder w-full h-full bg-color-bg-light/30 flex items-center justify-center"
      >
        <!-- Icône de jeu comme placeholder -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="game-icon h-20 w-20 text-color-primary/70"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
          />
        </svg>
      </div>
      <!-- Badge statut du tournoi (uniquement pour les tournois terminés) -->
      <div
        v-if="tournament.finished"
        class="tournament-status-badge absolute top-3 right-3"
      >
        <Badge
          variant="success"
          size="sm"
          className="flex items-center gap-1 font-bold shadow-md"
          style="
            background-color: rgba(var(--color-success-rgb), 1) !important;
            color: white !important;
            padding: 0.35rem 0.7rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            style="color: white !important"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          Terminé
        </Badge>
      </div>
    </div>

    <!-- Informations du tournoi -->
    <div class="tournament-info space-y-4">
      <!-- Nom du tournoi -->
      <h3 class="text-xl font-heading text-color-text line-clamp-1">
        {{ tournament.name }}
      </h3>

      <!-- Détails du tournoi -->
      <div class="space-y-2 text-sm">
        <!-- Date et heure -->
        <div class="flex items-center text-color-text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2 text-color-primary"
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
            <Badge variant="secondary" size="sm" className="mr-2">
              {{ getWeekday(tournament.date) }}
            </Badge>
            <span>{{ formatLocalDate(tournament.date) }}</span>
          </div>
        </div>

        <!-- Jeu -->
        <div class="flex items-center text-color-text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2 text-color-secondary"
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
        <!-- Participants avec couleur dynamique selon le remplissage -->
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            :style="getParticipantsDisplayStyle"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
            />
          </svg>
          <span :style="getParticipantsDisplayStyle">{{
            formatParticipants()
          }}</span>
          <Badge
            v-if="isTournamentFull"
            variant="error"
            size="sm"
            className="ml-2"
          >
            COMPLET
          </Badge>
        </div>
      </div>

      <!-- Boutons d'action -->
      <div
        v-if="!tournament.finished && user"
        class="flex flex-col space-y-2 mt-6"
        @click.stop
      >
        <!-- Bouton inscription / liste d'attente -->
        <Button
          v-if="
            !isUserRegistered && !isUserInWaitlist && !isUserRegisteredAsCaster
          "
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
        </Button>

        <!-- Bouton quitter la liste d'attente -->
        <Button
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
        </Button>

        <!-- Bouton check-in -->
        <Button
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
        </Button>

        <!-- Bouton désinscription -->
        <Button
          v-else-if="isUserRegistered && !isUserRegisteredAsCaster"
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
        </Button>

        <Button
          v-else-if="isUserRegisteredAsCaster && !isUserRegistered"
          @click="user && $emit('unregister-caster', tournament._id, user._id)"
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
          Quitter le cast
        </Button>

        <!-- Bouton définir niveau -->
        <Button
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
        </Button>
      </div>
    </div>

    <!-- Éléments décoratifs Halloween pour le tournoi fini -->
    <div
      v-if="tournament.finished"
      class="tournament-completed-decoration absolute -bottom-3 -right-3 transform rotate-12 w-16 h-16 pointer-events-none opacity-40"
    >
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        class="text-color-success"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
        />
        <path
          d="M30 50 L45 65 L70 35"
          stroke="currentColor"
          stroke-width="5"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </Card>
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
 * @event unregister-caster - Désinscrit un caster
 */
const emit = defineEmits([
  "open-registration",
  "check-in",
  "show-level-prompt",
  "unregister-caster",
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

const isUserRegisteredAsCaster = computed(() => {
  return props.user
    ? props.tournament.casters.some(
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
 * Détermine le style inline pour l'affichage des participants
 * basé sur le ratio de remplissage du tournoi - utilise des styles inline pour forcer les couleurs
 */
const getParticipantsDisplayStyle = computed(() => {
  if (!props.tournament.playerCap || props.tournament.playerCap <= 0) {
    return "color: var(--color-text); font-weight: 500;";
  }

  const percentage = fillPercentage.value;

  if (percentage >= 100) {
    return "color: var(--color-error) !important; font-weight: 700 !important;"; // Complet - rouge vif
  } else if (percentage >= 85) {
    return "color: var(--color-warning) !important; font-weight: 700 !important;"; // Presque plein (85%+) - orange
  } else if (percentage >= 60) {
    return "color: var(--color-accent) !important; font-weight: 600 !important;"; // Se remplit bien - jaune/doré
  } else if (percentage >= 30) {
    return "color: var(--color-secondary) !important; font-weight: 500 !important;"; // Quelques places prises - violet
  } else {
    return "color: var(--color-primary) !important; font-weight: 500 !important;"; // Beaucoup de places libres - bleu
  }
});

/**
 * Calcule le pourcentage de remplissage du tournoi
 */
const fillPercentage = computed(() => {
  if (!props.tournament.playerCap || props.tournament.playerCap <= 0) {
    return 0; // Pas de limite de places
  }

  const playerCount = props.tournament.players
    ? props.tournament.players.length
    : 0;
  return (playerCount / props.tournament.playerCap) * 100;
});

/**
 * Détermine la variante de couleur de la carte basée sur le remplissage
 */
const getTournamentCardVariant = computed(() => {
  if (props.tournament.finished) {
    return "success";
  }

  const percentage = fillPercentage.value;

  if (percentage >= 100) {
    return "error"; // Complet - rouge
  } else if (percentage >= 85) {
    return "warning"; // Presque plein - orange
  } else if (percentage >= 60) {
    return "accent"; // Se remplit - jaune/doré
  } else if (percentage >= 30) {
    return "secondary"; // Quelques places prises - violet
  } else {
    return "primary"; // Beaucoup de places libres - bleu
  }
});

/**
 * Détermine les classes CSS de la carte basées sur le remplissage
 */
const getTournamentCardClass = computed(() => {
  const baseClass = "tournament-grid-card h-full";
  const percentage = fillPercentage.value;

  let classes = [baseClass];

  if (props.tournament.finished) {
    classes.push("finished-tournament");
  } else if (percentage >= 100) {
    classes.push("tournament-full");
  } else if (percentage >= 85) {
    classes.push("tournament-almost-full");
  } else if (percentage >= 60) {
    classes.push("tournament-filling");
  } else if (percentage >= 30) {
    classes.push("tournament-some-places");
  } else {
    classes.push("tournament-open");
  }
  return classes.join(" ");
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
/* Composant principal - Carte de tournoi Halloween */
.tournament-grid-card {
  min-height: 450px;
  display: flex;
  flex-direction: column;
  background: var(--color-card-bg);
  border: 2px solid rgba(var(--color-primary-rgb), 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tournament-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

/* Container d'image du tournoi */
.tournament-image {
  position: relative;
  background: var(--color-bg-dark);
}

.tournament-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    transparent 0%,
    rgba(var(--color-primary-rgb), 0.1) 50%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.tournament-grid-card:hover .tournament-image::before {
  opacity: 1;
}

/* Image du jeu */
.game-image-container {
  position: relative;
}

.game-image {
  filter: brightness(0.8) contrast(1.1);
  transition: all 0.5s ease;
}

.tournament-grid-card:hover .game-image {
  filter: brightness(1) contrast(1.2);
  transform: scale(1.05);
}

.image-overlay {
  background: linear-gradient(
    to top,
    var(--color-bg) 0%,
    rgba(var(--color-bg-rgb), 0.6) 50%,
    transparent 100%
  );
}

/* Placeholder pour jeu sans image */
.game-placeholder {
  background: linear-gradient(
    135deg,
    rgba(var(--color-bg-light-rgb), 0.3),
    rgba(var(--color-bg-dark-rgb), 0.5)
  );
}

.game-icon {
  color: rgba(var(--color-primary-rgb), 0.7);
  filter: drop-shadow(0 0 8px rgba(var(--color-primary-rgb), 0.3));
}

/* Badge de statut du tournoi */
.tournament-status-badge {
  z-index: 2;
}

/* Effet mystique au hover global */
.tournament-grid-card:hover::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-primary),
    transparent
  );
  animation: mystical-scan 2s ease-out;
  pointer-events: none;
  z-index: 10;
  top: 0;
}

@keyframes mystical-scan {
  0% {
    top: 0;
    opacity: 0.8;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

/* Décoration de tournoi terminé */
.tournament-completed-decoration {
  filter: drop-shadow(0 0 10px rgba(var(--color-success-rgb), 0.6));
  animation: mystical-glow 3s ease-in-out infinite;
}

@keyframes mystical-glow {
  0%,
  100% {
    opacity: 0.4;
    transform: rotate(12deg) scale(1);
  }
  50% {
    opacity: 0.7;
    transform: rotate(12deg) scale(1.1);
  }
}

/* Limiteur de lignes */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 1;
  line-clamp: 1;
}

/* Ajustements responsive */
@media (max-width: 640px) {
  .tournament-grid-card {
    min-height: 400px;
  }
}

/* Styles pour les différents états de tournoi */
.finished-tournament {
  border: 2px solid var(--color-success) !important;
  box-shadow: var(--shadow-glow-performance) !important;
}

.tournament-full {
  border: 2px solid var(--color-error) !important;
  box-shadow: 0 0 15px rgba(var(--color-error-rgb), 0.4) !important;
  background: linear-gradient(
    135deg,
    rgba(var(--color-error-rgb), 0.1) 0%,
    rgba(var(--color-bg-rgb), 0.8) 100%
  ) !important;
}

.tournament-full:hover {
  box-shadow: var(--shadow-glow-secondary) !important;
  transform: translateY(-3px) !important;
}

.tournament-almost-full {
  border: 2px solid var(--color-warning) !important;
  box-shadow: 0 0 12px rgba(var(--color-warning-rgb), 0.35) !important;
  background: linear-gradient(
    135deg,
    rgba(var(--color-warning-rgb), 0.08) 0%,
    rgba(var(--color-bg-rgb), 0.8) 100%
  ) !important;
}

.tournament-almost-full:hover {
  box-shadow: 0 0 18px rgba(var(--color-warning-rgb), 0.5) !important;
  transform: translateY(-3px) !important;
}

.tournament-filling {
  border: 2px solid var(--color-accent) !important;
  box-shadow: var(--shadow-glow-statistics) !important;
  background: linear-gradient(
    135deg,
    rgba(var(--color-accent-rgb), 0.06) 0%,
    rgba(var(--color-bg-rgb), 0.8) 100%
  ) !important;
}

.tournament-filling:hover {
  box-shadow: var(--shadow-glow-accent) !important;
  transform: translateY(-3px) !important;
}

.tournament-some-places {
  border: 2px solid var(--color-secondary) !important;
  box-shadow: var(--shadow-glow-medals) !important;
  background: linear-gradient(
    135deg,
    rgba(var(--color-secondary-rgb), 0.04) 0%,
    rgba(var(--color-bg-rgb), 0.8) 100%
  ) !important;
}

.tournament-some-places:hover {
  box-shadow: var(--shadow-glow-secondary) !important;
  transform: translateY(-3px) !important;
}

.tournament-open {
  border: 2px solid var(--color-primary) !important;
  box-shadow: var(--shadow-glow-profile) !important;
  background: linear-gradient(
    135deg,
    rgba(var(--color-primary-rgb), 0.02) 0%,
    rgba(var(--color-bg-rgb), 0.8) 100%
  ) !important;
}

.tournament-open:hover {
  box-shadow: var(--shadow-glow-primary) !important;
  transform: translateY(-3px) !important;
}

/* Animation de pulsation mystique pour les tournois urgents */
.tournament-full,
.tournament-almost-full {
  animation: urgent-mystical-pulse 3s ease-in-out infinite;
}

@keyframes urgent-mystical-pulse {
  0%,
  100% {
    box-shadow: 0 0 15px rgba(var(--color-warning-rgb), 0.3);
  }
  50% {
    box-shadow: 0 0 25px rgba(var(--color-error-rgb), 0.6);
  }
}

/* Effet de scan personnalisé selon le niveau de remplissage */
.tournament-full:hover::after {
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-error),
    transparent
  );
}

.tournament-almost-full:hover::after {
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-warning),
    transparent
  );
}

.tournament-filling:hover::after {
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-accent),
    transparent
  );
}

.tournament-some-places:hover::after {
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-secondary),
    transparent
  );
}

.tournament-open:hover::after {
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-primary),
    transparent
  );
}

/* Animation d'apparition */
.tournament-grid-card {
  animation: fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) backwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
