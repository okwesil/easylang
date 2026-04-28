<template>
    <dialog ref="modal">
        <form @submit.prevent="handleSubmit">
            <label>Select Words to make a phrase</label>

            <div class="words-added-container">
                <h3 class="words-added">{{ wordsAdded.reduce((string, id) => string + dictionary[id].spelling + ' ', '' ) }}</h3>
                <h3 class="backspace" @click="wordsAdded.pop()"><i class="fa-solid fa-delete-left"></i></h3>
            </div>
            <h4 class="hovered-word">{{ dictionary[hovering]?.definition ?? '--' }}</h4>
            <div class="word-container">
                <div v-for="word in sortedDictionary" :key="word.id" class="word" @click="wordsAdded.push(word.id)" @mouseenter="hovering = word.id" @mouseleave="hovering = null">
                    {{ word.spelling }}
                </div>
            </div>
            <input type="text" ref="input" required placeholder="what is the meaning of this phrase?">

        </form>
    </dialog>
</template>


<script>
import { useTemplateRef, ref } from 'vue';
import { dictionary, sortedDictionary } from '@/Dictionary/dictionary';


export default {
    name: 'NewPhrase',
    setup() {
        const modal = useTemplateRef('modal')
        const input = useTemplateRef('input')
        const wordsAdded = ref([])

        const openForm = (startingWords = null, startingMeaning = null) => {
            if (startingWords != null) {
                wordsAdded.value = startingWords.filter(id => id in dictionary.value)
                input.value.value = startingMeaning
            }
            modal.value.showModal()
        }

        const handleSubmit = e => {
            if (wordsAdded.value.length == 0) {
                alert('add some words to your phrase')
                e.stopPropagation()
                return
            }
            modal.value.close()
        }
        const clearForm = () => {
            input.value.value = ''
            wordsAdded.value.length = 0
        }
        
        const hovering = ref(null)

        return {
            modal, dictionary, sortedDictionary, wordsAdded, input, hovering,
            openForm, handleSubmit, clearForm
        }
    }
}

</script>


<style scoped>
dialog {
    background-color: var(--bg-color);
    color: white;
    border: 5px solid var(--sidebar-bg-color);
    border-radius: 1rem;
}


.word-container {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
}

.words-added {
    border-bottom: 2px solid var(--sidebar-bg-color);
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
    background-color: var(--sidebar-bg-color);
}

.hovered-word {
    margin: 0;
}



</style>

