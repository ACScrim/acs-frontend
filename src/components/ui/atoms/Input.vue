<template>
  <div class="west-input-container">
    <label
      v-if="label"
      :for="id"
      class="block mb-2 text-sm font-heading text-normal-text"
    >
      {{ label }}
    </label>
    <div class="relative west-field">
      <!-- Icône à gauche -->
      <div
        v-if="$slots.icon"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <slot name="icon"></slot>
      </div>

      <!-- Input -->
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'w-full rounded-lg border bg-background-bg-light text-normal-text font-body',
          'focus:ring-2 focus:outline-none transition-all duration-300',
          {
            'pl-10': $slots.icon,
            'pr-10': $slots.rightIcon || clearable,
            'opacity-60 cursor-not-allowed': disabled,
          },
          errorMessage
            ? 'border-color-error focus:ring-color-error/50'
            : 'border-color-primary/30 focus:border-color-primary focus:ring-color-primary/30',
          className,
        ]"
        :aria-invalid="!!errorMessage"
        :aria-describedby="errorMessage ? `${id}-error` : undefined"
      />

      <!-- Bouton pour effacer -->
      <div
        v-if="clearable && modelValue"
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <button
          type="button"
          @click="$emit('update:modelValue', '')"
          class="text-normal-text-dark hover:text-normal-text transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <!-- Icône à droite -->
      <div
        v-else-if="$slots.rightIcon"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <slot name="rightIcon"></slot>
      </div>

      <!-- Effets Far West: la déco est gérée par :focus-within du conteneur -->
    </div>

    <!-- Message d'erreur -->
    <p
      v-if="errorMessage"
      :id="`${id}-error`"
      class="mt-1 text-xs text-color-error font-body"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  label?: string;
  placeholder?: string;
  type?: string;
  id?: string;
  disabled?: boolean;
  clearable?: boolean;
  errorMessage?: string;
  className?: string;
}

withDefaults(defineProps<Props>(), {
  label: "",
  placeholder: "",
  type: "text",
  id: `input-${Math.random().toString(36).substr(2, 9)}`,
  disabled: false,
  clearable: false,
  errorMessage: "",
  className: "py-2 px-4 text-sm",
});

defineEmits(["update:modelValue"]);
</script>

<style scoped>
/* Focus et ambiance Far West */
.west-input-container input:focus {
  box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.25),
    0 0 12px rgba(var(--color-accent-rgb), 0.15);
}

/* Texture subtile façon cuir/papier */
.west-input-container input {
  background-image: linear-gradient(
    rgba(0, 0, 0, 0.04),
    rgba(255, 255, 255, 0.03)
  );
}

.west-input-container input::placeholder {
  color: var(--normal-text-muted);
}

/* Rope border (pointillé) au focus via le wrapper */
.west-field {
  position: relative;
}
.west-field::after {
  content: "";
  position: absolute;
  inset: 2px;
  border-radius: 0.5rem; /* match rounded-lg */
  border: 1px dashed rgba(var(--color-accent-rgb), 0.35);
  opacity: 0;
  transition: opacity 0.15s ease;
  pointer-events: none;
}
.west-field:focus-within::after {
  opacity: 1;
}
</style>
