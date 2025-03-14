<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Création d'un Tournoi</h1>
    <div
      class="tabs flex flex-col md:flex-row justify-around mb-4 overflow-x-auto"
    >
      <button
        :class="{ 'active-tab': activeTab === 'creation' }"
        @click="activeTab = 'creation'"
        class="tab w-full md:w-auto mb-2 md:mb-0"
      >
        Gestion des tournois
      </button>
      <button
        :class="{ 'active-tab': activeTab === 'teams' }"
        @click="activeTab = 'teams'"
        class="tab w-full md:w-auto mb-2 md:mb-0"
      >
        Gestion des Équipes
      </button>
      <button
        :class="{ 'active-tab': activeTab === 'end' }"
        @click="activeTab = 'end'"
        class="tab w-full md:w-auto mb-2 md:mb-0"
      >
        Terminer un tournoi
      </button>
    </div>
    <div v-if="activeTab === 'creation'">
      <CreationTournoiForm />
    </div>
    <div v-if="activeTab === 'teams'">
      <GestionEquipe />
    </div>
    <div v-if="activeTab === 'end'">
      <EndTournoi />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CreationTournoiForm from "../components/CreationTournoiForm.vue";
import GestionEquipe from "../components/GestionEquipe.vue";
import EndTournoi from "../components/EndTournoi.vue";

const activeTab = ref("creation");
</script>

<style scoped>
.tabs {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .tabs {
    flex-direction: row;
  }
}

.tab {
  padding: 0.75rem 1rem;
  cursor: pointer;
  background-color: #f0f0f0;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-align: center;
  border: 1px solid #d0d0d0;
  margin-bottom: 0.5rem;
}

@media (min-width: 768px) {
  .tab {
    margin-bottom: 0;
  }
}

.tab:hover {
  background-color: #e0e0e0;
  transform: translateY(-2px);
}

.active-tab {
  background-color: #d0d0d0;
  font-weight: bold;
  border-color: #a0a0a0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
