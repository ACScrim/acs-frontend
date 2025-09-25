<!--
TOAST COMPONENT - Composant de notification Halloween

UTILISATION:
<Toast type="success" message="Action réussie !" />
<Toast type="error" message="Une erreur s'est produite" />

PROPS:
- type (string, requis): Type de notification ("success" | "error")
- message (string, requis): Message à afficher dans la notification

FONCTIONNALITÉS:
- Apparition animée par le bas avec effet de fondu
- Barre de progression automatique (4 secondes)
- Effets visuels Halloween avec particules mystiques
- Icônes thématiques selon le type
- Responsive design optimisé pour mobile
- Fermeture automatique après 4 secondes

DESIGN:
- Thème Halloween avec couleurs orange citrouille et rouge sang
- Police gothique Cinzel pour le texte
- Effets de lueur et animations mystiques
- Particules flottantes pour l'ambiance
-->
<template>
  <Teleport to="body">
    <Transition
      name="toast"
      enter-active-class="toast-enter"
      leave-active-class="toast-leave"
    >
      <div
        v-if="message"
        class="toast-container fixed bottom-4 right-4 left-4 sm:left-auto w-auto sm:w-full sm:max-w-sm md:max-w-md lg:max-w-lg z-50"
        :class="getToastTypeClass"
      >
        <!-- Conteneur principal du toast avec thème Halloween -->
        <div
          class="toast-content relative overflow-hidden rounded-lg border backdrop-blur-sm"
        >
          <!-- Contenu principal -->
          <div class="relative flex items-center p-3 sm:p-4">
            <!-- Icône avec effet de lueur Halloween -->
            <div class="flex-shrink-0 mr-2 sm:mr-3">
              <div
                class="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center toast-icon"
                :class="getIconClass"
              >
                <!-- Icône de succès -->
                <svg
                  v-if="type === 'success'"
                  class="w-3 h-3 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <!-- Icône d'erreur -->
                <svg
                  v-else
                  class="w-3 h-3 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <!-- Message avec police gothique -->
            <div class="flex-1 min-w-0">
              <div
                class="text-xs sm:text-sm font-heading font-medium mb-0.5 sm:mb-1 truncate"
                :class="getStatusTextClass"
              >
                {{ type === "error" ? "Échec" : "Succès" }}
              </div>
              <p
                class="text-xs sm:text-sm font-body text-color-text leading-relaxed break-words"
              >
                {{ message }}
              </p>
            </div>
          </div>

          <!-- Ligne mystique animée -->
          <div class="mystical-line absolute top-0 left-0 w-full h-0.5"></div>

          <!-- Barre de progression avec animation Halloween -->
          <div class="progress-bar absolute bottom-0 left-0 h-1"></div>

          <!-- Coins décoratifs Halloween -->
          <div class="halloween-corners">
            <div class="corner corner-tl absolute top-1 left-1"></div>
            <div class="corner corner-tr absolute top-1 right-1"></div>
            <div class="corner corner-bl absolute bottom-1 left-1"></div>
            <div class="corner corner-br absolute bottom-1 right-1"></div>
          </div>

          <!-- Indicateurs mystiques -->
          <div
            class="mystical-indicators absolute top-2 right-2 sm:top-3 sm:right-3 opacity-60"
          >
            <div class="flex space-x-0.5 sm:space-x-1">
              <div
                class="indicator-dot w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full"
                style="animation-delay: 0s"
              ></div>
              <div
                class="indicator-dot w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full"
                style="animation-delay: 0.5s"
              ></div>
              <div
                class="indicator-dot w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full"
                style="animation-delay: 1s"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Props définition
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value: string) => ["success", "error"].includes(value),
  },
  message: {
    type: String,
    required: true,
  },
});

// Classes dynamiques pour le type de toast
const getToastTypeClass = computed(() => {
  return props.type === "success" ? "toast-success" : "toast-error";
});

// Classes de l'icône selon le type
const getIconClass = computed(() => {
  return props.type === "success"
    ? "icon-success text-color-success"
    : "icon-error text-color-error";
});

// Classes du texte de statut selon le type
const getStatusTextClass = computed(() => {
  return props.type === "success" ? "text-color-success" : "text-color-error";
});
</script>

<style scoped>
/* Conteneur principal du toast */
.toast-container {
  font-family: var(--font-body);
}

/* Styles selon le type */
.toast-success .toast-content {
  background: linear-gradient(
    135deg,
    rgba(var(--color-bg-rgb), 0.95) 0%,
    rgba(var(--color-success-rgb), 0.1) 50%,
    rgba(var(--color-bg-rgb), 0.95) 100%
  );
  border-color: var(--color-success);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8),
    0 0 20px rgba(var(--color-success-rgb), 0.3),
    inset 0 0 20px rgba(var(--color-success-rgb), 0.1);
}

.toast-error .toast-content {
  background: linear-gradient(
    135deg,
    rgba(var(--color-bg-rgb), 0.95) 0%,
    rgba(var(--color-error-rgb), 0.1) 50%,
    rgba(var(--color-bg-rgb), 0.95) 100%
  );
  border-color: var(--color-error);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8),
    0 0 20px rgba(var(--color-error-rgb), 0.3),
    inset 0 0 20px rgba(var(--color-error-rgb), 0.1);
}

/* Icônes avec lueur Halloween */
.toast-icon {
  backdrop-filter: blur(10px);
}

.icon-success {
  background: radial-gradient(
    circle,
    rgba(var(--color-success-rgb), 0.2) 0%,
    transparent 70%
  );
  box-shadow: 0 0 15px rgba(var(--color-success-rgb), 0.4);
}

.icon-error {
  background: radial-gradient(
    circle,
    rgba(var(--color-error-rgb), 0.2) 0%,
    transparent 70%
  );
  box-shadow: 0 0 15px rgba(var(--color-error-rgb), 0.4);
}

/* Ligne mystique animée */
.mystical-line {
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-primary) 25%,
    var(--color-accent) 50%,
    var(--color-secondary) 75%,
    transparent 100%
  );
  animation: mystical-scan 3s ease-in-out infinite;
}

@keyframes mystical-scan {
  0%,
  100% {
    opacity: 0.3;
    transform: scaleX(0.5);
  }
  50% {
    opacity: 1;
    transform: scaleX(1);
  }
}

/* Barre de progression Halloween */
.progress-bar {
  background: linear-gradient(
    90deg,
    var(--color-primary) 0%,
    var(--color-accent) 50%,
    var(--color-secondary) 100%
  );
  animation: progress-shrink 4s linear forwards;
  box-shadow: 0 0 10px rgba(var(--color-primary-rgb), 0.6);
}

@keyframes progress-shrink {
  from {
    width: 100%;
    opacity: 1;
  }
  to {
    width: 0%;
    opacity: 0.3;
  }
}

/* Coins décoratifs Halloween */
.corner {
  width: 8px;
  height: 8px;
  border-style: solid;
  border-width: 2px;
  border-color: var(--color-primary);
  opacity: 0.6;
}

.corner-tl {
  border-right: none;
  border-bottom: none;
}

.corner-tr {
  border-left: none;
  border-bottom: none;
}

.corner-bl {
  border-right: none;
  border-top: none;
}

.corner-br {
  border-left: none;
  border-top: none;
}

/* Indicateurs mystiques */
.indicator-dot {
  background: var(--color-accent);
  animation: mystical-pulse 2s ease-in-out infinite;
}

@keyframes mystical-pulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
    box-shadow: 0 0 8px rgba(var(--color-accent-rgb), 0.6);
  }
}

/* Transitions d'entrée et sortie */
.toast-enter {
  animation: toast-slide-up 0.4s ease-out forwards;
}

.toast-leave {
  animation: toast-fade-out 0.25s ease-in forwards;
}

@keyframes toast-slide-up {
  from {
    transform: translateY(100px);
    opacity: 0;
    scale: 0.95;
  }
  to {
    transform: translateY(0);
    opacity: 1;
    scale: 1;
  }
}

@keyframes toast-fade-out {
  from {
    transform: translateY(0);
    opacity: 1;
    scale: 1;
  }
  to {
    transform: translateY(-20px);
    opacity: 0;
    scale: 0.95;
  }
}

/* Animations optimisées pour mobile */
@media (max-width: 640px) {
  .toast-enter {
    animation: toast-slide-up-mobile 0.3s ease-out forwards;
  }

  .toast-leave {
    animation: toast-fade-out-mobile 0.2s ease-in forwards;
  }

  @keyframes toast-slide-up-mobile {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes toast-fade-out-mobile {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-10px);
      opacity: 0;
    }
  }
}

/* Responsive pour mobile */
@media (max-width: 640px) {
  .toast-container {
    bottom: 0.75rem;
    right: 0.75rem;
    left: 0.75rem;
    max-width: none;
  }

  .toast-content {
    padding: 0;
    border-radius: 0.5rem;
  }

  .particle {
    width: 2px;
    height: 2px;
  }

  .corner {
    width: 4px;
    height: 4px;
    border-width: 1px;
  }

  .corner-tl,
  .corner-tr {
    top: 0.25rem;
  }

  .corner-bl,
  .corner-br {
    bottom: 0.25rem;
  }

  .corner-tl,
  .corner-bl {
    left: 0.25rem;
  }

  .corner-tr,
  .corner-br {
    right: 0.25rem;
  }

  .mystical-line {
    height: 1px;
  }

  .progress-bar {
    height: 2px;
  }
}

@media (max-width: 480px) {
  .toast-container {
    bottom: 0.5rem;
    right: 0.5rem;
    left: 0.5rem;
  }

  .toast-content {
    border-radius: 0.375rem;
  }

  .particle {
    width: 1.5px;
    height: 1.5px;
  }

  .corner {
    width: 3px;
    height: 3px;
    border-width: 0.5px;
  }

  .mystical-line {
    height: 0.5px;
  }

  .progress-bar {
    height: 1.5px;
  }
}

@media (max-width: 375px) {
  .toast-container {
    bottom: 0.25rem;
    right: 0.25rem;
    left: 0.25rem;
  }

  .toast-content {
    border-radius: 0.25rem;
  }
}

/* Responsive pour tablette */
@media (min-width: 641px) and (max-width: 1024px) {
  .toast-container {
    max-width: 24rem;
  }
}

/* Responsive pour desktop */
@media (min-width: 1025px) {
  .toast-container {
    max-width: 28rem;
  }

  .toast-content {
    border-radius: 0.75rem;
  }

  .particle {
    width: 4px;
    height: 4px;
  }

  .corner {
    width: 10px;
    height: 10px;
    border-width: 2.5px;
  }
}
</style>
