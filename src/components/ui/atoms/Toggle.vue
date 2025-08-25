<template>
  <div class="relative group" :class="containerClassName">
    <label class="toggle flex items-center cursor-pointer select-none">
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
      </div>

      <span
        v-if="label"
        class="ml-2 text-xs text-normal-text-muted font-heading"
        >{{ label }}</span
      >
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
.toggle {
  position: relative;
}

.toggle-track {
  width: 42px;
  height: 22px;
  background: repeating-linear-gradient(
    90deg,
    rgba(var(--background-bg-rgb), 0.55) 0 8px,
    rgba(var(--background-bg-light-rgb), 0.45) 8px 16px
  );
  border: 1px solid rgba(var(--color-primary-rgb), 0.35);
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 2px;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.toggle-track::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1px dashed rgba(var(--color-primary-rgb), 0.45);
  pointer-events: none;
}

.toggle-track::after {
  content: "";
  position: absolute;
  inset: -20%;
  border-radius: 999px;
  background: radial-gradient(
    circle,
    rgba(var(--color-accent-rgb), 0.35),
    transparent 60%
  );
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.toggle-thumb {
  width: 16px;
  height: 16px;
  background: radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.25),
      transparent 60%
    ),
    var(--color-primary-light);
  border-radius: 50%;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.35), 0 1px 2px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.25);
  transition: transform 0.25s ease, background 0.25s, box-shadow 0.25s;
  position: relative;
  z-index: 2;
}

.toggle-thumb::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 40%;
  height: 2px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.25);
  border-radius: 1px;
}

input:checked + .toggle-track {
  background: repeating-linear-gradient(
    90deg,
    rgba(var(--color-accent-rgb), 0.25) 0 8px,
    rgba(var(--color-accent-rgb), 0.15) 8px 16px
  );
  border-color: rgba(var(--color-accent-rgb), 0.6);
}

input:checked + .toggle-track .toggle-thumb {
  transform: translateX(20px);
  background: radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.25),
      transparent 60%
    ),
    var(--color-accent-light);
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.25),
    0 0 6px rgba(var(--color-accent-rgb), 0.6);
}

.toggle-track:hover {
  border-color: rgba(var(--color-primary-rgb), 0.6);
  box-shadow: 0 0 8px rgba(var(--color-primary-rgb), 0.18);
}

input:checked + .toggle-track:hover {
  border-color: rgba(var(--color-accent-rgb), 0.6);
  box-shadow: 0 0 8px rgba(var(--color-accent-rgb), 0.22);
}

/* brand flash when toggled on */
input:checked + .toggle-track::after {
  opacity: 0.35;
  transform: scale(1);
  animation: brand-flash 0.6s ease-out;
}

@keyframes brand-flash {
  0% {
    opacity: 0.6;
    transform: scale(0.92);
  }
  100% {
    opacity: 0;
    transform: scale(1.2);
  }
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
  background: rgba(var(--background-bg-rgb), 0.8);
  color: var(--color-primary-light);
  font-size: 0.7rem;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(var(--color-primary-rgb), 0.3);
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

/* Focus-visible for accessibility */
input:focus-visible + .toggle-track {
  outline: 2px solid rgba(var(--color-accent-rgb), 0.6);
  outline-offset: 2px;
}
</style>
