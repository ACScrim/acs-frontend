<!-- filepath: d:\Dev\ACS\acs-frontend\src\components\Navbar.vue -->
<template>
  <nav class="navbar fixed top-0 w-full z-50">
    <!-- Fond d'étoiles et effet vitré spatial -->
    <div class="navbar-bg absolute inset-0"></div>

    <!-- Étoiles animées en arrière-plan -->
    <div
      v-for="n in 10"
      :key="`star-${n}`"
      class="absolute h-1 w-1 rounded-full bg-white animate-pulse pointer-events-none"
      :style="{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        opacity: Math.random() * 0.7 + 0.3,
      }"
    ></div>

    <!-- Ligne de circuit supérieure -->
    <div class="space-circuit-line top">
      <div class="space-circuit-pulse"></div>
    </div>

    <div
      class="container mx-auto flex justify-between items-center py-3 px-4 relative z-10"
    >
      <!-- Section gauche avec logo et menu admin -->
      <div class="flex items-center">
        <button
          v-if="isAdmin"
          @click="toggleAdminMenu"
          class="admin-button relative group mr-4"
        >
          <div class="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 text-space-primary-light group-hover:text-space-secondary-light transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <div
              class="absolute inset-0 bg-space-primary/20 rounded-full blur-sm animate-pulse-slow"
            ></div>
          </div>
          <div class="tooltip-text font-nasa">Menu Admin</div>
        </button>

        <router-link to="/" class="logo-container">
          <div class="logo-glow"></div>
          <img
            src="../assets/Logo_ACS.png"
            alt="Logo ACS"
            class="navbar-logo"
          />
        </router-link>
      </div>

      <!-- Navigation principale -->
      <div class="hidden md:flex flex-grow justify-center space-x-12">
        <router-link
          to="/classement"
          class="nav-link font-nasa"
          :class="{ 'nav-link-active': isActive('/classement') }"
        >
          Classement
        </router-link>
        <router-link
          to="/tournois-a-venir"
          class="nav-link font-nasa"
          :class="{ 'nav-link-active': isActive('/tournois-a-venir') }"
        >
          Tournois
        </router-link>
        <router-link
          v-if="user"
          to="/membres"
          class="nav-link font-nasa"
          :class="{ 'nav-link-active': isActive('/membres') }"
        >
          Membres
        </router-link>
        <router-link
          v-if="user"
          to="/propositions-jeux"
          class="nav-link font-nasa"
          :class="{ 'nav-link-active': isActive('/propositions-jeux') }"
        >
          Propositions
        </router-link>
        <router-link
          v-if="user"
          to="/badges"
          class="nav-link font-nasa"
          :class="{ 'nav-link-active': isActive('/badges') }"
        >
          Badges
        </router-link>
      </div>
      <!-- Toggle mode allégé -->
      <SpaceToggle
        v-model="isLightMode"
        @update:modelValue="toggleLightMode"
        label="Mode allégé"
        tooltip="Activer/désactiver le fond vidéo"
        containerClassName="hidden sm:flex items-center mr-6"
      />

      <!-- Centre de notifications -->
      <div class="notification-center flex items-center mr-4">
        <NotificationCenter />
      </div>

      <!-- Menu utilisateur -->
      <div class="relative user-menu items-center hidden md:flex">
        <button
          v-if="user"
          @click="toggleMenu"
          class="user-profile-button flex items-center group"
        >
          <div class="avatar-container">
            <img
              :src="
                user.avatarUrl ||
                'https://cdn.discordapp.com/embed/avatars/0.png'
              "
              alt="Avatar"
              class="w-8 h-8 rounded-full border border-space-primary/50 object-cover"
            />
            <div class="avatar-glow"></div>
          </div>
          <span class="user-name ml-2 hidden sm:inline font-nasa capitalize">
            {{ user.username }}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 ml-1 text-space-primary-light transition-transform duration-300"
            :class="{ 'rotate-180': menuOpen }"
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

        <!-- Bouton login -->
        <button
          v-else
          @click="loginWithDiscord"
          class="discord-login-btn font-nasa"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 71 55"
            fill="currentColor"
          >
            <path
              d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
            />
          </svg>
          Connexion
        </button>

        <!-- Menu dropdown utilisateur -->
        <transition name="space-fade">
          <div
            v-if="menuOpen"
            class="user-dropdown absolute top-full right-0 mt-2 w-56 z-50"
          >
            <div class="dropdown-header font-nasa">
              <div class="dropdown-title">PANNEAU DE CONTRÔLE</div>
              <div class="dropdown-subtitle">STATION UTILISATEUR</div>
            </div>

            <div class="dropdown-items">
              <router-link
                :to="{ name: 'Profil', params: { id: player?._id } }"
                class="dropdown-item"
                @click="closeAllMenus"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-space-primary-light"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
                Mon Profil
              </router-link>

              <router-link
                to="/player-level"
                class="dropdown-item"
                @click="closeAllMenus"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-space-primary-light"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
                  />
                </svg>
                Mes niveaux de jeu
              </router-link>

              <router-link
                to="/parametres"
                class="dropdown-item"
                @click="closeAllMenus"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-space-primary-light"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clip-rule="evenodd"
                  />
                </svg>
                Paramètres
              </router-link>

              <div class="dropdown-divider"></div>

              <button @click="logout" class="dropdown-item logout-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-space-error"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                Déconnexion
              </button>
            </div>

            <div class="dropdown-footer">
              <div class="circuit-dots">
                <div class="circuit-dot"></div>
                <div class="circuit-dot"></div>
                <div class="circuit-dot"></div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Menu mobile -->
      <div class="md:hidden mobile-menu">
        <button
          @click="toggleMobileMenu"
          class="mobile-menu-toggle focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-space-primary-light"
            :class="{ hidden: mobileMenuOpen, block: !mobileMenuOpen }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-space-error-light"
            :class="{ block: mobileMenuOpen, hidden: !mobileMenuOpen }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Menu déroulant mobile -->
        <transition name="space-slide">
          <div
            v-if="mobileMenuOpen"
            class="mobile-dropdown absolute top-full right-0 left-0 mt-2 z-50 mx-4"
          >
            <div class="dropdown-header font-nasa">
              <div class="dropdown-title">NAVIGATION</div>
              <div class="dropdown-subtitle">SYSTÈME PRINCIPAL</div>
            </div>

            <!-- Section utilisateur mobile -->
            <div
              v-if="user"
              class="dropdown-items border-b border-space-primary/20 pb-2 mb-2"
            >
              <div class="dropdown-item">
                <div class="flex items-center w-full">
                  <div class="avatar-container mr-3">
                    <img
                      :src="
                        user.avatarUrl ||
                        'https://cdn.discordapp.com/embed/avatars/0.png'
                      "
                      alt="Avatar"
                      class="w-8 h-8 rounded-full border border-space-primary/50 object-cover"
                    />
                    <div class="avatar-glow"></div>
                  </div>
                  <div class="flex-1">
                    <div
                      class="text-space-primary-light font-nasa capitalize text-sm"
                    >
                      {{ user.username }}
                    </div>
                    <div class="text-space-text-muted text-xs">Connecté</div>
                  </div>
                </div>
              </div>

              <router-link
                :to="{ name: 'Profil', params: { id: player?._id } }"
                @click="closeAllMenus"
                class="dropdown-item"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-space-primary-light"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
                Mon Profil
              </router-link>

              <router-link
                to="/player-level"
                @click="closeAllMenus"
                class="dropdown-item"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-space-primary-light"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
                  />
                </svg>
                Mes niveaux
              </router-link>

              <router-link
                to="/parametres"
                @click="closeAllMenus"
                class="dropdown-item"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-space-primary-light"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clip-rule="evenodd"
                  />
                </svg>
                Paramètres
              </router-link>
            </div>

            <div class="dropdown-items">
              <router-link
                to="/classement"
                @click="closeAllMenus"
                class="dropdown-item mobile-nav-item"
                :class="{ 'dropdown-item-active': isActive('/classement') }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
                  />
                </svg>
                Classement
              </router-link>

              <router-link
                to="/tournois-a-venir"
                @click="closeAllMenus"
                class="dropdown-item mobile-nav-item"
                :class="{
                  'dropdown-item-active': isActive('/tournois-a-venir'),
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  />
                </svg>
                Tournois
              </router-link>

              <router-link
                v-if="user"
                to="/membres"
                @click="closeAllMenus"
                class="dropdown-item mobile-nav-item"
                :class="{ 'dropdown-item-active': isActive('/membres') }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                  />
                </svg>
                Membres
              </router-link>

              <router-link
                v-if="user"
                to="/propositions-jeux"
                @click="closeAllMenus"
                class="dropdown-item mobile-nav-item"
                :class="{
                  'dropdown-item-active': isActive('/propositions-jeux'),
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
                  />
                </svg>
                Propositions
              </router-link>

              <router-link
                v-if="user"
                to="/badges"
                @click="closeAllMenus"
                class="dropdown-item mobile-nav-item"
                :class="{ 'dropdown-item-active': isActive('/badges') }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Badges
              </router-link>

              <!-- Toggle mode allégé pour mobile -->
              <div class="dropdown-item flex justify-between items-center">
                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-space-accent-light"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"
                    />
                  </svg>
                  <span>Mode allégé</span>
                </div>
                <SpaceToggle
                  v-model="isLightMode"
                  @update:modelValue="toggleLightMode"
                  size="sm"
                />
              </div>
            </div>

            <!-- Section connexion/déconnexion -->
            <div
              class="dropdown-items border-t border-space-primary/20 pt-2 mt-2"
            >
              <button
                v-if="user"
                @click="logout"
                class="dropdown-item logout-item w-full text-left"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-space-error"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                Déconnexion
              </button>

              <button
                v-else
                @click="loginWithDiscord"
                class="dropdown-item w-full text-left"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  viewBox="0 0 71 55"
                  fill="currentColor"
                >
                  <path
                    d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                  />
                </svg>
                Connexion Discord
              </button>
            </div>

            <div class="dropdown-footer">
              <div class="circuit-dots">
                <div class="circuit-dot"></div>
                <div class="circuit-dot"></div>
                <div class="circuit-dot"></div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Menu admin -->
    <transition name="space-slide">
      <div
        v-if="adminMenuOpen"
        class="admin-dropdown absolute left-0 top-full z-40"
      >
        <div class="dropdown-header font-nasa">
          <div class="dropdown-title">PANNEAU ADMIN</div>
          <div class="dropdown-subtitle">ACCÈS RESTREINT</div>
        </div>

        <div class="dropdown-items">
          <router-link
            to="/creation-jeu"
            @click="closeAllMenus"
            class="dropdown-item admin-item"
            :class="{ 'dropdown-item-active': isActive('/creation-jeu') }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-space-secondary-light"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
              />
            </svg>
            Création d'un jeu
          </router-link>

          <router-link
            to="/ajout-joueurs"
            @click="closeAllMenus"
            class="dropdown-item admin-item"
            :class="{ 'dropdown-item-active': isActive('/ajout-joueurs') }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-space-secondary-light"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
              />
            </svg>
            Ajout de joueurs
          </router-link>

          <router-link
            to="/creation-tournoi"
            @click="closeAllMenus"
            class="dropdown-item admin-item"
            :class="{ 'dropdown-item-active': isActive('/creation-tournoi') }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-space-secondary-light"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              />
            </svg>
            Gestion tournois
          </router-link>

          <router-link
            to="/gestion-niveaux"
            @click="closeAllMenus"
            class="dropdown-item admin-item"
            :class="{ 'dropdown-item-active': isActive('/gestion-niveaux') }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-space-secondary-light"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
              />
            </svg>
            Gestion des niveaux
          </router-link>

          <router-link
            to="/gestion-saisons"
            @click="closeAllMenus"
            class="dropdown-item admin-item"
            :class="{ 'dropdown-item-active': isActive('/gestion-saisons') }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-space-secondary-light"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            Gestion des saisons
          </router-link>

          <router-link
            to="/gestion-badges"
            @click="closeAllMenus"
            class="dropdown-item admin-item"
            :class="{ 'dropdown-item-active': isActive('/gestion-badges') }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-space-secondary-light"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            Gestion des badges
          </router-link>

          <router-link
            to="/synchronisation-joueurs"
            @click="closeAllMenus"
            class="dropdown-item admin-item"
            :class="{
              'dropdown-item-active': isActive('/synchronisation-joueurs'),
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-space-secondary-light"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clip-rule="evenodd"
              />
            </svg>
            Synchro utilisateurs
          </router-link>

          <router-link
            v-if="isSuperAdmin"
            to="/gestion-administrations"
            @click="closeAllMenus"
            class="dropdown-item admin-item"
            :class="{
              'dropdown-item-active': isActive('/gestion-administrations'),
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-space-secondary-light"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clip-rule="evenodd"
              />
            </svg>
            Gestion des admins
          </router-link>

          <router-link
            to="/gestion-notifications"
            @click="closeAllMenus"
            class="dropdown-item admin-item"
            :class="{
              'dropdown-item-active': isActive('/gestion-notifications'),
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-space-secondary-light"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                fill="var(--space-secondary-light)"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            Gestion des notifications
          </router-link>

          <router-link
            to="/messages-discord"
            @click="closeAllMenus"
            class="dropdown-item admin-item"
            :class="{
              'dropdown-item-active': isActive('/messages-discord'),
            }"
          >
            <svg
              class="h-5 w-5 mr-2 text-space-secondary-light"
              viewBox="0 0 71 55"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
              />
            </svg>
            Messages discord
          </router-link>
        </div>

        <div class="dropdown-footer">
          <div class="circuit-dots">
            <div class="circuit-dot"></div>
            <div class="circuit-dot"></div>
            <div class="circuit-dot"></div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Ligne de circuit inférieure -->
    <div class="space-circuit-line bottom">
      <div class="space-circuit-pulse reverse"></div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRouter, useRoute } from "vue-router";
import { useSettingsStore } from "../stores/settingsStore";
import NotificationCenter from "./NotificationCenter.vue";

const userStore = useUserStore();
const user = computed(() => userStore.user);
const player = computed(() => userStore.player);

// Après vos autres variables et constantes
const settingsStore = useSettingsStore();
const isLightMode = computed(() => settingsStore.isLightMode);

// Fonction pour basculer le mode allégé
const toggleLightMode = () => {
  settingsStore.toggleLightMode();
};

const isAdmin = computed(
  () =>
    user.value &&
    (user.value.role === "admin" || user.value.role === "superadmin")
);
const isSuperAdmin = computed(
  () => user.value && user.value.role === "superadmin"
);
const menuOpen = ref(false);
const adminMenuOpen = ref(false);
const mobileMenuOpen = ref(false);
const router = useRouter();
const route = useRoute();

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  adminMenuOpen.value = false;
  mobileMenuOpen.value = false;
};

const toggleAdminMenu = () => {
  adminMenuOpen.value = !adminMenuOpen.value;
  menuOpen.value = false;
  mobileMenuOpen.value = false;
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  menuOpen.value = false;
  adminMenuOpen.value = false;
};

const logout = async () => {
  await userStore.logout();
  closeAllMenus();
  router.push("/");
};

const closeAllMenus = () => {
  menuOpen.value = false;
  adminMenuOpen.value = false;
  mobileMenuOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  if (!target.closest(".user-menu")) {
    menuOpen.value = false;
  }

  // Modification ici - changement de .admin-menu à .admin-button
  if (!target.closest(".admin-button")) {
    adminMenuOpen.value = false;
  }

  if (!target.closest(".mobile-menu")) {
    mobileMenuOpen.value = false;
  }
};

const isActive = (path: string) => {
  return route.path === path;
};

const loginWithDiscord = () => {
  const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_DISCORD_REDIRECT_URI;
  window.location.href = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=identify+guilds+email`;
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  userStore.fetchUser();
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
/* Fond et grille */
.navbar-bg {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(var(--space-primary-rgb), 0.1);
}

/* Lignes de circuit */
.space-circuit-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--space-primary-light),
    transparent
  );
  z-index: 20;
}

.space-circuit-line.top {
  top: 0;
}

.space-circuit-line.bottom {
  bottom: 0;
}

.space-circuit-pulse {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    var(--space-primary),
    transparent
  );
  animation: pulse-move 8s linear infinite;
}

.space-circuit-pulse.reverse {
  animation: pulse-move-reverse 8s linear infinite;
}

@keyframes pulse-move {
  0% {
    left: -50px;
  }
  100% {
    left: 100%;
  }
}

@keyframes pulse-move-reverse {
  0% {
    left: 100%;
  }
  100% {
    left: -50px;
  }
}

/* Animation de pulsation lente */
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Logo */
.logo-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
}

.logo-glow {
  position: absolute;
  inset: -5px;
  background: var(--space-primary);
  border-radius: 50%;
  filter: blur(10px);
  opacity: 0.15;
  z-index: -1;
  transition: all 0.3s ease;
}

.logo-container:hover .logo-glow {
  opacity: 0.25;
  filter: blur(15px);
}

.navbar-logo {
  height: 40px;
  filter: drop-shadow(0 0 5px var(--space-primary-light));
  transition: all 0.3s ease;
}

.logo-container:hover .navbar-logo {
  filter: drop-shadow(0 0 8px var(--space-primary-light));
  transform: scale(1.05);
}

/* Navigation links */
.nav-link {
  position: relative;
  color: var(--space-text);
  font-weight: 500;
  letter-spacing: 1px;
  padding: 0.25rem 0.5rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-size: 0.9rem;
  overflow: hidden;
}

.nav-link::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--space-primary-light),
    transparent
  );
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.nav-link:hover {
  color: var(--space-primary-light);
  text-shadow: 0 0 5px var(--space-primary-light);
}

.nav-link:hover::before {
  transform: translateX(0);
}

.nav-link-active {
  color: var(--space-primary-light);
  text-shadow: 0 0 5px var(--space-primary-light);
}

.nav-link-active::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--space-primary-light),
    transparent
  );
  transform: translateX(0);
}

/* User menu */
.avatar-container {
  position: relative;
  width: 32px;
  height: 32px;
}

.avatar-glow {
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: var(--space-primary);
  filter: blur(4px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.user-profile-button:hover .avatar-glow {
  opacity: 0.4;
}

.user-name {
  color: var(--space-text);
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.user-profile-button:hover .user-name {
  color: var(--space-primary-light);
}

/* Dropdowns */
.user-dropdown,
.admin-dropdown,
.mobile-dropdown {
  background: rgba(var(--space-bg-rgb), 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--space-primary-rgb), 0.3);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(var(--space-primary-rgb), 0.2);
}

.dropdown-header {
  padding: 10px 15px;
  background: rgba(var(--space-primary-rgb), 0.1);
  border-bottom: 1px solid rgba(var(--space-primary-rgb), 0.2);
}

.dropdown-title {
  color: var(--space-primary-light);
  font-size: 0.8rem;
  letter-spacing: 1px;
}

.dropdown-subtitle {
  color: var(--space-text-muted);
  font-size: 0.65rem;
  letter-spacing: 1px;
}

.dropdown-items {
  padding: 5px 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  color: var(--space-text);
  font-size: 0.9rem;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  border-left: 2px solid transparent;
}

.dropdown-item:hover {
  background: rgba(var(--space-primary-rgb), 0.1);
  color: var(--space-primary-light);
  border-left: 2px solid var(--space-primary-light);
}

.dropdown-item:hover svg {
  color: var(--space-primary-light);
}

.dropdown-item-active {
  background: rgba(var(--space-primary-rgb), 0.15);
  color: var(--space-primary-light);
  border-left: 2px solid var(--space-primary-light);
}

.admin-item:hover {
  background: rgba(var(--space-secondary-rgb), 0.1);
  color: var(--space-secondary-light);
  border-left: 2px solid var(--space-secondary-light);
}

.admin-item:hover svg {
  color: var(--space-secondary-light);
}

.dropdown-item-active.admin-item {
  background: rgba(var(--space-secondary-rgb), 0.15);
  color: var(--space-secondary-light);
  border-left: 2px solid var(--space-secondary-light);
}

.logout-item:hover {
  background: rgba(var(--space-error-rgb), 0.1);
  color: var(--space-error-light);
  border-left: 2px solid var(--space-error-light);
}

.logout-item:hover svg {
  color: var(--space-error-light);
}

.dropdown-divider {
  height: 1px;
  margin: 5px 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(var(--space-primary-rgb), 0.2),
    transparent
  );
}

.dropdown-footer {
  padding: 8px 0;
  display: flex;
  justify-content: center;
  border-top: 1px solid rgba(var(--space-primary-rgb), 0.1);
}

.circuit-dots {
  display: flex;
  gap: 8px;
}

.circuit-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--space-primary-light);
  opacity: 0.5;
  animation: dot-pulse 2s infinite;
}

.circuit-dot:nth-child(2) {
  animation-delay: 0.5s;
}

.circuit-dot:nth-child(3) {
  animation-delay: 1s;
}

@keyframes dot-pulse {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
}

/* Discord login button */
.discord-login-btn {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: rgba(88, 101, 242, 0.2);
  color: #5865f2;
  border: 1px solid rgba(88, 101, 242, 0.4);
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.discord-login-btn::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(88, 101, 242, 0.1),
    transparent
  );
  transform: rotate(45deg);
  transition: all 0.3s ease;
  opacity: 0;
}

.discord-login-btn:hover {
  background: rgba(88, 101, 242, 0.3);
  border-color: rgba(88, 101, 242, 0.6);
  color: #7984f5;
  box-shadow: 0 0 15px rgba(88, 101, 242, 0.3);
}

.discord-login-btn:hover::before {
  animation: shine 1.5s;
  opacity: 1;
}

@keyframes shine {
  0% {
    transform: rotate(45deg) translateX(-100%);
  }
  100% {
    transform: rotate(45deg) translateX(100%);
  }
}

/* Toggle mode allégé */
.light-mode-toggle {
  position: relative;
}

.toggle-track {
  width: 42px;
  height: 22px;
  background: rgba(var(--space-bg-light-rgb), 0.3);
  border: 1px solid rgba(var(--space-primary-rgb), 0.3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 2px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.toggle-thumb {
  width: 16px;
  height: 16px;
  background: var(--space-primary-light);
  border-radius: 50%;
  box-shadow: 0 0 5px var(--space-primary);
  transition: transform 0.3s ease, background 0.3s;
  position: relative;
  z-index: 2;
}

.toggle-stars {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.toggle-star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  animation: star-twinkle 3s infinite;
}

@keyframes star-twinkle {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.7;
  }
}

input:checked + .toggle-track {
  background: rgba(var(--space-accent-rgb), 0.3);
  border-color: rgba(var(--space-accent-rgb), 0.5);
}

input:checked + .toggle-track .toggle-thumb {
  transform: translateX(20px);
  background: var(--space-accent-light);
  box-shadow: 0 0 5px var(--space-accent);
}

.toggle-track:hover {
  border-color: rgba(var(--space-primary-rgb), 0.6);
  box-shadow: 0 0 8px rgba(var(--space-primary-rgb), 0.2);
}

input:checked + .toggle-track:hover {
  border-color: rgba(var(--space-accent-rgb), 0.6);
  box-shadow: 0 0 8px rgba(var(--space-accent-rgb), 0.2);
}

/* Toggle pour mobile */
.toggle-track-mobile {
  width: 36px;
  height: 20px;
  background: rgba(var(--space-bg-light-rgb), 0.3);
  border: 1px solid rgba(var(--space-primary-rgb), 0.3);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 2px;
  transition: all 0.3s ease;
}

.toggle-thumb-mobile {
  width: 14px;
  height: 14px;
  background: var(--space-primary-light);
  border-radius: 50%;
  box-shadow: 0 0 5px var(--space-primary);
  transition: transform 0.3s ease, background 0.3s;
}

input:checked + .toggle-track-mobile {
  background: rgba(var(--space-accent-rgb), 0.3);
  border-color: rgba(var(--space-accent-rgb), 0.5);
}

input:checked + .toggle-track-mobile .toggle-thumb-mobile {
  transform: translateX(16px);
  background: var(--space-accent-light);
  box-shadow: 0 0 5px var(--space-accent);
}

/* Tooltips */
.tooltip-text {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(var(--space-bg-rgb), 0.8);
  color: var(--space-primary-light);
  font-size: 0.7rem;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(var(--space-primary-rgb), 0.3);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  white-space: nowrap;
  z-index: 100;
  backdrop-filter: blur(5px);
}

.admin-button:hover .tooltip-text,
.group:hover .tooltip-text {
  opacity: 1;
}

/* Animation transitions */
.space-fade-enter-active,
.space-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.space-fade-enter-from,
.space-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.space-slide-enter-active,
.space-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.space-slide-enter-from,
.space-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .navbar-logo {
    height: 36px;
  }
}
</style>
