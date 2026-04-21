<template>
    <dialog ref="modal">
        <form @submit.prevent="handleSubmit">
            <label>Select Words to make a phrase</label>

            <h3 class="words-added">{{ wordsAdded.reduce((string, id) => string + dictionary[id].spelling + ' ', '' ) }}</h3>
            <div class="word-container">
                <div v-for="(word, id) in dictionary" :key="id" class="word" @click="wordsAdded.push(id)">
                    {{ word.spelling }}
                </div>
            </div>
            <input type="text" ref="input" required placeholder="what is the meaning of this phrase?">

        </form>
    </dialog>
</template>


<script>
import { useTemplateRef, ref } from 'vue';
import { dictionary } from '@/Dictionary/dictionary';


export default {
    name: 'NewPhrase',
    setup() {
        const modal = useTemplateRef('modal')
        const openForm = () => {
            modal.value.showModal()
        }

        const input = useTemplateRef('input')
        const wordsAdded = ref([])
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

        return {
            modal, dictionary, wordsAdded, input,
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

.word {
    text-align: center;
    border-radius: 0.5rem;
    transition: 0.3s ease;
}

.word:hover {
    background-color: var(--sidebar-bg-color);
}


</style>

