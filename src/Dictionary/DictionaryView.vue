<script setup>
import { ref, useTemplateRef } from 'vue';
import { groups, wordsInGroup, generateID, dictionary, getSpellingWithDashes, showSearch, currentView, highlightedWord, highlightWord, renameGroup, sortBy, descending, sortWords, noWords } from './dictionary';
import NewWordForm from '@/Dictionary/NewWordForm.vue';
import ContextMenu from '@/Components/ContextMenu.vue';
import ContextMenuLink from '@/Components/ContextMenuLink.vue';
import { settings, setUndoFunction } from '@/save';
import Search from './Search.vue';
import AskForInput from '@/Components/AskForInput.vue';
import { IPAfromSpelling } from '@/Script/script';

let timeout;
let lastDeleted;
const justDeleted = ref(false)
const wordContextMenu = useTemplateRef('wordContextMenu')
const groupContextMenu = useTemplateRef('groupContextMenu')
const wordList = useTemplateRef('word-list')
const ask = useTemplateRef('askForInput')



setInterval(() => {
  const element = wordList.value?.find(element => element.id == highlightedWord.value)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}, 100)

const isHoveringGroupSelect = ref(false)
const onNewGroupMount = (el) => {
  if (el) el.focus()
}

const getWords = () => wordsInGroup(currentView.value).sort(sortWords)

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
  highlightWord(id)
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
  addNewWord(existingId.value, form.value.destination, spelling, definition, pronounciation, typeOfAffix, notes, favorite)
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

const handleDrop = dropIndex => {
  // treat 'dragging' like a word id
  if (typeof dragging == 'number') {
    dictionary.value[dragging].group = groups.value[dropIndex]
    return
  }
  // treat 'dragging' like the name of a group
  const draggingIndex = groups.value.indexOf(dragging)
  const groupBeingDragged = groups.value.splice(draggingIndex, 1)[0]
  groups.value.splice(dropIndex, 0, groupBeingDragged)

}

const generateIPAforAllWords = () => {
  for (const id in dictionary.value) {
    dictionary.value[id].pronounciation = IPAfromSpelling(dictionary.value[id].spelling)
  }
}
</script>

<template>
  <div class="main-header-wrapper" @click="showSearch = false">
    <h1 class="header">Dictionary</h1>
    <p class="page-description">Catalogue the words of {{ settings.name }}</p>
    <div class="header-break" />
    
    <div class="sort-by-options">
      <span class="sort-by clickable" :title="descending ? 'descending' : 'ascending'"><i class="fa-solid fa-arrow-up" :class="{'down ': descending }" @click="descending = !descending"></i></span>
      <span class="sort-by clickable" :class="{'selected': sortBy == 'spelling'}" @click="sortBy = 'spelling'">spelling</span>
      <span class="sort-by clickable" :class="{'selected': sortBy == 'definition'}" @click="sortBy = 'definition'">definition</span>
    </div>

    <div class="header-break" />
    <i class="fa-solid fa-wand-magic-sparkles clickable" title="Generate IPA from spelling for all words in the dictionary" @click="generateIPAforAllWords()"></i> 
  </div> 

  <ContextMenu ref="wordContextMenu">
    <ContextMenuLink 
      icon="fa-regular fa-star" 
      :onClick="({ id }) => dictionary[id].favorite = !dictionary[id].favorite"
      desc="Favorite this word"
    />
    <ContextMenuLink 
      icon="fa-regular fa-pen-to-square" 
      :onClick="({ id }) => editWord(id)" 
      desc="Edit this word"
    />
    <ContextMenuLink 
      icon="fa-solid fa-trash" 
      :onClick="({ id }) => deleteWord(id)" 
      desc="Delete this word"
    />
  </ContextMenu>

  <ContextMenu ref="groupContextMenu">
    <ContextMenuLink 
      icon="fa-regular fa-pen-to-square" 
      :onClick="({ x, y, index }) => {ask.show(x, y, groups[index], 'whats the new name?', (value, i) => renameGroup(i, value), index)}" 
      desc="Rename this group"
    />
    <ContextMenuLink 
      icon="fa-solid fa-trash" 
      :onClick="({ index }) => groups.splice(index, 1)" 
      desc="Delete this group, its words will still exist through the search bar"
    />
  </ContextMenu>

  <AskForInput ref="askForInput" />

  <transition name="fade">
    <h3 v-if="justDeleted" @click="undoDelete" class="undo active">Undo</h3>
  </transition>

  <transition name="slide">
    <search @keydown.esc="showSearch = false" v-if="showSearch" />
  </transition>
  <new-word-form ref="form" @close="handleClose()"  @submit.prevent="handleSubmit" /> 


  <div class="dictionary">

    <div class="group-select-wrapper no-scrollbar" @mouseenter="isHoveringGroupSelect = true"  @mouseleave="isHoveringGroupSelect = false" >
      <span class="group-select all" :class="{'selected': currentView == '*'}" @click="currentView = '*'"> all </span>
      <span class="group-select clickable" v-for="(group, index) in groups" :key="index" draggable="true" @dragstart="dragging = group" @dragover.prevent @drop="handleDrop(index)" :class="{'selected': currentView == group}" @click="currentView = group" @contextmenu.prevent="groupContextMenu.show($event.pageX, $event.pageY, { index, x: $event.pageX, y: $event.pageY })"> {{ group }}</span>
      
      <transition name="ifade">
        <input class="new-group" :ref="onNewGroupMount" v-if="isHoveringGroupSelect" placeholder="type the name of your new group then hit enter" @keypress.enter="groups.push($event.target.value); $event.target.value=''">
      </transition> 

    </div>

    <ul class="words">
      <li class="add-word clickable word-container" @click="openNewWordForm({group: currentView})">
        <span class="new-word-text"> + </span>
      </li>
      <h2 v-if="noWords()"> Make some words!</h2>

        <transition-group name="fade">
          <li class="word-container" ref="word-list" :id="word.id" :class="{'highlight': highlightedWord == word.id}" v-for="word in getWords()" :key="word.id" draggable="true" @dragstart="handleDragStart(word.id)" @contextmenu.prevent="wordContextMenu.show($event.pageX, $event.pageY, {id: word.id})">
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
*:not(.header):not(i) {
  font-weight: 100;
}

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

.sort-by-wrapper {
  display: flex;
  padding: 0;
}

.sort-by {
  margin-left: 10px;
}

.sort-by > .fa-arrow-up {
  transition: all 0.3s ease;
}

.down {
  transition: all 0.3s ease;
  transform: rotateZ(181deg);
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

.group-select-wrapper {
  display: flex;
  gap: 10px;
  margin-bottom: 0;
  overflow-anchor: none;
  /* min-width: 0; */
  /* scrollbar-width: 0px; */
}

.group-select {
  padding: 5px;
  margin-bottom: 0;
  font-size: 1.3rem;
  flex-shrink: 0; 
}

.new-group {
  width: 300px;
  flex: 0 1 300px;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
}

.selected {
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


