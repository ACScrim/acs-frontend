<template>
  <div :class="['space-terminal', className]">
    <!-- En-tête du terminal -->
    <div class="space-terminal-header">
      <div class="space-terminal-controls">
        <div class="space-terminal-control"></div>
        <div class="space-terminal-control"></div>
        <div class="space-terminal-control"></div>
      </div>
      <div class="space-terminal-title">{{ title }}</div>
      <div class="space-terminal-icon">
        <slot name="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clip-rule="evenodd"
            />
          </svg>
        </slot>
      </div>
    </div>

    <!-- Corps du terminal -->
    <div class="space-terminal-body">
      <!-- Lignes de commande -->
      <div class="space-terminal-line">
        <span class="space-terminal-prompt">></span>
        <span class="space-terminal-command">{{ command }}</span>
      </div>

      <!-- Contenu -->
      <div class="space-terminal-content">
        <slot></slot>
      </div>

      <!-- Ligne de curseur -->
      <div v-if="showCursor" class="space-terminal-line">
        <span class="space-terminal-prompt">></span>
        <span class="space-terminal-cursor blink">_</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  command?: string;
  showCursor?: boolean;
  className?: string;
}

withDefaults(defineProps<Props>(), {
  title: "Terminal",
  command: "",
  showCursor: true,
  className: "",
});
</script>

<style scoped>
.space-terminal {
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 0.5rem;
  overflow: hidden;
  font-family: "Space Mono", monospace;
  border: 1px solid var(--space-bg-light);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  position: relative;
}

.space-terminal-header {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: rgba(30, 41, 59, 0.5);
  border-bottom: 1px solid var(--space-bg-light);
}

.space-terminal-controls {
  display: flex;
  gap: 0.375rem;
  margin-right: 1rem;
}

.space-terminal-control {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: var(--space-bg-light);
  border: 1px solid rgba(30, 41, 59, 0.7);
}

.space-terminal-title {
  flex-grow: 1;
  font-size: 0.75rem;
  color: var(--space-text-muted);
  text-align: center;
}

.space-terminal-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--space-secondary);
}

.space-terminal-body {
  padding: 1rem;
  min-height: 100px;
}

.space-terminal-line {
  display: flex;
  margin-bottom: 0.5rem;
  align-items: baseline;
}

.space-terminal-prompt {
  color: var(--space-primary);
  margin-right: 0.5rem;
  font-weight: bold;
}

.space-terminal-command {
  color: var(--space-secondary-light);
  font-weight: 500;
}

.space-terminal-content {
  margin: 1rem 0;
  color: var(--space-text);
  line-height: 1.5;
}

.space-terminal-cursor {
  color: var(--space-primary-light);
  font-weight: bold;
}

.blink {
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

/* Effet de scan de ligne */
.space-terminal::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(109, 40, 217, 0.5),
    transparent
  );
  animation: scan-line 6s linear infinite;
  opacity: 0.5;
}

@keyframes scan-line {
  0% {
    top: 0;
  }
  100% {
    top: 100%;
  }
}
</style>
