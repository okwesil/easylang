import { dictionary } from './Dictionary/dictionary';
import { phrases } from './Phrases/phrases';
import { keysOfUserSounds } from './Phonetics/sounds';

export const save = () => {
    const language = {
        dictionary: dictionary.value, phrases: phrases.value,
        sounds: keysOfUserSounds.value
    }
    localStorage.setItem('language', JSON.stringify(language))    
}
export const load = (json = localStorage.getItem('language')) => {
    const unparsed = json
    if (!unparsed) {
        alert('Save something first :(')
        return
    }
    if (!unparsed) {
        return
    }
    const parsed = JSON.parse(unparsed)
    dictionary.value = parsed.dictionary
    phrases.value = parsed.phrases
    keysOfUserSounds.value = parsed.sounds
}
