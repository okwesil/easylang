<template>
  <sidebar />
  <div class="screen" :style="{marginLeft: sidebarWidth}">
    <router-view />
  </div>
</template>


<script>
  import Sidebar from './Sidebar/Sidebar.vue';
  import { sidebarWidth } from './Sidebar/state.js';

  export default {
    name: 'App',
    components: {
      Sidebar,
    },
    setup() {
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

</style>
