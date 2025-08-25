<template>
  <div class="west-pagination-container relative">
    <!-- Liseré décoratif (corde) -->
    <div class="west-pagination-line"></div>
    <div
      class="west-pagination flex items-center justify-center gap-2 sm:gap-4"
    >
      <!-- Bouton précédent -->
      <button
        @click="handlePrevPage"
        :disabled="currentPage === 1"
        :class="['west-pagination-nav prev', { disabled: currentPage === 1 }]"
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

      <!-- Compteur central avec style spatial -->
      <div class="west-pagination-center flex-1">
        <div class="pagination-display">
          <!-- Indicateur de page actuelle -->
          <div class="current-page-indicator">
            <span class="page-number">{{
              String(currentPage).padStart(2, "0")
            }}</span>
          </div>

          <!-- Séparateur (brand/chevron) -->
          <div class="page-separator" aria-hidden="true">
            <div class="separator-brand"></div>
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
            <div
              class="progress-indicator"
              :style="{ left: progressPercentage + '%' }"
            ></div>
          </div>
        </div>

        <!-- Navigation par points (si beaucoup de pages) -->
        <div v-if="showDots && totalPages > 3" class="west-pagination-dots">
          <button
            v-for="pageNum in displayedPages"
            :key="pageNum"
            @click="handlePageSelect(pageNum)"
            :class="[
              'west-dot',
              { active: currentPage === pageNum },
              { nearby: Math.abs(currentPage - pageNum) === 1 },
            ]"
            :aria-label="`Aller à la page ${pageNum}`"
            :aria-current="currentPage === pageNum ? 'page' : undefined"
          >
            <div class="dot-core"></div>
            <div class="dot-ring"></div>
          </button>
        </div>
      </div>

      <!-- Bouton suivant -->
      <button
        @click="handleNextPage"
        :disabled="currentPage === totalPages"
        :class="[
          'west-pagination-nav next',
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
.west-pagination-container {
  position: relative;
  padding: 2rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

/* Ligne de connexion principale */
.west-pagination-line {
  position: absolute;
  top: 50%;
  left: 10%;
  right: 10%;
  height: 2px;
  background: repeating-linear-gradient(
    90deg,
    rgba(var(--color-accent-rgb, 194, 143, 44), 0.6) 0 12px,
    rgba(0, 0, 0, 0.25) 12px 13px
  );
  transform: translateY(-50%);
  opacity: 0.5;
}
.west-pagination {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 600px;
  padding: 0 1rem;
}

/* Boutons de navigation */
.west-pagination-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  font-family: var(--font-body, "Roboto Slab", serif);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--normal-text);
  background: rgba(32, 22, 15, 0.8);
  border: 1px solid rgba(var(--color-card-border-rgb, 194, 143, 44), 0.35);
  border-radius: 8px;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  min-width: fit-content;
  flex-shrink: 0;
  cursor: pointer;
}

/* Responsive pour les boutons */
@media (min-width: 640px) {
  .west-pagination-nav {
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
    border-radius: 12px;
  }
}
.west-pagination-nav:not(.disabled):hover {
  background: rgba(48, 32, 22, 0.9);
  border-color: rgba(var(--color-card-border-rgb, 194, 143, 44), 0.55);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  transform: translateY(-1px);
}

.west-pagination-nav.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background: rgba(0, 0, 0, 0.2);
}

.nav-icon {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.west-pagination-nav.prev:hover .nav-icon {
  transform: translateX(-2px);
}

.west-pagination-nav.next:hover .nav-icon {
  transform: translateX(2px);
}

.nav-text {
  font-weight: 500;
  transition: color 0.3s ease;
}

/* Centre spatial */
.west-pagination-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 120px;
  width: 100%;
  max-width: 220px;
}

@media (min-width: 640px) {
  .west-pagination-center {
    gap: 1rem;
    min-width: 200px;
    max-width: 320px;
  }
}

.pagination-display {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.5rem;
  background: rgba(32, 22, 15, 0.75);
  border: 1px solid rgba(var(--color-card-border-rgb, 194, 143, 44), 0.35);
  border-radius: 8px;
  backdrop-filter: blur(8px);
  position: relative;
  width: 100%;
  justify-content: center;
}

@media (min-width: 640px) {
  .pagination-display {
    gap: 1rem;
    padding: 1rem 1.5rem;
    border-radius: 16px;
  }
}

.current-page-indicator {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-number {
  font-family: var(--font-mono, "Space Mono", monospace);
  font-size: 1.125rem;
  font-weight: bold;
  color: var(--normal-text);
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.35);
  position: relative;
  z-index: 1;
}

@media (min-width: 640px) {
  .page-number {
    font-size: 1.5rem;
  }
}

.page-separator {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

@media (min-width: 640px) {
  .page-separator {
    gap: 0.5rem;
  }
}

.separator-brand {
  width: 36px;
  height: 10px;
  background: linear-gradient(
      90deg,
      transparent 0 4px,
      rgba(0, 0, 0, 0.25) 4px 5px,
      transparent 5px
    ),
    radial-gradient(100% 100% at 0 100%, rgba(0, 0, 0, 0.25), transparent 60%),
    radial-gradient(100% 100% at 100% 0, rgba(0, 0, 0, 0.25), transparent 60%),
    linear-gradient(
      180deg,
      rgba(var(--color-accent-rgb, 194, 143, 44), 0.7),
      rgba(var(--color-accent-rgb, 194, 143, 44), 0.5)
    );
  border-radius: 6px;
}

.total-pages {
  display: flex;
  align-items: center;
}

.total-number {
  font-family: var(--font-mono, "Space Mono", monospace);
  font-size: 1rem;
  color: var(--normal-text-muted);
  font-weight: 500;
}

@media (min-width: 640px) {
  .total-number {
    font-size: 1.25rem;
  }
}

/* Barre de progression */
.progress-container {
  width: 100%;
  max-width: 150px;
  padding: 0 0.25rem;
}

@media (min-width: 640px) {
  .progress-container {
    max-width: 300px;
    padding: 0 1rem;
  }
}

.progress-track {
  position: relative;
  width: 100%;
  height: 3px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  overflow: hidden;
}

@media (min-width: 640px) {
  .progress-track {
    height: 4px;
  }
}

.progress-fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(var(--color-accent-rgb, 194, 143, 44), 0.9),
    rgba(var(--color-primary-light-rgb, 164, 90, 42), 0.9)
  );
  border-radius: 2px;
  transition: width 0.5s ease;
  position: relative;
}

.progress-indicator {
  position: absolute;
  top: 50%;
  width: 8px;
  height: 8px;
  background: rgba(var(--color-accent-rgb, 194, 143, 44), 1);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  transition: left 0.5s ease;
}

/* Points de navigation */
.west-pagination-dots {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.5rem;
}

.west-dot {
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
  background: rgba(0, 0, 0, 0.35);
  border-radius: 50%;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.dot-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border: 1px solid rgba(var(--color-accent-rgb, 194, 143, 44), 0.4);
  border-radius: 50%;
  transition: all 0.3s ease;
  opacity: 0.3;
}

.west-dot.active .dot-core {
  background: rgba(var(--color-accent-rgb, 194, 143, 44), 0.9);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.35);
  transform: scale(1.2);
}

.west-dot.active .dot-ring {
  border-color: rgba(var(--color-accent-rgb, 194, 143, 44), 0.7);
  opacity: 0.8;
}

.west-dot.nearby .dot-core {
  background: rgba(var(--color-accent-rgb, 194, 143, 44), 0.6);
  transform: scale(1.1);
}

.west-dot:hover .dot-core {
  background: rgba(var(--color-accent-rgb, 194, 143, 44), 0.9);
  transform: scale(1.3);
}

.west-dot:hover .dot-ring {
  border-color: rgba(var(--color-accent-rgb, 194, 143, 44), 1);
  opacity: 1;
}

/* Responsive */
@media (max-width: 767px) {
  .west-pagination-container {
    padding: 1rem 0;
  }

  .west-pagination {
    padding: 0 0.5rem;
    gap: 0.5rem;
  }

  /* Sur mobile, garder les points mais les réduire */
  .west-pagination-dots {
    gap: 0.375rem;
  }

  .west-dot {
    width: 8px;
    height: 8px;
  }

  .dot-ring {
    width: 12px;
    height: 12px;
  }
}

@media (max-width: 479px) {
  .nav-text {
    display: none;
  }

  .west-pagination-nav {
    padding: 0.375rem;
    min-width: auto;
    gap: 0;
  }

  .west-pagination {
    gap: 0.375rem;
  }

  .pagination-display {
    padding: 0.25rem 0.375rem;
    gap: 0.25rem;
  }

  .progress-container {
    max-width: 120px;
    padding: 0 0.125rem;
  }

  .page-separator {
    gap: 0.125rem;
  }

  /* Masquer les points sur très petit écran pour économiser l'espace */
  .west-pagination-dots {
    display: none;
  }
}

/* Améliorer l'affichage sur tablets */
@media (min-width: 768px) and (max-width: 1023px) {
  .west-pagination {
    max-width: 500px;
  }

  .west-pagination-center {
    max-width: 300px;
  }
}
</style>
