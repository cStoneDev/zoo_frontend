<template>
  <v-form>
    
    <v-text-field v-if="mode==='view'"
      v-model="item.animalName" 
      label="Nombre del Animal" 
      required 
      :readonly="mode === 'view'" />

    <v-text-field v-if="mode==='view'"
      v-model="item.date" 
      label="Fecha" 
      required 
      :readonly="mode === 'view'" />
    
    <v-text-field v-if="mode==='view'"
      v-model="item.time" 
      label="Hora" 
      type="time" 
      required 
      :readonly="mode === 'view'" />

    <v-autocomplete v-if="mode!=='view'"
      v-model="item.activityId" 
      :items="[1,2,3]"
      label="Actividad" 
      required 
      :readonly="mode === 'view'" 
      no-data-text="No hay más datos disponibles" />

    <v-autocomplete v-if="mode!=='view'"
      v-model="item.animalId" 
      :items="[1,2,3]" 
      label="Animal" 
      required
      :readonly="mode === 'view'" 
      no-data-text="No hay más datos disponibles" />




  </v-form>
</template>

<script setup>
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

let numberRules = [
  value => {
    if (value <= 0 || value === 0) {
      return 'Debe ser el número mayor que 0.';
    }
    return true;
  }
];

let textRules = [
  value => {
    if (value?.length >= 10) {
      return true;
    }
    return 'Deben ser más de 10 caracteres';
  }
];
</script>