import { ref } from 'vue';
import { dictionary } from '@/Dictionary/dictionary';
// words is an array of the ids of words in the dictionary
export const phrases = ref([])

export const spellingOf = (id) => dictionary.value[id]?.spelling ?? '?'

export const generateMeaning = (ids) => ids.reduce((string, id) => string + (dictionary.value[id]?.definition ?? '[deleted]') + ' . ', '')

