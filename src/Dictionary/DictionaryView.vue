<script>
import { ref } from 'vue';
import { nouns, verbs, adjectives, generateID, dictionary } from './dictionary';
import NewWordForm from '@/components/NewWordForm.vue';
export default {
  name: 'DictionaryView',
  components: { NewWordForm },
  setup() {
    // 
    let timeout;
    let lastDeleted;
    const justDeleted = ref(false)

    const deleteWord = (id, save = true) => {
      if (save) {
        lastDeleted = structuredClone(dictionary.value[id])
      }

      delete dictionary.value[id]
      
      justDeleted.value = true

      if (!timeout) {
        timeout = setTimeout(() => justDeleted.value = false, 3000)
      } else {
        clearTimeout(timeout)
        timeout = setTimeout(() => justDeleted.value = false, 3000)
      }
    }

    const undoDelete = () => {
      addNewWord(lastDeleted.partOfSpeech, lastDeleted.spelling, lastDeleted.definition, lastDeleted.pronounciation, lastDeleted.id)
      justDeleted.value = false
    }

    const form = ref(null)
    const openNewWordForm = (destination, startSpelling = '', startDef = '', startPron = '') => {
      form.value.openForm(destination, startSpelling, startDef, startPron)
    }

    const addNewWord = (partOfSpeech, spelling, definition, pronounciation, _id) => {
      let id;
      if (!_id) {
        id = generateID()
      } else {
        id = _id
      }
      dictionary.value[id] = {id, partOfSpeech, spelling, definition, pronounciation}
    }

    const editWord = (e, id) => {
      e.preventDefault()
      let word = dictionary.value[id];
      deleteWord(id)
      openNewWordForm(word.partOfSpeech, word.spelling, word.definition, word.pronounciation)
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      const { spelling, definition, pron } = form.value.newWordData
      form.value.clearForm()
      form.value.modal.close()
      addNewWord(form.value.destination, spelling, definition, pron)
    }
    

    return { 
      nouns, verbs, adjectives, modal: form, justDeleted, 
      openNewWordForm, handleSubmit, deleteWord, undoDelete, addNewWord, editWord
    }
  }
}
</script>

<template>
  <div class="main-header-wrapper">
    <h1 class="header">Dictionary</h1>
    <p class="info">double click to delete, right click to edit</p>
  </div> 

  <transition name="fade">
    <h3 v-if="justDeleted" @click="undoDelete" class="undo active">Undo</h3>
  </transition>

  <div class="dictionary">
    <ul class="list noun-list">

      <div class="list-header"> 
        <h2 class="section-name header">nouns</h2>
        <h3 class="new-word" @click="openNewWordForm('noun')">+</h3>
      </div>

      <li v-for="noun in nouns" :key="noun.id" @dblclick="deleteWord(noun.id, 'noun')" @contextmenu="editWord($event, noun.id)">
        <div class="word-info">
          <h3 class="word-spelling">
            {{ noun.spelling }}
          </h3>
          <span class="word-pron"> 
            {{ noun.pronounciation }}
          </span>
        </div>
        <span class="word-def">
          {{ noun.definition }}
        </span>
      </li>
    </ul>
    
    <ul class="list adjective-list">
      <div class="list-header">
        <h2 class="section-name header">adjective</h2>
        <h3 class="new-word" @click="openNewWordForm('adjective')">+</h3>
      </div>

      <li v-for="adjective in adjectives" :key="adjective.id" @dblclick="deleteWord(adjective.id, 'adjective')" @contextmenu="editWord($event, adjective.id)">
        <div class="word-info">
          <h3 class="word-spelling">
            {{ adjective.spelling }}
          </h3>
          <span class="word-pron"> 
            {{ adjective.pronounciation }}
          </span>
        </div>
        <span class="word-def">
          {{ adjective.definition }}
        </span>
      </li>
    </ul>

    <ul class="list verb-list">
      <div class="list-header">
        <h2 class="section-name header">verbs</h2>
        <h3 class="new-word" @click="openNewWordForm('verb')">+</h3>
      </div>

      <li v-for="verb in verbs" :key="verb.id" @dblclick="deleteWord(verb.id, 'verb')" @contextmenu="editWord($event, verb.id)">
        <div class="word-info">
          <h3 class="word-spelling">
            {{ verb.spelling }}
          </h3>
          <span class="word-pron"> 
            {{ verb.pronounciation }}
          </span>
        </div>
        <span class="word-def">
          {{ verb.definition }}
        </span>
      </li>
    </ul>

    <new-word-form ref="modal" @submit="handleSubmit"></new-word-form>
  </div>
</template>

<style scoped>


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

.section-name {
  text-align: left;
  margin-left: 10px;
}

.word-spelling {
  text-align: left;
  position: relative;
  font-size: 2rem;
  margin: 0;
  flex-shrink: 0;
  min-width: fit-content;
  display: flex;
  align-items: center;
}
.word-def {
  display: flex;
  align-items: center;
  flex: 1;
  padding-left: 10px;
  padding-right: 10px;
  height: 100%;
  font-size: 2cqi;
  color: rgba(255, 255, 255, 0.831);
}
.word-pron {
  color: #a8a2a2dd;
}
.word-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex-shrink: 0;
  min-width: fit-content;
  padding-left: 10px;
}

.dictionary {
  display: flex;
  justify-content: space-around;
  gap: 10px;
  padding-left: 1rem;
  padding-right: 1rem;
}

.list {
  list-style-type: none;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 0 0 20px;
  gap: 10px;
}


li {
  text-align: left;
  width: 100%;
  border: 2px solid var(--sidebar-bg-color);
  display: flex;
  height: 5rem;
  border-radius: 0.5rem;
  background-color: #191c1c;
  gap: 1rem;
  /* align-items: flex-start; */
}

.list-header {
  display: flex;
  align-items: center;
}

.new-word  {
  margin-bottom: 0;
  margin-left: 0.5rem;
  border: 2px solid var(--sidebar-bg-color);
  border-radius: 0.75rem;
  width: 1.5rem;
  height: 1.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;
  cursor: pointer;
}

dialog {
  background-color: var(--bg-color);
  color: white;
  border: 5px solid var(--sidebar-bg-color);
  border-radius: 1rem;
}

</style>


