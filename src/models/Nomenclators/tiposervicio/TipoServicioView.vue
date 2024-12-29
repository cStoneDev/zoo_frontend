<template>
    <DataTable title="Lista de tipo de servicios" 
        :headers="tiposervicioHeaders"
        :items="tiposervicioData" 
        :items-length="currentPageData"
        :tiposervicio-default="tiposervicioDefault" 
        @update="searchServicetypesFromService"
        @crud="handleUpdate"
        >
        <template #dialog-content="{ item, mode }">
            <TipoServicioFormEdit_View_Add 
                :item="item" 
                :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <TipoServicioFormDelete 
                :item="item" 
                :mode="mode" 
                v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import DataTable from "../../../components/table/Table.vue";
import TipoServicioFormEdit_View_Add from "./components/TipoServicioFormEdit_View_Add.vue";
import TipoServicioFormDelete from "./components/TipoServicioFormDelete.vue";
import {ref, reactive, onMounted } from 'vue';
import tiposervicioService from "../tiposervicio/tiposervicioService"; // Asegúrate de importar el servicio correctamente

import { useUtilDataStore } from '/src/stores/utilData.js' //store de pinia para datos de la tabla que cambian como el paginado (para que sean de acceso global)
const utilDataStore = useUtilDataStore();         //el store

const tiposervicioData = ref([]);        // los tipo de servicios del backend

const currentPageData = ref(0);     //datos del paginado que se obtienen cuando pides las clnicas
const totalElementsData  = ref(0);  
const totalPagesData  = ref(0);     
const pageSizeData  = ref(0); 


const tiposervicioDefault = ref({
    id: 0,
    name: ""
})


// Encabezados de la tabla
const tiposervicioHeaders = ref([

    { title: "Nombre", value: "name", sortable: "false" },
    { title: "Acciones", value: "actions", align: "center"},
]);



/**
 * 
 * Funcion que llama al crud 
 */
 function handleUpdate({ mode, item }) {
  
  if (mode === 'add') {
    handleCreateServicetype(item);
  } 
  
  else if (mode === 'edit') {
    handleUpdateServicetype(item.id , item)
  } 
  
  else if (mode === "delete") {
    confirmDeleteServicetype(item.id);
  }

}


/**
 * Metodos del Servicetype service que son las llamadas al backend
 * 
 */

// GET Servicetype. Obtener los tipos de servicios por primera vez
const getServicetypeFromService = async () => {
  try {
                                                                      //se le pasa la pagina - 1, y los items por paginas
    const { servicetype, pagination } = await tiposervicioService.getServicetype(utilDataStore.page - 1, utilDataStore.itemsPerPage); 
    
    const { totalElements, totalPages, currentPage, pageSize } = pagination; //para obtener los datos de la paginacion

    
    tiposervicioData.value = servicetype;           //aqui coges los datos que pediste

    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;      //y aqui  los datos del paginado
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;


  } catch (error) {
    console.error('Error al cargar las Tipos de servicios:', error);
  }
};

// Search Servicetype
const searchServicetypesFromService = async () => {
  try {


    const { servicetype, pagination } = await tiposervicioService.searchServicetype(utilDataStore.searchCriteria); // Ajusta los parámetros de la paginación si es necesario
    const { totalElements, totalPages, currentPage, pageSize, sort, first, last, numberOfElements, pageable, empty, } = pagination;
    
    tiposervicioData.value = servicetype;


    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;
    // Actualizar filtros basados en los datos obtenidos

  } catch (error) {
    console.error('Error al cargar las tipos de servicios:', error);
  }
};

// DELETE Servicetype
const confirmDeleteServicetype = async (id) => {
  try {
    await tiposervicioService.deleteServicetype(id); // Llama al servicio de eliminación
    tiposervicioData.value = tiposervicioData.value.filter((servicetype) => servicetype.id !== id);
    console.log(`Tipo de serviciod con ID ${id} eliminado exitosamente.`);
    searchServicetypesFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error(`Error al eliminar la Tipos de servicios con ID ${id}:`, error);
  }
};

//PUT Servicetype
async function handleCreateServicetype(newServicetype) {
  try {
    console.log(newServicetype)
    const createdServicetype = await tiposervicioService.createServicetype(newServicetype);

    console.log('Tipo servicio agregado exitosamente:', createdServicetype);
    searchServicetypesFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al agregar el tipo de servicios:', error);
  }
}

//editar Servicetype
async function handleUpdateServicetype(id ,newServicetype) {
  try {
    const updatedServicetype = await tiposervicioService.updateServicetype(id, newServicetype);

    console.log('Tipo de servicios editado exitosamente:', updatedServicetype);
    searchServicetypesFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al editar la Tipo de servicios:', error);
  }
}

//Llamar a la función al montar el componente
//Este metodo nada más que se monta la página se ejecuta
onMounted(() => {
  getServicetypeFromService();
  utilDataStore.resetData();
});


</script>

<style></style>