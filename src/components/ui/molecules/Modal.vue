<template>
  <transition
    name="space-modal"
    @after-enter="onAfterEnter"
    @after-leave="onAfterLeave"
  >
    <div v-if="modelValue" class="fixed inset-0 z-[9999]">
      <!-- Arrière-plan avec étoiles -->
      <div
        class="fixed inset-0 bg-space-bg/90 backdrop-blur-sm"
        @click="$emit('update:modelValue', false)"
      >
        <div
          v-for="n in 20"
          :key="`star-${n}`"
          class="modal-star"
          :style="{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            animationDelay: `${Math.random() * 5}s`,
          }"
        ></div>
      </div>
      <!-- Conteneur de centrage sans scrollbar -->
      <div
        class="fixed inset-0 flex items-center justify-center p-4 overflow-hidden overscroll-contain"
      >
        <!-- Contenu modal -->
        <div
          ref="modalRef"
          :class="[
            'space-modal-container relative max-h-[90vh] overflow-auto',
            'rounded-lg bg-space-bg-light z-10 w-full max-w-md',
            'border border-space-primary/20 shadow-xl',
            'transform transition-all',
            'overscroll-contain',
            className,
          ]"
          @click.stop
        >
          <!-- En-tête -->
          <div
            v-if="title || $slots.header"
            class="space-modal-header p-5 border-b border-space-bg flex items-center justify-between sticky top-0 bg-space-bg-light z-10"
          >
            <div v-if="$slots.header">
              <slot name="header"></slot>
            </div>
            <h3 v-else-if="title" class="text-lg font-heading text-space-text">
              {{ title }}
            </h3>

            <!-- Bouton de fermeture -->
            <button
              v-if="!hideCloseButton"
              class="text-space-text-muted hover:text-space-text transition-colors focus:outline-none focus:ring-2 focus:ring-space-primary/50 rounded-full"
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
            </button>
          </div>

          <!-- Corps -->
          <div class="space-modal-body p-5">
            <slot></slot>
          </div>

          <!-- Pied de page -->
          <div
            v-if="$slots.footer"
            class="space-modal-footer p-5 border-t border-space-bg sticky bottom-0 bg-space-bg-light z-10"
          >
            <slot name="footer"></slot>
          </div>

          <!-- Éléments décoratifs -->
          <div class="space-modal-decoration top-left"></div>
          <div class="space-modal-decoration top-right"></div>
          <div class="space-modal-decoration bottom-left"></div>
          <div class="space-modal-decoration bottom-right"></div>
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
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
};

// Fermer la modale avec la touche Escape
const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === "Escape" && props.modelValue) {
    emit("update:modelValue", false);
  }
};

// Référence à l'élément modal
const modalRef = ref<HTMLElement | null>(null); // Handlers pour les événements de transition
const onAfterEnter = () => {
  // Assurer que la modale est visible en la plaçant au centre de l'écran
  if (modalRef.value) {
    // Désactiver le défilement du body
    document.documentElement.style.overflow = "hidden"; // Appliquer à html
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "0px"; // Empêcher le décalage dû à la disparition de la barre de défilement

    // Forcer un z-index très élevé sur le conteneur racine de la modale
    const modalRoot = modalRef.value.closest(".fixed.inset-0");
    if (modalRoot && modalRoot instanceof HTMLElement) {
      modalRoot.style.zIndex = "9999";
    }

    // Si la modale est plus haute que la fenêtre, s'assurer qu'elle est bien positionnée
    if (modalRef.value.scrollHeight > window.innerHeight) {
      modalRef.value.style.maxHeight = "90vh";
    }
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
  transition: all 0.3s ease;
}

.space-modal-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.space-modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  animation: twinkle 5s ease-in-out infinite;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.3;
  }
}

.space-modal-decoration {
  position: absolute;
  width: 15px;
  height: 15px;
}

.space-modal-decoration.top-left {
  top: 0;
  left: 0;
  border-top: 2px solid var(--space-primary);
  border-left: 2px solid var(--space-primary);
}

.space-modal-decoration.top-right {
  top: 0;
  right: 0;
  border-top: 2px solid var(--space-primary);
  border-right: 2px solid var(--space-primary);
}

.space-modal-decoration.bottom-left {
  bottom: 0;
  left: 0;
  border-bottom: 2px solid var(--space-primary);
  border-left: 2px solid var(--space-primary);
}

.space-modal-decoration.bottom-right {
  bottom: 0;
  right: 0;
  border-bottom: 2px solid var(--space-primary);
  border-right: 2px solid var(--space-primary);
}

/* Stylisation de la scrollbar à l'intérieur de la modale uniquement */
.space-modal-container::-webkit-scrollbar {
  width: 6px;
}

.space-modal-container::-webkit-scrollbar-track {
  background: rgba(var(--space-bg-rgb), 0.2);
  border-radius: 0 4px 4px 0;
}

.space-modal-container::-webkit-scrollbar-thumb {
  background-color: rgba(var(--space-primary-rgb), 0.5);
  border-radius: 3px;
}

.space-modal-container::-webkit-scrollbar-thumb:hover {
  background-color: rgba(var(--space-primary-rgb), 0.7);
}

/* Amélioration pour la navigation tactile (mobile) */
@media (max-width: 768px) {
  .space-modal-container {
    -webkit-overflow-scrolling: touch;
    max-height: 80vh !important; /* Réduire légèrement la hauteur sur mobile pour une meilleure visibilité */
  }
}
</style>
