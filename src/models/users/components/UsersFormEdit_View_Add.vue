<template>
    <v-form>
        <v-text-field v-model="item.nombre" label="Usuario" required :readonly="mode === 'view'" :rules="firstNameRules" />
        <v-select v-model="item.rol" :items="roles" label="Rol del Usuario" required :readonly="mode === 'view'" />


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
const roles = ["Admin", "Moderador"];
</script>