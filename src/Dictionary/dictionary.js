import { computed, ref } from 'vue'


export const dictionary = ref(
    {
        1: { id: 1, partOfSpeech: 'noun', spelling: 'lón', definition: 'a male human being', pronounciation: 'lɔn' },
        2: { id: 2, partOfSpeech: 'noun', spelling: 'saghe', definition: 'a female human being', pronounciation: 'saɰɛ' },
        3: { id: 3, partOfSpeech: 'noun', spelling: 'viya', definition: 'a langauge', pronounciation: 'viya' }, 

        4: { id: 4, partOfSpeech: 'verb', spelling: 'ri', definition: 'to go to a place', pronounciation: 'ɹi' },
        5: { id: 5, partOfSpeech: 'verb', spelling: 'ja', definition: 'to have, alienable posession', pronounciation: 'dʒa' },
        6: { id: 6, partOfSpeech: 'verb', spelling: 'sé', definition: 'to do something', pronounciation: 'se' },

        7: { id: 7, partOfSpeech: 'adjective', spelling: 'hou', definition: 'big or large', pronounciation: 'hou' },
        8: { id: 8, partOfSpeech: 'adjective', spelling: 'ikun', definition: 'bad or evil', pronounciation: 'ikun' },
        9: { id: 9, partOfSpeech: 'adjective', spelling: 'yona', definition: 'good great', pronounciation: 'jona' },

    }
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
export const verbs = computed(
    () => Object.values(dictionary.value).filter(entry => entry.partOfSpeech == 'verb')
)
export const adjectives = computed(
    () => Object.values(dictionary.value).filter(entry => entry.partOfSpeech == 'adjective')
)

