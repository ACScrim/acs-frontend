<template>
  <SpaceContainer>
    <SpaceCard>
      <SpaceTitle size="lg" :decorated="true"
        >Test des notifications</SpaceTitle
      >
      <SpaceTerminal
        command="notify_test"
        title="Notifications"
        :showCursor="true"
      >
        <div class="text-normal-text">
          Cette page est un stub pour les tests de notification.
        </div>
      </SpaceTerminal>
    </SpaceCard>
  </SpaceContainer>
</template>

<script setup lang="ts">
// Stub view to satisfy router during builds; replace with real implementation when ready.
</script>

<style scoped></style>
