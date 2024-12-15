<template>
    <v-form>
      <v-text-field 
        v-model="item.id" 
        label="ID" 
        type="number" 
        required 
        :readonly="mode === 'view'"
        :rules="numberRules" 
      />
      <v-select
        :items="[Alimentar, Show, Veterinario]"
        v-model="item.actividad" 
        label="Actividad" 
        required 
        :readonly="mode === 'view'" 
      />
      <v-select
        :items="[Leon , Jirafa]"
        v-model="item.especie" 
        label="Especie" 
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
  