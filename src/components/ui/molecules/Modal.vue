<template>
  <transition
    name="space-modal"
    @after-enter="onAfterEnter"
    @after-leave="onAfterLeave"
  >
    <div v-if="modelValue" class="fixed inset-0 z-[9999]">
      <!-- Arrière-plan optimisé avec CSS pur -->
      <div
        class="fixed inset-0 bg-black/80 space-modal-backdrop"
        @click="$emit('update:modelValue', false)"
      ></div>

      <!-- Conteneur de centrage sans scrollbar -->
      <div class="fixed inset-0 overflow-y-auto overscroll-contain">
        <div
          class="min-h-screen flex items-center justify-center p-4 py-16 sm:py-24"
        >
          <!-- Contenu modal -->
          <div
            ref="modalRef"
            :class="[
              'space-modal-container relative max-h-[85vh] overflow-y-auto',
              'rounded-lg bg-gray-900 z-10 w-full max-w-md',
              'border border-space-primary/30 shadow-xl shadow-space-primary/20',
              'transform transition-all space-modal-content',
              'overscroll-contain',
              className,
            ]"
            tabindex="-1"
            role="dialog"
            :aria-labelledby="title ? 'modal-title' : undefined"
            aria-modal="true"
            @click.stop
          >
            <!-- En-tête -->
            <div
              v-if="title || $slots.header"
              class="space-modal-header p-5 border-b border-space-primary/20 flex items-center justify-between sticky top-0 bg-gray-900 z-10"
            >
              <div v-if="$slots.header" class="modal-header-content">
                <slot name="header"></slot>
              </div>
              <h3
                v-else-if="title"
                id="modal-title"
                class="text-lg font-nasa text-space-text space-modal-title relative"
              >
                {{ title }}
              </h3>

              <!-- Bouton de fermeture -->
              <button
                v-if="!hideCloseButton"
                class="text-space-text-muted hover:text-space-primary transition-all focus:outline-none focus:ring-2 focus:ring-space-primary/50 rounded-full close-button"
                @click="$emit('update:modelValue', false)"
                aria-label="Fermer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="close-button-glow"></span>
              </button>
            </div>
            <!-- Corps -->
            <div class="space-modal-body p-5 relative z-1 bg-gray-900">
              <slot></slot>
            </div>

            <!-- Pied de page -->
            <div
              v-if="$slots.footer"
              class="space-modal-footer p-5 border-t border-space-primary/20 sticky bottom-0 bg-gray-900 z-10"
            >
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted, onMounted } from "vue";

interface Props {
  modelValue: boolean;
  title?: string;
  hideCloseButton?: boolean;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  hideCloseButton: false,
  className: "",
});

const emit = defineEmits(["update:modelValue", "after-enter", "after-leave"]);

// Fonction pour restaurer le scroll
const restoreScroll = () => {
  // Simplement rétablir le scroll normal
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
};

// Fermer la modale avec la touche Escape
const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === "Escape" && props.modelValue) {
    emit("update:modelValue", false);
  }
};

// Référence à l'élément modal
const modalRef = ref<HTMLElement | null>(null);

// Handlers pour les événements de transition
const onAfterEnter = () => {
  // Assurer que la modale est visible
  if (modalRef.value) {
    // Ne pas bloquer le scroll complètement, juste l'optimiser
    // Permet à l'utilisateur de scroll vers le modal si nécessaire

    // Forcer un z-index très élevé sur le conteneur racine de la modale
    const modalRoot = modalRef.value.closest(".fixed.inset-0");
    if (modalRoot && modalRoot instanceof HTMLElement) {
      modalRoot.style.zIndex = "9999";
    }

    // Focus sur la modale pour l'accessibilité
    modalRef.value.focus();
  }
  emit("after-enter");
};

const onAfterLeave = () => {
  // Réactiver le défilement du body
  restoreScroll();
  emit("after-leave");
};

// Nettoyage lors de la désactivation du composant
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      // Activer l'écouteur quand la modale est ouverte
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      // Désactiver l'écouteur et restaurer le scroll quand la modale est fermée
      document.removeEventListener("keydown", handleEscapeKey);
      restoreScroll();
    }
  }
);

// S'assurer que le scroll est rétabli si le composant est démonté
onUnmounted(() => {
  restoreScroll();
  document.removeEventListener("keydown", handleEscapeKey);
});

// Ajouter l'écouteur d'événements pour la touche Escape
onMounted(() => {
  document.addEventListener("keydown", handleEscapeKey);
});
</script>

<style scoped>
.space-modal-enter-active,
.space-modal-leave-active {
  transition: opacity 0.15s ease-out, transform 0.15s ease-out;
}

.space-modal-enter-from {
  opacity: 0;
  transform: scale(0.96);
}

.space-modal-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

/* Fond d'espace optimisé pour les performances */
.space-modal-backdrop {
  /* Fond simple et performant */
  background-color: rgba(0, 0, 0, 0.8);
}

/* Conteneur de la modale avec effet de lueur optimisé */
.space-modal-content {
  background-color: rgb(17, 24, 39); /* gray-900 solid */
  border: 1px solid rgba(var(--space-primary-rgb), 0.3);
  /* Animation de lueur simplifiée et réduite */
  box-shadow: 0 0 20px rgba(var(--space-primary-rgb), 0.15),
    0 0 40px rgba(var(--space-primary-rgb), 0.08);
}

/* Holographic scanline effect optimisé */
.holographic-effect {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(var(--space-primary-rgb), 0.02) 50%,
    transparent 100%
  );
  background-size: 100% 12px;
  opacity: 0.05; /* Réduit pour moins de distraction */
  pointer-events: none;
  z-index: 2;
}

/* Suppression des éléments décoratifs superflus pour la lisibilité */

/* Titre de la modale simplifié */
.space-modal-title {
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--space-text);
  position: relative;
  /* Suppression de l'animation pour plus de lisibilité */
}

/* Suppression des animations de titre pour la lisibilité */

/* Bouton de fermeture amélioré */
.close-button {
  position: relative;
  transition: all 0.3s ease;
  z-index: 5;
}

.close-button:hover {
  transform: rotate(90deg) scale(1.1);
  color: var(--space-primary-light);
}

.close-button-glow {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(var(--space-primary-rgb), 0.2),
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.close-button:hover .close-button-glow {
  opacity: 1;
}

/* Décorations améliorées */
.space-modal-decoration {
  position: absolute;
  width: 25px;
  height: 25px;
  opacity: 0.8;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  overflow: hidden;
}

.space-modal-decoration.top-left {
  top: 0;
  left: 0;
  border-top: 2px solid var(--space-primary);
  border-left: 2px solid var(--space-primary);
  border-top-left-radius: 8px;
}

.space-modal-decoration.top-right {
  top: 0;
  right: 0;
  border-top: 2px solid var(--space-primary);
  border-right: 2px solid var(--space-primary);
  border-top-right-radius: 8px;
}

.space-modal-decoration.bottom-left {
  bottom: 0;
  left: 0;
  border-bottom: 2px solid var(--space-primary);
  border-left: 2px solid var(--space-primary);
  border-bottom-left-radius: 8px;
}

.space-modal-decoration.bottom-right {
  bottom: 0;
  right: 0;
  border-bottom: 2px solid var(--space-primary);
  border-right: 2px solid var(--space-primary);
  border-bottom-right-radius: 8px;
}

.space-modal-container:hover .space-modal-decoration {
  width: 30px;
  height: 30px;
  border-color: var(--space-gold);
}

/* Animation pour les accents de coin */
.corner-accent {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: var(--space-primary-light);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s ease;
}

.top-left .corner-accent {
  top: -4px;
  left: -4px;
}

.top-right .corner-accent {
  top: -4px;
  right: -4px;
}

.bottom-left .corner-accent {
  bottom: -4px;
  left: -4px;
}

.bottom-right .corner-accent {
  bottom: -4px;
  right: -4px;
}

.space-modal-container:hover .corner-accent {
  opacity: 1;
  background-color: var(--space-gold);
  box-shadow: 0 0 10px 2px rgba(var(--space-gold-rgb), 0.5);
}

/* Grille futuriste optimisée */
.modal-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
      to right,
      rgba(var(--space-primary-rgb), 0.03) 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      rgba(var(--space-primary-rgb), 0.03) 1px,
      transparent 1px
    );
  background-size: 24px 24px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.3;
  animation: grid-gentle 10s infinite alternate ease-in-out;
}

@keyframes grid-gentle {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.35;
  }
}

/* Orbites décoratives optimisées */
.orbital-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed rgba(var(--space-primary-rgb), 0.2);
  pointer-events: none;
  z-index: 0;
  opacity: 0.4;
}

.orbital-ring-1 {
  width: 120px;
  height: 120px;
  top: -20px;
  right: -40px;
  animation: orbit-slow 30s linear infinite;
  border-color: rgba(var(--space-gold-rgb), 0.25);
}

.orbital-ring-2 {
  width: 100px;
  height: 100px;
  bottom: -20px;
  left: -40px;
  animation: orbit-slow 25s linear reverse infinite;
  border-color: rgba(var(--space-silver-rgb), 0.25);
}

.orbital-ring-3 {
  width: 140px;
  height: 140px;
  bottom: -40px;
  right: -50px;
  animation: orbit-slow 35s linear infinite;
  border-color: rgba(var(--space-bronze-rgb), 0.2);
}

@keyframes orbit-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Points orbitaux */
.orbital-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--space-primary);
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.orbital-dot.gold {
  background-color: var(--space-gold);
  box-shadow: 0 0 8px 2px rgba(var(--space-gold-rgb), 0.5);
}

.orbital-dot.silver {
  background-color: var(--space-silver);
  box-shadow: 0 0 8px 2px rgba(var(--space-silver-rgb), 0.5);
}

.orbital-dot.bronze {
  background-color: var(--space-bronze);
  box-shadow: 0 0 8px 2px rgba(var(--space-bronze-rgb), 0.5);
}

/* Bordure lumineuse optimisée */
.modal-glow-border {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s ease;
  box-shadow: 0 0 0 1px rgba(var(--space-primary-rgb), 0.25),
    0 0 12px 1px rgba(var(--space-primary-rgb), 0.15);
  z-index: 0;
}

.space-modal-container:hover .modal-glow-border {
  opacity: 1;
  animation: border-gentle-glow 6s infinite alternate ease-in-out;
}

@keyframes border-gentle-glow {
  0%,
  100% {
    box-shadow: 0 0 0 1px rgba(var(--space-primary-rgb), 0.25),
      0 0 12px 1px rgba(var(--space-primary-rgb), 0.15);
  }
  50% {
    box-shadow: 0 0 0 1px rgba(var(--space-gold-rgb), 0.3),
      0 0 15px 1px rgba(var(--space-gold-rgb), 0.18);
  }
}

/* Stylisation de la scrollbar */
.space-modal-container::-webkit-scrollbar {
  width: 6px;
}

.space-modal-container::-webkit-scrollbar-track {
  background: rgba(var(--space-bg-rgb), 0.2);
  border-radius: 0 4px 4px 0;
}

.space-modal-container::-webkit-scrollbar-thumb {
  background: linear-gradient(
    to bottom,
    rgba(var(--space-primary-rgb), 0.5),
    rgba(var(--space-gold-rgb), 0.5),
    rgba(var(--space-silver-rgb), 0.5),
    rgba(var(--space-bronze-rgb), 0.5)
  );
  border-radius: 3px;
}

.space-modal-container::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(
    to bottom,
    rgba(var(--space-primary-rgb), 0.7),
    rgba(var(--space-gold-rgb), 0.7),
    rgba(var(--space-silver-rgb), 0.7),
    rgba(var(--space-bronze-rgb), 0.7)
  );
}

/* Animations et effets pour le contenu de la modale */
.modal-header-content,
.space-modal-body,
.space-modal-footer {
  position: relative;
  z-index: 1;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* Ajout d'un fond de contraste pour les textes */
.space-modal-body {
  background-color: rgba(var(--space-bg-rgb), 0.4);
  border-radius: 4px;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.2);
}

/* Amélioration pour la navigation tactile (mobile) */
@media (max-width: 768px) {
  .space-modal-container {
    -webkit-overflow-scrolling: touch;
    max-height: 80vh !important; /* Réduire légèrement la hauteur sur mobile pour une meilleure visibilité */
    width: 90%;
  }

  .orbital-ring-3 {
    display: none; /* Masquer la troisième orbite sur mobile pour plus de légèreté */
  }

  .holographic-effect {
    opacity: 0.2; /* Réduire l'opacité de l'effet holographique sur mobile */
  }

  .floating-particle {
    display: none; /* Masquer les particules sur mobile pour améliorer les performances */
  }

  .space-modal-decoration {
    width: 15px;
    height: 15px;
  }
}

/* Animation de bienvenue simplifiée pour la modale */
@keyframes welcome-pulse {
  0% {
    transform: scale(0.98);
  }
  50% {
    transform: scale(1.01);
  }
  100% {
    transform: scale(1);
  }
}

.space-modal-enter-active .space-modal-container {
  animation: welcome-pulse 0.4s ease-out;
}

/* Overlay de contraste pour améliorer la lisibilité */
.modal-contrast-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    transparent 30%,
    rgba(0, 0, 0, 0.2) 100%
  );
  pointer-events: none;
  z-index: 1;
  opacity: 0.5;
}
</style>
