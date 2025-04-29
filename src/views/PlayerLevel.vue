<template>
  <div class="container mx-auto p-4 sm:p-6 pt-20 sm:pt-24">
    <!-- En-tête avec style cyberpunk -->
    <h1
      class="text-3xl sm:text-4xl text-white mb-6 sm:mb-8 neon-text font-audiowide text-center"
    >
      Mes niveaux de jeux
    </h1>

    <div
      class="bg-black/75 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-pink-500 shadow-lg shadow-pink-500/30"
    >
      <div v-if="loading" class="flex justify-center py-12">
        <CyberpunkLoader />
      </div>

      <template v-else>
        <!-- Section des jeux avec niveau défini -->
        <div v-if="playerLevels.length > 0" class="mb-10">
          <h2 class="text-xl text-white font-audiowide mb-6 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2 text-cyan-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            Mes niveaux actuels
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="level in playerLevels"
              :key="level._id"
              class="cyber-card relative bg-gray-900/50 rounded-lg overflow-hidden border border-gray-800 hover:border-cyan-500/50 transition-all group"
            >
              <!-- Lignes décoratives cyberpunk -->
              <div
                class="absolute top-0 left-6 h-3 w-[1px] bg-cyan-500/60"
              ></div>
              <div
                class="absolute top-0 left-10 h-6 w-[1px] bg-pink-500/60"
              ></div>

              <!-- En-tête avec image de jeu -->
              <div class="relative h-32 overflow-hidden">
                <img
                  v-if="getGameImage(level)"
                  :src="getGameImage(level)"
                  :alt="getGameName(level)"
                  class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  @error="handleImageError"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-16 w-16 text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
                    />
                  </svg>
                </div>

                <!-- Overlay gradient -->
                <div
                  class="absolute inset-0 bg-gradient-to-t from-gray-900/95 to-transparent"
                ></div>

                <!-- Niveau sous forme de badge -->
                <div class="absolute bottom-3 right-3">
                  <span
                    :class="getLevelClass(level.level)"
                    class="px-3 py-1 rounded-full text-xs font-medium shadow-lg"
                  >
                    {{ level.level }}
                  </span>
                </div>

                <!-- Nom du jeu en bas -->
                <div class="absolute bottom-0 left-0 w-full p-3">
                  <h3 class="text-lg text-white font-orbitron truncate">
                    {{ getGameName(level) }}
                  </h3>
                </div>
              </div>

              <!-- Contenu -->
              <div class="p-5 bg-gray-900/80">
                <!-- Pseudo dans le jeu -->
                <div v-if="level.gameUsername" class="mb-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-cyan-400 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-sm text-gray-300 mr-2">Pseudo:</span>
                  <span class="text-sm text-white">{{
                    level.gameUsername
                  }}</span>
                </div>

                <!-- Rang -->
                <div
                  v-if="level.isRanked && level.rank"
                  class="mb-3 flex items-center bg-gray-800/50 p-2 rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-yellow-400 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-sm text-gray-300 mr-2">Rang:</span>
                  <span
                    :class="['text-sm font-medium', getRankClass(level.rank)]"
                  >
                    {{ level.rank }}
                  </span>
                </div>

                <!-- Commentaire -->
                <div
                  v-if="level.comment"
                  class="mb-4 bg-gray-800/50 p-3 rounded"
                >
                  <p class="text-sm text-gray-400 italic">
                    « {{ level.comment }} »
                  </p>
                </div>

                <!-- Boutons d'action -->
                <div class="flex justify-end space-x-3 mt-4 font-orbitron">
                  <button
                    @click="openEditModal(level)"
                    class="cyberpunk-btn-cyan px-3 py-1.5 rounded-md text-sm flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                      />
                    </svg>
                    Modifier
                  </button>
                  <button
                    @click="confirmDelete(level)"
                    class="cyberpunk-btn-red px-3 py-1.5 rounded-md text-sm flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section pour ajouter un nouveau niveau -->
        <div>
          <h2 class="text-xl text-white font-audiowide mb-6 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2 text-pink-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            Ajouter un niveau
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Carte pour ajouter un nouveau niveau -->
            <div
              @click="showGameSelector = true"
              class="cyber-add-card bg-gray-900/30 rounded-lg border-2 border-dashed border-gray-700 hover:border-pink-500/50 p-8 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-gray-900/50 relative overflow-hidden"
            >
              <!-- Effet de scan -->
              <div
                class="absolute inset-0 w-full h-6 bg-pink-500/5 animate-scan"
              ></div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 text-pink-500/70 mb-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <p class="text-pink-300 font-orbitron">
                Définir un nouveau niveau
              </p>

              <!-- Bordures de style cyberpunk -->
              <div
                class="absolute top-0 left-0 w-8 h-[1px] bg-pink-500/70"
              ></div>
              <div
                class="absolute top-0 left-0 w-[1px] h-8 bg-pink-500/70"
              ></div>
              <div
                class="absolute bottom-0 right-0 w-8 h-[1px] bg-pink-500/70"
              ></div>
              <div
                class="absolute bottom-0 right-0 w-[1px] h-8 bg-pink-500/70"
              ></div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Modal pour sélectionner un jeu -->
    <div
      v-if="showGameSelector"
      class="fixed inset-0 flex items-center justify-center z-50 px-4 py-6"
    >
      <div
        class="absolute inset-0 bg-black/80 backdrop-blur-sm"
        @click="showGameSelector = false"
      ></div>

      <div
        class="cyber-modal bg-gray-900 rounded-lg p-4 sm:p-6 w-full max-w-lg relative z-10 border border-cyan-500/50 shadow-lg shadow-cyan-500/30 max-h-[90vh] overflow-y-auto cyber-scrollbar"
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl text-white font-audiowide flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-cyan-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
              />
            </svg>
            Sélectionner un jeu
          </h3>
          <button
            @click="showGameSelector = false"
            class="text-gray-400 hover:text-white hover:bg-gray-800/50 p-1 rounded-md transition-colors"
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

        <!-- Recherche de jeux -->
        <div class="mb-5 relative">
          <input
            v-model="gameSearch"
            type="text"
            placeholder="Rechercher un jeu..."
            class="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 font-orbitron"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400 absolute left-3 top-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <!-- Liste de jeux avec niveau déjà défini affichés en grisé -->
        <div class="max-h-96 overflow-y-auto mb-4 pr-2 cyber-scrollbar">
          <div
            v-if="filteredGames.length === 0"
            class="text-gray-400 text-center py-8 bg-gray-800/50 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 mx-auto text-gray-500 mb-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clip-rule="evenodd"
              />
            </svg>
            <p v-if="gameSearch" class="font-orbitron">
              Aucun jeu ne correspond à votre recherche
            </p>
            <p v-else class="font-orbitron">Aucun jeu disponible</p>
          </div>

          <div v-else>
            <div
              v-for="game in filteredGames"
              :key="game._id"
              @click="selectGame(game)"
              :class="[
                'p-4 rounded-lg mb-3 flex items-center cursor-pointer transition-all',
                hasLevelForGame(game)
                  ? 'bg-gray-800/70 hover:bg-gray-800/90 border border-gray-700'
                  : 'cyber-game-item bg-gray-800/40 hover:bg-gray-700/70 border border-gray-700 hover:border-cyan-500/50',
              ]"
            >
              <!-- Image du jeu -->
              <div
                class="w-14 h-14 rounded overflow-hidden bg-gray-900 flex-shrink-0"
              >
                <img
                  v-if="game.imageUrl"
                  :src="game.imageUrl"
                  :alt="game.name"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8 text-gray-600"
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
                </div>
              </div>

              <!-- Informations du jeu -->
              <div class="ml-4 flex-grow">
                <h4 class="text-white font-medium font-orbitron">
                  {{ game.name }}
                </h4>
                <p
                  v-if="game.description"
                  class="text-gray-400 text-sm line-clamp-1"
                >
                  {{ game.description }}
                </p>
              </div>

              <!-- Indicateur de niveau déjà défini -->
              <div
                v-if="hasLevelForGame(game)"
                class="ml-3 px-2 py-1 rounded-full bg-gray-700/80 border border-gray-600 flex-shrink-0"
              >
                <span class="text-xs text-white font-orbitron">
                  {{ getLevelForGame(game)?.level }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Boutons d'action -->
        <div class="flex justify-end mt-4 border-t border-gray-800 pt-4">
          <button
            @click="showGameSelector = false"
            class="cyberpunk-btn-gray px-4 py-2 rounded-md font-orbitron text-sm"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>

    <!-- Modal pour définir le niveau -->
    <div
      v-if="showLevelSelector"
      class="fixed inset-0 flex items-center justify-center z-50 px-4 py-6"
    >
      <div
        class="absolute inset-0 bg-black/80 backdrop-blur-sm"
        @click="cancelLevelEdit"
      ></div>

      <div
        class="cyber-modal bg-gray-900 rounded-lg p-5 sm:p-6 w-full max-w-lg relative z-10 border border-cyan-500/50 shadow-lg shadow-cyan-500/30 max-h-[90vh] overflow-y-auto cyber-scrollbar"
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl text-white font-audiowide flex items-center">
            <img
              v-if="selectedGame?.imageUrl"
              :src="selectedGame.imageUrl"
              :alt="selectedGame?.name"
              class="w-8 h-8 rounded mr-3 object-cover"
            />
            <span>{{ selectedGame?.name }}</span>
          </h3>
          <button
            @click="cancelLevelEdit"
            class="text-gray-400 hover:text-white hover:bg-gray-800/50 p-1 rounded-md transition-colors"
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

        <form @submit.prevent="saveLevel" class="space-y-6">
          <!-- Sélection du niveau -->
          <div>
            <label
              class="block text-cyan-300 text-sm font-medium mb-3 font-orbitron"
              >Niveau de jeu</label
            >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                v-for="levelOption in availableLevels"
                :key="levelOption.value"
                :class="[
                  'p-3 border rounded-md cursor-pointer transition-all duration-300 flex items-center justify-between',
                  selectedLevel === levelOption.value
                    ? 'border-cyan-500 bg-cyan-900/30 shadow-inner shadow-cyan-500/20'
                    : 'border-gray-700 hover:border-gray-500',
                ]"
                @click="selectedLevel = levelOption.value"
              >
                <div class="flex items-center">
                  <div
                    :class="getLevelClass(levelOption.value)"
                    class="w-3 h-3 rounded-full mr-3"
                  ></div>
                  <span class="text-white font-orbitron text-sm">{{
                    levelOption.label
                  }}</span>
                </div>
                <svg
                  v-if="selectedLevel === levelOption.value"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-cyan-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Pseudo dans le jeu -->
          <div>
            <label
              for="gameUsername"
              class="block text-cyan-300 text-sm font-medium mb-2 font-orbitron"
            >
              Pseudo dans le jeu (optionnel)
            </label>
            <input
              id="gameUsername"
              v-model="gameUsername"
              type="text"
              placeholder="Votre pseudo dans ce jeu"
              maxlength="30"
              class="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:border-cyan-500 focus:outline-none font-orbitron"
            />
            <div class="flex justify-between mt-1">
              <p class="text-xs text-gray-400">
                Par exemple: Votre pseudo League of Legends pour accéder à votre
                OP.GG
              </p>
              <p class="text-xs text-gray-400">{{ gameUsername.length }}/30</p>
            </div>
          </div>

          <!-- Classement -->
          <div>
            <div class="flex items-center mb-2">
              <input
                id="isRanked"
                v-model="isRanked"
                type="checkbox"
                class="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-700 rounded bg-gray-800"
              />
              <label
                for="isRanked"
                class="ml-2 block text-cyan-300 text-sm font-medium font-orbitron"
              >
                Je joue en classé
              </label>
            </div>

            <div v-if="isRanked" class="mt-3">
              <label
                for="rank"
                class="block text-cyan-300 text-sm font-medium mb-2 font-orbitron"
              >
                Rang actuel
              </label>
              <input
                id="rank"
                v-model="rank"
                type="text"
                placeholder="Ex: Diamant 2, Master, Silver 3..."
                maxlength="20"
                class="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:border-cyan-500 focus:outline-none font-orbitron"
              />
              <div class="flex justify-between mt-1">
                <p class="text-xs text-amber-400 italic font-orbitron">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3 inline mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Merci d'indiquer votre plus haut rang, pas un smurf
                </p>
                <p class="text-xs text-gray-400">{{ rank.length }}/20</p>
              </div>
            </div>
          </div>

          <!-- Commentaire -->
          <div>
            <label
              for="comment"
              class="block text-cyan-300 text-sm font-medium mb-2 font-orbitron"
            >
              Commentaire (optionnel)
            </label>
            <textarea
              id="comment"
              v-model="comment"
              rows="3"
              placeholder="Informations complémentaires, rôle préféré, etc."
              maxlength="150"
              class="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:border-cyan-500 focus:outline-none font-orbitron"
            ></textarea>
            <div class="flex justify-end mt-1">
              <p class="text-xs text-gray-400">{{ comment.length }}/150</p>
            </div>
          </div>

          <!-- Boutons d'action -->
          <div class="flex justify-end space-x-3 pt-3 border-t border-gray-800">
            <button
              type="button"
              @click="cancelLevelEdit"
              class="cyberpunk-btn-gray px-4 py-2 rounded-md font-orbitron text-sm"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="cyberpunk-btn-cyan px-4 py-2 rounded-md font-orbitron text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="!selectedLevel || isSaving"
            >
              <span v-if="isSaving" class="flex items-center">
                <svg
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Enregistrement...
              </span>
              <span v-else>Enregistrer</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de confirmation de suppression -->
    <ConfirmationDialog
      v-if="showDeleteConfirmation"
      title="Confirmer la suppression"
      :message="`Êtes-vous sûr de vouloir supprimer votre niveau pour ${
        levelToDelete ? getGameName(levelToDelete) : 'Jeu inconnu'
      } ?`"
      @confirm="deleteLevel"
      @cancel="cancelDelete"
    />

    <!-- Toast pour les notifications (en utilisant votre composant) -->
    <Toast v-if="toast.show" :type="toast.type" :message="toast.message" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
import { useUserStore } from "../stores/userStore";
import playerGameLevelService from "../services/playerGameLevelService";
import gameService from "../services/gameService";
import type { Game, PlayerGameLevel } from "../types";
import CyberpunkLoader from "@/shared/CyberpunkLoader.vue";
import Toast from "@/shared/Toast.vue";
import ConfirmationDialog from "@/shared/ConfirmationDialog.vue";
import { getRankClass } from "../utils/rankHelper"; // Importez la fonction utilitaire

// -----------------------------------------------
// #region ÉTATS RÉACTIFS
// -----------------------------------------------
const userStore = useUserStore();
const loading = ref(true);
const playerLevels = ref<PlayerGameLevel[]>([]);
const games = ref<Game[]>([]);
const currentPlayerId = computed(() => userStore.playerId || "");

// États des modales
const showGameSelector = ref(false);
const showLevelSelector = ref(false);
const showDeleteConfirmation = ref(false);

// États du formulaire de niveau
const selectedGame = ref<Game | null>(null);
const selectedGameId = ref<string>(""); // Nouvelle référence pour l'ID du jeu

const selectedLevel = ref<string>("");
const gameUsername = ref<string>("");
const isRanked = ref<boolean>(false);
const rank = ref<string>("");
const comment = ref<string>("");
const editingLevelId = ref<string | null>(null);
const isSaving = ref(false);
const gameSearch = ref("");

// États pour la suppression
const levelToDelete = ref<PlayerGameLevel | null>(null);
const isDeleting = ref(false);

// Toast notifications
const toast = ref({
  show: false,
  message: "",
  type: "success" as "success" | "error",
});
// #endregion

// -----------------------------------------------
// #region DONNÉES STATIQUES
// -----------------------------------------------
const availableLevels = [
  { value: "débutant", label: "Débutant" },
  { value: "intermédiaire", label: "Intermédiaire" },
  { value: "avancé", label: "Avancé" },
  { value: "expert", label: "Expert" },
];
// #endregion

// -----------------------------------------------
// #region COMPUTED PROPERTIES
// -----------------------------------------------
// Jeux filtrés selon la recherche et sans ceux qui ont déjà un niveau
const filteredGames = computed(() => {
  // Récupérer les IDs des jeux pour lesquels un niveau est déjà défini
  const existingGameIds = playerLevels.value.map((level) => {
    return typeof level.game === "object" ? level.game._id : level.game;
  });

  // Filtrer les jeux
  const search = gameSearch.value.trim().toLowerCase();
  return games.value
    .filter((game) => !existingGameIds.includes(game._id)) // Jeux sans niveau défini
    .filter((game) => !search || game.name.toLowerCase().includes(search)); // Recherche
});
// #endregion

// -----------------------------------------------
// #region HELPERS ET UTILITAIRES
// -----------------------------------------------
// Récupérer l'image du jeu
const getGameImage = (level: PlayerGameLevel): string | undefined => {
  return typeof level.game === "object" && level.game.imageUrl
    ? level.game.imageUrl
    : undefined;
};

// Récupérer le nom du jeu
const getGameName = (level: PlayerGameLevel): string => {
  return typeof level.game === "object" && level.game.name
    ? level.game.name
    : "Jeu inconnu";
};

// Obtenir la classe CSS pour le niveau
const getLevelClass = (level: string): string => {
  const classes = {
    débutant: "bg-green-500/80 text-green-50",
    intermédiaire: "bg-blue-500/80 text-blue-50",
    avancé: "bg-purple-500/80 text-purple-50",
    expert: "bg-pink-500/80 text-pink-50",
  };

  return (
    classes[level as keyof typeof classes] || "bg-gray-500/80 text-gray-50"
  );
};

// Gérer l'erreur de chargement d'image
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  if (target) {
    target.src = "/placeholder-game.jpg";
  }
};

// Vérifier si un niveau existe déjà pour un jeu
const hasLevelForGame = (game: Game): boolean => {
  return playerLevels.value.some((level) => {
    const gameId = typeof level.game === "object" ? level.game._id : level.game;
    return gameId === game._id;
  });
};

// Obtenir le niveau pour un jeu donné
const getLevelForGame = (game: Game): PlayerGameLevel | undefined => {
  return playerLevels.value.find((level) => {
    const gameId = typeof level.game === "object" ? level.game._id : level.game;
    return gameId === game._id;
  });
};
// #endregion

// -----------------------------------------------
// #region GESTION DES NOTIFICATIONS
// -----------------------------------------------
// Afficher un toast
const showToast = (message: string, type: "success" | "error") => {
  toast.value = { show: true, message, type };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};
// #endregion

// -----------------------------------------------
// #region OPÉRATIONS CRUD ET APPELS API
// -----------------------------------------------
// Récupération des niveaux du joueur
const fetchPlayerLevels = async () => {
  if (!currentPlayerId.value) {
    console.warn("fetchPlayerLevels: Aucun ID de joueur disponible");
    return;
  }

  try {
    const response = await playerGameLevelService.getPlayerLevels(
      currentPlayerId.value
    );
    playerLevels.value = response || [];
  } catch (error) {
    console.error("Erreur lors du chargement des niveaux:", error);
    showToast("Erreur lors du chargement des niveaux de jeu", "error");
    playerLevels.value = [];
  }
};

// Récupérer la liste des jeux
const fetchGames = async () => {
  try {
    games.value = await gameService.getGames();
  } catch (error) {
    console.error("Erreur lors du chargement des jeux:", error);
    showToast("Erreur lors du chargement des jeux", "error");
  }
};

// Enregistrer le niveau
const saveLevel = async (e?: Event) => {
  // Empêcher le comportement par défaut du formulaire si l'événement est fourni
  if (e) e.preventDefault();

  // Vérification des données requises
  if (!selectedGameId.value || !selectedLevel.value || !currentPlayerId.value) {
    showToast("Données incomplètes pour l'enregistrement", "error");
    return;
  }

  isSaving.value = true;

  try {
    await playerGameLevelService.setPlayerLevel(
      currentPlayerId.value,
      selectedGameId.value,
      {
        level: selectedLevel.value,
        gameUsername: gameUsername.value.trim(),
        isRanked: isRanked.value,
        rank: isRanked.value ? rank.value.trim() : undefined,
        comment: comment.value.trim(),
      }
    );

    await fetchPlayerLevels();
    showLevelSelector.value = false;
    resetForm();
    showToast("Niveau enregistré avec succès", "success");
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du niveau:", error);
    showToast("Erreur lors de l'enregistrement du niveau", "error");
  } finally {
    isSaving.value = false;
  }
};

// Supprimer un niveau
const deleteLevel = async () => {
  if (!levelToDelete.value || !currentPlayerId.value) return;

  isDeleting.value = true;

  try {
    const gameId =
      typeof levelToDelete.value.game === "object"
        ? levelToDelete.value.game._id
        : levelToDelete.value.game;

    await playerGameLevelService.deletePlayerLevel(
      currentPlayerId.value,
      gameId || ""
    );
    await fetchPlayerLevels();

    showDeleteConfirmation.value = false;
    levelToDelete.value = null;
    showToast("Niveau supprimé avec succès", "success");
  } catch (error) {
    console.error("Erreur lors de la suppression du niveau:", error);
    showToast("Erreur lors de la suppression du niveau", "error");
  } finally {
    isDeleting.value = false;
  }
};
// #endregion

// -----------------------------------------------
// #region GESTION DU FORMULAIRE
// -----------------------------------------------
// Ouvrir le modal d'édition pour un niveau existant
// Ouvrir le modal d'édition pour un niveau existant
const openEditModal = (level: PlayerGameLevel) => {
  // Récupérer le jeu
  if (typeof level.game === "object") {
    selectedGame.value = level.game;
    selectedGameId.value = level.game._id as string; // Ajouter cette ligne
  } else {
    selectedGame.value = games.value.find((g) => g._id === level.game) || null;
    selectedGameId.value = level.game as string; // Ajouter cette ligne
  }

  if (!selectedGame.value) return;

  // Définir les valeurs du formulaire
  selectedLevel.value = level.level;
  gameUsername.value = level.gameUsername || "";
  isRanked.value = level.isRanked || false;
  rank.value = level.rank || "";
  comment.value = level.comment || "";
  editingLevelId.value = level._id || null;

  // Afficher la modale
  showLevelSelector.value = true;
};

// Sélectionner un jeu dans la liste
const selectGame = (game: Game) => {
  selectedGame.value = game;
  selectedGameId.value = game._id as string; // Stocker l'ID séparément

  showGameSelector.value = false;

  // Vérifier si le joueur a déjà défini un niveau pour ce jeu
  const existingLevel = getLevelForGame(game);

  if (existingLevel) {
    selectedLevel.value = existingLevel.level;
    gameUsername.value = existingLevel.gameUsername || "";
    isRanked.value = existingLevel.isRanked || false;
    rank.value = existingLevel.rank || "";
    comment.value = existingLevel.comment || "";
    editingLevelId.value = existingLevel._id || null;
  } else {
    // Important: Ne pas appeler resetForm() car cela effacerait selectedGameId
    // Au lieu de cela, réinitialiser uniquement les autres champs
    selectedLevel.value = "débutant"; // Valeur par défaut
    gameUsername.value = "";
    isRanked.value = false;
    rank.value = "";
    comment.value = "";
    editingLevelId.value = null;
  }

  showLevelSelector.value = true;
};

// Annuler l'édition d'un niveau
const cancelLevelEdit = () => {
  showLevelSelector.value = false;
  resetForm();
};

// Réinitialiser le formulaire
const resetForm = () => {
  selectedGame.value = null;
  // Ne réinitialiser selectedGameId que si nous ne sommes pas dans la modale de sélection de niveau
  if (!showLevelSelector.value) {
    selectedGameId.value = "";
  }
  selectedLevel.value = "";
  gameUsername.value = "";
  isRanked.value = false;
  rank.value = "";
  comment.value = "";
  editingLevelId.value = null;
};
// #endregion

// -----------------------------------------------
// #region GESTION DE LA SUPPRESSION
// -----------------------------------------------
// Confirmer la suppression d'un niveau
const confirmDelete = (level: PlayerGameLevel) => {
  levelToDelete.value = level;
  showDeleteConfirmation.value = true;
};

// Annuler la suppression
const cancelDelete = () => {
  levelToDelete.value = null;
  showDeleteConfirmation.value = false;
};
// #endregion

// -----------------------------------------------
// #region CYCLE DE VIE DU COMPOSANT
// -----------------------------------------------
// Initialisation des données
onMounted(async () => {
  loading.value = true;

  try {
    // Charger l'utilisateur si besoin
    if (!userStore.user) {
      await userStore.fetchUser();
    }

    if (!userStore.user) {
      showToast("Veuillez vous connecter pour accéder à cette page", "error");
      return;
    }

    // Récupérer l'ID du joueur si besoin
    if (!currentPlayerId.value) {
      await userStore.fetchPlayer(userStore.user._id);
    }

    if (!currentPlayerId.value) {
      showToast("Impossible de récupérer votre profil joueur", "error");
      return;
    }

    // Charger les données en parallèle
    await Promise.all([fetchPlayerLevels(), fetchGames()]);
  } catch (error) {
    console.error("Erreur lors de l'initialisation:", error);
    showToast("Erreur lors du chargement des données", "error");
  } finally {
    loading.value = false;
  }
});

// Observer les changements d'utilisateur
const unwatchUser = watch(
  () => userStore.user,
  async (newUser) => {
    if (newUser && !playerLevels.value.length) {
      loading.value = true;

      if (!currentPlayerId.value) {
        await userStore.fetchPlayer(newUser._id);
      }

      if (currentPlayerId.value) {
        await Promise.all([fetchPlayerLevels(), fetchGames()]);
      }

      loading.value = false;
    }
  },
  { immediate: true }
);

// Réinitialiser la recherche quand le modal est ouvert
watch(showGameSelector, (newVal) => {
  if (newVal) {
    gameSearch.value = "";
  }
});

// Nettoyer les observateurs
onUnmounted(() => {
  if (unwatchUser) unwatchUser();
});
// #endregion
</script>

<style scoped>
.neon-text-cyan {
  text-shadow: 0 0 10px rgba(6, 182, 212, 0.7), 0 0 20px rgba(6, 182, 212, 0.4);
}

.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

/* Style pour les cartes cyberpunk */
.cyber-card {
  position: relative;
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% 100%,
    10px 100%,
    0 calc(100% - 10px)
  );
  transition: all 0.3s ease;
}

.cyber-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px -5px rgba(6, 182, 212, 0.3);
}

/* Style pour les modals cyberpunk */
.cyber-modal {
  clip-path: polygon(
    10px 0,
    100% 0,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    0 100%,
    0 10px
  );
  position: relative;
}

.cyber-modal-red {
  border-color: rgba(239, 68, 68, 0.3);
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.2);
}

/* Style pour les scrollbars */
.cyber-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(6, 182, 212, 0.3) rgba(17, 24, 39, 0.8);
}

.cyber-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.cyber-scrollbar::-webkit-scrollbar-track {
  background: rgba(17, 24, 39, 0.8);
  border-radius: 10px;
}

.cyber-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(6, 182, 212, 0.3);
  border-radius: 10px;
}

.cyber-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(6, 182, 212, 0.5);
}

/* Style pour la carte d'ajout */
.cyber-add-card {
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% 100%,
    10px 100%,
    0 calc(100% - 10px)
  );
}

/* Style pour les jeux dans la liste */
.cyber-game-item {
  position: relative;
  overflow: hidden;
}

.cyber-game-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 0;
  background: rgb(6, 182, 212);
  transition: height 0.3s ease;
}

.cyber-game-item:hover::before {
  height: 100%;
}

/* Animation scan */
@keyframes scan {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(300%);
  }
}

.animate-scan {
  animation: scan 3s linear infinite;
}

/* Effet de clignotement */
@keyframes flash {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Style du panneau cyber */
.cyber-panel {
  position: relative;
}

/* Tronquer le texte */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 640px) {
  .cyber-modal {
    clip-path: polygon(
      5px 0,
      100% 0,
      100% calc(100% - 5px),
      calc(100% - 5px) 100%,
      0 100%,
      0 5px
    );
  }

  .cyber-card {
    clip-path: polygon(
      0 0,
      calc(100% - 5px) 0,
      100% 5px,
      100% 100%,
      5px 100%,
      0 calc(100% - 5px)
    );
  }
}

/* Amélioration du défilement pour mobile */
.max-h-modal {
  max-height: 80vh;
}

/* Support tactile amélioré */
@media (hover: none) {
  .cyber-game-item:active::before {
    height: 100%;
  }

  .cyber-card:active {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px -5px rgba(6, 182, 212, 0.3);
  }
}
</style>
