import { dictionary } from './Dictionary/dictionary';
import { phrases } from './Phrases/phrases';
import { keysOfUserSounds } from './Phonetics/sounds';
import { watch, ref } from 'vue'


export const save = async e => {   
    const language = JSON.stringify({
        dictionary: dictionary.value, phrases: phrases.value,
        sounds: keysOfUserSounds.value,
        settings: settings.value
    })
    localStorage.setItem('language', language)    

    if (e && e.ctrlKey) {
        e.preventDefault()
        try {
            await navigator.clipboard.writeText(language)
        } catch (err) {
            console.error('failed to copy save data')
        }
    }
}

export const load = (json = localStorage.getItem('language')) => {
    // autosave
    watch(dictionary, () => save(), { deep: true })
    watch(phrases, () => save(), { deep: true })
    watch(keysOfUserSounds, () => save(), { deep: true })
    watch(settings, () => {save()}, { deep: true })

    const unparsed = json
    if (!unparsed) {
        return
    }
    const parsed = JSON.parse(unparsed)
    dictionary.value = parsed.dictionary
    phrases.value = parsed.phrases
    keysOfUserSounds.value = parsed.sounds ?? []
    loadSettings(parsed.settings)


}


const undo = ref(() => null)

export const setUndoFunction = func => {
    undo.value = func
}

export const onKeypress = (e) => {
    if (e.ctrlKey) {
        if (e.key == 'z') {
            undo.value()
        }
    }
};

export const updateHue = () => {
    const hueString = `hsl(${settings.value.hue}, 65%, 28%)`
    document.documentElement.style.setProperty('--accent-color', hueString)
}

export const updateName = () => {
    document.title = settings.value.name == '' ? 'easyLang' : settings.value.name 
}

//default values
export const settings = ref({
    hue: 0,
    name: 'easyLang'
})

const loadSettings = newSettings => {
    if (newSettings.hue) {
        settings.value.hue = newSettings.hue
        updateHue(settings.value.hue)
    }
    if (newSettings.name) {
        settings.value.name = newSettings.name
        updateName()
    }
}

