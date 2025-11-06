<!-- filepath: d:\Dev\ACS\acs-frontend\src\views\Profil.vue -->
<template>
  <div class="container mx-auto p-4 pt-20 min-h-screen">
    <!-- Navigation latérale -->
    <div
      class="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
    >
      <SpaceCard variant="dark" className="p-3 space-y-1">
        <div class="text-xs text-space-primary font-nasa mb-2 px-2 text-center">
          NAVIGATION
        </div>

        <button
          v-for="section in navigationSections"
          :key="section.id"
          @click="scrollToSection(section.id)"
          :class="[
            'w-full text-left px-3 py-2 text-xs font-nasa rounded transition-all duration-200 flex items-center space-x-2',
            activeSection === section.id
              ? 'bg-space-primary/20 text-space-primary-light border-l-2 border-space-primary'
              : 'text-space-text-muted hover:text-space-primary hover:bg-space-primary/10',
          ]"
          :title="section.label"
        >
          <svg
            class="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            v-html="section.icon"
          ></svg>
          <span class="truncate">{{ section.shortLabel }}</span>
        </button>
      </SpaceCard>
    </div>

    <!-- État d'erreur -->
    <SpaceTerminal
      v-if="error"
      command="get_player_profile --id=${route.params.id}"
      :message="error"
      title="SYSTÈME DE PROFIL · ACS"
      className="max-w-4xl mx-auto my-8"
    />

    <!-- Profil du joueur -->
    <div v-else-if="player" class="max-w-4xl mx-auto">
      <!-- En-tête du profil -->
      <SpaceCard
        id="profil"
        variant="primary"
        section="profile"
        :stars="true"
        :decorated="true"
        className="mb-8 overflow-hidden"
      >
        <!-- Structure simplifiée : tout centré -->
        <div class="text-center">
          <!-- Avatar centré -->
          <div class="avatar-container inline-block mb-4">
            <img
              v-if="user && user.avatarUrl"
              :src="user.avatarUrl"
              alt="Avatar"
              class="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border-2 border-space-primary shadow-glow-primary"
              loading="lazy"
              @error="handleImageError"
            />
            <div
              v-else
              class="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-space-bg-light flex items-center justify-center border-2 border-space-primary mx-auto"
            >
              <span class="text-space-primary text-2xl sm:text-3xl font-bold">
                {{ getInitials(player.username) }}
              </span>
            </div>
          </div>

          <!-- Nom centré -->
          <SpaceTitle
            size="4xl"
            :glitch="true"
            :decorated="true"
            className="capitalize break-words mb-4"
            :class="[
              player.username.length > 15
                ? 'text-2xl sm:text-4xl'
                : player.username.length > 10
                ? 'text-3xl sm:text-5xl'
                : 'text-4xl sm:text-5xl',
            ]"
          >
            {{ player.username }}
          </SpaceTitle>

          <!-- Barre parfaitement centrée sous le nom -->
          <div
            class="w-32 h-1 bg-gradient-to-r from-space-primary to-space-secondary rounded-full mx-auto"
          ></div>

          <!-- Titres de Champion de Saisons -->
          <div v-if="seasonChampionships.length > 0" class="mt-6">
            <div class="flex flex-wrap justify-center gap-2">
              <SpaceBadge
                v-for="championship in seasonChampionships"
                :key="championship.seasonId"
                variant="gold"
                size="lg"
                :filled="true"
                className="transform transition-all hover:scale-110 duration-300 shadow-glow-gold animate-pulse"
                :title="`Champion de la saison ${championship.seasonNumber} avec ${championship.totalVictories} victoires en ${championship.totalTournaments} tournois`"
              >
                <div class="flex items-center space-x-2">
                  <span class="text-lg">👑</span>
                  <span class="font-bold">
                    {{
                      championship.seasonNumber === 0
                        ? "Alors ça chill"
                        : `Saison ${championship.seasonNumber}`
                    }}
                  </span>
                </div>
              </SpaceBadge>
            </div>
            <div class="text-center mt-2">
              <span
                class="text-xs text-space-gold font-nasa uppercase tracking-wide"
              >
                {{
                  seasonChampionships.length === 1
                    ? "Champion"
                    : "Multi-Champion"
                }}
              </span>
            </div>
          </div>
        </div>
      </SpaceCard>
      <!-- Section des statistiques - Version simplifiée -->
      <SpaceCard
        id="statistiques"
        variant="secondary"
        section="statistics"
        :stars="true"
        :decorated="true"
        className="mb-8 transform transition-all hover:scale-[1.02] duration-300 section-statistiques"
      >
        <div class="flex items-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-3 text-space-secondary"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
            />
          </svg>
          <SpaceTitle size="2xl">Statistiques</SpaceTitle>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SpaceCard
            variant="dark"
            className="text-center transform transition-all hover:scale-105 hover:bg-space-bg-light/90 duration-300"
          >
            <div class="text-3xl font-bold text-space-accent mb-1">
              {{ playerRanking?.totalVictories || 0 }}
            </div>
            <div class="text-space-text-muted text-sm">Victoires</div>
          </SpaceCard>
          <SpaceCard
            variant="dark"
            className="text-center transform transition-all hover:scale-105 hover:bg-space-bg-light/90 duration-300"
          >
            <div class="text-3xl font-bold text-space-secondary mb-1">
              {{ playerRanking?.totalTournaments || 0 }}
            </div>
            <div class="text-space-text-muted text-sm">Tournois</div>
          </SpaceCard>
        </div>
      </SpaceCard>
      <!-- Section Palmarès avec podium -->
      <SpaceCard
        id="palmares"
        variant="accent"
        section="medals"
        :stars="true"
        :decorated="true"
        className="mb-8 transform transition-all hover:scale-[1.02] duration-300"
      >
        <div class="flex items-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-3 text-space-accent"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          <SpaceTitle size="2xl">Palmarès</SpaceTitle>
        </div>

        <!-- Visualisation du podium -->
        <div class="flex justify-center mb-6 relative py-10">
          <!-- Podium avec positions -->
          <div class="flex items-end h-40 space-x-1 sm:space-x-3">
            <!-- 2ème place (argent) -->
            <div class="flex flex-col items-center">
              <div v-if="medalCount.silver > 0" class="relative mb-2">
                <img
                  :src="
                    user?.avatarUrl ||
                    'https://cdn.discordapp.com/embed/avatars/0.png'
                  "
                  alt="Avatar"
                  class="w-12 h-12 rounded-full object-cover border-2 border-space-silver shadow-glow"
                />
                <SpaceBadge
                  variant="silver"
                  size="sm"
                  :filled="true"
                  className="absolute -bottom-1 -right-1 flex items-center justify-center font-bold"
                >
                  2
                </SpaceBadge>
              </div>
              <div
                class="w-16 sm:w-24 bg-gradient-to-t from-space-silver to-space-secondary rounded-t-md flex items-center justify-center h-24 border-t border-l border-r border-space-silver shadow-inner relative overflow-hidden podium-column podium-silver"
              >
                <div
                  class="absolute inset-0 bg-space-secondary/50 scanline"
                ></div>
                <span
                  class="text-xl sm:text-2xl font-bold font-nasa text-space-bg z-10"
                  >{{ medalCount.silver }}</span
                >
              </div>
            </div>

            <!-- 1ère place (or) - plus haute -->
            <div class="flex flex-col items-center">
              <div v-if="medalCount.gold > 0" class="relative mb-2">
                <img
                  :src="
                    user?.avatarUrl ||
                    'https://cdn.discordapp.com/embed/avatars/0.png'
                  "
                  alt="Avatar"
                  class="w-14 h-14 rounded-full object-cover border-2 border-space-gold shadow-glow"
                />
                <SpaceBadge
                  variant="gold"
                  size="sm"
                  :filled="true"
                  className="absolute -bottom-1 -right-1 flex items-center justify-center animate-pulse font-bold"
                >
                  1
                </SpaceBadge>
              </div>
              <div
                class="w-16 sm:w-24 bg-gradient-to-t from-space-gold to-space-accent rounded-t-md flex items-center justify-center h-32 border-t border-l border-r border-space-gold shadow-inner shadow-space-gold/20 relative overflow-hidden podium-column podium-gold"
              >
                <div class="absolute inset-0 bg-space-accent/50 scanline"></div>
                <span
                  class="text-xl sm:text-2xl font-bold font-nasa text-space-bg z-10"
                  >{{ medalCount.gold }}</span
                >
              </div>
            </div>

            <!-- 3ème place (bronze) -->
            <div class="flex flex-col items-center">
              <div v-if="medalCount.bronze > 0" class="relative mb-2">
                <img
                  :src="
                    user?.avatarUrl ||
                    'https://cdn.discordapp.com/embed/avatars/0.png'
                  "
                  alt="Avatar"
                  class="w-10 h-10 rounded-full object-cover border-2 border-space-bronze shadow-glow"
                />
                <SpaceBadge
                  variant="bronze"
                  size="sm"
                  :filled="true"
                  className="absolute -bottom-1 -right-1 flex items-center justify-center font-bold"
                >
                  3
                </SpaceBadge>
              </div>
              <div
                class="w-16 sm:w-24 bg-gradient-to-t from-space-bronze to-space-primary rounded-t-md flex items-center justify-center h-16 border-t border-l border-r border-space-bronze shadow-inner relative overflow-hidden podium-column podium-bronze"
              >
                <div
                  class="absolute inset-0 bg-space-primary/50 scanline"
                ></div>
                <span
                  class="text-xl sm:text-2xl font-bold font-nasa text-space-bg z-10"
                  >{{ medalCount.bronze }}</span
                >
              </div>
            </div>
          </div>
          <!-- Base du podium -->
          <div
            class="absolute bottom-0 bg-gradient-to-r from-space-primary/30 via-space-accent/40 to-space-secondary/30 h-4 w-full max-w-md rounded-md border-t border-space-primary/50 podium-base"
          ></div>
        </div>

        <!-- Statistiques des médailles -->
        <div class="flex flex-wrap justify-center gap-4 mb-4">
          <!-- Argent -->
          <SpaceCard
            variant="silver"
            :stars="true"
            className="text-center transform transition-all hover:scale-105 duration-300 min-w-[200px] flex-1 max-w-[250px]"
          >
            <div class="text-space-silver text-lg font-nasa mb-1">
              🥈 Argent
            </div>
            <div class="text-2xl font-bold text-white">
              {{ medalCount.silver }}
            </div>
            <div class="text-xs text-space-text-muted">2e places</div>
          </SpaceCard>
          <!-- Or -->
          <SpaceCard
            variant="gold"
            :stars="true"
            className="text-center transform transition-all hover:scale-105 duration-300 min-w-[200px] flex-1 max-w-[250px]"
          >
            <div class="text-space-gold text-lg font-nasa mb-1">🥇 Or</div>
            <div class="text-2xl font-bold text-white">
              {{ medalCount.gold }}
            </div>
            <div class="text-xs text-space-text-muted">victoires</div>
          </SpaceCard>

          <!-- Bronze -->
          <SpaceCard
            variant="bronze"
            :stars="true"
            className="text-center transform transition-all hover:scale-105 duration-300 min-w-[200px] flex-1 max-w-[250px]"
          >
            <div class="text-space-bronze text-lg font-nasa mb-1">
              🥉 Bronze
            </div>
            <div class="text-2xl font-bold text-white">
              {{ medalCount.bronze }}
            </div>
            <div class="text-xs text-space-text-muted">3e places</div>
          </SpaceCard>
        </div>
      </Card>
      <!-- Section Activité et engagement -->
      <SpaceCard
        id="activite"
        variant="secondary"
        section="activity"
        :stars="true"
        :decorated="true"
        className="mb-8 transform transition-all hover:scale-[1.02] duration-300"
      >
        <div class="flex items-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-3 text-space-secondary"
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
          <SpaceTitle size="2xl">Activité</SpaceTitle>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <!-- Membre depuis -->
          <SpaceCard
            variant="dark"
            className="text-center transform transition-all hover:scale-105 duration-300"
          >
            <div class="text-space-primary-light text-lg font-nasa mb-1">
              📅 Membre
            </div>
            <div class="text-2xl font-bold text-white font-mono">
              {{ memberSince }}
            </div>
            <div class="text-xs text-space-text-muted">depuis</div>
          </SpaceCard>

          <!-- Dernière activité -->
          <SpaceCard
            variant="dark"
            className="text-center transform transition-all hover:scale-105 duration-300"
          >
            <div class="text-space-secondary-light text-lg font-nasa mb-1">
              ⚡ Activité
            </div>
            <div class="text-2xl font-bold text-white font-mono">
              {{ lastSeen }}
            </div>
            <div class="text-xs text-space-text-muted">dernière fois</div>
          </SpaceCard>

          <!-- Participation totale -->
          <SpaceCard
            variant="dark"
            className="text-center transform transition-all hover:scale-105 duration-300"
          >
            <div class="text-space-accent-light text-lg font-nasa mb-1">
              🎯 Participation
            </div>
            <div class="text-2xl font-bold text-white font-mono">
              {{ participationStreak }}
            </div>
            <div class="text-xs text-space-text-muted">tournois joués</div>
          </SpaceCard>
        </div>
      </SpaceCard>
      <!-- Section Performance par jeu -->
      <SpaceCard
        id="performance"
        variant="primary"
        section="performance"
        :stars="true"
        :decorated="true"
        className="mb-8 transform transition-all hover:scale-[1.02] duration-300"
      >
        <!-- Titre et bouton d'expansion -->
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
        >
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 mr-3 text-space-primary flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            <SpaceTitle size="2xl">Performance par jeu</SpaceTitle>
          </div>

          <SpaceButton
            v-if="gameStats.length > 3"
            @click="expandedGameStats = !expandedGameStats"
            :variant="expandedGameStats ? 'secondary' : 'primary'"
            size="sm"
          >
            {{
              expandedGameStats ? "RÉDUIRE" : `TOUT VOIR (${gameStats.length})`
            }}
          </SpaceButton>
        </div>

        <div v-if="gameStats.length > 0" class="space-y-4">
          <SpaceCard
            v-for="gameStat in displayedGameStats"
            :key="gameStat.gameId"
            variant="dark"
            className="transform transition-all hover:scale-[1.02] duration-300 border-l-4 border-l-space-primary"
          >
            <!-- Structure responsive avec flex-col sur mobile -->
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <!-- Partie gauche : Image + Info -->
              <div class="flex items-center flex-1 min-w-0">
                <div class="relative mr-4 flex-shrink-0">
                  <img
                    v-if="gameStat.gameImage"
                    :src="gameStat.gameImage"
                    :alt="gameStat.gameName"
                    class="w-12 h-12 rounded-lg object-cover border-2 border-space-primary/50"
                    @error="handleImageError"
                  />
                  <div
                    v-else
                    class="w-12 h-12 rounded-lg bg-space-bg-light flex items-center justify-center border-2 border-space-primary/50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-space-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-9 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"
                      />
                    </svg>
                  </div>
                </div>

                <div class="min-w-0 flex-1">
                  <h5 class="font-nasa text-base truncate">
                    {{ gameStat.gameName }}
                  </h5>
                  <div class="flex items-center space-x-3 mt-1 flex-wrap">
                    <span class="text-space-primary-light font-mono text-sm"
                      >{{ gameStat.wins }}V</span
                    >
                    <span class="text-space-error font-mono text-sm"
                      >{{ gameStat.losses }}D</span
                    >
                    <span class="text-space-text-muted text-sm"
                      >{{ gameStat.totalPlayed }} parties</span
                    >
                  </div>
                </div>
              </div>
              <!-- Partie droite responsive -->
              <div
                class="flex items-center justify-between sm:flex-col sm:items-end sm:justify-center"
              >
                <!-- Taux de victoire -->
                <div class="flex items-center sm:text-right sm:mb-2">
                  <div
                    class="text-2xl font-bold text-space-primary-light font-mono mr-2 sm:mr-0"
                  >
                    {{ gameStat.winRate }}
                  </div>
                  <div
                    class="text-xs text-space-text-muted sm:text-center ml-2"
                  >
                    % taux de victoire
                  </div>
                </div>

                <!-- Barre de progression -->
                <div
                  class="w-16 sm:w-32 h-2 bg-[var(--space-bg-light)] rounded-full overflow-hidden ml-4 sm:ml-0 mt-2"
                >
                  <div
                    class="h-full bg-[var(--space-primary)] rounded-full"
                    :style="`width: ${gameStat.winRate}%`"
                  ></div>
                </div>
              </div>
            </div>
          </SpaceCard>
        </div>

        <SpaceTerminal
          v-else
          command="search --stats --games"
          title="Recherche de statistiques"
          :showCursor="true"
        >
          <div class="text-space-text-muted">
            Aucune donnée de performance disponible
          </div>
        </SpaceTerminal>
      </SpaceCard>
      <!-- Section Statistiques sociales -->
      <SpaceCard
        id="collaborations"
        variant="secondary"
        section="collaborations"
        :stars="true"
        :decorated="true"
        className="mb-8 transform transition-all hover:scale-[1.02] duration-300"
      >
        <!-- Titre et bouton d'expansion -->
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
        >
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 mr-3 text-space-secondary flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 01-5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <SpaceTitle size="2xl">Collaborations</SpaceTitle>
          </div>

          <SpaceButton
            v-if="totalCollaborators > 5"
            @click="expandedCollaborations = !expandedCollaborations"
            :variant="expandedCollaborations ? 'primary' : 'secondary'"
            size="sm"
          >
            {{
              expandedCollaborations
                ? "RÉDUIRE"
                : `TOUT VOIR (${totalCollaborators})`
            }}
          </SpaceButton>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Coéquipiers fréquents -->
          <div>
            <h3
              class="text-xl font-nasa text-space-secondary-light mb-4 flex items-center justify-between"
            >
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
                Coéquipiers fréquents
              </div>

              <!-- Compteur pour cette section -->
              <SpaceBadge variant="secondary" size="sm">
                {{ socialStats.frequentTeammates.length }}
              </SpaceBadge>
            </h3>

            <div
              v-if="socialStats.frequentTeammates.length > 0"
              class="space-y-3"
            >
              <SpaceCard
                v-for="teammate in displayedFrequentTeammates"
                :key="teammate.playerId"
                variant="dark"
                className="transform transition-all hover:scale-[1.02] duration-300 p-3 border-l-4 border-l-space-secondary"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center flex-1 min-w-0">
                    <div
                      class="w-10 h-10 rounded-full bg-space-bg-light border-2 border-space-secondary/50 flex items-center justify-center mr-3 flex-shrink-0"
                    >
                      <span class="text-space-secondary-light font-bold">
                        {{ teammate.username.charAt(0).toUpperCase() }}
                      </span>
                    </div>

                    <router-link
                      :to="{
                        name: 'Profil',
                        params: { id: teammate.playerId },
                      }"
                      class="text-space-text hover:text-space-secondary-light transition-colors truncate"
                    >
                      {{ teammate.username }}
                    </router-link>
                  </div>
                  <div class="text-right flex items-center ml-3">
                    <div
                      class="text-lg font-bold text-space-secondary-light font-mono"
                    >
                      {{ teammate.count }}
                    </div>
                    <div
                      class="text-xs text-space-text-muted ml-2 whitespace-nowrap"
                    >
                      équipes
                    </div>
                  </div>
                </div>
              </SpaceCard>

              <!-- Indicateur s'il y a plus d'éléments cachés -->
              <div
                v-if="
                  !expandedCollaborations &&
                  socialStats.frequentTeammates.length > 5
                "
                class="text-center py-2"
              >
                <span class="text-xs text-space-text-muted font-mono">
                  ... et {{ socialStats.frequentTeammates.length - 5 }} autres
                  coéquipiers
                </span>
              </div>
            </div>

            <SpaceTerminal
              v-else
              command="search --teammates"
              title="Recherche de coéquipiers"
              :showCursor="true"
            >
              <div class="text-space-text-muted">
                Aucune collaboration répétée
              </div>
            </SpaceTerminal>
          </div>

          <!-- Partenaires de victoire -->
          <div>
            <h3
              class="text-xl font-nasa text-space-accent-light mb-4 flex items-center justify-between"
            >
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-2"
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
                Partenaires de victoire
              </div>

              <!-- Compteur pour cette section -->
              <SpaceBadge variant="accent" size="sm">
                {{ socialStats.winningPartners.length }}
              </SpaceBadge>
            </h3>

            <div
              v-if="socialStats.winningPartners.length > 0"
              class="space-y-3"
            >
              <SpaceCard
                v-for="partner in displayedWinningPartners"
                :key="partner.playerId"
                variant="dark"
                className="transform transition-all hover:scale-105 duration-300 p-3 border-l-4 border-l-space-accent"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center flex-1 min-w-0">
                    <div
                      class="w-10 h-10 rounded-full bg-space-bg-light border-2 border-space-accent/50 flex items-center justify-center mr-3 flex-shrink-0"
                    >
                      <span class="text-space-accent-light font-bold">
                        {{ partner.username.charAt(0).toUpperCase() }}
                      </span>
                    </div>

                    <router-link
                      :to="{ name: 'Profil', params: { id: partner.playerId } }"
                      class="text-space-text hover:text-space-accent-light transition-colors truncate"
                    >
                      {{ partner.username }}
                    </router-link>
                  </div>
                  <div class="text-right flex items-center ml-3">
                    <div
                      class="text-lg font-bold text-space-accent-light font-mono flex items-center"
                    >
                      {{ partner.wins }}
                    </div>
                    <div
                      class="text-xs text-space-text-muted ml-2 whitespace-nowrap flex items-center"
                    >
                      <span class="mr-1">victoires</span> 🏆
                    </div>
                  </div>
                </div>
              </SpaceCard>

              <!-- Indicateur s'il y a plus d'éléments cachés -->
              <div
                v-if="
                  !expandedCollaborations &&
                  socialStats.winningPartners.length > 5
                "
                class="text-center py-2"
              >
                <span class="text-xs text-space-text-muted font-mono">
                  ... et {{ socialStats.winningPartners.length - 5 }} autres
                  partenaires
                </span>
              </div>
            </div>

            <SpaceTerminal
              v-else
              command="search --partners --wins"
              title="Recherche de partenaires"
              :showCursor="true"
            >
              <div class="text-space-text-muted">Aucune victoire en équipe</div>
            </SpaceTerminal>
          </div>
        </div>
      </SpaceCard>
      <!-- Section des badges -->
      <SpaceCard
        id="badges"
        variant="primary"
        section="badges"
        :stars="true"
        :decorated="true"
        className="mb-8 transform transition-all hover:scale-[1.02] duration-300"
      >
        <div class="flex items-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-3 text-space-primary"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <SpaceTitle size="2xl">
            Badges
            <SpaceBadge variant="primary" size="sm" className="ml-2">
              {{ badgeCount }}
            </SpaceBadge>
          </SpaceTitle>
        </div>

        <div
          v-if="hasBadges"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <SpaceCard
            v-for="badge in player.badges"
            :key="badge._id"
            variant="dark"
            className="flex flex-col items-center transform transition-all hover:scale-110 hover:shadow-glow-primary duration-300 cursor-pointer p-4"
            @click="selectBadge(badge)"
          >
            <div class="flex flex-col items-center h-full justify-center">
              <img
                :src="badge.imageUrl"
                :alt="badge.title"
                class="h-16 w-16 mb-3 rounded-full border-2 border-space-primary object-cover"
                loading="lazy"
                @error="handleImageError"
              />
              <span
                class="text-space-text text-center font-nasa text-sm line-clamp-2"
              >
                {{ badge.title }}
              </span>
            </div>
          </SpaceCard>
        </div>

        <SpaceTerminal
          v-else
          command="search --badges"
          title="Recherche de badges"
          :showCursor="true"
        >
          <div class="text-space-text-muted">
            Aucun badge obtenu pour le moment
          </div>
        </SpaceTerminal>
      </SpaceCard>
      <!-- Section Réalisations et progression -->
      <SpaceCard
        id="records"
        variant="accent"
        section="records"
        :stars="true"
        :decorated="true"
        className="mb-8 transform transition-all hover:scale-[1.02] duration-300"
      >
        <div class="flex items-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-3 text-space-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <SpaceTitle size="2xl">Records personnels</SpaceTitle>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <!-- Plus longue série de victoires -->
          <SpaceCard
            variant="dark"
            className="text-center transform transition-all hover:scale-105 duration-300"
          >
            <div class="text-space-primary-light text-lg font-nasa mb-1">
              🔥 Série
            </div>
            <div class="text-2xl font-bold text-white font-mono">
              {{ records.longestWinStreak }}
            </div>
            <div class="text-xs text-space-text-muted">
              victoires consécutives
            </div>
          </SpaceCard>

          <!-- Taux de top 25% -->
          <SpaceCard
            variant="dark"
            className="text-center transform transition-all hover:scale-105 duration-300"
          >
            <div class="text-space-secondary-light text-lg font-nasa mb-1">
              🎯 Top 25%
            </div>
            <div class="text-2xl font-bold text-white font-mono">
              {{ top25PercentRate }}%
            </div>
            <div class="text-xs text-space-text-muted">des tournois</div>
          </SpaceCard>

          <!-- Taux de victoire -->
          <SpaceCard
            variant="dark"
            className="text-center transform transition-all hover:scale-105 duration-300"
          >
            <div class="text-space-primary-light text-lg font-nasa mb-1">
              📊 Taux
            </div>
            <div class="text-2xl font-bold text-white font-mono">
              {{
                playerRanking?.totalTournaments
                  ? Math.round(
                      ((playerRanking?.totalVictories || 0) /
                        playerRanking.totalTournaments) *
                        100
                    )
                  : 0
              }}%
            </div>
            <div class="text-xs text-space-text-muted">de victoire</div>
          </SpaceCard>

          <!-- Taux de podium -->
          <SpaceCard
            variant="dark"
            className="text-center transform transition-all hover:scale-105 duration-300"
          >
            <div class="text-space-accent-light text-lg font-nasa mb-1">
              🏆 Podium
            </div>
            <div class="text-2xl font-bold text-white font-mono">
              {{
                playerRanking?.totalTournaments
                  ? Math.round(
                      ((medalCount.gold +
                        medalCount.silver +
                        medalCount.bronze) /
                        playerRanking.totalTournaments) *
                        100
                    )
                  : 0
              }}%
            </div>
            <div class="text-xs text-space-text-muted">de podiums</div>
          </SpaceCard>
        </div>

        <!-- Graphique de progression intégré -->
        <SpaceCard variant="dark" className="border border-space-accent/20">
          <h3
            class="text-lg font-nasa text-space-accent-light mb-4 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
              />
            </svg>
            Évolution des performances
          </h3>

          <!-- Graphique simple en CSS basé sur les données réelles -->
          <div
            class="h-48 bg-space-bg rounded-lg p-4 border border-space-bg-light/20"
          >
            <div v-if="tournamentProgression.length > 0" class="h-full">
              <div class="flex justify-between items-end h-full relative">
                <div
                  v-for="(month, index) in tournamentProgression"
                  :key="index"
                  class="flex flex-col items-center flex-1 mx-0.5"
                >
                  <!-- Conteneur avec deux barres côte à côte -->
                  <div
                    class="flex items-end justify-center h-32 w-full space-x-1"
                  >
                    <!-- Barre victoires (primary) -->
                    <div
                      v-if="month.victories > 0"
                      class="bg-gradient-to-t from-[var(--space-primary-dark)] to-[var(--space-primary-light)] rounded-t w-2/5"
                      :style="`height: ${Math.max(
                        (month.victories / maxOverallValue) * 100,
                        8
                      )}%`"
                      :title="`${month.victories} victoires en ${month.name}`"
                    ></div>

                    <!-- Placeholder pour victoires si aucune -->
                    <div v-else class="w-2/5 h-1 bg-transparent"></div>

                    <!-- Barre podiums (accent) -->
                    <div
                      v-if="month.podiums > month.victories"
                      class="bg-gradient-to-t from-orange-700 to-orange-400 rounded-t w-2/5"
                      :style="`height: ${Math.max(
                        ((month.podiums - month.victories) / maxOverallValue) *
                          100,
                        8
                      )}%`"
                      :title="`${
                        month.podiums - month.victories
                      } autres podiums en ${month.name}`"
                    ></div>

                    <!-- Placeholder pour podiums si aucun -->
                    <div v-else class="w-2/5 h-1 bg-transparent"></div>
                  </div>

                  <!-- Label du mois -->
                  <div
                    class="text-xs text-space-text-muted mt-2 font-mono text-center"
                  >
                    {{ month.name }}
                  </div>

                  <!-- Statistiques -->
                  <div
                    class="text-xs font-mono text-center mt-1 flex space-x-1"
                  >
                    <span
                      v-if="month.victories > 0"
                      class="text-space-primary-light"
                    >
                      {{ month.victories }}V
                    </span>
                    <span
                      v-if="month.podiums > month.victories"
                      class="text-space-accent-light"
                    >
                      {{ month.podiums - month.victories }}P
                    </span>
                    <span
                      v-if="month.podiums === 0 && month.victories === 0"
                      class="text-space-text-muted"
                    >
                      -
                    </span>
                  </div>
                </div>
              </div>

              <!-- Légende -->
              <div class="flex justify-center mt-4 space-x-6">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-space-primary-light rounded"></div>
                  <span class="text-xs text-space-text-muted font-mono"
                    >Victoires</span
                  >
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-space-accent-light rounded"></div>
                  <span class="text-xs text-space-text-muted font-mono"
                    >Autres podiums</span
                  >
                </div>
              </div>
            </div>

            <!-- État vide si pas de données -->
            <SpaceTerminal
              v-else
              command="analyze --performance-data"
              title="Analyse des performances"
              :showCursor="true"
            >
              <div class="text-space-text-muted">
                Pas assez de données
                <p class="text-xs mt-1">Participez à plus de tournois</p>
              </div>
            </SpaceTerminal>
          </div>
        </SpaceCard>
      </SpaceCard>

      <!-- Section des tournois -->
      <SpaceCard
        id="tournois"
        variant="primary"
        :stars="true"
        :decorated="true"
        className="transform transition-all hover:scale-[1.02] duration-300"
      >
        <div class="flex items-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-3 text-space-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M2 2v5h5" />
            <path d="M2 7h12v5H2z" />
            <path d="M14 4v8" />
            <path d="M14 12h5v5h-5z" />
            <path d="M19 17h3v5h-3z" />
            <path d="M8 12v5h6" />
            <path d="M8 17h3v5H8z" />
          </svg>
          <SpaceTitle size="2xl">
            Tournois
            <SpaceBadge variant="primary" size="sm" className="ml-2">
              {{ tournamentCount }}
            </SpaceBadge>
          </SpaceTitle>
        </div>

        <!-- Options de tri pour les tournois -->
        <div v-if="hasTournaments" class="flex justify-end mb-4">
          <div class="relative">
            <select
              v-model="tournamentSort"
              class="appearance-none bg-space-bg border border-space-primary/50 text-space-primary-light text-sm font-mono px-3 py-1 pr-8 rounded-lg focus:outline-none focus:border-space-primary-light"
              aria-label="Trier les tournois"
            >
              <option value="date-desc">Plus récents d'abord</option>
              <option value="date-asc">Plus anciens d'abord</option>
              <option value="rank-asc">Meilleurs classements</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-space-primary-light"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Liste des tournois -->
        <div v-if="hasTournaments">
          <ul class="space-y-4">
            <li
              v-for="tournament in paginatedTournaments"
              :key="tournament._id"
              class="flex flex-col sm:flex-row items-start sm:items-center justify-between"
            >
              <SpaceCard variant="dark" className="w-full">
                <div
                  class="flex flex-col lg:flex-row lg:items-center justify-between w-full gap-3"
                >
                  <!-- Partie gauche : icône + nom du tournoi -->
                  <div class="flex items-center flex-1 min-w-0">
                    <div
                      class="h-8 w-8 rounded-full bg-space-primary/20 flex items-center justify-center mr-3 border border-space-primary/50 flex-shrink-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-space-primary-light"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <span class="text-space-text font-nasa truncate">{{
                      tournament.name
                    }}</span>
                  </div>

                  <!-- Partie droite : responsive avec date, badge et bouton -->
                  <div
                    class="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4"
                  >
                    <!-- Date -->
                    <span
                      class="text-space-text-muted text-sm font-mono order-1 sm:order-none"
                      >{{ formatDate(tournament.date) }}</span
                    >

                    <!-- Badge de placement -->
                    <SpaceBadge
                      v-if="tournament && 'rank' in tournament"
                      :variant="getRankingBadgeVariant(tournament.rank ?? 0)"
                      size="sm"
                      className="self-start sm:self-center order-2 sm:order-none"
                    >
                      <span class="text-xs sm:text-sm whitespace-nowrap">
                        {{ getRankingLabel(tournament.rank ?? 0) }} /
                        {{ tournament.numberOfTeams }}
                      </span>
                    </SpaceBadge>

                    <SpaceBadge v-if="tournament.isMvp" variant="gold">
                      MVP
                    </SpaceBadge>

                    <!-- Bouton détails -->
                    <router-link
                      :to="`/tournois/${tournament._id}`"
                      class="order-3 sm:order-none"
                    >
                      <SpaceButton variant="primary" size="xs" icon>
                        <template #icon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </template>
                        Détails
                      </SpaceButton>
                    </router-link>
                  </div>
                </div>
              </SpaceCard>
            </li>
          </ul>

          <!-- Pagination pour les tournois -->
          <div v-if="totalTournamentPages > 1" class="mt-6">
            <SpacePagination
              :current-page="currentTournamentPage"
              :total-pages="totalTournamentPages"
              @prev-page="prevTournamentPage"
              @next-page="nextTournamentPage"
              @page-select="currentTournamentPage = $event"
            />
          </div>
        </div>

        <SpaceTerminal
          v-else
          command="search --tournaments"
          title="Recherche de tournois"
          :showCursor="true"
        >
          <div class="text-space-text-muted">Aucun tournoi pour le moment</div>
        </SpaceTerminal>
      </SpaceCard>
    </div>

    <!-- filepath: d:\Dev\ACS\acs-frontend\src\views\Profil.vue -->
    <!-- Remplacer la div avec selectedBadge par ce code -->
    <SpaceModal
      v-model="selectedBadge"
      title="DÉTAILS DU BADGE"
      v-if="selectedBadge"
    >
      <!-- Badge showcase with enhanced visuals -->
      <div class="flex flex-col items-center">
        <!-- Large badge image with enhanced glow effect -->
        <div class="relative mb-4 group">
          <img
            :src="selectedBadge.imageUrl"
            :alt="selectedBadge.title"
            class="h-48 w-48 rounded-full border-4 border-space-primary object-cover group-hover:scale-105 transition-transform duration-500"
            @error="handleImageError"
          />
          <div class="absolute inset-0 rounded-full shadow-glow-primary"></div>
        </div>

        <!-- Badge title with enhanced styling -->
        <SpaceTitle size="xl" :glitch="true" className="mb-2 text-center">
          {{ selectedBadge.title }}
        </SpaceTitle>

        <!-- Badge description with background -->
        <SpaceCard variant="dark" className="w-full mt-2">
          <p class="text-space-text text-sm text-center">
            {{
              selectedBadge.description ||
              "Ce badge est une récompense mystérieuse. Aucune description disponible."
            }}
          </p>
        </SpaceCard>
      </div>

      <template #footer>
        <div class="flex justify-center">
          <SpaceButton @click="selectedBadge = null" variant="primary">
            Fermer
          </SpaceButton>
        </div>
      </template>
    </SpaceModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import playerService from "../services/playerService";
import userService from "../services/userService";
import type {
  Player,
  PlayerRanking,
  Badge,
  User,
  ExtendedStats,
} from "../types";
import type { SeasonChampionship } from "../types/SeasonChampionship";

//-------------------------------------------------------
// SECTION: États réactifs principaux
//-------------------------------------------------------

// Données du profil
const player = ref<Player | null>(null);
const user = ref<User | null>(null);
const playerRanking = ref<PlayerRanking | null>(null);
const extendedStats = ref<ExtendedStats | null>(null);
const seasonChampionships = ref<SeasonChampionship[]>([]);

// États de l'interface
const loading = ref(true);
const error = ref<string | null>(null);
const selectedBadge = ref<Badge | null>(null);
const expandedGameStats = ref(false);
const expandedCollaborations = ref(false);

// Navigation et pagination
const activeSection = ref("profil");
const tournamentSort = ref("date-desc");
const currentTournamentPage = ref(1);
const tournamentsPerPage = 5;

// Accès aux paramètres de route
const route = useRoute();

//-------------------------------------------------------
// SECTION: Configuration de navigation
//-------------------------------------------------------

const navigationSections = ref([
  {
    id: "profil",
    label: "Profil joueur",
    shortLabel: "Profil",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />',
  },
  {
    id: "statistiques",
    label: "Statistiques générales",
    shortLabel: "Stats",
    icon: '<path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />',
  },
  {
    id: "palmares",
    label: "Palmarès et médailles",
    shortLabel: "Palmarès",
    icon: '<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clip-rule="evenodd" />',
  },
  {
    id: "activite",
    label: "Activité joueur",
    shortLabel: "Activité",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />',
  },
  {
    id: "performance",
    label: "Performance par jeu",
    shortLabel: "Jeux",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />',
  },
  {
    id: "collaborations",
    label: "Collaborations",
    shortLabel: "Équipes",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 01-5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />',
  },
  {
    id: "badges",
    label: "Badges et récompenses",
    shortLabel: "Badges",
    icon: '<path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />',
  },
  {
    id: "records",
    label: "Records personnels",
    shortLabel: "Records",
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />',
  },
  {
    id: "tournois",
    label: "Historique tournois",
    shortLabel: "Tournois",
    icon: '<path d="M2 2v5h5" /><path d="M2 7h12v5H2z" /><path d="M14 4v8" /><path d="M14 12h5v5h-5z" /><path d="M19 17h3v5h-3z" /><path d="M8 12v5h6" /><path d="M8 17h3v5H8z" />',
  },
]);

//-------------------------------------------------------
// SECTION: Propriétés calculées - Données de base
//-------------------------------------------------------

// Statistiques des jeux
const gameStats = computed(() => {
  const stats = extendedStats.value?.gameStats || [];
  return [...stats].sort((a, b) => b.winRate - a.winRate);
});
const displayedGameStats = computed(() => {
  // Trier par taux de victoire décroissant
  const sortedStats = [...gameStats.value].sort(
    (a, b) => b.winRate - a.winRate
  );

  if (expandedGameStats.value || sortedStats.length <= 3) {
    return sortedStats;
  }
  return sortedStats.slice(0, 3);
});

// Informations d'activité
const memberSince = computed(() => {
  if (!extendedStats.value?.memberSince) return "Inconnu";
  return formatDate(extendedStats.value.memberSince);
});

const lastSeen = computed(() => {
  // Chercher le dernier tournoi participé
  if (
    !playerRanking.value?.tournamentsParticipated ||
    playerRanking.value.tournamentsParticipated.length === 0
  ) {
    return "Aucun tournoi";
  }

  // Trier les tournois par date décroissante et prendre le premier
  const sortedTournaments = [
    ...playerRanking.value.tournamentsParticipated,
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const lastTournament = sortedTournaments[0];

  if (!lastTournament) {
    return "Aucun tournoi";
  }

  return formatDate(lastTournament.date);
});

const participationStreak = computed(() => {
  return extendedStats.value?.participationStreak || 0;
});

// Statistiques sociales
const socialStats = computed(() => ({
  teamsFormed: extendedStats.value?.socialStats?.teamsFormed || 0,
  uniqueTeammates: extendedStats.value?.socialStats?.uniqueTeammates || 0,
  frequentTeammates: extendedStats.value?.socialStats?.frequentTeammates || [],
  winningPartners: extendedStats.value?.socialStats?.winningPartners || [],
}));

// Records personnels
const records = computed(() => ({
  longestWinStreak: extendedStats.value?.records?.longestWinStreak || 0,
}));

// Valeur maximale pour normaliser toutes les barres sur la même échelle
const maxOverallValue = computed(() => {
  if (tournamentProgression.value.length === 0) return 1;

  let maxValue = 0;

  tournamentProgression.value.forEach((month) => {
    // Comparer victoires et podiums séparément
    maxValue = Math.max(maxValue, month.victories);
    maxValue = Math.max(maxValue, month.podiums - month.victories);
  });

  // Minimum de 1 pour éviter la division par zéro
  const result = Math.max(maxValue, 1);
  console.log("maxOverallValue:", result);
  return result;
});

// Affichage des coéquipiers fréquents avec expansion
const displayedFrequentTeammates = computed(() => {
  const teammates = socialStats.value.frequentTeammates;
  if (expandedCollaborations.value || teammates.length <= 5) {
    return teammates;
  }
  return teammates.slice(0, 5);
});

// Affichage des partenaires de victoire avec expansion
const displayedWinningPartners = computed(() => {
  const partners = socialStats.value.winningPartners;
  if (expandedCollaborations.value || partners.length <= 5) {
    return partners;
  }
  return partners.slice(0, 5);
});

// Total des collaborations uniques
const totalCollaborators = computed(() => {
  const uniqueIds = new Set([
    ...socialStats.value.frequentTeammates.map((t) => t.playerId),
    ...socialStats.value.winningPartners.map((p) => p.playerId),
  ]);
  return uniqueIds.size;
});

//-------------------------------------------------------
// SECTION: Propriétés calculées - Statistiques avancées
//-------------------------------------------------------

// Calcul du taux de top 25%
const top25PercentRate = computed(() => {
  if (!playerRanking.value?.tournamentsParticipated) return 0;

  const tournaments = playerRanking.value.tournamentsParticipated;

  const top25Tournaments = tournaments.filter((tournament) => {
    const rank = tournament.rank || 999;
    const totalTeams = tournament.numberOfTeams || 1;
    const top25Threshold = Math.ceil(totalTeams * 0.25);
    return rank <= top25Threshold;
  }).length;

  return tournaments.length > 0
    ? Math.round((top25Tournaments / tournaments.length) * 100)
    : 0;
});

// Compte des médailles
const medalCount = computed(() => {
  const counts = { gold: 0, silver: 0, bronze: 0 };

  if (!playerRanking.value?.tournamentsParticipated) return counts;

  playerRanking.value.tournamentsParticipated.forEach((tournament) => {
    if (tournament.rank === 1) counts.gold++;
    else if (tournament.rank === 2) counts.silver++;
    else if (tournament.rank === 3) counts.bronze++;
  });

  return counts;
});

// Données pour le graphique de progression
const tournamentProgression = computed(() => {
  if (!playerRanking.value?.tournamentsParticipated) return [];

  const tournaments = playerRanking.value.tournamentsParticipated;
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const recentTournaments = tournaments.filter(
    (t) => new Date(t.date) >= sixMonthsAgo
  );

  const monthlyData = new Map();

  // Initialiser les 6 derniers mois
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const monthName = date.toLocaleDateString("fr-FR", { month: "short" });

    monthlyData.set(key, {
      name: monthName,
      victories: 0,
      podiums: 0,
      total: 0,
    });
  }

  // Compter les victoires et podiums par mois
  recentTournaments.forEach((tournament) => {
    const date = new Date(tournament.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`;

    if (monthlyData.has(key)) {
      const monthData = monthlyData.get(key);
      monthData.total++;

      if (tournament.rank === 1) {
        monthData.victories++;
        monthData.podiums++; // Les victoires comptent aussi comme podiums
      } else if (tournament.rank === 2 || tournament.rank === 3) {
        monthData.podiums++;
      }
    }
  });

  return Array.from(monthlyData.values());
});

//-------------------------------------------------------
// SECTION: Propriétés calculées - Interface utilisateur
//-------------------------------------------------------

// Badges
const hasBadges = computed(
  () => player.value?.badges && player.value.badges.length > 0
);

const badgeCount = computed(() => player.value?.badges?.length || 0);

// Tournois
const hasTournaments = computed(
  () =>
    playerRanking.value?.tournamentsParticipated &&
    playerRanking.value.tournamentsParticipated.length > 0
);

const tournamentCount = computed(
  () => playerRanking.value?.tournamentsParticipated?.length || 0
);

// Tri et pagination des tournois
const sortedTournaments = computed(() => {
  const tournaments = playerRanking.value?.tournamentsParticipated || [];

  switch (tournamentSort.value) {
    case "date-desc":
      return [...tournaments].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    case "date-asc":
      return [...tournaments].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    case "rank-asc":
      return [...tournaments].sort((a, b) => {
        const rankA = a.rank || 999;
        const rankB = b.rank || 999;
        return rankA - rankB;
      });
    default:
      return tournaments;
  }
});

const totalTournamentPages = computed(() =>
  Math.ceil((sortedTournaments.value?.length || 0) / tournamentsPerPage)
);

const paginatedTournaments = computed(() => {
  const start = (currentTournamentPage.value - 1) * tournamentsPerPage;
  const end = start + tournamentsPerPage;
  return sortedTournaments.value?.slice(start, end) || [];
});

//-------------------------------------------------------
// SECTION: Fonctions utilitaires
//-------------------------------------------------------

const formatDate = (dateString: string | Date) => {
  try {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  } catch (err) {
    console.error("Erreur de formatage de date:", err);
    return "Date inconnue";
  }
};

const getRankingBadgeVariant = (rank: number): string => {
  if (!rank) return "ghost";

  switch (rank) {
    case 1:
      return "gold";
    case 2:
      return "silver";
    case 3:
      return "bronze";
    default:
      return "outline";
  }
};

const getInitials = (username: string) => {
  if (!username) return "?";
  return username.charAt(0).toUpperCase();
};

const handleImageError = (e: Event) => {
  if (e.target instanceof HTMLImageElement) {
    const username = player.value?.username || "?";
    const initials = getInitials(username);

    e.target.src = `https://ui-avatars.com/api/?name=${initials}&background=6D28D9&color=F9FAFB&size=150&bold=true&font-family=monospace`;

    e.target.classList.remove("border-pink-500", "shadow-glow-pink");
    e.target.classList.add("border-purple-500", "shadow-purple-500/50");
  }
};

//-------------------------------------------------------
// SECTION: Navigation et scroll
//-------------------------------------------------------

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const yOffset = -100;
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition + yOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    activeSection.value = sectionId;
  }
};

const setupScrollObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          activeSection.value = entry.target.id;
        }
      });
    },
    {
      threshold: [0.3, 0.7],
      rootMargin: "-20% 0px -20% 0px",
    }
  );

  navigationSections.value.forEach((section) => {
    const element = document.getElementById(section.id);
    if (element) {
      observer.observe(element);
    }
  });

  return observer;
};

//-------------------------------------------------------
// SECTION: Actions utilisateur
//-------------------------------------------------------

const selectBadge = (badge: Badge) => {
  selectedBadge.value = badge;
};

//-------------------------------------------------------
// SECTION: Gestion des tournois
//-------------------------------------------------------

const getRankingLabel = (rank: number): string => {
  if (!rank) return "Non classé";

  switch (rank) {
    case 1:
      return "🥇 Or";
    case 2:
      return "🥈 Argent";
    case 3:
      return "🥉 Bronze";
    default:
      return `${rank}ème`;
  }
};

const nextTournamentPage = () => {
  if (currentTournamentPage.value < totalTournamentPages.value) {
    currentTournamentPage.value++;
  }
};

const prevTournamentPage = () => {
  if (currentTournamentPage.value > 1) {
    currentTournamentPage.value--;
  }
};

//-------------------------------------------------------
// SECTION: Récupération des données
//-------------------------------------------------------

const fetchPlayerProfile = async () => {
  loading.value = true;
  error.value = null;

  try {
    const playerId = route.params.id as string;

    // Récupération des données du joueur
    const playerData = await playerService.getPlayerProfile(playerId);
    player.value = playerData;

    // Récupération de l'utilisateur associé
    if (player.value?.userId) {
      try {
        const userData = await userService.getUserById(player.value.userId);
        user.value = userData;
      } catch (userErr) {
        console.error("Erreur utilisateur:", userErr);
      }
    }

    // Récupération des statistiques étendues
    try {
      const extendedStatsData = await playerService.getExtendedStats(playerId);
      extendedStats.value = extendedStatsData;
    } catch (statsErr) {
      console.error("Erreur statistiques étendues:", statsErr);
      extendedStats.value = null;
    }

    // Récupération du classement
    try {
      const rankings = await playerService.getPlayerRankings();
      playerRanking.value =
        rankings.find((ranking) => ranking.playerId === playerId) || null;
    } catch (rankErr) {
      console.error("Erreur classement:", rankErr);
    }

    // Récupération des championnats de saisons
    try {
      const championships = await playerService.getPlayerSeasonChampionships(
        playerId
      );
      seasonChampionships.value = championships;
    } catch (champErr) {
      console.error("Erreur championnats:", champErr);
      seasonChampionships.value = [];
    }
  } catch (err) {
    console.error("Erreur profil joueur:", err);
    error.value = "Impossible de charger le profil de ce joueur.";
  } finally {
    loading.value = false;
  }
};

//-------------------------------------------------------
// SECTION: Watchers et cycle de vie
//-------------------------------------------------------

// Réinitialiser la pagination quand le tri change
watch(tournamentSort, () => {
  currentTournamentPage.value = 1;
});

// Recharger quand l'ID change
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      fetchPlayerProfile();
    }
  }
);

// Initialisation du composant
onMounted(() => {
  fetchPlayerProfile();
  setTimeout(() => {
    setupScrollObserver();
  }, 1000);
});
</script>

<style scoped>
/* Styles spécifiques pour le podium */
.podium-column {
  position: relative;
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  perspective: 500px;
}

.podium-column::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  transform: translateZ(-5px);
  opacity: 0.3;
}

.podium-column:hover {
  transform: translateY(-5px) scale(1.05);
}

.podium-gold {
  box-shadow: 0 0 20px rgba(var(--space-gold-rgb), 0.4);
}

.podium-gold::before {
  background: radial-gradient(
    ellipse at center,
    rgba(var(--space-gold-rgb), 0.7) 0%,
    transparent 70%
  );
}

.podium-silver {
  box-shadow: 0 0 15px rgba(var(--space-silver-rgb), 0.4);
}

.podium-silver::before {
  background: radial-gradient(
    ellipse at center,
    rgba(var(--space-silver-rgb), 0.7) 0%,
    transparent 70%
  );
}

.podium-bronze {
  box-shadow: 0 0 15px rgba(var(--space-bronze-rgb), 0.4);
}

.podium-bronze::before {
  background: radial-gradient(
    ellipse at center,
    rgba(var(--space-bronze-rgb), 0.7) 0%,
    transparent 70%
  );
}

.scanline {
  background-image: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.1) 1px,
    transparent 1px,
    transparent 2px
  );
  background-size: 100% 2px;
  animation: scanlines 2s linear infinite;
}

.podium-base {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4), 0 0 15px rgba(76, 201, 240, 0.3);
  animation: glow 3s ease-in-out infinite alternate;
}

@keyframes glow {
  0% {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4), 0 0 15px rgba(76, 201, 240, 0.3);
  }
  50% {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4), 0 0 20px rgba(247, 37, 133, 0.3);
  }
  100% {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4), 0 0 15px rgba(108, 99, 255, 0.3);
  }
}
</style>
