<template>
  <SpaceContainer>
    <div class="min-h-[70vh] flex items-center justify-center p-4">
      <SpaceCard
        variant="primary"
        :decorated="true"
        className="max-w-2xl w-full mx-auto"
      >
        <div class="flex flex-col items-center justify-center space-y-6 py-8">
          <!-- Code d'erreur en style Far West -->
          <SpaceTitle
            size="4xl"
            :glitch="false"
            className="font-display tracking-widest"
          >
            404
          </SpaceTitle>

          <!-- Message d'erreur Far West -->
          <SpaceTitle size="2xl" className="text-center">
            Piste perdue
          </SpaceTitle>

          <div class="max-w-md text-center">
            <p class="text-normal-text mb-6">
              Cette piste mène nulle part. Le document recherché ne se trouve
              pas dans nos registres.
            </p>

            <!-- Avis de recherche (Terminal Far West) -->
            <SpaceTerminal
              command="La page demandée n'a pas été trouvée."
              title="Avis de recherche : Page"
              className="mb-6 text-left"
              :showCursor="false"
            >
              <div class="text-color-error">
                Erreur: La page demandée n'a pas été trouvée.
              </div>
              <div class="text-normal-text-muted mt-2">
                Vérifiez l'adresse ou retournez au camp de base.
              </div>
            </SpaceTerminal>

            <!-- Bouton de retour à l'accueil -->
            <router-link to="/">
              <SpaceButton variant="primary" size="lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 inline-block align-middle"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                  />
                </svg>
                RETOUR AU CAMP
              </SpaceButton>
            </router-link>
          </div>
        </div>
      </SpaceCard>
    </div>
  </SpaceContainer>
</template>

<script setup lang="ts">
import SpaceContainer from "@/components/ui/layout/Container.vue";
import SpaceCard from "@/components/ui/molecules/Card.vue";
import SpaceTitle from "@/components/ui/atoms/Title.vue";
import SpaceTerminal from "@/components/ui/organisms/Terminal.vue";
import SpaceButton from "@/components/ui/atoms/Button.vue";
</script>

<style scoped>
/* Styles sci-fi retirés pour laisser le thème Far West s'exprimer via les composants */
</style>
