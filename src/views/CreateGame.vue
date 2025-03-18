<template>
  <div class="container mx-auto p-8 pt-20">
    <div class="max-w-2xl mx-auto">
      <!-- En-tête -->
      <div
        class="bg-black/50 backdrop-blur-xl rounded-lg p-8 mb-8 border border-pink-500 shadow-lg shadow-pink-500/30"
      >
        <h1 class="text-4xl text-white mb-4 neon-text text-center">
          Création d'un jeu
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
            class="block text-lg text-cyan-400 mb-2 font-orbitron flex items-center"
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
            <div class="input-glow"></div>
          </div>
        </div>

        <div class="mb-6">
          <label
            for="description"
            class="block text-lg text-cyan-400 mb-2 font-orbitron flex items-center"
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
            <div class="input-glow"></div>
          </div>
        </div>

        <div class="flex justify-center">
          <button
            type="submit"
            class="neon-button-pink font-orbitron flex items-center px-8 py-3 text-lg"
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

      <!-- Liste des jeux existants (à ajouter si nécessaire) -->
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

        <div class="game-grid" v-if="games.length > 0">
          <div v-for="game in games" :key="game._id" class="game-card">
            <div class="game-card-title">{{ game.name }}</div>
            <p class="game-card-description">
              {{ game.description || "Aucune description" }}
            </p>
          </div>
        </div>

        <div v-else-if="loadingGames" class="loading-container">
          <div class="loading-spinner"></div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import gameService from "../services/gameService";
import Toast from "@/shared/Toast.vue";

interface Game {
  _id?: string;
  name: string;
  description?: string;
}

const game = ref<Game>({
  name: "",
  description: "",
});

const error = ref<string | null>(null);
const success = ref<string | null>(null);
const isLoading = ref(false);
const games = ref<Game[]>([]);
const loadingGames = ref(false);

const createGame = async () => {
  if (isLoading.value) return; // Empêcher les doubles clics
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
    games.value = await gameService.getGames();
  } catch (err) {
    console.error("Erreur lors de la récupération des jeux:", err);
  } finally {
    loadingGames.value = false;
  }
};

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
  }, 5000);
};

onMounted(() => {
  fetchGames();
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Audiowide&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap");

.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

.neon-text {
  font-family: "Audiowide", cursive;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff,
    0 0 40px #ff00ff;
}

/* Style des boutons */
.neon-button-pink {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #4a0072, #9900ff);
  color: white;
  font-weight: bold;
  border: 1px solid #ec4899;
  border-radius: 4px;
  box-shadow: 0 0 5px #ec4899, inset 0 0 5px #ec4899;
  transition: all 0.3s ease;
}

.neon-button-pink:hover {
  background: linear-gradient(to right, #9900ff, #ff00ff);
  box-shadow: 0 0 10px #ec4899, inset 0 0 10px #ec4899;
  transform: translateY(-2px);
}

.neon-button-pink:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Effet glow pour les inputs */
.input-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
}

input:focus + .input-glow,
textarea:focus + .input-glow {
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.7);
}

/* Animation de chargement */
.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid rgba(139, 92, 246, 0.1);
  border-top-color: #8b5cf6;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Grille de jeux */
.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.game-card {
  background: rgba(30, 41, 59, 0.6);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  padding: 16px;
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(139, 92, 246, 0.2);
  border-color: rgba(139, 92, 246, 0.8);
}

.game-card-title {
  font-family: "Orbitron", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #f3f4f6;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(139, 92, 246, 0.3);
}

.game-card-description {
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.5;
}
</style>
