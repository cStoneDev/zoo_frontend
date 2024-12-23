<template>
  <v-form>
    <v-text-field v-model="item.id" label="ID" type="number" required :readonly="mode === 'view'"
      :rules="numberRules" />

    <v-autocomplete v-model="item.id_provincia" :items="[1, 2, 3, 4, 5]" label="Provincia" required
      :readonly="mode === 'view'" no-data-text="No hay más datos disponibles" />


    <v-text-field v-model="item.nombre" label="Nombre" required :readonly="mode === 'view'" />

    <v-autocomplete v-model="item.id_tipo_servicio" :items="[1, 2, 3, 4, 5]" label="Tipo servicio" required
      :readonly="mode === 'view'" no-data-text="No hay más datos disponibles" />

    <v-autocomplete v-model="item.id_tipo_proveedor" :items="[1, 2, 3, 4, 5]" label="Tipo" required
      :readonly="mode === 'view'" no-data-text="No hay más datos disponibles" />

    <v-text-field v-model="item.telefono" label="Telefono" required :readonly="mode === 'view'" :rules="phoneRules" />
    <v-text-field v-model="item.direccion" label="Direccion" required :readonly="mode === 'view'" />
    <v-text-field v-model="item.email" label="Email" type="email" required :readonly="mode === 'view'"
      :rules="emailRules" />
    <v-text-field v-model="item.nombre_responsable" label="Nombre responsable" required :readonly="mode === 'view'" />
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
    if (value?.length == 7) {
      return true;
    }
    return 'Un teléfono tiene 7 dígitos';
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