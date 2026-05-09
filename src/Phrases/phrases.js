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
            suffixes.push(id)
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

const removeAccents = string => string.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
const removeSpecials = string => string.replace(/\P{L}/gu, "")

export const wordsSimilarTo = (testString, checkforSpelling) => {
    if (testString == '') {
        return Object.keys(dictionary.value).slice(0, 4)
    }
    let values = [] // either an array of [id, spelling] or [id, definition]
    if (checkforSpelling) {
        values = Object.values(dictionary.value).map(entry => [entry.id, removeAccents(entry.spelling)])
    } else {
        values = Object.values(dictionary.value).map(entry => [entry.id, removeSpecials(entry.definition)])
    }
    const distances = values.map(([ id, string ]) => [id, getLevenshteinDistance(testString, string)]).sort((a, b) => a[1] - b[1])
    return distances.slice(0, 4).map(entry => entry[0]) // return the id of the top 4 words
} 

// this makes the algorithm prioritze matching characters over having the same length
const SUB_COST = 1
const INS_DEL_COST = 0.2
// courtesy of gemini
function getLevenshteinDistance(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
        } else {
        matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + SUB_COST, // substitution
            matrix[i][j - 1] + INS_DEL_COST,     // insertion
            matrix[i - 1][j] + INS_DEL_COST      // deletion
        );
        }
    }
    }
    return matrix[b.length][a.length];
}
