<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ title }}</span>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        label="Buscar"
        append-icon="mdi-magnify"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:no-data>
        <v-alert>No hay datos disponibles.</v-alert>
      </template>
    </v-data-table>
  </v-card>
</template>


<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';

// Define las props que espera el componente hijo
defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  headers: {
    type: Array,
    required: true,
  },
});

const search = ref('');
</script>


<style scoped>
/* Estilos personalizados si es necesario */
</style>
