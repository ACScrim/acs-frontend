<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\GestionBadges.vue -->
<template>
  <div class="container mx-auto p-8 pt-20 max-w-6xl">
    <!-- Container principal -->
    <div
      class="bg-black/80 backdrop-blur-xl rounded-xl border border-purple-500/30 shadow-lg shadow-purple-500/20 p-8 relative overflow-hidden"
    >
      <!-- En-tête -->
      <div class="text-center mb-10 relative z-10">
        <h1 class="text-4xl text-white font-audiowide mb-2 neon-text-pink">
          Gestion des Badges
        </h1>
        <div
          class="h-1 w-40 mx-auto bg-gradient-to-r from-transparent via-pink-500 to-transparent rounded shadow-glow"
        ></div>
      </div>

      <!-- Section Création de badge -->
      <div
        class="mb-8 bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30 shadow-lg shadow-cyan-500/20 relative z-10"
      >
        <div
          class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
        ></div>

        <h2
          class="text-2xl font-orbitron text-cyan-300 mb-6 border-b border-cyan-500/40 pb-2 flex items-center"
        >
          <span class="text-pink-500 mr-2">›</span> Créer un nouveau badge
        </h2>

        <form @submit.prevent="createBadge" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                for="title"
                class="block text-lg text-cyan-300 mb-2 font-orbitron"
                >Titre</label
              >
              <input
                id="title"
                v-model="newBadge.title"
                type="text"
                class="w-full p-3 text-white bg-gray-800/80 border border-cyan-500/50 rounded-lg shadow-inner shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 font-orbitron"
                required
              />
            </div>

            <div>
              <label
                for="categoryType"
                class="block text-lg text-cyan-300 mb-2 font-orbitron"
                >Catégorie</label
              >
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  class="flex items-center space-x-3 p-3 rounded bg-gray-800/50 border border-cyan-500/30 hover:border-cyan-500/60 transition-colors duration-300"
                >
                  <input
                    id="categoryTypeAcs"
                    v-model="newBadge.categoryType"
                    type="radio"
                    value="acs"
                    class="h-5 w-5 accent-pink-500"
                  />
                  <label
                    for="categoryTypeAcs"
                    class="text-white font-orbitron cursor-pointer"
                  >
                    Badge ACS (général)
                  </label>
                </div>
                <div
                  class="flex items-center space-x-3 p-3 rounded bg-gray-800/50 border border-pink-500/30 hover:border-pink-500/60 transition-colors duration-300"
                >
                  <input
                    id="categoryTypeGame"
                    v-model="newBadge.categoryType"
                    type="radio"
                    value="game"
                    class="h-5 w-5 accent-pink-500"
                  />
                  <label
                    for="categoryTypeGame"
                    class="text-white font-orbitron cursor-pointer"
                  >
                    Badge spécifique à un jeu
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Sélecteur de jeu, visible uniquement si catégorie = jeu -->
          <div v-if="newBadge.categoryType === 'game'">
            <label
              for="categoryId"
              class="block text-lg text-cyan-300 mb-2 font-orbitron"
              >Jeu associé</label
            >
            <div class="relative">
              <select
                id="categoryId"
                v-model="newBadge.categoryId"
                class="w-full p-3 text-white bg-gray-800/80 border border-cyan-500/50 rounded-lg shadow-inner shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 font-orbitron appearance-none"
                required
              >
                <option value="" disabled>Sélectionner un jeu</option>
                <option v-for="game in games" :key="game._id" :value="game._id">
                  {{ game.name }}
                </option>
              </select>
              <div
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-cyan-300"
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

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                for="imageUrl"
                class="block text-lg text-cyan-300 mb-2 font-orbitron"
                >URL de l'image</label
              >
              <input
                id="imageUrl"
                v-model="newBadge.imageUrl"
                type="text"
                class="w-full p-3 text-white bg-gray-800/80 border border-cyan-500/50 rounded-lg shadow-inner shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 font-orbitron"
                required
              />
            </div>

            <div
              v-if="newBadge.imageUrl"
              class="flex flex-col items-center justify-center"
            >
              <label class="block text-lg text-cyan-300 mb-2 font-orbitron"
                >Prévisualisation</label
              >
              <div class="badge-preview">
                <div
                  class="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-1 border-2 border-pink-500/50 overflow-hidden shadow-lg shadow-pink-500/20"
                >
                  <img
                    :src="newBadge.imageUrl"
                    alt="Prévisualisation"
                    class="max-h-full max-w-full object-contain"
                    @error="handleImageError"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label
              for="description"
              class="block text-lg text-cyan-300 mb-2 font-orbitron"
              >Description (optionnelle)</label
            >
            <textarea
              id="description"
              v-model="newBadge.description"
              rows="3"
              class="w-full p-3 text-white bg-gray-800/80 border border-cyan-500/50 rounded-lg shadow-inner shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 font-orbitron resize-none"
            ></textarea>
          </div>

          <div class="flex justify-end mt-6">
            <button
              type="submit"
              class="cyberpunk-btn-pink px-6 py-3 rounded-sm text-white font-orbitron text-sm"
            >
              Créer le badge
            </button>
          </div>
        </form>
      </div>

      <!-- Section Association de badge -->
      <div
        class="mb-8 bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 border border-pink-500/30 shadow-lg shadow-pink-500/20 relative z-10"
      >
        <!-- Effet de ligne lumineuse supérieure -->
        <div
          class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent"
        ></div>

        <h2
          class="text-2xl font-orbitron text-pink-300 mb-6 border-b border-pink-500/40 pb-2 flex items-center"
        >
          <span class="text-cyan-500 mr-2">›</span> Associer un badge à des
          joueurs
        </h2>

        <form @submit.prevent="assignBadge" class="space-y-6">
          <!-- Sélection des joueurs -->
          <div class="mb-6">
            <label
              for="players"
              class="flex items-center text-lg text-pink-300 mb-2 font-orbitron"
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
              Joueurs à associer
            </label>

            <div class="relative">
              <input
                type="text"
                id="players"
                autocomplete="off"
                v-model="playerSearch"
                @focus="showPlayerList = true"
                @blur="hidePlayerList"
                @input="searchPlayers"
                placeholder="Rechercher un joueur..."
                class="w-full p-3 text-white bg-gray-800/80 border border-pink-500/50 rounded-lg shadow-inner shadow-pink-500/20 focus:outline-none focus:ring-2 focus:ring-pink-500/70 transition-all duration-300 font-orbitron"
              />

              <!-- Liste des résultats de recherche -->
              <div
                v-if="showPlayerList && filteredPlayers.length > 0"
                class="absolute z-10 left-0 right-0 mt-1 bg-gray-900/95 border border-pink-500/30 rounded-lg shadow-lg shadow-pink-500/20 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800"
              >
                <div
                  v-for="player in filteredPlayers"
                  :key="player._id"
                  @mousedown.prevent="addPlayer(player)"
                  class="p-3 hover:bg-gray-800/80 cursor-pointer border-b border-pink-500/10 last:border-b-0 text-white font-orbitron flex items-center space-x-2 hover:text-pink-300 transition-colors duration-200"
                >
                  <span class="flex-1">{{ player.username }}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-pink-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <!-- Message si aucun résultat -->
              <div
                v-if="
                  showPlayerList && playerSearch && filteredPlayers.length === 0
                "
                class="absolute z-10 left-0 right-0 mt-1 bg-gray-900/95 border border-pink-500/30 rounded-lg shadow-lg shadow-pink-500/20 p-4 text-center text-cyan-300 font-orbitron"
              >
                Aucun joueur trouvé
              </div>
            </div>

            <!-- Tags des joueurs sélectionnés -->
            <div class="flex flex-wrap gap-2 mt-3">
              <div
                v-for="player in selectedPlayers"
                :key="player._id"
                class="flex items-center bg-gray-800/70 border border-pink-500/40 px-3 py-1.5 rounded-full text-white text-sm font-orbitron group hover:border-pink-500/70 transition-colors duration-200"
              >
                <span>{{ player.username }}</span>
                <button
                  @click="removePlayer(player)"
                  type="button"
                  class="ml-2 focus:outline-none text-pink-300/70 hover:text-pink-400 transition-colors duration-200"
                  aria-label="Retirer le joueur"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Instructions -->
            <p
              v-if="selectedPlayers.length > 0"
              class="mt-2 text-xs text-pink-300/70"
            >
              {{ selectedPlayers.length }} joueur{{
                selectedPlayers.length > 1 ? "s" : ""
              }}
              sélectionné{{ selectedPlayers.length > 1 ? "s" : "" }}
            </p>
            <p v-else class="mt-2 text-xs text-pink-300/70 italic">
              Recherchez et sélectionnez des joueurs à qui attribuer le badge
            </p>
          </div>

          <!-- PARTIE MANQUANTE : Sélection du badge à associer -->
          <div class="mt-6">
            <label
              for="badgeToAssign"
              class="flex items-center text-lg text-pink-300 mb-2 font-orbitron"
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
              Badge à associer
            </label>
            <div class="relative">
              <select
                id="badgeToAssign"
                v-model="badgeId"
                class="w-full p-3 text-white bg-gray-800/80 border border-pink-500/50 rounded-lg shadow-inner shadow-pink-500/20 focus:outline-none focus:ring-2 focus:ring-pink-500/70 transition-all duration-300 font-orbitron appearance-none"
                required
              >
                <option value="" disabled selected>
                  Sélectionner un badge
                </option>
                <option
                  v-for="badge in badges"
                  :key="badge._id"
                  :value="badge._id"
                >
                  {{ badge.title }}
                </option>
              </select>
              <div
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-pink-300"
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

            <!-- Prévisualisation du badge sélectionné -->
            <div
              v-if="badgeId"
              class="mt-4 flex items-center bg-gray-800/60 rounded-lg p-3 border border-pink-500/20"
            >
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-1 mr-3 border border-pink-500/40 overflow-hidden"
              >
                <img
                  :src="badges.find((b) => b._id === badgeId)?.imageUrl"
                  :alt="badges.find((b) => b._id === badgeId)?.title"
                  class="max-h-full max-w-full object-contain"
                  @error="handleImageError"
                />
              </div>
              <span class="text-white font-orbitron">{{
                badges.find((b) => b._id === badgeId)?.title
              }}</span>
            </div>
          </div>

          <div class="flex justify-end mt-6">
            <button
              type="submit"
              :disabled="selectedPlayers.length === 0 || !badgeId"
              class="cyberpunk-btn-purple px-6 py-3 rounded-sm text-white font-orbitron text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Associer le badge
            </button>
          </div>
        </form>
      </div>

      <!-- Section badges du joueur -->
      <div
        class="mb-8 bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 shadow-lg shadow-purple-500/20 relative z-10"
      >
        <!-- Effet de ligne lumineuse supérieure -->
        <div
          class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
        ></div>

        <h2
          class="text-2xl font-orbitron text-purple-300 mb-6 border-b border-purple-500/40 pb-2 flex items-center"
        >
          <span class="text-cyan-500 mr-2">›</span> Modifier les badges d'un
          joueur
        </h2>

        <div>
          <label
            for="playerSelect"
            class="block text-lg text-purple-300 mb-2 font-orbitron"
            >Sélectionner un joueur</label
          >
          <div class="relative">
            <select
              id="playerSelect"
              v-model="selectedPlayerId"
              @change="fetchPlayerBadges(selectedPlayerId)"
              class="w-full p-3 text-white bg-gray-800/80 border border-purple-500/50 rounded-lg shadow-inner shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all duration-300 font-orbitron appearance-none"
            >
              <option value="" disabled selected>Sélectionner un joueur</option>
              <option
                v-for="player in players"
                :key="player._id"
                :value="player._id"
              >
                {{ player.username }}
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

        <div v-if="selectedPlayerBadges.length > 0" class="mt-6">
          <div class="flex items-center mb-4">
            <div
              class="h-px flex-grow bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            ></div>
            <h3 class="text-lg font-orbitron text-purple-300 mx-4">
              Badges associés
            </h3>
            <div
              class="h-px flex-grow bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            ></div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="badge in selectedPlayerBadges"
              :key="badge._id"
              class="bg-gray-800/60 rounded-lg p-4 flex items-center justify-between border border-purple-500/20 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div class="flex items-center">
                <div
                  class="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-1 mr-4 border-2 border-pink-500/30 overflow-hidden shadow-lg shadow-pink-500/10"
                >
                  <img
                    :src="badge.imageUrl"
                    :alt="badge.title"
                    class="max-h-full max-w-full object-contain"
                    @error="handleImageError"
                  />
                </div>
                <span class="text-white font-orbitron">{{ badge.title }}</span>
              </div>
              <button
                @click="badge._id && removeBadge(badge._id)"
                class="cyberpunk-btn-red p-2 rounded-full"
                title="Supprimer ce badge"
                aria-label="Supprimer le badge"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 relative z-10"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          v-else-if="selectedPlayerId"
          class="mt-6 bg-gray-800/40 rounded-lg p-6 border border-purple-500/20 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-purple-400 mx-auto mb-4"
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
          <p class="text-purple-300 font-orbitron">
            Ce joueur n'a pas de badges pour le moment
          </p>
        </div>
      </div>

      <!-- Section liste des badges -->
      <div
        class="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30 shadow-lg shadow-cyan-500/20 relative z-10"
      >
        <!-- Effet de ligne lumineuse supérieure -->
        <div
          class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
        ></div>

        <h2
          class="text-2xl font-orbitron text-cyan-300 mb-6 border-b border-cyan-500/40 pb-2 flex items-center"
        >
          <span class="text-pink-500 mr-2">›</span> Collection de badges
        </h2>

        <div
          v-if="badges.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <div
            v-for="badge in badges"
            :key="badge._id"
            class="bg-gray-800/60 rounded-lg p-4 flex flex-col items-center border border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1 transition-all duration-300 group"
          >
            <div class="flex justify-end w-full mb-2">
              <!-- Boutons d'action -->
              <button
                @click="openEditBadgeModal(badge)"
                class="cyberpunk-btn-cyan p-2 rounded-full mr-2"
                title="Modifier ce badge"
                aria-label="Modifier le badge"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 relative z-10"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                  />
                </svg>
              </button>
              <button
                @click="confirmDeleteBadge(badge)"
                class="cyberpunk-btn-red p-2 rounded-full"
                title="Supprimer ce badge"
                aria-label="Supprimer le badge"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 relative z-10"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div
              class="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-1 mb-3 border-2 border-pink-500/30 overflow-hidden shadow-lg shadow-pink-500/10 group-hover:shadow-pink-500/30 group-hover:border-pink-500/50 transition-all duration-300"
            >
              <img
                :src="badge.imageUrl"
                :alt="badge.title"
                class="max-h-full max-w-full object-contain"
                @error="handleImageError"
              />
            </div>
            <span class="text-white font-orbitron text-center line-clamp-2">
              {{ badge.title }}
            </span>
            <!-- Description conditionnelle -->
            <p
              v-if="badge.description"
              class="text-gray-400 text-xs mt-2 text-center line-clamp-3"
            >
              {{ badge.description }}
            </p>
            <div class="mt-2 flex items-center">
              <span
                :class="[
                  'text-xs px-2 py-1 rounded-full border',
                  badge.categoryType === 'acs'
                    ? 'bg-pink-500/20 text-pink-300 border-pink-400/30'
                    : 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
                ]"
              >
                {{
                  badge.categoryType === "acs"
                    ? "ACS"
                    : getGameName(badge.categoryId)
                }}
              </span>
            </div>
          </div>
        </div>

        <div
          v-else
          class="flex flex-col items-center justify-center p-12 bg-gray-800/40 rounded-lg border border-cyan-500/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-20 w-20 text-cyan-400 opacity-70 mb-4"
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
          <p class="text-cyan-300 font-orbitron text-center">
            Aucun badge n'a été créé pour le moment
          </p>
          <p class="text-cyan-300/70 text-sm mt-2 font-orbitron text-center">
            Commencez par créer un nouveau badge ci-dessus
          </p>
        </div>
      </div>
    </div>

    <!-- Modal de modification de badge -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <div
        class="bg-gray-900/95 w-full max-w-md rounded-xl border border-purple-500/50 shadow-xl shadow-purple-500/30 p-6 animate-cyberpunk-fade-in"
      >
        <div
          class="flex justify-between items-center mb-6 pb-2 border-b border-purple-500/30"
        >
          <h3 class="text-xl font-orbitron text-purple-300 flex items-center">
            <span class="text-pink-500 mr-2">›</span> Modifier le badge
          </h3>
          <button
            @click="showEditModal = false"
            class="cyberpunk-btn-gray p-2 rounded-full"
            aria-label="Fermer la fenêtre"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 relative z-10"
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

        <form @submit.prevent="updateBadge" class="space-y-4">
          <div>
            <label
              for="edit-title"
              class="block text-lg text-purple-300 mb-2 font-orbitron"
              >Titre</label
            >
            <input
              id="edit-title"
              v-model="editingBadge.title"
              type="text"
              class="w-full p-3 text-white bg-gray-800/80 border border-purple-500/50 rounded-lg shadow-inner shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all duration-300 font-orbitron"
              required
            />
          </div>

          <div>
            <label
              for="edit-categoryType"
              class="block text-lg text-purple-300 mb-2 font-orbitron"
              >Catégorie</label
            >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                class="flex items-center space-x-3 p-3 rounded bg-gray-800/50 border border-purple-500/30 hover:border-purple-500/60 transition-colors duration-300"
              >
                <input
                  id="edit-categoryTypeAcs"
                  v-model="editingBadge.categoryType"
                  type="radio"
                  value="acs"
                  class="h-5 w-5 accent-pink-500"
                />
                <label
                  for="edit-categoryTypeAcs"
                  class="text-white font-orbitron cursor-pointer"
                >
                  Badge ACS (général)
                </label>
              </div>
              <div
                class="flex items-center space-x-3 p-3 rounded bg-gray-800/50 border border-pink-500/30 hover:border-pink-500/60 transition-colors duration-300"
              >
                <input
                  id="edit-categoryTypeGame"
                  v-model="editingBadge.categoryType"
                  type="radio"
                  value="game"
                  class="h-5 w-5 accent-pink-500"
                />
                <label
                  for="edit-categoryTypeGame"
                  class="text-white font-orbitron cursor-pointer"
                >
                  Badge spécifique à un jeu
                </label>
              </div>
            </div>
          </div>

          <div v-if="editingBadge.categoryType === 'game'">
            <label
              for="edit-categoryId"
              class="block text-lg text-purple-300 mb-2 font-orbitron"
              >Jeu associé</label
            >
            <div class="relative">
              <select
                id="edit-categoryId"
                v-model="editingBadge.categoryId"
                class="w-full p-3 text-white bg-gray-800/80 border border-purple-500/50 rounded-lg shadow-inner shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all duration-300 font-orbitron appearance-none"
                required
              >
                <option value="" disabled>Sélectionner un jeu</option>
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

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                for="edit-imageUrl"
                class="block text-lg text-purple-300 mb-2 font-orbitron"
                >URL de l'image</label
              >
              <input
                id="edit-imageUrl"
                v-model="editingBadge.imageUrl"
                type="text"
                class="w-full p-3 text-white bg-gray-800/80 border border-purple-500/50 rounded-lg shadow-inner shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all duration-300 font-orbitron"
                required
              />
            </div>

            <div
              v-if="editingBadge.imageUrl"
              class="flex flex-col items-center justify-center"
            >
              <label class="block text-sm text-purple-300 mb-2 font-orbitron"
                >Prévisualisation</label
              >
              <div
                class="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-1 border-2 border-pink-500/30 overflow-hidden"
              >
                <img
                  :src="editingBadge.imageUrl"
                  alt="Prévisualisation"
                  class="max-h-full max-w-full object-contain"
                  @error="handleImageError"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              for="edit-description"
              class="block text-lg text-purple-300 mb-2 font-orbitron"
              >Description (optionnelle)</label
            >
            <textarea
              id="edit-description"
              v-model="editingBadge.description"
              rows="3"
              class="w-full p-3 text-white bg-gray-800/80 border border-purple-500/50 rounded-lg shadow-inner shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all duration-300 font-orbitron resize-none"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="showEditModal = false"
              class="cyberpunk-btn-gray px-4 py-2 rounded-sm text-white font-orbitron text-sm"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="cyberpunk-btn-cyan px-4 py-2 rounded-sm text-white font-orbitron text-sm"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de confirmation de suppression -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <div
        class="bg-gray-900/95 w-full max-w-md rounded-xl border border-red-500/50 shadow-xl shadow-red-500/30 p-6 animate-cyberpunk-fade-in"
      >
        <div class="text-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-red-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 class="text-xl font-orbitron text-red-300 mb-2">
            Confirmer la suppression
          </h3>
          <p class="text-white font-orbitron">
            Êtes-vous sûr de vouloir supprimer le badge
            <strong class="text-red-300">{{ badgeToDelete?.title }}</strong
            >?
          </p>
          <p class="text-gray-400 text-sm mt-2">
            Cette action est irréversible et supprimera également ce badge de
            tous les joueurs qui le possèdent.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button
            @click="showDeleteModal = false"
            class="cyberpunk-btn-gray px-4 py-2 rounded-sm text-white font-orbitron text-sm"
          >
            Annuler
          </button>
          <button
            @click="deleteBadge"
            class="cyberpunk-btn-red px-4 py-2 rounded-sm text-white font-orbitron text-sm"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>

    <!-- Notifications -->
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// Services
import badgeService from "../../services/badgeService";
import playerService from "../../services/playerService";
import gameService from "../../services/gameService";

// Types
import type { Badge, Player, Game } from "../../types";

// Components
import Toast from "@/shared/Toast.vue";

//------------------------------------------------------
// 1. VARIABLES RÉACTIVES
//------------------------------------------------------

// Variables des modales
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const editingBadge = ref({
  _id: "",
  title: "",
  imageUrl: "",
  description: "",
  categoryType: "acs",
  categoryId: "",
});
const badgeToDelete = ref<Badge | null>(null);

// Formulaire de création de badge
const newBadge = ref({
  title: "",
  imageUrl: "",
  description: "",
  categoryType: "acs", // Par défaut c'est un badge ACS
  categoryId: "",
});

// Données principales
const games = ref<Game[]>([]);
const players = ref<Player[]>([]);
const badges = ref<Badge[]>([]);

// Sélections et associations
const selectedPlayerId = ref<string>("");
const badgeId = ref("");
const selectedPlayers = ref<Player[]>([]);
const selectedPlayerBadges = ref<Badge[]>([]);

// Messages et notifications
const error = ref<string | null>(null);
const success = ref<string | null>(null);

const playerSearch = ref<string>("");
const showPlayerList = ref<boolean>(false);
const filteredPlayers = ref<Player[]>([]);

//------------------------------------------------------
// 2. FONCTIONS UTILITAIRES
//------------------------------------------------------

/**
 * Fonction pour afficher une notification à l'utilisateur
 */
const showMessage = (type: "success" | "error", message: string) => {
  if (type === "success") {
    success.value = message;
    error.value = null;
  } else {
    error.value = message;
    success.value = null;
  }
  setTimeout(() => {
    success.value = null;
    error.value = null;
  }, 3000);
};

/**
 * Récupère le nom d'un jeu à partir de son ID
 */
const getGameName = (gameId: string) => {
  if (!gameId) return "";
  const game = games.value.find((g) => g._id === gameId);
  return game ? game.name : "Jeu inconnu";
};

/**
 * Gère les erreurs de chargement d'image
 */
const handleImageError = (e: Event) => {
  if (e.target instanceof HTMLImageElement) {
    e.target.src = "https://via.placeholder.com/50?text=?";
  }
};

/**
 * Valide les données du formulaire de badge
 */
const validateBadgeForm = (badge: Badge) => {
  const errors = [];

  if (!badge.title.trim()) {
    errors.push("Le titre du badge est requis");
  } else if (badge.title.length > 50) {
    errors.push("Le titre ne doit pas dépasser 50 caractères");
  }

  if (badge.categoryType === "game" && !badge.categoryId) {
    errors.push("Veuillez sélectionner un jeu pour ce badge");
  }

  if (!badge.imageUrl.trim()) {
    errors.push("L'URL de l'image est requise");
  } else {
    try {
      new URL(badge.imageUrl);
    } catch (e) {
      errors.push("Veuillez entrer une URL d'image valide");
    }
  }

  if (badge.description && badge.description.length > 200) {
    errors.push("La description ne doit pas dépasser 200 caractères");
  }

  return errors;
};

/**
 * Fonction pour afficher la liste des joueurs
 */
const hidePlayerList = () => {
  // Retarder la fermeture pour permettre le clic sur un élément de la liste
  setTimeout(() => {
    showPlayerList.value = false;
  }, 200);
};

/**
 * Ajoute un joueur à la liste des joueurs sélectionnés
 */
const addPlayer = (player: Player) => {
  // Vérifier si le joueur n'est pas déjà dans la liste
  if (!selectedPlayers.value.some((p) => p._id === player._id)) {
    // Pour l'association de badge, nous avons seulement besoin de l'ID
    if (player._id) {
      selectedPlayers.value.push(player);
    } else {
      console.error("Player ID is undefined and cannot be added.");
    }
  }

  // Réinitialiser la recherche
  playerSearch.value = "";
  filteredPlayers.value = [];

  // Focus de nouveau sur le champ pour continuer à ajouter des joueurs
  const playerInput = document.getElementById("players") as HTMLInputElement;
  if (playerInput) {
    playerInput.focus();
  }
};
//------------------------------------------------------
// 3. FONCTIONS DE RÉCUPÉRATION DE DONNÉES
//------------------------------------------------------

/**
 * Récupère la liste des badges
 */
const fetchBadges = async () => {
  try {
    badges.value = await badgeService.getBadges();
  } catch (error) {
    console.error("Erreur lors de la récupération des badges:", error);
    showMessage("error", "Erreur lors de la récupération des badges.");
  }
};

/**
 * Récupère la liste des joueurs
 */
const fetchPlayers = async () => {
  try {
    players.value = await playerService.getPlayers();
  } catch (error) {
    console.error("Erreur lors de la récupération des joueurs:", error);
    showMessage("error", "Erreur lors de la récupération des joueurs.");
  }
};

/**
 * Récupère la liste des jeux
 */
const fetchGames = async () => {
  try {
    games.value = await gameService.getGames();
  } catch (error) {
    console.error("Erreur lors de la récupération des jeux:", error);
    showMessage("error", "Erreur lors de la récupération des jeux.");
  }
};

/**
 * Récupère les badges d'un joueur spécifique
 */
const fetchPlayerBadges = async (playerId: string) => {
  try {
    selectedPlayerId.value = playerId;
    const player = await playerService.getPlayerById(playerId);
    selectedPlayerBadges.value = player.badges || [];
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des badges du joueur:",
      error
    );
    showMessage(
      "error",
      "Erreur lors de la récupération des badges du joueur."
    );
    selectedPlayerBadges.value = [];
  }
};

//------------------------------------------------------
// 4. GESTION DES BADGES
//------------------------------------------------------

/**
 * Crée un nouveau badge
 */
const createBadge = async () => {
  const errors = validateBadgeForm(newBadge.value);

  if (errors.length > 0) {
    showMessage("error", errors[0]);
    return;
  }

  try {
    const createdBadge = await badgeService.createBadge(newBadge.value);
    badges.value.push(createdBadge);

    // Réinitialiser le formulaire
    newBadge.value = {
      title: "",
      imageUrl: "",
      description: "",
      categoryType: "acs",
      categoryId: "",
    };

    showMessage("success", "Badge créé avec succès !");
  } catch (error) {
    console.error("Erreur lors de la création du badge:", error);
    showMessage("error", "Erreur lors de la création du badge.");
  }
};

/**
 * Affiche la modale de modification d'un badge
 */
const openEditBadgeModal = (badge: Badge) => {
  editingBadge.value = {
    _id: badge._id || "",
    title: badge.title,
    imageUrl: badge.imageUrl,
    description: badge.description || "",
    categoryType: badge.categoryType || "acs",
    categoryId: badge.categoryId || "",
  };
  showEditModal.value = true;
};

/**
 * Met à jour un badge existant
 */
const updateBadge = async () => {
  const errors = validateBadgeForm(editingBadge.value);
  if (errors.length > 0) {
    showMessage("error", errors[0]);
    return;
  }

  try {
    if (editingBadge.value._id) {
      const updatedBadge = await badgeService.updateBadge(
        editingBadge.value._id,
        editingBadge.value
      );

      // Mettre à jour le badge dans la liste
      const index = badges.value.findIndex((b) => b._id === updatedBadge._id);
      if (index !== -1) {
        badges.value[index] = updatedBadge;
      }

      showEditModal.value = false;
      showMessage("success", "Badge mis à jour avec succès !");

      // Actualiser les badges du joueur sélectionné si nécessaire
      if (selectedPlayerId.value) {
        fetchPlayerBadges(selectedPlayerId.value);
      }
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du badge:", error);
    showMessage("error", "Erreur lors de la mise à jour du badge.");
  }
};

/**
 * Affiche la confirmation avant suppression d'un badge
 */
const confirmDeleteBadge = (badge: Badge) => {
  badgeToDelete.value = badge;
  showDeleteModal.value = true;
};

/**
 * Supprime un badge
 */
const deleteBadge = async () => {
  try {
    if (badgeToDelete.value?._id) {
      await badgeService.deleteBadge(badgeToDelete.value._id);

      // Supprimer le badge de la liste
      badges.value = badges.value.filter(
        (b) => b._id !== badgeToDelete.value?._id
      );

      showDeleteModal.value = false;
      showMessage("success", "Badge supprimé avec succès !");

      // Actualiser les badges du joueur sélectionné si nécessaire
      if (selectedPlayerId.value) {
        fetchPlayerBadges(selectedPlayerId.value);
      }
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du badge:", error);
    showMessage("error", "Erreur lors de la suppression du badge.");
  }
};

//------------------------------------------------------
// 5. GESTION DES ASSOCIATIONS BADGE-JOUEUR
//------------------------------------------------------

/**
 * Associe un badge à plusieurs joueurs
 */
const assignBadge = async () => {
  try {
    if (selectedPlayers.value.length > 0 && badgeId.value) {
      for (const player of selectedPlayers.value) {
        if (player._id) {
          await badgeService.assignBadgeToPlayer(player._id, badgeId.value);
        }
      }
      showMessage(
        "success",
        "Badge associé avec succès à tous les joueurs sélectionnés !"
      );
      selectedPlayers.value = [];
      badgeId.value = "";
      playerSearch.value = "";
    }
  } catch (error) {
    console.error("Erreur lors de l'association du badge:", error);
    showMessage("error", "Erreur lors de l'association du badge.");
  }
};

/**
 * Retire un badge à un joueur
 */
const removeBadge = async (badgeId: string) => {
  try {
    if (selectedPlayerId.value) {
      await badgeService.removeBadgeFromPlayer(selectedPlayerId.value, badgeId);
      fetchPlayerBadges(selectedPlayerId.value);
      showMessage("success", "Badge supprimé avec succès !");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du badge:", error);
    showMessage("error", "Erreur lors de la suppression du badge.");
  }
};

/**
 * Retire un joueur de la liste des joueurs sélectionnés
 */
const removePlayer = (player: Player) => {
  selectedPlayers.value = selectedPlayers.value.filter(
    (p) => p._id !== player._id
  );
};

/**
 * Recherche des joueurs par nom
 */
const searchPlayers = () => {
  if (!playerSearch.value.trim()) {
    filteredPlayers.value = [];
    return;
  }

  const search = playerSearch.value.toLowerCase();
  filteredPlayers.value = players.value
    .filter(
      (p) =>
        p.username.toLowerCase().includes(search) &&
        !selectedPlayers.value.some((sp) => sp._id === p._id)
    )
    .slice(0, 10); // Limite à 10 résultats
};

//------------------------------------------------------
// 6. CYCLE DE VIE DU COMPOSANT
//------------------------------------------------------

onMounted(() => {
  fetchBadges();
  fetchGames();
  fetchPlayers();
});
</script>

<style scoped>
/* Fonts et classes de base */
.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

/* Effet néon pour les textes */
.neon-text-pink {
  text-shadow: 0 0 10px #ec4899, 0 0 20px #ec4899, 0 0 30px #ec4899,
    0 0 40px #ec4899;
  animation: neon-pulse 2s infinite alternate;
}

.neon-text-cyan {
  text-shadow: 0 0 8px #06b6d4, 0 0 15px #06b6d4;
}

.neon-text-purple {
  text-shadow: 0 0 8px #8b5cf6, 0 0 15px #8b5cf6;
}

/* Animation de pulsation néon */
@keyframes neon-pulse {
  0% {
    text-shadow: 0 0 5px #ec4899, 0 0 10px #ec4899, 0 0 15px #ec4899;
  }
  100% {
    text-shadow: 0 0 10px #ec4899, 0 0 20px #ec4899, 0 0 30px #ec4899,
      0 0 40px #ec4899;
  }
}

/* Animation d'apparition des modales */
@keyframes cyberpunk-fade-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-cyberpunk-fade-in {
  animation: cyberpunk-fade-in 0.3s ease forwards;
}

/* Effet de glow pour les éléments */
.shadow-glow {
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
}

/* Scrollbar personnalisée */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thumb-purple-500::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.5);
  border-radius: 3px;
}

.scrollbar-thumb-purple-500::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 92, 246, 0.8);
}

.scrollbar-track-gray-800::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5);
  border-radius: 3px;
}

/* Responsive */
@media (max-width: 640px) {
  .neon-text-pink {
    font-size: 2rem;
  }
}
</style>
