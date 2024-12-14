<template>
  <v-form>
    <v-text-field 
      v-model="item.id" 
      label="ID" 
      type="number" 
      required 
      :readonly="mode === 'view'" 
    />
    <v-select
      v-model="item.id_raza" 
      label="Tipo de Raza" 
      :items="[101,102,103,104,105,106,107,108,109,110,111]" 
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
      v-model="item.edad" 
      label="Edad (años)" 
      type="number" 
      required 
      :readonly="mode === 'view'" 
    />
    <v-text-field 
      v-model="item.peso" 
      label="Peso (kg)" 
      type="number" 
      required 
      :readonly="mode === 'view'" 
    />
    <v-text-field 
      v-model="item.dias_refugio" 
      label="Días en Zoológico" 
      type="number" 
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
