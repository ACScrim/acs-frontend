<template>
  <div class="container mx-auto p-3 sm:p-4 lg:p-6 pt-20 sm:pt-24 relative max-w-7xl">
    <div class="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
      <!-- Bouton retour -->
      <SpaceButton @click="goBackToTournaments" variant="secondary" size="sm"
        className="flex items-center justify-center sm:justify-start w-full sm:w-auto">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clip-rule="evenodd" />
        </svg>
        <span class="hidden xs:inline">Retour aux tournois</span>
        <span class="xs:hidden">Retour</span>
      </SpaceButton>

      <!-- Navigation mobile entre tournois -->
      <div v-if="hasNavigation" class="w-full sm:hidden">
        <SpaceCard variant="dark" className="px-3 py-2 border border-space-primary/30">
          <div class="flex items-center justify-between">
            <!-- Bouton précédent -->
            <SpaceButton v-if="previousTournament" @click="navigateToTournament(previousTournament._id!)"
              variant="outline" size="sm" className="p-2 hover:scale-105 transition-transform flex-shrink-0"
              :title="previousTournament.name">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd" />
              </svg>
            </SpaceButton>

            <!-- Espace vide si pas de tournoi précédent -->
            <div v-else class="w-8 flex-shrink-0"></div>

            <!-- Indicateur central avec design spatial -->
            <div class="flex flex-col items-center mx-2 sm:mx-4 min-w-0 flex-1">
              <div class="text-xs text-space-primary-light font-nasa mb-1 text-center">
                TOURNOI
              </div>
              <div class="flex items-center space-x-1 sm:space-x-2">
                <SpaceBadge variant="primary" size="md"
                  className="px-2 sm:px-3 py-1 font-mono font-bold text-base sm:text-lg">
                  {{ currentTournamentIndex + 1 }}
                </SpaceBadge>
                <span class="text-space-text-muted font-mono text-sm sm:text-base">/</span>
                <SpaceBadge variant="secondary" size="md"
                  className="px-2 sm:px-3 py-1 font-mono font-bold text-base sm:text-lg">
                  {{ allTournaments.length }}
                </SpaceBadge>
              </div>

              <!-- Barre de progression -->
              <div class="w-16 sm:w-20 h-1 bg-space-bg-light/30 rounded-full mt-2 overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-space-primary to-space-secondary rounded-full transition-all duration-500"
                  :style="`width: ${((currentTournamentIndex + 1) / allTournaments.length) * 100
                    }%`"></div>
              </div>
            </div>

            <!-- Bouton suivant -->
            <SpaceButton v-if="nextTournament" @click="navigateToTournament(nextTournament._id!)" variant="outline"
              size="sm" className="p-2 hover:scale-105 transition-transform flex-shrink-0" :title="nextTournament.name">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd" />
              </svg>
            </SpaceButton>

            <!-- Espace vide si pas de tournoi suivant -->
            <div v-else class="w-8 flex-shrink-0"></div>
          </div>
        </SpaceCard>
      </div>
    </div>
    <div v-if="hasNavigation" class="hidden sm:block">
      <!-- Flèche précédent (côté gauche) -->
      <div v-if="previousTournament" class="fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
        <SpaceButton @click="navigateToTournament(previousTournament._id!)" variant="primary" size="md"
          className="group flex items-center space-nav-button" :title="`Tournoi précédent: ${previousTournament.name}`">
          <svg xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-2 transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd" />
          </svg>
          <span class="hidden lg:block">Précédent</span>
        </SpaceButton>
      </div>

      <!-- Flèche suivant (côté droit) -->
      <div v-if="nextTournament" class="fixed right-4 top-1/2 transform -translate-y-1/2 z-40">
        <SpaceButton @click="navigateToTournament(nextTournament._id!)" variant="primary" size="md"
          className="group flex items-center space-nav-button" :title="`Tournoi suivant: ${nextTournament.name}`">
          <span class="hidden lg:block">Suivant</span>
          <svg xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd" />
          </svg>
        </SpaceButton>
      </div>

      <!-- Indicateur de position des tournois -->
      <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <SpaceCard variant="dark" className="px-4 py-2">
          <div class="text-center">
            <div class="text-xs text-space-primary-light font-nasa">
              TOURNOI
            </div>
            <div class="text-xl font-mono font-medium">
              {{ currentTournamentIndex + 1 }} / {{ allTournaments.length }}
            </div>
          </div>
        </SpaceCard>
      </div>
    </div>

    <!-- Loader durant le chargement -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <SpaceLoader text="Chargement des données du tournoi..." />
    </div>

    <!-- Message d'erreur si le tournoi n'existe pas -->
    <SpaceTerminal v-else-if="!tournament" command="get_tournament --id" title="CONSOLE SYSTÈME" :showCursor="true"
      className="my-8">
      <div class="text-space-error font-mono">
        Erreur 404: Ce tournoi n'existe pas ou a été supprimé.
      </div>
      <div class="text-space-text-muted mt-2">
        Vérifiez l'URL ou retournez à la liste des tournois disponibles.
      </div>
    </SpaceTerminal>

    <!-- Affichage du tournoi -->
    <div v-else class="tournament-details flex flex-col gap-4 sm:gap-6">
      <!-- En-tête avec les informations principales -->
      <SpaceCard variant="primary" :stars="true" :decorated="true" className="overflow-hidden">
        <!-- Image de bannière du jeu -->
        <div class="relative h-32 sm:h-40 md:h-56 lg:h-64 -mx-4 sm:-mx-6 -mt-4 sm:-mt-6 mb-4 sm:mb-6 overflow-hidden">
          <!-- Image du jeu si elle existe -->
          <template v-if="tournament.game.imageUrl && !imageError">
            <img :src="tournament.game.imageUrl" :alt="tournament.game.name" class="w-full h-full object-cover"
              @error="handleImageError" />
          </template>

          <!-- Placeholder si pas d'image -->
          <div v-else class="w-full h-full flex items-center justify-center bg-space-bg-light">
            <div class="text-center">
              <svg xmlns="http://www.w3.org/2000/svg"
                class="h-16 sm:h-20 lg:h-24 w-16 sm:w-20 lg:w-24 text-space-primary/60 mx-auto" viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
              <div class="text-space-text font-heading mt-2 text-sm sm:text-base">
                {{ tournament.game.name }}
              </div>
            </div>
          </div>

          <div class="absolute inset-0 bg-gradient-to-t from-space-bg/90 to-transparent"></div>

          <!-- Badge "Terminé" -->
          <div class="absolute top-2 sm:top-4 right-2 sm:right-4">
            <SpaceBadge v-if="tournament.finished" variant="success" size="md"
              className="flex items-center gap-1 text-xs sm:text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd" />
              </svg>
              <span class="hidden sm:inline">Tournoi terminé</span>
              <span class="sm:hidden">Terminé</span>
            </SpaceBadge>
          </div>

          <!-- Titre et informations principales -->
          <div class="absolute bottom-0 left-0 right-0 p-3 sm:p-6">
            <h1 class="text-xl sm:text-2xl md:text-2xl lg:text-3xl text-white font-heading break-words">
              {{ tournament.name }}
            </h1>
          </div>
        </div>

        <!-- Informations détaillées -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 text-sm sm:text-base">
          <!-- Colonne 1: Date et jeu -->
          <div class="space-y-3 sm:space-y-4">
            <div class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mt-0.5 text-space-primary flex-shrink-0"
                viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd" />
              </svg>
              <div class="min-w-0 flex-1">
                <!-- Ligne titre + icônes à droite -->
                <div class="flex items-center justify-between">
                  <div class="font-heading text-space-text-muted text-xs sm:text-sm">
                    Date
                  </div>

                  <!-- Icônes calendrier compactes (ne prennent pas de ligne supplémentaire) -->
                  <div v-if="tournament.date" class="flex items-center gap-1">
                    <a :href="generateGoogleCalendarLink(tournament.date)" target="_blank" rel="noopener noreferrer"
                      aria-label="Ajouter à Google Calendar" title="Ajouter à Google Calendar"
                      class="p-1 rounded hover:bg-space-bg-light/30 transition-colors text-[#4285F4] hover:text-[#3367D6]">
                      <!-- Pictogramme calendrier générique, coloré Google -->
                      <svg class="size-6 block" x="0px" y="0px" viewBox="0 0 200 200" enable-background="new 0 0 200 200"
                        xml:space="preserve">
                        <g>
                          <g transform="translate(3.75 3.75)">
                            <path fill="#FFFFFF"
                              d="M148.882,43.618l-47.368-5.263l-57.895,5.263L38.355,96.25l5.263,52.632l52.632,6.579l52.632-6.579    l5.263-53.947L148.882,43.618z" />
                            <path fill="#1A73E8"
                              d="M65.211,125.276c-3.934-2.658-6.658-6.539-8.145-11.671l9.132-3.763c0.829,3.158,2.276,5.605,4.342,7.342    c2.053,1.737,4.553,2.592,7.474,2.592c2.987,0,5.553-0.908,7.697-2.724s3.224-4.132,3.224-6.934c0-2.868-1.132-5.211-3.395-7.026    s-5.105-2.724-8.5-2.724h-5.276v-9.039H76.5c2.921,0,5.382-0.789,7.382-2.368c2-1.579,3-3.737,3-6.487    c0-2.447-0.895-4.395-2.684-5.855s-4.053-2.197-6.803-2.197c-2.684,0-4.816,0.711-6.395,2.145s-2.724,3.197-3.447,5.276    l-9.039-3.763c1.197-3.395,3.395-6.395,6.618-8.987c3.224-2.592,7.342-3.895,12.342-3.895c3.697,0,7.026,0.711,9.974,2.145    c2.947,1.434,5.263,3.421,6.934,5.947c1.671,2.539,2.5,5.382,2.5,8.539c0,3.224-0.776,5.947-2.329,8.184    c-1.553,2.237-3.461,3.947-5.724,5.145v0.539c2.987,1.25,5.421,3.158,7.342,5.724c1.908,2.566,2.868,5.632,2.868,9.211    s-0.908,6.776-2.724,9.579c-1.816,2.803-4.329,5.013-7.513,6.618c-3.197,1.605-6.789,2.421-10.776,2.421    C73.408,129.263,69.145,127.934,65.211,125.276z" />
                            <path fill="#1A73E8"
                              d="M121.25,79.961l-9.974,7.25l-5.013-7.605l17.987-12.974h6.895v61.197h-9.895L121.25,79.961z" />
                            <path fill="#EA4335"
                              d="M148.882,196.25l47.368-47.368l-23.684-10.526l-23.684,10.526l-10.526,23.684L148.882,196.25z" />
                            <path fill="#34A853"
                              d="M33.092,172.566l10.526,23.684h105.263v-47.368H43.618L33.092,172.566z" />
                            <path fill="#4285F4"
                              d="M12.039-3.75C3.316-3.75-3.75,3.316-3.75,12.039v136.842l23.684,10.526l23.684-10.526V43.618h105.263    l10.526-23.684L148.882-3.75H12.039z" />
                            <path fill="#188038"
                              d="M-3.75,148.882v31.579c0,8.724,7.066,15.789,15.789,15.789h31.579v-47.368H-3.75z" />
                            <path fill="#FBBC04"
                              d="M148.882,43.618v105.263h47.368V43.618l-23.684-10.526L148.882,43.618z" />
                            <path fill="#1967D2"
                              d="M196.25,43.618V12.039c0-8.724-7.066-15.789-15.789-15.789h-31.579v47.368H196.25z" />
                          </g>
                        </g>
                      </svg>
                    </a>
                    <a :href="generateOutlookCalendarLink(tournament.date)" target="_blank" rel="noopener noreferrer"
                      aria-label="Ajouter à Outlook Calendar" title="Ajouter à Outlook Calendar"
                      class="p-1 rounded hover:bg-space-bg-light/30 transition-colors text-[#0078D4] hover:text-[#005A9E]">
                      <!-- Pictogramme calendrier générique, coloré Outlook -->
                      <svg id="Livello_1" x="0px" y="0px" viewBox="0 0 1831.085 1703.335" class="size-6 block"
                        enable-background="new 0 0 1831.085 1703.335" xml:space="preserve">
                        <path fill="#0A2767"
                          d="M1831.083,894.25c0.1-14.318-7.298-27.644-19.503-35.131h-0.213l-0.767-0.426l-634.492-375.585  c-2.74-1.851-5.583-3.543-8.517-5.067c-24.498-12.639-53.599-12.639-78.098,0c-2.934,1.525-5.777,3.216-8.517,5.067L446.486,858.693  l-0.766,0.426c-19.392,12.059-25.337,37.556-13.278,56.948c3.553,5.714,8.447,10.474,14.257,13.868l634.492,375.585  c2.749,1.835,5.592,3.527,8.517,5.068c24.498,12.639,53.599,12.639,78.098,0c2.925-1.541,5.767-3.232,8.517-5.068l634.492-375.585  C1823.49,922.545,1831.228,908.923,1831.083,894.25z" />
                        <path fill="#0364B8"
                          d="M520.453,643.477h416.38v381.674h-416.38V643.477z M1745.917,255.5V80.908  c1-43.652-33.552-79.862-77.203-80.908H588.204C544.552,1.046,510,37.256,511,80.908V255.5l638.75,170.333L1745.917,255.5z" />
                        <path fill="#0078D4" d="M511,255.5h425.833v383.25H511V255.5z" />
                        <path fill="#28A8EA"
                          d="M1362.667,255.5H936.833v383.25L1362.667,1022h383.25V638.75L1362.667,255.5z" />
                        <path fill="#0078D4" d="M936.833,638.75h425.833V1022H936.833V638.75z" />
                        <path fill="#0364B8" d="M936.833,1022h425.833v383.25H936.833V1022z" />
                        <path fill="#14447D" d="M520.453,1025.151h416.38v346.969h-416.38V1025.151z" />
                        <path fill="#0078D4" d="M1362.667,1022h383.25v383.25h-383.25V1022z" />
                        <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="1128.4584" y1="811.0833"
                          x2="1128.4584" y2="1.9982" gradientTransform="matrix(1 0 0 -1 0 1705.3334)">
                          <stop offset="0" style="stop-color:#35B8F1" />
                          <stop offset="1" style="stop-color:#28A8EA" />
                        </linearGradient>
                        <path fill="url(#SVGID_1_)"
                          d="M1811.58,927.593l-0.809,0.426l-634.492,356.848c-2.768,1.703-5.578,3.321-8.517,4.769  c-10.777,5.132-22.481,8.029-34.407,8.517l-34.663-20.27c-2.929-1.47-5.773-3.105-8.517-4.897L447.167,906.003h-0.298  l-21.036-11.753v722.384c0.328,48.196,39.653,87.006,87.849,86.7h1230.914c0.724,0,1.363-0.341,2.129-0.341  c10.18-0.651,20.216-2.745,29.808-6.217c4.145-1.756,8.146-3.835,11.966-6.217c2.853-1.618,7.75-5.152,7.75-5.152  c21.814-16.142,34.726-41.635,34.833-68.772V894.25C1831.068,908.067,1823.616,920.807,1811.58,927.593z" />
                        <path opacity="0.5" fill="#0A2767" enable-background="new    "
                          d="M1797.017,891.397v44.287l-663.448,456.791L446.699,906.301  c0-0.235-0.191-0.426-0.426-0.426l0,0l-63.023-37.899v-31.938l25.976-0.426l54.932,31.512l1.277,0.426l4.684,2.981  c0,0,645.563,368.346,647.267,369.197l24.698,14.478c2.129-0.852,4.258-1.703,6.813-2.555  c1.278-0.852,640.879-360.681,640.879-360.681L1797.017,891.397z" />
                        <path fill="#1490DF"
                          d="M1811.58,927.593l-0.809,0.468l-634.492,356.848c-2.768,1.703-5.578,3.321-8.517,4.769  c-24.641,12.038-53.457,12.038-78.098,0c-2.918-1.445-5.76-3.037-8.517-4.769L446.657,928.061l-0.766-0.468  c-12.25-6.642-19.93-19.409-20.057-33.343v722.384c0.305,48.188,39.616,87.004,87.803,86.7c0.001,0,0.002,0,0.004,0h1229.636  c48.188,0.307,87.5-38.509,87.807-86.696c0-0.001,0-0.002,0-0.004V894.25C1831.068,908.067,1823.616,920.807,1811.58,927.593z" />
                        <path opacity="0.1" enable-background="new    "
                          d="M1185.52,1279.629l-9.496,5.323c-2.752,1.752-5.595,3.359-8.517,4.812  c-10.462,5.135-21.838,8.146-33.47,8.857l241.405,285.479l421.107,101.476c11.539-8.716,20.717-20.178,26.7-33.343L1185.52,1279.629  z" />
                        <path opacity="0.05" enable-background="new    "
                          d="M1228.529,1255.442l-52.505,29.51c-2.752,1.752-5.595,3.359-8.517,4.812  c-10.462,5.135-21.838,8.146-33.47,8.857l113.101,311.838l549.538,74.989c21.649-16.254,34.394-41.743,34.407-68.815v-9.326  L1228.529,1255.442z" />
                        <path fill="#28A8EA"
                          d="M514.833,1703.333h1228.316c18.901,0.096,37.335-5.874,52.59-17.033l-697.089-408.331  c-2.929-1.47-5.773-3.105-8.517-4.897L447.125,906.088h-0.298l-20.993-11.838v719.914  C425.786,1663.364,465.632,1703.286,514.833,1703.333C514.832,1703.333,514.832,1703.333,514.833,1703.333z" />
                        <path opacity="0.1" enable-background="new    "
                          d="M1022,418.722v908.303c-0.076,31.846-19.44,60.471-48.971,72.392  c-9.148,3.931-19,5.96-28.957,5.962H425.833V383.25H511v-42.583h433.073C987.092,340.83,1021.907,375.702,1022,418.722z" />
                        <path opacity="0.2" enable-background="new    "
                          d="M979.417,461.305v908.302c0.107,10.287-2.074,20.469-6.388,29.808  c-11.826,29.149-40.083,48.273-71.54,48.417H425.833V383.25h475.656c12.356-0.124,24.533,2.958,35.344,8.943  C962.937,405.344,979.407,432.076,979.417,461.305z" />
                        <path opacity="0.2" enable-background="new    "
                          d="M979.417,461.305v823.136c-0.208,43-34.928,77.853-77.927,78.225H425.833V383.25  h475.656c12.356-0.124,24.533,2.958,35.344,8.943C962.937,405.344,979.407,432.076,979.417,461.305z" />
                        <path opacity="0.2" enable-background="new    "
                          d="M936.833,461.305v823.136c-0.046,43.067-34.861,78.015-77.927,78.225H425.833  V383.25h433.072c43.062,0.023,77.951,34.951,77.927,78.013C936.833,461.277,936.833,461.291,936.833,461.305z" />
                        <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="162.7469" y1="1383.0741"
                          x2="774.0864" y2="324.2592" gradientTransform="matrix(1 0 0 -1 0 1705.3334)">
                          <stop offset="0" style="stop-color:#1784D9" />
                          <stop offset="0.5" style="stop-color:#107AD5" />
                          <stop offset="1" style="stop-color:#0A63C9" />
                        </linearGradient>
                        <path fill="url(#SVGID_2_)"
                          d="M78.055,383.25h780.723c43.109,0,78.055,34.947,78.055,78.055v780.723  c0,43.109-34.946,78.055-78.055,78.055H78.055c-43.109,0-78.055-34.947-78.055-78.055V461.305  C0,418.197,34.947,383.25,78.055,383.25z" />
                        <path fill="#FFFFFF"
                          d="M243.96,710.631c19.238-40.988,50.29-75.289,89.17-98.495c43.057-24.651,92.081-36.94,141.675-35.515  c45.965-0.997,91.321,10.655,131.114,33.683c37.414,22.312,67.547,55.004,86.742,94.109c20.904,43.09,31.322,90.512,30.405,138.396  c1.013,50.043-9.706,99.628-31.299,144.783c-19.652,40.503-50.741,74.36-89.425,97.388c-41.327,23.734-88.367,35.692-136.011,34.578  c-46.947,1.133-93.303-10.651-134.01-34.067c-37.738-22.341-68.249-55.07-87.892-94.28c-21.028-42.467-31.57-89.355-30.745-136.735  C212.808,804.859,223.158,755.686,243.96,710.631z M339.006,941.858c10.257,25.912,27.651,48.385,50.163,64.812  c22.93,16.026,50.387,24.294,78.353,23.591c29.783,1.178,59.14-7.372,83.634-24.358c22.227-16.375,39.164-38.909,48.715-64.812  c10.677-28.928,15.946-59.572,15.543-90.404c0.33-31.127-4.623-62.084-14.649-91.554c-8.855-26.607-25.246-50.069-47.182-67.537  c-23.88-17.79-53.158-26.813-82.91-25.55c-28.572-0.74-56.644,7.593-80.184,23.804c-22.893,16.496-40.617,39.168-51.1,65.365  c-23.255,60.049-23.376,126.595-0.341,186.728L339.006,941.858z" />
                        <path fill="#50D9FF" d="M1362.667,255.5h383.25v383.25h-383.25V255.5z" />
                      </svg>
                    </a>
                  </div>
                </div>

                <!-- Valeur -->
                <div class="text-space-text break-words">
                  {{ formatLocalDate(tournament.date) }}
                </div>
              </div>
            </div>

            <div class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mt-0.5 text-space-secondary flex-shrink-0"
                viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clip-rule="evenodd" />
              </svg>
              <div class="min-w-0 flex-1">
                <div class="font-heading text-space-text-muted text-xs sm:text-sm">
                  Jeu
                </div>
                <div class="text-space-text break-words">
                  {{ tournament.game.name }}
                </div>
              </div>
            </div>

            <div v-if="tournament.playerCap > 0" class="space-y-2">
              <div class="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mt-0.5 text-space-accent flex-shrink-0"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clip-rule="evenodd" />
                </svg>
                <div>
                  <div class="font-heading text-space-text-muted text-xs sm:text-sm">
                    Places
                  </div>

                  {{ tournament.players.length }} / {{ tournament.playerCap }}
                </div>
              </div>

              <!-- Barre de progression pour les places -->
              <div class="w-full bg-space-bg-light/30 rounded-full h-2 overflow-hidden">
                <div class="bg-space-accent h-2 rounded-full transition-all duration-500" :style="`width: ${Math.min(
                  100,
                  (tournament.players.length / tournament.playerCap) * 100
                )}%`"></div>
              </div>
            </div>

            <!-- Liste d'attente si applicable -->
            <div v-if="hasWaitlist" class="border-t border-space-bg-light/30 pt-3">
              <div class="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mt-0.5 text-space-warning flex-shrink-0"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
                </svg>
                <div class="min-w-0 flex-1">
                  <div class="font-heading text-space-text-muted text-xs sm:text-sm">
                    Liste d'attente
                  </div>
                  <div class="text-space-text">{{ waitlistCount }} joueurs</div>
                  <p v-if="isUserInWaitlist" class="text-base sm:text-lg text-space-warning mt-1 break-words">
                    Vous êtes en liste d'attente {{ getUserWaitlistPosition }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Colonne 2: Participants et Discord -->
          <div class="space-y-3 sm:space-y-4">
            <div class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mt-0.5 text-space-primary flex-shrink-0"
                viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <div>
                <div class="font-heading text-space-text-muted text-xs sm:text-sm">
                  Participants
                </div>
                <div class="text-space-text">{{ getParticipantsCount() }}</div>
              </div>
            </div>

            <div class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mt-0.5 text-space-secondary flex-shrink-0"
                viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clip-rule="evenodd" />
              </svg>
              <div class="min-w-0 flex-1">
                <div class="font-heading text-space-text-muted text-xs sm:text-sm">
                  Discord
                </div>
                <div class="text-space-text break-words">
                  {{ tournament.discordChannelName || "Non spécifié" }}
                </div>
              </div>
            </div>
          </div>

          <!-- Colonne 3: Actions (inscription/désinscription/check-in) -->
          <div v-if="!tournament.finished && user" class="flex flex-col space-y-3 lg:col-span-1">
            <!-- Inscription normale -->
            <SpaceButton v-if="
              !isUserRegistered && !isUserInWaitlist && !tournament.finished
            " @click="
              openRegistrationPopup(
                tournament,
                isTournamentFull ? 'waitlist' : 'register'
              )
              " :variant="isTournamentFull ? 'warning' : 'primary'" className="w-full">
              <template v-if="isTournamentFull">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clip-rule="evenodd" />
                </svg>
                Rejoindre la liste d'attente
              </template>
              <template v-else>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clip-rule="evenodd" />
                </svg>
                S'inscrire
              </template>
            </SpaceButton>

            <!-- Quitter la liste d'attente -->
            <SpaceButton v-if="isUserInWaitlist && !tournament.finished"
              @click="openRegistrationPopup(tournament, 'unregister-waitlist')" variant="error" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                  clip-rule="evenodd" />
              </svg>
              Quitter la liste d'attente
            </SpaceButton>

            <!-- Check-in -->
            <SpaceButton v-if="isUserRegistered && isCheckInAvailable"
              @click="checkIn(tournament._id ?? '', !isCheckedIn)" :variant="isCheckedIn ? 'success' : 'accent'"
              className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                  clip-rule="evenodd" />
              </svg>
              {{ isCheckedIn ? "Check-in confirmé" : "Check-in" }}
            </SpaceButton>

            <!-- Désinscription -->
            <SpaceButton v-if="isUserRegistered" @click="openRegistrationPopup(tournament, 'unregister')"
              variant="outline-error" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                  clip-rule="evenodd" />
              </svg>
              Se désinscrire
            </SpaceButton>

            <!-- Définir niveau de jeu -->
            <SpaceButton v-if="
              isUserRegistered &&
              !hasPlayerLevelForGame &&
              !tournament.finished
            " @click="redirectToPlayerLevel" variant="secondary" className="w-full mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                  clip-rule="evenodd" />
              </svg>
              Définir votre niveau
            </SpaceButton>
          </div>
        </div>
      </SpaceCard>

      <!-- Contenu principal du tournoi en onglets -->
      <SpaceCard variant="dark" :stars="true" className="overflow-hidden">
        <!-- Navigation des onglets -->
        <div class="space-tabs flex flex-wrap border-b border-space-bg-light/30 overflow-x-auto scrollbar-thin">
          <!-- Onglet Description -->
          <button @click="activeTab = 'description'" :class="[
            'space-tab px-3 sm:px-4 py-2 sm:py-3 font-heading text-sm sm:text-base flex items-center whitespace-nowrap',
            activeTab === 'description'
              ? 'text-space-primary-light bg-space-bg-light/20 border-b-2 border-space-primary'
              : 'text-space-text-muted hover:text-space-text hover:bg-space-bg-light/10',
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z"
                clip-rule="evenodd" />
            </svg>
            Description
          </button>

          <!-- Onglet Participants -->
          <button @click="activeTab = 'participants'" :class="[
            'space-tab px-3 sm:px-4 py-2 sm:py-3 font-heading text-sm sm:text-base flex items-center whitespace-nowrap',
            activeTab === 'participants'
              ? 'text-space-primary-light bg-space-bg-light/20 border-b-2 border-space-primary'
              : 'text-space-text-muted hover:text-space-text hover:bg-space-bg-light/10',
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" viewBox="0 0 20 20"
              fill="currentColor">
              <path
                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span class="hidden sm:inline">Participants</span>
            <span class="sm:hidden">Joueurs</span>
            <span class="ml-1 text-sm sm:text-lg opacity-80">
              ({{ getParticipantsCount() }})
            </span>
          </button>

          <!-- Onglet Twitch -->
          <button v-if="shouldShowTwitchTab" @click="activeTab = 'twitch'" :class="[
            'space-tab px-3 sm:px-4 py-2 sm:py-3 font-heading text-sm sm:text-base flex items-center whitespace-nowrap',
            activeTab === 'twitch'
              ? 'text-space-accent-light bg-space-bg-light/20 border-b-2 border-space-accent'
              : 'text-space-text-muted hover:text-space-text hover:bg-space-bg-light/10',
          ]">
            <svg class="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.429h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
            </svg>
            <span class="hidden sm:inline">Streams Live</span>
            <span class="sm:hidden">Live</span>
          </button>

          <!-- Onglet Résultats (pour les tournois terminés) -->
          <button v-if="tournament.finished" @click="activeTab = 'results'" :class="[
            'space-tab px-3 sm:px-4 py-2 sm:py-3 font-heading text-sm sm:text-base flex items-center whitespace-nowrap',
            activeTab === 'results'
              ? 'text-space-success-light bg-space-bg-light/20 border-b-2 border-space-success'
              : 'text-space-text-muted hover:text-space-text hover:bg-space-bg-light/10',
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" viewBox="0 0 24 24"
              fill="none" stroke="currentColor">
              <rect x="8" y="7" width="8" height="12" rx="1" stroke-width="1.5" />
              <rect x="16" y="11" width="5" height="8" rx="1" stroke-width="1.5" />
              <rect x="3" y="13" width="5" height="6" rx="1" stroke-width="1.5" />
            </svg>
            Résultats
          </button>
        </div>

        <!-- Contenu des onglets -->
        <div class="p-3 sm:p-6">
          <!-- Onglet Description -->
          <div v-if="activeTab === 'description'" class="min-h-[150px] space-fade-in">
            <h3 class="text-base sm:text-lg text-space-text font-heading mb-3 sm:mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-space-primary"
                viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z"
                  clip-rule="evenodd" />
              </svg>
              Détails du tournoi
            </h3>
            <SpaceCard variant="dark" className="p-3 sm:p-4">
              <p v-if="tournament.description" class="text-space-text leading-relaxed text-sm sm:text-base break-words"
                v-html="formatDescription(tournament.description)"></p>
              <p v-else class="text-space-text-muted italic text-sm sm:text-base">
                Pas de description disponible pour ce tournoi.
              </p>
            </SpaceCard>
          </div>

          <!-- Onglet Twitch Streams -->
          <TwitchStreams v-if="activeTab === 'twitch'" :tournament-id="tournamentId"
            :is-tournament-today="isTournamentToday" />

          <!-- Onglet Participants -->
          <div v-if="activeTab === 'participants'" class="min-h-[150px] space-fade-in">
            <h3 class="text-base sm:text-lg text-space-text font-heading mb-3 sm:mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-space-primary"
                viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Liste des participants
            </h3>

            <!-- Vue des équipes si toutes ont au moins un joueur -->
            <SpaceAlert v-if="
              tournament.teams &&
              tournament.teams.length > 0 &&
              !tournament.teamsPublished &&
              !tournament.finished
            " variant="warning" className="mb-4 sm:mb-6">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                    clip-rule="evenodd" />
                </svg>
              </template>
              <p class="text-sm sm:text-base">
                Équipes en cours de création...
              </p>
            </SpaceAlert>

            <!-- Affichage des équipes -->
            <div v-if="
              tournament.teams &&
              tournament.teams.length > 0 &&
              (tournament.teamsPublished || tournament.finished) &&
              !hasEmptyTeams
            " class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <SpaceCard v-for="team in tournament.teams" :key="team._id" variant="secondary" className="p-3">
                <h4
                  class="text-sm sm:text-base text-space-text font-heading border-b border-space-bg-light/30 pb-2 mb-2 truncate">
                  {{ team.name }}
                </h4>
                <ul class="space-y-1">
                  <li v-for="teamPlayer in team.players" :key="teamPlayer._id"
                    class="flex items-center justify-between p-2 bg-space-bg-light/10 rounded-md border-l-2 border-space-secondary/50 text-sm sm:text-base">
                    <router-link v-if="teamPlayer._id" :to="{ name: 'Profil', params: { id: teamPlayer._id } }"
                      class="text-space-text hover:text-space-secondary-light transition-colors truncate min-w-0 flex-1">
                      {{ teamPlayer.username }}
                    </router-link>
                    <span v-else class="text-space-text truncate min-w-0 flex-1">
                      {{ teamPlayer.username || "Joueur inconnu" }}
                    </span>

                    <!-- Badge pour les streams live -->
                    <div class="flex items-center gap-1 sm:gap-2 ml-2 flex-shrink-0">
                      <a v-if="getPlayerLiveStatus(teamPlayer)" :href="`https://twitch.tv/${getPlayerTwitchUsername(
                        teamPlayer
                      )}`" target="_blank" rel="noopener noreferrer">
                        <SpaceBadge variant="accent" size="xs" className="animate-pulse">
                          LIVE
                        </SpaceBadge>
                      </a>

                      <!-- Badge check-in -->
                      <span v-if="
                        teamPlayer._id &&
                        tournament?.checkIns?.[teamPlayer._id]
                      ">
                        <SpaceBadge variant="success" size="xs">
                          <span class="hidden sm:inline">Check-in</span>
                          <span class="sm:hidden">✓</span>
                        </SpaceBadge>
                      </span>
                      <span v-else-if="isCheckInAvailable">
                        <SpaceBadge variant="error" size="xs">
                          <span class="hidden sm:inline">En attente</span>
                          <span class="sm:hidden">⏳</span>
                        </SpaceBadge>
                      </span>
                    </div>
                  </li>
                </ul>
              </SpaceCard>
            </div>

            <!-- Liste des joueurs individuels -->
            <div v-else-if="
              tournament.players &&
              tournament.players.length > 0 &&
              !(
                tournament.teamsPublished &&
                tournament.teams &&
                tournament.teams.length > 0
              )
            ">
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                <div v-for="player in tournament.players" :key="player._id"
                  class="flex items-center justify-between p-2 sm:p-3 bg-space-bg-light/10 rounded-lg border-l-2 border-space-primary/50 font-nasa text-sm sm:text-base lg:text-xl min-w-0">
                  <router-link v-if="player._id" :to="{ name: 'Profil', params: { id: player._id } }"
                    class="text-space-text hover:text-space-primary-light transition-colors truncate min-w-0 flex-1">
                    {{ player.username }}
                  </router-link>
                  <span v-else class="text-space-text truncate min-w-0 flex-1">
                    {{ player.username || "Joueur inconnu" }}
                  </span>

                  <div class="flex items-center gap-1 sm:gap-2 ml-2 flex-shrink-0">
                    <!-- Badge pour les streams live -->
                    <a v-if="getPlayerLiveStatus(player)" :href="`https://twitch.tv/${getPlayerTwitchUsername(
                      player
                    )}`" target="_blank" rel="noopener noreferrer">
                      <SpaceBadge variant="accent" size="xs" className="animate-pulse">
                        LIVE
                      </SpaceBadge>
                    </a>

                    <!-- Badge check-in -->
                    <span v-if="player._id && tournament?.checkIns?.[player._id]">
                      <SpaceBadge variant="success" size="xs">
                        <span class="hidden sm:inline">Check-in</span>
                        <span class="sm:hidden">✓</span>
                      </SpaceBadge>
                    </span>
                    <span v-else-if="isCheckInAvailable">
                      <SpaceBadge variant="error" size="xs">
                        <span class="hidden sm:inline">En attente</span>
                        <span class="sm:hidden">⏳</span>
                      </SpaceBadge>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Message si aucun participant -->
            <SpaceAlert v-else variant="info" className="bg-space-bg-light/10 text-center py-4 sm:py-6">
              <p class="text-space-text-muted italic text-sm sm:text-base">
                Aucun participant inscrit pour ce tournoi.
              </p>
            </SpaceAlert>

            <!-- Section Liste d'attente -->
            <div v-if="hasWaitlist" class="mt-6 sm:mt-8 space-fade-in">
              <h3 class="text-lg sm:text-xl text-space-text font-heading mb-3 sm:mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-space-warning"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd" />
                </svg>
                <span class="hidden sm:inline">Liste d'attente</span>
                <span class="sm:hidden">Attente</span>
                <SpaceBadge variant="warning" size="sm" className="ml-2">
                  {{ waitlistCount }}
                </SpaceBadge>
              </h3>

              <SpaceCard variant="warning" className="p-3">
                <!-- En-tête du tableau - caché sur mobile -->
                <div
                  class="hidden sm:grid grid-cols-3 gap-4 mb-3 text-base sm:text-lg font-heading text-space-text-muted border-b border-space-bg-light/20 pb-2">
                  <div>Position</div>
                  <div>Joueur</div>
                  <div>En attente depuis</div>
                </div>

                <!-- Liste des joueurs en attente -->
                <ul v-if="waitlistPlayers.length > 0" class="space-y-2">
                  <li v-for="(player, index) in waitlistPlayers" :key="player._id"
                    class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 p-2 rounded-md text-space-text hover:bg-space-bg-light/10 transition-colors">
                    <!-- Position (mobile: inline, desktop: column) -->
                    <div class="sm:text-center">
                      <span class="sm:hidden text-xs text-space-text-muted">Position:
                      </span>
                      <SpaceBadge variant="warning" size="xs">
                        {{ index + 1 }}
                      </SpaceBadge>
                    </div>

                    <!-- Joueur -->
                    <div>
                      <span class="sm:hidden text-xs text-space-text-muted">Joueur:
                      </span>
                      <router-link v-if="player._id" :to="{ name: 'Profil', params: { id: player._id } }"
                        class="text-space-text hover:text-space-primary-light transition-colors">
                        {{ player.username }}
                      </router-link>
                      <span v-else>{{
                        player.username || "Joueur inconnu"
                      }}</span>
                    </div>

                    <!-- Temps d'attente -->
                    <div class="text-space-text-muted text-sm sm:text-base">
                      <span class="sm:hidden text-xs">Depuis: </span>
                      {{
                        player._id
                          ? formatWaitingTime(player._id)
                          : "ID inconnu"
                      }}
                    </div>
                  </li>
                </ul>

                <!-- Message si liste vide -->
                <p v-else class="text-space-text-muted italic text-center py-4 text-sm sm:text-base">
                  Liste d'attente vide
                </p>
              </SpaceCard>
            </div>
          </div>

          <!-- Onglet Résultats -->
          <div v-if="tournament.finished && activeTab === 'results'" class="min-h-[150px] space-fade-in">
            <tournament-podium :tournament="tournament" :is-other-rankings-expanded="showOtherRankings"
              @toggle-other-rankings="toggleOtherRankings" @refetch="refetchTournament" />
          </div>
        </div>
      </SpaceCard>

      <!-- Section des derniers gagnants -->
      <SpaceCard v-if="
        lastFinishedTournament &&
        lastFinishedTournament.teams &&
        !tournament.finished
      " variant="accent" className="overflow-hidden">
        <!-- En-tête -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <h3 class="text-lg sm:text-xl font-heading flex items-center text-space-text">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="text-sm sm:text-base lg:text-lg">Gagnants du tournoi précédent</span>
          </h3>

          <div class="flex flex-wrap items-center gap-2">
            <SpaceBadge variant="primary" size="sm" className="text-xs sm:text-sm">
              {{ formatLocalDate(lastFinishedTournament.date) }}
            </SpaceBadge>
            <SpaceBadge variant="secondary" size="sm" className="text-xs sm:text-sm break-words">
              {{ lastFinishedTournament.name }}
            </SpaceBadge>
          </div>
        </div>

        <!-- Équipes gagnantes -->
        <div class="grid grid-cols-1 gap-4" :class="{
          'max-w-2xl mx-auto':
            getWinningTeams(lastFinishedTournament).length === 1,
        }">
          <SpaceCard v-for="team in getWinningTeams(lastFinishedTournament)" :key="team._id" variant="success"
            className="p-0 overflow-hidden">
            <!-- En-tête de l'équipe -->
            <div class="p-3 bg-space-success/20 flex items-center justify-between">
              <div class="flex items-center min-w-0 flex-1">
                <SpaceBadge variant="accent" size="sm" className="mr-2 sm:mr-3 flex-shrink-0">
                  1
                </SpaceBadge>
                <h5 class="text-space-text font-heading text-sm sm:text-base truncate">
                  {{ team.name }}
                </h5>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-space-success flex-shrink-0"
                viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd" />
              </svg>
            </div>

            <!-- Liste des joueurs -->
            <div class="p-3">
              <div class="space-y-2">
                <div v-for="player in team.players" :key="player._id"
                  class="flex items-center p-2 bg-space-bg-light/10 hover:bg-space-bg-light/20 transition-colors rounded-md min-w-0">
                  <router-link v-if="player._id" :to="{ name: 'Profil', params: { id: player._id } }"
                    class="text-space-text hover:text-space-primary-light transition-colors text-sm sm:text-base truncate min-w-0 flex-1">
                    {{ player.username }}
                  </router-link>
                  <span v-else class="text-space-text text-sm sm:text-base truncate min-w-0 flex-1">
                    {{ player.username || "Joueur inconnu" }}
                  </span>
                </div>
              </div>
            </div>
          </SpaceCard>
        </div>

        <!-- Bouton pour voir le détail -->
        <div class="mt-4 text-center">
          <router-link :to="`/tournois/${lastFinishedTournament._id}`">
            <SpaceButton variant="secondary" size="sm" className="text-sm">
              <span class="hidden sm:inline">Voir le détail du tournoi</span>
              <span class="sm:hidden">Voir détail</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </SpaceButton>
          </router-link>
        </div>
      </SpaceCard>

      <!-- Bouton de retour en haut de page -->
      <div class="fixed bottom-4 right-4 z-50">
        <SpaceButton @click="scrollToTop" variant="primary" size="sm" className="rounded-full p-2 shadow-lg"
          :title="'Retour en haut de page'">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </SpaceButton>
      </div>
    </div>

    <!-- Notifications -->
    <Toast v-if="error" type="error" :message="error" />
    <Toast v-if="success" type="success" :message="success" />

    <!-- Modales -->
    <SpaceModal v-model="showPopup" :title="`CONFIRMATION D'${actionType === 'register' || actionType === 'waitlist'
      ? 'INSCRIPTION'
      : 'ANNULATION'
      }`">
      <div class="space-y-3 sm:space-y-4">
        <p class="text-space-text text-sm sm:text-base">
          Voulez-vous
          <span class="text-space-primary-light font-bold">
            {{
              actionType === "register"
                ? "vous inscrire"
                : actionType === "waitlist"
                  ? "rejoindre la liste d'attente"
                  : actionType === "unregister-waitlist"
                    ? "quitter la liste d'attente"
                    : "vous désinscrire"
            }}
          </span>
          au tournoi
          <span class="text-space-secondary-light font-bold break-words">
            {{ selectedTournament?.name }}
          </span>
          ?
        </p>

        <SpaceAlert v-if="actionType === 'register' || actionType === 'waitlist'" variant="info" className="mb-4">
          <p class="text-sm sm:text-base lg:text-xl">
            <span v-if="actionType === 'register'">
              N'oubliez pas de venir vous check-in 24h avant le début du tournoi
              pour confirmer votre participation.
            </span>
            <span v-else>
              Vous serez automatiquement inscrit si des places se libèrent.
            </span>
          </p>
        </SpaceAlert>

        <SpaceAlert v-if="
          actionType === 'unregister' || actionType === 'unregister-waitlist'
        " variant="warning" className="mb-4">
          <p class="text-sm sm:text-base lg:text-xl">
            <span v-if="actionType === 'unregister'">
              Attention: Si vous vous désinscrivez, votre place sera attribuée à
              une personne en liste d'attente.
            </span>
            <span v-else>
              Vous ne serez plus contacté si des places se libèrent.
            </span>
          </p>
        </SpaceAlert>
      </div>

      <template #footer>
        <div class="flex flex-col sm:flex-row justify-end gap-2">
          <SpaceButton @click="closePopup" variant="outline" size="sm" className="w-full sm:w-auto">
            Annuler
          </SpaceButton>
          <SpaceButton @click="confirmAction" :variant="actionType === 'unregister' ||
            actionType === 'unregister-waitlist'
            ? 'error'
            : 'primary'
            " className="w-full sm:w-auto">
            Confirmer
          </SpaceButton>
        </div>
      </template>
    </SpaceModal>

    <SpaceModal v-model="showLevelPrompt" title="NIVEAU DE JEU REQUIS">
      <div class="space-y-3 sm:space-y-4">
        <p class="text-space-text text-sm sm:text-base">
          Vous n'avez pas encore défini votre niveau pour
          <span class="text-space-primary-light font-bold break-words">{{
            levelPromptGameName
          }}</span>.
        </p>
        <p class="text-space-text-muted text-sm sm:text-base">
          Définir votre niveau aide à l'organisation des tournois et au
          matchmaking. Vous pouvez:
        </p>
        <div class="space-y-3 mt-4">
          <SpaceButton @click="goToLevelDefinition" variant="primary" className="w-full text-sm sm:text-base">
            <span class="hidden sm:inline">Définir mon niveau maintenant</span>
            <span class="sm:hidden">Définir niveau</span>
          </SpaceButton>
          <SpaceButton @click="registerWithoutLevel" variant="outline" className="w-full text-sm sm:text-base">
            <span class="hidden sm:inline">S'inscrire sans définir de niveau</span>
            <span class="sm:hidden">S'inscrire sans niveau</span>
          </SpaceButton>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <SpaceButton @click="closeLevelPrompt" variant="ghost" size="sm" className="text-sm">
            Annuler
          </SpaceButton>
        </div>
      </template>
    </SpaceModal>
  </div>
</template>
<script setup lang="ts">
// ========================================
// IMPORTS ET DÉPENDANCES
// ========================================
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import playerService from "../services/playerService";
import { useUserStore } from "../stores/userStore";
import Toast from "@/shared/Toast.vue";
import TournamentPodium from "@/components/tournois-a-venir/TournamentPodium.vue";
import TwitchStreams from "@/components/tournois-a-venir/TwitchStreams.vue";
import type { Tournament, UserWithTwitch } from "../types";
import tournamentService from "../services/tournamentService";
import playerGameLevelService from "../services/playerGameLevelService";
import streamService from "../services/streamService";

// ========================================
// CONFIGURATION ET ÉTAT PRINCIPAL
// ========================================

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

// États principaux du composant
const tournament = ref<Tournament | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);
const success = ref<string | null>(null);
const activeTab = ref("participants");
const showOtherRankings = ref(false);
const imageError = ref(false);

// États pour l'inscription et le check-in
const showPopup = ref(false);
const selectedTournament = ref<Tournament | null>(null);
const actionType = ref<string>("register");
const isCheckedIn = ref(false);

// États pour les modales
const showLevelPrompt = ref(false);
const levelPromptGameId = ref<string>("");
const levelPromptGameName = ref<string>("");
const levelPromptTournamentId = ref<string>("");
const hasPlayerLevelForGame = ref(false);

// États pour la navigation entre tournois
const allTournaments = ref<Tournament[]>([]);
const currentTournamentIndex = ref<number>(-1);
const lastFinishedTournament = ref<Tournament | null>(null);
const loadingLastTournament = ref(false);

const streamUsers = ref<UserWithTwitch[]>([]);

// ========================================
// PROPRIÉTÉS CALCULÉES
// ========================================

const tournamentId = computed(() => route.params.id as string);
const user = computed(() => userStore.user);
const currentPlayerId = computed(() => userStore.playerId);

const isTournamentToday = computed(() => {
  if (!tournament.value?.date) return false;

  try {
    const tournamentDate = new Date(tournament.value.date);
    const today = new Date();

    return (
      tournamentDate.getFullYear() === today.getFullYear() &&
      tournamentDate.getMonth() === today.getMonth() &&
      tournamentDate.getDate() === today.getDate()
    );
  } catch (error) {
    console.error(
      "Erreur lors de la vérification de la date du tournoi:",
      error
    );
    return false;
  }
});

const shouldShowTwitchTab = computed(() => isTournamentToday.value);

const isUserRegistered = computed(() => {
  if (!user.value || !tournament.value) return false;
  return tournament.value.players.some(
    (player) => player.userId === user.value?._id
  );
});

const isCheckInAvailable = computed(() => {
  if (!tournament.value) return false;

  const tournamentDate = new Date(tournament.value.date);
  const now = new Date();

  if (tournament.value.discordReminderDate) {
    const reminderDate = new Date(tournament.value.discordReminderDate);
    return now >= reminderDate && now < tournamentDate;
  } else {
    const diff = tournamentDate.getTime() - now.getTime();
    return diff > 0 && diff <= 24 * 60 * 60 * 1000;
  }
});

// Propriétés calculées pour la navigation
const previousTournament = computed(() => {
  if (currentTournamentIndex.value <= 0) return null;
  return allTournaments.value[currentTournamentIndex.value - 1];
});

const nextTournament = computed(() => {
  if (currentTournamentIndex.value >= allTournaments.value.length - 1)
    return null;
  return allTournaments.value[currentTournamentIndex.value + 1];
});

const hasNavigation = computed(() => allTournaments.value.length > 1);

// Propriétés calculées pour la liste d'attente
const hasWaitlist = computed(() => {
  if (!tournament.value || !tournament.value.waitlistPlayers) return false;
  return tournament.value.waitlistPlayers.length > 0;
});

const waitlistCount = computed(() => {
  if (!tournament.value || !tournament.value.waitlistPlayers) return 0;
  return tournament.value.waitlistPlayers.length;
});

const isUserInWaitlist = computed(() => {
  if (
    !currentPlayerId.value ||
    !tournament.value ||
    !tournament.value.waitlistPlayers
  )
    return false;

  return tournament.value.waitlistPlayers.some((waitlistId) => {
    if (typeof waitlistId === "object") {
      return waitlistId._id === currentPlayerId.value;
    } else {
      return waitlistId === currentPlayerId.value;
    }
  });
});

const getUserWaitlistPosition = computed(() => {
  if (
    !user.value ||
    !tournament.value ||
    !tournament.value.waitlistPlayers ||
    !isUserInWaitlist.value
  ) {
    return 0;
  }

  if (tournament.value.waitlistRegistrationDates) {
    const waitlistWithDates = tournament.value.waitlistPlayers.map((player) => {
      const playerId = typeof player === "object" ? player._id : player;
      const registrationDate = playerId
        ? tournament.value?.waitlistRegistrationDates?.[playerId]
        : new Date();
      return { player, registrationDate };
    });

    waitlistWithDates.sort((a, b) => {
      return (
        new Date(a.registrationDate ?? new Date()).getTime() -
        new Date(b.registrationDate ?? new Date()).getTime()
      );
    });

    for (let i = 0; i < waitlistWithDates.length; i++) {
      const playerId =
        typeof waitlistWithDates[i].player === "object"
          ? waitlistWithDates[i].player.userId
          : waitlistWithDates[i].player;

      if (playerId === user.value._id) {
        return i + 1;
      }
    }
  }

  const index = tournament.value.waitlistPlayers.findIndex((player) => {
    if (typeof player === "object" && player.userId) {
      return user.value && player.userId === user.value._id;
    }
    return typeof player === "object" && player.userId === user.value?._id;
  });

  return index + 1;
});

const isTournamentFull = computed(() => {
  if (!tournament.value) return false;
  return (
    tournament.value.playerCap > 0 &&
    tournament.value.players.length >= tournament.value.playerCap
  );
});

const waitlistPlayers = computed(() => {
  if (!tournament.value || !tournament.value.waitlistPlayers) return [];

  const playersWithDates = tournament.value.waitlistPlayers.map((player) => {
    const playerId = typeof player === "object" ? player._id : player;
    let registrationDate;

    if (tournament.value?.waitlistRegistrationDates && playerId) {
      registrationDate = tournament.value.waitlistRegistrationDates[playerId];
    }

    if (!registrationDate) {
      registrationDate = new Date();
    }

    return { ...player, registrationDate };
  });

  return playersWithDates.sort((a, b) => {
    return (
      new Date(a.registrationDate).getTime() -
      new Date(b.registrationDate).getTime()
    );
  });
});

const hasEmptyTeams = computed(() => {
  if (!tournament.value?.teams || tournament.value.teams.length === 0) {
    return true;
  }
  return tournament.value.teams.some(
    (team) => !team.players || team.players.length === 0
  );
});

// ========================================
// NOUVELLES MÉTHODES POUR LES STREAMS
// ========================================

/**
 * Vérifie si un joueur est en live
 */
const getPlayerLiveStatus = (player: any): boolean => {
  if (!streamUsers.value.length || !player) return false;

  // Recherche par userId ou username
  const streamUser = streamUsers.value.find(
    (user) =>
      (player.userId && user.userId === player.userId) ||
      (player.username && user.username === player.username)
  );

  return streamUser?.isLive || false;
};

/**
 * Récupère le nom d'utilisateur Twitch d'un joueur
 */
const getPlayerTwitchUsername = (player: any): string => {
  if (!streamUsers.value.length || !player) return "";

  // Recherche par userId ou username
  const streamUser = streamUsers.value.find(
    (user) =>
      (player.userId && user.userId === player.userId) ||
      (player.username && user.username === player.username)
  );

  return streamUser?.twitchUsername || "";
};

/**
 *  Met à jour les données de stream
 */
const updateStreamData = async () => {
  if (!isTournamentToday.value || !tournament.value?._id) {
    streamUsers.value = [];
    return;
  }

  try {
    const response = await streamService.getTournamentStreams(
      tournament.value._id
    );
    streamUsers.value = response.allUsersWithTwitch || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des streams:", error);
    streamUsers.value = [];
  }
};

// ========================================
// MÉTHODES PRINCIPALES
// ========================================

const refetchTournament = async () => {
  if (!tournamentId.value) {
    error.value = "ID de tournoi manquant";
    return;
  }

  error.value = null;

  try {
    console.log("🔄 Chargement du tournoi:", tournamentId.value);

    const data = await tournamentService.getTournamentById(tournamentId.value);

    if (!data) {
      error.value = "Tournoi non trouvé";
      return;
    }

    console.log("✅ Tournoi chargé:", data.name);
    tournament.value = data;
  } catch (err) {
    console.error("❌ Erreur lors de la récupération du tournoi:", err);
    error.value = "Impossible de charger les données du tournoi";
    tournament.value = null;
  }
};

/**
 * Récupère les données du tournoi
 */
const fetchTournament = async () => {
  if (!tournamentId.value) {
    error.value = "ID de tournoi manquant";
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    console.log("🔄 Chargement du tournoi:", tournamentId.value);

    const data = await tournamentService.getTournamentById(tournamentId.value);

    if (!data) {
      error.value = "Tournoi non trouvé";
      return;
    }

    console.log("✅ Tournoi chargé:", data.name);
    tournament.value = data;

    // Récupération des données complémentaires (non critiques)
    await Promise.allSettled([
      fetchAllTournaments(),
      user.value ? checkPlayerCheckIn() : Promise.resolve(),
      user.value ? checkPlayerLevel() : Promise.resolve(),
      data.game?._id ? fetchLastFinishedTournament() : Promise.resolve(),
      updateStreamData(),
    ]);

    // Définir l'onglet actif
    if (data.finished) {
      activeTab.value = "results";
    } else if (isTournamentToday.value) {
      activeTab.value = "twitch";
    } else {
      activeTab.value = "participants";
    }
  } catch (err) {
    console.error("❌ Erreur lors de la récupération du tournoi:", err);
    error.value = "Impossible de charger les données du tournoi";
    tournament.value = null;
  } finally {
    isLoading.value = false;
  }
};

/**
 * Récupère tous les tournois pour la navigation
 */
const fetchAllTournaments = async () => {
  try {
    const tournaments = await tournamentService.getTournaments();
    allTournaments.value = tournaments.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    currentTournamentIndex.value = allTournaments.value.findIndex(
      (t) => t._id === tournamentId.value
    );
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de tous les tournois:",
      error
    );
  }
};

/**
 * Récupère le dernier tournoi terminé
 */
const fetchLastFinishedTournament = async () => {
  if (!tournament.value?.game?._id) return;

  loadingLastTournament.value = true;

  try {
    const tournaments = await tournamentService.getTournamentsByGame(
      tournament.value.game._id
    );
    const finishedTournaments = tournaments.filter(
      (t) => t.finished && t._id !== tournament.value?._id
    );

    if (finishedTournaments.length === 0) return;

    const sortedTournaments = finishedTournaments.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    lastFinishedTournament.value = sortedTournaments[0];
  } catch (err) {
    console.error("Erreur lors de la récupération du dernier tournoi:", err);
  } finally {
    loadingLastTournament.value = false;
  }
};

/**
 * Vérifie l'état de check-in du joueur
 */
const checkPlayerCheckIn = async () => {
  if (!user.value || !tournament.value) return;

  try {
    const player = await playerService.getPlayerByIdUser(user.value._id);
    if (player && player._id && tournament.value.checkIns) {
      isCheckedIn.value = !!tournament.value.checkIns[player._id];
    }
  } catch (err) {
    console.error("Erreur lors de la vérification du check-in:", err);
  }
};

/**
 * Vérifie si le joueur a un niveau pour ce jeu
 */
const checkPlayerLevel = async () => {
  if (!currentPlayerId.value || !tournament.value?.game?._id) {
    hasPlayerLevelForGame.value = false;
    return;
  }

  try {
    const gameId = tournament.value.game._id;
    const playerLevel = await playerGameLevelService.getPlayerLevelForGame(
      currentPlayerId.value,
      gameId
    );
    hasPlayerLevelForGame.value = !!playerLevel;
  } catch (error) {
    console.error("Erreur lors de la vérification du niveau:", error);
    hasPlayerLevelForGame.value = false;
  }
};

// ========================================
// MÉTHODES D'ACTIONS UTILISATEUR
// ========================================

/**
 * Navigation vers un autre tournoi
 */
const navigateToTournament = (tournamentId: string) => {
  router.push(`/tournois/${tournamentId}`);
};

/**
 * Retour aux tournois
 */
const goBackToTournaments = () => {
  router.push("/tournois-a-venir");
};

/**
 * Ouvre la popup d'inscription/désinscription
 */
const openRegistrationPopup = (tournament: Tournament, type: string) => {
  selectedTournament.value = tournament;
  actionType.value = type;
  showPopup.value = true;
};

/**
 * Ferme la popup
 */
const closePopup = () => {
  showPopup.value = false;
  setTimeout(() => {
    selectedTournament.value = null;
    actionType.value = "register";
  }, 300);
};

/**
 * Confirme l'action d'inscription/désinscription
 */
const confirmAction = async () => {
  if (!selectedTournament.value || !user.value) return;

  try {
    // Vérification du niveau pour les inscriptions
    if (actionType.value === "register" || actionType.value === "waitlist") {
      const gameId = selectedTournament.value.game._id;

      try {
        const playerLevel = await playerGameLevelService.getPlayerLevelForGame(
          currentPlayerId.value ?? "",
          gameId ?? ""
        );

        if (!playerLevel) {
          closePopup();
          showLevelPrompt.value = true;
          levelPromptGameId.value = gameId ?? "";
          levelPromptGameName.value = selectedTournament.value.game.name;
          levelPromptTournamentId.value = selectedTournament.value._id || "";
          return;
        }
      } catch (err) {
        console.error("Erreur lors de la vérification du niveau:", err);
      }
    }

    let success = false;

    if (
      (actionType.value === "register" || actionType.value === "waitlist") &&
      selectedTournament.value._id
    ) {
      await tournamentService.registerPlayer(
        selectedTournament.value._id,
        user.value._id
      );
      success = true;

      showMessage(
        "success",
        actionType.value === "register"
          ? "Inscription réussie ! N'oubliez pas de venir vous check-in 24h avant le tournoi."
          : "Vous avez été ajouté à la liste d'attente. Vous serez automatiquement inscrit si des places se libèrent."
      );
    } else if (
      (actionType.value === "unregister" ||
        actionType.value === "unregister-waitlist") &&
      selectedTournament.value._id
    ) {
      await tournamentService.unregisterPlayer(
        selectedTournament.value._id,
        user.value._id
      );
      success = true;

      showMessage(
        "success",
        actionType.value === "unregister"
          ? "Désinscription effectuée avec succès."
          : "Vous avez été retiré de la liste d'attente."
      );
    }

    if (success && selectedTournament.value._id) {
      await fetchTournament();
    }

    closePopup();
  } catch (err) {
    console.error("Erreur lors de l'action:", err);
    showMessage("error", `Erreur lors de l'action.`);
    closePopup();
  }
};

/**
 * Gère le check-in d'un joueur
 */
const checkIn = async (tournamentId: string, checkedIn: boolean) => {
  if (!user.value) return;

  isCheckedIn.value = checkedIn;

  try {
    await tournamentService.checkInPlayer(
      tournamentId,
      user.value._id,
      checkedIn
    );
    showMessage(
      "success",
      checkedIn ? "Check-in confirmé !" : "Check-in annulé."
    );
    await fetchTournament();
  } catch (err) {
    isCheckedIn.value = !checkedIn;
    console.error("Erreur lors du check-in:", err);
    showMessage(
      "error",
      `Erreur: Impossible de ${checkedIn ? "confirmer" : "annuler"
      } le check-in.`
    );
  }
};

/**
 * Inscription sans définir de niveau
 */
const registerWithoutLevel = async () => {
  if (!user.value || !levelPromptTournamentId.value) return;

  try {
    closeLevelPrompt();
    await tournamentService.registerPlayer(
      levelPromptTournamentId.value,
      user.value._id
    );
    showMessage(
      "success",
      "Inscription réussie ! N'oubliez pas de venir vous check-in 24h avant le tournoi."
    );
    await fetchTournament();
  } catch (error) {
    console.error("Erreur lors de l'inscription sans niveau:", error);
    showMessage(
      "error",
      "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
    );
  }
};

/**
 * Redirection vers la définition de niveau
 */
const goToLevelDefinition = () => {
  router.push({
    path: "/player-level",
    query: {
      gameId: levelPromptGameId.value,
      redirect: route.fullPath,
      tournamentId: levelPromptTournamentId.value,
      autoRegister: "true",
    },
  });
};

/**
 * Redirection vers la page de niveau
 */
const redirectToPlayerLevel = () => {
  router.push({
    path: "/player-level",
    query: {
      gameId: tournament.value?.game._id || "",
      redirect: route.fullPath,
      tournamentId: tournament.value?._id || "",
      autoRegister: "false",
    },
  });
};

/**
 * Ferme la popup de niveau
 */
const closeLevelPrompt = () => {
  showLevelPrompt.value = false;
  levelPromptGameId.value = "";
  levelPromptGameName.value = "";
};

/**
 * Bascule des autres classements
 */
const toggleOtherRankings = () => {
  showOtherRankings.value = !showOtherRankings.value;
};

/**
 * Scroll vers le haut
 */
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/**
 * Gestion de l'erreur d'image
 */
const handleImageError = () => {
  imageError.value = true;
};

// ========================================
// MÉTHODES UTILITAIRES
// ========================================

/**
 * Affiche un message de notification
 */
const showMessage = (
  type: "success" | "error",
  message: string,
  duration: number = 3000
) => {
  success.value = null;
  error.value = null;

  if (type === "success") {
    success.value = message;
  } else {
    error.value = message;
  }

  setTimeout(() => {
    if (type === "success") {
      success.value = null;
    } else {
      error.value = null;
    }
  }, duration);
};

/**
 * Formate le temps d'attente
 */
const formatWaitingTime = (playerId: string) => {
  if (
    !tournament.value ||
    !tournament.value.waitlistRegistrationDates ||
    !playerId
  ) {
    return "Date inconnue";
  }

  let waitDate = null;

  if (
    typeof tournament.value.waitlistRegistrationDates === "object" &&
    !Array.isArray(tournament.value.waitlistRegistrationDates)
  ) {
    waitDate = tournament.value.waitlistRegistrationDates[playerId];
  } else if (tournament.value.waitlistRegistrationDates instanceof Map) {
    waitDate = tournament.value.waitlistRegistrationDates.get(playerId);
  }

  if (!waitDate) return "Date inconnue";

  const waitTimeMs = Date.now() - new Date(waitDate).getTime();
  const days = Math.floor(waitTimeMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (waitTimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((waitTimeMs % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days} jour${days > 1 ? "s" : ""} et ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h et ${minutes}min`;
  } else {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }
};

/**
 * Formate la date locale
 */
const formatLocalDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Compte le nombre de participants
 */
const getParticipantsCount = () => {
  if (!tournament.value?.players) return 0;
  return tournament.value.players.length;
};

/**
 * Formate la description
 */
const formatDescription = (description: string) => {
  if (!description) return "";
  return description.replace(/\.(\s|$)/g, ".<br>$1").replace(/<br>$/, "");
};

/**
 * Récupère les équipes gagnantes
 */
const getWinningTeams = (tournament: Tournament) => {
  if (!tournament.teams) return [];
  return tournament.teams.filter((team) => team.ranking === 1);
};

const generateGoogleCalendarLink = (dateString: string) => {
  try {
    if (!dateString) return '#';
    const start = new Date(dateString);
    if (isNaN(start.getTime())) return '#';

    // Durée par défaut: 3h
    const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);

    const format = (d: Date) =>
      d.toISOString()
        .replace(/[-:]/g, '')
        .replace(/\.\d{3}Z$/, 'Z'); // YYYYMMDDTHHMMSSZ

    const startStr = format(start);
    const endStr = format(end);

    const text = tournament.value?.name ?? 'Tournoi ACS';
    const location =
      tournament.value?.discordChannelName ??
      tournament.value?.game?.name ??
      'ACS';
    const details = `Plus d'infos: https://acscrim.fr/tournois/${tournament.value?._id ?? ''}`;

    const url = new URL('https://www.google.com/calendar/render');
    url.searchParams.set('action', 'TEMPLATE');
    url.searchParams.set('text', text);
    url.searchParams.set('location', location);
    url.searchParams.set('details', details);
    url.searchParams.set('dates', `${startStr}/${endStr}`);

    return url.toString();
  } catch {
    return '#';
  }
};

const generateOutlookCalendarLink = (dateString: string) => {
  try {
    if (!dateString) return '#';
    const start = new Date(dateString);
    if (isNaN(start.getTime())) return '#';

    // Durée par défaut: 3h
    const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);

    const format = (d: Date) =>
      d.toISOString().replace(/\.\d{3}Z$/, 'Z'); // YYYY-MM-DDTHH:mm:ssZ

    const startIso = format(start);
    const endIso = format(end);

    const subject = tournament.value?.name ?? 'Tournoi ACS';
    const location =
      tournament.value?.discordChannelName ??
      tournament.value?.game?.name ??
      'ACS';
    const body = `Plus d'infos: https://acscrim.fr/tournois/${tournament.value?._id ?? ''}`;

    // Outlook grand public (live.com). Pour Microsoft 365, utilisez outlook.office.com
    const url = new URL('https://outlook.live.com/calendar/0/deeplink/compose');
    // const url = new URL('https://outlook.office.com/calendar/0/deeplink/compose');

    url.searchParams.set('subject', subject);
    url.searchParams.set('startdt', startIso);
    url.searchParams.set('enddt', endIso);
    url.searchParams.set('body', body);
    url.searchParams.set('location', location);

    return url.toString();
  } catch {
    return '#';
  }
};

// ========================================
// WATCHERS ET CYCLE DE VIE
// ========================================

watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      fetchTournament();
    }
  }
);

let streamUpdateInterval: number | null = null;

onMounted(() => {
  fetchTournament();

  // Actualisation automatique des streams toutes les 30 secondes si le tournoi est aujourd'hui
  if (isTournamentToday.value) {
    streamUpdateInterval = setInterval(updateStreamData, 30000);
  }
});

onUnmounted(() => {
  // Nettoyage de l'intervalle
  if (streamUpdateInterval) {
    clearInterval(streamUpdateInterval);
  }
});

//  Watcher pour mettre à jour les streams quand l'onglet change
watch(activeTab, (newTab) => {
  if (newTab === "participants" && isTournamentToday.value) {
    updateStreamData();
  }
});
</script>

<style scoped>
/* Animation pour les transitions entre onglets */
.space-fade-in {
  animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animation pour l'indicateur de position */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translate(-50%, 20px);
  }

  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

/* Style d'animation pour l'indicateur de position */
.fixed.bottom-8 {
  animation: fade-in-up 0.5s ease-out;
}

/* Améliore la présentation des onglets */
.space-tabs {
  scrollbar-width: thin;
  scrollbar-color: var(--space-bg-light) transparent;
}

.space-tabs::-webkit-scrollbar {
  height: 4px;
}

.space-tabs::-webkit-scrollbar-track {
  background: transparent;
}

.space-tabs::-webkit-scrollbar-thumb {
  background-color: var(--space-bg-light);
  border-radius: 4px;
}

/* Responsive breakpoints personnalisés */
@media (max-width: 440px) {
  .xs\:hidden {
    display: none;
  }

  .xs\:inline {
    display: inline;
  }
}

/* Amélioration de la gestion du texte sur mobile */
@media (max-width: 640px) {
  .tournament-details {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* Ajustement des grilles sur très petits écrans */
  .grid-cols-1 {
    grid-template-columns: 1fr;
  }

  /* Espacement réduit sur mobile */
  .space-y-3>*+* {
    margin-top: 0.75rem;
  }

  .space-y-4>*+* {
    margin-top: 1rem;
  }

  /* Padding réduit pour les cartes sur mobile */
  .mobile-card-padding {
    padding: 0.75rem;
  }
}

/* Optimisation pour les très petits écrans */
@media (max-width: 375px) {
  .container {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  /* Réduction de la taille des badges sur très petits écrans */
  .space-badge-xs {
    font-size: 0.6rem;
    padding: 0.125rem 0.25rem;
  }
}

/* Amélioration de la scrollabilité horizontale des onglets */
.space-tabs {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

/* Amélioration des interactions tactiles sur mobile */
@media (hover: none) and (pointer: coarse) {
  .hover\:scale-105:hover {
    transform: scale(1.02);
    transition: transform 0.2s ease;
  }

  .hover\:bg-space-bg-light\/10:hover {
    background-color: rgba(var(--space-bg-light-rgb), 0.15);
  }
}

/* Fix pour les éléments fixed sur mobile */
@media (max-width: 640px) {
  .fixed.bottom-4.right-4 {
    bottom: 1rem;
    right: 1rem;
    z-index: 40;
  }
}

/* Amélioration de la lisibilité sur mobile */
@media (max-width: 640px) {
  .text-xs {
    font-size: 0.7rem;
  }

  .text-sm {
    font-size: 0.8rem;
  }

  .text-base {
    font-size: 0.9rem;
  }
}

/* Scrollbar fine pour les éléments en overflow */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.7);
}
</style>
