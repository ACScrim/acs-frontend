<template>
  <div class="relative group" :class="containerClassName">
    <label class="space-toggle flex items-center cursor-pointer">
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
          size === 'sm' ? 'toggle-track-mobile' : '',
          className,
        ]"
      >
        <div
          :class="['toggle-thumb', size === 'sm' ? 'toggle-thumb-mobile' : '']"
        ></div>
        <div class="toggle-stars">
          <div
            v-for="i in 5"
            :key="`toggle-star-${i}`"
            class="toggle-star"
            :style="{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 2}s`,
            }"
          ></div>
        </div>
      </div>

      <span v-if="label" class="ml-2 text-xs text-space-text-muted font-nasa">{{
        label
      }}</span>
      <slot></slot>
    </label>

    <div v-if="tooltip" class="tooltip-text">{{ tooltip }}</div>
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
.space-toggle {
  position: relative;
}

.toggle-track {
  width: 42px;
  height: 22px;
  background: rgba(var(--space-bg-light-rgb), 0.3);
  border: 1px solid rgba(var(--space-primary-rgb), 0.3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 2px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.toggle-thumb {
  width: 16px;
  height: 16px;
  background: var(--space-primary-light);
  border-radius: 50%;
  box-shadow: 0 0 5px var(--space-primary);
  transition: transform 0.3s ease, background 0.3s;
  position: relative;
  z-index: 2;
}

.toggle-stars {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.toggle-star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  animation: star-twinkle 3s infinite;
}

@keyframes star-twinkle {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.7;
  }
}

input:checked + .toggle-track {
  background: rgba(var(--space-accent-rgb), 0.3);
  border-color: rgba(var(--space-accent-rgb), 0.5);
}

input:checked + .toggle-track .toggle-thumb {
  transform: translateX(20px);
  background: var(--space-accent-light);
  box-shadow: 0 0 5px var(--space-accent);
}

.toggle-track:hover {
  border-color: rgba(var(--space-primary-rgb), 0.6);
  box-shadow: 0 0 8px rgba(var(--space-primary-rgb), 0.2);
}

input:checked + .toggle-track:hover {
  border-color: rgba(var(--space-accent-rgb), 0.6);
  box-shadow: 0 0 8px rgba(var(--space-accent-rgb), 0.2);
}

/* Style pour la version mobile/small */
.toggle-track-mobile {
  width: 36px;
  height: 20px;
  border-radius: 10px;
}

.toggle-thumb-mobile {
  width: 14px;
  height: 14px;
}

input:checked + .toggle-track-mobile .toggle-thumb {
  transform: translateX(16px);
}

/* Style pour le tooltip */
.tooltip-text {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(var(--space-bg-rgb), 0.8);
  color: var(--space-primary-light);
  font-size: 0.7rem;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(var(--space-primary-rgb), 0.3);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  white-space: nowrap;
  z-index: 100;
  backdrop-filter: blur(5px);
}

.group:hover .tooltip-text {
  opacity: 1;
}

/* Style pour le toggle désactivé */
input:disabled + .toggle-track {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
