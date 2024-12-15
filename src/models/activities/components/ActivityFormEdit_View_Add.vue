<template>
    <v-form>
      <v-text-field 
        v-model="item.id" 
        label="ID" 
        type="number" 
        required
        :rules="numberRules"
        :readonly="mode === 'view'" 
      />
      <v-select
        v-model="item.id_contrato"
        label="Id Contrato" 
        :items="[1,2,3,4,5,6,7,8,9,10,11]" 
        required 
        :readonly="mode === 'view'" 
      />

      <v-text-field 
        v-model="item.fecha" 
        label="Fecha"
        type="date" 
        required 
        :readonly="mode === 'view'" 
      />
      <v-text-field 
        v-model="item.hora" 
        label="Hora" 
        type="time" 
        required 
        :readonly="mode === 'view'" 
      />
      <v-textarea 
        v-model="item.descripcion" 
        label="Descripcion" 
        required 
        :readonly="mode === 'view'" 
        :rules="textRules"
      />
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
  