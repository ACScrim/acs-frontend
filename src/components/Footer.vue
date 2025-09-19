<template>
  <footer class="relative mt-16 overflow-hidden">
    <!-- Grille spatiale avec effet parallaxe -->
    <div
      class="space-grid absolute inset-0 opacity-20 pointer-events-none"
    ></div>

    <!-- Étoiles animées en arrière-plan -->
    <div
      v-for="n in 30"
      :key="`star-${n}`"
      class="absolute h-1 w-1 rounded-full bg-white animate-pulse"
      :style="{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        opacity: Math.random() * 0.7 + 0.3,
      }"
    ></div>

    <!-- Planète décorative -->
    <div
      class="absolute -top-48 -right-48 w-96 h-96 rounded-full bg-gradient-to-br from-color-accent/5 to-color-accent-dark/10 opacity-30 blur-xl"
    ></div>

    <!-- Nébuleuse décorative -->
    <div
      class="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-gradient-to-tr from-color-primary/10 to-color-primary-dark/5 opacity-20 blur-xl"
    ></div>

    <!-- Vaisseau spatial qui traverse -->
    <div class="spaceship">
      <div class="spaceship-body"></div>
      <div class="spaceship-engine"></div>
      <div class="spaceship-trail"></div>
    </div>

    <!-- Ligne de circuit supérieure -->
    <div class="space-circuit-line top">
      <div class="space-circuit-pulse"></div>
    </div>

    <!-- Contenu principal du footer avec effet glassmorphism -->
    <div
      class="relative z-10 bg-color-bg/60 backdrop-blur-md border-t border-color-primary/30"
    >
      <div class="container mx-auto px-6 py-8">
        <!-- Contenu supérieur -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <!-- Logo et slogan -->
          <div class="space-y-3 flex flex-col items-center md:items-start">
            <!-- Logo avec effet de lueur -->
            <div class="space-logo-container">
              <div class="space-logo-glow"></div>
              <div
                class="text-color-primary-light font-nasa text-2xl tracking-wider"
              >
                ACS GAMING
              </div>
            </div>

            <div
              class="mt-2 text-color-accent-light font-mono text-xs tracking-widest animate-pulse-slow"
            >
              ALORS ÇA SCRIM
            </div>

            <!-- Année -->
            <div
              class="space-year font-mono text-xs text-color-text-muted mt-1"
            >
              <span class="year-label">STAR DATE:</span>
              <span class="year-value">{{ new Date().getFullYear() }}</span>
            </div>
          </div>

          <!-- Navigation centrale -->
          <div class="flex flex-col items-center justify-center">
            <div class="space-links-container mb-2">
              <div
                class="space-links-title font-nasa text-xs text-color-text-muted mb-4"
              >
                COMMUNICATIONS
              </div>

              <!-- Liens sociaux -->
              <div class="flex space-x-6">
                <!-- Discord -->
                <a
                  href="https://discord.gg/nH5cFvyVAG"
                  target="_blank"
                  class="space-social-link discord"
                >
                  <div class="space-social-icon-container">
                    <svg
                      class="space-social-icon"
                      viewBox="0 0 71 55"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                      />
                    </svg>
                    <div class="space-social-ring"></div>
                  </div>
                  <span class="space-social-label font-nasa">Discord</span>
                </a>

                <!-- Twitch -->
                <a
                  href="https://www.twitch.tv/tekninon"
                  target="_blank"
                  class="space-social-link twitch"
                >
                  <div class="space-social-icon-container">
                    <svg
                      class="space-social-icon"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43z"
                      />
                    </svg>
                    <div class="space-social-ring"></div>
                  </div>
                  <span class="space-social-label font-nasa">Twitch</span>
                </a>

                <!-- Email -->
                <a
                  href="mailto:ninon.jordao@outlook.fr"
                  class="space-social-link email"
                >
                  <div class="space-social-icon-container">
                    <svg
                      class="space-social-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="2"
                        y="4"
                        width="20"
                        height="16"
                        rx="2"
                        stroke-width="2"
                      />
                      <path d="M2 7l10 7 10-7" stroke-width="2" />
                    </svg>
                    <div class="space-social-ring"></div>
                  </div>
                  <span class="space-social-label font-nasa">Contact</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Version et crédits -->
          <div class="flex flex-col items-center md:items-end justify-center">
            <div class="space-version">
              <div
                class="space-version-label font-mono text-xs text-color-text-muted mb-2"
              >
                SYSTEM VERSION
              </div>
              <div
                class="space-version-number font-mono text-sm flex items-center"
              >
                <div class="space-version-chip mr-2 relative overflow-hidden">
                  <div class="space-version-blip"></div>
                  <span> v{{ appVersion }}</span>
                </div>
                <div class="space-version-status text-xs text-color-success">
                  ONLINE
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Séparateur -->
        <div class="space-separator">
          <div class="space-separator-line"></div>
          <div class="space-separator-dot"></div>
        </div>

        <!-- Ligne de crédits -->
        <div class="mt-6 text-center">
          <div class="text-color-text-muted text-xs font-mono">
            MADE WITH
            <span class="text-color-error animate-pulse">♥</span> IN THE DEEP
            SPACE
          </div>
        </div>
      </div>
    </div>

    <!-- Ligne de circuit inférieure -->
    <div class="space-circuit-line bottom">
      <div class="space-circuit-pulse reverse"></div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import pkg from "../../package.json";

// Utiliser directement la version du package.json
const appVersion = ref(pkg.version || "1.0.0");
</script>

<style scoped>
/* Grille spatiale */
.space-grid {
  background-image: linear-gradient(
      rgba(109, 40, 217, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(109, 40, 217, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  background-position: center center;
  transform: perspective(1000px) rotateX(60deg);
  transform-origin: center top;
  height: 120%;
  animation: grid-move 60s linear infinite;
}

@keyframes grid-move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 30px;
  }
}

/* Ligne de circuit */
.space-circuit-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-primary-light),
    transparent
  );
  z-index: 20;
}

.space-circuit-line.top {
  top: 0;
}

.space-circuit-line.bottom {
  bottom: 0;
}

.space-circuit-pulse {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-primary),
    transparent
  );
  animation: pulse-move 5s linear infinite;
}

.space-circuit-pulse.reverse {
  animation: pulse-move-reverse 5s linear infinite;
}

@keyframes pulse-move {
  0% {
    left: -50px;
  }
  100% {
    left: 100%;
  }
}

@keyframes pulse-move-reverse {
  0% {
    left: 100%;
  }
  100% {
    left: -50px;
  }
}

/* Logo */
.space-logo-container {
  position: relative;
  display: inline-block;
}

.space-logo-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-primary);
  filter: blur(15px);
  opacity: 0.3;
  z-index: -1;
  animation: logo-pulse 3s ease-in-out infinite;
}

@keyframes logo-pulse {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(0.95);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.05);
  }
}

/* Année stylisée */
.space-year {
  display: flex;
  align-items: center;
  gap: 6px;
}

.year-label {
  color: var(--color-primary-light);
}

.year-value {
  font-family: monospace;
  position: relative;
}

.year-value::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-primary-light),
    transparent
  );
}

/* Liens sociaux */
.space-social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
}

.space-social-icon-container {
  position: relative;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.space-social-icon {
  width: 18px;
  height: 18px;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.space-social-ring {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  border: 1px solid rgba(var(--color-primary-rgb), 0.4);
  transition: all 0.3s ease;
}

.space-social-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-text-muted);
  transition: all 0.3s ease;
}

/* Discord styling */
.space-social-link.discord {
  color: #5865f2;
}

.space-social-link.discord:hover {
  color: #7984f5;
}

.space-social-link.discord .space-social-ring {
  border-color: rgba(88, 101, 242, 0.4);
}

.space-social-link.discord:hover .space-social-ring {
  border-color: rgba(88, 101, 242, 0.8);
  transform: scale(1.2);
  box-shadow: 0 0 15px rgba(88, 101, 242, 0.4);
}

/* Twitch styling */
.space-social-link.twitch {
  color: #9146ff;
}

.space-social-link.twitch:hover {
  color: #a970ff;
}

.space-social-link.twitch .space-social-ring {
  border-color: rgba(145, 70, 255, 0.4);
}

.space-social-link.twitch:hover .space-social-ring {
  border-color: rgba(145, 70, 255, 0.8);
  transform: scale(1.2);
  box-shadow: 0 0 15px rgba(145, 70, 255, 0.4);
}

/* Email styling */
.space-social-link.email {
  color: var(--color-accent);
}

.space-social-link.email:hover {
  color: var(--color-accent-light);
}

.space-social-link.email .space-social-ring {
  border-color: rgba(var(--color-accent-rgb), 0.4);
}

.space-social-link.email:hover .space-social-ring {
  border-color: rgba(var(--color-accent-rgb), 0.8);
  transform: scale(1.2);
  box-shadow: 0 0 15px rgba(var(--color-accent-rgb), 0.4);
}

/* Hover effects for all social links */
.space-social-link:hover .space-social-icon {
  transform: translateY(-3px);
}

.space-social-link:hover .space-social-label {
  color: var(--color-text);
}

/* Version styling */
.space-version-chip {
  background: rgba(var(--color-bg-light-rgb), 0.5);
  border: 1px solid var(--color-primary-light);
  border-radius: 12px;
  padding: 2px 8px;
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  color: var(--color-text);
  box-shadow: 0 0 10px rgba(var(--color-primary-rgb), 0.3);
}

.space-version-blip {
  position: absolute;
  top: 50%;
  left: 6px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--color-success);
  transform: translate(-50%, -50%);
  animation: blip 2s infinite;
}

@keyframes blip {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

/* Séparateur */
.space-separator {
  position: relative;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.space-separator-line {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-primary-light),
    transparent
  );
  width: 80%;
}

.space-separator-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--color-primary-light);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--color-primary);
}

/* Animation pour pulse lent */
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Vaisseau spatial */
.spaceship {
  position: absolute;
  top: 20%;
  left: -100px;
  width: 40px;
  height: 10px;
  z-index: 5;
  animation: fly-through 15s linear infinite;
  transform: rotate(15deg);
}

.spaceship-body {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--color-bg-light),
    var(--color-primary-dark)
  );
  clip-path: polygon(0% 50%, 20% 0%, 100% 40%, 100% 60%, 20% 100%);
}

.spaceship-engine {
  position: absolute;
  right: -5px;
  top: 3px;
  width: 6px;
  height: 4px;
  background-color: var(--color-accent);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--color-accent-light);
  animation: engine-glow 0.5s ease-in-out infinite alternate;
}

.spaceship-trail {
  position: absolute;
  top: 3px;
  right: -20px;
  width: 20px;
  height: 4px;
  background: linear-gradient(90deg, var(--color-accent), transparent);
  opacity: 0.7;
}

@keyframes fly-through {
  0% {
    left: -100px;
    transform: rotate(15deg) translateY(0px);
  }
  20% {
    transform: rotate(5deg) translateY(20px);
  }
  40% {
    transform: rotate(-5deg) translateY(-10px);
  }
  60% {
    transform: rotate(10deg) translateY(5px);
  }
  80% {
    transform: rotate(-10deg) translateY(-5px);
  }
  100% {
    left: calc(100% + 100px);
    transform: rotate(15deg) translateY(0px);
  }
}

@keyframes engine-glow {
  0% {
    opacity: 0.7;
    box-shadow: 0 0 5px var(--color-accent-light);
  }
  100% {
    opacity: 1;
    box-shadow: 0 0 15px var(--color-accent-light);
  }
}
</style>
