<template>
  <div
    class="relative flex items-center justify-center min-h-screen p-4 overflow-hidden"
  >
    <div
      class="w-full max-w-6xl z-10 px-4"
      :class="
        user ? 'grid grid-cols-1 lg:grid-cols-2 gap-8' : 'flex justify-center'
      "
    >
      <!-- Colonne de gauche - Contenu existant -->
      <div
        class="flex flex-col items-center justify-center"
        :class="!user ? 'max-w-md' : ''"
      >
        <!-- Remplacer la section du titre avec effet de glitch -->
        <div class="title-container">
          <h1 class="cyber-main-title">
            <span class="neon-text-title"
              >Alors, <br />
              ça scrim ?</span
            >
          </h1>
          <div class="cyber-line-h pink"></div>
        </div>

        <!-- Logo -->
        <div class="relative my-8 flex items-center justify-center">
          <img
            src="../assets/logo.svg"
            class="h-48 w-auto transition-all duration-500 filter hover:scale-105 hover:rotate-2 animate-float logo-shadow"
            alt="Logo"
          />
        </div>

        <!-- Bouton de connexion Discord -->
        <button
          v-if="!user"
          @click="loginWithDiscord"
          class="flex items-center justify-center mt-8 px-8 py-3 bg-gradient-to-r from-pink-700 to-pink-600 text-white border-2 border-pink-700 rounded shadow-glow-discord font-orbitron text-base font-semibold tracking-wider uppercase transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-discord-hover relative overflow-hidden group"
        >
          <img
            src="../assets/discord-Logo.png"
            alt="Discord Logo"
            class="h-6 w-10 mr-2"
          />
          Connexion via Discord
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shine"
          ></div>
        </button>

        <!-- Badge de bienvenue -->
        <div
          v-else
          class="flex items-center mt-8 px-8 py-3 bg-gradient-to-r from-cyan-700 to-cyan-600 text-white border-2 border-cyan-600 rounded shadow-glow-welcome font-orbitron text-base font-semibold tracking-wider animate-pulse-subtle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="capitalize">Bienvenue, {{ user.username }}!</p>
        </div>
      </div>

      <!-- Colonne de droite -->
      <div v-if="user" class="flex flex-col space-y-6">
        <!-- Prochain tournoi -->
        <div
          class="cyberpunk-card p-6 bg-black/80 backdrop-blur-sm rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1.5"
        >
          <div class="cyber-corners"></div>

          <h2
            class="text-2xl font-audiowide text-white mb-4 flex items-center relative"
          >
            <span class="neon-text-cyan mr-2">PROCHAIN TOURNOI</span>
            <span
              class="cyber-badge"
              :class="{ live: isTournamentLive, soon: !isTournamentLive }"
            >
              {{ isTournamentLive ? "LIVE" : "BIENTÔT" }}
            </span>
          </h2>

          <div v-if="isLoading">
            <CyberpunkLoader />
          </div>

          <div v-else-if="nextTournament" class="relative">
            <div class="cyber-line-h"></div>
            <div class="mb-4">
              <h3 class="text-xl font-orbitron text-pink-300 mb-1 truncate">
                {{ nextTournament.name }}
              </h3>
              <div class="text-sm text-cyan-300 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{{ formatDate(nextTournament.date) }}</span>
              </div>

              <div class="flex items-center text-sm text-cyan-300 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
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
                <span>{{ formatTime(nextTournament.date) }}</span>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <div class="text-white font-orbitron">
                <div class="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-2 text-pink-500"
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
                  <span class="text-sm">
                    {{
                      nextTournament.players ? nextTournament.players.length : 0
                    }}
                    joueurs inscrits</span
                  >
                </div>
                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-2 text-pink-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>
                  <span class="text-sm">{{
                    nextTournament.game
                      ? nextTournament.game.name
                      : "Jeu non spécifié"
                  }}</span>
                </div>
              </div>

              <router-link
                :to="{ name: 'TournoisAVenir' }"
                class="px-4 py-1 bg-pink-600 hover:bg-pink-700 text-white rounded-md font-orbitron text-sm transition-all duration-300 hover:shadow-glow-pink flex items-center"
              >
                <span>Voir</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </router-link>
            </div>

            <!-- Timer animé -->
            <div class="mt-4 border-t border-pink-500/30 pt-3">
              <div class="text-xs text-white mb-1 font-orbitron">
                Commence dans:
              </div>
              <div class="countdown-timer flex justify-between text-center">
                <div
                  v-for="(unit, i) in countdownUnits"
                  :key="i"
                  class="flex flex-col"
                >
                  <span class="text-lg font-bold text-cyan-400">{{
                    unit.value
                  }}</span>
                  <span class="text-xs text-gray-400">{{ unit.label }}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-6">
            <div class="text-pink-400 text-lg font-orbitron">
              Aucun tournoi à venir
            </div>
            <p class="text-gray-400 text-sm mt-2">
              Consultez la page des tournois pour plus d'informations
            </p>
          </div>

          <div class="cyber-scanline"></div>
        </div>

        <!-- Dernier tournoi terminé -->
        <div
          class="cyberpunk-card relative overflow-hidden p-6 border border-cyan-500 bg-black/80 backdrop-blur-sm rounded-lg shadow-lg shadow-cyan-500/30 transform transition-all hover:translate-y-[-5px] hover:shadow-xl hover:shadow-cyan-500/40"
        >
          <div class="cyber-corners cyan"></div>

          <h2 class="text-2xl font-audiowide text-white mb-4 flex items-center">
            <span class="neon-text-pink mr-2">DERNIER TOURNOI</span>
            <span class="cyber-badge cyan">TERMINÉ</span>
          </h2>

          <div v-if="isLoading">
            <CyberpunkLoader />
          </div>

          <div v-else-if="lastFinishedTournament" class="relative">
            <div class="cyber-line-h cyan"></div>
            <h3 class="text-xl font-orbitron text-cyan-300 mb-2 truncate">
              {{ lastFinishedTournament.name }}
            </h3>

            <!-- Podium -->
            <div class="mb-4">
              <div class="text-sm text-white mb-2 font-orbitron">Podium:</div>
              <div class="space-y-2">
                <div
                  v-for="(team, index) in podiumTeams"
                  :key="team._id"
                  class="p-2 rounded bg-gradient-to-r from-yellow-900/30 to-yellow-700/30 border border-yellow-500/50"
                >
                  <div class="flex items-center">
                    <div
                      class="h-8 w-8 rounded-full flex items-center justify-center mr-3 bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-glow-gold"
                    >
                      <span class="text-black font-bold">{{ index + 1 }}</span>
                    </div>
                    <div class="flex-1 truncate font-orbitron text-yellow-400">
                      {{ team.name }}
                    </div>
                  </div>

                  <!-- Liste des joueurs de l'équipe -->
                  <div
                    v-if="team.players && team.players.length > 0"
                    class="mt-2 pl-11"
                  >
                    <div class="text-xs text-gray-400 mb-1">Membres:</div>
                    <div class="flex flex-wrap gap-1">
                      <span
                        v-for="player in team.players"
                        :key="player._id"
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-900/40 text-yellow-300 border border-yellow-500/50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3 w-3 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        {{ player.username || "Joueur" }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-end">
              <router-link
                :to="{ name: 'TournoisAVenir' }"
                class="px-4 py-1 bg-pink-600 hover:bg-pink-700 text-white rounded-md font-orbitron text-sm transition-all duration-300 hover:shadow-glow-pink flex items-center"
              >
                <span>Détails</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </router-link>
            </div>

            <div class="mt-4 border-t border-cyan-500/30 pt-3">
              <div class="text-xs text-white mb-1 font-orbitron">
                Terminé le:
              </div>
              <div class="text-cyan-300 text-sm flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{{ formatDate(lastFinishedTournament.date) }}</span>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-6">
            <div class="text-cyan-400 text-lg font-orbitron">
              Aucun tournoi terminé
            </div>
            <p class="text-gray-400 text-sm mt-2">
              Les résultats des tournois seront affichés ici
            </p>
          </div>

          <div class="cyber-scanline cyan"></div>
        </div>
      </div>
    </div>

    <!-- Fond animé -->
    <div class="cyber-grid"></div>
    <div class="cyber-stars"></div>
    <div class="cyber-noise"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import tournamentService from "../services/tournamentService";
import CyberpunkLoader from "@/shared/CyberpunkLoader.vue";
import type { User } from "../types/User";
import type { Tournament } from "../types";

//-------------------------------------------------------
// SECTION: État du composant
//-------------------------------------------------------

/**
 * Accès au store utilisateur et à la session active
 */
const userStore = useUserStore();
const user = computed<User | null>(() => userStore.user);

/**
 * États d'interface et données
 */
const isLoading = ref(true); // Indicateur de chargement
const isAuthenticating = ref(false); // Indicateur de processus d'authentification
const error = ref<string | null>(null); // Message d'erreur
const tournaments = ref<Tournament[]>([]); // Liste des tournois
const nextTournament = ref<Tournament | null>(null); // Prochain tournoi
const lastFinishedTournament = ref<Tournament | null>(null); // Dernier tournoi terminé
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

/**
 * Unités de décompte pour le prochain tournoi
 */
const countdownUnits = computed(() => [
  { value: countdown.value.days, label: "jours" },
  { value: countdown.value.hours, label: "heures" },
  { value: countdown.value.minutes, label: "min" },
  { value: countdown.value.seconds, label: "sec" },
]);

/**
 * Détermine si le prochain tournoi est en cours (LIVE)
 */
const isTournamentLive = computed(() => {
  if (!nextTournament.value || !nextTournament.value.date) {
    return false;
  }

  const now = new Date();
  const tournamentDate = new Date(nextTournament.value.date);

  // Le tournoi est LIVE s'il a commencé mais n'est pas marqué comme terminé
  return tournamentDate <= now && !nextTournament.value.finished;
});

/**
 * Équipes sur le podium du dernier tournoi
 */
const podiumTeams = computed(() => {
  if (!lastFinishedTournament.value) {
    return [];
  }

  if (!lastFinishedTournament.value.teams) {
    return [];
  }

  // Récupère les équipes classées 1, 2 et 3
  const teams = lastFinishedTournament.value.teams
    .filter(
      (team) =>
        team &&
        typeof team.ranking === "number" &&
        team.ranking > 0 &&
        team.ranking < 2
    )
    .sort((a, b) => (a.ranking || 999) - (b.ranking || 999))
    .slice(0, 3);

  return teams;
});

//-------------------------------------------------------
// SECTION: Authentification
//-------------------------------------------------------

/**
 * Déclenche le processus d'authentification Discord
 * Redirige l'utilisateur vers l'autorisation OAuth2 de Discord
 */
const loginWithDiscord = () => {
  try {
    isAuthenticating.value = true;

    // Récupération des variables d'environnement pour OAuth2
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_DISCORD_REDIRECT_URI;

    // Vérification de la configuration
    if (!clientId || !redirectUri) {
      throw new Error("Configuration Discord manquante");
    }

    // Redirection vers la page d'autorisation Discord
    window.location.href = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=identify+guilds+email`;
  } catch (err) {
    // Gestion des erreurs d'authentification
    error.value = "Impossible de se connecter à Discord. Veuillez réessayer.";
    isAuthenticating.value = false;
    console.error("Erreur d'authentification Discord:", err);
  }
};

//-------------------------------------------------------
// SECTION: Récupération des données
//-------------------------------------------------------

/**
 * Récupère les tournois depuis l'API
 */
const fetchTournaments = async () => {
  try {
    // Récupérer tous les tournois
    tournaments.value = await tournamentService.getTournaments();

    // Date actuelle
    const now = new Date();

    // Date de début du jour suivant la date actuelle
    const tomorrowStart = new Date(now);
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);
    tomorrowStart.setHours(0, 0, 0, 0);

    // Obtenir la date actuelle sans heure/minute/secondes
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    // Trouver tous les tournois non terminés
    const unfinishedTournaments = tournaments.value
      .filter((t) => !t.finished)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // D'abord, chercher un tournoi non terminé qui a lieu aujourd'hui (le plus récent)
    const todaysTournament = unfinishedTournaments.find((t) => {
      const tournamentDate = new Date(t.date);
      const tournamentDayStart = new Date(tournamentDate);
      tournamentDayStart.setHours(0, 0, 0, 0);

      // Le tournoi est d'aujourd'hui
      return tournamentDayStart.getTime() === todayStart.getTime();
    });

    if (todaysTournament) {
      // Si on a un tournoi aujourd'hui, on l'utilise
      nextTournament.value = todaysTournament;
    } else {
      // Sinon, chercher un tournoi non terminé de hier (le plus récent)
      const yesterdayStart = new Date(todayStart);
      yesterdayStart.setDate(yesterdayStart.getDate() - 1);

      const yesterdaysTournament = unfinishedTournaments.find((t) => {
        const tournamentDate = new Date(t.date);
        const tournamentDayStart = new Date(tournamentDate);
        tournamentDayStart.setHours(0, 0, 0, 0);

        // Le tournoi est d'hier
        return tournamentDayStart.getTime() === yesterdayStart.getTime();
      });

      if (yesterdaysTournament) {
        // Si on a un tournoi d'hier, on l'utilise
        nextTournament.value = yesterdaysTournament;
      } else {
        // Si on n'a ni tournoi aujourd'hui ni tournoi hier, chercher le prochain tournoi futur
        const upcomingTournament = unfinishedTournaments.find(
          (t) => new Date(t.date) > now
        );

        nextTournament.value = upcomingTournament || null;
      }
    }

    // Trouver le dernier tournoi terminé (date passée la plus récente)
    const finishedTournaments = tournaments.value
      .filter((t) => t.finished)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Si aucun tournoi terminé, arrêter ici
    if (finishedTournaments.length === 0) {
      lastFinishedTournament.value = null;
      return;
    }

    // Récupérer les détails du dernier tournoi terminé
    try {
      const mostRecentFinishedTournament = finishedTournaments[0];

      if (!mostRecentFinishedTournament._id) {
        lastFinishedTournament.value = mostRecentFinishedTournament;
        return;
      }

      // Récupérer les détails complets pour avoir les équipes
      const detailedTournament = await tournamentService.getTournamentById(
        mostRecentFinishedTournament._id
      );

      // Utiliser le tournoi détaillé s'il a des équipes
      if (detailedTournament && detailedTournament.teams) {
        lastFinishedTournament.value = detailedTournament;
      } else {
        lastFinishedTournament.value = mostRecentFinishedTournament;
      }
    } catch (err) {
      // En cas d'erreur, utiliser les données de base
      lastFinishedTournament.value = finishedTournaments[0];
    }
  } catch (err) {
    error.value = "Impossible de charger les tournois";
  }
};

/**
 * Démarre le décompte pour le prochain tournoi
 */
let countdownInterval: number | null = null;

const startCountdown = () => {
  // Cette fonction cause des problèmes, rendons-la plus robuste

  // Nettoyer l'intervalle existant s'il y en a un
  if (countdownInterval !== null) {
    window.clearInterval(countdownInterval);
    countdownInterval = null;
  }

  // Vérifier que nextTournament est défini et a une date
  if (!nextTournament.value || !nextTournament.value.date) {
    return;
  }

  // Copier la date pour éviter les problèmes de référence
  const tournamentDate = new Date(nextTournament.value.date).getTime();

  const updateCountdown = () => {
    try {
      const now = new Date().getTime();
      const distance = tournamentDate - now;

      if (distance < 0) {
        // Le tournoi a commencé
        countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        if (countdownInterval !== null) {
          window.clearInterval(countdownInterval);
          countdownInterval = null;
        }
        return;
      }

      // Mise à jour du décompte
      countdown.value = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
    } catch (error) {
      if (countdownInterval !== null) {
        window.clearInterval(countdownInterval);
        countdownInterval = null;
      }
    }
  };

  // Mise à jour immédiate
  updateCountdown();

  // Mise à jour toutes les secondes
  countdownInterval = window.setInterval(updateCountdown, 1000);
};

/**
 * Formatte une date en format français
 */
const formatDate = (dateString: string | Date): string => {
  if (!dateString) return "Date inconnue";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  } catch (e) {
    return "Date invalide";
  }
};

/**
 * Formatte une heure en format français
 */
const formatTime = (dateString: string | Date): string => {
  if (!dateString) return "Heure inconnue";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch (e) {
    return "Heure invalide";
  }
};

//-------------------------------------------------------
// SECTION: Cycle de vie
//-------------------------------------------------------

/**
 * Initialisation du composant au montage
 */
onMounted(async () => {
  isLoading.value = true;

  try {
    // Récupération des informations utilisateur depuis le store
    await userStore.fetchUser();

    // Récupération des tournois - faire cette opération séparément
    await fetchTournaments();

    // Si nous avons un prochain tournoi, démarrer le compteur
    if (nextTournament.value) {
      startCountdown();
    }
  } catch (err) {
    error.value = "Impossible de récupérer les données";
  } finally {
    isLoading.value = false;
  }
});

// Nettoyage du compteur au démontage du composant
onUnmounted(() => {
  if (countdownInterval !== null) {
    window.clearInterval(countdownInterval);
    countdownInterval = null;
  }
});
</script>

<style scoped>
.neon-text-cyan {
  color: #06b6d4;
  text-shadow: 0 0 10px #06b6d4, 0 0 15px #06b6d4, 0 0 20px #06b6d4;
  letter-spacing: 1px;
}

.neon-text-pink {
  color: #ec4899;
  text-shadow: 0 0 10px #ec4899, 0 0 15px #ec4899, 0 0 20px #ec4899;
  letter-spacing: 1px;
}

/* Ombres avec effets spéciaux - remplaçables seulement par shadow-[...] verbose */
.shadow-glow-pink {
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
}

.shadow-glow-cyan {
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.5);
}

.shadow-glow-gold {
  box-shadow: 0 0 15px rgba(245, 158, 11, 0.7);
}

.shadow-glow-discord {
  box-shadow: 0 0 10px rgba(87, 101, 242, 0.7),
    inset 0 0 10px rgba(87, 101, 242, 0.5);
}

.shadow-glow-discord-hover {
  box-shadow: 0 0 20px rgba(87, 101, 242, 0.9),
    inset 0 0 15px rgba(87, 101, 242, 0.5);
}

.shadow-glow-welcome {
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.7),
    inset 0 0 10px rgba(6, 182, 212, 0.5);
}

.logo-shadow {
  filter: drop-shadow(0 0 8px rgba(255, 0, 255, 0.7));
}

.logo-shadow:hover {
  filter: drop-shadow(0 0 15px rgba(255, 0, 255, 1))
    drop-shadow(0 0 30px rgba(255, 0, 255, 0.7));
}

/* Animations personnalisées */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes pulse-subtle {
  0%,
  100% {
    box-shadow: 0 0 10px rgba(6, 182, 212, 0.7),
      inset 0 0 10px rgba(6, 182, 212, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.9),
      inset 0 0 15px rgba(6, 182, 212, 0.7);
  }
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s infinite;
}

@keyframes shine {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}

.animate-shine {
  animation: shine 1.5s;
}

/* Éléments cyberpunk spécifiques */
.cyberpunk-card {
  position: relative;
  overflow: hidden;
  border: 1px solid;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cyberpunk-card:nth-child(1) {
  border-color: rgba(236, 72, 153, 0.5);
}

.cyberpunk-card:nth-child(2) {
  border-color: rgba(6, 182, 212, 0.5);
}

.cyberpunk-card:hover {
  box-shadow: 0 0 18px rgba(236, 72, 153, 0.7);
  border-color: rgba(236, 72, 153, 0.9);
}

.cyberpunk-card:nth-child(2):hover {
  box-shadow: 0 0 18px rgba(6, 182, 212, 0.7);
  border-color: rgba(6, 182, 212, 0.9);
}

/* Effets des coins cyberpunk */
.cyber-corners {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.cyber-corners::before,
.cyber-corners::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border-color: #ec4899;
  border-style: solid;
  border-width: 0;
  z-index: 1;
}

.cyber-corners::before {
  top: 0;
  left: 0;
  border-top-width: 2px;
  border-left-width: 2px;
  animation: corner-anim 4s infinite alternate;
}

.cyber-corners::after {
  top: 0;
  right: 0;
  border-top-width: 2px;
  border-right-width: 2px;
  animation: corner-anim 4s 2s infinite alternate;
}

.cyber-corners.cyan::before,
.cyber-corners.cyan::after {
  border-color: #06b6d4;
}

@keyframes corner-anim {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

/* Badges et éléments décoratifs spécifiques */
.cyber-badge {
  font-size: 0.65rem;
  background: linear-gradient(90deg, #ec4899, #fb7185);
  color: white;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  margin-left: 8px;
  position: relative;
  overflow: hidden;
  animation: badge-pulse 2s infinite;
}

.cyber-badge.cyan {
  background: linear-gradient(90deg, #06b6d4, #0ea5e9);
  animation: badge-pulse-cyan 2s infinite;
}

@keyframes badge-pulse {
  0%,
  100% {
    box-shadow: 0 0 5px rgba(236, 72, 153, 0.7);
  }
  50% {
    box-shadow: 0 0 10px rgba(236, 72, 153, 0.9);
  }
}

@keyframes badge-pulse-cyan {
  0%,
  100% {
    box-shadow: 0 0 5px rgba(6, 182, 212, 0.7);
  }
  50% {
    box-shadow: 0 0 10px rgba(6, 182, 212, 0.9);
  }
}

/* Lignes et éléments de décoration */
.cyber-line-h {
  position: absolute;
  top: 38px;
  left: -20px;
  width: calc(100% + 40px);
  height: 1px;
  background: linear-gradient(90deg, transparent, #ec4899, transparent);
  opacity: 0.5;
}

.cyber-line-h.cyan {
  background: linear-gradient(90deg, transparent, #06b6d4, transparent);
}

.cyber-scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: rgba(236, 72, 153, 0.3);
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.7);
  animation: scan-move 4s linear infinite;
  z-index: 2;
  opacity: 0.7;
  pointer-events: none;
}

.cyber-scanline.cyan {
  background-color: rgba(6, 182, 212, 0.3);
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.7);
}

@keyframes scan-move {
  0% {
    top: 0%;
  }
  100% {
    top: 100%;
  }
}

/* Effets de fond animés */
.cyber-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(139, 92, 246, 0.15) 1px,
    transparent 0
  );
  background-size: 30px 30px;
  mask-image: linear-gradient(
    to bottom,
    transparent,
    black 20%,
    black 80%,
    transparent
  );
  z-index: -2;
}

.cyber-stars {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(
      1px 1px at 25px 5px,
      #ffffff 1%,
      transparent 15%
    ),
    radial-gradient(1px 1px at 50px 25px, #ffffff 1%, transparent 15%),
    radial-gradient(1px 1px at 125px 20px, #ffffff 1%, transparent 15%),
    radial-gradient(1.5px 1.5px at 50px 75px, #ffffff 1%, transparent 15%),
    radial-gradient(1.5px 1.5px at 100px 50px, #ffffff 1%, transparent 15%);
  background-repeat: repeat;
  background-size: 200px 200px;
  animation: cyber-stars 300s linear infinite;
  z-index: -3;
  opacity: 0.4;
}

@keyframes cyber-stars {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 1000px 1000px;
  }
}

.cyber-noise {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noisy' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noisy)' opacity='0.05'/%3E%3C/svg%3E");
  z-index: -1;
  pointer-events: none;
  opacity: 0.4;
}

/* Style du compteur */
.countdown-timer > div {
  position: relative;
  padding: 6px 8px;
  background: rgba(17, 24, 39, 0.6);
  border: 1px solid rgba(236, 72, 153, 0.3);
  border-radius: 4px;
  overflow: hidden;
}

.countdown-timer > div::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(236, 72, 153, 0.1),
    transparent
  );
  transform: rotate(45deg);
  animation: timer-shine 6s linear infinite;
}

@keyframes timer-shine {
  0% {
    transform: rotate(45deg) translate(-100%, -100%);
  }
  100% {
    transform: rotate(45deg) translate(100%, 100%);
  }
}

/* Animation pour les titres */
h2:hover .neon-text-cyan,
h2:hover .neon-text-pink {
  animation: text-glitch 0.3s ease-in-out;
}

@keyframes text-glitch {
  0%,
  100% {
    transform: translate(0);
    text-shadow: 0 0 10px #06b6d4, 0 0 15px #06b6d4, 0 0 20px #06b6d4;
  }
  25% {
    transform: translate(-2px, -2px);
    text-shadow: -2px 0 #ec4899, 2px 2px #06b6d4;
  }
  50% {
    transform: translate(2px, 2px);
    text-shadow: 2px -2px #ec4899, -2px 0 #06b6d4;
  }
  75% {
    transform: translate(-2px, 2px);
    text-shadow: 0 -2px #ec4899, -2px 2px #06b6d4;
  }
}

/* Effet de passage de curseur sur les cartes */
.cyberpunk-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(236, 72, 153, 0.1) 25%,
    transparent 50%
  );
  transform: translateX(-100%);
  transition: transform 0.6s;
  pointer-events: none;
  z-index: 1;
}

.cyberpunk-card:hover::before {
  transform: translateX(100%);
}

/* Conteneur du titre principal */
.title-container {
  position: relative;
  width: 100%;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  margin-top: 2.5rem; /* Augmentation de la marge supérieure pour tous les écrans */
  text-align: center;
  overflow: visible;
}

/* Style du titre principal */
.cyber-main-title {
  font-family: "Audiowide", cursive;
  font-size: min(3rem, 12vw); /* Taille responsive */
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: inline-block;
  position: relative;
  margin: 0;
  padding: 0.5rem 1rem;
  z-index: 1;
  white-space: nowrap; /* Empêche le retour à la ligne */
}

/* Effet néon pour le titre principal */
.neon-text-title {
  color: #ffffff;
  text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff,
    0 0 20px #ff00ff;
  animation: neon-pulse 2s infinite alternate;
  position: relative;
  display: inline-block;
}

/* Animation de pulsation néon */
@keyframes neon-pulse {
  from {
    text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff,
      0 0 20px #ff00ff;
  }
  to {
    text-shadow: 0 0 5px #ff00ff, 0 0 15px #ff00ff, 0 0 25px #ff00ff,
      0 0 35px #ff00ff;
  }
}

/* Ligne horizontale décorative avec gradient */
.cyber-line-h.pink {
  position: absolute;
  top: 90%;
  left: 10%;
  width: 80%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #ec4899, transparent);
  opacity: 0.7;
}

/* Animation de survol pour le titre */
.cyber-main-title:hover .neon-text-title {
  animation: title-glitch 0.3s ease-in-out;
}

@keyframes title-glitch {
  0%,
  100% {
    transform: translate(0);
    text-shadow: 0 0 10px #ff00ff, 0 0 15px #ff00ff, 0 0 20px #ff00ff;
  }
  25% {
    transform: translate(-2px, -2px);
    text-shadow: -2px 0 #ec4899, 2px 2px #ff00ff;
  }
  50% {
    transform: translate(2px, 2px);
    text-shadow: 2px -2px #ec4899, -2px 0 #ff00ff;
  }
  75% {
    transform: translate(-2px, 2px);
    text-shadow: 0 -2px #ec4899, -2px 2px #ff00ff;
  }
}

/* Ajouter un effet de scanline au titre */
.cyber-main-title::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(255, 0, 255, 0.1) 50%,
    transparent 100%
  );
  background-size: 100% 4px;
  pointer-events: none;
  animation: scanline 6s linear infinite;
}

@keyframes scanline {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

/* Styles responsifs spécifiques pour le titre */
@media (max-width: 640px) {
  .cyber-main-title {
    font-size: 2rem;
    padding: 0.5rem 1rem;
    margin-top: 1rem; /* Marge supplémentaire en haut du titre */
  }

  /* Augmenter l'espacement en haut de la page sur mobile */
  .title-container {
    margin-top: 3.5rem; /* Plus d'espace sur mobile */
  }
}
</style>
