import { ref, computed } from 'vue'
export const sounds = ref({
    'm': { vowel: false, name:'Bilabial nasal', audio: new Audio('./assets/sounds/consonants/Bilabial_nasal.ogg')},
    'n': { vowel: false, name:'Alveolar nasal', audio: new Audio('./assets/sounds/consonants/Alveolar_nasal.ogg')},
    'p': { vowel: false, name:'Voiceless bilabial plosive', audio: new Audio('./assets/sounds/consonants/Voiceless_bilabial_plosive.ogg')},
    'b': { vowel: false, name:'Voiced bilabial plosive', audio: new Audio('./assets/sounds/consonants/Voiced_bilabial_plosive.ogg')},
    't': { vowel: false, name:'Voiceless alveolar plosive', audio: new Audio('./assets/sounds/consonants/Voiceless_alveolar_plosive.ogg')},
    'd': { vowel: false, name:'Voiced alveolar plosive', audio: new Audio('./assets/sounds/consonants/Voiced_alveolar_plosive.ogg')},
    'c': { vowel: false, name:'Voiceless palatal plosive', audio: new Audio('./assets/sounds/consonants/Voiceless_palatal_plosive.ogg')},
    'ɟ': { vowel: false, name:'Voiced palatal plosive', audio: new Audio('./assets/sounds/consonants/Voiced_palatal_plosive.ogg')},
    'k': { vowel: false, name:'Voiceless velar plosive', audio: new Audio('./assets/sounds/consonants/Voiceless_velar_plosive.ogg')},
    'g': { vowel: false, name:'Voiced velar plosive', audio: new Audio('./assets/sounds/consonants/Voiced_velar_plosive_02.ogg')},
    'q': { vowel: false, name:'Voiceless uvular plosive', audio: new Audio('./assets/sounds/consonants/Voiceless_uvular_plosive.ogg')},
    'ɢ': { vowel: false, audio: null},
    'ʔ': { vowel: false, name:'Glottal stop', audio: new Audio('./assets/sounds/consonants/Glottal_stop.ogg')},
    'ts': { vowel: false, name:'Voiceless alveolar affricate', audio: null},
    'dz': { vowel: false, name:'Voiced alveolar affricate', audio: null},
    'tʃ': { vowel: false, name:'Voiceless palato-alveolar affricate', audio: new Audio('./assets/sounds/consonants/Voiceless_palato-alveolar_affricate.ogg')},
    'dʒ': { vowel: false, name:'Voiced palato-alveolar affricate', audio: new Audio('./assets/sounds/consonants/Voiced_palato-alveolar_affricate.ogg')},
    's': { vowel: false, name:'Voiceless alveolar sibilant', audio: new Audio('./assets/sounds/consonants/Voiceless_alveolar_sibilant.ogg')},
    'z': { vowel: false, name:'Voiced alveolar sibilant', audio: new Audio('./assets/sounds/consonants/Voiced_alveolar_sibilant.ogg')},
    'ʃ': { vowel: false, name:'Voiceless palato-alveolar sibilant', audio: new Audio('./assets/sounds/consonants/Voiceless_palato-alveolar_sibilant.ogg')},
    'f': { vowel: false, name:'Voiceless labio-dental fricative', audio: new Audio('./assets/sounds/consonants/Voiceless_labio-dental_fricative.ogg')},
    'v': { vowel: false, name:'Voiced labio-dental fricative', audio: new Audio('./assets/sounds/consonants/Voiced_labio-dental_fricative.ogg')},
    'θ': { vowel: false, name:'Voiceless dental fricative', audio: new Audio('./assets/sounds/consonants/Voiceless_dental_fricative.ogg')},
    'ð': { vowel: false, name:'Voiced dental fricative', audio: new Audio('./assets/sounds/consonants/Voiced_dental_fricative.ogg')},
    'x': { vowel: false, name:'Voiceless velar fricative', audio: new Audio('./assets/sounds/consonants/Voiceless_velar_fricative.ogg')},
    'ɣ': { vowel: false, name:'Voiced velar fricative', audio: new Audio('./assets/sounds/consonants/Voiced_velar_fricative.ogg')},
    'ʋ': { vowel: false, name:'Labiodental approximant', audio: new Audio('./assets/sounds/consonants/Labiodental_approximant.ogg')},
    'ɹ': { vowel: false, name:'Alveolar approximant', audio: new Audio('./assets/sounds/consonants/Alveolar_approximant.ogg')},
    'j': { vowel: false, name:'Palatal approximant', audio: new Audio('./assets/sounds/consonants/Palatal_approximant.ogg')},
    'ɰ': { vowel: false, name:'Voiced velar approximant', audio: new Audio('./assets/sounds/consonants/Voiced_velar_approximant.ogg')},
    'l': { vowel: false, name:'Alveolar lateral approximant', audio: new Audio('./assets/sounds/consonants/Alveolar_lateral_approximant.ogg')},
    'r': { vowel: false, name:'Alveolar trill', audio: new Audio('./assets/sounds/consonants/Alveolar_trill.ogg')},
    'ɾ': { vowel: false, name:'Alveolar tap', audio: new Audio('./assets/sounds/consonants/Alveolar_tap.ogg')},
    'ʀ': { vowel: false, name:'Uvular trill', audio: new Audio('./assets/sounds/consonants/Uvular_trill.ogg')},

    'i': { vowel: true, name:'Close front unrounded vowel', audio: new Audio('./assets/sounds/vowels/Close_front_unrounded_vowel.ogg')},
    'y': { vowel: true, name:'Close front rounded vowel', audio: new Audio('./assets/sounds/vowels/Close_front_rounded_vowel.ogg')},
    'ɨ': { vowel: true, name:'Close central unrounded vowel', audio: new Audio('./assets/sounds/vowels/Close_central_unrounded_vowel.ogg')},
    'ʉ': { vowel: true, name:'Close central rounded vowel', audio: new Audio('./assets/sounds/vowels/Close_central_rounded_vowel.ogg')},
    'ɯ': { vowel: true, name:'Close back unrounded vowel', audio: new Audio('./assets/sounds/vowels/Close_back_unrounded_vowel.ogg')},
    'u': { vowel: true, name:'Close back rounded vowel', audio: new Audio('./assets/sounds/vowels/Close_back_rounded_vowel.ogg')},
    'ɪ': { vowel: true, name:'Near close near front unrounded vowel', audio: new Audio('./assets/sounds/vowels/Near-close_near-front_unrounded_vowel.ogg')},
    'ʏ': { vowel: true, name:'Near close near front rounded vowel', audio: new Audio('./assets/sounds/vowels/Near-close_near-front_rounded_vowel.ogg')},
    'ʊ': { vowel: true, name:'Near close near back rounded vowel', audio: new Audio('./assets/sounds/vowels/Near-close_near-back_rounded_vowel.ogg')},
    'e': { vowel: true, name:'Close mid front unrounded vowel', audio: new Audio('./assets/sounds/vowels/Close-mid_front_unrounded_vowel.ogg')},
    'ø': { vowel: true, name:'Close mid front rounded vowel', audio: new Audio('./assets/sounds/vowels/Close-mid_front_rounded_vowel.ogg')},
    'ɘ': { vowel: true, name:'Close mid central unrounded vowel', audio: new Audio('./assets/sounds/vowels/Close-mid_central_unrounded_vowel.ogg')},
    'ɵ': { vowel: true, name:'Close mid central rounded vowel', audio: new Audio('./assets/sounds/vowels/Close-mid_central_rounded_vowel.ogg')},
    'ɤ': { vowel: true, name:'Close mid back unrounded vowel', audio: new Audio('./assets/sounds/vowels/Close-mid_back_unrounded_vowel.ogg')},
    'o': { vowel: true, name:'Close mid back rounded vowel', audio: new Audio('./assets/sounds/vowels/Close-mid_back_rounded_vowel.ogg')},
    'ə': { vowel: true, name:'Mid central vowel', audio: new Audio('./assets/sounds/vowels/Mid-central_vowel.ogg')},
    'ɛ': { vowel: true, name:'Open mid front unrounded vowel', audio: new Audio('./assets/sounds/vowels/Open-mid_front_unrounded_vowel.ogg')},
    'œ': { vowel: true, name:'Open mid front rounded vowel', audio: new Audio('./assets/sounds/vowels/Open-mid_front_rounded_vowel_(2).ogg')},
    'ɜ': { vowel: true, name:'Open mid central unrounded vowel', audio: new Audio('./assets/sounds/vowels/Open-mid_central_unrounded_vowel.ogg')},
    'ɞ': { vowel: true, name:'Open mid central rounded vowel', audio: new Audio('./assets/sounds/vowels/Open-mid_central_rounded_vowel.ogg')},
    'ʌ': { vowel: true, name:'Open mid back unrounded vowel', audio: new Audio('./assets/sounds/vowels/PR-open-mid_back_unrounded_vowel2.ogg')},
    'ɔ': { vowel: true, name:'Open mid back rounded vowel', audio: new Audio('./assets/sounds/vowels/PR-open-mid_back_rounded_vowel.ogg')},
    'æ': { vowel: true, name:'Near open front unrounded vowel', audio: new Audio('./assets/sounds/vowels/Near-open_front_unrounded_vowel.ogg')},
    'ɐ': { vowel: true, name:'Near open central unrounded vowel', audio: new Audio('./assets/sounds/vowels/Near-open_central_unrounded_vowel.ogg')},
    'a': { vowel: true, name:'Open front unrounded vowel', audio: new Audio('./assets/sounds/vowels/PR-open_front_unrounded_vowel.ogg')},
    'ɶ': { vowel: true, name:'Open front rounded vowel', audio: new Audio('./assets/sounds/vowels/Open_front_rounded_vowel.ogg')},
    'ɑ': { vowel: true, name:'Open back unrounded vowel', audio: new Audio('./assets/sounds/vowels/Open_back_unrounded_vowel.ogg')},
    'ɒ': { vowel: true, name:'Open back rounded vowel', audio: new Audio('./assets/sounds/vowels/PR-open_back_rounded_vowel.ogg')},
    'ä': { vowel: true, name:'Open central unrounded vowel', audio: new Audio('./assets/sounds/vowels/Open_central_unrounded_vowel.ogg')},
})

export const keysOfUserSounds = ref([])

export const availableSounds = computed(
    () => {
        const keys = Object.keys(sounds.value).filter(key => !keysOfUserSounds.value.includes(key));
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

export const userSounds = computed(
    () => {
        if (!keysOfUserSounds.value) {
            keysOfUserSounds.value = []
        }
        const keys = Object.keys(sounds.value).filter(key => keysOfUserSounds.value.includes(key));
        return Object.fromEntries(keys.map(key => [key, sounds.value[key]]))
    }
)

