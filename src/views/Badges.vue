<template>
  <div
    class="container mx-auto p-4 sm:p-6 pt-20 sm:pt-24 min-h-screen relative"
  >
    <!-- En-tête avec éléments graphiques cyberpunk -->
    <div
      class="absolute top-28 left-0 right-0 flex justify-between overflow-hidden z-0 opacity-30 pointer-events-none"
    >
      <div
        class="w-1/4 h-1 bg-gradient-to-r from-purple-500/50 to-transparent"
      ></div>
      <div
        class="w-1/4 h-1 bg-gradient-to-l from-purple-500/50 to-transparent"
      ></div>
    </div>
    <!-- Effet de grille cyberpunk en arrière-plan -->
    <div class="cyber-grid"></div>

    <!-- Header avec style cyberpunk synthwave -->
    <div class="max-w-6xl mx-auto mb-10">
      <div class="text-center relative z-10">
        <!-- Titre principal avec effet néon -->
        <h1 class="text-4xl text-white font-audiowide mb-4 neon-text">
          Collection de Badges
        </h1>
      </div>
    </div>

    <!-- Loader amélioré -->
    <div v-if="loading" class="flex justify-center my-12">
      <CyberpunkLoader />
    </div>

    <div v-else class="max-w-6xl mx-auto">
      <!-- Onglets améliorés - Badges attribués / Badges disponibles -->
      <div class="mb-8 flex justify-center">
        <div
          class="cyberpunk-neon-tabs bg-black/75 backdrop-blur-sm border border-purple-500/30 shadow-lg shadow-purple-500/20 p-1 rounded-xl w-full max-w-md"
        >
          <button
            @click="activeTab = 'assigned'"
            :class="[
              'cyberpunk-neon-tab w-1/2',
              { active: activeTab === 'assigned' },
            ]"
          >
            <span class="cyber-bracket">[</span>
            Badges Attribués
            <span class="cyber-bracket">]</span>
          </button>
          <button
            @click="activeTab = 'available'"
            :class="[
              'cyberpunk-neon-tab w-1/2',
              { active: activeTab === 'available' },
            ]"
          >
            <span class="cyber-bracket">[</span>
            Badges à obtenir
            <span class="cyber-bracket">]</span>
          </button>
        </div>
      </div>

      <!-- Filtre par jeu -->
      <div class="mb-8">
        <div
          class="bg-black/75 backdrop-blur-sm rounded-lg border border-purple-500/30 shadow-lg shadow-purple-500/20 p-4"
        >
          <label
            for="gameFilter"
            class="flex items-center text-lg text-purple-300 mb-3 font-orbitron"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
              />
            </svg>
            Filtrer par jeu
          </label>
          <div class="relative">
            <select
              id="gameFilter"
              v-model="selectedGameFilter"
              class="w-full p-3 text-white bg-gray-800/80 border border-purple-500/50 rounded-lg shadow-inner shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500/70 font-orbitron appearance-none"
            >
              <option value="all">Tous les jeux</option>
              <option value="acs">Badges ACS (Général)</option>
              <option v-for="game in games" :key="game._id" :value="game._id">
                {{ game.name }}
              </option>
            </select>
            <div
              class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
            >
              <svg
                class="h-5 w-5 text-purple-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Liste des badges attribués -->
      <div v-if="activeTab === 'assigned'">
        <div v-if="assignedBadges.length > 0">
          <!-- Section Badges ACS (visible seulement si selectedGameFilter est 'all' ou 'acs') -->
          <div
            v-if="
              (selectedGameFilter === 'all' || selectedGameFilter === 'acs') &&
              filteredAssignedAcsBadges.length > 0
            "
            class="mb-8 bg-black/40 backdrop-blur-sm rounded-xl border border-pink-500/10 p-6"
          >
            <div class="flex items-center mb-4">
              <div
                class="h-1 flex-grow bg-gradient-to-r from-transparent to-pink-500/70"
              ></div>
              <h2 class="text-xl font-audiowide text-white mx-4 neon-text-pink">
                Badges ACS
              </h2>
              <div
                class="h-1 flex-grow bg-gradient-to-l from-transparent to-pink-500/70"
              ></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="badge in filteredAssignedAcsBadges"
                :key="badge._id"
                class="bg-black/75 backdrop-blur-sm rounded-lg border-2 border-pink-500/40 p-5 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-500/30 hover:border-pink-500/70 flex flex-col h-auto min-h-[170px]"
              >
                <!-- En-tête du badge avec image et titre -->
                <div class="flex items-center mb-auto">
                  <div class="relative flex-shrink-0 mr-4">
                    <img
                      :src="badge.imageUrl"
                      :alt="badge.title"
                      class="h-16 w-16 rounded-full border-2 border-pink-500 object-cover"
                      loading="lazy"
                      @error="(e) => ((e.target as HTMLImageElement).src = '/img/badge-placeholder.jpg')"
                    />
                    <div
                      class="absolute inset-0 rounded-full"
                      style="
                        box-shadow: 0 0 15px rgba(236, 72, 153, 0.7);
                        border-radius: 50%;
                      "
                    ></div>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-white text-xl font-orbitron neon-text-pink">
                      {{ badge.title }}
                    </h3>
                    <span
                      class="bg-pink-500/20 text-pink-300 border border-pink-400/30 text-xs px-2 py-1 rounded-full mt-1 inline-block"
                    >
                      ACS
                    </span>
                  </div>
                </div>

                <!-- Bouton pour voir les joueurs -->
                <button
                  @click="selectBadge(badge)"
                  class="cyberpunk-btn-pink mt-4 w-full py-2 px-4 flex justify-center items-center gap-2 rounded-md text-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                    />
                  </svg>
                  Voir les joueurs ({{
                    badge._id ? getBadgePlayers(badge._id).length : 0
                  }})
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Section Badges par jeu -->
        <template v-for="game in gamesWithAssignedBadges" :key="game._id">
          <div
            v-if="
              selectedGameFilter === 'all' || selectedGameFilter === game._id
            "
            class="mb-8 bg-black/40 backdrop-blur-sm rounded-xl border border-cyan-500/10 p-6"
          >
            <div class="flex items-center mb-4">
              <div
                class="h-1 flex-grow bg-gradient-to-r from-transparent to-cyan-500/70"
              ></div>
              <h2 class="text-xl font-audiowide text-white mx-4 neon-text-cyan">
                {{ game.name }}
              </h2>
              <div
                class="h-1 flex-grow bg-gradient-to-l from-transparent to-cyan-500/70"
              ></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="badge in getAssignedBadgesByGame(game._id)"
                :key="badge._id"
                class="bg-black/75 backdrop-blur-sm rounded-lg border-2 border-cyan-500/40 p-5 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/30 hover:border-cyan-500/70 flex flex-col h-auto min-h-[170px]"
              >
                <!-- En-tête du badge avec image et titre -->
                <div class="flex items-center mb-auto">
                  <div class="relative flex-shrink-0 mr-4">
                    <img
                      :src="badge.imageUrl"
                      :alt="badge.title"
                      class="h-16 w-16 rounded-full border-2 border-cyan-500 object-cover"
                      loading="lazy"
                      @error="(e) => ((e.target as HTMLImageElement).src = '/img/badge-placeholder.jpg')"
                    />
                    <div
                      class="absolute inset-0 rounded-full"
                      style="
                        box-shadow: 0 0 15px rgba(6, 182, 212, 0.7);
                        border-radius: 50%;
                      "
                    ></div>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-white text-xl font-orbitron neon-text-cyan">
                      {{ badge.title }}
                    </h3>
                    <span
                      class="bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs px-2 py-1 rounded-full mt-1 inline-block max-w-full truncate"
                    >
                      {{ game.name }}
                    </span>
                  </div>
                </div>

                <!-- Bouton pour voir les joueurs -->
                <button
                  @click="selectBadge(badge)"
                  class="cyberpunk-btn-cyan mt-4 w-full py-2 px-4 flex justify-center items-center gap-2 rounded-md text-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                    />
                  </svg>
                  Voir les joueurs ({{
                    badge._id ? getBadgePlayers(badge._id).length : 0
                  }})
                </button>
              </div>
            </div>
          </div>
        </template>

        <!-- Message si aucun badge ne correspond au filtre sélectionné -->
        <div
          v-if="filteredAssignedBadges.length === 0"
          class="cyberpunk-panel p-8 text-center"
        >
          <div class="cyber-angle top-right"></div>
          <div class="cyber-angle bottom-left"></div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 mx-auto text-purple-400/70 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
            />
          </svg>
          <h3
            class="text-xl text-purple-300 font-orbitron mb-2 cyber-text-glow-purple"
          >
            Aucun badge ne correspond au filtre
          </h3>
          <p class="text-gray-400">
            Il n'y a pas de badges attribués pour le jeu sélectionné.
          </p>
        </div>
        <!-- Message si aucun badge n'est attribué -->
        <div
          v-else-if="assignedBadges.length === 0"
          class="cyberpunk-panel p-8 text-center"
        >
          <div class="cyber-angle top-right"></div>
          <div class="cyber-angle bottom-left"></div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 mx-auto text-purple-400/70 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h3
            class="text-xl text-purple-300 font-orbitron mb-2 cyber-text-glow-purple"
          >
            Aucun badge attribué
          </h3>
          <p class="text-gray-400">
            Aucun joueur n'a encore reçu de badge. Les badges seront attribués
            lors d'évènements spéciaux ou pour récompenser des accomplissements.
          </p>
        </div>
      </div>

      <!-- Liste des badges disponibles (non attribués) -->
      <div v-if="activeTab === 'available'">
        <div v-if="availableBadges.length > 0">
          <!-- Section Badges ACS disponibles -->
          <div
            v-if="
              (selectedGameFilter === 'all' || selectedGameFilter === 'acs') &&
              filteredAvailableAcsBadges.length > 0
            "
            class="mb-8 bg-black/40 backdrop-blur-sm rounded-xl border border-pink-500/10 p-6"
          >
            <div class="flex items-center mb-4">
              <div
                class="h-1 flex-grow bg-gradient-to-r from-transparent to-pink-500/30"
              ></div>
              <h2 class="text-xl font-audiowide text-gray-400 mx-4">
                Badges ACS
              </h2>
              <div
                class="h-1 flex-grow bg-gradient-to-l from-transparent to-pink-500/30"
              ></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="badge in filteredAvailableAcsBadges"
                :key="badge._id"
                class="bg-black/75 backdrop-blur-sm rounded-lg border border-gray-600 p-5 transform transition-all duration-300 hover:scale-[1.02] grayscale hover:grayscale-0 flex flex-col h-auto min-h-[170px]"
              >
                <div class="flex items-center mb-auto">
                  <div class="relative flex-shrink-0 mr-4">
                    <img
                      :src="badge.imageUrl"
                      :alt="badge.title"
                      class="h-16 w-16 rounded-full border-2 border-gray-600 object-cover opacity-75"
                      loading="lazy"
                      @error="(e) => ((e.target as HTMLImageElement).src = '/img/badge-placeholder.jpg')"
                    />
                  </div>
                  <div class="flex-1">
                    <h3 class="text-gray-400 text-xl font-orbitron">
                      {{ badge.title }}
                    </h3>
                    <span
                      class="bg-pink-500/20 text-pink-300 border border-pink-400/30 text-xs px-2 py-1 rounded-full mt-1 inline-block"
                    >
                      ACS
                    </span>
                  </div>
                </div>

                <button
                  class="cyberpunk-btn-gray mt-4 w-full py-2 px-4 rounded-md text-sm opacity-75 cursor-not-allowed"
                >
                  Ce badge n'a pas encore été attribué
                </button>
              </div>
            </div>
          </div>

          <!-- Section Badges de Jeux disponibles (par jeu) -->
          <template v-for="game in gamesWithAvailableBadges" :key="game._id">
            <div
              v-if="
                selectedGameFilter === 'all' || selectedGameFilter === game._id
              "
              class="mb-8"
            >
              <div class="flex items-center mb-4">
                <div
                  class="h-1 flex-grow bg-gradient-to-r from-transparent to-cyan-500/30"
                ></div>
                <h2 class="text-xl font-audiowide text-gray-400 mx-4">
                  {{ game.name }}
                </h2>
                <div
                  class="h-1 flex-grow bg-gradient-to-l from-transparent to-cyan-500/30"
                ></div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  v-for="badge in getAvailableBadgesByGame(game._id)"
                  :key="badge._id"
                  class="bg-black/75 backdrop-blur-sm rounded-lg border border-gray-600 p-5 transform transition-all duration-300 hover:scale-[1.02] grayscale hover:grayscale-0 flex flex-col h-auto min-h-[170px]"
                >
                  <div class="flex items-center mb-auto">
                    <div class="relative flex-shrink-0 mr-4">
                      <img
                        :src="badge.imageUrl"
                        :alt="badge.title"
                        class="h-16 w-16 rounded-full border-2 border-gray-600 object-cover opacity-75"
                        loading="lazy"
                        @error="(e) => ((e.target as HTMLImageElement).src = '/img/badge-placeholder.jpg')"
                      />
                    </div>
                    <div class="flex-1">
                      <h3 class="text-gray-400 text-xl font-orbitron">
                        {{ badge.title }}
                      </h3>
                      <span
                        class="bg-cyan-900/20 text-cyan-700/70 border border-cyan-800/30 text-xs px-2 py-1 rounded-full mt-1 inline-block max-w-full truncate"
                      >
                        {{ game.name }}
                      </span>
                    </div>
                  </div>

                  <button
                    class="cyberpunk-btn-gray mt-4 w-full py-2 px-4 rounded-md text-sm opacity-75 cursor-not-allowed"
                  >
                    Ce badge n'a pas encore été attribué
                  </button>
                </div>
              </div>
            </div>
          </template>

          <!-- Message si aucun badge disponible ne correspond au filtre -->
          <div
            v-if="filteredAvailableBadges.length === 0"
            class="cyberpunk-panel p-8 text-center"
          >
            <div class="cyber-angle top-right"></div>
            <div class="cyber-angle bottom-left"></div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 mx-auto text-cyan-500/70 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
            <h3
              class="text-xl text-cyan-300 font-orbitron mb-2 cyber-text-glow-cyan"
            >
              Tous les badges sont déjà attribués
            </h3>
            <p class="text-gray-400">
              Pour le jeu sélectionné, tous les badges ont déjà été attribués à
              au moins un joueur.
            </p>
          </div>
        </div>
        <!-- Message si tous les badges ont été attribués -->
        <div v-else class="cyberpunk-panel p-8 text-center">
          <div class="cyber-angle top-right"></div>
          <div class="cyber-angle bottom-left"></div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 mx-auto text-cyan-500/70 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          <h3
            class="text-xl text-cyan-300 font-orbitron mb-2 cyber-text-glow-cyan"
          >
            Tous les badges sont attribués
          </h3>
          <p class="text-gray-400">
            Bravo à tous les joueurs ! Tous les badges disponibles ont déjà été
            attribués à au moins un joueur.
          </p>
        </div>
      </div>

      <!-- Message si aucun badge -->
      <div
        v-if="!loading && badges.length === 0"
        class="cyberpunk-panel p-8 text-center"
      >
        <div class="cyber-angle top-right"></div>
        <div class="cyber-angle bottom-left"></div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 mx-auto text-pink-500/70 mb-4"
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
        <h3
          class="text-xl text-pink-300 font-orbitron mb-2 cyber-text-glow-pink"
        >
          Aucun badge trouvé
        </h3>
        <p class="text-gray-400 max-w-md mx-auto">
          Le système de badges est en cours de développement. De nouveaux badges
          seront ajoutés prochainement pour récompenser les joueurs.
        </p>
      </div>
    </div>

    <!-- Modal détail badge -->
    <div
      v-if="selectedBadge"
      @click="selectedBadge = null"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        @click.stop
        class="bg-black/90 border border-purple-500 rounded-lg w-full max-w-lg transform transition-all"
        :class="
          modalEnterActive ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        "
      >
        <!-- En-tête de modal -->
        <div class="modal-header relative h-3 bg-purple-900/40">
          <div
            class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          ></div>
        </div>

        <!-- Contenu du modal -->
        <div class="p-6">
          <!-- Titre et description du badge -->
          <div class="flex items-center mb-3">
            <div class="relative flex-shrink-0 mr-4">
              <img
                :src="selectedBadge.imageUrl"
                :alt="selectedBadge.title"
                class="h-16 w-16 rounded-full border-2 border-purple-500 object-cover"
                @error="(e) => ((e.target as HTMLImageElement).src = '/img/badge-placeholder.jpg')"
              />
              <div class="absolute inset-0 rounded-full glow-badge"></div>
            </div>
            <div class="flex-1">
              <h3 class="text-white text-2xl font-orbitron neon-text-purple">
                {{ selectedBadge.title }}
              </h3>
              <div class="mt-1">
                <span
                  :class="[
                    'text-xs px-2 py-1 rounded-full',
                    selectedBadge.categoryType === 'acs'
                      ? 'bg-pink-500/20 text-pink-300 border border-pink-400/30'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30',
                  ]"
                >
                  {{
                    selectedBadge.categoryType === "acs"
                      ? "ACS"
                      : getGameName(selectedBadge.categoryId)
                  }}
                </span>
              </div>
            </div>
          </div>

          <!-- Description du badge -->
          <p
            class="text-purple-300 text-sm mb-6 bg-purple-900/20 p-4 rounded border border-purple-500/30"
          >
            {{
              selectedBadge.description ||
              "Aucune description disponible pour ce badge."
            }}
          </p>

          <!-- Liste des joueurs -->
          <h4 class="text-purple-400 font-orbitron mb-3">
            Joueurs avec ce badge ({{
              selectedBadge._id ? getBadgePlayers(selectedBadge._id).length : 0
            }})
          </h4>

          <div
            class="bg-black/60 rounded-lg border border-purple-500/30 max-h-80 overflow-y-auto custom-scrollbar"
          >
            <div
              v-if="
                selectedBadge._id &&
                getBadgePlayers(selectedBadge._id).length > 0
              "
            >
              <div
                v-for="player in getBadgePlayers(selectedBadge._id)"
                :key="player._id"
                class="flex items-center p-3 border-b border-purple-900/50 hover:bg-purple-900/20 transition-colors"
              >
                <div
                  class="h-10 w-10 rounded-full bg-purple-900 flex items-center justify-center border border-purple-500 text-white mr-3 overflow-hidden"
                >
                  <img
                    v-if="getUserAvatar(player)"
                    :src="getUserAvatar(player)"
                    alt="Avatar"
                    class="w-full h-full object-cover"
                    loading="lazy"
                    @error="(e) => ((e.target as HTMLImageElement).src = '/img/avatar-placeholder.jpg')"
                  />
                  <span v-else>{{ getInitials(player.username) }}</span>
                </div>
                <router-link
                  :to="`/profil/${player._id}`"
                  class="text-white hover:text-purple-300 transition-colors font-orbitron"
                >
                  {{ player.username }}
                </router-link>
              </div>
            </div>
            <div v-else class="p-4 text-gray-400 italic text-center">
              Aucun joueur n'a encore obtenu ce badge
            </div>
          </div>

          <!-- Bouton fermer -->
          <div class="mt-6 flex justify-end">
            <button
              @click="selectedBadge = null"
              class="cyberpunk-btn-purple py-2 px-4 rounded-md text-sm"
            >
              Fermer
            </button>
          </div>
        </div>

        <!-- Pied de modal -->
        <div class="modal-footer relative h-3 bg-purple-900/40">
          <div
            class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//------------------------------------------------------
// 1. IMPORTS
//------------------------------------------------------
import { ref, onMounted, computed, watch } from "vue";
import badgeService from "../services/badgeService";
import playerService from "../services/playerService";
import userService from "../services/userService";
import gameService from "../services/gameService";
import type { Badge, Player } from "../types";
import CyberpunkLoader from "../shared/CyberpunkLoader.vue";

//------------------------------------------------------
// 2. ÉTAT ET RÉFÉRENCES
//------------------------------------------------------
// Données principales
const badges = ref<Badge[]>([]);
const players = ref<Player[]>([]);
const games = ref<any[]>([]);
const users = ref<any[]>([]);

// Interface utilisateur
const loading = ref(true);
const activeTab = ref("assigned"); // 'assigned' ou 'available'
const selectedGameFilter = ref("all");
const selectedBadge = ref<Badge | null>(null);
const modalEnterActive = ref(false);

//------------------------------------------------------
// 3. PROPRIÉTÉS CALCULÉES
//------------------------------------------------------
// 3.1 Filtres de base pour les badges
const assignedBadges = computed(() => {
  return badges.value.filter((badge) =>
    players.value.some(
      (player) =>
        player.badges &&
        player.badges.some((playerBadge) =>
          typeof playerBadge === "string"
            ? playerBadge === badge._id
            : playerBadge._id === badge._id
        )
    )
  );
});

const availableBadges = computed(() => {
  return badges.value.filter(
    (badge) =>
      !players.value.some(
        (player) =>
          player.badges &&
          player.badges.some((playerBadge) =>
            typeof playerBadge === "string"
              ? playerBadge === badge._id
              : playerBadge._id === badge._id
          )
      )
  );
});

// 3.2 Filtres par type (ACS vs Jeux)
const assignedAcsBadges = computed(() => {
  return assignedBadges.value.filter((badge) => badge.categoryType === "acs");
});

const filteredAssignedAcsBadges = computed(() => {
  return assignedAcsBadges.value;
});

const availableAcsBadges = computed(() => {
  return availableBadges.value.filter((badge) => badge.categoryType === "acs");
});

const filteredAvailableAcsBadges = computed(() => {
  return availableAcsBadges.value;
});

// 3.3 Filtres par jeu sélectionné
const filteredAssignedBadges = computed(() => {
  if (selectedGameFilter.value === "all") {
    return assignedBadges.value;
  } else if (selectedGameFilter.value === "acs") {
    return assignedBadges.value.filter((badge) => badge.categoryType === "acs");
  } else {
    return assignedBadges.value.filter(
      (badge) =>
        badge.categoryType === "game" &&
        badge.categoryId === selectedGameFilter.value
    );
  }
});

const filteredAvailableBadges = computed(() => {
  if (selectedGameFilter.value === "all") {
    return availableBadges.value;
  } else if (selectedGameFilter.value === "acs") {
    return availableBadges.value.filter(
      (badge) => badge.categoryType === "acs"
    );
  } else {
    return availableBadges.value.filter(
      (badge) =>
        badge.categoryType === "game" &&
        badge.categoryId === selectedGameFilter.value
    );
  }
});

// 3.4 Listes des jeux avec badges
const gamesWithAssignedBadges = computed(() => {
  const gameIds = new Set();

  assignedBadges.value.forEach((badge) => {
    if (badge.categoryType === "game" && badge.categoryId) {
      gameIds.add(badge.categoryId);
    }
  });

  return games.value
    .filter((game) => gameIds.has(game._id))
    .sort((a, b) => a.name.localeCompare(b.name));
});

const gamesWithAvailableBadges = computed(() => {
  const gameIds = new Set();

  availableBadges.value.forEach((badge) => {
    if (badge.categoryType === "game" && badge.categoryId) {
      gameIds.add(badge.categoryId);
    }
  });

  return games.value
    .filter((game) => gameIds.has(game._id))
    .sort((a, b) => a.name.localeCompare(b.name));
});

//------------------------------------------------------
// 4. MÉTHODES
//------------------------------------------------------
// 4.1 Chargement des données
const fetchData = async () => {
  try {
    loading.value = true;
    const [badgesData, playersData, usersData, gamesData] = await Promise.all([
      badgeService.getBadges(),
      playerService.getPlayers(),
      userService.fetchAllUsers(),
      gameService.getGames(),
    ]);

    badges.value = badgesData;
    players.value = playersData;
    users.value = usersData;
    games.value = gamesData;
  } catch (error) {
    console.error("Erreur lors du chargement des données:", error);
  } finally {
    loading.value = false;
  }
};

// 4.2 Méthodes d'aide pour filtrer et afficher les badges
const getAssignedBadgesByGame = (gameId: string) => {
  return assignedBadges.value.filter(
    (badge) => badge.categoryType === "game" && badge.categoryId === gameId
  );
};

const getAvailableBadgesByGame = (gameId: string) => {
  return availableBadges.value.filter(
    (badge) => badge.categoryType === "game" && badge.categoryId === gameId
  );
};

const getBadgePlayers = (badgeId: string): Player[] => {
  return players.value.filter(
    (player) =>
      player.badges &&
      player.badges.some((badge) =>
        typeof badge === "string" ? badge === badgeId : badge._id === badgeId
      )
  );
};

const getGameName = (gameId: string): string => {
  if (!gameId) return "";
  const game = games.value.find((g) => g._id === gameId);
  return game ? game.name : "Jeu inconnu";
};

// 4.3 Méthodes pour l'interface utilisateur
const getUserAvatar = (player: Player): string | undefined => {
  if (!player || !player.userId) return undefined;
  const user = users.value.find((u) => u._id === player.userId);
  return user?.avatarUrl || undefined;
};

const getInitials = (username: string): string => {
  if (!username) return "?";
  return username.charAt(0).toUpperCase();
};

const selectBadge = (badge: Badge) => {
  selectedBadge.value = badge;
  // Ajouter un petit délai pour permettre à l'animation d'entrée de fonctionner
  setTimeout(() => {
    modalEnterActive.value = true;
  }, 10);
};

//------------------------------------------------------
// 5. CYCLE DE VIE ET OBSERVATEURS
//------------------------------------------------------
watch(selectedBadge, (newValue) => {
  if (!newValue) {
    // Animation de sortie
    modalEnterActive.value = false;
  }
});

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* Effet de grille cyberpunk */
.cyber-grid {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
      to right,
      rgba(139, 92, 246, 0.05) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgba(139, 92, 246, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: -1;
  pointer-events: none;
  transform: perspective(500px) rotateX(30deg);
  opacity: 0.5;
}

/* Titre Cyberpunk Synthwave avec effet glitch */
.neon-text {
  color: white;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 15px #ff00ff;
}

.neon-text-pink {
  color: white;
  text-shadow: 0 0 10px #ec4899, 0 0 20px #ec4899, 0 0 15px #ec4899;
}

.neon-text-cyan {
  color: white;
  text-shadow: 0 0 10px #06b6d4, 0 0 20px #06b6d4, 0 0 15px #06b6d4;
}

.neon-text-purple {
  color: white;
  text-shadow: 0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 15px #a855f7;
}

.cyber-text-glow-purple {
  text-shadow: 0 0 5px rgba(168, 85, 247, 0.7);
}

.cyber-text-glow-cyan {
  text-shadow: 0 0 5px rgba(6, 182, 212, 0.7);
}

.cyber-text-glow-pink {
  text-shadow: 0 0 5px rgba(236, 72, 153, 0.7);
}

/* Effet de lueur pour les badges */
.glow-badge {
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.7);
  border-radius: 50%;
}

/* Panneau cyberpunk */
.cyberpunk-panel {
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  border-radius: 0.75rem;
  border: 1px solid rgb(139, 92, 246);
  box-shadow: 0 10px 25px -5px rgba(139, 92, 246, 0.3);
  padding: 1.25rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

/* Angles cyberpunk */
.cyber-angle {
  position: absolute;
  width: 0.75rem;
  height: 0.75rem;
  border: 1px solid rgb(139, 92, 246);
  z-index: 0;
}

.cyber-angle.top-right {
  top: 0;
  right: 0;
  border-bottom: 0;
  border-left: 0;
}

.cyber-angle.bottom-left {
  bottom: 0;
  left: 0;
  border-top: 0;
  border-right: 0;
}

/* Onglets néon améliorés */
.cyberpunk-neon-tabs {
  display: flex;
  background: rgba(30, 30, 40, 0.7);
  border-radius: 8px;
  padding: 4px;
  border: 1px solid rgba(168, 85, 247, 0.3);
  position: relative;
  overflow: hidden;
}

.cyberpunk-neon-tabs::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(168, 85, 247, 0.8),
    transparent
  );
  z-index: 1;
}

.cyberpunk-neon-tabs::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(168, 85, 247, 0.8),
    transparent
  );
  z-index: 1;
}

.cyberpunk-neon-tab {
  padding: 0.75rem 1.5rem;
  font-family: "Orbitron", sans-serif;
  font-size: 0.9rem;
  color: white;
  border: none;
  background: transparent;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.cyberpunk-neon-tab:hover {
  background: rgba(168, 85, 247, 0.15);
  color: rgb(216, 180, 254);
  text-shadow: 0 0 5px rgba(216, 180, 254, 0.7);
}

.cyberpunk-neon-tab.active {
  background: rgba(168, 85, 247, 0.3);
  color: rgb(216, 180, 254);
  box-shadow: 0 0 10px rgba(168, 85, 247, 0.3);
  text-shadow: 0 0 5px rgba(216, 180, 254, 0.7),
    0 0 10px rgba(216, 180, 254, 0.5);
}

/* Déco du titre dans les modales */
.cyber-bracket {
  color: rgba(139, 92, 246, 0.6);
  font-size: 1.1em;
  vertical-align: middle;
  display: inline-block;
  margin: 0 3px;
}

/* Scrollbar customisée */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(168, 85, 247, 0.5) rgba(30, 30, 30, 0.8);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(30, 30, 30, 0.8);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(168, 85, 247, 0.5);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(168, 85, 247, 0.7);
}

/* Améliorations pour les écrans mobiles */
@media (max-width: 640px) {
  .cyberpunk-neon-tabs {
    flex-direction: column;
    width: 100%;
  }

  .cyberpunk-neon-tab {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .cyber-bracket {
    display: none; /* Cache les crochets sur mobile pour plus de lisibilité */
  }
}

/* Hover amélioré pour les cartes de badge */
.bg-black\/75 {
  transition: all 0.3s ease-in-out;
}

.bg-black\/75:hover {
  background-color: rgba(17, 24, 39, 0.85);
  transform: translateY(-5px);
}
</style>
