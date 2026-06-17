<script setup>
import { inject } from 'vue';
const props = defineProps({
    icon: {
        type: String,
        required: true
    },
    onClick: {
        type: Function,
        required: true,
    },
    desc: {
        type: String
    }
})
const data = inject('data')
const menu = inject('menu')
const _onClick = () => {
    if (menu.value.style.opacity == "1") {
        props.onClick(data.value)
    }
}

</script>

<template>
    <i class="clickable" :class="icon" @click="_onClick()" :title="desc"></i>
</template>

<style scoped>
i {
    font-size: 2rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
}
i:active {
    transform: scale(0.95);
}
i:hover {
    background-color: var(--sidebar-active);    
}
</style>