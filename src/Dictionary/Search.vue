<script>
import { wordsSimilarTo } from '@/Phrases/phrases';
import { dictionary, findWord, searchValue  } from './dictionary';
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const searchInput = ref(null)
        onMounted(() => {
            searchInput.value.focus()
        })

        return {
            searchValue, dictionary, searchInput,
            wordsSimilarTo, findWord
        }
    }
}
</script>

<template>
    <div class="search-box-wrapper">
        <form @submit.prevent="findWord()">
            <input ref="searchInput" type="text" v-model="searchValue">
            <div class="results">
                <div class="result" v-for="(id, index) in wordsSimilarTo(searchValue, true, 3)" :key="index" @click="findWord(id)" >
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
    background-color: var(--bg-color);
    box-shadow: 10px 10px 5px hsla(0, 0%, 0%, 0.3);
}

form {
    margin: 0;
}

input {
    font-size: 2rem;
    background-color: var(--darker-bg);
}

.results {
    margin-top: 5px;
    display: flex;
    gap: 5px;
}
.result { 
    padding: 5px;
    border: 2px solid var(--accent-color);
    border-radius: .5rem;
    font-size: 1.5rem;
    overflow: hidden;
    transition: background-color 0.3s ease;
}

.result:hover {
    background-color: var(--accent-color);
}

</style>