<template>
  <h1 class="text title-text">✍️ Tiny Undo Editor</h1>
  <p class="text tip-text">Just a simple example to show how tiny-undo works.</p>
  <TinyEditor />
</template>

<script setup lang="ts">
import TinyEditor from "./components/TinyEditor.vue";
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  font-family: -apple-system, "PingFang SC", "Hiragino Sans GB", "Source Han Sans SC", "Noto Sans CJK SC", "Microsoft YaHei",
    "WenQuanYi Micro Hei", SimHei, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.text {
  width: 384px;
  max-width: calc(100% - 16px);
  margin-top: 16px;
}

.text.title-text {
  margin-top: 128px;
}

.text.tip-text {
  color: #333;
}
</style>
