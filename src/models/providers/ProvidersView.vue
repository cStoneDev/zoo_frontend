<template>
    <DataTable title="Lista de Proveedores" 
        :items="providerData" 
        :headers="providersHeaders"
        :buttons="providersButtons" 
        :provider-default="providerDefault" @update="handleUpdate"
        :filters="providerFilter">
        <template #dialog-content="{ item, mode }">
            <ProviderFormEdit_View_Add :item="item" :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <ProviderFormDelete :item="item" :mode="mode" v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import {ref, reactive} from 'vue';
import DataTable from "../../components/table/Table.vue";
import ProviderFormDelete from './components/ProviderFormDelete.vue';
import ProviderFormEdit_View_Add from './components/ProviderFormEdit_View_Add.vue';


// Datos de animales
const providerData = ref([
    {
        id: 1,
        nombre: "Juancarlos",
        id_provincia: 1,
        id_tipo_servicio: 3,
        id_tipo_proveedor: 2,
        direccion: "calle san juan y neptuno",
        telefono: "555555555555",
        email: "feo@gmail.com",
        nombre_responsable: "Ernesto"
    }
]);

const providerFilter = reactive({
    id: {
        lista: providerData.value.map(item => item.id),
        label: "ID Proveedor"
    },
    id_provincia: {
        lista: providerData.value.map(item => item.id_provincia),
        label: "ID Provincia"
    },
    id_tipo_servicio: {
        lista: providerData.value.map(item => item.id_tipo_servicio),
        label: "ID tipo de servicio"
    },
    id_tipo_proveedor: {
        lista: providerData.value.map(item => item.id_tipo_proveedor),
        label: "ID tipo de proveedor"
    }
});

const providerDefault = ref({
    id: 0,
    nombre: "",
    id_provincia: 0,
    id_tipo_servicio: 0,
    id_tipo_proveedor: 0,
    direccion: "",
    telefono: "",
    email: "",
    nombre_responsable: ""
})
// Encabezados de la tabla
const providersHeaders = ref([
    { title: "ID", value: "id", sortable: "true" },
    { title: "Nombre", value: "nombre", sortable: "true" },
    { title: "Provincia", value: "id_provincia", sortable: "true" },
    { title: "Tipo_servicio", value: "id_tipo_servicio", sortable: "true" },
    { title: "Tipo", value: "id_tipo_proveedor", sortable: "true" }
]);

// Configuración de botones CRUD
const providersButtons = ref([
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
        providerData.value.push({ id: Date.now(), ...item });
    } else if (mode === 'edit') {
        const index = providerData.value.findIndex((data) => data.id === item.id);
        if (index !== -1) {
            // Crear un nuevo arreglo con el elemento actualizado
            providerData.value = providerData.value.map((data, i) =>
                i === index ? { ...item } : data
            );
        }
    } else if (mode === "delete") {
        providerData.value = providerData.value.filter((data) => data.id !== item.id);
    }
}

</script>

<style></style>