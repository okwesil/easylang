<template>
  <sidebar />
  <div class="screen" :style="{marginLeft: sidebarWidth}">
    <router-view />
    <transition name="fade">
      <span v-if="notificationText.length != 0" class="notification">{{ notificationText }}</span>
    </transition>
  </div>
</template>


<script setup>
import Sidebar from './Sidebar/Sidebar.vue';
import { sidebarWidth } from './Sidebar/state.js';
import { load, notificationText, onKeypress } from './save';
import { onMounted, onUnmounted, } from 'vue';

load()
onMounted(() => window.addEventListener('keydown', onKeypress));
onUnmounted(() => window.removeEventListener('keydown', onKeypress));

</script>


<style>
@font-face {
  font-family: "Lora";
  src: url("../public/assets/fonts/Lora-VariableFont_wght.ttf")
    format("truetype");
  font-weight: 100 1000;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Fraunces";
  src: url("../public/assets/fonts/Fraunces-VariableFont_SOFT,WONK,opsz,wght.ttf")
    format("truetype");
  font-weight: 100 1000;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Merriweather";
  src: url("../public/assets/fonts/Merriweather-VariableFont_opsz,wdth,wght.ttf")
    format("truetype");
  font-weight: 100 1000;
  font-style: normal;
  font-display: swap;
}

:root {
  --bg-color: hsl(180, 4%, 9%);
  --darker-bg: hsl(from var(--bg-color) h calc(s + 1) calc(l - 3));
  --accent-color: hsl(0, 65%, 20%);
  --sidebar-active: hsl(from var(--accent-color) h calc(s + 20) calc(l - 3));
  --sidebar-hover: hsl(from var(--accent-color) h calc(s + 20) calc(l - 2));
  --font: "Merriweather"
}

select {
  background-color: var(--bg-color);
  border: none;
  border-bottom: 2px solid var(--accent-color);
  color: white;
}

select:hover {
  border-bottom: 2px solid var(--accent-color);
}

button, input {
  font-family: var(--font), Arial;
}

body {
  background-color: var(--bg-color);
  margin: 0;
}

#app {
  font-family: var(--font), Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  margin: 0;
  padding: 0;
}

.notification {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 20;
}

.screen {
  transition: 0.3s ease;
}

.main-header-wrapper {
  display: flex;
  align-items: center;
}

.main-header-wrapper > * {
  margin-bottom: 0;
  text-align: left;
}

.header {
  margin-top: 1rem;
  margin-left: 2rem;
  font-weight: bold;
}

.info {
  margin-top: 1.7rem;
  margin-left: 1rem;
}

input {
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: none;
  background-color: var(--bg-color);
  border-bottom: 3px solid var(--accent-color);
  color: white;
}

input:focus {
  outline: none;
  box-shadow: none;
}

.no-scrollbar {
  /* 1. Enable scrolling */
  overflow: auto;
  /* 3. Hide scrollbar for Firefox */
  scrollbar-width: none;
  /* 4. Hide scrollbar for older Internet Explorer/Edge */
  -ms-overflow-style: none;
}

.no-scrollbar::-webkit-scrollbar {
  /* 2. Hide scrollbar for Chrome, Safari, and newer Edge */
  display: none;
}

.fade-enter-active, 
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active, 
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100vh);
}

dialog {
  box-shadow: 10px 10px 10px hsla(0, 0%, 0%, 0.502);
}

body::-webkit-scrollbar {
  display: none;
}

</style>
