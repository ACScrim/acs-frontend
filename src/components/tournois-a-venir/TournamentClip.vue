<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import tournamentService from '../../services/tournamentService';
import type { Clip, Tournament } from '../../types';
import SpaceInput from '../ui/atoms/Input.vue';
import { useUserStore } from '../../stores/userStore';
import Toast from '../../shared/Toast.vue';

const userStore = useUserStore();
const user = computed(() => userStore.user);

const props = defineProps({
  tournament: {
    type: Object as () => Tournament,
    required: true,
  }
});

const emit = defineEmits(["refetch"]);

const showAddClipModal = ref(false)
const showDeleteClipModal = ref(false)
const clipToDelete = ref<Clip | null>(null)
const clipUrl = ref<string>("")
const isLoading = ref(false)
const errMessage = ref("")

watch(clipToDelete, (newVal) => {
  showDeleteClipModal.value = newVal !== null
});

const error = ref<string | null>(null);
const success = ref<string | null>(null);

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
  }, 5000);
};

const closeAddClipPrompt = () => {
  showAddClipModal.value = false
}

const closeDeleteClipModal = () => {
  showDeleteClipModal.value = false
}

const addClip = async () => {
  try {
    errMessage.value = ""
    isLoading.value = true;
    if (!props.tournament._id) throw new Error("Un problème est survenu lors de la récupération du tournoi");
    if (!clipUrl.value.length) throw new Error("L'url du clip est manquante !")
    await tournamentService.addClipToTournament(props.tournament._id, { clipUrl: clipUrl.value });
    
    showAddClipModal.value = false
    clipUrl.value = ""
    showMessage("success", "Votre clip a été ajouté !");
    emit('refetch');
  } catch (err) {
    const message = (err instanceof Error) ? err.message : "Erreur lors de l'envoi du clip"
    errMessage.value = message;
    showMessage("error", message);
  } finally {
    isLoading.value = false;
  }
}

const deleteclip = async () => {
  try {
    errMessage.value = ""
    isLoading.value = true;
    if (!props.tournament._id) throw new Error("Un problème est survenu lors de la récupération du tournoi");
    if (!clipToDelete.value?._id) throw new Error("Un problème est survenu lors de la récupération du clip à supprimer");
    await tournamentService.deleteClipFromTournament(props.tournament._id, clipToDelete.value._id);
    clipToDelete.value = null;
    showMessage("success", "Le clip a été supprimé !");
    emit("refetch")
  } catch (err) {
    const message = (err instanceof Error) ? err.message : "Erreur lors de la suppression du clip"
    errMessage.value = message;
    showMessage("error", message);
  } finally {
    isLoading.value = false;
  }
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffTime / (1000 * 60));

  if (diffMinutes < 1) return "À l'instant";
  if (diffMinutes < 60) return `Il y a ${diffMinutes}min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<template>
  <SpaceCard>
    <template #header>
      <div class="flex flex-row justify-between items-center">
        <SpaceTitle size="xl" class="uppercase">Clips du tournoi</SpaceTitle>
        <SpaceButton @click="showAddClipModal = true">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clip-rule="evenodd" />
          </svg>
          Ajouter un clip
        </SpaceButton>
      </div>
    </template>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 gap-y-8 pt-8">
      <SpaceCard v-for="(clip, idx) in tournament.clips" class="flex-1/2">
        <iframe class="w-full h-80" :src="clip.url" :title="`Clip ${idx+1} ajouté par ${clip.addedBy.username} pour le tournoi ${tournament.name}`"
          frameborder="0" allow="clipboard-write; encrypted-media; picture-in-picture"
          allowfullscreen></iframe>
        <div class="flex flex-row justify-between items-center text-space-text-muted">
          <p>Par <b>{{ clip.addedBy.username }}</b></p>
          <button @click="clipToDelete = clip" v-if="user?.role === 'admin' || user?.role === 'superadmin'" class="text-red-400 hover:underline">Supprimer le clip</button>
          <p>{{ formatDate(clip.addedAt) }}</p>
        </div>
      </SpaceCard>
    </div>
  </SpaceCard>

  <Teleport to="body" :disabled="!showAddClipModal">
    <SpaceModal
      v-model="showAddClipModal"
      title="AJOUTER UN CLIP"
      className="max-w-3xl!"
    >
      <div class="space-y-3 sm:space-y-4">
        <p class="text-space-text text-sm sm:text-base">
          Ici vous pouvez ajouter un clip pour
          <span class="text-space-primary-light font-bold break-words">{{
            tournament.name
          }}</span>
        </p>
        <p class="text-space-text-muted text-sm sm:text-base">
          Vous devez insérer un lien <b class="text-space-primary-light">youtube ou twitch</b> valide dans <b class="text-space-primary-light">l'un des formats suivants</b> :
        </p>
        <ul class="list-disc list-inside text-space-text-muted">
          <li>https://youtube.com/embed/dQw4w9WgXcQ</li>
          <li>https://youtube.com/watch?v=dQw4w9WgXcQ</li>
          <li>https://youtu.be/dQw4w9WgXcQ</li>
          <li>https://www.twitch.tv/streamer/clip/idduclip</li>
        </ul>

        <div class="border-l-4 border-red-400 p-4 rounded-md flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" viewBox="0 0 256 256" fill="currentColor">
            <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
              <circle cx="49.129000000000005" cy="11.249" r="11.249" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
              <path d="M 29.747 37.606 c -0.49 2.065 0.529 4.174 2.432 5.116 c 3.044 1.508 4.953 4.88 4.366 8.492 l -4.963 30.516 c -0.603 3.708 1.914 7.203 5.622 7.806 h 0 c 5.489 0.893 11.099 0.494 16.387 -1.15 c 1.521 -0.473 2.671 -1.733 3.039 -3.283 l 0.843 -3.551 c 0.49 -2.065 -0.529 -4.174 -2.432 -5.116 c -3.044 -1.508 -4.953 -4.88 -4.366 -8.492 l 4.963 -30.516 c 0.603 -3.708 -1.914 -7.203 -5.622 -7.806 l 0 0 c -5.489 -0.893 -11.099 -0.494 -16.387 1.15 c -1.521 0.473 -2.671 1.733 -3.039 3.283 L 29.747 37.606 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
            </g>
          </svg>
          <div>
            <p class="text-red-400 font-semibold text-sm sm:text-base mb-1">
              Informations importantes
            </p>
            <ul class="text-red-400 text-sm sm:text-base list-disc pl-5 space-y-1">
              <li>
                Votre clip sera <span class="font-bold">refusé</span> si le format n'est pas respecté.
              </li>
              <li>
                Les administrateurs se réservent le droit de <span class="font-bold">supprimer</span> tout clip ne correspondant pas au tournoi.
              </li>
            </ul>
          </div>
        </div>
        
        
        <form action="" @submit.prevent="addClip" class="space-y-4">
          <SpaceInput
            placeholder="https://youtube.com/watch?v=dQw4w9WgXcQ"
            :clearable="true"
            v-model="clipUrl"
            :errorMessage="errMessage"
          />
          <SpaceButton
            type="submit"
            :loading="isLoading"
            icon
          >
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
            Ajouter le clip
          </SpaceButton>
        </form>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <SpaceButton @click="closeAddClipPrompt" variant="ghost" size="sm" className="text-sm">
            Annuler
          </SpaceButton>
        </div>
      </template>
    </SpaceModal>
  </Teleport>

  <Teleport to="body" :disabled="!showDeleteClipModal">
    <SpaceModal v-model="showDeleteClipModal" title="SUPPRIMER UN CLIP">
      <div class="space-y-4">
        <p class="text-space-text text-base">
          Êtes-vous sûr de vouloir supprimer ce clip&nbsp;? Cette action est <span class="text-red-500 font-bold">irréversible</span>.
        </p>
        <div class="flex justify-end gap-2">
          <SpaceButton @click="closeDeleteClipModal" variant="ghost" size="sm">
            Annuler
          </SpaceButton>
          <SpaceButton @click="deleteclip" variant="danger" size="sm">
            Supprimer
          </SpaceButton>
        </div>
      </div>
    </SpaceModal>
  </Teleport>

  <!-- Notifications -->
  <Toast v-if="error" type="error" :message="error" />
  <Toast v-if="success" type="success" :message="success" />
</template>