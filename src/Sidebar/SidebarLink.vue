<script>
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { collapsed } from './state';

    export default {
        props: {
            to: {type: String, required: true},
            icon: {type: String, required: true}
        },
        setup(props) {
            const route = useRoute();
            const isActive = computed(() => route.path === props.to);
            return { isActive, collapsed }

        }
    }

</script>

<template>
    
    <router-link :to="to" class="link" :class="{active: isActive}"> 
        <i :class="icon"></i>
        <transition name="fade">
            <span class="link-text" v-if="!collapsed">
                <slot />
            </span>
        </transition>
        
    </router-link>
</template>



<style scoped>

.link {
    display: flex;
    align-items: center;

    cursor: pointer;
    position: relative;
    font-weight: 400;
    user-select: none;
    color: white;
    text-decoration: none;

    transition: 0.4s ease;

    padding: 0.4em;
    border-radius: 0.24em;
    font-size: 20px;
}
.link:hover {
    background-color: hsl(from var(--sidebar-bg-color) h calc(s + 20) calc(l - 5));
}

.link-text {
    margin-left: 10px;
}

.expanded .link.active {
    background-color: hsl(from var(--sidebar-bg-color) h calc(s + 20) calc(l - 7));
}

.link i {
    font-size: 30px;
}

.collapsed {
    align-items: center;
}



</style>