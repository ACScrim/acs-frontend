<template>
  <div class="horror-header mb-8">
    <div class="horror-header-content">
      <Title
        :size="titleSize"
        :decorated="decorated"
        class="horror-header-title"
      >
        {{ title }}
      </Title>

      <div v-if="showMissionInfo" class="horror-header-info">
        <div class="horror-header-info-item">
          <span class="horror-header-info-label">INCANTATION:</span>
          <span class="horror-header-info-value">{{
            mission || `NIGHTMARE-${new Date().getFullYear()}`
          }}</span>
        </div>
        <span class="horror-header-info-separator">☠</span>
        <div class="horror-header-info-item">
          <span class="horror-header-info-label">BLOOD MOON:</span>
          <span class="horror-header-info-value">{{
            starDate || formatDoomDate()
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
 * Génère une "doom date" au format horrifique Halloween
 */
const formatDoomDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();

  // Format mystique : YYYY.MM.DD.HH.MM
  return `${year}.${month.toString().padStart(2, "0")}.${day
    .toString()
    .padStart(2, "0")}.${hour.toString().padStart(2, "0")}.${minute
    .toString()
    .padStart(2, "0")}`;
};
</script>

<style scoped>
.horror-header {
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

.horror-header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 100%;
  padding: 0 20px;
}

/* Responsivité pour desktop */
@media (min-width: 1024px) {
  .horror-header-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
  }
}

.horror-header-title {
  font-family: var(--font-heading);
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  flex: 1;
  color: var(--color-primary);
  text-shadow: 0 0 8px rgba(217, 119, 6, 0.4), 1px 1px 2px rgba(0, 0, 0, 0.8);
  max-width: 100%;
  word-wrap: break-word;
}

/* Sur desktop, titre à gauche */
@media (min-width: 1024px) {
  .horror-header-title {
    text-align: left;
    flex: none;
    max-width: calc(100% - 300px);
  }
}

.horror-header-info {
  display: none; /* Masqué par défaut sur mobile */
  flex-direction: row;
  align-items: center;
  gap: 16px;
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-text-muted);
  background: rgba(15, 15, 15, 0.9);
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid rgba(217, 119, 6, 0.3);
  box-shadow: 0 0 8px rgba(217, 119, 6, 0.2);
  flex-shrink: 0;
}

/* Afficher seulement sur écrans >= 640px */
@media (min-width: 640px) {
  .horror-header-info {
    display: flex;
  }
}

.horror-header-info-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.horror-header-info-label {
  font-family: var(--font-body);
  color: var(--color-primary-light);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  text-shadow: 0 0 5px rgba(245, 158, 11, 0.4);
  font-weight: 600;
}

.horror-header-info-value {
  font-weight: 600;
  color: var(--color-text);
  font-family: var(--font-body);
  text-shadow: 0 0 3px rgba(217, 119, 6, 0.3);
}

.horror-header-info-separator {
  color: var(--color-secondary);
  font-weight: bold;
  font-size: 1.2rem;
  text-shadow: 0 0 8px rgba(220, 38, 38, 0.4);
}

/* Animations et transitions Halloween simplifiées */
.horror-header-info-item {
  transition: all 0.3s ease;
}

.horror-header-info-item:hover .horror-header-info-label {
  color: var(--color-primary);
}

.horror-header-info-item:hover .horror-header-info-value {
  color: var(--color-primary-light);
}
</style>
