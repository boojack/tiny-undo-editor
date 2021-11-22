<template>
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
  font-family: -apple-system, "system-ui", Segoe UI, Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", Segoe UI Symbol;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>
