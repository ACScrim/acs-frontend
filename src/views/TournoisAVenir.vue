<template>
  <div class="container mx-auto p-8 pt-20">
    <h1 class="text-5xl text-center text-white mb-12 neon-text glow-pink">
      Tournois à venir
    </h1>

    <!-- Filtres -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-black bg-opacity-60 p-6 rounded-lg border border-pink-500 shadow-lg shadow-pink-500/20"
    >
      <div>
        <label for="game" class="block text-lg text-white mb-2 font-orbitron">
          <span class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-pink-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
              />
            </svg>
            Filtrer par jeu
          </span>
        </label>
        <select
          id="game"
          v-model="selectedGame"
          @change="fetchTournaments"
          class="w-full p-3 text-white bg-gray-900 border border-pink-500 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent font-orbitron"
        >
          <option value="">Tous les jeux</option>
          <option v-for="game in games" :key="game._id" :value="game._id">
            {{ game.name }}
          </option>
        </select>
      </div>
      <div class="flex items-center">
        <label class="cyberpunk-checkbox-container">
          <input
            type="checkbox"
            v-model="showFinished"
            @change="fetchTournaments"
            class="hidden"
          />
          <div class="cyberpunk-checkbox flex items-center">
            <div
              class="checkbox-visual relative w-6 h-6 bg-gray-800 border border-pink-500 mr-3"
            >
              <div
                v-if="showFinished"
                class="absolute inset-1 bg-pink-500"
              ></div>
            </div>
            <span class="text-white font-orbitron"
              >Afficher les tournois passés</span
            >
          </div>
        </label>
      </div>
      <!-- Ajoutez cela dans la section des filtres -->
      <div class="flex items-center">
        <label class="cyberpunk-checkbox-container">
          <input type="checkbox" v-model="sortAscending" class="hidden" />
          <div class="cyberpunk-checkbox flex items-center">
            <div
              class="checkbox-visual relative w-6 h-6 bg-gray-800 border border-pink-500 mr-3"
            >
              <div
                v-if="sortAscending"
                class="absolute inset-1 bg-pink-500"
              ></div>
            </div>
            <span class="text-white font-orbitron">
              Ordre chronologique
              <span class="ml-1 text-sm text-gray-400">
                ({{ sortAscending ? "ancien → récent" : "récent → ancien" }})
              </span>
            </span>
          </div>
        </label>
      </div>
    </div>

    <!-- Notifications -->
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />

    <!-- Avertissement connexion -->
    <div
      v-if="!user"
      class="mb-8 p-4 bg-red-900 text-white rounded border border-red-600 shadow-md flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mr-2 text-red-300"
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
      Veuillez vous connecter pour pouvoir vous inscrire aux tournois.
    </div>

    <!-- Liste des tournois -->
    <div v-if="filteredTournaments.length > 0">
      <div
        v-for="tournament in filteredTournaments"
        :key="tournament._id"
        class="bg-gray-900/70 backdrop-blur rounded-lg overflow-hidden transition-all duration-300 hover:translate-y-[-3px] mb-8 relative hover:scale-101"
        :class="{
          'tournament-finished': tournament.finished,
          'tournament-upcoming': !tournament.finished,
        }"
      >
        <!-- Header du tournoi -->
        <div
          class="bg-gray-900/80 border-b border-gray-700/60 flex flex-col md:flex-row justify-between items-start md:items-center p-4 md:p-6"
        >
          <div>
            <h2 class="text-2xl md:text-3xl text-white font-audiowide mb-2">
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
              v-if="!isUserRegistered(tournament)"
              @click="openRegistrationPopup(tournament, 'register')"
              class="bg-gradient-to-r from-purple-900 to-fuchsia-600 text-white border border-pink-500 shadow-[0_0_5px_#ec4899,inset_0_0_5px_#ec4899] transition-all duration-300 hover:bg-gradient-to-r hover:from-fuchsia-600 hover:to-pink-500 hover:shadow-[0_0_10px_#ec4899,inset_0_0_10px_#ec4899] px-4 py-2 rounded flex items-center"
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
              v-else-if="isWithin24Hours(tournament.date)"
              @click="
                tournament._id &&
                  checkIn(tournament._id, !checkedInPlayers[tournament._id])
              "
              :class="{
                'neon-button-green':
                  tournament._id && checkedInPlayers[tournament._id],
                'bg-gradient-to-r from-amber-800 to-amber-500 text-white border border-amber-400 shadow-[0_0_5px_#fbbf24,inset_0_0_5px_#fbbf24] transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-300 hover:shadow-[0_0_10px_#fbbf24,inset_0_0_10px_#fbbf24] px-4 py-2 rounded flex items-center':
                  tournament._id && !checkedInPlayers[tournament._id],
              }"
              class="px-4 py-2 rounded flex items-center"
            >
              <span class="mr-2 font-orbitron">
                {{
                  tournament._id && checkedInPlayers[tournament._id]
                    ? "Check-in confirmé"
                    : "Check-in"
                }}
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
              @click="openRegistrationPopup(tournament, 'unregister')"
              class="neon-button-gray px-4 py-2 rounded flex items-center"
            >
              <span class="mr-2 font-orbitron">Se désinscrire</span>
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
        <div
          class="tournament-tabs flex justify-start border-b border-gray-700"
        >
          <button
            @click="toggleParticipants(tournament._id ?? '')"
            :class="{
              'text-pink-500 border-b-2 border-pink-500 bg-pink-500/10':
                tournament._id && showParticipants[tournament._id],
              'text-gray-400 border-b-2 border-transparent hover:text-gray-300 hover:bg-gray-500/10':
                !tournament._id || !showParticipants[tournament._id],
            }"
            class="tab-button flex items-center px-6 py-2"
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
          </button>
          <button
            @click="toggleDescription(tournament._id ?? '')"
            :class="{
              'text-pink-500 border-b-2 border-pink-500 bg-pink-500/10':
                tournament._id && showDescription[tournament._id],
              'text-gray-400 border-b-2 border-transparent hover:text-gray-300 hover:bg-gray-500/10':
                !tournament._id || !showDescription[tournament._id],
            }"
            class="tab-button flex items-center px-6 py-2"
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
          <div class="flex-grow"></div>
          <div
            v-if="tournament.finished"
            class="px-4 py-2 text-green-400 font-orbitron flex items-center"
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
        <div class="tournament-content p-4 md:p-6 bg-gray-900 bg-opacity-70">
          <!-- Onglet participants -->
          <div
            v-if="
              tournament && tournament._id && showParticipants[tournament._id]
            "
            class="min-h-[150px] animate__animated animate__fadeIn"
          >
            <h3
              class="text-xl text-white font-audiowide mb-4 flex items-center"
            >
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
                class="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-purple-500 shadow-inner"
              >
                <h4
                  class="text-lg text-white font-orbitron border-b border-purple-500 pb-2 mb-2"
                >
                  {{ team.name }}
                </h4>
                <ul class="space-y-1">
                  <li
                    v-for="player in team.players"
                    :key="player._id"
                    class="text-white flex items-center"
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
              v-else
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
            >
              <li
                v-for="player in tournament.players"
                :key="player._id"
                class="text-white bg-gray-800 bg-opacity-50 p-3 rounded-lg flex items-center"
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
            <p v-else class="text-gray-400 italic py-4 text-center">
              Aucune équipe inscrite pour ce tournoi.
            </p>
          </div>

          <!-- Onglet description -->
          <div
            v-if="tournament._id && showDescription[tournament._id]"
            class="min-h-[150px] animate__animated animate__fadeIn"
          >
            <h3
              class="text-xl text-white font-audiowide mb-4 flex items-center"
            >
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
              class="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-cyan-900"
            >
              <p
                v-if="tournament.description"
                class="text-white leading-relaxed"
              >
                {{ tournament.description }}
              </p>
              <p v-else class="text-gray-400 italic">
                Pas de description disponible pour ce tournoi.
              </p>
            </div>
          </div>

          <!-- Résultats (si tournoi terminé) -->
          <div
            v-if="tournament.finished"
            class="mt-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-6 rounded-xl border border-indigo-500/50 shadow-inner"
          >
            <h3
              class="text-xl text-white font-audiowide mb-4 flex items-center"
            >
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
              <span class="glow-text">Classement final</span>
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              <!-- Podium -->
              <div class="col-span-1 md:col-span-3 mb-8">
                <div class="relative mt-24 md:mt-32 mb-12 podium-container">
                  <!-- Le podium physique -->
                  <div class="flex justify-center items-end h-40 md:h-52">
                    <!-- 2ème place -->
                    <div class="w-1/4 md:w-1/5 relative">
                      <div
                        class="silver-podium h-24 md:h-32 rounded-t-lg"
                      ></div>
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
                      <div
                        class="bronze-podium h-16 md:h-24 rounded-t-lg"
                      ></div>
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
                        class="text-sm md:text-base font-audiowide text-gray-300 mb-2 text-center"
                      >
                        🥈
                        {{
                          getTeamsByRank(tournament, 2).length > 1
                            ? "Ex aequo"
                            : "Argent"
                        }}
                      </h4>
                      <div class="space-y-2">
                        <div
                          v-for="team in getTeamsByRank(tournament, 2)"
                          :key="team._id"
                          class="bg-gradient-to-br from-gray-700/70 to-gray-600/70 text-white p-3 rounded-lg border-2 border-gray-400/80 shadow-lg transform transition-transform hover:scale-105 team-card"
                        >
                          <p
                            class="font-bold text-sm md:text-base font-audiowide truncate text-center"
                          >
                            {{ team.name }}
                          </p>
                          <div class="mt-2 space-y-1">
                            <div
                              v-for="player in team.players"
                              :key="player._id"
                              class="text-xs bg-gray-800/80 p-1 rounded flex items-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-3 w-3 mr-1 text-white opacity-70"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              <span class="truncate">{{
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
                        class="text-sm md:text-lg font-audiowide text-yellow-400 mb-2 text-center glow-gold"
                      >
                        🏆
                        {{
                          getTeamsByRank(tournament, 1).length > 1
                            ? "Champions ex aequo"
                            : "Champion"
                        }}
                      </h4>
                      <div class="space-y-2">
                        <div
                          v-for="team in getTeamsByRank(tournament, 1)"
                          :key="team._id"
                          class="bg-gradient-to-br from-amber-700/70 to-yellow-600/70 p-3 rounded-lg border-2 border-yellow-500 shadow-lg shadow-yellow-500/30 transform transition-transform hover:scale-105 team-card"
                        >
                          <p
                            class="font-bold text-sm md:text-base text-white font-audiowide truncate text-center"
                          >
                            {{ team.name }}
                          </p>
                          <div class="mt-2 space-y-1">
                            <div
                              v-for="player in team.players"
                              :key="player._id"
                              class="text-xs bg-black/40 p-1 rounded flex items-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-3 w-3 mr-1 text-yellow-200"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              <span class="truncate">{{
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
                        class="text-sm md:text-base font-audiowide text-amber-700 mb-2 text-center"
                      >
                        🥉
                        {{
                          getTeamsByRank(tournament, 3).length > 1
                            ? "Ex aequo"
                            : "Bronze"
                        }}
                      </h4>
                      <div class="space-y-2">
                        <div
                          v-for="team in getTeamsByRank(tournament, 3)"
                          :key="team._id"
                          class="bg-gradient-to-br from-amber-900/70 to-amber-700/70 text-white p-3 rounded-lg border-2 border-amber-700/80 shadow-lg transform transition-transform hover:scale-105 team-card"
                        >
                          <p
                            class="font-bold text-sm md:text-base font-audiowide truncate text-center"
                          >
                            {{ team.name }}
                          </p>
                          <div class="mt-2 space-y-1">
                            <div
                              v-for="player in team.players"
                              :key="player._id"
                              class="text-xs bg-gray-800/80 p-1 rounded flex items-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-3 w-3 mr-1 text-white opacity-70"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              <span class="truncate">{{
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
                  @click="toggleOtherRankings(tournament._id ?? '')"
                  class="w-full text-left p-4 bg-gray-800/50 rounded-lg border border-indigo-800/30 flex justify-between items-center hover:bg-indigo-900/20 transition-colors"
                >
                  <h3
                    class="text-xl text-white font-audiowide flex items-center"
                  >
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
                      isOtherRankingsExpanded(tournament._id ?? '')
                        ? 'transform rotate-180'
                        : '',
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

                <!-- Contenu dépliable -->
                <div
                  v-if="
                    tournament._id && isOtherRankingsExpanded(tournament._id)
                  "
                  class="mt-4 space-y-8 bg-gray-900/30 p-4 rounded-lg border border-indigo-800/20 animate__animated animate__fadeIn"
                >
                  <!-- Équipes classées (4e et plus) -->
                  <div
                    v-if="
                      Object.keys(
                        groupTeamsByRank(
                          (tournament.teams ?? []).filter((t) => t.ranking > 3)
                        )
                      ).length > 0
                    "
                    class="space-y-6"
                  >
                    <div
                      v-for="(teams, rank) in groupTeamsByRank(
                        (tournament.teams ?? []).filter((t) => t.ranking > 3)
                      )"
                      :key="rank"
                      class="mb-6"
                    >
                      <h4
                        class="text-lg font-audiowide text-indigo-300 mb-4 border-b border-indigo-800 pb-2"
                      >
                        {{ getRankingLabel(parseInt(rank), teams.length) }}
                      </h4>

                      <div
                        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                      >
                        <div
                          v-for="team in teams"
                          :key="team._id"
                          :class="[
                            'p-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-105',
                            getRankingClass(team.ranking),
                          ]"
                        >
                          <h5
                            class="text-lg font-bold font-audiowide mb-3 flex items-center"
                          >
                            <span class="truncate">{{ team.name }}</span>
                            <span
                              class="ml-auto bg-indigo-600/70 text-white text-xs px-2 py-1 rounded"
                            >
                              {{ team.ranking }}e
                            </span>
                          </h5>

                          <ul
                            v-if="team.players && team.players.length > 0"
                            class="space-y-2"
                          >
                            <li
                              v-for="player in team.players"
                              :key="player._id"
                              class="text-sm bg-gray-800/50 p-2 rounded flex items-center"
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
                              <span class="truncate">{{
                                player.username
                              }}</span>
                            </li>
                          </ul>
                          <p
                            v-else
                            class="text-gray-400 italic text-sm text-center"
                          >
                            Aucun membre dans cette équipe
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Équipes non classées -->
                  <div
                    v-if="
                      tournament.teams &&
                      tournament.teams.some(
                        (t) => !t.ranking || t.ranking === 0
                      )
                    "
                    class="mb-6"
                  >
                    <h4
                      class="text-lg font-audiowide text-gray-400 mb-4 border-b border-gray-800 pb-2"
                    >
                      Non classées
                    </h4>

                    <div
                      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      <div
                        v-for="team in tournament.teams.filter(
                          (t) => !t.ranking || t.ranking === 0
                        )"
                        :key="team._id"
                        class="p-4 rounded-lg shadow-lg bg-gradient-to-br from-gray-900/30 to-gray-800/30 text-gray-300 border border-gray-700 transition-all duration-300 hover:scale-105 team-card"
                      >
                        <h5
                          class="text-lg font-bold font-audiowide mb-3 flex items-center"
                        >
                          <span class="truncate">{{ team.name }}</span>
                          <span
                            class="ml-auto bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded"
                          >
                            Non classé
                          </span>
                        </h5>

                        <ul class="space-y-2">
                          <li
                            v-for="player in team.players"
                            :key="player._id"
                            class="text-sm bg-gray-800/80 p-2 rounded flex items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-4 w-4 mr-2 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            <span class="truncate">{{ player.username }}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- Message s'il n'y a pas d'équipes classées au-delà du podium -->
                  <div
                    v-if="
                      !(tournament.teams ?? []).some((t) => t.ranking > 3) &&
                      !(tournament.teams ?? []).some(
                        (t) => !t.ranking || t.ranking === 0
                      )
                    "
                    class="p-6 text-center text-gray-400 italic"
                  >
                    Pas d'autres équipes classées au-delà du podium.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Message pas de tournois -->
    <div
      v-else
      class="flex flex-col items-center justify-center p-12 bg-black bg-opacity-60 rounded-lg border border-pink-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 text-pink-500 mb-4"
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
      <p class="text-white text-center text-xl font-orbitron">
        Pas de tournois trouvés.
      </p>
    </div>

    <!-- Modal de confirmation -->
    <ConfirmationDialog
      v-if="showPopup"
      :title="'Confirmation'"
      :message="`Voulez-vous ${
        actionType === 'register' ? 'vous inscrire' : 'vous désinscrire'
      } au tournoi ${selectedTournament?.name} en tant que ${user?.username} ?`"
      @confirm="confirmAction"
      @cancel="closePopup"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import gameService from "../services/gameService";
import tournamentService from "../services/tournamentService";
import playerService from "../services/playerService";
import { useUserStore } from "../stores/userStore";
import Toast from "@/shared/Toast.vue";
import type { Game, Tournament } from "../types";
import ConfirmationDialog from "@/shared/ConfirmationDialog.vue";

// Regroupement et organisation des états du composant
// SECTION: État du composant
//-------------------------------------------------------

// États globaux
const games = ref<Game[]>([]);
const tournaments = ref<Tournament[]>([]);
const success = ref<string | null>(null);
const error = ref<string | null>(null);

// États de filtrage et d'affichage
const selectedGame = ref<string>("");
const showFinished = ref<boolean>(false);
const sortAscending = ref<boolean>(false);

// États d'interface et d'interaction
const showParticipants = ref<{ [key: string]: boolean }>({});
const showDescription = ref<{ [key: string]: boolean }>({});
const showOtherRankings = ref<{ [key: string]: boolean }>({});
const checkedInPlayers = ref<{ [key: string]: boolean }>({});

// États du modal de confirmation
const showPopup = ref<boolean>(false);
const selectedTournament = ref<Tournament | null>(null);
const actionType = ref<string>("register"); // "register" ou "unregister"

//-------------------------------------------------------
// SECTION: Store et propriétés calculées
//-------------------------------------------------------

// Accès au store utilisateur
const userStore = useUserStore();
const user = computed(() => userStore.user);

/**
 * Filtre et trie les tournois selon les critères sélectionnés
 * - Filtre par jeu sélectionné
 * - Filtre par statut (terminé ou à venir)
 * - Trie par date (ascendant ou descendant)
 */
const filteredTournaments = computed(() => {
  // Appliquer d'abord les filtres pour réduire le nombre d'éléments à trier
  let filtered = tournaments.value;

  // Filtre par jeu si un jeu est sélectionné
  if (selectedGame.value) {
    filtered = filtered.filter((t) => t.game._id === selectedGame.value);
  }

  // Filtre par statut (terminé/à venir)
  if (!showFinished.value) {
    filtered = filtered.filter((t) => !t.finished);
  }

  // Tri chronologique configurable
  const sortMultiplier = sortAscending.value ? 1 : -1;

  return filtered.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return (dateA - dateB) * sortMultiplier;
  });
});

//-------------------------------------------------------
// SECTION: Récupération des données
//-------------------------------------------------------

/**
 * Récupère la liste des tournois depuis l'API
 * et vérifie les check-ins de l'utilisateur
 */
const fetchTournaments = async () => {
  // Réinitialiser les états de check-in
  checkedInPlayers.value = {};

  // Récupérer tous les tournois
  tournaments.value = await tournamentService.getTournaments();

  // Vérifier l'état de check-in du joueur pour chaque tournoi
  if (user.value) {
    const player = await playerService.getPlayerByIdUser(user.value._id);
    if (player && player._id) {
      tournaments.value.forEach((tournament) => {
        if (tournament._id) {
          checkedInPlayers.value[tournament._id] =
            (tournament.checkIns &&
              player._id &&
              tournament.checkIns[player._id]) ||
            false;
        }
      });
    }
  }
};

//-------------------------------------------------------
// SECTION: Gestion des onglets des tournois
//-------------------------------------------------------

/**
 * Bascule l'affichage de la liste des participants d'un tournoi
 * @param tournamentId - ID du tournoi
 */
const toggleParticipants = (tournamentId: string) => {
  showParticipants.value[tournamentId] = !showParticipants.value[tournamentId];
  if (showParticipants.value[tournamentId]) {
    showDescription.value[tournamentId] = false;
  }
};

/**
 * Bascule l'affichage de la description d'un tournoi
 * @param tournamentId - ID du tournoi
 */
const toggleDescription = (tournamentId: string) => {
  showDescription.value[tournamentId] = !showDescription.value[tournamentId];
  if (showDescription.value[tournamentId]) {
    showParticipants.value[tournamentId] = false;
  }
};

// Fonction pour basculer l'affichage des autres classements
const toggleOtherRankings = (tournamentId: string) => {
  showOtherRankings.value[tournamentId] =
    !showOtherRankings.value[tournamentId];
};

// Vérifier si la section des autres classements est dépliée
const isOtherRankingsExpanded = (tournamentId: string) => {
  return !!showOtherRankings.value[tournamentId];
};

//-------------------------------------------------------
// SECTION: Gestion des inscriptions aux tournois
//-------------------------------------------------------

/**
 * Ouvre le popup de confirmation pour l'inscription ou désinscription
 * @param tournament - Objet tournoi
 * @param type - Type d'action ("register" ou "unregister")
 */
const openRegistrationPopup = (tournament: Tournament, type: string) => {
  selectedTournament.value = tournament;
  actionType.value = type;
  showPopup.value = true;
};

/**
 * Ferme le popup de confirmation
 */
const closePopup = () => {
  showPopup.value = false;
  // Réinitialisation différée pour éviter les changements visuels pendant la transition de sortie
  setTimeout(() => {
    selectedTournament.value = null;
    actionType.value = "register";
  }, 300); // Correspondant à la durée de l'animation fadeOut
};

/**
 * Exécute l'action d'inscription ou de désinscription après confirmation
 */
const confirmAction = async () => {
  if (selectedTournament.value && user.value) {
    try {
      if (actionType.value === "register" && selectedTournament.value._id) {
        // Inscription au tournoi
        await tournamentService.registerPlayer(
          selectedTournament.value._id,
          user.value._id
        );
        showMessage("success", "Inscription réussie !");
      } else {
        if (selectedTournament.value._id) {
          // Désinscription du tournoi
          await tournamentService.unregisterPlayer(
            selectedTournament.value._id,
            user.value._id
          );
        }
        showMessage("success", "Désinscription réussie !");
      }
      fetchTournaments();
      closePopup();
    } catch (error) {
      console.error("Erreur lors de l'action:", error);
      showMessage("error", `Erreur lors de l'action.`);
    }
  }
};

/**
 * Vérifie si l'utilisateur courant est inscrit à un tournoi
 * @param tournament - Objet tournoi à vérifier
 * @returns true si l'utilisateur est inscrit, false sinon
 */
const isUserRegistered = (tournament: Tournament) => {
  return user.value
    ? tournament.players.some((player) => player.userId === user.value?._id)
    : false;
};

//-------------------------------------------------------
// SECTION: Gestion des check-ins
//-------------------------------------------------------

/**
 * Change l'état de check-in d'un joueur pour un tournoi avec retour visuel immédiat
 * @param tournamentId - ID du tournoi
 * @param checkedIn - Nouvel état de check-in
 */
const checkIn = async (tournamentId: string, checkedIn: boolean) => {
  // Optimistic UI: mettre à jour l'interface avant que la requête soit terminée
  checkedInPlayers.value[tournamentId] = checkedIn;

  try {
    if (user.value) {
      await tournamentService.checkInPlayer(
        tournamentId,
        user.value._id,
        checkedIn
      );

      showMessage(
        "success",
        checkedIn ? "Check-in confirmé !" : "Check-in annulé."
      );
    }
  } catch (error) {
    // En cas d'erreur, remettre l'état précédent
    checkedInPlayers.value[tournamentId] = !checkedIn;
    console.error("Erreur lors du check-in:", error);
    showMessage(
      "error",
      `Erreur: Impossible de ${
        checkedIn ? "confirmer" : "annuler"
      } le check-in.`
    );
  }
};

/**
 * Vérifie si un tournoi est dans les 24 heures précédant son début (pour check-in)
 * @param dateString - Date du tournoi au format string
 * @returns true si le tournoi est dans les 24 prochaines heures, false sinon
 */
const isWithin24Hours = (dateString: string) => {
  const tournamentDate = new Date(dateString); // Date du tournoi en heure locale
  const now = new Date(); // Date actuelle en heure locale

  const diff = tournamentDate.getTime() - now.getTime(); // Différence en milliseconde

  return diff > 0 && diff <= 24 * 60 * 60 * 1000; // 24 heures en millisecondes
};

//-------------------------------------------------------
// SECTION: Utilitaires et formatage
//-------------------------------------------------------

/**
 * Formate une date au format local français
 * @param dateString - Date au format string
 * @returns Date formatée (JJ/MM/AAAA HH:MM)
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
 * Affiche un message de notification temporaire
 * @param type - Type de message ("success" ou "error")
 * @param message - Contenu du message
 * @param duration - Durée d'affichage en ms (défaut: 3000ms)
 */
const showMessage = (
  type: "success" | "error",
  message: string,
  duration: number = 3000
) => {
  // Réinitialiser tout message précédent
  success.value = null;
  error.value = null;

  // Définir le nouveau message
  if (type === "success") {
    success.value = message;
  } else {
    error.value = message;
  }

  // Auto-effacement après la durée spécifiée
  setTimeout(() => {
    if (type === "success") {
      success.value = null;
    } else {
      error.value = null;
    }
  }, duration);
};

/**
 * Obtient le libellé correspondant au classement avec gestion des égalités
 * @param rank - Rang de l'équipe (1=or, 2=argent, 3=bronze, etc.)
 * @param equalCount - Nombre d'équipes ayant ce même rang (pour les ex aequo)
 * @returns Libellé formaté avec emoji et indication d'égalité si nécessaire
 */
const getRankingLabel = (
  rank: number | null | undefined,
  equalCount: number = 1
): string => {
  // Cas des équipes non classées
  if (rank === null || rank === undefined || rank === 0) {
    return "Non classé";
  }

  // Déterminer le libellé de base selon le rang
  let label;
  switch (rank) {
    case 1:
      label = "🥇 Or";
      break;
    case 2:
      label = "🥈 Argent";
      break;
    case 3:
      label = "🥉 Bronze";
      break;
    default:
      label = `${rank}ème`;
  }

  // Ajouter l'indication d'égalité si plusieurs équipes ont ce rang
  if (equalCount > 1) {
    label += ` (${equalCount} équipes ex aequo)`;
  }

  return label;
};

/**
 * Récupère toutes les équipes ayant un rang spécifique dans un tournoi
 * @param tournament - Tournoi contenant les équipes
 * @param rank - Rang à rechercher (1=or, 2=argent, 3=bronze, etc.)
 * @returns Tableau d'équipes ayant ce rang
 */
const getTeamsByRank = (tournament: Tournament, rank: number) => {
  // Vérification de sécurité avant de filtrer
  return (tournament?.teams ?? []).filter((team) => team.ranking === rank);
};

/**
 * Regroupe les équipes par rang pour l'affichage des égalités
 * @param teams - Tableau d'équipes à regrouper
 * @returns Objet avec les rangs comme clés et les tableaux d'équipes comme valeurs
 */
const groupTeamsByRank = (teams: any[]): Record<string, any[]> => {
  if (!teams?.length) return {};

  // Utiliser reduce pour regrouper les équipes par rang
  return teams.reduce((acc: Record<string, any[]>, team) => {
    // Gérer les cas où ranking est undefined, null ou 0
    const ranking = team.ranking;
    const rankKey = ranking && ranking > 0 ? ranking.toString() : "0";

    // Initialiser le tableau pour ce rang s'il n'existe pas encore
    if (!acc[rankKey]) acc[rankKey] = [];

    acc[rankKey].push(team);
    return acc;
  }, {});
};

//-------------------------------------------------------
// SECTION: Cycle de vie du composant
//-------------------------------------------------------

/**
 * Initialise les états de check-in pour l'utilisateur connecté
 */
const initializeCheckInStates = async () => {
  checkedInPlayers.value = {};

  if (!user.value) return;

  try {
    const player = await playerService.getPlayerByIdUser(user.value._id);
    if (!player?._id) return;

    tournaments.value.forEach((tournament) => {
      if (tournament._id) {
        checkedInPlayers.value[tournament._id] = !!(
          tournament.checkIns &&
          player._id &&
          tournament.checkIns[player._id]
        );
      }
    });
  } catch (error) {
    console.error("Erreur lors de l'initialisation des check-ins:", error);
  }
};

/**
 * Initialise les états d'interface pour les accordéons et onglets
 */
const initializeUIStates = () => {
  // Initialiser tous les accordéons comme fermés par défaut
  tournaments.value.forEach((tournament) => {
    if (tournament._id) {
      showOtherRankings.value[tournament._id] = false;
      showParticipants.value[tournament._id] = false;
      showDescription.value[tournament._id] = false;
    }
  });
};

/**
 * Détermine les classes CSS pour styliser les cartes d'équipe selon leur classement
 * @param rank - Rang de l'équipe
 * @returns Classes CSS pour la carte
 */
const getRankingClass = (rank: number | null | undefined): string => {
  if (rank === null || rank === undefined || rank === 0) {
    return "bg-gradient-to-br from-gray-900/30 to-gray-800/30 border-gray-700";
  }

  switch (rank) {
    case 1:
      return "bg-gradient-to-br from-amber-700/70 to-yellow-600/70 border-yellow-500";
    case 2:
      return "bg-gradient-to-br from-gray-700/70 to-gray-600/70 border-gray-400";
    case 3:
      return "bg-gradient-to-br from-amber-900/70 to-amber-700/70 border-amber-700";
    default:
      return "bg-gradient-to-br from-indigo-900/30 to-indigo-800/30 border-indigo-700/50";
  }
};

/**
 * Initialisation du composant au montage
 */
onMounted(async () => {
  try {
    // Chargement parallèle des jeux et tournois pour plus de rapidité
    const [gamesResult, tournamentsResult] = await Promise.all([
      gameService.getGames(),
      tournamentService.getTournaments(),
    ]);

    games.value = gamesResult;
    tournaments.value = tournamentsResult;

    // Initialisation des états d'interface
    await initializeCheckInStates();
    initializeUIStates();
  } catch (error) {
    console.error("Erreur lors de l'initialisation:", error);
    showMessage("error", "Erreur lors du chargement des données");
  }
});
</script>

<style scoped>
/* Base et layout */
.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Typographie spéciale */
.font-audiowide {
  font-family: "Audiowide", cursive; /* Police pour les titres futuristes */
}

.font-orbitron {
  font-family: "Orbitron", sans-serif; /* Police pour les données et chiffres */
}

/* Distinction entre tournois à venir et terminés */
.tournament-upcoming {
  border: 1px solid rgba(236, 72, 153, 0.3);
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.1); /* Lueur rose pour tournois à venir */
}

.tournament-finished {
  border: 1px solid rgba(74, 222, 128, 0.3);
  box-shadow: 0 0 15px rgba(74, 222, 128, 0.1); /* Lueur verte pour tournois terminés */
}

/* Podium et affichage des résultats */
.gold-podium {
  background: linear-gradient(to bottom, #f59e0b, #d97706);
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
}

.silver-podium {
  background: linear-gradient(to bottom, #9ca3af, #6b7280);
  box-shadow: 0 0 15px rgba(156, 163, 175, 0.5);
}

.bronze-podium {
  background: linear-gradient(to bottom, #92400e, #78350f);
  box-shadow: 0 0 15px rgba(146, 64, 14, 0.5);
}

/* Animation pour la médaille d'or sur le podium */
.gold-circle {
  background: linear-gradient(135deg, #f59e0b, #b45309);
  box-shadow: 0 0 30px rgba(245, 158, 11, 0.6);
  animation: pulse-gold 2s infinite;
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

/* Animation plus subtile pour les badges Or */
@keyframes pulse-subtle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s infinite;
}

/* Styles spécifiques pour les équipes hors podium */
.col-span-1.md\:col-span-3.mt-12 {
  border-top: 1px solid rgba(79, 70, 229, 0.3);
  padding-top: 2rem;
}

/* Animation subtile pour les cartes d'équipe au survol */
[class*="hover:scale-105"] {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

[class*="hover:scale-105"]:hover {
  transform: scale(1.05);
  z-index: 1;
}

/* Style pour les classements numérotés */
[class*="bg-indigo-600"] {
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  font-family: "Orbitron", sans-serif;
}

/* Améliore la lisibilité des noms de joueurs */
.truncate {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.glow-pink {
  animation: glowPink 1.5s ease-in-out infinite alternate;
}

@keyframes glowPink {
  from {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #e60073, 0 0 20px #e60073,
      0 0 25px #e60073, 0 0 30px #e60073, 0 0 35px #e60073;
  }
  to {
    text-shadow: 0 0 10px #fff, 0 0 20px #ff4da6, 0 0 30px #ff4da6,
      0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6;
  }
}

.tournament-card {
  background: rgba(13, 13, 15, 0.7);
  backdrop-filter: blur(4px);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tournament-card:hover {
  transform: translateY(-3px);
}

.tournament-upcoming {
  border: 1px solid rgba(236, 72, 153, 0.3);
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.1);
}

.tournament-finished {
  border: 1px solid rgba(74, 222, 128, 0.3);
  box-shadow: 0 0 15px rgba(74, 222, 128, 0.1);
}

.tab-button {
  color: #fff;
  font-family: "Orbitron", sans-serif;
  transition: all 0.3s ease;
}

.neon-button-green {
  background: linear-gradient(to right, #005200, #00c700);
  color: white;
  border: 1px solid #10b981;
  box-shadow: 0 0 5px #10b981, inset 0 0 5px #10b981;
  transition: all 0.3s ease;
}

.neon-button-green:hover {
  background: linear-gradient(to right, #00c700, #00ff00);
  box-shadow: 0 0 10px #10b981, inset 0 0 10px #10b981;
}

.neon-button-gray {
  background: linear-gradient(to right, #2d3748, #4a5568);
  color: white;
  border: 1px solid #718096;
  box-shadow: 0 0 5px #718096, inset 0 0 5px #718096;
  transition: all 0.3s ease;
}

.neon-button-gray:hover {
  background: linear-gradient(to right, #4a5568, #718096);
  box-shadow: 0 0 10px #718096, inset 0 0 10px #718096;
}

.neon-button-cyan {
  background: linear-gradient(to right, #0e7490, #06b6d4);
  color: white;
  border: 1px solid #06b6d4;
  box-shadow: 0 0 5px #06b6d4, inset 0 0 5px #06b6d4;
  transition: all 0.3s ease;
}

.neon-button-cyan:hover {
  background: linear-gradient(to right, #06b6d4, #22d3ee);
  box-shadow: 0 0 10px #06b6d4, inset 0 0 10px #06b6d4;
}

.cyberpunk-checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-visual {
  position: relative;
  transition: all 0.2s ease;
  box-shadow: 0 0 2px #ec4899;
}

.cyberpunk-checkbox:hover .checkbox-visual {
  box-shadow: 0 0 8px #ec4899;
}

/* Animation pour le fade in */
.animate__fadeIn {
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Hover-scale pour les éléments interactifs */
.hover\:scale-101:hover {
  transform: scale(1.01);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Police pour tout le site */
.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

/* Animation pour les badges */
@keyframes pulse-glow {
  0%,
  100% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
  }
}

/* Amélioration du contraste pour les identifiants de joueurs */
.truncate {
  color: #ffffff; /* Texte blanc pour meilleur contraste */
  letter-spacing: 0.01em; /* Légère augmentation de l'espacement des lettres */
}

/* Amélioration du background des équipes hors podium */
[class*="from-indigo-900\/30"] {
  background: linear-gradient(
    to bottom right,
    rgba(49, 46, 129, 0.4),
    rgba(67, 56, 202, 0.4)
  );
  border: 1px solid rgba(99, 102, 241, 0.5);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Icône plus visible pour les joueurs hors podium */
.text-indigo-400 {
  color: #818cf8; /* Couleur plus vive pour l'icône */
}

/* Style spécifique pour les joueurs des équipes non classées */
.text-sm.bg-gray-800\/80 {
  color: #ffffff;
  background-color: rgba(55, 65, 81, 0.8);
  border-left: 2px solid rgba(156, 163, 175, 0.6);
}
/* Styles pour le podium amélioré */
.gold-podium {
  background: linear-gradient(to bottom, #f59e0b, #d97706);
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
}

.silver-podium {
  background: linear-gradient(to bottom, #9ca3af, #6b7280);
  box-shadow: 0 0 15px rgba(156, 163, 175, 0.5);
}

.bronze-podium {
  background: linear-gradient(to bottom, #92400e, #78350f);
  box-shadow: 0 0 15px rgba(146, 64, 14, 0.5);
}

.gold-circle {
  background: linear-gradient(135deg, #f59e0b, #b45309);
  box-shadow: 0 0 30px rgba(245, 158, 11, 0.6);
  animation: pulse-gold 2s infinite;
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

.glow-gold {
  text-shadow: 0 0 5px rgba(251, 191, 36, 0.7), 0 0 10px rgba(251, 191, 36, 0.5);
  animation: glow-pulse 2s infinite alternate;
}

@keyframes glow-pulse {
  from {
    text-shadow: 0 0 5px rgba(251, 191, 36, 0.7),
      0 0 10px rgba(251, 191, 36, 0.5);
  }
  to {
    text-shadow: 0 0 8px rgba(251, 191, 36, 0.9),
      0 0 15px rgba(251, 191, 36, 0.7);
  }
}

/* Styles pour l'accordéon des autres classements */
.animate__fadeIn {
  animation-duration: 0.3s;
}

/* Animation de rotation de la flèche */
.transition-transform {
  transition: transform 0.3s ease;
}

/* Style du bouton dépliant */
button.w-full {
  transition: all 0.3s ease;
}

button.w-full:hover {
  background-color: rgba(79, 70, 229, 0.2);
}

button.w-full:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.3);
}

/* Styles améliorés pour le podium */
.podium-container {
  position: relative;
  margin-top: 2rem;
  margin-bottom: 5rem;
  padding-top: 1.5rem;
}

/* Effet de perspective pour le podium */
.podium-container::before {
  content: "";
  position: absolute;
  top: 90%;
  left: 10%;
  right: 10%;
  height: 20px;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 70%
  );
  z-index: 0;
  filter: blur(5px);
}

.gold-podium,
.silver-podium,
.bronze-podium {
  position: relative;
  transform-style: preserve-3d;
}

/* Lueurs dynamiques autour du podium */
.gold-podium::after {
  content: "";
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
  height: 10px;
  background: rgba(245, 158, 11, 0.3);
  filter: blur(10px);
  animation: glow-float 3s ease-in-out infinite;
}

@keyframes glow-float {
  0%,
  100% {
    opacity: 0.5;
    transform: translateY(0);
  }
  50% {
    opacity: 0.8;
    transform: translateY(-5px);
  }
}

/* Effet cyberpunk pour les cartes des équipes */
.team-card {
  position: relative;
  overflow: hidden;
}

.team-card::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(
    45deg,
    rgba(255, 0, 255, 0.3),
    rgba(0, 255, 255, 0.3)
  );
  z-index: -1;
  transform: scale(1.05);
  animation: border-pulse 3s infinite;
}

@keyframes border-pulse {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.3;
  }
}
</style>
