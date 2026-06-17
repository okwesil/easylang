<script setup>
import { ref, computed, useTemplateRef } from 'vue';
import { dictionary, noWords } from '@/Dictionary/dictionary';
import { wordsSimilarTo } from './sentences.js';


const modal = ref(null)
const wordsAdded = ref([])
const currentlyTyped = ref('')
const meaning = ref('')
const topWords = computed(() => wordsSimilarTo(currentlyTyped.value,  8))
const emit = defineEmits([ 'done' ])
const wordsAddedElements = useTemplateRef('words-added-elements')
const deleteMode = ref(false)

const openForm = (startingIds = null, startingMeaning = null) => {
    if (startingIds != null) {
        wordsAdded.value = startingIds.filter(id => id in dictionary.value)
    }
    if (startingMeaning != null) {
        meaning.value = startingMeaning
    }
    modal.value.showModal()
}

const validation = () => {
    if (wordsAdded.value.length == 0) {
        return "Add some words to your sentence first"
    }

    const firstWord = wordsAdded.value[0]
    const lastWord = wordsAdded.value[wordsAdded.value.length - 1]
    
    if (dictionary.value[firstWord].typeOfAffix == 'suffix') {
        return "Sentences can't start with suffixes"
    }

    if (dictionary.value[lastWord].typeOfAffix == 'prefix' ) {
        return "Sentences can't end with prefixes"
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
    emit('done')
}

const clearForm = () => {
    meaning.value = ''
    wordsAdded.value.length = 0
    currentlyTyped.value = ''
}

const dragging = ref(null)
const handleDrop = index => {
    const id = wordsAdded.value.splice(dragging.value, 1)[0]
    wordsAdded.value.splice(index, 0, id)
    dragging.value = null
    dragLeave(index)
}

const dragEnter = index => {
    if (dragging.value > index) {
        wordsAddedElements.value[index].style.borderLeft = '2px solid var(--accent-color)'
    } else {
        wordsAddedElements.value[index].style.borderRight = '2px solid var(--accent-color)'
    }
}

const dragLeave = index => {
    wordsAddedElements.value[index].style.border = 'none'
}

defineExpose({ openForm, clearForm, wordsAdded, meaning })
</script>

<template>
    <dialog ref="modal">
        <div class="exit clickable">
            <i class="fa-solid fa-x" @click="modal.close()"></i>
        </div>

        <form @submit.prevent="handleSubmit" v-if="!noWords()">
            <h4>Make a new sentence</h4>
            <div class="words-added-container">
                <h3 class="word" ref="words-added-elements" 
                    :class="{'delete': deleteMode}"
                    v-for="(id, index) in wordsAdded" :key="index" 
                    :draggable="!deleteMode" @dragstart="dragging = index" @dragover.prevent @dragenter="dragEnter(index)" @dragleave="dragLeave(index)"
                    @drop="handleDrop(index)"
                    @click="() => { if (deleteMode) wordsAdded.splice(index, 1) }"
                >
                        {{ dictionary[id].spelling }}
                </h3>
                <div class="backspace clickable" :class="{'delete': deleteMode}" @click="deleteMode = !deleteMode" title="Toggle Delete Mode"><i class="fa-solid fa-delete-left"></i></div>
            </div>

            <!-- word autocomplete -->
            <input class="autocomplete-input" @keypress.enter="() => {wordsAdded.push(topWords[0]); currentlyTyped = ''}" type="text" v-model="currentlyTyped" placeholder="type the word that you want to add...">

            <!-- <div class="spelling-or-definition">
                <p class="sort-by">sort by -> </p>
                <p class="definition toggle" :class="{'on': !sortBySpelling }" @click="sortBySpelling = false">definition </p>
                <p class="spelling toggle" :class="{'on': sortBySpelling}" @click="sortBySpelling = true">spelling</p>
            </div> -->

            <p>hit <b>ENTER</b> to add the underlined word to your sentence</p>

            <div class="top-word">
                <div v-for="(id, index) in topWords" class="autocomplete-word clickable" :class="{'best-word': index === 0}" :key="index" @click="wordsAdded.push(id)">{{ dictionary[id].spelling }} <b>{{ dictionary[id].definition }}</b></div>
            </div>
            
            <span>Sentence Meaning</span>
            <input type="text" v-model="meaning" @keypress.enter="handleSubmit" required placeholder="hit ENTER to create this sentence">
        </form>
        <h3 v-else>Create some words first :)</h3>
    </dialog>
</template>

<style scoped>

.words-added-container {
    display: flex;
    height: 1.5rem;
}

.backspace {
    margin-left: auto;
    transition: all 0.3s ease;
    align-items: center;
    padding: 0 0.3rem;
    color: white;
}

.backspace.delete {
    animation: flashing 1s infinite;
    color: red;
}

.word {
    text-align: center;
    margin-right: 5px;
    margin-top: 0;
    margin-bottom: 0;
    width: fit-content;
    height: fit-content;
    cursor: grab;
}

.word.delete:hover {
    cursor: pointer;
    color: hsl(0, 100%, 40%);
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

form {
  display: flex;
  gap: 20px;
  flex-direction: column;
  margin: 20px;
  text-align: left;
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

.top-word {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-auto-flow: column;
    column-gap: 12px;
}

.autocomplete-word {
    overflow: hidden;
}

.on {
    border-bottom: 3px solid var(--accent-color);
}

.best-word {
    text-decoration: underline var(--accent-color);
}

b {
    color: hsl(0, 0%, 48%);
}

</style>

