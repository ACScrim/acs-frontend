<template>
  <div
    :class="['west-wanted', className]"
    role="region"
    aria-label="Avis de recherche"
  >
    <!-- En-tête de l'affiche WANTED -->
    <div class="west-wanted-header">
      <div class="west-wanted-rivets" aria-hidden="true">
        <span class="rivet"></span>
        <span class="rivet"></span>
        <span class="rivet"></span>
      </div>
      <div class="west-wanted-title" aria-hidden="true">WANTED</div>
      <div class="west-wanted-stamp">
        <slot name="icon">
          <!-- Sceau par défaut -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M12 2l1.546 3.134 3.458.502-2.502 2.438.59 3.44L12 10.77 8.908 11.514l.59-3.44L7 5.636l3.458-.502L12 2z"
            />
          </svg>
        </slot>
      </div>
    </div>

    <!-- Corps de l'affiche -->
    <div class="west-wanted-body">
      <div class="wanted-subject">{{ title }}</div>
      <div class="wanted-message" v-if="command">{{ command }}</div>

      <div class="west-wanted-content">
        <slot></slot>
      </div>

      <div v-if="showCursor" class="wanted-footer-hint">
        <span class="hint-text">Repassez plus tard pour plus d'infos</span>
        <span class="hint-blink">_</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string; // Sujet/entité recherchée ou message principal
  command?: string; // Message secondaire: raison, état, etc.
  showCursor?: boolean; // Affiche un petit curseur clignotant d'attente
  className?: string; // Classes additionnelles
}

withDefaults(defineProps<Props>(), {
  title: "Informations manquantes",
  command: "",
  showCursor: false,
  className: "",
});
</script>

<style scoped>
.west-wanted {
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(245, 231, 200, 0.9),
    rgba(230, 210, 175, 0.92)
  );
  border: 1px solid rgba(var(--color-card-border-rgb, 194, 143, 44), 0.6);
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  overflow: hidden;
  font-family: var(--font-body, "Roboto Slab", serif);
}

/* Bordure corde/chanvre */
.west-wanted::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 10px;
  padding: 8px;
  background: radial-gradient(
        circle at 10px 10px,
        rgba(0, 0, 0, 0.25),
        transparent 10px
      )
      top left,
    radial-gradient(
        circle at calc(100% - 10px) 10px,
        rgba(0, 0, 0, 0.25),
        transparent 10px
      )
      top right,
    radial-gradient(
        circle at 10px calc(100% - 10px),
        rgba(0, 0, 0, 0.25),
        transparent 10px
      )
      bottom left,
    radial-gradient(
        circle at calc(100% - 10px) calc(100% - 10px),
        rgba(0, 0, 0, 0.25),
        transparent 10px
      )
      bottom right,
    repeating-linear-gradient(
      90deg,
      rgba(120, 80, 40, 0.6) 0 10px,
      rgba(60, 35, 20, 0.55) 10px 12px
    );
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.west-wanted-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(
    180deg,
    rgba(53, 37, 25, 0.9),
    rgba(43, 30, 20, 0.92)
  );
  color: var(--normal-text);
  border-bottom: 1px solid rgba(var(--color-card-border-rgb, 194, 143, 44), 0.5);
  position: relative;
}

.west-wanted-rivets {
  display: flex;
  gap: 0.375rem;
}

.rivet {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.6),
    rgba(167, 119, 44, 0.9)
  );
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.4),
    0 1px 0 rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(95, 66, 30, 0.8);
}

.west-wanted-title {
  margin: 0 auto;
  font-family: var(--font-display, "Rye", serif);
  font-size: 1.1rem;
  letter-spacing: 0.25rem;
  color: rgba(245, 231, 200, 0.95);
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
}

.west-wanted-stamp {
  color: rgba(var(--color-accent-rgb, 194, 143, 44), 0.95);
  transform: rotate(-12deg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.west-wanted-body {
  padding: 1rem 1.25rem 1.25rem;
}

.wanted-subject {
  font-family: var(--font-display, "Rye", serif);
  font-size: 1.25rem;
  color: #2c1e14;
  text-align: center;
  line-height: 1.2;
}

@media (min-width: 640px) {
  .wanted-subject {
    font-size: 1.5rem;
  }
}

.wanted-message {
  margin-top: 0.25rem;
  text-align: center;
  color: #3b2a1e;
  opacity: 0.9;
}

.west-wanted-content {
  margin: 0.75rem auto 0;
  color: var(--normal-text);
  line-height: 1.6;
}

.wanted-footer-hint {
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  color: #3b2a1e;
}

.hint-text {
  opacity: 0.9;
}
.hint-blink {
  font-weight: bold;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
