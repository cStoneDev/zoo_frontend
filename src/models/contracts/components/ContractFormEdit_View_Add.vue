<template>
  <v-form>
    <!-- <v-text-field v-model="item.id" label="ID" type="number" required :readonly="mode === 'view'"
      :rules="numberRules" /> -->


    <v-autocomplete 
      v-model="item.providerId" 
      :items="[1, 2, 3, 4, 5]" 
      label="Proveedor" 
      required
      :readonly="mode === 'view'"
      no-data-text="No hay más datos disponibles" />

    <v-text-field 
      v-model="item.basePrice" 
      label="Precio base" 
      type="number" 
      required 
      :readonly="mode === 'view'"
      :rules="numberRules" />

    <v-text-field 
      v-model="item.conciliationDate" 
      label="Fecha de conciliación" 
      type="text" 
      required
      :readonly="mode === 'view'" />

    <v-text-field 
      v-model="item.startingDate" 
      label="Fecha de inicio" 
      type="text" 
      required
      :readonly="mode === 'view'" />

    <v-text-field 
      v-model="item.endingDate" 
      label="Fecha final" 
      type="text" 
      required
      :readonly="mode === 'view'" />

    <v-textarea 
      v-model="item.description" 
      label="Descripcion" 
      required 
      :readonly="mode === 'view'"
      :rules="textRules" />

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