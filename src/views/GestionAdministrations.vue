<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1 class="cyber-title">Gestion des Administrateurs</h1>
      <div class="title-line"></div>
    </div>

    <div class="search-bar">
      <div class="search-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Rechercher un utilisateur..."
        class="cyber-input"
      />
    </div>

    <div class="users-table-container">
      <div class="users-table-header">
        <div class="column-header username">Nom d'utilisateur</div>
        <div class="column-header email">Email</div>
        <div class="column-header role">Rôle</div>
        <div class="column-header actions">Actions</div>
      </div>

      <div class="users-table-body">
        <div
          v-for="user in filteredUsers"
          :key="user._id"
          class="user-row"
          :class="{
            admin: user.role === 'admin',
            superadmin: user.role === 'superadmin',
          }"
        >
          <div class="user-cell username">
            <div class="user-avatar">{{ getUserInitials(user.username) }}</div>
            <span>{{ user.username }}</span>
          </div>
          <div class="user-cell email">{{ user.email }}</div>
          <div class="user-cell role">
            <div class="role-badge" :class="user.role">{{ user.role }}</div>
          </div>
          <div class="user-cell actions">
            <div class="select-wrapper">
              <select
                v-model="user.role"
                @change="updateUserRole(user)"
                class="cyber-select"
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
              <div class="select-arrow"></div>
            </div>
          </div>
        </div>

        <div v-if="filteredUsers.length === 0" class="empty-state">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            />
          </svg>
          <p>Aucun utilisateur trouvé</p>
        </div>
      </div>
    </div>

    <div class="admin-stats">
      <div class="stat-card">
        <div class="stat-value">{{ users.length }}</div>
        <div class="stat-label">Utilisateurs total</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">
          {{ users.filter((u) => u.role === "admin").length }}
        </div>
        <div class="stat-label">Administrateurs</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">
          {{ users.filter((u) => u.role === "superadmin").length }}
        </div>
        <div class="stat-label">Superadmins</div>
      </div>
    </div>

    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
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
const searchTerm = ref("");

const filteredUsers = computed(() => {
  if (!searchTerm.value) return users.value;

  const term = searchTerm.value.toLowerCase();
  return users.value.filter(
    (user) =>
      user.username.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
  );
});

const getUserInitials = (username: string) => {
  if (!username) return "?";
  const nameParts = username.split(" ");
  if (nameParts.length === 1) return username.charAt(0).toUpperCase();
  return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
};

const fetchUsers = async () => {
  try {
    users.value = await userService.fetchAllUsers();
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs:", err);
    showMessage("error", "Erreur lors de la récupération des utilisateurs.");
  }
};

const updateUserRole = async (user: any) => {
  try {
    await userService.updateUserRole(user._id, user.role);
    showMessage(
      "success",
      `Le rôle de ${user.username} a été mis à jour avec succès !`
    );
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
@import url("https://fonts.googleapis.com/css2?family=Audiowide&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap");

/* Container principal */
.admin-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(13, 6, 23, 0.8);
  border-radius: 1rem;
  border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

/* Effet de grille en arrière-plan */
.admin-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      rgba(139, 92, 246, 0.05) 25%,
      rgba(139, 92, 246, 0.05) 26%,
      transparent 27%,
      transparent 74%,
      rgba(139, 92, 246, 0.05) 75%,
      rgba(139, 92, 246, 0.05) 76%,
      transparent 77%
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      rgba(139, 92, 246, 0.05) 25%,
      rgba(139, 92, 246, 0.05) 26%,
      transparent 27%,
      transparent 74%,
      rgba(139, 92, 246, 0.05) 75%,
      rgba(139, 92, 246, 0.05) 76%,
      transparent 77%
    );
  background-size: 50px 50px;
  z-index: -1;
}

/* En-tête */
.admin-header {
  margin-bottom: 2.5rem;
  text-align: center;
}

.cyber-title {
  font-family: "Audiowide", cursive;
  font-size: 2.5rem;
  color: #ffffff;
  text-align: center;
  text-shadow: 0 0 10px #ec4899, 0 0 20px #ec4899, 0 0 30px #ec4899,
    0 0 40px #ec4899;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
}

.title-line {
  height: 4px;
  width: 10rem;
  margin: 0 auto;
  background: linear-gradient(
    90deg,
    transparent,
    #ec4899,
    #8b5cf6,
    #3b82f6,
    transparent
  );
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.6);
}

/* Barre de recherche */
.search-bar {
  display: flex;
  align-items: center;
  background: rgba(31, 41, 55, 0.7);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(139, 92, 246, 0.3);
  position: relative;
}

.search-icon {
  display: flex;
  color: #8b5cf6;
  margin-right: 0.5rem;
}

.cyber-input {
  width: 100%;
  background: transparent;
  border: none;
  color: white;
  font-family: "Orbitron", sans-serif;
  font-size: 0.9rem;
  outline: none;
}

.cyber-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

/* Table des utilisateurs */
.users-table-container {
  background: rgba(17, 24, 39, 0.7);
  border-radius: 0.75rem;
  overflow: hidden;
  margin-bottom: 2rem;
  border: 1px solid rgba(6, 182, 212, 0.3);
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
}

.users-table-header {
  display: grid;
  grid-template-columns: 2fr 3fr 1fr 1.5fr;
  padding: 1rem;
  background: rgba(31, 41, 55, 0.9);
  border-bottom: 1px solid rgba(139, 92, 246, 0.3);
}

.column-header {
  font-family: "Orbitron", sans-serif;
  font-weight: 700;
  color: #06b6d4;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0 0.5rem;
}

.users-table-body {
  max-height: 500px;
  overflow-y: auto;
}

/* Ligne utilisateur */
.user-row {
  display: grid;
  grid-template-columns: 2fr 3fr 1fr 1.5fr;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(55, 65, 81, 0.5);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.user-row::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: #6b7280;
}

.user-row.admin::before {
  background: #8b5cf6;
}

.user-row.superadmin::before {
  background: #ec4899;
}

.user-row:hover {
  background: rgba(55, 65, 81, 0.3);
}

/* Cellule utilisateur */
.user-cell {
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  font-family: "Orbitron", sans-serif;
  color: white;
  font-size: 0.9rem;
}

/* Avatar utilisateur */
.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  font-weight: bold;
  border-radius: 50%;
  margin-right: 0.75rem;
  font-size: 0.9rem;
}

/* Badge de rôle */
.role-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
}

.role-badge.user {
  background: rgba(107, 114, 128, 0.3);
  border: 1px solid rgba(107, 114, 128, 0.5);
  color: #d1d5db;
}

.role-badge.admin {
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid rgba(139, 92, 246, 0.5);
  color: #c4b5fd;
}

.role-badge.superadmin {
  background: rgba(236, 72, 153, 0.2);
  border: 1px solid rgba(236, 72, 153, 0.5);
  color: #fbcfe8;
}

/* Select stylisé */
.select-wrapper {
  position: relative;
  width: 100%;
}

.cyber-select {
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  color: white;
  background-color: rgba(31, 41, 55, 0.8);
  border: 1px solid rgba(6, 182, 212, 0.5);
  border-radius: 0.25rem;
  font-family: "Orbitron", sans-serif;
  font-size: 0.8rem;
  appearance: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cyber-select:focus {
  outline: none;
  border-color: #06b6d4;
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
}

.select-arrow {
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #06b6d4;
  pointer-events: none;
}

/* Statistiques */
.admin-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.stat-card {
  background: rgba(31, 41, 55, 0.7);
  border-radius: 0.5rem;
  padding: 1.25rem;
  text-align: center;
  border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #8b5cf6, #ec4899);
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
}

.stat-value {
  font-family: "Audiowide", cursive;
  font-size: 2rem;
  color: white;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
}

.stat-label {
  font-family: "Orbitron", sans-serif;
  color: #a78bfa;
  font-size: 0.875rem;
  font-weight: 600;
}

/* État vide */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  color: #a78bfa;
}

.empty-state svg {
  opacity: 0.7;
  margin-bottom: 1rem;
}

.empty-state p {
  font-family: "Orbitron", sans-serif;
  text-align: center;
}

/* Scrollbar personnalisée */
.users-table-body::-webkit-scrollbar {
  width: 8px;
}

.users-table-body::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5);
  border-radius: 4px;
}

.users-table-body::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.5);
  border-radius: 4px;
}

.users-table-body::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 92, 246, 0.8);
}

/* Media queries pour responsive */
@media screen and (max-width: 768px) {
  .admin-container {
    padding: 1rem;
  }

  .cyber-title {
    font-size: 2rem;
  }

  .users-table-header,
  .user-row {
    grid-template-columns: 1fr 2fr;
  }

  .column-header.email,
  .user-cell.email,
  .column-header.role,
  .user-cell.role {
    display: none;
  }

  .user-row {
    padding: 1rem;
    gap: 1rem;
  }

  .user-avatar {
    width: 2rem;
    height: 2rem;
    font-size: 0.8rem;
  }

  .role-badge {
    display: none;
  }

  .stat-card {
    padding: 1rem;
  }
}
</style>
