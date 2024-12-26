<template>
    <DataTable title="Lista de tipo de proveedores" 
        :items="tipoproveedoresData" 
        :headers="tipoproveedorHeaders"
        :buttons="tipoproveedorButtons" 
        :tipoproveedor-default="tipoproveedorDefault" @update="handleUpdate">
        <template #dialog-content="{ item, mode }">
            <TipoProveedorFormEdit_View_Add :item="item" :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <TipoProveedorFormDelete :item="item" :mode="mode" v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import {ref} from 'vue';
import DataTable from "../../../components/table/Table.vue";
import TipoProveedorFormEdit_View_Add from "./components/TipoProveedorFormEdit_View_Add.vue";
import TipoProveedorFormDelete from "./components/TipoProveedorFormDelete.vue";


// Datos de animales
const tipoproveedoresData = ref([
    {
        id: 1,
        nombre: "Alimentador"
    },
    {
        id: 2,
        nombre: "Veterinario"
    },
    {
        id: 3,
        nombre: "Transportista"
    }
]);

const tipoproveedorDefault = ref({
    id: 0,
    nombre: ""
})
// Encabezados de la tabla
const tipoproveedorHeaders = ref([
//    { title: "ID", value: "id", sortable: "true" },
    { title: "Nombre", value: "nombre", sortable: "true" },
    { title: "Acciones", value: "actions", align: "center"},
]);

// Configuración de botones CRUD
const tipoproveedorButtons = ref([
    {
        text: "Agregar",
        icon: "mdi-plus",
        mode: "add",

    },
]);

// Manejo de actualizaciones desde el hijo
function handleUpdate({ mode, item }) {

    if (mode === 'add') {
        tipoproveedoresData.value.push({ id: Date.now(), ...item });
    } else if (mode === 'edit') {
        const index = tipoproveedoresData.value.findIndex((data) => data.id === item.id);
        if (index !== -1) {
            // Crear un nuevo arreglo con el elemento actualizado
            tipoproveedoresData.value = tipoproveedoresData.value.map((data, i) =>
                i === index ? { ...item } : data
            );
        }
    } else if (mode === "delete") {
        tipoproveedoresData.value = tipoproveedoresData.value.filter((data) => data.id !== item.id);
    }
}

</script>

<style></style>