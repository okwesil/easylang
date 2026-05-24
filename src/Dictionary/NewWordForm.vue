<script>
import { reactive, ref, useTemplateRef } from 'vue';
export default {
  setup() {
    const newWordData = reactive({ spelling: '', definition: '', pron: '', typeOfAffix: 'standalone', notes: '', favorite: false})
    const modal = useTemplateRef('modal')

    const destination = ref('')
    const openForm = (_destination, startSpelling, startDef, startPron, startTypeOfAffix, startNotes, startFavorite) => {
      modal.value.showModal()

      newWordData.spelling = startSpelling
      newWordData.definition = startDef
      newWordData.pron = startPron
      newWordData.typeOfAffix = startTypeOfAffix ?? 'standalone'
      newWordData.notes = startNotes ?? ''
      newWordData.favorite = startFavorite
      destination.value = _destination
    }

    const clearForm = () => {
      newWordData.spelling = ''
      newWordData.definition = ''
      newWordData.pron = ''
      newWordData.typeOfAffix = 'standalone'
      newWordData.notes = ''
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
    
    <h2 ref="header">Enter Word Info</h2>
    <form>
      <div class="left-side">

  
  
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
  
      </div>
      <div class="right-side">
        <label>Notes</label>
        <textarea v-model="newWordData.notes" placeholder="How is this word used? What does it derive from?"></textarea>
      </div>
      <button class="submit" type="submit">Create!</button>
    </form>
  </dialog>
</template>

<style scoped>
form {
  display: grid;
  gap: 20px;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(2, 1fr);
  margin: 20px;
  text-align: left;
}

h2 {
  margin-left: 20px;
}

.left-side {
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.submit {
  grid-row: -1;
  grid-column: 1 / 3;
  border-radius: 0.5rem;
}

.right-side {
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

textarea {
  background-color: var(--bg-color);
  border: 3px solid var(--accent-color);
  height: auto;
  color: white;
  flex: 1;
  resize: none;
  border-radius: 0.5rem;
}

label {
  display: inline-block;
  font-size: 0.7rem;
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