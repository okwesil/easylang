<template>
  <sidebar />
  <div class="screen" :style="{marginLeft: sidebarWidth}">
    <router-view />
    <transition name="fade">
      <span v-if="notificationText.length != 0" class="notification">{{ notificationText }}</span>
    </transition>
  </div>
</template>


<script>
  import Sidebar from './Sidebar/Sidebar.vue';
  import { sidebarWidth } from './Sidebar/state.js';
  import { load, notificationText, onKeypress } from './save';
  import { onMounted, onUnmounted, } from 'vue';

  export default {
    name: 'App',
    components: {
      Sidebar, 
    },
    setup() {
      load()
      onMounted(() => window.addEventListener('keydown', onKeypress));
      onUnmounted(() => window.removeEventListener('keydown', onKeypress));
      return { sidebarWidth, notificationText }
    }
  }

</script>


<style>

:root {
  --bg-color: hsl(180, 5%, 9%);
  --darker-bg: hsl(from var(--bg-color) h calc(s + 1) calc(l - 3));
  --accent-color: hsl(0, 65%, 20%);
  --sidebar-active: hsl(from var(--accent-color) h calc(s + 20) calc(l - 7));
  --sidebar-hover: hsl(from var(--accent-color) h calc(s + 20) calc(l - 5));
}

button, input {
  font-family: "Lora", Arial;
}

body {
  background-color: var(--bg-color);
  margin: 0;
}

#app {
  font-family: "Lora", Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  margin: 0;
  padding: 0;
}

.notification {
  position: absolute;
  bottom: 10px;
  right: 10px;
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
  margin-left: 2rem;
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
