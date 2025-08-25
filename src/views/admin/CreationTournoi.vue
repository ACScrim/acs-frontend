<template>
  <div class="container mx-auto p-8 pt-20">
    <div class="max-w-8xl mx-auto">
      <!-- En-tête -->
      <SpaceHeader
        title="Gestion des Tournois"
        titleSize="3xl"
        :showMissionInfo="true"
        mission="TOURNAMENT-MGMT"
      >
        <template #badge v-if="activeTournaments.length > 0">
          <SpaceBadge variant="primary" size="lg">{{
            activeTournaments.length
          }}</SpaceBadge>
        </template>
      </SpaceHeader>

      <!-- Sélection commune du jeu et du tournoi -->
      <SpaceCard
        variant="primary"
        :stars="true"
        :decorated="true"
        className="mb-8"
      >
        <template #header>
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2 text-color-primary-light"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
              />
            </svg>
            <SpaceTitle size="lg">Sélection du tournoi</SpaceTitle>
          </div>
        </template>

        <div class="grid grid-cols-1 gap-6">
          <!-- Bouton pour afficher/masquer les tournois terminés -->
          <div class="flex justify-end mb-2">
            <SpaceToggle
              v-model="showFinishedTournaments"
              label="Afficher les tournois terminés"
              tooltip="Basculer pour voir les tournois terminés"
            />
          </div>

          <!-- Sélection directe du tournoi (tournois actifs) -->
          <div v-if="!showFinishedTournaments" class="w-full">
            <!-- Version alternative avec select natif -->
            <div class="relative">
              <SpaceDropdown
                v-model="selectedTournament"
                @change="handleTournamentChange"
                id="activeTournamentSelect"
                label="Sélectionner un tournoi actif"
                placeholder="Choisissez un tournoi actif"
              >
                <template #icon>
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
                </template>
                <option
                  v-for="tournament in activeTournaments"
                  :key="tournament._id"
                  :value="tournament._id"
                >
                  {{ tournament.name }}
                </option>
              </SpaceDropdown>
              <div
                class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-color-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <!-- Message si aucun tournoi actif disponible -->
            <SpaceAlert
              v-if="activeTournaments.length === 0"
              variant="info"
              className="mt-4"
            >
              Aucun tournoi actif disponible actuellement.
            </SpaceAlert>
          </div>

          <!-- Sélection pour les tournois terminés -->
          <div v-if="showFinishedTournaments" class="space-y-6">
            <!-- Sélection du jeu pour les tournois terminés -->
            <div class="w-full">
              <div class="relative">
                <SpaceDropdown
                  v-model="selectedGame"
                  @change="handleGameChange"
                  id="globalGameSelect"
                  label="Sélectionner un jeu"
                  placeholder="Choisissez un jeu"
                >
                  <template #icon>
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
                  </template>
                  <option
                    v-for="game in games"
                    :key="game._id"
                    :value="game._id"
                  >
                    {{ game.name }}
                  </option>
                </SpaceDropdown>
                <div
                  class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-color-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Sélection du tournoi terminé -->
            <div class="w-full" v-if="finishedTournaments.length > 0">
              <!-- Version alternative avec select natif -->
              <div class="relative">
                <SpaceDropdown
                  v-model="selectedTournament"
                  @change="handleTournamentChange"
                  id="finishedTournamentSelect"
                  label="Sélectionner un tournoi terminé"
                  placeholder="Choisissez un tournoi terminé"
                >
                  <template #icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </template>
                  <option
                    v-for="tournament in finishedTournaments"
                    :key="tournament._id"
                    :value="tournament._id"
                  >
                    {{ tournament.name }}
                  </option>
                </SpaceDropdown>
                <div
                  class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-color-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Message si aucun tournoi terminé disponible -->
            <SpaceAlert
              v-else-if="selectedGame && finishedTournaments.length === 0"
              variant="warning"
            >
              Aucun tournoi terminé disponible pour ce jeu.
            </SpaceAlert>
          </div>
        </div>
      </SpaceCard>

      <!-- Onglets -->
      <SpaceCard
        variant="secondary"
        :stars="true"
        :decorated="true"
        className="mb-8"
      >
        <div
          class="flex flex-col md:flex-row justify-around gap-4 z-10 relative"
        >
          <SpaceButton
            @click="handleTabChange('creation')"
            :variant="activeTab === 'creation' ? 'accent' : 'outline'"
            size="md"
            className="w-full md:w-auto"
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
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
            Gestion des tournois
          </SpaceButton>

          <SpaceButton
            @click="handleTabChange('teams')"
            :variant="activeTab === 'teams' ? 'accent' : 'outline'"
            size="md"
            className="w-full md:w-auto"
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                />
              </svg>
            </template>
            Gestion des Équipes
          </SpaceButton>

          <SpaceButton
            @click="handleTabChange('checkin')"
            :variant="activeTab === 'checkin' ? 'accent' : 'outline'"
            size="md"
            className="w-full md:w-auto"
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
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
            Voir les Check-in
          </SpaceButton>

          <SpaceButton
            @click="handleTabChange('end')"
            :variant="activeTab === 'end' ? 'accent' : 'outline'"
            size="md"
            className="w-full md:w-auto"
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
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
            Terminer un tournoi
          </SpaceButton>
        </div>

        <!-- Indicateur d'onglet actif -->
        <div
          class="relative h-1 mt-6 bg-background-bg-light/40 rounded hidden md:block"
        >
          <div
            class="absolute h-full bg-color-accent rounded shadow-glow-accent transition-all duration-300 ease-in-out"
            :style="tabIndicatorStyle"
          ></div>
        </div>
      </SpaceCard>

      <!-- Contenu des onglets -->
      <SpaceCard
        variant="primary"
        :stars="true"
        :decorated="true"
        className="min-h-[400px]"
      >
        <div v-show="activeTab === 'creation'" class="animate-fadeIn">
          <CreationTournoiForm />
        </div>
        <div v-show="activeTab === 'teams'" class="animate-fadeIn">
          <GestionEquipe
            :selectedGame="selectedGame"
            :selectedTournament="selectedTournament"
          />
        </div>
        <div v-show="activeTab === 'checkin'" class="animate-fadeIn">
          <VoirCheckIn
            :selectedGame="selectedGame"
            :selectedTournament="selectedTournament"
          />
        </div>
        <div v-show="activeTab === 'end'" class="animate-fadeIn">
          <EndTournoi
            :selectedGame="selectedGame"
            :selectedTournament="selectedTournament"
          />
        </div>
      </SpaceCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import CreationTournoiForm from "../../components/gestion-tournois/CreationTournoiForm.vue";
import GestionEquipe from "../../components/gestion-tournois/GestionEquipe.vue";
import EndTournoi from "../../components/gestion-tournois/EndTournoi.vue";
import VoirCheckIn from "../../components/gestion-tournois/VoirCheckIn.vue";
import gameService from "../../services/gameService";
import tournamentService from "../../services/tournamentService";
import type { Game, Tournament } from "../../types";

//-------------------------------------------------------
// SECTION: État du composant
//-------------------------------------------------------
// Gestion des données
const games = ref<Game[]>([]);
const allTournaments = ref<Tournament[]>([]);

// Option pour afficher les tournois terminés
const showFinishedTournaments = ref(false);

/**
 * Gestion de la navigation par onglets
 * Valeurs possibles: "creation", "teams", "checkin", "end"
 */
const activeTab = ref("creation");

/**
 * Nombre total d'onglets pour le calcul de l'indicateur
 */
const tabCount = 4;

/**
 * État partagé pour la sélection de jeu et de tournoi
 */
const selectedGame = ref("");
const selectedTournament = ref("");

//-------------------------------------------------------
// SECTION: Propriétés calculées
//-------------------------------------------------------

/**
 * Filtre les tournois non terminés
 */
const activeTournaments = computed(() => {
  return allTournaments.value.filter((tournament) => !tournament.finished);
});

/**
 * Filtre les tournois terminés
 */
const finishedTournaments = computed(() => {
  return allTournaments.value.filter((tournament) => tournament.finished);
});

/**
 * Calcule le style CSS pour l'indicateur visuel d'onglet actif
 */
const tabIndicatorStyle = computed(() => {
  // Liste ordonnée des identifiants d'onglets
  const tabs = ["creation", "teams", "checkin", "end"];

  // Détermine l'index de l'onglet actif
  const activeIndex = tabs.indexOf(activeTab.value);

  // Calcule la position en pourcentage (pour le positionnement CSS)
  const position = (activeIndex / tabCount) * 100;

  // Calcule la largeur en pourcentage (divisée équitablement)
  const width = 100 / tabCount;

  // Retourne les propriétés CSS à appliquer
  return {
    left: `${position}%`,
    width: `${width}%`,
  };
});

//-------------------------------------------------------
// SECTION: Méthodes et gestionnaires d'événements
//-------------------------------------------------------

/**
 * Gère le changement d'onglet
 */
const handleTabChange = (newTab: string) => {
  // Définir le nouvel onglet actif
  activeTab.value = newTab;
};

/**
 * Charge la liste des jeux disponibles depuis l'API
 */
const fetchGames = async () => {
  try {
    games.value = await gameService.getGames();
  } catch (error) {
    console.error("Erreur lors du chargement des jeux:", error);
  }
};

/**
 * Charge tous les tournois disponibles (sans filtrage par jeu)
 */
const fetchAllTournaments = async () => {
  try {
    allTournaments.value = await tournamentService.getTournaments();
  } catch (error) {
    console.error("Erreur lors du chargement des tournois:", error);
  }
};

/**
 * Charge les tournois pour le jeu sélectionné
 */
const fetchTournamentsByGame = async (gameId: string) => {
  try {
    if (!gameId) return;

    allTournaments.value = await tournamentService.getTournamentsByGame(gameId);
  } catch (error) {
    console.error("Erreur lors du chargement des tournois:", error);
  }
};

/**
 * Gère le changement de jeu sélectionné
 */
const handleGameChange = async () => {
  // Réinitialiser le tournoi sélectionné
  selectedTournament.value = "";
  // Charger les tournois pour ce jeu
  await fetchTournamentsByGame(selectedGame.value);
};

/**
 * Gère le changement de tournoi sélectionné
 */
const handleTournamentChange = async () => {
  // Aucune action spécifique pour l'instant, mais pourrait être utilisé
  // pour charger des informations supplémentaires sur le tournoi si nécessaire
};

//-------------------------------------------------------
// SECTION: Cycle de vie et watchers
//-------------------------------------------------------

/**
 * Surveille les changements sur showFinishedTournaments et réinitialise les sélections
 * lorsqu'on bascule entre les modes d'affichage
 */
watch(showFinishedTournaments, (newValue) => {
  // Réinitialiser les sélections
  selectedTournament.value = "";

  // Si on masque les tournois terminés, réinitialiser la sélection de jeu
  // et recharger tous les tournois
  if (!newValue) {
    selectedGame.value = "";
    fetchAllTournaments();
  }
});

// Charger les jeux au montage du composant
onMounted(() => {
  fetchGames();
  fetchAllTournaments();
});
</script>

<style scoped>
/* Animation de fadeIn */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}
</style>
