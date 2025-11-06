<template>
  <div class="container mx-auto p-4 pt-20">
    <!-- Form -->
    <form action="" @submit.prevent="handleSubmit">
      <Card variant="dark" :stars="true" class="mb-6">
        <div class="space-y-4">
          <Title size="lg" class="text-space-primary-light">
            Quel type de message ?
          </Title>

          <!-- Boutons radio avec design spatial -->
          <div class="flex flex-col sm:flex-row gap-4">
            <!-- Option Salon -->
            <div class="flex-1">
              <input type="radio" id="messageType.channel" name="messageType" value="channel"
                v-model="selectedMessageType" class="hidden peer" />
              <label for="messageType.channel" class="space-radio-option group cursor-pointer relative block w-full">
                <div class="radio-content p-4 rounded-lg border-2 transition-all duration-300 bg-space-bg-light/20"
                  :class="[
                    selectedMessageType === 'channel'
                      ? 'border-space-primary bg-space-primary/20'
                      : 'border-space-primary/30 hover:border-space-primary/50'
                  ]">
                  <!-- Icône et texte -->
                  <div class="flex items-center justify-center space-x-3">
                    <div class="radio-icon p-2 rounded-full border transition-all duration-300" :class="[
                      selectedMessageType === 'channel'
                        ? 'bg-space-primary/40 border-space-primary/30'
                        : 'bg-space-primary/20 border-space-primary/30 group-hover:bg-space-primary/30'
                    ]">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-space-primary-light"
                        viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                          clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div class="text-center">
                      <p class="text-space-text font-heading text-lg">Salon</p>
                      <p class="text-space-text-muted text-sm">Message public dans un salon</p>
                    </div>
                  </div>

                  <!-- Indicateur de sélection -->
                  <div class="absolute top-2 right-2 transition-opacity duration-300"
                    :class="selectedMessageType === 'channel' ? 'opacity-100' : 'opacity-0'">
                    <div
                      class="w-4 h-4 rounded-full bg-space-primary border-2 border-space-primary-light animate-pulse-slow">
                      <div class="w-full h-full rounded-full bg-space-primary-light animate-ping"></div>
                    </div>
                  </div>

                  <!-- Effet de lueur -->
                  <div class="absolute inset-0 rounded-lg transition-opacity duration-300 pointer-events-none"
                    :class="selectedMessageType === 'channel' ? 'opacity-100' : 'opacity-0'">
                    <div class="absolute inset-0 rounded-lg bg-space-primary/10 animate-pulse-slow"></div>
                  </div>
                </div>
              </label>
            </div>

            <!-- Option Privé -->
            <div class="flex-1">
              <input type="radio" id="messageType.private" name="messageType" value="private"
                v-model="selectedMessageType" class="hidden peer" />
              <label for="messageType.private" class="space-radio-option group cursor-pointer relative block w-full">
                <div class="radio-content p-4 rounded-lg border-2 transition-all duration-300 bg-space-bg-light/20"
                  :class="[
                    selectedMessageType === 'private'
                      ? 'border-space-primary bg-space-primary/20'
                      : 'border-space-primary/30 hover:border-space-primary/50'
                  ]">
                  <!-- Icône et texte -->
                  <div class="flex items-center justify-center space-x-3">
                    <div class="radio-icon p-2 rounded-full border transition-all duration-300" :class="[
                      selectedMessageType === 'private'
                        ? 'bg-space-primary/40 border-space-primary/30'
                        : 'bg-space-primary/20 border-space-primary/30 group-hover:bg-space-primary/30'
                    ]">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-space-primary-light"
                        viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                          clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div class="text-center">
                      <p class="text-space-text font-heading text-lg">Privé</p>
                      <p class="text-space-text-muted text-sm">Message privé direct</p>
                    </div>
                  </div>

                  <!-- Indicateur de sélection -->
                  <div class="absolute top-2 right-2 transition-opacity duration-300"
                    :class="selectedMessageType === 'private' ? 'opacity-100' : 'opacity-0'">
                    <div
                      class="w-4 h-4 rounded-full bg-space-primary border-2 border-space-primary-light animate-pulse-slow">
                      <div class="w-full h-full rounded-full bg-space-primary-light animate-ping"></div>
                    </div>
                  </div>

                  <!-- Effet de lueur -->
                  <div class="absolute inset-0 rounded-lg transition-opacity duration-300 pointer-events-none"
                    :class="selectedMessageType === 'private' ? 'opacity-100' : 'opacity-0'">
                    <div class="absolute inset-0 rounded-lg bg-space-primary/10 animate-pulse-slow"></div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </Card>
      <Card variant="dark" :stars="true" class="mb-6" v-if="selectedMessageType === 'channel'">
        <div class="space-y-4">
          <Title size="lg" class="text-space-primary-light">
            Dans quel salon ?
          </Title>

          <select name="channel" id="channel" class="w-full" v-model="selectedChannel" required>
            <option value="null">Choisir un salon</option>
            <option v-for="channel in channels" :value="channel.id">{{ channel.name }}</option>
          </select>

          <p v-if="errors['channel']" class="text-red-400">{{ errors['channel'] }}</p>
        </div>
      </Card>
      <Card variant="dark" :stars="true" class="mb-6 relative overflow-visible"
        v-if="selectedMessageType === 'private'">
        <div class="space-y-4">
          <Title size="lg" class="text-space-primary-light">
            À qui ?
          </Title>

          <div class="relative" id="list-users">
            <!-- Container principal avec apparence de select -->
            <div
              class="w-full min-h-[42px] px-3 py-2 border-2 border-space-primary/30 rounded-lg bg-space-bg-light/20 cursor-pointer transition-all duration-300"
              :class="[
                isDropdownOpen ? 'border-space-primary' : 'hover:border-space-primary/50'
              ]" @click="toggleDropdown">
              <!-- Tags sélectionnés -->
              <div class="flex flex-wrap gap-2 items-center">
                <div v-for="memberId in selectedMembers" :key="memberId"
                  class="inline-flex items-center gap-1 px-2 py-1 bg-space-primary/20 border border-space-primary/30 rounded-full text-sm text-space-text">
                  <span>{{ getUserName(memberId) }}</span>
                  <button type="button" @click.stop="removeMember(memberId)"
                    class="ml-1 hover:text-red-400 transition-colors">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>

                <!-- Placeholder quand aucun membre sélectionné -->
                <span v-if="selectedMembers.length === 0" class="text-space-text-muted">
                  Choisir un ou plusieurs membres
                </span>
              </div>

              <!-- Icône dropdown -->
              <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg class="w-4 h-4 text-space-text-muted transition-transform duration-300"
                  :class="[isDropdownOpen ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <!-- Dropdown avec z-index élevé -->
            <div v-if="isDropdownOpen"
              class="absolute z-50 w-full mt-1 bg-space-bg-light backdrop-blur-sm border border-space-primary/30 rounded-lg shadow-xl max-h-60 overflow-y-auto">

              <!-- Barre de recherche optionnelle -->
              <div class="sticky top-0 p-2 bg-space-bg-light/95 backdrop-blur-sm border-b border-space-primary/20">
                <input type="text" v-model="searchTerm" placeholder="Rechercher un membre..."
                  class="w-full px-3 py-2 bg-space-bg-light/50 border border-space-primary/30 rounded-lg text-space-text placeholder-space-text-muted focus:outline-none focus:border-space-primary" />
              </div>

              <!-- Liste des utilisateurs -->
              <div v-for="user in filteredUsers" :key="user.id"
                class="px-3 py-2 hover:bg-space-primary/20 cursor-pointer transition-colors flex items-center justify-between"
                @click="toggleMember(user.id)">
                <div class="flex items-center space-x-3">
                  <!-- Avatar ou icône utilisateur -->
                  <div class="w-8 h-8 rounded-full bg-space-primary/20 flex items-center justify-center">
                    <svg class="w-4 h-4 text-space-primary-light" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-space-text">{{ user.name }}</span>
                </div>

                <!-- Indicateur de sélection -->
                <div v-if="selectedMembers.includes(user.id)"
                  class="w-5 h-5 rounded-full bg-space-primary border-2 border-space-primary-light flex items-center justify-center">
                  <svg class="w-3 h-3 text-space-primary-light" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
              </div>

              <!-- Message si aucun utilisateur trouvé -->
              <div v-if="filteredUsers.length === 0" class="px-3 py-4 text-center text-space-text-muted">
                Aucun membre trouvé
              </div>
            </div>
          </div>
          <p v-if="errors['members']" class="text-red-400">{{ errors['members'] }}</p>
        </div>
      </Card>
      <Card 
        variant="dark" 
        :stars="true" 
        class="mb-6"
        :class="isDropdownOpen ? '-z-10' : 'z-0'"
      >
        <div class="space-y-4">
          <Title size="lg" class="text-space-primary-light">
            Ton message ?
          </Title>
          <label for="discordContent" class="sr-only" id="area-title">Message à envoyer</label>
          <textarea 
            aria-labelledby="area-title" 
            aria-label="Ton message ?" 
            name="discordContent"
            id="discordContent"
            class="flex items-center w-full bg-space-primary/20 border border-space-primary/30 rounded-full text-sm text-space-text"
            required
            v-model="message"
          >
          </textarea>
          <p v-if="errors['message']" class="text-red-400">{{ errors['message'] }}</p>
        </div>
      </Card>
      <div class="w-full flex items-center justify-center">
        <Button>
          Envoyer le message
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, onUnmounted, watch } from 'vue';
import type { Channel, DiscordMember } from '../../types/Discord';
import discordService from '../../services/discordService';

// État pour le type de message sélectionné
const selectedMessageType = ref<string>('channel');
const selectedChannel = ref<string | null>(null);
const selectedMembers = ref<string[]>([]);
const message = ref<string>('');

const channels = ref<Channel[]>([])
const users = ref<DiscordMember[]>([])

const isDropdownOpen = ref(false)
const searchTerm = ref('')

const errors = ref<{ [input: string]: string }>({})

// Computed pour filtrer les utilisateurs
const filteredUsers = computed(() => {
  if (!searchTerm.value) return users.value
  return users.value.filter(user =>
    user.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

function toggleMember(id: string) {
  if (selectedMembers.value.includes(id)) {
    removeMember(id)
  } else {
    selectedMembers.value.push(id)
  }
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
  if (isDropdownOpen.value) {
    searchTerm.value = ''
    // Fermer le dropdown si on clique ailleurs
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
}

function handleClickOutside(event: Event) {
  const target = event.target as HTMLElement
  if (!target.closest('#list-users')) {
    isDropdownOpen.value = false
    document.removeEventListener('click', handleClickOutside)
  }
}

function getUserName(id: string) {
  return users.value.find(u => u.id === id)?.name
}

function removeMember(id: string) {
  selectedMembers.value = selectedMembers.value.filter(u => u !== id)
}

async function handleSubmit() {
  if (message.value.trim().length === 0) {
    errors.value['message'] = "Le message ne peut pas être vide"
  }

  switch (selectedMessageType.value) {
    case "channel":
      if (selectedChannel.value === null || !channels.value.find(c => c.id === selectedChannel.value)) {
        errors.value['channel'] = "Le salon choisi est invalide"
      } else {
        const isSent = await discordService.sendChannelMessage(selectedChannel.value, message.value)
        if (isSent) {
          alert("Message envoyé !")
          resetForm()
        } else {
          alert("Erreur lors de l'envoi")
        }
      }
      break;
    case "private":
      if (selectedMembers.value.length === 0 || users.value.filter(u => selectedMembers.value.includes(u.id)).length === 0) {
        errors.value['members'] = "Les membres choisis sont invalides"
      } else {
         const isSent = await discordService.sendPrivateMessage(selectedMembers.value, message.value)
        if (isSent) {
          alert("Message envoyé !")
          resetForm()
        } else {
          alert("Erreur lors de l'envoi")
        }
      }
      break;
    default:
      break;
  }
}

function resetForm() {
  selectedChannel.value = null
  selectedMembers.value = []
  message.value = ''
}

watch(selectedChannel, () => {
  delete errors.value['channel']
})

watch(selectedMembers, () => {
  delete errors.value['members']
})

watch(message, () => {
  delete errors.value['message']
})

watch(selectedMessageType, (newType) => {
  switch(newType) {
    case "channel":
      selectedMembers.value = []
      break;
    case "private":
      selectedChannel.value = null
      break;
    default:
      break;
  }
})

onMounted(async () => {
  channels.value = await discordService.getChannels();
  users.value = await discordService.getUsers()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Styles personnalisés pour les options radio */
.space-radio-option {
  position: relative;
  overflow: hidden;
}

.space-radio-option::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent);
  transition: left 0.5s ease;
  z-index: 1;
}

.space-radio-option:hover::before {
  left: 100%;
}

/* Animation pour les indicateurs de sélection */
.radio-content {
  position: relative;
  z-index: 2;
}

/* Animation de pulsation lente */
.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-slow {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

/* Effet de focus pour l'accessibilité */
.space-radio-option input:focus-visible+label .radio-content {
  outline: 2px solid rgba(var(--space-primary-rgb), 0.5);
  outline-offset: 2px;
}

/* Responsive design */
@media (max-width: 640px) {
  .radio-content {
    padding: 1rem;
  }

  .radio-icon {
    padding: 0.5rem;
  }
}
</style>