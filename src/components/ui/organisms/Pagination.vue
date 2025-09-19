<!--
PAGINATION COMPONENT - Composant de pagination Halloween

UTILISATION:
<Pagination
  :currentPage="currentPage"
  :totalPages="totalPages"
  :showDots="true"
  :prevLabel="'Précédent'"
  :nextLabel="'Suivant'"
  :maxVisiblePages="5"
  @prev-page="handlePrevPage"
  @next-page="handleNextPage"
  @page-select="handlePageSelect"
/>

PROPS:
- currentPage (number, requis): Page actuellement active
- totalPages (number, requis): Nombre total de pages
- showDots (boolean, optionnel): Affiche les points de navigation
- prevLabel (string, optionnel): Texte du bouton précédent
- nextLabel (string, optionnel): Texte du bouton suivant
- maxVisiblePages (number, optionnel): Nombre max de pages visibles dans les points

EVENTS:
- prev-page: Émis lors du clic sur précédent
- next-page: Émis lors du clic sur suivant
- page-select: Émis lors de la sélection d'une page spécifique
-->

<template>
  <div class="pagination-container">
    <div class="pagination-wrapper">
      <!-- Bouton précédent -->
      <button
        @click="handlePrevPage"
        :disabled="currentPage === 1"
        :class="['pagination-nav prev', { disabled: currentPage === 1 }]"
        :aria-label="prevLabel"
      >
        <div class="nav-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 sm:h-5 sm:w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <span class="nav-text">{{ prevLabel }}</span>
      </button>

      <!-- Compteur central -->
      <div class="pagination-center">
        <div class="page-display">
          <!-- Page actuelle -->
          <div class="current-page">
            <span class="page-number">{{
              String(currentPage).padStart(2, "0")
            }}</span>
          </div>

          <!-- Séparateur -->
          <div class="page-separator">
            <span class="separator-symbol">🦇</span>
          </div>

          <!-- Total des pages -->
          <div class="total-pages">
            <span class="total-number">{{
              String(totalPages).padStart(2, "0")
            }}</span>
          </div>
        </div>

        <!-- Barre de progression -->
        <div class="progress-container">
          <div class="progress-track">
            <div
              class="progress-fill"
              :style="{ width: progressPercentage + '%' }"
            ></div>
          </div>
        </div>

        <!-- Navigation par points -->
        <div v-if="showDots && totalPages > 3" class="pagination-dots">
          <button
            v-for="pageNum in displayedPages"
            :key="pageNum"
            @click="handlePageSelect(pageNum)"
            :class="[
              'pagination-dot',
              { active: currentPage === pageNum },
              { nearby: Math.abs(currentPage - pageNum) === 1 },
            ]"
            :aria-label="`Aller à la page ${pageNum}`"
            :aria-current="currentPage === pageNum ? 'page' : undefined"
          >
            <div class="dot-core"></div>
          </button>
        </div>
      </div>

      <!-- Bouton suivant -->
      <button
        @click="handleNextPage"
        :disabled="currentPage === totalPages"
        :class="[
          'pagination-nav next',
          { disabled: currentPage === totalPages },
        ]"
        :aria-label="nextLabel"
      >
        <span class="nav-text">{{ nextLabel }}</span>
        <div class="nav-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 sm:h-5 sm:w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  currentPage: number;
  totalPages: number;
  showDots?: boolean;
  prevLabel?: string;
  nextLabel?: string;
  maxVisiblePages?: number;
}

const props = withDefaults(defineProps<Props>(), {
  showDots: true,
  prevLabel: "Précédent",
  nextLabel: "Suivant",
  maxVisiblePages: 5,
});

const emit = defineEmits(["prev-page", "next-page", "page-select"]);

// Calculer les pages à afficher
const displayedPages = computed(() => {
  if (props.totalPages <= props.maxVisiblePages) {
    // Si le nombre total de pages est inférieur au maximum visible, afficher toutes les pages
    return Array.from({ length: props.totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor(props.maxVisiblePages / 2);

  // Cas où on est proche du début
  if (props.currentPage <= half) {
    return Array.from({ length: props.maxVisiblePages }, (_, i) => i + 1);
  }

  // Cas où on est proche de la fin
  if (props.currentPage >= props.totalPages - half) {
    return Array.from(
      { length: props.maxVisiblePages },
      (_, i) => props.totalPages - props.maxVisiblePages + i + 1
    );
  }

  // Cas où on est au milieu
  return Array.from(
    { length: props.maxVisiblePages },
    (_, i) => props.currentPage - half + i
  );
});

// Handlers
const handlePrevPage = () => {
  if (props.currentPage > 1) {
    emit("prev-page");
  }
};

const handleNextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit("next-page");
  }
};

const handlePageSelect = (pageNum: number) => {
  if (pageNum !== props.currentPage) {
    emit("page-select", pageNum);
  }
};

// Calculer le pourcentage de progression
const progressPercentage = computed(() => {
  if (props.totalPages <= 1) return 0;
  return ((props.currentPage - 1) / (props.totalPages - 1)) * 100;
});
</script>

<style scoped>
/**
 * PAGINATION HALLOWEEN THEME
 * Composant de pagination avec thème Halloween/horreur
 * Utilise les variables CSS du thème pour une cohérence visuelle
 */

.pagination-container {
  position: relative;
  padding: 2rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: var(--font-body);
}

.pagination-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  max-width: 600px;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .pagination-wrapper {
    gap: 2rem;
  }
}

/* BOUTONS DE NAVIGATION */
.pagination-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
  background: var(--color-card-bg);
  border: 1px solid rgba(var(--color-primary-rgb), 0.3);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  min-width: fit-content;
  flex-shrink: 0;
  cursor: pointer;
}

.pagination-nav:not(.disabled):hover {
  background: rgba(var(--color-primary-rgb), 0.15);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-glow-primary);
  transform: translateY(-1px);
  color: var(--color-primary-light);
}

.pagination-nav.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background: rgba(var(--color-bg-rgb), 0.5);
}

.nav-icon {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.pagination-nav.prev:hover .nav-icon {
  transform: translateX(-2px);
}

.pagination-nav.next:hover .nav-icon {
  transform: translateX(2px);
}

.nav-text {
  font-weight: 500;
  transition: color 0.3s ease;
}

/* CENTRE DE PAGINATION */
.pagination-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  min-width: 120px;
  width: 100%;
  max-width: 250px;
}

@media (min-width: 640px) {
  .pagination-center {
    min-width: 200px;
    max-width: 350px;
  }
}

/* AFFICHAGE DES PAGES */
.page-display {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: var(--color-card-bg);
  border: 1px solid rgba(var(--color-primary-rgb), 0.3);
  border-radius: 12px;
  backdrop-filter: blur(15px);
  position: relative;
  width: 100%;
  justify-content: center;
  box-shadow: var(--shadow-card-base);
}

.page-display::before {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(
    45deg,
    var(--color-primary),
    var(--color-secondary),
    var(--color-accent)
  );
  background-size: 200% 200%;
  border-radius: 12px;
  opacity: 0.2;
  z-index: -1;
  animation: horror-glow 3s ease infinite;
}

@keyframes horror-glow {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.current-page {
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-number {
  font-family: var(--font-mono);
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-primary);
  text-shadow: var(--shadow-glow-primary);
  position: relative;
  z-index: 1;
}

.page-separator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.separator-symbol {
  font-size: 1.2rem;
  color: var(--color-secondary);
  animation: bat-flutter 2s ease-in-out infinite;
}

@keyframes bat-flutter {
  0%,
  100% {
    transform: rotate(-5deg) scale(1);
  }
  50% {
    transform: rotate(5deg) scale(1.1);
  }
}

.total-pages {
  display: flex;
  align-items: center;
}

.total-number {
  font-family: var(--font-mono);
  font-size: 1.25rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

/* BARRE DE PROGRESSION */
.progress-container {
  width: 100%;
  max-width: 200px;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .progress-container {
    max-width: 300px;
  }
}

.progress-track {
  position: relative;
  width: 100%;
  height: 4px;
  background: rgba(var(--color-primary-rgb), 0.2);
  border-radius: 2px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--color-primary) 0%,
    var(--color-secondary) 50%,
    var(--color-primary) 100%
  );
  border-radius: 2px;
  transition: width 0.5s ease;
  position: relative;
  box-shadow: var(--shadow-glow-primary);
}

.progress-fill::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  animation: blood-flow 2s linear infinite;
}

@keyframes blood-flow {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* POINTS DE NAVIGATION */
.pagination-dots {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.5rem;
}

.pagination-dot {
  position: relative;
  width: 12px;
  height: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot-core {
  width: 100%;
  height: 100%;
  background: var(--color-bg-light);
  border-radius: 50%;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(var(--color-primary-rgb), 0.3);
}

.pagination-dot.active .dot-core {
  background: var(--color-primary);
  box-shadow: var(--shadow-glow-primary);
  transform: scale(1.2);
}

.pagination-dot.nearby .dot-core {
  background: rgba(var(--color-primary-rgb), 0.6);
  transform: scale(1.1);
}

.pagination-dot:hover .dot-core {
  background: var(--color-primary);
  transform: scale(1.3);
  box-shadow: var(--shadow-glow-primary);
}

/* RESPONSIVE */
@media (max-width: 767px) {
  .pagination-container {
    padding: 1rem 0;
  }

  .pagination-wrapper {
    padding: 0 0.5rem;
    gap: 0.5rem;
  }

  .pagination-dots {
    gap: 0.5rem;
  }

  .pagination-dot {
    width: 10px;
    height: 10px;
  }

  .page-display {
    padding: 0.75rem 1rem;
    gap: 0.75rem;
  }

  .page-number {
    font-size: 1.25rem;
  }

  .total-number {
    font-size: 1rem;
  }
}

@media (max-width: 479px) {
  .nav-text {
    display: none;
  }

  .pagination-nav {
    padding: 0.5rem;
    min-width: auto;
    gap: 0;
  }

  .pagination-wrapper {
    gap: 0.5rem;
  }

  .page-display {
    padding: 0.5rem 0.75rem;
    gap: 0.5rem;
  }

  .progress-container {
    max-width: 150px;
    padding: 0 0.5rem;
  }

  /* Masquer les points sur très petit écran */
  .pagination-dots {
    display: none;
  }

  .separator-symbol {
    font-size: 1rem;
  }
}

/* Améliorer l'affichage sur tablets */
@media (min-width: 768px) and (max-width: 1023px) {
  .pagination-wrapper {
    max-width: 500px;
  }

  .pagination-center {
    max-width: 300px;
  }
}
</style>
