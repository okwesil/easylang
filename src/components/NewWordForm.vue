<script>
import { reactive, ref, useTemplateRef } from 'vue';
export default {
  setup() {
    const newWordData = reactive({ spelling: '', definition: '', pron: ''})
    const modal = useTemplateRef('modal')
    const openForm = from => {
      modal.value.showModal()
    }


    return {
      modal,
      newWordData,
      openForm
    }
  }
}

</script>

<template>
  <dialog ref="modal">
    <form>
      <h2>Create New Word</h2>
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