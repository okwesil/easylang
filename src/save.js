import { currentView, dictionary, groups, showSearch } from './Dictionary/dictionary';
import { sentences } from './Sentences/sentences';
import { keysOfUserSounds } from './Script/sounds';
import { watch, ref, reactive } from 'vue'
import { currentUser, db } from './firebase.js';
import { doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore';
import { alphabet } from './Script/script';
import { grammarJSON } from './Grammar/grammar';

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
        settings: settings.value,
        id: languageId,
        groups: groups.value,
        alphabet: alphabet.value,
        grammar: grammarJSON.value,
    }
}

export const notification = ref({
    text: '',
    persist: false,
    warning: false,
})

watch(notification, (val) => {
    if (val.text != '') {
        setTimeout(() => notification.value.text = '', 500)
    }
}, { deep: true })
export const save = () => {   
    fillNonExistentValues()
    const languageString = JSON.stringify(getLanguageData())
    localStorage.setItem('language', languageString)    
    // only save to Firestore when there is a signed-in user and enough time has passed
    if (currentUser.value && (Date.now() - lastWrite) > 5000) {
        lastWrite = Date.now()
        saveToDb()
    }
}

const saveToDb = async () => {
    try {
        await setDoc(await languageDoc(), getLanguageData())
        notification.value.text = 'Saved'
    } catch (error) {
        notification.value.text = 'Error while saving, try reloading'
        notification.value.warning = true
        console.error(getLanguageData())
        console.error('error while trying to save', error)
    }
}

export const load = async (useDb = true) => {
    let parsed = null;
    findDoc: if (currentUser.value && useDb) {
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
        delete dictionary.value[key].groups
    }
    migratePartOfSpeechToGroup()
    sentences.value = parsed.sentences ?? parsed.phrases
    languageId = parsed.id
    groups.value = parsed.groups
    currentView.value = groups.value[0]
    alphabet.value = parsed.alphabet ?? []
    grammarJSON.value = parsed.grammar ?? {}
    fillNonExistentValues()

    // autosave
    watch(dictionary, () => save(), { deep: true })
    watch(sentences, () => save(), { deep: true })
    watch(groups, () => save(), { deep: true })
    watch(alphabet, () => save(), { deep: true })
    watch(grammarJSON, () => save(), { deep: true })
    watch(settings, () => {
        // hue
        const hueString = `hsl(${settings.value.hue}, 65%, 29%)`
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
    settings.value = { hue: 0, name: 'easyLang', font: 'Merriweather' }
    groups.value = []
    alphabet.value = []
    grammarJSON.value = {}
}

const undo = ref(() => null)

export const setUndoFunction = func => {
    undo.value = func
}

export const copyToClipboard = text => {
    try {
        navigator.clipboard.writeText(text)
        notification.value.text = `Copied  '${text.slice(0, 10)}...'`
    }  catch (err) {
        console.error('Error while printing', err)
    }
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
        if (e.key == 's') {
            e.preventDefault()
            copyToClipboard(JSON.stringify(getLanguageData()))
        }
        if (e.key == 'l') {
            e.preventDefault()
            load(false)
        }
    }
};

//default values
export const settings = ref({
    hue: 0,
    name: 'easyLang',
    font: 'Merriweather'
})
