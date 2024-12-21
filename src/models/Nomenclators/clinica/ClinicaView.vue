<template>
    <DataTable title="Lista de Clínicas" 
        :items="clinicasData" 
        :headers="clinicaHeaders"
        :buttons="clinicaButtons" 
        :clinica-default="clinicaDefault" @update="handleUpdate">
        <template #dialog-content="{ item, mode }">
            <ClinicaFormEdit_View_Add :item="item" :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <ClinicaFormDelete :item="item" :mode="mode" v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import {ref} from 'vue';
import DataTable from "../../../components/table/Table.vue";
import ClinicaFormEdit_View_Add from "./components/ClinicaFormEdit_View_Add.vue";
import ClinicaFormDelete from "./components/ClinicaFormDelete.vue";


// Datos de animales
const clinicasData = ref([
    {
        id: 1,
        nombre: "AntonioMaceo"
    },
    {
        id: 2,
        nombre: "JuanSuarez"
    },
    {
        id: 3,
        nombre: "LaJoya"
    },
    {
        id: 4,
        nombre: "MarianaoJovenClub"
    }
]);

const clinicaDefault = ref({
    id: 0,
    nombre: ""
})
// Encabezados de la tabla
const clinicaHeaders = ref([
    { title: "ID", value: "id", sortable: "true" },
    { title: "Nombre", value: "nombre", sortable: "true" },
    { title: "Acciones", value: "actions", align: "center"},
]);

// Configuración de botones CRUD
const clinicaButtons = ref([
    {
        text: "Agregar",
        icon: "mdi-plus",
        mode: "add",

    },
]);

// Manejo de actualizaciones desde el hijo
function handleUpdate({ mode, item }) {

    if (mode === 'add') {
        clinicasData.value.push({ id: Date.now(), ...item });
    } else if (mode === 'edit') {
        const index = clinicasData.value.findIndex((data) => data.id === item.id);
        if (index !== -1) {
            // Crear un nuevo arreglo con el elemento actualizado
            clinicasData.value = clinicasData.value.map((data, i) =>
                i === index ? { ...item } : data
            );
        }
    } else if (mode === "delete") {
        clinicasData.value = clinicasData.value.filter((data) => data.id !== item.id);
    }
}

</script>

<style></style>