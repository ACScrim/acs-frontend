<template>
  <div class="container mx-auto p-4 pt-16 sm:pt-20 max-w-7xl">
    <h1 class="text-4xl text-white mb-8 neon-text font-audiowide text-center">
      Calendrier des Tournois
    </h1>

    <!-- Contrôles du calendrier -->

    <div
      class="mb-4 flex justify-between items-center rounded-lg bg-black/75 backdrop-blur-sm border border-pink-500/70 shadow-lg shadow-pink-500/10 p-3"
    >
      <!-- Navigation des mois -->
      <div class="flex items-center space-x-3">
        <button
          @click="previousMonth"
          class="h-8 w-8 rounded-full flex items-center justify-center bg-gray-900/70 border border-pink-500/50 text-pink-400 hover:bg-pink-900/20 transition-all"
        >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <h2
          class="text-xl font-orbitron text-pink-500 neon-text-pink select-none"
        >
          {{ currentMonthName }} {{ currentYear }}
        </h2>

        <button
          @click="nextMonth"
          class="h-8 w-8 rounded-full flex items-center justify-center bg-gray-900/70 border border-pink-500/50 text-pink-400 hover:bg-pink-900/20 transition-all"
        >
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <!-- Bouton "Aujourd'hui" -->
      <button
        @click="goToToday"
        class="cyberpunk-btn-cyan px-3 py-1.5 rounded text-xs font-orbitron shadow-sm transition-all"
      >
        Aujourd'hui
      </button>
    </div>

    <div
      class="mb-4 px-3 py-2 rounded-lg bg-black/75 backdrop-blur-sm border border-pink-500/70 shadow-lg shadow-pink-500/10"
    >
      <h3 class="text-sm font-orbitron text-gray-300 mb-2">Légende :</h3>
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex items-center">
          <div
            class="w-4 h-4 rounded mr-2 border-l-4 border-l-cyan-500 bg-cyan-900/30"
          ></div>
          <span class="text-xs text-cyan-400">À venir</span>
        </div>

        <div class="flex items-center">
          <div
            class="w-4 h-4 rounded mr-2 border-l-4 border-l-green-500 bg-green-900/30"
          ></div>
          <span class="text-xs text-green-400">En cours</span>
        </div>

        <div class="flex items-center">
          <div
            class="w-4 h-4 rounded mr-2 border-l-4 border-l-gray-600 bg-gray-800/50"
          ></div>
          <span class="text-xs text-gray-300">Passé</span>
        </div>

        <div class="flex items-center">
          <div
            class="w-4 h-4 rounded mr-2 border-l-4 border-l-purple-500 bg-purple-900/30"
          ></div>
          <span class="text-xs text-purple-400">Terminé</span>
        </div>
      </div>
    </div>

    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />

    <!-- Avertissement connexion -->
    <div
      v-if="!isUserLoggedIn"
      class="mb-6 p-4 bg-red-900/60 text-white rounded border border-red-600 flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mr-2 text-red-300"
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
      Veuillez vous connecter pour pouvoir vous inscrire aux tournois.
    </div>

    <!-- Affichage du loader pendant le chargement -->
    <div v-if="loading" class="flex justify-center my-12">
      <CyberpunkLoader />
    </div>

    <!-- Vue Calendrier Mensuel -->
    <div
      v-if="!loading"
      class="month-view bg-black/75 backdrop-blur-sm p-2 rounded-lg border border-pink-500/80 shadow-lg shadow-pink-500/10"
    >
      <div class="grid grid-cols-7 mb-1">
        <div
          v-for="day in daysOfWeek"
          :key="day"
          class="py-0.5 text-center font-orbitron text-cyan-400 font-bold text-[10px] border-b border-cyan-900/30"
        >
          {{ day }}
        </div>
      </div>

      <div class="grid grid-cols-7 gap-1">
        <div
          v-for="(day, index) in calendarDays"
          :key="index"
          class="calendar-day relative"
          :class="[
            day.currentMonth
              ? 'bg-gray-900/70 border-gray-700/60'
              : 'bg-gray-800/30 border-gray-800/30 text-gray-500',
            isToday(day.date)
              ? 'border-cyan-500 shadow-inner shadow-cyan-500/20'
              : 'border',
            day.hasEvents
              ? 'cursor-pointer hover:border-pink-500 hover:shadow-pink-500/20'
              : '',
            'rounded overflow-hidden',
          ]"
        >
          <!-- Indicateur du jour -->
          <div
            class="absolute top-0.5 left-0.5 w-5 h-5 flex items-center justify-center z-10 text-xs"
            :class="
              isToday(day.date)
                ? 'bg-cyan-900/50 text-cyan-300 rounded-full'
                : ''
            "
          >
            {{ day.dayNumber }}
          </div>

          <!-- Container des événements -->
          <div
            v-if="day.hasEvents"
            class="absolute inset-0 pt-6 px-1 pb-1 flex flex-col gap-0.5 font-orbitron"
          >
            <div
              v-for="event in day.events"
              :key="event._id"
              class="text-[10px] p-1 rounded truncate transition-all relative group"
              :class="getEventStatusClass(event)"
              @click="showEventDetails(event)"
            >
              <div class="font-bold truncate">{{ event.name }}</div>
              <div
                v-if="event.game"
                class="text-[9px] truncate flex items-center mt-0.5"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-purple-500 mr-0.5 inline-block"
                ></span>
                {{ event.game.name }}
              </div>
              <div class="text-[9px] text-gray-300 mt-0.5">
                {{ formatTime(event.date) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de détails d'événement -->
    <div
      v-if="selectedEvent"
      class="font-orbitron fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-sm p-4"
      @click.self="selectedEvent = null"
    >
      <div
        class="w-full max-w-lg bg-gray-900/80 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 animate__animated animate__fadeIn border border-b-4 border-t-0 border-r-0 border-l-0"
        :class="getModalBorderClass(selectedEvent)"
        style="max-height: 85vh"
      >
        <!-- Header du modal avec le statut intégré -->
        <div class="p-5 pb-2 relative">
          <div class="flex justify-between items-start">
            <div>
              <span
                class="inline-block px-2 py-0.5 text-xs rounded-md font-orbitron mb-2"
                :class="getStatusStyles(selectedEvent)"
              >
                {{ getEventStatusText(selectedEvent) }}
              </span>
              <h2 class="text-2xl text-white font-audiowide leading-tight">
                {{ selectedEvent.name }}
              </h2>
            </div>

            <button
              @click="selectedEvent = null"
              class="text-gray-400 hover:text-pink-500 transition-colors p-1 rounded-full hover:bg-gray-800/50"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Détails essentiels en ligne -->
          <div class="flex flex-wrap items-center mt-3 gap-4 text-sm">
            <div class="flex items-center text-pink-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
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
              {{ formatDate(selectedEvent.date) }} à
              {{ formatTime(selectedEvent.date) }}
            </div>

            <div
              v-if="selectedEvent.game"
              class="flex items-center text-purple-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 110 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 11-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                />
              </svg>
              {{ selectedEvent.game.name }}
            </div>

            <div
              v-if="selectedEvent.players"
              class="flex items-center text-cyan-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              {{ selectedEvent.players.length }} inscrits
            </div>
          </div>

          <div
            class="w-full h-px bg-gradient-to-r from-transparent via-gray-500/20 to-transparent my-4"
          ></div>
        </div>

        <!-- Corps du modal avec description et canal Discord -->
        <div
          class="px-5 overflow-y-auto"
          style="max-height: calc(85vh - 180px)"
        >
          <!-- Canal Discord -->
          <div class="mb-4" v-if="selectedEvent.discordChannelName">
            <div class="flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              <h3 class="text-indigo-400 font-orbitron text-sm">
                Canal Discord
              </h3>
            </div>
            <div
              class="bg-gray-800/40 rounded p-2 text-white border border-indigo-500/20 flex items-center"
            >
              <span
                class="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"
              ></span>
              #{{ selectedEvent.discordChannelName }}
            </div>
          </div>

          <!-- Description -->
          <div v-if="selectedEvent.description">
            <div class="flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 class="text-amber-400 font-orbitron text-sm">Description</h3>
            </div>
            <div
              class="bg-gray-800/40 p-3 rounded-md border border-amber-500/20 text-gray-200 text-sm leading-relaxed"
            >
              {{ selectedEvent.description }}
            </div>
          </div>
        </div>

        <!-- Boutons d'action -->
        <div class="p-5 pt-4">
          <div
            class="w-full h-px bg-gradient-to-r from-transparent via-gray-500/20 to-transparent mb-4"
          ></div>

          <!-- Boutons d'action pour tournois à venir -->
          <div
            class="flex justify-center space-x-3"
            v-if="
              isUserLoggedIn &&
              !isPastEvent(selectedEvent) &&
              !selectedEvent.finished
            "
          >
            <!-- Bouton d'inscription -->
            <button
              v-if="!isUserRegistered(selectedEvent)"
              @click="registerForEvent(selectedEvent)"
              class="cyberpunk-btn-cyan px-6 py-2.5 rounded-md flex items-center justify-center font-orbitron shadow-lg transition-all duration-300 text-sm"
            >
              <span class="mr-2 font-orbitron">S'inscrire</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3H6a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V7z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <!-- Groupe boutons check-in + désinscription -->
            <div
              v-else-if="isWithin24Hours(selectedEvent)"
              class="flex space-x-3"
            >
              <!-- Bouton de check-in -->
              <button
                @click="
                  selectedEvent._id &&
                    checkIn(selectedEvent._id, !isCheckedIn(selectedEvent))
                "
                :class="
                  isCheckedIn(selectedEvent)
                    ? 'cyberpunk-btn-green'
                    : 'cyberpunk-btn-amber'
                "
                class="px-6 py-2.5 rounded-md flex items-center justify-center font-orbitron shadow-lg transition-all duration-300 text-sm"
              >
                <span class="mr-2">
                  {{
                    isCheckedIn(selectedEvent)
                      ? "Check-in confirmé"
                      : "Check-in"
                  }}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <!-- Bouton de désinscription toujours disponible -->
              <button
                @click="unregisterFromEvent(selectedEvent)"
                class="cyberpunk-btn-gray px-6 py-2.5 rounded-md flex items-center justify-center font-orbitron shadow-lg transition-all duration-300 text-sm"
              >
                <span class="mr-2">Se désinscrire</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <!-- Bouton de désinscription (cas standard) -->
            <button
              v-else
              @click="unregisterFromEvent(selectedEvent)"
              class="cyberpunk-btn-gray px-6 py-2.5 rounded-md flex items-center justify-center font-orbitron shadow-lg transition-all duration-300 text-sm"
            >
              <span class="mr-2">Se désinscrire</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <!-- Bouton pour voir les résultats des tournois terminés -->
          <div
            class="flex justify-center"
            v-if="selectedEvent && selectedEvent.finished"
          >
            <router-link
              :to="{ name: 'TournoisAVenir' }"
              class="cyberpunk-btn-purple px-6 py-2.5 rounded-md flex items-center justify-center font-orbitron shadow-lg transition-all duration-300 text-sm"
            >
              <span class="mr-2">Voir les résultats</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useUserStore } from "../stores/userStore";
import tournamentService from "../services/tournamentService";
import playerService from "../services/playerService";
import type { Tournament } from "../types";
import CyberpunkLoader from "@/shared/CyberpunkLoader.vue";
import Toast from "@/shared/Toast.vue";

// SECTION 1: État global et configuration
// -----------------------------------------------------
const userStore = useUserStore();
const isUserLoggedIn = computed(() => !!userStore.user);
const user = computed(() => userStore.user);

// SECTION 2: États locaux du composant
// -----------------------------------------------------
// Données principales
const tournaments = ref<Tournament[]>([]);
const playerUserMap = ref<{ [playerId: string]: string }>({});
const checkedInPlayers = ref<{ [key: string]: boolean }>({});

// UI states
const loading = ref<boolean>(false);
const success = ref<string | null>(null);
const error = ref<string | null>(null);
const currentDate = ref(new Date());
const selectedEvent = ref<Tournament | null>(null);

// Configuration
const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

// SECTION 3: Computed Properties
// -----------------------------------------------------
// Date et temps
const currentYear = computed(() => currentDate.value.getFullYear());
const currentMonth = computed(() => currentDate.value.getMonth());
const currentMonthName = computed(() => {
  return new Intl.DateTimeFormat("fr-FR", { month: "long" }).format(
    currentDate.value
  );
});

// Calendrier
const calendarDays = computed(() => {
  const days = [];
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1);

  // Déterminer le premier jour à afficher (lundi précédent le 1er du mois)
  let firstDay = new Date(firstDayOfMonth);
  const dayOfWeek = firstDay.getDay() || 7; // Convertir 0 (dimanche) en 7
  firstDay.setDate(firstDay.getDate() - (dayOfWeek - 1));

  // Générer les jours du calendrier (6 semaines)
  const currentMonthValue = currentMonth.value;
  for (let i = 0; i < 42; i++) {
    const date = new Date(firstDay);
    date.setDate(firstDay.getDate() + i);

    // Filtrer les événements pour cette date
    const dayEvents = tournaments.value.filter((event) => {
      if (!event.date) return false;
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });

    days.push({
      date: new Date(date),
      dayNumber: date.getDate(),
      currentMonth: date.getMonth() === currentMonthValue,
      hasEvents: dayEvents.length > 0,
      events: dayEvents,
    });
  }

  return days;
});

const goToToday = () => {
  currentDate.value = new Date();
};

// Ajouter cette fonction dans la section 5: Classes et styles
const getModalBorderClass = (event: Tournament): string => {
  if (!event) return "border-gray-500";

  if (event.finished) {
    return "border-purple-500";
  }

  if (isOngoingEvent(event)) {
    return "border-green-500";
  }

  if (isPastEvent(event)) {
    return "border-gray-600";
  }

  return "border-cyan-500";
};

// SECTION 4: Fonctions de formatage et utilitaires
// -----------------------------------------------------
// Formatage de dates
const formatDate = (dateString: string): string => {
  if (!dateString) return "Date non définie";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

const formatTime = (dateString: string): string => {
  if (!dateString) return "Heure non définie";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// Fonctions utilitaires pour les dates et statuts
const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const isPastEvent = (event: Tournament): boolean => {
  if (!event || !event.date) return false;
  const now = new Date();
  const eventDate = new Date(event.date);
  return eventDate < now || event.finished;
};

const isOngoingEvent = (event: Tournament): boolean => {
  if (!event || !event.date) return false;
  const now = new Date();
  const startDate = new Date(event.date);
  // Supposons qu'un tournoi dure en moyenne 4 heures
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 4);

  return now >= startDate && now <= endDate;
};

const isWithin24Hours = (event: Tournament): boolean => {
  if (!event || !event.date) return false;
  const now = new Date();
  const eventDate = new Date(event.date);
  const diff = eventDate.getTime() - now.getTime();
  return diff > 0 && diff <= 24 * 60 * 60 * 1000;
};

// SECTION 5: Classes et styles
// -----------------------------------------------------
const getEventStatusClass = (event: Tournament): string => {
  if (!event) return "";

  if (event.finished) {
    return "border-purple-500 event-finished";
  }

  if (isOngoingEvent(event)) {
    return "border-green-500 event-ongoing";
  }

  if (isPastEvent(event)) {
    return "border-gray-600 event-past";
  }

  return "border-cyan-500 event-upcoming";
};

const getStatusStyles = (event: Tournament): string => {
  if (!event) return "";

  if (event.finished) {
    return "bg-purple-900/40 text-purple-300 border border-purple-500";
  }

  if (isOngoingEvent(event)) {
    return "bg-green-900/40 text-green-300 border border-green-500";
  }

  if (isPastEvent(event)) {
    return "bg-gray-800/40 text-gray-300 border border-gray-600";
  }

  return "bg-cyan-900/40 text-cyan-300 border border-cyan-500";
};

const getEventStatusText = (event: Tournament): string => {
  if (!event) return "";
  if (event.finished) return "Terminé";
  if (isOngoingEvent(event)) return "En cours";
  if (isPastEvent(event)) return "Passé";
  return "À venir";
};

// SECTION 6: Navigation et interaction
// -----------------------------------------------------
const previousMonth = () => {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() - 1);
  currentDate.value = newDate;
};

const nextMonth = () => {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() + 1);
  currentDate.value = newDate;
};

const showEventDetails = (event: Tournament) => {
  selectedEvent.value = event;
};

// SECTION 7: Fonctions relatives aux tournois
// -----------------------------------------------------
// Chargement des données
const fetchTournaments = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Chargement des tournois
    const fetchedTournaments = await tournamentService.getTournaments();

    if (fetchedTournaments && Array.isArray(fetchedTournaments)) {
      tournaments.value = fetchedTournaments;

      // Vérifier l'état de check-in du joueur pour chaque tournoi
      if (user.value) {
        try {
          const player = await playerService.getPlayerByIdUser(user.value._id);
          if (player && player._id) {
            // Stocker la relation joueur-utilisateur
            playerUserMap.value[player._id] = user.value._id;

            tournaments.value.forEach((tournament) => {
              if (tournament._id) {
                checkedInPlayers.value[tournament._id] =
                  (tournament.checkIns &&
                    player._id &&
                    tournament.checkIns[player._id]) ||
                  false;
              }
            });
          }
        } catch (playerErr) {
          console.error("Erreur lors de la récupération du joueur:", playerErr);
        }
      }
    } else {
      error.value = "Format de données de tournois incorrect";
      console.error("Format de tournois incorrect:", fetchedTournaments);
    }
  } catch (err) {
    console.error("Erreur lors du chargement des tournois:", err);
    error.value = "Impossible de charger les tournois. Veuillez réessayer.";
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 300);
  }
};

// Vérification de statut utilisateur
const isUserRegistered = (event: Tournament): boolean => {
  if (!event || !event.players || !user.value) {
    return false;
  }

  // Si nous avons déjà le joueur associé à l'utilisateur
  if (Object.values(playerUserMap.value).includes(user.value._id)) {
    // Récupérer l'ID du joueur correspondant à cet utilisateur
    const playerIds = Object.entries(playerUserMap.value)
      .filter(([_, userId]) => userId === user.value?._id)
      .map(([playerId]) => playerId);

    // Vérifier si un de ces IDs de joueur est dans les joueurs de l'événement
    return event.players.some((playerId) =>
      typeof playerId === "string"
        ? playerIds.includes(playerId)
        : playerIds.includes(playerId._id ?? "")
    );
  }

  // Méthode de secours, chercher directement l'ID utilisateur
  return event.players.some((player) => {
    if (typeof player === "string") {
      return false; // Un ID de joueur string ne peut pas être un ID utilisateur
    }
    return player.userId === user.value?._id;
  });
};

const isCheckedIn = (event: Tournament): boolean => {
  if (!event || !event._id) return false;
  return !!checkedInPlayers.value[event._id];
};

// SECTION 8: Actions utilisateur
// -----------------------------------------------------
// Inscription, désinscription et check-in
const registerForEvent = async (event: Tournament) => {
  if (!user.value || !event?._id) return;

  try {
    loading.value = true;

    // Obtenir le player associé à l'utilisateur actuel
    const player = await playerService.getPlayerByIdUser(user.value._id);
    if (!player || !player._id) {
      throw new Error("Impossible de récupérer votre profil joueur");
    }

    // Stocker la relation joueur-utilisateur
    playerUserMap.value[player._id] = user.value._id;

    // Appeler le service d'inscription avec l'ID du joueur
    const updatedTournament = await tournamentService.registerPlayer(
      event._id,
      user.value._id // Le backend utilise userId pour trouver le player
    );

    // Mettre à jour le tournoi dans la liste
    const index = tournaments.value.findIndex((t) => t._id === event._id);
    if (index !== -1) {
      // Créer une nouvelle instance
      const newTournaments = [...tournaments.value];
      newTournaments[index] = {
        ...tournaments.value[index],
        players: updatedTournament.players,
        game: tournaments.value[index].game,
      };

      // Mettre à jour l'état
      tournaments.value = newTournaments;

      // Mettre à jour l'événement sélectionné si nécessaire
      if (selectedEvent.value && selectedEvent.value._id === event._id) {
        selectedEvent.value = { ...newTournaments[index] };
      }
    }

    showMessage(
      "success",
      "Inscription réussie ! N'oubliez pas de vous check-in 24h avant le tournoi."
    );
  } catch (err) {
    console.error("Erreur lors de l'inscription:", err);
    error.value = "Impossible de vous inscrire au tournoi. Veuillez réessayer.";
  } finally {
    loading.value = false;
  }
};

const unregisterFromEvent = async (event: Tournament) => {
  if (!user.value || !event?._id) return;

  try {
    loading.value = true;
    const updatedTournament = await tournamentService.unregisterPlayer(
      event._id,
      user.value._id
    );

    // Mettre à jour de la même façon
    const index = tournaments.value.findIndex((t) => t._id === event._id);
    if (index !== -1) {
      const newTournaments = [...tournaments.value];
      newTournaments[index] = {
        ...tournaments.value[index],
        players: updatedTournament.players,
        game: tournaments.value[index].game,
      };

      tournaments.value = newTournaments;

      if (selectedEvent.value && selectedEvent.value._id === event._id) {
        selectedEvent.value = { ...newTournaments[index] };
      }
    }

    showMessage("success", "Désinscription réussie.");
  } catch (err) {
    console.error("Erreur lors de la désinscription:", err);
    error.value =
      "Impossible de vous désinscrire du tournoi. Veuillez réessayer.";
  } finally {
    loading.value = false;
  }
};

const checkIn = async (tournamentId: string, checkedIn: boolean) => {
  // Optimistic UI: mettre à jour l'interface avant que la requête soit terminée
  checkedInPlayers.value[tournamentId] = checkedIn;

  try {
    if (user.value) {
      await tournamentService.checkInPlayer(
        tournamentId,
        user.value._id,
        checkedIn
      );

      showMessage(
        "success",
        checkedIn ? "Check-in confirmé !" : "Check-in annulé."
      );
    }
  } catch (err) {
    // En cas d'erreur, remettre l'état précédent
    checkedInPlayers.value[tournamentId] = !checkedIn;
    console.error("Erreur lors du check-in:", err);
    error.value = `Erreur: Impossible de ${
      checkedIn ? "confirmer" : "annuler"
    } le check-in.`;
  }
};

// Notification et messages
const showMessage = (
  type: "success" | "error",
  message: string,
  duration: number = 3000
) => {
  success.value = null;
  error.value = null;

  if (type === "success") {
    success.value = message;
  } else {
    error.value = message;
  }

  setTimeout(() => {
    if (type === "success") {
      success.value = null;
    } else {
      error.value = null;
    }
  }, duration);
};

// SECTION 9: Cycle de vie du composant
// -----------------------------------------------------
onMounted(() => {
  fetchTournaments();
});

// Observer les changements de mois pour recharger les données
watch([currentMonth, currentYear], () => {
  fetchTournaments();
});
</script>

<style scoped>
/* Effets néon pour le texte */
.neon-text-pink {
  text-shadow: 0 0 5px rgba(236, 72, 153, 0.7);
}

.neon-text-cyan {
  text-shadow: 0 0 5px rgba(6, 182, 212, 0.7);
}

/* Vue calendrier */
.calendar-day {
  aspect-ratio: 1/1;
  padding: 0.25rem;
  font-size: 0.75rem;
  overflow: hidden;
  position: relative;
  min-height: 65px;
  transition: all 0.2s ease;
}

/* États des événements dans le calendrier */
.event-upcoming {
  background-color: rgba(8, 145, 178, 0.3);
  color: rgb(103, 232, 249);
  border-left-width: 4px;
  border-left-color: rgb(6, 182, 212);
}

.event-ongoing {
  background-color: rgba(5, 150, 105, 0.3);
  color: rgb(110, 231, 183);
  border-left-width: 4px;
  border-left-color: rgb(16, 185, 129);
}

.event-past {
  background-color: rgba(31, 41, 55, 0.5);
  color: rgb(156, 163, 175);
  border-left-width: 4px;
  border-left-color: rgb(75, 85, 99);
}

.event-finished {
  background-color: rgba(124, 58, 237, 0.3);
  color: rgb(196, 181, 253);
  border-left-width: 4px;
  border-left-color: rgb(139, 92, 246);
}

/* Animation du modal */
.animate__fadeIn {
  animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Effet de hover sur les événements */
.event-upcoming:hover {
  background-color: rgba(8, 145, 178, 0.5);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(6, 182, 212, 0.4);
}

.event-ongoing:hover {
  background-color: rgba(5, 150, 105, 0.5);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
}

.event-past:hover {
  background-color: rgba(31, 41, 55, 0.7);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(75, 85, 99, 0.4);
}

.event-finished:hover {
  background-color: rgba(124, 58, 237, 0.5);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.4);
}

/* Responsive pour les mobiles */
@media (max-width: 640px) {
  .calendar-day {
    min-height: 60px;
  }

  .has-events::after {
    content: "";
    position: absolute;
    bottom: 0.25rem;
    right: 0.25rem;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background-color: rgb(236, 72, 153);
    box-shadow: 0 0 5px rgba(236, 72, 153, 0.7);
  }
}
</style>
