<template>
  <div class="container mx-auto p-8 pt-20">
    <!-- En-tête -->
    <SpaceHeader
      title="GESTION DES NIVEAUX"
      titleSize="3xl"
      :showMissionInfo="true"
      mission="LEVEL-MGMT"
    >
      <template #badge v-if="filteredPlayerLevels.length > 0">
        <SpaceBadge variant="secondary" size="lg">{{
          filteredPlayerLevels.length
        }}</SpaceBadge>
      </template>
    </SpaceHeader>

    <!-- Panel principal -->
    <SpaceCard
      variant="primary"
      :stars="true"
      :decorated="true"
      className="mb-8"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Sélection de jeu -->
        <div>
          <label
            for="gameSelect"
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
            Sélectionner un jeu
          </label>
          <SpaceDropdown
            id="gameSelect"
            v-model="selectedGameId"
            @change="fetchPlayerLevels"
            placeholder="Tous les jeux"
          >
            <option value="">Tous les jeux</option>
            <option v-for="game in games" :key="game._id" :value="game._id">
              {{ game.name }}
            </option>
          </SpaceDropdown>
        </div>

        <!-- Sélection de tournoi (affiché uniquement si un jeu est sélectionné) -->
        <div v-if="selectedGameId">
          <label
            for="tournamentSelect"
            class="text-lg text-space-primary-light mb-2 font-nasa flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"
              />
            </svg>
            Filtrer par tournoi (optionnel)
          </label>
          <SpaceDropdown
            id="tournamentSelect"
            v-model="selectedTournamentId"
            @change="filterPlayersByTournament"
            placeholder="Tous les joueurs"
          >
            <option value="">Tous les joueurs</option>
            <option
              v-for="tournament in tournaments"
              :key="tournament._id"
              :value="tournament._id"
            >
              {{ tournament.name }} - {{ formatDate(tournament.date) }}
            </option>
          </SpaceDropdown>
        </div>
      </div>
    </SpaceCard>

    <!-- Résultats -->
    <SpaceCard
      variant="secondary"
      :stars="true"
      :decorated="true"
      className="mb-8"
    >
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
                d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"
              />
            </svg>
            <SpaceTitle size="lg">
              <span v-if="selectedTournamentId">
                Joueurs du tournoi inscrits à
                <span class="text-space-accent">{{ selectedGameName }}</span>
              </span>
              <span v-else-if="selectedGameId">
                Joueurs ayant défini leur niveau sur
                <span class="text-space-accent">{{ selectedGameName }}</span>
              </span>
              <span v-else>
                Tous les niveaux de jeux ({{ filteredPlayerLevels.length }})
              </span>
            </SpaceTitle>
          </div>

          <div v-if="filteredPlayerLevels.length > 0" class="flex items-center">
            <SpaceButton
              @click="exportToCSV"
              variant="secondary"
              size="sm"
              icon
              className="ml-2"
            >
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </template>
              Exporter
            </SpaceButton>
          </div>
        </div>
      </template>

      <!-- Loader -->
      <div v-if="loading" class="flex justify-center py-12">
        <SpaceLoader size="lg" text="Analyse des niveaux de jeu en cours..." />
      </div>

      <!-- Message quand aucun jeu n'est sélectionné -->
      <SpaceTerminal
        v-else-if="!selectedGameId && filteredPlayerLevels.length === 0"
        command="scan --game-levels --all"
        title="Analyse des niveaux"
        :showCursor="true"
        className="my-8"
      >
        <div class="text-space-text-muted">
          Aucun niveau de jeu défini pour le moment
        </div>
      </SpaceTerminal>

      <!-- Aucun résultat -->
      <SpaceTerminal
        v-else-if="filteredPlayerLevels.length === 0"
        :command="`search --levels ${
          selectedGameId ? '--game=' + selectedGameId : ''
        } ${
          selectedTournamentId ? '--tournament=' + selectedTournamentId : ''
        }`"
        title="Recherche de niveaux"
        :showCursor="true"
        className="my-8"
      >
        <div class="text-space-error font-mono">
          Erreur 404: Aucun joueur trouvé pour ce critère de recherche.
        </div>
        <div class="text-space-text-muted mt-2">
          Essayez de modifier vos critères de recherche.
        </div>
      </SpaceTerminal>

      <!-- Tableau des joueurs - Version desktop -->
      <div v-else class="hidden md:block relative">
        <div
          ref="topScrollBarContainer"
          class="h-3 mb-1 rounded-lg bg-space-bg-dark/50 overflow-x-auto scrollbar-thin"
          @scroll="syncScroll('top')"
        >
          <div :style="{ width: tableWidth + 'px', height: '1px' }"></div>
        </div>
        <div
          ref="tableContainer"
          class="overflow-x-auto scrollbar-thin"
          @scroll="syncScroll('bottom')"
        >
          <table
            ref="dataTable"
            class="min-w-full border border-space-secondary/30 rounded-lg overflow-hidden"
          >
            <thead>
              <tr
                class="bg-space-bg-light/10 border-b border-space-secondary/30"
              >
                <th
                  class="py-3 px-4 text-left text-xs font-nasa text-space-secondary-light uppercase tracking-wider"
                >
                  Joueur
                </th>
                <!-- Ajout de la colonne Jeu quand aucun filtre n'est appliqué -->
                <th
                  v-if="!selectedGameId"
                  class="py-3 px-4 text-left text-xs font-nasa text-space-secondary-light uppercase tracking-wider w-40"
                >
                  Jeu
                </th>
                <th
                  class="py-3 px-4 text-left text-xs font-nasa text-space-secondary-light uppercase tracking-wider"
                >
                  Pseudo dans le jeu
                </th>
                <th
                  class="py-3 px-4 text-left text-xs font-nasa text-space-secondary-light uppercase tracking-wider"
                >
                  Niveau
                </th>
                <th
                  class="py-3 px-4 text-left text-xs font-nasa text-space-secondary-light uppercase tracking-wider"
                >
                  Rang
                </th>
                <th
                  v-if="!selectedGameId || selectedGameHasRoles"
                  class="py-3 px-4 text-left text-xs font-nasa text-space-secondary-light uppercase tracking-wider"
                >
                  Rôles
                </th>
                <th
                  class="py-3 px-4 text-left text-xs font-nasa text-space-secondary-light uppercase tracking-wider"
                >
                  Commentaire
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-space-bg-light/10">
              <tr
                v-for="playerLevel in filteredPlayerLevels"
                :key="playerLevel._id"
                class="hover:bg-space-bg-light/5 transition-colors duration-150"
              >
                <td class="py-4 px-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="avatar-container">
                      <img
                        v-if="playerLevel.player.userInfo?.avatarUrl"
                        :src="playerLevel.player.userInfo.avatarUrl"
                        class="w-8 h-8 rounded-full object-cover border-2 border-space-primary shadow-glow-primary"
                        alt="Avatar"
                        loading="lazy"
                        @error="handleImageError($event)"
                      />
                      <div
                        v-else
                        class="w-8 h-8 rounded-full bg-space-bg-light flex items-center justify-center border-2 border-space-accent"
                      >
                        <span class="text-space-accent text-xs font-bold">{{
                          getUserInitials(
                            playerLevel.player.username || "inconnu"
                          )
                        }}</span>
                      </div>
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-nasa text-space-text">
                        {{ playerLevel.player.username }}
                      </div>
                      <div
                        v-if="playerLevel.player.userInfo?.username"
                        class="text-xs text-space-text-muted"
                      >
                        {{ playerLevel.player.userInfo.username }}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  v-if="!selectedGameId"
                  class="py-4 px-4 whitespace-nowrap max-w-[160px]"
                >
                  <div class="flex items-center">
                    <img
                      v-if="getGameImage(playerLevel)"
                      :src="getGameImage(playerLevel)"
                      class="w-6 h-6 rounded object-cover mr-2 flex-shrink-0"
                      alt="Logo du jeu"
                      loading="lazy"
                      @error="handleImageError($event)"
                    />
                    <span
                      class="text-xs font-medium text-space-text truncate"
                      :title="getGameName(playerLevel)"
                    >
                      {{ getGameName(playerLevel) }}
                    </span>
                  </div>
                </td>
                <td class="py-4 px-4 whitespace-nowrap">
                  <div class="text-sm text-space-text">
                    {{ playerLevel.gameUsername || "Non renseigné" }}
                  </div>
                </td>
                <td class="py-4 px-4 whitespace-nowrap">
                  <SpaceBadge
                    :variant="getLevelBadgeVariant(playerLevel.level)"
                    className="px-2 py-1"
                  >
                    {{ capitalizeFirstLetter(playerLevel.level) }}
                  </SpaceBadge>
                </td>
                <td class="py-4 px-4 whitespace-nowrap">
                  <div
                    v-if="playerLevel.isRanked && playerLevel.rank"
                    class="flex items-center"
                  >
                    <span
                      :class="[
                        'h-2 w-2 rounded-full mr-2',
                        getRankClass(playerLevel.rank).replace('text-', 'bg-'),
                      ]"
                      :style="{
                        boxShadow: `0 0 5px ${getRankColor(playerLevel.rank)}`,
                      }"
                    ></span>
                    <span
                      :class="[
                        'text-sm font-medium',
                        getRankClass(playerLevel.rank),
                      ]"
                      :style="getRankStyle(playerLevel.rank)"
                    >
                      {{ playerLevel.rank }}
                    </span>
                  </div>
                  <div v-else class="text-sm text-space-text-muted">
                    Non classé
                  </div>
                </td>
                <td
                  v-if="!selectedGameId || selectedGameHasRoles"
                  class="py-4 px-4"
                >
                  <div
                    v-if="
                      playerLevel.selectedRoles &&
                      playerLevel.selectedRoles.length > 0
                    "
                  >
                    <!-- Afficher "Fill" si tous les rôles sont sélectionnés -->
                    <SpaceBadge
                      v-if="
                        hasAllRoles(playerLevel.game, playerLevel.selectedRoles)
                      "
                      variant="primary"
                      className="flex items-center"
                      :title="playerLevel.selectedRoles.join(', ')"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3.5 w-3.5 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path
                          fill-rule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Fill
                    </SpaceBadge>

                    <!-- Afficher les rôles individuels si certains sont sélectionnés -->
                    <div v-else class="flex flex-wrap gap-1">
                      <template
                        v-for="roleName in playerLevel.selectedRoles.slice(
                          0,
                          3
                        )"
                        :key="roleName"
                      >
                        <span
                          class="inline-flex items-center px-2 py-0.5 text-xs rounded-full truncate max-w-[80px] border"
                          :style="getRoleStyle(playerLevel.game, roleName)"
                          :title="roleName"
                        >
                          <span class="truncate">{{ roleName }}</span>
                        </span>
                      </template>

                      <!-- Indicateur "+N" si plus de 3 rôles -->
                      <span
                        v-if="playerLevel.selectedRoles.length > 3"
                        class="px-2 py-0.5 text-xs bg-space-bg-light/30 text-space-text-muted rounded-full cursor-help border border-space-bg-light/50"
                        :title="playerLevel.selectedRoles.slice(3).join(', ')"
                      >
                        +{{ playerLevel.selectedRoles.length - 3 }}
                      </span>
                    </div>
                  </div>
                  <div v-else class="text-sm text-space-text-muted">
                    Non spécifié
                  </div>
                </td>
                <td class="py-4 px-4 max-w-xs">
                  <div
                    v-if="playerLevel.comment"
                    class="text-sm text-space-text"
                  >
                    <div class="relative group">
                      <!-- Commentaire tronqué -->
                      <div class="truncate max-w-xs">
                        {{ playerLevel.comment }}
                      </div>

                      <!-- Tooltip pour afficher le commentaire complet au survol -->
                      <div
                        class="absolute left-0 -bottom-1 translate-y-full w-72 z-30 hidden group-hover:block bg-space-bg-dark border border-space-secondary/40 p-3 rounded-lg shadow-glow-secondary whitespace-pre-wrap break-words"
                      >
                        <div class="text-sm text-space-text">
                          {{ playerLevel.comment }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="text-sm text-space-text-muted">
                    Aucun commentaire
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Vue mobile - cartes empilées -->
      <div class="md:hidden space-y-4">
        <div
          v-for="playerLevel in filteredPlayerLevels"
          :key="playerLevel._id"
          class="bg-space-bg-light/5 border border-space-secondary/30 rounded-lg p-4 hover:shadow-glow-secondary hover:border-space-secondary/50 transition-all duration-300"
        >
          <!-- En-tête de la carte avec avatar et nom -->
          <div
            class="flex items-center mb-3 pb-2 border-b border-space-secondary/20"
          >
            <div class="avatar-container">
              <img
                v-if="playerLevel.player.userInfo?.avatarUrl"
                :src="playerLevel.player.userInfo.avatarUrl"
                class="w-10 h-10 rounded-full object-cover border-2 border-space-primary shadow-glow-primary"
                alt="Avatar"
                loading="lazy"
                @error="handleImageError($event)"
              />
              <div
                v-else
                class="w-10 h-10 rounded-full bg-space-bg-light flex items-center justify-center border-2 border-space-accent"
              >
                <span class="text-space-accent text-sm font-bold">
                  {{
                    getUserInitials(playerLevel.player.username || "inconnu")
                  }}
                </span>
              </div>
            </div>
            <div class="ml-3">
              <div class="text-base font-nasa text-space-text">
                {{ playerLevel.player.username }}
              </div>
              <div
                v-if="playerLevel.player.userInfo?.username"
                class="text-xs text-space-text-muted"
              >
                {{ playerLevel.player.userInfo.username }}
              </div>
            </div>
          </div>

          <!-- Informations du jeu quand aucun filtre n'est appliqué -->
          <div v-if="!selectedGameId" class="flex items-center mb-3">
            <div
              class="text-xs text-space-secondary-light font-nasa uppercase w-24"
            >
              Jeu
            </div>
            <div class="flex items-center max-w-[calc(100%-96px)]">
              <img
                v-if="getGameImage(playerLevel)"
                :src="getGameImage(playerLevel)"
                class="w-6 h-6 rounded object-cover mr-2 flex-shrink-0"
                alt="Logo du jeu"
                loading="lazy"
                @error="handleImageError($event)"
              />
              <span
                class="text-xs font-medium text-space-text truncate"
                :title="getGameName(playerLevel)"
              >
                {{ getGameName(playerLevel) }}
              </span>
            </div>
          </div>

          <!-- Pseudo dans le jeu -->
          <div class="flex items-start mb-3">
            <div
              class="text-xs text-space-secondary-light font-nasa uppercase w-24"
            >
              Pseudo jeu
            </div>
            <div class="text-sm text-space-text">
              {{ playerLevel.gameUsername || "Non renseigné" }}
            </div>
          </div>

          <!-- Niveau -->
          <div class="flex items-start mb-3">
            <div
              class="text-xs text-space-secondary-light font-nasa uppercase w-24"
            >
              Niveau
            </div>
            <SpaceBadge
              :variant="getLevelBadgeVariant(playerLevel.level)"
              className="px-2 py-1"
            >
              {{ capitalizeFirstLetter(playerLevel.level) }}
            </SpaceBadge>
          </div>

          <!-- Rang -->
          <div class="flex items-start mb-3">
            <div
              class="text-xs text-space-secondary-light font-nasa uppercase w-24"
            >
              Rang
            </div>
            <div
              v-if="playerLevel.isRanked && playerLevel.rank"
              class="flex items-center"
            >
              <span
                :class="[
                  'h-2 w-2 rounded-full mr-2',
                  getRankClass(playerLevel.rank).replace('text-', 'bg-'),
                ]"
                :style="{
                  boxShadow: `0 0 5px ${getRankColor(playerLevel.rank)}`,
                }"
              ></span>
              <span
                :class="['text-sm font-medium', getRankClass(playerLevel.rank)]"
                :style="getRankStyle(playerLevel.rank)"
              >
                {{ playerLevel.rank }}
              </span>
            </div>
            <div v-else class="text-sm text-space-text-muted">Non classé</div>
          </div>

          <!-- Rôles -->
          <div
            v-if="!selectedGameId || selectedGameHasRoles"
            class="flex items-start mb-3"
          >
            <div
              class="text-xs text-space-secondary-light font-nasa uppercase w-24"
            >
              Rôles
            </div>
            <div
              v-if="
                playerLevel.selectedRoles &&
                playerLevel.selectedRoles.length > 0
              "
            >
              <!-- Afficher "Fill" si tous les rôles sont sélectionnés -->
              <SpaceBadge
                v-if="hasAllRoles(playerLevel.game, playerLevel.selectedRoles)"
                variant="primary"
                className="flex items-center"
                :title="playerLevel.selectedRoles.join(', ')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fill-rule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Fill
              </SpaceBadge>

              <!-- Afficher les rôles individuels si certains sont sélectionnés -->
              <div v-else class="flex flex-wrap gap-1">
                <span
                  v-for="roleName in playerLevel.selectedRoles"
                  :key="roleName"
                  class="inline-flex items-center px-2 py-0.5 text-xs rounded-full truncate max-w-[120px] border"
                  :style="getRoleStyle(playerLevel.game, roleName)"
                  :title="roleName"
                >
                  <span class="truncate">{{ roleName }}</span>
                </span>
              </div>
            </div>
            <div v-else class="text-sm text-space-text-muted">Non spécifié</div>
          </div>

          <!-- Commentaire amélioré -->
          <div class="flex items-start">
            <div
              class="text-xs text-space-secondary-light font-nasa uppercase w-24"
            >
              Commentaire
            </div>
            <div v-if="playerLevel.comment">
              <div
                class="text-sm text-space-text whitespace-pre-wrap break-words max-w-xs"
              >
                {{ playerLevel.comment }}
              </div>
            </div>
            <div v-else class="text-sm text-space-text-muted">
              Aucun commentaire
            </div>
          </div>
        </div>
      </div>
    </SpaceCard>

    <!-- Messages d'état -->
    <SpaceAlert
      v-if="error"
      variant="error"
      :title="'Erreur'"
      dismissible
      className="mb-4"
      @close="error = null"
    >
      {{ error }}
    </SpaceAlert>

    <SpaceAlert
      v-if="success"
      variant="success"
      :title="'Succès'"
      dismissible
      className="mb-4"
      @close="success = null"
    >
      {{ success }}
    </SpaceAlert>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
import gameService from "../../services/gameService";
import playerGameLevelService from "../../services/playerGameLevelService";
import tournamentService from "../../services/tournamentService";
import type { Game, Tournament, PlayerGameLevel } from "../../types";
import { getRankClass, getRankColor } from "../../utils/rankHelper"; // Ajoutez cette ligne

// État de l'interface
const loading = ref(true);
const error = ref<string | null>(null);
const success = ref<string | null>(null);

// Données
const games = ref<Game[]>([]);
const tournaments = ref<Tournament[]>([]);
const playerLevels = ref<PlayerGameLevel[]>([]);
const tournamentPlayers = ref<string[]>([]);

// Sélections
const selectedGameId = ref("");
const selectedTournamentId = ref("");

// Propriétés calculées
const selectedGameName = computed(() => {
  if (!selectedGameId.value) return "";
  const game = games.value.find((g) => g._id === selectedGameId.value);
  return game ? game.name : "";
});

// Références pour la synchronisation du défilement
const tableContainer = ref<HTMLElement | null>(null);
const topScrollBarContainer = ref<HTMLElement | null>(null);
const dataTable = ref<HTMLElement | null>(null);
const tableWidth = ref(0);

// Synchroniser le défilement entre les barres de défilement
const syncScroll = (source: "top" | "bottom") => {
  if (source === "top" && topScrollBarContainer.value && tableContainer.value) {
    tableContainer.value.scrollLeft = topScrollBarContainer.value.scrollLeft;
  } else if (
    source === "bottom" &&
    topScrollBarContainer.value &&
    tableContainer.value
  ) {
    topScrollBarContainer.value.scrollLeft = tableContainer.value.scrollLeft;
  }
};

// Calculer la largeur du tableau pour la barre de défilement supérieure
const updateTableWidth = () => {
  if (dataTable.value) {
    tableWidth.value = dataTable.value.offsetWidth;
  }
};

const filteredPlayerLevels = computed(() => {
  let filtered = [...playerLevels.value];

  // Filtrer par jeu sélectionné si ce n'est pas vide
  if (selectedGameId.value) {
    filtered = filtered.filter((level) => {
      const gameId =
        typeof level.game === "object" ? level.game._id : level.game;
      return gameId === selectedGameId.value;
    });

    // Si un tournoi est sélectionné, filtrer par joueurs de ce tournoi
    if (selectedTournamentId.value && tournamentPlayers.value.length > 0) {
      filtered = filtered.filter((level) => {
        const playerId =
          typeof level.player === "object" ? level.player._id : level.player;
        return tournamentPlayers.value.includes(playerId ?? "");
      });
    }
  }

  return filtered;
});

/**
 * Récupérer tous les jeux
 */
const fetchGames = async () => {
  try {
    const response = await gameService.getGames();
    games.value = response;
  } catch (err) {
    console.error("Erreur lors du chargement des jeux:", err);
    showMessage("error", "Erreur lors du chargement des jeux");
  }
};

/**
 * Récupérer les niveaux des joueurs pour un jeu spécifique ou tous les niveaux
 */
const fetchPlayerLevels = async () => {
  // Réinitialiser la sélection du tournoi
  selectedTournamentId.value = "";
  tournamentPlayers.value = [];

  try {
    loading.value = true;

    if (!selectedGameId.value) {
      // Si aucun jeu n'est sélectionné, récupérer tous les niveaux
      await fetchAllPlayerLevels();
    } else {
      // Récupérer les niveaux des joueurs pour ce jeu
      const response = await playerGameLevelService.getPlayerLevelsByGame(
        selectedGameId.value
      );
      playerLevels.value = response;

      // Récupérer les tournois associés à ce jeu
      const tournamentsResponse = await tournamentService.getTournamentsByGame(
        selectedGameId.value
      );
      tournaments.value = tournamentsResponse;
    }
  } catch (err) {
    console.error("Erreur lors du chargement des niveaux de jeu:", err);
    showMessage("error", "Erreur lors du chargement des niveaux de jeu");
    playerLevels.value = [];
  } finally {
    loading.value = false;
  }
};

/**
 * Récupérer tous les niveaux de tous les jeux
 */
const fetchAllPlayerLevels = async () => {
  try {
    loading.value = true;
    // Appel à une API qui récupère tous les niveaux de tous les jeux
    const response = await playerGameLevelService.getAllPlayerLevels();
    playerLevels.value = response;
  } catch (err) {
    console.error("Erreur lors du chargement des niveaux de jeu:", err);
    showMessage("error", "Erreur lors du chargement des niveaux de jeu");
    playerLevels.value = [];
  } finally {
    loading.value = false;
  }
};

/**
 * Filtrer les joueurs par tournoi
 */
const filterPlayersByTournament = async () => {
  if (!selectedTournamentId.value) {
    tournamentPlayers.value = [];
    return;
  }

  try {
    loading.value = true;

    // Récupérer le tournoi sélectionné avec les joueurs
    const tournament = await tournamentService.getTournamentById(
      selectedTournamentId.value
    );

    // Extraire tous les IDs des joueurs du tournoi (liste principale et liste d'attente)
    const playerIds = [
      ...(tournament.players || []).map((p) =>
        typeof p === "object" ? p._id : p
      ),
      ...(tournament.waitlistPlayers || []).map((p) =>
        typeof p === "object" ? p._id : p
      ),
    ];

    tournamentPlayers.value = playerIds.filter(
      (id): id is string => id !== undefined
    );
  } catch (err) {
    console.error("Erreur lors du chargement des joueurs du tournoi:", err);
    showMessage("error", "Erreur lors du chargement des joueurs du tournoi");
    tournamentPlayers.value = [];
  } finally {
    loading.value = false;
  }
};

/**
 * Obtenir la variante de badge en fonction du niveau
 */
const getLevelBadgeVariant = (level: string): string => {
  switch (level) {
    case "débutant":
      return "success";
    case "intermédiaire":
      return "info";
    case "avancé":
      return "primary";
    case "expert":
      return "accent";
    default:
      return "secondary";
  }
};

/**
 * Vérifie si le joueur a sélectionné tous les rôles disponibles
 */
const hasAllRoles = (
  game: string | Game,
  selectedRoles?: string[]
): boolean => {
  if (!selectedRoles || selectedRoles.length === 0) return false;

  if (typeof game === "object" && game?.roles && game.roles.length > 0) {
    // Si le nombre de rôles sélectionnés est égal au nombre total de rôles
    if (game.roles.length === selectedRoles.length) {
      // Vérifier que chaque rôle du jeu est dans la liste des rôles sélectionnés
      return game.roles.every((role) => selectedRoles.includes(role.name));
    }
  }
  return false;
};

// Vérifier si le jeu sélectionné a des rôles définis
const selectedGameHasRoles = computed(() => {
  if (!selectedGameId.value) {
    // Si on affiche tous les jeux, on montre la colonne des rôles
    return true;
  }

  // Trouver le jeu sélectionné pour vérifier s'il a des rôles
  const selectedGame = games.value.find((g) => g._id === selectedGameId.value);
  return selectedGame && selectedGame.roles && selectedGame.roles.length > 0;
});

/**
 * Récupérer l'image du jeu
 */
const getGameImage = (level: PlayerGameLevel): string | undefined => {
  return typeof level.game === "object" && level.game.imageUrl
    ? level.game.imageUrl
    : undefined;
};

/**
 * Récupérer le nom du jeu
 */
const getGameName = (level: PlayerGameLevel): string => {
  return typeof level.game === "object" && level.game.name
    ? level.game.name
    : "Jeu inconnu";
};
/**
 * Gère l'erreur de chargement d'image
 */
const handleImageError = (e: Event) => {
  if (e.target instanceof HTMLImageElement) {
    // Vérifier si c'est un avatar ou une image de jeu
    const isAvatar = e.target.classList.contains("rounded-full");

    if (isAvatar) {
      // Récupérer le nom d'utilisateur pour générer les initiales
      const container = e.target.closest(".avatar-container");
      const usernameElement =
        container?.parentElement?.querySelector(".text-white");
      const username = usernameElement?.textContent?.trim() || "?";
      const initials = getUserInitials(username);

      // Utiliser l'API ui-avatars pour générer un avatar
      e.target.src = `https://ui-avatars.com/api/?name=${initials}&background=6D28D9&color=F9FAFB&size=150&bold=true&font-family=monospace`;

      // Modifier le style
      e.target.classList.remove("avatar-glow");
      e.target.classList.add("border-pink-500");
    } else {
      // Pour les images de jeu, utiliser une image générique
      e.target.src = "/images/default-game.png"; // Créez cette image par défaut
      e.target.classList.add("opacity-70");
    }
  }
};

/**
 * Récupère les initiales d'un nom d'utilisateur
 */
const getUserInitials = (username: string) => {
  if (!username) return "?";
  const nameParts = username.split(" ");
  if (nameParts.length === 1) return username.charAt(0).toUpperCase();
  return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
};

/**
 * Mettre la première lettre en majuscule
 */
const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Formater une date pour l'affichage
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
/**
 * Obtenir un style personnalisé pour l'affichage du rang
 */
const getRankStyle = (rank: string) => {
  if (!rank) return {};
  const color = getRankColor(rank);
  return {
    textShadow: `0 0 8px ${color}90`,
  };
};

/**
 * Obtenir le style pour un rôle spécifique
 */
const getRoleStyle = (game: string | Game, roleName: string) => {
  if (typeof game === "object" && game && game.roles) {
    const role = game.roles.find((r) => r.name === roleName);
    if (role && role.color) {
      const bgColor = role.color;
      return {
        backgroundColor: `${bgColor}20`,
        color: bgColor,
        borderColor: `${bgColor}60`,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "100%",
      };
    }
  }

  // Style par défaut
  return {
    backgroundColor: "rgba(107, 114, 128, 0.2)",
    color: "#6B7280",
    borderColor: "rgba(107, 114, 128, 0.4)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
};
/**
 * Exporter les données en format CSV
 */
const exportToCSV = () => {
  const headers = [
    "Joueur",
    "Discord",
    "Pseudo dans le jeu",
    "Niveau",
    "Classé",
    "Rang",
    "Catégorie de rang", // Nouvelle colonne
    "Commentaire",
  ];

  // Préparer les données
  const data = filteredPlayerLevels.value.map((level) => {
    const playerName = level.player ? level.player.username : "Inconnu";
    const discordName =
      level.player && level.player.userInfo
        ? level.player.userInfo.username
        : "N/A";

    // Déterminer la catégorie de rang
    const rankCategory = level.rank
      ? getRankClass(level.rank).replace("text-", "")
      : "N/A";

    return [
      playerName,
      discordName,
      level.gameUsername || "Non renseigné",
      level.level,
      level.isRanked ? "Oui" : "Non",
      level.rank || "Non classé",
      rankCategory, // Ajout de la catégorie
      level.comment || "",
    ];
  });

  // Créer le contenu CSV
  const csvContent = [
    headers.join(","),
    ...data.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  // Créer et déclencher le téléchargement
  const gameName = selectedGameName.value || "tous-les-jeux";
  const tournamentLabel = selectedTournamentId.value ? "-tournoi" : "";
  const fileName = `niveaux-${gameName}${tournamentLabel}-${
    new Date().toISOString().split("T")[0]
  }.csv`;

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Afficher un message
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

const fetchTournamentsForGame = async (gameId: string) => {
  try {
    // Réinitialiser la sélection du tournoi
    selectedTournamentId.value = "";
    tournamentPlayers.value = [];

    // Récupérer les tournois associés à ce jeu
    const tournamentsResponse = await tournamentService.getTournamentsByGame(
      gameId
    );
    tournaments.value = tournamentsResponse;
  } catch (err) {
    console.error("Erreur lors du chargement des tournois:", err);
    showMessage("error", "Erreur lors du chargement des tournois");
    tournaments.value = [];
  }
};

// Observer les changements de jeu sélectionné
watch(selectedGameId, () => {
  if (selectedGameId.value) {
    // Si un jeu est sélectionné, on charge les tournois associés
    fetchTournamentsForGame(selectedGameId.value);
  } else {
    // Si on désélectionne, on réinitialise juste le tournoi mais pas les niveaux
    selectedTournamentId.value = "";
    tournaments.value = [];
  }
});

watch(
  filteredPlayerLevels,
  () => {
    // Attendre que le DOM soit mis à jour
    setTimeout(updateTableWidth, 100);
  },
  { deep: true }
);

// Initialisation
onMounted(async () => {
  updateTableWidth();
  window.addEventListener("resize", updateTableWidth);

  try {
    // Chargement parallèle des jeux et de tous les niveaux
    await Promise.all([fetchGames(), fetchAllPlayerLevels()]);
  } catch (error) {
    console.error("Erreur lors de l'initialisation:", error);
  } finally {
    loading.value = false;
  }
});

// N'oubliez pas de nettoyer l'event listener
onUnmounted(() => {
  window.removeEventListener("resize", updateTableWidth);
});
</script>

<style scoped>
.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

/* Animation pour le bouton d'export */
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

.avatar-container {
  position: relative;
}

.avatar-glow {
  box-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
  transition: all 0.3s ease;
}

tr:hover .avatar-glow,
div:hover .avatar-glow {
  box-shadow: 0 0 15px rgba(34, 211, 238, 0.8);
}

[title] {
  cursor: help;
  position: relative;
}

/* Style pour l'affichage des commentaires sur mobile */
.break-words {
  word-break: break-word;
}

/* Animation du tooltip */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group:hover .group-hover\:block {
  display: block;
  animation: fadeIn 0.2s ease-out forwards;
}

/* Responsive design pour le container principal */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Styles personnalisés pour les barres de défilement */
.scrollbar-thin::-webkit-scrollbar {
  height: 8px;
}

.scrollbar-track-gray-900\/60::-webkit-scrollbar-track {
  background-color: rgba(17, 24, 39, 0.6);
  border-radius: 9999px;
}

.scrollbar-thumb-cyan-600::-webkit-scrollbar-thumb {
  background-color: rgba(8, 145, 178, 0.8);
  border-radius: 9999px;
}

.scrollbar-thumb-rounded-full::-webkit-scrollbar-thumb {
  border-radius: 9999px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: rgba(8, 145, 178, 1);
}
</style>
