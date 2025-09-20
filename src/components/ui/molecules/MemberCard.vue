<!-- Vue template avec optimisations de performance -->
<template>
  <component
    :is="hasProfile ? 'router-link' : 'div'"
    v-bind="
      hasProfile ? { to: { name: 'Profil', params: { id: playerId } } } : {}
    "
    :class="[
      'member-card group relative overflow-hidden rounded-xl',
      'bg-color-card-bg backdrop-blur-sm border-2',
      'block transition-all duration-300',
      hasProfile ? 'cursor-pointer' : 'cursor-default',
      memberTypeClass,
      className,
    ]"
  >
    <!-- En-tête de la carte avec badge de rôle -->
    <div
      class="member-header relative z-10 p-3 flex justify-between items-center border-b border-color-bg-light"
    >
      <Badge :variant="badgeVariant" size="sm" :className="badgeClasses">
        {{ roleLabel }}
      </Badge>
      <div class="text-color-text-muted text-xs font-mono">
        ID: {{ userId ? userId.substring(0, 8) : "N/A" }}
      </div>
    </div>

    <!-- Corps de la carte -->
    <div
      class="member-body relative z-10 p-4 flex flex-col items-center text-center"
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
            'bg-color-bg-light',
            avatarBorderClass,
          ]"
        >
          <span class="text-color-primary-light text-xl font-bold font-body">
            {{ initials }}
          </span>
        </div>
      </div>

      <!-- Nom d'utilisateur -->
      <div class="mb-4">
        <span
          :class="[
            'block text-xl font-bold font-heading transition-colors duration-300',
            hasProfile
              ? 'text-color-primary-light group-hover:text-color-accent'
              : 'text-color-text',
          ]"
        >
          {{ username }}
        </span>
        <div class="text-color-text-muted text-sm mt-1 font-body">
          {{ roleLabel }}
        </div>
      </div>

      <!-- Indicateur de profil -->
      <div class="member-actions w-full">
        <div
          v-if="hasProfile"
          class="text-center text-xs text-color-primary-light font-body opacity-70"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 inline mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clip-rule="evenodd"
            />
          </svg>
          Cliquez pour voir le profil
        </div>

        <div
          v-else
          class="text-center text-xs text-color-text-muted opacity-60"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 inline mr-1"
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
  </component>
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
    return `member-card-player member-card-${props.role}`;
  }
  return `member-card-basic member-card-${props.role}`;
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
    e.target.src = `https://ui-avatars.com/api/?name=${fallbackInitials}&background=7c2d12&color=F9FAFB&size=150&bold=true&font-family=serif`;
  }
};
</script>

<style scoped>
/* Base card styles Halloween */
.member-card {
  height: 100%;
  background: var(--color-card-bg) !important;
  border-color: var(--color-secondary) !important;
  box-shadow: var(--shadow-card-base), var(--shadow-glow-secondary) !important;
  contain: layout style;
  transition: all 0.3s ease;
}

.member-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-base), var(--shadow-glow-secondary),
    0 10px 30px rgba(0, 0, 0, 0.5) !important;
}

/* Header et body */
.member-header {
  background: linear-gradient(
    90deg,
    rgba(124, 45, 18, 0.1) 0%,
    rgba(217, 119, 6, 0.05) 50%,
    rgba(124, 45, 18, 0.1) 100%
  );
}

.member-body {
  position: relative;
}

/* Avatar styles */
.avatar-container {
  position: relative;
  z-index: 1;
}

.avatar-container::before {
  content: "";
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  background: linear-gradient(
    45deg,
    var(--color-primary),
    var(--color-secondary),
    var(--color-accent),
    var(--color-primary)
  );
  background-size: 400% 400%;
  border-radius: 50%;
  z-index: -1;
  animation: avatar-border-glow 4s ease-in-out infinite;
  opacity: 0.3;
}

@keyframes avatar-border-glow {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Classes de types de membres Halloween */
.member-card-user {
  border-color: var(--color-primary) !important;
}

.member-card-admin {
  border-color: var(--color-secondary) !important;
  background: linear-gradient(
    135deg,
    var(--color-card-bg) 0%,
    rgba(124, 45, 18, 0.05) 100%
  ) !important;
}

.member-card-superadmin {
  border-color: var(--color-accent) !important;
  background: linear-gradient(
    135deg,
    var(--color-card-bg) 0%,
    rgba(88, 28, 135, 0.05) 100%
  ) !important;
}

.member-card-player {
  background: linear-gradient(
    135deg,
    var(--color-card-bg) 0%,
    rgba(217, 119, 6, 0.03) 100%
  ) !important;
}

.member-card-basic {
  background: var(--color-card-bg) !important;
}

/* Performance optimisée */
.member-card *,
.member-card *::before,
.member-card *::after {
  will-change: auto;
}

/* Responsive simplifié */
@media (max-width: 640px) {
  .member-card {
    margin-bottom: 1rem;
  }

  .avatar-container::before {
    animation-duration: 6s;
  }
}

/* Effets de hover spécifiques par rôle */
.member-card-admin:hover {
  box-shadow: var(--shadow-card-base), var(--shadow-glow-secondary),
    0 0 25px rgba(124, 45, 18, 0.4) !important;
}

.member-card-superadmin:hover {
  box-shadow: var(--shadow-card-base), var(--shadow-glow-accent),
    0 0 25px rgba(88, 28, 135, 0.4) !important;
}

.member-card-player:hover {
  box-shadow: var(--shadow-card-base), var(--shadow-glow-primary),
    0 0 25px rgba(217, 119, 6, 0.4) !important;
}
</style>
