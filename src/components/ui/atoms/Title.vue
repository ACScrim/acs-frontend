<template>
  <component
    :is="tag"
    :class="[
      'font-heading relative',
      sizeClasses,
      {
        'title--animated': animated,
        'title--glitch': glitch,
        'title--hovered': isHovered,
      },
      className,
    ]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    :data-content="getSlotContent()"
  >
    <!-- Élément décoratif supérieur -->
    <div v-if="decorated" class="title-decoration top-decoration"></div>

    <!-- Contenu avec effet de scan -->
    <div class="title-content">
      <slot></slot>
      <div v-if="scan" class="title-scan"></div>
    </div>

    <!-- Élément décoratif inférieur -->
    <div v-if="decorated" class="title-decoration bottom-decoration"></div>
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
/* Far West title styling while preserving API and class names */
.title--animated {
  transition: all 0.25s ease;
}
.title--animated:hover {
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.35),
    0 0 12px rgba(var(--color-accent-rgb), 0.35);
  letter-spacing: 0.04em;
}

/* Rope-like decorative lines */
.title-decoration {
  position: absolute;
  height: 2px;
  width: 36%;
  background: repeating-linear-gradient(
    90deg,
    rgba(var(--color-accent-rgb), 0.9) 0 6px,
    rgba(var(--color-accent-rgb), 0.4) 6px 10px,
    transparent 10px 14px
  );
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.25);
}
.top-decoration {
  top: -8px;
  left: 0;
  animation: rope-sway 7s ease-in-out infinite;
}
.bottom-decoration {
  bottom: -8px;
  right: 0;
  animation: rope-sway 7s ease-in-out infinite reverse;
}

/* Ensure overlay blends relative to the title only */
.title-content {
  position: relative;
  isolation: isolate;
  z-index: 0;
}

/* Campfire glow shimmer (replaces vertical scan bar) */
.title-scan {
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* warm glow from below + faint sky tint above */
  background: radial-gradient(
      120% 80% at 50% 110%,
      rgba(var(--color-accent-rgb), 0.22),
      transparent 60%
    ),
    radial-gradient(
      120% 80% at 50% -10%,
      rgba(var(--color-primary-rgb), 0.12),
      transparent 60%
    );
  mix-blend-mode: screen;
  z-index: 1;
  opacity: 0.35;
  animation: ember-flicker 2.8s ease-in-out infinite;
}
@keyframes ember-flicker {
  0% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.45;
  }
  50% {
    opacity: 0.25;
  }
  75% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.3;
  }
}

@keyframes rope-sway {
  0%,
  100% {
    transform: rotate(0.2deg);
  }
  50% {
    transform: rotate(-0.3deg);
  }
}

/* Reinterpret "glitch" as warm brand shadow wobble */
.title--glitch.title--hovered {
  position: relative;
}
.title--glitch.title--hovered::before,
.title--glitch.title--hovered::after {
  content: attr(data-content);
  position: absolute;
  inset: 0;
  color: currentColor;
  opacity: 0.6;
  filter: blur(0.4px);
}
.title--glitch.title--hovered::before {
  transform: translate(1px, 1px);
  text-shadow: 1px 0 rgba(var(--color-primary-rgb), 0.8);
  animation: brand-wobble 0.9s ease-in-out infinite alternate;
}
.title--glitch.title--hovered::after {
  transform: translate(-1px, 0);
  text-shadow: -1px 0 rgba(var(--color-accent-rgb), 0.8);
  animation: brand-wobble 1.2s ease-in-out infinite alternate;
}
@keyframes brand-wobble {
  0% {
    transform: translate(-1px, 0) skewX(0.5deg);
    opacity: 0.5;
  }
  100% {
    transform: translate(1px, 1px) skewX(-0.5deg);
    opacity: 0.8;
  }
}
</style>
