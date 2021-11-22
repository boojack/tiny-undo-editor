<template>
  <h1 class="text title-text">Tiny Undo Editor</h1>
  <div class="editor-container">
    <div class="toolbar-container">
      <span class="btn" @click="runUndo">undo</span>
      <span class="btn" @click="runRedo">redo</span>
    </div>
    <textarea ref="editorEl"></textarea>
  </div>
  <p class="text">Undo/redo text history:</p>
  <div class="actions-wrapper" ref="actionsContainerEl">
    <ActionContainer
      v-for="(action, index) in state.actions"
      :key="action.timestamp"
      :index="index"
      :action="action"
      :isActive="state.currentIndex === index"
      @click="handleActionClick"
    ></ActionContainer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, onUpdated, reactive, ref } from "vue";
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
    const actionsContainerEl = ref<HTMLDivElement | null>(null);
    let tinyUndo: TinyUndo | null = null;

    onMounted(() => {
      if (editorEl.value) {
        tinyUndo = new TinyUndo(editorEl.value);
        state.actions = tinyUndo.getActions();
        tinyUndo.subscribe((actions, index) => {
          state.actions = [...actions];
          state.currentIndex = index;
        });
      }
    });

    onUnmounted(() => {
      tinyUndo?.destroy();
    });

    onUpdated(() => {
      actionsContainerEl.value?.scrollTo({
        left: 400 * state.currentIndex,
        top: 0,
        behavior: "smooth",
      });
    });

    const runUndo = () => {
      tinyUndo?.runUndo();
    };

    const runRedo = () => {
      tinyUndo?.runRedo();
    };

    const handleActionClick = (index: number) => {
      while (state.currentIndex !== index) {
        if (state.currentIndex > index) {
          tinyUndo?.runUndo();
        } else {
          tinyUndo?.runRedo();
        }
      }
    };

    return {
      state,
      editorEl,
      actionsContainerEl,
      handleActionClick,
      runUndo,
      runRedo,
    };
  },
});
</script>

<style scoped>
.text.title-text {
  margin-top: 128px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid lightgray;
}

.editor-container {
  width: 384px;
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
  border: 1px solid gray;
  padding: 0 8px;
  line-height: 24px;
  border-radius: 8px;
  font-size: 13px;
  user-select: none;
}

.editor-container > .toolbar-container > .btn:hover {
  opacity: 0.8;
}

.editor-container > textarea {
  font-family: -apple-system, "system-ui", Segoe UI, Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", Segoe UI Symbol;
  width: 100%;
  height: 128px;
  resize: none;
  border-radius: 8px;
  outline: none;
  padding: 8px;
  font-size: 16px;
  line-height: 24px;
}

.text {
  width: 384px;
  max-width: 92%;
  margin: 12px 0;
}

.actions-wrapper {
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-x: auto;
  padding: 0 calc(50% - 200px);
}

.actions-wrapper::-webkit-scrollbar {
  display: none;
}
</style>
