<script>
import { reactive, ref, useTemplateRef } from 'vue';
export default {
  setup() {
    const newWordData = reactive({ spelling: '', definition: '', pron: '', typeOfAffix: 'standalone'})
    const modal = useTemplateRef('modal')

    const destination = ref('')
    const onClose = ref(() => {})
    const openForm = (_destination, startSpelling, startDef, startPron, startTypeOfAffix) => {
      modal.value.showModal()

      newWordData.spelling = startSpelling
      newWordData.definition = startDef
      newWordData.pron = startPron
      newWordData.typeOfAffix = startTypeOfAffix ?? 'standalone'
      destination.value = _destination
    }

    const clearForm = () => {
      newWordData.spelling = ''
      newWordData.definition = ''
      newWordData.pron = ''
      newWordData.typeOfAffix = 'standalone'
    }

    return {
      modal, newWordData, destination,
      openForm, clearForm
    }
  }
}

</script>

<template>
  <dialog ref="modal">
    <div class="exit">
      <i class="fa-solid fa-x" @click="modal.close()"></i>
    </div>

    <form>
      <h2 ref="header">Enter Word Info</h2>


      <label>Spelling:</label>
      <input type="text" required v-model="newWordData.spelling">


      <label>Definition:</label>
      <input type="text" maxlength="90" required v-model="newWordData.definition">

      <label>Pronounciation:</label>
      <input type="text" required v-model="newWordData.pron">

      
      <label>Is this an affix?</label>
      <select required v-model="newWordData.typeOfAffix">
        <option value="standalone">no, it's just a word</option>
        <option value="prefix">prefix</option>
        <option value="suffix">suffix</option>
      </select>

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
  border-bottom: 3px solid var(--accent-color);
  color: white;
}

input:focus {
    outline: none;
}

button {
  background-color: var(--bg-color);
  border: 3px solid var(--accent-color);
  padding-top: 10px;
  padding-bottom: 10px;
  color: white;
}

select {
  background-color: var(--bg-color);
  border: none;
  border-bottom: 2px solid var(--accent-color);
  color: white;
}

.exit {
  position: absolute;
  top: 10px;
  right: 10px;
  width: fit-content;
  height: fit-content;
  color: white;
  cursor: pointer;
}
</style>