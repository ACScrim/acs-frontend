<template>
  <div
    class="p-8 bg-gray-900/70 border border-purple-500/30 rounded-xl shadow-lg shadow-purple-500/20 backdrop-blur-md relative overflow-hidden"
  >
    <!-- En-tête -->
    <SpaceHeader
      title="GESTION DES ÉQUIPES"
      :decorated="true"
      mission="EQUIPE-CREATION-2025"
    />

    <!-- Information du tournoi sélectionné -->
    <SpaceCard variant="primary" :stars="true" className="mb-6">
      <template #header>
        <div class="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-color-primary-light"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            />
          </svg>
          <SpaceTitle size="lg">Tournoi sélectionné</SpaceTitle>
        </div>
      </template>

      <!-- Affichage du tournoi ou message si aucun tournoi sélectionné -->
      <div v-if="selectedTournamentDetails">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="flex flex-col">
            <span class="text-color-text-muted text-sm">Nom</span>
            <span class="text-color-text font-mono text-lg">
              {{ selectedTournamentDetails.name }}
            </span>
          </div>
          <div v-if="selectedTournamentDetails.date" class="flex flex-col">
            <span class="text-color-text-muted text-sm">Date</span>
            <span class="text-color-text font-mono text-lg">
              {{
                new Date(selectedTournamentDetails.date).toLocaleDateString(
                  "fr-FR"
                )
              }}
            </span>
          </div>
        </div>
        <SpaceBadge
          v-if="selectedTournamentDetails.finished"
          variant="danger"
          size="md"
        >
          Tournoi terminé
        </SpaceBadge>
      </div>
      <div v-else>
        <SpaceAlert variant="warning" className="text-center">
          Veuillez sélectionner un tournoi dans le menu en haut de la page
        </SpaceAlert>
      </div>
    </SpaceCard>

    <!-- Alerte si tournoi terminé -->
    <SpaceAlert
      v-if="selectedTournamentDetails && selectedTournamentDetails.finished"
      variant="danger"
      className="mb-6"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
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
      </template>
      <div>
        <SpaceTitle size="md" className="text-red-300 mb-1">
          Tournoi terminé
        </SpaceTitle>
        <p class="text-sm text-white/80">
          Ce tournoi est déjà terminé. Vous pouvez consulter les équipes mais
          vous ne pouvez plus les modifier.
        </p>
      </div>
    </SpaceAlert>
    <!-- Section de génération des équipes -->
    <SpaceCard
      v-if="selectedTournamentDetails"
      variant="accent"
      :stars="true"
      className="mb-6"
    >
      <template #header>
        <div class="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-color-accent-light"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
            />
          </svg>
          <SpaceTitle size="xl">Génération des équipes</SpaceTitle>
        </div>
      </template>

      <div class="flex flex-col md:flex-row items-start gap-6">
        <div class="w-full md:w-1/2">
          <SpaceTitle size="md" className="text-color-text-muted mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 inline"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z"
                clip-rule="evenodd"
              />
            </svg>
            Nombre d'équipes
          </SpaceTitle>
          <SpaceInput
            v-model="numTeams"
            type="number"
            min="2"
            max="20"
            className="w-full"
          />
        </div>

        <div class="flex flex-wrap gap-3 mt-6 md:mt-8">
          <SpaceButton
            @click="generateTeams"
            :disabled="selectedTournamentDetails?.finished"
            variant="accent"
            size="lg"
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
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
            Générer les équipes
          </SpaceButton>

          <!-- Supprimer les équipes -->
          <SpaceButton
            v-if="teams.length > 0"
            @click="confirmDeleteAllTeams"
            :disabled="selectedTournamentDetails?.finished"
            variant="danger"
            size="lg"
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
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
            Supprimer les équipes
          </SpaceButton>
        </div>
      </div>
    </SpaceCard>
    <!-- Affichage des équipes avec drag and drop -->
    <SpaceCard
      v-if="teams.length > 0"
      variant="secondary"
      :stars="true"
      className="mb-6"
    >
      <template #header>
        <div class="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-color-secondary-light"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fill-rule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clip-rule="evenodd"
            />
          </svg>
          <SpaceTitle size="xl">Composition des équipes</SpaceTitle>
        </div>
      </template>
      <!-- Barre de recherche -->
      <div class="relative mb-6">
        <SpaceInput
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher un joueur par nom..."
          @input="searchPlayers"
          @focus="searchFocused = true"
          className="w-full"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-color-text-muted"
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

        <!-- Message aucun résultat -->
        <div
          v-if="searchQuery && searchResults.length === 0 && searchFocused"
          class="absolute top-full left-0 right-0 mt-2 z-10"
        >
          <SpaceAlert variant="warning">
            <template #icon>
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
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </template>
            Aucun joueur trouvé
          </SpaceAlert>
        </div>

        <!-- Résultats de recherche avec Space UI -->
        <SpaceCard
          v-else-if="searchResults.length > 0 && searchFocused"
          variant="dark"
          className="absolute top-full left-0 right-0 mt-2 max-h-[300px] overflow-y-auto z-10"
        >
          <div
            v-for="result in searchResults"
            :key="result.player._id"
            @click="navigateToPlayerTeam(result)"
            class="flex justify-between items-center p-3 border-b border-space-border/20 transition-all duration-200 hover:bg-color-primary/10 hover:translate-x-1 cursor-pointer last:border-b-0"
          >
            <span class="font-medium text-color-text">{{
              result.player.username
            }}</span>
            <SpaceBadge variant="primary" size="sm">
              {{ result.teamName }}
            </SpaceBadge>
          </div>
        </SpaceCard>
      </div>

      <!-- Onglets d'équipe avec Space UI -->
      <div
        class="flex flex-wrap gap-2 border-b border-space-border/30 pb-2 mb-4 overflow-x-auto"
      >
        <SpaceButton
          @click="viewMode = 'overview'"
          :variant="viewMode === 'overview' ? 'primary' : 'secondary'"
          size="md"
          className="whitespace-nowrap"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </template>
          Vue d'ensemble
        </SpaceButton>

        <SpaceButton
          v-for="(team, index) in teams"
          :key="index"
          @click="selectTeam(index)"
          :variant="
            viewMode === 'team' && activeTeamTab === index
              ? 'accent'
              : 'secondary'
          "
          size="md"
          className="whitespace-nowrap"
        >
          {{ team.name || `Équipe ${index + 1}` }}
        </SpaceButton>
      </div>

      <transition name="fade" mode="out-in">
        <!-- Vue d'ensemble avec SpaceCard -->
        <div
          v-if="viewMode === 'overview'"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6"
        >
          <SpaceCard
            v-for="(team, index) in teams"
            :key="index"
            variant="secondary"
            :stars="true"
            className="flex flex-col gap-4"
          >
            <template #header>
              <div class="flex justify-between items-center">
                <div class="flex flex-col gap-1">
                  <SpaceTitle size="lg" className="text-color-secondary-light">
                    {{ team.name || `Équipe ${index + 1}` }}
                  </SpaceTitle>
                  <SpaceBadge :variant="getTeamBalanceVariant(team)" size="sm">
                    {{ team.players.length }} joueur{{
                      team.players.length > 1 ? "s" : ""
                    }}
                  </SpaceBadge>
                </div>
                <div class="flex items-center gap-2">
                  <SpaceButton
                    @click="unassignAllPlayers(index)"
                    variant="danger"
                    size="sm"
                    :title="`Désassigner tous les joueurs de ${
                      team.name || 'cette équipe'
                    }`"
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
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </template>
                    Vider
                  </SpaceButton>
                  <SpaceButton
                    @click="selectTeam(index)"
                    variant="primary"
                    size="sm"
                    :title="`Éditer l'équipe ${team.name || index + 1}`"
                  >
                    <template #icon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                        />
                      </svg>
                    </template>
                    Éditer
                  </SpaceButton>
                </div>
              </div>
            </template>

            <!-- Zone de drag and drop -->
            <vue-draggable-next
              v-model="team.players"
              group="players"
              @start="isDragging = true"
              @end="
                onDragEnd();
                isDragging = false;
              "
              :disabled="selectedTournamentDetails?.finished"
              class="flex flex-col gap-2 min-h-[150px] max-h-[250px] overflow-y-auto p-3 bg-color-bg-secondary/50 border-2 border-dashed border-space-border/30 rounded-lg transition-all duration-300"
              :class="{
                'opacity-70 cursor-not-allowed':
                  selectedTournamentDetails?.finished,
              }"
            >
              <div
                v-for="player in team.players"
                :key="player._id"
                :data-player-id="player._id"
                class="flex justify-between items-center p-3 bg-color-bg-primary/80 text-color-text border border-color-secondary/50 rounded-lg shadow-sm shadow-color-secondary/30 transition-all duration-300 cursor-move hover:shadow-md hover:shadow-color-secondary/50 hover:-translate-y-0.5"
              >
                <span class="text-color-text">{{ player.username }}</span>
                <div
                  class="flex items-center justify-center w-6 h-6 bg-color-bg-secondary/70 rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-color-text-muted"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <!-- Placeholder when empty -->
              <div
                v-if="team.players.length === 0"
                class="flex flex-col items-center justify-center w-full h-full min-h-[120px] p-6 text-color-text-muted transition-all duration-300 bg-color-secondary/5 border-2 border-dashed border-color-secondary/30 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <p class="text-center">Équipe vide</p>
                <p class="text-xs text-center mt-1">
                  Glissez-déposez des joueurs ici
                </p>
              </div>
            </vue-draggable-next>
          </SpaceCard>
        </div>

        <!-- Vue équipe spécifique avec Space UI -->
        <SpaceCard
          v-else-if="viewMode === 'team'"
          variant="primary"
          :stars="true"
          className="mb-6"
        >
          <template #header>
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div class="flex flex-col gap-3 w-full">
                <div class="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-color-primary-light"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <SpaceTitle size="xl" className="text-color-primary-light">
                    Équipe {{ activeTeamTab + 1 }}
                  </SpaceTitle>
                </div>

                <div class="flex items-center gap-2">
                  <span class="text-color-text text-sm">Nom de l'équipe:</span>
                  <SpaceInput
                    v-model="teams[activeTeamTab].name"
                    type="text"
                    placeholder="Entrez un nom pour cette équipe"
                    className="flex-1"
                  />
                </div>
              </div>

              <SpaceButton
                @click="viewMode = 'overview'"
                variant="secondary"
                size="md"
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
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </template>
                Retour
              </SpaceButton>
            </div>
          </template>

          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <SpaceTitle size="lg" className="text-color-primary-light">
                Joueurs de l'équipe
              </SpaceTitle>

              <SpaceButton
                @click="unassignAllPlayers(activeTeamTab)"
                variant="danger"
                size="md"
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
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </template>
                Désassigner tous
              </SpaceButton>
            </div>

            <vue-draggable-next
              v-model="teams[activeTeamTab].players"
              group="players"
              @start="isDragging = true"
              @end="
                onDragEnd();
                isDragging = false;
              "
              :disabled="selectedTournamentDetails?.finished"
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 min-h-[150px] p-4 bg-color-bg-secondary/30 border-2 border-dashed border-space-border/30 rounded-lg"
              :class="{ 'opacity-70': selectedTournamentDetails?.finished }"
            >
              <div
                v-for="player in teams[activeTeamTab].players"
                :key="player._id"
                :data-player-id="player._id"
                class="flex justify-between items-center p-3 bg-color-bg-primary/80 text-color-text border border-color-primary/50 rounded-lg shadow-sm shadow-color-primary/30 transition-all duration-300 cursor-move hover:shadow-md hover:shadow-color-primary/50 hover:-translate-y-0.5"
              >
                <span class="text-color-text">{{ player.username }}</span>
                <div
                  class="flex items-center justify-center w-6 h-6 bg-color-bg-secondary/70 rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-color-text-muted"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <!-- Placeholder when empty -->
              <div
                v-if="teams[activeTeamTab].players.length === 0"
                class="col-span-full flex flex-col items-center justify-center w-full h-full min-h-[120px] p-6 text-color-text-muted bg-color-primary/5 border-2 border-dashed border-color-primary/30 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <p class="text-center">Cette équipe est vide</p>
                <p class="text-xs text-center mt-2">
                  Glissez-déposez des joueurs ici
                </p>
              </div>
            </vue-draggable-next>
          </div>
        </SpaceCard>
      </transition>

      <!-- Liste des joueurs non assignés avec Space UI -->
      <SpaceCard variant="danger" :stars="true" className="mb-8">
        <template #header>
          <div class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-space-danger-light"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
              />
            </svg>
            <SpaceTitle size="xl" className="text-space-danger-light">
              Joueurs non assignés
            </SpaceTitle>
            <SpaceBadge variant="danger" size="md">
              {{ unassignedPlayers.length }}
            </SpaceBadge>
          </div>
        </template>

        <!-- Zone de drop pour les joueurs non assignés -->
        <vue-draggable-next
          v-model="unassignedPlayers"
          group="players"
          @start="isDragging = true"
          @end="
            onDragEnd();
            isDragging = false;
          "
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 min-h-[150px] p-4 bg-space-danger/5 border-2 border-dashed border-space-danger/30 rounded-lg"
        >
          <div
            v-for="(player, index) in unassignedPlayers"
            :key="player._id"
            :data-player-id="player._id"
            class="flex flex-col p-3 bg-color-bg-primary/80 border border-space-danger/50 rounded-lg shadow-sm shadow-space-danger/30 transition-all duration-300 hover:shadow-md hover:shadow-space-danger/50 hover:-translate-y-0.5"
          >
            <div class="flex justify-between items-center mb-2">
              <span class="text-color-text">{{ player.username }}</span>
              <div
                class="flex items-center justify-center w-6 h-6 bg-color-bg-secondary/70 rounded cursor-move"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-color-text-muted"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <!-- Sélecteur d'équipe -->
            <select
              :id="`assign-player-${player._id}`"
              class="w-full py-1.5 px-2 text-xs bg-color-bg-secondary/70 text-color-text border border-space-danger/40 rounded-md appearance-none cursor-pointer transition-all duration-300 focus:outline-none focus:border-space-danger/70 focus:shadow-sm focus:shadow-space-danger/30"
              @change="
                assignPlayerToTeam(
                  index,
                  ($event.target as HTMLSelectElement)?.value
                );
                ($event.target as HTMLSelectElement).value = '';
              "
            >
              <option value="" selected disabled>Assigner à une équipe</option>
              <option
                v-for="(team, teamIndex) in teams"
                :key="teamIndex"
                :value="teamIndex"
              >
                {{ team.name || `Équipe ${teamIndex + 1}` }}
              </option>
            </select>
          </div>

          <!-- Message lorsqu'il n'y a aucun joueur non assigné -->
          <div
            v-if="unassignedPlayers.length === 0"
            class="col-span-full flex flex-col items-center justify-center p-6 text-color-text-muted bg-color-success/5 border-2 border-dashed border-color-success/30 rounded-lg min-h-[150px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 text-color-success mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p class="text-center">
              Tous les joueurs sont assignés à des équipes
            </p>
          </div>
        </vue-draggable-next>
      </SpaceCard>

      <!-- Boutons d'action avec Space UI -->
      <div class="flex flex-wrap gap-4">
        <SpaceButton
          @click="saveTeams"
          :disabled="selectedTournamentDetails?.finished"
          variant="success"
          size="lg"
          :title="
            selectedTournamentDetails?.finished
              ? 'Tournoi terminé'
              : 'Enregistre la composition actuelle des équipes sans les finaliser ni les publier'
          "
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
          Valider les équipes
        </SpaceButton>

        <SpaceButton
          v-if="teams.length > 0"
          @click="togglePublication"
          :disabled="selectedTournamentDetails?.finished"
          :variant="
            selectedTournamentDetails?.teamsPublished ? 'warning' : 'info'
          "
          size="lg"
          :title="
            selectedTournamentDetails?.finished
              ? 'Tournoi terminé'
              : selectedTournamentDetails?.teamsPublished
              ? 'Masque les équipes aux participants du tournoi'
              : 'Rend les équipes visibles pour tous les participants du tournoi'
          "
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                v-if="!selectedTournamentDetails?.teamsPublished"
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clip-rule="evenodd"
              />
              <path
                v-else
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                clip-rule="evenodd"
              />
            </svg>
          </template>
          {{
            selectedTournamentDetails?.teamsPublished
              ? "Dépublier les équipes"
              : "Publier les équipes"
          }}
        </SpaceButton>

        <SpaceButton
          @click="saveTeamDefinitive"
          :disabled="selectedTournamentDetails?.finished"
          variant="accent"
          size="lg"
          :title="
            selectedTournamentDetails?.finished
              ? 'Tournoi terminé'
              : 'Finalise définitivement les équipes, crée les canaux Discord et supprime les anciens canaux'
          "
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
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </template>
          Valider les équipes définitives
        </SpaceButton>
      </div>
    </SpaceCard>

    <!-- Dialogues de confirmation -->
    <ConfirmationDialog
      v-if="showConfirmationDialog"
      title="Valider les équipes définitives"
      message="Attention ! Cette action est irréversible et va finaliser les équipes du tournoi. Les canaux Discord seront créés automatiquement. Voulez-vous continuer ?"
      @confirm="confirmTeamDefinitive"
      @cancel="cancelConfirmation"
    />

    <ConfirmationDialog
      v-if="showDeleteTeamsDialog"
      title="Supprimer toutes les équipes"
      message="Attention ! Cette action va supprimer toutes les équipes et remettre tous les joueurs dans la liste des non assignés. Cette action est irréversible. Voulez-vous continuer ?"
      @confirm="deleteAllTeams"
      @cancel="cancelDeleteTeams"
    />

    <!-- Messages d'état -->
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import gameService from "../../services/gameService";
import tournamentService from "../../services/tournamentService";
import type { Game, Tournament, Team, Player } from "../../types";
import { VueDraggableNext } from "vue-draggable-next";
import Toast from "@/shared/Toast.vue";
import ConfirmationDialog from "@/shared/ConfirmationDialog.vue";

// Définir les props et les émissions
const props = defineProps<{
  selectedGame: string;
  selectedTournament: string;
}>();

//------------------------------------------------------
// ÉTATS PRINCIPAUX
//------------------------------------------------------

// Données de base
const games = ref<Game[]>([]);
const tournaments = ref<Tournament[]>([]);
const teams = ref<Team[]>([]);
const unassignedPlayers = ref<Player[]>([]);

// Sélections et filtres
const selectedTournamentDetails = ref<
  (Tournament & { players: Player[] }) | null
>(null);

// État de l'interface
const viewMode = ref("overview"); // 'overview' ou 'team'
const activeTeamTab = ref(0);
const numTeams = ref("2");
const isDragging = ref(false);
const searchFocused = ref(false);
const searchQuery = ref("");
const searchResults = ref<
  { player: Player; teamName: string; teamIndex?: number }[]
>([]);

// Messages et dialogues
const error = ref<string | null>(null);
const success = ref<string | null>(null);
const showConfirmationDialog = ref(false);
const showDeleteTeamsDialog = ref(false);

//------------------------------------------------------
// CHARGEMENT INITIAL DES DONNÉES
//------------------------------------------------------

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
 * Charge la liste des tournois pour le jeu sélectionné
 */
const fetchTournamentsByGame = async (gameId: string) => {
  try {
    if (!gameId) return;

    const allTournaments = await tournamentService.getTournamentsByGame(gameId);
    // Ne garder que les tournois non terminés
    tournaments.value = allTournaments.filter(
      (tournament) => !tournament.finished
    );
  } catch (error) {
    console.error("Erreur lors du chargement des tournois:", error);
  }
};

/**
 * Charge les détails du tournoi sélectionné et ses équipes si existantes
 */
const fetchTournamentDetails = async (tournamentId?: string) => {
  try {
    const id = tournamentId || props.selectedTournament;
    if (!id) return;

    selectedTournamentDetails.value = await tournamentService.getTournamentById(
      id
    );

    // Si des équipes existent déjà, les afficher
    if (selectedTournamentDetails.value.teams) {
      teams.value = selectedTournamentDetails.value.teams;
      // Initialiser en mode vue d'ensemble
      viewMode.value = "overview";
    } else {
      // Si pas d'équipes, initialiser avec un tableau vide
      teams.value = [];
    }

    // Mettre à jour la liste des joueurs non assignés
    updateUnassignedPlayers();
  } catch (error) {
    console.error("Erreur lors du chargement des détails du tournoi:", error);
  }
};

//------------------------------------------------------
// GESTION DES ÉQUIPES
//------------------------------------------------------

/**
 * Génère les équipes automatiquement selon le nombre spécifié
 */
const generateTeams = async () => {
  // Utiliser props.selectedTournament au lieu de selectedTournament.value
  const tournamentId = props.selectedTournament;
  const numTeamsValue = parseInt(numTeams.value) || 2;
  if (
    tournamentId &&
    numTeamsValue > 0 &&
    !selectedTournamentDetails.value?.finished
  ) {
    try {
      // Vérification que le tournoi n'est pas terminé
      const response = await tournamentService.generateTeams(
        tournamentId,
        numTeamsValue
      );

      if (response && response.teams) {
        teams.value = response.teams;

        // Initialiser en mode vue d'ensemble
        viewMode.value = "overview";

        // Mettre à jour la liste des joueurs non assignés
        updateUnassignedPlayers();

        // Afficher un message de succès
        showMessage(
          "success",
          `${numTeams.value} équipes générées avec succès !`
        );
      } else {
        showMessage(
          "error",
          "Erreur lors de la génération des équipes : réponse invalide du serveur"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la génération des équipes:", error);
      showMessage("error", "Erreur lors de la génération des équipes");
    }
  } else if (selectedTournamentDetails.value?.finished) {
    showMessage("error", "Impossible de modifier un tournoi terminé");
  } else if (!tournamentId) {
    showMessage("error", "Aucun tournoi sélectionné");
  } else {
    showMessage("error", "Paramètres invalides pour la génération d'équipes");
  }
};

/**
 * Publie ou dépublie les équipes du tournoi
 */
const togglePublication = async () => {
  // Vérifier que le tournoi est sélectionné
  const tournamentId = props.selectedTournament;

  if (!tournamentId) {
    showMessage("error", "Aucun tournoi sélectionné");
    return;
  }

  if (selectedTournamentDetails.value?.finished) {
    showMessage("error", "Impossible de modifier un tournoi terminé");
    return;
  }

  // Récupérer l'état actuel de publication
  const currentStatus =
    selectedTournamentDetails.value?.teamsPublished || false;

  // Inverser le statut
  const newStatus = !currentStatus;

  try {
    // Appeler l'API pour modifier le statut
    await tournamentService.toggleTeamsPublication(tournamentId, newStatus);

    // Mettre à jour l'état local
    if (selectedTournamentDetails.value) {
      selectedTournamentDetails.value.teamsPublished = newStatus;
    }

    // Afficher un message de succès
    showMessage(
      "success",
      newStatus
        ? "Les équipes ont été publiées avec succès"
        : "Les équipes ont été dépubliées"
    );
  } catch (error) {
    console.error(
      "Erreur lors de la modification de la publication des équipes:",
      error
    );
    showMessage(
      "error",
      "Une erreur est survenue lors de la modification de la publication des équipes"
    );
  }
};
/**
 * Assigne un joueur non assigné à une équipe spécifique
 */
const assignPlayerToTeam = (playerIndex: number, teamIndex: string) => {
  // Convertir l'index d'équipe en nombre, car il vient d'un select HTML
  const teamIdxNum = parseInt(teamIndex, 10);

  // Vérifier que les indices sont valides
  if (
    playerIndex >= 0 &&
    playerIndex < unassignedPlayers.value.length &&
    teamIdxNum >= 0 &&
    teamIdxNum < teams.value.length
  ) {
    // Obtenir le joueur à déplacer
    const playerToMove = unassignedPlayers.value[playerIndex];

    // Ajouter le joueur à l'équipe cible
    teams.value[teamIdxNum].players.push(playerToMove);

    // Supprimer le joueur de la liste des non assignés
    unassignedPlayers.value.splice(playerIndex, 1);

    // Mettre à jour les joueurs non assignés
    updateUnassignedPlayers();

    // Afficher un message de confirmation
    showMessage(
      "success",
      `${playerToMove.username} a été assigné à l'équipe ${
        teams.value[teamIdxNum].name || `Équipe ${teamIdxNum + 1}`
      }`
    );
  }
};

/**
 * Met à jour la liste des joueurs non assignés en se basant sur les joueurs du tournoi
 * qui ne sont dans aucune équipe
 */
const updateUnassignedPlayers = () => {
  if (
    selectedTournamentDetails.value &&
    selectedTournamentDetails.value.players
  ) {
    // Créer un ensemble des IDs des joueurs déjà assignés à une équipe
    const assignedPlayerIds = new Set();
    teams.value.forEach((team) => {
      team.players.forEach((player) => {
        assignedPlayerIds.add(player._id);
      });
    });

    // Filtrer les joueurs du tournoi qui ne sont pas dans cet ensemble d'IDs assignés
    unassignedPlayers.value = selectedTournamentDetails.value.players.filter(
      (player) => !assignedPlayerIds.has(player._id)
    );
  }
};

// Ajouter ces méthodes dans la section des fonctions
/**
 * Affiche le dialogue de confirmation avant la suppression des équipes
 */
const confirmDeleteAllTeams = () => {
  showDeleteTeamsDialog.value = true;
};

/**
 * Supprime toutes les équipes du tournoi actuel
 */
const deleteAllTeams = async () => {
  // Utiliser props.selectedTournament au lieu de selectedTournament.value
  const tournamentId = props.selectedTournament;

  if (tournamentId) {
    try {
      if (selectedTournamentDetails.value?.finished) {
        showMessage("error", "Impossible de modifier un tournoi terminé");
        showDeleteTeamsDialog.value = false;
        return;
      }

      // Appeler le service pour supprimer les équipes
      await tournamentService.deleteAllTeams(tournamentId);

      // Mettre à jour l'état local
      teams.value = [];
      viewMode.value = "overview";

      // Si on a des détails du tournoi, mettre à jour les joueurs non assignés
      if (
        selectedTournamentDetails.value &&
        selectedTournamentDetails.value.players
      ) {
        unassignedPlayers.value = [...selectedTournamentDetails.value.players];
      }

      // Réinitialiser les équipes dans les détails du tournoi
      if (selectedTournamentDetails.value) {
        selectedTournamentDetails.value.teams = [];
      }

      // Fermer la boîte de dialogue et afficher un message de succès
      showDeleteTeamsDialog.value = false;
      showMessage(
        "success",
        "Toutes les équipes ont été supprimées avec succès"
      );
    } catch (error) {
      console.error("Erreur lors de la suppression des équipes:", error);
      showMessage("error", "Erreur lors de la suppression des équipes");
      showDeleteTeamsDialog.value = false;
    }
  } else {
    showMessage("error", "Aucun tournoi sélectionné");
    showDeleteTeamsDialog.value = false;
  }
};

/**
 * Annule la suppression des équipes
 */
const cancelDeleteTeams = () => {
  showDeleteTeamsDialog.value = false;
};

/**
 * Gère la fin d'un événement de drag and drop
 */
const onDragEnd = () => {
  updateUnassignedPlayers();
};

/**
 * Sélectionne une équipe spécifique pour l'édition détaillée
 */
const selectTeam = (index: number) => {
  viewMode.value = "team";
  activeTeamTab.value = index;
};

/**
 * Calcule le variant Space UI à appliquer selon l'équilibre de l'équipe
 */
const getTeamBalanceVariant = (team: Team): string => {
  const balanceClass = getTeamBalanceClass(team);
  switch (balanceClass) {
    case "empty":
      return "danger";
    case "unbalanced-low":
      return "warning";
    case "unbalanced-high":
      return "info";
    default:
      return "success";
  }
};

/**
 * Calcule la classe CSS à appliquer selon l'équilibre de l'équipe
 */
const getTeamBalanceClass = (team: Team): string => {
  // Calculer l'équilibre des équipes
  const avgPlayers =
    teams.value.reduce((acc: number, t: Team) => acc + t.players.length, 0) /
    teams.value.length;

  if (team.players.length === 0) return "empty";
  if (team.players.length < avgPlayers * 0.8) return "unbalanced-low";
  if (team.players.length > avgPlayers * 1.2) return "unbalanced-high";
  return "balanced";
};

//------------------------------------------------------
// SAUVEGARDE & FINALISATION DES ÉQUIPES
//------------------------------------------------------

/**
 * Sauvegarde les équipes sans les finaliser
 */
const saveTeams = async () => {
  // Utiliser props.selectedTournament au lieu de selectedTournament.value
  const tournamentId = props.selectedTournament;

  if (
    tournamentId &&
    teams.value.length > 0 &&
    !selectedTournamentDetails.value?.finished
  ) {
    try {
      await tournamentService.updateTournamentTeams(tournamentId, teams.value);
      showMessage("success", "Équipes enregistrées avec succès !");
    } catch (err) {
      console.error("Erreur lors de l'enregistrement des équipes:", err);
      showMessage(
        "error",
        "Une erreur est survenue lors de l'enregistrement des équipes"
      );
    }
  } else if (selectedTournamentDetails.value?.finished) {
    showMessage("error", "Impossible de modifier un tournoi terminé");
  } else if (!tournamentId) {
    showMessage("error", "Aucun tournoi sélectionné");
  } else {
    showMessage(
      "error",
      "Impossible d'enregistrer les équipes: données manquantes"
    );
  }
};

/**
 * Affiche le dialogue de confirmation pour finaliser les équipes
 */
const saveTeamDefinitive = async () => {
  if (selectedTournamentDetails.value?.finished) {
    showMessage("error", "Ce tournoi est déjà terminé");
    return;
  }
  showConfirmationDialog.value = true;
};

/**
 * Finalise les équipes après confirmation
 */
const confirmTeamDefinitive = async () => {
  showConfirmationDialog.value = false;

  // Utiliser props.selectedTournament au lieu de selectedTournament.value
  const tournamentId = props.selectedTournament;

  if (tournamentId && selectedTournamentDetails.value) {
    try {
      // 1. Mettre à jour les équipes
      await tournamentService.updateTournamentTeams(tournamentId, teams.value);

      // 2. Créer les canaux Discord
      await tournamentService.createDiscordChannels(teams.value);

      showMessage(
        "success",
        "Équipes définitives enregistrées avec succès et canaux Discord créés !"
      );
    } catch (err) {
      showMessage(
        "error",
        "Une erreur est survenue lors de la validation des équipes"
      );
      console.error("Erreur lors de la validation des équipes:", err);
    }
  } else if (!tournamentId) {
    showMessage("error", "Aucun tournoi sélectionné");
  } else {
    showMessage(
      "error",
      "Impossible de valider les équipes: données manquantes"
    );
  }
};

/**
 * Ferme le dialogue de confirmation sans action
 */
const cancelConfirmation = () => {
  showConfirmationDialog.value = false;
};

//------------------------------------------------------
// RECHERCHE DE JOUEURS
//------------------------------------------------------

/**
 * Effectue une recherche parmi tous les joueurs (équipes + non assignés)
 */
const searchPlayers = () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    return;
  }

  const query = searchQuery.value.toLowerCase();
  const results: { player: Player; teamName: string; teamIndex?: number }[] =
    [];

  // Chercher dans toutes les équipes
  teams.value.forEach((team, index) => {
    team.players.forEach((player) => {
      if (player.username.toLowerCase().includes(query)) {
        results.push({
          player,
          teamName: team.name || `Équipe ${index + 1}`,
          teamIndex: index,
        });
      }
    });
  });

  // Chercher également dans les joueurs non assignés
  unassignedPlayers.value.forEach((player) => {
    if (player.username.toLowerCase().includes(query)) {
      results.push({
        player,
        teamName: "Non assigné",
      });
    }
  });

  searchResults.value = results.slice(0, 10); // Limiter à 10 résultats
};

/**
 * Désassigne tous les joueurs d'une équipe spécifique
 */
const unassignAllPlayers = (teamIndex: number) => {
  const team = teams.value[teamIndex];

  // Déplacer tous les joueurs vers unassignedPlayers
  unassignedPlayers.value = [...unassignedPlayers.value, ...team.players];

  // Vider l'équipe
  team.players = [];

  // Mettre à jour pour refléter les changements
  updateUnassignedPlayers();

  // Afficher un message de confirmation
  showMessage(
    "success",
    `Tous les joueurs de l'équipe ${
      team.name || `Équipe ${teamIndex + 1}`
    } ont été désassignés`
  );
};

/**
 * Navigue vers l'équipe d'un joueur trouvé dans la recherche
 */
const navigateToPlayerTeam = (result: {
  player: Player;
  teamName: string;
  teamIndex?: number;
}) => {
  // Fermer la liste déroulante en effaçant la recherche
  searchQuery.value = "";
  searchResults.value = [];

  // Si le joueur est non assigné
  if (result.teamName === "Non assigné") {
    // Scroll jusqu'à la section des joueurs non assignés
    const unassignedSection = document.querySelector(".unassigned-players");
    if (unassignedSection) {
      unassignedSection.scrollIntoView({ behavior: "smooth" });
    }
    return;
  }

  // Si le joueur est dans une équipe
  if (result.teamIndex !== undefined) {
    selectTeam(result.teamIndex);

    // Mettre en évidence brièvement le joueur
    setTimeout(() => {
      const playerElement = document.querySelector(
        `[data-player-id="${result.player._id}"]`
      );
      if (playerElement) {
        playerElement.classList.add("highlighted");
        setTimeout(() => {
          playerElement.classList.remove("highlighted");
        }, 2000);
      }
    }, 300);
  }
};

//------------------------------------------------------
// UTILITAIRES
//------------------------------------------------------

/**
 * Affiche un message de succès ou d'erreur temporaire
 */
const showMessage = (type: "success" | "error", message: string) => {
  if (type === "success") {
    success.value = message;
    error.value = null;
  } else {
    error.value = message;
    success.value = null;
  }

  // Effacer le message après 5 secondes
  setTimeout(() => {
    success.value = null;
    error.value = null;
  }, 5000);
};

// Observer les changements sur les propriétés
watch(
  () => props.selectedGame,
  async (newValue) => {
    if (newValue) {
      await fetchTournamentsByGame(newValue);
    }
  }
);

watch(
  () => props.selectedTournament,
  async (newValue) => {
    if (newValue) {
      await fetchTournamentDetails(newValue);
    }
  }
);

// Charger les données initiales
onMounted(() => {
  fetchGames();

  // Si un jeu est déjà sélectionné depuis les props
  if (props.selectedGame) {
    fetchTournamentsByGame(props.selectedGame);

    // Si un tournoi est déjà sélectionné depuis les props
    if (props.selectedTournament) {
      fetchTournamentDetails(props.selectedTournament);
    }
  }
});
</script>

<style scoped>
/* Effet grille en fond (non remplaçable facilement en Tailwind) */
.team-management-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      rgba(139, 92, 246, 0.03) 25%,
      rgba(139, 92, 246, 0.03) 26%,
      transparent 27%,
      transparent 74%,
      rgba(139, 92, 246, 0.03) 75%,
      rgba(139, 92, 246, 0.03) 76%,
      transparent 77%
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      rgba(139, 92, 246, 0.03) 25%,
      rgba(139, 92, 246, 0.03) 26%,
      transparent 27%,
      transparent 74%,
      rgba(139, 92, 246, 0.03) 75%,
      rgba(139, 92, 246, 0.03) 76%,
      transparent 77%
    );
  background-size: 50px 50px;
  z-index: -1;
}

/* Style pour le select et son arrow */
.select-wrapper {
  position: relative;
  width: 100%;
}

.select-arrow {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #06b6d4;
  pointer-events: none;
}

/* Input glow effect - difficile à faire en Tailwind */
.input-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0.5rem;
  pointer-events: none;
  transition: box-shadow 0.3s ease;
}

input:focus + .input-glow {
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.7);
}

/* Effet de mise en évidence */
.highlighted {
  animation: highlight 1.5s ease;
  position: relative;
  z-index: 2;
}

@keyframes highlight {
  0%,
  100% {
    box-shadow: 0 0 0 rgba(16, 185, 129, 0.7);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.9);
    transform: scale(1.05);
  }
}

/* Styles pour le drag-and-drop */
.sortable-ghost {
  opacity: 0.5;
  background: rgba(16, 185, 129, 0.2) !important;
  border: 2px dashed rgba(16, 185, 129, 0.6) !important;
}

.sortable-chosen {
  opacity: 0.8;
  transform: scale(1.02);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
  z-index: 10;
}

/* Animation d'apparition simple */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
