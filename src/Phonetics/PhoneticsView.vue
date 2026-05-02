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
    <div class="all-sounds">
        <div class="consonant-wrapper cons-grid">
            <div v-for="(sound, symbol) in consonantsFrom(availableSounds)" :key="symbol" class="sound" @click="handleClick($event, sound.audio, symbol)">
                {{ symbol }}
            </div>
        </div>
        <div class="vowel-wrapper vowel-grid">
            <div v-for="(sound, symbol) in vowelsFrom(availableSounds)" :key="symbol" class="sound" @click="handleClick($event, sound.audio, symbol)">
                {{ symbol }}
            </div>
        </div>
        
    </div>
</template>

<script>

import { ref } from 'vue';
import { sounds, availableSounds, keysOfUserSounds, vowelsFrom, consonantsFrom } from './sounds';
export default {
  name: 'PhoneticsView',
  setup() {
    
    let recentlyCopied = ref(false)
    let timeout;
    const handleClick = (e, audio, symbol) => {
        if (audio && e.shiftKey) {
            audio.volume = 0.5 
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
        sounds, availableSounds, keysOfUserSounds, recentlyCopied,
        handleClick, consonantsFrom, vowelsFrom
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

.all-sounds {
    display: flex;
    margin-left: 1rem;
}

.cons-grid {
    --columns: 11;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(var(--columns), calc(50vw / var(--columns)));
}

.vowel-grid {
    --columns: 7;
    display: grid;
    grid-template-columns: repeat(var(--columns), calc(29vw / var(--columns)));
    gap: 10px;
    margin-left: 1rem;

}

.sound {
    border: 2px solid var(--sidebar-bg-color);
    /* width: 100%; */
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: clamp(0.5rem, calc(var(--columns) * 3cqw), 2rem);
    margin: 0;
    padding: 0;
    border-radius: 1rem;
    transition: 0.2s ease;
    user-select: none;
    cursor: pointer;
}

.vowel-wrapper > * {
    border: 2px dotted var(--sidebar-bg-color);

}

.sound:hover {
    background-color: var(--sidebar-bg-color);
}

.info {
    font-weight: bold;
}

</style>