<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\Profil.vue -->
<template>
  <div class="container mx-auto p-4 pt-20 min-h-screen">
    <!-- Navigation latérale -->
    <div
      class="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
    >
      <div
        class="bg-black/90 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-3 space-y-1 shadow-lg shadow-cyan-500/20"
      >
        <div class="text-xs text-cyan-400 font-orbitron mb-2 px-2 text-center">
          NAVIGATION
        </div>

        <button
          v-for="section in navigationSections"
          :key="section.id"
          @click="scrollToSection(section.id)"
          :class="[
            'w-full text-left px-3 py-2 text-xs font-orbitron rounded transition-all duration-200 flex items-center space-x-2',
            activeSection === section.id
              ? 'bg-cyan-500/20 text-cyan-300 border-l-2 border-cyan-400 shadow-glow-cyan'
              : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-900/20',
          ]"
          :title="section.label"
        >
          <svg
            class="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            v-html="section.icon"
          ></svg>
          <span class="truncate">{{ section.shortLabel }}</span>
        </button>
      </div>
    </div>
    <!-- État d'erreur -->
    <CyberTerminal
      v-if="error"
      command="get_player_profile --id=${route.params.id}"
      errorCode="ERROR_404_PLAYER_NOT_FOUND"
      :message="error"
      title="SYSTÈME DE PROFIL · ACS"
      class="max-w-4xl mx-auto my-8"
    />

    <!-- Profil du joueur -->
    <div v-else-if="player" class="max-w-4xl mx-auto">
      <!-- En-tête du profil -->
      <div
        id="profil"
        class="bg-black/50 backdrop-blur-2xl rounded-lg p-8 mb-8 border border-pink-500 shadow-lg shadow-pink-500/30"
      >
        <div class="flex items-center justify-center mb-4">
          <div class="avatar-container mr-4">
            <img
              v-if="user && user.avatarUrl"
              :src="user.avatarUrl"
              alt="Avatar"
              class="h-24 w-24 rounded-full object-cover border-2 border-pink-500 shadow-glow-pink"
              loading="lazy"
              @error="handleImageError"
            />
            <div
              v-else
              class="h-24 w-24 rounded-full bg-gray-800 flex items-center justify-center border-2 border-pink-500"
            >
              <span class="text-pink-500 text-3xl font-bold">{{
                getInitials(player.username)
              }}</span>
            </div>
          </div>
          <h1
            class="text-4xl sm:text-5xl text-white neon-text font-audiowide capitalize"
          >
            {{ player.username }}
          </h1>
        </div>
        <div class="flex justify-center">
          <div
            class="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          ></div>
        </div>
      </div>

      <!-- Section des statistiques - Version simplifiée -->
      <div
        id="statistiques"
        class="bg-black/75 rounded-lg p-8 mb-8 border border-cyan-500 shadow-lg shadow-cyan-500/30 transform transition-all hover:scale-[1.02] duration-300"
      >
        <h2 class="text-3xl text-white mb-6 neon-text-cyan flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-3 text-cyan-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
            />
          </svg>
          Statistiques
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            class="bg-gray-800/70 p-4 rounded-lg text-center transform transition-all hover:scale-105 hover:bg-gray-800/90 duration-300"
          >
            <div class="text-3xl font-bold text-pink-500 mb-1">
              {{ playerRanking?.totalVictories || 0 }}
            </div>
            <div class="text-gray-300 text-sm">Victoires</div>
          </div>
          <div
            class="bg-gray-800/70 p-4 rounded-lg text-center transform transition-all hover:scale-105 hover:bg-gray-800/90 duration-300"
          >
            <div class="text-3xl font-bold text-cyan-500 mb-1">
              {{ playerRanking?.totalTournaments || 0 }}
            </div>
            <div class="text-gray-300 text-sm">Tournois</div>
          </div>
        </div>
      </div>

      <!-- Section Palmarès avec podium -->
      <div
        id="palmares"
        class="bg-black/75 rounded-lg p-8 mb-8 border border-amber-500 shadow-lg shadow-amber-500/30 transform transition-all hover:scale-[1.02] duration-300"
      >
        <h2 class="text-3xl text-white mb-6 neon-text-gold flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-3 text-amber-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          Palmarès
        </h2>

        <!-- Visualisation du podium -->
        <div class="flex justify-center mb-6 relative py-10">
          <!-- Podium avec positions -->
          <div class="flex items-end h-40 space-x-1 sm:space-x-3">
            <!-- 2ème place (argent) -->
            <div class="flex flex-col items-center">
              <div v-if="medalCount.silver > 0" class="relative mb-2">
                <img
                  :src="
                    user?.avatarUrl ||
                    'https://cdn.discordapp.com/embed/avatars/0.png'
                  "
                  alt="Avatar"
                  class="w-12 h-12 rounded-full object-cover border-2 border-gray-300 shadow-md"
                />
                <div
                  class="absolute -bottom-1 -right-1 bg-gray-300 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center border border-gray-400 font-bold text-xs"
                >
                  2
                </div>
              </div>
              <div
                class="w-16 sm:w-24 bg-gradient-to-t from-gray-600 to-gray-300 rounded-t-md flex items-center justify-center h-24 border-t border-l border-r border-gray-300 shadow-inner relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gray-300 opacity-30 scanline"
                ></div>
                <span
                  class="text-xl sm:text-2xl font-bold font-orbitron text-gray-800 z-10"
                  >{{ medalCount.silver }}</span
                >
              </div>
            </div>

            <!-- 1ère place (or) - plus haute -->
            <div class="flex flex-col items-center">
              <div v-if="medalCount.gold > 0" class="relative mb-2">
                <img
                  :src="
                    user?.avatarUrl ||
                    'https://cdn.discordapp.com/embed/avatars/0.png'
                  "
                  alt="Avatar"
                  class="w-14 h-14 rounded-full object-cover border-2 border-yellow-400 shadow-md shadow-yellow-400/30"
                />
                <div
                  class="absolute -bottom-1 -right-1 bg-yellow-500 text-yellow-900 rounded-full w-6 h-6 flex items-center justify-center border border-yellow-400 font-bold text-xs animate-pulse-subtle"
                >
                  1
                </div>
              </div>
              <div
                class="w-16 sm:w-24 bg-gradient-to-t from-yellow-600 to-yellow-300 rounded-t-md flex items-center justify-center h-32 border-t border-l border-r border-yellow-400 shadow-inner shadow-yellow-400/20 relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-yellow-300 opacity-30 scanline"
                ></div>
                <span
                  class="text-xl sm:text-2xl font-bold font-orbitron text-yellow-800 z-10"
                  >{{ medalCount.gold }}</span
                >
              </div>
            </div>

            <!-- 3ème place (bronze) -->
            <div class="flex flex-col items-center">
              <div v-if="medalCount.bronze > 0" class="relative mb-2">
                <img
                  :src="
                    user?.avatarUrl ||
                    'https://cdn.discordapp.com/embed/avatars/0.png'
                  "
                  alt="Avatar"
                  class="w-10 h-10 rounded-full object-cover border-2 border-amber-700 shadow-md"
                />
                <div
                  class="absolute -bottom-1 -right-1 bg-amber-700 text-amber-100 rounded-full w-6 h-6 flex items-center justify-center border border-amber-600 font-bold text-xs"
                >
                  3
                </div>
              </div>
              <div
                class="w-16 sm:w-24 bg-gradient-to-t from-amber-800 to-amber-500 rounded-t-md flex items-center justify-center h-16 border-t border-l border-r border-amber-700 shadow-inner relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-amber-600 opacity-30 scanline"
                ></div>
                <span
                  class="text-xl sm:text-2xl font-bold font-orbitron text-amber-100 z-10"
                  >{{ medalCount.bronze }}</span
                >
              </div>
            </div>
          </div>

          <!-- Base du podium -->
          <div
            class="absolute bottom-0 bg-gray-800 h-4 w-full max-w-md rounded-md border-t border-purple-500/30"
          ></div>
        </div>

        <!-- Statistiques des médailles -->
        <div class="flex flex-wrap justify-center gap-4 mb-4">
          <!-- Or -->
          <div
            class="bg-gradient-to-br from-black/70 to-yellow-950/30 p-4 rounded-lg text-center border border-yellow-500/50 shadow-md shadow-yellow-500/10 transform transition-all hover:scale-105 hover:shadow-yellow-500/30 duration-300 min-w-[200px] flex-1 max-w-[250px]"
          >
            <div class="text-yellow-400 text-lg font-orbitron mb-1">🥇 Or</div>
            <div class="text-2xl font-bold text-white">
              {{ medalCount.gold }}
            </div>
            <div class="text-xs text-yellow-300/70">victoires</div>
          </div>

          <!-- Argent -->
          <div
            class="bg-gradient-to-br from-black/70 to-gray-800/30 p-4 rounded-lg text-center border border-gray-400/50 shadow-md shadow-gray-400/10 transform transition-all hover:scale-105 hover:shadow-gray-400/30 duration-300 min-w-[200px] flex-1 max-w-[250px]"
          >
            <div class="text-gray-300 text-lg font-orbitron mb-1">
              🥈 Argent
            </div>
            <div class="text-2xl font-bold text-white">
              {{ medalCount.silver }}
            </div>
            <div class="text-xs text-gray-400/70">2e places</div>
          </div>

          <!-- Bronze -->
          <div
            class="bg-gradient-to-br from-black/70 to-amber-950/30 p-4 rounded-lg text-center border border-amber-700/50 shadow-md shadow-amber-700/10 transform transition-all hover:scale-105 hover:shadow-amber-700/30 duration-300 min-w-[200px] flex-1 max-w-[250px]"
          >
            <div class="text-amber-600 text-lg font-orbitron mb-1">
              🥉 Bronze
            </div>
            <div class="text-2xl font-bold text-white">
              {{ medalCount.bronze }}
            </div>
            <div class="text-xs text-amber-600/70">3e places</div>
          </div>
        </div>
      </div>

      <!-- Section Activité et engagement -->
      <div
        id="activite"
        class="bg-black/75 rounded-lg p-8 mb-8 border border-cyan-500 shadow-lg shadow-cyan-500/30 transform transition-all hover:scale-[1.02] duration-300"
      >
        <h2 class="text-3xl text-white mb-6 neon-text-cyan flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-3 text-cyan-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Activité
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <!-- Membre depuis -->
          <div
            class="bg-gradient-to-br from-black/70 to-blue-950/30 p-4 rounded-lg text-center border border-blue-500/50 shadow-md shadow-blue-500/10 transform transition-all hover:scale-105 hover:shadow-blue-500/30 duration-300"
          >
            <div class="text-blue-400 text-lg font-orbitron mb-1">
              📅 Membre
            </div>
            <div class="text-2xl font-bold text-white font-orbitron">
              {{ memberSince }}
            </div>
            <div class="text-xs text-blue-300/70">depuis</div>
          </div>

          <!-- Dernière activité -->
          <div
            class="bg-gradient-to-br from-black/70 to-purple-950/30 p-4 rounded-lg text-center border border-purple-500/50 shadow-md shadow-purple-500/10 transform transition-all hover:scale-105 hover:shadow-purple-500/30 duration-300"
          >
            <div class="text-purple-400 text-lg font-orbitron mb-1">
              ⚡ Activité
            </div>
            <div class="text-2xl font-bold text-white font-orbitron">
              {{ lastSeen }}
            </div>
            <div class="text-xs text-purple-300/70">dernière fois</div>
          </div>

          <!-- Participation totale -->
          <div
            class="bg-gradient-to-br from-black/70 to-orange-950/30 p-4 rounded-lg text-center border border-orange-500/50 shadow-md shadow-orange-500/10 transform transition-all hover:scale-105 hover:shadow-orange-500/30 duration-300"
          >
            <div class="text-orange-400 text-lg font-orbitron mb-1">
              🎯 Participation
            </div>
            <div class="text-2xl font-bold text-white font-orbitron">
              {{ participationStreak }}
            </div>
            <div class="text-xs text-orange-300/70">tournois joués</div>
          </div>
        </div>
      </div>

      <!-- Section Performance par jeu -->
      <div
        id="performance"
        class="bg-black/75 rounded-lg p-8 mb-8 border border-green-500 shadow-lg shadow-green-500/30 transform transition-all hover:scale-[1.02] duration-300"
      >
        <h2
          class="text-3xl text-white mb-6 neon-text-green flex items-center justify-between"
        >
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 mr-3 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            Performance par jeu
          </div>

          <!-- Bouton d'expansion -->
          <button
            v-if="gameStats.length > 3"
            @click="expandedGameStats = !expandedGameStats"
            class="text-sm bg-green-900/50 text-green-300 px-4 py-2 rounded-md hover:bg-green-800/50 transition-colors font-orbitron border border-green-500/30"
          >
            {{
              expandedGameStats ? "RÉDUIRE" : `TOUT VOIR (${gameStats.length})`
            }}
          </button>
        </h2>

        <div v-if="gameStats.length > 0" class="space-y-4">
          <div
            v-for="gameStat in displayedGameStats"
            :key="gameStat.gameId"
            class="bg-gray-800/70 p-4 rounded-lg flex items-center justify-between transform transition-all hover:bg-gray-700/90 hover:scale-[1.02] duration-300 border border-green-500/20"
          >
            <div class="flex items-center">
              <div class="relative mr-4">
                <img
                  v-if="gameStat.gameImage"
                  :src="gameStat.gameImage"
                  :alt="gameStat.gameName"
                  class="w-12 h-12 rounded-lg object-cover border-2 border-green-500/50"
                  @error="handleImageError"
                />
                <div
                  v-else
                  class="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center border-2 border-green-500/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-9 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <h3 class="text-white font-orbitron font-bold">
                  {{ gameStat.gameName }}
                </h3>
                <div class="flex items-center space-x-3 mt-1">
                  <span class="text-green-400 font-orbitron text-sm"
                    >{{ gameStat.wins }}V</span
                  >
                  <span class="text-red-400 font-orbitron text-sm"
                    >{{ gameStat.losses }}D</span
                  >
                  <span class="text-gray-400 text-sm"
                    >{{ gameStat.totalPlayed }} parties</span
                  >
                </div>
              </div>
            </div>

            <div class="text-right flex flex-col items-end">
              <div class="text-2xl font-bold text-green-400 font-orbitron mb-1">
                {{ gameStat.winRate }}%
              </div>
              <div class="text-xs text-green-300/70 mb-2 whitespace-nowrap">
                taux de victoire
              </div>

              <!-- Barre de progression corrigée -->
              <div class="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all duration-1000"
                  :style="{ width: gameStat.winRate + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else
          class="text-gray-400 text-center italic bg-gray-800/50 p-6 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 mx-auto text-gray-500 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.707-2.626"
            />
          </svg>
          Aucune donnée de performance disponible
        </div>
      </div>

      <!-- Section Statistiques sociales -->
      <div
        id="collaborations"
        class="bg-black/75 rounded-lg p-8 mb-8 border border-indigo-500 shadow-lg shadow-indigo-500/30 transform transition-all hover:scale-[1.02] duration-300"
      >
        <h2 class="text-3xl text-white mb-6 neon-text-indigo flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-3 text-indigo-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Collaborations
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Coéquipiers fréquents -->
          <div>
            <h3
              class="text-xl font-orbitron text-indigo-300 mb-4 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              Coéquipiers fréquents
            </h3>

            <div
              v-if="socialStats.frequentTeammates.length > 0"
              class="space-y-3"
            >
              <div
                v-for="teammate in socialStats.frequentTeammates.slice(0, 5)"
                :key="teammate.playerId"
                class="bg-gray-800/70 p-4 rounded-lg flex items-center justify-between transform transition-all hover:bg-gray-700/90 hover:scale-[1.02] duration-300 border border-indigo-500/20"
              >
                <div class="flex items-center">
                  <div
                    class="w-10 h-10 rounded-full bg-indigo-900/50 border-2 border-indigo-500/50 flex items-center justify-center mr-3"
                  >
                    <span class="text-indigo-400 font-orbitron font-bold">
                      {{ teammate.username.charAt(0).toUpperCase() }}
                    </span>
                  </div>

                  <router-link
                    :to="{ name: 'Profil', params: { id: teammate.playerId } }"
                    class="text-white font-orbitron hover:text-indigo-400 transition-colors"
                  >
                    {{ teammate.username }}
                  </router-link>
                </div>

                <div class="text-right">
                  <div class="text-lg font-bold text-indigo-400 font-orbitron">
                    {{ teammate.count }}
                  </div>
                  <div class="text-xs text-indigo-300/70">équipes</div>
                </div>
              </div>
            </div>

            <div
              v-else
              class="text-gray-400 text-center italic bg-gray-800/50 p-6 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 mx-auto text-gray-500 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              Aucune collaboration répétée
            </div>
          </div>

          <!-- Partenaires de victoire -->
          <div>
            <h3
              class="text-xl font-orbitron text-yellow-300 mb-4 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              Partenaires de victoire
            </h3>

            <div
              v-if="socialStats.winningPartners.length > 0"
              class="space-y-3"
            >
              <div
                v-for="partner in socialStats.winningPartners.slice(0, 5)"
                :key="partner.playerId"
                class="bg-gradient-to-br from-black/70 to-yellow-950/30 p-4 rounded-lg flex items-center justify-between transform transition-all hover:scale-105 hover:shadow-yellow-500/30 duration-300 border border-yellow-500/50"
              >
                <div class="flex items-center">
                  <div
                    class="w-10 h-10 rounded-full bg-yellow-900/50 border-2 border-yellow-500/50 flex items-center justify-center mr-3"
                  >
                    <span class="text-yellow-400 font-orbitron font-bold">
                      {{ partner.username.charAt(0).toUpperCase() }}
                    </span>
                  </div>

                  <router-link
                    :to="{ name: 'Profil', params: { id: partner.playerId } }"
                    class="text-white font-orbitron hover:text-yellow-400 transition-colors"
                  >
                    {{ partner.username }}
                  </router-link>
                </div>

                <div class="text-right">
                  <div
                    class="text-lg font-bold text-yellow-400 font-orbitron flex items-center"
                  >
                    🏆 {{ partner.wins }}
                  </div>
                  <div class="text-xs text-yellow-300/70">victoires</div>
                </div>
              </div>
            </div>

            <div
              v-else
              class="text-gray-400 text-center italic bg-gray-800/50 p-6 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 mx-auto text-gray-500 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              Aucune victoire en équipe
            </div>
          </div>
        </div>
      </div>

      <!-- Section des badges -->
      <div
        id="badges"
        class="bg-black/75 rounded-lg p-8 mb-8 border border-purple-500 shadow-lg shadow-purple-500/30 transform transition-all hover:scale-[1.02] duration-300"
      >
        <h2 class="text-3xl text-white mb-6 neon-text-purple flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-3 text-purple-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          Badges
          <span class="text-sm text-gray-400 ml-2">({{ badgeCount }})</span>
        </h2>
        <div
          v-if="hasBadges"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <div
            v-for="badge in player.badges"
            :key="badge._id"
            class="flex flex-col items-center p-4 bg-gray-800/70 rounded-lg transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 duration-300 cursor-pointer"
            @click="selectBadge(badge)"
          >
            <img
              :src="badge.imageUrl"
              :alt="badge.title"
              class="h-16 w-16 mb-3 rounded-full border-2 border-purple-500 glow-badge object-cover"
              loading="lazy"
              @error="handleImageError"
            />
            <span class="text-white text-center font-orbitron text-sm">{{
              badge.title
            }}</span>
          </div>
        </div>
        <div
          v-else
          class="text-gray-400 text-center italic bg-gray-800/50 p-6 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 mx-auto text-gray-500 mb-2"
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
          Aucun badge obtenu pour le moment
        </div>
      </div>

      <!-- Section Réalisations et progression -->
      <div
        id="records"
        class="bg-black/75 rounded-lg p-8 mb-8 border border-amber-500 shadow-lg shadow-amber-500/30 transform transition-all hover:scale-[1.02] duration-300"
      >
        <h2 class="text-3xl text-white mb-6 neon-text-gold flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-3 text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Records personnels
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <!-- Plus longue série de victoires -->
          <div
            class="bg-gradient-to-br from-black/70 to-green-950/30 p-4 rounded-lg text-center border border-green-500/50 shadow-md shadow-green-500/10 transform transition-all hover:scale-105 hover:shadow-green-500/30 duration-300"
          >
            <div class="text-green-400 text-lg font-orbitron mb-1">
              🔥 Série
            </div>
            <div class="text-2xl font-bold text-white font-orbitron">
              {{ records.longestWinStreak }}
            </div>
            <div class="text-xs text-green-300/70">victoires consécutives</div>
          </div>

          <!-- Taux de top 25% -->
          <div
            class="bg-gradient-to-br from-black/70 to-purple-950/30 p-4 rounded-lg text-center border border-purple-500/50 shadow-md shadow-purple-500/10 transform transition-all hover:scale-105 hover:shadow-purple-500/30 duration-300"
          >
            <div class="text-purple-400 text-lg font-orbitron mb-1">
              🎯 Top 25%
            </div>
            <div class="text-2xl font-bold text-white font-orbitron">
              {{ top25PercentRate }}%
            </div>
            <div class="text-xs text-purple-300/70">des tournois</div>
          </div>

          <!-- Taux de victoire -->
          <div
            class="bg-gradient-to-br from-black/70 to-cyan-950/30 p-4 rounded-lg text-center border border-cyan-500/50 shadow-md shadow-cyan-500/10 transform transition-all hover:scale-105 hover:shadow-cyan-500/30 duration-300"
          >
            <div class="text-cyan-400 text-lg font-orbitron mb-1">📊 Taux</div>
            <div class="text-2xl font-bold text-white font-orbitron">
              {{
                playerRanking?.totalTournaments
                  ? Math.round(
                      ((playerRanking?.totalVictories || 0) /
                        playerRanking.totalTournaments) *
                        100
                    )
                  : 0
              }}%
            </div>
            <div class="text-xs text-cyan-300/70">de victoire</div>
          </div>

          <!-- Taux de podium -->
          <div
            class="bg-gradient-to-br from-black/70 to-yellow-950/30 p-4 rounded-lg text-center border border-yellow-500/50 shadow-md shadow-yellow-500/10 transform transition-all hover:scale-105 hover:shadow-yellow-500/30 duration-300"
          >
            <div class="text-yellow-400 text-lg font-orbitron mb-1">
              🏆 Podium
            </div>
            <div class="text-2xl font-bold text-white font-orbitron">
              {{
                playerRanking?.totalTournaments
                  ? Math.round(
                      ((medalCount.gold +
                        medalCount.silver +
                        medalCount.bronze) /
                        playerRanking.totalTournaments) *
                        100
                    )
                  : 0
              }}%
            </div>
            <div class="text-xs text-yellow-300/70">de podiums</div>
          </div>
        </div>

        <!-- Graphique de progression intégré -->
        <div class="bg-gray-800/50 p-6 rounded-lg border border-amber-500/20">
          <h3
            class="text-lg font-orbitron text-amber-300 mb-4 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
              />
            </svg>
            Évolution des performances
          </h3>

          <!-- Graphique simple en CSS basé sur les données réelles -->
          <div
            class="h-48 bg-gray-900/50 rounded-lg p-4 border border-gray-700/50"
          >
            <div v-if="tournamentProgression.length > 0" class="h-full">
              <div class="flex justify-between items-end h-full relative">
                <div
                  v-for="(month, index) in tournamentProgression"
                  :key="index"
                  class="flex flex-col items-center flex-1 mx-0.5"
                >
                  <!-- Conteneur avec deux barres côte à côte -->
                  <div
                    class="flex items-end justify-center h-32 w-full space-x-1"
                  >
                    <!-- Barre victoires (verte) -->
                    <div
                      v-if="month.victories > 0"
                      class="bg-gradient-to-t from-green-600 to-green-400 rounded-t w-2/5 transition-all duration-1000"
                      :style="{
                        height:
                          Math.max(
                            (month.victories / maxOverallValue) * 100,
                            8
                          ) + '%',
                      }"
                      :title="`${month.victories} victoires en ${month.name}`"
                    ></div>

                    <!-- Placeholder pour victoires si aucune -->
                    <div v-else class="w-2/5 h-1 bg-transparent"></div>

                    <!-- Barre podiums (amber) -->
                    <div
                      v-if="month.podiums > month.victories"
                      class="bg-gradient-to-t from-amber-600 to-amber-400 rounded-t w-2/5 transition-all duration-1000"
                      :style="{
                        height:
                          Math.max(
                            ((month.podiums - month.victories) /
                              maxOverallValue) *
                              100,
                            8
                          ) + '%',
                      }"
                      :title="`${
                        month.podiums - month.victories
                      } autres podiums en ${month.name}`"
                    ></div>

                    <!-- Placeholder pour podiums si aucun -->
                    <div v-else class="w-2/5 h-1 bg-transparent"></div>
                  </div>

                  <!-- Label du mois -->
                  <div
                    class="text-xs text-gray-400 mt-2 font-orbitron text-center"
                  >
                    {{ month.name }}
                  </div>

                  <!-- Statistiques -->
                  <div
                    class="text-xs font-orbitron text-center mt-1 flex space-x-1"
                  >
                    <span v-if="month.victories > 0" class="text-green-400">
                      {{ month.victories }}V
                    </span>
                    <span
                      v-if="month.podiums > month.victories"
                      class="text-amber-400"
                    >
                      {{ month.podiums - month.victories }}P
                    </span>
                    <span
                      v-if="month.podiums === 0 && month.victories === 0"
                      class="text-gray-500"
                    >
                      -
                    </span>
                  </div>
                </div>
              </div>

              <!-- Légende -->
              <div class="flex justify-center mt-4 space-x-6">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-green-400 rounded"></div>
                  <span class="text-xs text-gray-400 font-orbitron"
                    >Victoires</span
                  >
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-amber-400 rounded"></div>
                  <span class="text-xs text-gray-400 font-orbitron"
                    >Autres podiums</span
                  >
                </div>
              </div>
            </div>

            <!-- État vide si pas de données -->
            <div v-else class="h-full flex items-center justify-center">
              <div class="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 mx-auto text-gray-500 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span class="text-gray-400 text-sm font-orbitron"
                  >Pas assez de données</span
                >
                <p class="text-xs text-gray-500 mt-1">
                  Participez à plus de tournois
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section des tournois -->
      <div
        id="tournois"
        class="bg-black/75 rounded-lg p-8 border border-pink-500 shadow-lg shadow-pink-500/30 transform transition-all hover:scale-[1.02] duration-300"
      >
        <h2 class="text-3xl text-white mb-6 neon-text flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-3 text-pink-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M2 2v5h5" />
            <path d="M2 7h12v5H2z" />
            <path d="M14 4v8" />
            <path d="M14 12h5v5h-5z" />
            <path d="M19 17h3v5h-3z" />
            <path d="M8 12v5h6" />
            <path d="M8 17h3v5H8z" />
          </svg>
          Tournois
          <span class="text-sm text-gray-400 ml-2"
            >({{ tournamentCount }})</span
          >
        </h2>

        <!-- Options de tri pour les tournois -->
        <div v-if="hasTournaments" class="flex justify-end mb-4">
          <div class="relative">
            <select
              v-model="tournamentSort"
              class="appearance-none bg-black/50 border border-pink-500/50 text-pink-400 text-sm font-orbitron px-3 py-1 pr-8 rounded-lg focus:outline-none focus:border-pink-500"
              aria-label="Trier les tournois"
            >
              <option value="date-desc">Plus récents d'abord</option>
              <option value="date-asc">Plus anciens d'abord</option>
              <option value="rank-asc">Meilleurs classements</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-pink-400"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Liste des tournois -->
        <div v-if="hasTournaments">
          <ul class="space-y-4">
            <li
              v-for="tournament in paginatedTournaments"
              :key="tournament._id"
              class="bg-gray-800/70 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between transform transition-all hover:bg-gray-700/90 duration-300"
            >
              <div class="flex items-center mb-2 sm:mb-0 flex-1">
                <div
                  class="h-8 w-8 rounded-full bg-pink-500/20 flex items-center justify-center mr-3 border border-pink-500/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-pink-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <span class="text-white font-orbitron">{{
                  tournament.name
                }}</span>
              </div>
              <div class="flex items-center space-x-4">
                <span class="text-gray-400 text-sm">{{
                  formatDate(tournament.date)
                }}</span>
                <span
                  v-if="tournament && 'rank' in tournament"
                  class="px-3 py-1 rounded text-xs font-orbitron"
                  :class="getRankingClass(tournament.rank ?? 0)"
                >
                  {{ getRankingLabel(tournament.rank ?? 0) }} /
                  {{ tournament.numberOfTeams }}
                </span>
                <!-- Bouton détails du tournoi -->
                <router-link
                  :to="`/tournois/${tournament._id}`"
                  class="cyberpunk-btn-mini-pink px-3 py-1 rounded text-xs font-orbitron flex items-center"
                  title="Voir les détails du tournoi"
                >
                  <span>Détails</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </router-link>
              </div>
            </li>
          </ul>

          <!-- Pagination pour les tournois -->
          <div
            v-if="totalTournamentPages > 1"
            class="flex justify-center mt-6 space-x-2"
          >
            <button
              @click="prevTournamentPage"
              :disabled="currentTournamentPage === 1"
              class="px-3 py-1 bg-black/70 border border-pink-500/50 text-pink-400 rounded-md text-xs disabled:opacity-50 disabled:cursor-not-allowed font-orbitron transition-all hover:bg-black/90 hover:border-pink-500 hover:shadow-glow-pink"
            >
              &laquo; Précédent
            </button>

            <div
              class="flex items-center px-3 font-orbitron text-white text-xs"
            >
              Page {{ currentTournamentPage }} / {{ totalTournamentPages }}
            </div>

            <button
              @click="nextTournamentPage"
              :disabled="currentTournamentPage === totalTournamentPages"
              class="px-3 py-1 bg-black/70 border border-pink-500/50 text-pink-400 rounded-md text-xs disabled:opacity-50 disabled:cursor-not-allowed font-orbitron transition-all hover:bg-black/90 hover:border-pink-500 hover:shadow-glow-pink"
            >
              Suivant &raquo;
            </button>
          </div>
        </div>
        <div
          v-else
          class="text-gray-400 text-center italic bg-gray-800/50 p-6 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 mx-auto text-gray-500 mb-2"
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
          Aucun tournoi pour le moment
        </div>
      </div>
    </div>

    <!-- filepath: d:\Dev\ACS\acs-frontend\src\views\Profil.vue -->
    <!-- Modal détail badge -->
    <div
      v-if="selectedBadge"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-md"
      @click="selectedBadge = null"
    >
      <div
        class="bg-black/90 border-2 border-purple-500 rounded-lg p-6 max-w-md mx-4 transform transition-all duration-300 scale-100 shadow-2xl shadow-purple-500/30"
        @click.stop
      >
        <!-- Header with angled borders -->
        <div class="relative mb-8">
          <div
            class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          ></div>
          <div class="flex justify-between items-center">
            <h3 class="text-2xl font-orbitron text-purple-400 neon-text-purple">
              Détails du badge
            </h3>
            <button
              @click="selectedBadge = null"
              class="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Badge showcase with enhanced visuals -->
        <div class="flex flex-col items-center mb-6">
          <!-- Large badge image with enhanced glow effect -->
          <div class="relative mb-4 group">
            <img
              :src="selectedBadge.imageUrl"
              :alt="selectedBadge.title"
              class="h-48 w-48 rounded-full border-4 border-purple-500 object-cover group-hover:scale-105 transition-transform duration-500"
              @error="handleImageError"
            />
            <div
              class="absolute inset-0 rounded-full"
              style="
                box-shadow: 0 0 30px rgba(168, 85, 247, 0.7),
                  0 0 60px rgba(168, 85, 247, 0.3);
                border-radius: 50%;
              "
            ></div>
          </div>

          <!-- Badge title with enhanced styling -->
          <h4
            class="text-2xl text-white font-audiowide mb-2 neon-text-purple text-center"
          >
            {{ selectedBadge.title }}
          </h4>

          <!-- Badge description with background -->
          <div
            class="w-full bg-purple-900/20 p-4 rounded-lg border border-purple-500/30 mt-2"
          >
            <p class="text-purple-200 text-sm text-center">
              {{
                selectedBadge.description ||
                "Ce badge est une récompense mystérieuse. Aucune description disponible."
              }}
            </p>
          </div>
        </div>

        <!-- Footer with angled borders -->
        <div class="relative mt-8">
          <div
            class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          ></div>
          <div class="flex justify-center">
            <button
              @click="selectedBadge = null"
              class="cyberpunk-btn-purple px-5 py-2 rounded-md text-sm font-orbitron shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-purple-500/50"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import playerService from "../services/playerService";
import userService from "../services/userService";
import type {
  Player,
  PlayerRanking,
  Badge,
  User,
  ExtendedStats,
} from "../types";
import CyberTerminal from "../shared/CyberTerminal.vue";

//-------------------------------------------------------
// SECTION: États réactifs principaux
//-------------------------------------------------------

// Données du profil
const player = ref<Player | null>(null);
const user = ref<User | null>(null);
const playerRanking = ref<PlayerRanking | null>(null);
const extendedStats = ref<ExtendedStats | null>(null);

// États de l'interface
const loading = ref(true);
const error = ref<string | null>(null);
const selectedBadge = ref<Badge | null>(null);
const expandedGameStats = ref(false);

// Navigation et pagination
const activeSection = ref("profil");
const tournamentSort = ref("date-desc");
const currentTournamentPage = ref(1);
const tournamentsPerPage = 5;

// Accès aux paramètres de route
const route = useRoute();

//-------------------------------------------------------
// SECTION: Configuration de navigation
//-------------------------------------------------------

const navigationSections = ref([
  {
    id: "profil",
    label: "Profil joueur",
    shortLabel: "Profil",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />',
  },
  {
    id: "statistiques",
    label: "Statistiques générales",
    shortLabel: "Stats",
    icon: '<path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />',
  },
  {
    id: "palmares",
    label: "Palmarès et médailles",
    shortLabel: "Palmarès",
    icon: '<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clip-rule="evenodd" />',
  },
  {
    id: "activite",
    label: "Activité joueur",
    shortLabel: "Activité",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />',
  },
  {
    id: "performance",
    label: "Performance par jeu",
    shortLabel: "Jeux",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />',
  },
  {
    id: "collaborations",
    label: "Collaborations",
    shortLabel: "Équipes",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />',
  },
  {
    id: "badges",
    label: "Badges et récompenses",
    shortLabel: "Badges",
    icon: '<path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />',
  },
  {
    id: "records",
    label: "Records personnels",
    shortLabel: "Records",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />',
  },
  {
    id: "tournois",
    label: "Historique tournois",
    shortLabel: "Tournois",
    icon: '<path d="M2 2v5h5" /><path d="M2 7h12v5H2z" /><path d="M14 4v8" /><path d="M14 12h5v5h-5z" /><path d="M19 17h3v5h-3z" /><path d="M8 12v5h6" /><path d="M8 17h3v5H8z" />',
  },
]);

//-------------------------------------------------------
// SECTION: Propriétés calculées - Données de base
//-------------------------------------------------------

// Statistiques des jeux
const gameStats = computed(() => {
  const stats = extendedStats.value?.gameStats || [];
  return [...stats].sort((a, b) => b.winRate - a.winRate);
});
const displayedGameStats = computed(() => {
  // Trier par taux de victoire décroissant
  const sortedStats = [...gameStats.value].sort(
    (a, b) => b.winRate - a.winRate
  );

  if (expandedGameStats.value || sortedStats.length <= 3) {
    return sortedStats;
  }
  return sortedStats.slice(0, 3);
});

// Informations d'activité
const memberSince = computed(() => {
  if (!extendedStats.value?.memberSince) return "Inconnu";
  return formatDate(extendedStats.value.memberSince);
});

const lastSeen = computed(() => {
  // Chercher le dernier tournoi participé
  if (
    !playerRanking.value?.tournamentsParticipated ||
    playerRanking.value.tournamentsParticipated.length === 0
  ) {
    return "Aucun tournoi";
  }

  // Trier les tournois par date décroissante et prendre le premier
  const sortedTournaments = [
    ...playerRanking.value.tournamentsParticipated,
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const lastTournament = sortedTournaments[0];

  if (!lastTournament) {
    return "Aucun tournoi";
  }

  return formatDate(lastTournament.date);
});

const participationStreak = computed(() => {
  return extendedStats.value?.participationStreak || 0;
});

// Statistiques sociales
const socialStats = computed(() => ({
  teamsFormed: extendedStats.value?.socialStats?.teamsFormed || 0,
  uniqueTeammates: extendedStats.value?.socialStats?.uniqueTeammates || 0,
  frequentTeammates: extendedStats.value?.socialStats?.frequentTeammates || [],
  winningPartners: extendedStats.value?.socialStats?.winningPartners || [],
}));

// Records personnels
const records = computed(() => ({
  longestWinStreak: extendedStats.value?.records?.longestWinStreak || 0,
}));

// Valeur maximale pour normaliser toutes les barres sur la même échelle
const maxOverallValue = computed(() => {
  if (tournamentProgression.value.length === 0) return 1;

  let maxValue = 0;

  tournamentProgression.value.forEach((month) => {
    // Comparer victoires et podiums séparément
    maxValue = Math.max(maxValue, month.victories);
    maxValue = Math.max(maxValue, month.podiums - month.victories);
  });

  // Minimum de 1 pour éviter la division par zéro
  return Math.max(maxValue, 1);
});

//-------------------------------------------------------
// SECTION: Propriétés calculées - Statistiques avancées
//-------------------------------------------------------

// Calcul du taux de top 25%
const top25PercentRate = computed(() => {
  if (!playerRanking.value?.tournamentsParticipated) return 0;

  const tournaments = playerRanking.value.tournamentsParticipated;

  const top25Tournaments = tournaments.filter((tournament) => {
    const rank = tournament.rank || 999;
    const totalTeams = tournament.numberOfTeams || 1;
    const top25Threshold = Math.ceil(totalTeams * 0.25);
    return rank <= top25Threshold;
  }).length;

  return tournaments.length > 0
    ? Math.round((top25Tournaments / tournaments.length) * 100)
    : 0;
});

// Compte des médailles
const medalCount = computed(() => {
  const counts = { gold: 0, silver: 0, bronze: 0 };

  if (!playerRanking.value?.tournamentsParticipated) return counts;

  playerRanking.value.tournamentsParticipated.forEach((tournament) => {
    if (tournament.rank === 1) counts.gold++;
    else if (tournament.rank === 2) counts.silver++;
    else if (tournament.rank === 3) counts.bronze++;
  });

  return counts;
});

// Données pour le graphique de progression
const tournamentProgression = computed(() => {
  if (!playerRanking.value?.tournamentsParticipated) return [];

  const tournaments = playerRanking.value.tournamentsParticipated;
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const recentTournaments = tournaments.filter(
    (t) => new Date(t.date) >= sixMonthsAgo
  );

  const monthlyData = new Map();

  // Initialiser les 6 derniers mois
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const monthName = date.toLocaleDateString("fr-FR", { month: "short" });

    monthlyData.set(key, {
      name: monthName,
      victories: 0,
      podiums: 0,
      total: 0,
    });
  }

  // Compter les victoires et podiums par mois
  recentTournaments.forEach((tournament) => {
    const date = new Date(tournament.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`;

    if (monthlyData.has(key)) {
      const monthData = monthlyData.get(key);
      monthData.total++;

      if (tournament.rank === 1) {
        monthData.victories++;
        monthData.podiums++; // Les victoires comptent aussi comme podiums
      } else if (tournament.rank === 2 || tournament.rank === 3) {
        monthData.podiums++;
      }
    }
  });

  return Array.from(monthlyData.values());
});

//-------------------------------------------------------
// SECTION: Propriétés calculées - Interface utilisateur
//-------------------------------------------------------

// Badges
const hasBadges = computed(
  () => player.value?.badges && player.value.badges.length > 0
);

const badgeCount = computed(() => player.value?.badges?.length || 0);

// Tournois
const hasTournaments = computed(
  () =>
    playerRanking.value?.tournamentsParticipated &&
    playerRanking.value.tournamentsParticipated.length > 0
);

const tournamentCount = computed(
  () => playerRanking.value?.tournamentsParticipated?.length || 0
);

// Tri et pagination des tournois
const sortedTournaments = computed(() => {
  const tournaments = playerRanking.value?.tournamentsParticipated || [];

  switch (tournamentSort.value) {
    case "date-desc":
      return [...tournaments].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    case "date-asc":
      return [...tournaments].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    case "rank-asc":
      return [...tournaments].sort((a, b) => {
        const rankA = a.rank || 999;
        const rankB = b.rank || 999;
        return rankA - rankB;
      });
    default:
      return tournaments;
  }
});

const totalTournamentPages = computed(() =>
  Math.ceil((sortedTournaments.value?.length || 0) / tournamentsPerPage)
);

const paginatedTournaments = computed(() => {
  const start = (currentTournamentPage.value - 1) * tournamentsPerPage;
  const end = start + tournamentsPerPage;
  return sortedTournaments.value?.slice(start, end) || [];
});

//-------------------------------------------------------
// SECTION: Fonctions utilitaires
//-------------------------------------------------------

const formatDate = (dateString: string | Date) => {
  try {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  } catch (err) {
    console.error("Erreur de formatage de date:", err);
    return "Date inconnue";
  }
};

const getInitials = (username: string) => {
  if (!username) return "?";
  return username.charAt(0).toUpperCase();
};

const handleImageError = (e: Event) => {
  if (e.target instanceof HTMLImageElement) {
    const username = player.value?.username || "?";
    const initials = getInitials(username);

    e.target.src = `https://ui-avatars.com/api/?name=${initials}&background=6D28D9&color=F9FAFB&size=150&bold=true&font-family=monospace`;

    e.target.classList.remove("border-pink-500", "shadow-glow-pink");
    e.target.classList.add("border-purple-500", "shadow-purple-500/50");
  }
};

//-------------------------------------------------------
// SECTION: Navigation et scroll
//-------------------------------------------------------

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const yOffset = -100;
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition + yOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    activeSection.value = sectionId;
  }
};

const setupScrollObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          activeSection.value = entry.target.id;
        }
      });
    },
    {
      threshold: [0.3, 0.7],
      rootMargin: "-20% 0px -20% 0px",
    }
  );

  navigationSections.value.forEach((section) => {
    const element = document.getElementById(section.id);
    if (element) {
      observer.observe(element);
    }
  });

  return observer;
};

//-------------------------------------------------------
// SECTION: Actions utilisateur
//-------------------------------------------------------

const selectBadge = (badge: Badge) => {
  selectedBadge.value = badge;
};

//-------------------------------------------------------
// SECTION: Gestion des tournois
//-------------------------------------------------------

const getRankingLabel = (rank: number): string => {
  if (!rank) return "Non classé";

  switch (rank) {
    case 1:
      return "🥇 Or";
    case 2:
      return "🥈 Argent";
    case 3:
      return "🥉 Bronze";
    default:
      return `${rank}ème`;
  }
};

const getRankingClass = (rank: number): string => {
  if (!rank) return "bg-gray-700 text-gray-300 border border-gray-600";

  switch (rank) {
    case 1:
      return "bg-yellow-500/70 text-yellow-900 border border-yellow-400";
    case 2:
      return "bg-gray-300/70 text-gray-800 border border-gray-200";
    case 3:
      return "bg-amber-700/70 text-amber-100 border border-amber-600";
    default:
      return "bg-purple-700/70 text-white border border-purple-600";
  }
};

const nextTournamentPage = () => {
  if (currentTournamentPage.value < totalTournamentPages.value) {
    currentTournamentPage.value++;
  }
};

const prevTournamentPage = () => {
  if (currentTournamentPage.value > 1) {
    currentTournamentPage.value--;
  }
};

//-------------------------------------------------------
// SECTION: Récupération des données
//-------------------------------------------------------

const fetchPlayerProfile = async () => {
  loading.value = true;
  error.value = null;

  try {
    const playerId = route.params.id as string;

    // Récupération des données du joueur
    const playerData = await playerService.getPlayerProfile(playerId);
    player.value = playerData;

    // Récupération de l'utilisateur associé
    if (player.value?.userId) {
      try {
        const userData = await userService.getUserById(player.value.userId);
        user.value = userData;
      } catch (userErr) {
        console.error("Erreur utilisateur:", userErr);
      }
    }

    // Récupération des statistiques étendues
    try {
      const extendedStatsData = await playerService.getExtendedStats(playerId);
      extendedStats.value = extendedStatsData;
    } catch (statsErr) {
      console.error("Erreur statistiques étendues:", statsErr);
      extendedStats.value = null;
    }

    // Récupération du classement
    try {
      const rankings = await playerService.getPlayerRankings();
      playerRanking.value =
        rankings.find((ranking) => ranking.playerId === playerId) || null;
    } catch (rankErr) {
      console.error("Erreur classement:", rankErr);
    }
  } catch (err) {
    console.error("Erreur profil joueur:", err);
    error.value = "Impossible de charger le profil de ce joueur.";
  } finally {
    loading.value = false;
  }
};

//-------------------------------------------------------
// SECTION: Watchers et cycle de vie
//-------------------------------------------------------

// Réinitialiser la pagination quand le tri change
watch(tournamentSort, () => {
  currentTournamentPage.value = 1;
});

// Recharger quand l'ID change
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      fetchPlayerProfile();
    }
  }
);

// Initialisation du composant
onMounted(() => {
  fetchPlayerProfile();
  setTimeout(() => {
    setupScrollObserver();
  }, 1000);
});
</script>

<style scoped>
/* Variables CSS */

/* Effets de néon */
.neon-text {
  color: white;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 15px #ff00ff;
}

.neon-text-purple {
  color: white;
  text-shadow: 0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 15px #a855f7;
}

.neon-text-cyan {
  color: white;
  text-shadow: 0 0 10px #06b6d4, 0 0 20px #06b6d4, 0 0 15px #06b6d4;
}

/* Effets de lueur */
.glow-badge {
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.7);
}

.shadow-glow-pink {
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
}

/* Animation pour les cartes */
.transform {
  transition: all 0.3s ease;
}

/* Styles pour les titres de section et textes */
h2 {
  letter-spacing: 1px;
}

.text-3xl,
.text-4xl {
  font-family: "Orbitron", sans-serif;
  letter-spacing: 1px;
}

/* Animations */
@keyframes pulse {
  0%,
  100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}

.animate-pulse-subtle {
  animation: pulse 2s infinite;
}
.neon-text-green {
  color: white;
  text-shadow: 0 0 10px #10b981, 0 0 20px #10b981, 0 0 15px #10b981;
}

.neon-text-indigo {
  color: white;
  text-shadow: 0 0 10px #6366f1, 0 0 20px #6366f1, 0 0 15px #6366f1;
}

/* Animation pour les barres de progression */
@keyframes fill-bar {
  from {
    width: 0%;
  }
  to {
    width: var(--width);
  }
}

/* Amélioration des transitions */
.transform {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Animation au survol des éléments */
.hover\:scale-\[1\.02\]:hover {
  transform: scale(1.02);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

.font-audiowide {
  font-family: "Audiowide", cursive;
}

.shadow-glow-pink {
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
}

/* Assurer que les boutons de pagination sont bien alignés */
.disabled\:opacity-50:disabled {
  opacity: 0.5;
}

.disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.cyberpunk-btn-mini-pink {
  background: rgba(236, 72, 153, 0.2);
  border: 1px solid rgba(236, 72, 153, 0.5);
  color: rgba(236, 72, 153, 0.9);
  transition: all 0.3s ease;
  white-space: nowrap;
}

.cyberpunk-btn-mini-pink:hover {
  background: rgba(236, 72, 153, 0.3);
  border-color: rgba(236, 72, 153, 0.8);
  box-shadow: 0 0 8px rgba(236, 72, 153, 0.5);
  transform: translateY(-1px);
}

.cyberpunk-btn-mini-pink:active {
  transform: translateY(1px);
}

/* Effet de néon doré */
.neon-text-gold {
  color: white;
  text-shadow: 0 0 10px #f59e0b, 0 0 20px #f59e0b, 0 0 15px #f59e0b;
}

/* Effet de scanline pour le podium */
.scanline {
  background: repeating-linear-gradient(
    to bottom,
    transparent 0%,
    rgba(255, 255, 255, 0.05) 0.5%,
    transparent 1%
  );
  background-size: 100% 4px;
  animation: scanline 10s linear infinite;
}

@keyframes scanline {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 100%;
  }
}

/* Animation pour les médailles */
@keyframes pulse-subtle {
  0%,
  100% {
    opacity: 0.9;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s infinite;
}

/* Navigation latérale */
.shadow-glow-cyan {
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
}

/* Amélioration du style des boutons de navigation */
.fixed.left-4 button {
  min-width: 140px;
  font-size: 11px;
  padding: 8px 12px;
}

.fixed.left-4 button svg {
  flex-shrink: 0;
}

/* Animation fluide pour les transitions */
.fixed.left-4 button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Effet de survol amélioré */
.fixed.left-4 button:hover {
  transform: translateX(2px);
}

/* Style pour la section active */
.fixed.left-4 button.bg-cyan-500\/20 {
  position: relative;
}

.fixed.left-4 button.bg-cyan-500\/20::before {
  content: "";
  position: absolute;
  left: -3px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #06b6d4, #0891b2);
  border-radius: 0 2px 2px 0;
}

/* Responsive - masquer sur les petits écrans */
@media (max-width: 1024px) {
  .fixed.left-4 {
    display: none;
  }
}
</style>
