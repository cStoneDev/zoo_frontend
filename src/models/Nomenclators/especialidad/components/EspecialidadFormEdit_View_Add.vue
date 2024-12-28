<template>
    <v-form>
      <v-text-field 
        v-model="item.name" 
        label="Nombre" 
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
  