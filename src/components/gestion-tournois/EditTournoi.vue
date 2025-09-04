<template>
  <div class="container mx-auto p-8">
    <!-- En-tête -->
    <SpaceHeader
      title="MODIFICATION DE TOURNOI"
      titleSize="3xl"
      :showMissionInfo="true"
      mission="TOURNAMENT-MGMT"
    />

    <!-- Formulaire principal -->
    <SpaceCard
      variant="primary"
      :stars="true"
      :decorated="true"
      className="mt-6"
    >
      <form @submit.prevent="editTournament" class="space-y-6">
        <!-- Sélection du tournoi -->
        <div>
          <label
            for="tournament"
            class="text-lg text-space-primary-light mb-2 font-nasa flex items-center"
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
            Sélectionner un Tournoi
            <span class="text-space-accent ml-1">*</span>
          </label>
          <SpaceDropdown
            id="tournament"
            v-model="selectedTournament"
            @change="loadTournamentDetails"
            required
          >
            <option value="" disabled selected>Choisir un tournoi</option>
            <option
              v-for="tournament in tournaments"
              :key="tournament._id"
              :value="tournament._id"
            >
              {{ tournament.name }}
            </option>
          </SpaceDropdown>
        </div>

        <!-- Nom du tournoi -->
        <div>
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
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clip-rule="evenodd"
              />
            </svg>
            Nom du Tournoi <span class="text-space-accent ml-1">*</span>
          </label>
          <SpaceInput
            id="name"
            v-model="name"
            placeholder="Nom du tournoi"
            required
          />
        </div>

        <!-- Sélection du jeu -->
        <div>
          <label
            for="game"
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
            Jeu <span class="text-space-accent ml-1">*</span>
          </label>
          <SpaceDropdown id="game" v-model="game" required>
            <option value="" disabled selected>Sélectionnez un jeu</option>
            <option v-for="game in games" :key="game._id" :value="game._id">
              {{ game.name }}
            </option>
          </SpaceDropdown>
        </div>

        <!-- Grid pour la mise en page responsive -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Date et heure -->
          <div>
            <label
              for="date"
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
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
              Date <span class="text-space-accent ml-1">*</span>
            </label>
            <SpaceInput
              id="date"
              v-model="date"
              type="datetime-local"
              required
            />
          </div>

          <!-- Nom du channel Discord -->
          <div>
            <label
              for="discordChannelName"
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
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clip-rule="evenodd"
                />
              </svg>
              Nom du Channel Discord
              <span class="text-space-accent ml-1">*</span>
              <div class="relative group ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-space-primary-light cursor-help"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
                <div
                  class="absolute z-50 w-64 p-2 bg-space-bg text-space-primary-light text-xs rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 -mt-1 left-0 transform -translate-y-full transition-opacity duration-300 border border-space-primary/30"
                >
                  Ne pas inclure le symbole "#" dans le nom du canal
                </div>
              </div>
            </label>
            <SpaceInput
              id="discordChannelName"
              v-model="discordChannelName"
              placeholder="Ex: tournoi-mario-kart"
              required
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Rappel Discord -->
          <div>
            <label
              for="discordReminderDate"
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
                  d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                  clip-rule="evenodd"
                />
              </svg>
              Rappel sur Discord
              <div class="relative group ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-space-primary-light cursor-help"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
                <div
                  class="absolute z-50 w-64 p-2 bg-space-bg text-space-primary-light text-xs rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 -mt-1 left-0 transform -translate-y-full transition-opacity duration-300 border border-space-primary/30"
                >
                  Date à laquelle un rappel sera envoyé sur le canal Discord.
                  Par défaut 2 jours avant le tournoi à 12h.
                </div>
              </div>
            </label>
            <SpaceInput
              id="discordReminderDate"
              v-model="discordReminderDate"
              type="datetime-local"
            />
          </div>

          <!-- Rappel privé -->
          <div>
            <label
              for="privateReminderDate"
              class="text-lg text-space-primary-light mb-2 font-nasa flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                />
                <path
                  d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                />
              </svg>
              Rappel privé
              <div class="relative group ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-space-primary-light cursor-help"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
                <div
                  class="absolute z-50 w-64 p-2 bg-space-bg text-space-primary-light text-xs rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 -mt-1 left-0 transform -translate-y-full transition-opacity duration-300 border border-space-primary/30"
                >
                  Date à laquelle un rappel sera envoyé en message privé à
                  chaque joueur. Par défaut 1 jour avant le tournoi à 12h.
                </div>
              </div>
            </label>
            <SpaceInput
              id="privateReminderDate"
              v-model="privateReminderDate"
              type="datetime-local"
            />
          </div>
        </div>

        <!-- Limite de joueurs -->
        <div>
          <label
            for="playerCap"
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
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clip-rule="evenodd"
              />
            </svg>
            Limite de Joueurs
            <div class="relative group ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-space-primary-light cursor-help"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
              <div
                class="absolute z-50 w-64 p-2 bg-space-bg text-space-primary-light text-xs rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 -mt-1 left-0 transform -translate-y-full transition-opacity duration-300 border border-space-primary/30"
              >
                0 = Pas de limite | Sinon, définit le nombre maximum de joueurs.
                Les joueurs supplémentaires seront mis en liste d'attente.
              </div>
            </div>
          </label>
          <SpaceInput
            id="playerCap"
            v-model="playerCap"
            type="number"
            min="0"
            placeholder="0 = Pas de limite"
          />
        </div>

        <!-- Description -->
        <div>
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
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clip-rule="evenodd"
              />
            </svg>
            Description <span class="text-space-accent ml-1">*</span>
          </label>
          <SpaceInput
            id="description"
            v-model="description"
            type="textarea"
            :rows="4"
            placeholder="Décrivez les détails du tournoi..."
            required
          />
        </div>

        <!-- Liste d'attente des joueurs (si présente) -->
        <div v-if="waitlistPlayers.length > 0" class="mt-6">
          <SpaceCard variant="accent" :stars="true" className="mb-4">
            <template #header>
              <div class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-space-accent-light"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
                  />
                </svg>
                <SpaceTitle size="md">
                  Liste d'attente ({{ waitlistPlayers.length }} joueurs)
                </SpaceTitle>
              </div>
            </template>

            <div class="max-h-60 overflow-y-auto">
              <div
                v-for="player in waitlistPlayers"
                :key="player._id"
                class="flex justify-between items-center p-3 border-b border-space-bg-light/20 last:border-b-0"
              >
                <div class="text-space-text font-nasa">
                  {{ player.username }}
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-space-text-muted font-mono">
                    {{ formatWaitingTime(player._id || "") }}
                  </span>
                  <SpaceButton
                    @click="promotePlayer(player)"
                    variant="success"
                    size="sm"
                    title="Ajouter à la liste principale"
                    icon
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
                  </SpaceButton>
                </div>
              </div>
            </div>
          </SpaceCard>
        </div>
        <!-- Sélection des joueurs -->

        <div>
          <label
            for="players"
            class="text-lg text-space-primary-light mb-2 font-nasa flex items-center"
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
            Ajouter des Joueurs
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
              class="w-full py-3 px-4 bg-space-bg-light/50 text-space-text border border-space-primary/50 rounded-lg font-nasa shadow-glow-primary-sm transition-all duration-300 focus:outline-none focus:border-space-primary focus:shadow-glow-primary"
              placeholder="Rechercher un joueur..."
            />

            <!-- Liste des résultats de recherche - POSITIONNEMENT AMÉLIORÉ -->
            <div
              v-if="showPlayerList"
              class="absolute mt-2 bg-black border border-space-accent/30 rounded-lg max-h-[200px] overflow-y-auto shadow-glow-accent z-[9999]"
              style="width: 100%; top: 100%; left: 0"
            >
              <ul class="py-1">
                <li
                  v-for="player in filteredPlayers"
                  :key="player._id"
                  @mousedown.prevent="addPlayer(player)"
                  class="px-4 py-3 cursor-pointer transition-colors hover:bg-space-accent/20 text-space-text font-nasa text-sm"
                >
                  {{ player.username }}
                </li>
                <li
                  v-if="filteredPlayers.length === 0"
                  class="px-4 py-3 text-space-text-muted italic text-center text-sm"
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
              class="flex items-center bg-space-accent/20 text-space-text px-3 py-2 rounded-full text-sm border border-space-accent/50 transition-all hover:bg-space-accent/30 hover:border-space-accent/70 hover:shadow-glow-accent font-nasa"
            >
              {{ player.username }}
              <button
                @click.prevent="removePlayer(player)"
                class="ml-2 text-space-text/70 hover:text-space-error transition-colors"
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
        </div>
        <!-- Boutons d'action -->
        <div class="flex flex-wrap gap-4 mt-8 justify-center">
          <SpaceButton type="submit" variant="primary" size="lg" icon>
            <template #icon>
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
            </template>
            Modifier le Tournoi
          </SpaceButton>

          <SpaceButton
            v-if="selectedTournament"
            type="button"
            @click="confirmDeleteTournament"
            variant="error"
            size="lg"
            icon
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
            Supprimer le Tournoi
          </SpaceButton>
        </div>
      </form>
    </SpaceCard>

    <!-- Notifications -->
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />

    <!-- Modal de confirmation de suppression -->
    <!-- Modal de confirmation de suppression -->
    <SpaceModal
      v-model="showConfirmationDialog"
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
          Êtes-vous sûr de vouloir supprimer le tournoi "{{ name }}" ?
        </p>
        <p class="text-space-text-muted text-sm mb-4">
          Cette action est irréversible et supprimera toutes les données
          associées à ce tournoi.
        </p>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <SpaceButton
            @click="showConfirmationDialog = false"
            variant="outline"
            size="md"
          >
            Annuler
          </SpaceButton>
          <SpaceButton
            @click="deleteTournament"
            variant="error"
            size="md"
            :loading="false"
          >
            Supprimer
          </SpaceButton>
        </div>
      </template>
    </SpaceModal>
  </div>
</template>

<script setup lang="ts">
// Script inchangé
import { ref, onMounted, computed } from "vue";
import Toast from "@/shared/Toast.vue";
import tournamentService from "../../services/tournamentService";
import gameService from "../../services/gameService";
import playerService from "../../services/playerService";
import type { Tournament, Game, Player, PlayerCheckedIn } from "../../types";

const tournaments = ref<Tournament[]>([]);
const selectedTournament = ref<string>("");
const name = ref<string>("");
const game = ref<string>("");
const date = ref<string>("");
const discordChannelName = ref<string>("");
const playerSearch = ref<string>("");
const playerSearchResults = ref<Player[]>([]);
const selectedPlayers = ref<PlayerCheckedIn[]>([]);
const allPlayers = ref<Player[]>([]);
const showPlayerList = ref<boolean>(false);
const error = ref<string | null>(null);
const success = ref<string | null>(null);
const showConfirmationDialog = ref<boolean>(false);
const description = ref<string>("");
const playerCap = ref<string>("0");
const waitlistPlayers = ref<PlayerCheckedIn[]>([]);
const discordReminderDate = ref<string>("");
const privateReminderDate = ref<string>("");
const games = ref<Game[]>([]);

const fetchTournaments = async () => {
  try {
    const allTournaments = await tournamentService.getTournaments();
    tournaments.value = allTournaments.filter(
      (tournament) => !tournament.finished
    );
    if (tournaments.value.length === 0) {
      showMessage(
        "error",
        "Aucun tournoi n'est disponible pour le moment. Veuillez en créer un."
      );
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des tournois:", error);
  }
};

// Format d'une date pour l'input datetime-local
const formatDateForInput = (date: Date | string): string => {
  // Vous avez une date en UTC, vous voulez l'afficher en local
  // Convertir en objet Date
  const d = date instanceof Date ? date : new Date(date);

  // Vérifier si la date est valide
  if (isNaN(d.getTime())) {
    console.error("Date invalide:", date);
    return "";
  }

  // Date en local déjà convertie par JavaScript
  const localYear = d.getFullYear();
  const localMonth = String(d.getMonth() + 1).padStart(2, "0");
  const localDay = String(d.getDate()).padStart(2, "0");
  const localHours = String(d.getHours()).padStart(2, "0");
  const localMinutes = String(d.getMinutes()).padStart(2, "0");

  return `${localYear}-${localMonth}-${localDay}T${localHours}:${localMinutes}`;
};

const loadTournamentDetails = async () => {
  if (selectedTournament.value) {
    const tournament = await tournamentService.getTournamentById(
      selectedTournament.value
    );

    name.value = tournament.name;
    game.value = (tournament.game as any)._id;
    date.value = formatDateForInput(tournament.date);
    discordChannelName.value = tournament.discordChannelName;
    description.value = tournament.description || "";
    playerCap.value = (tournament.playerCap || 0).toString(); // Charger playerCap
    discordReminderDate.value = formatDateForInput(
      tournament.discordReminderDate
    );
    privateReminderDate.value = formatDateForInput(
      tournament.privateReminderDate
    );

    // Charger les joueurs de la liste principale
    selectedPlayers.value = tournament.players.map((player: any) => ({
      _id: player._id,
      username: player.username,
      userId: player.userId,
      checkedIn: tournament.checkIns
        ? tournament.checkIns[player._id] || false
        : false,
    }));

    // Charger les joueurs de la liste d'attente si présents
    waitlistPlayers.value = tournament.waitlistPlayers
      ? tournament.waitlistPlayers.map((player: any) => ({
          _id: player._id,
          username: player.username,
          userId: player.userId,
          checkedIn: false,
        }))
      : [];
  }
};

// Ajouter une fonction pour formater le temps d'attente
const formatWaitingTime = (playerId: string) => {
  if (!selectedTournament.value) return "";

  // Vous devrez récupérer la date d'inscription en liste d'attente depuis waitlistRegistrationDates
  const tournament = tournaments.value.find(
    (t) => t._id === selectedTournament.value
  );
  if (!tournament || !tournament.waitlistRegistrationDates) return "";

  const waitDate = tournament.waitlistRegistrationDates[playerId];
  if (!waitDate) return "";

  const waitTimeMs = Date.now() - new Date(waitDate).getTime();
  const days = Math.floor(waitTimeMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (waitTimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  if (days > 0) {
    return `En attente depuis ${days} jour${days > 1 ? "s" : ""} et ${hours}h`;
  } else {
    return `En attente depuis ${hours}h`;
  }
};

const fetchGames = async () => {
  games.value = await gameService.getGames();
};

const fetchAllPlayers = async () => {
  allPlayers.value = await playerService.getPlayers();
};

// Remplacez la fonction handleSearch par la fonction d'origine searchPlayers
const searchPlayers = async () => {
  if (playerSearch.value.length > 0) {
    playerSearchResults.value = await playerService.searchPlayers(
      playerSearch.value
    );
  } else {
    playerSearchResults.value = [];
  }
};

// Gardez cette fonction qui fonctionnait bien
const filteredPlayers = computed(() => {
  const selectedPlayerIds = new Set(selectedPlayers.value.map((p) => p._id));
  if (playerSearch.value.length > 0) {
    return playerSearchResults.value.filter(
      (player) => !selectedPlayerIds.has(player._id)
    );
  }
  return allPlayers.value.filter(
    (player) => !selectedPlayerIds.has(player._id)
  );
});

const addPlayer = (player: Player) => {
  if (!selectedPlayers.value.some((p) => p._id === player._id)) {
    selectedPlayers.value.push({ ...player, checkedIn: false });
  }
  playerSearch.value = "";
  playerSearchResults.value = [];
  showPlayerList.value = false;

  const playerInput = document.getElementById("players") as HTMLInputElement;
  if (playerInput) {
    playerInput.blur();
  }
};

const removePlayer = (player: PlayerCheckedIn) => {
  selectedPlayers.value = selectedPlayers.value.filter(
    (p) => p._id !== player._id
  );
};

const editTournament = async () => {
  try {
    const selectedDate = new Date(date.value);
    // Calculer les dates de rappel
    const discordReminder = discordReminderDate.value
      ? new Date(discordReminderDate.value)
      : null;

    const privateReminder = privateReminderDate.value
      ? new Date(privateReminderDate.value)
      : null;
    const allPlayers = [...selectedPlayers.value, ...waitlistPlayers.value];

    const tournament: Tournament = {
      _id: selectedTournament.value,
      name: name.value,
      game: games.value.find((g) => g._id === game.value) as Game,
      date: selectedDate.toISOString(),
      discordChannelName: discordChannelName.value,
      description: description.value,
      players: allPlayers, // Envoyer tous les joueurs (actifs + liste d'attente)
      playerCap: parseInt(playerCap.value) || 0,
      teamsPublished: false,
      finished: false,
      discordReminderDate: new Date(discordReminder || date.value),
      privateReminderDate: new Date(privateReminder || date.value),
      casters: tournaments.value.find(t => t._id === selectedTournament.value)?.casters || [],
      clips: tournaments.value.find(t => t._id === selectedTournament.value)?.clips || []
    };

    await tournamentService.updateTournament(
      selectedTournament.value,
      tournament
    );

    showMessage("success", "Tournoi modifié avec succès !");

    // Recharger les données du tournoi pour voir les changements
    await loadTournamentDetails();
  } catch (err) {
    console.error("Erreur lors de la modification du tournoi:", err);
    showMessage(
      "error",
      (err as any).response?.data?.message || "Erreur inconnue."
    );
  }
};
const confirmDeleteTournament = () => {
  showConfirmationDialog.value = true;
};

const promotePlayer = (player: PlayerCheckedIn) => {
  // Vérifier si l'ajout de ce joueur dépasserait la limite actuelle
  const playerCapNum = parseInt(playerCap.value) || 0;
  if (playerCapNum > 0 && selectedPlayers.value.length >= playerCapNum) {
    // Deux options: augmenter automatiquement la limite ou demander confirmation

    // Option 1: Augmenter automatiquement la limite
    playerCap.value = (selectedPlayers.value.length + 1).toString();
    showMessage(
      "success",
      `La limite de joueurs a été augmentée à ${playerCap.value} pour permettre l'ajout de ${player.username}.`
    );
  }

  // Supprimer le joueur de la liste d'attente
  waitlistPlayers.value = waitlistPlayers.value.filter(
    (p) => p._id !== player._id
  );

  // Ajouter le joueur à la liste principale
  selectedPlayers.value.push(player);

  // Message de confirmation temporaire
  showMessage("success", `${player.username} ajouté à la liste principale !`);
};

const deleteTournament = async () => {
  try {
    if (selectedTournament.value) {
      await tournamentService.deleteTournament(selectedTournament.value);
      showMessage("success", "Tournoi supprimé avec succès !");
      fetchTournaments();
      selectedTournament.value = "";
      name.value = "";
      game.value = "";
      date.value = "";
      description.value = "";
      discordChannelName.value = "";
      selectedPlayers.value = [];
    }
  } catch (err) {
    console.error("Erreur lors de la suppression du tournoi:", err);
    showMessage(
      "error",
      (err as any).response?.data?.message || "Erreur inconnue."
    );
  } finally {
    showConfirmationDialog.value = false;
  }
};

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
  }, 5000);
};

const hidePlayerList = () => {
  // Délai plus long pour permettre le clic sur un élément de la liste
  setTimeout(() => {
    showPlayerList.value = false;
  }, 300);
};

onMounted(() => {
  fetchTournaments();
  fetchGames();
  fetchAllPlayers();
});
</script>

<style scoped>
/* Formulaire */
.tournament-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

/* Groupe de formulaire */
.form-group {
  margin-bottom: 0.5rem;
  width: 100%;
}

/* Label du formulaire */
.form-label {
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  color: #06b6d4;
  margin-bottom: 0.5rem;
  font-family: "Orbitron", sans-serif;
  font-weight: 600;
  text-shadow: 0 0 5px rgba(6, 182, 212, 0.7);
}

/* Container d'input */
.input-wrapper {
  position: relative;
  width: 100%;
}

/* Inputs stylisés */
.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.75rem 1rem;
  color: white;
  background-color: rgba(17, 24, 39, 0.8);
  border: 1px solid rgba(6, 182, 212, 0.5);
  border-radius: 0.5rem;
  font-family: "Orbitron", sans-serif;
  box-shadow: 0 0 5px rgba(6, 182, 212, 0.3);
  transition: all 0.3s ease;
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #06b6d4;
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
}

/* Container pour le select */
.select-wrapper {
  position: relative;
  width: 100%;
}

/* Flèche personnalisée pour le select */
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

/* Effet de lueur pour les inputs */
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

.form-input:focus + .input-glow,
.form-textarea:focus + .input-glow,
.form-select:focus + .input-glow {
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.7);
}

/* Résultats de recherche de joueurs */
.player-search-results {
  margin-top: 0.5rem;
  background-color: rgba(17, 24, 39, 0.95);
  border: 1px solid rgba(139, 92, 246, 0.5);
  border-radius: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.player-search-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "Orbitron", sans-serif;
  color: white;
}

.player-search-item:hover {
  background-color: rgba(139, 92, 246, 0.2);
  color: #a78bfa;
}

.player-search-empty {
  padding: 0.75rem 1rem;
  color: #a78bfa;
  font-style: italic;
  text-align: center;
}

/* Container pour les joueurs sélectionnés */
.selected-players-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

/* Style pour chaque joueur sélectionné */
.selected-player {
  display: flex;
  align-items: center;
  background: rgba(139, 92, 246, 0.2);
  color: white;
  font-family: "Orbitron", sans-serif;
  padding: 0.5rem 0.75rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  border: 1px solid rgba(139, 92, 246, 0.5);
  transition: all 0.3s ease;
}

.selected-player:hover {
  background: rgba(139, 92, 246, 0.3);
  border-color: rgba(139, 92, 246, 0.7);
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
}

/* Bouton pour retirer un joueur */
.remove-player-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.2s ease;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.remove-player-btn:hover {
  color: #ec4899;
}

/* Groupe de boutons */
.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

/* Bouton d'édition néon */
.neon-button-edit {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(45deg, #0891b2, #06b6d4);
  color: white;
  font-family: "Orbitron", sans-serif;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3);
  border: 1px solid rgba(6, 182, 212, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
}

.neon-button-edit:hover {
  background: linear-gradient(45deg, #06b6d4, #22d3ee);
  transform: translateY(-3px);
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.7), 0 0 30px rgba(6, 182, 212, 0.4);
}

.neon-button-edit:active {
  transform: translateY(-1px);
}

/* Bouton de suppression néon */
.neon-button-delete {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(45deg, #be123c, #e11d48);
  color: white;
  font-family: "Orbitron", sans-serif;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(225, 29, 72, 0.5), 0 0 20px rgba(225, 29, 72, 0.3);
  border: 1px solid rgba(225, 29, 72, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
}

.neon-button-delete:hover {
  background: linear-gradient(45deg, #e11d48, #fb7185);
  transform: translateY(-3px);
  box-shadow: 0 0 15px rgba(225, 29, 72, 0.7), 0 0 30px rgba(225, 29, 72, 0.4);
}

.neon-button-delete:active {
  transform: translateY(-1px);
}

/* Effet de balayage lumineux pour les boutons */
.neon-button-edit::before,
.neon-button-delete::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: all 0.6s ease;
}

.neon-button-edit:hover::before,
.neon-button-delete:hover::before {
  left: 100%;
}

/* Scrollbar personnalisée */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 92, 246, 0.8);
}

/* Media queries pour responsive */
@media (max-width: 640px) {
  .button-group {
    flex-direction: column;
  }

  .neon-button-edit,
  .neon-button-delete {
    width: 100%;
  }
}

/* Animation de pulse pour les boutons */
@keyframes pulse-cyan {
  0% {
    box-shadow: 0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3);
  }
  50% {
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.7), 0 0 30px rgba(6, 182, 212, 0.5);
  }
  100% {
    box-shadow: 0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3);
  }
}

@keyframes pulse-red {
  0% {
    box-shadow: 0 0 10px rgba(225, 29, 72, 0.5), 0 0 20px rgba(225, 29, 72, 0.3);
  }
  50% {
    box-shadow: 0 0 15px rgba(225, 29, 72, 0.7), 0 0 30px rgba(225, 29, 72, 0.5);
  }
  100% {
    box-shadow: 0 0 10px rgba(225, 29, 72, 0.5), 0 0 20px rgba(225, 29, 72, 0.3);
  }
}

.neon-button-edit {
  animation: pulse-cyan 2s infinite;
}

.neon-button-delete {
  animation: pulse-red 2s infinite;
}

/* Animation d'apparition pour les messages */
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
</style>
