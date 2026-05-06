<template>
    <div class="sidebar" :class="{expanded: !collapsed, collapsed: collapsed}" :style="{ width: sidebarWidth }" @mouseenter="setCollapsed(false)" @mouseleave="setCollapsed(true)">
        <span class="sidebar-title" v-if="collapsed">
            <div>e</div>
        </span>
        <span v-else class="sidebar-title">easyLang</span>

        <sidebar-link to="/dictionary" icon="fa-solid fa-book">Dictionary</sidebar-link>
        <sidebar-link to="/phonetics" icon="fa-solid fa-volume">Phonetics</sidebar-link>
        <sidebar-link to="/phrases" icon="fa-solid fa-pen">Phrases</sidebar-link>
        <div class="save-and-load">

            <div class="save-load" @click="save($event)">
                <i class="fa-solid fa-floppy-disk"></i>
                <span v-if="!collapsed">
                    Save
                </span>
            </div>

            <div class="save-load" @click="load()">
                <i class="fa-solid fa-download"></i>
                <span v-if="!collapsed">
                    Load
                </span>
            </div>

        </div>
  </div>
</template>


<script>
    import { collapsed, setCollapsed, sidebarWidth } from './state';
    import { save, load } from '@/save';
    import SidebarLink from './SidebarLink.vue';
    export default {
        name: "Sidebar",
        components: {
            SidebarLink
        },
        setup() {
            
            return { collapsed,  sidebarWidth, setCollapsed, save, load }
        }
    }


</script>

<style>
:root {
    --sidebar-bg-color: #9e2323;
    --sidebar-item-hover: #890c0c;
    --sidebar-item-active: #8d1010;
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
    font-weight: bold;
    font-size: 30px;
    margin-bottom: 10px;

    cursor: pointer;
}

.save-and-load {
    margin-top: auto;
}

.save-load {
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
.save-load:hover {
    background-color: var(--sidebar-item-hover);
}
.save-load i {
    font-size: 30px;
}
.save-load span {
    margin-left: 10px;
}

a {
  color: white;
  text-decoration: none;
}

</style>