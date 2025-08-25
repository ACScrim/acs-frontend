<template>
  <div class="header mb-8">
    <div class="header-content">
      <Title :size="titleSize" :decorated="decorated" class="header-title">
        {{ title }}
      </Title>

      <!-- Far West: static WANTED poster with a random member name -->
      <div
        v-if="showMissionInfo"
        class="header-wanted"
        aria-live="polite"
        aria-atomic="true"
      >
        <div class="poster">
          <div class="poster-title">WANTED</div>
          <div class="poster-name">{{ selectedName }}</div>
          <div class="poster-bounty">{{ rewardText }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from "../atoms/Title.vue";
import { ref, watch, onMounted } from "vue";
import { useMemberStore } from "../../../stores/memberStore";

interface Props {
  title: string;
  titleSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  decorated?: boolean;
  showMissionInfo?: boolean;
  wantedName?: string; // Optional override for the WANTED name
  wantedCandidates?: string[]; // Optional list to pick from
}

const props = withDefaults(defineProps<Props>(), {
  titleSize: "3xl",
  decorated: true,
  showMissionInfo: true,
  wantedName: "",
  wantedCandidates: () => [],
});

// Wanted name selection + random reward
const selectedName = ref<string>("");
const store = useMemberStore?.() as any;
const rewardText = ref<string>("REWARD 0$");

const pickRandom = (arr: any[]): any =>
  arr[Math.floor(Math.random() * arr.length)];

const generateReward = () => {
  const amount = Math.floor(Math.random() * 1_000_001); // 0..1,000,000
  const formatted = new Intl.NumberFormat("en-US").format(amount);
  rewardText.value = `REWARD ${formatted}$`;
};

const refreshWanted = () => {
  if (props.wantedName && props.wantedName.trim()) {
    selectedName.value = props.wantedName.trim();
    generateReward();
    return;
  }
  if (Array.isArray(props.wantedCandidates) && props.wantedCandidates.length) {
    selectedName.value = pickRandom(
      props.wantedCandidates.filter((n) => typeof n === "string" && n.trim())
    );
    generateReward();
    return;
  }
  const namesFromStore: string[] = Array.isArray(store?.members)
    ? store.members
        .map((m: any) => m?.username)
        .filter((n: any) => typeof n === "string" && n.trim())
    : [];
  if (namesFromStore.length) {
    selectedName.value = pickRandom(namesFromStore);
    generateReward();
    return;
  }
  selectedName.value = "Billy The Kid";
  generateReward();
};

onMounted(() => {
  refreshWanted();
});

// React when override or candidates change
watch(
  () => [props.wantedName, props.wantedCandidates?.length],
  () => refreshWanted()
);

// When the store loads or updates, refresh once if no explicit name
if (store) {
  watch(
    () => store.members?.length,
    () => {
      if (!props.wantedName) refreshWanted();
    },
    { immediate: false }
  );
}
</script>

<style scoped>
.header {
  position: relative;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.header-title {
  font-family: var(--font-heading, "Rye", serif);
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  flex: 1;
}

/* Responsivité pour desktop */
@media (min-width: 1024px) {
  .header-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
  .header-title {
    text-align: left;
    flex: none;
  }
}

/* Wanted poster */
.header-wanted {
  width: 100%;
  max-width: 360px;
  display: flex;
  justify-content: center;
}

.poster {
  position: relative;
  width: 100%;
  padding: 8px 12px;
  text-align: center;
  color: var(--normal-text);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.08),
      rgba(0, 0, 0, 0.18)
    ),
    radial-gradient(
      120% 60% at 50% 0%,
      rgba(255, 255, 255, 0.06),
      transparent 60%
    ),
    radial-gradient(90% 60% at 50% 120%, rgba(0, 0, 0, 0.25), transparent 60%);
  background-color: rgba(var(--background-bg-light-rgb, 35, 25, 15), 0.9);
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04),
    0 4px 12px rgba(0, 0, 0, 0.22);
}

.poster::before,
.poster::after {
  content: "";
  position: absolute;
  left: 12px;
  right: 12px;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(0, 0, 0, 0.35),
    transparent
  );
}
.poster::before {
  top: -6px;
}
.poster::after {
  bottom: -6px;
}

.poster-title {
  font-family: var(--font-heading, "Rye", serif);
  font-size: 0.85rem;
  letter-spacing: 3px;
  color: rgba(var(--color-accent-rgb, 210, 160, 80), 0.95);
}

.poster-name {
  font-family: var(--font-body, "Roboto Slab", serif);
  font-size: 0.9rem;
  font-weight: 700;
  color: rgba(var(--normal-text-rgb, 220, 210, 200), 0.95);
  text-transform: uppercase;
  letter-spacing: 1.2px;
  max-width: 100%;
  word-break: break-word;
}

.poster-bounty {
  display: block;
  margin-top: 2px;
  font-size: 0.75rem;
  letter-spacing: 1px;
  color: rgba(var(--color-secondary-rgb, 160, 120, 60), 0.9);
  max-width: 100%;
  word-break: break-word;
}

/* Decorative rules already visible across sizes; nothing extra on large screens. */
</style>
