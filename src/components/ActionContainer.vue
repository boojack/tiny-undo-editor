<template>
  <div :class="isActive ? 'active' : ''" class="action-container">
    <p class="value-text">{{ action.value }}</p>
    <span class="date-text">{{ new Date(action.timestamp).toLocaleString() }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";
import { InputAction } from "tiny-undo";

export default defineComponent({
  name: "ActionContainer",
  props: {
    action: {
      required: true,
      type: Object as () => InputAction,
    },
    isActive: Boolean,
  },
  setup() {
    onMounted(() => {});

    onUnmounted(() => {});

    return {};
  },
});
</script>

<style scoped>
.action-container {
  flex-shrink: 0;
  width: 382px;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 8px;
  border-radius: 5px;
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
}

.action-container > .date-text {
  font-size: 12px;
  margin-top: 8px;
}
</style>
