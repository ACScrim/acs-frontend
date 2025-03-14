<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen p-8 bg-neon-gradient"
  >
    <div v-if="isLoading" class="text-white mt-4">Chargement...</div>

    <h1 class="text-4xl text-white mb-8 neon-text">Ajout de joueurs</h1>
    <form @submit.prevent="addPlayer" class="w-full max-w-lg">
      <div class="mb-6 form-group">
        <label for="username" class="block text-lg text-white mb-2 neon-label">
          Nom du joueur <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="username"
          v-model="player.username"
          class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />
      </div>
      <div class="flex justify-center">
        <button
          type="submit"
          class="px-6 py-3 text-lg font-bold text-white bg-pink-500 rounded shadow neon-button hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          Ajouter
        </button>
      </div>
    </form>
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />
    <button
      @click="togglePlayers"
      class="mt-8 px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded shadow hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-pink-400 cursor-pointer"
    >
      {{
        showPlayers
          ? "Masquer les joueurs"
          : "Afficher les joueurs déjà présents"
      }}
    </button>
    <div v-if="showPlayers && players.length > 0" class="mt-8 w-full max-w-lg">
      <h2 class="text-2xl text-white mb-4">Liste des joueurs</h2>
      <ul class="bg-gray-800 rounded shadow p-4">
        <li
          v-for="player in players"
          :key="player._id"
          class="flex justify-between items-center mb-2 p-2 bg-gray-700 rounded"
        >
          <span class="text-white">{{ player.username }}</span>
          <button
            @click="player._id && confirmDelete(player._id)"
            class="text-red-500 hover:text-red-700"
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

interface Player {
  _id?: string;
  username: string;
}

const player = ref<Player>({
  username: "",
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
    player.value = { username: "" };
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
.bg-neon-gradient {
  background: linear-gradient(
    135deg,
    #0d0221 0%,
    #45125e 40%,
    #a22561 80%,
    #ff3864 100%
  );
}

.neon-text {
  font-family: "Streamster", cursive;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff,
    0 0 40px #ff00ff;
}

.neon-input {
  background: #1a1a1a;
  box-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff;
  transition: box-shadow 0.3s ease;
}

.neon-input:focus {
  outline: none;
  box-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff;
}

.neon-button {
  font-size: 1rem;
  background: #ff00ff;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.neon-button:hover {
  background: #e600e6;
  box-shadow: 0 0 20px #ff00ff, 0 0 30px #ff00ff;
}

.toast {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 10px, 0 0 20px;
}

.error-toast {
  background: #ff3864;
  color: white;
  box-shadow: 0 0 10px #ff3864, 0 0 20px #ff3864;
}

.success-toast {
  background: #28a745;
  color: white;
  box-shadow: 0 0 10px #28a745, 0 0 20px #28a745;
}
</style>
