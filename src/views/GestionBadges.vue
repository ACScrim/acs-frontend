<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\GestionBadges.vue -->
<template>
  <div
    class="bg-gradient-to-br from-gray-900 to-purple-900 min-h-screen p-6 relative overflow-hidden"
  >
    <!-- Grille d'arrière-plan rétro -->
    <div class="absolute inset-0 z-0 bg-grid-pattern opacity-20"></div>

    <!-- Container principal -->
    <div class="relative z-10 max-w-6xl mx-auto pt-8">
      <!-- Titre principal -->
      <h1
        class="text-5xl font-audiowide text-center mb-10 text-white neon-text-pink"
      >
        Gestion des Badges
      </h1>

      <!-- Section Création de badge -->
      <div
        class="mb-12 bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 shadow-lg shadow-purple-500/20"
      >
        <h2
          class="text-2xl font-orbitron text-cyan-300 mb-6 border-b border-cyan-500/40 pb-2 neon-text-cyan"
        >
          Créer un nouveau badge
        </h2>

        <form @submit.prevent="createBadge" class="space-y-4">
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
            <!-- Ajouter après l'input imageUrl -->
            <div v-if="newBadge.imageUrl" class="mt-2 mb-4">
              <label class="block text-lg text-cyan-300 mb-2 font-orbitron"
                >Prévisualisation</label
              >
              <div
                class="w-20 h-20 rounded-full flex items-center justify-center bg-gray-700/70 p-1 border border-pink-500/30 overflow-hidden mx-auto"
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

          <div class="flex justify-end">
            <button
              type="submit"
              class="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-orbitron shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/50 hover:-translate-y-1 transition-all duration-300"
            >
              Créer le badge
            </button>
          </div>
        </form>
      </div>

      <!-- Section Association de badge -->
      <div
        class="mb-12 bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 shadow-lg shadow-purple-500/20"
      >
        <h2
          class="text-2xl font-orbitron text-cyan-300 mb-6 border-b border-cyan-500/40 pb-2 neon-text-cyan"
        >
          Associer un badge à un joueur
        </h2>

        <form @submit.prevent="assignBadge" class="space-y-4">
          <div class="relative">
            <label
              for="playerId"
              class="block text-lg text-cyan-300 mb-2 font-orbitron"
              >Joueur</label
            >
            <div class="relative">
              <input
                id="playerId"
                v-model="playerSearch"
                @focus="showPlayerList = true"
                @blur="hidePlayerList"
                @input="searchPlayers"
                type="text"
                class="w-full p-3 text-white bg-gray-800/80 border border-cyan-500/50 rounded-lg shadow-inner shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 font-orbitron"
                placeholder="Rechercher un joueur..."
                required
              />
              <div
                v-if="showPlayerList && filteredPlayers.length > 0"
                class="absolute z-20 mt-2 w-full bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-purple-500/30 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800"
              >
                <ul class="py-1">
                  <li
                    v-for="player in filteredPlayers"
                    :key="player._id"
                    @mousedown.prevent="selectPlayer(player)"
                    class="px-4 py-2 hover:bg-purple-900/50 cursor-pointer text-white font-orbitron text-sm transition-colors duration-200"
                  >
                    {{ player.username }}
                  </li>
                </ul>
              </div>
              <div
                v-if="
                  showPlayerList && playerSearch && filteredPlayers.length === 0
                "
                class="absolute z-20 mt-2 w-full bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-purple-500/30 p-4 text-center text-cyan-300 font-orbitron"
              >
                Aucun joueur trouvé
              </div>
            </div>
          </div>

          <div>
            <label
              for="badgeId"
              class="block text-lg text-cyan-300 mb-2 font-orbitron"
              >Badge</label
            >
            <div class="relative">
              <select
                id="badgeId"
                v-model="badgeId"
                class="w-full p-3 text-white bg-gray-800/80 border border-cyan-500/50 rounded-lg shadow-inner shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 font-orbitron appearance-none"
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
                class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-cyan-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="!selectedPlayer || !badgeId"
              class="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-orbitron shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/50 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
            >
              Associer le badge
            </button>
          </div>
        </form>
      </div>

      <!-- Section badges du joueur -->
      <div
        class="mb-12 bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 shadow-lg shadow-purple-500/20"
      >
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-cyan-500/40 pb-2"
        >
          <h2 class="text-2xl font-orbitron text-cyan-300 neon-text-cyan">
            Badges du joueur
          </h2>
          <div
            v-if="selectedPlayer"
            class="text-white font-orbitron mt-2 md:mt-0"
          >
            <span class="text-pink-400">Joueur sélectionné:</span>
            {{ selectedPlayer.username }}
          </div>
        </div>

        <div
          v-if="!selectedPlayer"
          class="flex flex-col items-center justify-center p-8 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-purple-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p class="text-purple-300 font-orbitron">
            Veuillez sélectionner un joueur pour voir ses badges
          </p>
        </div>

        <div
          v-else-if="selectedPlayerBadges.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div
            v-for="badge in selectedPlayerBadges"
            :key="badge._id"
            class="bg-gray-800/60 rounded-lg p-4 flex items-center justify-between border border-purple-500/20 hover:border-purple-500/50 transition-colors duration-300"
          >
            <div class="flex items-center">
              <div
                class="w-14 h-14 rounded-full flex items-center justify-center bg-gray-700/70 p-1 mr-4 border border-pink-500/30 overflow-hidden"
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
              @click="badge._id ? removeBadge(badge._id) : null"
              class="ml-2 p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 hover:text-white transition-colors duration-300"
              title="Supprimer ce badge"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
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

        <div
          v-else-if="selectedPlayer"
          class="flex flex-col items-center justify-center p-8 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-purple-400 mb-4"
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
          <p class="text-purple-300 font-orbitron">
            Ce joueur n'a pas encore de badges
          </p>
        </div>
      </div>

      <!-- Section liste des badges -->
      <div
        class="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 shadow-lg shadow-purple-500/20"
      >
        <h2
          class="text-2xl font-orbitron text-cyan-300 mb-6 border-b border-cyan-500/40 pb-2 neon-text-cyan"
        >
          Collection de badges
        </h2>

        <div
          v-if="badges.length > 0"
          class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <div
            v-for="badge in badges"
            :key="badge._id"
            class="bg-gray-800/60 rounded-lg p-4 flex flex-col items-center border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 group"
          >
            <div
              class="w-16 h-16 rounded-full flex items-center justify-center bg-gray-700/70 p-1 mb-3 border border-pink-500/30 overflow-hidden group-hover:border-pink-500/70 transition-colors duration-300"
            >
              <img
                :src="badge.imageUrl"
                :alt="badge.title"
                class="max-h-full max-w-full object-contain"
                @error="handleImageError"
              />
            </div>
            <span class="text-white font-orbitron text-center line-clamp-2">{{
              badge.title
            }}</span>
          </div>
        </div>

        <div
          v-else
          class="flex flex-col items-center justify-center p-8 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-purple-400 mb-4"
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
            Aucun badge n'a été créé pour le moment
          </p>
        </div>
      </div>
    </div>

    <!-- Notifications -->
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

// Services
import badgeService from "../services/badgeService";
import playerService from "../services/playerService";

// Types
import type { Badge, Player } from "../types";

// Components
import Toast from "@/shared/Toast.vue";

// Variables réactives
const newBadge = ref<Badge>({ title: "", imageUrl: "" });
const playerSearch = ref("");
const playerSearchResults = ref<Player[]>([]);
const selectedPlayer = ref<Player | null>(null);
const badgeId = ref("");
const badges = ref<Badge[]>([]);
const showPlayerList = ref<boolean>(false);
const selectedPlayerBadges = ref<Badge[]>([]);
const error = ref<string | null>(null);
const success = ref<string | null>(null);

/**
 * Fonction pour afficher une notification à l'utilisateur
 * @param type  "success" ou "error"
 * @param message Message à afficher
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
 * Crée un badge à partir des données du formulaire
 */
const createBadge = async () => {
  const errors = validateBadgeForm();

  if (errors.length > 0) {
    showMessage("error", errors[0]);
    return;
  }
  try {
    const createdBadge = await badgeService.createBadge(newBadge.value);
    badges.value.push(createdBadge);
    newBadge.value = { title: "", imageUrl: "" };
    showMessage("success", "Badge créé avec succès !");
  } catch (error) {
    console.error("Erreur lors de la création du badge:", error);
    showMessage("error", "Erreur lors de la création du badge.");
  }
};

/**
 * Associe un badge à un joueur
 */
const assignBadge = async () => {
  try {
    if (selectedPlayer.value && badgeId.value) {
      await badgeService.assignBadgeToPlayer(
        selectedPlayer.value._id!,
        badgeId.value
      );
      fetchPlayerBadges(selectedPlayer.value._id!);
      badgeId.value = "";
      showMessage("success", "Badge associé avec succès !");
    }
  } catch (error) {
    console.error("Erreur lors de l'association du badge:", error);
    showMessage("error", "Erreur lors de l'association du badge.");
  }
};

/**
 * Retirer un badge d'un joueur
 * @param badgeId ID du badge à supprimer
 */
const removeBadge = async (badgeId: string) => {
  try {
    if (selectedPlayer.value) {
      await badgeService.removeBadgeFromPlayer(
        selectedPlayer.value._id!,
        badgeId
      );
      fetchPlayerBadges(selectedPlayer.value._id!);
      showMessage("success", "Badge supprimé avec succès !");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du badge:", error);
    showMessage("error", "Erreur lors de la suppression du badge.");
  }
};

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

const fetchPlayerBadges = async (playerId: string) => {
  try {
    const player = await playerService.getPlayerById(playerId);
    console.log("badges reçus:", player.badges);

    // Les badges sont déjà des objets complets, pas besoin de les récupérer individuellement
    selectedPlayerBadges.value = player.badges || [];

    console.log("Badges récupérés avec succès:", selectedPlayerBadges.value);
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

const searchPlayers = async () => {
  if (playerSearch.value.length > 0) {
    playerSearchResults.value = await playerService.searchPlayers(
      playerSearch.value
    );
  } else {
    playerSearchResults.value = [];
  }
};

const filteredPlayers = computed(() => {
  return playerSearchResults.value;
});

const selectPlayer = (player: Player) => {
  selectedPlayer.value = player;
  playerSearch.value = player.username;
  showPlayerList.value = false;
  fetchPlayerBadges(player._id!);
};

const hidePlayerList = () => {
  setTimeout(() => {
    showPlayerList.value = false;
  }, 200);
};

const handleImageError = (e: Event) => {
  if (e.target instanceof HTMLImageElement) {
    e.target.src = "https://via.placeholder.com/50?text=?";
  }
};

const validateBadgeForm = () => {
  const errors = [];

  if (!newBadge.value.title.trim()) {
    errors.push("Le titre du badge est requis");
  } else if (newBadge.value.title.length > 50) {
    errors.push("Le titre ne doit pas dépasser 50 caractères");
  }

  if (!newBadge.value.imageUrl.trim()) {
    errors.push("L'URL de l'image est requise");
  } else {
    try {
      new URL(newBadge.value.imageUrl);
    } catch (e) {
      errors.push("Veuillez entrer une URL d'image valide");
    }
  }

  return errors;
};

onMounted(() => {
  fetchBadges();
});
</script>

<style scoped>
/* Ajout des classes personnalisées non-disponibles dans Tailwind */
.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

.neon-text-pink {
  text-shadow: 0 0 8px #ec4899, 0 0 15px #ec4899, 0 0 25px #ec4899,
    0 0 40px #ec4899;
  animation: pulsate 1.5s infinite alternate;
  -webkit-text-stroke: 1px rgba(236, 72, 153, 0.6);
  padding: 0.5rem 0;
}

.neon-text-cyan {
  text-shadow: 0 0 5px #06b6d4, 0 0 15px #06b6d4;
}

@keyframes pulsate {
  0% {
    text-shadow: 0 0 5px #ec4899, 0 0 15px #ec4899;
  }
  100% {
    text-shadow: 0 0 10px #ec4899, 0 0 20px #ec4899, 0 0 30px #ec4899,
      0 0 40px #ec4899;
  }
}

/* Grille d'arrière-plan */
.bg-grid-pattern {
  background-image: linear-gradient(
      rgba(139, 92, 246, 0.3) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px);
  background-size: 40px 40px;
  transform: perspective(500px) rotateX(30deg);
  background-position: center center;
}

/* Scrollbar personnalisée */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thumb-purple-500::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.5);
  border-radius: 3px;
}

.scrollbar-track-gray-800::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5);
}

/* Ajout d'une règle pour améliorer la visibilité sur les écrans plus petits */
@media (max-width: 640px) {
  .neon-text-pink {
    font-size: 2.5rem;
    margin-top: 1rem;
  }
}
</style>
