<template>
  <div
    :class="[
      'space-alert rounded-lg p-4 border',
      'relative overflow-hidden',
      variantClasses,
      className,
    ]"
    role="alert"
  >
    <!-- Icône de l'alerte -->
    <div class="flex">
      <div class="flex-shrink-0">
        <slot name="icon">
          <span
            :class="[
              'inline-flex items-center justify-center rounded-full p-2',
              iconBackground,
            ]"
          >
            <component
              :is="icons[variant]"
              :class="['h-5 w-5', iconColor]"
              aria-hidden="true"
            />
          </span>
        </slot>
      </div>

      <!-- Contenu de l'alerte -->
      <div class="ml-3">
        <h3
          v-if="title"
          :class="['text-sm font-medium', titleColor]"
          v-text="title"
        ></h3>
        <div
          :class="[
            'text-sm',
            messageColor,
            title ? 'mt-2' : '',
            dismissible ? 'pr-7' : '',
          ]"
        >
          <slot></slot>
        </div>
      </div>
    </div>

    <!-- Bouton de fermeture -->
    <button
      v-if="dismissible"
      type="button"
      :class="[
        'absolute top-4 right-4 text-space-text-muted hover:text-space-text',
        'rounded focus:outline-none focus:ring-2 focus:ring-space-primary/50',
      ]"
      @click="$emit('dismiss')"
      aria-label="Fermer"
    >
      <span class="sr-only">Fermer</span>
      <svg
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed, h } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "info",
    validator: (value) =>
      ["info", "success", "warning", "error"].includes(value),
  },
  title: {
    type: String,
    default: "",
  },
  dismissible: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: "",
  },
});

defineEmits(["dismiss"]);

// Icônes pour chaque variante
const icons = {
  info: h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    class: "w-6 h-6",
    innerHTML: `
      <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
    `,
  }),
  success: h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    class: "w-6 h-6",
    innerHTML: `
      <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
    `,
  }),
  warning: h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    class: "w-6 h-6",
    innerHTML: `
      <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
    `,
  }),
  error: h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    class: "w-6 h-6",
    innerHTML: `
      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
    `,
  }),
};

// Classes de couleur et de fond pour chaque variante
const variantClasses = computed(() => {
  switch (props.variant) {
    case "info":
      return "bg-space-info/10 border-space-info/30";
    case "success":
      return "bg-space-success/10 border-space-success/30";
    case "warning":
      return "bg-space-warning/10 border-space-warning/30";
    case "error":
      return "bg-space-error/10 border-space-error/30";
    default:
      return "bg-space-info/10 border-space-info/30";
  }
});

const iconBackground = computed(() => {
  switch (props.variant) {
    case "info":
      return "bg-space-info/20";
    case "success":
      return "bg-space-success/20";
    case "warning":
      return "bg-space-warning/20";
    case "error":
      return "bg-space-error/20";
    default:
      return "bg-space-info/20";
  }
});

const iconColor = computed(() => {
  switch (props.variant) {
    case "info":
      return "text-space-info";
    case "success":
      return "text-space-success";
    case "warning":
      return "text-space-warning";
    case "error":
      return "text-space-error";
    default:
      return "text-space-info";
  }
});

const titleColor = computed(() => {
  switch (props.variant) {
    case "info":
      return "text-space-info";
    case "success":
      return "text-space-success";
    case "warning":
      return "text-space-warning";
    case "error":
      return "text-space-error";
    default:
      return "text-space-info";
  }
});

const messageColor = computed(() => {
  return "text-space-text";
});
</script>

<style scoped>
.space-alert {
  position: relative;
}

.space-alert::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  border-radius: 2px 0 0 2px;
}

.bg-space-info\/10 {
  background-color: rgba(96, 165, 250, 0.1);
}
.border-space-info\/30 {
  border-color: rgba(96, 165, 250, 0.3);
}
.bg-space-info\/20 {
  background-color: rgba(96, 165, 250, 0.2);
}
.text-space-info {
  color: var(--space-info);
}

.bg-space-success\/10 {
  background-color: rgba(74, 222, 128, 0.1);
}
.border-space-success\/30 {
  border-color: rgba(74, 222, 128, 0.3);
}
.bg-space-success\/20 {
  background-color: rgba(74, 222, 128, 0.2);
}
.text-space-success {
  color: var(--space-success);
}

.bg-space-warning\/10 {
  background-color: rgba(250, 204, 21, 0.1);
}
.border-space-warning\/30 {
  border-color: rgba(250, 204, 21, 0.3);
}
.bg-space-warning\/20 {
  background-color: rgba(250, 204, 21, 0.2);
}
.text-space-warning {
  color: var(--space-warning);
}

.bg-space-error\/10 {
  background-color: rgba(248, 113, 113, 0.1);
}
.border-space-error\/30 {
  border-color: rgba(248, 113, 113, 0.3);
}
.bg-space-error\/20 {
  background-color: rgba(248, 113, 113, 0.2);
}
.text-space-error {
  color: var(--space-error);
}
</style>