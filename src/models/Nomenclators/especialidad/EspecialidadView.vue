<template>
    <DataTable title="Lista de Especialidades" 
        :headers="especialidadHeaders"
        :items="especialidadData" 
        :items-length="currentPageData"
        :especialidad-default="especialidadDefault" 
        @update="searchSpecialitysFromService"
        @crud="handleUpdate"
        >
        <template #dialog-content="{ item, mode }">
            <EspecialidadFormEdit_View_Add 
                :item="item" 
                :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <EspecialidadFormDelete 
                :item="item" 
                :mode="mode" 
                v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import DataTable from "../../../components/table/Table.vue";
import EspecialidadFormEdit_View_Add from "./components/EspecialidadFormEdit_View_Add.vue";
import EspecialidadFormDelete from "./components/EspecialidadFormDelete.vue";
import {ref, reactive, onMounted } from 'vue';
import especialidadService from "../especialidad/especialidadService"; // Asegúrate de importar el servicio correctamente


import { useUtilDataStore } from '/src/stores/utilData.js' //store de pinia para datos de la tabla que cambian como el paginado (para que sean de acceso global)
const utilDataStore = useUtilDataStore();         //el store

const especialidadData = ref([]);        // las clincias del backend

const currentPageData = ref(0);     //datos del paginado que se obtienen cuando pides las especialidades
const totalElementsData  = ref(0);  
const totalPagesData  = ref(0);     
const pageSizeData  = ref(0); 


const especialidadDefault = ref({
    id: 0,
    name: ""
})

// Encabezados de la tabla
const especialidadHeaders = ref([

    { title: "Nombre", value: "name", sortable: "false" },
    { title: "Acciones", value: "actions", align: "center"},
]);



/**
 * 
 * Funcion que llama al crud 
 */
 function handleUpdate({ mode, item }) {
  
  if (mode === 'add') {
    handleCreateSpeciality(item);
  } 
  
  else if (mode === 'edit') {
    handleUpdateSpeciality(item.id , item)
  } 
  
  else if (mode === "delete") {
    confirmDeleteSpeciality(item.id);
  }

}


/**
 * Metodos del especialidad service que son las llamadas al backend
 * 
 */

// GET Speciality. Obtener los especialidad por primera vez
const getSpecialityFromService = async () => {
  try {
                                                                      //se le pasa la pagina - 1, y los items por paginas
    const { speciality, pagination } = await especialidadService.getSpeciality(utilDataStore.page - 1, utilDataStore.itemsPerPage); 
    
    const { totalElements, totalPages, currentPage, pageSize } = pagination; //para obtener los datos de la paginacion

    
    especialidadData.value = speciality;           //aqui coges los datos que pediste

    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;      //y aqui  los datos del paginado
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;


  } catch (error) {
    console.error('Error al cargar las especialidad:', error);
  }
};

// Search Speciality
const searchSpecialitysFromService = async () => {
  try {


    const { speciality, pagination } = await especialidadService.searchSpeciality(utilDataStore.searchCriteria); // Ajusta los parámetros de la paginación si es necesario
    const { totalElements, totalPages, currentPage, pageSize, sort, first, last, numberOfElements, pageable, empty, } = pagination;
    
    especialidadData.value = speciality;


    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;
    // Actualizar filtros basados en los datos obtenidos

  } catch (error) {
    console.error('Error al cargar las especialidad:', error);
  }
};

// DELETE Speciality
const confirmDeleteSpeciality = async (id) => {
  try {
    await especialidadService.deleteSpeciality(id); // Llama al servicio de eliminación
    especialidadData.value = especialidadData.value.filter((speciality) => speciality.id !== id);
    console.log(`especialidad con ID ${id} eliminado exitosamente.`);
    searchSpecialitysFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error(`Error al eliminar la especialidad con ID ${id}:`, error);
  }
};

//PUT ClSpecialityinic
async function handleCreateSpeciality(newSpeciality) {
  try {
    console.log(newSpeciality)
    const createdSpeciality = await especialidadService.createSpeciality(newSpeciality);
    console.log('especialidad agregado exitosamente:', createdSpeciality);
    searchSpecialitysFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al agregar el especialidad:', error);
  }
}

//editar Speciality
async function handleUpdateSpeciality(id ,newSpeciality) {
  try {
    const updatedSpeciality = await especialidadService.updateSpeciality(id, newSpeciality);
    console.log('especialidad editado exitosamente:', updatedSpeciality);
    searchSpecialitysFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al editar la especialidad:', error);
  }
}

//Llamar a la función al montar el componente
//Este metodo nada más que se monta la página se ejecuta
onMounted(() => {
  getSpecialityFromService();
});





</script>

<style></style>