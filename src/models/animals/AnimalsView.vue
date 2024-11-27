<template>
  <DataTable
    title="Lista de Animales"
    :items="animalData"
    :headers="animalHeaders"
  />
</template>

<script setup>
import DataTable from '../../components/table/Table.vue';
import { ref } from 'vue';

// Datos de animales
const animalData = ref([
  { id: 1, nombre: 'León', id_raza: 101, edad: 5, peso: 190.5, dias_refugio: 30 },
  { id: 2, nombre: 'Tigre', id_raza: 102, edad: 4, peso: 220.0, dias_refugio: 15 },
  { id: 3, nombre: 'Elefante', id_raza: 103, edad: 10, peso: 600.0, dias_refugio: 45 },
  { id: 4, nombre: 'Jirafa', id_raza: 104, edad: 7, peso: 800.0, dias_refugio: 20 },
  { id: 5, nombre: 'Cebra', id_raza: 105, edad: 3, peso: 350.0, dias_refugio: 10 },
  { id: 6, nombre: 'Hipopótamo', id_raza: 106, edad: 8, peso: 1500.0, dias_refugio: 60 },
  { id: 7, nombre: 'Rinoceronte', id_raza: 107, edad: 6, peso: 2300.0, dias_refugio: 25 },
]);

// Encabezados de la tabla
const animalHeaders = ref([
  { title: 'Nombre', value: 'nombre' },
  { title: 'Edad (años)', value: 'edad' },
  { title: 'Peso (kg)', value: 'peso' },
  { title: 'Días en Refugio', value: 'dias_refugio' },
]);
</script>
