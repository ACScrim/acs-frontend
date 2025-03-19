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
        class="tournament-card mb-8 relative overflow-hidden transition-all duration-300 hover:scale-101"
        :class="{
          'tournament-finished': tournament.finished,
          'tournament-upcoming': !tournament.finished,
        }"
      >
        <!-- Header du tournoi -->
        <div
          class="tournament-header flex flex-col md:flex-row justify-between items-start md:items-center p-4 md:p-6"
        >
          <div>
            <h2 class="text-2xl md:text-3xl text-white font-audiowide mb-2">
              {{ tournament.name }}
            </h2>
            <div class="tournament-meta flex flex-wrap gap-4 mb-2">
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
              class="neon-button-pink px-4 py-2 rounded flex items-center"
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
                'neon-button-yellow':
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
              'tab-active': tournament._id && showParticipants[tournament._id],
              'tab-inactive':
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
              'tab-active': tournament._id && showDescription[tournament._id],
              'tab-inactive':
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
            v-if="tournament._id && showParticipants[tournament._id]"
            class="tab-content animate__animated animate__fadeIn"
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
          </div>

          <!-- Onglet description -->
          <div
            v-if="tournament._id && showDescription[tournament._id]"
            class="tab-content animate__animated animate__fadeIn"
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
            class="mt-6 bg-gradient-to-r from-green-900/30 to-blue-900/30 p-4 rounded-lg border border-green-600"
          >
            <h3
              class="text-xl text-white font-audiowide mb-4 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              Résultats
            </h3>
            <div class="bg-black bg-opacity-50 p-4 rounded">
              <p
                class="font-orbitron mb-2 text-lg text-yellow-300 flex items-center"
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
                {{ tournament.winningTeam?.name || "Équipe gagnante" }}
              </p>
              <ul class="space-y-1 mt-2">
                <li
                  v-for="player in tournament.winningTeam?.players"
                  class="text-white flex items-center"
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
                  {{ player.username }}
                </li>
              </ul>
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

//-------------------------------------------------------
// SECTION: État du composant
//-------------------------------------------------------

// Données des jeux et tournois
const games = ref<Game[]>([]);
const tournaments = ref<Tournament[]>([]);

// Options de filtrage et d'affichage
const selectedGame = ref<string>("");
const showFinished = ref<boolean>(false);
const sortAscending = ref<boolean>(false);

// États pour l'interface des tournois
const showParticipants = ref<{ [key: string]: boolean }>({});
const showDescription = ref<{ [key: string]: boolean }>({});

// États pour le modal de confirmation
const showPopup = ref<boolean>(false);
const selectedTournament = ref<Tournament | null>(null);
const actionType = ref<string>("register");

// États pour le système de check-in
const checkedInPlayers = ref<{ [key: string]: boolean }>({});

// État du système de notifications
const success = ref<string | null>(null);
const error = ref<string | null>(null);

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
 * - Trie par date
 */
const filteredTournaments = computed(() => {
  // Filtrage des tournois selon les critères
  const filtered = tournaments.value.filter((tournament) => {
    const matchesGame = selectedGame.value
      ? tournament.game._id === selectedGame.value
      : true;
    const matchesFinished = showFinished.value ? true : !tournament.finished;
    return matchesGame && matchesFinished;
  });

  // Tri chronologique configurable
  return filtered.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortAscending.value
      ? dateA - dateB // Ordre croissant (ancien → récent)
      : dateB - dateA; // Ordre décroissant (récent → ancien)
  });
});

//-------------------------------------------------------
// SECTION: Récupération des données
//-------------------------------------------------------

/**
 * Récupère la liste des jeux depuis l'API
 */
const fetchGames = async () => {
  games.value = await gameService.getGames();
};

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
      console.log("tournaments.value", tournaments.value);
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
 * Change l'état de check-in d'un joueur pour un tournoi
 * @param tournamentId - ID du tournoi
 * @param checkedIn - Nouvel état de check-in
 */
const checkIn = async (tournamentId: string, checkedIn: boolean) => {
  checkedInPlayers.value[tournamentId] = checkedIn;

  try {
    if (user.value) {
      await tournamentService.checkInPlayer(
        tournamentId,
        user.value._id,
        checkedIn
      );
    }
    showMessage("success", "Check-in réussi !");
    fetchTournaments(); // Recharge les tournois pour mettre à jour l'état
  } catch (error) {
    console.error("Erreur lors du check-in:", error);
    showMessage("error", "Erreur lors du check-in.");
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
 */
const showMessage = (type: "success" | "error", message: string) => {
  if (type === "success") {
    success.value = message;
    error.value = null;
  } else {
    error.value = message;
    success.value = null;
  }
  // Auto-effacement après 3 secondes
  setTimeout(() => {
    success.value = null;
    error.value = null;
  }, 3000);
};

//-------------------------------------------------------
// SECTION: Cycle de vie du composant
//-------------------------------------------------------

/**
 * Initialisation du composant au montage
 */
onMounted(() => {
  fetchGames();
  fetchTournaments();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.neon-text {
  font-family: "Audiowide", cursive;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff,
    0 0 40px #ff00ff;
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

.tournament-header {
  background: rgba(17, 24, 39, 0.8);
  border-bottom: 1px solid rgba(55, 65, 81, 0.6);
}

.tournament-meta {
  font-family: "Orbitron", sans-serif;
}

.tab-button {
  color: #fff;
  font-family: "Orbitron", sans-serif;
  transition: all 0.3s ease;
}

.tab-active {
  color: #ec4899;
  border-bottom: 2px solid #ec4899;
  background: rgba(236, 72, 153, 0.1);
}

.tab-inactive {
  color: #9ca3af;
  border-bottom: 2px solid transparent;
}

.tab-inactive:hover {
  color: #d1d5db;
  background: rgba(156, 163, 175, 0.1);
}

.tab-content {
  min-height: 150px;
}

.neon-button-pink {
  background: linear-gradient(to right, #4a0072, #9900ff);
  color: white;
  border: 1px solid #ec4899;
  box-shadow: 0 0 5px #ec4899, inset 0 0 5px #ec4899;
  transition: all 0.3s ease;
}

.neon-button-pink:hover {
  background: linear-gradient(to right, #9900ff, #ff00ff);
  box-shadow: 0 0 10px #ec4899, inset 0 0 10px #ec4899;
}

.neon-button-yellow {
  background: linear-gradient(to right, #725200, #ffbb00);
  color: white;
  border: 1px solid #fbbf24;
  box-shadow: 0 0 5px #fbbf24, inset 0 0 5px #fbbf24;
  transition: all 0.3s ease;
}

.neon-button-yellow:hover {
  background: linear-gradient(to right, #ffbb00, #ffdd00);
  box-shadow: 0 0 10px #fbbf24, inset 0 0 10px #fbbf24;
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
</style>
