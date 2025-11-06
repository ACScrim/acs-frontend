<template>
  <div
    class="container mx-auto p-3 sm:p-6 pt-16 sm:pt-24 relative max-w-6xl space-container-effect"
  >
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
 * - Effet "zoomé" avec ombre et fond translucide
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
  /* Pas de z-index élevé pour permettre aux modales globales de s'afficher correctement */
  /* z-index: auto pour permettre aux éléments enfants de sortir du contexte d'empilement */
  z-index: auto;
  /* Nous gardons overflow: visible pour permettre aux modales de déborder */
  overflow: visible;
}

/* Effet "zoomé" premium pour le container */
.space-container-effect {
  background-color: rgba(30, 30, 45, 0.7);
  box-shadow: 0 0 30px rgba(109, 40, 217, 0.2);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(109, 40, 217, 0.1);
}

.space-container-effect:hover {
  box-shadow: 0 0 40px rgba(109, 40, 217, 0.3);
  transform: scale(1.005);
}
</style>
