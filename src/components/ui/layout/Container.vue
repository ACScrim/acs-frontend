<template>
  <div
    class="container mx-auto p-3 sm:p-6 pt-16 sm:pt-24 relative max-w-6xl horror-container"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
/**
 * CONTAINER COMPONENT - Composant conteneur Halloween
 *
 * Conteneur principal standardisé pour toutes les pages de l'application.
 * Fournit un cadre sombre avec effets Halloween et dimensions responsive.
 *
 * UTILISATION:
 * <Container>
 *   <Header title="TITRE DE LA PAGE" />
 *   <!-- Contenu de la page -->
 * </Container>
 *
 * CARACTÉRISTIQUES:
 * - Largeur maximale responsive (max-w-6xl)
 * - Marges automatiques pour centrage horizontal
 * - Espacement standardisé adaptatif (mobile/desktop)
 * - Padding supérieur pour éviter la navbar fixe
 * - Thème Halloween avec fond sombre et bordures oranges
 * - Compatible avec tous les composants internes
 */
defineOptions({
  name: "Container",
});
</script>

<style scoped>
/**
 * CONTAINER HALLOWEEN THEME
 * Styles pour le conteneur principal avec thème Halloween/horreur
 * Utilise les variables CSS du thème pour une cohérence visuelle
 */

/* Container principal avec dimensions standardisées */
.container {
  min-height: calc(100vh - 200px);
  position: relative;
  z-index: auto;
  overflow: visible;
  font-family: var(--font-body);
}

/* Effet Halloween pour le container */
.horror-container {
  background: var(--color-card-bg);
  border: 1px solid rgba(var(--color-primary-rgb), 0.3);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  box-shadow: var(--shadow-card-base);
  position: relative;
}

/* Effet de lueur au hover sans transformation */
.horror-container:hover {
  border-color: rgba(var(--color-primary-rgb), 0.5);
  box-shadow: var(--shadow-card-base), var(--shadow-glow-primary);
}

/* Décoration Halloween subtile */
.horror-container::before {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(var(--color-primary-rgb), 0.1) 25%,
    rgba(var(--color-secondary-rgb), 0.1) 50%,
    rgba(var(--color-accent-rgb), 0.1) 75%,
    transparent 100%
  );
  border-radius: 16px;
  z-index: -1;
  opacity: 0.3;
}

/* Media queries pour la responsivité */
@media (max-width: 640px) {
  .container {
    min-height: calc(100vh - 150px);
  }

  .horror-container {
    border-radius: 12px;
  }

  .horror-container::before {
    border-radius: 12px;
  }
}

@media (min-width: 1024px) {
  .horror-container {
    border-radius: 20px;
  }

  .horror-container::before {
    border-radius: 20px;
  }
}
</style>
