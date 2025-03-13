<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Création d'un Tournoi</h1>
    <div class="tabs">
      <button
        :class="{ 'active-tab': activeTab === 'creation' }"
        @click="activeTab = 'creation'"
        class="tab"
      >
        Gestion des tournois
      </button>
      <button
        :class="{ 'active-tab': activeTab === 'teams' }"
        @click="activeTab = 'teams'"
        class="tab"
      >
        Gestion des Équipes
      </button>
      <button
        :class="{ 'active-tab': activeTab === 'end' }"
        @click="activeTab = 'end'"
        class="tab"
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
  justify-content: space-around;
  margin-bottom: 1rem;
}

.tab {
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: #f0f0f0;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
}

.tab:hover {
  background-color: #e0e0e0;
}

.active-tab {
  background-color: #d0d0d0;
  font-weight: bold;
}
</style>
