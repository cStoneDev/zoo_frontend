<template>
  <p class="text mr-10">Esta acción es irreversible!</p>
</template>

<script setup>
  import { ref } from "vue";
  import { defineProps } from "vue";

  defineProps({
    item: {
      type: Object,
      default: () => ({}),
    },
    mode: {
      type: String,
      required: true,
    },
  });

  
</script>

<style scoped>
  .text {
    font-size: 1.2em;
  }
</style>
