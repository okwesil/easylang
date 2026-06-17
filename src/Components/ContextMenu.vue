<script setup>
import { useTemplateRef, ref, provide, watch, nextTick } from 'vue'
import { onClickOutside } from '@vueuse/core'
const x = ref(-100)
const y = ref(-100)
const data = ref({})
const menu = useTemplateRef('menu')
onClickOutside(menu, () => hide())
provide('data', data)
provide('menu', menu)

const show = async (newX, newY, newData) => {
    x.value = newX
    y.value = newY
    data.value = newData
    await nextTick()
    if (menu.value) {
        menu.value.style.opacity = "1"
    }
}
const hide = () => {
    x.value = -100
    y.value = -100
    if (menu.value) {
        menu.value.style.opacity = "0"
    }
}

watch([x, y], async () => {
    if (!menu.value) return
    await nextTick()
    const bottomOfScreen = window.scrollY + window.innerHeight
    const rect = menu.value.getBoundingClientRect()
    if (rect.bottom > bottomOfScreen) {
        console.log(rect)
        y.value = Math.max(0, bottomOfScreen - rect.height)
    }
}, { flush: 'post' })


defineExpose({ show, hide })
</script>

<template>
    <transition name="fade">
        <div class="menu" ref="menu" :style="{top: y.toString() + 'px', left: x.toString() + 'px'}" @click="hide">
            <slot />
        </div>
    </transition>
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