<template>
  <div class="mx-auto p-8 pt-20">
    <h1 class="text-4xl text-white mb-8 neon-text">
      Synchronisation des joueurs avec les utilisateurs
    </h1>
    <p class="text-white mb-4">
      Le username de Player et de User doit être similaire, faire les
      modifications si nécessaire.
    </p>
    <div class="flex flex-col md:flex-row justify-between">
      <div class="w-full md:w-1/2 pr-4 mb-4 overflow-x-auto">
        <h2 class="text-2xl text-white mb-4">Players</h2>
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b">Nom d'utilisateur</th>
              <th class="py-2 px-4 border-b">Actions</th>
              <th class="py-2 px-4 border-b hidden md:table-cell">
                ID Discord
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="player in players" :key="player._id">
              <td class="py-2 px-4 border-b">{{ player.username }}</td>
              <td class="py-2 px-4 border-b">
                <button
                  @click="editPlayerUsername(player)"
                  class="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Modifier
                </button>
              </td>
              <td class="py-2 px-4 border-b hidden md:table-cell">
                {{ player.discordId }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-full md:w-1/2 pl-4 mb-4 overflow-x-auto">
        <h2 class="text-2xl text-white mb-4">Users</h2>
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b">Nom d'utilisateur</th>
              <th class="py-2 px-4 border-b">Email</th>
              <th class="py-2 px-4 border-b hidden md:table-cell">
                ID Discord
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id">
              <td class="py-2 px-4 border-b">{{ user.username }}</td>
              <td class="py-2 px-4 border-b">{{ user.email }}</td>
              <td class="py-2 px-4 border-b hidden md:table-cell">
                {{ user.discordId }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <button
      @click="synchronizePlayers"
      class="mt-4 bg-green-500 text-white px-6 py-3 rounded"
    >
      Synchroniser les joueurs avec les utilisateurs
    </button>
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import playerService from "../services/playerService";
import userService from "../services/userService";
import Toast from "../shared/Toast.vue";

interface Player {
  _id?: string;
  username: string;
  discordId?: string;
  userId?: string;
}

interface User {
  _id?: string;
  username: string;
  email: string;
  discordId?: string;
}

const players = ref<Player[]>([]);
const users = ref<User[]>([]);
const error = ref<string | null>(null);
const success = ref<string | null>(null);

const fetchPlayers = async () => {
  players.value = await playerService.getPlayers();
};

const fetchUsers = async () => {
  users.value = await userService.fetchAllUsers();
};

const synchronizePlayers = async () => {
  try {
    await playerService.synchronizePlayers();
    showMessage("success", "Synchronisation réussie !");
    fetchPlayers();
  } catch (err) {
    console.error("Erreur lors de la synchronisation:", err);
    showMessage("error", "Erreur lors de la synchronisation.");
  }
};

const editPlayerUsername = (player: Player) => {
  const newUsername = prompt("Modifier le nom d'utilisateur:", player.username);
  if (newUsername) {
    playerService
      .updatePlayerUsername(player._id!, newUsername)
      .then(() => {
        showMessage("success", "Nom d'utilisateur mis à jour avec succès !");
        fetchPlayers();
      })
      .catch((err) => {
        console.error(
          "Erreur lors de la mise à jour du nom d'utilisateur:",
          err
        );
        showMessage(
          "error",
          "Erreur lors de la mise à jour du nom d'utilisateur."
        );
      });
  }
};

const showMessage = (type: "success" | "error", message: string) => {
  if (type === "success") {
    success.value = message;
    error.value = null;
  } else {
    error.value = message;
    success.value = null;
  }
  setTimeout(() => {
    success.value = null;
    error.value = null;
  }, 3000);
};

onMounted(() => {
  fetchPlayers();
  fetchUsers();
});
</script>

<style scoped>
.neon-text {
  font-family: "Streamster", cursive;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff,
    0 0 40px #ff00ff;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
