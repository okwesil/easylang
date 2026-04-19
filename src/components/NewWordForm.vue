<script>
import { reactive, ref, useTemplateRef } from 'vue';
export default {
  setup() {
    const newWordData = reactive({ spelling: '', definition: '', pron: ''})
    const modal = useTemplateRef('modal')
    const header = useTemplateRef('header')

    let destination = ref('')
    const openForm = (_destination, startSpelling, startDef, startPron) => {
      modal.value.showModal()
      if (startSpelling != '') {
        header.value.textContent = `Edit '${startSpelling}'`
      }

      newWordData.spelling = startSpelling
      newWordData.definition = startDef
      newWordData.pron = startPron
      destination.value = _destination
    }

    const clearForm = () => {
      newWordData.spelling = ''
      newWordData.definition = ''
      newWordData.pron = ''
    }


    return {
      modal,
      newWordData,
      destination,
      openForm,
      clearForm
    }
  }
}

</script>

<template>
  <dialog ref="modal">
    <form>
      <h2 ref="header">Create New Word</h2>
      <label>Spelling:</label>
      <input type="text" required v-model="newWordData.spelling">
      <label>Definition:</label>
      <input type="text" required v-model="newWordData.definition">
      <label>Pronounciation:</label>
      <input type="text" required v-model="newWordData.pron">
      <button type="submit">Create!</button>
    </form>
  </dialog>
</template>

<style>
form {
  display: flex;
  gap: 20px;
  flex-direction: column;
  margin: 20px;
  text-align: left;
}

label {
  display: inline-block;
  font-size: 0.7rem;
}

input {
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: none;
  background-color: var(--bg-color);
  border-bottom: 3px solid var(--sidebar-bg-color);
  color: white;
}

input:focus {
    outline: none;
}

button {
  background-color: var(--bg-color);
  border: 3px solid var(--sidebar-bg-color);
  padding-top: 10px;
  padding-bottom: 10px;
  color: white;
}
</style>