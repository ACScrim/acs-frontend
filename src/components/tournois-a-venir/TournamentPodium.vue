<template>
  <div
    class="mt-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6 rounded-xl border border-indigo-500/50 shadow-lg backdrop-blur-sm"
  >
    <h3 class="text-xl text-white font-audiowide mb-4 flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mr-2 text-amber-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>
      <span class="glow-text text-pink-300">Classement final</span>
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
      <!-- Podium -->
      <div class="col-span-1 md:col-span-3 mb-8">
        <div class="relative mt-24 md:mt-32 mb-12 podium-container">
          <!-- Le podium physique -->
          <div class="flex justify-center items-end h-40 md:h-52">
            <!-- 2ème place -->
            <div class="w-1/4 md:w-1/5 relative">
              <div class="silver-podium h-24 md:h-32 rounded-t-lg"></div>
              <div
                class="absolute top-0 left-0 right-0 transform -translate-y-20 md:-translate-y-24"
              >
                <div
                  class="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center border-4 border-gray-200 shadow-xl"
                >
                  <span class="text-2xl md:text-3xl">🥈</span>
                </div>
              </div>
            </div>

            <!-- 1ère place -->
            <div class="w-1/4 md:w-1/5 relative mx-1 md:mx-3 z-10">
              <div class="gold-podium h-32 md:h-40 rounded-t-lg"></div>
              <div
                class="absolute top-0 left-0 right-0 transform -translate-y-24 md:-translate-y-28"
              >
                <div
                  class="mx-auto w-20 h-20 md:w-24 md:h-24 gold-circle rounded-full flex items-center justify-center border-4 border-amber-400 shadow-xl"
                >
                  <span class="text-3xl md:text-4xl">🏆</span>
                </div>
              </div>
            </div>

            <!-- 3ème place -->
            <div class="w-1/4 md:w-1/5 relative">
              <div class="bronze-podium h-16 md:h-24 rounded-t-lg"></div>
              <div
                class="absolute top-0 left-0 right-0 transform -translate-y-16 md:-translate-y-20"
              >
                <div
                  class="mx-auto w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-amber-700 to-amber-800 rounded-full flex items-center justify-center border-4 border-amber-700 shadow-xl"
                >
                  <span class="text-xl md:text-2xl">🥉</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Les équipes gagnantes sur le podium -->
          <div class="flex justify-center mt-8">
            <!-- 2ème place équipes -->
            <div class="w-1/3 px-1 md:px-2">
              <h4
                v-if="getTeamsByRank(2).length > 0"
                class="text-sm md:text-base font-audiowide text-gray-300 mb-2 text-center"
              >
                🥈
                {{ getTeamsByRank(2).length > 1 ? "Ex aequo" : "Argent" }}
              </h4>
              <div class="space-y-2">
                <div
                  v-for="team in getTeamsByRank(2)"
                  :key="team._id"
                  class="bg-gradient-to-br from-gray-700/70 to-gray-600/70 text-white p-3 rounded-lg border-2 border-gray-400/80 shadow-lg transform transition-transform hover:scale-105 team-card-silver"
                >
                  <p
                    class="font-bold text-sm md:text-base font-audiowide truncate text-center"
                  >
                    {{ team.name }}
                  </p>
                  <div
                    v-if="team.players && team.players.length > 0"
                    class="mt-2 space-y-1"
                  >
                    <div
                      v-for="player in team.players"
                      :key="player._id"
                      class="text-xs bg-gray-800/50 p-2 rounded flex items-center player-card"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-2 text-indigo-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="truncate font-orbitron">{{
                        player.username
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 1ère place équipes -->
            <div class="w-1/3 px-1 md:px-2 -mt-4">
              <h4
                v-if="getTeamsByRank(1).length > 0"
                class="text-sm md:text-lg font-audiowide text-yellow-400 mb-2 text-center glow-gold"
              >
                🏆
                {{ getTeamsByRank(1).length > 1 ? "Ex aequo" : "Champion" }}
              </h4>
              <div class="space-y-2">
                <div
                  v-for="team in getTeamsByRank(1)"
                  :key="team._id"
                  class="bg-gradient-to-br from-amber-700/70 to-yellow-600/70 p-3 rounded-lg border-2 border-yellow-500 shadow-lg shadow-yellow-500/30 transform transition-transform hover:scale-105 team-card-gold"
                >
                  <p
                    class="font-bold text-sm md:text-base text-white font-audiowide truncate text-center"
                  >
                    {{ team.name }}
                  </p>
                  <div
                    v-if="team.players && team.players.length > 0"
                    class="mt-2 space-y-1"
                  >
                    <div
                      v-for="player in team.players"
                      :key="player._id"
                      class="text-xs bg-gray-800/50 p-2 rounded flex items-center player-card-gold"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-2 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="truncate font-orbitron">{{
                        player.username
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 3ème place équipes -->
            <div class="w-1/3 px-1 md:px-2">
              <h4
                v-if="getTeamsByRank(3).length > 0"
                class="text-sm md:text-base font-audiowide text-amber-700 mb-2 text-center"
              >
                🥉
                {{ getTeamsByRank(3).length > 1 ? "Ex aequo" : "Bronze" }}
              </h4>
              <div class="space-y-2">
                <div
                  v-for="team in getTeamsByRank(3)"
                  :key="team._id"
                  class="bg-gradient-to-br from-amber-900/70 to-amber-700/70 text-white p-3 rounded-lg border-2 border-amber-700/80 shadow-lg transform transition-transform hover:scale-105 team-card-bronze"
                >
                  <p
                    class="font-bold text-sm md:text-base font-audiowide truncate text-center"
                  >
                    {{ team.name }}
                  </p>
                  <div
                    v-if="team.players && team.players.length > 0"
                    class="mt-2 space-y-1"
                  >
                    <div
                      v-for="player in team.players"
                      :key="player._id"
                      class="text-xs bg-gray-800/50 p-2 rounded flex items-center player-card-bronze"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-2 text-amber-700"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="truncate font-orbitron">{{
                        player.username
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Autres classements -->
      <div class="col-span-1 md:col-span-3 mt-12">
        <!-- En-tête dépliable -->
        <button
          @click="handleToggleOtherRankings"
          class="cyberpunk-accordion w-full text-left p-4 bg-gray-800/70 rounded-lg border border-indigo-500/50 flex justify-between items-center hover:bg-indigo-900/30 transition-colors"
        >
          <h3 class="text-xl text-white font-audiowide flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2 text-indigo-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fill-rule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clip-rule="evenodd"
              />
            </svg>
            Autres classements
            <span class="text-sm text-gray-400 ml-2 font-orbitron">
              ({{
                (tournament.teams ?? []).filter(
                  (t) => t.ranking > 3 || !t.ranking || t.ranking === 0
                ).length
              }}
              équipes)
            </span>
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            :class="[
              isOtherRankingsExpanded ? 'transform rotate-180' : '',
              'h-5 w-5 text-indigo-400 transition-transform',
            ]"
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
        </button>

        <!-- Remplacer la partie du contenu dépliable par ceci -->
        <div
          v-if="isOtherRankingsExpanded"
          class="mt-4 space-y-8 bg-gray-900/50 p-6 rounded-lg border border-indigo-500/30 animate__animated animate__fadeIn shadow-inner backdrop-blur-sm"
        >
          <!-- Affichage en tableau pour toutes les équipes au-delà du podium, peu importe leur nombre -->
          <div class="overflow-x-auto">
            <table class="min-w-full text-white">
              <thead>
                <tr class="bg-gray-800/80 border-b border-pink-500/50">
                  <th
                    class="py-3 px-4 text-center font-audiowide text-pink-400"
                  >
                    Position
                  </th>
                  <th class="py-3 px-4 text-left font-audiowide text-pink-400">
                    Équipe
                  </th>
                  <th
                    class="py-3 px-4 text-center font-audiowide text-pink-400"
                  >
                    Membres
                  </th>
                </tr>
              </thead>
              <tbody>
                <!-- Équipes avec classement (rang > 3) -->
                <tr
                  v-for="team in sortedTeamsBeyondPodium"
                  :key="team._id"
                  :class="{
                    'bg-purple-900/20':
                      sortedTeamsBeyondPodium.indexOf(team) % 2 === 0,
                    'hover:bg-cyan-900/20': true,
                  }"
                  class="transition-colors border-b border-gray-700/50"
                >
                  <td class="py-3 px-4 text-center font-orbitron">
                    <span
                      class="px-3 py-1 rounded-lg"
                      :class="{
                        'bg-indigo-900/70 text-white position-badge':
                          team.ranking > 0,
                        'bg-gray-700/50': !team.ranking || team.ranking === 0,
                      }"
                    >
                      {{ team.ranking > 0 ? `${team.ranking}e` : "NC" }}
                    </span>
                  </td>
                  <td class="py-3 px-4 font-audiowide text-left">
                    {{ team.name }}
                  </td>
                  <td class="py-3 px-4">
                    <div class="flex flex-wrap gap-1 justify-center">
                      <span
                        v-for="player in team.players"
                        :key="player._id"
                        class="text-xs bg-gray-800/80 px-2 py-1 rounded inline-flex items-center player-pill"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3 w-3 mr-1 text-indigo-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="truncate max-w-[100px]">{{
                          player.username
                        }}</span>
                      </span>
                    </div>
                  </td>
                </tr>

                <!-- Équipes non classées -->
                <tr
                  v-for="team in unrankedTeams"
                  :key="team._id"
                  :class="{
                    'bg-gray-800/40': unrankedTeams.indexOf(team) % 2 === 0,
                    'hover:bg-gray-700/30': true,
                  }"
                  class="transition-colors border-b border-gray-700/50 text-gray-400"
                >
                  <td class="py-3 px-4 text-center font-orbitron">
                    <span class="px-3 py-1 rounded-lg bg-gray-700/50">
                      NC
                    </span>
                  </td>
                  <td class="py-3 px-4 font-audiowide text-left">
                    {{ team.name }}
                  </td>
                  <td class="py-3 px-4">
                    <div class="flex flex-wrap gap-1 justify-center">
                      <span
                        v-for="player in team.players"
                        :key="player._id"
                        class="text-xs bg-gray-800/80 px-2 py-1 rounded inline-flex items-center player-pill-unranked"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3 w-3 mr-1 text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="truncate max-w-[100px]">{{
                          player.username
                        }}</span>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Message s'il n'y a pas d'équipes classées au-delà du podium -->
          <div
            v-if="
              !(tournament.teams ?? []).some((t) => t.ranking > 3) &&
              !(tournament.teams ?? []).some(
                (t) => !t.ranking || t.ranking === 0
              )
            "
            class="p-6 text-center text-gray-400 italic font-orbitron"
          >
            Pas d'autres équipes classées au-delà du podium.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Tournament } from "../../types";

const props = defineProps({
  tournament: {
    type: Object as () => Tournament,
    required: true,
  },
  isOtherRankingsExpanded: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggle-other-rankings"]);

/**
 * Récupère toutes les équipes ayant un rang spécifique dans le tournoi
 * @param rank - Rang à rechercher (1=or, 2=argent, 3=bronze, etc.)
 * @returns Tableau d'équipes ayant ce rang
 */
const getTeamsByRank = (rank: number) => {
  return (props.tournament?.teams ?? []).filter(
    (team) => team.ranking === rank
  );
};

/**
 * Propriété calculée qui trie et retourne les équipes au-delà du podium (rank > 3)
 */
const sortedTeamsBeyondPodium = computed(() => {
  return (props.tournament?.teams ?? [])
    .filter((team) => team.ranking > 3)
    .sort((a, b) => a.ranking - b.ranking);
});

/**
 * Propriété calculée qui retourne les équipes non classées
 */
const unrankedTeams = computed(() => {
  return (props.tournament?.teams ?? []).filter(
    (team) => !team.ranking || team.ranking === 0
  );
});

// Dans le script, ajoutez une fonction explicite pour gérer le clic
const handleToggleOtherRankings = () => {
  emit("toggle-other-rankings", props.tournament._id);
};
</script>

<style scoped>
/* Typographie spéciale */
.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

/* Effets néon et glow */
.glow-text {
  text-shadow: 0 0 5px rgba(232, 121, 249, 0.7),
    0 0 10px rgba(232, 121, 249, 0.5);
  animation: glow-pulse-pink 2s infinite alternate;
}

.glow-text-sm {
  text-shadow: 0 0 3px rgba(165, 180, 252, 0.7),
    0 0 6px rgba(165, 180, 252, 0.5);
}

.glow-gold {
  text-shadow: 0 0 5px rgba(251, 191, 36, 0.7), 0 0 10px rgba(251, 191, 36, 0.5);
  animation: glow-pulse-gold 2s infinite alternate;
}

@keyframes glow-pulse-pink {
  from {
    text-shadow: 0 0 5px rgba(232, 121, 249, 0.7),
      0 0 10px rgba(232, 121, 249, 0.5);
  }
  to {
    text-shadow: 0 0 8px rgba(232, 121, 249, 0.9),
      0 0 15px rgba(232, 121, 249, 0.7);
  }
}

@keyframes glow-pulse-gold {
  from {
    text-shadow: 0 0 5px rgba(251, 191, 36, 0.7),
      0 0 10px rgba(251, 191, 36, 0.5);
  }
  to {
    text-shadow: 0 0 8px rgba(251, 191, 36, 0.9),
      0 0 15px rgba(251, 191, 36, 0.7);
  }
}

/* Styles pour le podium */
.gold-podium {
  background: linear-gradient(to bottom, #f59e0b, #d97706);
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
  position: relative;
  overflow: hidden;
}

.gold-podium::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.5),
    transparent
  );
  animation: shine 3s infinite ease-in-out;
}

.silver-podium {
  background: linear-gradient(to bottom, #9ca3af, #6b7280);
  box-shadow: 0 0 15px rgba(156, 163, 175, 0.5);
  position: relative;
  overflow: hidden;
}

.silver-podium::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shine 3s infinite 0.5s ease-in-out;
}

.bronze-podium {
  background: linear-gradient(to bottom, #92400e, #78350f);
  box-shadow: 0 0 15px rgba(146, 64, 14, 0.5);
  position: relative;
  overflow: hidden;
}

.bronze-podium::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: shine 3s infinite 1s ease-in-out;
}

.gold-circle {
  background: linear-gradient(135deg, #f59e0b, #b45309);
  box-shadow: 0 0 30px rgba(245, 158, 11, 0.6);
  animation: pulse-gold 2s infinite;
  position: relative;
  overflow: hidden;
}

.gold-circle::after {
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
  animation: circle-shine 4s infinite;
}

/* Animation pour la transition du contenu */
.animate__fadeIn {
  animation: fadeIn 0.3s;
}

/* Effet plus prononcé pour les cartes du podium */
.team-card-gold,
.team-card-silver,
.team-card-bronze {
  animation: pulse-border 4s infinite;
}

/* Effet cyberpunk pour les cartes du podium */
.team-card-gold {
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
}

.team-card-gold::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(
    45deg,
    rgba(245, 158, 11, 0.4),
    rgba(255, 200, 0, 0.4)
  );
  z-index: -1;
  transform: scale(1.05);
  animation: border-pulse-gold 3s infinite;
}

.team-card-gold::after {
  content: "";
  position: absolute;
  inset: -1px;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(245, 158, 11, 0.4),
    transparent
  );
  z-index: -1;
  animation: cyber-gold-pulse 3s infinite;
}

.team-card-silver {
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(156, 163, 175, 0.5);
}

.team-card-silver::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(
    45deg,
    rgba(156, 163, 175, 0.4),
    rgba(209, 213, 219, 0.4)
  );
  z-index: -1;
  transform: scale(1.05);
  animation: border-pulse-silver 3s infinite;
}

.team-card-silver::after {
  content: "";
  position: absolute;
  inset: -1px;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(156, 163, 175, 0.4),
    transparent
  );
  z-index: -1;
  animation: cyber-silver-pulse 3s infinite;
}

.team-card-bronze {
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(146, 64, 14, 0.3);
}

.team-card-bronze::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(
    45deg,
    rgba(146, 64, 14, 0.4),
    rgba(180, 83, 9, 0.4)
  );
  z-index: -1;
  transform: scale(1.05);
  animation: border-pulse-bronze 3s infinite;
}

.team-card-bronze::after {
  content: "";
  position: absolute;
  inset: -1px;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(146, 64, 14, 0.4),
    transparent
  );
  z-index: -1;
  animation: cyber-bronze-pulse 3s infinite;
}

/* Animation de distorsion pour les titres d'équipe */
.team-card-gold h5,
.team-card-silver h5,
.team-card-bronze h5 {
  position: relative;
  animation: cyber-glitch 8s infinite;
}

/* Bouton accordéon cyberpunk */
.cyberpunk-accordion {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.cyberpunk-accordion:hover {
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.3);
}

.cyberpunk-accordion::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(to bottom, #4f46e5, #6366f1, #818cf8);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cyberpunk-accordion:hover::before {
  opacity: 1;
}

.cyberpunk-accordion::after {
  content: "";
  position: absolute;
  left: -5px;
  top: 0;
  width: 5px;
  height: 100%;
  background: linear-gradient(to bottom, #4f46e5, #6366f1, #818cf8);
  transition: transform 0.3s ease;
  transform: translateX(0);
}

.cyberpunk-accordion:hover::after {
  transform: translateX(5px);
}

/* Améliorations des cartes de joueurs */
.player-card {
  color: #ffffff;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  background-color: rgba(55, 65, 81, 0.8);
  border-left: 2px solid rgba(99, 102, 241, 0.6);
  transition: all 0.2s ease-in-out;
}

.player-card:hover {
  background-color: rgba(55, 65, 81, 0.9);
  border-left-width: 3px;
  transform: translateX(2px);
}

.player-card-gold {
  color: #ffffff;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  background-color: rgba(55, 65, 81, 0.8);
  border-left: 2px solid rgba(245, 158, 11, 0.6);
  transition: all 0.2s ease-in-out;
}

.player-card-gold:hover {
  background-color: rgba(55, 65, 81, 0.9);
  border-left-width: 3px;
  transform: translateX(2px);
}

.player-card-bronze {
  color: #ffffff;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  background-color: rgba(55, 65, 81, 0.8);
  border-left: 2px solid rgba(146, 64, 14, 0.6);
  transition: all 0.2s ease-in-out;
}

.player-card-bronze:hover {
  background-color: rgba(55, 65, 81, 0.9);
  border-left-width: 3px;
  transform: translateX(2px);
}

/* Animations */
@keyframes shine {
  0%,
  100% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
}

@keyframes circle-shine {
  0% {
    transform: translate(-50%, -50%) rotate(45deg) translateX(-100%);
  }
  100% {
    transform: translate(-50%, -50%) rotate(45deg) translateX(100%);
  }
}

@keyframes pulse-gold {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(245, 158, 11, 0.6);
  }
  50% {
    box-shadow: 0 0 30px rgba(245, 158, 11, 0.8);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cyber-gold-pulse {
  0%,
  100% {
    opacity: 0.7;
    background-position: 0% 50%;
  }
  50% {
    opacity: 0.9;
    background-position: 100% 50%;
  }
}

@keyframes cyber-silver-pulse {
  0%,
  100% {
    opacity: 0.7;
    background-position: 0% 50%;
  }
  50% {
    opacity: 0.9;
    background-position: 100% 50%;
  }
}

@keyframes cyber-bronze-pulse {
  0%,
  100% {
    opacity: 0.7;
    background-position: 0% 50%;
  }
  50% {
    opacity: 0.9;
    background-position: 100% 50%;
  }
}

@keyframes cyber-glitch {
  0%,
  100% {
    transform: translate(0);
    text-shadow: 0 0 4px currentColor;
  }
  92% {
    transform: translate(0);
    text-shadow: 0 0 4px currentColor;
  }
  93% {
    transform: translate(3px, -3px);
    text-shadow: -2px 3px 0 rgba(236, 72, 153, 0.7);
  }
  94% {
    transform: translate(-3px, 3px);
    text-shadow: 2px -3px 0 rgba(139, 92, 246, 0.7);
  }
  95% {
    transform: translate(0);
    text-shadow: 0 0 4px currentColor;
  }
  96% {
    transform: translate(-5px, 0);
    text-shadow: 3px 0 0 rgba(245, 158, 11, 0.7);
  }
  97% {
    transform: translate(5px, 0);
    text-shadow: -3px 0 0 rgba(19, 78, 208, 0.7);
  }
  98% {
    transform: translate(0);
    text-shadow: 0 0 4px currentColor;
  }
}

@keyframes border-pulse-gold {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.4;
  }
}

@keyframes border-pulse-silver {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.4;
  }
}

@keyframes border-pulse-bronze {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.4;
  }
}

@keyframes border-pulse-unranked {
  0%,
  100% {
    opacity: 0.4;
    box-shadow: 0 0 5px rgba(99, 102, 241, 0.3);
  }
  50% {
    opacity: 0.2;
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.5);
  }
}

/* Styles pour le tableau compact */
table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
}

th {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.85rem;
  background: linear-gradient(
    to right,
    rgba(79, 70, 229, 0.2),
    rgba(236, 72, 153, 0.2)
  );
}

tbody tr {
  position: relative;
  overflow: hidden;
}

tbody tr::after {
  content: "";
  position: absolute;
  left: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(to right, rgba(124, 58, 237, 0.2), transparent);
  transition: width 0.3s ease;
  z-index: -1;
  top: 0;
}

tbody tr:hover::after {
  width: 100%;
}

/* Styles pour les pilules de joueurs en mode tableau */
.player-pill {
  background-color: rgba(79, 70, 229, 0.2);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.player-pill:hover {
  background-color: rgba(79, 70, 229, 0.4);
  transform: translateY(-1px);
}

.player-pill-unranked {
  background-color: rgba(75, 85, 99, 0.2);
  border: 1px solid rgba(107, 114, 128, 0.3);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.player-pill-unranked:hover {
  background-color: rgba(75, 85, 99, 0.4);
  transform: translateY(-1px);
}
</style>
