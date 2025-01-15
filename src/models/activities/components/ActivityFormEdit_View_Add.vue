<template>
  <v-form>

    <v-textarea 
      v-model="item.description" 
      label="Descripcion" 
      required 
      :readonly="mode === 'view'"
      :rules="textRules" />


    <v-autocomplete 
      v-model="item.contractId" 
      :items="[101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111]"
      label="Contrato" 
      required 
      :readonly="mode === 'view'" 
      no-data-text="No hay más datos disponibles" />

    <v-text-field 
      v-model="item.date" 
      label="Fecha" 
      type="text" 
      required
      :readonly="mode === 'view'" />

    <v-text-field 
      v-model="item.time" 
      label="Hora" 
      type="time" 
      required 
      :readonly="mode === 'view'" />



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