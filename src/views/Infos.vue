<template>
  <div class="container mx-auto p-8 pt-20">
    <div class="p-15">
      <h1 class="text-4xl text-white mb-8 neon-text">À propos de ACS</h1>
      <div class="">
        <h2 class="text-2xl mb-4">Qui sommes-nous ?</h2>
        <p class="mb-4">
          ACS est une organisation dédiée à la promotion des compétitions de
          jeux vidéo. Nous organisons des tournois, des événements et des
          rencontres pour les joueurs de tous niveaux.
        </p>
        <h2 class="text-2xl mb-4">Notre mission</h2>
        <p class="mb-4">
          Notre mission est de créer une communauté passionnée autour des jeux
          vidéo. Nous croyons en l'importance de l'esprit sportif, de la
          camaraderie et de la compétition saine.
        </p>
        <h2 class="text-2xl mb-4">Nos valeurs</h2>
        <ul class="list-disc list-inside mb-4">
          <li>Respect</li>
          <li>Intégrité</li>
          <li>Passion</li>
          <li>Innovation</li>
        </ul>
        <h2 class="text-2xl mb-4">Contactez-nous</h2>
        <p class="mb-4">
          Pour toute question ou information supplémentaire, n'hésitez pas à
          nous contacter sur le discord
          <a
            href="https://discord.gg/8TzvSxf83G"
            class="text-pink-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            à ce lien.
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  text-align: center;
  border: 1px solid white;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px) brightness(200%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.list-disc {
  list-style-type: disc;
}

.list-inside {
  list-style-position: inside;
}
</style>
