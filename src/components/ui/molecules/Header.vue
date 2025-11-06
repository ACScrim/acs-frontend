<template>
  <div class="space-header mb-8">
    <div class="space-header-content">
      <Title
        :size="titleSize"
        :decorated="decorated"
        class="space-header-title"
      >
        {{ title }}
      </Title>

      <div v-if="showMissionInfo" class="space-header-coordinates">
        <div class="space-header-coordinates-item">
          <span class="space-header-coordinates-label">MISSION:</span>
          <span class="space-header-coordinates-value">{{
            mission || `EXPLORER-${new Date().getFullYear()}`
          }}</span>
        </div>
        <span class="space-header-coordinates-separator">|</span>
        <div class="space-header-coordinates-item">
          <span class="space-header-coordinates-label">STAR DATE:</span>
          <span class="space-header-coordinates-value">{{
            starDate || formatStarDate()
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from "../atoms/Title.vue";

interface Props {
  title: string;
  titleSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  decorated?: boolean;
  showMissionInfo?: boolean;
  mission?: string;
  starDate?: string;
}

withDefaults(defineProps<Props>(), {
  titleSize: "3xl",
  decorated: true,
  showMissionInfo: true,
  mission: "",
  starDate: "",
});

/**
 * Génère une "star date" au format Star Trek
 */
const formatStarDate = () => {
  const now = new Date();
  const year = now.getFullYear().toString().substr(2);
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return `${year}${dayOfYear}.${now.getHours()}${now.getMinutes()}`;
};
</script>

<style scoped>
.space-header {
  position: relative;
  padding-top: 24px;
  padding-bottom: 24px;
  border-bottom: 2px solid rgba(220, 38, 38, 0.3);
  background: linear-gradient(
    135deg,
    rgba(15, 15, 15, 0.95) 0%,
    rgba(124, 45, 18, 0.08) 50%,
    rgba(15, 15, 15, 0.95) 100%
  );
  box-shadow: 0 2px 10px rgba(220, 38, 38, 0.15);
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.space-header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

/* Responsivité pour desktop */
@media (min-width: 1024px) {
  .space-header-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
}

.space-header-title {
  font-family: var(--font-nasa);
  text-transform: uppercase;
  letter-spacing: 3px;
  text-align: center;
  flex: 1;
}

/* Sur desktop, titre à gauche */
@media (min-width: 1024px) {
  .space-header-title {
    text-align: left;
    flex: none;
  }
}

.space-header-coordinates {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--space-text-muted);
}

/* Sur tablet et plus, affichage horizontal */
@media (min-width: 640px) {
  .space-header-coordinates {
    flex-direction: row;
    gap: 12px;
  }
}

.space-header-coordinates-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

/* Sur tablet et plus, affichage en ligne */
@media (min-width: 640px) {
  .space-header-coordinates-item {
    flex-direction: row;
    gap: 4px;
  }
}

.space-header-coordinates-label {
  font-family: var(--font-nasa);
  color: var(--space-secondary);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Sur tablet et plus, taille normale */
@media (min-width: 640px) {
  .space-header-coordinates-label {
    font-size: 0.75rem;
  }
}

.space-header-coordinates-value {
  font-weight: 500;
  color: var(--space-text);
}

.space-header-coordinates-separator {
  color: var(--space-primary);
  font-weight: bold;
  display: none;
}

/* Afficher le séparateur sur tablet et plus */
@media (min-width: 640px) {
  .space-header-coordinates-separator {
    display: inline;
  }
}

/* Animations et transitions */
.space-header-coordinates-item {
  transition: all 0.3s ease;
}

.space-header-coordinates-item:hover .space-header-coordinates-label {
  color: var(--space-primary);
}

.space-header-coordinates-item:hover .space-header-coordinates-value {
  color: var(--space-primary-light);
}
</style>
