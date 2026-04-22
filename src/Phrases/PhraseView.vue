<script>
import { phrases, generateMeaning, spellingOf } from './phrases';
import { dictionary } from '@/Dictionary/dictionary';
import { ref, useTemplateRef } from 'vue';
import NewPhrase from './NewPhrase.vue';

export default {
  name: 'PhraseView',
  components: { NewPhrase },
  setup() {
    const hovering = ref(null);
    const wordDef = useTemplateRef('word-definition')
    const lastDeleted = ref(null)
    const justDeleted = ref(false)
    const form = useTemplateRef('form')
    
      
    const handleMouseMove = e => {
      const [ x, y ] = [e.clientX, e.clientY]
      wordDef.value.style.left = `${x + 20}px`
      wordDef.value.style.top = `${y}px`
      if (hovering.value != null) {
        wordDef.value.innerHTML = dictionary.value[hovering.value]?.definition ?? '[deleted]'
      }
    }

    const createNewPhrase = () => {
      form.value.openForm()
    }

    let timeout; 
    const deletePhrase = index => {
      lastDeleted.value = phrases.value.splice(index, 1)[0]
      
      justDeleted.value = true

      if (!timeout) {
        timeout = setTimeout(() => justDeleted.value = false, 3000)
      } else {
        clearTimeout(timeout)
        timeout = setTimeout(() => justDeleted.value = false, 3000)
      }
      
    }

    const undoDelete = () => {
      phrases.value.push(lastDeleted.value)
      justDeleted.value = false
    }

    const editPhrase = index => {
      const {ids, meaning} = phrases.value[index]
      deletePhrase(index)
      form.value.openForm(ids, meaning)
    }

    const handleSubmit = e => {
      phrases.value.push({ids: structuredClone(form.value.wordsAdded), meaning: form.value.input.value})
      form.value.clearForm()
    }

    return {
      phrases, dictionary, hovering, justDeleted,
      handleMouseMove, generateMeaning, spellingOf, createNewPhrase, handleSubmit, editPhrase, deletePhrase, undoDelete
    }
  }
}
</script>

<template>
  <div class="phrases"  >
    <div class="main-header-wrapper">
      <h1 class="header">Phrases</h1>
      <h1 class="new-phrase" @click="createNewPhrase">+</h1>
    </div>
    <transition name="fade">
      <h3 v-if="justDeleted" @click="undoDelete" class="undo">Undo</h3>
    </transition>

    <div ref="word-definition" class="word-def" v-show="hovering">hovering</div>

    <div class="phrase-list" @mousemove="handleMouseMove">


      <div v-for="(phrase, index) in phrases" :key="index" class="phrase" @dblclick="deletePhrase(index)" @contextmenu.prevent="editPhrase(index)">
        <div class="words">
          <span class="word" v-for="(id, index) in phrase.ids" :key="index" @mouseenter="hovering = id" @mouseleave="hovering = null">
            {{ spellingOf(id) }}
          </span>
        </div>
        <span class="phrase-meaning literal-meaning">
        LITERAL -> {{ generateMeaning(phrase.ids) }}
        </span>
        <span class="phrase-meaning">
          {{ phrase.meaning }}
        </span>
      </div>


    </div>
    <new-phrase ref="form" @submit="handleSubmit"></new-phrase>
  </div>
</template>

<style scoped>

.phrases {
  overflow: none;
}

.phrase-list {
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  margin-right: 2rem;
  gap: 40px;
}

.phrase {
  text-align: left;
  border-bottom: 3px solid var(--sidebar-bg-color);
  display: flex;
  flex-direction: column;
  width: fit-content;
}

.phrase-meaning {
  color: rgba(255, 255, 255, 0.685);
}

.words {
  display: flex;
  flex-wrap: wrap;
}

.word {
  font-size: 3.5rem;
  margin-right: 10px;
  transition: background-color 0.3s ease;
  border-radius: .5rem;
}

.word:hover {
  border: 3px dotted var(--sidebar-bg-color);
}

.word-def {
  position: absolute;
  pointer-events: none;
  transform: translateY(-50%);
  background-color: var(--sidebar-bg-color);
  color: white;
  padding: 10px;
  border-radius: 1rem;
}

.new-phrase  {
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

.undo {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);

  cursor: pointer;
}

</style>

