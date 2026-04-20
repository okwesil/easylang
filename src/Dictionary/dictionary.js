import { computed, ref } from 'vue'


export const dictionary = ref(
    {}
)

export const generateID = () => {
    let id = Math.round(Math.random() * 1000)
    while (Object.keys(dictionary).includes(id)) {
        id = Math.round(Math.random() * 1000)
    }
    return id
}

export const nouns =  computed(
    () => Object.values(dictionary.value).filter(entry => entry.partOfSpeech == 'noun')
)
export const pronouns = computed(
    () => Object.values(dictionary.value).filter(entry => entry.partOfSpeech == 'pronoun')
)
export const verbs = computed(
    () => Object.values(dictionary.value).filter(entry => entry.partOfSpeech == 'verb')
)
export const particles = computed(
    () => Object.values(dictionary.value).filter(entry => entry.partOfSpeech == 'particle')
)
export const adjectives = computed(
    () => Object.values(dictionary.value).filter(entry => entry.partOfSpeech == 'adjective')
)

