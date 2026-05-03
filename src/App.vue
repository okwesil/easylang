<template>
  <sidebar />
  <div class="screen" :style="{marginLeft: sidebarWidth}">
    <router-view />
  </div>
</template>


<script>
  import Sidebar from './Sidebar/Sidebar.vue';
  import { sidebarWidth } from './Sidebar/state.js';
  import { load } from './save';

  export default {
    name: 'App',
    components: {
      Sidebar, 
    },
    setup() {
      load(undefined, true)
      return { sidebarWidth }
    }
  }

</script>


<style>

:root {
  --bg-color: #1d2020;
}

body {
  background-color: var(--bg-color);
}

#app {
  font-family: "Lora", Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin: 0;
  padding: 0;
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

.fade-enter-active, 
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

</style>
