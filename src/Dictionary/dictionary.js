import { computed, ref } from 'vue'

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

export const nouns =  computed(
    () => Object.values(dictionary.value).filter(entry => entry.partOfSpeech == 'noun').sort((a, b) => a.spelling.localeCompare(b.spelling))
)
export const pronouns = computed(
    () => Object.values(dictionary.value).filter(entry => entry.partOfSpeech == 'pronoun').sort((a, b) => a.spelling.localeCompare(b.spelling))
)
export const verbs = computed(
    () => Object.values(dictionary.value).filter(entry => entry.partOfSpeech == 'verb').sort((a, b) => a.spelling.localeCompare(b.spelling))
)
export const particles = computed(
    () => Object.values(dictionary.value).filter(entry => entry.partOfSpeech == 'particle').sort((a, b) => a.spelling.localeCompare(b.spelling))
)
export const adjectives = computed(
    () => Object.values(dictionary.value).filter(entry => entry.partOfSpeech == 'adjective').sort((a, b) => a.spelling.localeCompare(b.spelling))
)

