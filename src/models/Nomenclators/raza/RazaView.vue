<template>
    <DataTable title="Lista de Razas" 
        :items="razasData" 
        :headers="razaHeaders"
        :buttons="razaButtons" 
        :raza-default="razaDefault" @update="handleUpdate">
        <template #dialog-content="{ item, mode }">
            <RazaFormEdit_View_Add :item="item" :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <RazaFormDelete :item="item" :mode="mode" v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import {ref} from 'vue';
import DataTable from "../../../components/table/Table.vue";
import RazaFormEdit_View_Add from "./components/RazaFormEdit_View_Add.vue";
import RazaFormDelete from "./components/RazaFormDelete.vue";


// Datos de animales
const razasData = ref([
    {
        id: 1,
        nombre: "Pasmarote",
        id_especie: 1
    },
    {
        id: 2,
        nombre: "Chicago",
        id_especie: 2
    },
    {
        id: 3,
        nombre: "KakaDe",
        id_especie: 3
    },
    {
        id: 4,
        nombre: "Sephiroth",
        id_especie: 1
    }
]);

const razaDefault = ref({
    id: 0,
    nombre: ""
})
// Encabezados de la tabla
const razaHeaders = ref([
//    { title: "ID", value: "id", sortable: "true" },
    { title: "Nombre", value: "nombre", sortable: "true" },
    { title: "Acciones", value: "actions", align: "center"},
]);

// Configuración de botones CRUD
const razaButtons = ref([
    {
        text: "Agregar",
        icon: "mdi-plus",
        mode: "add",

    },
]);

// Manejo de actualizaciones desde el hijo
function handleUpdate({ mode, item }) {

    if (mode === 'add') {
        razasData.value.push({ id: Date.now(), ...item });
    } else if (mode === 'edit') {
        const index = razasData.value.findIndex((data) => data.id === item.id);
        if (index !== -1) {
            // Crear un nuevo arreglo con el elemento actualizado
            razasData.value = razasData.value.map((data, i) =>
                i === index ? { ...item } : data
            );
        }
    } else if (mode === "delete") {
        razasData.value = razasData.value.filter((data) => data.id !== item.id);
    }
}

</script>

<style></style>