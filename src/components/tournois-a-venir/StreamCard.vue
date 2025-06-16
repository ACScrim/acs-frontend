<template>
  <div
    class="stream-card bg-slate-800/70 rounded-lg border border-green-500/30 overflow-hidden hover:border-green-500/50 transition-all cursor-pointer transform hover:scale-105"
    @click="selectStream"
  >
    <!-- Thumbnail du stream -->
    <div class="relative aspect-video bg-gray-900">
      <img
        :src="getThumbnailUrl()"
        :alt="`Stream de ${user.username}`"
        class="w-full h-full object-cover"
        loading="lazy"
      />

      <!-- Badge LIVE -->
      <div
        class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold animate-pulse"
      >
        LIVE
      </div>

      <!-- Badge participant -->
      <div
        v-if="user.isParticipant"
        class="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold"
      >
        PARTICIPANT
      </div>

      <!-- Viewers -->
      <div
        class="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs"
      >
        👥 {{ formatViewers() }}
      </div>

      <!-- Durée -->
      <div
        class="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs"
      >
        ⏱️ {{ formatDuration() }}
      </div>
    </div>

    <!-- Informations du stream -->
    <div class="p-4">
      <h5 class="font-semibold text-white truncate flex items-center">
        {{ user.username }}
        <!-- Icône participant -->
        <svg
          v-if="user.isParticipant"
          class="h-4 w-4 text-blue-400 ml-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </h5>

      <p class="text-sm text-gray-400 truncate" :title="user.stream?.title">
        {{ user.stream?.title }}
      </p>

      <p class="text-xs text-purple-400 mt-1">
        {{ user.stream?.gameName }}
      </p>

      <div class="flex justify-between items-center mt-3">
        <span class="text-xs text-gray-500">@{{ user.twitchUsername }}</span>
        <button
          @click.stop="$emit('openTwitch', user.stream)"
          class="text-xs text-purple-400 hover:text-purple-300 transition-colors"
        >
          Ouvrir sur Twitch
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import streamService from "../..//services/streamService";
import type { UserWithTwitch } from "../../types";

// ========================================
// PROPS ET EMITS
// ========================================

interface Props {
  user: UserWithTwitch;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  openTwitch: [stream: any];
  streamSelected: [stream: any];
}>();

// ========================================
// MÉTHODES
// ========================================

const getThumbnailUrl = () => {
  if (!props.user.stream?.thumbnailUrl) return "";
  return streamService.getStreamThumbnail(
    props.user.stream.thumbnailUrl,
    320,
    180
  );
};

const formatViewers = () => {
  if (!props.user.stream?.viewerCount) return "0";
  return streamService.formatViewerCount(props.user.stream.viewerCount);
};

const formatDuration = () => {
  if (!props.user.stream?.startedAt) return "0m";
  return streamService.getStreamDuration(props.user.stream.startedAt);
};

const selectStream = () => {
  emit("streamSelected", props.user.stream);
};
</script>

<style scoped>
.stream-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stream-card:hover {
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.2);
}
</style>
