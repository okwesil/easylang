import { computed, ref, watch } from 'vue'
import { wordsSimilarTo } from '@/Phrases/phrases'

/*
    an object where the key of each entry is the id of the word and the values are ...
     
    the id
    partOfSpeech -> noun verb pronoun or particle
    spelling
    definition
    pronounciation (yes i know I spelled it wrong)
    dateCreated
 
*/
export const dictionary = ref(
    {}
)

export const getSpellingWithDashes = id => {
    const word = dictionary.value[id]
    return (word.typeOfAffix == 'suffix' ? '-' : '') + word.spelling + (word.typeOfAffix == 'prefix' ? '-' : '')
}

export const sortedDictionary = computed(
    () => Object.values(dictionary.value).sort((a, b) => a.spelling.localeCompare(b.spelling))
)

export const generateID = () => {
    let id = Math.round(Math.random() * 1000)
    while (Object.keys(dictionary.value).includes(id)) {
        id = Math.round(Math.random() * 1000)
    }
    return id
}

export const nouns = () => Object.values(dictionary.value).filter(entry => entry.partOfSpeech == 'noun').sort((a, b) => a.spelling.localeCompare(b.spelling))

export const pronouns = () => Object.values(dictionary.value).filter(entry => entry.partOfSpeech == 'pronoun').sort((a, b) => a.spelling.localeCompare(b.spelling))

export const verbs = () => Object.values(dictionary.value).filter(entry => entry.partOfSpeech == 'verb').sort((a, b) => a.spelling.localeCompare(b.spelling))

export const particles = () => Object.values(dictionary.value).filter(entry => entry.partOfSpeech == 'particle').sort((a, b) => a.spelling.localeCompare(b.spelling))

export const adjectives = () => Object.values(dictionary.value).filter(entry => entry.partOfSpeech == 'adjective').sort((a, b) => a.spelling.localeCompare(b.spelling))

export const showSearch = ref(false)
export const searchValue = ref('')
export const currentView = ref('noun')
export const highlightedWord = ref(null)
watch(highlightedWord, (newVal) => {
    if (newVal != null) {
        setTimeout(() => highlightedWord.value = null, 800)
    }
})

export const showWord = (router, id) => {
    console.log(id, dictionary.value[id])
    if (typeof id === 'undefined') {
        id = wordsSimilarTo(searchValue.value, 'both', 1)[0]
        searchValue.value = ''
    }
    if (!router) {
        console.warn('findWord requires a router instance from useRouter()')
        return
    }
    router.push('/dictionary')

    const pof = dictionary.value[id].partOfSpeech
    currentView.value = pof == 'adjective' ? 'modifier' : pof
    showSearch.value = false
    highlightedWord.value = id
}