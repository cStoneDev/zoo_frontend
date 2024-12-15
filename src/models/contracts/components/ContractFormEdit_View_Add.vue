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
      
      <!-- hay que ponerle v-model al select -->
      <v-select 
        :items="[Pescadero, Carnicero]" 
        label="Proveedor" 
        required 
        :readonly="mode === 'view'" />
      <v-text-field 
        v-model="item.precio_base"
        label="Precio"
        type="number"
        required
        :readonly="mode === 'view'" 
        :rules="numberRules"
      />
      <v-text-field 
        v-model="item.recargo"
        label="Recargo"
        type="number"
        required 
        :readonly="mode === 'view'" 
        :rules="numberRules"
      />
      <v-text-field 
        v-model="item.fecha_conciliacion" 
        label="Fecha de conciliación"
        type="date" 
        required 
        :readonly="mode === 'view'" 
      />
      <v-text-field 
        v-model="item.fecha_inicio" 
        label="Fecha de inicio"
        type="date" 
        required 
        :readonly="mode === 'view'" 
      />
      <v-text-field 
        v-model="item.fecha_final" 
        label="Fecha final"
        type="date" 
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
  