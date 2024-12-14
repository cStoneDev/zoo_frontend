<template>
    <DataTable title="Programación" :items="programData" :headers="programHeaders" :buttons="programButtons"
        :program-default="programDefault" @update="handleUpdate" :filters="programFilters">
        <template #dialog-content="{ item, mode }">
            <ProgramFormEdit_View_Add :item="item" :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <ProgramFormDelete :item="item" :mode="mode" v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import DataTable from "../../components/table/Table.vue";
import ProgramFormEdit_View_Add from "./components/ProgramFormEdit_View_Add.vue";
import ProgramFormDelete from "./components/ProgramFormDelete.vue";
import { ref, reactive} from "vue";

// Datos de los contratos
const programData = reactive([
    {
        id: 1,
        actividad: "Alimentar",
        especie: "Leones",
        fecha: "2024-11-14",
        hora: "08:05:00",
        descripcion: "Mano pongase a Alimentar a los leones",

    },
    {
        id: 2,
        actividad: "Alimentar",
        especie: "Lobos",
        fecha: "2024-11-14",
        hora: "08:05:00",
        descripcion: "Mano pongase a Alimentar a los leones",
    },
    {
        id: 3,
        actividad: "Alimentar",
        especie: "Jirafas",
        fecha: "2024-11-14",
        hora: "08:05:00",
        descripcion: "Mano pongase a Alimentar a los leones",
    },
    {
        id: 4,
        actividad: "Alimentar",
        especie: "Tigueres",
        fecha: "2024-11-14",
        hora: "08:05:00",
        descripcion: "Mano pongase a Alimentar a los leones",
    },
    {
        id: 5,
        actividad: "Alimentar",
        especie: "Delfines",
        fecha: "2024-11-14",
        hora: "08:05:00",
        descripcion: "Mano pongase a Alimentar a los leones",
    },
    {
        id: 6,
        actividad: "Alimentar",
        especie: "Pinguinos linux",
        fecha: "2024-11-14",
        hora: "08:05:00",
        descripcion: "Mano pongase a Alimentar a los leones",
    },
    {
        id: 7,
        actividad: "Alimentar",
        especie: "Ranas",
        fecha: "2024-11-14",
        hora: "08:05:00",
        descripcion: "Mano pongase a Alimentar a los leones",
    },
    {
        id: 8,
        actividad: "pasear",
        especie: "Ranas",
        fecha: "2024-11-14",
        hora: "08:05:00",
        descripcion: "Mano pongase a Alimentar a los leones",
    },
]);

const programFilters = reactive({
  id: {
    lista: programData.map(item=>item.id), // Ejemplo de IDs posibles
    label: "ID Actividad"
  },
  especie: {
    lista: Array.from(new Set(programData.map(item => item.especie))),
    label: "Especie"
  },
  fecha: {
    lista: [], // Fechas específicas
    label: "Fecha"
  },
  hora: {
    lista: [], // Horarios disponibles
    label: "Hora"
  },
});

const programDefault = reactive({
    id: 0,
    actividad: "",
    especie: 0.0,
    fecha: 0.0,
    hora: 0,
    descripcion: 0,
})
// Encabezados de la tabla
const programHeaders = ref([
    { title: "ID", value: "id", sortable: "true" },
    { title: "Actividad", value: "actividad", sortable: "true" },
    { title: "Especie", value: "especie", sortable: "true" },
    { title: "Fecha", value: "fecha", sortable: "true" },
    { title: "Hora", value: "hora", sortable: "true" },
    { title: "Descripción", value: "descripcion", sortable: "true" },
]);

// Configuración de botones CRUD
const programButtons = ref([
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
        programData.value.push({ id: Date.now(), ...item });
    } else if (mode === 'edit') {
        const index = programData.value.findIndex((data) => data.id === item.id);
        if (index !== -1) {
            // Crear un nuevo arreglo con el elemento actualizado
            programData.value = programData.value.map((data, i) =>
                i === index ? { ...item } : data
            );
        }
    } else if (mode === "delete") {
        programData.value = programData.value.filter((data) => data.id !== item.id);
    }
}



</script>