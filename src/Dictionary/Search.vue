<script>
import { wordsSimilarTo } from '@/Phrases/phrases';
import { dictionary, showWord, searchValue  } from './dictionary';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const searchInput = ref(null)
        const router = useRouter()

        onMounted(() => {
            searchInput.value.focus()
        })

        const findWordWithRouter = id => showWord(router, id)

        return {
            searchValue, dictionary, searchInput,
            wordsSimilarTo, findWord: findWordWithRouter
        }
    }
}
</script>

<template>
    <div class="search-box-wrapper">
        <form @submit.prevent="findWord()">
            <input ref="searchInput" type="text" placeholder="find..." v-model="searchValue">
            <div class="results">
                <div class="result" v-for="(id, index) in wordsSimilarTo(searchValue, 3)" :key="index" @click="findWord(id)" >
                    {{ dictionary[id].spelling }} -> {{ dictionary[id].definition }}
                </div>
            </div>
        </form>
    </div>
</template>


<style scoped>
.search-box-wrapper {
    position: fixed;
    right: 10px;
    top: 10px;
    padding: 10px;
    border-radius: 1rem;
    width: 40vw;
}

input {
    font-size: 2rem;
    background-color: var(--darker-bg);
    border-radius: .5rem;
    box-shadow: 10px 10px 5px hsla(0, 0%, 0%, 0.3);
    color: white;
    margin-bottom: 10px;
}

.results {
    display: flex;
    flex-wrap: nowrap;
    gap: 5px;
    background-color: var(--bg-color);
}

.result { 
    padding: 5px;
    border: 2px solid var(--accent-color);
    border-radius: .5rem;
    font-size: 1.5rem;
    overflow: hidden;
    white-space: nowrap;
    box-shadow: 10px 10px 5px hsla(0, 0%, 0%, 0.3);
    transition: background-color 0.3s ease;
}

.result:hover {
    background-color: var(--accent-color);
}

</style>