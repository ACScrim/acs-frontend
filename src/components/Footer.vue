<template>
  <footer
    class="relative z-20 bg-black/70 backdrop-blur-sm border-t border-pink-500/30 mt-8"
  >
    <div class="container mx-auto px-6 py-4">
      <div class="flex flex-wrap justify-between items-center">
        <!-- Logo et année -->
        <div
          class="w-full md:w-auto mb-4 md:mb-0 flex flex-col items-center md:items-start"
        >
          <div class="text-pink-500 font-audiowide text-lg">ACS Gaming</div>
          <p class="text-gray-400 text-xs">
            {{ new Date().getFullYear() }}
          </p>
        </div>

        <!-- Navigation condensée -->
        <div
          class="flex flex-wrap justify-center gap-4 md:gap-8 mb-4 md:mb-0 text-sm"
        >
          <a
            href="https://discord.gg/bbXTK9mUPB"
            target="_blank"
            class="text-gray-400 hover:text-indigo-400 flex items-center transition-colors"
          >
            <svg
              class="w-3 h-3 mr-1"
              viewBox="0 0 71 55"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
              />
            </svg>
            Discord
          </a>
          <a
            href="https://www.twitch.tv/heekoz"
            target="_blank"
            class="text-gray-400 hover:text-purple-400 flex items-center transition-colors"
          >
            <svg
              class="w-3 h-3 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43z"
              />
            </svg>
            Twitch
          </a>
          <a
            href="mailto:ninon.jordao@outlook.fr"
            class="text-gray-400 hover:text-pink-400 flex items-center transition-colors"
          >
            <svg
              class="w-3 h-3 mr-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="2"
                y="4"
                width="20"
                height="16"
                rx="2"
                stroke-width="2"
              />
              <path d="M2 7l10 7 10-7" stroke-width="2" />
            </svg>
            Contact
          </a>
        </div>

        <!-- Version et slogan -->
        <div class="w-full md:w-auto text-center md:text-right">
          <div class="flex items-center justify-center md:justify-end gap-3">
            <span class="text-gray-500 text-xs">v{{ appVersion }}</span>
            <span class="text-pink-400/60 text-xs font-orbitron"
              >ALORS ÇA SCRIM</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Élément décoratif -->
    <div class="cyber-line-top"></div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import pkg from "../../package.json";

// Utiliser directement la version du package.json
const appVersion = ref(pkg.version || "1.0.0");
</script>

<style scoped>
.font-audiowide {
  font-family: "Audiowide", cursive;
}

.font-orbitron {
  font-family: "Orbitron", sans-serif;
}

.cyber-line-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(236, 72, 153, 0.7),
    transparent
  );
}
</style>
