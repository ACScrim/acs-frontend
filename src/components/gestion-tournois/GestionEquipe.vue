<template>
  <div
    class="p-8 bg-gray-900/70 border border-purple-500/30 rounded-xl shadow-lg shadow-purple-500/20 backdrop-blur-md relative overflow-hidden"
  >
    <!-- En-tête -->
    <h1 class="text-4xl font-['Audiowide'] text-white text-center mb-8">
      Gestion des Équipes
    </h1>
    <!-- Sélection du jeu et du tournoi -->
    <div
      class="flex flex-col gap-6 mb-8 p-6 bg-gray-800/70 rounded-xl border border-cyan-500/30 shadow-md shadow-cyan-500/20"
    >
      <div class="w-full mb-4">
        <label
          for="game"
          class="flex items-center text-lg text-cyan-500 mb-2 font-['Orbitron'] font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
            />
          </svg>
          Sélectionner un jeu
        </label>
        <div class="relative w-full">
          <select
            id="game"
            v-model="selectedGame"
            @change="fetchTournamentsByGame"
            class="w-full py-3 px-4 bg-gray-900/80 text-white border border-cyan-500/50 rounded-lg font-['Orbitron'] appearance-none shadow-md shadow-cyan-500/30 transition-all duration-300 focus:outline-none focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/50"
          >
            <option value="" disabled selected>Choisissez un jeu</option>
            <option v-for="game in games" :key="game._id" :value="game._id">
              {{ game.name }}
            </option>
          </select>
          <div
            class="absolute top-1/2 right-4 -translate-y-1/2 w-0 h-0 border-l-6 border-r-6 border-t-8 border-transparent border-t-cyan-500 pointer-events-none"
          ></div>
        </div>
      </div>

      <div class="w-full mb-4" v-if="tournaments.length > 0">
        <label
          for="tournament"
          class="flex items-center text-lg text-cyan-500 mb-2 font-['Orbitron'] font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            />
          </svg>
          Sélectionner un tournoi
        </label>
        <div class="relative w-full">
          <select
            id="tournament"
            v-model="selectedTournament"
            @change="fetchTournamentDetails"
            class="w-full py-3 px-4 bg-gray-900/80 text-white border border-cyan-500/50 rounded-lg font-['Orbitron'] appearance-none shadow-md shadow-cyan-500/30 transition-all duration-300 focus:outline-none focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/50"
          >
            <option value="" disabled selected>Choisissez un tournoi</option>
            <option
              v-for="tournament in tournaments"
              :key="tournament._id"
              :value="tournament._id"
            >
              {{ tournament.name }}
            </option>
          </select>
          <div
            class="absolute top-1/2 right-4 -translate-y-1/2 w-0 h-0 border-l-6 border-r-6 border-t-8 border-transparent border-t-cyan-500 pointer-events-none"
          ></div>
        </div>
      </div>
      <div
        v-else-if="selectedGame && tournaments.length === 0"
        class="flex flex-col items-center justify-center p-6 bg-gray-800/80 border border-red-500/30 rounded-xl shadow-md text-center gap-3"
      >
        <div class="text-center">
          <h3 class="text-xl font-['Orbitron'] font-semibold text-red-400 mb-1">
            Aucun tournoi disponible
          </h3>
          <p class="text-white/70 font-['Orbitron'] text-sm">
            Il n'existe pas de tournoi non finalisé pour ce jeu
          </p>
        </div>
        <button
          @click="selectedGame = ''"
          class="cyberpunk-btn-gray mt-3 py-2 px-4 text-sm font-['Orbitron'] rounded-lg"
        >
          <span class="relative z-10">Choisir un autre jeu</span>
        </button>
      </div>
    </div>

    <!-- Détails du tournoi -->
    <div
      v-if="selectedTournamentDetails"
      class="mb-8 p-6 bg-gray-800/70 rounded-xl border border-purple-500/30 shadow-md shadow-purple-500/20"
    >
      <div class="flex items-center gap-3 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-purple-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
          />
        </svg>
        <h2 class="font-['Orbitron'] font-bold text-2xl text-purple-400">
          Génération des équipes
        </h2>
      </div>
      <div class="flex flex-col md:flex-row items-start gap-4">
        <div class="w-full md:w-1/2">
          <label
            for="numTeams"
            class="flex items-center text-lg text-purple-500 mb-2 font-['Orbitron'] font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z"
                clip-rule="evenodd"
              />
            </svg>
            Nombre d'équipes
          </label>
          <div class="relative w-full">
            <input
              type="number"
              id="numTeams"
              v-model="numTeams"
              min="2"
              max="20"
              class="w-full py-3 px-4 bg-gray-900/80 text-white border border-purple-500/50 rounded-lg font-['Orbitron'] shadow-md shadow-purple-500/30 transition-all duration-300 focus:outline-none focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/50"
            />
          </div>
        </div>
        <button
          @click="generateTeams"
          class="cyberpunk-btn-purple flex items-center justify-center py-3 px-6 font-['Orbitron'] font-semibold mt-6 md:mt-8 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2 relative z-10"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="relative z-10">Générer les équipes</span>
        </button>
      </div>
    </div>

    <!-- Affichage des équipes avec drag and drop -->
    <div
      v-if="teams.length > 0"
      class="mb-8 p-6 bg-gray-800/70 rounded-xl border border-emerald-500/30 shadow-md shadow-emerald-500/20"
    >
      <div class="flex items-center gap-3 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
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
        <h2 class="font-['Orbitron'] font-bold text-2xl text-emerald-400">
          Composition des équipes
        </h2>
      </div>
      <div class="relative mb-6">
        <div
          class="flex items-center py-3 px-4 bg-gray-800/70 border border-emerald-500/30 rounded-lg shadow-md shadow-emerald-500/20 transition-all duration-300 sticky top-0 z-20"
          :class="{
            'bg-gray-800/90 border-emerald-500/70 shadow-lg shadow-emerald-500/40':
              searchQuery,
          }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-emerald-500/70 mr-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Rechercher un joueur par nom..."
            @input="searchPlayers"
            @focus="searchFocused = true"
            class="flex-1 bg-transparent border-none text-white font-['Orbitron'] text-sm focus:outline-none placeholder:text-white/50"
          />
          <button
            v-if="searchQuery"
            @click="
              searchQuery = '';
              searchResults = [];
            "
            class="cyberpunk-btn-gray flex items-center justify-center w-6 h-6 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 relative z-10"
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

        <div
          v-if="searchQuery && searchResults.length === 0 && searchFocused"
          class="absolute top-full left-0 right-0 flex items-center gap-2 py-3 px-4 mt-2 bg-gray-900/95 border border-red-500/30 rounded-lg shadow-lg text-white/70 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-red-500/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Aucun joueur trouvé</span>
        </div>

        <div
          v-else-if="searchResults.length > 0 && searchFocused"
          class="absolute top-full left-0 right-0 bg-gray-900/95 border border-emerald-500/30 rounded-lg mt-2 max-h-[300px] overflow-y-auto z-10 shadow-lg shadow-black/50"
        >
          <div
            v-for="result in searchResults"
            :key="result.player._id"
            @click="navigateToPlayerTeam(result)"
            class="flex justify-between items-center p-3 border-b border-emerald-500/10 transition-all duration-200 hover:bg-emerald-500/20 hover:translate-x-1 cursor-pointer"
          >
            <span class="font-medium text-white">{{
              result.player.username
            }}</span>
            <span
              class="text-xs text-white bg-emerald-500/40 py-1 px-3 rounded-full shadow-sm shadow-emerald-500/20"
            >
              {{ result.teamName }}
            </span>
          </div>
        </div>
      </div>

      <!-- Dans la section teams-display, remplacer la grid par : -->
      <div class="flex flex-col gap-6">
        <!-- Onglets d'équipe avec meilleure visibilité pour l'actif -->
        <div
          class="flex flex-wrap gap-2 border-b border-emerald-500/30 pb-2 mb-4 overflow-x-auto"
        >
          <button
            @click="viewMode = 'overview'"
            :class="[
              'flex items-center py-3 px-5 font-[\'Orbitron\'] font-medium transition-all duration-300 whitespace-nowrap',
              viewMode === 'overview'
                ? 'bg-emerald-500/40 text-white border-2 border-emerald-500 rounded-t-lg shadow-[0_0_15px_rgba(16,185,129,0.6)] translate-y-1'
                : 'bg-gray-800/70 text-white/80 border border-emerald-500/30 rounded-t-lg hover:bg-gray-800/90 hover:border-emerald-500/50',
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            Vue d'ensemble
          </button>
          <button
            v-for="(team, index) in teams"
            :key="index"
            @click="selectTeam(index)"
            :class="[
              'py-3 px-5 font-[\'Orbitron\'] font-medium transition-all duration-300 whitespace-nowrap',
              viewMode === 'team' && activeTeamTab === index
                ? 'bg-emerald-500/40 text-white border-2 border-emerald-500 rounded-t-lg shadow-[0_0_15px_rgba(16,185,129,0.6)] translate-y-1'
                : 'bg-gray-800/70 text-white/80 border border-emerald-500/30 rounded-t-lg hover:bg-gray-800/90 hover:border-emerald-500/50',
            ]"
          >
            {{ team.name || `Équipe ${index + 1}` }}
          </button>
        </div>

        <transition name="fade" mode="out-in">
          <!-- Vue d'ensemble -->
          <div
            v-if="viewMode === 'overview'"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6"
          >
            <div
              v-for="(team, index) in teams"
              :key="index"
              class="p-6 bg-gray-800/70 rounded-xl border border-emerald-500/20 shadow-md shadow-emerald-500/10 transition-all duration-300 flex flex-col gap-4 hover:shadow-lg hover:shadow-emerald-500/30 hover:border-emerald-500/40"
            >
              <div
                class="flex justify-between items-center pb-2 border-b border-emerald-500/30"
              >
                <div class="flex flex-col gap-1">
                  <h3
                    class="font-['Orbitron'] font-semibold text-xl text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]"
                  >
                    {{ team.name || `Équipe ${index + 1}` }}
                  </h3>
                  <div class="flex gap-2 items-center">
                    <span
                      :class="[
                        'text-xs py-1 px-2 rounded-full',
                        getTeamBalanceClass(team) === 'empty'
                          ? 'bg-red-500/20 text-red-500/90'
                          : getTeamBalanceClass(team) === 'unbalanced-low'
                          ? 'bg-amber-500/20 text-amber-500/90'
                          : getTeamBalanceClass(team) === 'unbalanced-high'
                          ? 'bg-blue-500/20 text-blue-500/90'
                          : 'bg-emerald-500/20 text-emerald-500/90',
                      ]"
                    >
                      {{ team.players.length }} joueur{{
                        team.players.length > 1 ? "s" : ""
                      }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    @click="unassignAllPlayers(index)"
                    class="cyberpunk-btn-red flex items-center justify-center w-8 h-8 rounded-md"
                    title="Désassigner tous les joueurs"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 relative z-10"
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
                  <button
                    @click="selectTeam(index)"
                    class="cyberpunk-btn-green flex items-center justify-center w-8 h-8 rounded-md"
                    title="Éditer l'équipe"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 relative z-10"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Drag and drop area -->
              <vue-draggable-next
                v-model="team.players"
                group="players"
                @start="isDragging = true"
                @end="
                  onDragEnd();
                  isDragging = false;
                "
                class="flex flex-col gap-2 min-h-[150px] max-h-[250px] overflow-y-auto p-3 bg-gray-900/50 border-2 border-dashed border-emerald-500/30 rounded-lg transition-all duration-300"
                :class="{
                  'bg-gray-900/80 border-emerald-500/60 shadow-md shadow-emerald-500/30':
                    isDragging,
                }"
              >
                <div
                  v-for="player in team.players"
                  :key="player._id"
                  :data-player-id="player._id"
                  class="flex justify-between items-center p-3 bg-gray-900/80 text-white border border-emerald-500/50 rounded-lg font-['Orbitron'] shadow-sm shadow-emerald-500/30 transition-all duration-300 cursor-move hover:shadow-md hover:shadow-emerald-500/50 hover:-translate-y-0.5 relative overflow-hidden"
                >
                  <span class="text-white">{{ player.username }}</span>
                  <div
                    class="flex items-center justify-center w-6 h-6 bg-gray-800/70 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <!-- Placeholder when empty -->
                <div
                  v-if="team.players.length === 0"
                  class="flex flex-col items-center justify-center w-full h-full min-h-[120px] p-6 text-emerald-500/70 font-['Orbitron'] transition-all duration-300 bg-emerald-500/5 border-2 border-dashed border-emerald-500/30 rounded-lg"
                >
                  <p class="mt-2 text-center">Équipe vide</p>
                </div>
              </vue-draggable-next>
            </div>
          </div>

          <!-- Vue équipe spécifique -->
          <!-- Vue équipe spécifique - Correction pour afficher les joueurs -->
          <div
            v-else-if="viewMode === 'team'"
            class="bg-gray-800/70 p-6 rounded-xl border border-emerald-500/20 shadow-md shadow-emerald-500/10"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-2 border-b border-emerald-500/30 gap-4"
            >
              <div class="flex flex-col gap-3 w-full">
                <div class="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-emerald-400"
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
                  <h3
                    class="font-['Orbitron'] font-bold text-xl text-emerald-400"
                  >
                    Équipe {{ activeTeamTab + 1 }}
                  </h3>
                </div>

                <div class="flex items-center gap-2">
                  <span class="text-white text-sm font-['Orbitron']"
                    >Nom de l'équipe:</span
                  >
                  <input
                    type="text"
                    v-model="teams[activeTeamTab].name"
                    placeholder="Entrez un nom pour cette équipe"
                    class="flex-1 py-2 px-3 bg-gray-900/80 text-white border border-emerald-500/50 rounded-lg transition-all duration-300 focus:outline-none focus:border-emerald-500 focus:shadow-md focus:shadow-emerald-500/30 font-['Orbitron']"
                  />
                </div>
              </div>

              <button
                @click="viewMode = 'overview'"
                class="cyberpunk-btn-gray flex items-center justify-center px-3 py-1.5 text-sm font-['Orbitron'] rounded-lg self-start sm:self-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1 relative z-10"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="relative z-10">Retour</span>
              </button>
            </div>

            <div
              class="p-3 bg-gray-900/50 rounded-lg border border-emerald-500/30"
            >
              <div class="flex justify-between items-center mb-2">
                <h4 class="text-lg text-emerald-300 font-['Orbitron']">
                  Joueurs de l'équipe
                </h4>

                <button
                  @click="unassignAllPlayers(activeTeamTab)"
                  class="cyberpunk-btn-red flex items-center justify-center px-3 py-1.5 text-sm font-['Orbitron'] rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-1 relative z-10"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="relative z-10">Désassigner tous</span>
                </button>
              </div>

              <vue-draggable-next
                v-model="teams[activeTeamTab].players"
                group="players"
                @start="isDragging = true"
                @end="
                  onDragEnd();
                  isDragging = false;
                "
                class="flex flex-col gap-2 min-h-[150px] max-h-[400px] overflow-y-auto p-3 bg-gray-900/50 border-2 border-dashed border-emerald-500/30 rounded-lg transition-all duration-300"
                :class="{
                  'bg-gray-900/80 border-emerald-500/60 shadow-md shadow-emerald-500/30':
                    isDragging,
                }"
              >
                <div
                  v-for="player in teams[activeTeamTab].players"
                  :key="player._id"
                  :data-player-id="player._id"
                  class="flex justify-between items-center p-3 bg-gray-900/80 text-white border border-emerald-500/50 rounded-lg font-['Orbitron'] shadow-sm shadow-emerald-500/30 transition-all duration-300 cursor-move hover:shadow-md hover:shadow-emerald-500/50 hover:-translate-y-0.5 relative overflow-hidden"
                >
                  <span class="text-white">{{ player.username }}</span>
                  <div
                    class="flex items-center justify-center w-6 h-6 bg-gray-800/70 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <!-- Placeholder when empty -->
                <div
                  v-if="teams[activeTeamTab].players.length === 0"
                  class="flex flex-col items-center justify-center w-full h-full min-h-[120px] p-6 text-emerald-500/70 font-['Orbitron'] transition-all duration-300 bg-emerald-500/5 border-2 border-dashed border-emerald-500/30 rounded-lg"
                >
                  <p class="mt-2 text-center">Cette équipe est vide</p>
                  <p class="text-sm text-center mt-2">
                    Glissez-déposez des joueurs ici
                  </p>
                </div>
              </vue-draggable-next>
            </div>
          </div>
        </transition>

        <!-- Liste des joueurs non assignés -->
        <div
          class="unassigned-players mb-8 p-6 bg-gray-800/70 rounded-xl border border-red-500/30 shadow-md shadow-red-500/20"
        >
          <div class="flex items-center gap-3 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
              />
            </svg>
            <h2 class="font-['Orbitron'] font-bold text-2xl text-red-400">
              Joueurs non assignés
              <span class="text-base font-normal ml-2 text-white/70"
                >({{ unassignedPlayers.length }})</span
              >
            </h2>
          </div>

          <!-- Zone de drop pour les joueurs non assignés -->
          <vue-draggable-next
            v-model="unassignedPlayers"
            group="players"
            @start="isDragging = true"
            @end="
              onDragEnd();
              isDragging = false;
            "
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 min-h-[150px]"
          >
            <div
              v-for="(player, index) in unassignedPlayers"
              :key="player._id"
              :data-player-id="player._id"
              class="flex flex-col p-3 bg-gray-900/80 border border-red-500/50 rounded-lg font-['Orbitron'] shadow-sm shadow-red-500/30 transition-all duration-300 hover:shadow-md hover:shadow-red-500/50 hover:-translate-y-0.5 relative overflow-hidden"
            >
              <div class="flex justify-between items-center mb-2">
                <span class="text-white">{{ player.username }}</span>
                <div
                  class="flex items-center justify-center w-6 h-6 bg-gray-800/70 rounded cursor-move"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <!-- Liste déroulante pour assigner à une équipe -->
              <div class="relative w-full mt-2">
                <select
                  :id="`assign-player-${player._id}`"
                  class="w-full py-1.5 px-2 text-xs bg-gray-900/70 text-white border border-red-500/40 rounded-md font-['Orbitron'] appearance-none cursor-pointer transition-all duration-300 focus:outline-none focus:border-red-500/70 focus:shadow-sm focus:shadow-red-500/30"
                  @change="
                    assignPlayerToTeam(
                      index,
                      ($event.target as HTMLSelectElement)?.value
                    );
                    ($event.target as HTMLSelectElement).value = '';
                  "
                >
                  <option value="" selected disabled>
                    Assigner à une équipe
                  </option>
                  <option
                    v-for="(team, teamIndex) in teams"
                    :key="teamIndex"
                    :value="teamIndex"
                  >
                    {{ team.name || `Équipe ${teamIndex + 1}` }}
                  </option>
                </select>
                <div
                  class="absolute inset-y-0 right-2 flex items-center pointer-events-none"
                >
                  <svg
                    class="h-4 w-4 text-red-500"
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

            <!-- Message lorsqu'il n'y a aucun joueur non assigné -->
            <div
              v-if="unassignedPlayers.length === 0"
              class="col-span-full flex flex-col items-center justify-center p-6 text-red-500/70 bg-red-500/5 border-2 border-dashed border-red-500/30 rounded-lg min-h-[150px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10"
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
              <p class="mt-4 text-center font-['Orbitron']">
                Tous les joueurs sont assignés à des équipes
              </p>
            </div>
          </vue-draggable-next>
        </div>
      </div>

      <div class="flex flex-wrap gap-4 mt-6">
        <button
          @click="saveTeams"
          class="cyberpunk-btn-green flex items-center py-3 px-6 font-['Orbitron'] font-semibold rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2 relative z-10"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="relative z-10">Valider les équipes</span>
        </button>
        <button
          @click="saveTeamDefinitive"
          class="cyberpunk-btn-pink flex items-center py-3 px-6 font-['Orbitron'] font-semibold rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2 relative z-10"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="relative z-10">Valider les équipes définitives</span>
        </button>
      </div>
    </div>

    <!-- Ajouter cette ligne avant la fermeture de template -->
    <ConfirmationDialog
      v-if="showConfirmationDialog"
      title="Valider les équipes définitives"
      message="Attention ! Cette action est irréversible et va finaliser les équipes du tournoi. Les canaux Discord seront créés automatiquement. Voulez-vous continuer ?"
      @confirm="confirmTeamDefinitive"
      @cancel="cancelConfirmation"
    />

    <!-- Messages d'état -->
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import gameService from "../../services/gameService";
import tournamentService from "../../services/tournamentService";
import type { Game, Tournament, Team, Player } from "../../types";
import { VueDraggableNext } from "vue-draggable-next";
import Toast from "@/shared/Toast.vue";
import ConfirmationDialog from "@/shared/ConfirmationDialog.vue";

//------------------------------------------------------
// ÉTATS PRINCIPAUX
//------------------------------------------------------

// Données de base
const games = ref<Game[]>([]);
const tournaments = ref<Tournament[]>([]);
const teams = ref<Team[]>([]);
const unassignedPlayers = ref<Player[]>([]);

// Sélections et filtres
const selectedGame = ref("");
const selectedTournament = ref("");
const selectedTournamentDetails = ref<
  (Tournament & { players: Player[] }) | null
>(null);

// État de l'interface
const viewMode = ref("overview"); // 'overview' ou 'team'
const activeTeamTab = ref(0);
const numTeams = ref(2);
const isDragging = ref(false);
const searchFocused = ref(false);
const searchQuery = ref("");
const searchResults = ref<
  { player: Player; teamName: string; teamIndex?: number }[]
>([]);

// Messages et dialogues
const error = ref<string | null>(null);
const success = ref<string | null>(null);
const showConfirmationDialog = ref(false);

//------------------------------------------------------
// CHARGEMENT INITIAL DES DONNÉES
//------------------------------------------------------

/**
 * Charge la liste des jeux disponibles depuis l'API
 */
const fetchGames = async () => {
  games.value = await gameService.getGames();
};

/**
 * Charge la liste des tournois pour le jeu sélectionné
 */
const fetchTournamentsByGame = async () => {
  if (selectedGame.value) {
    const allTournaments = await tournamentService.getTournamentsByGame(
      selectedGame.value
    );
    // Ne garder que les tournois non terminés
    tournaments.value = allTournaments.filter(
      (tournament) => !tournament.finished
    );
  }
};

/**
 * Charge les détails du tournoi sélectionné et ses équipes si existantes
 */
const fetchTournamentDetails = async () => {
  if (selectedTournament.value) {
    selectedTournamentDetails.value = await tournamentService.getTournamentById(
      selectedTournament.value
    );

    // Si des équipes existent déjà, les afficher
    if (selectedTournamentDetails.value.teams) {
      teams.value = selectedTournamentDetails.value.teams;
      // Initialiser en mode vue d'ensemble
      viewMode.value = "overview";
    } else {
      // Si pas d'équipes, initialiser avec un tableau vide
      teams.value = [];
    }

    // Mettre à jour la liste des joueurs non assignés
    updateUnassignedPlayers();
  }
};

//------------------------------------------------------
// GESTION DES ÉQUIPES
//------------------------------------------------------

/**
 * Génère les équipes automatiquement selon le nombre spécifié
 */
const generateTeams = async () => {
  if (selectedTournament.value && numTeams.value > 0) {
    const response = await tournamentService.generateTeams(
      selectedTournament.value,
      numTeams.value
    );
    teams.value = response.teams ?? [];

    // Initialiser en mode vue d'ensemble
    viewMode.value = "overview";

    // Mettre à jour la liste des joueurs non assignés
    updateUnassignedPlayers();
  }
};
/**
 * Assigne un joueur non assigné à une équipe spécifique
 */
const assignPlayerToTeam = (playerIndex: number, teamIndex: string) => {
  // Convertir l'index d'équipe en nombre, car il vient d'un select HTML
  const teamIdxNum = parseInt(teamIndex, 10);

  // Vérifier que les indices sont valides
  if (
    playerIndex >= 0 &&
    playerIndex < unassignedPlayers.value.length &&
    teamIdxNum >= 0 &&
    teamIdxNum < teams.value.length
  ) {
    // Obtenir le joueur à déplacer
    const playerToMove = unassignedPlayers.value[playerIndex];

    // Ajouter le joueur à l'équipe cible
    teams.value[teamIdxNum].players.push(playerToMove);

    // Supprimer le joueur de la liste des non assignés
    unassignedPlayers.value.splice(playerIndex, 1);

    // Mettre à jour les joueurs non assignés
    updateUnassignedPlayers();

    // Afficher un message de confirmation
    showMessage(
      "success",
      `${playerToMove.username} a été assigné à l'équipe ${
        teams.value[teamIdxNum].name || `Équipe ${teamIdxNum + 1}`
      }`
    );
  }
};

/**
 * Met à jour la liste des joueurs non assignés en se basant sur les joueurs du tournoi
 * qui ne sont dans aucune équipe
 */
const updateUnassignedPlayers = () => {
  if (
    selectedTournamentDetails.value &&
    selectedTournamentDetails.value.players
  ) {
    // Créer un ensemble des IDs des joueurs déjà assignés à une équipe
    const assignedPlayerIds = new Set();
    teams.value.forEach((team) => {
      team.players.forEach((player) => {
        assignedPlayerIds.add(player._id);
      });
    });

    // Filtrer les joueurs du tournoi qui ne sont pas dans cet ensemble d'IDs assignés
    unassignedPlayers.value = selectedTournamentDetails.value.players.filter(
      (player) => !assignedPlayerIds.has(player._id)
    );
  }
};

/**
 * Gère la fin d'un événement de drag and drop
 */
const onDragEnd = () => {
  updateUnassignedPlayers();
};

/**
 * Sélectionne une équipe spécifique pour l'édition détaillée
 */
const selectTeam = (index: number) => {
  viewMode.value = "team";
  activeTeamTab.value = index;
};

/**
 * Calcule la classe CSS à appliquer selon l'équilibre de l'équipe
 */
const getTeamBalanceClass = (team: Team): string => {
  // Calculer l'équilibre des équipes
  const avgPlayers =
    teams.value.reduce((acc: number, t: Team) => acc + t.players.length, 0) /
    teams.value.length;

  if (team.players.length === 0) return "empty";
  if (team.players.length < avgPlayers * 0.8) return "unbalanced-low";
  if (team.players.length > avgPlayers * 1.2) return "unbalanced-high";
  return "balanced";
};

//------------------------------------------------------
// SAUVEGARDE & FINALISATION DES ÉQUIPES
//------------------------------------------------------

/**
 * Sauvegarde les équipes sans les finaliser
 */
const saveTeams = async () => {
  if (selectedTournament.value && teams.value.length > 0) {
    try {
      await tournamentService.updateTournamentTeams(
        selectedTournament.value,
        teams.value
      );
      showMessage("success", "Équipes enregistrées avec succès !");
    } catch (err) {
      console.error("Erreur lors de l'enregistrement des équipes:", err);
      showMessage(
        "error",
        "Une erreur est survenue lors de l'enregistrement des équipes"
      );
    }
  } else {
    showMessage(
      "error",
      "Impossible d'enregistrer les équipes: données manquantes"
    );
  }
};

/**
 * Affiche le dialogue de confirmation pour finaliser les équipes
 */
const saveTeamDefinitive = async () => {
  showConfirmationDialog.value = true;
};

/**
 * Finalise les équipes après confirmation
 */
const confirmTeamDefinitive = async () => {
  showConfirmationDialog.value = false;

  if (selectedTournament.value && selectedTournamentDetails.value) {
    try {
      // 1. Mettre à jour les équipes
      await tournamentService.updateTournamentTeams(
        selectedTournament.value,
        teams.value
      );

      // 2. Marquer le tournoi comme terminé
      if (selectedTournamentDetails.value) {
        await tournamentService.updateTournament(selectedTournament.value, {
          ...selectedTournamentDetails.value,
          finished: true,
          game: selectedTournamentDetails.value.game,
        });
      }

      // 3. Créer les canaux Discord
      await tournamentService.createDiscordChannels(teams.value);

      showMessage(
        "success",
        "Équipes définitives enregistrées avec succès et canaux Discord créés !"
      );
    } catch (err) {
      showMessage(
        "error",
        "Une erreur est survenue lors de la validation des équipes"
      );
      console.error("Erreur lors de la validation des équipes:", err);
    }
  } else {
    showMessage(
      "error",
      "Impossible de valider les équipes: données manquantes"
    );
  }
};

/**
 * Ferme le dialogue de confirmation sans action
 */
const cancelConfirmation = () => {
  showConfirmationDialog.value = false;
};

//------------------------------------------------------
// RECHERCHE DE JOUEURS
//------------------------------------------------------

/**
 * Effectue une recherche parmi tous les joueurs (équipes + non assignés)
 */
const searchPlayers = () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    return;
  }

  const query = searchQuery.value.toLowerCase();
  const results: { player: Player; teamName: string; teamIndex?: number }[] =
    [];

  // Chercher dans toutes les équipes
  teams.value.forEach((team, index) => {
    team.players.forEach((player) => {
      if (player.username.toLowerCase().includes(query)) {
        results.push({
          player,
          teamName: team.name || `Équipe ${index + 1}`,
          teamIndex: index,
        });
      }
    });
  });

  // Chercher également dans les joueurs non assignés
  unassignedPlayers.value.forEach((player) => {
    if (player.username.toLowerCase().includes(query)) {
      results.push({
        player,
        teamName: "Non assigné",
      });
    }
  });

  searchResults.value = results.slice(0, 10); // Limiter à 10 résultats
};

/**
 * Désassigne tous les joueurs d'une équipe spécifique
 */
const unassignAllPlayers = (teamIndex: number) => {
  const team = teams.value[teamIndex];

  // Déplacer tous les joueurs vers unassignedPlayers
  unassignedPlayers.value = [...unassignedPlayers.value, ...team.players];

  // Vider l'équipe
  team.players = [];

  // Mettre à jour pour refléter les changements
  updateUnassignedPlayers();

  // Afficher un message de confirmation
  showMessage(
    "success",
    `Tous les joueurs de l'équipe ${
      team.name || `Équipe ${teamIndex + 1}`
    } ont été désassignés`
  );
};

/**
 * Navigue vers l'équipe d'un joueur trouvé dans la recherche
 */
const navigateToPlayerTeam = (result: {
  player: Player;
  teamName: string;
  teamIndex?: number;
}) => {
  // Fermer la liste déroulante en effaçant la recherche
  searchQuery.value = "";
  searchResults.value = [];

  // Si le joueur est non assigné
  if (result.teamName === "Non assigné") {
    // Scroll jusqu'à la section des joueurs non assignés
    const unassignedSection = document.querySelector(".unassigned-players");
    if (unassignedSection) {
      unassignedSection.scrollIntoView({ behavior: "smooth" });
    }
    return;
  }

  // Si le joueur est dans une équipe
  if (result.teamIndex !== undefined) {
    selectTeam(result.teamIndex);

    // Mettre en évidence brièvement le joueur
    setTimeout(() => {
      const playerElement = document.querySelector(
        `[data-player-id="${result.player._id}"]`
      );
      if (playerElement) {
        playerElement.classList.add("highlighted");
        setTimeout(() => {
          playerElement.classList.remove("highlighted");
        }, 2000);
      }
    }, 300);
  }
};

//------------------------------------------------------
// UTILITAIRES
//------------------------------------------------------

/**
 * Affiche un message de succès ou d'erreur temporaire
 */
const showMessage = (type: "success" | "error", message: string) => {
  if (type === "success") {
    success.value = message;
    error.value = null;
  } else {
    error.value = message;
    success.value = null;
  }

  // Effacer le message après 5 secondes
  setTimeout(() => {
    success.value = null;
    error.value = null;
  }, 5000);
};

// Charger les jeux au montage du composant
onMounted(() => {
  fetchGames();
});
</script>

<style scoped>
/* Effet grille en fond (non remplaçable facilement en Tailwind) */
.team-management-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      rgba(139, 92, 246, 0.03) 25%,
      rgba(139, 92, 246, 0.03) 26%,
      transparent 27%,
      transparent 74%,
      rgba(139, 92, 246, 0.03) 75%,
      rgba(139, 92, 246, 0.03) 76%,
      transparent 77%
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      rgba(139, 92, 246, 0.03) 25%,
      rgba(139, 92, 246, 0.03) 26%,
      transparent 27%,
      transparent 74%,
      rgba(139, 92, 246, 0.03) 75%,
      rgba(139, 92, 246, 0.03) 76%,
      transparent 77%
    );
  background-size: 50px 50px;
  z-index: -1;
}

/* Style pour le select et son arrow */
.select-wrapper {
  position: relative;
  width: 100%;
}

.select-arrow {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #06b6d4;
  pointer-events: none;
}

/* Input glow effect - difficile à faire en Tailwind */
.input-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0.5rem;
  pointer-events: none;
  transition: box-shadow 0.3s ease;
}

input:focus + .input-glow {
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.7);
}

/* Effet de mise en évidence */
.highlighted {
  animation: highlight 1.5s ease;
  position: relative;
  z-index: 2;
}

@keyframes highlight {
  0%,
  100% {
    box-shadow: 0 0 0 rgba(16, 185, 129, 0.7);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.9);
    transform: scale(1.05);
  }
}

/* Styles pour le drag-and-drop */
.sortable-ghost {
  opacity: 0.5;
  background: rgba(16, 185, 129, 0.2) !important;
  border: 2px dashed rgba(16, 185, 129, 0.6) !important;
}

.sortable-chosen {
  opacity: 0.8;
  transform: scale(1.02);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
  z-index: 10;
}

/* Animation d'apparition simple */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
