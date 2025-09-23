<template>
  <div class="space-y-6">
    <Card
      variant="primary"
      :stars="true"
      :decorated="true"
      className="relative overflow-hidden"
    >
      <!-- En-tête avec titre -->
      <div class="flex items-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-2 text-color-accent"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
        <Title size="xl" decorated>Classement final</Title>
      </div>

      <!-- Podium -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
        <!-- Le podium physique pour desktop -->
        <div
          class="hidden md:flex justify-center items-end mt-28 mb-10 col-span-3 h-52 relative podium"
        >
          <!-- 2ème place -->
          <div class="w-1/5 relative">
            <div class="h-32 rounded-t-lg podium-silver">
              <div
                class="absolute top-0 left-0 right-0 transform -translate-y-24 flex justify-center"
              >
                <div
                  class="w-20 h-20 rounded-full flex items-center justify-center border-2 border-color-secondary silver-medal"
                >
                  <span class="text-3xl">🥈</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 1ère place -->
          <div class="w-1/5 relative mx-3 z-10">
            <div class="h-40 rounded-t-lg podium-gold">
              <div
                class="absolute top-0 left-0 right-0 transform -translate-y-28 flex justify-center"
              >
                <div
                  class="w-24 h-24 rounded-full flex items-center justify-center border-2 border-color-accent gold-medal"
                >
                  <span class="text-4xl">🏆</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 3ème place -->
          <div class="w-1/5 relative">
            <div class="h-24 rounded-t-lg podium-bronze">
              <div
                class="absolute top-0 left-0 right-0 transform -translate-y-20 flex justify-center"
              >
                <div
                  class="w-16 h-16 rounded-full flex items-center justify-center border-2 border-color-primary bronze-medal"
                >
                  <span class="text-2xl">🥉</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Les équipes gagnantes sur le podium (desktop) -->
        <div class="hidden md:grid grid-cols-3 gap-4 col-span-3">
          <!-- 2ème place équipes -->
          <div>
            <h4
              v-if="getTeamsByRank(2).length > 0"
              class="text-base font-heading text-color-silver mb-2 text-center"
            >
              <Badge variant="silver" size="md" className="mr-2">🥈</Badge>
              {{ getTeamsByRank(2).length > 1 ? "Ex aequo" : "Argent" }}
            </h4>
            <div class="space-y-2">
              <Card
                v-for="team in getTeamsByRank(2)"
                :key="team._id"
                variant="secondary"
                className="transform transition hover:scale-105"
              >
                <h5 class="font-heading text-base truncate text-center">
                  {{ team.name }}
                </h5>
                <div
                  v-if="team.players && team.players.length > 0"
                  class="mt-2 space-y-1"
                >
                  <div
                    v-for="player in team.players"
                    :key="player._id"
                    class="text-xs bg-color-bg-light/30 p-2 rounded flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-2 flex-shrink-0 text-color-secondary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="truncate">{{ player.username }}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <!-- 1ère place équipes -->
          <div>
            <h4
              v-if="getTeamsByRank(1).length > 0"
              class="text-lg font-heading text-color-gold mb-2 text-center"
            >
              <Badge variant="gold" size="md" className="mr-2">🏆</Badge>
              {{ getTeamsByRank(1).length > 1 ? "Ex aequo" : "Champion" }}
            </h4>
            <div class="space-y-2">
              <Card
                v-for="team in getTeamsByRank(1)"
                :key="team._id"
                variant="accent"
                className="transform transition hover:scale-105"
              >
                <h5 class="font-heading text-base truncate text-center">
                  {{ team.name }}
                </h5>
                <div
                  v-if="team.players && team.players.length > 0"
                  class="mt-2 space-y-1"
                >
                  <div
                    v-for="player in team.players"
                    :key="player._id"
                    class="text-xs bg-color-bg-light/30 p-2 rounded flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-2 flex-shrink-0 text-color-accent-light"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="truncate">{{ player.username }}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <!-- 3ème place équipes -->
          <div>
            <h4
              v-if="getTeamsByRank(3).length > 0"
              class="text-base font-heading text-color-bronze mb-2 text-center"
            >
              <Badge variant="bronze" size="md" className="mr-2">🥉</Badge>
              {{ getTeamsByRank(3).length > 1 ? "Ex aequo" : "Bronze" }}
            </h4>
            <div class="space-y-2">
              <Card
                v-for="team in getTeamsByRank(3)"
                :key="team._id"
                variant="primary"
                className="transform transition hover:scale-105"
              >
                <h5 class="font-heading text-base truncate text-center">
                  {{ team.name }}
                </h5>
                <div
                  v-if="team.players && team.players.length > 0"
                  class="mt-2 space-y-1"
                >
                  <div
                    v-for="player in team.players"
                    :key="player._id"
                    class="text-xs bg-color-bg-light/30 p-2 rounded flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-2 flex-shrink-0 text-color-primary-light"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="truncate">{{ player.username }}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <!-- Version mobile du podium (cartes en liste) -->
        <div class="block md:hidden col-span-3 mt-4">
          <h4 class="text-center text-lg font-heading text-color-gold mb-4">
            <Badge variant="gold" size="md" className="mr-2">🏆</Badge>
            Podium
          </h4>

          <!-- Or (1er) -->
          <div v-if="getTeamsByRank(1).length > 0" class="mb-6">
            <h5 class="text-center text-base font-heading text-color-gold mb-2">
              <span class="text-2xl mr-2">🥇</span>
              {{
                getTeamsByRank(1).length > 1
                  ? "Champions (ex aequo)"
                  : "Champion"
              }}
            </h5>
            <div class="space-y-2">
              <Card
                v-for="team in getTeamsByRank(1)"
                :key="team._id"
                variant="accent"
                className="transform transition hover:scale-105"
              >
                <h5 class="font-heading text-base truncate text-center">
                  {{ team.name }}
                </h5>
                <div
                  v-if="team.players && team.players.length > 0"
                  class="mt-3 space-y-1"
                >
                  <div
                    v-for="player in team.players"
                    :key="player._id"
                    class="text-sm bg-color-bg-light/30 p-2 rounded flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-2 flex-shrink-0 text-color-accent-light"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="truncate">{{ player.username }}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <!-- Argent (2e) -->
          <div v-if="getTeamsByRank(2).length > 0" class="mb-6">
            <h5
              class="text-center text-base font-heading text-color-silver mb-2"
            >
              <span class="text-xl mr-2">🥈</span>
              {{
                getTeamsByRank(2).length > 1
                  ? "Finalistes (ex aequo)"
                  : "Finaliste"
              }}
            </h5>
            <div class="space-y-2">
              <Card
                v-for="team in getTeamsByRank(2)"
                :key="team._id"
                variant="secondary"
                className="transform transition hover:scale-105"
              >
                <h5 class="font-heading text-base truncate text-center">
                  {{ team.name }}
                </h5>
                <div
                  v-if="team.players && team.players.length > 0"
                  class="mt-3 space-y-1"
                >
                  <div
                    v-for="player in team.players"
                    :key="player._id"
                    class="text-sm bg-color-bg-light/30 p-2 rounded flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-2 flex-shrink-0 text-color-secondary-light"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="truncate">{{ player.username }}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <!-- Bronze (3e) -->
          <div v-if="getTeamsByRank(3).length > 0" class="mb-4">
            <h5
              class="text-center text-base font-heading text-color-bronze mb-2"
            >
              <span class="text-lg mr-2">🥉</span>
              {{
                getTeamsByRank(3).length > 1
                  ? "Demi-finalistes (ex aequo)"
                  : "Demi-finaliste"
              }}
            </h5>
            <div class="space-y-2">
              <Card
                v-for="team in getTeamsByRank(3)"
                :key="team._id"
                variant="primary"
                className="transform transition hover:scale-105"
              >
                <h5 class="font-heading text-base truncate text-center">
                  {{ team.name }}
                </h5>
                <div
                  v-if="team.players && team.players.length > 0"
                  class="mt-3 space-y-1"
                >
                  <div
                    v-for="player in team.players"
                    :key="player._id"
                    class="text-sm bg-color-bg-light/30 p-2 rounded flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-2 flex-shrink-0 text-color-primary-light"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="truncate">{{ player.username }}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Card>

    <!-- Autres classements -->
    <Card variant="dark" :stars="true" className="relative overflow-hidden">
      <!-- En-tête dépliable -->
      <button
        @click="handleToggleOtherRankings"
        class="w-full text-left p-4 rounded-lg border border-color-bg-light/50 flex justify-between items-center hover:bg-color-bg-light/10 transition-colors"
      >
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-2 text-color-primary"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fill-rule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clip-rule="evenodd"
            />
          </svg>
          <Title size="lg" :decorated="false">
            Autres classements
            <Badge variant="primary" size="sm" className="ml-2">
              {{
                (tournament.teams ?? []).filter(
                  (t) => t.ranking > 3 || !t.ranking || t.ranking === 0
                ).length
              }}
              équipes
            </Badge>
          </Title>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :class="[
            isOtherRankingsExpanded ? 'transform rotate-180' : '',
            'h-5 w-5 text-color-primary transition-transform',
          ]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <!-- Contenu dépliable -->
      <div
        v-if="isOtherRankingsExpanded"
        class="mt-4 space-y-4 p-4 rounded-lg bg-color-bg-light/5 border border-color-bg-light/30 space-fade-in"
      >
        <!-- Tableau des autres équipes -->
        <div class="overflow-x-auto">
          <table class="min-w-full text-color-text">
            <thead>
              <tr class="bg-color-bg-light/20 border-b border-color-primary/20">
                <th
                  class="py-3 px-4 text-center font-heading text-color-primary-light"
                >
                  Position
                </th>
                <th
                  class="py-3 px-4 text-left font-heading text-color-primary-light"
                >
                  Équipe
                </th>
                <th
                  class="py-3 px-4 text-center font-heading text-color-primary-light"
                >
                  Membres
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Équipes avec classement (rang > 3) -->
              <tr
                v-for="team in sortedTeamsBeyondPodium"
                :key="team._id"
                :class="{
                  'bg-color-bg-light/10':
                    sortedTeamsBeyondPodium.indexOf(team) % 2 === 0,
                  'hover:bg-color-bg-light/20': true,
                }"
                class="transition-colors border-b border-color-bg-light/10"
              >
                <td class="py-3 px-4 text-center font-mono">
                  <Badge
                    variant="primary"
                    size="sm"
                    :className="team.ranking > 0 ? '' : 'opacity-50'"
                  >
                    {{ team.ranking > 0 ? `${team.ranking}e` : "NC" }}
                  </Badge>
                </td>
                <td class="py-3 px-4 font-heading text-left">
                  {{ team.name }}
                </td>
                <td class="py-3 px-4">
                  <div class="flex flex-wrap gap-1 justify-center">
                    <span
                      v-for="player in team.players"
                      :key="player._id"
                      class="text-xs bg-color-bg-light/20 px-2 py-1 rounded inline-flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3 mr-1 text-color-primary-light"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="truncate max-w-[100px]">{{
                        player.username
                      }}</span>
                    </span>
                  </div>
                </td>
              </tr>

              <!-- Équipes non classées -->
              <tr
                v-for="team in unrankedTeams"
                :key="team._id"
                :class="{
                  'bg-color-bg-light/5': unrankedTeams.indexOf(team) % 2 === 0,
                  'hover:bg-color-bg-light/15': true,
                }"
                class="transition-colors border-b border-color-bg-light/10 text-color-text-muted"
              >
                <td class="py-3 px-4 text-center font-mono">
                  <Badge variant="secondary" size="sm" className="opacity-50">
                    NC
                  </Badge>
                </td>
                <td class="py-3 px-4 font-heading text-left">
                  {{ team.name }}
                </td>
                <td class="py-3 px-4">
                  <div class="flex flex-wrap gap-1 justify-center">
                    <span
                      v-for="player in team.players"
                      :key="player._id"
                      class="text-xs bg-color-bg-light/10 px-2 py-1 rounded inline-flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3 mr-1 text-color-text-muted"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="truncate max-w-[100px]">{{
                        player.username
                      }}</span>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Message s'il n'y a pas d'équipes classées au-delà du podium -->
        <Terminal
          v-if="
            !(tournament.teams ?? []).some((t) => t.ranking > 3) &&
            !(tournament.teams ?? []).some((t) => !t.ranking || t.ranking === 0)
          "
          command="search --teams beyond-podium"
          title="Recherche d'équipes"
          :showCursor="true"
        >
          <div class="text-color-text-muted">
            Pas d'autres équipes classées au-delà du podium.
          </div>
        </Terminal>
      </div>
    </Card>
    <!-- Votes MVPS -->
    <Card v-if="tournament.mvpVoteOpen">
      <template #header>
        <div class="flex flex-row justify-between items-center">
          <Title size="xl" class="uppercase">Vote pour le mvp</Title>
          <Button
            v-if="user?.role === 'admin' || user?.role === 'superadmin'"
            class="bg-red-500!"
            @click="handleCloseVote()"
          >
            Fermer le vote
          </Button>
        </div>
      </template>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6"
      >
        <Card v-for="player in tournament.players">
          <div class="flex flex-row justify-between items-center">
            <p class="w-auto">
              {{ player.username }}
              <span
                v-if="
                  tournament.teams
                    ?.find((t) => t.ranking === 1)
                    ?.players.filter((p) => p.userId === player.userId).length
                "
                >🏆</span
              >
            </p>
            <Button
              :disabled="
                user?._id &&
                tournament.mvps
                  ?.find((mvp) => mvp.player._id === player._id)
                  ?.votes.includes(user?._id)
              "
              class="p-1! px-2! disabled:opacity-5"
              @click="handleVoteForMvp(player._id)"
            >
              Votez
            </Button>
          </div>
        </Card>
      </div>
    </Card>
    <Card
      v-else-if="tournament.mvps && tournament.mvps.length > 0"
      variant="accent"
      :stars="true"
      :decorated="true"
      className="relative overflow-hidden mvp-main-card"
    >
      <!-- En-tête avec effet spécial -->
      <div class="flex items-center justify-center mb-8 relative">
        <div
          class="absolute inset-0 bg-gradient-to-r from-transparent via-color-accent/20 to-transparent"
        ></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 mr-3 text-color-accent animate-pulse"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
        <Title
          size="2xl"
          :decorated="true"
          className="text-color-accent uppercase tracking-wider"
        >
          🏆 MVP du tournoi 🏆
        </Title>
      </div>

      <div
        v-for="mvp in tournament.mvps?.filter((mvp) => mvp.isMvp)"
        :key="mvp.player._id"
        class="py-6"
      >
        <Card
          variant="gold"
          :stars="true"
          :decorated="true"
          className="overflow-hidden mvp-winner-card relative"
        >
          <!-- Effet de particules en arrière-plan -->
          <div class="absolute inset-0 mvp-particles"></div>

          <!-- Couronne flottante au-dessus -->
          <div
            class="absolute -top-8 left-1/2 transform -translate-x-1/2 text-6xl animate-bounce z-10"
          >
            👑
          </div>

          <!-- Structure principale -->
          <div class="text-center relative z-10">
            <!-- Avatar amélioré -->
            <div class="avatar-container inline-block mb-6 relative">
              <div
                class="absolute inset-0 bg-gradient-to-r from-color-accent to-color-gold rounded-full animate-pulse opacity-30 scale-110"
              ></div>
              <img
                v-if="mvp.player && mvp.player.avatarUrl"
                :src="mvp.player.avatarUrl"
                alt="Avatar MVP"
                class="h-32 w-32 sm:h-40 sm:w-40 rounded-full object-cover border-4 border-color-accent shadow-2xl relative z-10 mvp-avatar"
                loading="lazy"
                @error="handleImageError($event, mvp.player)"
              />
              <div
                v-else
                class="h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-gradient-to-br from-color-accent to-color-gold flex items-center justify-center border-4 border-color-accent mx-auto relative z-10 mvp-avatar"
              >
                <span class="text-color-bg text-4xl sm:text-5xl font-bold">
                  {{ getInitials(mvp.player.username) }}
                </span>
              </div>
              <!-- Badge MVP flottant -->
              <div
                class="absolute -bottom-4 -right-4 bg-color-accent text-color-bg px-3 py-1 rounded-full text-sm font-bold animate-pulse"
              >
                🏆 MVP
              </div>
            </div>

            <!-- Nom avec effet spécial -->
            <Title
              size="4xl"
              :glitch="false"
              :decorated="true"
              className="capitalize break-words mb-6 text-color-accent font-bold"
              :class="[
                mvp.player.username.length > 15
                  ? 'text-3xl sm:text-5xl'
                  : mvp.player.username.length > 10
                  ? 'text-4xl sm:text-6xl'
                  : 'text-5xl sm:text-7xl',
              ]"
            >
              {{ mvp.player.username }}
            </Title>

            <!-- Séparateur amélioré -->
            <div class="flex justify-center items-center mb-6">
              <div
                class="h-1 w-16 bg-gradient-to-r from-transparent to-color-accent rounded-full"
              ></div>
              <div
                class="h-1 w-16 bg-gradient-to-l from-transparent to-color-accent rounded-full"
              ></div>
            </div>

            <!-- Informations de vote améliorées -->
            <div
              class="bg-color-bg-light/20 rounded-lg p-4 border border-color-accent/30"
            >
              <p class="text-center text-color-accent text-xl font-bold mb-3">
                🗳️ Élu MVP avec
              </p>
              <div class="flex justify-center items-center space-x-3 mb-3">
                <span class="text-4xl font-black text-color-accent">
                  {{ mvp.votes.length }}
                </span>
                <span class="text-color-text-light text-lg">
                  vote{{ mvp.votes.length > 1 ? "s" : "" }}
                </span>
              </div>
              <!-- Étoiles correspondant exactement au nombre de votes -->
              <div class="flex justify-center">
                <div class="flex space-x-1">
                  <span
                    v-for="n in mvp.votes.length"
                    :key="n"
                    class="text-color-gold text-xl"
                    >⭐</span
                  >
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <!-- Section des autres candidats MVP -->
      <div
        v-if="tournament.mvps?.filter((mvp) => !mvp.isMvp).length > 0"
        class="mt-8"
      >
        <div class="text-center mb-6">
          <Title
            size="lg"
            :decorated="true"
            className="text-color-text-light mb-2"
          >
            🥈 Autres candidats méritants
          </Title>
          <div
            class="h-px bg-gradient-to-r from-transparent via-color-text-muted to-transparent"
          ></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            v-for="(mvp, index) in tournament.mvps
              ?.filter((mvp) => !mvp.isMvp)
              .sort((a, b) => b.votes.length - a.votes.length)
              .slice(0, 6)"
            :key="mvp.player._id"
            variant="secondary"
            :stars="true"
            className="overflow-hidden transition-all hover:scale-105 mvp-candidate-card"
          >
            <div class="text-center p-4">
              <!-- Position du candidat -->
              <div
                class="absolute -top-3 -right-3 bg-color-secondary text-color-bg rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold"
              >
                {{ index + 2 }}
              </div>

              <!-- Avatar du candidat -->
              <div class="avatar-container inline-block mb-4 relative">
                <img
                  v-if="mvp.player && mvp.player.avatarUrl"
                  :src="mvp.player.avatarUrl"
                  alt="Avatar candidat MVP"
                  class="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-color-secondary shadow-lg"
                  loading="lazy"
                  @error="handleImageError($event, mvp.player)"
                />
                <div
                  v-else
                  class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-color-secondary to-color-primary flex items-center justify-center border-2 border-color-secondary mx-auto"
                >
                  <span class="text-color-bg text-lg sm:text-xl font-bold">
                    {{ getInitials(mvp.player.username) }}
                  </span>
                </div>
              </div>

              <!-- Nom du candidat -->
              <Title
                size="lg"
                className="capitalize break-words mb-3 text-color-text"
                :class="[
                  mvp.player.username.length > 12
                    ? 'text-sm sm:text-base'
                    : 'text-base sm:text-lg',
                ]"
              >
                {{ mvp.player.username }}
              </Title>

              <!-- Votes reçus -->
              <div
                class="bg-color-bg-light/30 rounded-lg p-3 border border-color-secondary/20"
              >
                <div class="flex justify-center items-center space-x-2 mb-2">
                  <span class="text-xl font-bold text-color-secondary">
                    {{ mvp.votes.length }}
                  </span>
                  <span class="text-color-text-muted text-sm">
                    vote{{ mvp.votes.length > 1 ? "s" : "" }}
                  </span>
                </div>
                <!-- Étoiles correspondant exactement au nombre de votes -->
                <div class="flex justify-center">
                  <div class="flex space-x-1">
                    <span
                      v-for="n in mvp.votes.length"
                      :key="n"
                      class="text-color-secondary"
                      >⭐</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Card>
    <TournamentClip
      :tournament="tournament"
      :player="tournament.players.find((p) => p.userId === user?._id) || null"
      @refetch="emit('refetch')"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Player, Tournament } from "../../types";
import tournamentService from "../../services/tournamentService";
import { useUserStore } from "../../stores/userStore";
import TournamentClip from "./TournamentClip.vue";

const userStore = useUserStore();
const user = computed(() => userStore.user);

const props = defineProps({
  tournament: {
    type: Object as () => Tournament,
    required: true,
  },
  isOtherRankingsExpanded: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggle-other-rankings", "refetch"]);

const handleVoteForMvp = async (playerId?: string) => {
  if (!playerId) return;
  if (!props.tournament._id) return;
  await tournamentService.voteForMvp(props.tournament._id, playerId);
  emit("refetch");
};

const handleCloseVote = async () => {
  if (!props.tournament._id) return;
  await tournamentService.closeMvpVote(props.tournament._id);
  emit("refetch");
};

/**
 * Récupère toutes les équipes ayant un rang spécifique dans le tournoi
 * @param rank - Rang à rechercher (1=or, 2=argent, 3=bronze, etc.)
 * @returns Tableau d'équipes ayant ce rang
 */
const getTeamsByRank = (rank: number) => {
  return (props.tournament?.teams ?? []).filter(
    (team) => team.ranking === rank
  );
};

/**
 * Propriété calculée qui trie et retourne les équipes au-delà du podium (rank > 3)
 */
const sortedTeamsBeyondPodium = computed(() => {
  return (props.tournament?.teams ?? [])
    .filter((team) => team.ranking > 3)
    .sort((a, b) => a.ranking - b.ranking);
});

/**
 * Propriété calculée qui retourne les équipes non classées
 */
const unrankedTeams = computed(() => {
  return (props.tournament?.teams ?? []).filter(
    (team) => !team.ranking || team.ranking === 0
  );
});

// Dans le script, ajoutez une fonction explicite pour gérer le clic
const handleToggleOtherRankings = () => {
  emit("toggle-other-rankings", props.tournament._id);
};

const getInitials = (username: string) => {
  if (!username) return "?";
  return username.charAt(0).toUpperCase();
};

const handleImageError = (e: Event, player: Player) => {
  if (e.target instanceof HTMLImageElement) {
    const username = player.username || "?";
    const initials = getInitials(username);

    e.target.src = `https://ui-avatars.com/api/?name=${initials}&background=6D28D9&color=F9FAFB&size=150&bold=true&font-family=monospace`;

    e.target.classList.remove("border-pink-500", "shadow-glow-pink");
    e.target.classList.add("border-purple-500", "shadow-purple-500/50");
  }
};
</script>

<style scoped>
/* Animation pour les transitions */
.space-fade-in {
  animation: fadeIn 0.3s ease-in-out;
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

/* Podium et médailles */
.podium {
  position: relative;
  overflow: hidden;
}

.podium-gold {
  background: linear-gradient(
    to bottom,
    var(--color-gold),
    var(--color-accent)
  );
  box-shadow: 0 0 20px rgba(var(--color-gold-rgb), 0.5);
  position: relative;
  overflow: hidden;
}

.podium-gold::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.5),
    transparent
  );
  animation: shine 3s infinite ease-in-out;
}

.podium-silver {
  background: linear-gradient(
    to bottom,
    var(--color-silver),
    var(--color-secondary)
  );
  box-shadow: 0 0 15px rgba(var(--color-silver-rgb), 0.5);
  position: relative;
  overflow: hidden;
}

.podium-silver::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shine 3s infinite 0.5s ease-in-out;
}

.podium-bronze {
  background: linear-gradient(
    to bottom,
    var(--color-bronze),
    var(--color-primary)
  );
  box-shadow: 0 0 15px rgba(var(--color-bronze-rgb), 0.5);
  position: relative;
  overflow: hidden;
}

.podium-bronze::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: shine 3s infinite 1s ease-in-out;
}

.gold-medal {
  background: radial-gradient(
    circle at 30% 30%,
    var(--color-gold),
    var(--color-accent)
  );
  box-shadow: 0 0 30px rgba(var(--color-gold-rgb), 0.6);
  animation: pulse-gold 2s infinite;
}

.silver-medal {
  background: radial-gradient(
    circle at 30% 30%,
    var(--color-silver),
    var(--color-secondary)
  );
  box-shadow: 0 0 20px rgba(var(--color-silver-rgb), 0.5);
  animation: pulse-silver 2s infinite;
}

.bronze-medal {
  background: radial-gradient(
    circle at 30% 30%,
    var(--color-bronze),
    var(--color-primary)
  );
  box-shadow: 0 0 20px rgba(var(--color-bronze-rgb), 0.5);
  animation: pulse-bronze 2s infinite;
}

/* Animations */
@keyframes shine {
  0%,
  100% {
    transform: translateX(-100%);
  }

  50% {
    transform: translateX(100%);
  }
}

@keyframes pulse-gold {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(var(--color-gold-rgb), 0.6);
  }

  50% {
    box-shadow: 0 0 30px rgba(var(--color-gold-rgb), 0.8);
  }
}

@keyframes pulse-silver {
  0%,
  100% {
    box-shadow: 0 0 15px rgba(var(--color-silver-rgb), 0.5);
  }

  50% {
    box-shadow: 0 0 25px rgba(var(--color-silver-rgb), 0.7);
  }
}

@keyframes pulse-bronze {
  0%,
  100% {
    box-shadow: 0 0 10px rgba(var(--color-bronze-rgb), 0.4);
  }

  50% {
    box-shadow: 0 0 20px rgba(var(--color-bronze-rgb), 0.6);
  }
}

/* Styles MVP améliorés */
.mvp-main-card {
  background: linear-gradient(
    135deg,
    rgba(var(--color-accent-rgb), 0.1) 0%,
    rgba(var(--color-gold-rgb), 0.05) 100%
  );
  border: 2px solid rgba(var(--color-accent-rgb), 0.3);
}

.mvp-winner-card {
  position: relative;
  overflow: visible;
  border: 3px solid var(--color-accent);
  box-shadow: 0 0 30px rgba(var(--color-accent-rgb), 0.5),
    0 0 60px rgba(var(--color-gold-rgb), 0.3);
}

.mvp-particles {
  background: radial-gradient(
      circle at 20% 20%,
      rgba(var(--color-accent-rgb), 0.3) 2px,
      transparent 2px
    ),
    radial-gradient(
      circle at 60% 80%,
      rgba(var(--color-gold-rgb), 0.2) 1px,
      transparent 1px
    ),
    radial-gradient(
      circle at 80% 40%,
      rgba(var(--color-accent-rgb), 0.2) 1px,
      transparent 1px
    );
  background-size: 50px 50px, 30px 30px, 40px 40px;
  animation: mvp-sparkle 4s ease-in-out infinite;
}

.mvp-avatar {
  animation: mvp-glow 3s ease-in-out infinite;
  transition: transform 0.3s ease;
}

.mvp-avatar:hover {
  transform: scale(1.05) rotate(2deg);
}

.mvp-candidate-card {
  position: relative;
  border: 1px solid rgba(var(--color-secondary-rgb), 0.3);
  background: linear-gradient(
    135deg,
    rgba(var(--color-secondary-rgb), 0.05) 0%,
    rgba(var(--color-primary-rgb), 0.05) 100%
  );
}

.mvp-candidate-card:hover {
  border-color: rgba(var(--color-secondary-rgb), 0.6);
  box-shadow: 0 5px 20px rgba(var(--color-secondary-rgb), 0.2);
}

/* Animations MVP */
@keyframes mvp-sparkle {
  0%,
  100% {
    opacity: 0.3;
    transform: translateY(0px);
  }
  50% {
    opacity: 0.6;
    transform: translateY(-2px);
  }
}

@keyframes mvp-glow {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(var(--color-accent-rgb), 0.5),
      0 0 40px rgba(var(--color-accent-rgb), 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(var(--color-accent-rgb), 0.8),
      0 0 60px rgba(var(--color-accent-rgb), 0.5);
  }
}
</style>
