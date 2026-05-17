<script>
import { phrases, generateMeaning, spellingOf, meaningOf, sentenceFrom } from './phrases';
import { dictionary } from '@/Dictionary/dictionary';
import { ref, useTemplateRef } from 'vue';
import NewPhrase from './NewPhrase.vue';
import { setUndoFunction } from '@/save';

export default {
  name: 'PhraseView',
  components: { NewPhrase },
  setup() {
    const wordHovering = ref(null);
    const phraseHovering = ref(null);
    const wordDef = useTemplateRef('word-definition')
    const lastDeleted = ref(null)
    const justDeleted = ref(false)
    const form = useTemplateRef('form')
    
      
    const handleMouseMove = e => {
      const [ x, y ] = [e.clientX, e.clientY]
      wordDef.value.style.left = `${x + 20}px`
      wordDef.value.style.top = `${y}px`
      if (wordHovering.value != null) {
        wordDef.value.innerHTML = meaningOf(wordHovering.value)
      }
    }

    const createNewPhrase = () => {
      form.value.openForm()
    }

    const UNDO_WAIT_TIME = 5000;
    let timeout; 
    const deletePhrase = index => {
      lastDeleted.value = phrases.value.splice(index, 1)[0]
      
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
      phrases.value.unshift(lastDeleted.value)
      lastDeleted.value = null
      justDeleted.value = false
    }
    setUndoFunction(undoDelete)

    const editPhrase = index => {
      const {ids, meaning} = phrases.value[index]
      deletePhrase(index)
      form.value.openForm(ids, meaning)
    }

    const handleSubmit = e => {
      phrases.value.unshift({ids: structuredClone(form.value.wordsAdded), meaning: form.value.meaning})
      form.value.clearForm()
    }

    return {
      phrases, dictionary, wordHovering, phraseHovering, justDeleted,
      handleMouseMove, generateMeaning, spellingOf, createNewPhrase, handleSubmit, editPhrase, deletePhrase, undoDelete, sentenceFrom
    }
  }
}
</script>

<template>
  <div class="phrases"  >
    <h1 class="new-phrase" @click="createNewPhrase">+</h1>

    <div class="main-header-wrapper">
      <h1 class="header">Phrases</h1>
    </div>
    <transition name="fade">
      <h3 v-if="justDeleted" @click="undoDelete" class="undo">Undo</h3>
    </transition>

    <div ref="word-definition" class="word-def" v-show="wordHovering">hovering</div>

    <div class="phrase-list" @mousemove="handleMouseMove">


      <div v-for="(phrase, phraseIndex) in phrases" :key="phraseIndex" class="phrase" @mouseenter="phraseHovering = phraseIndex" @mouseleave="phraseHovering = null" @contextmenu.prevent="editPhrase(phraseIndex)">
        <div class="words">
          <span class="word" v-for="(word, index) in sentenceFrom(phrase.ids)" :key="index" @mouseenter="wordHovering = word" @mouseleave="wordHovering = null">
            {{ spellingOf(word) }}
          </span>
          <transition name="fade">
            <span class="word delete" v-if="phraseHovering == phraseIndex" @click="deletePhrase(phraseIndex)"><i class="fa-solid fa-xmark"></i></span>
          </transition>
        </div>
        <span class="phrase-meaning literal-meaning">
        LITERAL -> {{ generateMeaning(sentenceFrom(phrase.ids)) }}
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

.phrase-list {
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  margin-right: 2rem;
  gap: 40px;
}

.phrase {
  text-align: left;
  border-bottom: 3px solid var(--accent-color);
  display: flex;
  flex-direction: column;
  width: fit-content;
}

.phrase-meaning {
  color: hsla(0, 0%, 100%, 0.685);
}

.words {
  display: flex;
  flex-wrap: wrap;
}

.word {
  font-size: 3rem;
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

.new-phrase  {
  position: fixed;
  border: 2px solid var(--accent-color);
  background-color: var(--darker-bg);
  border-radius: 0.75rem;
  
  width: 5rem;
  height: 5rem;
  bottom: 10px;
  right: 10px;
  margin: 0;
  z-index: 2;
  
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  transition: 0.3s ease;

  user-select: none;
  cursor: pointer;
}

.new-phrase:hover {
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

