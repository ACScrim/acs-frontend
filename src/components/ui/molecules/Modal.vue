<template>
  <transition
    name="space-modal"
    @after-enter="onAfterEnter"
    @after-leave="onAfterLeave"
  >
    <div v-if="modelValue" class="fixed inset-0 z-[9999]">
      <!-- Arrière-plan optimisé avec CSS pur -->
      <div
        class="fixed inset-0 bg-space-bg/90 backdrop-blur space-modal-backdrop"
        @click="$emit('update:modelValue', false)"
      >
        <!-- Fond spatial en CSS pur (plus rapide) -->
        <div class="space-background"></div>
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
            'rounded-lg bg-space-bg-light/98 z-10 w-full max-w-md',
            'border border-space-primary/30 shadow-xl shadow-space-primary/20',
            'transform transition-all space-modal-content',
            'overscroll-contain backdrop-blur-md',
            className,
          ]"
          @click.stop
        >
          <!-- Holographic scanline effect -->
          <div class="holographic-effect"></div>

          <!-- En-tête -->
          <div
            v-if="title || $slots.header"
            class="space-modal-header p-5 border-b border-space-primary/20 flex items-center justify-between sticky top-0 bg-space-bg-light/98 backdrop-blur-md z-10"
          >
            <div v-if="$slots.header" class="modal-header-content">
              <slot name="header"></slot>
            </div>
            <h3
              v-else-if="title"
              class="text-lg font-nasa text-space-text space-modal-title relative"
            >
              {{ title }}
              <div class="title-underline"></div>
              <div class="title-glow"></div>
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
          <div class="space-modal-body p-5 relative z-1">
            <slot></slot>
          </div>

          <!-- Pied de page -->
          <div
            v-if="$slots.footer"
            class="space-modal-footer p-5 border-t border-space-primary/20 sticky bottom-0 bg-space-bg-light/98 backdrop-blur-md z-10"
          >
            <slot name="footer"></slot>
          </div>

          <!-- Éléments décoratifs améliorés -->
          <div class="space-modal-decoration top-left">
            <div class="corner-accent"></div>
          </div>
          <div class="space-modal-decoration top-right">
            <div class="corner-accent"></div>
          </div>
          <div class="space-modal-decoration bottom-left">
            <div class="corner-accent"></div>
          </div>
          <div class="space-modal-decoration bottom-right">
            <div class="corner-accent"></div>
          </div>

          <!-- Effet de grille futuriste -->
          <div class="modal-grid"></div>

          <!-- Orbites décoratives améliorées -->
          <div class="orbital-ring orbital-ring-1">
            <div class="orbital-dot gold"></div>
          </div>
          <div class="orbital-ring orbital-ring-2">
            <div class="orbital-dot silver"></div>
          </div>
          <div class="orbital-ring orbital-ring-3">
            <div class="orbital-dot bronze"></div>
          </div>

          <!-- Bordure lumineuse -->
          <div class="modal-glow-border"></div>

          <!-- Overlay de contraste pour améliorer la lisibilité -->
          <div class="modal-contrast-overlay"></div>
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
const modalRef = ref<HTMLElement | null>(null);

// Handlers pour les événements de transition
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
  overflow: hidden;
  position: relative;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Fond spatial ultra-optimisé */
.space-background {
  position: absolute;
  inset: 0;
  background: 
    /* Nébuleuse simple mais efficace */ radial-gradient(
      ellipse at 25% 30%,
      rgba(var(--space-primary-rgb), 0.12) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 75% 70%,
      rgba(var(--space-gold-rgb), 0.08) 0%,
      transparent 40%
    ),
    /* Étoiles minimalistes */
      radial-gradient(1px 1px at 15% 20%, rgba(255, 255, 255, 0.8), transparent),
    radial-gradient(
      1px 1px at 85% 10%,
      rgba(var(--space-gold-rgb), 0.7),
      transparent
    ),
    radial-gradient(
      1px 1px at 45% 80%,
      rgba(var(--space-silver-rgb), 0.6),
      transparent
    ),
    radial-gradient(1px 1px at 70% 40%, rgba(255, 255, 255, 0.9), transparent),
    radial-gradient(
      1px 1px at 25% 60%,
      rgba(var(--space-bronze-rgb), 0.7),
      transparent
    );

  background-size: 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%,
    100% 100%, 100% 100%;

  opacity: 0.6;
  /* Animation simple et légère */
  animation: subtle-drift 40s ease-in-out infinite alternate;
}

@keyframes subtle-drift {
  0%,
  100% {
    transform: translateX(0) translateY(0) scale(1);
  }
  50% {
    transform: translateX(5px) translateY(3px) scale(1.01);
  }
}

/* Conteneur de la modale avec effet de lueur optimisé */
.space-modal-content {
  box-shadow: 0 0 20px rgba(var(--space-primary-rgb), 0.15),
    0 0 40px rgba(var(--space-primary-rgb), 0.08);
  position: relative;
  overflow: hidden;
  background-color: rgba(var(--space-bg-rgb), 0.9);
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  /* Animation de lueur simplifiée */
  animation: gentle-glow 6s infinite alternate ease-in-out;
}

@keyframes gentle-glow {
  0% {
    box-shadow: 0 0 20px rgba(var(--space-primary-rgb), 0.15),
      0 0 40px rgba(var(--space-primary-rgb), 0.08);
  }
  50% {
    box-shadow: 0 0 25px rgba(var(--space-gold-rgb), 0.18),
      0 0 45px rgba(var(--space-gold-rgb), 0.1);
  }
  100% {
    box-shadow: 0 0 20px rgba(var(--space-primary-rgb), 0.15),
      0 0 40px rgba(var(--space-primary-rgb), 0.08);
  }
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
  opacity: 0.15;
  animation: scan-lines 12s linear infinite;
  pointer-events: none;
  z-index: 2;
}

@keyframes scan-lines {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 100%;
  }
}

/* Titre de la modale optimisé */
.space-modal-title {
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  background: linear-gradient(
    90deg,
    var(--space-text),
    var(--space-primary-light),
    var(--space-gold),
    var(--space-text)
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  position: relative;
  animation: title-shimmer 8s linear infinite;
}

@keyframes title-shimmer {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.title-underline {
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--space-primary-light),
    var(--space-gold),
    var(--space-primary-light),
    transparent
  );
  background-size: 150% 100%;
  animation: underline-flow 6s linear infinite;
}

@keyframes underline-flow {
  0%,
  100% {
    background-position: 100% 0%;
  }
  50% {
    background-position: 0% 0%;
  }
}

.title-glow {
  position: absolute;
  width: 25px;
  height: 8px;
  background: radial-gradient(
    ellipse at center,
    rgba(var(--space-primary-rgb), 0.4),
    transparent 80%
  );
  filter: blur(3px);
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  opacity: 0.6;
  animation: title-glow-travel 6s ease-in-out infinite;
}

@keyframes title-glow-travel {
  0%,
  100% {
    left: 0;
    opacity: 0;
  }
  25%,
  75% {
    opacity: 0.6;
  }
  50% {
    left: calc(100% - 25px);
    opacity: 0.6;
  }
}

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
