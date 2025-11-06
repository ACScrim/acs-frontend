<template>
  <div class="space-dropdown relative">
    <label
      v-if="label"
      :for="id"
      class="dropdown-label text-lg text-color-primary-light mb-3 font-heading flex items-center"
    >
      <slot name="icon"></slot>
      {{ label }}
      <span v-if="required" class="text-space-accent ml-1">*</span>
    </label>

    <div class="relative">
      <select
        :id="id"
        :value="modelValue"
        @change="
          $emit(
            'update:modelValue',
            ($event.target as HTMLSelectElement).value
          );
          $emit('change', ($event.target as HTMLSelectElement).value);
        "
        class="dropdown-select w-full rounded-lg p-3 text-color-text font-body outline-none appearance-none mystical-transition"
        :class="{
          'dropdown-select--disabled': disabled,
          'dropdown-select--error': error,
        }"
        :disabled="disabled"
        :required="required"
        :aria-label="label || placeholder"
      >
        <option v-if="placeholder" value="" disabled selected>
          {{ placeholder }}
        </option>
        <slot></slot>
      </select>

      <div
        class="dropdown-arrow absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-color-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mystical-transition"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <div v-if="error" class="text-space-error text-sm mt-1">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  id: {
    type: String,
    default: () => `dropdown-${Math.random().toString(36).substr(2, 9)}`,
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Sélectionnez une option",
  },
  error: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue", "change"]);
</script>

<style scoped>
.space-dropdown select {
  transition: all 0.2s ease;
}

/* Label avec effet terrifiant */
.dropdown-label {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 10px rgba(var(--color-primary-rgb), 0.4);
  transition: all 0.3s ease;
}

.dropdown-label:hover {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 15px rgba(var(--color-primary-rgb), 0.6);
}

/* Conteneur du select avec effets mystiques */
.dropdown-container {
  position: relative;
}

.dropdown-container::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 8px;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(var(--color-primary-rgb), 0.5) 0%,
    rgba(var(--color-accent-rgb), 0.3) 50%,
    rgba(var(--color-secondary-rgb), 0.4) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: exclude;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.dropdown-container:hover::before {
  opacity: 1;
  background: linear-gradient(
    135deg,
    rgba(var(--color-primary-rgb), 0.8) 0%,
    rgba(var(--color-accent-rgb), 0.6) 50%,
    rgba(var(--color-secondary-rgb), 0.7) 100%
  );
}

/* Select principal avec design Halloween */
.dropdown-select {
  background: #1a1a1a !important;
  border: 2px solid rgba(var(--color-primary-rgb), 0.3);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(var(--color-primary-rgb), 0.1);
  backdrop-filter: blur(8px);
  cursor: pointer;
  color: #f5f5f5 !important;
  color-scheme: dark !important;
}

.dropdown-select:hover {
  border-color: rgba(var(--color-primary-rgb), 0.6);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.4),
    0 0 25px rgba(var(--color-primary-rgb), 0.2),
    0 0 40px rgba(var(--color-accent-rgb), 0.1);
  transform: translateY(-1px);
}

.dropdown-select:focus {
  border-color: var(--color-primary);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(var(--color-primary-rgb), 0.4),
    0 0 60px rgba(var(--color-accent-rgb), 0.2);
  transform: translateY(-2px);
}

/* États spéciaux */
.dropdown-select--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: rgba(var(--color-bg-light-rgb), 0.3);
  border-color: rgba(var(--color-text-muted), 0.3);
}

.dropdown-select--disabled:hover {
  transform: none;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
}

.dropdown-select--error {
  border-color: rgba(var(--color-error-rgb), 0.6);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(var(--color-error-rgb), 0.2);
}

.dropdown-select--error:focus {
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(var(--color-error-rgb), 0.4);
}

/* Flèche avec animation mystique */
.dropdown-arrow {
  pointer-events: none;
}

.dropdown-select:hover + .dropdown-arrow svg {
  color: var(--color-primary-light);
  filter: drop-shadow(0 0 5px rgba(var(--color-primary-rgb), 0.6));
  transform: rotate(180deg);
}

.dropdown-select:focus + .dropdown-arrow svg {
  color: var(--color-primary);
  filter: drop-shadow(0 0 8px rgba(var(--color-primary-rgb), 0.8));
  transform: rotate(180deg) scale(1.1);
}

/* Styles pour les options */
.dropdown-select option {
  background: #000000 !important;
  color: #f5f5f5 !important;
  padding: 12px 16px;
  font-family: var(--font-body) !important;
  border: none !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.dropdown-select option:hover {
  background: linear-gradient(
    135deg,
    rgba(var(--color-primary-rgb), 0.3) 0%,
    rgba(var(--color-accent-rgb), 0.2) 100%
  ) !important;
  color: #f5f5f5 !important;
  box-shadow: inset 0 0 10px rgba(var(--color-primary-rgb), 0.3);
}

.dropdown-select option:checked,
.dropdown-select option:selected {
  background: linear-gradient(
    135deg,
    rgba(var(--color-primary-rgb), 0.5) 0%,
    rgba(var(--color-accent-rgb), 0.4) 100%
  ) !important;
  color: #f5f5f5 !important;
  font-weight: 600;
  text-shadow: 0 0 5px rgba(var(--color-primary-rgb), 0.8);
}

.dropdown-select option:disabled {
  background-color: rgba(var(--color-bg-light-rgb), 0.3) !important;
  color: var(--color-text-muted) !important;
  opacity: 0.5;
}

.dropdown-placeholder {
  color: #a3a3a3 !important;
  font-style: italic;
}

/* Message d'erreur avec effet terrifiant */
.dropdown-error {
  text-shadow: 0 0 5px rgba(var(--color-error-rgb), 0.6);
  animation: horror-pulse 2s ease-in-out infinite;
}

/* Animations Halloween */
@keyframes horror-pulse {
  0%,
  100% {
    text-shadow: 0 0 5px rgba(var(--color-error-rgb), 0.6);
  }
  50% {
    text-shadow: 0 0 10px rgba(var(--color-error-rgb), 0.8),
      0 0 20px rgba(var(--color-error-rgb), 0.4);
  }
}

/* Animation d'apparition mystique */
.horror-dropdown {
  animation: mystical-appear 0.6s ease-out;
}

/* Effet de lueur au focus pour l'accessibilité */
.dropdown-select:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Responsive design */
@media (max-width: 640px) {
  .dropdown-label {
    font-size: 1rem;
  }

  .dropdown-select {
    padding: 0.75rem;
  }
}

/* Amélioration des performances selon les préférences utilisateur */
@media (prefers-reduced-motion: reduce) {
  .dropdown-select,
  .dropdown-arrow svg,
  .dropdown-error {
    transition: none;
    animation: none;
  }

  .horror-dropdown {
    animation: none;
  }

  .dropdown-container::before {
    transition: none;
  }
}

/* Mode sombre amélioré */
@media (prefers-color-scheme: dark) {
  .dropdown-select option {
    background-color: #000000 !important;
  }
}
</style>
