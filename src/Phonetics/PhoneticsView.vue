<template>
    <div class="main-header-wrapper">
        <h1 class="header">Phonetics</h1>
        <transition name="fade">
            <p class="info" v-if="recentlyCopied">copied</p>
        </transition>
        <transition name="fade">
            <p class="info symbol-name" v-if="hovering">{{ sounds[hovering].name  }}</p>
        </transition>
    </div>
    <div class="phonetics">

        <h2 class="header">Sounds In This Language</h2>
        <div class="my-sounds sound-grid-wrapper">
            <div class="consonant-wrapper cons-grid">
                <div v-for="(sound, symbol) in consonantsFrom(userSounds)" :key="symbol" class="sound" @click="handleClick($event, sound.audio, symbol)" @mouseenter="hovering = symbol" @mouseleave="hovering = null">
                    {{ symbol }}
                </div>
            </div>

            <div class="vowel-wrapper vowel-grid">
                <div v-for="(sound, symbol) in vowelsFrom(userSounds)" :key="symbol" class="sound" @click="handleClick($event, sound.audio, symbol)" @mouseenter="hovering = symbol" @mouseleave="hovering = null">
                    {{ symbol }}
                </div>
            </div>
        </div>

        <h2 class="header">Available Sounds </h2>
        <div class="sound-grid-wrapper">
            <div class="consonant-wrapper cons-grid">
                <div v-for="(sound, symbol) in consonantsFrom(availableSounds)" :key="symbol" class="sound" @click="handleClick($event, sound.audio, symbol)" @mouseenter="hovering = symbol" @mouseleave="hovering = null">
                    {{ symbol }}
                </div>
            </div>
            <div class="vowel-wrapper vowel-grid">
                <div v-for="(sound, symbol) in vowelsFrom(availableSounds)" :key="symbol" class="sound" @click="handleClick($event, sound.audio, symbol)" @mouseenter="hovering = symbol" @mouseleave="hovering = null">
                    {{ symbol }}
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>

import { ref } from 'vue';
import { sounds, availableSounds, keysOfUserSounds, vowelsFrom, consonantsFrom, userSounds } from './sounds';
export default {
  name: 'PhoneticsView',
  setup() {
    
    let recentlyCopied = ref(false)
    let timeout;
    const hovering = ref(false)
    const handleClick = (e, audio, symbol) => {
        if (audio && e.shiftKey) {
            audio.volume = 0.5 
            audio.play()
            return
        }
        copyToClipboard(symbol)
        const i = keysOfUserSounds.value.indexOf(symbol)
        if (i == -1) {
            keysOfUserSounds.value.push(symbol)
        } else {
            keysOfUserSounds.value.splice(i, 1)
        }
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
        sounds, availableSounds, userSounds, keysOfUserSounds, recentlyCopied, hovering,
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

.sound-grid-wrapper {
    display: flex;
    margin-left: 2rem;
}

.cons-grid {
    --columns: 10;
    display: grid;
    grid-template-columns: repeat(var(--columns), calc(90% / var(--columns)));
    align-content: space-between;
    justify-content: space-between;
    flex: 2;
}

.vowel-grid {
    --columns: 7;
    display: grid;
    grid-template-columns: repeat(var(--columns), calc(90% / var(--columns)));
    margin-left: 1rem;
    justify-content: space-between;
    align-content: space-between;
    flex: 1;
}

.sound {
    border: 2px solid var(--accent-color);
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


.sound:hover {
    background-color: var(--accent-color);
    
}

.info {
    font-weight: bold;
}

.border {
    margin-left: 2rem;
    border-bottom: 2px solid var(--accent-color);
}
</style>