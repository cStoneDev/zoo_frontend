<template>
    <DataTable title="Lista de Provincias" 
        :items="provinciasData" 
        :headers="provinciaHeaders"
        :buttons="provinciaButtons" 
        :provincia-default="provinciaDefault" @update="handleUpdate">
        <template #dialog-content="{ item, mode }">
            <ProvinciaFormEdit_View_Add :item="item" :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <ProvinciaFormDelete :item="item" :mode="mode" v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import {ref} from 'vue';
import DataTable from "../../../components/table/Table.vue";
import ProvinciaFormEdit_View_Add from "./components/ProvinciaFormEdit_View_Add.vue";
import ProvinciaFormDelete from "./components/ProvinciaFormDelete.vue";


// Datos de animales
const provinciasData = ref([
    {
        id: 1,
        nombre: "Wantanamo"
    },
    {
        id: 2,
        nombre: "Labana"
    },
    {
        id: 3,
        nombre: "Pnardelrio"
    },
    {
        id: 4,
        nombre: "Artemisa"
    }
]);

const provinciaDefault = ref({
    id: 0,
    nombre: ""
})
// Encabezados de la tabla
const provinciaHeaders = ref([
    { title: "ID", value: "id", sortable: "true" },
    { title: "Nombre", value: "nombre", sortable: "true" }
]);

// Configuración de botones CRUD
const provinciaButtons = ref([
    {
        text: "Ver",
        icon: "mdi-eye",
        mode: "view",

    },
    {
        text: "Editar",
        icon: "mdi-pencil",
        mode: "edit",

    },
    {
        text: "Agregar",
        icon: "mdi-plus",
        mode: "add",

    },
    {
        text: "Eliminar",
        icon: "mdi-delete",
        mode: "delete",
    },
]);

// Manejo de actualizaciones desde el hijo
function handleUpdate({ mode, item }) {

    if (mode === 'add') {
        provinciasData.value.push({ id: Date.now(), ...item });
    } else if (mode === 'edit') {
        const index = provinciasData.value.findIndex((data) => data.id === item.id);
        if (index !== -1) {
            // Crear un nuevo arreglo con el elemento actualizado
            provinciasData.value = provinciasData.value.map((data, i) =>
                i === index ? { ...item } : data
            );
        }
    } else if (mode === "delete") {
        provinciasData.value = provinciasData.value.filter((data) => data.id !== item.id);
    }
}

</script>

<style></style>