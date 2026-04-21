import { dictionary } from './Dictionary/dictionary';

export const save = () => {
    localStorage.setItem('dictionary', JSON.stringify(dictionary.value))    
}
export const load = (json = localStorage.getItem('dictionary')) => {
    const unparsed = json
    if (!unparsed) {
        alert('Save something first :(')
        return
    }
    dictionary.value = JSON.parse(localStorage.getItem('dictionary'))
}
