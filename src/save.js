import { currentView, dictionary, groups, showSearch } from './Dictionary/dictionary';
import { sentences } from './Sentences/sentences';
import { keysOfUserSounds } from './Phonetics/sounds';
import { watch, ref, reactive } from 'vue'
import { currentUser, db } from './firebase.js';
import { doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore';

export const makeLanguageId = () => Math.floor(Math.random() * 1000);
let languageId;
let lastWrite = Date.now();
const languageDoc = async (findLanguageDoc = false) => {
    if (findLanguageDoc) {
        const snap = await getDocs(collection(db, currentUser.value.uid))
        // new account
        if (!snap.docs[0]) {
            return undefined
        }
        return doc(db, currentUser.value.uid, snap.docs[0].id)
    }
    return doc(db, currentUser.value.uid, languageId.toString())
}
const getLanguageData = () => {
    return {
        dictionary: dictionary.value,
        sentences: sentences.value,
        sounds: keysOfUserSounds.value,
        settings: settings.value,
        id: languageId,
        groups: groups.value
    }
}

export const notificationText = ref('')
export const save = () => {   
    fillNonExistentValues()
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
        notificationText.value = 'Error while saving, try reloading'
        console.error(getLanguageData())
        console.error('error while trying to save', error)
    }
}

export const load = async () => {
    let parsed = null;
    findDoc: if (currentUser.value) {
        const doc = await languageDoc(true)
        if (!doc) break findDoc

        const snapshot = await getDoc(doc)
        if (snapshot.exists()) {
            parsed = snapshot.data()
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
    for (const key in dictionary.value) {
        if (dictionary.value[key].group == 'adjective') dictionary.value[key].group = 'modifier'
    }
    migratePartOfSpeechToGroup()
    sentences.value = parsed.sentences ?? parsed.phrases
    keysOfUserSounds.value = parsed.sounds ?? []
    languageId = parsed.id
    groups.value = parsed.groups
    currentView.value = groups.value[0]
    fillNonExistentValues()

    // autosave
    watch(dictionary, () => save(), { deep: true })
    watch(sentences, () => save(), { deep: true })
    watch(keysOfUserSounds, () => save(), { deep: true })
    watch(groups, () => save(), { deep: true })
    watch(settings, () => {
        // hue
        const hueString = `hsl(${settings.value.hue}, 65%, 25%)`
        document.documentElement.style.setProperty('--accent-color', hueString)
        // name
        document.title = settings.value.name == '' ? 'easyLang' : settings.value.name 
        // font
        document.documentElement.style.setProperty('--font', settings.value.font)
        save()
    }, { deep: true })
    settings.value = parsed.settings
}

const defaults = {
    'favorite': false,
    'notes': '',
    'groups': [ 'pronouns', 'nouns', 'verbs', 'modifiers', 'particles' ],
    'id': makeLanguageId()
}

const fillNonExistentValues = () => {
    for (const key in dictionary.value) {
        for (const field in defaults) {
            if (!Object.hasOwn(dictionary.value[key], field)) {
                dictionary.value[key][field] = defaults[field]
            }
        }
    }
}

const migratePartOfSpeechToGroup = () => {
    for (const key in dictionary.value) {
        if (Object.hasOwn(dictionary.value[key], 'partOfSpeech')) {
            dictionary.value[key].group = dictionary.value[key].partOfSpeech
            delete dictionary.value[key].partOfSpeech
        }
    }
}
 
export const clearSave = () => {
    localStorage.removeItem('language')
    dictionary.value = {}
    sentences.value = []
    settings.value.hue = 0
    settings.value.name = 'easyLang'
    keysOfUserSounds.value = []
}

const undo = ref(() => null)

export const setUndoFunction = func => {
    undo.value = func
}

export const onKeypress = (e) => {
    if (e.ctrlKey || e.metaKey) {
        if (e.key == 'z') {
            undo.value()
        }
        if (e.key == 'f') {
            e.preventDefault()
            showSearch.value = !showSearch.value
        }
    }
};

//default values
export const settings = ref({
    hue: 0,
    name: 'easyLang',
    font: 'Merriweather'
})
