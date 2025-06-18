<template>
  <div class="container mx-auto p-3 sm:p-6 pt-16 sm:pt-24 relative max-w-6xl">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
/**
 * Composant conteneur standardisé pour les vues principales de l'application
 *
 * Caractéristiques :
 * - Largeur maximale responsive (max-w-6xl)
 * - Marges automatiques pour centrage
 * - Espacement standardisé sur tous les écrans
 * - Padding supérieur adapté pour éviter la navbar
 *
 * Usage :
 * ```vue
 * <SpaceContainer>
 *   <SpaceHeader title="TITRE DE LA PAGE" />
 *   <!-- Contenu de la page -->
 * </SpaceContainer>
 * ```
 */
defineOptions({
  name: "SpaceContainer",
});
</script>

<style scoped>
/* Container principal avec dimensions standardisées */
.container {
  min-height: calc(100vh - 200px);
  position: relative;
  z-index: 20;
  overflow: visible;
}
</style>
