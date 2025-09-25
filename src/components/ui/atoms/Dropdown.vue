<template>
  <div class="horror-dropdown relative">
    <label
      v-if="label"
      :for="id"
      class="dropdown-label text-sm text-color-text mb-2 font-body flex items-center"
    >
      <slot name="icon"></slot>
      {{ label }}
      <span v-if="required" class="text-color-accent ml-1">*</span>
    </label>

    <div class="dropdown-container relative">
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
        class="dropdown-select w-full rounded-lg px-3 py-2 text-color-text font-body outline-none appearance-none mystical-transition text-sm"
        :class="{
          'dropdown-select--disabled': disabled,
          'dropdown-select--error': error,
        }"
        :disabled="disabled"
        :required="required"
        :aria-label="label || placeholder"
      >
        <option
          v-if="placeholder"
          value=""
          disabled
          selected
          class="dropdown-placeholder"
        >
          {{ placeholder }}
        </option>
        <slot></slot>
      </select>

      <div
        class="dropdown-arrow absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-color-text"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mystical-transition"
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

    <div
      v-if="error"
      class="dropdown-error text-color-error text-sm mt-2 font-body"
    >
      <span class="text-glow">⚠️ {{ error }}</span>
    </div>
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
/* Conteneur principal du dropdown Halloween */
.horror-dropdown {
  position: relative;
}

/* Label plus discret */
.dropdown-label {
  text-shadow: none;
  transition: all 0.3s ease;
  color: rgba(var(--color-text-rgb), 0.8);
}

.dropdown-label:hover {
  color: rgba(var(--color-text-rgb), 1);
}

/* Conteneur du select simplifié */
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
    rgba(var(--color-primary-rgb), 0.3) 0%,
    rgba(var(--color-accent-rgb), 0.2) 50%,
    rgba(var(--color-secondary-rgb), 0.25) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: exclude;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0.4;
  transition: all 0.3s ease;
}

.dropdown-container:hover::before {
  opacity: 0.7;
}

/* Select principal plus compact */
.dropdown-select {
  background: rgba(26, 26, 26, 0.9) !important;
  border: 1px solid rgba(var(--color-primary-rgb), 0.3);
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.4),
    0 0 10px rgba(var(--color-primary-rgb), 0.1);
  backdrop-filter: blur(4px);
  cursor: pointer;
  color: #f5f5f5 !important;
  color-scheme: dark !important;
  line-height: 1.4;
}

.dropdown-select:hover {
  border-color: rgba(var(--color-primary-rgb), 0.5);
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.4),
    0 0 15px rgba(var(--color-primary-rgb), 0.2);
}

.dropdown-select:focus {
  border-color: rgba(var(--color-primary-rgb), 0.7);
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(var(--color-primary-rgb), 0.3);
  outline: none;
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
  background: #1a1a1a !important;
  color: #f5f5f5 !important;
  padding: 8px 12px;
  font-family: var(--font-body) !important;
  border: none !important;
  font-size: 0.875rem;
}

.dropdown-select option:hover {
  background: rgba(var(--color-primary-rgb), 0.2) !important;
  color: #f5f5f5 !important;
}

.dropdown-select option:checked,
.dropdown-select option:selected {
  background: rgba(var(--color-primary-rgb), 0.3) !important;
  color: #f5f5f5 !important;
  font-weight: 500;
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

/* Placeholder discret */
.dropdown-placeholder {
  color: rgba(var(--color-text-muted-rgb), 0.7) !important;
  font-style: italic;
}

/* Animation d'apparition plus douce */
.horror-dropdown {
  animation: fade-in 0.3s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 640px) {
  .dropdown-label {
    font-size: 0.875rem;
  }

  .dropdown-select {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
}

/* Amélioration des performances selon les préférences utilisateur */
@media (prefers-reduced-motion: reduce) {
  .dropdown-select,
  .dropdown-arrow svg {
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
</style>
