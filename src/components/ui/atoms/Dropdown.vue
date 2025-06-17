<template>
  <div class="space-dropdown relative">
    <label
      v-if="label"
      :for="id"
      class="text-lg text-space-primary-light mb-2 font-nasa flex items-center"
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
        class="w-full rounded-md bg-space-bg-light/40 border border-space-primary/30 p-3 text-space-text font-nasa focus:border-space-primary focus:ring-1 focus:ring-space-primary outline-none appearance-none"
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
        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-space-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
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
import { defineProps, defineEmits } from "vue";

const props = defineProps({
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

.space-dropdown select:focus {
  box-shadow: 0 0 0 2px var(--space-bg), 0 0 0 4px var(--space-primary-light);
}

.space-dropdown select:disabled {
  background-color: var(--space-bg-light/20);
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
