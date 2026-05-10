<template>
    <div class="everything">
        <h1>Settings</h1>
        <div class="line">
          <span class="label">Hue</span>
          <input type="range" min="0" max="360" v-model="settings.hue" @change="updateHue">
        </div>
        <div class="line">
          <span class="label">Language Name</span>
          <input type="text" v-model="settings.name" @change="updateName"> 
        </div>
  </div> 
</template>

<script>
import { settings, updateHue, updateName } from '../save.js'

  export default {
    setup() {      
      return {
        settings,
        updateHue, updateName
      }
    }
  }

</script>

<style scoped>
.everything {
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}

span {
  font-size: 1.5rem;
}

.label {
  margin-right: 10px;
  white-space: nowrap;
}

.toggle {
  transition: all 0.3s ease;
  border: 2px solid var(--sidebar-bg-color);
  padding: 5px;
  display: flex;
  justify-content: center;
  border-radius: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.toggle.on {
  background-color: var(--sidebar-bg-color);
}

.line {
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content; 
  accent-color: var(--sidebar-bg-color);
}

input[type="text"] {
  font-size: 1rem;
}
</style>