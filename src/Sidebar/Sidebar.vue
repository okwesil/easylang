<template>
    <div class="sidebar" :class="{expanded: !collapsed, collapsed: collapsed}" :style="{ width: sidebarWidth }" @mouseenter="setCollapsed(false)" @mouseleave="setCollapsed(true)">
        <router-link to="/settings">
            <span class="sidebar-title" v-if="collapsed">
                <div>{{ settings.name[0] }}</div>
            </span>
            <span v-else class="sidebar-title">{{ settings.name }}</span>
        </router-link>

        <sidebar-link to="/dictionary" icon="fa-solid fa-book">Dictionary</sidebar-link>
        <sidebar-link to="/sentences" icon="fa-solid fa-pen">Sentences</sidebar-link>
        <sidebar-link to="/phonetics" icon="fa-solid fa-volume">Phonetics</sidebar-link>
        <sidebar-link to="/grammar" icon="fa-solid fa-brain">Grammar</sidebar-link>
        <sidebar-link class="bottom" icon="fa-solid fa-user" to="/settings">{{ currentUser ? currentUser.email.substring(0, 10) + '...' : 'Settings' }}</sidebar-link>
  </div>
</template>


<script>
    import { collapsed, setCollapsed, sidebarWidth } from './state';
    import { save, load, settings } from '@/save';
    import { currentUser } from '@/firebase.js';
    import SidebarLink from './SidebarLink.vue';
    export default {
        name: "Sidebar",
        components: {
            SidebarLink
        },
        setup() {
            return { 
                collapsed,  sidebarWidth, settings, currentUser,
                setCollapsed, save, load
            }
        }
    }


</script>

<style>
.sidebar {
    color: white;
    background-color: var(--accent-color);
    
    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: .5em;

    transition: 0.3s ease;
    text-align: center;

    display: flex;
    flex-direction: column;
    align-items: left;
    overflow: hidden;
}

.sidebar-title {
    transition: all 0.3s ease; 
    font-weight: bold;
    font-size: 30px;
    border-radius: 0.5rem;
    white-space: nowrap;

    cursor: pointer;
}

.sidebar-title:hover {
    background-color: hsl(from var(--accent-color) h calc(s + 20) calc(l - 5));
}

.bottom {
    margin-top: auto;
}

a {
  color: white;
  text-decoration: none;
}

</style>