<template>
  <div class="cyberpunk-loader-container">
    <div class="cyberpunk-loader">
      <div class="cyberpunk-loader-ring"></div>
      <div class="cyberpunk-loader-lines">
        <div class="line line-1"></div>
        <div class="line line-2"></div>
        <div class="line line-3"></div>
      </div>
      <div class="cyberpunk-loader-text">
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Aucune logique nécessaire, composant purement visuel
</script>

<style scoped>
.cyberpunk-loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  width: 100%;
}

.cyberpunk-loader {
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cyberpunk-loader-ring {
  position: absolute;
  width: 120px;
  height: 120px;
  border: 2px solid transparent;
  border-top-color: #ec4899;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

.cyberpunk-loader-ring::before {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border: 2px solid transparent;
  border-top-color: #8b5cf6;
  border-radius: 50%;
  animation: spin 3s linear infinite;
}

.cyberpunk-loader-ring::after {
  content: "";
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border: 2px solid transparent;
  border-top-color: #06b6d4;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
}

.cyberpunk-loader-lines {
  position: absolute;
  width: 100%;
  height: 100%;
}

.line {
  position: absolute;
  height: 3px;
  width: 100%;
  background: linear-gradient(to right, transparent, #ec4899, transparent);
  animation: glitch-line 2s infinite;
}

.line-1 {
  top: 25%;
  animation-delay: 0s;
}

.line-2 {
  top: 50%;
  animation-delay: 0.3s;
}

.line-3 {
  top: 75%;
  animation-delay: 0.6s;
}

.cyberpunk-loader-text {
  position: absolute;
  bottom: -40px;
  font-family: "Orbitron", sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: white;
  letter-spacing: 3px;
  text-transform: uppercase;
  display: flex;
}

.cyberpunk-loader-text span {
  animation: text-flicker 0.1s infinite alternate;
  opacity: 0.8;
}

.cyberpunk-loader-text span:nth-child(1) {
  animation-delay: 0.1s;
}
.cyberpunk-loader-text span:nth-child(2) {
  animation-delay: 0.2s;
}
.cyberpunk-loader-text span:nth-child(3) {
  animation-delay: 0.3s;
}
.cyberpunk-loader-text span:nth-child(4) {
  animation-delay: 0.4s;
}
.cyberpunk-loader-text span:nth-child(5) {
  animation-delay: 0.5s;
}
.cyberpunk-loader-text span:nth-child(6) {
  animation-delay: 0.6s;
}
.cyberpunk-loader-text span:nth-child(7) {
  animation-delay: 0.7s;
}
.cyberpunk-loader-text span:nth-child(8) {
  animation-delay: 0.8s;
}
.cyberpunk-loader-text span:nth-child(9) {
  animation-delay: 0.9s;
}
.cyberpunk-loader-text span:nth-child(10) {
  animation-delay: 1s;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes glitch-line {
  0%,
  100% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
}

@keyframes text-flicker {
  0%,
  100% {
    opacity: 0.8;
    text-shadow: 0 0 5px #ec4899, 0 0 10px #ec4899;
  }
  50% {
    opacity: 1;
    text-shadow: 0 0 10px #ec4899, 0 0 20px #ec4899, 0 0 30px #ec4899;
  }
  25%,
  75% {
    opacity: 0.5;
    text-shadow: none;
  }
}
</style>
