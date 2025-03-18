<template>
  <div class="container mx-auto p-8 pt-20">
    <div class="max-w-2xl mx-auto">
      <!-- En-tête -->
      <div
        class="bg-black/50 backdrop-blur-xl rounded-lg p-8 mb-8 border border-pink-500 shadow-lg shadow-pink-500/30"
      >
        <h1 class="text-4xl text-white mb-4 neon-text text-center">
          Ajout de joueurs
        </h1>
        <div class="flex justify-center">
          <div
            class="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          ></div>
        </div>
      </div>

      <!-- Formulaire d'ajout -->
      <form
        @submit.prevent="addPlayer"
        class="bg-black/75 backdrop-blur-sm rounded-lg border border-cyan-500 shadow-lg shadow-cyan-500/30 p-8 mb-8"
      >
        <div class="mb-6">
          <label
            for="username"
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
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              />
            </svg>
            Nom du joueur <span class="text-pink-500 ml-1">*</span>
          </label>
          <div class="relative">
            <input
              type="text"
              id="username"
              v-model="player.username"
              class="w-full p-3 pl-4 text-white bg-gray-900/70 border border-cyan-500/50 rounded-md focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 font-orbitron"
              required
              placeholder="Entrez le nom du joueur"
            />
            <div class="input-glow"></div>
          </div>
        </div>
        <div class="flex justify-center">
          <button
            type="submit"
            class="neon-button-pink font-orbitron flex items-center"
            :disabled="isLoading"
          >
            <svg
              v-if="isLoading"
              class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
            <span v-else class="mr-2">+</span>
            Ajouter le joueur
          </button>
        </div>
      </form>

      <Toast v-if="error" type="error" :message="error" />
      <Toast v-if="success" type="success" :message="success" />

      <!-- Bouton pour afficher les joueurs existants -->
      <button
        @click="togglePlayers"
        class="neon-button-cyan w-full font-orbitron flex items-center justify-center mb-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            v-if="showPlayers"
            fill-rule="evenodd"
            d="M3.707 14.293a1 1 0 001.414 1.414l7-7a1 1 0 000-1.414l-7-7a1 1 0 00-1.414 1.414L10.586 8 3.707 14.879z"
            clip-rule="evenodd"
            transform="rotate(90 10 10)"
          />
          <path
            v-else
            fill-rule="evenodd"
            d="M3.707 14.293a1 1 0 001.414 1.414l7-7a1 1 0 000-1.414l-7-7a1 1 0 00-1.414 1.414L10.586 8 3.707 14.879z"
            clip-rule="evenodd"
            transform="rotate(-90 10 10)"
          />
        </svg>
        {{
          showPlayers ? "Masquer les joueurs" : "Afficher les joueurs existants"
        }}
      </button>

      <!-- Liste des joueurs existants -->
      <div v-if="showPlayers" class="player-list-container">
        <div v-if="isLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <p class="text-cyan-400 mt-4 font-orbitron">
            Chargement des joueurs...
          </p>
        </div>

        <div
          v-else-if="players.length > 0"
          class="bg-black/75 backdrop-blur-sm rounded-lg border border-purple-500 shadow-lg shadow-purple-500/30 p-6"
        >
          <h2 class="text-2xl text-white mb-6 font-audiowide flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2 text-purple-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
              />
            </svg>
            Liste des joueurs
          </h2>

          <ul class="space-y-3">
            <li
              v-for="player in players"
              :key="player._id"
              class="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 flex justify-between items-center player-item"
            >
              <span class="text-white font-orbitron player-name">{{
                player.username
              }}</span>
              <button
                @click="player._id && confirmDelete(player._id)"
                class="delete-button"
                aria-label="Supprimer le joueur"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>

        <div
          v-else
          class="bg-black/75 backdrop-blur-sm rounded-lg border border-yellow-500 shadow-lg shadow-yellow-500/30 p-6 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 mx-auto text-yellow-400 mb-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="text-yellow-400 font-orbitron">
            Aucun joueur n'a été trouvé
          </p>
        </div>
      </div>
    </div>

    <!-- Dialogue de confirmation pour la suppression -->
    <ConfirmationDialog
      v-if="showConfirmation"
      :title="'Confirmation de suppression'"
      :message="'Êtes-vous sûr de vouloir supprimer ce joueur ?'"
      @confirm="deletePlayer"
      @cancel="showConfirmation = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import playerService from "../services/playerService";
import ConfirmationDialog from "../shared/ConfirmationDialog.vue";
import Toast from "@/shared/Toast.vue";
import type { Player } from "../services/playerService";

const player = ref<Player>({
  username: "",
  userId: "",
});

const error = ref<string | null>(null);
const success = ref<string | null>(null);
const players = ref<Player[]>([]);
const showPlayers = ref(false);
const showConfirmation = ref(false);
const playerIdToDelete = ref<string | null>(null);
const isLoading = ref(false);

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

const addPlayer = async () => {
  try {
    await playerService.addPlayer(player.value);
    showMessage("success", "Joueur ajouté avec succès !");
    player.value = { username: "", userId: "" };
    fetchPlayers();
  } catch (err) {
    console.error("Erreur lors de l'ajout du joueur:", err);
    showMessage(
      "error",
      (err as any).response?.data?.message || "Erreur inconnue."
    );
  }
};

const fetchPlayers = async () => {
  isLoading.value = true;
  try {
    players.value = await playerService.getPlayers();
    error.value = null;
  } catch (err) {
    console.error("Erreur lors de la récupération des joueurs:", err);
    showMessage(
      "error",
      (err as any).response?.data?.message ||
        "Erreur lors de la récupération des joueurs."
    );
  } finally {
    isLoading.value = false;
  }
};

const togglePlayers = async () => {
  if (!showPlayers.value && players.value.length === 0) {
    await fetchPlayers();
  }
  showPlayers.value = !showPlayers.value;
};

const confirmDelete = (id: string) => {
  playerIdToDelete.value = id;
  showConfirmation.value = true;
};

const deletePlayer = async () => {
  if (!playerIdToDelete.value) return;

  try {
    await playerService.deletePlayer(playerIdToDelete.value);
    showMessage("success", "Joueur supprimé avec succès !");
    fetchPlayers(); // Refresh the player list
  } catch (err) {
    showMessage(
      "error",
      (err as any).response?.data?.message || "Erreur inconnue."
    );
    success.value = null;
  } finally {
    showConfirmation.value = false;
    playerIdToDelete.value = null;
  }
};
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
  padding: 0.75rem 1.5rem;
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

.neon-button-cyan {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(to right, #0e7490, #06b6d4);
  color: white;
  font-weight: bold;
  border: 1px solid #06b6d4;
  border-radius: 4px;
  box-shadow: 0 0 5px #06b6d4, inset 0 0 5px #06b6d4;
  transition: all 0.3s ease;
}

.neon-button-cyan:hover {
  background: linear-gradient(to right, #06b6d4, #22d3ee);
  box-shadow: 0 0 10px #06b6d4, inset 0 0 10px #06b6d4;
  transform: translateY(-2px);
}

/* Effet glow pour l'input */
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

input:focus + .input-glow {
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.7);
}

/* Liste des joueurs */
.player-list-container {
  animation: fadeIn 0.5s ease-out;
}

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

.player-item {
  position: relative;
  overflow: hidden;
}

.player-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(139, 92, 246, 0.1),
    transparent
  );
  transition: left 0.7s ease;
  z-index: 0;
}

.player-item:hover::before {
  left: 100%;
}

.player-name {
  position: relative;
  z-index: 1;
}

/* Bouton supprimer */
.delete-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(220, 38, 38, 0.1);
  color: #ef4444;
  transition: all 0.3s ease;
  border: 1px solid rgba(220, 38, 38, 0.3);
}

.delete-button:hover {
  background: rgba(220, 38, 38, 0.2);
  color: #f87171;
  box-shadow: 0 0 10px rgba(220, 38, 38, 0.5);
  transform: scale(1.1);
}

/* Animation de chargement */
.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid rgba(6, 182, 212, 0.1);
  border-top-color: #06b6d4;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
