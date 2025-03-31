<template>
  <div
    class="cyber-terminal bg-black/70 p-6 rounded-lg border border-cyan-500 my-4"
  >
    <div class="cyber-terminal-header">{{ title }}</div>
    <div class="cyber-terminal-content">
      <div class="mb-4">
        <span class="text-green-400">{{ prefix }}</span>
        <span class="text-cyan-400">{{ command }}</span>
      </div>
      <div v-if="errorCode" class="text-red-400 mb-2">
        ERROR CODE: {{ errorCode }}
      </div>
      <div class="text-cyan-300">
        {{ message }}
        <span class="blink">_</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  /**
   * Titre du terminal (en-tête)
   */
  title: {
    type: String,
    default: "SYSTÈME D'INFORMATION · ACS",
  },

  /**
   * Préfixe de la commande (username@host)
   */
  prefix: {
    type: String,
    default: "system@acs:~$ ",
  },

  /**
   * Commande affichée dans le terminal
   */
  command: {
    type: String,
    default: "search_data",
  },

  /**
   * Code d'erreur (optionnel)
   */
  errorCode: {
    type: String,
    default: "",
  },

  /**
   * Message principal
   */
  message: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.cyber-terminal {
  font-family: "Courier New", monospace;
  position: relative;
  overflow: hidden;
}

.cyber-terminal::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(6, 182, 212, 0.5) 25%,
    rgba(6, 182, 212, 0.5) 75%,
    transparent 100%
  );
}

.cyber-terminal-header {
  font-size: 0.7rem;
  color: #94a3b8;
  letter-spacing: 1px;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(6, 182, 212, 0.3);
  text-align: center;
}

.cyber-terminal-content {
  line-height: 1.6;
}

.blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
