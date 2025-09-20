<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\GestionBadges.vue -->
<template>
  <Container>
    <!-- En-tête -->
    <Header
      title="GESTION DE BADGES"
      mission="BADGES-EXPLORER"
      :showMissionInfo="true"
    >
      <template #badge v-if="badges.length > 0">
        <Badge variant="secondary" size="lg">{{ badges.length }}</Badge>
      </template>
    </Header>

    <!-- Section Création de badge -->
    <Card variant="primary" :stars="true" :decorated="true" className="mb-6">
      <template #header>
        <Title size="xl" variant="primary">
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
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
              />
            </svg>
          </template>
          Créer un nouveau badge
        </Title>
      </template>
      <form @submit.prevent="createBadge" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="title"
            v-model="newBadge.title"
            label="Titre"
            type="text"
            placeholder="Nom du badge..."
          />
          <div>
            <label
              class="block text-lg text-color-primary-light mb-2 font-nasa"
            >
              Catégorie
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                class="flex items-center space-x-3 p-3 rounded-lg bg-color-bg-light/50 border border-color-primary/30 hover:border-color-primary/60 transition-colors duration-300"
              >
                <input
                  id="categoryTypeAcs"
                  v-model="newBadge.categoryType"
                  type="radio"
                  value="acs"
                  name="categoryType"
                  class="h-5 w-5 text-color-primary focus:ring-color-primary focus:ring-2 border-color-primary/50"
                />
                <label
                  for="categoryTypeAcs"
                  class="text-color-text font-nasa cursor-pointer"
                >
                  Badge ACS (général)
                </label>
              </div>
              <div
                class="flex items-center space-x-3 p-3 rounded-lg bg-color-bg-light/50 border border-color-primary/30 hover:border-color-primary/60 transition-colors duration-300"
              >
                <input
                  id="categoryTypeGame"
                  v-model="newBadge.categoryType"
                  type="radio"
                  value="game"
                  name="categoryType"
                  class="h-5 w-5 text-color-primary focus:ring-color-primary focus:ring-2 border-color-primary/50"
                />
                <label
                  for="categoryTypeGame"
                  class="text-color-text font-nasa cursor-pointer"
                >
                  Badge spécifique à un jeu
                </label>
              </div>
            </div>
          </div>
        </div>
        <!-- Sélecteur de jeu, visible uniquement si catégorie = jeu -->
        <div v-if="newBadge.categoryType === 'game'">
          <SpaceDropdown
            id="categoryId"
            v-model="newBadge.categoryId"
            label="Jeu associé"
            placeholder="Sélectionner un jeu"
            :required="true"
          >
            <option v-for="game in games" :key="game._id" :value="game._id">
              {{ game.name }}
            </option>
          </SpaceDropdown>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              id="imageUrl"
              v-model="newBadge.imageUrl"
              label="URL de l'image"
              type="url"
              placeholder="https://example.com/image.png"
              :required="true"
            />
          </div>
          <div
            v-if="newBadge.imageUrl"
            class="flex flex-col items-center justify-center"
          >
            <label
              class="block text-lg text-color-primary-light mb-2 font-nasa"
            >
              Prévisualisation
            </label>
            <div class="badge-preview">
              <div
                class="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-color-bg-dark to-color-bg-light p-1 border-2 border-color-primary/50 overflow-hidden shadow-lg"
              >
                <img
                  :src="newBadge.imageUrl"
                  alt="Prévisualisation"
                  class="max-h-full max-w-full object-contain"
                  @error="handleImageError"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Input
            id="description"
            v-model="newBadge.description"
            label="Description (optionnelle)"
            type="textarea"
            placeholder="Description du badge..."
            rows="3"
          />
        </div>
        <div class="flex justify-end mt-6">
          <Button variant="primary" size="lg" type="submit">
            Créer le badge
          </Button>
        </div>
      </form>
    </Card>

    <!-- Section Association de badge -->
    <Card variant="secondary" :stars="true" :decorated="true" className="mb-6">
      <template #header>
        <Title size="xl" variant="secondary">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </template>
          Associer un badge à des joueurs
        </Title>
      </template>
      <form @submit.prevent="assignBadge" class="space-y-6">
        <!-- Sélection des joueurs -->
        <div class="mb-6">
          <label
            class="flex items-center text-lg text-color-secondary-light mb-2 font-nasa"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
              />
            </svg>
            Joueurs à associer
          </label>
          <div class="relative">
            <input
              type="text"
              id="players"
              autocomplete="off"
              v-model="playerSearch"
              @focus="showPlayerList = true"
              @blur="hidePlayerList"
              @input="searchPlayers"
              class="w-full py-3 px-4 bg-color-bg-light/50 text-color-text border border-color-secondary/50 rounded-lg font-nasa shadow-glow-secondary-sm transition-all duration-300 focus:outline-none focus:border-color-secondary focus:shadow-glow-secondary"
              placeholder="Rechercher un joueur..."
            />
            <!-- Liste des résultats de recherche -->
            <div
              v-if="showPlayerList"
              class="absolute mt-2 bg-black border border-color-secondary/30 rounded-lg max-h-[200px] overflow-y-auto shadow-glow-secondary z-[9999]"
              style="width: 100%; top: 100%; left: 0"
            >
              <ul class="py-1">
                <li
                  v-for="player in filteredPlayers"
                  :key="player._id"
                  @mousedown.prevent="addPlayer(player)"
                  class="px-4 py-3 cursor-pointer transition-colors hover:bg-color-secondary/20 text-color-text font-nasa text-sm"
                >
                  {{ player.username }}
                </li>
                <li
                  v-if="filteredPlayers.length === 0"
                  class="px-4 py-3 text-color-text-muted italic text-center text-sm"
                >
                  Aucun joueur trouvé
                </li>
              </ul>
            </div>
          </div>

          <!-- Liste des joueurs sélectionnés -->
          <div class="flex flex-wrap gap-2 mt-4">
            <div
              v-for="player in selectedPlayers"
              :key="player._id"
              class="flex items-center bg-color-secondary/20 text-color-text px-3 py-2 rounded-full text-sm border border-color-secondary/50 transition-all hover:bg-color-secondary/30 hover:border-color-secondary/70 hover:shadow-glow-secondary font-nasa"
            >
              {{ player.username }}
              <button
                @click="removePlayer(player)"
                class="ml-2 text-color-text-muted hover:text-space-danger transition-colors"
                type="button"
                aria-label="Retirer le joueur"
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

          <!-- Instructions -->
          <p
            v-if="selectedPlayers.length > 0"
            class="mt-2 text-xs text-pink-300/70"
          >
            {{ selectedPlayers.length }} joueur{{
              selectedPlayers.length > 1 ? "s" : ""
            }}
            sélectionné{{ selectedPlayers.length > 1 ? "s" : "" }}
          </p>
          <p v-else class="mt-2 text-xs text-pink-300/70 italic">
            Recherchez et sélectionnez des joueurs à qui attribuer le badge
          </p>
        </div>
        <!-- PARTIE MANQUANTE : Sélection du badge à associer -->
        <div class="mt-6">
          <SpaceDropdown
            id="badgeToAssign"
            v-model="badgeId"
            label="Badge à associer"
            placeholder="Sélectionner un badge"
            :required="true"
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
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
            <option v-for="badge in badges" :key="badge._id" :value="badge._id">
              {{ badge.title }}
            </option>
          </SpaceDropdown>
          <!-- Prévisualisation du badge sélectionné -->
          <div
            v-if="badgeId"
            class="mt-4 flex items-center bg-color-bg-light/50 rounded-lg p-3 border border-color-secondary/30"
          >
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-color-bg-dark to-color-bg-light p-1 mr-3 border border-color-secondary/40 overflow-hidden"
            >
              <img
                :src="badges.find((b) => b._id === badgeId)?.imageUrl"
                :alt="badges.find((b) => b._id === badgeId)?.title"
                class="max-h-full max-w-full object-contain"
                @error="handleImageError"
              />
            </div>
            <span class="text-color-text font-nasa">{{
              badges.find((b) => b._id === badgeId)?.title
            }}</span>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <Button
            type="submit"
            variant="secondary"
            size="lg"
            :disabled="selectedPlayers.length === 0 || !badgeId"
          >
            Associer le badge
          </Button>
        </div>
      </form>
    </Card>

    <!-- Section badges du joueur avec autocomplete -->
    <Card variant="accent" :stars="true" :decorated="true" className="mb-6">
      <template #header>
        <Title size="xl" variant="accent">
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
              />
            </svg>
          </template>
          Modifier les badges d'un joueur
        </Title>
      </template>

      <div class="space-y-6">
        <div>
          <label
            class="flex items-center text-lg text-color-accent-light mb-2 font-nasa"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
              />
            </svg>
            Rechercher un joueur
          </label>
          <div class="relative">
            <input
              type="text"
              id="playerSelectSearch"
              autocomplete="off"
              v-model="playerBadgeSearch"
              @focus="showPlayerBadgeList = true"
              @blur="hidePlayerBadgeList"
              @input="searchPlayersBadge"
              class="w-full py-3 px-4 bg-color-bg-light/50 text-color-text border border-color-accent/50 rounded-lg font-nasa shadow-glow-accent-sm transition-all duration-300 focus:outline-none focus:border-color-accent focus:shadow-glow-accent"
              placeholder="Nom du joueur..."
            />

            <!-- Liste des résultats de recherche -->
            <div
              v-if="showPlayerBadgeList"
              class="absolute mt-2 bg-black border border-color-accent/30 rounded-lg max-h-[200px] overflow-y-auto shadow-glow-accent z-[9999]"
              style="width: 100%; top: 100%; left: 0"
            >
              <ul class="py-1">
                <li
                  v-for="player in filteredPlayersBadge"
                  :key="player._id"
                  @mousedown.prevent="selectPlayerForBadges(player)"
                  class="px-4 py-3 cursor-pointer transition-colors hover:bg-color-accent/20 text-color-text font-nasa text-sm"
                >
                  {{ player.username }}
                </li>
                <li
                  v-if="filteredPlayersBadge.length === 0"
                  class="px-4 py-3 text-color-text-muted italic text-center text-sm"
                >
                  Aucun joueur trouvé
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Affichage du joueur sélectionné -->
        <div
          v-if="selectedPlayerBadge"
          class="flex items-center justify-between bg-color-bg-light border border-color-accent/40 px-4 py-3 rounded-lg"
        >
          <div class="flex items-center">
            <span class="text-color-text font-body text-lg">{{
              selectedPlayerBadge.username
            }}</span>
          </div>
          <Button
            @click="clearSelectedPlayerBadge"
            variant="ghost"
            size="sm"
            title="Changer de joueur"
            aria-label="Changer de joueur"
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
          </Button>
        </div>
        <!-- Badges du joueur sélectionné -->
        <div
          v-if="selectedPlayerId && selectedPlayerBadges.length > 0"
          class="space-y-4"
        >
          <Title size="lg" variant="accent" className="text-center">
            Badges associés
          </Title>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="badge in selectedPlayerBadges"
              :key="badge._id"
              class="bg-color-bg-light rounded-lg p-4 flex items-center justify-between border border-color-accent/40 hover:border-color-accent/70 hover:shadow-lg hover:shadow-color-accent/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div class="flex items-center">
                <div
                  class="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-color-bg-dark to-color-bg-light p-1 mr-4 border-2 border-color-primary/30 overflow-hidden shadow-lg"
                >
                  <img
                    :src="badge.imageUrl"
                    :alt="badge.title"
                    class="max-h-full max-w-full object-contain"
                    @error="handleImageError"
                  />
                </div>
                <span class="text-color-text font-body">{{ badge.title }}</span>
              </div>
              <Button
                @click="badge._id && removeBadge(badge._id)"
                variant="danger"
                size="sm"
                title="Supprimer ce badge"
                aria-label="Supprimer le badge"
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
              </Button>
            </div>
          </div>
        </div>

        <div v-else-if="selectedPlayerId" class="text-center py-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-color-accent mx-auto mb-4"
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
          <p class="text-color-text font-body">
            Ce joueur n'a pas de badges pour le moment
          </p>
        </div>

        <div
          v-else-if="playerBadgeSearch && !selectedPlayerBadge"
          class="text-center py-8"
        >
          <p class="text-color-text font-body">
            Sélectionnez un joueur pour voir et modifier ses badges
          </p>
        </div>
      </div>
    </Card>
    <!-- Section liste des badges -->
    <Card variant="info" :stars="true" :decorated="true" className="mb-6">
      <template #header>
        <Title size="xl" variant="info">
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
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </template>
          Collection de badges
        </Title>
      </template>

      <div
        v-if="badges.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="badge in badges"
          :key="badge._id"
          class="bg-color-bg-light rounded-lg p-4 flex flex-col items-center border border-color-info/40 hover:border-color-info/70 hover:shadow-lg hover:shadow-color-info/20 hover:-translate-y-1 transition-all duration-300 group"
        >
          <div class="flex justify-end w-full mb-2">
            <!-- Boutons d'action -->
            <Button
              @click="openEditBadgeModal(badge)"
              variant="info"
              size="sm"
              title="Modifier ce badge"
              aria-label="Modifier le badge"
              class="mr-2"
            >
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
            </Button>
            <Button
              @click="confirmDeleteBadge(badge)"
              variant="danger"
              size="sm"
              title="Supprimer ce badge"
              aria-label="Supprimer le badge"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
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
          <div
            class="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-color-bg-dark to-color-bg-light p-1 mb-3 border-2 border-color-primary/30 overflow-hidden shadow-lg group-hover:shadow-color-primary/30 group-hover:border-color-primary/50 transition-all duration-300"
          >
            <img
              :src="badge.imageUrl"
              :alt="badge.title"
              class="max-h-full max-w-full object-contain"
              @error="handleImageError"
            />
          </div>
          <span class="text-color-text font-body text-center line-clamp-2">
            {{ badge.title }}
          </span>
          <!-- Description conditionnelle -->
          <p
            v-if="badge.description"
            class="text-color-text-muted text-xs mt-2 text-center line-clamp-3"
          >
            {{ badge.description }}
          </p>
          <div class="mt-2 flex items-center">
            <Badge
              :variant="badge.categoryType === 'acs' ? 'primary' : 'info'"
              size="sm"
            >
              {{
                badge.categoryType === "acs"
                  ? "ACS"
                  : getGameName(badge.categoryId)
              }}
            </Badge>
          </div>
        </div>
      </div>

      <div
        v-else
        class="flex flex-col items-center justify-center p-12 text-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-20 w-20 text-color-info opacity-70 mb-4"
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
        <p class="text-color-text font-body text-center">
          Aucun badge n'a été créé pour le moment
        </p>
        <p class="text-color-text-muted text-sm mt-2 font-body text-center">
          Commencez par créer un nouveau badge ci-dessus
        </p>
      </div>
    </Card>
    <!-- Modal de modification de badge -->
    <SpaceModal v-model="showEditModal" title="Modifier le badge">
      <form @submit.prevent="updateBadge" class="space-y-6">
        <Input
          id="edit-title"
          v-model="editingBadge.title"
          label="Titre"
          type="text"
          placeholder="Nom du badge..."
          :required="true"
        />
        <div>
          <label class="block text-lg text-color-info-light mb-2 font-nasa">
            Catégorie
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              class="flex items-center space-x-3 p-3 rounded-lg bg-color-bg-light/50 border border-color-info/30 hover:border-color-info/60 transition-colors duration-300"
            >
              <input
                id="edit-categoryTypeAcs"
                v-model="editingBadge.categoryType"
                type="radio"
                value="acs"
                name="editCategoryType"
                class="h-5 w-5 text-color-info focus:ring-color-info focus:ring-2 border-color-info/50"
              />
              <label
                for="edit-categoryTypeAcs"
                class="text-color-text font-nasa cursor-pointer"
              >
                Badge ACS (général)
              </label>
            </div>
            <div
              class="flex items-center space-x-3 p-3 rounded-lg bg-color-bg-light/50 border border-color-info/30 hover:border-color-info/60 transition-colors duration-300"
            >
              <input
                id="edit-categoryTypeGame"
                v-model="editingBadge.categoryType"
                type="radio"
                value="game"
                name="editCategoryType"
                class="h-5 w-5 text-color-info focus:ring-color-info focus:ring-2 border-color-info/50"
              />
              <label
                for="edit-categoryTypeGame"
                class="text-color-text font-nasa cursor-pointer"
              >
                Badge spécifique à un jeu
              </label>
            </div>
          </div>
        </div>

        <div v-if="editingBadge.categoryType === 'game'">
          <SpaceDropdown
            id="edit-categoryId"
            v-model="editingBadge.categoryId"
            label="Jeu associé"
            placeholder="Sélectionner un jeu"
            :required="true"
          >
            <option v-for="game in games" :key="game._id" :value="game._id">
              {{ game.name }}
            </option>
          </SpaceDropdown>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            id="edit-imageUrl"
            v-model="editingBadge.imageUrl"
            label="URL de l'image"
            type="url"
            placeholder="https://example.com/image.png"
            :required="true"
          />

          <div
            v-if="editingBadge.imageUrl"
            class="flex flex-col items-center justify-center"
          >
            <label class="block text-lg text-color-info-light mb-2 font-nasa">
              Prévisualisation
            </label>
            <div class="badge-preview">
              <div
                class="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-color-bg-dark to-color-bg-light p-1 border-2 border-color-primary/50 overflow-hidden shadow-lg"
              >
                <img
                  :src="editingBadge.imageUrl"
                  alt="Prévisualisation"
                  class="max-h-full max-w-full object-contain"
                  @error="handleImageError"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Input
            id="edit-description"
            v-model="editingBadge.description"
            label="Description (optionnelle)"
            type="textarea"
            placeholder="Description du badge..."
            rows="3"
          />
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <Button @click="showEditModal = false" variant="ghost" size="lg">
            Annuler
          </Button>
          <Button type="submit" variant="info" size="lg"> Enregistrer </Button>
        </div>
      </form>
    </SpaceModal>
    <!-- Modal de confirmation de suppression -->
    <SpaceModal v-model="showDeleteModal" title="Confirmer la suppression">
      <div class="text-center space-y-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-space-danger mx-auto"
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

        <div class="space-y-2">
          <p class="text-color-text font-body text-lg">
            Êtes-vous sûr de vouloir supprimer le badge
            <strong class="text-space-danger">{{
              badgeToDelete?.title
            }}</strong>
            ?
          </p>
          <p class="text-color-text-muted text-sm">
            Cette action est irréversible et supprimera également ce badge de
            tous les joueurs qui le possèdent.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <Button @click="showDeleteModal = false" variant="ghost" size="lg">
            Annuler
          </Button>
          <Button @click="deleteBadge" variant="danger" size="lg">
            Supprimer
          </Button>
        </div>
      </div>
    </SpaceModal>

    <!-- Notifications -->
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />
  </Container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// Services
import badgeService from "../../services/badgeService";
import playerService from "../../services/playerService";
import gameService from "../../services/gameService";

// Types
import type { Badge, Player, Game } from "../../types";

// Components
import Toast from "@/shared/Toast.vue";

//------------------------------------------------------
// 1. VARIABLES RÉACTIVES
//------------------------------------------------------

// Variables des modales
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const editingBadge = ref({
  _id: "",
  title: "",
  imageUrl: "",
  description: "",
  categoryType: "acs",
  categoryId: "",
});
const badgeToDelete = ref<Badge | null>(null);

// Formulaire de création de badge
const newBadge = ref({
  title: "",
  imageUrl: "",
  description: "",
  categoryType: "acs", // Par défaut c'est un badge ACS
  categoryId: "",
});

// Données principales
const games = ref<Game[]>([]);
const players = ref<Player[]>([]);
const badges = ref<Badge[]>([]);

// Sélections et associations
const selectedPlayerId = ref<string>("");
const badgeId = ref("");
const selectedPlayers = ref<Player[]>([]);
const selectedPlayerBadges = ref<Badge[]>([]);

// Messages et notifications
const error = ref<string | null>(null);
const success = ref<string | null>(null);

const playerSearch = ref<string>("");
const showPlayerList = ref<boolean>(false);
const filteredPlayers = ref<Player[]>([]);

// État de recherche pour la section "Modifier les badges d'un joueur"
const playerBadgeSearch = ref<string>("");
const showPlayerBadgeList = ref<boolean>(false);
const filteredPlayersBadge = ref<Player[]>([]);
const selectedPlayerBadge = ref<Player | null>(null);

//------------------------------------------------------
// 2. FONCTIONS UTILITAIRES
//------------------------------------------------------

/**
 * Fonction pour afficher une notification à l'utilisateur
 */
const showMessage = (type: "success" | "error", message: string) => {
  if (type === "success") {
    success.value = message;
    error.value = null;
  } else {
    error.value = message;
    success.value = null;
  }
  setTimeout(() => {
    success.value = null;
    error.value = null;
  }, 3000);
};

/**
 * Récupère le nom d'un jeu à partir de son ID
 */
const getGameName = (gameId: string) => {
  if (!gameId) return "";
  const game = games.value.find((g) => g._id === gameId);
  return game ? game.name : "Jeu inconnu";
};

/**
 * Gère les erreurs de chargement d'image
 */
const handleImageError = (e: Event) => {
  if (e.target instanceof HTMLImageElement) {
    e.target.src = "https://via.placeholder.com/50?text=?";
  }
};

/**
 * Valide les données du formulaire de badge
 */
const validateBadgeForm = (badge: Badge) => {
  const errors = [];

  if (!badge.title.trim()) {
    errors.push("Le titre du badge est requis");
  } else if (badge.title.length > 50) {
    errors.push("Le titre ne doit pas dépasser 50 caractères");
  }

  if (badge.categoryType === "game" && !badge.categoryId) {
    errors.push("Veuillez sélectionner un jeu pour ce badge");
  }

  if (!badge.imageUrl.trim()) {
    errors.push("L'URL de l'image est requise");
  } else {
    try {
      new URL(badge.imageUrl);
    } catch (e) {
      errors.push("Veuillez entrer une URL d'image valide");
    }
  }

  if (badge.description && badge.description.length > 200) {
    errors.push("La description ne doit pas dépasser 200 caractères");
  }

  return errors;
};

/**
 * Fonction pour afficher la liste des joueurs
 */
const hidePlayerList = () => {
  // Retarder la fermeture pour permettre le clic sur un élément de la liste
  setTimeout(() => {
    showPlayerList.value = false;
  }, 200);
};

/**
 * Ajoute un joueur à la liste des joueurs sélectionnés
 */
const addPlayer = (player: Player) => {
  // Vérifier si le joueur n'est pas déjà dans la liste
  if (!selectedPlayers.value.some((p) => p._id === player._id)) {
    // Pour l'association de badge, nous avons seulement besoin de l'ID
    if (player._id) {
      selectedPlayers.value.push(player);
    } else {
      console.error("Player ID is undefined and cannot be added.");
    }
  }

  // Réinitialiser la recherche
  playerSearch.value = "";
  filteredPlayers.value = [];

  // Focus de nouveau sur le champ pour continuer à ajouter des joueurs
  const playerInput = document.getElementById("players") as HTMLInputElement;
  if (playerInput) {
    playerInput.focus();
  }
};
//------------------------------------------------------
// 3. FONCTIONS DE RÉCUPÉRATION DE DONNÉES
//------------------------------------------------------

/**
 * Récupère la liste des badges
 */
const fetchBadges = async () => {
  try {
    badges.value = await badgeService.getBadges();
  } catch (error) {
    console.error("Erreur lors de la récupération des badges:", error);
    showMessage("error", "Erreur lors de la récupération des badges.");
  }
};

/**
 * Récupère la liste des joueurs
 */
const fetchPlayers = async () => {
  try {
    players.value = await playerService.getPlayers();
  } catch (error) {
    console.error("Erreur lors de la récupération des joueurs:", error);
    showMessage("error", "Erreur lors de la récupération des joueurs.");
  }
};

/**
 * Récupère la liste des jeux
 */
const fetchGames = async () => {
  try {
    games.value = await gameService.getGames();
  } catch (error) {
    console.error("Erreur lors de la récupération des jeux:", error);
    showMessage("error", "Erreur lors de la récupération des jeux.");
  }
};

/**
 * Récupère les badges d'un joueur spécifique
 */
const fetchPlayerBadges = async (playerId: string) => {
  try {
    selectedPlayerId.value = playerId;
    const player = await playerService.getPlayerById(playerId);
    selectedPlayerBadges.value = player.badges || [];
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des badges du joueur:",
      error
    );
    showMessage(
      "error",
      "Erreur lors de la récupération des badges du joueur."
    );
    selectedPlayerBadges.value = [];
  }
};

//------------------------------------------------------
// 4. GESTION DES BADGES
//------------------------------------------------------

/**
 * Crée un nouveau badge
 */
const createBadge = async () => {
  const errors = validateBadgeForm(newBadge.value);

  if (errors.length > 0) {
    showMessage("error", errors[0]);
    return;
  }

  try {
    const createdBadge = await badgeService.createBadge(newBadge.value);
    badges.value.push(createdBadge);

    // Réinitialiser le formulaire
    newBadge.value = {
      title: "",
      imageUrl: "",
      description: "",
      categoryType: "acs",
      categoryId: "",
    };

    showMessage("success", "Badge créé avec succès !");
  } catch (error) {
    console.error("Erreur lors de la création du badge:", error);
    showMessage("error", "Erreur lors de la création du badge.");
  }
};

/**
 * Affiche la modale de modification d'un badge
 */
const openEditBadgeModal = (badge: Badge) => {
  editingBadge.value = {
    _id: badge._id || "",
    title: badge.title,
    imageUrl: badge.imageUrl,
    description: badge.description || "",
    categoryType: badge.categoryType || "acs",
    categoryId: badge.categoryId || "",
  };
  showEditModal.value = true;
};

/**
 * Met à jour un badge existant
 */
const updateBadge = async () => {
  const errors = validateBadgeForm(editingBadge.value);
  if (errors.length > 0) {
    showMessage("error", errors[0]);
    return;
  }

  try {
    if (editingBadge.value._id) {
      const updatedBadge = await badgeService.updateBadge(
        editingBadge.value._id,
        editingBadge.value
      );

      // Mettre à jour le badge dans la liste
      const index = badges.value.findIndex((b) => b._id === updatedBadge._id);
      if (index !== -1) {
        badges.value[index] = updatedBadge;
      }

      showEditModal.value = false;
      showMessage("success", "Badge mis à jour avec succès !");

      // Actualiser les badges du joueur sélectionné si nécessaire
      if (selectedPlayerId.value) {
        fetchPlayerBadges(selectedPlayerId.value);
      }
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du badge:", error);
    showMessage("error", "Erreur lors de la mise à jour du badge.");
  }
};

/**
 * Affiche la confirmation avant suppression d'un badge
 */
const confirmDeleteBadge = (badge: Badge) => {
  badgeToDelete.value = badge;
  showDeleteModal.value = true;
};

/**
 * Supprime un badge
 */
const deleteBadge = async () => {
  try {
    if (badgeToDelete.value?._id) {
      await badgeService.deleteBadge(badgeToDelete.value._id);

      // Supprimer le badge de la liste
      badges.value = badges.value.filter(
        (b) => b._id !== badgeToDelete.value?._id
      );

      showDeleteModal.value = false;
      showMessage("success", "Badge supprimé avec succès !");

      // Actualiser les badges du joueur sélectionné si nécessaire
      if (selectedPlayerId.value) {
        fetchPlayerBadges(selectedPlayerId.value);
      }
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du badge:", error);
    showMessage("error", "Erreur lors de la suppression du badge.");
  }
};

//------------------------------------------------------
// 5. GESTION DES ASSOCIATIONS BADGE-JOUEUR
//------------------------------------------------------

/**
 * Associe un badge à plusieurs joueurs
 */
const assignBadge = async () => {
  try {
    if (selectedPlayers.value.length > 0 && badgeId.value) {
      for (const player of selectedPlayers.value) {
        if (player._id) {
          await badgeService.assignBadgeToPlayer(player._id, badgeId.value);
        }
      }
      showMessage(
        "success",
        "Badge associé avec succès à tous les joueurs sélectionnés !"
      );
      selectedPlayers.value = [];
      badgeId.value = "";
      playerSearch.value = "";
    }
  } catch (error) {
    console.error("Erreur lors de l'association du badge:", error);
    showMessage("error", "Erreur lors de l'association du badge.");
  }
};

/**
 * Retire un badge à un joueur
 */
const removeBadge = async (badgeId: string) => {
  try {
    if (selectedPlayerId.value) {
      await badgeService.removeBadgeFromPlayer(selectedPlayerId.value, badgeId);
      fetchPlayerBadges(selectedPlayerId.value);
      showMessage("success", "Badge supprimé avec succès !");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du badge:", error);
    showMessage("error", "Erreur lors de la suppression du badge.");
  }
};

/**
 * Retire un joueur de la liste des joueurs sélectionnés
 */
const removePlayer = (player: Player) => {
  selectedPlayers.value = selectedPlayers.value.filter(
    (p) => p._id !== player._id
  );
};

/**
 * Recherche des joueurs par nom
 */
const searchPlayers = () => {
  if (!playerSearch.value.trim()) {
    filteredPlayers.value = [];
    return;
  }

  const search = playerSearch.value.toLowerCase();
  filteredPlayers.value = players.value
    .filter(
      (p) =>
        p.username.toLowerCase().includes(search) &&
        !selectedPlayers.value.some((sp) => sp._id === p._id)
    )
    .slice(0, 10); // Limite à 10 résultats
};

/**
 * Cache la liste des joueurs pour la section badges
 */
const hidePlayerBadgeList = () => {
  // Retarder la fermeture pour permettre le clic sur un élément de la liste
  setTimeout(() => {
    showPlayerBadgeList.value = false;
  }, 200);
};

/**
 * Recherche des joueurs par nom pour la section badges
 */
const searchPlayersBadge = () => {
  if (!playerBadgeSearch.value.trim()) {
    filteredPlayersBadge.value = [];
    return;
  }

  const search = playerBadgeSearch.value.toLowerCase();
  filteredPlayersBadge.value = players.value
    .filter((p) => p.username.toLowerCase().includes(search))
    .slice(0, 10); // Limite à 10 résultats
};

/**
 * Sélectionne un joueur et charge ses badges
 */
const selectPlayerForBadges = (player: Player) => {
  selectedPlayerBadge.value = player;
  if (player._id) {
    selectedPlayerId.value = player._id;
    fetchPlayerBadges(player._id);
  }
  playerBadgeSearch.value = player.username;
  filteredPlayersBadge.value = [];
};

/**
 * Efface le joueur sélectionné
 */
const clearSelectedPlayerBadge = () => {
  selectedPlayerBadge.value = null;
  selectedPlayerId.value = "";
  selectedPlayerBadges.value = [];
  playerBadgeSearch.value = "";
};

//------------------------------------------------------
// 6. CYCLE DE VIE DU COMPOSANT
//------------------------------------------------------

onMounted(() => {
  fetchBadges();
  fetchGames();
  fetchPlayers();
});
</script>

<style scoped>
/* Styles de base pour la prévisualisation des badges */
.badge-preview {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Effet de lignes de contour pour les éléments */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Responsive design pour les petits écrans */
@media (max-width: 640px) {
  .container {
    padding: 1rem;
  }
}
</style>
