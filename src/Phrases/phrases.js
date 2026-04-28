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

export const spellingOf = (id) => dictionary.value[id]?.spelling ?? '#'

export const generateMeaning = (ids) => ids.reduce((string, id) => string + (dictionary.value[id]?.definition ?? '[deleted]') + ' . ', '')

