<template>
  <div
    class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden horror-container"
  >
    <Card
      variant="secondary"
      :stars="false"
      :decorated="true"
      className="max-w-2xl w-full z-10 relative horror-card"
    >
      <div class="flex flex-col items-center justify-center space-y-8 py-12">
        <!-- Code d'erreur avec effet horrifique -->
        <div class="relative text-center">
          <Title
            size="4xl"
            :decorated="true"
            className="font-horror tracking-widest horror-404"
          >
            404
          </Title>

          <!-- Effet d'ombre sanglante pour le 404 -->
          <div
            class="absolute -inset-1 opacity-40 blur-lg text-4xl font-horror text-color-secondary tracking-widest text-center z-[-1]"
          >
            404
          </div>
        </div>

        <div class="max-w-lg text-center space-y-6">
          <p class="text-color-text mb-6 font-body leading-relaxed">
            Cette page a été bannie dans les limbes par une malédiction
            ancienne. Votre âme semble avoir erré dans un royaume interdit où
            seules les ombres demeurent.
          </p>

          <!-- Terminal avec message d'erreur Halloween -->
          <Terminal
            command="locate_cursed_page"
            title="DIVINATION · SYSTÈME"
            className="mb-8 text-left horror-terminal"
            :showCursor="true"
          >
            <div class="text-color-secondary font-mono">
              💀 Malédiction: La page demandée a été engloutie par les ténèbres.
            </div>
            <div class="text-color-text-muted mt-2 font-body">
              🎃 Consultez le grimoire ou retournez au sanctuaire principal.
            </div>
          </Terminal>

          <!-- Bouton de retour Halloween -->
          <router-link to="/" class="block">
            <Button
              variant="secondary"
              size="lg"
              className="horror-return-button"
            >
              <template #icon>
                <span class="text-xl mr-2">🏚️</span>
              </template>
              RETOUR
            </Button>
          </router-link>
        </div>
      </div>
    </Card>
  </div>
</template>
<script setup lang="ts">
// Pas de logique spécifique nécessaire
</script>

<style scoped>
/* Container principal Halloween */
.horror-container {
  background: linear-gradient(
    180deg,
    var(--color-bg) 0%,
    var(--color-bg-dark) 50%,
    var(--color-bg) 100%
  );
  font-family: var(--font-body);
}

/* Carte Halloween */
.horror-card {
  background: var(--color-card-bg) !important;
  border: 2px solid var(--color-secondary) !important;
  box-shadow: var(--shadow-glow-secondary), 0 0 40px rgba(124, 45, 18, 0.3),
    inset 0 1px 0 rgba(220, 38, 38, 0.1) !important;
}

/* 404 horrifique */
.horror-404 {
  font-family: var(--font-horror) !important;
  color: var(--color-secondary) !important;
  text-shadow: 0 0 20px rgba(124, 45, 18, 0.8), 0 0 40px rgba(124, 45, 18, 0.4),
    4px 4px 8px rgba(0, 0, 0, 0.9) !important;
  animation: horror-404-pulse 3s ease-in-out infinite;
}

@keyframes horror-404-pulse {
  0%,
  100% {
    transform: scale(1);
    text-shadow: 0 0 20px rgba(124, 45, 18, 0.8),
      0 0 40px rgba(124, 45, 18, 0.4), 4px 4px 8px rgba(0, 0, 0, 0.9);
  }
  50% {
    transform: scale(1.02);
    text-shadow: 0 0 30px rgba(124, 45, 18, 1), 0 0 60px rgba(124, 45, 18, 0.6),
      4px 4px 8px rgba(0, 0, 0, 0.9);
  }
}

/* Terminal Halloween */
.horror-terminal {
  border: 2px solid var(--color-secondary) !important;
  background: rgba(15, 15, 15, 0.95) !important;
  box-shadow: var(--shadow-glow-secondary),
    inset 0 0 20px rgba(124, 45, 18, 0.1) !important;
}

/* Bouton de retour Halloween */
.horror-return-button {
  font-family: var(--font-body) !important;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.horror-return-button:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-glow-secondary), 0 10px 30px rgba(0, 0, 0, 0.5) !important;
}

/* Responsive mobile */
@media (max-width: 640px) {
  .horror-container {
    padding: 1rem;
  }

  .horror-card {
    margin: 0.5rem;
  }
}
</style>
