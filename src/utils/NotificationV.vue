<!-- Alerta de Éxito
color="success"
title="¡Éxito!"
text="La operación se realizó correctamente."
:dismissible="true"
/>

Alerta de Error
<Alert
color="error"
text="Hubo un problema al procesar la solicitud."
:dismissible="false"
/>

Alerta de Advertencia
<Alert
color="warning"
title="¡Advertencia!"
text="La configuración no se ha guardado correctamente."
/>

Alerta de Información
<Alert
color="info"
text="Este es un mensaje informativo."
/> -->


<template>
    <v-alert 
        v-if="visible" 
        :color="alertColor" 
        :icon="alertIcon" 
        :title="alertTitle" 
        :dismissible="dismissible"
        @input="toggleVisibility"
        variant="tonal"
        closable
         class="alert-overlay">
        <slot>{{ text }}</slot>
    </v-alert>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue';

// Propiedades del componente
const props = defineProps({
    color: {
        type: String,
        default: 'success', // Color predeterminado
    },
    icon: {
        type: String,
        default: '$success', // Ícono predeterminado
    },
    title: {
        type: String,
        default: '', // Título opcional
    },
    text: {
        type: String,
        default: '', // Texto del mensaje
    },
    dismissible: {
        type: Boolean,
        default: true, // Por defecto las alertas son desechables
    },
});

// Visibilidad de la alerta
const visible = ref(true);

// Método para ocultar la alerta
const toggleVisibility = (value) => {
    visible.value = value;
};

// Condicionales para el color, icono y título
const alertColor = ref(props.color || 'success'); // Color según el prop pasado
const alertIcon = ref(getIconBasedOnColor(props.color)); // Asignar ícono en función del color
const alertTitle = ref(props.title || getTitleBasedOnColor(props.color)); // Título basado en el color

// Funciones para determinar el ícono y título según el color
function getIconBasedOnColor(color) {
    switch (color) {
        case 'error':
            return '$error'; // ícono para error
        case 'warning':
            return '$warning'; // ícono para advertencia
        case 'info':
            return '$info'; // ícono para información
        default:
            return '$success'; // ícono por defecto
    }
}

function getTitleBasedOnColor(color) {
    switch (color) {
        case 'error':
            return '¡Error!';
        case 'warning':
            return 'Advertencia';
        case 'info':
            return 'Información';
        default:
            return '¡Éxito!';
    }
}

// Control del tiempo de visibilidad
onMounted(() => {
    setTimeout(() => {
        visible.value = false; // Desaparece después de 1.5 segundos
    }, 1500); // 1.5 segundos (1500 ms)
});
</script>

<style scoped>
.alert-overlay {
    position: fixed;
    width: 100%;
    /* Superpone la alerta */
    bottom: 0;
    /* Distancia desde la parte superior */
    left: 50%;
    transform: translateX(-50%);
    /* Centra horizontalmente */
    z-index: 9999;
    /* Asegura que se superponga a otros elementos */
    transition: opacity 0.3s ease-in-out;
    /* Transición suave */
}
</style>