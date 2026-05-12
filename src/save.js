import { dictionary } from './Dictionary/dictionary';
import { phrases } from './Phrases/phrases';
import { keysOfUserSounds } from './Phonetics/sounds';
import { watch, ref } from 'vue'
import { currentUser, db } from './firebase.js';
import { doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore';

export const makeLanguageId = () => Math.floor(Math.random() * 1000);
let languageId;
let lastWrite = Date.now();
const languageDoc = async (find = false) => {
    if (find) {
        const snap = await getDocs(collection(db, currentUser.value.uid))
        return doc(db, currentUser.value.uid, snap.docs[0].id)
    }
    return doc(db, currentUser.value.uid, languageId.toString())
}
const getLanguageData = () => {
    return {
        dictionary: dictionary.value, phrases: phrases.value,
        sounds: keysOfUserSounds.value,
        settings: settings.value,
        id: languageId 
    }
}

export const notificationText = ref('')
export const save = () => {   
    const languageString = JSON.stringify(getLanguageData())
    localStorage.setItem('language', languageString)    
    // only save to Firestore when there is a signed-in user and enough time has passed
    if (currentUser.value && Date.now() - lastWrite > 1000) {
        lastWrite = Date.now()
        saveToDb()
    }
}

const saveToDb = async () => {
    try {
        await setDoc(await languageDoc(), getLanguageData())
        notificationText.value = 'Saved'
        setTimeout(() => notificationText.value = '', 500)
    } catch (error) {
        console.error('error while trying to save', error)
    }
}

export const load = async () => {
    // autosave
    watch(dictionary, () => {save(); console.log('dictionary updated')}, { deep: true })
    watch(phrases, () => {save(); console.log('phrases updated')}, { deep: true })
    watch(keysOfUserSounds, () => {save(); console.log('sounds updated')}, { deep: true })
    watch(settings, () => {save(); console.log('settings updated')}, { deep: true })

    let parsed = null;
    if (currentUser.value) {
        const snapshot = await getDoc(await languageDoc(true))
        if (snapshot.exists()) {
            parsed = snapshot.data()
            console.log(parsed)
        }
    }

    if (parsed == null) {
        const unparsed = localStorage.getItem('language')
        if (!unparsed) {
            return
        }
        parsed = JSON.parse(unparsed)
    } 

    dictionary.value = parsed.dictionary
    phrases.value = parsed.phrases
    keysOfUserSounds.value = parsed.sounds ?? []
    languageId = parsed.id ?? makeLanguageId()
    loadSettings(parsed.settings)
}

export const clearSave = () => {
    localStorage.removeItem('language')
    dictionary.value = {}
    phrases.value = []
    settings.value.hue = 0
    updateHue()
    settings.value.name = 'easyLang'
    keysOfUserSounds.value = []
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
    const hueString = `hsl(${settings.value.hue}, 65%, 20%)`
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

