import { computed, ref, watch } from 'vue'
import { wordsSimilarTo } from '@/Sentences/sentences'

/*
    an object where the key of each entry is the id of the word and the values are ...
     
    the id
    group -> noun verb pronoun or particle
    spelling
    definition
    pronounciation (yes i know I spelled it wrong)
    dateCreated
    notes?
 
*/
export const dictionary = ref(
    {}
)

/**
 * array of all the possible word groups
 */
export const groups = ref([])
export const renameGroup = (index, name) => {
    const ids = wordsInGroup(groups.value[index]).map(entry => entry.id)
    for (const id of ids) {
        dictionary.value[id].group = name
    }
    if (currentView.value == groups.value[index]) currentView.value = name
    groups.value.splice(index, 1, name)
}

export const getSpellingWithDashes = id => {
    const word = dictionary.value[id]
    return (word.typeOfAffix == 'suffix' ? '-' : '') + word.spelling + (word.typeOfAffix == 'prefix' ? '-' : '')
}

export const sortedDictionary = computed(
    () => Object.values(dictionary.value).sort((a, b) => a.spelling.localeCompare(b.spelling))
)

export const generateID = () => {
    let id = Math.round(Math.random() * 1000)
    const keys = Object.keys(dictionary.value)
    while (keys.includes(id.toString())) {
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

export const wordsInGroup = (group) => Object.values(dictionary.value)
    .filter(entry => entry.group == group)
    .sort(favFirstSort)

export const showSearch = ref(false)
export const searchValue = ref('')
export const currentView = ref(groups.value[0])
export const highlightedWord = ref(null)
const HIGHLIGHT_DURATION_MS = 800
let highlightedWordResetTimeout = null

export const highlightWord = (id) => {
    highlightedWord.value = id
    if (highlightedWordResetTimeout) {
        clearTimeout(highlightedWordResetTimeout)
    }
    highlightedWordResetTimeout = setTimeout(() => {
        highlightedWord.value = null
        highlightedWordResetTimeout = null
    }, HIGHLIGHT_DURATION_MS)
}

export const showWord = (router, id) => {
    if (typeof id === 'undefined') {
        id = wordsSimilarTo(searchValue.value, 1)[0]
        searchValue.value = ''
    }

    if (!(id in dictionary.value)) return
    
    if (!router) {
        console.warn('findWord requires a router instance from useRouter()')
        return
    }
    router.push('/dictionary')

    const group = dictionary.value[id].group
    currentView.value = group
    showSearch.value = false
    highlightWord(id)
}