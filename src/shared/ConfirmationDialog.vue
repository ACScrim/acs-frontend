<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-sm animate-fadeIn"
  >
    <div
      class="w-full max-w-md p-1 rounded-lg shadow-2xl relative overflow-hidden animate-scaleIn"
      style="background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)"
    >
      <!-- Container avec bordure intérieure -->
      <div
        class="bg-gray-900/90 rounded-lg p-6 border border-purple-500/30 backdrop-blur-sm relative z-10"
      >
        <!-- Effet de ligne qui traverse le haut -->
        <div
          class="absolute -top-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70"
        ></div>

        <!-- Titre -->
        <h2
          class="text-2xl font-audiowide mb-6 text-white text-center neon-text-pink"
        >
          {{ props.title }}
        </h2>

        <!-- Message -->
        <p class="mb-8 text-cyan-100 font-orbitron text-center leading-relaxed">
          {{ props.message }}
        </p>

        <!-- Boutons -->
        <div class="flex justify-center space-x-6">
          <button
            @click="onCancel"
            class="px-6 py-3 bg-gray-800 text-gray-300 rounded-md font-orbitron text-sm uppercase tracking-wider border border-gray-700 hover:bg-gray-700 hover:text-white hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transform hover:-translate-y-1 transition-all duration-200 shadow-lg shadow-gray-900/50"
          >
            Annuler
          </button>

          <button
            @click="onConfirm"
            class="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-md font-orbitron text-sm uppercase tracking-wider hover:from-pink-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transform hover:-translate-y-1 transition-all duration-200 shadow-lg shadow-pink-900/50 relative overflow-hidden group"
          >
            <span class="relative z-10">Confirmer</span>
            <span
              class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"
            ></span>
          </button>
        </div>
      </div>

      <!-- Coins lumineux -->
      <div
        class="absolute top-0 left-0 w-3 h-3 bg-cyan-400 rounded-full blur-[2px] opacity-80"
      ></div>
      <div
        class="absolute top-0 right-0 w-3 h-3 bg-pink-400 rounded-full blur-[2px] opacity-80"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-3 h-3 bg-purple-400 rounded-full blur-[2px] opacity-80"
      ></div>
      <div
        class="absolute bottom-0 right-0 w-3 h-3 bg-cyan-400 rounded-full blur-[2px] opacity-80"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  title: String,
  message: String,
});

const emit = defineEmits(["confirm", "cancel"]);

const onConfirm = () => {
  emit("confirm");
};

const onCancel = () => {
  emit("cancel");
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Audiowide&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap");

/* Ajout des classes personnalisées non-disponibles dans Tailwind */
.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

.neon-text-pink {
  text-shadow: 0 0 5px #ec4899, 0 0 15px #ec4899;
  animation: pulsate 1.5s infinite alternate;
}

@keyframes pulsate {
  0% {
    text-shadow: 0 0 5px #ec4899, 0 0 10px #ec4899;
  }
  100% {
    text-shadow: 0 0 7px #ec4899, 0 0 15px #ec4899, 0 0 20px #ec4899;
  }
}

/* Animation de scintillement pour le bouton */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

/* Animations pour l'apparition de la boîte de dialogue */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scaleIn {
  animation: scaleIn 0.3s ease-out forwards;
}
</style>
