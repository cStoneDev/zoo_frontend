<template>
    <DataTable title="Lista de Actividades" 
        :items="activitiesData" 
        :headers="activityHeaders"
        :buttons="activityButtons" 
        :activity-default="activityDefault" @update="handleUpdate"
        :filters="activityFilters">
        <template #dialog-content="{ item, mode }">
            <ActivityFormEdit_View_Add :item="item" :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <ActivityFormDelete :item="item" :mode="mode" v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import {ref, computed} from 'vue';
import {reactive} from 'vue';
import DataTable from "../../components/table/Table.vue";
import ActivityFormEdit_View_Add from "./components/ActivityFormEdit_View_Add.vue";
import ActivityFormDelete from "./components/ActivityFormDelete.vue";


// Datos de animales
const activitiesData = ref([
    {
        id: 1,
        fecha: "2025-10-12",
        hora: "06:05",
        id_contrato: 5,
        descripcion: "Muchacho pongase a trabajar"
    },
    {
        id: 2,
        fecha: "2025-11-12",
        hora: "07:05",
        id_contrato: 2,
        descripcion: "Muchachote pongase a trabajar"
    },
    {
        id: 3,
        fecha: "2025-11-15",
        hora: "10:05",
        id_contrato: 1,
        descripcion: "Muchacha pongase a trabajar"
    },
    {
        id: 4,
        fecha: "2025-12-12",
        hora: "08:05",
        id_contrato: 3,
        descripcion: "Mano pongase a trabajar"
    },
    {
        id: 5,
        fecha: "2025-11-16",
        hora: "07:23",
        id_contrato: 9,
        descripcion: "Pancito de la bodega"
    },
    {
        id: 6,
        fecha: "2025-11-18",
        hora: "07:23",
        id_contrato: 9,
        descripcion: "Boniatillo"
    }
]);

const activityFilters = reactive({
  date: {
    lista: [], // Fechas específicas
    label: "Fecha"
  },
  time: {
    lista: [], // Horarios disponibles
    label: "Hora"
  },
  contractId: {
    lista: new Set(activitiesData.value.map(item=>item.id_contrato).sort((a,b)=>a-b)), // IDs de contrato posibles
    label: "ID Contrato"
  }
});


const activityDefault = ref({
    id: 0,
    fecha: "2024-0-0",
    hora: "09:00:00",
    id_contrato: 0,
    descripcion: ""
})
// Encabezados de la tabla
const activityHeaders = ref([
//    { title: "ID", value: "id", sortable: "true" },
    { title: "Fecha", value: "fecha", sortable: "true" },
    { title: "Contrato", value: "id_contrato", sortable: "true" },
    { title: "Acciones", value: "actions", align: "center"},
]);

// Configuración de botones CRUD
const activityButtons = ref([

    {
        text: "Agregar",
        icon: "mdi-plus",
        mode: "add",

    },

]);

// Manejo de actualizaciones desde el hijo
function handleUpdate({ mode, item }) {

    if (mode === 'add') {
        activitiesData.value.push({ id: Date.now(), ...item });
    } else if (mode === 'edit') {
        const index = activitiesData.value.findIndex((data) => data.id === item.id);
        if (index !== -1) {
            // Crear un nuevo arreglo con el elemento actualizado
            activitiesData.value = activitiesData.value.map((data, i) =>
                i === index ? { ...item } : data
            );
        }
    } else if (mode === "delete") {
        activitiesData.value = activitiesData.value.filter((data) => data.id !== item.id);
    }
}

</script>

<style></style>