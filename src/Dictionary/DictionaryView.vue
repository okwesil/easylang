<script setup>
import { ref, useTemplateRef, watch } from 'vue';
import { nouns, verbs, adjectives, pronouns, particles, generateID, dictionary, getSpellingWithDashes, showSearch, currentView, highlightedWord } from './dictionary';
import NewWordForm from '@/Dictionary/NewWordForm.vue';
import ContextMenu from '@/Components/ContextMenu.vue';
import ContextMenuLink from '@/Components/ContextMenuLink.vue';
import { setUndoFunction } from '@/save';
import Search from './Search.vue';

let timeout;
let lastDeleted;
const justDeleted = ref(false)
const contextMenu = useTemplateRef('contextMenu')
const wordList = useTemplateRef('word-list')

watch(highlightedWord, (newVal) => {
  if (newVal != null) {
    setTimeout(() => {
      wordList.value.find(element => element.id == newVal).scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }
})

const getWords = () => {
  switch (currentView.value) {
    case 'pronoun':
      return pronouns();
    case 'noun':
      return nouns();
    case 'verb':
      return verbs();
    case 'modifier':
      return adjectives();
    case 'particle':
      return particles();
  }
}

const UNDO_WAIT_TIME = 5000;
const deleteWord = (id, save = true) => {
  if (save) {
    lastDeleted = structuredClone(dictionary.value[id])
  }

  delete dictionary.value[id]
  
  justDeleted.value = true

  if (!timeout) {
    timeout = setTimeout(() => justDeleted.value = false, UNDO_WAIT_TIME)
  } else {
    clearTimeout(timeout)
    timeout = setTimeout(() => justDeleted.value = false, UNDO_WAIT_TIME)
  }
}

const undoDelete = () => {
  if (!lastDeleted) {
    return
  }
  addNewWord(lastDeleted.id, lastDeleted.group, lastDeleted.spelling, lastDeleted.definition, lastDeleted.pronounciation, lastDeleted?.typeOfAffix ?? 'standalone', lastDeleted?.notes ?? '', lastDeleted?.favorite ?? false)
  justDeleted.value = false
  lastDeleted = null
}
setUndoFunction(undoDelete)

const form = ref(null)
const openNewWordForm = (startingWord) => {
  form.value.openForm(startingWord)
}

const addNewWord = (_id, group, spelling, definition, pronounciation, typeOfAffix, notes, favorite) => {
  let id;
  if (!_id) {
    id = generateID()
  } else {
    id = _id
  }
  dictionary.value[id] = {id, group, spelling, definition, pronounciation, typeOfAffix, notes, favorite}
  return id
}


// stores the id of the last 
const existingId = ref(null)

const editWord = id => {
  let word = dictionary.value[id];
  deleteWord(id)
  existingId.value = id

  openNewWordForm(word)
}

const handleSubmit = () => {
  const { spelling, definition, pronounciation, typeOfAffix, notes, favorite } = form.value.newWordData
  form.value.clearForm()
  form.value.modal.close()
  highlightedWord.value = addNewWord(existingId.value, form.value.destination, spelling, definition, pronounciation, typeOfAffix, notes, favorite)
  existingId.value = null
}

const handleClose = () => {
  if (!existingId.value) {
    return
  }
  undoDelete()
}

let dragging = null
const handleDragStart = id => {
  dragging = id
}

const handleDrop = view => {
  dictionary.value[dragging].group = view == 'modifier' ? 'adjective' : view
}
</script>

<template>
  <div class="main-header-wrapper" @click="showSearch = false; contextMenu.hide()">
    <h1 class="header">Dictionary</h1>
    <p class="info">right click on a word to open its menu</p>
  </div> 

  <ContextMenu ref="contextMenu">
    <ContextMenuLink icon="fa-regular fa-star" :onClick="(data) => dictionary[data.id].favorite = !dictionary[data.id].favorite"></ContextMenuLink>
    <ContextMenuLink icon="fa-regular fa-pen-to-square" :onClick="(data) => editWord(data.id)"></ContextMenuLink>
    <ContextMenuLink icon="fa-solid fa-trash" :onClick="(data) => deleteWord(data.id)"></ContextMenuLink>
  </ContextMenu>

  <transition name="fade">
    <h3 v-if="justDeleted" @click="undoDelete" class="undo active">Undo</h3>
  </transition>

  <transition name="slide">
    <search @keydown.esc="showSearch = false" v-if="showSearch" />
  </transition>
  <new-word-form ref="form" @close="handleClose()"  @submit.prevent="handleSubmit" /> 


  <div class="dictionary" @click="showSearch = false; contextMenu.hide()">

    <div class="list-select-wrapper">
      <span class="list-select" @dragover.prevent @drop="handleDrop('pronoun')" :class="{'selected': currentView == 'pronoun' }" @click="currentView = 'pronoun'">pronouns</span>
      <span class="list-select" @dragover.prevent @drop="handleDrop('noun')" :class="{'selected': currentView == 'noun' }" @click="currentView = 'noun'">nouns</span>
      <span class="list-select" @dragover.prevent @drop="handleDrop('verb')" :class="{'selected': currentView == 'verb' }" @click="currentView = 'verb'">verbs</span>
      <span class="list-select" @dragover.prevent @drop="handleDrop('modifier')" :class="{'selected': currentView == 'modifier' }" @click="currentView = 'modifier'">modifiers</span>
      <span class="list-select" @dragover.prevent @drop="handleDrop('particle')" :class="{'selected': currentView == 'particle' }" @click="currentView = 'particle'">particles</span>
    </div>

    <ul class="words">
        <li class="add-word word-container" @click="openNewWordForm({group: currentView})">
          <span class="new-word-text"> + </span>
        </li>

        <transition-group name="fade">
          <li class="word-container" ref="word-list" :id="word.id" :class="{'highlight': highlightedWord == word.id}" v-for="word in getWords()" :key="word.id" draggable="true" @dragstart="handleDragStart(word.id)" @contextmenu.prevent="contextMenu.show($event.pageX, $event.pageY, {id: word.id})">
            <span class="word-spelling">
              {{ getSpellingWithDashes(word.id) }}
            </span>
            <span class="word-def"> 
              {{ word.definition }}
            </span>
            <i v-if="word.favorite" class="star fa-solid fa-star"></i>
          </li>
        </transition-group>
      
    </ul>
  </div>
</template>

<style scoped>

.dictionary {
  padding-left: 2rem;
  padding-right: 1rem;
}

.undo {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  cursor: pointer;
}

.header {
  margin-bottom: 0;
} 

.main-header-wrapper {
  margin-bottom: 10px;
}

.words {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0;
}

.section-name {
  text-align: left;
  margin-left: 10px;
}

.word-spelling {
  font-size: 2.5rem; /* Slighting smaller to balance scale */
  margin: 0;
  white-space: nowrap;
}

.word-def {
  display: block;
  white-space: nowrap; 
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.7);
  width: auto;
}

li {
  position: relative;
  justify-content: center;
  /* text-align: left; */
  /* width: 25%; */
  border: 2px solid var(--accent-color);
  height: max-content;
  width: max-content;
  display: flex;
  border-radius: 0.5rem;
  background-color: var(--darker-bg);
  padding: 0.5rem 1.3rem 0.5rem 1.3rem;
  flex-direction: column;
  gap: 0.25rem;
  flex-shrink: 0;
  transition: background-color 0.3s ease;
  box-shadow: 10px 10px 5px hsla(0, 0%, 0%, 0.502);
}

.star {
  color: var(--accent-color);
  position: absolute;
  top: 5px;
  right: 5px;
}


.highlight {
  background-color: var(--accent-color);
}

.list-header {
  display: flex;
  align-items: center;
}

.list-select-wrapper {
  display: flex;
  gap: 10px;
  margin-bottom: 0;
}

.list-select {
  cursor: pointer;
  transition: 0.3s ease;
  padding: 5px;
  margin-bottom: 0;
  font-size: 1.3rem;
}

.list-select:hover, .selected {
  border-bottom: 3px solid var(--accent-color);
}

.new-word-text {
  font-size: 4rem;
}

.add-word {
  transition: all 0.3s ease;
  cursor: pointer;
}

.add-word:hover {
  background-color: var(--accent-color);
}

dialog {
  background-color: var(--bg-color);
  color: white;
  border: 5px solid var(--accent-color);
  border-radius: 1rem;
}

.fade-move,
.fade-enter-active, 
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  position: absolute;
}

</style>


