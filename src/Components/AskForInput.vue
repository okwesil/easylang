<script setup>
import { ref, defineExpose, useTemplateRef } from 'vue';
const response = ref('')
const element = useTemplateRef('inputElement')
let doneCallback = () => {}
let args = []

const show = (x, y, defaultValue, placeholder, done, ..._args) => {
    element.value.style.top = `${y}px`
    element.value.style.left = `${x}px`
    element.value.style.opacity = '1'
    element.value.placeholder = placeholder
    element.value.focus()
    response.value = defaultValue
    doneCallback = done
    args = _args

}

const onDone = () => {
    if (response.value == '') return
    doneCallback(response.value, ...args)
    hide()
}

const hide = () => {
    element.value.style.opacity = '0'
    element.value.style.top = `-100vh`
    element.value.style.left = `-100vw`
    element.value.blur()
}

defineExpose({ show, hide })
</script>

<template>
    <input ref="inputElement" v-model="response" @keydown.enter="onDone" @keydown.esc="hide">
</template>

<style scoped>
input {
    position: absolute;
    top: -100vh;
    left: -100vw;
    z-index: 10;
    margin: 0;
    width: 200px;
}
</style>