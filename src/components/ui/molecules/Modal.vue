<template>
  <transition
    name="west-modal"
    @after-enter="onAfterEnter"
    @after-leave="onAfterLeave"
  >
    <div v-if="modelValue" class="fixed inset-0 z-[9999]">
      <!-- Arrière-plan optimisé avec CSS pur -->
      <div
        class="fixed inset-0 west-modal-backdrop"
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
              'west-modal-container relative max-h-[85vh] overflow-y-auto',
              'rounded-lg z-10 w-full max-w-md',
              'border shadow-xl',
              'transform transition-all west-modal-content',
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
              class="west-modal-header p-5 border-b flex items-center justify-between sticky top-0 z-10"
            >
              <div v-if="$slots.header" class="modal-header-content">
                <slot name="header"></slot>
              </div>
              <h3
                v-else-if="title"
                id="modal-title"
                class="text-lg west-modal-title text-normal-text relative"
              >
                {{ title }}
              </h3>

              <!-- Bouton de fermeture -->
              <button
                v-if="!hideCloseButton"
                class="text-normal-text-muted hover:text-color-primary transition-all focus:outline-none focus:ring-2 focus:ring-color-primary/50 rounded-full close-button"
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
            <div class="west-modal-body p-5 relative z-1">
              <slot></slot>
            </div>

            <!-- Pied de page -->
            <div
              v-if="$slots.footer"
              class="west-modal-footer p-5 border-t sticky bottom-0 z-10"
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

// Declare known slots for better TS/volar support
defineSlots<{
  default?: () => any;
  header?: () => any;
  footer?: () => any;
}>();

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
/* Transitions */
.west-modal-enter-active,
.west-modal-leave-active {
  transition: opacity 0.18s ease-out, transform 0.2s ease-out;
}

.west-modal-enter-from {
  opacity: 0;
  transform: translateY(6px) scale(0.98);
}

.west-modal-leave-to {
  opacity: 0;
  transform: translateY(4px) scale(0.99);
}

/* Backdrop */
.west-modal-backdrop {
  background: radial-gradient(
      70% 60% at 50% 40%,
      rgba(0, 0, 0, 0.65),
      rgba(0, 0, 0, 0.8)
    ),
    linear-gradient(180deg, rgba(40, 26, 12, 0.25), rgba(24, 16, 10, 0.25));
}

/* Container */
.west-modal-content {
  /* Dark leather background */
  background: radial-gradient(
      120% 80% at 0% 0%,
      rgba(255, 200, 120, 0.03),
      transparent 60%
    ),
    radial-gradient(
      100% 60% at 100% 0%,
      rgba(255, 220, 160, 0.025),
      transparent 55%
    ),
    linear-gradient(180deg, rgba(42, 28, 18, 0.98), rgba(32, 22, 15, 0.98));
  border: 1px solid rgba(0, 0, 0, 0.35);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03),
    0 2px 8px rgba(0, 0, 0, 0.35), 0 16px 40px rgba(0, 0, 0, 0.3);
  /* Light text on dark */
  color: rgba(252, 247, 240, 0.95);
}

.west-modal-content::before {
  /* Rope edge */
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background: repeating-linear-gradient(
    45deg,
    rgba(var(--color-accent-rgb, 210, 160, 80), 0.18) 0,
    rgba(var(--color-accent-rgb, 210, 160, 80), 0.18) 2px,
    transparent 2px,
    transparent 6px
  );
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  padding: 2px;
  border: 0 solid transparent;
  opacity: 0.45;
}

/* Header */
.west-modal-header {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0.12));
  border-color: rgba(255, 255, 255, 0.08);
  color: rgba(252, 247, 240, 0.98);
}

.west-modal-title {
  font-family: var(--font-display, "Rye", serif);
  letter-spacing: 0.04em;
  color: rgba(252, 247, 240, 0.98);
}

/* Close button */
.close-button {
  position: relative;
  transition: all 0.3s ease;
  z-index: 5;
  cursor: pointer;
}

.close-button:hover {
  transform: scale(1.06);
  color: var(--color-primary);
}

.close-button-glow {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(var(--color-accent-rgb, 210, 160, 80), 0.28),
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.close-button:hover .close-button-glow {
  opacity: 1;
}

/* Scrollbar (subtle) */
.west-modal-container::-webkit-scrollbar {
  width: 6px;
}

.west-modal-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.06);
  border-radius: 0 4px 4px 0;
}

.west-modal-container::-webkit-scrollbar-thumb {
  background: rgba(var(--color-accent-rgb, 210, 160, 80), 0.5);
  border-radius: 3px;
}

/* Content z-index helpers */
.modal-header-content,
.west-modal-body,
.west-modal-footer {
  position: relative;
  z-index: 1;
}

/* Body light inset for separation */
.west-modal-body {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.03),
    rgba(255, 255, 255, 0.015)
  );
  border-radius: 4px;
  color: rgba(252, 247, 240, 0.94);
}

/* Improve contrast for utility classes inside the modal */
.west-modal-content .text-normal-text-muted {
  color: rgba(252, 247, 240, 0.7);
}

.west-modal-content .text-normal-text {
  color: rgba(252, 247, 240, 0.95);
}

/* Links inside modal */

.west-modal-content a {
  color: rgba(255, 208, 120, 0.95);
  text-underline-offset: 2px;
}

.west-modal-content a:hover {
  text-decoration: underline;
}

/* Mobile tweaks */
@media (max-width: 768px) {
  .west-modal-container {
    -webkit-overflow-scrolling: touch;
    max-height: 80vh !important;
    width: 90%;
  }
}
</style>
