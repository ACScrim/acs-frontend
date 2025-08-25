<!-- Space-themed Toast Component -->
<template>
  <Teleport to="body">
    <div
      v-if="message"
      :class="[
        'fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 font-orbitron animate-slideUp',
        'min-w-[320px] max-w-md',
        'space-toast-container',
      ]"
    >
      <!-- Background container with space effects -->
      <div
        :class="[
          'relative overflow-hidden rounded-lg backdrop-blur-md border',
          type === 'error'
            ? 'bg-gradient-to-br from-background-bg-primary/90 via-red-500/10 to-background-bg-primary/95 border-red-500/40'
            : 'bg-gradient-to-br from-background-bg-primary/95 via-background-bg-secondary/90 to-background-bg-primary/95 border-space-border/40',
          'shadow-2xl',
          type === 'error' ? 'shadow-red-500/30' : 'shadow-color-success/30',
        ]"
      >
        <!-- Animated background particles -->
        <div class="absolute inset-0 overflow-hidden">
          <div class="space-particles">
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
          </div>
        </div>
        <!-- Holographic border effect -->
        <div
          :class="[
            'absolute inset-0 rounded-lg border-2 opacity-60 animate-pulse',
            type === 'error' ? 'border-red-500/50' : 'border-color-success/50',
          ]"
        ></div>

        <!-- Content -->
        <div class="relative z-10 px-6 py-4">
          <div class="flex items-center">
            <!-- Error Icon - Alert Diamond -->
            <div
              v-if="type === 'error'"
              class="flex-shrink-0 w-8 h-8 mr-3 flex items-center justify-center rounded-full bg-red-500/20 border border-red-500/40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-red-500 animate-pulse"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M12 9v4m0 4h.01M21 12c0 1.657-4.03 3-9 3s-9-1.343-9-3 4.03-3 9-3 9 1.343 9 3Z"
                />
                <path d="M12 2v10" />
              </svg>
            </div>

            <!-- Success Icon - Mission Complete -->
            <div
              v-else
              class="flex-shrink-0 w-8 h-8 mr-3 flex items-center justify-center rounded-full bg-color-success/20 border border-color-success/40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-color-success-light animate-pulse"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>

            <!-- Message -->
            <div class="flex-1">
              <div
                :class="[
                  'text-sm font-medium tracking-wide',
                  type === 'error' ? 'text-red-500' : 'text-color-success',
                ]"
              >
                {{ type === "error" ? "MISSION ÉCHOUÉE" : "MISSION RÉUSSIE" }}
              </div>
              <div class="text-normal-text text-xs mt-1 opacity-90">
                {{ message }}
              </div>
            </div>

            <!-- Status indicator -->
            <div class="flex-shrink-0 ml-3">
              <div
                :class="[
                  'w-2 h-2 rounded-full animate-pulse',
                  type === 'error' ? 'bg-red-500' : 'bg-color-success',
                ]"
              ></div>
            </div>
          </div>

          <!-- Progress bar container -->
          <div class="mt-3 relative">
            <div
              class="w-full h-1 bg-background-bg-tertiary/50 rounded-full overflow-hidden"
            >
              <div
                :class="[
                  'h-full animate-shrink rounded-full relative',
                  type === 'error'
                    ? 'bg-gradient-to-r from-red-500/70 to-red-500'
                    : 'bg-gradient-to-r from-color-success/70 to-color-success',
                ]"
              >
                <!-- Glowing effect on progress bar -->
                <div
                  :class="[
                    'absolute inset-0 rounded-full animate-pulse',
                    type === 'error'
                      ? 'shadow-md shadow-red-500/50'
                      : 'shadow-md shadow-color-success/50',
                  ]"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Corner decorations -->
        <div
          class="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-color-primary/40 rounded-tl"
        ></div>
        <div
          class="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-color-primary/40 rounded-tr"
        ></div>
        <div
          class="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-color-primary/40 rounded-bl"
        ></div>
        <div
          class="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-color-primary/40 rounded-br"
        ></div>

        <!-- Scanning line effect -->
        <div
          :class="[
            'absolute top-0 left-0 w-full h-0.5 animate-scan opacity-50',
            type === 'error'
              ? 'bg-gradient-to-r from-transparent via-red-500 to-transparent'
              : 'bg-gradient-to-r from-transparent via-color-success to-transparent',
          ]"
        ></div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps({
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
</script>

<style scoped>
/* Classe personnalisée pour la police Orbitron */
.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

/* Container for space effects */
.space-toast-container {
  filter: drop-shadow(0 0 20px rgba(79, 172, 254, 0.3));
}

/* Floating particles effect */
.space-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(79, 172, 254, 0.6);
  border-radius: 50%;
  animation: float 3s infinite ease-in-out;
}

.particle:nth-child(1) {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
  animation-duration: 2.5s;
}

.particle:nth-child(2) {
  top: 60%;
  left: 80%;
  animation-delay: 0.8s;
  animation-duration: 3.2s;
}

.particle:nth-child(3) {
  top: 30%;
  left: 60%;
  animation-delay: 1.2s;
  animation-duration: 2.8s;
}

.particle:nth-child(4) {
  top: 80%;
  left: 30%;
  animation-delay: 0.4s;
  animation-duration: 3.5s;
}

.particle:nth-child(5) {
  top: 15%;
  left: 90%;
  animation-delay: 1.8s;
  animation-duration: 2.2s;
}

/* Floating animation for particles */
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

/* Scanning line animation */
@keyframes scan {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

.animate-scan {
  animation: scan 2s infinite linear;
}

/* Animation d'apparition par le bas avec effet spatial */
@keyframes slideUp {
  from {
    transform: translate(-50%, 100%) scale(0.9);
    opacity: 0;
    filter: blur(10px);
  }
  to {
    transform: translate(-50%, 0) scale(1);
    opacity: 1;
    filter: blur(0);
  }
}

.animate-slideUp {
  animation: slideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

/* Animation de la barre de progression avec effet de lueur */
@keyframes shrink {
  from {
    width: 100%;
    box-shadow: 0 0 10px currentColor;
  }
  to {
    width: 0%;
    box-shadow: 0 0 5px currentColor;
  }
}

.animate-shrink {
  width: 100%;
  animation: shrink 4s linear forwards;
}

/* Effet de lueur pour les bordures */
.space-toast-container::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(
    45deg,
    rgba(79, 172, 254, 0.3),
    rgba(147, 51, 234, 0.3),
    rgba(79, 172, 254, 0.3)
  );
  border-radius: 12px;
  z-index: -1;
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    box-shadow: 0 0 5px rgba(79, 172, 254, 0.2);
  }
  to {
    box-shadow: 0 0 20px rgba(79, 172, 254, 0.4);
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .space-toast-container {
    min-width: 280px;
    margin: 0 1rem;
  }
}
</style>
