<template>
    <DataTable 
        title="Lista de Usuarios" 
        :headers="usersHeaders" 
        :items="userData" 
        :itemsLength="currentPageData"
        :users-default="usersDefault" 
        :filters="usersFilters"
        @update="searchUsersFromService" 
        @crud="handleUpdate"
        >
        <template #dialog-content="{ item, mode }">
            <UsersFormEdit_View_Add 
                :item="item" 
                :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <UsersFormDelete 
                :item="item" 
                :mode="mode" 
                v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import DataTable from "../../components/table/Table.vue";
import UsersFormEdit_View_Add from "./components/UsersFormEdit_View_Add.vue";
import UsersFormDelete from "./components/UsersFormDelete.vue";
import {  ref, reactive, onMounted  } from "vue";

import userService from "../users/userService"; // Asegúrate de importar el servicio correctamente

import { useUtilDataStore } from '/src/stores/utilData.js' //store de pinia para datos de la tabla que cambian como el paginado (para que sean de acceso global)
const utilDataStore = useUtilDataStore();         //el store


const userData = ref([]);        // los usuarios del backend

const currentPageData = ref(0);     //datos del paginado que se obtienen cuando pides los usuarios
const totalElementsData  = ref(0);  
const totalPagesData  = ref(0);     
const pageSizeData  = ref(0);     




const usersFilters = reactive({
    roleId: {
      lista: [
          { label: 'Moderador', value: 1 },
          { label: 'Administrador', value: 2 },
        ], 
        label: "Rol"
    }
});

const usersDefault = reactive({
    id: 0,
    username: "",
    email: "",
    roleId: 0,
    roleName:"",
    password:"",


})
// Encabezados de la tabla
const usersHeaders = ref([
//    { title: "ID", value: "id", sortable: "true" },
    { title: "Nombre", value: "username", sortable: "false" },
    { title: "Rol", value: "roleName", sortable: "false" },
    { title: "Email", value: "email", sortable: "false" },
    { title: "Acciones", value: "actions", align: "center"},
]);




/**
 * 
 * Funcion que llama al crud 
 */
 function handleUpdate({ mode, item }) {
  
  if (mode === 'add') {
    handleCreateUsers(item);
  } 
  
  else if (mode === 'edit') {
    handleUpdateUsers(item.id , item)
  } 
  
  else if (mode === "delete") {
    confirmDeleteUsers(item.id);
  }

}


/**
 * Metodos del User service que son las llamadas al backend
 * 
 */

// GET User. Obtener las usuarios por primera vez
const getUsersFromService = async () => {
  try {
                                                                      //se le pasa la pagina - 1, y los items por paginas
    const { user, pagination } = await userService.getUser(utilDataStore.page - 1, utilDataStore.itemsPerPage); 
    
    const { totalElements, totalPages, currentPage, pageSize } = pagination; //para obtener los datos de la paginacion

    
    userData.value = user;           //aqui coges los datos que pediste

    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;      //y aqui  los datos del paginado
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;


  } catch (error) {
    console.error('Error al cargar las Usuarios:', error);
  }
};

// Search Usuarios
const searchUsersFromService = async () => {
  try {


    const { user, pagination } = await userService.searchUser(utilDataStore.searchCriteria); // Ajusta los parámetros de la paginación si es necesario
    const { totalElements, totalPages, currentPage, pageSize, sort, first, last, numberOfElements, pageable, empty, } = pagination;
    
    userData.value = user;
    console.log("debugeando como perra")
    console.log(user)

    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;
    // Actualizar filtros basados en los datos obtenidos

  } catch (error) {
    console.error('Error al cargar las tipos de usuarios:', error);
  }
};

// DELETE User
const confirmDeleteUsers = async (id) => {
  try {
    await userService.deleteUser(id); // Llama al servicio de eliminación
    userData.value = userData.value.filter((users) => users.id !== id);
    console.log(`Usuarios con ID ${id} eliminado exitosamente.`);
    searchUsersFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error(`Error al eliminar la Usuarios con ID ${id}:`, error);
  }
};

//PUT User
async function handleCreateUsers(newUsers) {
  try {
    console.log(newUsers)
    const createdUsers = await userService.createUser(newUsers);
    console.log('Usuarios agregada exitosamente:', createdUsers);
    searchUsersFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al agregar el Usuarios:', error);
  }
}

//editar User
async function handleUpdateUsers(id ,newUsers) {
  try {
    const updatedUsers = await userService.updateUser(id, newUsers);
    console.log('usuarios editado exitosamente:', updatedUsers);
    searchUsersFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al editar la usuarios:', error);
  }
}

//Llamar a la función al montar el componente
//Este metodo nada más que se monta la página se ejecuta
onMounted(() => {
  getUsersFromService();
  utilDataStore.resetData();
});




</script>