<template>
  <div
    class="flex flex-col items-center justify-center min-h-[80vh] md:min-h-screen bg-neon-gradient"
  >
    <h1 class="text-3xl md:text-4xl text-white mb-8 neon-text">
      Création d'un jeu
    </h1>
    <form @submit.prevent="createGame" class="w-full max-w-lg px-4">
      <div class="mb-4 md:mb-6 form-group">
        <label for="name" class="block text-base md:text-lg text-white mb-2">
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
      <div class="mb-4 md:mb-6 form-group">
        <label
          for="description"
          class="block text-base md:text-lg text-white mb-2"
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
          class="px-4 py-2 md:px-6 md:py-3 text-base md:text-lg font-bold text-white bg-pink-500 rounded shadow neon-button hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer disabled:opacity-50"
        >
          {{ isLoading ? "Création en cours..." : "Créer" }}
        </button>
      </div>
    </form>
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import gameService from "../services/gameService";
import Toast from "@/shared/Toast.vue";

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
    showMessage("success", "Jeu créé avec succès !");
    game.value = { name: "", description: "" }; // Reset form
  } catch (err) {
    console.error("Erreur lors de la création du jeu:", err);
    showMessage("error", "Erreur lors de la création du jeu !");
  } finally {
    isLoading.value = false;
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
</script>

<style scoped></style>
