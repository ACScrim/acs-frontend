// filepath: d:\Dev\ACS\acs-frontend\src\components\CreationTournoiForm.vue
<template>
  <div class="">
    <div class="tabs">
      <button
        @click="activeTab = 'create'"
        :class="{ active: activeTab === 'create' }"
      >
        Créer un Tournoi
      </button>
      <button
        @click="activeTab = 'edit'"
        :class="{ active: activeTab === 'edit' }"
      >
        Modifier un Tournoi
      </button>
    </div>
    <component :is="activeTabComponent"></component>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import CreationTournoi from "./CreationTournoi.vue";
import EditTournoi from "./EditTournoi.vue";

const activeTab = ref<string>("create");

const activeTabComponent = computed(() => {
  return activeTab.value === "create" ? CreationTournoi : EditTournoi;
});
</script>

<style scoped>
.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.tabs button {
  background: #ff00ff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
}

.tabs button.active {
  background: #e600e6;
}

.tabs button:not(.active):hover {
  background: #ff33ff;
}
</style>
