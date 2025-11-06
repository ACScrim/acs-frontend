<template>
  <div class="container mx-auto p-8 pt-20">
    <div class="max-w-2xl mx-auto">
      <!-- En-tête -->
      <SpaceHeader
        :title="isEditing ? 'Modification d\'un jeu' : 'Création d\'un jeu'"
        titleSize="3xl"
        :showMissionInfo="true"
        mission="GAMES-MGMT"
      >
        <template #badge v-if="games.length > 0">
          <SpaceBadge variant="primary" size="lg">{{
            games.length
          }}</SpaceBadge>
        </template>
      </SpaceHeader>

      <!-- Formulaire de création/modification de jeu -->
      <SpaceCard
        variant="primary"
        :stars="true"
        :decorated="true"
        className="mb-8"
      >
        <form @submit.prevent="isEditing ? updateGame() : createGame()">
          <div class="mb-6">
            <label
              for="name"
              class="text-lg text-space-primary-light mb-2 font-nasa flex items-center"
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
              Nom du jeu <span class="text-space-accent ml-1">*</span>
            </label>
            <SpaceInput
              id="name"
              name="name"
              v-model="game.name"
              @input="searchRAWG"
              placeholder="Entrez le nom du jeu"
              required
              :error="errors.name"
            >
            </SpaceInput>
          </div>

          <!-- Résultats de recherche RAWG -->
          <div
            v-if="searchResults.length > 0 && game.name.length >= 3"
            class="mb-6"
          >
            <div class="text-space-primary-light text-sm mb-2 font-nasa">
              Jeux suggérés par RAWG - Cliquez pour sélectionner
            </div>
            <div
              class="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto p-2 bg-space-bg-light/30 rounded-md border border-space-primary/20"
            >
              <div
                v-for="result in searchResults"
                :key="result.id"
                @click="selectGame(result)"
                class="cursor-pointer bg-space-bg-light/50 rounded-md overflow-hidden border border-space-primary/30 hover:border-space-primary/60 hover:shadow-md hover:shadow-space-primary/20 transition-all duration-300 group"
              >
                <div class="h-28 overflow-hidden relative">
                  <img
                    :src="result.background_image || '/placeholder-game.jpg'"
                    :alt="result.name"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-space-bg/80 to-transparent"
                  ></div>
                </div>
                <div class="p-2">
                  <div class="text-space-primary-light text-sm font-nasa">
                    {{ result.name }}
                  </div>
                  <div class="text-space-text-muted text-xs mt-1">
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
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z"
                  clip-rule="evenodd"
                />
              </svg>
              Description
            </label>
            <SpaceInput
              id="description"
              v-model="game.description"
              type="textarea"
              placeholder="Entrez une description du jeu (optionnel)"
              :rows="4"
              :error="errors.description"
              maxlength="200"
            >
            </SpaceInput>
          </div>

          <div class="mb-6">
            <label
              for="imageUrl"
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
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clip-rule="evenodd"
                />
              </svg>
              Image URL
            </label>
            <SpaceInput
              id="imageUrl"
              v-model="game.imageUrl"
              @input="validateImageUrl"
              placeholder="URL de l'image du jeu (optionnel)"
              :error="errors.imageUrl"
            >
            </SpaceInput>
          </div>

          <!-- Prévisualisation de l'image -->
          <div
            v-if="game.imageUrl"
            class="mb-6 border border-space-primary/30 rounded-lg overflow-hidden bg-space-bg-light/10"
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
                class="absolute inset-0 bg-space-bg/80 flex items-center justify-center text-space-error font-nasa text-center p-4"
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

          <div class="mb-6">
            <label
              for="roles"
              class="text-lg text-space-primary-light mb-3 font-nasa flex items-center"
            >
              <div
                class="relative w-8 h-8 mr-3 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-space-primary-light z-10"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
                  />
                </svg>
                <div
                  class="absolute inset-0 bg-space-primary/20 rounded-full blur-[6px]"
                ></div>
              </div>
              <span>Rôles disponibles pour ce jeu</span>
            </label>

            <!-- Liste des rôles existants -->
            <SpaceCard
              variant="secondary"
              className="mb-4 p-4"
              :noPadding="false"
            >
              <div
                v-if="game.roles && game.roles.length > 0"
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
              >
                <div
                  v-for="(role, index) in game.roles"
                  :key="index"
                  class="bg-space-bg-light/30 rounded-md transition-all duration-300 group relative overflow-hidden min-h-[4rem] flex flex-col justify-between p-3"
                  :style="{
                    borderColor: `${role.color}50`,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                  }"
                >
                  <!-- Effet de surbrillance au survol -->
                  <div
                    class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    :style="{
                      background: `linear-gradient(90deg, ${role.color}05, ${role.color}15, ${role.color}05)`,
                    }"
                  ></div>

                  <!-- Nom du rôle avec indicateur de couleur -->
                  <div class="flex items-center z-10 mb-2">
                    <div
                      class="w-4 h-4 rounded-full mr-3 shadow-glow transition-all duration-300 group-hover:scale-110 flex-shrink-0"
                      :style="{
                        backgroundColor: role.color || '#6B7280',
                        boxShadow: `0 0 6px ${role.color}`,
                      }"
                    ></div>
                    <span
                      class="text-space-text font-medium font-nasa truncate"
                      >{{ role.name }}</span
                    >
                  </div>

                  <!-- Boutons d'action -->
                  <div class="flex justify-end space-x-1 z-10">
                    <SpaceButton
                      @click.prevent="editRole(index)"
                      variant="secondary"
                      size="xs"
                      className="p-1.5 flex-shrink-0"
                      :title="'Modifier ' + role.name"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                        />
                      </svg>
                    </SpaceButton>
                    <SpaceButton
                      @click.prevent="removeRole(index)"
                      variant="error"
                      size="xs"
                      className="p-1.5 flex-shrink-0"
                      :title="'Supprimer ' + role.name"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </SpaceButton>
                  </div>
                </div>
              </div>

              <SpaceTerminal
                v-else
                command="search --game-roles"
                title="Recherche de rôles"
                :showCursor="true"
              >
                <div class="text-space-text-muted">
                  Aucun rôle défini pour ce jeu. Ajoutez des rôles pour
                  permettre aux joueurs de spécifier leurs positions préférées.
                </div>
              </SpaceTerminal>
            </SpaceCard>

            <!-- Formulaire d'ajout de rôle -->
            <SpaceCard
              :variant="editingRoleIndex !== null ? 'accent' : 'dark'"
              className="p-4"
              :noPadding="false"
            >
              <template #header>
                <div class="flex items-center">
                  <span
                    class="w-1 h-6 bg-gradient-to-b from-space-primary to-space-accent rounded-full mr-3"
                  ></span>
                  <SpaceTitle
                    size="sm"
                    :className="
                      editingRoleIndex !== null
                        ? 'text-space-accent-light'
                        : 'text-space-primary-light'
                    "
                  >
                    {{
                      editingRoleIndex !== null
                        ? "Modifier le rôle"
                        : "Ajouter un rôle"
                    }}
                  </SpaceTitle>
                </div>
              </template>

              <div class="flex items-center space-x-3 mb-4 relative z-10">
                <div class="flex-grow">
                  <SpaceInput
                    v-model="newRole.name"
                    placeholder="Nom du rôle (Ex: Support, Tank, DPS)"
                  >
                  </SpaceInput>
                </div>
                <div class="relative w-20 h-10 flex-shrink-0">
                  <input
                    v-model="newRole.color"
                    type="color"
                    class="absolute inset-0 opacity-0 cursor-pointer z-10"
                    title="Choisir une couleur"
                  />
                  <div
                    class="h-full w-full rounded-md border overflow-hidden"
                    :style="{
                      borderColor: `${newRole.color}80`,
                      background: `linear-gradient(to right, #000 0%, ${newRole.color} 100%)`,
                    }"
                  >
                    <div
                      class="bg-black/50 text-xs text-white font-nasa py-3 px-2 text-center"
                    >
                      Couleur
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-end space-x-3 relative z-10">
                <SpaceButton
                  v-if="editingRoleIndex !== null"
                  @click.prevent="cancelEditRole"
                  variant="outline"
                  size="sm"
                >
                  <template #icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </template>
                  Annuler
                </SpaceButton>
                <SpaceButton
                  @click.prevent="addOrUpdateRole"
                  :variant="editingRoleIndex !== null ? 'accent' : 'primary'"
                  size="sm"
                >
                  <template #icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
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
                  {{ editingRoleIndex !== null ? "Mettre à jour" : "Ajouter" }}
                </SpaceButton>
              </div>
            </SpaceCard>
          </div>

          <div class="flex justify-between">
            <!-- Bouton Annuler (apparaît uniquement en mode édition) -->
            <SpaceButton
              v-if="isEditing"
              @click="cancelEdit"
              variant="outline"
              size="lg"
            >
              Annuler
            </SpaceButton>

            <!-- Spacer quand pas en mode édition -->
            <div v-else></div>

            <!-- Bouton Créer/Modifier -->
            <SpaceButton
              type="submit"
              :variant="isEditing ? 'accent' : 'primary'"
              size="lg"
              :loading="isLoading"
              :disabled="isLoading"
            >
              {{ isEditing ? "Modifier le jeu" : "Créer le jeu" }}
            </SpaceButton>
          </div>
        </form>
      </SpaceCard>
      <!-- Notifications -->
      <Toast v-if="error" type="error" :message="error" />
      <Toast v-if="success" type="success" :message="success" />

      <!-- Liste des jeux existants -->
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
                  d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                />
              </svg>
              <SpaceTitle size="xl">Jeux disponibles</SpaceTitle>
            </div>
            <SpaceBadge variant="secondary" size="lg" v-if="games.length > 0">{{
              games.length
            }}</SpaceBadge>
          </div>
        </template>

        <div v-if="loadingGames" class="py-12 flex justify-center items-center">
          <SpaceLoader size="lg" text="Chargement des jeux..." />
        </div>

        <div
          v-else-if="games.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div
            v-for="existingGame in games"
            :key="existingGame._id"
            class="group bg-space-bg-light/30 backdrop-blur-sm rounded-lg p-4 border border-space-secondary/20 hover:border-space-secondary/50 transition-all duration-300 relative overflow-hidden hover:shadow-glow-secondary"
          >
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-space-secondary/10 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none"
            ></div>

            <!-- Miniature du jeu -->
            <div
              class="aspect-video relative mb-3 overflow-hidden rounded bg-space-bg-light/50"
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
                class="absolute inset-0 flex items-center justify-center text-space-primary-light/30"
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
                    d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                  />
                </svg>
              </div>
            </div>

            <!-- Nom du jeu -->
            <div
              class="font-nasa text-lg font-semibold text-space-text mb-2 z-10 relative"
            >
              {{ existingGame.name }}
            </div>

            <!-- Actions (édition et suppression) -->
            <div class="flex justify-end gap-2 mt-2 z-10 relative">
              <SpaceButton
                @click="editGame(existingGame)"
                variant="secondary"
                size="sm"
                className="p-1.5"
                :title="'Modifier ' + existingGame.name"
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
              </SpaceButton>
              <SpaceButton
                @click="confirmDelete(existingGame)"
                variant="error"
                size="sm"
                className="p-1.5"
                :title="'Supprimer ' + existingGame.name"
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
              </SpaceButton>
            </div>
          </div>
        </div>

        <SpaceTerminal
          v-else
          command="list --games"
          title="Liste des jeux"
          :showCursor="true"
        >
          <div class="text-space-text-muted">
            Aucun jeu disponible pour le moment
          </div>
        </SpaceTerminal>
      </SpaceCard>
    </div>

    <!-- Dialogue de confirmation pour la suppression -->
    <SpaceModal
      v-model="showDeleteConfirmation"
      title="Confirmation de suppression"
      className="max-w-md"
    >
      <div class="text-space-text mb-6">
        {{ deleteConfirmMessage }}
      </div>
      <template #footer>
        <div class="flex justify-end space-x-3">
          <SpaceButton @click="cancelDelete" variant="outline" size="sm">
            Annuler
          </SpaceButton>
          <SpaceButton
            @click="deleteGame"
            variant="error"
            size="sm"
            :loading="isDeleting"
          >
            Supprimer
          </SpaceButton>
        </div>
      </template>
    </SpaceModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";

//-------------------------------------------------------
// SECTION: Imports
//-------------------------------------------------------

/**
 * Services pour l'accès aux données
 */
import gameService from "../../services/gameService";
import rawgService from "../../services/rawgService";
import Toast from "../../shared/Toast.vue";

/**
 * Composants UI
 */
// Composants Space UI
// Tous les composants Space UI sont enregistrés globalement, pas besoin d'import

/**
 * Types pour le typage fort
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
  roles: [], // Initialisation comme tableau vide
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
 * État pour l'ajout/édition de rôle
 */
const newRole = ref({
  name: "",
  color: "#6B7280", // Gris par défaut
});
const editingRoleIndex = ref<number | null>(null);

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

    // Limiter la description à 200 caractères maximum
    const description = gameDetails.description_raw || rawgGame.name;
    game.value.description =
      description.length > 200
        ? description.substring(0, 200).trim()
        : description;

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
    game.value = { name: "", description: "", imageUrl: "", roles: [] }; // Reset form
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
 * Gestion des rôles dans le formulaire
 */
const addOrUpdateRole = () => {
  // Validation basique
  if (!newRole.value.name.trim()) {
    showMessage("error", "Le nom du rôle est requis");
    return;
  }

  // S'assurer que roles existe toujours
  if (!game.value.roles) {
    game.value.roles = [];
  }

  // Vérifier si le nom est unique (sauf si on est en train d'éditer)
  const isDuplicate = game.value.roles.some(
    (role, index) =>
      role.name.toLowerCase() === newRole.value.name.toLowerCase() &&
      index !== editingRoleIndex.value
  );

  if (isDuplicate) {
    showMessage("error", "Un rôle avec ce nom existe déjà");
    return;
  }

  if (editingRoleIndex.value !== null) {
    // Mise à jour d'un rôle existant
    game.value.roles[editingRoleIndex.value] = { ...newRole.value };
  } else {
    // Ajout d'un nouveau rôle
    game.value.roles.push({ ...newRole.value });
  }

  // Réinitialiser le formulaire
  resetRoleForm();
};

const editRole = (index: number) => {
  if (!game.value.roles) {
    game.value.roles = [];
    return;
  }

  editingRoleIndex.value = index;
  const role = game.value.roles[index];
  newRole.value = {
    name: role.name,
    color: role.color,
  };
};

const removeRole = (index: number) => {
  if (!game.value.roles) return;

  game.value.roles.splice(index, 1);
};

const cancelEditRole = () => {
  resetRoleForm();
};

const resetRoleForm = () => {
  newRole.value = {
    name: "",
    color: "#6B7280",
  };
  editingRoleIndex.value = null;
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
  if (game.value.description && game.value.description.length > 200) {
    errors.value.description =
      "La description ne doit pas dépasser 200 caractères";
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
    roles: gameToEdit.roles || [],
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
  showMessage("success", "Modification annulée", 3000);
};

/**
 * Réinitialise le formulaire et les états d'édition
 */
const resetForm = () => {
  isEditing.value = false;
  editingId.value = null;
  originalGameData.value = null;
  game.value = {
    name: "",
    description: "",
    imageUrl: "",
    roles: [],
  };
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
  duration = 4000
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

  // Stocker la référence du timeout pour pouvoir l'annuler si nécessaire (4s pour le Toast spatial)
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
