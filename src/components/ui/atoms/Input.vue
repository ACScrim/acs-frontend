<template>
  <div class="space-input-container">
    <label
      v-if="label"
      :for="id"
      class="block mb-2 text-sm font-heading text-normal-text"
    >
      {{ label }}
    </label>
    <div class="relative">
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

      <!-- Effets spatiaux (petites étoiles) -->
      <div
        class="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
      >
        <div class="star-particle"></div>
        <div class="star-particle delay-1"></div>
        <div class="star-particle delay-2"></div>
      </div>
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
.space-input-container input:focus {
  box-shadow: 0 0 0 2px rgba(109, 40, 217, 0.2),
    0 0 15px rgba(109, 40, 217, 0.1);
}

.star-particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: white;
  border-radius: 50%;
  opacity: 0;
  top: 50%;
  left: 5px;
  animation: twinkle 4s ease-in-out infinite;
}

.delay-1 {
  left: 80%;
  animation-delay: 1s;
}

.delay-2 {
  left: 40%;
  top: 25%;
  animation-delay: 2s;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
}
</style>
