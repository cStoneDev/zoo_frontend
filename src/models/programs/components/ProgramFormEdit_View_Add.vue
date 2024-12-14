<template>
    <v-form>
      <v-text-field 
        v-model="item.id" 
        label="ID" 
        type="number" 
        required 
        :readonly="mode === 'view'" 
      />
      <v-text-field 
        v-model="item.actividad" 
        label="Actividad" 
        required 
        :readonly="mode === 'view'" 
      />
      <v-text-field 
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
  </script>
  