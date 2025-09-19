<!--
  🎃 HORROR TERMINAL COMPONENT - Documentation d'utilisation
  
  Composant terminal mystique avec thème Halloween pour affichage d'erreurs et messages.
  
  📋 PROPS :
  • title : string - Titre affiché dans l'en-tête (défaut: "Terminal")
  • command : string - Commande affichée avant le contenu
  • showCursor : boolean - Affiche/cache le curseur clignotant (défaut: true)
  • className : string - Classes CSS additionnelles
  
  🎨 SLOTS :
  • default : Contenu principal du terminal
  • icon : Icône personnalisée dans l'en-tête
  
  💡 EXEMPLES :
  <Terminal title="Console Maudite" command="invoke_horror --target=players">
    Erreur 404: Âmes perdues introuvables...
  </Terminal>
-->
<template>
  <div :class="['terminal', className]">
    <!-- En-tête du terminal -->
    <div class="terminal-header">
      <div class="terminal-controls">
        <div class="terminal-control"></div>
        <div class="terminal-control"></div>
        <div class="terminal-control"></div>
      </div>
      <div class="terminal-title">{{ title }}</div>
      <div class="terminal-icon">
        <slot name="icon">
          <!-- Icône de crâne Halloween par défaut -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1s1-.45 1-1v-1h4v1c0 .55.45 1 1 1s1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zM9 11c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-3 4c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z"
            />
          </svg>
        </slot>
      </div>
    </div>

    <!-- Corps du terminal -->
    <div class="terminal-body">
      <!-- Lignes de commande -->
      <div class="terminal-line">
        <span class="terminal-prompt">></span>
        <span class="terminal-command">{{ command }}</span>
      </div>

      <!-- Contenu -->
      <div class="terminal-content">
        <slot></slot>
      </div>

      <!-- Ligne de curseur -->
      <div v-if="showCursor" class="terminal-line">
        <span class="terminal-prompt">></span>
        <span class="terminal-cursor blink">_</span>
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
.terminal {
  background-color: rgba(15, 15, 15, 0.95);
  border-radius: 0.5rem;
  overflow: hidden;
  font-family: var(--font-mono);
  border: 2px solid var(--color-primary);
  box-shadow: var(--shadow-glow-primary), 0 8px 32px rgba(0, 0, 0, 0.8);
  position: relative;
}

.terminal-header {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background: linear-gradient(
    135deg,
    rgba(217, 119, 6, 0.1) 0%,
    rgba(124, 45, 18, 0.1) 50%,
    rgba(88, 28, 135, 0.1) 100%
  );
  border-bottom: 1px solid var(--color-primary);
}

.terminal-controls {
  display: flex;
  gap: 0.5rem;
  margin-right: 1rem;
}

.terminal-control {
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--color-secondary),
    var(--color-secondary-dark)
  );
  border: 1px solid var(--color-secondary-light);
  box-shadow: 0 0 4px rgba(220, 38, 38, 0.4);
}

.terminal-title {
  flex-grow: 1;
  font-size: 0.875rem;
  color: var(--color-text);
  text-align: center;
  font-weight: 600;
  font-family: var(--font-body);
  text-shadow: 0 0 8px rgba(217, 119, 6, 0.5);
}

.terminal-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-secondary-light);
  filter: drop-shadow(0 0 4px rgba(220, 38, 38, 0.6));
}

.terminal-body {
  padding: 1.25rem;
  min-height: 120px;
  background: linear-gradient(
    180deg,
    rgba(15, 15, 15, 0.9) 0%,
    rgba(15, 15, 15, 0.95) 100%
  );
}

.terminal-line {
  display: flex;
  margin-bottom: 0.75rem;
  align-items: baseline;
}

.terminal-prompt {
  color: var(--color-primary);
  margin-right: 0.75rem;
  font-weight: bold;
  text-shadow: 0 0 8px var(--color-primary);
}

.terminal-command {
  color: var(--color-secondary-light);
  font-weight: 500;
  text-shadow: 0 0 4px rgba(220, 38, 38, 0.3);
}

.terminal-content {
  margin: 1.25rem 0;
  color: var(--color-text);
  line-height: 1.6;
  text-shadow: 0 0 2px rgba(245, 245, 245, 0.1);
}

.terminal-cursor {
  color: var(--color-primary-light);
  font-weight: bold;
  text-shadow: 0 0 8px var(--color-primary-light);
}

/* Animation de clignotement Halloween */
.blink {
  animation: horror-blink 1.2s ease-in-out infinite;
}

@keyframes horror-blink {
  0%,
  70% {
    opacity: 1;
    transform: scale(1);
  }
  85% {
    opacity: 0;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Effet de lueur mystique sur les bordures */
.terminal::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(
    45deg,
    var(--color-primary),
    var(--color-secondary),
    var(--color-accent),
    var(--color-primary)
  );
  background-size: 400% 400%;
  border-radius: 0.5rem;
  z-index: -1;
  animation: horror-border 4s ease-in-out infinite;
  opacity: 0.6;
}

@keyframes horror-border {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Effet de particules flottantes */
.terminal::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(
      1px 1px at 20% 30%,
      var(--color-accent-light),
      transparent
    ),
    radial-gradient(1px 1px at 40% 70%, var(--color-primary), transparent),
    radial-gradient(1px 1px at 90% 40%, var(--color-secondary), transparent),
    radial-gradient(1px 1px at 60% 10%, var(--color-accent), transparent);
  background-size: 50px 50px, 80px 80px, 40px 40px, 60px 60px;
  animation: float-particles 8s linear infinite;
  opacity: 0.3;
  pointer-events: none;
}

@keyframes float-particles {
  0% {
    background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
  100% {
    background-position: 100% 100%, -100% 100%, 100% -100%, -100% -100%;
  }
}

/* Amélioration responsive */
@media (max-width: 640px) {
  .terminal-header {
    padding: 0.5rem 0.75rem;
  }

  .terminal-body {
    padding: 1rem;
    min-height: 100px;
  }

  .terminal-title {
    font-size: 0.75rem;
  }
}
</style>
