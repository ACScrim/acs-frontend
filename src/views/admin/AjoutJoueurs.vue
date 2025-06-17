<template>
  <div class="container mx-auto p-8 pt-20">
    <div class="max-w-2xl mx-auto">
      <!-- En-tête -->
      <SpaceHeader
        title="Ajout de joueurs"
        titleSize="3xl"
        :showMissionInfo="true"
        mission="CREWMATES-MGMT"
      >
        <template #badge v-if="players.length > 0">
          <SpaceBadge variant="secondary" size="lg">{{
            players.length
          }}</SpaceBadge>
        </template>
      </SpaceHeader>
      <!-- Formulaire d'ajout -->
      <SpaceCard
        variant="primary"
        :stars="true"
        :decorated="true"
        className="mb-8"
      >
        <form @submit.prevent="addPlayer" novalidate>
          <div class="mb-6">
            <label
              for="username"
              class="text-lg text-space-primary-light mb-2 font-nasa flex items-center"
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
              Nom du joueur <span class="text-space-accent ml-1">*</span>
            </label>
            <SpaceInput
              id="username"
              name="username"
              v-model="player.username"
              placeholder="Entrez le nom du joueur"
              required
              aria-required="true"
              :error="formErrors.username"
            >
            </SpaceInput>
            <div
              v-if="formErrors.username"
              class="text-space-error text-sm mt-1 font-mono"
            >
              {{ formErrors.username }}
            </div>
          </div>
          <div class="flex justify-center">
            <SpaceButton
              type="submit"
              variant="primary"
              size="lg"
              :loading="isLoading"
              :disabled="isLoading"
              className="w-full sm:w-auto px-8"
            >
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </template>
              Ajouter le joueur
            </SpaceButton>
          </div>
        </form>
      </SpaceCard>
      <!-- Notifications -->
      <SpaceAlert
        v-if="error"
        variant="error"
        :title="'Erreur'"
        dismissible
        className="mb-4"
      >
        {{ error }}
      </SpaceAlert>

      <SpaceAlert
        v-if="success"
        variant="success"
        :title="'Succès'"
        dismissible
        className="mb-4"
      >
        {{ success }}
      </SpaceAlert>

      <!-- Bouton pour afficher les joueurs existants -->
      <SpaceButton
        @click="togglePlayers"
        variant="secondary"
        size="md"
        className="w-full mb-8"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
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
        </template>
        {{
          showPlayers ? "Masquer les joueurs" : "Afficher les joueurs existants"
        }}
      </SpaceButton>
      <!-- Liste des joueurs existants -->
      <div
        v-if="showPlayers"
        class="transform transition-all duration-500 opacity-100 translate-y-0"
      >
        <SpaceCard variant="secondary" :stars="true" :decorated="true">
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-2 text-space-secondary-light"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                  />
                </svg>
                <SpaceTitle size="xl">Liste des joueurs</SpaceTitle>
              </div>
              <SpaceBadge variant="secondary" size="lg">{{
                players.length
              }}</SpaceBadge>
            </div>
          </template>

          <div v-if="isLoading" class="py-12 flex justify-center items-center">
            <SpaceLoader size="lg" text="Chargement des joueurs..." />
          </div>

          <div v-else-if="players.length > 0" class="space-y-3">
            <div
              v-for="player in players"
              :key="player._id"
              class="group bg-space-bg-light/30 backdrop-blur-sm rounded-lg p-3 border border-space-secondary/20 hover:border-space-secondary/50 transition-all duration-300 flex justify-between items-center relative overflow-hidden hover:shadow-glow-secondary"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-space-secondary/10 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none"
              ></div>
              <span class="text-space-text font-nasa z-10">{{
                player.username
              }}</span>
              <SpaceButton
                @click="player._id && confirmDelete(player._id)"
                variant="error"
                size="sm"
                className="rounded-full p-1"
                :title="'Supprimer ' + player.username"
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
              </SpaceButton>
            </div>
          </div>

          <SpaceTerminal
            v-else
            command="search --players"
            title="Recherche de joueurs"
            :showCursor="true"
          >
            <div class="text-space-text-muted">Aucun joueur n'a été trouvé</div>
          </SpaceTerminal>
        </SpaceCard>
      </div>
    </div>

    <!-- Dialogue de confirmation pour la suppression -->
    <SpaceModal
      v-model="showConfirmation"
      title="Confirmation de suppression"
      className="max-w-md"
    >
      <div class="text-space-text mb-6">
        Êtes-vous sûr de vouloir supprimer ce joueur ?
      </div>
      <template #footer>
        <div class="flex justify-end space-x-3">
          <SpaceButton
            @click="showConfirmation = false"
            variant="outline"
            size="sm"
          >
            Annuler
          </SpaceButton>
          <SpaceButton @click="deletePlayer" variant="error" size="sm">
            Supprimer
          </SpaceButton>
        </div>
      </template>
    </SpaceModal>
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
 * Composants UI
 */
// Composants Space UI
// Tous les composants Space UI sont enregistrés globalement, pas besoin d'import

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
/* Animation de balayage lumineux pour les éléments de la liste */
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
