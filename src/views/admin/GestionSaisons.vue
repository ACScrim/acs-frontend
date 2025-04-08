<template>
  <div class="container mx-auto p-8 pt-20">
    <!-- En-tête -->
    <div
      class="bg-black/50 backdrop-blur-xl rounded-lg p-6 mb-8 border border-pink-500 shadow-lg shadow-pink-500/30"
    >
      <h1 class="text-4xl text-white mb-4 font-audiowide text-center neon-text">
        Gestion des Saisons
      </h1>
      <div class="flex justify-center">
        <div
          class="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
        ></div>
      </div>
    </div>

    <!-- Panel principal avec deux colonnes -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Colonne 1: Création/Édition de saison -->
      <div
        class="bg-black/70 backdrop-blur-md rounded-lg p-6 border border-cyan-500/50 shadow-lg shadow-cyan-500/20 md:col-span-1 h-fit"
      >
        <h2 class="text-xl text-cyan-400 font-audiowide mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z"
            />
          </svg>
          {{ isEditing ? "Modifier une saison" : "Créer une saison" }}
        </h2>

        <form @submit.prevent="saveSeason" class="space-y-4">
          <!-- Numéro de saison -->
          <div>
            <label
              for="seasonNumber"
              class="block text-cyan-400 font-orbitron text-sm mb-2"
            >
              Numéro de saison
            </label>
            <input
              type="number"
              id="seasonNumber"
              v-model="seasonForm.numero"
              min="1"
              required
              class="w-full py-3 px-4 bg-gray-900/80 text-white border border-cyan-500/50 rounded-lg font-orbitron appearance-none shadow-md shadow-cyan-500/30 transition-all duration-300 focus:outline-none focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/50"
            />
          </div>

          <!-- Boutons Actions -->
          <div class="flex space-x-4 pt-4">
            <button
              type="submit"
              class="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-orbitron rounded-lg shadow-md hover:shadow-cyan-500/50 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              <span
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"
              ></span>
              <span class="relative z-10">{{
                isEditing ? "Mettre à jour" : "Créer"
              }}</span>
            </button>
            <button
              v-if="isEditing"
              type="button"
              @click="cancelEdit"
              class="flex-1 px-4 py-2 bg-gray-800 text-gray-300 font-orbitron rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300 hover:-translate-y-1"
            >
              Annuler
            </button>
          </div>
        </form>

        <!-- Liste des saisons existantes -->
        <div class="mt-8">
          <h3
            class="text-lg text-purple-400 font-orbitron mb-4 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
              />
            </svg>
            Saisons existantes
          </h3>

          <div v-if="loading" class="flex justify-center p-8">
            <div class="cyber-spinner"></div>
          </div>

          <div
            v-else-if="seasons.length === 0"
            class="bg-gray-900/60 p-4 rounded-lg border border-purple-500/30 text-gray-400 italic text-center"
          >
            Aucune saison n'a été créée
          </div>

          <div
            v-else
            class="space-y-3 max-h-96 overflow-y-auto pr-2 cyber-scrollbar"
          >
            <div
              v-for="season in seasons"
              :key="season._id"
              :class="[
                'p-4 rounded-lg border transition-all duration-300 flex justify-between items-center',
                season._id === selectedSeason?._id
                  ? 'bg-purple-900/30 border-purple-500/80 shadow-md shadow-purple-500/30'
                  : 'bg-gray-900/60 border-purple-500/30 hover:border-purple-500/50',
              ]"
            >
              <div>
                <p class="text-white font-orbitron">
                  <span class="text-purple-400"
                    >Saison {{ season.numero }}</span
                  >
                  <span class="text-xs ml-2 text-gray-400"
                    >{{ season.tournois.length }} tournois</span
                  >
                </p>
              </div>
              <div class="flex space-x-2">
                <button
                  @click="selectSeason(season)"
                  class="p-2 rounded-full transition-all duration-300 bg-gray-800/40 text-gray-400 hover:bg-gray-700/60 hover:text-purple-300 hover:border hover:border-purple-500 hover:shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                  title="Gérer les tournois"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fill-rule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  @click="editSeason(season)"
                  class="p-2 rounded-full transition-all duration-300 bg-gray-800/40 text-gray-400 hover:bg-cyan-900/50 hover:text-cyan-300 hover:border hover:border-cyan-500 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                  title="Modifier"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                    />
                  </svg>
                </button>
                <button
                  @click="confirmDeleteSeason(season)"
                  class="p-2 rounded-full transition-all duration-300 bg-gray-800/40 text-gray-400 hover:bg-red-900/50 hover:text-red-300 hover:border hover:border-red-500 hover:shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                  title="Supprimer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Colonne 2: Gestion des tournois de la saison -->
      <div
        class="bg-black/70 backdrop-blur-md rounded-lg p-6 border border-purple-500/50 shadow-lg shadow-purple-500/20 md:col-span-2"
      >
        <h2
          class="text-xl text-purple-400 font-audiowide mb-4 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            />
          </svg>
          Gestion des tournois
        </h2>

        <div
          v-if="!selectedSeason"
          class="flex flex-col items-center justify-center p-12 bg-gray-900/40 rounded-lg border border-purple-500/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-purple-500/50 mb-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="text-gray-400 font-orbitron text-center">
            Veuillez sélectionner une saison pour gérer ses tournois
          </p>
        </div>

        <div v-else>
          <div
            class="flex items-center justify-between bg-purple-900/20 rounded-lg p-4 border border-purple-500/40 mb-6"
          >
            <h3 class="font-orbitron text-lg text-white">
              <span class="text-purple-400"
                >Saison {{ selectedSeason.numero }}</span
              >
              <span class="text-sm font-normal ml-2"
                >{{ selectedSeason.tournois.length }} tournois</span
              >
            </h3>

            <!-- Select de jeu pour filtrer la liste de tournois disponibles -->
            <div class="relative w-64">
              <select
                v-model="selectedGameFilter"
                @change="fetchAvailableTournaments"
                class="w-full py-2 px-4 bg-gray-900/80 text-white border border-purple-500/50 rounded-lg font-orbitron appearance-none shadow-md shadow-purple-500/30 transition-all duration-300 focus:outline-none focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/50"
              >
                <option value="">Tous les jeux</option>
                <option v-for="game in games" :key="game._id" :value="game._id">
                  {{ game.name }}
                </option>
              </select>
              <div
                class="absolute top-1/2 right-4 -translate-y-1/2 w-0 h-0 border-l-6 border-r-6 border-t-8 border-transparent border-t-purple-500 pointer-events-none"
              ></div>
            </div>
          </div>

          <!-- Gestion des tournois de la saison -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Liste des tournois de la saison -->
            <div>
              <h3
                class="text-lg text-pink-400 font-orbitron mb-4 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Tournois dans la saison
              </h3>

              <div
                v-if="loadingSeasonTournaments"
                class="flex justify-center p-6"
              >
                <div class="cyber-spinner"></div>
              </div>

              <div
                v-else-if="seasonTournaments.length === 0"
                class="bg-gray-900/60 p-4 rounded-lg border border-pink-500/30 text-gray-400 italic text-center"
              >
                Aucun tournoi dans cette saison
              </div>

              <div
                v-else
                class="space-y-2 max-h-[400px] overflow-y-auto pr-2 cyber-scrollbar"
              >
                <div
                  v-for="tournament in seasonTournaments"
                  :key="tournament._id"
                  class="bg-gray-900/60 p-3 rounded-lg border border-pink-500/30 flex justify-between items-center hover:border-pink-500/50 transition-all duration-300"
                >
                  <div>
                    <p class="text-white font-orbitron text-sm">
                      {{ tournament.name }}
                    </p>
                    <p class="text-xs text-gray-400">
                      {{ formatDate(tournament.date) }}
                      <span
                        v-if="tournament.finished"
                        class="ml-2 text-pink-400"
                        >Terminé</span
                      >
                    </p>
                  </div>
                  <button
                    @click="
                      tournament._id &&
                        removeTournamentFromSeason(tournament._id)
                    "
                    class="p-2 rounded-full transition-all duration-300 bg-gray-800/40 text-gray-400 hover:bg-red-900/40 hover:text-red-300 hover:border hover:border-red-500 hover:shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                    title="Retirer de la saison"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Liste des tournois disponibles à ajouter -->
            <div>
              <h3
                class="text-lg text-cyan-400 font-orbitron mb-4 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"
                  />
                </svg>
                Tournois disponibles
              </h3>

              <div
                v-if="loadingAvailableTournaments"
                class="flex justify-center p-6"
              >
                <div class="cyber-spinner"></div>
              </div>

              <div
                v-else-if="availableTournaments.length === 0"
                class="bg-gray-900/60 p-4 rounded-lg border border-cyan-500/30 text-gray-400 italic text-center"
              >
                Aucun tournoi disponible à ajouter
                <span v-if="selectedGameFilter" class="block mt-1"
                  >Essayez de changer le filtre par jeu</span
                >
              </div>

              <div
                v-else
                class="space-y-2 max-h-[400px] overflow-y-auto pr-2 cyber-scrollbar"
              >
                <div
                  v-for="tournament in availableTournaments"
                  :key="tournament._id"
                  class="bg-gray-900/60 p-3 rounded-lg border border-cyan-500/30 flex justify-between items-center hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div>
                    <p class="text-white font-orbitron text-sm">
                      {{ tournament.name }}
                    </p>
                    <p class="text-xs text-gray-400">
                      {{ formatDate(tournament.date) }}
                      <span
                        v-if="tournament.finished"
                        class="ml-2 text-cyan-400"
                        >Terminé</span
                      >
                    </p>
                  </div>
                  <button
                    @click="
                      tournament._id && addTournamentToSeason(tournament._id)
                    "
                    class="p-2 rounded-full transition-all duration-300 bg-gray-800/40 text-gray-400 hover:bg-cyan-900/40 hover:text-cyan-300 hover:border hover:border-cyan-500 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                    title="Ajouter à la saison"
                  >
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
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Messages d'état -->
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />

    <!-- Boîte de dialogue de confirmation pour la suppression -->
    <ConfirmationDialog
      v-if="showDeleteDialog"
      title="Confirmer la suppression"
      :message="`Êtes-vous sûr de vouloir supprimer la saison ${seasonToDelete?.numero} ? Cette action est irréversible.`"
      @confirm="deleteSeason"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Toast from "@/shared/Toast.vue";
import ConfirmationDialog from "@/shared/ConfirmationDialog.vue";
import gameService from "../../services/gameService";
import seasonService from "../../services/seasonService";
import type { Game, Tournament, Season } from "../../types";

// État de l'interface
const loading = ref(true);
const loadingSeasonTournaments = ref(false);
const loadingAvailableTournaments = ref(false);
const isEditing = ref(false);
const showDeleteDialog = ref(false);
const error = ref<string | null>(null);
const success = ref<string | null>(null);

// Données
const games = ref<Game[]>([]);
const seasons = ref<Season[]>([]);
const selectedSeason = ref<Season | null>(null);
const seasonToDelete = ref<Season | null>(null);
const seasonTournaments = ref<Tournament[]>([]);
const availableTournaments = ref<Tournament[]>([]);
const selectedGameFilter = ref("");

// Formulaire pour créer/modifier une saison
const seasonForm = ref<{
  numero: number;
}>({
  numero: 1,
});

/**
 * Récupère toutes les saisons depuis l'API
 */
const fetchSeasons = async () => {
  try {
    loading.value = true;
    const response = await seasonService.getAllSeasons();
    seasons.value = response;
  } catch (err) {
    console.error("Erreur lors de la récupération des saisons:", err);
    showMessage("error", "Erreur lors de la récupération des saisons");
  } finally {
    loading.value = false;
  }
};

/**
 * Récupère la liste des jeux pour le filtre
 */
const fetchGames = async () => {
  try {
    const response = await gameService.getGames();
    games.value = response;
  } catch (err) {
    console.error("Erreur lors de la récupération des jeux:", err);
  }
};

/**
 * Récupère les tournois de la saison sélectionnée
 */
const fetchSeasonTournaments = async () => {
  if (!selectedSeason.value) return;

  try {
    loadingSeasonTournaments.value = true;
    const season = await seasonService.getSeasonById(selectedSeason.value._id);
    selectedSeason.value = season;
    seasonTournaments.value = season.tournois || [];
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des tournois de la saison:",
      err
    );
    showMessage(
      "error",
      "Erreur lors de la récupération des tournois de la saison"
    );
  } finally {
    loadingSeasonTournaments.value = false;
  }
};

/**
 * Récupère les tournois disponibles qui ne sont pas dans la saison actuelle ni dans d'autres saisons
 */
const fetchAvailableTournaments = async () => {
  if (!selectedSeason.value) return;

  try {
    loadingAvailableTournaments.value = true;

    // Utiliser directement le service pour récupérer les tournois disponibles
    // via l'endpoint API dédié qui filtre correctement côté backend
    availableTournaments.value = await seasonService.getAvailableTournaments(
      selectedSeason.value._id,
      selectedGameFilter.value
    );
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des tournois disponibles:",
      err
    );
    showMessage(
      "error",
      "Erreur lors de la récupération des tournois disponibles"
    );
  } finally {
    loadingAvailableTournaments.value = false;
  }
};

/**
 * Sélectionne une saison pour gérer ses tournois
 */
const selectSeason = async (season: Season) => {
  selectedSeason.value = season;
  await fetchSeasonTournaments();
  await fetchAvailableTournaments();
};

/**
 * Prépare le formulaire pour l'édition d'une saison
 */
const editSeason = (season: Season) => {
  isEditing.value = true;
  seasonForm.value = {
    numero: season.numero,
  };
  selectedSeason.value = season;
};

/**
 * Annule l'édition d'une saison
 */
const cancelEdit = () => {
  isEditing.value = false;
  seasonForm.value = { numero: 1 };
};

/**
 * Crée ou met à jour une saison
 */
const saveSeason = async () => {
  try {
    if (isEditing.value && selectedSeason.value) {
      // Mise à jour d'une saison existante
      const updatedSeason = await seasonService.updateSeason(
        selectedSeason.value._id,
        { ...seasonForm.value }
      );

      // Mettre à jour la liste des saisons
      const index = seasons.value.findIndex(
        (s) => s._id === selectedSeason.value!._id
      );
      if (index !== -1) {
        seasons.value[index] = updatedSeason;
      }

      showMessage(
        "success",
        `Saison ${updatedSeason.numero} mise à jour avec succès`
      );
      isEditing.value = false;
    } else {
      // Création d'une nouvelle saison
      const newSeason = await seasonService.createSeason(seasonForm.value);
      seasons.value.push(newSeason);
      showMessage("success", `Saison ${newSeason.numero} créée avec succès`);
    }

    // Réinitialiser le formulaire
    seasonForm.value = { numero: 1 };
  } catch (err) {
    console.error("Erreur lors de la sauvegarde de la saison:", err);
    showMessage("error", "Erreur lors de la sauvegarde de la saison");
  }
};

/**
 * Affiche la boîte de dialogue de confirmation pour supprimer une saison
 */
const confirmDeleteSeason = (season: Season) => {
  seasonToDelete.value = season;
  showDeleteDialog.value = true;
};

/**
 * Supprime la saison après confirmation
 */
const deleteSeason = async () => {
  if (!seasonToDelete.value) return;

  try {
    await seasonService.deleteSeason(seasonToDelete.value._id);

    // Mettre à jour la liste des saisons
    seasons.value = seasons.value.filter(
      (s) => s._id !== seasonToDelete.value!._id
    );

    // Si la saison supprimée était la saison sélectionnée, désélectionner
    if (
      selectedSeason.value &&
      selectedSeason.value._id === seasonToDelete.value._id
    ) {
      selectedSeason.value = null;
    }

    showMessage(
      "success",
      `Saison ${seasonToDelete.value.numero} supprimée avec succès`
    );
    cancelDelete();
  } catch (err) {
    console.error("Erreur lors de la suppression de la saison:", err);
    showMessage("error", "Erreur lors de la suppression de la saison");
  }
};

/**
 * Annule la suppression d'une saison
 */
const cancelDelete = () => {
  seasonToDelete.value = null;
  showDeleteDialog.value = false;
};

/**
 * Ajoute un tournoi à la saison sélectionnée
 */
const addTournamentToSeason = async (tournamentId: string) => {
  if (!selectedSeason.value) return;

  try {
    const updatedSeason = await seasonService.addTournamentToSeason(
      selectedSeason.value._id,
      tournamentId
    );

    // Rafraîchir les listes
    await fetchSeasonTournaments();
    await fetchAvailableTournaments();

    // Mettre à jour la saison dans la liste des saisons
    const index = seasons.value.findIndex(
      (s) => s._id === selectedSeason.value!._id
    );
    if (index !== -1) {
      seasons.value[index] = updatedSeason;
    }

    showMessage("success", "Tournoi ajouté à la saison avec succès");
  } catch (err) {
    console.error("Erreur lors de l'ajout du tournoi à la saison:", err);
    showMessage("error", "Erreur lors de l'ajout du tournoi à la saison");
  }
};

/**
 * Retire un tournoi de la saison sélectionnée
 */
const removeTournamentFromSeason = async (tournamentId: string) => {
  if (!selectedSeason.value) return;

  try {
    const updatedSeason = await seasonService.removeTournamentFromSeason(
      selectedSeason.value._id,
      tournamentId
    );

    // Rafraîchir les listes
    await fetchSeasonTournaments();
    await fetchAvailableTournaments();

    // Mettre à jour la saison dans la liste des saisons
    const index = seasons.value.findIndex(
      (s) => s._id === selectedSeason.value!._id
    );
    if (index !== -1) {
      seasons.value[index] = updatedSeason;
    }

    showMessage("success", "Tournoi retiré de la saison avec succès");
  } catch (err) {
    console.error("Erreur lors du retrait du tournoi de la saison:", err);
    showMessage("error", "Erreur lors du retrait du tournoi de la saison");
  }
};

/**
 * Formate une date pour l'affichage
 */
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Affiche un message de succès ou d'erreur
 */
const showMessage = (type: "success" | "error", message: string) => {
  if (type === "success") {
    success.value = message;
    error.value = null;
  } else {
    error.value = message;
    success.value = null;
  }

  // Masquer le message après 3 secondes
  setTimeout(() => {
    success.value = null;
    error.value = null;
  }, 3000);
};

// Charger les données au montage du composant
onMounted(async () => {
  await fetchGames();
  await fetchSeasons();
});
</script>

<style scoped>
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

/* Spinner avec effet cyberpunk */
.cyber-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(139, 92, 246, 0.3);
  border-radius: 50%;
  border-top-color: rgba(139, 92, 246, 1);
  animation: cyber-spin 1s linear infinite;
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
}

@keyframes cyber-spin {
  to {
    transform: rotate(360deg);
  }
}

/* Animation shimmer */
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

/* Scrollbar customisée pour thème cyberpunk */
.cyber-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(139, 92, 246, 0.5) rgba(17, 24, 39, 0.8);
}

.cyber-scrollbar::-webkit-scrollbar {
  width: 5px;
}

.cyber-scrollbar::-webkit-scrollbar-track {
  background: rgba(17, 24, 39, 0.8);
  border-radius: 3px;
}

.cyber-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.5);
  border-radius: 3px;
}

.cyber-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 92, 246, 0.7);
}
</style>
