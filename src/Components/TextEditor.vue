<script setup>
    import { useEditor, EditorContent } from '@tiptap/vue-3'
    import StarterKit from '@tiptap/starter-kit'
    const emit = defineEmits(['update-json'])
    const props = defineProps({
        json: Object
    })

    const editor = useEditor({
        content: Object.keys(props.json).length == 0 ? '' : props.json,
        extensions: [StarterKit],
        onUpdate: ({ editor }) => {
            const json = editor.getJSON()
            emit('update-json', json)
        }
    })
</script>

<template>
    <div class="tiptap-toolbar" v-if="editor">
      <button type="button" class="clickable" :class="{ active: editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()"><b>B</b> </button>
      <button type="button" class="clickable" :class="{ active: editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()"><i>I</i></button>
      <button type="button" class="clickable" :class="{ active: editor.isActive('strike') }" @click="editor.chain().focus().toggleStrike().run()">S</button>
      <button type="button" class="clickable" :class="{ active: editor.isActive('heading', { level: 1 }) }" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">H1</button>
      <button type="button" class="clickable" :class="{ active: editor.isActive('heading', { level: 2 }) }" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">H2</button>
      <button type="button" class="clickable" :class="{ active: editor.isActive('bulletList') }" @click="editor.chain().focus().toggleBulletList().run()">• List</button>
      <button type="button" class="clickable" :class="{ active: editor.isActive('orderedList') }" @click="editor.chain().focus().toggleOrderedList().run()">1. List</button>
      <button type="button" class="clickable" @click="editor.chain().focus().undo().run()">Undo</button>
      <button type="button" class="clickable" @click="editor.chain().focus().redo().run()">Redo</button>
      <button type="button" class="clickable" @click="editor.commands.clearContent()">Clear</button>
    </div>

  <div class="tiptap-container">
    <editor-content :editor="editor" class="tiptap-content" />
  </div>
</template>

<style scoped>
.tiptap-container * {
    outline: none;
}

.tiptap-container {
    border: 4px solid var(--lighter-bg);
    border-radius: 12px;
    padding: 1rem;
    height: 100%;
    width: 90%;
    background: var(--darker-bg);
    display: flex;
    flex-direction: column;
}

.tiptap-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
}

.tiptap-toolbar button {
    border: 3px solid var(--lighter-bg);
    background: transparent;
    color: inherit;
    padding: 0.4rem 0.7rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
}

.tiptap-toolbar button:hover,
.tiptap-toolbar button.active {
    background: var(--lighter-bg);
}

:deep(.tiptap) {
    font-size: 1.1rem;
}

:deep(.tiptap) p {
    margin: 0.6rem;
}

</style>
