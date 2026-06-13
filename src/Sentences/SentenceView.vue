<script setup>
import { sentences, generateMeaning, spellingWithAffixes, meaningWithAffixes, sentenceFrom } from './sentences.js';
import { showWord } from '@/Dictionary/dictionary';
import { ref, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';
import NewSentence from './NewSentence.vue';
import ContextMenu from '@/Components/ContextMenu.vue';
import ContextMenuLink from '@/Components/ContextMenuLink.vue';
import { setUndoFunction } from '@/save';

const wordHovering = ref(null);
const sentenceHovering = ref(null);
const wordDef = useTemplateRef('word-definition')
const lastDeleted = ref(null)
const justDeleted = ref(false)
const form = useTemplateRef('form')
const contextMenu = useTemplateRef('contextMenu')
  
const handleMouseMove = e => {
  const [ x, y ] = [e.clientX, e.clientY]
  wordDef.value.style.left = `${x + 20}px`
  wordDef.value.style.top = `${y}px`
  if (wordHovering.value != null) {
    wordDef.value.innerHTML = meaningWithAffixes(wordHovering.value)
  }
}

const createNewSentence = () => {
  form.value.openForm()
}

const UNDO_WAIT_TIME = 5000;
let timeout; 
const deleteSentence = index => {
  lastDeleted.value = sentences.value.splice(index, 1)[0]
  
  justDeleted.value = true

  if (!timeout) {
    timeout = setTimeout(() => justDeleted.value = false, UNDO_WAIT_TIME)
  } else {
    clearTimeout(timeout)
    timeout = setTimeout(() => justDeleted.value = false, UNDO_WAIT_TIME)
  }
  
}

const undoDelete = () => {
  if (!lastDeleted.value) {
    return
  } 
  sentences.value.unshift(lastDeleted.value)
  lastDeleted.value = null
  justDeleted.value = false
}
setUndoFunction(undoDelete)

const editSentence = index => {
  const {ids, meaning} = sentences.value[index]
  deleteSentence(index)
  form.value.openForm(ids, meaning)
}

const router = useRouter()
const findWordWithRouter = id => showWord(router, id)

const handleSubmit = () => {
  sentences.value.unshift({ids: structuredClone(form.value.wordsAdded), meaning: form.value.meaning})
  form.value.clearForm()
}
</script>

<template>
  <div class="main-header-wrapper">
    <h1 class="header">Sentences</h1>
  </div>
  <div class="sentences" @click="() => { if (contextMenu) contextMenu.hide() }">
    <h1 class="new-sentence" @click="createNewSentence">+</h1>

    <transition name="fade">
      <h3 v-if="justDeleted" @click="undoDelete" class="undo">Undo</h3>
    </transition>

    <div ref="word-definition" class="word-def" v-show="wordHovering">hovering</div>

    <ContextMenu ref="contextMenu">
      <ContextMenuLink icon="fa-regular fa-pen-to-square" :onClick="(data) => editSentence(data.index)"></ContextMenuLink>
      <ContextMenuLink icon="fa-solid fa-trash" :onClick="(data) => deleteSentence(data.index)"></ContextMenuLink>
    </ContextMenu>
    <div class="sentence-list" @mousemove="handleMouseMove">


      <div v-for="(sentence, sentenceIndex) in sentences" :key="sentenceIndex" class="sentence" @mouseenter="sentenceHovering = sentenceIndex" @mouseleave="sentenceHovering = null" @contextmenu.prevent="contextMenu.show($event.pageX, $event.pageY, { index: sentenceIndex })">
        <div class="words">
          <span class="word" v-for="(word, wordIndex) in sentenceFrom(sentence.ids)" :key="wordIndex" @mouseenter="wordHovering = word" @mouseleave="wordHovering = null" @click="findWordWithRouter(word.id)">
            {{ spellingWithAffixes(word) }}
          </span>
        </div>
        <span class="sentence-meaning literal-meaning">
          {{ generateMeaning(sentenceFrom(sentence.ids)) }}
        </span>
        <span class="sentence-meaning">
          {{ sentence.meaning }}
        </span>
      </div>


    </div>
    <NewSentence ref="form" @done="handleSubmit"></NewSentence>
  </div>
</template>

<style scoped>
*:not(.header):not(i) {
  font-weight: 100;
}

.sentence-list {
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  margin-right: 2rem;
  gap: 20px;
}

.sentence {
  text-align: left;
  box-shadow: 10px 10px 5px hsla(0, 0%, 0%, 0.3);
  border: 3px solid var(--accent-color);

  border-radius: .5rem;
  padding: 5px;
  display: flex;
  flex-direction: column;
  width: fit-content;
}

.sentence-meaning {
  color: hsla(0, 0%, 100%, 0.685);
  font-size: 0.9rem;
  margin-top: 2px;
}

.words {
  display: flex;
  flex-wrap: wrap;
}

.word {
  font-size: 2.4rem;
  margin-right: 10px;
  transition: background-color 0.3s ease;
  border-radius: .5rem;
  box-sizing: border-box;
}

.word.delete {
  display: inline-flex;
  align-items: center;
}

.word:hover {
  outline: 3px dotted var(--accent-color);
}

.word-def {
  position: fixed;
  pointer-events: none;
  transform: translateY(-50%);
  background-color: var(--accent-color);
  color: white;
  padding: 10px;
  border-radius: 1rem;
  z-index: 10;
}

.new-sentence  {
  position: fixed;
  border: 2px solid var(--accent-color);
  background-color: var(--darker-bg);
  border-radius: 0.75rem;
  
  width: 5rem;
  height: 5rem;
  bottom: 10px;
  right: 10px;
  margin: 0;
  z-index: 1;
  
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  transition: 0.3s ease;

  user-select: none;
  cursor: pointer;
}

.new-sentence:hover {
  background-color: var(--accent-color);
}

.undo {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);

  cursor: pointer;
}

.delete {
  color: var(--accent-color);
  display: inline-flex;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>

