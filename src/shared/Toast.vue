<!-- filepath: d:\Dev\ACS\acs-frontend\src\components\Toast.vue -->
<template>
  <div
    v-if="message"
    :class="[
      'mt-4 p-4 rounded shadow toast',
      type === 'error'
        ? 'bg-red-500 text-white error-toast'
        : 'bg-green-500 text-white success-toast',
    ]"
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  type: {
    type: String,
    required: true,
    validator: (value: string) => ["success", "error"].includes(value),
  },
  message: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.toast {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 10px, 0 0 20px;
}

.error-toast {
  background: #ff3864;
  color: white;
  box-shadow: 0 0 10px #ff3864, 0 0 20px #ff3864;
}

.success-toast {
  background: #28a745;
  color: white;
  box-shadow: 0 0 10px #28a745, 0 0 20px #28a745;
}
</style>
