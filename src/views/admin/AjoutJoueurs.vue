<template>
  <div class="container mx-auto p-8 pt-20">
    <div class="max-w-2xl mx-auto">
      <!-- En-tête -->
      <div
        class="bg-black/50 backdrop-blur-xl rounded-lg p-8 mb-8 border border-pink-500 shadow-lg shadow-pink-500/30"
      >
        <h1
          class="text-4xl text-white mb-4 font-audiowide text-center neon-text"
        >
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
        novalidate
      >
        <div class="mb-6">
          <label
            for="username"
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
              name="username"
              v-model="player.username"
              class="w-full p-3 pl-4 text-white bg-gray-900/70 border border-cyan-500/50 rounded-md focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 font-orbitron"
              required
              aria-required="true"
              placeholder="Entrez le nom du joueur"
            />
          </div>
          <div
            v-if="formErrors.username"
            class="text-red-400 text-sm mt-1 font-orbitron"
          >
            {{ formErrors.username }}
          </div>
        </div>
        <div class="flex justify-center">
          <button
            type="submit"
            class="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-800 to-purple-600 text-white font-orbitron font-bold rounded border border-pink-500 shadow-md hover:shadow-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            :disabled="isLoading"
            :class="{ 'opacity-70 cursor-not-allowed': isLoading }"
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
        class="w-full flex items-center justify-center px-6 py-3 mb-8 bg-gradient-to-r from-cyan-800 to-cyan-600 text-white font-orbitron font-bold rounded border border-cyan-500 shadow-md hover:shadow-lg hover:bg-gradient-to-r hover:from-cyan-600 hover:to-cyan-500 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900"
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
      <div
        v-if="showPlayers"
        class="transform transition-all duration-500 opacity-100 translate-y-0"
      >
        <div
          v-if="isLoading"
          class="flex flex-col justify-center items-center p-12 bg-black/50 rounded-lg"
        >
          <div
            class="w-10 h-10 border-4 border-cyan-500/10 border-t-cyan-500 rounded-full animate-spin"
          ></div>
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
              class="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 flex justify-between items-center group relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none"
              ></div>
              <span class="text-white font-orbitron z-10">{{
                player.username
              }}</span>
              <button
                @click="player._id && confirmDelete(player._id)"
                class="flex items-center justify-center w-8 h-8 rounded-full bg-red-900/20 text-red-400 border border-red-500/30 hover:bg-red-900/40 hover:text-red-300 hover:border-red-500/50 hover:shadow-md hover:shadow-red-500/20 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                aria-label="Supprimer le joueur"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
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
import { ref, onMounted } from "vue";

//-------------------------------------------------------
// SECTION: Imports
//-------------------------------------------------------

/**
 * Services pour l'accès aux données
 */
import playerService from "../../services/playerService";

/**
 * Composants UI réutilisables
 */
import ConfirmationDialog from "../../shared/ConfirmationDialog.vue";
import Toast from "@/shared/Toast.vue";

/**
 * Types pour le typage fort
 */
import type { Player } from "../../types";

//-------------------------------------------------------
// SECTION: État du composant
//-------------------------------------------------------

/**
 * Données du formulaire
 */
const player = ref<Player>({
  username: "",
  userId: "",
});

/**
 * États pour l'interface utilisateur
 */
const error = ref<string | null>(null); // Message d'erreur
const success = ref<string | null>(null); // Message de succès
const isLoading = ref(false); // État de chargement
const showPlayers = ref(false); // Affichage de la liste des joueurs
const showConfirmation = ref(false); // Affichage du dialogue de confirmation
const formErrors = ref<Record<string, string>>({}); // Erreurs de validation par champ

/**
 * État de l'application
 */
const players = ref<Player[]>([]); // Liste des joueurs récupérés
const playerIdToDelete = ref<string | null>(null); // ID du joueur à supprimer

//-------------------------------------------------------
// SECTION: Gestion des notifications
//-------------------------------------------------------

/**
 * Affiche un message toast temporaire
 * @param type - Type de notification ("success" ou "error")
 * @param message - Contenu du message
 * @param duration - Durée d'affichage en millisecondes
 */
const showMessage = (
  type: "success" | "error",
  message: string,
  duration = 3000
) => {
  if (type === "success") {
    success.value = message;
    error.value = null;
  } else {
    error.value = message;
    success.value = null;
  }

  if (duration > 0) {
    setTimeout(() => {
      if (type === "success") success.value = null;
      else error.value = null;
    }, duration);
  }
};

/**
 * Traite les erreurs d'API de manière uniforme
 * Extrait le message d'erreur si disponible et affiche une notification
 * @param err - Erreur capturée
 * @param defaultMessage - Message par défaut si aucun détail n'est disponible
 */
const handleApiError = (
  err: unknown,
  defaultMessage = "Une erreur est survenue"
) => {
  console.error("Erreur API:", err);
  const errorMessage =
    (err as any)?.response?.data?.message ||
    (err instanceof Error ? err.message : defaultMessage);
  showMessage("error", errorMessage);
};

//-------------------------------------------------------
// SECTION: Validation du formulaire
//-------------------------------------------------------

/**
 * Valide le formulaire d'ajout de joueur
 * @returns true si le formulaire est valide, false sinon
 */
const validateForm = (): boolean => {
  formErrors.value = {};

  if (!player.value.username.trim()) {
    formErrors.value.username = "Le nom du joueur est obligatoire";
    return false;
  }

  return true;
};

//-------------------------------------------------------
// SECTION: Opérations CRUD sur les joueurs
//-------------------------------------------------------

/**
 * Ajoute un nouveau joueur à la base de données
 * Valide le formulaire, envoie les données et gère les messages
 */
const addPlayer = async () => {
  if (!validateForm()) return;
  if (isLoading.value) return; // Prévenir les soumissions multiples

  // Validation préalable
  if (!player.value.username.trim()) {
    showMessage("error", "Veuillez entrer un nom de joueur valide");
    return;
  }

  isLoading.value = true;

  try {
    await playerService.addPlayer(player.value);
    showMessage("success", "Joueur ajouté avec succès !");
    player.value = { username: "", userId: "" };

    // Si les joueurs sont déjà affichés, rafraîchir la liste
    if (showPlayers.value) {
      await fetchPlayers();
    }
  } catch (err) {
    handleApiError(err, "Erreur lors de l'ajout du joueur");
  } finally {
    isLoading.value = false;
  }
};

/**
 * Récupère la liste des joueurs depuis l'API
 * Met à jour l'état de chargement et gère les erreurs
 */
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

/**
 * Supprime un joueur après confirmation
 * Met à jour la liste des joueurs et affiche un message de confirmation
 */
const deletePlayer = async () => {
  if (!playerIdToDelete.value) return;

  try {
    await playerService.deletePlayer(playerIdToDelete.value);
    showMessage("success", "Joueur supprimé avec succès !");
    fetchPlayers(); // Rafraîchit la liste des joueurs
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

//-------------------------------------------------------
// SECTION: Gestion de l'interface
//-------------------------------------------------------

/**
 * Bascule l'affichage de la liste des joueurs
 * Charge les joueurs si ce n'est pas déjà fait
 */
const togglePlayers = async () => {
  if (!showPlayers.value && players.value.length === 0) {
    await fetchPlayers();
  }
  showPlayers.value = !showPlayers.value;
};

/**
 * Affiche le dialogue de confirmation de suppression
 * @param id - ID du joueur à supprimer
 */
const confirmDelete = (id: string) => {
  playerIdToDelete.value = id;
  showConfirmation.value = true;
};

//-------------------------------------------------------
// SECTION: Cycle de vie
//-------------------------------------------------------

/**
 * Initialisation du composant au montage
 * Précharge la liste des joueurs pour améliorer la réactivité
 */
onMounted(() => {
  // Pré-charger les joueurs si nécessaire, mais de façon non bloquante
  if (players.value.length === 0) {
    fetchPlayers();
  }
});
</script>

<style scoped>
.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

.font-audiowide {
  font-family: "Audiowide", cursive;
}
/* Animation de scintillement pour les éléments de la liste */
@keyframes shine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shine {
  animation: shine 1.5s infinite;
}
</style>
