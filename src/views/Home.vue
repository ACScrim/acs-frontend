<template>
  <div
    class="relative flex items-center justify-center min-h-screen p-4 pb-16 navbar-spacing overflow-hidden"
  >
    <!-- Grille spatiale en arrière-plan -->
    <div
      class="space-grid absolute inset-0 opacity-10 pointer-events-none"
    ></div>

    <!-- Étoiles en arrière-plan -->
    <div
      v-for="n in 25"
      :key="`star-${n}`"
      class="absolute h-1 w-1 rounded-full bg-white animate-pulse"
      :style="{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        opacity: Math.random() * 0.7 + 0.3,
      }"
    ></div>

    <!-- "Planète" décorative en arrière-plan -->
    <div
      class="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-space-primary-dark/10 to-space-primary/5 opacity-30 blur-xl pointer-events-none"
    ></div>
    <div
      class="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-gradient-to-br from-space-accent-dark/10 to-space-accent/5 opacity-20 blur-xl pointer-events-none"
    ></div>
    <div
      class="w-full max-w-6xl z-10 px-4 mt-2 sm:mt-3 animate-fade-in-up"
      :class="
        user
          ? 'grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6'
          : 'flex justify-center'
      "
    >
      <!-- Colonne de gauche - Contenu principal -->
      <div
        class="flex flex-col items-center justify-center"
        :class="!user ? 'max-w-md' : ''"
      >
        <!-- Titre principal avec effet spatial -->
        <div class="title-container relative mb-3 sm:mb-4 mt-0">
          <div class="title-bg"></div>
          <h1
            class="title-text font-nasa text-center leading-tight relative z-10"
          >
            ALORS, <br />ÇA SCRIM ?
          </h1>
        </div>
        <!-- Logo -->
        <div
          class="relative my-4 sm:my-6 flex items-center justify-center group"
        >
          <div
            class="absolute inset-0 rounded-full bg-space-primary/10 filter blur-xl group-hover:bg-space-primary/20 transition-all duration-500 opacity-70"
          ></div>
          <img
            src="../assets/sanslueur.png"
            class="h-36 sm:h-40 w-auto transition-all duration-500 filter hover:scale-105 relative z-10"
            alt="Logo"
          />
        </div>

        <!-- Bouton de connexion Discord -->
        <Button
          v-if="!user"
          @click="loginWithDiscord"
          variant="primary"
          size="lg"
          className="mt-4 sm:mt-6 space-discord-button"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
              />
            </svg>
          </template>
          Connexion via Discord
        </Button>
        <!-- Badge de bienvenue stylisé différemment -->
        <div
          v-else
          class="mt-4 sm:mt-6 max-w-sm p-3 rounded-lg border-2 border-space-secondary/70 bg-gradient-to-br from-space-bg-light/80 to-space-bg/90 backdrop-blur-md shadow-lg shadow-space-secondary/20 animate-float-subtle relative overflow-hidden"
        >
          <!-- Effet de brillance -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
          ></div>

          <!-- Cercle décoratif -->
          <div
            class="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-space-secondary/10 blur-xl"
          ></div>

          <!-- Contenu -->
          <div class="flex items-center justify-center p-1 relative z-10">
            <div
              class="h-10 w-10 rounded-full flex items-center justify-center mr-3 bg-space-secondary/20 border border-space-secondary/50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-space-secondary-light"
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
            <div>
              <p
                class="capitalize font-nasa text-lg text-space-secondary-light"
              >
                Bienvenue, {{ user.username }}!
              </p>
              <p class="text-xs text-space-text-muted mt-1">
                Prêt à participer au prochain tournoi?
              </p>
            </div>
          </div>

          <!-- Ligne décorative -->
          <div
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-space-secondary/50 to-transparent"
          ></div>
        </div>
      </div>
      <!-- Colonne de droite - Informations sur les tournois -->
      <div
        v-if="user"
        class="flex flex-col space-y-4 sm:space-y-5 lg:space-y-6"
      >
        <!-- Prochain tournoi -->
        <Card
          variant="primary"
          :stars="true"
          :decorated="true"
          className="relative overflow-hidden"
        >
          <template #header>
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-3 text-space-primary-light"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <Title size="xl">PROCHAIN TOURNOI</Title>
              </div>
              <SpaceBadge
                :variant="isTournamentLive ? 'error' : 'warning'"
                size="md"
                className="animate-pulse-slow"
              >
                {{ isTournamentLive ? "LIVE" : "BIENTÔT" }}
              </SpaceBadge>
            </div>
          </template>

          <div v-if="isLoading">
            <Loader text="Chargement des données..." />
          </div>
          <div v-else-if="nextTournament" class="space-y-3">
            <TournamentCard :tournament="nextTournament" variant="primary">
              <template #content>
                <div class="flex flex-wrap gap-y-1 gap-x-2 xs:gap-x-3">
                  <div
                    class="text-3xs xs:text-2xs sm:text-xs text-space-text flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-4 sm:w-4 mr-0.5 xs:mr-1 text-space-primary-light"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{{ formatDate(nextTournament.date) }}</span>
                  </div>

                  <div
                    class="text-3xs xs:text-2xs sm:text-xs text-space-text flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-4 sm:w-4 mr-0.5 xs:mr-1 text-space-primary-light"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{{ formatTime(nextTournament.date) }}</span>
                  </div>
                </div>
              </template>
            </TournamentCard>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <div class="text-space-text font-mono">
                  <div class="flex items-center mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-2 text-space-primary-light"
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
                    <span class="text-sm">
                      {{
                        nextTournament.players
                          ? nextTournament.players.length
                          : 0
                      }}
                      joueurs inscrits</span
                    >
                  </div>
                  <div class="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-2 text-space-primary-light"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                      />
                    </svg>
                    <span class="text-sm">{{
                      nextTournament.game
                        ? nextTournament.game.name
                        : "Jeu non spécifié"
                    }}</span>
                  </div>
                </div>
              </div>

              <div class="flex justify-end items-center">
                <router-link
                  :to="
                    nextTournament
                      ? `/tournois/${nextTournament._id}`
                      : { name: 'TournoisAVenir' }
                  "
                >
                  <Button variant="secondary" size="sm">
                    <template #icon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </template>
                    {{ nextTournament ? "Voir" : "Tous les tournois" }}
                  </Button>
                </router-link>
              </div>
            </div>
            <!-- Timer animé -->
            <Card
              variant="dark"
              className="mt-3 py-1 px-2 max-w-xs mx-auto"
            >
              <div
                class="text-2xs text-space-text-muted mb-1 font-nasa text-center"
              >
                Commence dans:
              </div>
              <CountdownTimer :units="countdownUnits" variant="primary" />
            </Card>
          </div>

          <div v-else>
            <Terminal
              command="find_next_tournament"
              title="SYSTÈME DE TOURNOIS"
              :showCursor="true"
              className="mb-4"
            >
              <div class="text-space-primary-light">
                Aucun tournoi à venir n'a été trouvé dans la base de données.
              </div>
              <div class="text-space-text-muted mt-2">
                Consultez la page des tournois pour plus d'informations.
              </div>
            </Terminal>

            <div class="flex justify-center mt-4">
              <router-link :to="{ name: 'TournoisAVenir' }">
                <Button variant="secondary" size="sm">
                  Voir tous les tournois
                </Button>
              </router-link>
            </div>
          </div>
        </Card>
        <!-- Dernier tournoi terminé -->
        <Card
          variant="secondary"
          :stars="true"
          :decorated="true"
          className="relative overflow-hidden mb-8"
        >
          <template #header>
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-3 text-space-secondary-light"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <Title size="xl">DERNIER TOURNOI</Title>
              </div>
              <SpaceBadge variant="success" size="md"> TERMINÉ </SpaceBadge>
            </div>
          </template>

          <div v-if="isLoading">
            <Loader text="Chargement des résultats..." />
          </div>
          <div v-else-if="lastFinishedTournament" class="space-y-3">
            <TournamentCard
              :tournament="lastFinishedTournament"
              variant="secondary"
            >
              <template #content>
                <div
                  class="text-sm text-space-text-muted flex items-center mt-1"
                ></div>
              </template>
            </TournamentCard>

            <!-- Podium -->
            <div class="space-y-3">
              <div class="text-sm text-space-text font-nasa mb-2">Podium:</div>
              <div class="space-y-2">
                <Card
                  v-for="(team, index) in podiumTeams"
                  :key="team._id"
                  variant="dark"
                  :className="`border-space-accent/40 hover:border-space-accent/60 transition-all duration-300 ${
                    index === 0
                      ? 'border-2 border-amber-500/70 bg-gradient-to-r from-amber-900/10 to-amber-700/5'
                      : ''
                  }`"
                >
                  <div class="flex items-center">
                    <div
                      :class="`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                        index === 0
                          ? 'bg-amber-500/30 border border-amber-500/70'
                          : 'bg-space-accent/20 border border-space-accent/50'
                      }`"
                    >
                      <!-- Afficher une coupe pour la première place -->
                      <template v-if="index === 0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-6 w-6 text-amber-400"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            d="M11 17.938a8.001 8.001 0 01-7.938-7.938h1.937c.115 3.197 2.707 5.789 5.904 5.904v2.034z"
                          ></path>
                          <path
                            d="M14.063 2.063a8.001 8.001 0 017.938 7.938h-1.937a6.001 6.001 0 00-5.904-5.904V2.063zM13 17.938v2.034a8.001 8.001 0 007.938-7.938h-1.937A6.001 6.001 0 0113 17.938zM2.063 10.001a8.001 8.001 0 017.938-7.938v2.034a6.001 6.001 0 00-5.904 5.904H2.063z"
                          ></path>
                          <path
                            d="M5 22h14c1.103 0 2-.897 2-2v-1H3v1c0 1.103.897 2 2 2z"
                          ></path>
                          <path
                            d="M11 2H5.414L12 8.586V3c0-.553-.447-1-1-1z"
                          ></path>
                          <path
                            d="M5 2c-.553 0-1 .447-1 1v6c0 .553.447 1 1 1h6c.553 0 1-.447 1-1V3c0-.553-.447-1-1-1H5z"
                          ></path>
                          <path
                            d="M13 4v5c0 .553.447 1 1 1h6c.553 0 1-.447 1-1V4c0-.553-.447-1-1-1h-6c-.553 0-1 .447-1 1z"
                          ></path>
                        </svg>
                      </template>
                      <template v-else>
                        <SpaceBadge
                          :variant="getRankBadgeVariant(index)"
                          size="md"
                        >
                          {{ index + 1 }}
                        </SpaceBadge>
                      </template>
                    </div>
                    <div
                      class="flex-1 truncate font-nasa"
                      :class="
                        index === 0
                          ? 'text-amber-400'
                          : 'text-space-accent-light'
                      "
                    >
                      <!-- Ajouter "Équipe gagnante" pour la première place -->
                      <template v-if="index === 0">
                        <span
                          class="text-amber-300 mr-2 text-xs uppercase tracking-wider"
                          >Équipe gagnante:</span
                        >
                      </template>
                      {{ team.name }}
                    </div>
                  </div>

                  <!-- Liste des joueurs de l'équipe -->
                  <div
                    v-if="team.players && team.players.length > 0"
                    class="mt-2 pl-12"
                  >
                    <div class="text-xs text-space-text-muted mb-1">
                      Membres:
                    </div>
                    <div class="flex flex-wrap gap-1">
                      <SpaceBadge
                        v-for="player in team.players"
                        :key="player._id"
                        :variant="index === 0 ? 'warning' : 'accent'"
                        size="xs"
                        className="flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3 w-3 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        {{ player.username || "Joueur" }}
                      </SpaceBadge>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <div
                class="text-space-text-muted text-3xs xs:text-2xs sm:text-xs flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-4 sm:w-4 mr-0.5 xs:mr-1 text-space-secondary-light"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span
                  >Terminé le :
                  {{ formatDate(lastFinishedTournament.date) }}</span
                >
              </div>

              <router-link
                :to="
                  lastFinishedTournament
                    ? `/tournois/${lastFinishedTournament._id}`
                    : { name: 'TournoisAVenir' }
                "
              >
                <Button variant="secondary" size="sm">
                  <template #icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </template>
                  {{ lastFinishedTournament ? "Détails" : "Tous les tournois" }}
                </Button>
              </router-link>
            </div>
          </div>

          <div v-else>
            <Terminal
              command="find_finished_tournaments"
              title="SYSTÈME DE TOURNOIS"
              :showCursor="true"
              className="mb-4"
            >
              <div class="text-space-secondary-light">
                Aucun tournoi terminé n'a été trouvé dans la base de données.
              </div>
              <div class="text-space-text-muted mt-2">
                Les résultats des tournois seront affichés ici lorsqu'ils seront
                disponibles.
              </div>
            </Terminal>
          </div>
        </Card>
      </div>
    </div>

    <!-- Modale de check-in (réutilisée telle quelle) -->
    <CheckInReminderModal
      v-if="showCheckInReminder"
      :show="showCheckInReminder"
      :tournament="checkInTournament"
      :is-checked-in="isCheckedIn"
      @close="closeCheckInReminder"
      @check-in-updated="handleCheckInUpdate"
      @show-toast="handleShowToast"
    />
    <!-- Toast spatial pour les notifications -->
    <Toast v-if="toastMessage" :type="toastType" :message="toastMessage" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import tournamentService from "../services/tournamentService";
import type { User } from "../types/User";
import type { Tournament } from "../types";
import CheckInReminderModal from "@/components/CheckInReminderModal.vue";
import playerService from "../services/playerService";
import CountdownTimer from "@/components/ui/molecules/CountdownTimer.vue";
import TournamentCard from "@/components/ui/molecules/TournamentCard.vue";
import Toast from "../shared/Toast.vue";

//-------------------------------------------------------
// SECTION: État du composant
//-------------------------------------------------------

// Nouveaux états pour la modale de check-in
const showCheckInReminder = ref(false);
const checkInTournament = ref<Tournament | null>(null);
const isCheckedIn = ref(false);
const isUserLoggedIn = computed(() => !!userStore.user);

// États pour les toasts
const toastMessage = ref("");
const toastType = ref<"success" | "error">("success");

/**
 * Accès au store utilisateur et à la session active
 */
const userStore = useUserStore();
const user = computed<User | null>(() => userStore.user);

/**
 * États d'interface et données
 */
const isLoading = ref(true); // Indicateur de chargement
const isAuthenticating = ref(false); // Indicateur de processus d'authentification
const error = ref<string | null>(null); // Message d'erreur
const tournaments = ref<Tournament[]>([]); // Liste des tournois
const nextTournament = ref<Tournament | null>(null); // Prochain tournoi
const lastFinishedTournament = ref<Tournament | null>(null); // Dernier tournoi terminé
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

/**
 * Unités de décompte pour le prochain tournoi
 */
const countdownUnits = computed(() => [
  { value: countdown.value.days, label: "jours" },
  { value: countdown.value.hours, label: "heures" },
  { value: countdown.value.minutes, label: "min" },
  { value: countdown.value.seconds, label: "sec" },
]);

/**
 * Détermine si le prochain tournoi est en cours (LIVE)
 */
const isTournamentLive = computed(() => {
  if (!nextTournament.value || !nextTournament.value.date) {
    return false;
  }

  const now = new Date();
  const tournamentDate = new Date(nextTournament.value.date);

  // Le tournoi est LIVE s'il a commencé mais n'est pas marqué comme terminé
  return tournamentDate <= now && !nextTournament.value.finished;
});

/**
 * Équipes sur le podium du dernier tournoi
 */
const podiumTeams = computed(() => {
  if (!lastFinishedTournament.value) {
    return [];
  }

  if (!lastFinishedTournament.value.teams) {
    return [];
  }

  // Récupère les équipes classées 1, 2 et 3
  const teams = lastFinishedTournament.value.teams
    .filter(
      (team) =>
        team &&
        typeof team.ranking === "number" &&
        team.ranking > 0 &&
        team.ranking < 2
    )
    .sort((a, b) => (a.ranking || 999) - (b.ranking || 999))
    .slice(0, 3);

  return teams;
});

// Gestion de l'affichage du toast
const handleShowToast = (
  message: string,
  type: "success" | "error" = "success"
) => {
  toastMessage.value = message;
  toastType.value = type;

  // Auto-masquer le toast après 4 secondes (durée du Toast spatial)
  setTimeout(() => {
    toastMessage.value = "";
  }, 4000);
};

/**
 * Vérifie les tournois qui nécessitent un check-in
 * et affiche la modale si nécessaire
 */
const checkForUpcomingTournaments = async () => {
  // Ne vérifier que si l'utilisateur est connecté
  if (!isUserLoggedIn.value) return;

  try {
    // Récupérer tous les tournois
    const allTournaments = await tournamentService.getTournaments();

    // Obtenir la date actuelle
    const now = new Date();

    // Filtrer les tournois à venir nécessitant un check-in
    const upcomingTournaments = allTournaments.filter((tournament) => {
      // Ne pas considérer les tournois terminés
      if (tournament.finished) return false;

      const tournamentDate = new Date(tournament.date);

      // Vérifier si l'utilisateur est inscrit à ce tournoi
      const isUserRegistered = tournament.players.some(
        (player) => userStore.user && player.userId === userStore.user._id
      );

      if (!isUserRegistered) return false;

      // Vérifier si le tournoi est dans les prochaines 48h
      const timeDiff = tournamentDate.getTime() - now.getTime();
      const isWithin48Hours = timeDiff > 0 && timeDiff <= 48 * 60 * 60 * 1000;

      // Ou vérifier si le tournoi a une date de rappel définie et si cette date est passée
      let isAfterReminderDate = false;
      if (tournament.discordReminderDate) {
        const reminderDate = new Date(tournament.discordReminderDate);
        isAfterReminderDate = now >= reminderDate;
      }

      return isWithin48Hours || isAfterReminderDate;
    });

    // S'il y a des tournois imminents, vérifier l'état de check-in
    if (upcomingTournaments.length > 0) {
      // Trier par date (le plus proche d'abord)
      upcomingTournaments.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      // Prendre le tournoi le plus proche
      const nextTournament = upcomingTournaments[0];

      // Vérifier si on a déjà rappelé à l'utilisateur ce tournoi récemment
      const dismissedUntil = localStorage.getItem(
        `checkin-reminder-dismissed-${nextTournament._id}`
      );
      const alreadyReminded = localStorage.getItem(
        `checkin-reminded-${nextTournament._id}`
      );

      // Si l'utilisateur a fermé la modale il y a moins d'1 heure, ne pas afficher
      if (dismissedUntil && parseInt(dismissedUntil) > now.getTime()) {
        return;
      }

      // Vérifier si l'utilisateur a déjà fait son check-in
      const player = userStore.user
        ? await playerService.getPlayerByIdUser(userStore.user._id)
        : null;
      let hasCheckedIn = false;

      if (player && player._id && nextTournament.checkIns) {
        hasCheckedIn = !!nextTournament.checkIns[player._id];
      }

      // MODIFICATION ICI: N'afficher la modale que si l'utilisateur n'a PAS fait son check-in
      if (!hasCheckedIn && !alreadyReminded) {
        checkInTournament.value = nextTournament;
        isCheckedIn.value = hasCheckedIn;
        showCheckInReminder.value = true;
      }
    }
  } catch (error) {
    console.error("Erreur lors de la vérification des tournois:", error);
  }
};

/**
 * Gère la mise à jour du check-in depuis la modale
 */
const handleCheckInUpdate = (checked: boolean) => {
  isCheckedIn.value = checked;
};

/**
 * Ferme la modale de rappel de check-in
 */
const closeCheckInReminder = () => {
  showCheckInReminder.value = false;
};

//-------------------------------------------------------
// SECTION: Authentification
//-------------------------------------------------------

/**
 * Déclenche le processus d'authentification Discord
 * Redirige l'utilisateur vers l'autorisation OAuth2 de Discord
 */
const loginWithDiscord = () => {
  try {
    isAuthenticating.value = true;

    // Récupération des variables d'environnement pour OAuth2
    const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_DISCORD_REDIRECT_URI;

    // Vérification de la configuration
    if (!clientId || !redirectUri) {
      throw new Error("Configuration Discord manquante");
    }

    // Redirection vers la page d'autorisation Discord
    window.location.href = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=identify+guilds+email`;
  } catch (err) {
    // Gestion des erreurs d'authentification
    error.value = "Impossible de se connecter à Discord. Veuillez réessayer.";
    isAuthenticating.value = false;
    console.error("Erreur d'authentification Discord:", err);
  }
};

//-------------------------------------------------------
// SECTION: Récupération des données
//-------------------------------------------------------

/**
 * Récupère les tournois depuis l'API
 */
const fetchTournaments = async () => {
  try {
    // Récupérer tous les tournois
    tournaments.value = await tournamentService.getTournaments();

    // Date actuelle
    const now = new Date();

    // Date de début du jour suivant la date actuelle
    const tomorrowStart = new Date(now);
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);
    tomorrowStart.setHours(0, 0, 0, 0);

    // Obtenir la date actuelle sans heure/minute/secondes
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    // Trouver tous les tournois non terminés
    const unfinishedTournaments = tournaments.value
      .filter((t) => !t.finished)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // D'abord, chercher un tournoi non terminé qui a lieu aujourd'hui (le plus récent)
    const todaysTournament = unfinishedTournaments.find((t) => {
      const tournamentDate = new Date(t.date);
      const tournamentDayStart = new Date(tournamentDate);
      tournamentDayStart.setHours(0, 0, 0, 0);

      // Le tournoi est d'aujourd'hui
      return tournamentDayStart.getTime() === todayStart.getTime();
    });

    if (todaysTournament) {
      // Si on a un tournoi aujourd'hui, on l'utilise
      nextTournament.value = todaysTournament;
    } else {
      // Sinon, chercher un tournoi non terminé de hier (le plus récent)
      const yesterdayStart = new Date(todayStart);
      yesterdayStart.setDate(yesterdayStart.getDate() - 1);

      const yesterdaysTournament = unfinishedTournaments.find((t) => {
        const tournamentDate = new Date(t.date);
        const tournamentDayStart = new Date(tournamentDate);
        tournamentDayStart.setHours(0, 0, 0, 0);

        // Le tournoi est d'hier
        return tournamentDayStart.getTime() === yesterdayStart.getTime();
      });

      if (yesterdaysTournament) {
        // Si on a un tournoi d'hier, on l'utilise
        nextTournament.value = yesterdaysTournament;
      } else {
        // Si on n'a ni tournoi aujourd'hui ni tournoi hier, chercher le prochain tournoi futur
        const upcomingTournament = unfinishedTournaments.find(
          (t) => new Date(t.date) > now
        );

        nextTournament.value = upcomingTournament || null;
      }
    }

    // Trouver le dernier tournoi terminé (date passée la plus récente)
    const finishedTournaments = tournaments.value
      .filter((t) => t.finished)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Si aucun tournoi terminé, arrêter ici
    if (finishedTournaments.length === 0) {
      lastFinishedTournament.value = null;
      return;
    }

    // Récupérer les détails du dernier tournoi terminé
    try {
      const mostRecentFinishedTournament = finishedTournaments[0];

      if (!mostRecentFinishedTournament._id) {
        lastFinishedTournament.value = mostRecentFinishedTournament;
        return;
      }

      // Récupérer les détails complets pour avoir les équipes
      const detailedTournament = await tournamentService.getTournamentById(
        mostRecentFinishedTournament._id
      );

      // Utiliser le tournoi détaillé s'il a des équipes
      if (detailedTournament && detailedTournament.teams) {
        lastFinishedTournament.value = detailedTournament;
      } else {
        lastFinishedTournament.value = mostRecentFinishedTournament;
      }
    } catch (err) {
      // En cas d'erreur, utiliser les données de base
      lastFinishedTournament.value = finishedTournaments[0];
    }
  } catch (err) {
    error.value = "Impossible de charger les tournois";
  }
};

/**
 * Démarre le décompte pour le prochain tournoi
 */
let countdownInterval: number | null = null;

const startCountdown = () => {
  // Cette fonction cause des problèmes, rendons-la plus robuste

  // Nettoyer l'intervalle existant s'il y en a un
  if (countdownInterval !== null) {
    window.clearInterval(countdownInterval);
    countdownInterval = null;
  }

  // Vérifier que nextTournament est défini et a une date
  if (!nextTournament.value || !nextTournament.value.date) {
    return;
  }

  // Copier la date pour éviter les problèmes de référence
  const tournamentDate = new Date(nextTournament.value.date).getTime();

  const updateCountdown = () => {
    try {
      const now = new Date().getTime();
      const distance = tournamentDate - now;

      if (distance < 0) {
        // Le tournoi a commencé
        countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        if (countdownInterval !== null) {
          window.clearInterval(countdownInterval);
          countdownInterval = null;
        }
        return;
      }

      // Mise à jour du décompte
      countdown.value = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
    } catch (error) {
      if (countdownInterval !== null) {
        window.clearInterval(countdownInterval);
        countdownInterval = null;
      }
    }
  };

  // Mise à jour immédiate
  updateCountdown();

  // Mise à jour toutes les secondes
  countdownInterval = window.setInterval(updateCountdown, 1000);
};

/**
 * Détermine la variante de badge pour les rangs 1, 2 et 3
 */
const getRankBadgeVariant = (index: number) => {
  switch (index) {
    case 0:
      return "accent"; // 1er place (Or)
    case 1:
      return "secondary"; // 2ème place (Argent)
    case 2:
      return "primary"; // 3ème place (Bronze)
    default:
      return "primary";
  }
};

/**
 * Formatte une date en format français
 */
const formatDate = (dateString: string | Date): string => {
  if (!dateString) return "Date inconnue";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  } catch (e) {
    return "Date invalide";
  }
};

/**
 * Formatte une heure en format français
 */
const formatTime = (dateString: string | Date): string => {
  if (!dateString) return "Heure inconnue";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch (e) {
    return "Heure invalide";
  }
};

//-------------------------------------------------------
// SECTION: Cycle de vie
//-------------------------------------------------------

/**
 * Initialisation du composant au montage
 */
onMounted(async () => {
  isLoading.value = true;

  try {
    // Récupération des informations utilisateur depuis le store
    await userStore.fetchUser();
    if (userStore.user) {
      await checkForUpcomingTournaments();
    }

    // Récupération des tournois - faire cette opération séparément
    await fetchTournaments();

    // Si nous avons un prochain tournoi, démarrer le compteur
    if (nextTournament.value) {
      startCountdown();
    }
  } catch (err) {
    error.value = "Impossible de récupérer les données";
  } finally {
    isLoading.value = false;
  }
});

// Nettoyage du compteur au démontage du composant
onUnmounted(() => {
  if (countdownInterval !== null) {
    window.clearInterval(countdownInterval);
    countdownInterval = null;
  }
});
</script>

<style scoped>
/* Grille spatiale en arrière-plan */
.space-grid {
  background-image: linear-gradient(
      rgba(109, 40, 217, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(109, 40, 217, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
}

/* Animation pulse lente */
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Animation de flottement subtile */
@keyframes float-subtle {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-float-subtle {
  animation: float-subtle 5s ease-in-out infinite;
}

/* Animation pour les éléments du compteur */
.pulse-animation {
  animation: pulse-bg 2s infinite;
}

@keyframes pulse-bg {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.3;
  }
}

/* Animation de fondu vers le haut */
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

/* Style du bouton Discord */
.space-discord-button {
  position: relative;
  overflow: hidden;
}

.space-discord-button::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: rotate(45deg);
  transition: all 0.3s ease;
  opacity: 0;
}

.space-discord-button:hover::after {
  animation: shine-effect 1.5s;
  opacity: 1;
}

@keyframes shine-effect {
  0% {
    transform: rotate(45deg) translateX(-100%);
  }
  100% {
    transform: rotate(45deg) translateX(100%);
  }
}

.title-container {
  position: relative;
  padding: 1.25rem 1rem;
  margin-bottom: 1.5rem;
  overflow: hidden;
  width: 100%;
}

.title-bg {
  position: absolute;
  inset: 0;
}

.title-text {
  font-size: 3rem;
  letter-spacing: 0.15em;
  color: white;
  text-shadow: 0 0 10px rgba(109, 40, 217, 0.8),
    0 0 20px rgba(109, 40, 217, 0.5), 0 0 30px rgba(109, 40, 217, 0.3);
  position: relative;
  z-index: 10;
  transform: perspective(500px) rotateX(5deg);
}

@media (max-width: 640px) {
  .title-text {
    font-size: 2.25rem;
  }
}

/* Styles pour l'image du jeu - DÉPLACÉ dans TournamentCard.vue */
/* La classe game-image-container et game-image-glow sont maintenant dans TournamentCard.vue */

/* Ajustements responsifs pour les cards de tournoi */
@media (min-width: 768px) {
  .space-y-5 {
    margin-bottom: 1.25rem;
  }
}

@media (min-width: 1024px) {
  /* Sur les grands écrans, assurer que les deux cards tiennent sans scroll */
  .space-y-6 > * {
    margin-bottom: 0;
  }

  .space-y-6 > *:last-child {
    margin-bottom: 1.5rem;
  }
}

/* Style spécifique pour les badges de rang */
.getRankBadgeVariant-0 {
  background-color: rgba(251, 146, 60, 0.2);
  color: var(--space-accent-light);
  border-color: rgba(251, 146, 60, 0.5);
}

.getRankBadgeVariant-1 {
  background-color: rgba(2, 132, 199, 0.2);
  color: var(--space-secondary-light);
  border-color: rgba(2, 132, 199, 0.5);
}

.getRankBadgeVariant-2 {
  background-color: rgba(109, 40, 217, 0.2);
  color: var(--space-primary-light);
  border-color: rgba(109, 40, 217, 0.5);
}

/* Espacement par rapport à la navbar */
.navbar-spacing {
  padding-top: 4rem; /* 64px en taille de base */
}

@media (min-width: 640px) {
  .navbar-spacing {
    padding-top: 4.5rem; /* 72px sur tablette */
  }
}

@media (min-width: 1024px) {
  .navbar-spacing {
    padding-top: 5rem; /* 80px sur grand écran */
  }
}
</style>
