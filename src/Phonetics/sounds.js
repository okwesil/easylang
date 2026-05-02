import { ref, computed } from 'vue'
export const sounds = ref({
    'm': { vowel: false, audio: new Audio('./assets/sounds/Bilabial_nasal.ogg')},
    'n': { vowel: false, audio: new Audio('./assets/sounds/Alveolar_nasal.ogg')},
    'p': { vowel: false, audio: new Audio('./assets/sounds/Voiceless_bilabial_plosive.ogg')},
    'b': { vowel: false, audio: new Audio('./assets/sounds/Voiced_bilabial_plosive.ogg')},
    't': { vowel: false, audio: new Audio('./assets/sounds/Voiceless_alveolar_plosive.ogg')},
    'd': { vowel: false, audio: new Audio('./assets/sounds/Voiced_alveolar_plosive.ogg')},
    'c': { vowel: false, audio: new Audio('./assets/sounds/Voiceless_palatal_plosive.ogg')},
    'ɟ': { vowel: false, audio: new Audio('./assets/sounds/Voiced_palatal_plosive.ogg')},
    'k': { vowel: false, audio: new Audio('./assets/sounds/Voiceless_velar_plosive.ogg')},
    'g': { vowel: false, audio: new Audio('./assets/sounds/Voiced_velar_plosive_02.ogg')},
    'q': { vowel: false, audio: new Audio('./assets/sounds/Voiceless_uvular_plosive.ogg')},
    'ɢ': { vowel: false, audio: null},
    'ʔ': { vowel: false, audio: new Audio('./assets/sounds/Glottal_stop.ogg')},
    'ts': { vowel: false, audio: null},
    'dz': { vowel: false, audio: null},
    'tʃ': { vowel: false, audio: new Audio('./assets/sounds/Voiceless_palato-alveolar_affricate.ogg')},
    'dʒ': { vowel: false, audio: new Audio('./assets/sounds/Voiced_palato-alveolar_affricate.ogg')},
    's': { vowel: false, audio: new Audio('./assets/sounds/Voiceless_alveolar_sibilant.ogg')},
    'z': { vowel: false, audio: new Audio('./assets/sounds/Voiced_alveolar_sibilant.ogg')},
    'ʃ': { vowel: false, audio: new Audio('./assets/sounds/Voiceless_palato-alveolar_sibilant.ogg')},
    'f': { vowel: false, audio: new Audio('./assets/sounds/Voiceless_labio-dental_fricative.ogg')},
    'v': { vowel: false, audio: new Audio('./assets/sounds/Voiced_labio-dental_fricative.ogg')},
    'θ': { vowel: false, audio: new Audio('./assets/sounds/Voiceless_dental_fricative.ogg')},
    'ð': { vowel: false, audio: new Audio('./assets/sounds/Voiced_dental_fricative.ogg')},
    'x': { vowel: false, audio: new Audio('./assets/sounds/Voiceless_velar_fricative.ogg')},
    'ɣ': { vowel: false, audio: new Audio('./assets/sounds/Voiced_velar_fricative.ogg')},
    'ʋ': { vowel: false, audio: new Audio('./assets/sounds/Labiodental_approximant.ogg')},
    'ɹ': { vowel: false, audio: new Audio('./assets/sounds/Alveolar_approximant.ogg')},
    'j': { vowel: false, audio: new Audio('./assets/sounds/Palatal_approximant.ogg')},
    'ɰ': { vowel: false, audio: new Audio('./assets/sounds/Voiced_velar_approximant.ogg')},
    'l': { vowel: false, audio: new Audio('./assets/sounds/Alveolar_lateral_approximant.ogg')},
    'r': { vowel: false, audio: new Audio('./assets/sounds/Alveolar_trill.ogg')},
    'ɾ': { vowel: false, audio: new Audio('./assets/sounds/Alveolar_tap.ogg')},
    'ʀ': { vowel: false, audio: new Audio('./assets/sounds/Uvular_trill.ogg')},

    

})

export const myKeys = ref([])

export const availableSounds = computed(
    () => {
        const keys = Object.keys(sounds.value).filter(key => !myKeys.value.includes(key));
        return Object.fromEntries(keys.map(key => [key, sounds.value[key]]))
    }
)

export const mySounds = computed(
    () => {
        const keys = Object.keys(sounds.value).filter(key => myKeys.value.includes(key));
        return Object.fromEntries(keys.map(key => [key, sounds.value[key]]))
    }
)

