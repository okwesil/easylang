<script setup>
import ContextMenuLink from '@/Components/ContextMenuLink.vue';
import { alphabet } from './script';
import ContextMenu from '@/Components/ContextMenu.vue';
import { ref, useTemplateRef } from 'vue';
import NewSymbol from './NewSymbol.vue';
import { settings } from '@/save';
const cmenu = useTemplateRef('characterContextMenu')
const form = useTemplateRef('form')

const dragging = ref(null)
const dragEnd = (destIndex) => {
    console.log(dragging.value, destIndex)
    const symbol = alphabet.value.splice(dragging.value, 1)[0]
    alphabet.value.splice(destIndex, 0, symbol)
}

let editIndex
const editSymbol = (index, chars, ipa, roman) => {
    form.value.openForm(chars, ipa, roman)
    alphabet.value.splice(index, 1)
    editIndex = index
}

const addSymbol = (chars, ipa, roman) => {
    if (editIndex) {
        alphabet.value.splice(editIndex, 0, { chars, ipa, roman})
        editIndex = null
    } else {
        alphabet.value.push({ chars, ipa, roman})
    }
}

</script>

<template>
    <NewSymbol ref="form" @done="({chars, ipa, roman}) => addSymbol(chars, ipa, roman)" />
    <ContextMenu ref="characterContextMenu">
        <ContextMenuLink icon="fa-regular fa-pen-to-square" :onClick="({ index, chars, ipa, roman }) => editSymbol(index, chars, ipa, roman)" desc="Edit this symbol"/>
        <ContextMenuLink icon="fa-solid fa-trash" :onClick="({ index }) => alphabet.splice(index, 1)" desc="Delete this symbol"/>
    </ContextMenu>

    <div class="main-header-wrapper" @click="cmenu.hide()">
        <h1 class="header">Script</h1>
        <p class="page-description">Designate the sound of symbols in {{ settings.name }} </p>
    </div>

    <div class="cards" @click="cmenu.hide()">
        <div class="card add-symbol" @click="form.openForm()">
            <span class="character">+</span>
        </div>

        <transition-group name="fade">
            <div class="card" v-for="(symbol, index) in alphabet" :key="index"
             @contextmenu.prevent="cmenu.show($event.pageX, $event.pageY, { index, chars: symbol.chars, ipa: symbol.ipa, roman: symbol.roman })"
             draggable="true" 
             @dragover.prevent
             @dragstart="dragging = index"
             @drop="dragEnd(index)"
             >
                <span class="character">{{ symbol.chars }}</span>
                <span class="ipa">/{{ symbol.ipa }}/</span>
            </div>
        </transition-group>

    </div>
</template>

<style scoped>
.cards {
    margin-left: 2rem;
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 10px;
    justify-items: start;
}

.card {
    aspect-ratio: 1/1;
    padding: 5px;
    border: 3px solid var(--accent-color);
    background-color: var(--darker-bg);
    border-radius: 1rem;
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: space-evenly;
    box-shadow: 10px 10px 5px hsla(0, 0%, 0%, 0.502);
}

.invisible-card {
    opacity: 0;
}

.character {
    font-size: 3rem;
}

.ipa {
    font-size: 1rem;
}

.add-symbol {
  transition: all 0.3s ease;
  cursor: pointer;
}

.add-symbol:hover {
  background-color: var(--accent-color);
}

.fade-move,
.fade-enter-active, 
.fade-leave-active {
  transition: all 0.3s ease;
}

.ifade-enter-active,
.ifade-leave-active {
  transition: all 1s ease;
}
 
.fade-enter-from, .ifade-enter-from,
.fade-leave-to, .ifade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  position: absolute;
}

</style>