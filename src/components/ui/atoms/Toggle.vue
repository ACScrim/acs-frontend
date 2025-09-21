<!--
  TOGGLE COMPONENT - Composant d'interrupteur on/off avec thème Halloween
  
  Ce composant affiche un toggle switch stylisé avec une esthétique Halloween.
  Il supporte deux tailles (default/sm), des labels, des tooltips et peut être désactivé.
  
  Props:
  - modelValue (Boolean): État du toggle (true/false)
  - label (String): Texte à afficher à côté du toggle
  - tooltip (String): Texte d'aide affiché au survol
  - disabled (Boolean): Désactive le toggle
  - size (String): Taille du toggle ('default' ou 'sm')
  - className (String): Classes CSS additionnelles pour le track
  - containerClassName (String): Classes CSS additionnelles pour le conteneur
  
  Émissions:
  - update:modelValue: Émis quand l'état du toggle change
  
  Exemple d'utilisation:
  <Toggle v-model="isActive" label="Mode sombre" tooltip="Active le mode sombre" />
-->
<template>
  <div class="relative group" :class="containerClassName">
    <label class="toggle-container flex items-center cursor-pointer">
      <input
        type="checkbox"
        :checked="modelValue"
        @change="
          $emit(
            'update:modelValue',
            ($event.target as HTMLInputElement).checked
          )
        "
        class="hidden"
        :disabled="disabled"
      />
      <div
        :class="[
          'toggle-track relative',
          size === 'sm' ? 'toggle-track-small' : '',
          className,
        ]"
      >
        <div
          :class="['toggle-thumb', size === 'sm' ? 'toggle-thumb-small' : '']"
        ></div>
        <div class="toggle-effects">
          <div
            v-for="i in 4"
            :key="`toggle-spark-${i}`"
            class="toggle-spark"
            :style="{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }"
          ></div>
        </div>
      </div>

      <span v-if="label" class="ml-2 text-xs text-color-text-muted font-body">{{
        label
      }}</span>
      <slot></slot>
    </label>

    <div v-if="tooltip" class="tooltip-content">{{ tooltip }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  tooltip: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "default", // 'default' ou 'sm'
    validator: (value: string) => ["default", "sm"].includes(value),
  },
  className: {
    type: String,
    default: "",
  },
  containerClassName: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);
</script>

<style scoped>
/* Toggle Container */
.toggle-container {
  position: relative;
  font-family: var(--font-body);
}

/* Toggle Track - Rail principal du toggle */
.toggle-track {
  width: 42px;
  height: 22px;
  background: var(--color-bg-dark);
  border: 1px solid var(--color-primary-dark);
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 2px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Toggle Thumb - Bouton mobile du toggle */
.toggle-thumb {
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  border-radius: 50%;
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.4),
    0 0 8px rgba(var(--color-primary-rgb), 0.3);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  z-index: 2;
  border: 1px solid var(--color-primary-dark);
}

/* Effets visuels Halloween */
.toggle-effects {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.toggle-spark {
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: var(--color-primary-light);
  border-radius: 50%;
  animation: halloween-sparkle 3s infinite ease-in-out;
  box-shadow: 0 0 4px var(--color-primary);
}

/* Animations Halloween */
@keyframes halloween-sparkle {
  0%, 100% {
    opacity: 0.2;
    transform: scale(0.8);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.2);
  }
}

@keyframes halloween-glow {
  0%, 100% {
    box-shadow: 
      0 2px 4px rgba(0, 0, 0, 0.4),
      0 0 8px rgba(var(--color-primary-rgb), 0.3);
  }
  50% {
    box-shadow: 
      0 2px 4px rgba(0, 0, 0, 0.4),
      0 0 12px rgba(var(--color-primary-rgb), 0.5);
  }
}

/* États du toggle */
input:checked + .toggle-track {
  background: var(--color-bg-light);
  border-color: var(--color-accent);
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.3),
    0 0 8px rgba(var(--color-accent-rgb), 0.2);
}

input:checked + .toggle-track .toggle-thumb {
  transform: translateX(20px);
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-light));
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.4),
    0 0 8px rgba(var(--color-accent-rgb), 0.4);
  border-color: var(--color-accent-dark);
  animation: halloween-glow 2s infinite ease-in-out;
}

input:checked + .toggle-track .toggle-spark {
  background-color: var(--color-accent-light);
  box-shadow: 0 0 4px var(--color-accent);
}

/* Hover states */
.toggle-track:hover {
  border-color: var(--color-primary);
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.3),
    0 0 8px rgba(var(--color-primary-rgb), 0.3);
}

input:checked + .toggle-track:hover {
  border-color: var(--color-accent-light);
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.3),
    0 0 12px rgba(var(--color-accent-rgb), 0.4);
}

/* Taille small pour mobile */
.toggle-track-small {
  width: 36px;
  height: 20px;
  border-radius: 10px;
}

.toggle-thumb-small {
  width: 14px;
  height: 14px;
}

input:checked + .toggle-track-small .toggle-thumb {
  transform: translateX(16px);
}

/* Tooltip Halloween */
.tooltip-content {
  position: absolute;
  bottom: -32px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 0.75rem;
  font-family: var(--font-body);
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid var(--color-primary-dark);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  white-space: nowrap;
  z-index: 100;
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.4),
    0 0 8px rgba(var(--color-primary-rgb), 0.2);
}

.tooltip-content::before {
  content: '';
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid var(--color-primary-dark);
}

.group:hover .tooltip-content {
  opacity: 1;
  transform: translateX(-50%) translateY(-2px);
}

/* État désactivé */
input:disabled + .toggle-track {
  opacity: 0.4;
  cursor: not-allowed;
  background: var(--color-bg-dark);
  border-color: var(--color-text-dark);
}

input:disabled + .toggle-track .toggle-thumb {
  background: var(--color-text-dark);
  box-shadow: none;
}

input:disabled + .toggle-track .toggle-spark {
  display: none;
}

.toggle-container:has(input:disabled) {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Focus states pour l'accessibilité */
input:focus + .toggle-track {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

input:checked:focus + .toggle-track {
  outline-color: var(--color-accent);
}

/* Animation d'entrée pour les effets */
.toggle-effects .toggle-spark:nth-child(1) { animation-delay: 0s; }
.toggle-effects .toggle-spark:nth-child(2) { animation-delay: 0.5s; }
.toggle-effects .toggle-spark:nth-child(3) { animation-delay: 1s; }
.toggle-effects .toggle-spark:nth-child(4) { animation-delay: 1.5s; }
</style>
