<template>
  <div
    class="container mx-auto p-3 sm:p-6 pt-16 sm:pt-24 relative max-w-6xl west-container-surface"
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
 * - Surface cuir/parchemin avec ombres douces
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

/* Surface Far West (cuir sombre, lisible) */
.west-container-surface {
  border-radius: 16px;
  backdrop-filter: blur(8px);
  background: radial-gradient(
      120% 80% at 0% 0%,
      rgba(255, 255, 255, 0.02),
      transparent 60%
    ),
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(0, 0, 0, 0.12)),
    rgba(var(--color-card-bg-rgb, 26, 19, 12), 0.88);
  border: 1px solid rgba(var(--color-card-border-rgb, 194, 143, 44), 0.35);
  box-shadow: var(--shadow-card-base, 0 6px 24px rgba(0, 0, 0, 0.4));
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.west-container-surface:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border-color: rgba(var(--color-card-border-rgb, 194, 143, 44), 0.5);
}
</style>
