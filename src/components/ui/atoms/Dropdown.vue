<template>
  <div class="space-dropdown relative">
    <label
      v-if="label"
      :for="id"
      class="text-base text-normal-text mb-1 font-body flex items-center"
    >
      <slot name="icon"></slot>
      {{ label }}
      <span v-if="required" class="text-color-accent ml-1">*</span>
    </label>

    <div class="relative select-wrapper">
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
        class="w-full rounded-md bg-background-bg-light/40 border border-color-primary/30 p-2.5 pr-9 text-sm text-normal-text font-body focus:border-color-primary focus:ring-1 focus:ring-color-primary outline-none appearance-none"
        :disabled="disabled"
        :required="required"
        :aria-label="label || placeholder"
      >
        <option v-if="placeholder" value="" disabled selected>
          {{ placeholder }}
        </option>
        <slot></slot>
      </select>
      <!-- Chevron décoratif Far West (double chevrons) -->
      <span class="dropdown-chevron pointer-events-none" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
        >
          <path
            d="M6 8l6 6 6-6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6 5l6 6 6-6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            opacity="0.65"
          />
        </svg>
      </span>
    </div>

    <div v-if="error" class="text-color-error text-sm mt-1">{{ error }}</div>
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
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  /* Padding right already set via class pr-9 to leave room for the chevrons */
  box-shadow: inset 0 0 0 1px rgba(var(--color-accent-rgb), 0.1);
}

.space-dropdown select:focus {
  box-shadow: 0 0 0 2px var(--background-bg),
    0 0 0 4px var(--color-primary-light);
}

/* hide native arrow in old Edge/IE */
.space-dropdown select::-ms-expand {
  display: none;
}

/* wrapper kept simple; no pseudo-elements so we avoid any second arrow */
.space-dropdown .select-wrapper {
  position: relative;
}

/* Chevron overlay */
.space-dropdown .dropdown-chevron {
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  color: var(--normal-text-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Highlight on focus */
.space-dropdown:focus-within .dropdown-chevron {
  color: var(--color-primary-light);
}

/* Dim when disabled */
.space-dropdown select:disabled + .dropdown-chevron {
  opacity: 0.6;
}

.space-dropdown select:disabled {
  background-color: rgba(var(--background-bg-light-rgb), 0.2);
  opacity: 0.7;
  cursor: not-allowed;
}

/* Far West: custom hover/selected colors for options (OS support varies) */
.space-dropdown select option:hover {
  background-color: rgba(var(--color-primary-rgb), 0.2) !important;
  color: var(--normal-text) !important;
}
.space-dropdown select option:checked,
.space-dropdown select option:active {
  background-color: rgba(var(--color-accent-rgb), 0.25) !important;
  color: var(--normal-text) !important;
}
/* Note: on Windows, native option hover is often OS-controlled and may ignore CSS.
  If you need guaranteed colors, we can add a `custom` dropdown variant (HTML list). */
</style>
