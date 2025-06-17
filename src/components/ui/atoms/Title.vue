<template>
  <component
    :is="tag"
    :class="[
      'font-heading relative',
      sizeClasses,
      {
        'space-title--animated': animated,
        'space-title--glitch': glitch,
        'space-title--hovered': isHovered,
      },
      className,
    ]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    :data-content="getSlotContent()"
  >
    <!-- Élément décoratif supérieur -->
    <div v-if="decorated" class="space-title-decoration top-decoration"></div>

    <!-- Contenu avec effet de scan -->
    <div class="space-title-content">
      <slot></slot>
      <div v-if="scan" class="space-title-scan"></div>
    </div>

    <!-- Élément décoratif inférieur -->
    <div
      v-if="decorated"
      class="space-title-decoration bottom-decoration"
    ></div>
  </component>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from "vue";

interface Props {
  tag?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  animated?: boolean;
  glitch?: boolean;
  scan?: boolean;
  decorated?: boolean;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  tag: "h2",
  size: "xl",
  animated: false,
  glitch: false,
  scan: true,
  decorated: true,
  className: "",
});

const isHovered = ref(false);
const slots = useSlots();

// Fonction pour obtenir le contenu textuel du slot
const getSlotContent = () => {
  if (!slots.default) return "";
  const vnode = slots.default()[0];
  // Utilisation plus sûre - vérifier le children ou la propriété textContent
  if (vnode && vnode.children && typeof vnode.children === "string") {
    return vnode.children;
  }
  return "";
};

// Classes de taille
const sizeClasses = computed(() => {
  switch (props.size) {
    case "xs":
      return "text-xs";
    case "sm":
      return "text-sm";
    case "md":
      return "text-base";
    case "lg":
      return "text-lg";
    case "xl":
      return "text-xl";
    case "2xl":
      return "text-2xl";
    case "3xl":
      return "text-3xl";
    case "4xl":
      return "text-4xl";
    default:
      return "text-xl";
  }
});
</script>

<style scoped>
component {
  font-family: var(--font-heading);
}

.space-title--animated {
  transition: all 0.3s ease;
}

.space-title--animated:hover {
  text-shadow: 0 0 10px var(--space-primary),
    0 0 20px var(--space-primary-light);
  letter-spacing: 1px;
}

.space-title-decoration {
  position: absolute;
  height: 1px;
  width: 30%;
  background: linear-gradient(
    90deg,
    transparent,
    var(--space-primary),
    transparent
  );
}

.top-decoration {
  top: -8px;
  left: 0;
}

.bottom-decoration {
  bottom: -8px;
  right: 0;
}

.space-title-scan {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 45%,
    rgba(139, 92, 246, 0.2) 50%,
    transparent 55%
  );
  background-size: 100% 300%;
  animation: scan-vertical 3s linear infinite;
  pointer-events: none;
}

@keyframes scan-vertical {
  0%,
  100% {
    background-position: 0 0%;
  }
  50% {
    background-position: 0 100%;
  }
}

.space-title--glitch.space-title--hovered {
  position: relative;
}

.space-title--glitch.space-title--hovered::before,
.space-title--glitch.space-title--hovered::after {
  content: attr(data-content);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip: rect(0, 0, 0, 0);
}

.space-title--glitch.space-title--hovered::before {
  left: 2px;
  text-shadow: -1px 0 var(--space-secondary);
  animation: glitch-animation-1 0.3s linear infinite;
}

.space-title--glitch.space-title--hovered::after {
  left: -2px;
  text-shadow: 1px 0 var(--space-accent);
  animation: glitch-animation-2 0.3s linear infinite;
}

@keyframes glitch-animation-1 {
  0% {
    clip: rect(30px, 9999px, 10px, 0);
  }
  20% {
    clip: rect(10px, 9999px, 80px, 0);
  }
  40% {
    clip: rect(50px, 9999px, 15px, 0);
  }
  60% {
    clip: rect(5px, 9999px, 60px, 0);
  }
  80% {
    clip: rect(20px, 9999px, 45px, 0);
  }
  100% {
    clip: rect(40px, 9999px, 30px, 0);
  }
}

@keyframes glitch-animation-2 {
  0% {
    clip: rect(15px, 9999px, 50px, 0);
  }
  20% {
    clip: rect(40px, 9999px, 15px, 0);
  }
  40% {
    clip: rect(10px, 9999px, 40px, 0);
  }
  60% {
    clip: rect(60px, 9999px, 10px, 0);
  }
  80% {
    clip: rect(30px, 9999px, 20px, 0);
  }
  100% {
    clip: rect(5px, 9999px, 60px, 0);
  }
}
</style>
