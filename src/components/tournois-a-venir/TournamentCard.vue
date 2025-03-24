<template>
  <div
    class="bg-black/75 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:translate-y-[-3px] mb-8 relative shadow-lg"
    :class="{
      'border border-green-500 shadow-green-500/30': tournament.finished,
      'border border-pink-500 shadow-pink-500/30': !tournament.finished,
    }"
  >
    <!-- Header du tournoi -->
    <div
      class="bg-gray-800/80 border-b border-pink-500/50 flex flex-col md:flex-row justify-between items-start md:items-center p-4 md:p-6"
    >
      <div>
        <h2
          class="text-2xl md:text-3xl text-white font-audiowide mb-2 neon-text"
        >
          {{ tournament.name }}
        </h2>
        <div class="font-orbitron flex flex-wrap gap-4 mb-2">
          <p class="text-white flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-pink-500"
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
          <p class="text-white flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-cyan-500"
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
          <p class="text-white flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-purple-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clip-rule="evenodd"
              />
            </svg>
            {{ tournament.discordChannelName }}
          </p>
        </div>
      </div>

      <!-- Boutons d'action -->
      <div v-if="!tournament.finished && user" class="mt-4 md:mt-0">
        <button
          v-if="!isUserRegistered"
          @click="$emit('open-registration', tournament, 'register')"
          class="cyberpunk-btn-pink px-6 py-2.5 rounded-md flex items-center justify-center font-orbitron shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          <span class="mr-2 font-orbitron">S'inscrire</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
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
        <button
          v-else-if="isWithin24Hours"
          @click="$emit('check-in', tournament._id, !isCheckedIn)"
          :class="{
            'cyberpunk-btn-green': isCheckedIn,
            'cyberpunk-btn-amber': !isCheckedIn,
          }"
          class="px-6 py-2.5 rounded-md flex items-center justify-center font-orbitron shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          <span class="mr-2">
            {{ isCheckedIn ? "Check-in confirmé" : "Check-in" }}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
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
          v-else
          @click="$emit('open-registration', tournament, 'unregister')"
          class="cyberpunk-btn-gray px-6 py-2.5 rounded-md flex items-center justify-center font-orbitron shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          <span class="mr-2">Se désinscrire</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
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

    <!-- Navigation d'onglets -->
    <div class="tournament-tabs flex justify-start border-b border-gray-700">
      <button
        @click="$emit('toggle-tab', tournament._id, 'participants')"
        :class="{
          'text-pink-500 border-b-2 border-pink-500 bg-pink-500/10':
            showParticipants,
          'text-gray-400 border-b-2 border-transparent hover:text-gray-300 hover:bg-gray-500/10':
            !showParticipants,
        }"
        class="tab-button flex items-center px-6 py-3 font-orbitron transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
          />
        </svg>
        Participants
        <span class="ml-1 text-sm opacity-80">
          ({{ getParticipantsCount() }})
        </span>
      </button>
      <button
        @click="$emit('toggle-tab', tournament._id, 'description')"
        :class="{
          'text-pink-500 border-b-2 border-pink-500 bg-pink-500/10':
            showDescription,
          'text-gray-400 border-b-2 border-transparent hover:text-gray-300 hover:bg-gray-500/10':
            !showDescription,
        }"
        class="tab-button flex items-center px-6 py-3 font-orbitron transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z"
            clip-rule="evenodd"
          />
        </svg>
        Description
      </button>
      <button
        v-if="tournament.finished"
        @click="togglePodium"
        :class="{
          'text-green-400 border-b-2 border-green-500 bg-green-900/20':
            showPodium,
          'text-gray-400 border-b-2 border-transparent hover:text-green-400 hover:bg-green-900/10':
            !showPodium,
        }"
        class="tab-button flex items-center px-6 py-3 font-orbitron transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <rect x="8" y="7" width="8" height="12" rx="1" stroke-width="1.5" />
          <rect x="16" y="11" width="5" height="8" rx="1" stroke-width="1.5" />
          <rect x="3" y="13" width="5" height="6" rx="1" stroke-width="1.5" />
        </svg>
        Résultats
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 ml-1 transition-transform"
          :class="showPodium ? 'rotate-180' : ''"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div class="flex-grow"></div>
      <div
        v-if="tournament.finished"
        class="px-4 py-2 text-green-400 font-orbitron flex items-center bg-green-900/20 border-b-2 border-green-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        Terminé
      </div>
    </div>

    <!-- Contenu des onglets -->
    <div class="tournament-content p-4 md:p-6 bg-black/80">
      <!-- Onglet participants -->
      <div
        v-if="showParticipants"
        class="min-h-[150px] animate__animated animate__fadeIn"
      >
        <h3 class="text-xl text-white font-audiowide mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-2 text-pink-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
            />
          </svg>
          Participants
        </h3>

        <div
          v-if="tournament.teams && tournament.teams.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div
            v-for="team in tournament.teams"
            :key="team._id"
            class="bg-gray-800/80 p-4 rounded-lg border border-purple-500/50 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
          >
            <h4
              class="text-lg text-white font-orbitron border-b border-purple-500/50 pb-2 mb-2"
            >
              {{ team.name }}
            </h4>
            <ul class="space-y-1">
              <li
                v-for="player in team.players"
                :key="player._id"
                class="text-white flex items-center p-2 bg-gray-900/50 rounded-md border-l-2 border-purple-400/50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2 text-purple-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ player.username }}
              </li>
            </ul>
          </div>
        </div>

        <ul
          v-else-if="tournament.players && tournament.players.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
        >
          <li
            v-for="player in tournament.players"
            :key="player._id"
            class="text-white bg-gray-800/80 p-3 rounded-lg flex items-center border-l-2 border-pink-400/50 hover:bg-gray-700/80 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2 text-pink-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              />
            </svg>
            {{ player.username }}
          </li>
        </ul>
        <p v-else class="text-gray-400 italic py-4 text-center font-orbitron">
          Aucune équipe inscrite pour ce tournoi.
        </p>
      </div>

      <!-- Onglet description -->
      <div
        v-if="showDescription"
        class="min-h-[150px] animate__animated animate__fadeIn"
      >
        <h3 class="text-xl text-white font-audiowide mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-2 text-pink-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z"
              clip-rule="evenodd"
            />
          </svg>
          Description
        </h3>
        <div
          class="bg-gray-800/80 p-4 rounded-lg border border-cyan-900/50 shadow-lg shadow-cyan-900/20"
        >
          <p
            v-if="tournament.description"
            class="text-white leading-relaxed description-text"
            v-html="formatDescription(tournament.description)"
          ></p>
          <p v-else class="text-gray-400 italic font-orbitron">
            Pas de description disponible pour ce tournoi.
          </p>
        </div>
      </div>

      <!-- Résultats (si tournoi terminé) -->
      <tournament-podium
        v-if="tournament.finished && showPodium"
        :tournament="tournament"
        :is-other-rankings-expanded="showOtherRankings"
        @toggle-other-rankings="$emit('toggle-other-rankings', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from "vue";
import type { Tournament } from "../../types";
import TournamentPodium from "./TournamentPodium.vue";

const showPodium = ref(false);

// Dans la partie script, ajoutez la propriété showOtherRankings
const props = defineProps({
  tournament: {
    type: Object as () => Tournament,
    required: true,
  },
  user: {
    type: Object,
    default: null,
  },
  showParticipants: {
    type: Boolean,
    default: false,
  },
  showDescription: {
    type: Boolean,
    default: false,
  },
  isCheckedIn: {
    type: Boolean,
    default: false,
  },
  showOtherRankings: {
    type: Boolean,
    default: false,
  },
});

// Mettez à jour la liste des événements émis pour inclure toggle-other-rankings
const emit = defineEmits([
  "toggle-tab",
  "open-registration",
  "check-in",
  "toggle-other-rankings",
]);

const togglePodium = () => {
  showPodium.value = !showPodium.value;
};

const isUserRegistered = computed(() => {
  return props.user
    ? props.tournament.players.some(
        (player) => player.userId === props.user?._id
      )
    : false;
});

const isWithin24Hours = computed(() => {
  const tournamentDate = new Date(props.tournament.date);
  const now = new Date();
  const diff = tournamentDate.getTime() - now.getTime();
  return diff > 0 && diff <= 24 * 60 * 60 * 1000;
});

// Formatage de date
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

// Fonction pour compter le nombre de participants
const getParticipantsCount = () => {
  if (props.tournament.teams && props.tournament.teams.length > 0) {
    // Si le tournoi est en équipes, compter le nombre total de joueurs dans toutes les équipes
    return props.tournament.teams.reduce((total, team) => {
      return total + (team.players ? team.players.length : 0);
    }, 0);
  } else if (props.tournament.players) {
    // Sinon, renvoyer le nombre de joueurs inscrits individuellement
    return props.tournament.players.length;
  }
  return 0;
};

// Ajouter cette fonction dans la partie script
const formatDescription = (description: string) => {
  if (!description) return "";

  // Remplacer les points (suivis d'un espace ou d'un caractère) par un point et un saut de ligne
  return description
    .replace(/\.(\s|$)/g, ".<br>$1") // Ajouter un saut de ligne après chaque point
    .replace(/<br>$/, ""); // Supprimer le dernier saut de ligne s'il existe
};
</script>

<style scoped>
/* Boutons cyberpunk améliorés */
.cyberpunk-btn-pink {
  background: linear-gradient(135deg, #9d174d, #ec4899);
  color: white;
  border: 1px solid #f472b6;
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.4),
    inset 0 0 5px rgba(236, 72, 153, 0.4);
  position: relative;
  overflow: hidden;
}

.cyberpunk-btn-pink:hover {
  background: linear-gradient(135deg, #ec4899, #f472b6);
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.7),
    inset 0 0 10px rgba(236, 72, 153, 0.7);
}

.cyberpunk-btn-pink::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transform: rotate(45deg);
  animation: shimmer 2s infinite;
  z-index: 1;
}

.cyberpunk-btn-amber {
  background: linear-gradient(135deg, #92400e, #f59e0b);
  color: white;
  border: 1px solid #fbbf24;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.4),
    inset 0 0 5px rgba(245, 158, 11, 0.4);
  position: relative;
  overflow: hidden;
}

.cyberpunk-btn-amber:hover {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
  box-shadow: 0 0 15px rgba(245, 158, 11, 0.7),
    inset 0 0 10px rgba(245, 158, 11, 0.7);
}

.cyberpunk-btn-amber::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transform: rotate(45deg);
  animation: shimmer 2s infinite;
  z-index: 1;
}

.cyberpunk-btn-green {
  background: linear-gradient(135deg, #064e3b, #10b981);
  color: white;
  border: 1px solid #34d399;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.4),
    inset 0 0 5px rgba(16, 185, 129, 0.4);
  position: relative;
  overflow: hidden;
}

.cyberpunk-btn-green:hover {
  background: linear-gradient(135deg, #10b981, #34d399);
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.7),
    inset 0 0 10px rgba(16, 185, 129, 0.7);
}

.cyberpunk-btn-green::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transform: rotate(45deg);
  animation: shimmer 2s infinite;
  z-index: 1;
}

.cyberpunk-btn-gray {
  background: linear-gradient(135deg, #374151, #4b5563);
  color: white;
  border: 1px solid #6b7280;
  box-shadow: 0 0 10px rgba(107, 114, 128, 0.4),
    inset 0 0 5px rgba(107, 114, 128, 0.4);
  position: relative;
  overflow: hidden;
}

.cyberpunk-btn-gray:hover {
  background: linear-gradient(135deg, #4b5563, #6b7280);
  box-shadow: 0 0 15px rgba(107, 114, 128, 0.7),
    inset 0 0 10px rgba(107, 114, 128, 0.7);
}

.cyberpunk-btn-gray::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transform: rotate(45deg);
  animation: shimmer 3s infinite;
  z-index: 1;
}

/* Style d'onglets */
.tab-button {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.tab-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent,
    rgba(236, 72, 153, 0.1),
    transparent
  );
  z-index: -1;
  transform: translateX(-100%);
  transition: transform 0.5s;
}

.tab-button:hover::before {
  transform: translateX(100%);
}

/* Styles des cartes pour les états du tournoi */
.tournament-finished {
  box-shadow: 0 0 15px rgba(74, 222, 128, 0.1);
}

.tournament-upcoming {
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.1);
}

@keyframes shimmer {
  0% {
    transform: translate(-50%, -50%) rotate(45deg) translateX(-100%);
  }
  100% {
    transform: translate(-50%, -50%) rotate(45deg) translateX(100%);
  }
}

/* Animation pour la transition du contenu */
.animate__fadeIn {
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Ajouter dans la section style */
.description-text {
  font-family: "Roboto", "Arial", sans-serif; /* Police plus lisible */
  line-height: 1.6;
  letter-spacing: 0.3px;
  font-size: 0.95rem;
  font-weight: 300;
  text-shadow: 0 0 2px rgba(255, 255, 255, 0.1);
}

/* Améliorations du conteneur de description */
.bg-gray-800\/80 {
  backdrop-filter: blur(5px);
  padding: 1.25rem;
  border-radius: 8px;
}

/* Animation subtile pour le texte */
@keyframes gentle-glow {
  0%,
  100% {
    text-shadow: 0 0 2px rgba(255, 255, 255, 0.1);
  }
  50% {
    text-shadow: 0 0 4px rgba(6, 182, 212, 0.2);
  }
}

.description-text {
  animation: gentle-glow 4s infinite;
}

/* Style pour les sauts de ligne */
.description-text br {
  display: block;
  content: "";
  margin-top: 0.5rem;
}
</style>
