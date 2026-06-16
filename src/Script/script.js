import { ref } from "vue";

/**
 * array of objects 
 * [
 *  { chars: 'ṣ', ipa: 'ʃ', roman: 'sh' }
 * ]
 */
export const alphabet = ref([])

export const IPAfromSpelling = string => {
    let i = 0
    let ipa = ''
    const longestLength = Math.max(...alphabet.value.map(entry => entry.chars.length))

    while (i < string.length) {
        let longest = { ipa: null, newIndex: null }
        // look ahead a certain amount of characters
        for (let j = i + 1; j < i + longestLength + 1; j++ ) {
            const slice = string.slice(i, j)
            const subIndex = alphabet.value.findIndex(entry => entry.chars == slice)

            if (subIndex == -1) continue

            longest.ipa = alphabet.value[subIndex].ipa
            longest.newIndex = j
        }

        if (longest.ipa != null) {
            ipa += longest.ipa
            i = longest.newIndex
        } else {
            ipa += string.at(i)
            i++
        }

    }
    return ipa
}