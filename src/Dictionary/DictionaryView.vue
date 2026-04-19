<script>
import { ref } from 'vue';
import { nouns, verbs, adjectives } from './dictionary';
import NewWordForm from '@/components/NewWordForm.vue';
export default {
  name: 'DictionaryView',
  components: { NewWordForm },
  setup() {
    // 
    let timeout;
    let lastDeleted;
    const justDeleted = ref(false)

    const deleteWord = (index, list) => {

      switch (list) {
        case 'noun':
          lastDeleted = [nouns.value.splice(index, 1), 'noun']
          break
        case 'adjective':
          lastDeleted = [adjectives.value.splice(index, 1), 'adjective']
          break
        case 'verb':
          lastDeleted = [verbs.value.splice(index, 1), 'verb']
          break
      }
      justDeleted.value = true

      if (!timeout) {
        timeout = setTimeout(() => justDeleted.value = false, 3000)
      } else {
        clearTimeout(timeout)
        timeout = setTimeout(() => justDeleted.value = false, 3000)
      }
    }

    const undoDelete = () => {
      console.log(lastDeleted[0][0])
      switch (lastDeleted[1]) {
        case 'noun':
          nouns.value.push(lastDeleted[0][0])
          break
        case 'adjective':
          adjectives.value.push(lastDeleted[0][0])
          break
        case 'verb':
          verbs.value.push(lastDeleted[0][0])
          break
      }
      justDeleted.value = false
    }

    const form = ref(null)
    const addNewWord = (destination) => {
      form.value.openForm(destination)
    }
    const handleSubmit = (event) => {
      event.preventDefault()
      const { spelling, definition, pron } = form.value.newWordData
      form.value.clearForm()
      form.value.modal.close()
      
      switch (form.value.destination) {
        case 'noun':
          nouns.value.push({ spelling, definition, pronounciation: pron})
          break
        case 'adjective':
          adjectives.value.push({ spelling, definition, pronounciation: pron})
          break
        case 'verb':
          verbs.value.push({ spelling, definition, pronounciation: pron})
          break
      }

    }
    

    return { nouns, verbs, adjectives, modal: form, justDeleted, addNewWord, handleSubmit, deleteWord, undoDelete }
  }
}
</script>

<template>
  <h1 class="main-header">Dictionary</h1>
  <transition name="undo-trans">
    <h3 v-if="justDeleted" @click="undoDelete" class="undo active">undo delete</h3>
  </transition>

  <div class="dictionary">
    <ul class="list noun-list">

      <div class="list-header"> 
        <h2 class="section-name header">nouns</h2>
        <h3 class="new-word" @click="addNewWord('noun')">+</h3>
      </div>

      <li v-for="(noun, index) in nouns" :key="index" @dblclick="deleteWord(index, 'noun')">
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
        <h3 class="new-word" @click="addNewWord('adjective')">+</h3>
      </div>

      <li v-for="(adjective, index) in adjectives" :key="index" @dblclick="deleteWord(index, 'adjective')">
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
        <h3 class="new-word" @click="addNewWord('verb')">+</h3>
      </div>

      <li v-for="(verb, index) in verbs" :key="index" @dblclick="deleteWord(index, 'verb')">
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
.main-header {
  margin-bottom: 0;
  text-align: left;
  margin-left: 2rem;
}

.undo {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);

  cursor: pointer;
}

.undo-trans-enter-active, 
.undo-trans-leave-active {
    transition: opacity 0.5s;
}

.undo-trans-enter-from,
.undo-trans-leave-to {
    opacity: 0;
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


