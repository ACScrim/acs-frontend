<!-- Vue template avec optimisations de performance -->
<template>
  <div
    :class="[
      'west-member-card relative overflow-hidden rounded-xl',
      'backdrop-blur-sm border',
      memberTypeClass,
      className,
    ]"
  >
    <!-- En-tête de la carte avec badge de rôle -->
    <div
      class="west-member-header relative z-10 p-3 flex justify-between items-center border-b"
    >
      <SpaceBadge :variant="badgeVariant" size="sm" :className="badgeClasses">
        {{ roleLabel }}
      </SpaceBadge>
      <div class="id-chip text-normal-text text-xs font-mono font-medium">
        ID: {{ userId ? userId.substring(0, 8) : "N/A" }}
      </div>
    </div>

    <!-- Corps de la carte -->
    <div
      class="west-member-body relative z-10 p-4 flex flex-col items-center text-center"
    >
      <!-- Container Avatar simplifié -->
      <div class="avatar-container mb-4 relative">
        <!-- Avatar principal -->
        <img
          v-if="avatarUrl"
          :src="avatarUrl"
          :alt="`Avatar de ${username}`"
          :class="[
            'relative z-10 w-24 h-24 rounded-full object-cover border-2',
            avatarBorderClass,
          ]"
          loading="lazy"
          @error="handleImageError"
        />
        <div
          v-else
          :class="[
            'relative z-10 w-24 h-24 rounded-full flex items-center justify-center border-2',
            'bg-background-bg-light',
            avatarBorderClass,
          ]"
        >
          <span class="text-color-primary-light text-xl font-bold font-mono">
            {{ initials }}
          </span>
        </div>
      </div>

      <!-- Nom d'utilisateur -->
      <div class="mb-4">
        <component
          :is="hasProfile ? 'router-link' : 'span'"
          v-bind="
            hasProfile
              ? { to: { name: 'Profil', params: { id: playerId } } }
              : {}
          "
          :class="[
            'block text-xl font-bold member-username transition-colors',
            { 'member-username--link': hasProfile },
          ]"
        >
          {{ username }}
        </component>
      </div>

      <!-- Boutons d'action -->
      <div class="west-member-actions w-full flex flex-col gap-2">
        <!-- Bouton Voir le profil (si joueur) -->
        <SpaceButton
          v-if="hasProfile"
          :to="{ name: 'Profil', params: { id: playerId } }"
          variant="primary"
          size="sm"
          className="west-view-profile-button west-member-cta"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clip-rule="evenodd"
              />
            </svg>
          </template>
          Voir le profil
        </SpaceButton>

        <!-- Message si pas de profil joueur -->
        <div
          v-else
          class="west-restricted-access text-center p-2 rounded text-xs text-normal-text-muted border"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mx-auto mb-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd"
            />
          </svg>
          Profil non disponible
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Types locaux
type ComponentVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "outline"
  | "error"
  | "success"
  | "warning";

// Props
interface Props {
  userId?: string;
  username: string;
  role: "user" | "admin" | "superadmin";
  avatarUrl?: string;
  playerId?: string | null;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  userId: "",
  username: "",
  role: "user",
  avatarUrl: "",
  playerId: null,
  className: "",
});

// Computed properties
const hasProfile = computed(() => {
  return props.playerId && props.playerId.trim() !== "";
});

const initials = computed(() => {
  if (!props.username) return "?";
  const nameParts = props.username.split(" ");
  if (nameParts.length === 1) {
    return props.username.charAt(0).toUpperCase();
  }
  return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
});

const roleLabel = computed(() => {
  switch (props.role) {
    case "admin":
      return "Administrateur";
    case "superadmin":
      return "Super Admin";
    default:
      return hasProfile.value ? "Joueur" : "Membre";
  }
});

const badgeVariant = computed((): ComponentVariant => {
  switch (props.role) {
    case "admin":
      return "secondary";
    case "superadmin":
      return "accent";
    default:
      return hasProfile.value ? "primary" : "outline";
  }
});

const memberTypeClass = computed(() => {
  if (hasProfile.value) {
    return `west-member-card-player west-member-card-${props.role}`;
  }
  return `west-member-card-basic west-member-card-${props.role}`;
});

const avatarBorderClass = computed(() => {
  switch (props.role) {
    case "admin":
      return "border-color-secondary-light";
    case "superadmin":
      return "border-color-accent-light";
    default:
      return hasProfile.value
        ? "border-color-primary-light"
        : "border-color-primary";
  }
});

const badgeClasses = computed(() => {
  switch (props.role) {
    case "admin":
      return "bg-color-secondary/90 text-white border-color-secondary-light font-medium";
    case "superadmin":
      return "bg-color-accent/90 text-white border-color-accent-light font-medium";
    default:
      return hasProfile.value
        ? "bg-color-primary/90 text-white border-color-primary-light font-medium"
        : "bg-color-primary/70 text-color-primary-light border-color-primary font-medium";
  }
});

// Methods
const handleImageError = (e: Event) => {
  if (e.target instanceof HTMLImageElement) {
    const fallbackInitials = initials.value;
    e.target.src = `https://ui-avatars.com/api/?name=${fallbackInitials}&background=6D28D9&color=F9FAFB&size=150&bold=true&font-family=monospace`;
  }
};
</script>

<style scoped>
/* Base card styles - Far West */
.west-member-card {
  height: 100%;
  contain: layout style;
  /* Parchment background */
  background: radial-gradient(
      120% 80% at 0% 0%,
      rgba(0, 0, 0, 0.08),
      transparent 60%
    ),
    radial-gradient(100% 60% at 100% 0%, rgba(0, 0, 0, 0.06), transparent 55%),
    linear-gradient(
      180deg,
      rgba(var(--background-bg-light-rgb, 243, 231, 218), 0.96),
      rgba(var(--background-bg-light-rgb, 243, 231, 218), 0.92)
    );
  border: 1px solid rgba(0, 0, 0, 0.18);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04),
    0 1px 2px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.18);
}

.west-member-card::before {
  /* Subtle rope edge */
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background: repeating-linear-gradient(
    45deg,
    rgba(var(--color-accent-rgb, 210, 160, 80), 0.18) 0px,
    rgba(var(--color-accent-rgb, 210, 160, 80), 0.18) 2px,
    transparent 2px,
    transparent 6px
  );
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  padding: 2px;
  border: 0 solid transparent; /* just to enable content-box */
  opacity: 0.5;
}

/* Header band - leather tint */
.west-member-header {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.04));
  border-color: rgba(0, 0, 0, 0.22);
}

/* Avatar styles */
.avatar-container {
  position: relative;
  z-index: 1;
}

/* Member type modifiers - light tints and borders */
.west-member-card-player {
  box-shadow: inset 0 0 0 1px rgba(var(--color-accent-rgb, 210, 160, 80), 0.25);
}

.west-member-card-basic {
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
}

.west-member-card-user {
  border-color: rgba(0, 0, 0, 0.18);
}

.west-member-card-admin {
  border-color: rgba(var(--color-accent-rgb, 210, 160, 80), 0.35);
}

.west-member-card-superadmin {
  border-color: rgba(var(--color-accent-rgb, 210, 160, 80), 0.5);
}

/* Boutons et actions simplifiés */
.west-view-profile-button {
  position: relative;
  z-index: 1;
}

.west-member-cta {
  position: relative;
}

.west-restricted-access {
  background: rgba(var(--background-bg-light-rgb), 0.1);
  backdrop-filter: blur(2px);
}

/* Performance: avoid heavy animations inside card */
.west-member-card *,
.west-member-card *::before,
.west-member-card *::after {
  animation: none !important;
  transition: opacity 0.1s ease !important;
}

/* Western display font for username */
.member-username {
  font-family: var(--font-display, "Rye", serif);
  letter-spacing: 0.02em;
  color: var(--heading-text, rgba(34, 27, 20, 0.95));
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.25);
}

.member-username--link {
  cursor: pointer;
}

.member-username--link:hover {
  color: rgb(var(--color-primary-rgb, 140, 90, 40));
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* ID chip for better contrast */
.id-chip {
  padding: 2px 8px;
  border-radius: 0.375rem;
  background: rgba(0, 0, 0, 0.06);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
}

/* Responsive */
@media (max-width: 640px) {
  .west-member-card {
    margin-bottom: 1rem;
  }
}
</style>
