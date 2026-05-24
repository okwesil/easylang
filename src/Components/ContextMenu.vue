<script setup>
import { ref, provide } from 'vue'
const x = ref(-100)
const y = ref(-100)
const data = ref({})
const menu = ref(null)
provide('data', data)
provide('menu', menu)
const show = (newX, newY, newData) => {
    x.value = newX
    y.value = newY
    data.value = newData
    menu.value.style.opacity = "1"
}
const hide = () => {
    x.value = -100
    y.value = -100
    menu.value.style.opacity = "0"
}

defineExpose({ show, hide })
</script>

<template>
    <div class="menu" ref="menu" :style="{top: y.toString() + 'px', left: x.toString() + 'px'}" @click="hide">
        <slot />
    </div>
</template>

<style scoped>
.menu {
    position: absolute;
    background-color: var(--accent-color);
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 5px;
    border: 2px solid var(--accent-color);
    border-radius: .5rem;
    z-index: 10;
    /* transform: translateY(-50%); */
    box-shadow: 10px 10px 5px hsla(0, 0%, 0%, 0.502);
    transition: opacity 0.3s ease;
    opacity: 0;
}

</style>