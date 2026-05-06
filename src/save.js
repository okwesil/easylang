import { dictionary } from './Dictionary/dictionary';
import { phrases } from './Phrases/phrases';
import { keysOfUserSounds } from './Phonetics/sounds';

export const save = async e => {   
    const language = JSON.stringify({
        dictionary: dictionary.value, phrases: phrases.value,
        sounds: keysOfUserSounds.value
    })
    localStorage.setItem('language', language)    

    if (e.ctrlKey) {
        e.preventDefault()
        try {
            await navigator.clipboard.writeText(language)
        } catch (err) {
            console.error('failed to copy save data')
        }
    }
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
    keysOfUserSounds.value = parsed.sounds ?? []
}
