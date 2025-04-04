<template>
  <div class="container mx-auto p-8 sm:p-8 pt-20 sm:pt-24">
    <div class="mb-6">
      <button
        @click="goBackToTournaments"
        class="cyberpunk-btn-pink px-5 py-2 rounded-md flex items-center justify-center font-orbitron shadow-lg transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
        Retour aux tournois
      </button>
    </div>
    <!-- Loader durant le chargement -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <CyberpunkLoader />
    </div>

    <!-- Message d'erreur si le tournoi n'existe pas -->
    <CyberTerminal
      v-else-if="!tournament"
      command="get_tournament --id"
      errorCode="404_TOURNAMENT_NOT_FOUND"
      message="Ce tournoi n'existe pas ou a été supprimé."
      class="my-8"
    />

    <!-- Affichage du tournoi -->
    <div v-else class="tournament-details">
      <!-- En-tête avec les informations principales -->
      <div
        class="bg-black/75 backdrop-blur-sm rounded-lg overflow-hidden border border-pink-500 shadow-lg shadow-pink-500/30 mb-8"
      >
        <!-- Image de bannière du jeu -->
        <div class="relative h-56 md:h-72 overflow-hidden">
          <!-- Image du jeu si elle existe -->
          <template v-if="tournament.game.imageUrl && !imageError">
            <img
              :src="tournament.game.imageUrl"
              :alt="tournament.game.name"
              class="w-full h-full object-cover"
              @error="handleImageError"
            />
          </template>

          <!-- SVG de remplacement si pas d'image -->
          <div
            v-else
            class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black"
          >
            <div class="cyber-game-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-32 w-32 text-pink-500/60"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
                />
              </svg>
              <div class="text-white text-xl font-audiowide mt-4 text-center">
                {{ tournament.game.name }}
              </div>
            </div>
          </div>

          <div
            class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"
          ></div>

          <!-- Badge "Terminé" reste inchangé -->
          <div
            v-if="tournament.finished"
            class="absolute top-4 right-4 px-4 py-2 text-green-400 font-orbitron flex items-center bg-green-900/80 rounded-full border border-green-500/80 text-sm shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            Tournoi terminé
          </div>

          <!-- Titre et informations principales restent inchangés -->
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <h1
              class="text-3xl md:text-4xl text-white font-audiowide mb-2 neon-text"
            >
              {{ tournament.name }}
            </h1>
          </div>
        </div>

        <!-- Informations détaillées -->
        <div
          class="p-6 bg-gray-900/50 font-orbitron grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <!-- Colonne 1: Date et jeu -->
          <div class="space-y-4">
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
              <span class="font-semibold">Date:</span>
              <span class="ml-2">{{ formatLocalDate(tournament.date) }}</span>
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
              <span class="font-semibold">Jeu:</span>
              <span class="ml-2">{{ tournament.game.name }}</span>
            </p>
            <p
              v-if="tournament.playerCap > 0"
              class="text-white flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-cyan-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="font-semibold">Limite:</span>
              <span class="ml-2">
                {{ tournament.players.length }} /
                {{ tournament.playerCap }} joueurs
              </span>
            </p>

            <!-- Barre de progression pour les places -->
            <div
              v-if="tournament.playerCap > 0"
              class="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden"
              title="Taux de remplissage du tournoi"
            >
              <div
                class="bg-cyan-500 h-2.5 rounded-full transition-all duration-500"
                :style="`width: ${Math.min(
                  100,
                  (tournament.players.length / tournament.playerCap) * 100
                )}%`"
              ></div>
            </div>

            <!-- Liste d'attente si applicable -->
            <div
              v-if="hasWaitlist"
              class="mt-3 pt-2 border-t border-gray-700/50"
            >
              <p class="text-white flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-pink-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="font-semibold">Liste d'attente:</span>
                <span class="ml-2">{{ waitlistCount }} joueurs</span>
              </p>

              <p
                v-if="isUserInWaitlist"
                class="text-sm text-pink-300 mt-1 font-orbitron"
              >
                Vous êtes en position
                <span class="font-bold">{{ getUserWaitlistPosition }}</span>
                dans la liste d'attente
              </p>
            </div>
          </div>

          <!-- Colonne 2: Participants et Discord -->
          <div class="space-y-4">
            <p class="text-white flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-purple-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                />
              </svg>
              <span class="font-semibold">Participants:</span>
              <span class="ml-2">{{ getParticipantsCount() }}</span>
            </p>

            <p class="text-white flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-indigo-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="font-semibold">Discord:</span>
              <span class="ml-2">{{ tournament.discordChannelName }}</span>
            </p>
          </div>

          <!-- Colonne 3: Actions (inscription/désinscription/check-in) -->
          <div
            v-if="!tournament.finished && user"
            class="flex flex-col space-y-3"
          >
            <button
              v-if="
                !isUserRegistered && !isUserInWaitlist && !tournament.finished
              "
              @click="
                openRegistrationPopup(
                  tournament,
                  isTournamentFull ? 'waitlist' : 'register'
                )
              "
              :class="{
                'cyberpunk-btn-amber': isTournamentFull,
                'cyberpunk-btn-pink': !isTournamentFull,
              }"
              class="px-6 py-2.5 rounded-md flex items-center justify-center font-orbitron shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <span v-if="isTournamentFull" class="mr-2 font-orbitron"
                >Rejoindre la liste d'attente</span
              >
              <span v-else class="mr-2 font-orbitron">S'inscrire</span>
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
              v-if="isUserInWaitlist && !tournament.finished"
              @click="openRegistrationPopup(tournament, 'unregister-waitlist')"
              class="cyberpunk-btn-gray px-6 py-2.5 rounded-md flex items-center justify-center font-orbitron shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <span class="mr-2">Quitter la liste d'attente</span>
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

            <!-- Groupe de boutons pour check-in + désinscription -->
            <div
              v-else-if="isUserRegistered && isWithin24Hours"
              class="flex flex-col space-y-3"
            >
              <!-- Bouton de check-in -->
              <button
                @click="checkIn(tournament._id ?? '', !isCheckedIn)"
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

              <!-- Bouton de désinscription -->
              <button
                @click="openRegistrationPopup(tournament, 'unregister')"
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

            <!-- Bouton de désinscription standard (cas non-check-in) -->
            <button
              v-else-if="isUserRegistered && !isWithin24Hours"
              @click="openRegistrationPopup(tournament, 'unregister')"
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
      </div>

      <!-- Contenu principal du tournoi en onglets -->
      <div
        class="bg-black/75 backdrop-blur-sm rounded-lg overflow-hidden border border-pink-500 shadow-lg shadow-pink-500/30"
      >
        <!-- Navigation des onglets -->
        <div
          class="tournament-tabs flex justify-start border-b border-gray-700/50 bg-gray-900/50"
        >
          <!-- Onglet Description -->
          <button
            @click="activeTab = 'description'"
            :class="{
              'active-tab': activeTab === 'description',
              'inactive-tab': activeTab !== 'description',
            }"
            class="cyber-tab flex items-center px-6 py-3 font-orbitron transition-all"
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

          <!-- Onglet Participants -->
          <button
            @click="activeTab = 'participants'"
            :class="{
              'active-tab': activeTab === 'participants',
              'inactive-tab': activeTab !== 'participants',
            }"
            class="cyber-tab flex items-center px-6 py-3 font-orbitron transition-all"
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

          <!-- Onglet Résultats (pour les tournois terminés) -->
          <button
            v-if="tournament.finished"
            @click="activeTab = 'results'"
            :class="{
              'active-tab-green': activeTab === 'results',
              'inactive-tab-green': activeTab !== 'results',
            }"
            class="cyber-tab flex items-center px-6 py-3 font-orbitron transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <rect
                x="8"
                y="7"
                width="8"
                height="12"
                rx="1"
                stroke-width="1.5"
              />
              <rect
                x="16"
                y="11"
                width="5"
                height="8"
                rx="1"
                stroke-width="1.5"
              />
              <rect
                x="3"
                y="13"
                width="5"
                height="6"
                rx="1"
                stroke-width="1.5"
              />
            </svg>
            Résultats
          </button>
        </div>

        <!-- Contenu des onglets -->
        <div class="tournament-content p-6 bg-black/80">
          <!-- Onglet Description -->
          <div
            v-if="activeTab === 'description'"
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
              Détails du tournoi
            </h3>
            <div
              class="cyber-panel bg-gray-800/80 p-4 rounded-lg border border-cyan-900/50 shadow-lg shadow-cyan-900/20"
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

          <!-- Onglet Participants -->
          <div
            v-if="activeTab === 'participants'"
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
              Liste des participants
            </h3>

            <!-- Vue des équipes si toutes ont au moins un joueur -->
            <div
              v-if="
                tournament.teams &&
                tournament.teams.length > 0 &&
                !hasEmptyTeams
              "
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

            <!-- Vue des joueurs individuels (quand pas d'équipes ou équipes avec joueurs vides) -->
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
            <p
              v-else
              class="text-gray-400 italic py-4 text-center font-orbitron"
            >
              Aucun participant inscrit pour ce tournoi.
            </p>

            <!-- Section Liste d'attente -->
            <div
              v-if="hasWaitlist"
              class="mt-8 animate__animated animate__fadeIn"
            >
              <h3
                class="text-xl text-pink-400 font-audiowide mb-4 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-2 text-pink-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                    clip-rule="evenodd"
                  />
                </svg>
                Liste d'attente
                <span
                  class="ml-2 text-base bg-pink-900/50 px-2 py-0.5 rounded-full border border-pink-500/30"
                >
                  {{ waitlistCount }} joueurs
                </span>
              </h3>

              <div
                class="bg-gray-800/80 p-4 rounded-lg border border-pink-500/30 shadow-lg shadow-pink-500/10"
              >
                <!-- En-tête du tableau -->
                <div
                  class="grid grid-cols-3 gap-4 mb-3 text-sm font-orbitron text-pink-200 border-b border-pink-500/20 pb-2"
                >
                  <div class="font-semibold">Position</div>
                  <div class="font-semibold">Joueur</div>
                  <div class="font-semibold">En attente depuis</div>
                </div>

                <!-- Liste des joueurs en attente -->
                <ul v-if="waitlistPlayers.length > 0" class="space-y-2">
                  <li
                    v-for="(player, index) in waitlistPlayers"
                    :key="player._id"
                    :class="{
                      'bg-pink-900/20': index === getUserWaitlistPosition - 1,
                    }"
                    class="grid grid-cols-3 gap-4 p-2 rounded-md text-white transition-colors hover:bg-gray-700/50"
                  >
                    <div class="flex items-center">
                      <span
                        class="w-6 h-6 flex items-center justify-center bg-pink-900/50 text-pink-300 rounded-full mr-2 text-xs font-semibold"
                      >
                        {{ index + 1 }}
                      </span>
                    </div>
                    <div class="flex items-center">
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
                      <!-- Correction ici pour afficher le nom du joueur correctement -->
                      {{
                        typeof player === "object"
                          ? player.username
                          : "Joueur inconnu"
                      }}
                      <span
                        v-if="
                          typeof player === 'object' &&
                          player.userId === user?._id
                        "
                        class="ml-2 text-xs font-semibold bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full"
                      >
                        Vous
                      </span>
                    </div>
                    <div class="text-sm text-pink-200">
                      {{
                        player._id
                          ? formatWaitingTime(player._id)
                          : "ID inconnu"
                      }}
                    </div>
                  </li>
                </ul>

                <!-- Message si la liste est vide (cas qui ne devrait pas arriver) -->
                <p v-else class="text-gray-400 italic text-center py-4">
                  Liste d'attente vide
                </p>
              </div>
            </div>
          </div>

          <!-- Onglet Résultats (si tournoi terminé) -->
          <div
            v-if="tournament.finished && activeTab === 'results'"
            class="min-h-[150px] animate__animated animate__fadeIn"
          >
            <tournament-podium
              :tournament="tournament"
              :is-other-rankings-expanded="showOtherRankings"
              @toggle-other-rankings="toggleOtherRankings"
            />
          </div>
        </div>
      </div>

      <!-- Section des derniers gagnants (si disponible) - Style optimisé -->
      <div
        v-if="
          lastFinishedTournament &&
          lastFinishedTournament.teams &&
          !tournament.finished
        "
        class="mt-8 overflow-hidden"
      >
        <!-- En-tête stylisé avec angle coupé -->
        <div class="cyber-header-container relative mb-1">
          <div
            class="cyber-header bg-gradient-to-r from-purple-900/80 via-fuchsia-900/70 to-pink-900/80 text-white py-3 pl-5 pr-8"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <h3
                class="text-lg font-audiowide flex items-center text-purple-200 mb-2 sm:mb-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-purple-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <span class="cyber-glitch-1"
                  >Gagnants du tournoi précédent</span
                >
              </h3>

              <!-- Date du tournoi précédent avec style amélioré -->
              <div
                class="cyber-date-badge flex items-center bg-purple-900/70 px-3 py-1 rounded-sm border-l-2 border-purple-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1 text-purple-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-purple-200 text-sm font-orbitron">
                  {{ formatLocalDate(lastFinishedTournament.date) }}
                </span>
              </div>
            </div>

            <!-- Petit badge/pill avec le nom du tournoi -->
            <div class="mt-2 sm:mt-0">
              <span
                class="inline-block bg-purple-500/20 text-purple-200 text-xs font-orbitron px-2 py-1 rounded-sm border border-purple-500/40"
              >
                {{ lastFinishedTournament.name }}
              </span>
            </div>
          </div>
        </div>

        <!-- Corps avec fond translucide et bordure -->
        <div
          class="cyber-panel-container p-5 bg-black/75 backdrop-blur-sm border border-purple-500/50 rounded-sm shadow-lg shadow-purple-500/20"
        >
          <!-- Gagnants avec style amélioré -->
          <div
            class="winners-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            :class="{
              'justify-items-center':
                getWinningTeams(lastFinishedTournament).length === 1,
            }"
          >
            <!-- Équipes gagnantes (1er rang) -->
            <div
              v-for="team in getWinningTeams(lastFinishedTournament)"
              :key="team._id"
              class="winner-card relative overflow-hidden"
              :class="{
                'sm:col-span-2 lg:col-span-1':
                  getWinningTeams(lastFinishedTournament).length === 1,
              }"
            >
              <!-- Ligne verticale décorative -->
              <div
                class="absolute top-0 left-4 h-full w-1 bg-gradient-to-b from-yellow-500/0 via-yellow-500/70 to-yellow-500/0"
              ></div>

              <!-- En-tête de l'équipe avec effet coupé -->
              <div
                class="cyber-winner-header bg-gradient-to-r from-purple-900/80 to-fuchsia-900/70 px-6 py-3 flex items-center justify-between"
              >
                <div class="flex items-center">
                  <div
                    class="rank-badge w-8 h-8 flex items-center justify-center bg-yellow-500/20 text-yellow-300 rounded-sm border border-yellow-500/60 font-bold mr-3 relative overflow-hidden"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent"
                    ></div>
                    <span class="relative z-10">1</span>
                  </div>
                  <h5
                    class="text-white font-orbitron text-sm cyber-text-shadow"
                  >
                    {{ team.name }}
                  </h5>
                </div>
                <div class="trophy-icon">
                  <!-- Nouveau trophée plus stylisé -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-7 w-7 text-yellow-500 animate-pulse-slow"
                  >
                    <path d="M11.25 1.5V8.25H12.75V1.5H11.25Z" />
                    <path
                      d="M13.5 11.25C13.5 11.6642 13.1642 12 12.75 12H11.25C10.8358 12 10.5 11.6642 10.5 11.25V9.75H7.5V10.3153C7.5 11.3824 8.06058 12.3647 8.99977 12.8478L13.4998 15.125V20.25H14.9998V21.75H8.99977V20.25H10.4998V16.375L7.48314 14.8438C5.94165 14.0578 5 12.4774 5 10.7775V9.75H3C2.58579 9.75 2.25 9.41421 2.25 9V4.5C2.25 4.08579 2.58579 3.75 3 3.75H7.5V3H3C1.75736 3 0.75 4.00736 0.75 5.25V8.25C0.75 9.49264 1.75736 10.5 3 10.5H3.75V10.7775C3.75 13.0108 4.9791 15.0528 6.9829 16.0437L9.74977 17.3738V21.75H6.75C6.33579 21.75 6 22.0858 6 22.5C6 22.9142 6.33579 23.25 6.75 23.25H17.25C17.6642 23.25 18 22.9142 18 22.5C18 22.0858 17.6642 21.75 17.25 21.75H14.25V17.3738L17.0166 16.0437C19.0204 15.0528 20.25 13.0108 20.25 10.7775V10.5H21C22.2426 10.5 23.25 9.49264 23.25 8.25V5.25C23.25 4.00736 22.2426 3 21 3H16.5V3.75H21C21.4142 3.75 21.75 4.08579 21.75 4.5V9C21.75 9.41421 21.4142 9.75 21 9.75H19V10.7775C19 12.4774 18.0584 14.0578 16.5169 14.8438L13.5 16.375V11.25Z"
                    />
                  </svg>
                </div>
              </div>

              <!-- Liste des joueurs avec style amélioré -->
              <div
                class="cyber-winner-body p-4 bg-gray-900/80 border-l border-r border-b border-purple-500/30"
              >
                <div class="players-list space-y-2">
                  <div
                    v-for="(player, playerIndex) in team.players"
                    :key="player._id"
                    class="player-item flex items-center p-2 bg-purple-900/20 hover:bg-purple-900/30 transition-colors duration-300 border-l-2 border-purple-500/40"
                  >
                    <div
                      class="player-number w-5 h-5 flex items-center justify-center text-xs text-purple-300 bg-purple-900/40 rounded-full mr-2 font-mono"
                    >
                      {{ playerIndex + 1 }}
                    </div>
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
                    <span class="text-purple-100 text-sm font-orbitron">{{
                      player.username
                    }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Message si pas d'équipe gagnante avec style amélioré -->
            <div
              v-if="!getWinningTeams(lastFinishedTournament).length"
              class="cyber-no-winner col-span-full py-6 px-4 bg-gray-900/50 border border-purple-500/30"
            >
              <div
                class="flex flex-col items-center justify-center text-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 text-purple-400/50 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p class="text-purple-200 font-orbitron text-sm">
                  Aucun gagnant désigné pour ce tournoi.
                </p>
              </div>
            </div>
          </div>

          <!-- Bouton pour voir le détail avec style amélioré -->
          <div class="mt-5 text-center">
            <router-link
              :to="`/tournois/${lastFinishedTournament._id}`"
              class="cyber-link-button inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-purple-900/70 to-fuchsia-800/70 text-white font-orbitron text-sm border border-purple-500/50 hover:border-purple-400 shadow-md hover:shadow-purple-500/40 transition-all duration-300"
            >
              <span>Voir le détail du tournoi</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-2"
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
        </div>
      </div>

      <!-- Bouton de retour en haut de page (fixe) -->
      <button
        @click="scrollToTop"
        class="cyberpunk-btn-pink fixed bottom-6 right-6 text-white rounded-full p-3 shadow-lg shadow-pink-500/30 z-50 transition-all duration-300 transform hover:scale-110"
        title="Retour en haut de page"
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
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>

    <!-- Notifications -->
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />

    <!-- Modal de confirmation pour inscription/désinscription -->
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
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import playerService from "../services/playerService";
import { useUserStore } from "../stores/userStore";
import Toast from "@/shared/Toast.vue";
import ConfirmationDialog from "@/shared/ConfirmationDialog.vue";
import TournamentPodium from "@/components/tournois-a-venir/TournamentPodium.vue";
import CyberpunkLoader from "@/shared/CyberpunkLoader.vue";
import CyberTerminal from "@/shared/CyberTerminal.vue";
import type { Tournament } from "../types";
import tournamentService from "../services/tournamentService";

//------------------------------------------------------
// 1. ÉTAT ET CONFIGURATION DU COMPOSANT
//------------------------------------------------------

// Récupérer l'ID du tournoi depuis l'URL et initialiser le router
const route = useRoute();
const router = useRouter();
const tournamentId = computed(() => route.params.id as string);

// Initialisation des stores
const userStore = useUserStore();

// États principaux du composant
const tournament = ref<Tournament | null>(null);
const isLoading = ref(false); // Gérer l'état de chargement localement au lieu d'utiliser computed
const error = ref<string | null>(null);
const success = ref<string | null>(null);
const activeTab = ref("participants");
const showOtherRankings = ref(false);
const imageError = ref(false);

// États pour l'inscription et le check-in
const showPopup = ref(false);
const selectedTournament = ref<Tournament | null>(null);
const actionType = ref<string>("register");
const isCheckedIn = ref(false);

// États pour le tournoi précédent
const lastFinishedTournament = ref<Tournament | null>(null);
const loadingLastTournament = ref(false);

// Récupérer l'utilisateur connecté depuis le store
const user = computed(() => userStore.user);
const currentPlayerId = computed(() => userStore.playerId);

//------------------------------------------------------
// 2. PROPRIÉTÉS CALCULÉES
//------------------------------------------------------

/**f
 * Vérifie si l'utilisateur est inscrit au tournoi actuel
 */
const isUserRegistered = computed(() => {
  if (!user.value || !tournament.value) return false;
  return tournament.value.players.some(
    (player) => player.userId === user.value?._id
  );
});

/**
 * Vérifie si on est dans les 24h avant le tournoi (période de check-in)
 */
const isWithin24Hours = computed(() => {
  if (!tournament.value) return false;
  const tournamentDate = new Date(tournament.value.date);
  const now = new Date();
  const diff = tournamentDate.getTime() - now.getTime();
  return diff > 0 && diff <= 24 * 60 * 60 * 1000;
});

/**
 * Gère le cas où l'image ne peut pas être chargée
 */
const handleImageError = () => {
  imageError.value = true;
};

/**
 * Vérifie s'il existe des équipes vides dans le tournoi
 */
const hasEmptyTeams = computed(() => {
  if (!tournament.value?.teams || tournament.value.teams.length === 0) {
    return true;
  }
  return tournament.value.teams.some(
    (team) => !team.players || team.players.length === 0
  );
});

/**
 * Liste des joueurs en attente triée par date d'inscription
 */
const waitlistPlayers = computed(() => {
  if (!tournament.value || !tournament.value.waitlistPlayers) return [];

  // Créer une copie de la liste d'attente avec des dates
  const playersWithDates = tournament.value.waitlistPlayers.map((player) => {
    const playerId = typeof player === "object" ? player._id : player;
    // Récupérer la date d'inscription depuis waitlistRegistrationDates s'il elle existe
    let registrationDate;

    if (tournament.value?.waitlistRegistrationDates && playerId) {
      registrationDate = tournament.value.waitlistRegistrationDates[playerId];
    }

    // Utiliser une date par défaut si aucune date d'inscription n'est trouvée
    if (!registrationDate) {
      registrationDate = new Date();
    }

    return {
      ...player,
      registrationDate,
    };
  });

  // Trier par date d'inscription (plus anciens en premier)
  return playersWithDates.sort((a, b) => {
    return (
      new Date(a.registrationDate).getTime() -
      new Date(b.registrationDate).getTime()
    );
  });
});

//------------------------------------------------------
// 3. RÉCUPÉRATION DES DONNÉES
//------------------------------------------------------

/**
 * Récupère les données du tournoi depuis l'API via le store
 */
const fetchTournament = async () => {
  try {
    // Utiliser le store pour récupérer les détails du tournoi avec mise en cache
    const data = await tournamentService.getTournamentById(tournamentId.value);

    if (!data) {
      error.value = "Impossible de charger les données du tournoi";
      return;
    }

    tournament.value = data;

    // Définir l'onglet actif en fonction de l'état du tournoi
    if (data.finished) {
      activeTab.value = "results"; // Définir sur "results" si le tournoi est terminé
    } else {
      activeTab.value = "participants"; // Sinon, rester sur "description"
    }

    // Vérifier l'état de check-in du joueur si l'utilisateur est connecté
    if (user.value) {
      await checkPlayerCheckIn();
    }

    // Récupérer le dernier tournoi terminé pour ce jeu
    if (data.game && data.game._id) {
      await fetchLastFinishedTournament();
    }
  } catch (err) {
    console.error("Erreur lors de la récupération du tournoi:", err);
    error.value = "Impossible de charger les données du tournoi";
  }
};

/**
 * Récupère le dernier tournoi terminé pour le même jeu via le store
 */
const fetchLastFinishedTournament = async () => {
  if (!tournament.value?.game?._id) return;

  loadingLastTournament.value = true;

  try {
    // Utiliser le store pour récupérer les tournois par jeu
    const tournaments = await tournamentService.getTournamentsByGame(
      tournament.value.game._id
    );

    // Filtrer uniquement les tournois terminés et différents du tournoi actuel
    const finishedTournaments = tournaments.filter(
      (t) => t.finished && t._id !== tournament.value?._id
    );

    if (finishedTournaments.length === 0) {
      return;
    }

    // Trier par date de création décroissante pour trouver le plus récent
    const sortedTournaments = finishedTournaments.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Prendre le premier (le plus récent)
    lastFinishedTournament.value = sortedTournaments[0];
  } catch (err) {
    console.error("Erreur lors de la récupération du dernier tournoi:", err);
  } finally {
    loadingLastTournament.value = false;
  }
};

/**
 * Vérifie l'état de check-in du joueur connecté
 */
const checkPlayerCheckIn = async () => {
  if (!user.value || !tournament.value) return;

  try {
    const player = await playerService.getPlayerByIdUser(user.value._id);
    if (player && player._id && tournament.value.checkIns) {
      isCheckedIn.value = !!tournament.value.checkIns[player._id];
    }
  } catch (err) {
    console.error("Erreur lors de la vérification du check-in:", err);
  }
};

//------------------------------------------------------
// 4. GESTION DES ACTIONS UTILISATEUR
//------------------------------------------------------

/**
 * Navigue vers la liste des tournois
 */
const goBackToTournaments = () => {
  router.push("/tournois-a-venir");
};

/**
 * Ouvre la popup d'inscription/désinscription
 */
const openRegistrationPopup = (tournament: Tournament, type: string) => {
  selectedTournament.value = tournament;
  actionType.value = type;
  showPopup.value = true;
};

/**
 * Ferme la popup
 */
const closePopup = () => {
  showPopup.value = false;
  setTimeout(() => {
    selectedTournament.value = null;
    actionType.value = "register";
  }, 300);
};

/**
 * Confirme l'action d'inscription/désinscription en utilisant le store
 */
const confirmAction = async () => {
  if (!selectedTournament.value || !user.value) return;

  try {
    let success = false;

    if (
      (actionType.value === "register" || actionType.value === "waitlist") &&
      selectedTournament.value._id
    ) {
      // Appel direct au service au lieu du store
      await tournamentService.registerPlayer(
        selectedTournament.value._id,
        user.value._id
      );
      success = true;

      if (success) {
        showMessage(
          "success",
          actionType.value === "register"
            ? "Inscription réussie ! N'oublie pas de venir te check-in 24h avant le tournoi."
            : "Vous avez été ajouté à la liste d'attente. Vous serez automatiquement inscrit si des places se libèrent."
        );
      }
    } else if (
      (actionType.value === "unregister" ||
        actionType.value === "unregister-waitlist") &&
      selectedTournament.value._id
    ) {
      // Appel direct au service au lieu du store
      await tournamentService.unregisterPlayer(
        selectedTournament.value._id,
        user.value._id
      );
      success = true;

      if (success) {
        showMessage(
          "success",
          actionType.value === "unregister"
            ? "Désinscription réussie ! Triste de te voir partir :("
            : "Vous avez été retiré de la liste d'attente."
        );
      }
    }

    // Mettre à jour l'état local en rechargeant les données
    if (success && selectedTournament.value._id) {
      await fetchTournament(); // Recharger le tournoi pour avoir les données à jour
    }

    closePopup();
  } catch (err) {
    console.error("Erreur lors de l'action:", err);
    showMessage("error", `Erreur lors de l'action.`);
  }
};

/**
 * Gère le check-in d'un joueur via le store
 */
const checkIn = async (tournamentId: string, checkedIn: boolean) => {
  if (!user.value) return;

  // Mise à jour optimiste de l'UI
  isCheckedIn.value = checkedIn;

  try {
    // Appel direct au service au lieu du store
    await tournamentService.checkInPlayer(
      tournamentId,
      user.value._id,
      checkedIn
    );

    showMessage(
      "success",
      checkedIn ? "Check-in confirmé !" : "Check-in annulé."
    );

    // Mettre à jour les données locales après un check-in réussi
    await fetchTournament(); // Recharger le tournoi
  } catch (err) {
    // En cas d'erreur, remettre l'état précédent
    isCheckedIn.value = !checkedIn;
    console.error("Erreur lors du check-in:", err);
    showMessage(
      "error",
      `Erreur: Impossible de ${
        checkedIn ? "confirmer" : "annuler"
      } le check-in.`
    );
  }
};

/**
 * Gère la bascule des autres classements
 */
const toggleOtherRankings = () => {
  showOtherRankings.value = !showOtherRankings.value;
};

/**
 * Scroll vers le haut de la page
 */
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/**
 * Vérifie si le tournoi a une liste d'attente avec des joueurs
 */
const hasWaitlist = computed(() => {
  if (!tournament.value || !tournament.value.waitlistPlayers) return false;
  return tournament.value.waitlistPlayers.length > 0;
});

/**
 * Nombre de joueurs en liste d'attente
 */
const waitlistCount = computed(() => {
  if (!tournament.value || !tournament.value.waitlistPlayers) return 0;
  return tournament.value.waitlistPlayers.length;
});

/**
 * Vérifie si l'utilisateur connecté est en liste d'attente
 */
const isUserInWaitlist = computed(() => {
  if (
    !currentPlayerId.value ||
    !tournament.value ||
    !tournament.value.waitlistPlayers
  )
    return false;

  return tournament.value.waitlistPlayers.some((waitlistId) => {
    // Vérifier le type du waitlistId pour traiter correctement la comparaison
    if (typeof waitlistId === "object") {
      // Si waitlistId est un objet (Player)
      return waitlistId._id === currentPlayerId.value;
    } else {
      // Si waitlistId est une chaîne (ID simple)
      return waitlistId === currentPlayerId.value;
    }
  });
});

/**
 * Détermine la position de l'utilisateur dans la liste d'attente
 */
const getUserWaitlistPosition = computed(() => {
  if (
    !user.value ||
    !tournament.value ||
    !tournament.value.waitlistPlayers ||
    !isUserInWaitlist.value
  ) {
    return 0;
  }

  // Si waitlistRegistrationDates est disponible, trier par date d'inscription
  if (tournament.value.waitlistRegistrationDates) {
    const waitlistWithDates = tournament.value.waitlistPlayers.map((player) => {
      const playerId = typeof player === "object" ? player._id : player;
      const registrationDate = playerId
        ? tournament.value?.waitlistRegistrationDates?.[playerId]
        : new Date();
      return { player, registrationDate };
    });

    // Trier par date d'inscription (plus anciens en premier)
    waitlistWithDates.sort((a, b) => {
      return (
        new Date(a.registrationDate ?? new Date()).getTime() -
        new Date(b.registrationDate ?? new Date()).getTime()
      );
    });

    // Trouver la position de l'utilisateur
    for (let i = 0; i < waitlistWithDates.length; i++) {
      const playerId =
        typeof waitlistWithDates[i].player === "object"
          ? waitlistWithDates[i].player.userId
          : waitlistWithDates[i].player;

      if (playerId === user.value._id) {
        return i + 1; // Position (1-indexed)
      }
    }
  }

  // Si pas de dates disponibles, juste retourner la position brute
  const index = tournament.value.waitlistPlayers.findIndex((player) => {
    if (typeof player === "object" && player.userId) {
      return user.value && player.userId === user.value._id;
    }
    return typeof player === "object" && player.userId === user.value?._id;
  });

  return index + 1; // 1-indexed
});

/**
 * Vérifie si le tournoi est plein (cap atteint)
 */
const isTournamentFull = computed(() => {
  if (!tournament.value) return false;
  return (
    tournament.value.playerCap > 0 &&
    tournament.value.players.length >= tournament.value.playerCap
  );
});

//------------------------------------------------------
// 5. UTILITAIRES ET FORMATAGE
//------------------------------------------------------

/**
 * Affiche un message de notification
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
 * Formate le temps d'attente d'un joueur dans la liste d'attente
 */
const formatWaitingTime = (playerId: string) => {
  if (
    !tournament.value ||
    !tournament.value.waitlistRegistrationDates ||
    !playerId
  ) {
    return "Date inconnue";
  }

  // Problème : Accès direct à la HashMap
  // Nous devons vérifier la structure des données

  let waitDate = null;

  // Vérifier si waitlistRegistrationDates est un objet simple (JSON)
  if (
    typeof tournament.value.waitlistRegistrationDates === "object" &&
    !Array.isArray(tournament.value.waitlistRegistrationDates)
  ) {
    // C'est un objet, on peut accéder à la propriété directement
    waitDate = tournament.value.waitlistRegistrationDates[playerId];
  }
  // Ou si c'est une instance de Map (moins probable côté frontend)
  else if (tournament.value.waitlistRegistrationDates instanceof Map) {
    waitDate = tournament.value.waitlistRegistrationDates.get(playerId);
  }

  if (!waitDate) return "Date inconnue";

  const waitTimeMs = Date.now() - new Date(waitDate).getTime();

  // Conversion en jours/heures/minutes
  const days = Math.floor(waitTimeMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (waitTimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((waitTimeMs % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days} jour${days > 1 ? "s" : ""} et ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h et ${minutes}min`;
  } else {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }
};

/**
 * Formate la date locale
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
 * Compte le nombre de participants
 */
const getParticipantsCount = () => {
  if (!tournament.value?.players) return 0;
  return tournament.value.players.length;
};

/**
 * Formate la description avec des sauts de ligne
 */
const formatDescription = (description: string) => {
  if (!description) return "";
  return description.replace(/\.(\s|$)/g, ".<br>$1").replace(/<br>$/, "");
};

/**
 * Récupère les équipes gagnantes (rang 1) d'un tournoi
 */
const getWinningTeams = (tournament: Tournament) => {
  if (!tournament.teams) return [];

  // Récupérer toutes les équipes avec le rang 1
  return tournament.teams.filter((team) => team.ranking === 1);
};

//------------------------------------------------------
// 6. CYCLE DE VIE DU COMPOSANT ET OBSERVATEURS
//------------------------------------------------------

// Observer les changements d'ID dans l'URL pour recharger les données
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      fetchTournament(); // Recharge les données du tournoi quand l'ID change
    }
  }
);

// Récupérer les données au chargement du composant
onMounted(() => {
  fetchTournament();
});
</script>

<style scoped>
/* Copiez les styles pertinents depuis TournamentCard.vue */
.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

.neon-text {
  text-shadow: 0 0 5px rgba(236, 72, 153, 0.7), 0 0 10px rgba(236, 72, 153, 0.5);
}

/* Styles pour les onglets */
.tournament-tabs {
  position: relative;
  overflow: hidden;
}

.tournament-tabs::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(236, 72, 153, 0.5),
    transparent
  );
}

.cyber-tab {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.cyber-tab::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  transform: translateX(-50%);
  transition: width 0.3s ease;
  z-index: 1;
}

.active-tab {
  color: #ec4899; /* Pink-500 */
  background-color: rgba(236, 72, 153, 0.1);
  border-bottom: 2px solid #ec4899;
}

.inactive-tab {
  color: #9ca3af; /* Gray-400 */
  border-bottom: 2px solid transparent;
}

.inactive-tab:hover {
  color: #d1d5db; /* Gray-300 */
  background-color: rgba(156, 163, 175, 0.1);
}

.active-tab-green {
  color: #4ade80; /* Green-400 */
  background-color: rgba(74, 222, 128, 0.1);
  border-bottom: 2px solid #4ade80;
}

.inactive-tab-green {
  color: #9ca3af; /* Gray-400 */
  border-bottom: 2px solid transparent;
}

.inactive-tab-green:hover {
  color: #4ade80; /* Green-400 */
  background-color: rgba(74, 222, 128, 0.1);
}

/* Animation pour déplacer une lueur en arrière-plan des onglets actifs */
@keyframes tab-glow {
  0%,
  100% {
    background-position: -100% 0;
  }
  50% {
    background-position: 200% 0;
  }
}

.active-tab,
.active-tab-green {
  position: relative;
}

.active-tab::before,
.active-tab-green::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(236, 72, 153, 0.2),
    transparent
  );
  background-size: 200% 100%;
  z-index: -1;
  animation: tab-glow 3s linear infinite;
}

.active-tab-green::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(74, 222, 128, 0.2),
    transparent
  );
  background-size: 200% 100%;
}

/* Animation pour les transitions */
.animate__fadeIn {
  animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

/* Styles pour le contenu de la description */
.description-text {
  font-family: "Roboto", "Arial", sans-serif;
  line-height: 1.6;
  letter-spacing: 0.3px;
  font-size: 0.95rem;
  font-weight: 300;
  text-shadow: 0 0 2px rgba(255, 255, 255, 0.1);
  position: relative;
}

.cyber-panel {
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% 100%,
    10px 100%,
    0 calc(100% - 10px)
  );
  background-color: rgba(15, 23, 42, 0.8);
  position: relative;
  overflow: hidden;
}

.cyber-game-icon {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: pulse 3s infinite ease-in-out;
}

.cyber-game-icon::before {
  content: "";
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: radial-gradient(
    circle,
    rgba(236, 72, 153, 0.2) 0%,
    transparent 70%
  );
  border-radius: 50%;
  z-index: -1;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}
/* Styles pour la section des gagnants du dernier tournoi */
.cyber-header-container {
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 15px),
    calc(100% - 15px) 100%,
    0 100%
  );
  border-left: 2px solid rgba(168, 85, 247, 0.5);
  border-top: 2px solid rgba(168, 85, 247, 0.5);
  position: relative;
}

.cyber-header {
  position: relative;
  overflow: hidden;
}

@keyframes cyber-header-shine {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

.cyber-panel-container {
  clip-path: polygon(15px 0, 100% 0, 100% 100%, 0 100%, 0 15px);
  position: relative;
}

.cyber-panel-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(168, 85, 247, 0.7),
    transparent
  );
}

.cyber-panel-container::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(168, 85, 247, 0.7),
    transparent
  );
}

.winner-card {
  background: rgba(17, 24, 39, 0.8);
  border: 1px solid rgba(168, 85, 247, 0.3);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.winner-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.2);
  border-color: rgba(168, 85, 247, 0.5);
}

.cyber-winner-body {
  position: relative;
  min-height: 120px;
}

.cyber-text-shadow {
  text-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
}

.cyber-glitch-1 {
  position: relative;
  animation: cyber-glitch 5s infinite;
}

@keyframes cyber-glitch {
  0%,
  90%,
  100% {
    transform: translate(0, 0);
    text-shadow: 0 0 4px rgba(168, 85, 247, 0.7);
  }
  92% {
    transform: translate(-2px, 1px);
    text-shadow: -1px 0 #a855f7, 1px 0 #ec4899;
  }
  94% {
    transform: translate(2px, -1px);
    text-shadow: 1px 0 #a855f7, -1px 0 #ec4899;
  }
  96% {
    transform: translate(-1px, -1px);
    text-shadow: 0 -1px #a855f7, 0 1px #ec4899;
  }
  98% {
    transform: translate(1px, 1px);
    text-shadow: 0 0 8px rgba(236, 72, 153, 0.7);
  }
}

.cyber-link-button {
  position: relative;
  overflow: hidden;
  clip-path: polygon(
    10px 0,
    100% 0,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    0 100%,
    0 10px
  );
}

.cyber-link-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(168, 85, 247, 0.2) 50%,
    transparent 100%
  );
  transition: all 0.5s ease;
}

.cyber-link-button:hover::before {
  left: 100%;
}

.animate-pulse-slow {
  animation: pulse-slow 3s infinite;
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

.cyber-date-badge {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 10px 100%, 0 calc(100% - 10px));
  position: relative;
}

.rank-badge {
  position: relative;
  overflow: hidden;
}

.rank-badge::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(251, 191, 36, 0.3) 50%,
    transparent 100%
  );
  transform: rotate(45deg);
  animation: badge-shine 2s linear infinite;
}

@keyframes badge-shine {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

.player-item {
  position: relative;
  transition: all 0.3s ease;
}

.player-item:hover {
  transform: translateX(3px);
}

.player-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 10%;
  width: 80%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(168, 85, 247, 0.3),
    transparent
  );
}

.player-item:last-child::after {
  display: none;
}
.winners-grid.justify-items-center {
  display: grid;
  grid-template-columns: 1fr;
}

.winners-grid.justify-items-center .winner-card {
  max-width: 450px;
  width: 100%;
}

@media (min-width: 640px) {
  .winners-grid.justify-items-center {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .winners-grid.justify-items-center .winner-card {
    grid-column: 1 / span 2;
  }
}

@media (min-width: 1024px) {
  .winners-grid.justify-items-center {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .winners-grid.justify-items-center .winner-card {
    grid-column: 2 / span 1;
  }
}

/* Styles améliorés pour le trophée */
.trophy-icon {
  position: relative;
}

.cyber-winner-header {
  position: relative;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 10px 100%, 0 calc(100% - 10px));
}

.cyber-winner-header::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background: rgba(236, 72, 153, 0.3);
  clip-path: polygon(0 0, 100% 0, 100% 100%);
}
</style>
