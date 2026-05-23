<script setup>
import { ref, watch } from 'vue'
const emit = defineEmits(['newOrder'])
const props = defineProps({
    options: {
        type: String,
        required: true
    }
})
const options = ref(props.options.split(' '))
const dragging = ref(null)
const handleDragStart = index => {
    dragging.value = index
}
const handleDrop = index => {
    const i = options.value.splice(dragging.value, 1)[0]
    options.value.splice(index, 0, i)
    dragging.value = null
}

watch(options, () => {
    emit('newOrder', options.value)
}, { deep: true })
</script>

<template>
    <div class="word-order order">
        <div v-for="(option, index) in options" :key="index" draggable="true" @dragstart="handleDragStart(index)" @dragover.prevent @drop="handleDrop(index)" class="option">{{ option }}</div>
    </div>
</template>

<style scoped>
.order {
    display: flex;
    width: fit-content;
    padding: 7px;
    border: 5px solid var(--accent-color);
    border-radius: .5rem;
    gap:  7px;
}
.option {
    font-size: 3rem;
    width: fit-content;
    padding: .5rem;
    text-align: center;
    border: 2px solid var(--accent-color);
    border-radius: .5rem;
}
</style>