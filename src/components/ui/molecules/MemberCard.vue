<template>
  <div
    :class="[
      'space-member-card relative overflow-hidden rounded-xl',
      'bg-space-bg-dark/80 backdrop-blur-sm border transition-all duration-300',
      'transform hover:scale-[1.02] hover:shadow-glow',
      memberTypeClass,
      className,
    ]"
  >
    <!-- Effet de fond spatial -->
    <div
      class="space-member-bg absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
    ></div>

    <!-- Ligne de scan animée -->
    <div
      class="scan-line absolute left-0 right-0 h-0.5 opacity-0 hover:opacity-100"
    ></div>
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
      <!-- Container Avatar avec effet spatial -->
      <div class="avatar-container mb-4 relative">
        <!-- Glow effect background -->
        <div
          :class="[
            'avatar-glow absolute inset-0 rounded-full opacity-50',
            avatarGlowClass,
          ]"
        ></div>

        <!-- Orbites décoratives pour les rôles spéciaux -->
        <div
          v-if="role === 'superadmin'"
          class="orbital-rings absolute inset-0"
        >
          <div class="orbital-ring orbital-ring-1"></div>
          <div class="orbital-ring orbital-ring-2"></div>
        </div>

        <!-- Avatar principal -->
        <img
          v-if="avatarUrl"
          :src="avatarUrl"
          :alt="`Avatar de ${username}`"
          :class="[
            'relative z-10 w-24 h-24 rounded-full object-cover border-2 transition-all duration-300',
            'space-avatar-glow',
            avatarBorderClass,
          ]"
          loading="lazy"
          @error="handleImageError"
        />
        <div
          v-else
          :class="[
            'relative z-10 w-24 h-24 rounded-full flex items-center justify-center border-2',
            'bg-space-bg-light transition-all duration-300',
            avatarBorderClass,
          ]"
        >
          <span class="text-space-primary-light text-xl font-bold font-mono">
            {{ initials }}
          </span>
        </div>

        <!-- Particules pour superadmin -->
        <div
          v-if="role === 'superadmin'"
          class="space-particles absolute inset-0"
        >
          <div class="particle particle-1"></div>
          <div class="particle particle-2"></div>
          <div class="particle particle-3"></div>
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
            'text-lg font-heading font-nasa transition-colors capitalize block',
            hasProfile
              ? 'text-space-text hover:text-space-primary-light cursor-pointer'
              : 'text-space-text',
          ]"
        >
          {{ username }}
        </component>
      </div>

      <!-- Actions -->
      <div class="mt-2 w-full">
        <router-link
          v-if="hasProfile"
          :to="{ name: 'Profil', params: { id: playerId } }"
          class="space-view-profile-button block"
        >
          <SpaceButton
            variant="secondary"
            size="sm"
            className="w-full space-member-cta"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fill-rule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clip-rule="evenodd"
              />
            </svg>
            Voir profil
          </SpaceButton>
        </router-link>
        <div
          v-else
          class="text-space-text-muted font-mono text-sm flex items-center justify-center p-2 border border-space-bg-light/20 rounded-lg space-restricted-access"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd"
            />
          </svg>
          Accès restreint
        </div>
      </div>
    </div>

    <!-- Éléments décoratifs spatiaux -->
    <div class="space-decorations absolute inset-0 pointer-events-none">
      <!-- Coins décoratifs -->
      <div class="corner-decoration corner-top-left"></div>
      <div class="corner-decoration corner-top-right"></div>
      <div class="corner-decoration corner-bottom-left"></div>
      <div class="corner-decoration corner-bottom-right"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  userId: string;
  username: string;
  role: "user" | "admin" | "superadmin";
  avatarUrl?: string;
  playerId?: string | null;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  avatarUrl: "",
  playerId: null,
  className: "",
});

// Computed properties
const hasProfile = computed(() => !!props.playerId);

const initials = computed(() => {
  if (!props.username) return "?";
  const nameParts = props.username.split(" ");
  if (nameParts.length === 1) return props.username.charAt(0).toUpperCase();
  return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
});

const roleLabel = computed(() => {
  switch (props.role) {
    case "admin":
      return "Admin";
    case "superadmin":
      return "Super Admin";
    default:
      return "Membre";
  }
});

const badgeVariant = computed(() => {
  switch (props.role) {
    case "admin":
      return "secondary";
    case "superadmin":
      return "accent";
    default:
      return "primary";
  }
});

const memberTypeClass = computed(() => {
  switch (props.role) {
    case "admin":
      return "space-member-card-admin border-space-secondary/30 hover:border-space-secondary/50";
    case "superadmin":
      return "space-member-card-superadmin border-space-accent/30 hover:border-space-accent/50";
    default:
      return hasProfile.value
        ? "space-member-card-player border-space-primary/30 hover:border-space-primary/50"
        : "space-member-card-basic border-space-primary/20 hover:border-space-primary/30";
  }
});

const avatarGlowClass = computed(() => {
  switch (props.role) {
    case "admin":
      return "avatar-glow-admin";
    case "superadmin":
      return "avatar-glow-superadmin";
    default:
      return hasProfile.value ? "avatar-glow-player" : "avatar-glow-basic";
  }
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
    const initials = computed(() => {
      if (!props.username) return "?";
      const nameParts = props.username.split(" ");
      if (nameParts.length === 1) return props.username.charAt(0).toUpperCase();
      return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
    });

    e.target.src = `https://ui-avatars.com/api/?name=${initials.value}&background=6D28D9&color=F9FAFB&size=150&bold=true&font-family=monospace`;
    e.target.classList.remove("space-avatar-glow");
    e.target.classList.add("space-avatar-fallback");
  }
};
</script>

<style scoped>
/* Base card styles */
.space-member-card {
  height: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.space-member-card:hover {
  transform: translateY(-5px);
}

/* Fond spatial animé */
.space-member-bg {
  background: radial-gradient(
    circle at 50% 10%,
    rgba(var(--space-primary-rgb), 0.15),
    transparent 70%
  );
  transition: opacity 0.5s ease;
}

.space-member-card-admin .space-member-bg {
  background: radial-gradient(
    circle at 50% 10%,
    rgba(var(--space-secondary-rgb), 0.15),
    transparent 70%
  );
}

.space-member-card-superadmin .space-member-bg {
  background: radial-gradient(
    circle at 50% 10%,
    rgba(var(--space-accent-rgb), 0.15),
    transparent 70%
  );
}

/* Ligne de scan */
.scan-line {
  background: linear-gradient(
    90deg,
    transparent,
    var(--space-primary),
    transparent
  );
  animation: scan-sweep 3s linear infinite;
  transition: opacity 0.3s ease;
}

.space-member-card-admin .scan-line {
  background: linear-gradient(
    90deg,
    transparent,
    var(--space-secondary),
    transparent
  );
}

.space-member-card-superadmin .scan-line {
  background: linear-gradient(
    90deg,
    transparent,
    var(--space-accent),
    transparent
  );
}

@keyframes scan-sweep {
  0% {
    top: 0%;
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

/* Avatar et effects */
.avatar-container {
  position: relative;
  z-index: 1;
}

.space-avatar-glow {
  box-shadow: 0 0 15px rgba(var(--space-primary-rgb), 0.5);
  transition: all 0.3s ease;
}

.space-member-card:hover .space-avatar-glow {
  box-shadow: 0 0 25px rgba(var(--space-primary-rgb), 0.8);
}

.space-avatar-fallback {
  border: 2px solid var(--space-primary);
}

/* Avatar glow effects */
.avatar-glow {
  animation: pulse 3s infinite;
}

.avatar-glow-admin {
  box-shadow: 0 0 30px rgba(var(--space-secondary-rgb), 0.6);
  animation: pulse-admin 3s infinite;
}

.avatar-glow-superadmin {
  box-shadow: 0 0 30px rgba(var(--space-accent-rgb), 0.6);
  animation: pulse-superadmin 3s infinite;
}

.avatar-glow-player {
  box-shadow: 0 0 30px rgba(var(--space-primary-rgb), 0.6);
  animation: pulse-player 3s infinite;
}

.avatar-glow-basic {
  box-shadow: 0 0 20px rgba(var(--space-primary-rgb), 0.4);
  animation: pulse-basic 3s infinite;
}

/* Animations */
@keyframes pulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.97);
  }
  50% {
    opacity: 0.5;
    transform: scale(1);
  }
}

@keyframes pulse-admin {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.97);
    box-shadow: 0 0 25px rgba(var(--space-secondary-rgb), 0.4);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.03);
    box-shadow: 0 0 35px rgba(var(--space-secondary-rgb), 0.7);
  }
}

@keyframes pulse-superadmin {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.97);
    box-shadow: 0 0 25px rgba(var(--space-accent-rgb), 0.4);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.03);
    box-shadow: 0 0 35px rgba(var(--space-accent-rgb), 0.7);
  }
}

@keyframes pulse-player {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.97);
    box-shadow: 0 0 25px rgba(var(--space-primary-rgb), 0.4);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.03);
    box-shadow: 0 0 35px rgba(var(--space-primary-rgb), 0.7);
  }
}

@keyframes pulse-basic {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(0.98);
    box-shadow: 0 0 15px rgba(var(--space-primary-rgb), 0.3);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.02);
    box-shadow: 0 0 25px rgba(var(--space-primary-rgb), 0.5);
  }
}

/* Orbites pour superadmin */
.orbital-rings {
  animation: rotate 20s linear infinite;
}

.orbital-ring {
  position: absolute;
  border: 1px dashed rgba(var(--space-accent-rgb), 0.3);
  border-radius: 50%;
}

.orbital-ring-1 {
  width: 110px;
  height: 110px;
  top: -5px;
  left: -5px;
  animation: rotate 15s linear infinite reverse;
}

.orbital-ring-2 {
  width: 130px;
  height: 130px;
  top: -15px;
  left: -15px;
  animation: rotate 25s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Particules pour superadmin */
.space-particles {
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: var(--space-accent);
  border-radius: 50%;
  opacity: 0.8;
}

.particle-1 {
  top: 20%;
  left: 80%;
  animation: float 3s ease-in-out infinite;
}

.particle-2 {
  top: 60%;
  left: 15%;
  animation: float 4s ease-in-out infinite 1s;
}

.particle-3 {
  top: 80%;
  left: 70%;
  animation: float 5s ease-in-out infinite 2s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-10px) scale(1.2);
    opacity: 0.4;
  }
}

/* Décorations de coins */
.corner-decoration {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.corner-top-left {
  top: 8px;
  left: 8px;
  border-top-color: var(--space-primary);
  border-left-color: var(--space-primary);
}

.corner-top-right {
  top: 8px;
  right: 8px;
  border-top-color: var(--space-primary);
  border-right-color: var(--space-primary);
}

.corner-bottom-left {
  bottom: 8px;
  left: 8px;
  border-bottom-color: var(--space-primary);
  border-left-color: var(--space-primary);
}

.corner-bottom-right {
  bottom: 8px;
  right: 8px;
  border-bottom-color: var(--space-primary);
  border-right-color: var(--space-primary);
}

.space-member-card:hover .corner-decoration {
  opacity: 1;
}

.space-member-card-admin .corner-top-left {
  border-top-color: var(--space-secondary);
  border-left-color: var(--space-secondary);
}

.space-member-card-admin .corner-top-right {
  border-top-color: var(--space-secondary);
  border-right-color: var(--space-secondary);
}

.space-member-card-admin .corner-bottom-left {
  border-bottom-color: var(--space-secondary);
  border-left-color: var(--space-secondary);
}

.space-member-card-admin .corner-bottom-right {
  border-bottom-color: var(--space-secondary);
  border-right-color: var(--space-secondary);
}

.space-member-card-superadmin .corner-top-left {
  border-top-color: var(--space-accent);
  border-left-color: var(--space-accent);
}

.space-member-card-superadmin .corner-top-right {
  border-top-color: var(--space-accent);
  border-right-color: var(--space-accent);
}

.space-member-card-superadmin .corner-bottom-left {
  border-bottom-color: var(--space-accent);
  border-left-color: var(--space-accent);
}

.space-member-card-superadmin .corner-bottom-right {
  border-bottom-color: var(--space-accent);
  border-right-color: var(--space-accent);
}

/* Styles spécifiques par type de carte */
.space-member-card-admin {
  background: linear-gradient(
    135deg,
    rgba(30, 41, 59, 0.85),
    rgba(28, 36, 54, 0.95)
  );
  box-shadow: 0 5px 20px rgba(var(--space-secondary-rgb), 0.2);
}

.space-member-card-admin:hover {
  box-shadow: 0 8px 30px rgba(var(--space-secondary-rgb), 0.4);
}

.space-member-card-superadmin {
  background: linear-gradient(
    135deg,
    rgba(36, 14, 40, 0.85),
    rgba(34, 13, 38, 0.95)
  );
  box-shadow: 0 5px 20px rgba(var(--space-accent-rgb), 0.2);
}

.space-member-card-superadmin:hover {
  box-shadow: 0 8px 30px rgba(var(--space-accent-rgb), 0.4);
}

.space-member-card-player {
  background: linear-gradient(
    135deg,
    rgba(25, 17, 45, 0.85),
    rgba(23, 15, 41, 0.95)
  );
  box-shadow: 0 5px 20px rgba(var(--space-primary-rgb), 0.2);
}

.space-member-card-player:hover {
  box-shadow: 0 8px 30px rgba(var(--space-primary-rgb), 0.5);
}

.space-member-card-basic {
  background: linear-gradient(
    135deg,
    rgba(20, 20, 35, 0.85),
    rgba(15, 15, 30, 0.95)
  );
  box-shadow: 0 3px 15px rgba(var(--space-primary-rgb), 0.1);
}

.space-member-card-basic:hover {
  box-shadow: 0 6px 25px rgba(var(--space-primary-rgb), 0.3);
}

/* Boutons et actions */
.space-view-profile-button {
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.space-member-cta {
  position: relative;
  overflow: hidden;
}

.space-member-cta::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.space-member-cta:hover::after {
  left: 100%;
}

.space-restricted-access {
  background: rgba(var(--space-bg-light-rgb), 0.1);
  backdrop-filter: blur(2px);
}

/* Shadow glow effect */
.shadow-glow {
  box-shadow: 0 0 25px rgba(var(--space-primary-rgb), 0.5);
}

.space-member-card-admin.shadow-glow {
  box-shadow: 0 0 25px rgba(var(--space-secondary-rgb), 0.5);
}

.space-member-card-superadmin.shadow-glow {
  box-shadow: 0 0 25px rgba(var(--space-accent-rgb), 0.5);
}

/* Responsive */
@media (max-width: 640px) {
  .space-member-card {
    margin-bottom: 1rem;
  }

  .orbital-ring-1,
  .orbital-ring-2 {
    display: none;
  }

  .space-particles {
    display: none;
  }
}
</style>
