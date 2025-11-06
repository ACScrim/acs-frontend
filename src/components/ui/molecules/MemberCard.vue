<!-- Vue template avec optimisations de performance -->
<template>
  <div
    :class="[
      'space-member-card relative overflow-hidden rounded-xl',
      'bg-space-bg-dark/80 backdrop-blur-sm border',
      memberTypeClass,
      className,
    ]"
  >
    <!-- En-tête de la carte avec badge de rôle -->
    <div
      class="space-member-header relative z-10 p-3 flex justify-between items-center border-b border-space-primary/10"
    >
      <SpaceBadge :variant="badgeVariant" size="sm" :className="badgeClasses">
        {{ roleLabel }}
      </SpaceBadge>
      <div class="text-space-text-muted text-xs font-mono">
        ID: {{ userId ? userId.substring(0, 8) : "N/A" }}
      </div>
    </div>

    <!-- Corps de la carte -->
    <div
      class="space-member-body relative z-10 p-4 flex flex-col items-center text-center"
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
            'bg-space-bg-light',
            avatarBorderClass,
          ]"
        >
          <span class="text-space-primary-light text-xl font-bold font-mono">
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
            'block text-xl font-bold font-nasa transition-colors',
            hasProfile
              ? 'text-space-primary-light hover:text-space-primary cursor-pointer'
              : 'text-space-text',
          ]"
        >
          {{ username }}
        </component>
        <div class="text-space-text-muted text-sm mt-1 font-mono">
          {{ roleLabel }}
        </div>
      </div>

      <!-- Boutons d'action -->
      <div class="space-member-actions w-full flex flex-col gap-2">
        <!-- Bouton Voir le profil (si joueur) -->
        <Button
          v-if="hasProfile"
          :to="{ name: 'Profil', params: { id: playerId } }"
          variant="primary"
          size="sm"
          className="space-view-profile-button space-member-cta"
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
        </Button>

        <!-- Message si pas de profil joueur -->
        <div
          v-else
          class="space-restricted-access text-center p-2 rounded text-xs text-space-text-muted border border-space-primary/20"
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
    return `space-member-card-player space-member-card-${props.role}`;
  }
  return `space-member-card-basic space-member-card-${props.role}`;
});

const avatarBorderClass = computed(() => {
  switch (props.role) {
    case "admin":
      return "border-space-secondary-light";
    case "superadmin":
      return "border-space-accent-light";
    default:
      return hasProfile.value
        ? "border-space-primary-light"
        : "border-space-primary";
  }
});

const badgeClasses = computed(() => {
  switch (props.role) {
    case "admin":
      return "bg-space-secondary/90 text-white border-space-secondary-light font-medium";
    case "superadmin":
      return "bg-space-accent/90 text-white border-space-accent-light font-medium";
    default:
      return hasProfile.value
        ? "bg-space-primary/90 text-white border-space-primary-light font-medium"
        : "bg-space-primary/70 text-space-primary-light border-space-primary font-medium";
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
/* Base card styles - optimisé pour performance */
.space-member-card {
  height: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  contain: layout style;
}

/* Avatar styles simplifiés */
.avatar-container {
  position: relative;
  z-index: 1;
}

/* Classes de types de membres simplifiées */
.space-member-card-user {
  background: linear-gradient(
    135deg,
    rgba(15, 15, 30, 0.85),
    rgba(20, 20, 35, 0.95)
  );
}

.space-member-card-admin {
  background: linear-gradient(
    135deg,
    rgba(25, 15, 45, 0.85),
    rgba(30, 18, 50, 0.95)
  );
}

.space-member-card-superadmin {
  background: linear-gradient(
    135deg,
    rgba(36, 14, 40, 0.85),
    rgba(34, 13, 38, 0.95)
  );
}

.space-member-card-player {
  background: linear-gradient(
    135deg,
    rgba(25, 17, 45, 0.85),
    rgba(23, 15, 41, 0.95)
  );
}

.space-member-card-basic {
  background: linear-gradient(
    135deg,
    rgba(20, 20, 35, 0.85),
    rgba(15, 15, 30, 0.95)
  );
}

/* Boutons et actions simplifiés */
.space-view-profile-button {
  position: relative;
  z-index: 1;
}

.space-member-cta {
  position: relative;
}

.space-restricted-access {
  background: rgba(var(--space-bg-light-rgb), 0.1);
  backdrop-filter: blur(2px);
}

/* Performance optimisée - suppression de toutes les animations coûteuses */
.space-member-card *,
.space-member-card *::before,
.space-member-card *::after {
  animation: none !important;
  transition: opacity 0.1s ease !important;
}

/* Responsive simplifié */
@media (max-width: 640px) {
  .space-member-card {
    margin-bottom: 1rem;
  }
}
</style>
