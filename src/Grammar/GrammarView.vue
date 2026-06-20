<script setup>
import { settings } from '@/save';
import { grammarJSON } from './grammar';
import TextEditor from "@/Components/TextEditor.vue";

</script>

<template>
    <div class="main-header-wrapper">
      <h1 class="header">Grammar</h1>
      <p class="page-description">Explain the interesting grammar of {{ settings.name }}, (yes its just a big textbox)</p>
    </div>
    
    <div class="editor-wrapper">
        <TextEditor :json="grammarJSON" @update-json="(json) => {grammarJSON = json}"/>
    </div>
</template>

<style scoped>
.editor-wrapper {
    margin-left: 2rem;
}
</style>