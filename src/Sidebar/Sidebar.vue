<template>
    <div class="sidebar" :class="{expanded: !collapsed, collapsed: collapsed}" :style="{ width: sidebarWidth }" @mouseenter="setCollapsed(false)" @mouseleave="setCollapsed(true)">
        <router-link to="/settings">
            <span class="sidebar-title" v-if="collapsed">
                <div>{{ settings.name.substring(0, 2) }}</div>
            </span>
            <span v-else class="sidebar-title">{{ settings.name }}</span>
        </router-link>

        <sidebar-link to="/dictionary" icon="fa-solid fa-book">Dictionary</sidebar-link>
        <sidebar-link to="/phonetics" icon="fa-solid fa-volume">Phonetics</sidebar-link>
        <sidebar-link to="/phrases" icon="fa-solid fa-pen">Phrases</sidebar-link>
        <sidebar-link class="bottom" to="/settings" icon="fa-solid fa-gear">Settings</sidebar-link>
  </div>
</template>


<script>
    import { collapsed, setCollapsed, sidebarWidth } from './state';
    import { save, load, settings } from '@/save';
    import SidebarLink from './SidebarLink.vue';
    export default {
        name: "Sidebar",
        components: {
            SidebarLink
        },
        setup() {
            
            return { 
                collapsed,  sidebarWidth, settings,
                setCollapsed, save, load
            }
        }
    }


</script>

<style>
:root {
    --sidebar-bg-color: hsl(0, 64%, 38%);
}
.sidebar {
    color: white;
    background-color: var(--sidebar-bg-color);
    
    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: .5em;

    transition: 0.3s ease;

    display: flex;
    flex-direction: column;
    align-items: left;
}

.sidebar-title {
    transition: all 0.3s ease; 
    font-weight: bold;
    font-size: 30px;
    margin-bottom: 10px;
    border-radius: 0.5rem;

    cursor: pointer;
}

.sidebar-title:hover {
    background-color: hsl(from var(--sidebar-bg-color) h calc(s + 20) calc(l - 5));
}

.bottom {
    margin-top: auto;
}

a {
  color: white;
  text-decoration: none;
}

</style>