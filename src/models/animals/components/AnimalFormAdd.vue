<template>
  <v-form>
    <v-text-field v-model="item.nombre" label="Nombre" required />
    <v-text-field
      v-model="item.edad"
      label="Edad (años)"
      type="number"
      required
    />
    <v-text-field
      v-model="item.peso"
      label="Peso (kg)"
      type="number"
      required
    />
    <v-text-field
      v-model="item.dias_refugio"
      label="Días en Zoológico"
      type="number"
      required
    />
  </v-form>
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
