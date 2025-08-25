<template>
  <div
    class="container mx-auto p-4 sm:p-6 pt-20 sm:pt-24 min-h-screen relative"
  >
    <!-- Grille spatiale en arrière-plan -->
    <div
      class="space-grid absolute inset-0 opacity-20 pointer-events-none z-0"
    ></div>

    <!-- Particules d'étoiles -->
    <div
      v-for="n in 20"
      :key="`star-${n}`"
      class="absolute h-1 w-1 rounded-full bg-white animate-pulse"
      :style="{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        opacity: Math.random() * 0.7 + 0.3,
      }"
    ></div>

    <SpaceCard
      variant="primary"
      :stars="true"
      :decorated="true"
      className="max-w-2xl mx-auto z-10 relative"
    >
      <div class="flex flex-col items-center justify-center space-y-6 py-8">
        <!-- Code d'erreur avec effet glitch -->
        <div class="relative">
          <SpaceTitle
            size="4xl"
            :glitch="true"
            className="font-mono tracking-widest glitch-text"
          >
            404
          </SpaceTitle>

          <!-- Effet d'écho pour le 404 -->
          <div
            class="absolute -inset-0.5 opacity-30 blur-sm text-4xl font-mono text-color-primary-light tracking-widest text-center z-[-1]"
          >
            404
          </div>
        </div>

        <!-- Ligne de séparation avec effet spatial -->
        <div
          class="w-32 h-0.5 bg-gradient-to-r from-transparent via-color-primary to-transparent relative"
        >
          <div
            class="absolute inset-0 animate-pulse-slow opacity-70 bg-gradient-to-r from-transparent via-color-primary-light to-transparent"
          ></div>
        </div>

        <!-- Message d'erreur -->
        <SpaceTitle size="2xl" className="text-center">
          SIGNAL PERDU
        </SpaceTitle>

        <div class="max-w-md text-center">
          <p class="text-normal-text mb-6">
            Les coordonnées spatio-temporelles de cette page n'existent pas dans
            notre base de données. Votre vaisseau semble avoir dérivé dans un
            secteur inconnu.
          </p>

          <!-- Terminal avec message d'erreur -->
          <SpaceTerminal
            command="locate_page"
            title="NAVIGATION · SYSTÈME"
            className="mb-6 text-left"
            :showCursor="true"
          >
            <div class="text-color-error">
              Erreur: La page demandée n'a pas été trouvée.
            </div>
            <div class="text-normal-text-muted mt-2">
              Vérifiez les coordonnées ou retournez à la station de base.
            </div>
          </SpaceTerminal>

          <!-- Bouton de retour à l'accueil -->
          <router-link to="/">
            <SpaceButton variant="primary" size="lg" className="animate-hover">
              <template #icon>
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
              </template>
              RETOUR À LA BASE
            </SpaceButton>
          </router-link>
        </div>
      </div>
    </SpaceCard>

    <!-- Éléments décoratifs en arrière-plan -->
    <div
      class="absolute bottom-10 left-10 w-32 h-32 rounded-full border border-color-primary-light/30 opacity-20 z-0 animate-ping-slow"
    ></div>
    <div
      class="absolute top-20 right-10 w-48 h-48 rounded-full border border-color-secondary-light/20 opacity-10 z-0 animate-pulse-slow"
    ></div>

    <!-- "Planète" en arrière-plan -->
    <div
      class="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-color-primary-dark/20 to-color-primary/5 opacity-30 z-0 blur-xl"
    ></div>
  </div>
</template>

<script setup lang="ts">
// Pas de logique spécifique nécessaire
</script>

<style scoped>
.space-grid {
  background-image: linear-gradient(
      rgba(109, 40, 217, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(109, 40, 217, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
}

.glitch-text {
  text-shadow: 0 0 10px var(--color-primary-light),
    0 0 20px var(--color-primary-light);
}

@keyframes ping-slow {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.3;
  }
}

.animate-ping-slow {
  animation: ping-slow 8s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.3;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-hover {
  transition: transform 0.3s ease;
}

.animate-hover:hover {
  transform: translateY(-3px);
}
</style>
