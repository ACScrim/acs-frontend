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
    <Card v-else-if="tournament.mvps && tournament.mvps.length > 0">
      <template #header>
        <Title size="xl" class="uppercase">MVP du tournoi</Title>
      </template>

      <div
        v-for="mvp in tournament.mvps?.filter((mvp) => mvp.isMvp)"
        class="py-4"
      >
        <Card
          variant="primary"
          :stars="true"
          :decorated="true"
          className="overflow-hidden"
        >
          <!-- Structure simplifiée : tout centré -->
          <div class="text-center">
            <!-- Avatar centré -->
            <div class="avatar-container inline-block mb-4">
              <img
                v-if="mvp.player && mvp.player.avatarUrl"
                :src="mvp.player.avatarUrl"
                alt="Avatar"
                class="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border-2 border-color-primary shadow-glow-primary"
                loading="lazy"
                @error="handleImageError($event, mvp.player)"
              />
              <div
                v-else
                class="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-color-bg-light flex items-center justify-center border-2 border-color-primary mx-auto"
              >
                <span class="text-color-primary text-2xl sm:text-3xl font-bold">
                  {{ getInitials(mvp.player.username) }}
                </span>
              </div>
            </div>

            <!-- Nom centré -->
            <Title
              size="4xl"
              :glitch="true"
              :decorated="true"
              className="capitalize break-words mb-4"
              :class="[
                mvp.player.username.length > 15
                  ? 'text-2xl sm:text-4xl'
                  : mvp.player.username.length > 10
                  ? 'text-3xl sm:text-5xl'
                  : 'text-4xl sm:text-5xl',
              ]"
            >
              {{ mvp.player.username }}
            </Title>

            <!-- Barre parfaitement centrée sous le nom -->
            <div
              class="w-32 h-1 bg-gradient-to-r from-color-primary to-color-secondary rounded-full mx-auto"
            ></div>
            <p class="text-center text-color-primary-light text-lg">
              Gagnant avec
              <b
                >{{ mvp.votes.length }} vote{{
                  mvp.votes.length > 1 ? "s" : ""
                }}</b
              >
            </p>
          </div>
        </Card>
      </div>
      <div class="hidden sm:flex flex-row gap-x-10">
        <Card
          v-for="mvp in tournament.mvps
            ?.filter((mvp) => !mvp.isMvp)
            .sort((a, b) => b.votes.length - a.votes.length)
            .slice(0, 3)"
          variant="primary"
          :stars="true"
          :decorated="true"
          className="overflow-hidden basis-1/3"
        >
          <div class="text-center">
            <!-- Avatar centré -->
            <div class="avatar-container inline-block mb-4">
              <img
                v-if="mvp.player && mvp.player.avatarUrl"
                :src="mvp.player.avatarUrl"
                alt="Avatar"
                class="size-10 sm:size-14 rounded-full object-cover border-2 border-color-primary shadow-glow-primary"
                loading="lazy"
                @error="handleImageError($event, mvp.player)"
              />
              <div
                v-else
                class="size-10 sm:size-14 rounded-full bg-color-bg-light flex items-center justify-center border-2 border-color-primary mx-auto"
              >
                <span class="text-color-primary text-2xl sm:text-3xl font-bold">
                  {{ getInitials(mvp.player.username) }}
                </span>
              </div>
            </div>

            <!-- Nom centré -->
            <Title
              size="4xl"
              :glitch="true"
              :decorated="true"
              className="capitalize break-words mb-4"
              :class="[
                mvp.player.username.length > 15
                  ? 'text-lg sm:text-2xl'
                  : mvp.player.username.length > 10
                  ? 'text-lg sm:text-2xl'
                  : 'text-lg sm:text-2xl',
              ]"
            >
              {{ mvp.player.username }}
            </Title>

            <!-- Barre parfaitement centrée sous le nom -->
            <div
              class="w-32 h-1 bg-gradient-to-r from-color-primary to-color-secondary rounded-full mx-auto"
            ></div>
            <p class="text-center text-color-primary-light text-lg">
              <b
                >{{ mvp.votes.length }} vote{{
                  mvp.votes.length > 1 ? "s" : ""
                }}</b
              >
            </p>
          </div>
        </Card>
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
</style>
