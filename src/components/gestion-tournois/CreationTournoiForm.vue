<template>
  <div class="container mx-auto">
    <!-- Sélecteur d'onglets -->
    <Card variant="dark" :decorated="true" className="mb-8">
      <div class="flex flex-col">
        <!-- Boutons d'onglets -->
        <div class="flex flex-wrap md:flex-nowrap justify-center gap-4">
          <Button
            @click="activeTab = 'create'"
            :variant="activeTab === 'create' ? 'primary' : 'outline'"
            size="md"
            className="flex-1 max-w-xs"
            icon
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
            Créer un Tournoi
          </Button>

          <Button
            @click="activeTab = 'edit'"
            :variant="activeTab === 'edit' ? 'secondary' : 'outline'"
            size="md"
            className="flex-1 max-w-xs"
            icon
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                />
              </svg>
            </template>
            Modifier un Tournoi
          </Button>
        </div>

        <!-- Indicateur d'onglet actif -->
        <div
          class="relative h-1 mt-4 bg-color-bg-light/30 rounded-full overflow-hidden"
        >
          <div
            class="absolute top-0 left-0 h-full transition-all duration-300 ease-in-out rounded-full"
            :class="[
              activeTab === 'create'
                ? 'bg-color-primary w-1/2 transform translate-x-0'
                : 'bg-color-secondary w-1/2 transform translate-x-full',
            ]"
            :style="{
              boxShadow:
                activeTab === 'create'
                  ? '0 0 10px rgba(var(--color-primary-rgb), 0.7)'
                  : '0 0 10px rgba(var(--color-secondary-rgb), 0.7)',
            }"
          ></div>
        </div>
      </div>
    </Card>

    <!-- Contenu de l'onglet actif avec animation de transition -->
    <div class="tab-content-wrapper">
      <transition name="space-fade" mode="out-in" appear>
        <component :is="activeTabComponent" :key="activeTab"></component>
      </transition>
    </div>
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
/* Container principal */
.tournament-form-container {
  width: 100%;
  margin-bottom: 2rem;
}

/* Conteneur pour les onglets */
.tab-selector-container {
  position: relative;
  margin-bottom: 2rem;
  padding-bottom: 0.25rem;
}

.tab-selector {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

/* Style des boutons d'onglet */
.tab-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  color: #f3f4f6;
  font-family: "Orbitron", sans-serif;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  background: rgba(31, 41, 55, 0.7);
  border: 1px solid rgba(236, 72, 153, 0.3);
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.15);
  position: relative;
  overflow: hidden;
  min-width: 220px;
}

/* Effet de lueur au survol */
.tab-button:hover {
  color: #fff;
  transform: translateY(-3px);
  border-color: rgba(236, 72, 153, 0.6);
  background: rgba(31, 41, 55, 0.8);
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.3);
}

/* Style pour l'onglet actif */
.tab-button.active {
  background: linear-gradient(135deg, #ec4899 0%, #9333ea 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.4), 0 0 30px rgba(236, 72, 153, 0.2);
}

/* Effet de brillance qui balaie le bouton */
.tab-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: all 0.6s ease;
}

.tab-button:hover::before {
  left: 100%;
}

/* Indicateur d'onglet */
.tab-indicator-container {
  position: relative;
  height: 4px;
  margin-top: 10px;
  background: rgba(107, 114, 128, 0.2);
  border-radius: 2px;
}

.tab-indicator {
  position: absolute;
  width: calc(50% - 0.75rem);
  height: 100%;
  background: linear-gradient(90deg, #ec4899, #d946ef);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  left: 0;
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.6);
}

.tab-indicator.right {
  left: calc(50% + 0.75rem);
}

/* Conteneur pour le contenu */
.tab-content-wrapper {
  position: relative;
  min-height: 200px;
}

/* Animations pour les transitions d'onglet */
.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.tab-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.tab-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Media queries pour responsive */
@media (max-width: 640px) {
  .tab-selector {
    flex-direction: column;
    gap: 1rem;
  }

  .tab-button {
    width: 100%;
  }

  .tab-indicator {
    width: 50%;
  }

  .tab-indicator.right {
    left: 50%;
  }
}

/* Animation pour les boutons actifs */
@keyframes pulse {
  0% {
    box-shadow: 0 0 15px rgba(236, 72, 153, 0.4);
  }
  50% {
    box-shadow: 0 0 25px rgba(236, 72, 153, 0.6);
  }
  100% {
    box-shadow: 0 0 15px rgba(236, 72, 153, 0.4);
  }
}

.tab-button.active {
  animation: pulse 2s infinite;
}
</style>
