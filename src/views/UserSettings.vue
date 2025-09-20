<template>
  <div class="container mx-auto p-4 pt-20 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <!-- En-tête de la page -->
      <Header
        title="PARAMÈTRES UTILISATEUR"
        mission="SETTINGS-CONFIG-25"
        :decorated="true"
        className="mb-8"
      />

      <!-- États d'affichage -->
      <div v-if="loading" class="flex justify-center py-12">
        <Loader text="Chargement des paramètres utilisateur..." />
      </div>

      <Terminal
        v-else-if="error"
        title="SYSTÈME · PARAMÈTRES"
        command="load_user_settings"
        :message="error"
        className="my-8"
      />

      <div v-else-if="user" class="space-y-8">
        <!-- Section: Profil Twitch -->
        <Card variant="primary" :stars="true" :decorated="true">
          <template #header>
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-3 text-color-primary-light"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"
                />
              </svg>
              <Title size="xl">Profil Twitch</Title>
            </div>
          </template>

          <div class="space-y-4">
            <!-- Input nom d'utilisateur Twitch -->
            <div>
              <label
                class="block text-sm font-nasa text-color-primary-light mb-2"
              >
                Nom d'utilisateur Twitch
              </label>
              <div class="flex gap-3">
                <div class="flex-1 relative">
                  <Input
                    v-model="formData.twitchUsername"
                    placeholder="votre_nom_twitch"
                    :disabled="isSaving"
                  >
                    <template #prepend>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-color-primary-light"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"
                        />
                      </svg>
                    </template>
                  </Input>
                </div>
              </div>
            </div>

            <!-- Aperçu du profil Twitch -->
            <Card v-if="formData.twitchUsername" variant="dark" className="p-3">
              <div class="flex items-center justify-between">
                <div class="text-color-text font-mono text-sm">
                  twitch.tv/{{ formData.twitchUsername }}
                </div>
                <a
                  :href="`https://twitch.tv/${formData.twitchUsername}`"
                  target="_blank"
                  class="text-color-primary-light hover:text-color-primary transition-colors"
                  title="Ouvrir sur Twitch"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </Card>
          </div>
        </Card>

        <!-- Section: Préférences notifications -->
        <Card variant="secondary" :stars="true" :decorated="true">
          <template #header>
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-3 text-color-secondary-light"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-5 5v-5zM11 17H6l5 5v-5zM7 7h10l-5-5L7 7z"
                />
              </svg>
              <Title size="xl">Préférences de notifications</Title>
            </div>
          </template>

          <!-- Message d'information -->
          <Card variant="dark" className="mb-6">
            <div class="flex items-start space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-color-secondary-light mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <div class="font-nasa text-color-secondary-light mb-2">
                  À propos des notifications push :
                </div>
                <ul class="space-y-1 text-color-text-muted">
                  <li>
                    • Activez les types de notifications que vous souhaitez
                    recevoir
                  </li>
                  <li>
                    • Les notifications s'affichent même quand l'application est
                    fermée
                  </li>
                  <li>• Vos préférences sont sauvegardées automatiquement</li>
                  <li>
                    • Assurez-vous d'avoir autorisé les notifications dans votre
                    navigateur
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <!-- Liste des préférences de notifications -->
          <div class="space-y-4" v-if="notificationActivated">
            <!-- Notifications de tournois -->
            <Card
              variant="dark"
              className="transform transition-all hover:scale-[1.01] duration-200"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <!-- Icône -->
                  <div
                    class="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border-2 border-yellow-500/30"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-yellow-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>

                  <!-- Détails -->
                  <div>
                    <h3 class="text-color-text font-nasa text-sm mb-1">
                      🏆 Tournois
                    </h3>
                    <p class="text-color-text-muted text-xs">
                      Nouveaux tournois, ouvertures d'inscriptions, résultats
                    </p>
                  </div>
                </div>

                <!-- Toggle avec indicateur de statut -->
                <div class="flex items-center space-x-2">
                  <!-- Indicateur de statut -->
                  <div
                    v-if="notificationStatus.tournaments"
                    class="flex items-center text-xs"
                  >
                    <div
                      v-if="notificationStatus.tournaments === 'pending'"
                      class="flex items-center text-color-warning"
                    >
                      <svg
                        class="animate-pulse h-3 w-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 8 8"
                      >
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      <span class="font-mono">Pending...</span>
                    </div>
                    <div
                      v-else-if="notificationStatus.tournaments === 'saving'"
                      class="flex items-center text-color-warning"
                    >
                      <svg
                        class="animate-spin h-3 w-3 mr-1"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                          fill="none"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span class="font-mono">Saving...</span>
                    </div>
                    <div
                      v-else-if="notificationStatus.tournaments === 'saved'"
                      class="flex items-center text-color-success"
                    >
                      <svg
                        class="h-3 w-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span class="font-mono">Saved</span>
                    </div>
                    <div
                      v-else-if="notificationStatus.tournaments === 'error'"
                      class="flex items-center text-color-error"
                    >
                      <svg
                        class="h-3 w-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span class="font-mono">Error</span>
                    </div>
                  </div>

                  <!-- Toggle -->
                  <SpaceToggle
                    :model-value="notificationPreferences.tournaments"
                    @update:model-value="
                      updateNotificationPreference('tournaments', $event)
                    "
                    size="sm"
                    className="bg-yellow-500/20"
                    :disabled="notificationStatus.tournaments === 'saving'"
                  />
                </div>
              </div>
            </Card>

            <!-- Notifications de badges -->
            <Card
              variant="dark"
              className="transform transition-all hover:scale-[1.01] duration-200"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <!-- Icône -->
                  <div
                    class="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border-2 border-purple-500/30"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>

                  <!-- Détails -->
                  <div>
                    <h3 class="text-color-text font-nasa text-sm mb-1">
                      🏅 Badges
                    </h3>
                    <p class="text-color-text-muted text-xs">
                      Nouveaux badges obtenus, succès débloqués
                    </p>
                  </div>
                </div>

                <!-- Toggle avec indicateur -->
                <div class="flex items-center space-x-2">
                  <div
                    v-if="notificationStatus.badges"
                    class="flex items-center text-xs"
                  >
                    <!-- Indicateur de statut -->
                    <div
                      v-if="notificationStatus.tournaments"
                      class="flex items-center text-xs"
                    >
                      <div
                        v-if="notificationStatus.tournaments === 'pending'"
                        class="flex items-center text-color-warning"
                      >
                        <svg
                          class="animate-pulse h-3 w-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 8 8"
                        >
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                        <span class="font-mono">Pending...</span>
                      </div>
                      <div
                        v-else-if="notificationStatus.tournaments === 'saving'"
                        class="flex items-center text-color-warning"
                      >
                        <svg
                          class="animate-spin h-3 w-3 mr-1"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                            fill="none"
                          ></circle>
                          <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span class="font-mono">Saving...</span>
                      </div>
                      <div
                        v-else-if="notificationStatus.tournaments === 'saved'"
                        class="flex items-center text-color-success"
                      >
                        <svg
                          class="h-3 w-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span class="font-mono">Saved</span>
                      </div>
                      <div
                        v-else-if="notificationStatus.tournaments === 'error'"
                        class="flex items-center text-color-error"
                      >
                        <svg
                          class="h-3 w-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span class="font-mono">Error</span>
                      </div>
                    </div>
                  </div>

                  <SpaceToggle
                    :model-value="notificationPreferences.badges"
                    @update:model-value="
                      updateNotificationPreference('badges', $event)
                    "
                    size="sm"
                    className="bg-purple-500/20"
                    :disabled="notificationStatus.badges === 'saving'"
                  />
                </div>
              </div>
            </Card>

            <!-- Notifications de rappels -->
            <Card
              variant="dark"
              className="transform transition-all hover:scale-[1.01] duration-200"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <!-- Icône -->
                  <div
                    class="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border-2 border-blue-500/30"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>

                  <!-- Détails -->
                  <div>
                    <h3 class="text-color-text font-nasa text-sm mb-1">
                      ⏰ Rappels
                    </h3>
                    <p class="text-color-text-muted text-xs">
                      Rappels de check-in, début de tournois, échéances
                    </p>
                  </div>
                </div>

                <!-- Toggle avec indicateur -->
                <div class="flex items-center space-x-2">
                  <div
                    v-if="notificationStatus.reminders"
                    class="flex items-center text-xs"
                  >
                    <!-- Indicateur de statut -->
                    <div
                      v-if="notificationStatus.tournaments"
                      class="flex items-center text-xs"
                    >
                      <div
                        v-if="notificationStatus.tournaments === 'pending'"
                        class="flex items-center text-color-warning"
                      >
                        <svg
                          class="animate-pulse h-3 w-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 8 8"
                        >
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                        <span class="font-mono">Pending...</span>
                      </div>
                      <div
                        v-else-if="notificationStatus.tournaments === 'saving'"
                        class="flex items-center text-color-warning"
                      >
                        <svg
                          class="animate-spin h-3 w-3 mr-1"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                            fill="none"
                          ></circle>
                          <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span class="font-mono">Saving...</span>
                      </div>
                      <div
                        v-else-if="notificationStatus.tournaments === 'saved'"
                        class="flex items-center text-color-success"
                      >
                        <svg
                          class="h-3 w-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span class="font-mono">Saved</span>
                      </div>
                      <div
                        v-else-if="notificationStatus.tournaments === 'error'"
                        class="flex items-center text-color-error"
                      >
                        <svg
                          class="h-3 w-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span class="font-mono">Error</span>
                      </div>
                    </div>
                  </div>

                  <SpaceToggle
                    :model-value="notificationPreferences.reminders"
                    @update:model-value="
                      updateNotificationPreference('reminders', $event)
                    "
                    size="sm"
                    className="bg-blue-500/20"
                    :disabled="notificationStatus.reminders === 'saving'"
                  />
                </div>
              </div>
            </Card>

            <!-- Notifications système -->
            <Card
              variant="dark"
              className="transform transition-all hover:scale-[1.01] duration-200"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <!-- Icône -->
                  <div
                    class="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border-2 border-green-500/30"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>

                  <!-- Détails -->
                  <div>
                    <h3 class="text-color-text font-nasa text-sm mb-1">
                      🔧 Système
                    </h3>
                    <p class="text-color-text-muted text-xs">
                      Mises à jour, maintenance, annonces importantes
                    </p>
                  </div>
                </div>

                <!-- Toggle avec indicateur -->
                <div class="flex items-center space-x-2">
                  <div
                    v-if="notificationStatus.system"
                    class="flex items-center text-xs"
                  >
                    <!-- Indicateur de statut -->
                    <div
                      v-if="notificationStatus.tournaments"
                      class="flex items-center text-xs"
                    >
                      <div
                        v-if="notificationStatus.tournaments === 'pending'"
                        class="flex items-center text-color-warning"
                      >
                        <svg
                          class="animate-pulse h-3 w-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 8 8"
                        >
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                        <span class="font-mono">Pending...</span>
                      </div>
                      <div
                        v-else-if="notificationStatus.tournaments === 'saving'"
                        class="flex items-center text-color-warning"
                      >
                        <svg
                          class="animate-spin h-3 w-3 mr-1"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                            fill="none"
                          ></circle>
                          <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span class="font-mono">Saving...</span>
                      </div>
                      <div
                        v-else-if="notificationStatus.tournaments === 'saved'"
                        class="flex items-center text-color-success"
                      >
                        <svg
                          class="h-3 w-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span class="font-mono">Saved</span>
                      </div>
                      <div
                        v-else-if="notificationStatus.tournaments === 'error'"
                        class="flex items-center text-color-error"
                      >
                        <svg
                          class="h-3 w-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span class="font-mono">Error</span>
                      </div>
                    </div>
                  </div>

                  <SpaceToggle
                    :model-value="notificationPreferences.system"
                    @update:model-value="
                      updateNotificationPreference('system', $event)
                    "
                    size="sm"
                    className="bg-green-500/20"
                    :disabled="notificationStatus.system === 'saving'"
                  />
                </div>
              </div>
            </Card>
          </div>
          <div v-else>
            <div class="text-color-text-muted text-sm">
              Les notifications push sont désactivées. Veuillez activer les
              notifications dans les paramètres de votre navigateur.
            </div>
            <button
              @click="enableNotifications"
              class="mt-4 px-4 py-2 bg-color-primary hover:bg-color-primary-dark text-white rounded-md"
            >
              Activer les notifications
            </button>
          </div>

          <!-- Indicateur de statut global -->
          <div class="mt-6 pt-4 border-t border-space-border">
            <div class="flex items-center justify-between text-sm">
              <span class="text-color-text-muted">
                Statut des notifications:
              </span>
              <div class="flex items-center space-x-2">
                <div
                  v-if="hasPendingChanges"
                  class="flex items-center text-color-warning"
                >
                  <svg
                    class="animate-pulse h-4 w-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 8 8"
                  >
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  <span class="font-mono">Modifications en attente...</span>
                </div>
                <div
                  v-else-if="isAnySaving"
                  class="flex items-center text-color-warning"
                >
                  <svg class="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                      fill="none"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span class="font-mono">Sauvegarde...</span>
                </div>
                <div
                  v-else-if="allSaved"
                  class="flex items-center text-color-success"
                >
                  <svg
                    class="h-4 w-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="font-mono">Tout sauvegardé</span>
                </div>
                <div v-else class="text-color-text-muted font-mono">
                  {{
                    notificationActivated ? "Prêt" : "Notifications désactivées"
                  }}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <!-- Section: Rôles Discord par jeu -->
        <Card variant="secondary" :stars="true" :decorated="true">
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-3 text-color-secondary-light"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 001-1V1a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1z"
                  />
                </svg>
                <Title size="xl">Rôles Discord par jeu</Title>
              </div>

              <div v-if="filteredGames.length > 0">
                <Badge variant="secondary" size="md">
                  {{ filteredGames.length }} jeu{{
                    filteredGames.length > 1 ? "x" : ""
                  }}
                </Badge>
              </div>
            </div>
          </template>

          <!-- Message d'aide pour les rôles Discord -->
          <Card variant="dark" className="mb-6">
            <div class="flex items-start space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-color-secondary-light mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <div class="font-nasa text-color-secondary-light mb-2">
                  À propos des rôles Discord :
                </div>
                <ul class="space-y-1 text-color-text-muted">
                  <li>
                    • En activant un rôle pour un jeu, vous pourrez être
                    mentionné (@ping) par d'autres membres
                  </li>
                  <li>
                    • Cela permet aux autres joueurs de vous trouver facilement
                    pour former des équipes
                  </li>
                  <li>
                    • Les rôles seront automatiquement créés sur Discord par
                    notre bot
                  </li>
                  <li>
                    • Vous pouvez activer/désactiver les rôles à tout moment
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <!-- Liste des jeux filtrés -->
          <div v-if="filteredGames.length > 0" class="space-y-3">
            <Card
              v-for="game in filteredGames"
              :key="game._id"
              variant="dark"
              className="transform transition-all hover:scale-[1.01] duration-200"
            >
              <div class="flex items-center justify-between">
                <!-- Informations du jeu -->
                <div class="flex items-center space-x-4">
                  <!-- Image du jeu -->
                  <img
                    v-if="game.imageUrl"
                    :src="game.imageUrl"
                    :alt="game.name"
                    class="w-12 h-12 rounded-lg object-cover border-2 border-color-secondary/50"
                    @error="handleImageError"
                  />
                  <div
                    v-else
                    class="w-12 h-12 rounded-lg bg-color-bg-light flex items-center justify-center border-2 border-color-secondary/50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-color-secondary-light"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 001-1V1a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1z"
                      />
                    </svg>
                  </div>

                  <!-- Détails du jeu -->
                  <div>
                    <h3 class="text-color-text font-nasa text-sm mb-1">
                      {{ game.name }}
                    </h3>
                    <p class="text-color-text-muted text-xs">
                      Recevoir des mentions (@ping) pour {{ game.name }}
                    </p>
                    <p
                      class="text-color-secondary-light text-xs mt-1 font-mono"
                    >
                      Rôle Discord: @{{
                        game.name.replace(/\s+/g, "-").toLowerCase()
                      }}
                    </p>
                  </div>

                  <!-- Indicateur de statut -->
                  <div
                    v-if="gameRoleStatus[game._id || '']"
                    class="flex items-center text-xs"
                  >
                    <div
                      v-if="gameRoleStatus[game._id || ''] === 'syncing'"
                      class="flex items-center text-color-warning"
                    >
                      <svg
                        class="animate-spin h-3 w-3 mr-1"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                          fill="none"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span class="font-mono">Syncing...</span>
                    </div>
                    <div
                      v-else-if="gameRoleStatus[game._id || ''] === 'success'"
                      class="flex items-center text-color-success"
                    >
                      <svg
                        class="h-3 w-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span class="font-mono">Synced</span>
                    </div>
                    <div
                      v-else-if="gameRoleStatus[game._id || ''] === 'error'"
                      class="flex items-center text-color-error"
                    >
                      <svg
                        class="h-3 w-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span class="font-mono">Error</span>
                    </div>
                  </div>
                </div>

                <!-- Toggle switch pour activer/désactiver le rôle -->
                <SpaceToggle
                  :model-value="isGameRoleEnabled(game._id || '')"
                  @update:model-value="toggleGameRole(game._id || '', $event)"
                  size="sm"
                  className="bg-color-secondary/20"
                  :disabled="gameRoleStatus[game._id || ''] === 'syncing'"
                />
              </div>
            </Card>
          </div>

          <!-- État vide pour jeux filtrés -->
          <Terminal
            v-else
            title="BASE DE DONNÉES · JEUX PRINCIPAUX"
            command="query_main_games"
            :showCursor="true"
          >
            <div class="text-color-error">
              Aucun des jeux principaux n'est disponible dans la base de
              données.
            </div>
            <div class="text-color-text-muted mt-2">
              Les jeux supportés sont : League of Legends, Rocket League,
              Valorant, The Finals, Counter Strike et Overwatch.
            </div>
          </Terminal>
        </Card>

        <!-- Actions de sauvegarde -->
        <div class="text-center pt-4">
          <Button
            @click="saveSettings"
            :disabled="isSaving || !hasChanges"
            variant="primary"
            size="lg"
          >
            <template v-if="isSaving">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Enregistrement en cours...
            </template>
            <template v-else-if="!hasChanges">Aucune modification</template>
            <template v-else>Enregistrer les paramètres</template>
          </Button>
        </div>
      </div>
    </div>
    <!-- Toast de notification -->
    <Toast v-if="message" :type="messageType" :message="message" />

    <!-- Modal de confirmation pour modifications non sauvegardées -->
    <SpaceModal
      v-if="showUnsavedChangesDialog"
      v-model="showUnsavedChangesDialog"
      title="MODIFICATIONS NON SAUVEGARDÉES"
    >
      <div class="text-center mb-6 space-y-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-color-warning mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>

        <p class="text-color-text">
          Vous avez des modifications non sauvegardées. Voulez-vous vraiment
          quitter cette page ? Vos changements seront perdus.
        </p>
      </div>

      <template #footer>
        <div class="flex justify-center space-x-4">
          <Button @click="cancelLeave" variant="ghost"> Annuler </Button>
          <Button @click="confirmLeave" variant="warning">
            Quitter sans sauvegarder
          </Button>
        </div>
      </template>
    </SpaceModal>

    <!-- Modal de confirmation pour réinitialisation -->
    <SpaceModal
      v-if="showResetDialog"
      v-model="showResetDialog"
      title="RÉINITIALISER LES MODIFICATIONS"
    >
      <div class="text-center mb-6 space-y-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-color-secondary mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>

        <p class="text-color-text">
          Voulez-vous vraiment annuler toutes vos modifications ? Cette action
          ne peut pas être annulée.
        </p>
      </div>

      <template #footer>
        <div class="flex justify-center space-x-4">
          <Button @click="cancelReset" variant="ghost"> Annuler </Button>
          <Button @click="confirmReset" variant="primary">
            Réinitialiser
          </Button>
        </div>
      </template>
    </SpaceModal>
  </div>
</template>

<script setup lang="ts">
// ========================================
// SECTION: IMPORTS ET DÉPENDANCES
// ========================================
import { ref, computed, onMounted, onUnmounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useUserStore } from "../stores/userStore";
import profileService from "../services/profileService";
import gameService from "../services/gameService";
import type { Game } from "../types";
import type { GameRoles } from "../types/User";
import Toast from "@/shared/Toast.vue";
import { notificationService } from "../services/notificationService";

// ========================================
// SECTION: STORES ET DONNÉES RÉACTIVES
// ========================================
const userStore = useUserStore();

// États de l'interface utilisateur
const loading = ref(true);
const isSaving = ref(false);
const message = ref("");
const messageType = ref<"success" | "error">("success");
const error = ref<string | null>(null);
const games = ref<Game[]>([]);
const gameRoleStatus = ref<
  Record<string, "syncing" | "success" | "error" | null>
>({});

//  États pour les dialogs de confirmation
const showUnsavedChangesDialog = ref(false);
const showResetDialog = ref(false);
const pendingRouteNavigation = ref<(() => void) | null>(null);

// ✅ NOUVEAU : Liste des jeux autorisés
const allowedGames = [
  "League of Legends",
  "Rocket League",
  "Valorant",
  "The Finals",
  "Counter-Strike",
  "Overwatch",
];

// Utilisateur connecté (depuis le store)
const user = computed(() => userStore.user);

// Données du formulaire de paramètres
const formData = ref({
  twitchUsername: "",
  gameRoles: [] as GameRoles[],
});

// Copie des données originales pour détecter les modifications
const originalData = ref({
  twitchUsername: "",
  gameRoles: [] as GameRoles[],
});

// ========================================
// SECTION: COMPUTED PROPERTIES
// ========================================

/**
 * Détecte s'il y a des changements non sauvegardés
 * Compare les données actuelles avec les données originales
 */
const hasChanges = computed(() => {
  // Seulement comparer le nom Twitch, pas les gameRoles
  return formData.value.twitchUsername !== originalData.value.twitchUsername;
});

/**
 * ✅ NOUVEAU : Retourne uniquement les jeux autorisés
 */
const filteredGames = computed(() => {
  return games.value
    .filter((game) =>
      allowedGames.some(
        (allowedName) =>
          game.name.toLowerCase().includes(allowedName.toLowerCase()) ||
          allowedName.toLowerCase().includes(game.name.toLowerCase())
      )
    )
    .sort((a, b) => {
      // Trier par ordre de priorité dans allowedGames
      const indexA = allowedGames.findIndex(
        (name) =>
          a.name.toLowerCase().includes(name.toLowerCase()) ||
          name.toLowerCase().includes(a.name.toLowerCase())
      );
      const indexB = allowedGames.findIndex(
        (name) =>
          b.name.toLowerCase().includes(name.toLowerCase()) ||
          name.toLowerCase().includes(b.name.toLowerCase())
      );
      return indexA - indexB;
    });
});

// ========================================
// SECTION: MÉTHODES D'INITIALISATION
// ========================================

/**
 * Initialise les données du formulaire depuis le profil utilisateur
 * Récupère les données depuis le store utilisateur
 */
const initializeUserProfile = () => {
  try {
    if (user.value && user.value.profile) {
      // Utilisateur avec profil existant
      formData.value = {
        twitchUsername: user.value.profile.twitchUsername || "",
        gameRoles: user.value.profile.gameRoles || [],
      };
    } else {
      // Utilisateur sans profil - valeurs par défaut
      formData.value = {
        twitchUsername: "",
        gameRoles: [],
      };
    }

    // Sauvegarder une copie pour la comparaison
    originalData.value = JSON.parse(JSON.stringify(formData.value));
  } catch (error) {
    console.error("Erreur lors de l'initialisation du profil:", error);
    showMessage("Erreur lors de l'initialisation des paramètres", "error");
  }
};

/**
 * Charge la liste des jeux disponibles depuis l'API
 */
const loadGames = async () => {
  try {
    games.value = await gameService.getGames();
    console.log(
      `✅ ${games.value.length} jeux chargés, ${filteredGames.value.length} jeux filtrés`
    );
  } catch (error) {
    console.error("Erreur lors du chargement des jeux:", error);
    showMessage("Erreur lors du chargement des jeux", "error");
  }
};

// ========================================
// SECTION: MÉTHODES DE CONFIRMATION DIALOG
// ========================================

/**
 * ✅ NOUVEAU : Gestion de la confirmation pour quitter
 */
const confirmLeave = () => {
  showUnsavedChangesDialog.value = false;
  if (pendingRouteNavigation.value) {
    pendingRouteNavigation.value();
    pendingRouteNavigation.value = null;
  }
};

/**
 * ✅ NOUVEAU : Annulation de la navigation
 */
const cancelLeave = () => {
  showUnsavedChangesDialog.value = false;
  pendingRouteNavigation.value = null;
};

/**
 * ✅ NOUVEAU : Reset des modifications
 */
const resetChanges = () => {
  if (hasChanges.value) {
    showResetDialog.value = true;
  }
};

/**
 * ✅ NOUVEAU : Confirmation du reset
 */
const confirmReset = () => {
  showResetDialog.value = false;
  initializeUserProfile(); // Reset aux valeurs originales
  showMessage("Modifications annulées", "success");
};

/**
 * ✅ NOUVEAU : Annulation du reset
 */
const cancelReset = () => {
  showResetDialog.value = false;
};

// ========================================
// SECTION: MÉTHODES DE GESTION DES RÔLES
// ========================================

/**
 * Vérifie si un rôle de jeu est activé pour l'utilisateur
 * @param gameId - Identifiant unique du jeu
 * @returns true si le rôle est activé, false sinon
 */
const isGameRoleEnabled = (gameId: string): boolean => {
  const role = formData.value.gameRoles.find((r) => r.gameId === gameId);
  return role ? role.enabled : false;
};

/**
 * Active ou désactive un rôle de jeu pour l'utilisateur
 * @param gameId - Identifiant unique du jeu
 * @param enabled - État du rôle (activé/désactivé)
 */
const toggleGameRole = async (gameId: string, enabled: boolean) => {
  const existingIndex = formData.value.gameRoles.findIndex(
    (r) => r.gameId === gameId
  );

  if (existingIndex >= 0) {
    formData.value.gameRoles[existingIndex].enabled = enabled;
  } else {
    formData.value.gameRoles.push({ gameId, enabled });
  }

  // ✅ NOUVEAU : Synchronisation immédiate avec le backend
  if (user.value) {
    gameRoleStatus.value[gameId] = "syncing";

    try {
      // Appel immédiat au backend pour synchroniser ce rôle spécifique
      await profileService.updateUserProfile({
        userId: user.value._id,
        twitchUsername: formData.value.twitchUsername || null,
        gameRoles: formData.value.gameRoles,
      });

      // Mettre à jour les données originales pour éviter le "hasChanges"
      originalData.value = JSON.parse(JSON.stringify(formData.value));

      // Feedback de succès
      gameRoleStatus.value[gameId] = "success";

      // Recharger les données utilisateur pour être sûr
      await userStore.fetchUser();

      // Auto-clear le feedback après 2 secondes
      setTimeout(() => {
        gameRoleStatus.value[gameId] = null;
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de la synchronisation du rôle:", error);

      // Annuler le changement en cas d'erreur
      if (existingIndex >= 0) {
        formData.value.gameRoles[existingIndex].enabled = !enabled;
      } else {
        formData.value.gameRoles.pop();
      }

      // Feedback d'erreur
      gameRoleStatus.value[gameId] = "error";
      showMessage("Erreur lors de la synchronisation du rôle Discord", "error");

      // Auto-clear l'erreur après 3 secondes
      setTimeout(() => {
        gameRoleStatus.value[gameId] = null;
      }, 3000);
    }
  }
};

// ========================================
// SECTION: MÉTHODES DE SAUVEGARDE
// ========================================

/**
 * Sauvegarde les paramètres utilisateur via l'API
 * Met à jour le profil utilisateur avec les nouvelles données
 */
const saveSettings = async () => {
  // Vérifications préliminaires
  if (!hasChanges.value || isSaving.value || !user.value) return;

  isSaving.value = true;
  message.value = "";

  try {
    // Appel API pour mettre à jour le profil (principalement Twitch)
    await profileService.updateUserProfile({
      userId: user.value._id,
      twitchUsername: formData.value.twitchUsername || null,
      gameRoles: formData.value.gameRoles, // On garde au cas où
    });

    // Recharger les données utilisateur depuis le serveur
    await userStore.fetchUser();

    // Réinitialiser le formulaire avec les nouvelles données
    initializeUserProfile();

    // Message simple car les rôles Discord sont déjà synchronisés
    showMessage("Profil Twitch sauvegardé avec succès !", "success");
  } catch (error: any) {
    console.error("Erreur lors de la sauvegarde:", error);
    showMessage(
      error.response?.data?.message || "Erreur lors de la sauvegarde",
      "error"
    );
  } finally {
    isSaving.value = false;
  }
};

// ========================================
// SECTION: MÉTHODES UTILITAIRES
// ========================================

/**
 * Affiche un message de feedback à l'utilisateur via Toast
 * @param text - Texte du message à afficher
 * @param type - Type du message (success/error)
 */
const showMessage = (text: string, type: "success" | "error") => {
  message.value = text;
  messageType.value = type;
  // Auto-masquer le message après 4 secondes (durée du nouveau Toast spatial)
  setTimeout(() => {
    message.value = "";
  }, 4000);
};

/**
 * Gère les erreurs de chargement d'images
 * Masque l'image en cas d'erreur de chargement
 * @param e - Événement d'erreur
 */
const handleImageError = (e: Event) => {
  if (e.target instanceof HTMLImageElement) {
    e.target.style.display = "none";
  }
};

// ========================================
// SECTION: CYCLE DE VIE DU COMPOSANT
// ========================================

// Garde de route pour prévenir la perte de données
onBeforeRouteLeave((_, __, next) => {
  if (hasChanges.value) {
    pendingRouteNavigation.value = () => next();
    showUnsavedChangesDialog.value = true;
    next(false); // Bloquer la navigation pour l'instant
  } else {
    next();
  }
});

// Garde pour la fermeture de fenêtre
onMounted(() => {
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (hasChanges.value) {
      e.preventDefault();
      e.returnValue = "";
    }
  };

  // ✅ NOUVEAU : Raccourcis clavier
  const handleKeyDown = (e: KeyboardEvent) => {
    // Ctrl+S pour sauvegarder
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      if (hasChanges.value && !isSaving.value) {
        saveSettings();
      }
    }

    // Échap pour annuler les modifications
    if (e.key === "Escape" && hasChanges.value) {
      resetChanges();
    }
  };

  window.addEventListener("beforeunload", handleBeforeUnload);
  document.addEventListener("keydown", handleKeyDown);

  onUnmounted(() => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
    document.removeEventListener("keydown", handleKeyDown);
  });
});

/**
 * Initialisation du composant au montage
 * 1. Vérification de l'utilisateur connecté
 * 2. Initialisation du profil utilisateur
 * 3. Chargement des jeux disponibles
 */
onMounted(async () => {
  loading.value = true;
  error.value = null;

  try {
    // S'assurer que l'utilisateur est chargé
    if (!user.value) {
      await userStore.fetchUser();
    }

    // Vérifier que l'utilisateur est connecté
    if (!user.value) {
      error.value =
        "Utilisateur non connecté. Veuillez vous reconnecter pour accéder à vos paramètres.";
      return;
    }

    // Initialiser les données du formulaire et charger les jeux
    initializeUserProfile();
    await loadGames();
  } catch (err) {
    console.error("Erreur lors de l'initialisation:", err);
    error.value =
      "Impossible de charger vos paramètres. Vérifiez votre connexion et réessayez.";
  } finally {
    loading.value = false;
  }
});

// ========================================
// SECTION: GESTION DES NOTIFICATIONS
// ========================================

const notificationActivated = ref(false);

// Nouvelles propriétés réactives pour les notifications
const notificationPreferences = ref({
  tournaments: true,
  badges: true,
  reminders: true,
  system: true,
});

const notificationStatus = ref<
  Record<string, "pending" | "saving" | "saved" | "error" | null>
>({
  tournaments: null,
  badges: null,
  reminders: null,
  system: null,
});

// Timers pour le debounce
const notificationTimers = ref<Record<string, number | null>>({
  tournaments: null,
  badges: null,
  reminders: null,
  system: null,
});

// Computed pour les statuts globaux
const hasPendingChanges = computed(() =>
  Object.values(notificationStatus.value).some((status) => status === "pending")
);

const isAnySaving = computed(() =>
  Object.values(notificationStatus.value).some((status) => status === "saving")
);

const allSaved = computed(() =>
  Object.values(notificationStatus.value).some((status) => status === "saved")
);

// Fonction pour charger les préférences de notifications
const loadNotificationPreferences = async () => {
  if (!user.value) return;

  try {
    // Appel API pour récupérer les préférences
    const response = await profileService.getNotificationPreferences();
    const { preferences } = response;
    notificationPreferences.value = {
      tournaments: preferences.tournaments ?? true,
      badges: preferences.badges ?? true,
      reminders: preferences.reminders ?? true,
      system: preferences.system ?? true,
    };
  } catch (error) {
    console.error("Erreur lors du chargement des préférences:", error);
    // Garder les valeurs par défaut en cas d'erreur
  }
};

// Fonction pour mettre à jour une préférence avec debounce
const updateNotificationPreference = (type: string, enabled: boolean) => {
  // Mettre à jour immédiatement l'interface
  (notificationPreferences.value as any)[type] = enabled;

  // Annuler le timer précédent s'il existe
  if (notificationTimers.value[type]) {
    clearTimeout(notificationTimers.value[type]!);
  }

  // Marquer comme en attente
  notificationStatus.value[type] = "pending";

  // Programmer la sauvegarde après 1.5 secondes
  notificationTimers.value[type] = setTimeout(async () => {
    if (!user.value) return;

    // Marquer comme en cours de sauvegarde
    notificationStatus.value[type] = "saving";

    try {
      // Appel API pour sauvegarder la préférence
      await profileService.updateNotificationPreferences({
        userId: user.value._id,
        type: type,
        enabled: enabled,
      });

      // Marquer comme sauvegardé
      notificationStatus.value[type] = "saved";

      // Auto-clear après 2 secondes
      setTimeout(() => {
        notificationStatus.value[type] = null;
      }, 2000);
    } catch (error) {
      console.error(`Erreur lors de la sauvegarde de ${type}:`, error);

      // Revenir à l'état précédent en cas d'erreur
      (notificationPreferences.value as any)[type] = !enabled;

      // Marquer comme erreur
      notificationStatus.value[type] = "error";
      showMessage(
        `Erreur lors de la sauvegarde des préférences ${type}`,
        "error"
      );

      // Auto-clear après 3 secondes
      setTimeout(() => {
        notificationStatus.value[type] = null;
      }, 3000);
    }

    // Nettoyer le timer
    notificationTimers.value[type] = null;
  }, 1500); // 1.5 secondes de délai
};

const subscribeToPush = async () => {
  try {
    const subscription = await notificationService.subscribeToPush();
    if (subscription) {
      notificationActivated.value = true;
    } else {
      showMessage("Échec de l'abonnement", "error");
    }
  } catch (error) {
    showMessage(`Erreur abonnement: ${error}`, "error");
  }
};

const enableNotifications = () => {
  if (window.Notification && Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        subscribeToPush();
        showMessage("Notifications activées avec succès !", "success");
      } else {
        notificationActivated.value = false;
        showMessage(
          "Notifications refusées. Vous pouvez les activer plus tard.",
          "error"
        );
      }
    });
  } else {
    notificationActivated.value = true;
    showMessage("Notifications déjà activées.", "success");
  }
};

// Modifier la fonction onMounted pour charger les préférences
onMounted(async () => {
  loading.value = true;
  error.value = null;

  try {
    // S'assurer que l'utilisateur est chargé
    if (!user.value) {
      await userStore.fetchUser();
    }

    // Vérifier que l'utilisateur est connecté
    if (!user.value) {
      error.value =
        "Utilisateur non connecté. Veuillez vous reconnecter pour accéder à vos paramètres.";
      return;
    }

    notificationActivated.value =
      window.Notification && Notification.permission === "granted";

    // Initialiser les données du formulaire et charger les jeux et préférences
    initializeUserProfile();
    await Promise.all([loadGames(), loadNotificationPreferences()]);
  } catch (err) {
    console.error("Erreur lors de l'initialisation:", err);
    error.value =
      "Impossible de charger vos paramètres. Vérifiez votre connexion et réessayez.";
  } finally {
    loading.value = false;
  }
});

// Nettoyer les timers à la destruction du composant
onUnmounted(() => {
  Object.values(notificationTimers.value).forEach((timer) => {
    if (timer) clearTimeout(timer);
  });
});
</script>

<style scoped>
/* Animation pour synchronisation */
@keyframes pulse-sync {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.animate-pulse-sync {
  animation: pulse-sync 2s infinite;
}
</style>
