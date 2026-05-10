<template>
    <dialog ref="modal">
        <div class="exit">
            <i class="fa-solid fa-x" @click="modal.close()"></i>
        </div>

        <form @submit.prevent="handleSubmit">
            <h4>Make a new phrase</h4>
            <div class="words-added-container">
                <h3 class="words-added">{{ wordsAdded.reduce((string, id) => string + dictionary[id].spelling + ' ', '' ) }}</h3>
                <h3 class="backspace" @click="wordsAdded.pop()"><i class="fa-solid fa-delete-left"></i></h3>
            </div>

            <!-- word autocomplete -->
            <form @submit.prevent="(e) => {e.stopPropagation(); wordsAdded.push(topWords[0]); currentlyTyped = ''}">
                <input class="autocomplete-input" type="text" v-model="currentlyTyped" required placeholder="type the word that you want to add...">
            </form>

            <div class="spelling-or-definition">
                <p class="sort-by">sort by -> </p>
                <p class="definition toggle" :class="{'on': !sortBySpelling }" @click="sortBySpelling = false">definition </p>
                <p class="spelling toggle" :class="{'on': sortBySpelling}" @click="sortBySpelling = true">spelling</p>
            </div>

            <p>hit <b>ENTER</b> to add the underlined word to your phrase</p>

            <div class="top-word">
                <div v-for="(id, index) in topWords" :class="{'best-word': index === 0}" :key="index" @click="wordsAdded.push(id)">{{ dictionary[id].spelling + ' -> ' + dictionary[id].definition}}</div>
            </div>
            
            <input type="text" v-model="meaning" required placeholder="what is the meaning of this phrase?">
        </form>
    </dialog>
</template>


<script>
import { ref, computed } from 'vue';
import { dictionary, sortedDictionary } from '@/Dictionary/dictionary';
import { wordsSimilarTo } from './phrases';


export default {
    name: 'NewPhrase',
    setup() {
        const modal = ref(null)
        const wordsAdded = ref([])
        let currentlyTyped = ref('')
        let meaning = ref('')
        const sortBySpelling = ref(true)
        const topWords = computed(() => wordsSimilarTo(currentlyTyped.value, sortBySpelling.value))

        const openForm = (startingWords = null, startingMeaning = null) => {
            if (startingWords != null) {
                wordsAdded.value = startingWords.filter(id => id in dictionary.value)
            }
            if (startingMeaning != null) {
                meaning = startingMeaning
            }
            modal.value.showModal()
        }

        const validation = () => {
            if (wordsAdded.value.length == 0) {
                return "Add some words to your phrase first"
            }

            const firstWord = wordsAdded.value[0]
            const lastWord = wordsAdded.value[wordsAdded.value.length - 1]
            
            if (dictionary.value[firstWord].typeOfAffix == 'suffix') {
                return "Phrases can't start with suffixes"
            }

            if (dictionary.value[lastWord].typeOfAffix == 'prefix' ) {
                return "Phrases can't end with prefixes"
            }

            return null
        }

        const handleSubmit = e => {
            const errorMsg = validation()
            if (errorMsg) {
                alert(errorMsg)
                e.stopPropagation()
                return
            }
            modal.value.close()
        }
        const clearForm = () => {
            meaning.value = ''
            wordsAdded.value.length = 0
            currentlyTyped.value = ''
        }
        
        const hovering = ref(null)

        return {
            modal, dictionary, sortedDictionary, wordsAdded, meaning, hovering, currentlyTyped, topWords, sortBySpelling,
            openForm, handleSubmit, clearForm, wordsSimilarTo
        }
    }
}

</script>


<style scoped>
dialog {
    background-color: var(--bg-color);
    color: white;
    border: 5px solid var(--accent-color);
    border-radius: 1rem;
}


.word-container {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
}

.words-added {
    border-bottom: 2px solid var(--accent-color);
}

.words-added-container {
    display: flex;
    justify-content: space-between;
}

.backspace {
    margin-left: 20px;
    cursor: pointer;
}

.word {
    text-align: center;
    border-radius: 0.5rem;
    transition: 0.3s ease;
    padding: 5px;
}

.word:hover {
    background-color: var(--accent-color);
}

.hovered-word {
    margin: 0;
}

.exit {
  position: absolute;
  top: 10px;
  right: 10px;
  width: fit-content;
  height: fit-content;
  color: white;
  cursor: pointer;
}

p {
    margin: 0;
    font-size: 0.7rem;
}

form > form {
    margin: 0;
}

.autocomplete-input {
    width: 100%;
}

.spelling-or-definition {
    display: flex;
}

.spelling, .definition {
    margin-left: 1rem;
}

.on {
    border-bottom: 3px solid var(--accent-color);
}

.best-word {
    text-decoration: underline;
}

b {
    color: var(--accent-color);
}

dialog {
    min-width: 20rem;
}

</style>

