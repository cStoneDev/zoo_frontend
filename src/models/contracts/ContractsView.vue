<template>
    <DataTable title="Lista de Contratos" :items="contractData" :headers="contractHeaders" :buttons="contractButtons"
        :contract-default="contractDefault" @update="handleUpdate" :filters="contractFilters">
        <template #dialog-content="{ item, mode }">
            <ContractFormEdit_View_Add :item="item" :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <ContractFormDelete :item="item" :mode="mode" v-if="mode == 'delete'" />

        </template>
    </DataTable>
</template>

<script setup>
import DataTable from "../../components/table/Table.vue";
import { reactive } from 'vue';
import ContractFormEdit_View_Add from "./components/ContractFormEdit_View_Add.vue";
import ContractFormDelete from "./components/ContractFormDelete.vue";
import { ref } from "vue";

// Datos de los contratos
const contractData = ref([
    {
        id: 1,
        descripcion: "Consultas generales de cuidado a los animales",
        precio_base: 500.0,
        recargo: 50.0,
        fecha_conciliacion: "2024-11-14",
        fecha_inicio: "2024-12-14",
        fecha_final: "2024-11-14",
    },
    {
        id: 2,
        descripcion: "Aseguramiento en situaciones de emergencia",
        precio_base: 600.0,
        recargo: 50.0,
        fecha_conciliacion: "2024-11-14",
        fecha_inicio: "2024-11-14",
        fecha_final: "2024-11-16",
    },
    {
        id: 3,
        descripcion: "Consultas para animales pequeños",
        precio_base: 300.0,
        recargo: 50.0,
        fecha_conciliacion: "2024-11-19",
        fecha_inicio: "2024-11-18",
        fecha_final: "2024-11-14",
    },
    {
        id: 4,
        descripcion: "Servicios de transporte",
        precio_base: 550.0,
        recargo: 50.0,
        fecha_conciliacion: "2024-11-12",
        fecha_inicio: "2024-11-14",
        fecha_final: "2024-11-21",
    },
    {
        id: 5,
        descripcion: "Dar de beber a los animales",
        precio_base: 150.0,
        recargo: 50.0,
        fecha_conciliacion: "2024-11-14",
        fecha_inicio: "2024-11-14",
        fecha_final: "2024-11-14",
    },
    {
        id: 6,
        descripcion: "Cirujias de emergencia",
        precio_base: 100.0,
        recargo: 50.0,
        fecha_conciliacion: "2024-11-14",
        fecha_inicio: "2024-11-14",
        fecha_final: "2024-11-14",
    },
    {
        id: 7,
        descripcion: "Alimentacion básica general",
        precio_base: 100.0,
        recargo: 50.0,
        fecha_conciliacion: "2024-11-14",
        fecha_inicio: "2024-11-14",
        fecha_final: "2024-11-14",
    },
]);

const contractFilters = reactive({
    conciliationDate: {
        lista: [contractData.value.map(item => item.fecha_conciliacion)], // Fechas específicas
        label: "Fecha Conciliación"
    },
    startDate: {
        lista: [contractData.value.map(item => item.fecha_inicio)], // Fechas específicas
        label: "Fecha Inicio"
    },
    endDate: {
        lista: [contractData.value.map(item => item.fecha_final)], // Fechas específicas
        label: "Fecha Final"
    },
    basePriceMin: {
        label: "Precio base mínimo"
    },
    basePriceMax: {  
        label: "Precio base máximo"
    },
    minSurcharge: {
        label: "Recargo mínimo"
    },
    maxSurcharge: {  
        label: "Recargo máximo"
    },
});

const contractDefault = ref({
    id: 0,
    descripcion: "",
    precio_base: 0.0,
    recargo: 0.0,
    fecha_conciliacion: 0,
    fecha_inicio: 0,
    fecha_final: 0,
})
// Encabezados de la tabla
const contractHeaders = ref([
//    { title: "ID", value: "id", sortable: "true" },
    { title: "Descripción", value: "descripcion", sortable: "true" },
    { title: "Precio Base", value: "precio_base", sortable: "true" },
    { title: "Recargo", value: "recargo", sortable: "true" },
    { title: "Fecha de conciliación", value: "fecha_conciliacion", sortable: "true" },
    { title: "Fecha de inicio", value: "fecha_inicio", sortable: "true" },
    { title: "Fecha final", value: "fecha_final", sortable: "true" },
    { title: "Acciones", value: "actions", align: "center"},
]);

// Configuración de botones CRUD
const contractButtons = ref([


    {
        text: "Agregar",
        icon: "mdi-plus",
        mode: "add",

    },

]);

// Manejo de actualizaciones desde el hijo
function handleUpdate({ mode, item }) {

    if (mode === 'add') {
        contractData.value.push({ id: Date.now(), ...item });
    } else if (mode === 'edit') {
        const index = contractData.value.findIndex((data) => data.id === item.id);
        if (index !== -1) {
            // Crear un nuevo arreglo con el elemento actualizado
            contractData.value = contractData.value.map((data, i) =>
                i === index ? { ...item } : data
            );
        }
    } else if (mode === "delete") {
        contractData.value = contractData.value.filter((data) => data.id !== item.id);
    }
}



</script>