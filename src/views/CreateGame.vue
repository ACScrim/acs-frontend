<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-neon-gradient"
  >
    <h1 class="text-4xl text-white mb-8 neon-text">Création d'un jeu</h1>
    <form @submit.prevent="createGame" class="w-full max-w-lg">
      <div class="mb-6 form-group">
        <label for="name" class="block text-lg text-white mb-2">
          Nom du jeu <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          v-model="game.name"
          class="w-full p-3 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
          aria-required="true"
        />
      </div>
      <div class="mb-6 form-group">
        <label for="description" class="block text-lg text-white mb-2"
          >Description</label
        >
        <textarea
          id="description"
          v-model="game.description"
          class="w-full p-1 text-white bg-gray-800 border-none rounded shadow neon-input focus:outline-none focus:ring-2 focus:ring-pink-500"
        ></textarea>
      </div>
      <div class="flex justify-center">
        <button
          type="submit"
          :disabled="isLoading"
          class="px-6 py-3 text-lg font-bold text-white bg-pink-500 rounded shadow neon-button hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer disabled:opacity-50"
        >
          {{ isLoading ? "Création en cours..." : "Créer" }}
        </button>
      </div>
    </form>
    <div
      v-if="error || success"
      class="mt-4 p-4 rounded shadow"
      :class="{
        'bg-red-500 error-toast': error,
        'bg-green-500 success-toast': success,
      }"
    >
      {{ error || success }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import gameService from "../services/gameService";

interface Game {
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

const createGame = async () => {
  if (isLoading.value) return; // Empêcher les doubles clics
  isLoading.value = true;

  try {
    await gameService.createGame(game.value);
    success.value = "Jeu créé avec succès !";
    game.value = { name: "", description: "" }; // Reset form
    error.value = null;
  } catch (err) {
    console.error("Erreur lors de la création du jeu:", err);
    error.value =
      (err as any).response?.data?.message ||
      "Erreur lors de la création du jeu.";
    success.value = null;
  } finally {
    isLoading.value = false;
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
