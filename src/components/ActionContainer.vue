<template>
  <div :class="`action-container ${isActive ? 'active' : ''}`" @click="handleActionClick">
    <p class="value-text">{{ action.value }}</p>
    <span class="date-text">{{ new Date(action.timestamp).toLocaleString() }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { InputAction } from "tiny-undo";

export default defineComponent({
  name: "ActionContainer",
  props: {
    action: {
      required: true,
      type: Object as () => InputAction,
    },
    index: Number,
    isActive: Boolean,
  },
  emits: ["click"],
  methods: {
    handleActionClick() {
      this.$emit("click", this.index);
    },
  },
});
</script>

<style scoped>
.action-container {
  flex-shrink: 0;
  width: 384px;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 8px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #f1f1f1;
}

.action-container.active {
  background-color: #eaeaea;
  border: 1px solid #eaeaea;
}

.action-container > .value-text {
  font-size: 14px;
  line-height: 24px;
  min-height: 24px;
  word-break: break-word;
  white-space: pre-wrap;
}

.action-container > .date-text {
  font-size: 12px;
  margin-top: 8px;
}
</style>
