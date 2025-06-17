<template>
  <div class="space-header mb-8">
    <SpaceTitle
      :size="titleSize"
      :decorated="decorated"
      class="mx-auto space-header-title"
    >
      {{ title }}
    </SpaceTitle>

    <div v-if="showMissionInfo" class="space-header-coordinates">
      <span class="space-header-coordinates-label">MISSION:</span>
      {{ mission || `EXPLORER-${new Date().getFullYear()}` }}
      <span class="space-header-coordinates-separator">|</span>
      <span class="space-header-coordinates-label">STAR DATE:</span>
      {{ starDate || formatStarDate() }}
    </div>
  </div>
</template>

<script setup lang="ts">
import SpaceTitle from "../atoms/Title.vue";

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
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.space-header-title {
  font-family: var(--font-nasa);
  text-transform: uppercase;
  letter-spacing: 3px;
}

.space-header-coordinates {
  position: absolute;
  right: 0;
  bottom: 10px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--space-text-muted);
}

.space-header-coordinates-label {
  font-family: var(--font-nasa);
  color: var(--space-secondary);
}

.space-header-coordinates-separator {
  margin: 0 8px;
  color: var(--space-primary);
}
</style>
