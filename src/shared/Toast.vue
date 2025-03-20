<!-- filepath: d:\Dev\ACS\acs-frontend\src\components\Toast.vue -->
<template>
  <Teleport to="body">
    <div
      v-if="message"
      :class="[
        'fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg border backdrop-blur-sm font-orbitron animate-slideUp',
        type === 'error'
          ? 'bg-red-900/70 text-red-100 border-red-500/50 shadow-lg shadow-red-500/30'
          : 'bg-emerald-900/70 text-emerald-100 border-emerald-500/50 shadow-lg shadow-emerald-500/30',
      ]"
    >
      <div class="flex items-center">
        <!-- Icône pour error -->
        <svg
          v-if="type === 'error'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2 text-red-300"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>

        <!-- Icône pour success -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2 text-emerald-300"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>

        <span>{{ message }}</span>
      </div>

      <!-- Barre de progression qui diminue avec le temps -->
      <div class="w-full h-0.5 bg-gray-700/50 mt-2 overflow-hidden">
        <div
          :class="[
            'h-full animate-shrink',
            type === 'error' ? 'bg-red-400' : 'bg-emerald-400',
          ]"
        ></div>
      </div>

      <!-- Effets lumineux sur les bords -->
      <div
        :class="[
          'absolute -top-px left-0 w-full h-[1px]',
          type === 'error'
            ? 'bg-gradient-to-r from-transparent via-red-400 to-transparent'
            : 'bg-gradient-to-r from-transparent via-emerald-400 to-transparent',
        ]"
      ></div>

      <div
        :class="[
          'absolute -bottom-px left-0 w-full h-[1px]',
          type === 'error'
            ? 'bg-gradient-to-r from-transparent via-red-400 to-transparent'
            : 'bg-gradient-to-r from-transparent via-emerald-400 to-transparent',
        ]"
      ></div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  type: {
    type: String,
    required: true,
    validator: (value: string) => ["success", "error"].includes(value),
  },
  message: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
/* Classe personnalisée pour la police Orbitron */
.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

/* Animation d'apparition par le bas */
@keyframes slideUp {
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

.animate-slideUp {
  animation: slideUp 0.3s ease-out forwards;
}

/* Animation de la barre de progression */
@keyframes shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.animate-shrink {
  width: 100%;
  animation: shrink 3s linear forwards;
}
</style>
