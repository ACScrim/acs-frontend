<template>
  <div class="container mx-auto p-8 pt-20">
    <!-- En-tête -->
    <Header
      title="GESTION DES SAISONS"
      titleSize="3xl"
      :showMissionInfo="true"
      mission="SEASON-MGMT"
    >
      <template #badge>
        <SpaceBadge
          v-if="seasons && seasons.length > 0"
          variant="primary"
          size="lg"
        >
          {{ seasons.length }}
        </SpaceBadge>
      </template>
    </Header>

    <!-- Layout principal avec deux colonnes -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <!-- Colonne de gauche : Gestion des saisons -->
      <div class="xl:col-span-5">
        <!-- Formulaire de création de saison -->
        <Card
          variant="primary"
          :stars="true"
          :decorated="true"
          className="mb-6"
        >
          <template #header>
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2 text-space-primary-light"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
              <Title size="md">
                {{
                  isEditing ? "Modifier la saison" : "Créer une nouvelle saison"
                }}
              </Title>
            </div>
          </template>

          <form @submit.prevent="saveSeason" class="space-y-4">
            <div>
              <label
                for="numero"
                class="text-sm text-space-primary-light mb-2 font-nasa flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"
                  />
                </svg>
                Numéro de saison <span class="text-space-accent ml-1">*</span>
              </label>
              <SpaceInput
                id="numero"
                v-model.number="seasonForm.numero"
                type="number"
                placeholder="Numéro de la saison"
                required
              />
            </div>

            <div class="flex justify-end space-x-3">
              <Button
                v-if="isEditing"
                @click="cancelEdit"
                variant="outline"
                size="sm"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                :loading="loading"
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
                {{ isEditing ? "Enregistrer" : "Créer" }}
              </Button>
            </div>
          </form>
        </Card>

        <!-- Liste des saisons -->
        <Card variant="secondary" :stars="true" :decorated="true">
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-space-secondary-light"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                <Title size="md">Saisons</Title>
              </div>
            </div>
          </template>

          <div v-if="loading" class="flex justify-center py-8">
            <Loader size="md" text="Chargement..." />
          </div>

          <Terminal
            v-else-if="!seasons || seasons.length === 0"
            command="list --seasons"
            title="Liste des saisons"
            :showCursor="true"
            className="my-4"
          >
            <div class="text-space-text-muted text-sm">
              Aucune saison créée.
            </div>
          </Terminal>

          <div v-else class="space-y-3">
            <div
              v-for="season in seasons"
              :key="season._id"
              :class="[
                'group bg-space-bg-light/5 border rounded-lg p-4 transition-all duration-300',
                selectedSeason && selectedSeason._id === season._id
                  ? 'border-space-accent bg-space-accent/10 shadow-glow-accent'
                  : 'border-space-secondary/30 hover:border-space-secondary/50 hover:shadow-glow-secondary',
              ]"
            >
              <div class="flex justify-between items-center">
                <div class="font-nasa text-lg">
                  <span v-if="season.numero === 0" class="text-space-accent"
                    >Alors ça chill</span
                  >
                  <span
                    v-else
                    :class="
                      selectedSeason && selectedSeason._id === season._id
                        ? 'text-space-accent'
                        : 'text-space-secondary-light'
                    "
                  >
                    Saison {{ season.numero }}
                  </span>
                </div>
                <div class="flex space-x-2">
                  <Button
                    @click="editSeason(season)"
                    variant="secondary"
                    size="xs"
                    className="p-1.5"
                    :title="`Modifier la saison ${season.numero}`"
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
                  </Button>

                  <Button
                    @click="confirmDeleteSeason(season)"
                    variant="error"
                    size="xs"
                    className="p-1.5"
                    :title="`Supprimer la saison ${season.numero}`"
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
                  </Button>
                </div>
              </div>

              <div
                v-if="season.tournois && season.tournois.length > 0"
                class="mt-2"
              >
                <SpaceBadge variant="outline" size="sm">
                  {{ season.tournois.length }} tournoi{{
                    season.tournois.length > 1 ? "s" : ""
                  }}
                </SpaceBadge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <!-- Colonne de droite : Gestion des tournois -->
      <div class="xl:col-span-7">
        <div
          v-if="!selectedSeason"
          class="h-full flex items-center justify-center"
        >
          <Terminal
            command="select --season"
            title="Gestion des tournois"
            :showCursor="true"
            className="w-full max-w-md"
          >
            <div class="text-space-text-muted text-center">
              Cliquez sur "Modifier" à côté d'une saison pour gérer ses
              tournois.
            </div>
          </Terminal>
        </div>

        <div v-else class="space-y-6">
          <!-- En-tête de la section tournois -->
          <Card variant="accent" :stars="true" :decorated="true">
            <template #header>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-space-accent-light"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
                    />
                  </svg>
                  <Title size="md">
                    <span v-if="selectedSeason.numero === 0"
                      >Modifier "Alors ça chill"</span
                    >
                    <span v-else
                      >Modifier Saison {{ selectedSeason.numero }}</span
                    >
                  </Title>
                </div>
                <Button @click="cancelEdit" variant="outline" size="sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Terminer
                </Button>
              </div>
            </template>

            <!-- Onglets pour les filtres -->
            <div class="border-b border-space-bg-light/30 -mx-6 px-6">
              <div class="flex flex-wrap -mb-px">
                <button
                  @click="selectedGameFilter = ''"
                  :class="[
                    'inline-block p-3 border-b-2 rounded-t-lg font-nasa text-sm',
                    !selectedGameFilter
                      ? 'text-space-accent border-space-accent'
                      : 'border-transparent hover:text-space-accent-light hover:border-space-accent/50',
                  ]"
                >
                  Tous les jeux
                </button>

                <button
                  v-for="game in games"
                  :key="game._id"
                  @click="
                    selectedGameFilter = game._id ?? '';
                    fetchAvailableTournaments();
                  "
                  :class="[
                    'inline-block p-3 border-b-2 rounded-t-lg font-nasa text-sm',
                    selectedGameFilter === game._id
                      ? 'text-space-accent border-space-accent'
                      : 'border-transparent hover:text-space-accent-light hover:border-space-accent/50',
                  ]"
                >
                  {{ game.name }}
                </button>
              </div>
            </div>
          </Card>

          <!-- Tournois dans la saison -->
          <Card variant="primary" className="min-h-[200px]">
            <template #header>
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-space-primary-light"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                <Title size="sm">Tournois inclus</Title>
              </div>
            </template>

            <div
              v-if="loadingSeasonTournaments"
              class="flex justify-center py-8"
            >
              <Loader size="md" text="Chargement..." />
            </div>

            <div
              v-else-if="seasonTournaments && seasonTournaments.length > 0"
              class="space-y-3"
            >
              <div
                v-for="tournament in seasonTournaments"
                :key="tournament._id"
                class="bg-space-bg-light/5 border border-space-primary/30 rounded-lg p-3 hover:shadow-glow-primary hover:border-space-primary/50 transition-all duration-300"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="font-nasa text-space-text text-sm">
                      {{ tournament.name }}
                    </h4>
                    <p
                      v-if="tournament.game"
                      class="text-xs text-space-primary mt-1"
                    >
                      {{ tournament.game.name }}
                    </p>
                  </div>
                  <Button
                    @click="removeTournamentFromSeason(tournament._id!)"
                    variant="error"
                    size="xs"
                    className="p-1.5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>

            <Terminal
              v-else
              command="list --tournaments --included"
              title="Tournois inclus"
              :showCursor="true"
              className="my-4"
            >
              <div class="text-space-text-muted text-sm">
                Aucun tournoi dans cette saison.
              </div>
            </Terminal>
          </Card>

          <!-- Tournois disponibles -->
          <Card variant="secondary" className="min-h-[200px]">
            <template #header>
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-space-secondary-light"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                <Title size="sm">Tournois disponibles</Title>
              </div>
            </template>

            <div
              v-if="loadingAvailableTournaments"
              class="flex justify-center py-8"
            >
              <Loader size="md" text="Chargement..." />
            </div>

            <div
              v-else-if="
                availableTournaments && availableTournaments.length > 0
              "
              class="space-y-3"
            >
              <div
                v-for="tournament in availableTournaments"
                :key="tournament._id"
                class="bg-space-bg-light/5 border border-space-secondary/30 rounded-lg p-3 hover:shadow-glow-secondary hover:border-space-secondary/50 transition-all duration-300"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="font-nasa text-space-text text-sm">
                      {{ tournament.name }}
                    </h4>
                    <p
                      v-if="tournament.game"
                      class="text-xs text-space-secondary mt-1"
                    >
                      {{ tournament.game.name }}
                    </p>
                  </div>
                  <Button
                    @click="addTournamentToSeason(tournament._id!)"
                    variant="secondary"
                    size="xs"
                    className="p-1.5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>

            <Terminal
              v-else-if="!loadingAvailableTournaments"
              command="list --tournaments --available"
              title="Tournois disponibles"
              :showCursor="true"
              className="my-4"
            >
              <div class="text-space-text-muted text-sm">
                Aucun tournoi disponible.
              </div>
            </Terminal>
          </Card>
        </div>
      </div>
    </div>

    <!-- ...existing code... -->

    <!-- Toast pour afficher les messages -->
    <Toast v-if="toast.show" :type="toast.type" :message="toast.message" />

    <!-- Modal de confirmation de suppression -->
    <Modal
      v-model="showDeleteModal"
      title="Confirmer la suppression"
      className="max-w-md"
    >
      <div class="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-space-error mx-auto mb-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        <h3 class="text-xl font-nasa text-space-error mb-2">
          Confirmer la suppression
        </h3>
        <p class="text-space-text mb-2">
          Êtes-vous sûr de vouloir supprimer la saison
          <span
            v-if="seasonToDelete && seasonToDelete.numero === 0"
            class="text-space-error font-nasa"
            >"Alors ça chill"</span
          >
          <span v-else-if="seasonToDelete" class="text-space-error font-nasa">{{
            seasonToDelete.numero
          }}</span>
          <span v-else class="text-space-error font-nasa">sélectionnée</span> ?
        </p>
        <p class="text-space-text-muted text-sm mb-4">
          Cette action est irréversible et supprimera également toutes les
          données associées à cette saison.
        </p>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <Button
            @click="showDeleteModal = false"
            variant="outline"
            size="md"
          >
            Annuler
          </Button>
          <Button
            @click="deleteSeason"
            variant="error"
            size="md"
            :loading="isDeleting"
          >
            Supprimer
          </Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Toast from "@/shared/Toast.vue";
import Modal from "@/components/ui/molecules/Modal.vue";
import gameService from "../../services/gameService";
import seasonService from "../../services/seasonService";
import type { Game, Tournament, Season } from "../../types";

// État de l'interface
const loading = ref(true);
const loadingSeasonTournaments = ref(false);
const loadingAvailableTournaments = ref(false);
const isEditing = ref(false);
const isDeleting = ref(false);
const showDeleteModal = ref(false);

// Toast pour les notifications
const toast = ref({
  show: false,
  type: "success" as "success" | "error",
  message: "",
});

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
    showToast("error", "Erreur lors de la récupération des saisons");
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
    showToast(
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
    showToast(
      "error",
      "Erreur lors de la récupération des tournois disponibles"
    );
  } finally {
    loadingAvailableTournaments.value = false;
  }
};

/**
 * Prépare le formulaire pour l'édition d'une saison et charge ses tournois
 */
const editSeason = async (season: Season) => {
  isEditing.value = true;
  seasonForm.value = {
    numero: season.numero,
  };
  selectedSeason.value = season;

  // Charger les tournois de la saison sélectionnée
  await fetchSeasonTournaments();
  await fetchAvailableTournaments();
};

/**
 * Annule l'édition d'une saison
 */
const cancelEdit = () => {
  isEditing.value = false;
  selectedSeason.value = null;
  seasonForm.value = { numero: 1 };
  seasonTournaments.value = [];
  availableTournaments.value = [];
};

/**
 * Crée ou met à jour une saison
 */
const saveSeason = async () => {
  try {
    if (isEditing.value && selectedSeason.value) {
      // Mise à jour d'une saison existante
      console.log("Mise à jour de la saison:", {
        id: selectedSeason.value._id,
        ancienNumero: selectedSeason.value.numero,
        nouveauNumero: seasonForm.value.numero,
      });

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

      // Mettre à jour la saison sélectionnée avec les nouvelles données
      selectedSeason.value = updatedSeason;

      showToast(
        "success",
        `Saison ${updatedSeason.numero} mise à jour avec succès`
      );
      // Rester en mode édition après la mise à jour
    } else {
      // Création d'une nouvelle saison
      const newSeason = await seasonService.createSeason(seasonForm.value);
      seasons.value.push(newSeason);
      showToast("success", `Saison ${newSeason.numero} créée avec succès`);

      // Passer en mode édition de la nouvelle saison
      isEditing.value = true;
      selectedSeason.value = newSeason;
      seasonForm.value = { numero: newSeason.numero };
      await fetchSeasonTournaments();
      await fetchAvailableTournaments();
    }

    // Ne pas réinitialiser le formulaire si on est en mode édition
  } catch (err: any) {
    console.error("Erreur lors de la sauvegarde de la saison:", err);

    // Extraire le message d'erreur spécifique de l'API
    const errorMessage = err?.response?.data?.message || err?.message;

    if (errorMessage) {
      // Afficher le message d'erreur spécifique (ex: "Une saison avec ce numéro existe déjà")
      showToast("error", errorMessage);
    } else {
      // Message d'erreur générique si pas de détail disponible
      showToast("error", "Erreur lors de la sauvegarde de la saison");
    }
  }
};

/**
 * Affiche la boîte de dialogue de confirmation pour supprimer une saison
 */
const confirmDeleteSeason = (season: Season) => {
  seasonToDelete.value = season;
  showDeleteModal.value = true;
};

/**
 * Supprime la saison après confirmation
 */
const deleteSeason = async () => {
  if (!seasonToDelete.value) return;

  try {
    isDeleting.value = true;
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

    showToast(
      "success",
      `Saison ${seasonToDelete.value.numero} supprimée avec succès`
    );

    // Fermer la modal
    showDeleteModal.value = false;
    seasonToDelete.value = null;
  } catch (err) {
    console.error("Erreur lors de la suppression de la saison:", err);
    showToast("error", "Erreur lors de la suppression de la saison");
  } finally {
    isDeleting.value = false;
  }
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

    showToast("success", "Tournoi ajouté à la saison avec succès");
  } catch (err) {
    console.error("Erreur lors de l'ajout du tournoi à la saison:", err);
    showToast("error", "Erreur lors de l'ajout du tournoi à la saison");
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

    showToast("success", "Tournoi retiré de la saison avec succès");
  } catch (err) {
    console.error("Erreur lors du retrait du tournoi de la saison:", err);
    showToast("error", "Erreur lors du retrait du tournoi de la saison");
  }
};

/**
 * Affiche un toast de succès ou d'erreur
 */
const showToast = (type: "success" | "error", message: string) => {
  toast.value = {
    show: true,
    type,
    message,
  };

  // Masquer le toast après 3 secondes
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

// Charger les données au montage du composant
onMounted(async () => {
  await fetchGames();
  await fetchSeasons();
});
</script>

<style scoped></style>
