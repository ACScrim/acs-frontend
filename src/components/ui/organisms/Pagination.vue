<template>
  <div class="space-pagination-container relative">
    <!-- Fond spatial avec particules -->
    <div class="space-pagination-background">
      <div class="space-particle particle-1"></div>
      <div class="space-particle particle-2"></div>
      <div class="space-particle particle-3"></div>
    </div>

    <!-- Ligne de connexion principale -->
    <div class="space-pagination-line"></div>
    <div
      class="space-pagination flex items-center justify-center gap-2 sm:gap-4"
    >
      <!-- Bouton précédent -->
      <button
        @click="handlePrevPage"
        :disabled="currentPage === 1"
        :class="['space-pagination-nav prev', { disabled: currentPage === 1 }]"
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
      <div class="space-pagination-center flex-1">
        <div class="pagination-display">
          <!-- Indicateur de page actuelle -->
          <div class="current-page-indicator">
            <span class="page-number">{{
              String(currentPage).padStart(2, "0")
            }}</span>
            <div class="page-glow"></div>
          </div>

          <!-- Séparateur spatial -->
          <div class="page-separator">
            <div class="separator-line"></div>
            <div class="separator-dot"></div>
            <div class="separator-line"></div>
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
        <div v-if="showDots && totalPages > 3" class="space-pagination-dots">
          <button
            v-for="pageNum in displayedPages"
            :key="pageNum"
            @click="handlePageSelect(pageNum)"
            :class="[
              'space-dot',
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
          'space-pagination-nav next',
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
.space-pagination-container {
  position: relative;
  padding: 2rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

/* Fond spatial avec particules */
.space-pagination-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    ellipse at center,
    rgba(109, 40, 217, 0.05) 0%,
    transparent 70%
  );
  overflow: hidden;
}

.space-particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: var(--color-primary);
  border-radius: 50%;
  opacity: 0.6;
  animation: float 6s ease-in-out infinite;
}

.particle-1 {
  top: 20%;
  left: 15%;
  animation-delay: 0s;
}

.particle-2 {
  top: 70%;
  right: 20%;
  animation-delay: 2s;
}

.particle-3 {
  top: 40%;
  right: 40%;
  animation-delay: 4s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-10px) scale(1.2);
    opacity: 1;
  }
}

/* Ligne de connexion principale */
.space-pagination-line {
  position: absolute;
  top: 50%;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--background-bg-light) 20%,
    var(--color-primary) 50%,
    var(--background-bg-light) 80%,
    transparent 100%
  );
  transform: translateY(-50%);
  opacity: 0.4;
}

.space-pagination {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 600px;
  padding: 0 1rem;
}

/* Boutons de navigation */
.space-pagination-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  font-family: "Orbitron", sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--normal-text);
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(109, 40, 217, 0.3);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  min-width: fit-content;
  flex-shrink: 0;
}

/* Responsive pour les boutons */
@media (min-width: 640px) {
  .space-pagination-nav {
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
    border-radius: 12px;
  }
}

.space-pagination-nav::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(109, 40, 217, 0.1) 50%,
    transparent 100%
  );
  transition: left 0.5s ease;
}

.space-pagination-nav:not(.disabled):hover::before {
  left: 100%;
}

.space-pagination-nav:not(.disabled):hover {
  background: rgba(109, 40, 217, 0.15);
  border-color: var(--color-primary);
  box-shadow: 0 0 20px rgba(109, 40, 217, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.space-pagination-nav.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background: rgba(0, 0, 0, 0.2);
}

.nav-icon {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.space-pagination-nav.prev:hover .nav-icon {
  transform: translateX(-2px);
}

.space-pagination-nav.next:hover .nav-icon {
  transform: translateX(2px);
}

.nav-text {
  font-weight: 500;
  transition: color 0.3s ease;
}

/* Centre spatial */
.space-pagination-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 120px;
  width: 100%;
  max-width: 220px;
}

@media (min-width: 640px) {
  .space-pagination-center {
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
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(109, 40, 217, 0.3);
  border-radius: 8px;
  backdrop-filter: blur(15px);
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

.pagination-display::before {
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
    var(--color-primary)
  );
  background-size: 200% 200%;
  border-radius: 16px;
  opacity: 0.3;
  z-index: -1;
  animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.current-page-indicator {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-number {
  font-family: "Space Mono", monospace;
  font-size: 1.125rem;
  font-weight: bold;
  color: var(--color-primary);
  text-shadow: 0 0 10px rgba(109, 40, 217, 0.5);
  position: relative;
  z-index: 1;
}

@media (min-width: 640px) {
  .page-number {
    font-size: 1.5rem;
  }
}

.page-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2rem;
  height: 2rem;
  background: radial-gradient(
    circle,
    rgba(109, 40, 217, 0.2) 0%,
    transparent 70%
  );
  border-radius: 50%;
  animation: pulse-glow 2s ease-in-out infinite;
}

@media (min-width: 640px) {
  .page-glow {
    width: 3rem;
    height: 3rem;
  }
}

@keyframes pulse-glow {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.8;
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

.separator-line {
  width: 12px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--background-bg-light) 50%,
    transparent 100%
  );
}

@media (min-width: 640px) {
  .separator-line {
    width: 20px;
  }
}

.separator-dot {
  width: 3px;
  height: 3px;
  background: var(--color-primary);
  border-radius: 50%;
  animation: dot-pulse 1.5s ease-in-out infinite;
}

@media (min-width: 640px) {
  .separator-dot {
    width: 4px;
    height: 4px;
  }
}

@keyframes dot-pulse {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
}

.total-pages {
  display: flex;
  align-items: center;
}

.total-number {
  font-family: "Space Mono", monospace;
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
  background: rgba(109, 40, 217, 0.1);
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
    var(--color-primary) 0%,
    var(--color-secondary) 50%,
    var(--color-primary) 100%
  );
  border-radius: 2px;
  transition: width 0.5s ease;
  position: relative;
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
  animation: shimmer 2s linear infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.progress-indicator {
  position: absolute;
  top: 50%;
  width: 8px;
  height: 8px;
  background: var(--color-primary);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px rgba(109, 40, 217, 0.8);
  transition: left 0.5s ease;
}

/* Points de navigation */
.space-pagination-dots {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.5rem;
}

.space-dot {
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
  background: var(--background-bg-light);
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
  border: 1px solid transparent;
  border-radius: 50%;
  transition: all 0.3s ease;
  opacity: 0;
}

.space-dot.active .dot-core {
  background: var(--color-primary);
  box-shadow: 0 0 10px rgba(109, 40, 217, 0.8);
  transform: scale(1.2);
}

.space-dot.active .dot-ring {
  border-color: rgba(109, 40, 217, 0.5);
  opacity: 1;
  animation: ring-pulse 2s ease-in-out infinite;
}

.space-dot.nearby .dot-core {
  background: rgba(109, 40, 217, 0.6);
  transform: scale(1.1);
}

.space-dot:hover .dot-core {
  background: var(--color-primary);
  transform: scale(1.3);
}

.space-dot:hover .dot-ring {
  border-color: var(--color-primary);
  opacity: 1;
}

@keyframes ring-pulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.3);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 767px) {
  .space-pagination-container {
    padding: 1rem 0;
  }

  .space-pagination {
    padding: 0 0.5rem;
    gap: 0.5rem;
  }

  /* Sur mobile, garder les points mais les réduire */
  .space-pagination-dots {
    gap: 0.375rem;
  }

  .space-dot {
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

  .space-pagination-nav {
    padding: 0.375rem;
    min-width: auto;
    gap: 0;
  }

  .space-pagination {
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

  .separator-line {
    width: 6px;
  }

  /* Masquer les points sur très petit écran pour économiser l'espace */
  .space-pagination-dots {
    display: none;
  }
}

/* Améliorer l'affichage sur tablets */
@media (min-width: 768px) and (max-width: 1023px) {
  .space-pagination {
    max-width: 500px;
  }

  .space-pagination-center {
    max-width: 300px;
  }
}
</style>
