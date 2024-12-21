<template>
    <DataTable title="Lista de Especies" 
        :items="especiesData" 
        :headers="especieHeaders"
        :buttons="especieButtons" 
        :especie-default="especieDefault" @update="handleUpdate">
        <template #dialog-content="{ item, mode }">
            <EspecieFormEdit_View_Add :item="item" :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <EspecieFormDelete :item="item" :mode="mode" v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import {ref} from 'vue';
import DataTable from "../../../components/table/Table.vue";
import EspecieFormEdit_View_Add from "./components/EspecieFormEdit_View_Add.vue";
import EspecieFormDelete from "./components/EspecieFormDelete.vue";


// Datos de animales
const especiesData = ref([
    {
        id: 1,
        nombre: "Canguro"
    },
    {
        id: 2,
        nombre: "Astronauta"
    },
    {
        id: 3,
        nombre: "Chino"
    },
    {
        id: 4,
        nombre: "Culerdo"
    }
]);

const especieDefault = ref({
    id: 0,
    nombre: ""
})
// Encabezados de la tabla
const especieHeaders = ref([
    { title: "ID", value: "id", sortable: "true" },
    { title: "Nombre", value: "nombre", sortable: "true" },
    { title: "Acciones", value: "actions", align: "center"},
]);

// Configuración de botones CRUD
const especieButtons = ref([
    {
        text: "Agregar",
        icon: "mdi-plus",
        mode: "add",

    },
]);

// Manejo de actualizaciones desde el hijo
function handleUpdate({ mode, item }) {

    if (mode === 'add') {
        especiesData.value.push({ id: Date.now(), ...item });
    } else if (mode === 'edit') {
        const index = especiesData.value.findIndex((data) => data.id === item.id);
        if (index !== -1) {
            // Crear un nuevo arreglo con el elemento actualizado
            especiesData.value = especiesData.value.map((data, i) =>
                i === index ? { ...item } : data
            );
        }
    } else if (mode === "delete") {
        especiesData.value = especiesData.value.filter((data) => data.id !== item.id);
    }
}

</script>

<style></style>