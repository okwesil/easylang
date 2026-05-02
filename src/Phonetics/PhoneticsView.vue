<template>
    <div class="phonetics">
        <div class="main-header-wrapper">
            <h1 class="header">Phonetics</h1>
            <transition name="fade">
                <p class="info" v-if="recentlyCopied">copied</p>
            </transition>
        </div>
    </div>
    <br>
    <h2 class="header">Available Sounds </h2>
    <div class="sound-grid all-sounds">
        <div v-for="(sound, symbol) in availableSounds" :key="symbol" class="sound" @click="handleClick($event, sound.audio, symbol)">
            {{ symbol }}
        </div>
    </div>
</template>

<script>

import { ref } from 'vue';
import { sounds, availableSounds, mySounds } from './sounds';
export default {
  name: 'PhoneticsView',
  setup() {
    
    let recentlyCopied = ref(false)
    let timeout;
    const handleClick = (e, audio, symbol) => {
        if (audio && e.shiftKey) {
            audio.play()
        }
        copyToClipboard(symbol)
    }

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text)
            recentlyCopied.value = true
            if (timeout) {
                clearTimeout(timeout)
            }
            timeout = setTimeout(() => recentlyCopied.value = false, 2000)
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }

    return {
        sounds, availableSounds, mySounds, recentlyCopied,
        handleClick,
    }
  }
}


</script>

<style scoped>
.header {
    text-align: left;
}

.phonetics {
    user-select: none;
}

.sound-grid {
    --columns: 15;
    display: grid;
    margin-left: 1rem;
    grid-template-columns: repeat(var(--columns), 1fr);
    gap: 10px;
}

.sound {
    border: 2px solid var(--sidebar-bg-color);
    /* width: 100%; */
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: calc((var(--columns)) / 100 * 20vw);
    padding: 0;
    border-radius: 1rem;
    transition: 0.2s ease;
    user-select: none;
    cursor: pointer;

}

.sound:hover {
    background-color: var(--sidebar-bg-color);
}

.info {
    font-weight: bold;
}

</style>