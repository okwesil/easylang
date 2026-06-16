<script setup>
import { defineExpose, useTemplateRef } from 'vue';
import { consonantsFrom, sounds, vowelsFrom } from '@/Phonetics/sounds';
const emit = defineEmits([ 'symbolClicked' ])
const modal = useTemplateRef('modal')
const openKeyboard = () => {
    modal.value.showModal()
}
const close = () => {
    modal.value.close()
}
const onClick = (symbol) => {
    emit('symbolClicked', symbol)
}

defineExpose({ openKeyboard, close })
</script>

<template>

    <dialog ref="modal" class="keyboard-container no-scrollbar" @close.prevent>
            <div class="keyboard consonants">
                <div class="tile" v-for="(_, symbol) in consonantsFrom(sounds)" :key="symbol">
                    <button class="symbol" @click="() => { onClick(symbol); modal.close() }" :title="sounds[symbol].name">{{ symbol }}</button>
                </div>
            </div>

            <div class="keyboard">
                <div class="tile" v-for="(_, symbol) in vowelsFrom(sounds)" :key="symbol">
                    <button class="symbol" @click="() => { onClick(symbol); modal.close() }" :title="sounds[symbol].name">{{ symbol }}</button>
                </div>
            </div>
    </dialog>
</template>

<style scoped>
.keyboard-container {
    margin: 0;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;

    position: absolute;

    padding: 10px;
    background-color: var(--darker-bg);
    border: 2px solid #3d3d3d;
    border-radius: .5rem;
    width: fit-content;
    height: fit-content;
    z-index: 10;
}

.section {
    margin-bottom: 30px;
}

.section h3 {
    margin: 0 0 15px 0;
    color: var(--text-color, #fff);
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.keyboard {
    display: grid;
    grid-template-columns: repeat(8, minmax(30px, 1fr));
    gap: 3px;
    max-width: 100%;
}

.consonants {
    margin-bottom: 20px;
}

.tile {
    display: flex;
    align-items: center;
    justify-content: center;
}

.symbol {
    width: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 500;
    border: 1px solid var(--accent-color);
    border-radius: 4px;
    background-color: var(--bg-color);
    color: var(--text-color, #fff);
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0;
}

.symbol:hover {
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.4);
    transform: scale(1.05);
}

.symbol:active {
    transform: scale(0.95);
}
</style>