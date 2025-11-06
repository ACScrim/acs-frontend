<template>
  <div class="twitch-streams-container space-y-6">
    <!-- En-tête avec effet néon -->
    <div class="relative">
      <!-- Barre de néon décorative -->
      <div
        class="absolute -top-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60 animate-pulse"
      ></div>

      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-slate-900/80 via-purple-900/40 to-slate-900/80 rounded-xl border border-purple-500/30 backdrop-blur-sm"
      >
        <!-- Titre avec animation -->
        <div class="flex items-center">
          <div class="relative">
            <svg
              class="h-8 w-8 mr-3 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.429h-3.429l-3 3v-3H6.857V1.714h13.714Z"
              />
            </svg>
            <!-- Point lumineux clignotant -->
            <div
              class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"
            ></div>
            <div
              class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
            ></div>
          </div>
          <h3
            class="text-2xl font-bold text-white font-audiowide tracking-wider"
          >
            <span
              class="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
            >
              Streams
            </span>
            <span class="text-white ml-2">en direct</span>
          </h3>
        </div>

        <!-- Bouton actualiser avec design futuriste -->
        <div class="flex items-center gap-3">
          <!-- Indicateur de statut -->
          <div
            class="hidden sm:flex items-center px-3 py-1 bg-slate-800/60 rounded-full border border-slate-600/50"
          >
            <div
              :class="[
                'w-2 h-2 rounded-full mr-2',
                loading
                  ? 'bg-yellow-400 animate-pulse'
                  : error
                  ? 'bg-red-400'
                  : 'bg-green-400',
              ]"
            ></div>
            <span class="text-xs font-orbitron text-slate-300">
              {{ loading ? "Sync..." : error ? "Erreur" : "Actif" }}
            </span>
          </div>

          <!-- Bouton actualiser -->
          <button
            @click="refreshStreams"
            :disabled="loading"
            class="group relative overflow-hidden px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-orbitron text-sm font-semibold rounded-lg border border-purple-400/30 hover:border-purple-400/60 disabled:border-gray-600 transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25"
          >
            <!-- Effet de brillance -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
            ></div>

            <!-- Contenu du bouton -->
            <div class="relative flex items-center">
              <svg
                :class="[
                  'h-4 w-4 mr-2 transition-transform duration-300',
                  { 'animate-spin': loading },
                ]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>{{ loading ? "Actualisation..." : "Actualiser" }}</span>
            </div>

            <!-- Bordure lumineuse -->
            <div
              class="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-10"
            ></div>
          </button>
        </div>
      </div>
    </div>

    <!-- État de chargement avec style cyberpunk -->
    <div v-if="loading && !usersWithTwitch.length" class="relative">
      <div
        class="flex flex-col items-center justify-center py-16 px-8 bg-gradient-to-br from-slate-900/50 to-purple-900/20 rounded-xl border border-purple-500/20 backdrop-blur"
      >
        <!-- Cercles lumineux d'arrière-plan -->
        <div class="absolute inset-0 overflow-hidden rounded-xl">
          <div
            class="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"
          ></div>
          <div
            class="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-300"
          ></div>
        </div>

        <div class="relative z-10 flex flex-col items-center">
          <Loader text="Chargement des streams..." />
          <div class="mt-6 text-center">
            <p class="text-white font-orbitron text-lg font-semibold mb-2">
              Initialisation des streams
            </p>
            <p class="text-purple-300 text-sm animate-pulse">
              Connexion aux serveurs Twitch...
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Gestion des erreurs avec design moderne -->
    <div v-else-if="error" class="relative group">
      <div
        class="bg-gradient-to-r from-red-900/80 to-red-800/60 backdrop-blur-sm rounded-xl border border-red-500/40 p-6 text-center overflow-hidden"
      >
        <!-- Effet de fond animé -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-red-600/10 to-red-400/10 animate-pulse"
        ></div>

        <div class="relative z-10">
          <!-- Icône d'erreur -->
          <div
            class="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4 border border-red-500/30"
          >
            <svg
              class="h-8 w-8 text-red-400"
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
          </div>

          <h4 class="text-red-300 font-orbitron font-semibold text-lg mb-2">
            Erreur de connexion
          </h4>
          <p class="text-red-200 mb-6">{{ error }}</p>

          <button
            @click="refreshStreams"
            class="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-orbitron font-semibold rounded-lg border border-red-400/50 hover:border-red-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
          >
            <svg
              class="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Réessayer
          </button>
        </div>
      </div>
    </div>

    <!-- Interface principale des streams -->
    <div v-else class="space-y-8">
      <!-- Statistiques avec design cards modernes -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- En live -->
        <div
          class="group relative overflow-hidden bg-gradient-to-br from-green-900/40 to-green-800/20 backdrop-blur-sm rounded-xl border border-green-500/30 p-4 hover:border-green-400/50 transition-all duration-300"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative z-10 text-center">
            <div class="flex items-center justify-center mb-2">
              <div
                class="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"
              ></div>
              <div class="text-3xl font-bold text-green-400 font-mono">
                {{ onlineUsers.length }}
              </div>
            </div>
            <div class="text-sm text-green-200 font-orbitron">En live</div>
          </div>
        </div>

        <!-- Hors ligne -->
        <div
          class="group relative overflow-hidden bg-gradient-to-br from-gray-900/40 to-gray-800/20 backdrop-blur-sm rounded-xl border border-gray-500/30 p-4 hover:border-gray-400/50 transition-all duration-300"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative z-10 text-center">
            <div class="flex items-center justify-center mb-2">
              <div class="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
              <div class="text-3xl font-bold text-gray-400 font-mono">
                {{ offlineUsers.length }}
              </div>
            </div>
            <div class="text-sm text-gray-300 font-orbitron">Hors ligne</div>
          </div>
        </div>

        <!-- Total avec Twitch -->
        <div
          class="group relative overflow-hidden bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-sm rounded-xl border border-purple-500/30 p-4 hover:border-purple-400/50 transition-all duration-300"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative z-10 text-center">
            <div class="flex items-center justify-center mb-2">
              <svg
                class="h-4 w-4 text-purple-400 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.429h-3.429l-3 3v-3H6.857V1.714h13.714Z"
                />
              </svg>
              <div class="text-3xl font-bold text-purple-400 font-mono">
                {{ usersWithTwitch.length }}
              </div>
            </div>
            <div class="text-sm text-purple-200 font-orbitron">
              Total Twitch
            </div>
          </div>
        </div>

        <!-- Participants -->
        <div
          class="group relative overflow-hidden bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-sm rounded-xl border border-blue-500/30 p-4 hover:border-blue-400/50 transition-all duration-300"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative z-10 text-center">
            <div class="flex items-center justify-center mb-2">
              <svg
                class="h-4 w-4 text-blue-400 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="text-3xl font-bold text-blue-400 font-mono">
                {{ participantUsers.length }}
              </div>
            </div>
            <div class="text-sm text-blue-200 font-orbitron">Participants</div>
          </div>
        </div>
      </div>

      <!-- Informations de mise à jour -->
      <div
        class="flex items-center justify-center px-4 py-2 bg-slate-800/30 rounded-lg border border-slate-600/30"
      >
        <svg
          class="h-4 w-4 text-slate-400 mr-2"
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
        <span class="text-xs text-slate-400 font-orbitron">
          Dernière mise à jour : {{ formatLastUpdate() }}
        </span>
      </div>

      <!-- Utilisateurs en live -->
      <div v-if="onlineUsers.length > 0" class="space-y-6">
        <div class="flex items-center justify-between">
          <h4
            class="text-2xl font-bold text-white font-audiowide flex items-center"
          >
            <div class="relative mr-3">
              <div
                class="w-4 h-4 bg-green-400 rounded-full animate-ping absolute"
              ></div>
              <div class="w-4 h-4 bg-green-400 rounded-full"></div>
            </div>
            <span
              class="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
            >
              Live maintenant
            </span>
            <span
              class="ml-3 px-3 py-1 bg-green-500/20 text-green-400 text-sm font-orbitron rounded-full border border-green-500/30"
            >
              {{ onlineUsers.length }}
            </span>
          </h4>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <StreamCard
            v-for="user in onlineUsers"
            :key="user.userId"
            :user="user"
            @open-twitch="openOnTwitch"
          />
        </div>
      </div>

      <!-- Utilisateurs hors ligne avec style amélioré -->
      <div v-if="offlineUsers.length > 0" class="space-y-6">
        <div class="flex items-center justify-between">
          <h4
            class="text-xl font-bold text-gray-400 font-audiowide flex items-center"
          >
            <div class="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
            <span>Hors ligne</span>
            <span
              class="ml-3 px-3 py-1 bg-gray-500/20 text-gray-400 text-sm font-orbitron rounded-full border border-gray-500/30"
            >
              {{ offlineUsers.length }}
            </span>
          </h4>

          <!-- Toggle pour masquer/afficher -->
          <button
            @click="showOfflineUsers = !showOfflineUsers"
            class="text-sm text-gray-400 hover:text-gray-300 font-orbitron transition-colors"
          >
            {{ showOfflineUsers ? "Masquer" : "Afficher" }}
          </button>
        </div>

        <div
          v-show="showOfflineUsers"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        >
          <OfflineUserCard
            v-for="user in offlineUsers"
            :key="user.userId"
            :user="user"
          />
        </div>
      </div>

      <!-- État vide avec design attractif -->
      <div v-if="usersWithTwitch.length === 0" class="relative">
        <div
          class="text-center py-20 px-8 bg-gradient-to-br from-slate-900/30 to-purple-900/10 rounded-xl border border-gray-600/20 backdrop-blur"
        >
          <!-- Éléments décoratifs -->
          <div class="absolute inset-0 overflow-hidden rounded-xl">
            <div
              class="absolute top-1/3 left-1/3 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl"
            ></div>
            <div
              class="absolute bottom-1/3 right-1/3 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"
            ></div>
          </div>

          <div class="relative z-10">
            <!-- Icône principale -->
            <div
              class="mx-auto w-24 h-24 bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-2xl flex items-center justify-center mb-6 border border-gray-600/30"
            >
              <svg
                class="h-12 w-12 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>

            <h5 class="text-xl font-bold text-gray-300 font-audiowide mb-3">
              Aucun stream configuré
            </h5>
            <p class="text-gray-400 mb-2 max-w-md mx-auto">
              Les utilisateurs peuvent ajouter leur nom Twitch dans leur profil
              pour apparaître ici.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import streamService from "../../services/streamService";
import type { StreamResponse, TwitchStream } from "../../types";
import StreamCard from "./StreamCard.vue";
import OfflineUserCard from "./OfflineUserCard.vue";

// ========================================
// PROPS ET EMITS
// ========================================

interface Props {
  tournamentId: string;
  isTournamentToday: boolean;
}

const props = defineProps<Props>();

// ========================================
// ÉTAT DU COMPOSANT
// ========================================

const streamResponse = ref<StreamResponse | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);
const lastUpdate = ref<Date>(new Date());
const showOfflineUsers = ref(true);

// ========================================
// COMPUTED PROPERTIES
// ========================================

const usersWithTwitch = computed(() => {
  return streamResponse.value?.allUsersWithTwitch || [];
});

const onlineUsers = computed(() => {
  return usersWithTwitch.value.filter((user) => user.isLive);
});

const offlineUsers = computed(() => {
  return usersWithTwitch.value.filter((user) => !user.isLive);
});

const participantUsers = computed(() => {
  return usersWithTwitch.value.filter((user) => user.isParticipant);
});

// ========================================
// MÉTHODES
// ========================================

/**
 * Récupère les streams Twitch
 */
const fetchStreams = async () => {
  if (!props.tournamentId || !props.isTournamentToday) {
    streamResponse.value = null;
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const response = await streamService.getTournamentStreams(
      props.tournamentId
    );
    streamResponse.value = response;
    lastUpdate.value = new Date();
  } catch (err) {
    console.error("❌ Erreur lors de la récupération des streams:", err);
    error.value = "Impossible de charger les streams Twitch";
  } finally {
    loading.value = false;
  }
};

/**
 * Actualise manuellement les streams
 */
const refreshStreams = async () => {
  await fetchStreams();
};

/**
 * Ouvre un stream sur Twitch
 */
const openOnTwitch = (stream: TwitchStream) => {
  window.open(`https://twitch.tv/${stream.userName}`, "_blank");
};

/**
 * Formate la dernière mise à jour
 */
const formatLastUpdate = () => {
  return lastUpdate.value.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

// ========================================
// CYCLE DE VIE
// ========================================

onMounted(() => {
  if (props.isTournamentToday) {
    fetchStreams();
  }
});

// ========================================
// EXPOSITION DES MÉTHODES
// ========================================

defineExpose({
  refreshStreams,
  fetchStreams,
});
</script>

<style scoped>
/* Animation pour l'apparition des éléments */
.twitch-streams-container > * {
  animation: slideInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) backwards;
}

.twitch-streams-container > *:nth-child(2) {
  animation-delay: 0.1s;
}

.twitch-streams-container > *:nth-child(3) {
  animation-delay: 0.2s;
}

.twitch-streams-container > *:nth-child(4) {
  animation-delay: 0.3s;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Effet de brillance sur les statistiques */
.group:hover .relative::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  animation: shine 1.5s ease-in-out;
}

@keyframes shine {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>
