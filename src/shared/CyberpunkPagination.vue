<!-- filepath: d:\Dev\ACS\acs-frontend\src\shared\CyberpunkPagination.vue -->
<template>
  <div v-if="totalPages > 1" class="cyberpunk-pagination">
    <!-- Ligne décorative supérieure -->
    <div class="pagination-line-top"></div>

    <!-- Navigation principale -->
    <div class="pagination-controls">
      <!-- Bouton précédent -->
      <button
        @click="onPrevPage"
        :disabled="currentPage === 1"
        class="cyberpunk-btn-cyan pagination-button"
        :class="{ disabled: currentPage === 1 }"
        aria-label="Page précédente"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-1"
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

      <!-- Affichage page courante / total -->
      <div class="pagination-counter">
        <span class="page-current">{{ currentPage }}</span>
        <span class="page-separator">/</span>
        <span class="page-total">{{ totalPages }}</span>
      </div>

      <!-- Bouton suivant -->
      <button
        @click="onNextPage"
        :disabled="currentPage === totalPages"
        class="cyberpunk-btn-cyan pagination-button"
        :class="{ disabled: currentPage === totalPages }"
        aria-label="Page suivante"
      >
        <span>{{ nextLabel }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 ml-1"
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

    <!-- Puces pour navigation rapide (optionnel) -->
    <div v-if="showDots" class="pagination-dots">
      <button
        v-for="pageNum in visiblePages"
        :key="pageNum"
        @click="onPageSelect(pageNum)"
        :class="['pagination-dot', { active: currentPage === pageNum }]"
        :aria-label="`Aller à la page ${pageNum}`"
        :aria-current="currentPage === pageNum ? 'page' : undefined"
      ></button>
    </div>

    <!-- Ligne décorative inférieure -->
    <div class="pagination-line-bottom"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Props avec valeurs par défaut et validation
const props = defineProps({
  // Pagination core
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },

  // Labels customizables
  prevLabel: {
    type: String,
    default: "Précédent",
  },
  nextLabel: {
    type: String,
    default: "Suivant",
  },

  // Options d'affichage
  color: {
    type: String,
    default: "cyan",
    validator: (value: string) =>
      ["cyan", "purple", "pink", "green"].includes(value),
  },
  showDots: {
    type: Boolean,
    default: false,
  },
  maxVisibleDots: {
    type: Number,
    default: 7,
  },
});

// Événements émis
const emit = defineEmits(["prev-page", "next-page", "page-select"]);

// Calculer les pages à afficher pour les dots
const visiblePages = computed(() => {
  if (props.totalPages <= props.maxVisibleDots) {
    // Si le nombre total est inférieur au max, afficher toutes les pages
    return Array.from({ length: props.totalPages }, (_, i) => i + 1);
  } else {
    const result = [];
    const currentPage = props.currentPage;
    const totalPages = props.totalPages;

    // Toujours afficher la première page
    result.push(1);

    // Calculer les pages à afficher autour de la page actuelle
    const leftSide = Math.floor((props.maxVisibleDots - 3) / 2);
    const rightSide = Math.ceil((props.maxVisibleDots - 3) / 2);

    if (currentPage <= leftSide + 1) {
      // Proche du début, ne pas utiliser d'ellipsis gauche
      for (let i = 2; i <= props.maxVisibleDots - 1; i++) {
        result.push(i);
      }
      result.push(totalPages);
    } else if (currentPage >= totalPages - rightSide) {
      // Proche de la fin, ne pas utiliser d'ellipsis droite
      result.push("...");
      for (
        let i = totalPages - (props.maxVisibleDots - 2);
        i < totalPages;
        i++
      ) {
        result.push(i);
      }
    } else {
      // Au milieu, utiliser des ellipsis des deux côtés
      result.push("...");
      for (
        let i = currentPage - leftSide + 1;
        i <= currentPage + rightSide - 1;
        i++
      ) {
        if (i > 1 && i < totalPages) {
          result.push(i);
        }
      }
      result.push("...");
      result.push(totalPages);
    }

    return result;
  }
});

// Méthodes
const onPrevPage = () => {
  if (props.currentPage > 1) {
    emit("prev-page");
  }
};

const onNextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit("next-page");
  }
};

const onPageSelect = (page: number | string) => {
  if (typeof page === "number") {
    emit("page-select", page);
  }
};
</script>

<style scoped>
.cyberpunk-pagination {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: relative;
  padding: 1rem 0;
  width: 100%;
}

.pagination-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  z-index: 1;
}

.pagination-button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Orbitron", sans-serif;
  font-size: 0.85rem;
  padding: 0.35rem 0.75rem;
  border-radius: 0.375rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Animation de scan de ligne */
.pagination-button::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 40%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(6, 182, 212, 0.2),
    transparent
  );
  pointer-events: none;
  transition: 0.3s ease;
  opacity: 0;
}

.pagination-button:not(:disabled):hover::after {
  left: 100%;
  opacity: 1;
  transition: 0.5s ease;
}

/* Puces de pagination */
.pagination-dots {
  display: flex;
  gap: 0.375rem;
  margin-top: 0.25rem;
}

.pagination-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(6, 182, 212, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-dot:hover {
  background-color: rgba(6, 182, 212, 0.6);
  box-shadow: 0 0 5px rgba(6, 182, 212, 0.6);
}

.pagination-dot.active {
  background-color: #06b6d4;
  box-shadow: 0 0 8px rgba(6, 182, 212, 0.8);
  transform: scale(1.3);
}

/* Lignes décoratives */
.pagination-line-top,
.pagination-line-bottom {
  position: absolute;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(6, 182, 212, 0.7) 30%,
    rgba(6, 182, 212, 0.7) 70%,
    transparent
  );
  width: 80%;
  left: 10%;
}

.pagination-line-top {
  top: 0;
}

.pagination-line-bottom {
  bottom: 0;
}

/* Compteur de pages */
.pagination-counter {
  font-family: "Orbitron", sans-serif;
  display: flex;
  gap: 0.25rem;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background-color: rgba(15, 23, 42, 0.7);
  border-radius: 0.25rem;
  position: relative;
}

.pagination-counter::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 4px;
  border-top: 1px solid #06b6d4;
  border-left: 1px solid #06b6d4;
}

.pagination-counter::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 4px;
  height: 4px;
  border-bottom: 1px solid #06b6d4;
  border-right: 1px solid #06b6d4;
}

.page-current {
  color: #06b6d4;
  font-weight: bold;
  margin: 0 0.125rem;
}

.page-separator {
  color: rgba(203, 213, 225, 0.6);
}

.page-total {
  color: rgba(203, 213, 225, 0.8);
}

/* Adaptations au thème de couleur (supports multiples couleurs) */
.pagination-button.cyberpunk-btn-purple::after {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(139, 92, 246, 0.2),
    transparent
  );
}

.pagination-button.cyberpunk-btn-pink::after {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(236, 72, 153, 0.2),
    transparent
  );
}

.pagination-button.cyberpunk-btn-green::after {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(16, 185, 129, 0.2),
    transparent
  );
}

/* Ajustements pour les mobiles */
@media (max-width: 640px) {
  .pagination-button {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }

  .pagination-counter {
    padding: 0.2rem 0.5rem;
    font-size: 0.85rem;
  }

  .pagination-dot {
    width: 6px;
    height: 6px;
  }
}
</style>
