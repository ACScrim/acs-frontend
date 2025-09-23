<template>
  <Teleport to="body">
    <Transition name="screamer" @enter="onEnter" @leave="onLeave">
      <div
        v-if="isVisible"
        class="screamer-overlay"
        @click="hideScreamer"
        @keydown.esc="hideScreamer"
        tabindex="0"
        role="dialog"
        aria-label="Image d'Halloween surprise"
        aria-modal="true"
      >
        <!-- Son de screamer -->
        <audio
          ref="screamerSound"
          preload="auto"
          :volume="soundVolume"
          @loadeddata="onAudioLoaded"
          @error="onAudioError"
        >
          <source src="/sounds/scream.wav" type="audio/wav" />
        </audio>

        <!-- Image de screamer -->
        <div class="screamer-container">
          <img
            :src="screamerImage"
            alt="Image d'Halloween surprise"
            class="screamer-image"
            @load="onImageLoad"
            @error="onImageError"
          />

          <!-- Bouton de fermeture -->
          <button
            @click="hideScreamer"
            class="screamer-close"
            aria-label="Fermer"
            title="Fermer (ESC)"
          >
            <i class="fas fa-times"></i>
          </button>

          <!-- Texte optionnel -->
          <div class="screamer-text">
            <h2 class="screamer-title">👻 BOO! 👻</h2>
            <p class="screamer-subtitle">Joyeux Halloween ! 🎃</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

//-------------------------------------------------------
// PROPS ET CONFIGURATION
//-------------------------------------------------------

interface Props {
  /** URL de l'image de screamer */
  image?: string;
  /** Probabilité d'apparition (0-1) */
  probability?: number;
  /** Intervalle minimum entre les screamers (en minutes) */
  minInterval?: number;
  /** Intervalle maximum entre les screamers (en minutes) */
  maxInterval?: number;
  /** Activer le son */
  enableSound?: boolean;
  /** Volume du son (0-1) */
  soundVolume?: number;
  /** Durée d'affichage automatique (0 = manuel) */
  autoHideDuration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  image: "https://i.ytimg.com/vi/MQ7EkOiW_Kk/maxresdefault.jpg",
  probability: 0.15, // 15% de chance
  minInterval: 2, // 2 minutes minimum
  maxInterval: 10, // 10 minutes maximum
  enableSound: true, // Activé par défaut maintenant qu'on a le fichier
  soundVolume: 0.5, // Volume modéré
  autoHideDuration: 0, // Fermeture manuelle par défaut
});

//-------------------------------------------------------
// ÉTAT RÉACTIF
//-------------------------------------------------------

const isVisible = ref(false);
const isImageLoaded = ref(false);
const isAudioLoaded = ref(false);
const screamerSound = ref<HTMLAudioElement | null>(null);
const nextScreamerTimeout = ref<ReturnType<typeof setTimeout> | null>(null);
const autoHideTimeout = ref<ReturnType<typeof setTimeout> | null>(null);
const pendingAudioPlay = ref(false); // Flag pour jouer le son dès qu'il est chargé

// Images de screamer alternatives
const screamerImages = [
  props.image,
  "https://m.media-amazon.com/images/I/71wm+tK5QXL._UY1000_.jpg", // Alternative 1
  "https://i.scdn.co/image/ab67616d0000b2739ae6150575a2dafd89f0fc1a",
  "https://m.media-amazon.com/images/I/61gMKhK6DDL._UY1000_.jpg",
  "https://cdn.sanity.io/images/ccckgjf9/production/8e77b5c892c95d55136b80e90f0851bb2fbd2a1f-804x528.png?max-h=1080&max-w=1920&q=50&fit=scale&auto=format",
];

const screamerImage = ref(props.image);

//-------------------------------------------------------
// LOGIQUE DU SCREAMER
//-------------------------------------------------------

/**
 * Joue le son du screamer
 */
const playScreamerSound = (): void => {
  if (!props.enableSound || !screamerSound.value) {
    return;
  }

  try {
    screamerSound.value.currentTime = 0;
    screamerSound.value.play().catch(() => {
      // Silencieusement ignorer les erreurs d'autoplay
    });
  } catch (error) {
    // Silencieusement ignorer les erreurs
  }
};

/**
 * Choisit une image de screamer aléatoire
 */
const selectRandomImage = (): void => {
  const randomIndex = Math.floor(Math.random() * screamerImages.length);
  screamerImage.value = screamerImages[randomIndex];
};

/**
 * Affiche le screamer
 */
const showScreamer = (): void => {
  if (isVisible.value) return; // Éviter les doublons

  selectRandomImage();
  isVisible.value = true;

  // Focus pour l'accessibilité
  setTimeout(() => {
    const overlay = document.querySelector(".screamer-overlay") as HTMLElement;
    overlay?.focus();
  }, 100);

  // Auto-hide optionnel
  if (props.autoHideDuration > 0) {
    autoHideTimeout.value = setTimeout(() => {
      hideScreamer();
    }, props.autoHideDuration * 1000);
  }
};

/**
 * Cache le screamer
 */
const hideScreamer = (): void => {
  isVisible.value = false;

  // Nettoyer les timeouts
  if (autoHideTimeout.value) {
    clearTimeout(autoHideTimeout.value);
    autoHideTimeout.value = null;
  }

  // Arrêter le son
  if (screamerSound.value) {
    screamerSound.value.pause();
    screamerSound.value.currentTime = 0;
  }
};

//-------------------------------------------------------
// GESTIONNAIRES D'ÉVÉNEMENTS
//-------------------------------------------------------

/**
 * Gestionnaire d'entrée de transition
 */
const onEnter = (el: Element): void => {
  const element = el as HTMLElement;
  element.style.opacity = "0";
  element.style.transform = "scale(0.5)";

  requestAnimationFrame(() => {
    element.style.transition = "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
    element.style.opacity = "1";
    element.style.transform = "scale(1)";
  });
};

/**
 * Gestionnaire de sortie de transition
 */
const onLeave = (el: Element): void => {
  const element = el as HTMLElement;
  element.style.transition = "all 0.2s ease-out";
  element.style.opacity = "0";
  element.style.transform = "scale(0.9)";
};

/**
 * Gestionnaire de chargement d'image
 */
const onImageLoad = (): void => {
  isImageLoaded.value = true;
};

/**
 * Gestionnaire d'erreur d'image
 */
const onImageError = (): void => {
  // Utiliser une image de fallback
  screamerImage.value = "🎃"; // Emoji en fallback
};

/**
 * Gestionnaire de chargement audio
 */
const onAudioLoaded = (): void => {
  isAudioLoaded.value = true;

  // Si on avait demandé à jouer le son avant qu'il soit chargé, on le joue maintenant
  if (pendingAudioPlay.value) {
    pendingAudioPlay.value = false;
    playScreamerSound();
  }
};

/**
 * Gestionnaire d'erreur audio
 */
const onAudioError = (): void => {
  // Erreur silencieuse
};

//-------------------------------------------------------
// CYCLE DE VIE
//-------------------------------------------------------

onMounted(() => {
  // Le screamer sera maintenant déclenché manuellement via forceShow()
});

onUnmounted(() => {
  // Nettoyer les timeouts
  if (nextScreamerTimeout.value) {
    clearTimeout(nextScreamerTimeout.value);
  }
  if (autoHideTimeout.value) {
    clearTimeout(autoHideTimeout.value);
  }
});

//-------------------------------------------------------
// API PUBLIQUE
//-------------------------------------------------------

/**
 * Force l'affichage du screamer (maintenant la méthode principale)
 */
const forceShow = (): void => {
  // Essayer de jouer le son immédiatement
  if (props.enableSound) {
    if (isAudioLoaded.value && screamerSound.value) {
      // Audio chargé, on peut jouer immédiatement
      playScreamerSound();
    } else {
      // Audio pas encore chargé, on marque qu'on veut le jouer
      pendingAudioPlay.value = true;
    }
  }

  // Afficher le screamer
  showScreamer();
};

/**
 * Désactive les screamers (ferme simplement le screamer actuel)
 */
const disable = (): void => {
  hideScreamer();
  if (nextScreamerTimeout.value) {
    clearTimeout(nextScreamerTimeout.value);
  }
};

// Exposer les méthodes publiques
defineExpose({
  forceShow,
  disable,
  hideScreamer,
});
</script>

<style scoped>
/*=====================================================
  SCREAMER OVERLAY
=====================================================*/

.screamer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  cursor: pointer;
  backdrop-filter: blur(2px);
}

.screamer-container {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 50px rgba(255, 69, 0, 0.3), 0 0 100px rgba(139, 69, 19, 0.2),
    0 25px 50px rgba(0, 0, 0, 0.5);
  animation: screamer-shake 0.1s infinite alternate;
}

.screamer-image {
  display: block;
  width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
}

/*=====================================================
  ÉLÉMENTS INTERACTIFS
=====================================================*/

.screamer-close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  color: white;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
}

.screamer-close:hover {
  background: rgba(255, 69, 0, 0.8);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
}

.screamer-text {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  z-index: 10;
}

.screamer-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 8px 0;
  animation: screamer-glow 1s ease-in-out infinite alternate;
}

.screamer-subtitle {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
}

/*=====================================================
  ANIMATIONS
=====================================================*/

@keyframes screamer-shake {
  0% {
    transform: translateX(-1px) translateY(-1px);
  }
  100% {
    transform: translateX(1px) translateY(1px);
  }
}

@keyframes screamer-glow {
  0% {
    color: #ff4500;
    text-shadow: 0 0 10px #ff4500, 0 0 20px #ff4500,
      2px 2px 4px rgba(0, 0, 0, 0.8);
  }
  100% {
    color: #ffa500;
    text-shadow: 0 0 15px #ffa500, 0 0 25px #ff4500,
      2px 2px 4px rgba(0, 0, 0, 0.8);
  }
}

/*=====================================================
  TRANSITIONS
=====================================================*/

.screamer-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.screamer-leave-active {
  transition: all 0.2s ease-out;
}

.screamer-enter-from {
  opacity: 0;
  transform: scale(0.5) rotate(-5deg);
}

.screamer-leave-to {
  opacity: 0;
  transform: scale(0.9) rotate(2deg);
}

/*=====================================================
  RESPONSIVE
=====================================================*/

@media (max-width: 768px) {
  .screamer-container {
    max-width: 95vw;
    max-height: 85vh;
  }

  .screamer-title {
    font-size: 1.5rem;
  }

  .screamer-subtitle {
    font-size: 1rem;
  }

  .screamer-close {
    width: 36px;
    height: 36px;
    font-size: 16px;
    top: 10px;
    right: 10px;
  }
}

/*=====================================================
  ACCESSIBILITÉ
=====================================================*/

@media (prefers-reduced-motion: reduce) {
  .screamer-container {
    animation: none;
  }

  .screamer-title {
    animation: none;
  }

  .screamer-enter-active,
  .screamer-leave-active {
    transition: opacity 0.2s ease;
  }

  .screamer-enter-from {
    transform: none;
  }

  .screamer-leave-to {
    transform: none;
  }
}

/* Focus pour l'accessibilité */
.screamer-overlay:focus {
  outline: 2px solid #ff4500;
  outline-offset: -2px;
}
</style>
