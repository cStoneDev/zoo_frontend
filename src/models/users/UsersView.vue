<template>
    <DataTable title="Lista de Usuarios" :items="usersData" :headers="usersHeaders" :buttons="usersButtons"
        :users-default="usersDefault" @update="handleUpdate" :filters="usersFilters">
        <template #dialog-content="{ item, mode }">
            <UsersFormEdit_View_Add :item="item" :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <UsersFormDelete :item="item" :mode="mode" v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import DataTable from "../../components/table/Table.vue";
import UsersFormEdit_View_Add from "./components/UsersFormEdit_View_Add.vue";
import UsersFormDelete from "./components/UsersFormDelete.vue";
import { ref } from "vue";
import { reactive } from 'vue';

// Datos de animales
const usersData = ref([
    {
        id: 1,
        rol: "Moderador",
        nombre: "Jose",
    },
    {
        id: 2,
        rol: "Moderador",
        nombre: "Juan",
    },
    {
        id: 3,
        rol: "Admin",
        nombre: "Pepe",
    },
]);

const usersFilters = reactive({
    rol: {
        lista: ["Moderador", "Admin"],
        label: "Rol"
    }
});

const usersDefault = reactive({
    id: 0,
    rol: "",
    nombre: "",
})
// Encabezados de la tabla
const usersHeaders = ref([
//    { title: "ID", value: "id", sortable: "true" },
    { title: "Nombre", value: "nombre", sortable: "true" },
    { title: "Rol", value: "rol", sortable: "true" },
    { title: "Acciones", value: "actions", align: "center"},
]);

// Configuración de botones CRUD
const usersButtons = ref([
    {
        text: "Agregar",
        icon: "mdi-plus",
        mode: "add",

    },
]);

// Manejo de actualizaciones desde el hijo
function handleUpdate({ mode, item }) {

    if (mode === 'add') {
        usersData.value.push({ id: Date.now(), ...item });
    } else if (mode === 'edit') {
        const index = usersData.value.findIndex((data) => data.id === item.id);
        if (index !== -1) {
            // Crear un nuevo arreglo con el elemento actualizado
            usersData.value = usersData.value.map((data, i) =>
                i === index ? { ...item } : data
            );
        }
    } else if (mode === "delete") {
        usersData.value = usersData.value.filter((data) => data.id !== item.id);
    }
}

</script>