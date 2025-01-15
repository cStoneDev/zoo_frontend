<template>
  <v-form>
    <!-- <v-text-field v-model="item.id" label="ID" type="number" required :readonly="mode === 'view'"
      :rules="numberRules" /> -->
    
      <v-text-field 
      v-model="item.name" 
      label="Nombre" 
      required 
      :readonly="mode === 'view'" />

    <v-autocomplete 
      v-model="item.provinceId" 
      :items="[1, 2, 3, 4, 5]" 
      label="Provincia" 
      required
      :readonly="mode === 'view'" 
      no-data-text="No hay más datos disponibles" />

    <v-autocomplete 
      v-model="item.serviceTypeId" 
      :items="[1, 2, 3, 4, 5]" 
      label="Tipo servicio" 
      required
      :readonly="mode === 'view'" 
      no-data-text="No hay más datos disponibles" />

    <v-autocomplete 
      v-model="item.providerTypeId" 
      :items="[1, 2, 3, 4, 5]" 
      label="Tipo" 
      required
      :readonly="mode === 'view'" 
      no-data-text="No hay más datos disponibles" />
      
    <v-text-field 
      v-model="item.address" 
      label="Dirección" 
      required 
      :readonly="mode === 'view'" />
    
    <v-text-field 
      v-model="item.phone" 
      label="Teléfono" 
      required 
      :readonly="mode === 'view'" 
      :rules="phoneRules" />
    
    <v-text-field 
      v-model="item.email" 
      label="Email" 
      type="email" 
      required 
      :readonly="mode === 'view'"
      :rules="emailRules" />

    <v-text-field 
      v-model="item.responsibleName" 
      label="Nombre del responsable" 
      required 
      :readonly="mode === 'view'" />

    <v-text-field 
      v-if="item.providerTypeId == 1"
      v-model="item.fax" 
      label="Teléfono" 
      required 
      :readonly="mode === 'view'" 
      :rules="phoneRules" />

    <v-text-field 
      v-if="item.providerTypeId == 1"
      v-model="item.cityDistance" 
      label="Distancia de la ciudad" 
      type="number" 
      required 
      :readonly="mode === 'view'"
      :rules="numberRules" />

    <v-autocomplete 
      v-if="item.providerTypeId == 1"
      v-model="item.clinicId" 
      :items="[1, 2, 3, 4, 5]" 
      label="Clínica" 
      required
      :readonly="mode === 'view'" 
      no-data-text="No hay más datos disponibles" />

    <v-autocomplete 
      v-if="item.providerTypeId == 1"
      v-model="item.specialityId" 
      :items="[1, 2, 3, 4, 5]" 
      label="Especialidad" 
      required
      :readonly="mode === 'view'" 
      no-data-text="No hay más datos disponibles" />

      
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

let phoneRules = [
  value => {
    if (value?.length == 8) {
      return true;
    }
    return 'Un teléfono tiene 8 dígitos';
  }
];

let emailRules = [
  value => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      return true;
    }
    return 'Por favor, ingrese un correo electrónico válido';
  }
];

</script>