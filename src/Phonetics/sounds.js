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
    'tʃ': { vowel: false, audio: new Audio('./assets/sounds/consonants/Voiceless_palato-alveolar_affricate.ogg')},
    'dʒ': { vowel: false, audio: new Audio('./assets/sounds/consonants/Voiced_palato-alveolar_affricate.ogg')},
    's': { vowel: false, audio: new Audio('./assets/sounds/consonants/Voiceless_alveolar_sibilant.ogg')},
    'z': { vowel: false, audio: new Audio('./assets/sounds/consonants/Voiced_alveolar_sibilant.ogg')},
    'ʃ': { vowel: false, audio: new Audio('./assets/sounds/consonants/Voiceless_palato-alveolar_sibilant.ogg')},
    'f': { vowel: false, audio: new Audio('./assets/sounds/consonants/Voiceless_labio-dental_fricative.ogg')},
    'v': { vowel: false, audio: new Audio('./assets/sounds/consonants/Voiced_labio-dental_fricative.ogg')},
    'θ': { vowel: false, audio: new Audio('./assets/sounds/consonants/Voiceless_dental_fricative.ogg')},
    'ð': { vowel: false, audio: new Audio('./assets/sounds/consonants/Voiced_dental_fricative.ogg')},
    'x': { vowel: false, audio: new Audio('./assets/sounds/consonants/Voiceless_velar_fricative.ogg')},
    'ɣ': { vowel: false, audio: new Audio('./assets/sounds/consonants/Voiced_velar_fricative.ogg')},
    'ʋ': { vowel: false, audio: new Audio('./assets/sounds/consonants/Labiodental_approximant.ogg')},
    'ɹ': { vowel: false, audio: new Audio('./assets/sounds/consonants/Alveolar_approximant.ogg')},
    'j': { vowel: false, audio: new Audio('./assets/sounds/consonants/Palatal_approximant.ogg')},
    'ɰ': { vowel: false, audio: new Audio('./assets/sounds/consonants/Voiced_velar_approximant.ogg')},
    'l': { vowel: false, audio: new Audio('./assets/sounds/consonants/Alveolar_lateral_approximant.ogg')},
    'r': { vowel: false, audio: new Audio('./assets/sounds/consonants/Alveolar_trill.ogg')},
    'ɾ': { vowel: false, audio: new Audio('./assets/sounds/consonants/Alveolar_tap.ogg')},
    'ʀ': { vowel: false, audio: new Audio('./assets/sounds/consonants/Uvular_trill.ogg')},

    'i': { vowel: true, audio: new Audio('./assets/sounds/vowels/Close_front_unrounded_vowel.ogg')},
    'y': { vowel: true, audio: new Audio('./assets/sounds/vowels/Close_front_rounded_vowel.ogg')},
    'ɨ': { vowel: true, audio: new Audio('./assets/sounds/vowels/Close_central_unrounded_vowel.ogg')},
    'ʉ': { vowel: true, audio: new Audio('./assets/sounds/vowels/Close_central_rounded_vowel.ogg')},
    'ɯ': { vowel: true, audio: new Audio('./assets/sounds/vowels/Close_back_unrounded_vowel.ogg')},
    'u': { vowel: true, audio: new Audio('./assets/sounds/vowels/Close_back_rounded_vowel.ogg')},
    'ɪ': { vowel: true, audio: new Audio('./assets/sounds/vowels/Near-close_near-front_unrounded_vowel.ogg')},
    'ʏ': { vowel: true, audio: new Audio('./assets/sounds/vowels/Near-close_near-front_rounded_vowel.ogg')},
    'ʊ': { vowel: true, audio: new Audio('./assets/sounds/vowels/Near-close_near-back_rounded_vowel.ogg')},
    'e': { vowel: true, audio: new Audio('./assets/sounds/vowels/Close-mid_front_unrounded_vowel.ogg')},
    'ø': { vowel: true, audio: new Audio('./assets/sounds/vowels/Close-mid_front_rounded_vowel.ogg')},
    'ɘ': { vowel: true, audio: new Audio('./assets/sounds/vowels/Close-mid_central_unrounded_vowel.ogg')},
    'ɵ': { vowel: true, audio: new Audio('./assets/sounds/vowels/Close-mid_central_rounded_vowel.ogg')},
    'ɤ': { vowel: true, audio: new Audio('./assets/sounds/vowels/Close-mid_back_unrounded_vowel.ogg')},
    'o': { vowel: true, audio: new Audio('./assets/sounds/vowels/Close-mid_back_rounded_vowel.ogg')},
    'ə': { vowel: true, audio: new Audio('./assets/sounds/vowels/Mid-central_vowel.ogg')},
    'ɛ': { vowel: true, audio: new Audio('./assets/sounds/vowels/Open-mid_front_unrounded_vowel.ogg')},
    'œ': { vowel: true, audio: new Audio('./assets/sounds/vowels/Open-mid_front_rounded_vowel_(2).ogg')},
    'ɜ': { vowel: true, audio: new Audio('./assets/sounds/vowels/Open-mid_central_unrounded_vowel.ogg')},
    'ɞ': { vowel: true, audio: new Audio('./assets/sounds/vowels/Open-mid_central_rounded_vowel.ogg')},
    'ʌ': { vowel: true, audio: new Audio('./assets/sounds/vowels/PR-open-mid_back_unrounded_vowel2.ogg')},
    'ɔ': { vowel: true, audio: new Audio('./assets/sounds/vowels/PR-open-mid_back_rounded_vowel.ogg')},
    'æ': { vowel: true, audio: new Audio('./assets/sounds/vowels/Near-open_front_unrounded_vowel.ogg')},
    'ɐ': { vowel: true, audio: new Audio('./assets/sounds/vowels/Near-open_central_unrounded_vowel.ogg')},
    'a': { vowel: true, audio: new Audio('./assets/sounds/vowels/PR-open_front_unrounded_vowel.ogg')},
    'ɶ': { vowel: true, audio: new Audio('./assets/sounds/vowels/Open_front_rounded_vowel.ogg')},
    'ɑ': { vowel: true, audio: new Audio('./assets/sounds/vowels/Open_back_unrounded_vowel.ogg')},
    'ɒ': { vowel: true, audio: new Audio('./assets/sounds/vowels/PR-open_back_rounded_vowel.ogg')},
    'ä': { vowel: true, audio: new Audio('./assets/sounds/vowels/Open_central_unrounded_vowel.ogg')},
})

export const keysOfUserSounds = ref([])

export const availableSounds = computed(
    () => {
        const keys = Object.keys(sounds.value).filter(key => !(key in keysOfUserSounds.value));
        return Object.fromEntries(keys.map(key => [key, sounds.value[key]]))
    }
)

export const vowelsFrom = (sounds) => {
    const keysOfVowels = Object.keys(sounds).filter(key => sounds[key].vowel)
    return Object.fromEntries(keysOfVowels.map(key => [key, sounds[key]]))
}

export const consonantsFrom = (sounds) => {
    const keysOfCons = Object.keys(sounds).filter(key => !sounds[key].vowel)
    return Object.fromEntries(keysOfCons.map(key => [key, sounds[key]]))
}

export const mySounds = computed(
    () => {
        const keys = Object.keys(sounds.value).filter(key => keysOfUserSounds.value.includes(key));
        return Object.fromEntries(keys.map(key => [key, sounds.value[key]]))
    }
)

