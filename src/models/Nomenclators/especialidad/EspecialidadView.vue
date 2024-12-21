<template>
    <DataTable title="Lista de Especialidades" 
        :items="especialidadesData" 
        :headers="especialidadHeaders"
        :buttons="especialidadButtons" 
        :especialidad-default="especialidadDefault" @update="handleUpdate">
        <template #dialog-content="{ item, mode }">
            <EspecialidadFormEdit_View_Add :item="item" :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <EspecialidadFormDelete :item="item" :mode="mode" v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import {ref} from 'vue';
import DataTable from "../../../components/table/Table.vue";
import EspecialidadFormEdit_View_Add from "./components/EspecialidadFormEdit_View_Add.vue";
import EspecialidadFormDelete from "./components/EspecialidadFormDelete.vue";


// Datos de animales
const especialidadesData = ref([
    {
        id: 1,
        nombre: "Cirugia"
    },
    {
        id: 2,
        nombre: "Machete"
    },
    {
        id: 3,
        nombre: "Estirpar"
    },
    {
        id: 4,
        nombre: "Aguja"
    }
]);

const especialidadDefault = ref({
    id: 0,
    nombre: ""
})
// Encabezados de la tabla
const especialidadHeaders = ref([
    { title: "ID", value: "id", sortable: "true" },
    { title: "Nombre", value: "nombre", sortable: "true" },
    { title: "Acciones", value: "actions", align: "center"},
]);

// Configuración de botones CRUD
const especialidadButtons = ref([
    {
        text: "Agregar",
        icon: "mdi-plus",
        mode: "add",

    },
]);

// Manejo de actualizaciones desde el hijo
function handleUpdate({ mode, item }) {

    if (mode === 'add') {
        especialidadesData.value.push({ id: Date.now(), ...item });
    } else if (mode === 'edit') {
        const index = especialidadesData.value.findIndex((data) => data.id === item.id);
        if (index !== -1) {
            // Crear un nuevo arreglo con el elemento actualizado
            especialidadesData.value = especialidadesData.value.map((data, i) =>
                i === index ? { ...item } : data
            );
        }
    } else if (mode === "delete") {
        especialidadesData.value = especialidadesData.value.filter((data) => data.id !== item.id);
    }
}

</script>

<style></style>