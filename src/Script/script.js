import { dictionary } from "@/Dictionary/dictionary";
import { ref } from "vue";

/**
 * array of objects 
 * [
 *  { chars: 'ṣ', ipa: 'ʃ', roman: 'sh' }
 * ]
 */
export const alphabet = ref([])

export const extractSymbolIndices = string => {
    const indeces = []
    const longestLength = Math.max(...alphabet.value.map(entry => entry.chars.length))

    let i = 0
    while (i < string.length) {
        let longest = { index: null, newIndex: null }
        // look ahead a certain amount of characters
        for (let j = i + 1; j < i + longestLength + 1; j++ ) {
            const slice = string.slice(i, j)
            const subIndex = alphabet.value.findIndex(entry => entry.chars == slice)

            if (subIndex == -1) continue

            longest.index = subIndex
            longest.newIndex = j
        }

        if (longest.index != null) {
            indeces.push(longest.index)
            i = longest.newIndex
        } else {
            indeces.push(string.at(i))
            i++
        }
    }

    return indeces
}

const count = (array, pred) => {
    let total = 0

    for (const value of array) {
        if (pred(value) == true) {
            total++
        }
    }

    return total
}

export const symbolUsage = () => {
    const frequencies = {}
    const allIndeces = Object.values(dictionary.value).flatMap(entry => extractSymbolIndices(entry.spelling))
    
    if (allIndeces.length == 0) return []

    for (let i = 0; i < alphabet.value.length; i++) {
        const chars = alphabet.value[i].chars
        frequencies[chars] = count(allIndeces, (index) => i == index) / allIndeces.length
    }
    return Object.entries(frequencies).sort((a, b) => b[1] - a[1])
}


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