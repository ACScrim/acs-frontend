<template>
  <transition
    name="space-modal"
    @after-enter="onAfterEnter"
    @after-leave="onAfterLeave"
  >
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <!-- Arrière-plan avec étoiles -->
      <div
        class="fixed inset-0 bg-space-bg/90 backdrop-blur-sm"
        @click="$emit('update:modelValue', false)"
      >
        <div
          v-for="n in 20"
          :key="`star-${n}`"
          class="modal-star"
          :style="{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            animationDelay: `${Math.random() * 5}s`,
          }"
        ></div>
      </div>

      <!-- Contenu modal -->
      <div
        :class="[
          'space-modal-container relative max-h-[90vh] overflow-hidden',
          'rounded-lg bg-space-bg-light z-10 w-full max-w-md',
          'border border-space-primary/20 shadow-xl',
          className,
        ]"
        @click.stop
      >
        <!-- En-tête -->
        <div
          v-if="title || $slots.header"
          class="space-modal-header p-5 border-b border-space-bg flex items-center justify-between"
        >
          <div v-if="$slots.header">
            <slot name="header"></slot>
          </div>
          <h3 v-else-if="title" class="text-lg font-heading text-space-text">
            {{ title }}
          </h3>

          <!-- Bouton de fermeture -->
          <button
            v-if="!hideCloseButton"
            class="text-space-text-muted hover:text-space-text transition-colors focus:outline-none focus:ring-2 focus:ring-space-primary/50 rounded-full"
            @click="$emit('update:modelValue', false)"
            aria-label="Fermer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <!-- Corps -->
        <div
          class="space-modal-body p-5 overflow-y-auto max-h-[calc(90vh-130px)]"
        >
          <slot></slot>
        </div>

        <!-- Pied de page -->
        <div
          v-if="$slots.footer"
          class="space-modal-footer p-5 border-t border-space-bg"
        >
          <slot name="footer"></slot>
        </div>

        <!-- Éléments décoratifs -->
        <div class="space-modal-decoration top-left"></div>
        <div class="space-modal-decoration top-right"></div>
        <div class="space-modal-decoration bottom-left"></div>
        <div class="space-modal-decoration bottom-right"></div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  title?: string;
  hideCloseButton?: boolean;
  className?: string;
}

withDefaults(defineProps<Props>(), {
  title: "",
  hideCloseButton: false,
  className: "",
});

const emit = defineEmits(["update:modelValue", "after-enter", "after-leave"]);

// Handlers
const onAfterEnter = () => {
  emit("after-enter");
};

const onAfterLeave = () => {
  emit("after-leave");
};
</script>

<style scoped>
.space-modal-enter-active,
.space-modal-leave-active {
  transition: all 0.3s ease;
}

.space-modal-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.space-modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  animation: twinkle 5s ease-in-out infinite;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.3;
  }
}

.space-modal-decoration {
  position: absolute;
  width: 15px;
  height: 15px;
}

.space-modal-decoration.top-left {
  top: 0;
  left: 0;
  border-top: 2px solid var(--space-primary);
  border-left: 2px solid var(--space-primary);
}

.space-modal-decoration.top-right {
  top: 0;
  right: 0;
  border-top: 2px solid var(--space-primary);
  border-right: 2px solid var(--space-primary);
}

.space-modal-decoration.bottom-left {
  bottom: 0;
  left: 0;
  border-bottom: 2px solid var(--space-primary);
  border-left: 2px solid var(--space-primary);
}

.space-modal-decoration.bottom-right {
  bottom: 0;
  right: 0;
  border-bottom: 2px solid var(--space-primary);
  border-right: 2px solid var(--space-primary);
}
</style>
