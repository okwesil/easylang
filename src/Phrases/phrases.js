import { ref } from 'vue';
import { dictionary } from '@/Dictionary/dictionary';

// array of objects with the following kv pairs
// ids is an array of the ids of words in the dictionary
// meaning
/* 
    {
        ids: [982, 123, 143, 122]
        meaning: 'what do you want?'
    }

*/
export const phrases = ref([])



export const sentenceFrom = (ids) => {
    /**
     * @type {[{prefixes: Number[], suffixes: Number[], id: Number}]}
     */
    const sentence = []
    // the first prefix in the array is the one that is farthest from the word
    const prefixes = []
    const suffixes = []
    for (let i = 0; i < ids.length; i++) {
        const id = ids[i]
        const word = dictionary.value[id]

        if (word?.typeOfAffix == 'prefix') {
            prefixes.push(id)
            continue
        }

        if (word?.typeOfAffix == 'suffix') {
            suffixes.unshift(id)
            continue
        }

        // if its a standalone word

        // check if there are any suffixes
        if (suffixes.length > 0) {
            // pin the suffixes to the most recently computed word in the sentence
            sentence[sentence.length - 1].suffixes = structuredClone(suffixes)
            suffixes.length = 0
        }
        
        sentence.push({prefixes: structuredClone(prefixes), suffixes: [], id})
        prefixes.length = 0
    }

    // in case the sentence ends in a suffix
    if (suffixes.length > 0 && sentence.length > 0) {
        sentence[sentence.length - 1].suffixes = structuredClone(suffixes)
    }

    return sentence
}

// this is only called using a word from 'sentenceFrom' ^^^
export const spellingOf = word => {
    const prefixString = word.prefixes.map(id => dictionary.value[id].spelling).join('')
    const suffixString = word.suffixes.map(id => dictionary.value[id].spelling).join('')
    const spelling = dictionary.value[word.id]?.spelling ?? '#'
    return prefixString + spelling + suffixString
}

export const meaningOf = word => {
    const prefixString = word.prefixes.map(id => dictionary.value[id].definition).join(' ')
    const suffixString = word.suffixes.map(id => dictionary.value[id].definition).join('')
    const definition = dictionary.value[word.id]?.definition ?? '[deleted]'
    return `${prefixString} ${definition} ${suffixString}`
}

// this is only called using the sentence from 'sentenceFrom' ^^^
export const generateMeaning = sentence => sentence.map(word => meaningOf(word)).join(' . ')

