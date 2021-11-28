<template>
  <div class="editor-container">
    <div class="toolbar-container">
      <span class="btn" @click="runUndo">undo</span>
      <span class="btn" @click="runRedo">redo</span>
    </div>
    <textarea ref="editorEl" placeholder="Write something right here..."></textarea>
  </div>
  <p class="text tip-text">Undo/redo text history:</p>
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
        tinyUndo = new TinyUndo(editorEl.value, {
          interval: 2000,
        });
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
.editor-container {
  width: 384px;
  max-width: calc(100% - 16px);
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
  margin: 16px 0;
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
}

.editor-container > textarea {
  font-family: -apple-system, "PingFang SC", "Hiragino Sans GB", "Source Han Sans SC", "Noto Sans CJK SC", "Microsoft YaHei",
    "WenQuanYi Micro Hei", SimHei, sans-serif;
  width: 100%;
  height: 128px;
  resize: none;
  border-radius: 8px;
  outline: none;
  padding: 12px;
  font-size: 14px;
  line-height: 24px;
  border: 1px solid lightgray;
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
  margin-top: 16px;
}

.actions-wrapper::-webkit-scrollbar {
  display: none;
}
</style>
