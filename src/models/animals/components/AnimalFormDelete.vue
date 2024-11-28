<template>
  <p>
    Esta acción es irrevertible!
  </p>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps} from 'vue';

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
