<template>
    <v-form>
      <v-text-field
        v-model="item.user"
        label="Usuario"
        required
        :readonly="mode === 'view'"
      />
      <v-text-field
        v-model="item.rol"
        label="Rol"
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
  