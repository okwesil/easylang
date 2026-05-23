<script>
import { ref } from 'vue';
import { nouns, verbs, adjectives, pronouns, particles, generateID, dictionary, getSpellingWithDashes, showSearch, currentView, highlightedWord } from './dictionary';
import NewWordForm from '@/Dictionary/NewWordForm.vue';
import { setUndoFunction } from '@/save';
import Search from './Search.vue';

export default {
  name: 'DictionaryView',
  components: { NewWordForm, Search },
  setup() {
    // 
    let timeout;
    let lastDeleted;
    const justDeleted = ref(false)

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
      addNewWord(lastDeleted.partOfSpeech, lastDeleted.spelling, lastDeleted.definition, lastDeleted.pronounciation, lastDeleted.id, lastDeleted?.typeOfAffix ?? 'standalone')
      justDeleted.value = false
      lastDeleted = null
    }
    setUndoFunction(undoDelete)

    const form = ref(null)
    const openNewWordForm = (destination, startSpelling = null, startDef, startPron, startTypeOfAffix) => {
      if (destination == 'modifier') destination = "adjective"
      form.value.openForm(destination, startSpelling, startDef, startPron, startTypeOfAffix)
    }

    const addNewWord = (partOfSpeech, spelling, definition, pronounciation, _id, typeOfAffix) => {
      let id;
      if (!_id) {
        id = generateID()
      } else {
        id = _id
      }
      dictionary.value[id] = {id, partOfSpeech, spelling, definition, pronounciation, typeOfAffix}
    }


    // stores the id of the last 
    const existingId = ref(null)

    const editWord = id => {
      let word = dictionary.value[id];
      deleteWord(id)
      existingId.value = id

      openNewWordForm(word.partOfSpeech, word.spelling, word.definition, word.pronounciation, word?.typeOfAffix)
    }

    const handleSubmit = () => {
      const { spelling, definition, pron, typeOfAffix } = form.value.newWordData
      form.value.clearForm()
      form.value.modal.close()
      addNewWord(form.value.destination, spelling, definition, pron, existingId.value, typeOfAffix)
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
      dictionary.value[dragging].partOfSpeech = view == 'modifier' ? 'adjective' : view
    }

    return { 
      nouns, verbs, adjectives, pronouns, particles, modal: form, justDeleted, currentView, showSearch, highlightedWord,
      openNewWordForm, handleSubmit, deleteWord, undoDelete, addNewWord, editWord, getSpellingWithDashes, getWords, handleClose, handleDragStart, handleDrop
    }
  }
}
</script>

<template>
  <div class="main-header-wrapper" @click="showSearch = false">
    <h1 class="header">Dictionary</h1>
    <p class="info">double click to delete, right click to edit</p>
  </div> 

  <transition name="fade">
    <h3 v-if="justDeleted" @click="undoDelete" class="undo active">Undo</h3>
  </transition>

  <div class="dictionary" @click="showSearch = false">

    <div class="list-select-wrapper">
      <span class="list-select" @dragover.prevent @drop="handleDrop('pronoun')" :class="{'selected': currentView == 'pronoun' }" @click="currentView = 'pronoun'">pronouns</span>
      <span class="list-select" @dragover.prevent @drop="handleDrop('noun')" :class="{'selected': currentView == 'noun' }" @click="currentView = 'noun'">nouns</span>
      <span class="list-select" @dragover.prevent @drop="handleDrop('verb')" :class="{'selected': currentView == 'verb' }" @click="currentView = 'verb'">verbs</span>
      <span class="list-select" @dragover.prevent @drop="handleDrop('modifier')" :class="{'selected': currentView == 'modifier' }" @click="currentView = 'modifier'">modifiers</span>
      <span class="list-select" @dragover.prevent @drop="handleDrop('particle')" :class="{'selected': currentView == 'particle' }" @click="currentView = 'particle'">particles</span>
    </div>

    <ul class="list">
        <li class="add-word word-container" @click="openNewWordForm(currentView)">
          <span class="new-word-text"> + </span>
        </li>

      <li class="word-container" :class="{'highlight': highlightedWord == word.id}" v-for="word in getWords()" :key="word.id" draggable="true" @dragstart="handleDragStart(word.id)" @dblclick="deleteWord(word.id, 'word')" @contextmenu.prevent="editWord(word.id)">
        <span class="word-spelling">
          {{ getSpellingWithDashes(word.id) }}
        </span>
        <span class="word-def"> 
          {{ word.definition }}
        </span>
      </li>
      
    </ul>

    <new-word-form ref="modal" @close="handleClose()"  @submit.prevent="handleSubmit" />
    <transition name="slide">
      <search v-if="showSearch" />
    </transition>
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

  cursor: pointer;
}

.header {
  margin-bottom: 0;
} 

.main-header-wrapper {
  margin-bottom: 10px;
}

.list {
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

.slide-enter-active, 
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-200%);
}

</style>


