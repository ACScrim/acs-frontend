<template>
  <transition
    name="space-modal"
    @after-enter="onAfterEnter"
    @after-leave="onAfterLeave"
  >
    <div v-if="modelValue" class="fixed inset-0 z-[9999]">
      <!-- Arrière-plan avec étoiles et nébuleuse -->
      <div
        class="fixed inset-0 bg-space-bg/95 backdrop-blur-md space-modal-backdrop"
        @click="$emit('update:modelValue', false)"
      >
        <!-- Nébuleuse cosmique en arrière-plan -->
        <div class="nebula-effect"></div>

        <!-- Étoiles scintillantes améliorées -->
        <div
          v-for="n in 40"
          :key="`star-${n}`"
          class="modal-star"
          :style="{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }"
        ></div>

        <!-- Étoiles filantes -->
        <div
          v-for="n in 8"
          :key="`meteor-${n}`"
          class="shooting-star"
          :style="{
            top: `${Math.random() * 70}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 80 + 70}px`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${Math.random() * 2 + 1}s`,
            transform: `rotate(${Math.random() * 45 - 22.5}deg)`,
          }"
        ></div>

        <!-- Particules flottantes -->
        <div
          v-for="n in 12"
          :key="`particle-${n}`"
          class="floating-particle"
          :style="{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${Math.random() * 10 + 15}s`,
            opacity: Math.random() * 0.5 + 0.2,
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
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.space-modal-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.space-modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

/* Fond d'espace avec nébuleuse améliorée */
.space-modal-backdrop {
  overflow: hidden;
  position: relative;
}

.nebula-effect {
  position: absolute;
  inset: 0;
  background: radial-gradient(
      circle at 30% 50%,
      rgba(var(--space-primary-rgb), 0.15),
      transparent 40%
    ),
    radial-gradient(
      circle at 70% 60%,
      rgba(var(--space-secondary-rgb), 0.1),
      transparent 30%
    ),
    radial-gradient(
      circle at 20% 30%,
      rgba(var(--space-gold-rgb), 0.07),
      transparent 35%
    ),
    radial-gradient(
      circle at 80% 30%,
      rgba(var(--space-silver-rgb), 0.05),
      transparent 25%
    ),
    radial-gradient(
      circle at 50% 70%,
      rgba(var(--space-bronze-rgb), 0.08),
      transparent 30%
    );
  filter: blur(30px);
  opacity: 0.7;
  animation: nebula-drift 30s infinite alternate ease-in-out;
}

@keyframes nebula-drift {
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.1) rotate(2deg);
  }
  100% {
    transform: scale(1.2) rotate(5deg);
  }
}

/* Étoiles améliorées */
.modal-star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  animation: twinkle var(--animation-duration, 5s) ease-in-out infinite;
  box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.3);
}

/* Une étoile sur quatre est dorée */
.modal-star:nth-child(4n + 1) {
  background-color: var(--space-gold);
  box-shadow: 0 0 5px 1px rgba(var(--space-gold-rgb), 0.5);
}

/* Une étoile sur quatre est argentée */
.modal-star:nth-child(4n + 2) {
  background-color: var(--space-silver);
  box-shadow: 0 0 5px 1px rgba(var(--space-silver-rgb), 0.5);
}

/* Une étoile sur quatre est bronze */
.modal-star:nth-child(4n + 3) {
  background-color: var(--space-bronze);
  box-shadow: 0 0 5px 1px rgba(var(--space-bronze-rgb), 0.5);
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.8);
  }
}

/* Étoiles filantes améliorées */
.shooting-star {
  position: absolute;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0)
  );
  opacity: 0;
  animation: shooting var(--animation-duration, 1.5s) linear infinite;
}

/* Une étoile filante sur trois est dorée */
.shooting-star:nth-child(3n + 1) {
  background: linear-gradient(
    90deg,
    rgba(var(--space-gold-rgb), 0),
    rgba(var(--space-gold-rgb), 0.9),
    rgba(var(--space-gold-rgb), 0)
  );
  height: 1.5px;
}

/* Une étoile filante sur trois est argentée */
.shooting-star:nth-child(3n + 2) {
  background: linear-gradient(
    90deg,
    rgba(var(--space-silver-rgb), 0),
    rgba(var(--space-silver-rgb), 0.9),
    rgba(var(--space-silver-rgb), 0)
  );
  height: 1.2px;
}

/* Une étoile filante sur trois est bronze */
.shooting-star:nth-child(3n) {
  background: linear-gradient(
    90deg,
    rgba(var(--space-bronze-rgb), 0),
    rgba(var(--space-bronze-rgb), 0.9),
    rgba(var(--space-bronze-rgb), 0)
  );
  height: 1.3px;
}

@keyframes shooting {
  0% {
    opacity: 0;
    transform: translateX(-100px) var(--transform, rotate(-15deg));
  }
  10%,
  15% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateX(calc(100vw + 100px)) var(--transform, rotate(-15deg));
  }
}

/* Particules flottantes */
.floating-particle {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  filter: blur(1px);
  animation: float-particle var(--animation-duration, 20s) ease-in-out infinite;
}

/* Particule dorée */
.floating-particle:nth-child(3n + 1) {
  background-color: rgba(var(--space-gold-rgb), 0.3);
  box-shadow: 0 0 8px 2px rgba(var(--space-gold-rgb), 0.2);
}

/* Particule argentée */
.floating-particle:nth-child(3n + 2) {
  background-color: rgba(var(--space-silver-rgb), 0.3);
  box-shadow: 0 0 8px 2px rgba(var(--space-silver-rgb), 0.2);
}

/* Particule bronze */
.floating-particle:nth-child(3n) {
  background-color: rgba(var(--space-bronze-rgb), 0.3);
  box-shadow: 0 0 8px 2px rgba(var(--space-bronze-rgb), 0.2);
}

@keyframes float-particle {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(20px, 15px) rotate(90deg);
  }
  50% {
    transform: translate(0px, 30px) rotate(180deg);
  }
  75% {
    transform: translate(-20px, 15px) rotate(270deg);
  }
}

/* Conteneur de la modale avec effet de lueur amélioré */
.space-modal-content {
  box-shadow: 0 0 15px rgba(var(--space-primary-rgb), 0.2),
    0 0 30px rgba(var(--space-primary-rgb), 0.1),
    0 0 50px rgba(var(--space-primary-rgb), 0.05);
  animation: content-glow 8s infinite alternate ease-in-out;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;
  background-color: rgba(var(--space-bg-rgb), 0.85);
}

@keyframes content-glow {
  0% {
    box-shadow: 0 0 15px rgba(var(--space-primary-rgb), 0.2),
      0 0 30px rgba(var(--space-primary-rgb), 0.1),
      0 0 50px rgba(var(--space-primary-rgb), 0.05);
  }
  25% {
    box-shadow: 0 0 20px rgba(var(--space-gold-rgb), 0.2),
      0 0 35px rgba(var(--space-gold-rgb), 0.1),
      0 0 55px rgba(var(--space-gold-rgb), 0.05);
  }
  50% {
    box-shadow: 0 0 20px rgba(var(--space-secondary-rgb), 0.25),
      0 0 40px rgba(var(--space-secondary-rgb), 0.15),
      0 0 60px rgba(var(--space-secondary-rgb), 0.05);
  }
  75% {
    box-shadow: 0 0 20px rgba(var(--space-silver-rgb), 0.2),
      0 0 35px rgba(var(--space-silver-rgb), 0.1),
      0 0 55px rgba(var(--space-silver-rgb), 0.05);
  }
  100% {
    box-shadow: 0 0 15px rgba(var(--space-bronze-rgb), 0.2),
      0 0 30px rgba(var(--space-bronze-rgb), 0.1),
      0 0 50px rgba(var(--space-bronze-rgb), 0.05);
  }
}

/* Holographic scanline effect */
.holographic-effect {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(var(--space-primary-rgb), 0.03) 50%,
    transparent 100%
  );
  background-size: 100% 8px;
  opacity: 0.2;
  animation: scan-lines 8s linear infinite;
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

/* Titre de la modale amélioré */
.space-modal-title {
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  background: linear-gradient(
    90deg,
    var(--space-text),
    var(--space-primary-light),
    var(--space-gold),
    var(--space-silver),
    var(--space-bronze),
    var(--space-primary-light)
  );
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  position: relative;
  animation: title-gradient 8s linear infinite;
}

@keyframes title-gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.title-underline {
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--space-primary-light),
    var(--space-gold),
    var(--space-silver),
    var(--space-bronze),
    var(--space-primary-light),
    transparent
  );
  background-size: 200% 100%;
  animation: underline-slide 5s linear infinite;
}

@keyframes underline-slide {
  0% {
    background-position: 100% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
}

.title-glow {
  position: absolute;
  width: 30px;
  height: 10px;
  background: radial-gradient(
    ellipse at center,
    rgba(var(--space-primary-rgb), 0.6),
    transparent 70%
  );
  filter: blur(5px);
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  opacity: 0.7;
  animation: title-glow-slide 4s ease-in-out infinite;
}

@keyframes title-glow-slide {
  0% {
    left: 0;
    opacity: 0;
  }
  20% {
    opacity: 0.7;
  }
  80% {
    opacity: 0.7;
  }
  100% {
    left: 100%;
    opacity: 0;
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

/* Grille futuriste améliorée */
.modal-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
      to right,
      rgba(var(--space-primary-rgb), 0.05) 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      rgba(var(--space-primary-rgb), 0.05) 1px,
      transparent 1px
    );
  background-size: 20px 20px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.5;
  animation: grid-pulse 8s infinite alternate ease-in-out;
}

@keyframes grid-pulse {
  0% {
    opacity: 0.3;
    background-size: 20px 20px;
  }
  50% {
    opacity: 0.5;
    background-size: 22px 22px;
  }
  100% {
    opacity: 0.3;
    background-size: 20px 20px;
  }
}

/* Orbites décoratives améliorées */
.orbital-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed rgba(var(--space-primary-rgb), 0.3);
  pointer-events: none;
  z-index: 0;
  opacity: 0.6;
}

.orbital-ring-1 {
  width: 150px;
  height: 150px;
  top: -30px;
  right: -50px;
  animation: orbit-rotate 20s linear infinite;
  border-color: rgba(var(--space-gold-rgb), 0.3);
}

.orbital-ring-2 {
  width: 120px;
  height: 120px;
  bottom: -30px;
  left: -50px;
  animation: orbit-rotate 15s linear reverse infinite;
  border-color: rgba(var(--space-silver-rgb), 0.3);
}

.orbital-ring-3 {
  width: 180px;
  height: 180px;
  bottom: -60px;
  right: -60px;
  animation: orbit-rotate 25s linear infinite;
  border-color: rgba(var(--space-bronze-rgb), 0.3);
}

@keyframes orbit-rotate {
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

/* Bordure lumineuse */
.modal-glow-border {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.5s ease;
  box-shadow: 0 0 0 1px rgba(var(--space-primary-rgb), 0.3),
    0 0 15px 2px rgba(var(--space-primary-rgb), 0.2);
  z-index: 0;
}

.space-modal-container:hover .modal-glow-border {
  opacity: 1;
  animation: border-color-cycle 8s infinite alternate ease-in-out;
}

@keyframes border-color-cycle {
  0% {
    box-shadow: 0 0 0 1px rgba(var(--space-primary-rgb), 0.3),
      0 0 15px 2px rgba(var(--space-primary-rgb), 0.2);
  }
  33% {
    box-shadow: 0 0 0 1px rgba(var(--space-gold-rgb), 0.3),
      0 0 15px 2px rgba(var(--space-gold-rgb), 0.2);
  }
  66% {
    box-shadow: 0 0 0 1px rgba(var(--space-silver-rgb), 0.3),
      0 0 15px 2px rgba(var(--space-silver-rgb), 0.2);
  }
  100% {
    box-shadow: 0 0 0 1px rgba(var(--space-bronze-rgb), 0.3),
      0 0 15px 2px rgba(var(--space-bronze-rgb), 0.2);
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

/* Animation de bienvenue pour la modale */
@keyframes welcome-pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

.space-modal-enter-active .space-modal-container {
  animation: welcome-pulse 0.6s ease-out;
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
