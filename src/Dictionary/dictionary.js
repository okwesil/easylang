import { computed, ref, watch } from 'vue'
import { wordsSimilarTo } from '@/Sentences/sentences'

/*
    an object where the key of each entry is the id of the word and the values are ...
     
    the id
    partOfSpeech -> noun verb pronoun or particle
    spelling
    definition
    pronounciation (yes i know I spelled it wrong)
    dateCreated
    notes?
 
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

const favFirstSort = (a, b) => {
    if (a.favorite === b.favorite) {
        return a.spelling.localeCompare(b.spelling)
    }
    return a.favorite ? -1 : 1
}

export const nouns = () => Object.values(dictionary.value)
    .filter(entry => entry.partOfSpeech == 'noun')
    .sort(favFirstSort)

export const pronouns = () => Object.values(dictionary.value)
    .filter(entry => entry.partOfSpeech == 'pronoun')
    .sort(favFirstSort)

export const verbs = () => Object.values(dictionary.value)
    .filter(entry => entry.partOfSpeech == 'verb')
    .sort(favFirstSort)

export const particles = () => Object.values(dictionary.value)
    .filter(entry => entry.partOfSpeech == 'particle')
    .sort(favFirstSort)

export const adjectives = () => Object.values(dictionary.value)
    .filter(entry => entry.partOfSpeech == 'adjective')
    .sort(favFirstSort)

export const showSearch = ref(false)
export const searchValue = ref('')
export const currentView = ref('noun')
export const highlightedWord = ref(null)

export const showWord = (router, id) => {
    if (typeof id === 'undefined') {
        id = wordsSimilarTo(searchValue.value, 1)[0]
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