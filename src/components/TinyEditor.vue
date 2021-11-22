<template>
  <div class="editor-container">
    <div class="toolbar-container">
      <span class="btn undo-btn" @click="runUndo">undo</span>
      <span class="btn redo-btn" @click="runRedo">redo</span>
      <span class="tip-text">{{ state.currentIndex }}</span>
    </div>
    <textarea ref="editorEl"></textarea>
  </div>
  <div class="actions-wrapper">
    <ActionContainer
      v-for="(action, index) in state.actions"
      :action="action"
      :isActive="state.currentIndex === index"
      :key="action.timestamp"
    ></ActionContainer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, ref } from "vue";
import TinyUndo, { InputAction } from "tiny-undo";
import ActionContainer from "./ActionContainer.vue";

interface State {
  actions: InputAction[];
  currentIndex: number;
}

export default defineComponent({
  name: "TinyEditor",
  components: { ActionContainer },
  setup() {
    const state = reactive<State>({
      actions: [],
      currentIndex: 0,
    });
    const editorEl = ref<HTMLTextAreaElement | null>(null);
    let tinyUndo: TinyUndo | null = null;

    onMounted(() => {
      if (editorEl.value) {
        tinyUndo = new TinyUndo(editorEl.value);
        tinyUndo.subscribe((actions, index) => {
          console.log(actions, index);
          state.actions = [...actions];
          state.currentIndex = index;
        });
        state.actions = tinyUndo.getActions();
      }
    });

    onUnmounted(() => {
      tinyUndo?.destroy();
    });

    const runUndo = () => {
      tinyUndo?.runUndo();
    };

    const runRedo = () => {
      tinyUndo?.runRedo();
    };

    return {
      state,
      editorEl,
      runUndo,
      runRedo,
    };
  },
});
</script>

<style scoped>
.editor-container {
  width: 382px;
  max-width: 92%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.editor-container > .toolbar-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 12px;
}

.editor-container > .toolbar-container > .btn {
  margin-right: 8px;
  cursor: pointer;
  border: 1px solid lightgray;
  padding: 0 8px;
  line-height: 24px;
  border-radius: 8px;
  font-size: 13px;
  user-select: none;
}

.editor-container > .toolbar-container > .btn:hover {
  opacity: 0.8;
  border-color: gray;
}

.editor-container > textarea {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  height: 128px;
  resize: none;
  margin-bottom: 12px;
  border-radius: 8px;
  outline: none;
  padding: 8px;
  font-size: 16px;
  line-height: 24px;
}

.actions-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-x: auto;
}
</style>
