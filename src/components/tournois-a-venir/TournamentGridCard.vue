<template>
  <div
    class="tournament-grid-card bg-black/75 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:translate-y-[-3px] relative shadow-lg cursor-pointer"
    :class="{
      'border border-green-500 shadow-green-500/30': tournament.finished,
      'border border-pink-500 shadow-pink-500/30': !tournament.finished,
    }"
    @click="navigateToTournamentDetails"
  >
    <!-- Image du jeu ou SVG par défaut -->
    <div class="aspect-[16/9] overflow-hidden relative group">
      <template v-if="tournament.game.imageUrl && !imageError">
        <img
          :src="tournament.game.imageUrl"
          :alt="tournament.game.name"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          @error="handleImageError"
        />
      </template>
      <div
        v-else
        class="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-pink-900/50"
      >
        <!-- Jolie icône SVG de jeu comme placeholder -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-20 w-20 text-pink-500/70"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
          />
        </svg>
      </div>

      <!-- Badge "Terminé" -->
      <div
        v-if="tournament.finished"
        class="absolute top-2 right-2 px-3 py-1 text-green-400 font-orbitron flex items-center bg-green-900/80 rounded-full border border-green-500/80 text-xs shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-1"
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
      </div>
    </div>

    <!-- Reste du contenu inchangé -->
    <!-- Informations du tournoi -->
    <div class="p-4">
      <!-- Nom du tournoi -->
      <h3 class="text-xl text-white font-audiowide mb-2 line-clamp-1 neon-text">
        {{ tournament.name }}
      </h3>

      <!-- Infos du tournoi -->
      <div class="font-orbitron text-sm space-y-2 mb-4">
        <!-- Date -->
        <p class="text-white flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2 text-pink-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            />
          </svg>
          {{ formatLocalDate(tournament.date) }}
        </p>

        <!-- Jeu -->
        <p class="text-white flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2 text-cyan-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clip-rule="evenodd"
            />
          </svg>
          {{ tournament.game.name }}
        </p>

        <!-- Participants -->
        <p class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2 text-purple-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
            />
          </svg>
          <!-- Appliquer la classe uniquement au texte -->
          <span :class="participantsTextClass">{{ formatParticipants() }}</span>
          <span
            v-if="isTournamentFull"
            class="ml-2 text-xs bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full"
          >
            COMPLET
          </span>
        </p>
      </div>

      <!-- Boutons d'action -->
      <div
        v-if="!tournament.finished && user"
        class="flex flex-col space-y-2 mt-4"
        @click.stop
      >
        <!-- Bouton inscription / liste d'attente  -->
        <button
          v-if="!isUserRegistered && !isUserInWaitlist"
          @click="$emit('open-registration', tournament, 'register')"
          :class="{
            'cyberpunk-btn-amber': isTournamentFull, // Utiliser amber pour liste d'attente
            'cyberpunk-btn-pink': !isTournamentFull, // Conserver pink pour inscription normale
          }"
          class="px-4 py-2 rounded-md flex items-center justify-center font-orbitron shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-sm"
        >
          <span class="mr-2 font-orbitron">
            {{
              isTournamentFull ? "Rejoindre la liste d'attente" : "S'inscrire"
            }}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3H6a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V7z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Bouton quitter la liste d'attente -->
        <button
          v-else-if="isUserInWaitlist"
          @click="$emit('open-registration', tournament, 'unregister-waitlist')"
          class="cyberpunk-btn-gray px-4 py-2 rounded-md flex items-center justify-center font-orbitron shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-sm"
        >
          <span class="mr-2">Quitter la liste d'attente</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <button
          v-else-if="isCheckInAvailable && isUserRegistered"
          @click="$emit('check-in', tournament._id, !isCheckedIn)"
          :class="{
            'cyberpunk-btn-green': isCheckedIn,
            'cyberpunk-btn-amber': !isCheckedIn,
          }"
          class="px-4 py-2 rounded-md flex items-center justify-center font-orbitron shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-sm"
        >
          <span class="mr-2">
            {{ isCheckedIn ? "Check-in confirmé" : "Check-in" }}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <button
          v-else-if="isUserRegistered"
          @click="$emit('open-registration', tournament, 'unregister')"
          class="cyberpunk-btn-gray px-4 py-2 rounded-md flex items-center justify-center font-orbitron shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-sm"
        >
          <span class="mr-2">Se désinscrire</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"; // Ajout de ref
import { useRouter } from "vue-router";
import type { Tournament } from "../../types";

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
    // Nouvelle prop pour l'ID du joueur
    type: String,
    default: null,
  },
});

const emit = defineEmits(["open-registration", "check-in"]);
const router = useRouter();
const imageError = ref(false); // Pour suivre l'état de l'erreur d'image

// Ajouter les propriétés calculées pour la liste d'attente
const isTournamentFull = computed(() => {
  return (
    props.tournament.playerCap > 0 &&
    props.tournament.players.length >= props.tournament.playerCap
  );
});

const isUserInWaitlist = computed(() => {
  if (!props.currentPlayerId || !props.tournament.waitlistPlayers) return false;

  return props.tournament.waitlistPlayers.some((waitlistId) => {
    if (typeof waitlistId === "object") {
      return waitlistId._id === props.currentPlayerId;
    }
    return waitlistId === props.currentPlayerId;
  });
});

// Vérifier si l'utilisateur est inscrit
const isUserRegistered = computed(() => {
  return props.user
    ? props.tournament.players.some(
        (player) => player.userId === props.user?._id
      )
    : false;
});

// Remplacer la propriété calculée isWithin24Hours par isCheckInAvailable
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

// Formatage de la date
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

// Version alternative avec couleur conditionnelle
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

// Classe CSS conditionnelle pour le texte du nombre de participants
const participantsTextClass = computed(() => {
  if (!props.tournament.playerCap || props.tournament.playerCap <= 0) {
    return "text-white";
  }

  const playerCount = props.tournament.players
    ? props.tournament.players.length
    : 0;
  const ratio = playerCount / props.tournament.playerCap;

  if (ratio >= 1) return "text-pink-300 font-semibold"; // Complet
  if (ratio >= 0.75) return "text-amber-300 font-semibold"; // Presque plein
  if (ratio >= 0.5) return "text-lime-300"; // À moitié plein
  return "text-gray-200"; // Peu rempli
});

// Gestion des erreurs d'image
const handleImageError = () => {
  imageError.value = true; // Mettre à jour l'état pour montrer le SVG à la place
};

// Navigation vers la page de détails du tournoi
const navigateToTournamentDetails = () => {
  if (props.redirectOnClick && props.tournament._id) {
    router.push(`/tournois/${props.tournament._id}`);
  }
};
</script>

<style scoped>
/* Styles inchangés */
.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

.neon-text {
  text-shadow: 0 0 5px rgba(236, 72, 153, 0.7), 0 0 10px rgba(236, 72, 153, 0.5);
}

/* Limiter les lignes de texte */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animation pour l'effet hover */
.tournament-grid-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px -5px rgba(236, 72, 153, 0.4);
}
</style>
