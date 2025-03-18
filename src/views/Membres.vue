<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\Membres.vue -->
<template>
  <div class="container mx-auto p-8 pt-20">
    <h1 class="text-4xl text-white mb-8 neon-text font-audiowide text-center">
      Liste des membres
    </h1>

    <div
      class="bg-black/75 backdrop-blur-sm rounded-lg border border-pink-500 shadow-lg shadow-pink-500/30 overflow-hidden"
    >
      <div class="grid grid-cols-1 divide-y divide-pink-500/30">
        <div
          v-for="user in users"
          :key="user._id"
          class="member-card p-4 transition-all hover:bg-purple-900/20"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="avatar-container">
                <img
                  v-if="user.avatarUrl"
                  :src="user.avatarUrl"
                  alt="Avatar"
                  class="w-16 h-16 rounded-full object-cover border-2 border-cyan-500 avatar-glow"
                />
                <div
                  v-else
                  class="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center border-2 border-pink-500"
                >
                  <span class="text-pink-500 text-xl font-bold">{{
                    user.username.charAt(0).toUpperCase()
                  }}</span>
                </div>
              </div>
              <div>
                <router-link
                  :to="{ name: 'Profil', params: { id: user.playerId } }"
                  class="text-lg text-white hover:text-pink-400 font-orbitron transition-colors member-link"
                >
                  {{ user.username }}
                </router-link>
                <div class="text-sm text-gray-400 mt-1">
                  <span v-if="user.role === 'admin'" class="role-badge admin"
                    >Admin</span
                  >
                  <span
                    v-else-if="user.role === 'superadmin'"
                    class="role-badge superadmin"
                    >Super Admin</span
                  >
                  <span v-else class="role-badge member">Membre</span>
                </div>
              </div>
            </div>
            <div class="view-profile-button">
              <router-link
                :to="{ name: 'Profil', params: { id: user.playerId } }"
                class="px-4 py-2 rounded text-sm neon-button-cyan font-orbitron"
              >
                Voir profil
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="users.length === 0 && !error" class="text-center my-12">
      <div
        class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mb-4"
      ></div>
      <p class="text-white font-orbitron">Chargement des membres...</p>
    </div>

    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import userService from "../services/userService";
import playerService from "../services/playerService";
import Toast from "@/shared/Toast.vue";

interface User {
  _id?: string;
  username: string;
  email: string;
  role: string;
  avatarUrl: string;
  playerId?: string; // Ajout de playerId
}

const users = ref<User[]>([]);
const error = ref<string | null>(null);
const success = ref<string | null>(null);

const fetchUsers = async () => {
  try {
    const fetchedUsers = await userService.fetchAllUsers();
    for (const user of fetchedUsers) {
      try {
        const player = await playerService.getPlayerByIdUser(user._id!);
        user.playerId = player._id;
      } catch (err) {
        console.error(
          `Erreur lors de la récupération du joueur pour l'utilisateur ${user._id}:`,
          err
        );
      }
    }
    users.value = fetchedUsers;
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs:", err);
    error.value = "Erreur lors de la récupération des utilisateurs.";
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Audiowide&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap");

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.neon-text {
  font-family: "Audiowide", cursive;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff,
    0 0 40px #ff00ff;
}

.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

.member-card {
  transition: all 0.3s ease;
}

.member-card:hover {
  background-color: rgba(168, 85, 247, 0.15);
}

.avatar-container {
  position: relative;
}

.avatar-glow {
  box-shadow: 0 0 15px rgba(34, 211, 238, 0.5);
  transition: all 0.3s ease;
}

.member-card:hover .avatar-glow {
  box-shadow: 0 0 20px rgba(34, 211, 238, 0.8);
}

.role-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-family: "Orbitron", sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.role-badge.admin {
  background-color: rgba(219, 39, 119, 0.2);
  color: #f472b6;
  border: 1px solid #f472b6;
}

.role-badge.superadmin {
  background-color: rgba(236, 72, 153, 0.2);
  color: #ec4899;
  border: 1px solid #ec4899;
}

.role-badge.member {
  background-color: rgba(34, 211, 238, 0.2);
  color: #22d3ee;
  border: 1px solid #22d3ee;
}

.member-link {
  position: relative;
  display: inline-block;
}

.member-link::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-image: linear-gradient(to right, #ec4899, #8b5cf6);
  transition: width 0.3s ease-in-out;
}

.member-link:hover::after {
  width: 100%;
}

.neon-button-cyan {
  display: inline-block;
  background: rgba(6, 182, 212, 0.1);
  color: #22d3ee;
  border: 1px solid #06b6d4;
  box-shadow: 0 0 5px rgba(6, 182, 212, 0.5);
  transition: all 0.3s ease;
  text-align: center;
}

.neon-button-cyan:hover {
  background: rgba(6, 182, 212, 0.2);
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.8);
  transform: translateY(-1px);
}

@keyframes glowPulse {
  0% {
    box-shadow: 0 0 5px rgba(236, 72, 153, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(236, 72, 153, 0.8);
  }
  100% {
    box-shadow: 0 0 5px rgba(236, 72, 153, 0.5);
  }
}

/* Assurer que le spinner a une animation fluide */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
