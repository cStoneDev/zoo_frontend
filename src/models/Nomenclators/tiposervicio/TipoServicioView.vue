<template>
    <DataTable title="Lista de tipo de servicios" 
        :items="tiposerviciosData" 
        :headers="tiposervicioHeaders"
        :buttons="tiposervicioButtons" 
        :tiposervicio-default="tiposervicioDefault" @update="handleUpdate">
        <template #dialog-content="{ item, mode }">
            <TipoServicioFormEdit_View_Add :item="item" :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <TipoServicioFormDelete :item="item" :mode="mode" v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import {ref} from 'vue';
import DataTable from "../../../components/table/Table.vue";
import TipoServicioFormEdit_View_Add from "./components/TipoServicioFormEdit_View_Add.vue";
import TipoServicioFormDelete from "./components/TipoServicioFormDelete.vue";


// Datos de animales
const tiposerviciosData = ref([
    {
        id: 1,
        nombre: "Panadero"
    },
    {
        id: 2,
        nombre: "Payaso"
    },
    {
        id: 3,
        nombre: "Corredor"
    }
]);

const tiposervicioDefault = ref({
    id: 0,
    nombre: ""
})
// Encabezados de la tabla
const tiposervicioHeaders = ref([
    { title: "ID", value: "id", sortable: "true" },
    { title: "Nombre", value: "nombre", sortable: "true" },
    { title: "Acciones", value: "actions", align: "center"},
]);

// Configuración de botones CRUD
const tiposervicioButtons = ref([
    {
        text: "Agregar",
        icon: "mdi-plus",
        mode: "add",

    },
]);

// Manejo de actualizaciones desde el hijo
function handleUpdate({ mode, item }) {

    if (mode === 'add') {
        tiposerviciosData.value.push({ id: Date.now(), ...item });
    } else if (mode === 'edit') {
        const index = tiposerviciosData.value.findIndex((data) => data.id === item.id);
        if (index !== -1) {
            // Crear un nuevo arreglo con el elemento actualizado
            tiposerviciosData.value = tiposerviciosData.value.map((data, i) =>
                i === index ? { ...item } : data
            );
        }
    } else if (mode === "delete") {
        tiposerviciosData.value = tiposerviciosData.value.filter((data) => data.id !== item.id);
    }
}

</script>

<style></style>