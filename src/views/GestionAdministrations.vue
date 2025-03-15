<template>
  <div class="container mx-auto p-8 pt-20">
    <h1 class="text-4xl text-white mb-8 neon-text">
      Gestion des administrations
    </h1>
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">Nom d'utilisateur</th>
          <th class="py-2 px-4 border-b">Email</th>
          <th class="py-2 px-4 border-b">Rôle</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td class="py-2 px-4 border-b">{{ user.username }}</td>
          <td class="py-2 px-4 border-b">{{ user.email }}</td>
          <td class="py-2 px-4 border-b">
            <select v-model="user.role" @change="updateUserRole(user)">
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Superadmin</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import userService from "../services/userService";
import Toast from "@/shared/Toast.vue";

interface User {
  _id?: string;
  username: string;
  role: string;
  email: string;
}

const users = ref<User[]>([]);
const error = ref<string | null>(null);
const success = ref<string | null>(null);

const fetchUsers = async () => {
  users.value = await userService.fetchAllUsers();
};

const updateUserRole = async (user: any) => {
  try {
    await userService.updateUserRole(user._id, user.role);
    showMessage("success", "Rôle mis à jour avec succès !");
    fetchUsers();
  } catch (err) {
    console.error("Erreur lors de la mise à jour du rôle:", err);
    showMessage("error", "Erreur lors de la mise à jour du rôle.");
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
  fetchUsers();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

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

select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
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
