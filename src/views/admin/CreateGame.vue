<template>
  <div class="container mx-auto p-8 pt-20">
    <div class="max-w-2xl mx-auto">
      <!-- En-tête -->
      <div
        class="bg-black/50 backdrop-blur-xl rounded-lg p-8 mb-8 border border-pink-500 shadow-lg shadow-pink-500/30"
      >
        <h1 class="text-4xl text-white mb-4 font-audiowide text-center">
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 neon-text-pink"
            >Création d'un jeu</span
          >
        </h1>
        <div class="flex justify-center">
          <div
            class="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          ></div>
        </div>
      </div>

      <!-- Formulaire de création de jeu -->
      <form
        @submit.prevent="createGame"
        class="bg-black/75 backdrop-blur-sm rounded-lg border border-cyan-500 shadow-lg shadow-cyan-500/30 p-8 mb-8"
      >
        <div class="mb-6">
          <label
            for="name"
            class="text-lg text-cyan-400 mb-2 font-orbitron flex items-center"
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
            Nom du jeu <span class="text-pink-500 ml-1">*</span>
          </label>
          <div class="relative">
            <input
              type="text"
              id="name"
              v-model="game.name"
              class="w-full p-3 pl-4 text-white bg-gray-900/70 border border-cyan-500/50 rounded-md focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 font-orbitron"
              required
              placeholder="Entrez le nom du jeu"
            />
          </div>
          <div
            v-if="errors.name"
            class="text-red-400 text-sm mt-1 font-orbitron"
          >
            {{ errors.name }}
          </div>
        </div>

        <div class="mb-6">
          <label
            for="description"
            class="text-lg text-cyan-400 mb-2 font-orbitron flex items-center"
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
          </label>
          <div class="relative">
            <textarea
              id="description"
              v-model="game.description"
              class="w-full p-3 pl-4 text-white bg-gray-900/70 border border-cyan-500/50 rounded-md focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 font-orbitron min-h-[120px]"
              placeholder="Entrez une description du jeu (optionnel)"
            ></textarea>
          </div>
        </div>

        <div class="flex justify-center">
          <button
            type="submit"
            class="inline-flex items-center justify-center px-8 py-3 text-lg bg-gradient-to-r from-purple-800 to-purple-600 text-white font-orbitron font-bold rounded border border-pink-500 shadow-md hover:shadow-lg hover:shadow-pink-500/30 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-60 disabled:cursor-not-allowed"
            :disabled="isLoading"
          >
            <svg
              v-if="isLoading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            <span>{{
              isLoading ? "Création en cours..." : "Créer le jeu"
            }}</span>
          </button>
        </div>
      </form>

      <!-- Liste des jeux existants -->
      <div
        class="bg-black/75 backdrop-blur-sm rounded-lg border border-purple-500 shadow-lg shadow-purple-500/30 p-6 mb-8"
      >
        <h2 class="text-2xl text-white mb-6 font-audiowide flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-2 text-purple-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
            />
          </svg>
          Jeux disponibles
        </h2>

        <div
          v-if="games.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div
            v-for="game in games"
            :key="game._id"
            class="bg-slate-800/60 rounded-lg overflow-hidden border border-purple-500/30 shadow-md transition-all duration-300 p-4 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-500/80 group"
          >
            <!-- Bouton de suppression avec apparition au survol -->
            <button
              @click="confirmDelete(game)"
              class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center rounded-full bg-red-900/20 text-red-400 border border-red-500/30 hover:bg-red-900/40 hover:text-red-300 hover:border-red-500/50 hover:shadow-md hover:shadow-red-500/20 transition-all duration-300 transform group-hover:scale-100 scale-90"
              title="Supprimer ce jeu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
            <div
              class="font-orbitron text-lg font-semibold text-gray-100 mb-2 pb-2 border-b border-purple-500/30"
            >
              {{ game.name }}
            </div>
            <p class="text-gray-300 text-sm leading-relaxed">
              {{ game.description || "Aucune description" }}
            </p>
          </div>
        </div>

        <div
          v-else-if="loadingGames"
          class="flex flex-col justify-center items-center py-12"
        >
          <div
            class="w-10 h-10 border-4 border-purple-500/10 border-t-purple-500 rounded-full animate-spin"
          ></div>
          <p class="text-cyan-400 mt-4 font-orbitron">Chargement des jeux...</p>
        </div>

        <div v-else class="text-center py-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 mx-auto text-purple-400 mb-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="text-purple-300 font-orbitron">
            Aucun jeu disponible pour le moment
          </p>
        </div>
      </div>

      <Toast v-if="error" type="error" :message="error" />
      <Toast v-if="success" type="success" :message="success" />
      <ConfirmationDialog
        v-if="showDeleteConfirmation"
        :title="'Supprimer le jeu'"
        :message="deleteConfirmMessage"
        @confirm="deleteGame"
        @cancel="cancelDelete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// Services
import gameService from "../../services/gameService";

// Components
import Toast from "@/shared/Toast.vue";
import ConfirmationDialog from "@/shared/ConfirmationDialog.vue";

// Types
import type { Game } from "../../types";

const game = ref<Game>({
  name: "",
  description: "",
});

// State
const error = ref<string | null>(null);
const success = ref<string | null>(null);
const isLoading = ref(false);
const loadingGames = ref(false);
const errors = ref<Record<string, string>>({});
const isInitialized = ref(false);
let messageTimeout: ReturnType<typeof setTimeout> | null = null;

// Variables
const games = ref<Game[]>([]);

// Variables pour la suppression
const gameToDelete = ref<Game | null>(null);
const showDeleteConfirmation = ref(false);
const deleteConfirmMessage = ref("");
const isDeleting = ref(false);

const createGame = async () => {
  if (isLoading.value) return; // Empêcher les doubles clics
  if (!validateForm()) {
    return; // Arrêter si validation échoue
  }
  isLoading.value = true;

  try {
    await gameService.createGame(game.value);
    showMessage("success", "Jeu créé avec succès !");
    game.value = { name: "", description: "" }; // Reset form
    fetchGames(); // Rafraîchir la liste des jeux
  } catch (err) {
    console.error("Erreur lors de la création du jeu:", err);
    showMessage("error", "Erreur lors de la création du jeu !");
  } finally {
    isLoading.value = false;
  }
};

const fetchGames = async () => {
  loadingGames.value = true;
  try {
    const fetchedGames = await gameService.getGames();
    games.value = [...fetchedGames];
  } catch (err) {
    console.error("Erreur lors de la récupération des jeux:", err);
    showMessage("error", "Impossible de charger la liste des jeux");
  } finally {
    loadingGames.value = false;
    isInitialized.value = true;
  }
};

const isDuplicate = (): boolean => {
  return games.value.some(
    (existingGame) =>
      existingGame.name.toLowerCase() === game.value.name.toLowerCase()
  );
};

const showMessage = (
  type: "success" | "error",
  message: string,
  duration = 5000
) => {
  // Annuler les timeouts précédents pour éviter des comportements inattendus
  if (messageTimeout) {
    clearTimeout(messageTimeout);
  }

  if (type === "success") {
    success.value = message;
    error.value = null;
  } else {
    error.value = message;
    success.value = null;
  }

  // Stocker la référence du timeout pour pouvoir l'annuler si nécessaire
  messageTimeout = setTimeout(() => {
    success.value = null;
    error.value = null;
    messageTimeout = null;
  }, duration);
};
/**
 * Valider le formulaire de création de jeu
 * @returns {boolean} true si le formulaire est valide, sinon false
 */
const validateForm = (): boolean => {
  errors.value = {};

  if (!game.value.name.trim()) {
    errors.value.name = "Le nom du jeu est obligatoire";
    return false;
  }

  if (isDuplicate()) {
    errors.value.name = "Un jeu avec ce nom existe déjà";
    return false;
  }

  // Limiter la longueur du nom
  if (game.value.name.length > 50) {
    errors.value.name = "Le nom du jeu ne doit pas dépasser 50 caractères";
    return false;
  }

  // Limiter la longueur de la description
  if (game.value.description && game.value.description.length > 500) {
    errors.value.description =
      "La description ne doit pas dépasser 500 caractères";
    return false;
  }

  return true;
};

// Fonction pour afficher la confirmation de suppression
const confirmDelete = (gameToRemove: Game) => {
  gameToDelete.value = gameToRemove;
  deleteConfirmMessage.value = `Êtes-vous sûr de vouloir supprimer le jeu "${gameToRemove.name}" ? Cette action est irréversible.`;
  showDeleteConfirmation.value = true;
};

// Fonction pour annuler la suppression
const cancelDelete = () => {
  showDeleteConfirmation.value = false;
  gameToDelete.value = null;
};

// Fonction pour supprimer le jeu
const deleteGame = async () => {
  if (!gameToDelete.value?._id || isDeleting.value) return;

  isDeleting.value = true;

  try {
    await gameService.deleteGame(gameToDelete.value._id);

    // Mettre à jour la liste des jeux localement
    games.value = games.value.filter((g) => g._id !== gameToDelete.value?._id);

    showMessage(
      "success",
      `Le jeu "${gameToDelete.value.name}" a été supprimé avec succès!`
    );

    // Fermer le dialogue de confirmation
    showDeleteConfirmation.value = false;
  } catch (err) {
    console.error("Erreur lors de la suppression du jeu:", err);
    showMessage("error", "Impossible de supprimer le jeu. Veuillez réessayer.");
  } finally {
    isDeleting.value = false;
    gameToDelete.value = null;
  }
};

onUnmounted(() => {
  if (messageTimeout) {
    clearTimeout(messageTimeout);
  }
});

onMounted(() => {
  fetchGames();
});
</script>

<style scoped>
.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}
</style>
