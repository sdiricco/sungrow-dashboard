<template>
  <!-- Main container -->
  <div class="main-container">
    <!-- Header -->
    <header class="header" :class="classHeader">
      <slot name="header"></slot>
    </header>
    <!-- Main content -->
    <div class="content" :class="classContent">
      <slot name="content"></slot>
    </div>
    <!-- Footer -->
    <header class="footer" :class="classFooter">
      <slot name="footer"></slot>
    </header>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  classHeader?: string;
  classContent?: string;
  classFooter?: string;
}
defineProps<IProps>();
</script>

<style scoped>
.main-container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  overflow: auto;
  height: 100%;
}
</style>
