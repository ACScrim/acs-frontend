<template>
  <div class="container mx-auto p-8 pt-20">
    <!-- En-tête -->
    <div
      class="bg-black/50 backdrop-blur-xl rounded-lg p-6 mb-8 border border-pink-500 shadow-lg shadow-pink-500/30"
    >
      <h1 class="text-4xl text-white mb-4 font-audiowide text-center neon-text">
        Gestion des Tournois
      </h1>
      <div class="flex justify-center">
        <div
          class="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
        ></div>
      </div>
    </div>

    <!-- Onglets -->
    <div
      class="relative bg-black/70 backdrop-blur-md rounded-lg p-4 mb-8 border border-purple-500/30 shadow-lg shadow-purple-500/15 overflow-hidden"
    >
      <div class="flex flex-col md:flex-row justify-around gap-4 z-10 relative">
        <button
          :class="[
            'flex items-center justify-center px-6 py-3 rounded-lg font-orbitron text-sm font-medium tracking-wider border transition-all duration-300 shadow-md transform hover:-translate-y-0.5 w-full md:w-auto',
            activeTab === 'creation'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-lg shadow-purple-500/30'
              : 'bg-slate-800/70 text-gray-300 border-purple-500/20 hover:bg-slate-700/80 hover:text-white hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20',
          ]"
          @click="activeTab = 'creation'"
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
          <span>Gestion des tournois</span>
          <span
            v-if="activeTab === 'creation'"
            class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-pink-600 hidden md:block"
          ></span>
        </button>
        <button
          :class="[
            'flex items-center justify-center px-6 py-3 rounded-lg font-orbitron text-sm font-medium tracking-wider border transition-all duration-300 shadow-md transform hover:-translate-y-0.5 w-full md:w-auto',
            activeTab === 'teams'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-lg shadow-purple-500/30'
              : 'bg-slate-800/70 text-gray-300 border-purple-500/20 hover:bg-slate-700/80 hover:text-white hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20',
          ]"
          @click="activeTab = 'teams'"
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
          <span>Gestion des Équipes</span>
          <span
            v-if="activeTab === 'teams'"
            class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-pink-600 hidden md:block"
          ></span>
        </button>
        <button
          :class="[
            'flex items-center justify-center px-6 py-3 rounded-lg font-orbitron text-sm font-medium tracking-wider border transition-all duration-300 shadow-md transform hover:-translate-y-0.5 w-full md:w-auto',
            activeTab === 'checkin'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-lg shadow-purple-500/30'
              : 'bg-slate-800/70 text-gray-300 border-purple-500/20 hover:bg-slate-700/80 hover:text-white hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20',
          ]"
          @click="activeTab = 'checkin'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Voir les Check-in</span>
          <span
            v-if="activeTab === 'checkin'"
            class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-pink-600 hidden md:block"
          ></span>
        </button>
        <button
          :class="[
            'flex items-center justify-center px-6 py-3 rounded-lg font-orbitron text-sm font-medium tracking-wider border transition-all duration-300 shadow-md transform hover:-translate-y-0.5 w-full md:w-auto',
            activeTab === 'end'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-lg shadow-purple-500/30'
              : 'bg-slate-800/70 text-gray-300 border-purple-500/20 hover:bg-slate-700/80 hover:text-white hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20',
          ]"
          @click="activeTab = 'end'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Terminer un tournoi</span>
          <span
            v-if="activeTab === 'end'"
            class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-pink-600 hidden md:block"
          ></span>
        </button>
      </div>

      <!-- Indicateur d'onglet actif -->
      <div class="relative h-1 mt-2 bg-gray-700/40 rounded hidden md:block">
        <div
          class="absolute h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded shadow-glow transition-all duration-300 ease-in-out"
          :style="tabIndicatorStyle"
        ></div>
      </div>
    </div>

    <!-- Contenu des onglets -->
    <div
      class="bg-black/75 backdrop-blur-sm rounded-lg border border-cyan-500 shadow-lg shadow-cyan-500/30 p-6 min-h-[400px]"
    >
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-5"
        leave-active-class="transition-all duration-300 ease-in"
        leave-to-class="opacity-0 -translate-x-5"
        mode="out-in"
      >
        <div
          v-if="activeTab === 'creation'"
          key="creation"
          class="animate-fadeIn"
        >
          <CreationTournoiForm />
        </div>
        <div
          v-else-if="activeTab === 'teams'"
          key="teams"
          class="animate-fadeIn"
        >
          <GestionEquipe />
        </div>
        <div
          v-else-if="activeTab === 'checkin'"
          key="checkin"
          class="animate-fadeIn"
        >
          <VoirCheckIn />
        </div>
        <div v-else-if="activeTab === 'end'" key="end" class="animate-fadeIn">
          <EndTournoi />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import CreationTournoiForm from "../../components/gestion-tournois/CreationTournoiForm.vue";
import GestionEquipe from "../../components/gestion-tournois/GestionEquipe.vue";
import EndTournoi from "../../components/gestion-tournois/EndTournoi.vue";
import VoirCheckIn from "../../components/gestion-tournois/VoirCheckIn.vue";

//-------------------------------------------------------
// SECTION: État du composant
//-------------------------------------------------------

/**
 * Gestion de la navigation par onglets
 * Valeurs possibles: "creation", "teams", "checkin", "end"
 */
const activeTab = ref("creation");

/**
 * Nombre total d'onglets pour le calcul de l'indicateur
 */
const tabCount = 4;

//-------------------------------------------------------
// SECTION: Propriétés calculées
//-------------------------------------------------------

/**
 * Calcule le style CSS pour l'indicateur visuel d'onglet actif
 * Positionne et dimensionne dynamiquement l'indicateur en fonction de l'onglet sélectionné
 * @returns Objet de style CSS avec position left et width
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
</script>

<style scoped>
.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

.neon-text {
  font-family: "Audiowide", cursive;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff,
    0 0 40px #ff00ff;
}

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

/* Shadow glow pour l'indicateur d'onglet */
.shadow-glow {
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.7);
}
</style>
