<template>
  <div
    v-if="show"
    class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-md"
  >
    <div
      class="w-full max-w-md transform transition-all duration-300"
      :class="{
        'scale-100 opacity-100': animateIn,
        'scale-95 opacity-0': !animateIn,
      }"
    >
      <!-- Container principal avec bordure animée -->
      <div class="relative">
        <!-- Bordure animée -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-cyan-500 via-pink-500 to-cyan-500 animate-[gradient_3s_ease_infinite] rounded opacity-70"
        ></div>

        <!-- Modal avec clipping path comme vos autres composants -->
        <div
          class="cyber-modal bg-gray-900 p-5 relative border border-cyan-500/60 shadow-lg shadow-cyan-500/30"
        >
          <!-- Ligne horizontale glitch -->
          <div
            class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70"
          ></div>

          <!-- Header avec icône et titre -->
          <div class="flex items-center mb-6 pb-3 border-b border-cyan-500/30">
            <div
              class="mr-4 p-3 bg-cyan-900/30 rounded-md border border-cyan-600/40 relative overflow-hidden group"
            >
              <!-- Effet de lueur sur l'icône -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              ></div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-cyan-400 relative z-10 drop-shadow-[0_0_3px_rgba(34,211,238,0.7)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h3 class="text-xl font-audiowide text-white neon-text-cyan">
              Définir votre niveau
            </h3>
          </div>

          <!-- Corps du message -->
          <div
            class="mb-6 bg-gray-900/80 p-4 border border-cyan-500/20 rounded relative"
          >
            <div
              class="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/60"
            ></div>
            <div
              class="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/60"
            ></div>
            <div
              class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/60"
            ></div>
            <div
              class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/60"
            ></div>

            <p class="text-cyan-300 mb-3 font-orbitron text-sm">
              Pour participer à ce tournoi, nous avons besoin de connaître votre
              niveau sur
              <span class="text-pink-400 font-medium animate-pulse">{{
                gameName
              }}</span
              >.
            </p>
            <p class="text-cyan-300 font-orbitron text-sm">
              Cela nous permettra de constituer des équipes plus équilibrées et
              de vous proposer une meilleure expérience.
            </p>
          </div>

          <!-- Boutons d'action -->
          <div
            class="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4"
          >
            <button
              @click="$emit('register-without-level')"
              class="cyberpunk-btn-gray px-4 py-2 rounded-sm font-orbitron text-sm"
            >
              Plus tard
            </button>
            <button
              @click="$emit('confirm')"
              class="cyberpunk-btn-cyan px-4 py-2 rounded-sm font-orbitron text-sm flex items-center justify-center"
            >
              <span class="mr-2 relative z-10">Définir mon niveau</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  show: Boolean,
  gameName: {
    type: String,
    default: "ce jeu",
  },
});

// Ajouter "register-without-level" aux événements émis
const emit = defineEmits(["confirm", "close", "register-without-level"]);

// Animation à l'ouverture
const animateIn = ref(false);

onMounted(() => {
  if (props.show) {
    setTimeout(() => {
      animateIn.value = true;
    }, 10);
  }
});

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      setTimeout(() => {
        animateIn.value = true;
      }, 10);
    } else {
      animateIn.value = false;
    }
  }
);
</script>

<style scoped>
.cyber-modal {
  clip-path: polygon(
    10px 0,
    100% 0,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    0 100%,
    0 10px
  );
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Appliquer l'animation au gradient */
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}
</style>
