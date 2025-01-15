<template>
    <v-form>
        <v-text-field 
            v-model="item.username" 
            label="Usuario" 
            required 
            :readonly="mode === 'view'" 
            :rules="firstNameRules" />

        <v-autocomplete 
            v-model="item.roleId" 
            :items="[1,2]" 
            label="Rol del Usuario" 
            required 
            :readonly="mode === 'view'"
            no-data-text="No hay más datos disponibles" />

        <v-text-field 
            v-model="item.email" 
            label="Email" 
            type="email" 
            required 
            :readonly="mode === 'view'"
            :rules="emailRules" />
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

let firstNameRules = [
    value => {
        if (value?.length >= 4) {
            return true;
        }
        return 'Deben ser más de 4 caracteres';
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
const roles = ["Admin", "Moderador"];
</script>