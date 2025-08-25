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
        <div class="flex items-center gap-2">
          <SpaceBadge variant="secondary" size="lg">{{
            filteredPlayerLevels.length
          }}</SpaceBadge>
          <div v-if="hasActiveFilters" class="flex items-center gap-1">
            <SpaceBadge variant="accent" size="sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clip-rule="evenodd"
                />
              </svg>
              Filtré
            </SpaceBadge>
          </div>
        </div>
      </template>
    </SpaceHeader>
    <!-- Panel de recherche et filtres -->
    <SpaceCard
      variant="primary"
      :stars="true"
      :decorated="true"
      className="mb-6"
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
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
          <SpaceTitle size="lg">Recherche et Filtres</SpaceTitle>
        </div>
      </template>

      <!-- Barre de recherche principale -->
      <div class="mb-6">
        <label
          for="searchInput"
          class="text-lg text-color-primary-light mb-2 font-nasa flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
          Rechercher un joueur
        </label>
        <SpaceInput
          id="searchInput"
          v-model="searchTerm"
          placeholder="Nom d'utilisateur, pseudo Discord, pseudo dans le jeu..."
          className="w-full"
          @keydown.esc="searchTerm = ''"
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
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
          </template>
        </SpaceInput>

        <!-- Raccourcis clavier -->
        <div class="flex flex-wrap gap-2 mt-2 text-xs text-normal-text-muted">
          <span class="flex items-center">
            <kbd
              class="px-2 py-1 bg-background-bg-light/20 rounded border border-background-bg-light/30 font-mono"
              >Esc</kbd
            >
            <span class="ml-1">Effacer la recherche</span>
          </span>
        </div>
      </div>

      <!-- Filtres avancés -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <!-- Sélection de jeu -->
        <div>
          <label
            for="gameSelect"
            class="text-sm text-color-primary-light mb-2 font-nasa flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
              />
            </svg>
            Jeu
          </label>
          <SpaceDropdown
            id="gameSelect"
            v-model="selectedGameId"
            @change="fetchPlayerLevels"
            placeholder="Tous les jeux"
            size="sm"
          >
            <option value="">Tous les jeux</option>
            <option v-for="game in games" :key="game._id" :value="game._id">
              {{ game.name }}
            </option>
          </SpaceDropdown>
        </div>

        <!-- Filtre par niveau -->
        <div>
          <label
            for="levelFilter"
            class="text-sm text-color-primary-light mb-2 font-nasa flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z"
                clip-rule="evenodd"
              />
            </svg>
            Niveau
          </label>
          <SpaceDropdown
            id="levelFilter"
            v-model="selectedLevel"
            placeholder="Tous les niveaux"
            size="sm"
          >
            <option value="">Tous les niveaux</option>
            <option value="débutant">Débutant</option>
            <option value="intermédiaire">Intermédiaire</option>
            <option value="avancé">Avancé</option>
            <option value="expert">Expert</option>
          </SpaceDropdown>
        </div>

        <!-- Filtre par statut de rang -->
        <div>
          <label
            for="rankFilter"
            class="text-sm text-color-primary-light mb-2 font-nasa flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            Rang
          </label>
          <SpaceDropdown
            id="rankFilter"
            v-model="selectedRankFilter"
            placeholder="Tous les joueurs"
            size="sm"
          >
            <option value="">Tous les joueurs</option>
            <option value="ranked">Avec rang</option>
            <option value="unranked">Sans rang</option>
          </SpaceDropdown>
        </div>

        <!-- Sélection de tournoi -->
        <div v-if="selectedGameId">
          <label
            for="tournamentSelect"
            class="text-sm text-color-primary-light mb-2 font-nasa flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"
              />
            </svg>
            Tournoi
          </label>
          <SpaceDropdown
            id="tournamentSelect"
            v-model="selectedTournamentId"
            @change="filterPlayersByTournament"
            placeholder="Tous les joueurs"
            size="sm"
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
      <!-- Boutons d'action rapide et options d'affichage -->
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex flex-wrap items-center gap-2">
          <SpaceButton @click="clearAllFilters" variant="outline" size="sm">
            <template #icon>
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
            </template>
            Effacer les filtres
          </SpaceButton>

          <!-- Options de tri -->
          <SpaceDropdown v-model="sortBy" size="sm" placeholder="Trier par...">
            <option value="">Ordre par défaut</option>
            <option value="username">Nom d'utilisateur (A-Z)</option>
            <option value="username-desc">Nom d'utilisateur (Z-A)</option>
            <option value="level">Niveau (Débutant → Expert)</option>
            <option value="level-desc">Niveau (Expert → Débutant)</option>
            <option value="rank">Rang (Meilleur → Moins bon)</option>
            <option value="gameUsername">Pseudo de jeu (A-Z)</option>
          </SpaceDropdown>
        </div>

        <div class="flex items-center gap-2">
          <!-- Toggle vue tableau/cartes -->
          <div class="hidden md:flex items-center gap-1">
            <button
              @click="viewMode = 'table'"
              :class="[
                'p-2 rounded transition-colors',
                viewMode === 'table'
                  ? 'bg-color-primary text-white'
                  : 'text-normal-text-muted hover:text-normal-text',
              ]"
              title="Vue tableau"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button
              @click="viewMode = 'cards'"
              :class="[
                'p-2 rounded transition-colors',
                viewMode === 'cards'
                  ? 'bg-color-primary text-white'
                  : 'text-normal-text-muted hover:text-normal-text',
              ]"
              title="Vue cartes"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
          </div>

          <div class="text-sm text-normal-text-muted">
            {{ filteredPlayerLevels.length }} joueur{{
              filteredPlayerLevels.length > 1 ? "s" : ""
            }}
            trouvé{{ filteredPlayerLevels.length > 1 ? "s" : "" }}
            <span
              v-if="
                searchTerm ||
                selectedLevel ||
                selectedRankFilter ||
                selectedGameId
              "
              class="text-color-accent"
            >
              (filtré{{
                filteredPlayerLevels.length !== playerLevels.length ? "s" : ""
              }}
              sur {{ playerLevels.length }})
            </span>
          </div>
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
              class="h-6 w-6 mr-2 text-color-secondary-light"
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
                <span class="text-color-accent">{{ selectedGameName }}</span>
              </span>
              <span v-else-if="selectedGameId">
                Joueurs ayant défini leur niveau sur
                <span class="text-color-accent">{{ selectedGameName }}</span>
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
        v-else-if="
          !selectedGameId && filteredPlayerLevels.length === 0 && !searchTerm
        "
        command="scan --game-levels --all"
        title="Analyse des niveaux"
        :showCursor="true"
        className="my-8"
      >
        <div class="text-normal-text-muted">
          Aucun niveau de jeu défini pour le moment
        </div>
        <div class="text-normal-text-muted mt-2">
          → Sélectionnez un jeu pour voir les niveaux des joueurs
        </div>
      </SpaceTerminal>

      <!-- Aucun résultat pour la recherche -->
      <SpaceTerminal
        v-else-if="filteredPlayerLevels.length === 0 && searchTerm"
        command="search --levels --query='${searchTerm}'"
        title="Recherche de joueurs"
        :showCursor="true"
        className="my-8"
      >
        <div class="text-color-error font-mono">
          Erreur 404: Aucun joueur trouvé pour "{{ searchTerm }}".
        </div>
        <div class="text-normal-text-muted mt-2">
          → Vérifiez l'orthographe ou essayez un autre terme de recherche
        </div>
        <div class="text-normal-text-muted">
          → Recherche possible: nom d'utilisateur, pseudo Discord, pseudo de jeu
        </div>
      </SpaceTerminal>

      <!-- Aucun résultat pour les filtres -->
      <SpaceTerminal
        v-else-if="filteredPlayerLevels.length === 0"
        :command="`search --levels ${
          selectedGameId ? '--game=' + selectedGameId : ''
        } ${
          selectedTournamentId ? '--tournament=' + selectedTournamentId : ''
        } ${selectedLevel ? '--level=' + selectedLevel : ''} ${
          selectedRankFilter ? '--rank-status=' + selectedRankFilter : ''
        }`"
        title="Recherche avec filtres"
        :showCursor="true"
        className="my-8"
      >
        <div class="text-color-error font-mono">
          Erreur 404: Aucun joueur trouvé avec ces critères.
        </div>
        <div class="text-normal-text-muted mt-2">
          → Essayez de modifier vos filtres
        </div>
        <div class="text-normal-text-muted">
          → Ou cliquez sur "Effacer les filtres" pour tout voir
        </div>
      </SpaceTerminal>
      <!-- Tableau des joueurs - Version desktop -->
      <div v-if="viewMode === 'table'" class="hidden md:block relative">
        <div
          ref="topScrollBarContainer"
          class="h-3 mb-1 rounded-lg bg-background-bg-dark/50 overflow-x-auto scrollbar-thin"
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
            class="min-w-full border border-color-secondary/30 rounded-lg overflow-hidden"
          >
            <thead>
              <tr
                class="bg-background-bg-light/10 border-b border-color-secondary/30"
              >
                <th
                  class="py-3 px-4 text-left text-xs font-nasa text-color-secondary-light uppercase tracking-wider"
                >
                  Joueur
                </th>
                <!-- Ajout de la colonne Jeu quand aucun filtre n'est appliqué -->
                <th
                  v-if="!selectedGameId"
                  class="py-3 px-4 text-left text-xs font-nasa text-color-secondary-light uppercase tracking-wider w-40"
                >
                  Jeu
                </th>
                <th
                  class="py-3 px-4 text-left text-xs font-nasa text-color-secondary-light uppercase tracking-wider"
                >
                  Pseudo dans le jeu
                </th>
                <th
                  class="py-3 px-4 text-left text-xs font-nasa text-color-secondary-light uppercase tracking-wider"
                >
                  Niveau
                </th>
                <th
                  class="py-3 px-4 text-left text-xs font-nasa text-color-secondary-light uppercase tracking-wider"
                >
                  Rang
                </th>
                <th
                  v-if="!selectedGameId || selectedGameHasRoles"
                  class="py-3 px-4 text-left text-xs font-nasa text-color-secondary-light uppercase tracking-wider"
                >
                  Rôles
                </th>
                <th
                  class="py-3 px-4 text-left text-xs font-nasa text-color-secondary-light uppercase tracking-wider"
                >
                  Commentaire
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-background-bg-light/10">
              <tr
                v-for="playerLevel in paginatedPlayerLevels"
                :key="playerLevel._id"
                class="hover:bg-background-bg-light/5 transition-colors duration-150"
              >
                <td class="py-4 px-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="avatar-container">
                      <img
                        v-if="playerLevel.player.userInfo?.avatarUrl"
                        :src="playerLevel.player.userInfo.avatarUrl"
                        class="w-8 h-8 rounded-full object-cover border-2 border-color-primary shadow-glow-primary"
                        alt="Avatar"
                        loading="lazy"
                        @error="handleImageError($event)"
                      />
                      <div
                        v-else
                        class="w-8 h-8 rounded-full bg-background-bg-light flex items-center justify-center border-2 border-color-accent"
                      >
                        <span class="text-color-accent text-xs font-bold">{{
                          getUserInitials(
                            playerLevel.player.username || "inconnu"
                          )
                        }}</span>
                      </div>
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-nasa text-normal-text">
                        {{ playerLevel.player.username }}
                      </div>
                      <div
                        v-if="playerLevel.player.userInfo?.username"
                        class="text-xs text-normal-text-muted"
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
                      class="text-xs font-medium text-normal-text truncate"
                      :title="getGameName(playerLevel)"
                    >
                      {{ getGameName(playerLevel) }}
                    </span>
                  </div>
                </td>
                <td class="py-4 px-4 whitespace-nowrap">
                  <div class="text-sm text-normal-text">
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
                  <div v-else class="text-sm text-normal-text-muted">
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
                        class="px-2 py-0.5 text-xs bg-background-bg-light/30 text-normal-text-muted rounded-full cursor-help border border-background-bg-light/50"
                        :title="playerLevel.selectedRoles.slice(3).join(', ')"
                      >
                        +{{ playerLevel.selectedRoles.length - 3 }}
                      </span>
                    </div>
                  </div>
                  <div v-else class="text-sm text-normal-text-muted">
                    Non spécifié
                  </div>
                </td>
                <td class="py-4 px-4 max-w-xs">
                  <div
                    v-if="playerLevel.comment"
                    class="text-sm text-normal-text"
                  >
                    <div class="relative group">
                      <!-- Commentaire tronqué -->
                      <div class="truncate max-w-xs">
                        {{ playerLevel.comment }}
                      </div>

                      <!-- Tooltip pour afficher le commentaire complet au survol -->
                      <div
                        class="absolute left-0 -bottom-1 translate-y-full w-72 z-30 hidden group-hover:block bg-background-bg-dark border border-color-secondary/40 p-3 rounded-lg shadow-glow-secondary whitespace-pre-wrap break-words"
                      >
                        <div class="text-sm text-normal-text">
                          {{ playerLevel.comment }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="text-sm text-normal-text-muted">
                    Aucun commentaire
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Vue en cartes - Desktop -->
      <div v-else-if="viewMode === 'cards'" class="hidden md:block">
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          <div
            v-for="playerLevel in paginatedPlayerLevels"
            :key="playerLevel._id"
            class="bg-background-bg-light/5 border border-color-secondary/30 rounded-lg p-4 hover:shadow-glow-secondary hover:border-color-secondary/50 transition-all duration-300"
          >
            <!-- En-tête de la carte avec avatar et nom -->
            <div
              class="flex items-center mb-3 pb-2 border-b border-color-secondary/20"
            >
              <div class="avatar-container">
                <img
                  v-if="playerLevel.player.userInfo?.avatarUrl"
                  :src="playerLevel.player.userInfo.avatarUrl"
                  class="w-10 h-10 rounded-full object-cover border-2 border-color-primary shadow-glow-primary"
                  alt="Avatar"
                  loading="lazy"
                  @error="handleImageError($event)"
                />
                <div
                  v-else
                  class="w-10 h-10 rounded-full bg-background-bg-light flex items-center justify-center border-2 border-color-accent"
                >
                  <span class="text-color-accent text-sm font-bold">
                    {{
                      getUserInitials(playerLevel.player.username || "inconnu")
                    }}
                  </span>
                </div>
              </div>
              <div class="ml-3 flex-1">
                <div class="text-base font-nasa text-normal-text">
                  {{ playerLevel.player.username }}
                </div>
                <div
                  v-if="playerLevel.player.userInfo?.username"
                  class="text-xs text-normal-text-muted"
                >
                  {{ playerLevel.player.userInfo.username }}
                </div>
              </div>

              <!-- Badge de niveau à droite -->
              <SpaceBadge
                :variant="getLevelBadgeVariant(playerLevel.level)"
                className="px-2 py-1"
              >
                {{ capitalizeFirstLetter(playerLevel.level) }}
              </SpaceBadge>
            </div>

            <!-- Contenu de la carte en 2 colonnes -->
            <div class="grid grid-cols-2 gap-4 text-sm">
              <!-- Colonne gauche -->
              <div class="space-y-3">
                <!-- Jeu (si pas de filtre) -->
                <div v-if="!selectedGameId" class="flex flex-col">
                  <span
                    class="text-xs text-color-secondary-light font-nasa uppercase mb-1"
                    >Jeu</span
                  >
                  <div class="flex items-center">
                    <img
                      v-if="getGameImage(playerLevel)"
                      :src="getGameImage(playerLevel)"
                      class="w-5 h-5 rounded object-cover mr-2 flex-shrink-0"
                      alt="Logo du jeu"
                      loading="lazy"
                      @error="handleImageError($event)"
                    />
                    <span
                      class="text-normal-text text-xs truncate"
                      :title="getGameName(playerLevel)"
                    >
                      {{ getGameName(playerLevel) }}
                    </span>
                  </div>
                </div>

                <!-- Pseudo de jeu -->
                <div class="flex flex-col">
                  <span
                    class="text-xs text-color-secondary-light font-nasa uppercase mb-1"
                    >Pseudo jeu</span
                  >
                  <span class="text-normal-text">
                    {{ playerLevel.gameUsername || "Non renseigné" }}
                  </span>
                </div>

                <!-- Rang -->
                <div class="flex flex-col">
                  <span
                    class="text-xs text-color-secondary-light font-nasa uppercase mb-1"
                    >Rang</span
                  >
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
                  <span v-else class="text-normal-text-muted">Non classé</span>
                </div>
              </div>

              <!-- Colonne droite -->
              <div class="space-y-3">
                <!-- Rôles -->
                <div
                  v-if="!selectedGameId || selectedGameHasRoles"
                  class="flex flex-col"
                >
                  <span
                    class="text-xs text-color-secondary-light font-nasa uppercase mb-1"
                    >Rôles</span
                  >
                  <div
                    v-if="
                      playerLevel.selectedRoles &&
                      playerLevel.selectedRoles.length > 0
                    "
                  >
                    <SpaceBadge
                      v-if="
                        hasAllRoles(playerLevel.game, playerLevel.selectedRoles)
                      "
                      variant="primary"
                      className="text-xs px-2 py-1"
                      :title="playerLevel.selectedRoles.join(', ')"
                    >
                      Fill
                    </SpaceBadge>
                    <div v-else class="flex flex-wrap gap-1">
                      <span
                        v-for="roleName in playerLevel.selectedRoles.slice(
                          0,
                          2
                        )"
                        :key="roleName"
                        class="inline-flex items-center px-1.5 py-0.5 text-xs rounded border"
                        :style="getRoleStyle(playerLevel.game, roleName)"
                        :title="roleName"
                      >
                        {{
                          roleName.length > 8
                            ? roleName.slice(0, 8) + "..."
                            : roleName
                        }}
                      </span>
                      <span
                        v-if="playerLevel.selectedRoles.length > 2"
                        class="px-1.5 py-0.5 text-xs bg-background-bg-light/30 text-normal-text-muted rounded border border-background-bg-light/50 cursor-help"
                        :title="playerLevel.selectedRoles.slice(2).join(', ')"
                      >
                        +{{ playerLevel.selectedRoles.length - 2 }}
                      </span>
                    </div>
                  </div>
                  <span v-else class="text-normal-text-muted"
                    >Non spécifié</span
                  >
                </div>

                <!-- Commentaire -->
                <div v-if="playerLevel.comment" class="flex flex-col">
                  <span
                    class="text-xs text-color-secondary-light font-nasa uppercase mb-1"
                    >Commentaire</span
                  >
                  <div
                    class="text-normal-text text-xs leading-relaxed"
                    style="
                      display: -webkit-box;
                      -webkit-line-clamp: 3;
                      line-clamp: 3;
                      -webkit-box-orient: vertical;
                      overflow: hidden;
                    "
                    :title="playerLevel.comment"
                  >
                    {{ playerLevel.comment }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Vue mobile - cartes empilées -->
      <div class="md:hidden space-y-4">
        <div
          v-for="playerLevel in paginatedPlayerLevels"
          :key="playerLevel._id"
          class="bg-background-bg-light/5 border border-color-secondary/30 rounded-lg p-4 hover:shadow-glow-secondary hover:border-color-secondary/50 transition-all duration-300"
        >
          <!-- En-tête de la carte avec avatar et nom -->
          <div
            class="flex items-center mb-3 pb-2 border-b border-color-secondary/20"
          >
            <div class="avatar-container">
              <img
                v-if="playerLevel.player.userInfo?.avatarUrl"
                :src="playerLevel.player.userInfo.avatarUrl"
                class="w-10 h-10 rounded-full object-cover border-2 border-color-primary shadow-glow-primary"
                alt="Avatar"
                loading="lazy"
                @error="handleImageError($event)"
              />
              <div
                v-else
                class="w-10 h-10 rounded-full bg-background-bg-light flex items-center justify-center border-2 border-color-accent"
              >
                <span class="text-color-accent text-sm font-bold">
                  {{
                    getUserInitials(playerLevel.player.username || "inconnu")
                  }}
                </span>
              </div>
            </div>
            <div class="ml-3">
              <div class="text-base font-nasa text-normal-text">
                {{ playerLevel.player.username }}
              </div>
              <div
                v-if="playerLevel.player.userInfo?.username"
                class="text-xs text-normal-text-muted"
              >
                {{ playerLevel.player.userInfo.username }}
              </div>
            </div>
          </div>

          <!-- Informations du jeu quand aucun filtre n'est appliqué -->
          <div v-if="!selectedGameId" class="flex items-center mb-3">
            <div
              class="text-xs text-color-secondary-light font-nasa uppercase w-24"
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
                class="text-xs font-medium text-normal-text truncate"
                :title="getGameName(playerLevel)"
              >
                {{ getGameName(playerLevel) }}
              </span>
            </div>
          </div>

          <!-- Pseudo dans le jeu -->
          <div class="flex items-start mb-3">
            <div
              class="text-xs text-color-secondary-light font-nasa uppercase w-24"
            >
              Pseudo jeu
            </div>
            <div class="text-sm text-normal-text">
              {{ playerLevel.gameUsername || "Non renseigné" }}
            </div>
          </div>

          <!-- Niveau -->
          <div class="flex items-start mb-3">
            <div
              class="text-xs text-color-secondary-light font-nasa uppercase w-24"
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
              class="text-xs text-color-secondary-light font-nasa uppercase w-24"
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
            <div v-else class="text-sm text-normal-text-muted">Non classé</div>
          </div>

          <!-- Rôles -->
          <div
            v-if="!selectedGameId || selectedGameHasRoles"
            class="flex items-start mb-3"
          >
            <div
              class="text-xs text-color-secondary-light font-nasa uppercase w-24"
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
            <div v-else class="text-sm text-normal-text-muted">
              Non spécifié
            </div>
          </div>

          <!-- Commentaire amélioré -->
          <div class="flex items-start">
            <div
              class="text-xs text-color-secondary-light font-nasa uppercase w-24"
            >
              Commentaire
            </div>
            <div v-if="playerLevel.comment">
              <div
                class="text-sm text-normal-text whitespace-pre-wrap break-words max-w-xs"
              >
                {{ playerLevel.comment }}
              </div>
            </div>
            <div v-else class="text-sm text-normal-text-muted">
              Aucun commentaire
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination et contrôles -->
      <div v-if="filteredPlayerLevels.length > 0" class="mt-8 space-y-4">
        <!-- Contrôles d'affichage -->
        <div
          class="flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <div class="flex items-center gap-4">
            <label class="text-sm text-normal-text-muted font-nasa">
              Afficher par page :
            </label>
            <SpaceDropdown
              v-model="itemsPerPage"
              @change="currentPage = 1"
              size="sm"
              className="w-20"
            >
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </SpaceDropdown>
          </div>

          <div class="text-sm text-normal-text-muted">
            Affichage de {{ (currentPage - 1) * itemsPerPage + 1 }} à
            {{
              Math.min(currentPage * itemsPerPage, filteredPlayerLevels.length)
            }}
            sur {{ filteredPlayerLevels.length }} résultats
          </div>
        </div>

        <!-- Pagination -->
        <SpacePagination
          v-if="totalPages > 1"
          :current-page="currentPage"
          :total-pages="totalPages"
          @prev-page="currentPage = Math.max(1, currentPage - 1)"
          @next-page="currentPage = Math.min(totalPages, currentPage + 1)"
          @page-select="currentPage = $event"
        />
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

// Nouveaux filtres
const searchTerm = ref("");
const selectedLevel = ref("");
const selectedRankFilter = ref("");

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(20);

// Options d'affichage et tri
const viewMode = ref<"table" | "cards">("table");
const sortBy = ref("");

// Propriétés calculées
const selectedGameName = computed(() => {
  if (!selectedGameId.value) return "";
  const game = games.value.find((g) => g._id === selectedGameId.value);
  return game ? game.name : "";
});

// Pagination calculée
const totalPages = computed(() =>
  Math.ceil(filteredPlayerLevels.value.length / itemsPerPage.value)
);

const paginatedPlayerLevels = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredPlayerLevels.value.slice(startIndex, endIndex);
});

// Vérifier si des filtres sont actifs
const hasActiveFilters = computed(() => {
  return !!(
    searchTerm.value ||
    selectedGameId.value ||
    selectedTournamentId.value ||
    selectedLevel.value ||
    selectedRankFilter.value
  );
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

  // Filtrer par terme de recherche
  if (searchTerm.value.trim()) {
    const search = searchTerm.value.toLowerCase().trim();
    filtered = filtered.filter((level) => {
      const playerName = level.player?.username?.toLowerCase() || "";
      const discordName = level.player?.userInfo?.username?.toLowerCase() || "";
      const gameUsername = level.gameUsername?.toLowerCase() || "";

      return (
        playerName.includes(search) ||
        discordName.includes(search) ||
        gameUsername.includes(search)
      );
    });
  }

  // Filtrer par niveau
  if (selectedLevel.value) {
    filtered = filtered.filter((level) => level.level === selectedLevel.value);
  }

  // Filtrer par statut de rang
  if (selectedRankFilter.value) {
    if (selectedRankFilter.value === "ranked") {
      filtered = filtered.filter((level) => level.isRanked && level.rank);
    } else if (selectedRankFilter.value === "unranked") {
      filtered = filtered.filter((level) => !level.isRanked || !level.rank);
    }
  }

  // Appliquer le tri
  if (sortBy.value) {
    filtered.sort((a, b) => {
      switch (sortBy.value) {
        case "username":
          return (a.player?.username || "").localeCompare(
            b.player?.username || ""
          );
        case "username-desc":
          return (b.player?.username || "").localeCompare(
            a.player?.username || ""
          );
        case "level":
          const levelOrder = ["débutant", "intermédiaire", "avancé", "expert"];
          return levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level);
        case "level-desc":
          const levelOrderDesc = [
            "expert",
            "avancé",
            "intermédiaire",
            "débutant",
          ];
          return (
            levelOrderDesc.indexOf(a.level) - levelOrderDesc.indexOf(b.level)
          );
        case "rank":
          // Trier par rang (les non-classés à la fin)
          if (!a.rank && !b.rank) return 0;
          if (!a.rank) return 1;
          if (!b.rank) return -1;
          return a.rank.localeCompare(b.rank);
        case "gameUsername":
          return (a.gameUsername || "").localeCompare(b.gameUsername || "");
        default:
          return 0;
      }
    });
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
 * Effacer tous les filtres et réinitialiser la recherche
 */
const clearAllFilters = () => {
  searchTerm.value = "";
  selectedGameId.value = "";
  selectedTournamentId.value = "";
  selectedLevel.value = "";
  selectedRankFilter.value = "";
  tournaments.value = [];
  tournamentPlayers.value = [];

  // Recharger tous les niveaux
  fetchAllPlayerLevels();

  showMessage("success", "Filtres effacés avec succès");
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
  // Réinitialiser la pagination
  currentPage.value = 1;
});

// Observer les changements de filtres pour réinitialiser la pagination
watch([searchTerm, selectedLevel, selectedRankFilter], () => {
  currentPage.value = 1;
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
.avatar-container {
  position: relative;
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
