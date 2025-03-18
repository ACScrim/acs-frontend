<template>
  <div class="container mx-auto p-8 pt-20">
    <!-- En-tête -->
    <div
      class="bg-black/50 backdrop-blur-xl rounded-lg p-6 mb-8 border border-pink-500 shadow-lg shadow-pink-500/30"
    >
      <h1 class="text-4xl text-white mb-4 neon-text text-center">
        Gestion des Tournois
      </h1>
      <div class="flex justify-center">
        <div
          class="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
        ></div>
      </div>
    </div>

    <!-- Onglets -->
    <div class="tabs-container mb-8">
      <div class="tabs flex flex-col md:flex-row justify-around gap-4">
        <button
          :class="{ 'active-tab': activeTab === 'creation' }"
          @click="activeTab = 'creation'"
          class="tab w-full md:w-auto"
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
        </button>
        <button
          :class="{ 'active-tab': activeTab === 'teams' }"
          @click="activeTab = 'teams'"
          class="tab w-full md:w-auto"
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
        </button>
        <button
          :class="{ 'active-tab': activeTab === 'checkin' }"
          @click="activeTab = 'checkin'"
          class="tab w-full md:w-auto"
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
        </button>
        <button
          :class="{ 'active-tab': activeTab === 'end' }"
          @click="activeTab = 'end'"
          class="tab w-full md:w-auto"
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
        </button>
      </div>

      <!-- Indicateur d'onglet actif -->
      <div class="tab-indicator-container">
        <div class="tab-indicator" :style="tabIndicatorStyle"></div>
      </div>
    </div>

    <!-- Contenu des onglets -->
    <div
      class="bg-black/75 backdrop-blur-sm rounded-lg border border-cyan-500 shadow-lg shadow-cyan-500/30 p-6 tab-content-container"
    >
      <transition name="tab-fade" mode="out-in">
        <div v-if="activeTab === 'creation'" key="creation" class="tab-content">
          <CreationTournoiForm />
        </div>
        <div v-else-if="activeTab === 'teams'" key="teams" class="tab-content">
          <GestionEquipe />
        </div>
        <div
          v-else-if="activeTab === 'checkin'"
          key="checkin"
          class="tab-content"
        >
          <VoirCheckIn />
        </div>
        <div v-else-if="activeTab === 'end'" key="end" class="tab-content">
          <EndTournoi />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import CreationTournoiForm from "../components/CreationTournoiForm.vue";
import GestionEquipe from "../components/GestionEquipe.vue";
import EndTournoi from "../components/EndTournoi.vue";
import VoirCheckIn from "../components/VoirCheckIn.vue";

const activeTab = ref("creation");
const tabCount = 4;

// Calcul de la position et largeur de l'indicateur d'onglet actif
const tabIndicatorStyle = computed(() => {
  const tabs = ["creation", "teams", "checkin", "end"];
  const activeIndex = tabs.indexOf(activeTab.value);
  const position = (activeIndex / tabCount) * 100;
  const width = 100 / tabCount;
  return {
    left: `${position}%`,
    width: `${width}%`,
  };
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Audiowide&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap");

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

/* Style des onglets */
.tabs-container {
  position: relative;
  background: rgba(13, 13, 15, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  overflow: hidden;
  padding: 16px;
  border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.15);
}

.tabs {
  position: relative;
  z-index: 10;
}

.tab {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: rgba(30, 41, 59, 0.7);
  color: #cbd5e1;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-family: "Orbitron", sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tab:hover {
  transform: translateY(-2px);
  background: rgba(51, 65, 85, 0.8);
  color: white;
  box-shadow: 0 6px 12px rgba(139, 92, 246, 0.2);
  border-color: rgba(139, 92, 246, 0.4);
}

.active-tab {
  background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
  transform: translateY(-2px);
  position: relative;
}

.active-tab::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #ec4899;
}

/* Indicateur d'onglet */
.tab-indicator-container {
  position: relative;
  height: 4px;
  margin-top: 8px;
  background: rgba(107, 114, 128, 0.2);
  border-radius: 2px;
}

.tab-indicator {
  position: absolute;
  height: 100%;
  background: linear-gradient(to right, #8b5cf6, #ec4899);
  border-radius: 2px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.7);
}

/* Conteneur de contenu d'onglet */
.tab-content-container {
  min-height: 400px;
}

/* Animation des onglets */
.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.tab-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.tab-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Responsive */
@media (max-width: 768px) {
  .tabs {
    gap: 12px;
  }

  .active-tab::after {
    display: none;
  }

  .tab-indicator {
    display: none;
  }
}

/* Animation de lueur pour les bordures */
@keyframes glow {
  0% {
    box-shadow: 0 0 5px rgba(139, 92, 246, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.8);
  }
  100% {
    box-shadow: 0 0 5px rgba(139, 92, 246, 0.5);
  }
}

.tab-content {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
