<script setup>
import IPAKeyboard from '@/Components/IPAKeyboard.vue'
import { ref, useTemplateRef } from 'vue'
const modal = useTemplateRef('modal')
const keyboard = useTemplateRef('keyboard')
const symbolData = ref({ chars: '', ipa: '', roman: '' })
const emit = defineEmits([ 'done' ])

const openForm = (chars = '', ipa = '', roman = '') => {
    symbolData.value = { chars, ipa, roman }
    modal.value.showModal();
}

const close = () => {
    symbolData.value.chars = ''
    symbolData.value.ipa = ''
    symbolData.value.roman = ''
    modal.value.close()
    keyboard.value.close()
}

const handleSubmit = () => {
    emit('done', symbolData.value)
    close()
}

defineExpose({ openForm, close })
</script>


<template>
<dialog class="no-scrollbar" ref="modal">
    <IPAKeyboard ref="keyboard" @symbol-clicked="(symbol) => symbolData.ipa += symbol" />


    <div class="exit">
      <i class="fa-solid fa-x" @click="modal.close()"></i>
    </div>

    <h3>Make a new symbol</h3>
    <form @submit.prevent="handleSubmit">
        <div class="row">

            <div class="column">
                <label>Character(s)</label>
                <input type="text" required v-model="symbolData.chars">

            </div>
            
            <div class="column">
                <label>IPA</label>

                <div class="row">
                    <input type="text" required v-model="symbolData.ipa">
                    <i class="fa-solid fa-magnifying-glass" @click="keyboard.openKeyboard()"></i>
                </div>
            </div>

        </div>

        
        <label>Romanization</label>
        <input type="text" required v-model="symbolData.roman">

        <button type="submit" class="submit">Add Symbol</button>
    </form>
</dialog>
</template>

<style scoped>
input {
    margin-bottom: 10px;
}

.row {
    display: flex;
    gap: 10px;
    align-items: flex-start;
}

.fa-magnifying-glass {
    cursor: pointer;
}

</style>