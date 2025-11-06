<template>
  <div class="container mx-auto p-4 sm:p-6 pt-20 sm:pt-24">
    <!-- En-tête avec SpaceHeader -->
    <SpaceHeader
      title="NIVEAUX DE JEU"
      :decorated="true"
      mission="PLAYER-SKILLS-25"
    />

    <SpaceCard variant="primary" :stars="true" className="mb-8 mt-6">
      <div v-if="loading" class="flex justify-center py-12">
        <SpaceLoader text="Analyse des compétences en cours..." />
      </div>

      <template v-else>
        <!-- Section des jeux avec niveau défini -->
        <div v-if="playerLevels.length > 0" class="mb-10">
          <SpaceTitle
            size="xl"
            :decorated="true"
            className="mb-6 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2 text-space-primary-light"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            Niveaux de compétence actuels
          </SpaceTitle>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SpaceCard
              v-for="level in playerLevels"
              :key="level._id"
              variant="secondary"
              :stars="true"
              className="relative overflow-hidden transform transition-all hover:scale-105 duration-300"
            >
              <!-- En-tête avec image de jeu -->
              <div class="relative h-32 overflow-hidden rounded-t-lg">
                <img
                  v-if="getGameImage(level)"
                  :src="getGameImage(level)"
                  :alt="getGameName(level)"
                  class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  @error="handleImageError"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center bg-space-bg-light"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-16 w-16 text-space-primary/50"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
                    />
                  </svg>
                </div>

                <!-- Overlay gradient -->
                <div
                  class="absolute inset-0 bg-gradient-to-t from-space-bg/95 to-transparent"
                ></div>

                <!-- Badge de niveau -->
                <div class="absolute bottom-3 right-3">
                  <!-- Badge avec fond opaque et bordure -->
                  <div
                    class="bg-space-bg px-2 py-1 rounded-full shadow-lg border-2 flex items-center justify-center"
                    :class="{
                      'border-green-500':
                        level.level.toLowerCase() === 'débutant',
                      'border-[var(--space-primary)]':
                        level.level.toLowerCase() === 'intermédiaire',
                      'border-[var(--space-secondary)]':
                        level.level.toLowerCase() === 'avancé',
                      'border-[var(--space-accent)]':
                        level.level.toLowerCase() === 'expert',
                    }"
                  >
                    <span
                      class="uppercase tracking-wide font-bold text-xs"
                      :class="{
                        'text-green-400':
                          level.level.toLowerCase() === 'débutant',
                        'text-[var(--space-primary-light)]':
                          level.level.toLowerCase() === 'intermédiaire',
                        'text-[var(--space-secondary-light)]':
                          level.level.toLowerCase() === 'avancé',
                        'text-[var(--space-accent-light)]':
                          level.level.toLowerCase() === 'expert',
                      }"
                    >
                      {{ level.level }}
                    </span>
                    <!-- Icône pour expert uniquement -->
                    <svg
                      v-if="level.level.toLowerCase() === 'expert'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5 ml-1 text-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </div>
                </div>

                <!-- Nom du jeu -->
                <div class="absolute bottom-3 left-3 right-16">
                  <h3 class="text-lg text-white font-nasa truncate">
                    {{ getGameName(level) }}
                  </h3>
                </div>
              </div>

              <!-- Contenu -->
              <div class="p-4 space-y-3">
                <!-- Pseudo dans le jeu -->
                <div
                  v-if="level.gameUsername"
                  class="flex items-center space-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-space-secondary-light flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div class="flex-1 min-w-0">
                    <span class="text-space-text-muted text-sm mr-1"
                      >Pseudo:</span
                    >
                    <span class="text-space-text text-sm font-mono truncate">{{
                      level.gameUsername
                    }}</span>
                  </div>
                </div>

                <!-- Rang -->
                <div
                  v-if="level.isRanked && level.rank"
                  class="bg-space-bg-light/30 p-2 rounded-lg"
                >
                  <div class="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-space-accent-light flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div class="flex-1 min-w-0">
                      <span class="text-space-text-muted text-sm mr-1"
                        >Rang:</span
                      >
                      <span class="text-space-accent-light text-sm font-mono">{{
                        level.rank
                      }}</span>
                    </div>
                  </div>
                </div>

                <!-- Rôles -->
                <div
                  v-if="level.selectedRoles && level.selectedRoles.length > 0"
                  class="bg-space-bg-light/30 p-2 rounded-lg"
                >
                  <div class="flex items-center mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-space-primary-light mr-2 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        d="M12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
                      />
                    </svg>
                    <span class="text-space-text-muted text-sm">Rôles:</span>
                  </div>

                  <div class="flex flex-wrap gap-1 mt-1">
                    <SpaceBadge
                      v-for="roleName in level.selectedRoles"
                      :key="roleName"
                      variant="primary"
                      size="sm"
                      className="max-w-[120px] overflow-hidden"
                      :style="getRoleStyle(level.game, roleName)"
                      :title="roleName"
                    >
                      <span class="truncate">{{ roleName }}</span>
                    </SpaceBadge>
                  </div>
                </div>

                <!-- Commentaire -->
                <div
                  v-if="level.comment"
                  class="bg-space-bg-light/30 p-3 rounded-lg"
                >
                  <p class="text-sm text-space-text-muted italic">
                    « {{ level.comment }} »
                  </p>
                </div>

                <!-- Boutons d'action -->
                <div class="flex justify-end space-x-3 mt-4">
                  <SpaceButton
                    @click="openEditModal(level)"
                    variant="secondary"
                    size="sm"
                    className="flex items-center"
                  >
                    <template #icon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                        />
                      </svg>
                    </template>
                    Modifier
                  </SpaceButton>

                  <SpaceButton
                    @click="confirmDelete(level)"
                    variant="error"
                    size="sm"
                    className="flex items-center"
                  >
                    <template #icon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-1"
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
                    Supprimer
                  </SpaceButton>
                </div>
              </div>
            </SpaceCard>
          </div>
        </div>

        <!-- Section pour ajouter un nouveau niveau -->
        <div>
          <SpaceTitle
            size="xl"
            :decorated="true"
            className="mb-6 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2 text-space-accent-light"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            Ajouter un niveau
          </SpaceTitle>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Carte pour ajouter un nouveau niveau -->
            <SpaceCard
              @click="showGameSelector = true"
              variant="accent"
              :stars="true"
              className="border-2 border-dashed border-space-accent/30 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-space-accent/70 h-[320px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-16 w-16 text-space-accent/70 mb-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <p class="text-space-accent-light font-nasa text-lg">
                Définir un nouveau niveau
              </p>
              <p
                class="text-space-text-muted text-sm mt-2 max-w-xs text-center"
              >
                Ajouter vos compétences sur un jeu pour participer aux tournois
              </p>
            </SpaceCard>
          </div>
        </div>
      </template>
    </SpaceCard>

    <!-- Modal pour sélectionner un jeu -->
    <SpaceModal v-model="showGameSelector" title="SÉLECTION DU JEU">
      <!-- Recherche de jeux -->
      <div class="mb-5 relative">
        <SpaceInput
          v-model="gameSearch"
          placeholder="Rechercher un jeu..."
          :clearable="true"
          className="pl-10"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-space-text-muted"
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
      </div>

      <!-- État vide -->
      <SpaceTerminal
        v-if="filteredGames.length === 0"
        command="search_games"
        title="Recherche de jeux"
        :showCursor="true"
        className="mb-4"
      >
        <div v-if="gameSearch" class="text-space-error">
          Aucun jeu ne correspond à votre recherche "{{ gameSearch }}"
        </div>
        <div v-else class="text-space-error">Aucun jeu disponible</div>
        <div class="text-space-text-muted mt-2">
          Contactez un administrateur pour ajouter de nouveaux jeux
        </div>
      </SpaceTerminal>

      <!-- Liste de jeux -->
      <div v-else class="max-h-96 overflow-y-auto mb-4 pr-2 space-y-3">
        <SpaceCard
          v-for="game in filteredGames"
          :key="game._id"
          @click="selectGame(game)"
          :variant="hasLevelForGame(game) ? 'dark' : 'primary'"
          :className="
            [
              'cursor-pointer transition-all hover:scale-[1.02] duration-300 overflow-hidden',
              hasLevelForGame(game) ? 'opacity-50' : '',
            ].join(' ')
          "
        >
          <div class="flex items-center">
            <!-- Image du jeu -->
            <div
              class="w-14 h-14 rounded overflow-hidden bg-space-bg-light flex-shrink-0 mr-3 border border-space-primary/30"
            >
              <img
                v-if="game.imageUrl"
                :src="game.imageUrl"
                :alt="game.name"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-space-text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
            </div>

            <!-- Informations du jeu -->
            <div class="flex-grow min-w-0">
              <h4 class="text-white font-nasa">{{ game.name }}</h4>
              <p
                v-if="game.description"
                class="text-space-text-muted text-sm line-clamp-1"
              >
                {{ game.description }}
              </p>
            </div>

            <!-- Indicateur de niveau déjà défini -->
            <div v-if="hasLevelForGame(game)" class="ml-3">
              <SpaceBadge variant="outline" size="sm">
                {{ getLevelForGame(game)?.level }}
              </SpaceBadge>
            </div>
          </div>
        </SpaceCard>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <SpaceButton @click="showGameSelector = false" variant="ghost">
            Annuler
          </SpaceButton>
        </div>
      </template>
    </SpaceModal>

    <!-- Modal pour définir le niveau -->
    <SpaceModal
      v-model="showLevelSelector"
      :title="
        selectedGame?.name
          ? `DÉFINIR NIVEAU: ${selectedGame.name}`
          : 'DÉFINIR NIVEAU'
      "
    >
      <form @submit.prevent="saveLevel" class="space-y-6">
        <!-- Sélection du niveau -->
        <div>
          <label class="block text-space-primary-light text-sm font-nasa mb-3">
            Niveau de jeu
            <span class="text-space-error ml-1">*</span>
          </label>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              v-for="levelOption in availableLevels"
              :key="levelOption.value"
              :class="[
                'p-3 border rounded-md cursor-pointer transition-all duration-300 flex items-center justify-between',
                selectedLevel === levelOption.value
                  ? 'border-space-primary bg-space-primary/10 shadow-inner'
                  : 'border-space-bg-light hover:border-space-primary/30',
              ]"
              @click="selectedLevel = levelOption.value"
            >
              <div class="flex items-center">
                <div
                  class="w-3 h-3 rounded-full mr-3"
                  :class="getLevelColorClass(levelOption.value)"
                ></div>
                <span class="text-space-text font-nasa text-sm">{{
                  levelOption.label
                }}</span>
              </div>
              <svg
                v-if="selectedLevel === levelOption.value"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-space-primary"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Pseudo dans le jeu -->
        <div>
          <label
            for="gameUsername"
            class="block text-space-primary-light text-sm font-nasa mb-2"
          >
            Pseudo dans le jeu (optionnel)
          </label>
          <SpaceInput
            id="gameUsername"
            v-model="gameUsername"
            placeholder="Votre pseudo dans ce jeu"
            :maxlength="30"
          />
          <div class="flex justify-between mt-1">
            <p class="text-xs text-space-text-muted">
              Par exemple: Votre pseudo League of Legends pour accéder à votre
              OP.GG
            </p>
            <p class="text-xs text-space-text-muted">
              {{ gameUsername.length }}/30
            </p>
          </div>
        </div>

        <!-- Classement -->
        <div>
          <div class="mb-2">
            <SpaceToggle
              v-model="isRanked"
              label="Je joue en classé"
              className="toggle-primary"
            />
          </div>

          <div v-if="isRanked" class="mt-3">
            <label
              for="rank"
              class="block text-space-primary-light text-sm font-nasa mb-2"
            >
              Rang actuel
              <span class="text-space-error ml-1">*</span>
            </label>

            <SpaceInput
              id="rank"
              v-model="rank"
              placeholder="Ex: Diamant 2, Master, Silver 3..."
              :maxlength="20"
              :errorMessage="
                rankError ? 'Veuillez indiquer votre rang actuel' : ''
              "
            />

            <div class="flex justify-between mt-1">
              <p v-if="!rankError" class="text-xs text-space-accent italic">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3 inline mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Merci d'indiquer votre plus haut rang, pas un smurf
              </p>
              <p class="text-xs text-space-text-muted">{{ rank.length }}/20</p>
            </div>
          </div>
        </div>

        <!-- Sélection des rôles si disponibles -->
        <div
          v-if="
            selectedGame && selectedGame.roles && selectedGame.roles.length > 0
          "
        >
          <label
            class="flex items-center justify-between text-space-primary-light text-sm font-nasa mb-2"
          >
            <span class="flex items-center">
              Rôles préférés
              <span class="text-space-error ml-1">*</span>
            </span>
            <div class="flex items-center gap-3">
              <Button
                @click="selectAllRoles"
                type="button"
                variant="ghost"
                size="xs"
                className="flex items-center"
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3 mr-1"
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
                </template>
                Tout sélectionner
              </Button>
              <Badge variant="primary" size="sm">
                {{ selectedRoles.length }} /
                {{ selectedGame?.roles?.length || 0 }}
              </Badge>
            </div>
          </label>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div
              v-for="role in selectedGame.roles"
              :key="role.name"
              :class="[
                'flex items-center p-2 border rounded-md cursor-pointer transition-all duration-300 overflow-hidden',
                selectedRoles.includes(role.name)
                  ? 'border-space-primary bg-space-primary/10'
                  : 'border-space-bg-light hover:border-space-primary/30',
              ]"
              @click="toggleRole(role.name)"
            >
              <input
                type="checkbox"
                :id="`role-${role.name}`"
                :checked="selectedRoles.includes(role.name)"
                @change="toggleRole(role.name)"
                class="h-4 w-4 text-space-primary focus:ring-space-primary border-space-bg-light rounded bg-space-bg flex-shrink-0"
              />
              <label
                :for="`role-${role.name}`"
                class="ml-2 flex-grow cursor-pointer flex items-center truncate"
                :title="role.name"
              >
                <div
                  class="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                  :style="{ backgroundColor: role.color || '#6B7280' }"
                ></div>
                <span class="text-space-text font-nasa text-sm truncate">{{
                  role.name
                }}</span>
              </label>
            </div>
          </div>

          <p v-if="roleError" class="text-xs text-space-error mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3 inline mr-1"
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
            Veuillez sélectionner au moins un rôle
          </p>
        </div>

        <!-- Commentaire -->
        <div>
          <label
            for="comment"
            class="block text-space-primary-light text-sm font-nasa mb-2"
          >
            Commentaire (optionnel)
          </label>
          <textarea
            id="comment"
            v-model="comment"
            rows="3"
            placeholder="Informations complémentaires, rôle préféré, etc."
            maxlength="150"
            class="w-full p-3 bg-color-bg-light border border-color-bg-light rounded-md text-color-text focus:border-color-primary focus:outline-none focus:ring-1 focus:ring-color-primary/30 font-mono resize-none"
          ></textarea>
          <div class="flex justify-end mt-1">
            <p class="text-xs text-color-text-muted">
              {{ comment.length }}/150
            </p>
          </div>
        </div>

        <!-- Boutons d'action -->
        <div
          class="flex justify-end space-x-3 pt-3 border-t border-space-bg-light"
        >
          <SpaceButton type="button" @click="cancelLevelEdit" variant="ghost">
            Annuler
          </SpaceButton>
          <SpaceButton
            type="submit"
            variant="primary"
            :disabled="!selectedLevel || isSaving"
          >
            <template v-if="isSaving">
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
              Enregistrement...
            </template>
            <template v-else>Enregistrer</template>
          </SpaceButton>
        </div>
      </form>
    </SpaceModal>

    <!-- Modal de confirmation de suppression -->
    <SpaceModal
      v-if="showDeleteConfirmation"
      v-model="showDeleteConfirmation"
      title="CONFIRMATION DE SUPPRESSION"
      variant="error"
    >
      <div class="text-center mb-6 space-y-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-space-error mx-auto"
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

        <p class="text-space-text">
          Êtes-vous sûr de vouloir supprimer votre niveau pour
          <span class="text-space-primary-light font-nasa">
            {{ levelToDelete ? getGameName(levelToDelete) : "Jeu inconnu" }}
          </span>
          ?
        </p>

        <p class="text-space-text-muted text-sm">
          Cette action est irréversible.
        </p>
      </div>

      <template #footer>
        <div class="flex justify-center space-x-4">
          <SpaceButton @click="cancelDelete" variant="ghost">
            Annuler
          </SpaceButton>
          <SpaceButton
            @click="deleteLevel"
            variant="error"
            :loading="isDeleting"
          >
            Supprimer
          </SpaceButton>
        </div>
      </template>
    </SpaceModal>
    <!-- Toast pour les notifications -->
    <Toast v-if="toast.show" :type="toast.type" :message="toast.message" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
import { useUserStore } from "../stores/userStore";
import playerGameLevelService from "../services/playerGameLevelService";
import gameService from "../services/gameService";
import type { Game, PlayerGameLevel } from "../types";
import { useRoute, useRouter } from "vue-router";
import tournamentService from "../services/tournamentService";
import Toast from "@/shared/Toast.vue";
// -----------------------------------------------
// #region ÉTATS RÉACTIFS
// -----------------------------------------------
const userStore = useUserStore();
const loading = ref(true);
const playerLevels = ref<PlayerGameLevel[]>([]);
const games = ref<Game[]>([]);
const currentPlayerId = computed(() => userStore.playerId || "");

const route = useRoute();
const router = useRouter();

const rankError = ref(false);

// États des modales
const showGameSelector = ref(false);
const showLevelSelector = ref(false);
const showDeleteConfirmation = ref(false);

// État pour les rôles
const selectedRoles = ref<string[]>([]);
const roleError = ref(false);

// États du formulaire de niveau
const selectedGame = ref<Game | null>(null);
const selectedGameId = ref<string>(""); // Nouvelle référence pour l'ID du jeu

const selectedLevel = ref<string>("");
const gameUsername = ref<string>("");
const isRanked = ref<boolean>(false);
const rank = ref<string>("");
const comment = ref<string>("");
const editingLevelId = ref<string | null>(null);
const isSaving = ref(false);
const gameSearch = ref("");

// États pour la suppression
const levelToDelete = ref<PlayerGameLevel | null>(null);
const isDeleting = ref(false);

// Toast notifications
const toast = ref({
  show: false,
  message: "",
  type: "success" as "success" | "error",
});
// #endregion

// -----------------------------------------------
// #region DONNÉES STATIQUES
// -----------------------------------------------
const availableLevels = [
  { value: "débutant", label: "Débutant" },
  { value: "intermédiaire", label: "Intermédiaire" },
  { value: "avancé", label: "Avancé" },
  { value: "expert", label: "Expert" },
];
// #endregion

// -----------------------------------------------
// #region COMPUTED PROPERTIES
// -----------------------------------------------
// Jeux filtrés selon la recherche et sans ceux qui ont déjà un niveau
const filteredGames = computed(() => {
  // Récupérer les IDs des jeux pour lesquels un niveau est déjà défini
  const existingGameIds = playerLevels.value.map((level) => {
    return typeof level.game === "object" ? level.game._id : level.game;
  });

  // Filtrer les jeux
  const search = gameSearch.value.trim().toLowerCase();
  return games.value
    .filter((game) => !existingGameIds.includes(game._id)) // Jeux sans niveau défini
    .filter((game) => !search || game.name.toLowerCase().includes(search)); // Recherche
});
// #endregion

// -----------------------------------------------
// #region HELPERS ET UTILITAIRES
// -----------------------------------------------
// Récupérer l'image du jeu
const getGameImage = (level: PlayerGameLevel): string | undefined => {
  return typeof level.game === "object" && level.game.imageUrl
    ? level.game.imageUrl
    : undefined;
};

// Récupérer le nom du jeu
const getGameName = (level: PlayerGameLevel): string => {
  return typeof level.game === "object" && level.game.name
    ? level.game.name
    : "Jeu inconnu";
};

const getLevelColorClass = (level: string): string => {
  switch (level) {
    case "débutant":
      return "bg-green-500";
    case "intermédiaire":
      return "bg-blue-500";
    case "avancé":
      return "bg-purple-500";
    case "expert":
      return "bg-pink-500";
    default:
      return "bg-gray-500";
  }
};

// Gérer l'erreur de chargement d'image
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  if (target) {
    target.src = "/placeholder-game.jpg";
  }
};

// Vérifier si un niveau existe déjà pour un jeu
const hasLevelForGame = (game: Game): boolean => {
  return playerLevels.value.some((level) => {
    const gameId = typeof level.game === "object" ? level.game._id : level.game;
    return gameId === game._id;
  });
};

// Obtenir le niveau pour un jeu donné
const getLevelForGame = (game: Game): PlayerGameLevel | undefined => {
  return playerLevels.value.find((level) => {
    const gameId = typeof level.game === "object" ? level.game._id : level.game;
    return gameId === game._id;
  });
};

/**
 * Ajoute ou supprime un rôle de la sélection
 */
const toggleRole = (roleName: string) => {
  if (selectedRoles.value.includes(roleName)) {
    // Si le rôle est déjà sélectionné, le désélectionner
    selectedRoles.value = selectedRoles.value.filter(
      (role) => role !== roleName
    );
  } else {
    // Sinon, l'ajouter
    selectedRoles.value.push(roleName);
  }
};

// Obtenir le style pour un rôle spécifique
const getRoleStyle = (game: string | Game, roleName: string) => {
  if (typeof game === "object" && game && game.roles) {
    const role = game.roles.find((r) => r.name === roleName);
    if (role && role.color) {
      const bgColor = role.color;
      return {
        backgroundColor: `${bgColor}20`, // Réduction de l'opacité pour plus de lisibilité
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
    maxWidth: "100%",
  };
};

/**
 * Sélectionne tous les rôles disponibles pour le jeu actuel
 */
const selectAllRoles = () => {
  if (selectedGame.value && selectedGame.value.roles) {
    // Récupérer tous les noms de rôles disponibles
    const allRoleNames = selectedGame.value.roles.map((role) => role.name);

    // Remplacer la sélection actuelle par tous les rôles
    selectedRoles.value = [...allRoleNames];

    // Réinitialiser l'erreur si présente
    roleError.value = false;
  }
};

// #endregion

// -----------------------------------------------
// #region GESTION DES NOTIFICATIONS
// -----------------------------------------------
// Afficher un toast
const showToast = (message: string, type: "success" | "error") => {
  toast.value = { show: true, message, type };
  setTimeout(() => {
    toast.value.show = false;
  }, 4000); // Correspondance avec la durée du nouveau Toast spatial
};
// #endregion

// -----------------------------------------------
// #region OPÉRATIONS CRUD ET APPELS API
// -----------------------------------------------
// Récupération des niveaux du joueur
const fetchPlayerLevels = async () => {
  if (!currentPlayerId.value) {
    console.warn("fetchPlayerLevels: Aucun ID de joueur disponible");
    return;
  }

  try {
    const response = await playerGameLevelService.getPlayerLevels(
      currentPlayerId.value
    );
    playerLevels.value = response || [];
  } catch (error) {
    console.error("Erreur lors du chargement des niveaux:", error);
    showToast("Erreur lors du chargement des niveaux de jeu", "error");
    playerLevels.value = [];
  }
};

// Récupérer la liste des jeux
const fetchGames = async () => {
  try {
    games.value = await gameService.getGames();
  } catch (error) {
    console.error("Erreur lors du chargement des jeux:", error);
    showToast("Erreur lors du chargement des jeux", "error");
  }
};

// Enregistrer le niveau
const saveLevel = async (e?: Event) => {
  // Empêcher le comportement par défaut du formulaire si l'événement est fourni
  if (e) e.preventDefault();

  // Réinitialiser les états d'erreur
  rankError.value = false;
  roleError.value = false;

  // Vérification des données requises
  if (!selectedGameId.value || !selectedLevel.value || !currentPlayerId.value) {
    showToast("Données incomplètes pour l'enregistrement", "error");
    return;
  }

  // Vérifier si le rang est requis mais non fourni
  if (isRanked.value && !rank.value.trim()) {
    rankError.value = true;
    showToast("Veuillez indiquer votre rang actuel", "error");
    return;
  }

  // Vérifier si les rôles sont requis mais non fournis
  if (
    selectedGame.value?.roles &&
    selectedGame.value.roles.length > 0 &&
    selectedRoles.value.length === 0
  ) {
    roleError.value = true;
    showToast("Veuillez sélectionner au moins un rôle", "error");
    return;
  }

  isSaving.value = true;

  try {
    await playerGameLevelService.setPlayerLevel(
      currentPlayerId.value,
      selectedGameId.value,
      {
        level: selectedLevel.value,
        gameUsername: gameUsername.value.trim(),
        isRanked: isRanked.value,
        rank: isRanked.value ? rank.value.trim() : undefined,
        selectedRoles: selectedRoles.value,
        comment: comment.value.trim(),
      }
    );

    await fetchPlayerLevels();
    showLevelSelector.value = false;
    resetForm();
    handleSuccessfulSave();

    showToast("Niveau enregistré avec succès", "success");
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du niveau:", error);
    showToast("Erreur lors de l'enregistrement du niveau", "error");
  } finally {
    isSaving.value = false;
  }
};

// Supprimer un niveau
const deleteLevel = async () => {
  if (!levelToDelete.value || !currentPlayerId.value) return;

  isDeleting.value = true;

  try {
    const gameId =
      typeof levelToDelete.value.game === "object"
        ? levelToDelete.value.game._id
        : levelToDelete.value.game;

    await playerGameLevelService.deletePlayerLevel(
      currentPlayerId.value,
      gameId || ""
    );
    await fetchPlayerLevels();

    showDeleteConfirmation.value = false;
    levelToDelete.value = null;
    showToast("Niveau supprimé avec succès", "success");
  } catch (error) {
    console.error("Erreur lors de la suppression du niveau:", error);
    showToast("Erreur lors de la suppression du niveau", "error");
  } finally {
    isDeleting.value = false;
  }
};
// #endregion

// -----------------------------------------------
// #region GESTION DU FORMULAIRE
// -----------------------------------------------
// Ouvrir le modal d'édition pour un niveau existant
// Ouvrir le modal d'édition pour un niveau existant
const openEditModal = (level: PlayerGameLevel) => {
  // Récupérer le jeu
  if (typeof level.game === "object") {
    selectedGame.value = level.game;
    selectedGameId.value = level.game._id as string; // Ajouter cette ligne
  } else {
    selectedGame.value = games.value.find((g) => g._id === level.game) || null;
    selectedGameId.value = level.game as string; // Ajouter cette ligne
  }

  if (!selectedGame.value) return;

  // Définir les valeurs du formulaire
  selectedLevel.value = level.level;
  gameUsername.value = level.gameUsername || "";
  isRanked.value = level.isRanked || false;
  rank.value = level.rank || "";
  comment.value = level.comment || "";
  selectedRoles.value = level.selectedRoles || [];
  editingLevelId.value = level._id || null;

  // Afficher la modale
  showLevelSelector.value = true;
};

// Sélectionner un jeu dans la liste
const selectGame = (game: Game) => {
  selectedGame.value = game;
  selectedGameId.value = game._id as string;

  showGameSelector.value = false;

  // Vérifier si le joueur a déjà défini un niveau pour ce jeu
  const existingLevel = getLevelForGame(game);

  if (existingLevel) {
    selectedLevel.value = existingLevel.level;
    gameUsername.value = existingLevel.gameUsername || "";
    isRanked.value = existingLevel.isRanked || false;
    rank.value = existingLevel.rank || "";
    comment.value = existingLevel.comment || "";
    selectedRoles.value = existingLevel.selectedRoles || [];
    editingLevelId.value = existingLevel._id || null;
  } else {
    selectedLevel.value = "débutant"; // Valeur par défaut
    gameUsername.value = "";
    isRanked.value = false;
    rank.value = "";
    comment.value = "";
    selectedRoles.value = [];
    editingLevelId.value = null;
  }

  showLevelSelector.value = true;
};

// Annuler l'édition d'un niveau
const cancelLevelEdit = () => {
  showLevelSelector.value = false;
  resetForm();
};

// Réinitialiser le formulaire
const resetForm = () => {
  selectedGame.value = null;
  if (!showLevelSelector.value) {
    selectedGameId.value = "";
  }
  selectedLevel.value = "";
  gameUsername.value = "";
  isRanked.value = false;
  rank.value = "";
  comment.value = "";
  selectedRoles.value = [];
  editingLevelId.value = null;
  roleError.value = false;
};

// #endregion

// -----------------------------------------------
// #region GESTION DE LA SUPPRESSION
// -----------------------------------------------
// Confirmer la suppression d'un niveau
const confirmDelete = (level: PlayerGameLevel) => {
  levelToDelete.value = level;
  showDeleteConfirmation.value = true;
};

// Annuler la suppression
const cancelDelete = () => {
  levelToDelete.value = null;
  showDeleteConfirmation.value = false;
};
// #endregion

// -----------------------------------------------
// #region CYCLE DE VIE DU COMPOSANT
// -----------------------------------------------
// Initialisation des données
onMounted(async () => {
  loading.value = true;

  try {
    // Charger l'utilisateur si besoin
    if (!userStore.user) {
      await userStore.fetchUser();
    }

    if (!userStore.user) {
      showToast("Veuillez vous connecter pour accéder à cette page", "error");
      return;
    }

    // Récupérer l'ID du joueur si besoin
    if (!currentPlayerId.value) {
      await userStore.fetchPlayer(userStore.user._id);
    }

    if (!currentPlayerId.value) {
      showToast("Impossible de récupérer votre profil joueur", "error");
      return;
    }

    // Charger les données en parallèle
    await Promise.all([fetchPlayerLevels(), fetchGames()]);

    // Vérifier s'il y a un gameId dans l'URL pour ouvrir directement le modal
    const gameId = route.query.gameId as string;

    if (gameId) {
      const game = games.value.find((g) => g._id === gameId);
      if (game) {
        selectGame(game);
      }
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation:", error);
    showToast("Erreur lors du chargement des données", "error");
  } finally {
    loading.value = false;
  }
});

/**
 * Gère les actions après un enregistrement réussi et inscrit automatiquement au tournoi si nécessaire
 */
const handleSuccessfulSave = async () => {
  try {
    const redirectPath = route.query.redirect as string;
    const tournamentId = route.query.tournamentId as string;
    const autoRegister = route.query.autoRegister === "true";

    if (redirectPath) {
      // Si on doit s'inscrire automatiquement
      if (tournamentId && autoRegister && userStore.user) {
        try {
          showToast("Inscription au tournoi en cours...", "success");

          // Appeler l'API pour inscrire le joueur au tournoi
          await tournamentService.registerPlayer(
            tournamentId,
            userStore.user._id
          );

          // Message de succès spécifique pour l'inscription
          showToast("Inscription au tournoi réussie!", "success");
        } catch (error) {
          console.error("Erreur lors de l'inscription automatique:", error);
          showToast(
            "Erreur lors de l'inscription automatique au tournoi",
            "error"
          );
        }
      } else {
        // Message standard si pas d'inscription auto
        showToast("Niveau enregistré avec succès!", "success");
      }

      // Rediriger vers le tournoi après un court délai
      setTimeout(() => {
        // Nettoyer d'abord l'URL actuelle en redirigeant vers /player-level sans paramètres
        router.replace("/player-level").then(() => {
          // Puis rediriger vers la page d'origine
          router.push(redirectPath);
        });
      }, 1500);
    } else {
      // Si pas de redirection, juste nettoyer l'URL
      router.replace("/player-level");
      showToast("Niveau enregistré avec succès", "success");
    }
  } catch (err) {
    console.error("Erreur dans handleSuccessfulSave:", err);
    showToast("Erreur lors de la finalisation de l'enregistrement", "error");
  }
};

// Observer les changements d'utilisateur
const unwatchUser = watch(
  () => userStore.user,
  async (newUser) => {
    if (newUser && !playerLevels.value.length) {
      loading.value = true;

      if (!currentPlayerId.value) {
        await userStore.fetchPlayer(newUser._id);
      }

      if (currentPlayerId.value) {
        await Promise.all([fetchPlayerLevels(), fetchGames()]);
      }

      loading.value = false;
    }
  },
  { immediate: true }
);

// Réinitialiser la recherche quand le modal est ouvert
watch(showGameSelector, (newVal) => {
  if (newVal) {
    gameSearch.value = "";
  }
});

// Nettoyer les observateurs
onUnmounted(() => {
  if (unwatchUser) unwatchUser();
});
// #endregion
</script>

<style scoped></style>
