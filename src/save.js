import { dictionary } from './Dictionary/dictionary';
import { phrases } from './Phrases/phrases';

export const save = () => {
    const language = {
        dictionary: dictionary.value, phrases: phrases.value
    }
    localStorage.setItem('language', JSON.stringify(language))    
}
export const load = (json = localStorage.getItem('language'), firstTime = false) => {
    const unparsed = json
    if (!unparsed && !firstTime) {
        alert('Save something first :(')
        return
    }
    if (!unparsed) {
        return
    }
    const parsed = JSON.parse(unparsed)
    dictionary.value = parsed.dictionary
    phrases.value = parsed.phrases
}
