<template>
  <div class="space-pagination-container relative">
    <!-- Orbite -->
    <div class="space-pagination-orbit"></div>

    <div class="space-pagination flex items-center justify-between">
      <!-- Bouton précédent -->
      <button
        @click="handlePrevPage"
        :disabled="currentPage === 1"
        :class="[
          'space-pagination-button prev',
          { disabled: currentPage === 1 },
        ]"
        :aria-label="prevLabel"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        <span>{{ prevLabel }}</span>
      </button>

      <!-- Pages -->
      <div class="space-pagination-pages">
        <!-- Affichage du compteur de pages -->
        <div class="space-pagination-counter">
          <span class="current">{{ currentPage }}</span>
          <span class="divider">/</span>
          <span class="total">{{ totalPages }}</span>
        </div>

        <!-- Points pour la navigation (si nécessaire) -->
        <div v-if="showDots" class="space-pagination-dots">
          <button
            v-for="pageNum in displayedPages"
            :key="pageNum"
            @click="handlePageSelect(pageNum)"
            :class="[
              'space-pagination-dot',
              { active: currentPage === pageNum },
            ]"
            :aria-label="`Aller à la page ${pageNum}`"
            :aria-current="currentPage === pageNum ? 'page' : undefined"
          ></button>
        </div>
      </div>

      <!-- Bouton suivant -->
      <button
        @click="handleNextPage"
        :disabled="currentPage === totalPages"
        :class="[
          'space-pagination-button next',
          { disabled: currentPage === totalPages },
        ]"
        :aria-label="nextLabel"
      >
        <span>{{ nextLabel }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
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
</script>

<style scoped>
.space-pagination-container {
  position: relative;
  padding: 1rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.space-pagination {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 500px;
}

/* Orbite en arrière-plan */
.space-pagination-orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--space-bg-light) 30%,
    var(--space-bg-light) 70%,
    transparent 100%
  );
  border-radius: 50%;
  z-index: 0;
  opacity: 0.5;
  overflow: hidden;
}

.space-pagination-orbit::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 20%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--space-primary) 50%,
    transparent 100%
  );
  animation: orbit-travel 3s linear infinite;
}

@keyframes orbit-travel {
  0% {
    left: -20%;
  }
  100% {
    left: 120%;
  }
}

/* Boutons de pagination */
.space-pagination-button {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-family: "Orbitron", sans-serif;
  font-size: 0.875rem;
  color: var(--space-text);
  background-color: transparent;
  border: 1px solid rgba(109, 40, 217, 0.3);
  border-radius: 9999px;
  transition: all 0.3s ease;
  min-width: 100px;
  justify-content: center;
}

.space-pagination-button.prev {
  padding-left: 0.75rem;
}

.space-pagination-button.next {
  padding-right: 0.75rem;
}

.space-pagination-button:not(.disabled):hover {
  background-color: rgba(109, 40, 217, 0.1);
  border-color: var(--space-primary);
  box-shadow: 0 0 10px rgba(109, 40, 217, 0.3);
}

.space-pagination-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.space-pagination-button svg {
  transition: transform 0.3s ease;
}

.space-pagination-button.prev:hover svg {
  transform: translateX(-2px);
}

.space-pagination-button.next:hover svg {
  transform: translateX(2px);
}

/* Compteur de pages */
.space-pagination-counter {
  display: flex;
  align-items: center;
  font-family: "Space Mono", monospace;
  font-size: 0.875rem;
  color: var(--space-text-muted);
}

.space-pagination-counter .current {
  color: var(--space-text);
  font-weight: bold;
}

.space-pagination-counter .divider {
  margin: 0 0.25rem;
}

/* Points de navigation */
.space-pagination-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.space-pagination-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--space-bg-light);
  border: 1px solid rgba(109, 40, 217, 0.5);
  transition: all 0.3s ease;
}

.space-pagination-dot.active {
  background-color: var(--space-primary);
  transform: scale(1.2);
  box-shadow: 0 0 10px rgba(109, 40, 217, 0.7);
}

/* Responsive */
@media (max-width: 640px) {
  .space-pagination-button {
    min-width: auto;
  }

  .space-pagination-button span {
    display: none;
  }
}
</style>
