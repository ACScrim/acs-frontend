<template>
  <SpaceContainer>
    <!-- En-tête de la page (Far West) -->
    <SpaceHeader title="COLLECTION DE BADGES" :showMissionInfo="true">
      <template #badge v-if="badges.length > 0">
        <SpaceBadge variant="secondary" size="lg">{{
          badges.length
        }}</SpaceBadge>
      </template>
    </SpaceHeader>

    <!-- Loader -->
    <div v-if="loading" class="flex justify-center my-12">
      <SpaceLoader text="Recensement des insignes en cours..." />
    </div>

    <div v-else class="flex flex-col gap-6 mt-6">
      <!-- Onglets de navigation -->
      <SpaceCard variant="dark" className="p-4">
        <div class="west-tabs flex flex-wrap sm:flex-nowrap gap-2">
          <SpaceButton
            @click="switchTab('assigned')"
            :variant="activeTab === 'assigned' ? 'primary' : 'outline'"
            className="flex-1 tab-button"
          >
            <span>BADGES ATTRIBUÉS</span>
          </SpaceButton>
          <SpaceButton
            @click="switchTab('available')"
            :variant="activeTab === 'available' ? 'primary' : 'outline'"
            className="flex-1 tab-button"
          >
            <span>BADGES À OBTENIR</span>
          </SpaceButton>
        </div>
      </SpaceCard>

      <!-- Filtre par jeu -->
      <SpaceCard variant="primary" className="overflow-hidden">
        <div>
          <SpaceDropdown
            v-model="selectedGameFilter"
            label="Filtrer par jeu"
            @change="handleFilterChange"
          >
            <option value="all">Tous les jeux</option>
            <option value="acs">Badges ACS (Général)</option>
            <option v-for="game in games" :key="game._id" :value="game._id">
              {{ game.name }}
            </option>
          </SpaceDropdown>
        </div>
      </SpaceCard>
      <!-- Liste des badges attribués -->
      <transition name="fade" mode="out-in">
        <div v-if="activeTab === 'assigned'" key="assigned">
          <div v-if="assignedBadges.length > 0">
            <!-- Section Badges ACS (visible seulement si selectedGameFilter est 'all' ou 'acs') -->
            <div
              v-if="
                (selectedGameFilter === 'all' ||
                  selectedGameFilter === 'acs') &&
                filteredAssignedAcsBadges.length > 0
              "
              class="mb-6"
            >
              <SpaceCard variant="secondary" className="overflow-hidden">
                <div class="p-4 border-b border-background-bg-light/30">
                  <h2 class="text-xl font-heading text-normal-text">
                    Badges ACS
                  </h2>
                </div>

                <div
                  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
                >
                  <div
                    v-for="badge in filteredAssignedAcsBadges"
                    :key="badge._id"
                    class="space-badge-card"
                    :class="getBadgeRarityClass(badge)"
                  >
                    <SpaceCard
                      variant="dark"
                      elevation="low"
                      :stars="true"
                      :interactive="true"
                      :hover="true"
                      @click="selectBadge(badge)"
                      className="h-full"
                    >
                      <!-- En-tête du badge avec image et titre -->
                      <div class="flex items-center mb-4">
                        <div class="relative flex-shrink-0 mr-4">
                          <img
                            :src="badge.imageUrl"
                            :alt="badge.title"
                            class="h-16 w-16 rounded-full border-2 border-color-secondary-light object-cover badge-image"
                            loading="lazy"
                            @error="(e) => ((e.target as HTMLImageElement).src = '/img/badge-placeholder.jpg')"
                          />
                          <!-- Far West: pas de halo lumineux -->
                        </div>
                        <div class="flex-1">
                          <h3 class="text-normal-text text-lg font-heading">
                            {{ badge.title }}
                          </h3>
                          <SpaceBadge
                            variant="secondary"
                            size="sm"
                            className="mt-1"
                            >ACS</SpaceBadge
                          >
                        </div>
                      </div>

                      <!-- Bouton pour voir les joueurs -->
                      <SpaceButton
                        variant="secondary"
                        size="sm"
                        className="w-full mt-auto"
                        @click.stop="selectBadge(badge)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                          />
                        </svg>
                        Voir les joueurs ({{
                          badge._id ? getBadgePlayers(badge._id).length : 0
                        }})
                      </SpaceButton>
                    </SpaceCard>
                  </div>
                </div>
              </SpaceCard>
            </div>

            <!-- Section Badges par jeu -->
            <template v-for="game in gamesWithAssignedBadges" :key="game._id">
              <div
                v-if="
                  selectedGameFilter === 'all' ||
                  selectedGameFilter === game._id
                "
                class="mb-6"
              >
                <SpaceCard variant="primary" className="overflow-hidden">
                  <div class="p-4 border-b border-background-bg-light/30">
                    <h2 class="text-xl font-heading text-normal-text">
                      {{ game.name }}
                    </h2>
                  </div>

                  <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
                  >
                    <div
                      v-for="badge in getAssignedBadgesByGame(game._id)"
                      :key="badge._id"
                      class="space-badge-card"
                      :class="getBadgeRarityClass(badge)"
                    >
                      <SpaceCard
                        variant="dark"
                        elevation="low"
                        :stars="true"
                        :interactive="true"
                        :hover="true"
                        @click="selectBadge(badge)"
                        className="h-full"
                      >
                        <!-- En-tête du badge avec image et titre -->
                        <div class="flex items-center mb-4">
                          <div class="relative flex-shrink-0 mr-4">
                            <img
                              :src="badge.imageUrl"
                              :alt="badge.title"
                              class="h-16 w-16 rounded-full border-2 border-color-primary-light object-cover badge-image"
                              loading="lazy"
                              @error="(e) => ((e.target as HTMLImageElement).src = '/img/badge-placeholder.jpg')"
                            />
                            <!-- Far West: pas de halo lumineux -->
                          </div>
                          <div class="flex-1">
                            <h3 class="text-normal-text text-lg font-heading">
                              {{ badge.title }}
                            </h3>
                            <SpaceBadge
                              variant="primary"
                              size="sm"
                              className="mt-1 max-w-full truncate"
                            >
                              {{ game.name }}
                            </SpaceBadge>
                          </div>
                        </div>

                        <!-- Bouton pour voir les joueurs -->
                        <SpaceButton
                          variant="primary"
                          size="sm"
                          className="w-full mt-auto"
                          @click.stop="selectBadge(badge)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                            />
                          </svg>
                          Voir les joueurs ({{
                            badge._id ? getBadgePlayers(badge._id).length : 0
                          }})
                        </SpaceButton>
                      </SpaceCard>
                    </div>
                  </div>
                </SpaceCard>
              </div>
            </template>

            <!-- Message si aucun badge ne correspond au filtre sélectionné -->
            <SpaceTerminal
              v-if="filteredAssignedBadges.length === 0"
              :command="`Filtre: ${
                selectedGameFilter !== 'all'
                  ? 'jeu=' + selectedGameFilter
                  : 'tous les jeux'
              }`"
              title="Avis de recherche : Badges attribués"
              :showCursor="false"
              className="my-8"
            >
              <div class="text-color-error font-mono">
                Aucun badge ne correspond au filtre sélectionné
              </div>
              <div class="text-normal-text-muted mt-2">
                Aucun badge attribué pour le jeu sélectionné.
              </div>
            </SpaceTerminal>
          </div>

          <!-- Message si aucun badge n'est attribué -->
          <SpaceTerminal
            v-else-if="assignedBadges.length === 0"
            command="Aucun badge attribué pour le moment"
            title="Avis de recherche : Badges attribués"
            :showCursor="false"
            className="my-8"
          >
            <div class="text-color-error font-mono">Aucun badge attribué</div>
            <div class="text-normal-text-muted mt-2">
              Aucun joueur n'a encore reçu de badge. Les badges seront attribués
              lors d'évènements spéciaux ou pour récompenser des
              accomplissements.
            </div>
          </SpaceTerminal>
        </div>
      </transition>

      <!-- Liste des badges disponibles (non attribués) -->
      <transition name="fade" mode="out-in">
        <div v-if="activeTab === 'available'" key="available">
          <div v-if="availableBadges.length > 0">
            <!-- Section Badges ACS disponibles -->
            <div
              v-if="
                (selectedGameFilter === 'all' ||
                  selectedGameFilter === 'acs') &&
                filteredAvailableAcsBadges.length > 0
              "
              class="mb-6"
            >
              <SpaceCard
                variant="secondary"
                className="overflow-hidden opacity-70"
              >
                <div class="p-4 border-b border-background-bg-light/30">
                  <h2 class="text-xl font-heading text-normal-text-muted">
                    Badges ACS
                  </h2>
                </div>

                <div
                  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
                >
                  <div
                    v-for="badge in filteredAvailableAcsBadges"
                    :key="badge._id"
                    class="space-badge-card"
                  >
                    <SpaceCard
                      variant="dark"
                      elevation="low"
                      className="h-full grayscale hover:grayscale-0 transition-all duration-300"
                    >
                      <!-- En-tête du badge avec image et titre -->
                      <div class="flex items-center mb-4">
                        <div class="relative flex-shrink-0 mr-4">
                          <img
                            :src="badge.imageUrl"
                            :alt="badge.title"
                            class="h-16 w-16 rounded-full border-2 border-background-bg-light object-cover opacity-70"
                            loading="lazy"
                            @error="(e) => ((e.target as HTMLImageElement).src = '/img/badge-placeholder.jpg')"
                          />
                        </div>
                        <div class="flex-1">
                          <h3
                            class="text-normal-text-muted text-lg font-heading"
                          >
                            {{ badge.title }}
                          </h3>
                          <SpaceBadge
                            variant="secondary"
                            size="sm"
                            className="mt-1 opacity-70"
                            >ACS</SpaceBadge
                          >
                        </div>
                      </div>

                      <!-- Bouton pour voir les joueurs -->
                      <SpaceButton
                        variant="ghost"
                        size="sm"
                        className="w-full mt-auto opacity-75 cursor-not-allowed"
                        disabled
                      >
                        Ce badge n'a pas encore été attribué
                      </SpaceButton>
                    </SpaceCard>
                  </div>
                </div>
              </SpaceCard>
            </div>

            <!-- Section Badges de Jeux disponibles (par jeu) -->
            <template v-for="game in gamesWithAvailableBadges" :key="game._id">
              <div
                v-if="
                  selectedGameFilter === 'all' ||
                  selectedGameFilter === game._id
                "
                class="mb-6"
              >
                <SpaceCard
                  variant="primary"
                  className="overflow-hidden opacity-70"
                >
                  <div class="p-4 border-b border-background-bg-light/30">
                    <h2 class="text-xl font-heading text-normal-text-muted">
                      {{ game.name }}
                    </h2>
                  </div>

                  <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
                  >
                    <div
                      v-for="badge in getAvailableBadgesByGame(game._id)"
                      :key="badge._id"
                      class="space-badge-card"
                    >
                      <SpaceCard
                        variant="dark"
                        elevation="low"
                        className="h-full grayscale hover:grayscale-0 transition-all duration-300"
                      >
                        <!-- En-tête du badge avec image et titre -->
                        <div class="flex items-center mb-4">
                          <div class="relative flex-shrink-0 mr-4">
                            <img
                              :src="badge.imageUrl"
                              :alt="badge.title"
                              class="h-16 w-16 rounded-full border-2 border-background-bg-light object-cover opacity-70"
                              loading="lazy"
                              @error="(e) => ((e.target as HTMLImageElement).src = '/img/badge-placeholder.jpg')"
                            />
                          </div>
                          <div class="flex-1">
                            <h3
                              class="text-normal-text-muted text-lg font-heading"
                            >
                              {{ badge.title }}
                            </h3>
                            <SpaceBadge
                              variant="primary"
                              size="sm"
                              className="mt-1 opacity-70 max-w-full truncate"
                            >
                              {{ game.name }}
                            </SpaceBadge>
                          </div>
                        </div>

                        <!-- Bouton pour voir les joueurs -->
                        <SpaceButton
                          variant="ghost"
                          size="sm"
                          className="w-full mt-auto opacity-75 cursor-not-allowed"
                          disabled
                        >
                          Ce badge n'a pas encore été attribué
                        </SpaceButton>
                      </SpaceCard>
                    </div>
                  </div>
                </SpaceCard>
              </div>
            </template>

            <!-- Message si aucun badge disponible ne correspond au filtre -->
            <SpaceTerminal
              v-if="filteredAvailableBadges.length === 0"
              :command="`Filtre: ${
                selectedGameFilter !== 'all'
                  ? 'jeu=' + selectedGameFilter
                  : 'tous les jeux'
              }`"
              title="Avis de recherche : Badges disponibles"
              :showCursor="false"
              className="my-8"
            >
              <div class="text-color-error font-mono">
                Aucun badge disponible pour ce filtre
              </div>
              <div class="text-normal-text-muted mt-2">
                Pour le jeu sélectionné, tous les badges ont déjà été attribués
                à au moins un joueur.
              </div>
            </SpaceTerminal>
          </div>

          <!-- Message si tous les badges ont été attribués -->
          <SpaceTerminal
            v-else
            command="Tous les badges disponibles ont été attribués à au moins un joueur"
            title="Avis de recherche : Badges disponibles"
            :showCursor="false"
            className="my-8"
          >
            <div class="text-color-success font-mono">Félicitations!</div>
            <div class="text-normal-text-muted mt-2">
              Tous les badges disponibles ont déjà été attribués à au moins un
              joueur.
            </div>
          </SpaceTerminal>
        </div>
      </transition>

      <!-- Message si aucun badge -->
      <transition name="fade">
        <SpaceTerminal
          v-if="!loading && badges.length === 0"
          command="Système d'insignes en cours d'initialisation"
          title="Informations système"
          :showCursor="false"
          className="my-8"
        >
          <div class="text-color-warning font-mono">
            Initialisation en cours
          </div>
          <div class="text-normal-text-muted mt-2">
            Le système de badges est en cours de développement. De nouveaux
            badges seront ajoutés prochainement pour récompenser les joueurs.
          </div>
        </SpaceTerminal>
      </transition>
    </div>
  </SpaceContainer>

  <!-- Modal détail badge -->
  <!-- La modale est déplacée en dehors du SpaceContainer pour un positionnement correct -->
  <SpaceModal
    v-model="showModal"
    :title="selectedBadge ? selectedBadge.title : ''"
  >
    <div v-if="selectedBadge" class="space-y-6">
      <!-- Image et description du badge -->
      <div class="flex flex-col items-center">
        <div class="relative mb-4" :class="getBadgeRarityClass(selectedBadge)">
          <img
            :src="selectedBadge.imageUrl"
            :alt="selectedBadge.title"
            class="h-32 w-32 rounded-full border-4 border-color-primary object-cover badge-detail-image"
            @error="(e) => ((e.target as HTMLImageElement).src = '/img/badge-placeholder.jpg')"
          />
          <!-- Far West: pas de halo lumineux -->
        </div>

        <div class="flex items-center gap-2 mb-2">
          <SpaceBadge
            :variant="
              selectedBadge.categoryType === 'acs' ? 'secondary' : 'primary'
            "
            size="lg"
          >
            {{
              selectedBadge.categoryType === "acs"
                ? "ACS"
                : getGameName(selectedBadge.categoryId)
            }}
          </SpaceBadge>
          <!-- Badge de rareté si applicable -->
          <SpaceBadge
            v-if="
              getBadgeRarityClass(selectedBadge) === 'special-badge-legendary'
            "
            variant="gold"
            size="lg"
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white border-0"
          >
            LÉGENDAIRE
          </SpaceBadge>
          <SpaceBadge
            v-else-if="
              getBadgeRarityClass(selectedBadge) === 'special-badge-gold'
            "
            variant="gold"
            size="lg"
          >
            RARE
          </SpaceBadge>
          <SpaceBadge
            v-else-if="
              getBadgeRarityClass(selectedBadge) === 'special-badge-silver'
            "
            variant="silver"
            size="lg"
          >
            PEU COMMUN
          </SpaceBadge>
          <SpaceBadge
            v-else-if="
              getBadgeRarityClass(selectedBadge) === 'special-badge-bronze'
            "
            variant="bronze"
            size="lg"
          >
            SPÉCIAL
          </SpaceBadge>
        </div>

        <p
          class="text-normal-text-muted text-center bg-background-bg-light/20 p-4 rounded border border-background-bg-light/30 text-sm mt-4"
        >
          {{
            selectedBadge.description ||
            "Aucune description disponible pour ce badge."
          }}
        </p>
      </div>

      <!-- Liste des joueurs -->
      <div>
        <h4 class="text-normal-text font-heading mb-3 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-color-primary-light"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
            />
          </svg>
          Joueurs avec ce badge ({{
            selectedBadge._id ? getBadgePlayers(selectedBadge._id).length : 0
          }})
        </h4>

        <div
          class="bg-background-bg-light/20 rounded-lg border border-background-bg-light/30 max-h-80 overflow-y-auto"
        >
          <div
            v-if="
              selectedBadge._id && getBadgePlayers(selectedBadge._id).length > 0
            "
          >
            <div
              v-for="player in getBadgePlayers(selectedBadge._id)"
              :key="player._id"
              class="flex items-center p-3 border-b border-background-bg-light/30 hover:bg-background-bg-light/30 transition-all duration-300 transform-gpu hover:translate-x-1"
            >
              <div
                class="h-10 w-10 rounded-full bg-background-bg-light flex items-center justify-center border border-color-primary-light text-white mr-3 overflow-hidden transform-gpu transition-all duration-300 hover:scale-110"
              >
                <img
                  v-if="getUserAvatar(player)"
                  :src="getUserAvatar(player)"
                  alt="Avatar"
                  class="w-full h-full object-cover"
                  loading="lazy"
                  @error="(e) => ((e.target as HTMLImageElement).src = '/img/avatar-placeholder.jpg')"
                />
                <span v-else>{{ getInitials(player.username) }}</span>
              </div>
              <router-link
                :to="`/profil/${player._id}`"
                class="text-color-primary-light hover:text-color-primary transition-all duration-300 font-heading hover:underline"
              >
                {{ player.username }}
              </router-link>
            </div>
          </div>
          <div v-else class="p-4 text-normal-text-muted italic text-center">
            Aucun joueur n'a encore obtenu ce badge
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <SpaceButton @click="showModal = false" variant="primary">
          Fermer
        </SpaceButton>
      </div>
    </template>
  </SpaceModal>
</template>

<script setup lang="ts">
//------------------------------------------------------
// 1. IMPORTS
//------------------------------------------------------
import { ref, onMounted, computed } from "vue";
import badgeService from "../services/badgeService";
import playerService from "../services/playerService";
import userService from "../services/userService";
import gameService from "../services/gameService";
import type { Badge, Player } from "../types";

//------------------------------------------------------
// 2. ÉTAT ET RÉFÉRENCES
//------------------------------------------------------
// Données principales
const badges = ref<Badge[]>([]);
const players = ref<Player[]>([]);
const games = ref<any[]>([]);
const users = ref<any[]>([]);

// Interface utilisateur
const loading = ref(true);
const activeTab = ref("assigned"); // 'assigned' ou 'available'
const selectedGameFilter = ref("all");
const selectedBadge = ref<Badge | null>(null);
const showModal = ref(false);

//------------------------------------------------------
// 3. PROPRIÉTÉS CALCULÉES
//------------------------------------------------------
// 3.1 Filtres de base pour les badges
const assignedBadges = computed(() => {
  return badges.value.filter((badge) =>
    players.value.some(
      (player) =>
        player.badges &&
        player.badges.some((playerBadge) =>
          typeof playerBadge === "string"
            ? playerBadge === badge._id
            : playerBadge._id === badge._id
        )
    )
  );
});

const availableBadges = computed(() => {
  return badges.value.filter(
    (badge) =>
      !players.value.some(
        (player) =>
          player.badges &&
          player.badges.some((playerBadge) =>
            typeof playerBadge === "string"
              ? playerBadge === badge._id
              : playerBadge._id === badge._id
          )
      )
  );
});

// 3.2 Filtres par type (ACS vs Jeux)
const assignedAcsBadges = computed(() => {
  return assignedBadges.value.filter((badge) => badge.categoryType === "acs");
});

const filteredAssignedAcsBadges = computed(() => {
  return assignedAcsBadges.value;
});

const availableAcsBadges = computed(() => {
  return availableBadges.value.filter((badge) => badge.categoryType === "acs");
});

const filteredAvailableAcsBadges = computed(() => {
  return availableAcsBadges.value;
});

// 3.3 Filtres par jeu sélectionné
const filteredAssignedBadges = computed(() => {
  if (selectedGameFilter.value === "all") {
    return assignedBadges.value;
  } else if (selectedGameFilter.value === "acs") {
    return assignedBadges.value.filter((badge) => badge.categoryType === "acs");
  } else {
    return assignedBadges.value.filter(
      (badge) =>
        badge.categoryType === "game" &&
        badge.categoryId === selectedGameFilter.value
    );
  }
});

const filteredAvailableBadges = computed(() => {
  if (selectedGameFilter.value === "all") {
    return availableBadges.value;
  } else if (selectedGameFilter.value === "acs") {
    return availableBadges.value.filter(
      (badge) => badge.categoryType === "acs"
    );
  } else {
    return availableBadges.value.filter(
      (badge) =>
        badge.categoryType === "game" &&
        badge.categoryId === selectedGameFilter.value
    );
  }
});

// 3.4 Listes des jeux avec badges
const gamesWithAssignedBadges = computed(() => {
  const gameIds = new Set();

  assignedBadges.value.forEach((badge) => {
    if (badge.categoryType === "game" && badge.categoryId) {
      gameIds.add(badge.categoryId);
    }
  });

  return games.value
    .filter((game) => gameIds.has(game._id))
    .sort((a, b) => a.name.localeCompare(b.name));
});

const gamesWithAvailableBadges = computed(() => {
  const gameIds = new Set();

  availableBadges.value.forEach((badge) => {
    if (badge.categoryType === "game" && badge.categoryId) {
      gameIds.add(badge.categoryId);
    }
  });

  return games.value
    .filter((game) => gameIds.has(game._id))
    .sort((a, b) => a.name.localeCompare(b.name));
});

//------------------------------------------------------
// 4. MÉTHODES
//------------------------------------------------------
// 4.1 Chargement des données
const fetchData = async () => {
  try {
    loading.value = true;
    const [badgesData, playersData, usersData, gamesData] = await Promise.all([
      badgeService.getBadges(),
      playerService.getPlayers(),
      userService.fetchAllUsers(),
      gameService.getGames(),
    ]);

    badges.value = badgesData;
    players.value = playersData;
    users.value = usersData;
    games.value = gamesData;
  } catch (error) {
    console.error("Erreur lors du chargement des données:", error);
  } finally {
    loading.value = false;
  }
};

// 4.2 Méthodes d'aide pour filtrer et afficher les badges
const getAssignedBadgesByGame = (gameId: string) => {
  return assignedBadges.value.filter(
    (badge) => badge.categoryType === "game" && badge.categoryId === gameId
  );
};

const getAvailableBadgesByGame = (gameId: string) => {
  return availableBadges.value.filter(
    (badge) => badge.categoryType === "game" && badge.categoryId === gameId
  );
};

const getBadgePlayers = (badgeId: string): Player[] => {
  return players.value.filter(
    (player) =>
      player.badges &&
      player.badges.some((badge) =>
        typeof badge === "string" ? badge === badgeId : badge._id === badgeId
      )
  );
};

const getGameName = (gameId: string): string => {
  if (!gameId) return "";
  const game = games.value.find((g) => g._id === gameId);
  return game ? game.name : "Jeu inconnu";
};

// 4.3 Méthodes pour l'interface utilisateur
const handleFilterChange = () => {
  // Animation visuelle lors du changement de filtre
  const filterCards = document.querySelectorAll(".space-badge-card");
  filterCards.forEach((card) => {
    (card as HTMLElement).style.opacity = "0.5";
    setTimeout(() => {
      (card as HTMLElement).style.opacity = "1";
    }, 300);
  });
};

const switchTab = (tab: string) => {
  // Applique la transition avec un effet de scroll doux si nécessaire
  activeTab.value = tab;

  // Scroll en douceur vers le haut de la section des badges
  setTimeout(() => {
    const badgesElement = document.querySelector(".space-tabs");
    if (badgesElement) {
      badgesElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 100);
};

const getBadgeRarityClass = (badge: Badge): string => {
  if (!badge) return "";

  // Si le badge a un champ rarity explicite
  if (badge.rarity) {
    switch (badge.rarity.toLowerCase()) {
      case "legendary":
        return "special-badge-legendary";
      case "gold":
        return "special-badge-gold";
      case "silver":
        return "special-badge-silver";
      case "bronze":
        return "special-badge-bronze";
      default:
        return "";
    }
  }

  // Sinon, détermine la rareté en fonction du nombre de joueurs qui ont ce badge
  if (badge._id) {
    const playersWithBadge = getBadgePlayers(badge._id).length;
    const totalPlayers = players.value.length;

    if (totalPlayers === 0) return "";

    // Badge légendaire: une seule personne le possède
    if (playersWithBadge === 1) return "special-badge-legendary";

    const percentage = (playersWithBadge / totalPlayers) * 100;

    // Badge or: très rare (moins de 5% des joueurs)
    if (percentage <= 5) return "special-badge-gold";
    // Badge argent: rare (moins de 15% des joueurs)
    if (percentage <= 15) return "special-badge-silver";
    // Badge bronze: peu commun (moins de 30% des joueurs)
    if (percentage <= 30) return "special-badge-bronze";
  }

  return "";
};

const getUserAvatar = (player: Player): string | undefined => {
  if (!player || !player.userId) return undefined;
  const user = users.value.find((u) => u._id === player.userId);
  return user?.avatarUrl || undefined;
};

const getInitials = (username: string): string => {
  if (!username) return "?";
  return username.charAt(0).toUpperCase();
};

const selectBadge = (badge: Badge) => {
  selectedBadge.value = badge;
  showModal.value = true;
};

//------------------------------------------------------
// 5. CYCLE DE VIE ET OBSERVATEURS
//------------------------------------------------------
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.space-badge-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

/* Animation de transition pour le changement d'onglet */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Onglets Western: soulignement discret au hover */
.west-tabs .tab-button {
  position: relative;
}
.west-tabs .tab-button::after {
  content: "";
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: -2px;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(var(--color-card-border-rgb, 194, 143, 44), 0.8),
    transparent
  );
  opacity: 0;
  transition: opacity 0.2s ease;
}
.west-tabs .tab-button:hover::after {
  opacity: 1;
}

/* Pas d'effets de lueur cyclique pour Far West */

/* Encarts spéciaux (garde la structure, supprime les halos agressifs) */
.special-badge-legendary,
.special-badge-gold,
.special-badge-silver,
.special-badge-bronze {
  position: relative;
}

.special-badge-legendary::before,
.special-badge-gold::before,
.special-badge-silver::before,
.special-badge-bronze::before {
  content: "";
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

/* Légende: adoucit l'effet (sans animation) */
.special-badge-legendary:hover::before {
  opacity: 0.12;
  background: radial-gradient(circle, var(--color-gold) 0%, transparent 70%);
}

.special-badge-gold:hover::before {
  opacity: 0.15;
  background: radial-gradient(circle, var(--color-gold) 0%, transparent 70%);
}

.special-badge-silver:hover::before {
  opacity: 0.15;
  background: radial-gradient(circle, var(--color-silver) 0%, transparent 70%);
}

.special-badge-bronze:hover::before {
  opacity: 0.15;
  background: radial-gradient(circle, var(--color-bronze) 0%, transparent 70%);
}

/* Suppression des animations de lueur tournante */
</style>
