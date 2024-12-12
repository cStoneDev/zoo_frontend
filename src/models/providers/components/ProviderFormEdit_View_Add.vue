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
        v-model="item.id_provincia" 
        label="Provincia" 
        type="number" 
        required 
        :readonly="mode === 'view'" 
      />
      <v-text-field 
        v-model="item.nombre" 
        label="Nombre" 
        required 
        :readonly="mode === 'view'" 
      />
      <v-text-field 
        v-model="item.id_tipo_servicio" 
        label="Tipo servicio" 
        type="number" 
        required 
        :readonly="mode === 'view'" 
      />
      <v-text-field 
        v-model="item.id_tipo_proveedor" 
        label="Tipo" 
        type="number" 
        required 
        :readonly="mode === 'view'" 
      />
      <v-text-field 
        v-model="item.telefono" 
        label="Telefono"  
        required 
        :readonly="mode === 'view'" 
      />
      <v-text-field 
        v-model="item.direccion" 
        label="Direccion"  
        required 
        :readonly="mode === 'view'" 
      />
      <v-text-field 
        v-model="item.email" 
        label="Email"  
        required 
        :readonly="mode === 'view'" 
      />
      <v-text-field 
        v-model="item.nombre_responsable" 
        label="Nombre responsable"  
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
  