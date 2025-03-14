<template>
  <div class="">
    <div class="flex justify-center gap-4 mb-4">
      <!-- Utilisez gap-4 pour un espacement de 1rem -->
      <button
        @click="activeTab = 'create'"
        :class="[
          'px-4 py-2 text-white bg-pink-500 rounded shadow transition-colors duration-300',
          activeTab === 'create'
            ? 'bg-pink-600'
            : 'hover:bg-pink-400 cursor-pointer',
        ]"
      >
        Créer un Tournoi
      </button>
      <button
        @click="activeTab = 'edit'"
        :class="[
          'px-4 py-2 text-white bg-pink-500 rounded shadow transition-colors duration-300',
          activeTab === 'edit'
            ? 'bg-pink-600'
            : 'hover:bg-pink-400 cursor-pointer',
        ]"
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

<style scoped></style>
