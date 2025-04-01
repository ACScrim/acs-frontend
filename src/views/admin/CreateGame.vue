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
            >{{ isEditing ? "Modification" : "Création" }} d'un jeu</span
          >
        </h1>
        <div class="flex justify-center">
          <div
            class="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          ></div>
        </div>
      </div>

      <!-- Formulaire de création/modification de jeu -->
      <form
        @submit.prevent="isEditing ? updateGame() : createGame()"
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
              @input="searchRAWG"
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

        <!-- Résultats de recherche RAWG  -->
        <div
          v-if="searchResults.length > 0 && game.name.length >= 3"
          class="mb-6"
        >
          <div class="text-cyan-400 text-sm mb-2 font-orbitron">
            Jeux suggérés par RAWG - Cliquez pour sélectionner
          </div>
          <div
            class="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto p-2 bg-gray-900/30 rounded-md border border-cyan-500/20"
          >
            <div
              v-for="result in searchResults"
              :key="result.id"
              @click="selectGame(result)"
              class="cursor-pointer bg-gray-800/50 rounded-md overflow-hidden border border-cyan-500/30 hover:border-cyan-500/60 hover:shadow-md hover:shadow-cyan-500/20 transition-all duration-300"
            >
              <div class="h-28 overflow-hidden">
                <img
                  :src="result.background_image || '/placeholder-game.jpg'"
                  :alt="result.name"
                  class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div class="p-2">
                <div class="text-white text-sm font-orbitron">
                  {{ result.name }}
                </div>
                <div class="text-gray-300 text-xs mt-1">
                  {{
                    result.released
                      ? formatReleaseDate(result.released)
                      : "Date inconnue"
                  }}
                </div>
              </div>
            </div>
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

        <div class="mb-6">
          <label
            for="imageUrl"
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
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clip-rule="evenodd"
              />
            </svg>
            Image URL
          </label>
          <div class="relative">
            <input
              type="text"
              id="imageUrl"
              v-model="game.imageUrl"
              @input="validateImageUrl"
              class="w-full p-3 pl-4 text-white bg-gray-900/70 border border-cyan-500/50 rounded-md focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 font-orbitron"
              placeholder="URL de l'image du jeu (optionnel)"
            />
          </div>
          <div
            v-if="errors.imageUrl"
            class="text-red-400 text-sm mt-1 font-orbitron"
          >
            {{ errors.imageUrl }}
          </div>
        </div>

        <!-- Prévisualisation de l'image -->
        <div
          v-if="game.imageUrl"
          class="mb-6 border border-cyan-500/30 rounded-lg overflow-hidden"
        >
          <div class="relative">
            <img
              :src="game.imageUrl"
              :alt="game.name"
              class="w-full h-48 object-cover"
              @error="handleImageError"
            />
            <div
              v-if="imagePreviewError"
              class="absolute inset-0 bg-gray-900/80 flex items-center justify-center text-red-400 font-orbitron text-center p-4"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 mx-auto mb-2"
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
                <p>Erreur de chargement de l'image</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between">
          <!-- Bouton Annuler (apparaît uniquement en mode édition) -->
          <button
            v-if="isEditing"
            type="button"
            @click="cancelEdit"
            class="inline-flex items-center justify-center px-6 py-3 text-lg bg-gray-800 text-white font-orbitron font-bold rounded border border-gray-600 shadow-md hover:shadow-lg hover:bg-gray-700 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none"
          >
            <span>Annuler</span>
          </button>

          <!-- Spacer quand pas en mode édition -->
          <div v-else></div>

          <!-- Bouton Créer/Modifier -->
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
              isLoading
                ? isEditing
                  ? "Modification en cours..."
                  : "Création en cours..."
                : isEditing
                ? "Modifier le jeu"
                : "Créer le jeu"
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
            v-for="existingGame in games"
            :key="existingGame._id"
            class="bg-slate-800/60 rounded-lg overflow-hidden border border-purple-500/30 shadow-md transition-all duration-300 p-4 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-500/80 group relative"
          >
            <!-- Miniature du jeu -->
            <div
              class="aspect-video relative mb-3 overflow-hidden rounded bg-slate-900/80"
            >
              <img
                v-if="existingGame.imageUrl"
                :src="existingGame.imageUrl"
                :alt="existingGame.name"
                class="w-full h-full object-cover"
                @error="(e) => (e.target as HTMLElement).classList.add('hidden')"
              />
              <div
                v-if="!existingGame.imageUrl"
                class="absolute inset-0 flex items-center justify-center text-purple-300/50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                  />
                </svg>
              </div>
            </div>

            <!-- Actions (édition et suppression) -->
            <div class="absolute top-2 right-2 flex gap-2">
              <!-- Bouton d'édition -->
              <button
                @click="editGame(existingGame)"
                class="opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center rounded-full bg-blue-900/20 text-blue-400 border border-blue-500/30 hover:bg-blue-900/40 hover:text-blue-300 hover:border-blue-500/50 hover:shadow-md hover:shadow-blue-500/20 transition-all duration-300 transform group-hover:scale-100 scale-90"
                title="Modifier ce jeu"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>

              <!-- Bouton de suppression -->
              <button
                @click="confirmDelete(existingGame)"
                class="opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center rounded-full bg-red-900/20 text-red-400 border border-red-500/30 hover:bg-red-900/40 hover:text-red-300 hover:border-red-500/50 hover:shadow-md hover:shadow-red-500/20 transition-all duration-300 transform group-hover:scale-100 scale-90"
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
            </div>

            <!-- Nom du jeu (sans description) -->
            <div class="font-orbitron text-lg font-semibold text-gray-100 mb-2">
              {{ existingGame.name }}
            </div>
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
import { ref, onMounted, onUnmounted, watch } from "vue";

//-------------------------------------------------------
// SECTION: Imports
//-------------------------------------------------------

/**
 * Services et composants
 */
import gameService from "../../services/gameService";
import rawgService from "../../services/rawgService";
import Toast from "@/shared/Toast.vue";
import ConfirmationDialog from "@/shared/ConfirmationDialog.vue";

/**
 * Types
 */
import type { Game, RawgGame } from "../../types";

// Fonction de debounce native
function debounce(fn: Function, delay: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
      timeout = null;
    }, delay);
  };
}

//-------------------------------------------------------
// SECTION: État du composant
//-------------------------------------------------------

/**
 * Données du formulaire de création/édition
 */
const game = ref<Game>({
  name: "",
  description: "",
  imageUrl: "",
});

/**
 * États de l'interface
 */
const error = ref<string | null>(null); // Message d'erreur
const success = ref<string | null>(null); // Message de succès
const isLoading = ref(false); // État de chargement pour la création/édition
const loadingGames = ref(false); // État de chargement pour la liste
const errors = ref<Record<string, string>>({}); // Erreurs de validation par champ
const isInitialized = ref(false); // Indique si le composant est initialisé
const searchResults = ref<RawgGame[]>([]); // Résultats de recherche RAWG
const isSearching = ref(false); // État de chargement pour la recherche
const selectedRawgGame = ref<RawgGame | null>(null); // Jeu RAWG sélectionné
const imagePreviewError = ref(false); // Erreur lors du chargement de l'image

/**
 * États pour l'édition
 */
const isEditing = ref(false); // Mode édition activé
const editingId = ref<string | null>(null); // ID du jeu en cours d'édition
const originalGameData = ref<Game | null>(null); // Données originales du jeu pour annuler l'édition

/**
 * Gestion des messages toast
 */
let messageTimeout: ReturnType<typeof setTimeout> | null = null;
let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Liste des jeux existants
 */
const games = ref<Game[]>([]);

/**
 * États pour la suppression
 */
const gameToDelete = ref<Game | null>(null); // Jeu à supprimer
const showDeleteConfirmation = ref(false); // Afficher le dialogue de confirmation
const deleteConfirmMessage = ref(""); // Message de confirmation
const isDeleting = ref(false); // État de chargement pour la suppression

//-------------------------------------------------------
// SECTION: Méthodes pour RAWG
//-------------------------------------------------------

/**
 * Recherche de jeux via l'API RAWG
 * Utilise un debounce pour éviter trop de requêtes
 */
const searchRAWG = debounce(async () => {
  // Réinitialiser les résultats de recherche
  searchResults.value = [];

  // Ne rien faire si le nom est trop court
  if (!game.value.name || game.value.name.length < 3) {
    return;
  }

  isSearching.value = true;

  try {
    const results = await rawgService.searchGames(game.value.name);
    searchResults.value = results;
  } catch (err) {
    console.error("Erreur lors de la recherche RAWG:", err);
  } finally {
    isSearching.value = false;
  }
}, 500);

/**
 * Sélectionne un jeu RAWG et remplit les informations dans le formulaire
 * @param rawgGame - Jeu RAWG sélectionné
 */
const selectGame = async (rawgGame: RawgGame) => {
  try {
    // Récupérer plus de détails sur le jeu
    const gameDetails = await rawgService.getGameDetails(rawgGame.id);
    selectedRawgGame.value = gameDetails;

    // Mettre à jour le formulaire
    game.value.name = gameDetails.name;
    game.value.description = gameDetails.description_raw || rawgGame.name;
    game.value.imageUrl = gameDetails.background_image || "";

    // Réinitialiser les erreurs
    imagePreviewError.value = false;

    // Masquer les résultats après sélection
    searchResults.value = [];
  } catch (err) {
    console.error("Erreur lors de la récupération des détails du jeu:", err);
    showMessage("error", "Impossible de charger les détails du jeu");
  }
};

/**
 * Formate la date de sortie pour l'affichage
 * @param dateString - Date au format string
 * @returns Date formattée
 */
const formatReleaseDate = (dateString: string): string => {
  return rawgService.formatGameReleaseDate(dateString);
};

//-------------------------------------------------------
// SECTION: Validation des URLs
//-------------------------------------------------------

/**
 * Valide l'URL de l'image
 */
const validateImageUrl = () => {
  errors.value.imageUrl = "";
  imagePreviewError.value = false;

  if (!game.value.imageUrl) {
    return;
  }

  try {
    const url = new URL(game.value.imageUrl);

    // Vérifier si le protocole est HTTP ou HTTPS
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      errors.value.imageUrl = "L'URL doit commencer par http:// ou https://";
    }
  } catch (err) {
    errors.value.imageUrl = "URL invalide";
  }
};

/**
 * Gère l'erreur de chargement d'image
 */
const handleImageError = (event: Event) => {
  const target = event.target as HTMLElement;
  if (target) {
    target.classList.add("hidden");
  }
  imagePreviewError.value = true;
};

//-------------------------------------------------------
// SECTION: Gestion du formulaire
//-------------------------------------------------------

/**
 * Crée un nouveau jeu
 * - Valide le formulaire
 * - Envoie les données au service
 * - Gère les messages de succès/erreur
 */
const createGame = async () => {
  if (isLoading.value) return; // Empêcher les doubles clics
  if (!validateForm()) {
    return; // Arrêter si validation échoue
  }
  isLoading.value = true;

  try {
    await gameService.createGame(game.value);
    showMessage("success", "Jeu créé avec succès !");
    game.value = { name: "", description: "", imageUrl: "" }; // Reset form
    searchResults.value = [];
    selectedRawgGame.value = null;
    imagePreviewError.value = false;
    fetchGames(); // Rafraîchir la liste des jeux
  } catch (err) {
    console.error("Erreur lors de la création du jeu:", err);
    showMessage("error", "Erreur lors de la création du jeu !");
  } finally {
    isLoading.value = false;
  }
};

/**
 * Met à jour un jeu existant
 */
const updateGame = async () => {
  if (isLoading.value || !editingId.value) return;
  if (!validateForm(true)) {
    return;
  }

  isLoading.value = true;

  try {
    // Ajouter l'ID au jeu
    const gameToUpdate: Game = {
      ...game.value,
      _id: editingId.value,
    };

    // Utiliser directement gameToUpdate qui contient déjà l'ID
    await gameService.updateGame(gameToUpdate);
    showMessage("success", "Jeu modifié avec succès !");

    // Mettre à jour la liste des jeux
    fetchGames();

    // Réinitialiser le formulaire et le mode édition
    resetForm();
  } catch (err) {
    console.error("Erreur lors de la modification du jeu:", err);
    showMessage("error", "Erreur lors de la modification du jeu !");
  } finally {
    isLoading.value = false;
  }
};

/**
 * Valide le formulaire de création/édition de jeu
 * @param isEditMode - Indique si on est en mode édition
 * @returns {boolean} true si le formulaire est valide, sinon false
 */
const validateForm = (isEditMode = false): boolean => {
  errors.value = {};

  if (!game.value.name.trim()) {
    errors.value.name = "Le nom du jeu est obligatoire";
    return false;
  }

  // Vérifier les doublons uniquement en mode création
  if (!isEditMode && isDuplicate()) {
    errors.value.name = "Un jeu avec ce nom existe déjà";
    return false;
  }

  // Limiter la longueur du nom
  if (game.value.name.length > 50) {
    errors.value.name = "Le nom du jeu ne doit pas dépasser 50 caractères";
    return false;
  }

  // Limiter la longueur de la description
  if (game.value.description && game.value.description.length > 2000) {
    errors.value.description =
      "La description ne doit pas dépasser 2000 caractères";
    return false;
  }

  // Valider l'URL de l'image si elle est fournie
  if (game.value.imageUrl) {
    validateImageUrl();
    if (errors.value.imageUrl) {
      return false;
    }
  }

  return true;
};

/**
 * Vérifie si un jeu avec le même nom existe déjà
 * @returns {boolean} true si le nom est déjà utilisé
 */
const isDuplicate = (): boolean => {
  return games.value.some(
    (existingGame) =>
      existingGame.name.toLowerCase() === game.value.name.toLowerCase()
  );
};

/**
 * Passe en mode édition pour un jeu donné
 * @param gameToEdit - Jeu à modifier
 */
const editGame = (gameToEdit: Game) => {
  if (!gameToEdit._id) return;

  // Sauvegarder les données originales (pour l'annulation)
  originalGameData.value = { ...gameToEdit };

  // Passer en mode édition
  isEditing.value = true;
  editingId.value = gameToEdit._id;

  // Remplir le formulaire avec les données du jeu
  game.value = {
    name: gameToEdit.name,
    description: gameToEdit.description || "",
    imageUrl: gameToEdit.imageUrl || "",
  };

  // Réinitialiser les erreurs
  errors.value = {};
  imagePreviewError.value = false;

  // Faire défiler vers le formulaire
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/**
 * Annule l'édition et réinitialise le formulaire
 */
const cancelEdit = () => {
  resetForm();
  showMessage("info", "Modification annulée", 3000);
};

/**
 * Réinitialise le formulaire et les états d'édition
 */
const resetForm = () => {
  isEditing.value = false;
  editingId.value = null;
  originalGameData.value = null;
  game.value = { name: "", description: "", imageUrl: "" };
  searchResults.value = [];
  selectedRawgGame.value = null;
  errors.value = {};
  imagePreviewError.value = false;
};

//-------------------------------------------------------
// SECTION: Récupération des données
//-------------------------------------------------------

/**
 * Récupère la liste des jeux depuis l'API
 * Met à jour l'état de chargement et gère les erreurs
 */
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

//-------------------------------------------------------
// SECTION: Gestion des notifications
//-------------------------------------------------------

/**
 * Affiche un message toast temporaire
 * @param type - Type de notification ("success", "error" ou "info")
 * @param message - Contenu du message
 * @param duration - Durée d'affichage en millisecondes
 */
const showMessage = (
  type: "success" | "error" | "info",
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
  } else if (type === "error") {
    error.value = message;
    success.value = null;
  } else if (type === "info") {
    success.value = message;
    error.value = null;
  }

  // Stocker la référence du timeout pour pouvoir l'annuler si nécessaire
  messageTimeout = setTimeout(() => {
    success.value = null;
    error.value = null;
    messageTimeout = null;
  }, duration);
};

//-------------------------------------------------------
// SECTION: Gestion de la suppression
//-------------------------------------------------------

/**
 * Affiche le dialogue de confirmation de suppression
 * @param gameToRemove - Jeu à supprimer
 */
const confirmDelete = (gameToRemove: Game) => {
  gameToDelete.value = gameToRemove;
  deleteConfirmMessage.value = `Êtes-vous sûr de vouloir supprimer le jeu "${gameToRemove.name}" ? Cette action est irréversible.`;
  showDeleteConfirmation.value = true;
};

/**
 * Annule la suppression et ferme le dialogue de confirmation
 */
const cancelDelete = () => {
  showDeleteConfirmation.value = false;
  gameToDelete.value = null;
};

/**
 * Supprime un jeu après confirmation
 * - Effectue l'appel à l'API
 * - Met à jour la liste locale
 * - Affiche un message de confirmation
 */
const deleteGame = async () => {
  if (!gameToDelete.value?._id || isDeleting.value) return;

  isDeleting.value = true;

  try {
    await gameService.deleteGame(gameToDelete.value._id);

    // Mettre à jour la liste des jeux localement
    games.value = games.value.filter((g) => g._id !== gameToDelete.value?._id);

    // Si on était en train d'éditer ce jeu, réinitialiser le formulaire
    if (editingId.value === gameToDelete.value._id) {
      resetForm();
    }

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

//-------------------------------------------------------
// SECTION: Cycle de vie
//-------------------------------------------------------

/**
 * Réinitialise les erreurs d'image lorsque l'URL change
 */
watch(
  () => game.value.imageUrl,
  () => {
    imagePreviewError.value = false;
  }
);

/**
 * Nettoyage des ressources lors du démontage du composant
 * Évite les fuites de mémoire en annulant les timeouts
 */
onUnmounted(() => {
  if (messageTimeout) {
    clearTimeout(messageTimeout);
  }
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer);
  }
});

/**
 * Initialisation du composant au montage
 * Charge la liste des jeux existants
 */
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
