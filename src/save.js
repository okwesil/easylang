import { dictionary } from './Dictionary/dictionary';

export const save = () => {
    localStorage.setItem('dictionary', JSON.stringify(dictionary.value))    
}
export const load = (json = localStorage.getItem('dictionary'), firstTime = false) => {
    const unparsed = json
    if (!unparsed && !firstTime) {
        alert('Save something first :(')
        return
    }
    dictionary.value = JSON.parse(localStorage.getItem('dictionary'))
}
