<template>
    <v-form>
        <v-text-field 
            v-model="item.username" 
            label="Usuario" 
            required 
            :readonly="mode === 'view'" 
            :rules="firstNameRules"
            />

        <v-autocomplete 
            v-model="roles" 
            :items="['Moderador','Administrador']" 
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

        <v-text-field 
            v-if="mode === 'add'"
            v-model="item.password" 
            label="Contraseña" 
            required 
            :readonly="mode === 'view'" 
            :rules="firstNameRules" />
    </v-form>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue';

let props = defineProps({
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
const roles = ref(props.item.roleName);

watch(roles, (newRoles) => {
 
  // Ejemplo de cómo actualizar un campo relacionado con el rol
  if (newRoles === 'Administrador') {
    props.item.roleId = 2;
  } else {
    props.item.roleId = 1;
  }

});

</script>