<template>
    <v-form>
      <v-text-field 
        v-model="item.name" 
        label="Nombre" 
        required 
        :readonly="mode === 'view'" 
      />
    </v-form>
    <v-text-field v-if="mode === 'add' || mode === 'edit' "
      v-model="item.speciesId" 
      label="Pa poner id de la especie, futuro vselec" 
      type="number" 
      required 
      :readonly="mode === 'view'" 
    />

    <v-autocomplete v-if="mode === 'view'" 
      v-model="item.specieName" 
      :items="[101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111]"
      label="Especie" 
      required 
      :readonly="mode === 'view'" 
      no-data-text="No hay más datos disponibles" />
  </template>
  


  const razaDefault = ref({
    id: 0,
    name: "",
    speciesId: 0,
    speciesName: ""
})

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
  