<template>
  <div
    class="container mx-auto p-4 sm:p-6 pt-20 sm:pt-24 min-h-screen relative"
  >
    <!-- Effet de grille cyberpunk en arrière-plan -->
    <div class="cyber-grid"></div>

    <div
      class="max-w-4xl mx-auto bg-black/75 backdrop-blur-xl rounded-xl border border-purple-500/30 shadow-lg shadow-purple-500/20 p-8 relative overflow-hidden"
    >
      <!-- En-tête -->
      <div class="text-center mb-10 relative z-10">
        <h1 class="text-4xl text-white font-audiowide mb-2 neon-text-pink">
          404
        </h1>
        <div
          class="h-1 w-20 mx-auto bg-gradient-to-r from-transparent via-pink-500 to-transparent rounded shadow-glow mb-6"
        ></div>
        <h2 class="text-2xl text-white font-orbitron mb-4 neon-text">
          Page introuvable
        </h2>
        <p class="text-gray-300 max-w-xl mx-auto mb-8">
          La page que vous recherchez semble ne pas exister ou a été déplacée
          vers une autre adresse.
        </p>

        <!-- Bouton retour à l'accueil -->
        <router-link
          to="/"
          class="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-orbitron py-3 px-6 rounded-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-1"
        >
          <span class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
              />
            </svg>
            Retour à l'accueil
          </span>
        </router-link>
      </div>

      <!-- Décoration cyberpunk -->
      <div
        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent"
      ></div>
      <div
        class="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-purple-500"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-pink-500"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Pas de logique spécifique nécessaire
</script>

<style scoped>
/* Effet de grille cyberpunk */
.cyber-grid {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
      to right,
      rgba(139, 92, 246, 0.05) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgba(139, 92, 246, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: -1;
  pointer-events: none;
  transform: perspective(500px) rotateX(30deg);
  opacity: 0.5;
}

/* Effet néon pour les titres */
.neon-text {
  color: white;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 15px #ff00ff;
}

.neon-text-pink {
  color: white;
  text-shadow: 0 0 10px #ec4899, 0 0 20px #ec4899, 0 0 15px #ec4899;
}

/* Animation légère pour le 404 */
@keyframes pulse-glow {
  0%,
  100% {
    text-shadow: 0 0 10px #ec4899, 0 0 20px #ec4899, 0 0 15px #ec4899;
  }
  50% {
    text-shadow: 0 0 15px #ec4899, 0 0 25px #ec4899, 0 0 20px #ec4899;
  }
}

h1.neon-text-pink {
  animation: pulse-glow 2s infinite ease-in-out;
}

/* Effet de lueur pour l'élément de séparation */
.shadow-glow {
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.7);
}
</style>
