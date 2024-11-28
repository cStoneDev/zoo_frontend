<template>
  <v-form>
    <v-text-field label="Nombre" required />
    <v-text-field label="Edad (años)" type="number" required />
    <v-text-field label="Peso (kg)" type="number" required />
  </v-form>
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
