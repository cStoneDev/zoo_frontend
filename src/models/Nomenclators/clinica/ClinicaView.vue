<template>
    <DataTable title="Lista de Clínicas" 
        :headers="clinicaHeaders"
        :items="clinicaData" 
        :items-length="currentPageData"
        :clinica-default="clinicaDefault" 
        @update="searchClinicsFromService"
        @crud="handleUpdate"
        >
        <template #dialog-content="{ item, mode }">
            <ClinicaFormEdit_View_Add 
                :item="item" 
                :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <ClinicaFormDelete 
                :item="item" 
                :mode="mode" 
                v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import DataTable from "../../../components/table/Table.vue";
import ClinicaFormEdit_View_Add from "./components/ClinicaFormEdit_View_Add.vue";
import ClinicaFormDelete from "./components/ClinicaFormDelete.vue";
import {ref, reactive, onMounted } from 'vue';
import clinicaService from "../clinica/clinicaService"; // Asegúrate de importar el servicio correctamente


import { useUtilDataStore } from '/src/stores/utilData.js' //store de pinia para datos de la tabla que cambian como el paginado (para que sean de acceso global)
const utilDataStore = useUtilDataStore();         //el store

const clinicaData = ref([]);        // las clincias del backend

const currentPageData = ref(0);     //datos del paginado que se obtienen cuando pides las clinicas
const totalElementsData  = ref(0);  
const totalPagesData  = ref(0);     
const pageSizeData  = ref(0); 


const clinicaDefault = ref({
    id: 0,
    name: ""
})

// Encabezados de la tabla
const clinicaHeaders = ref([

    { title: "Nombre", value: "name", sortable: "false" },
    { title: "Acciones", value: "actions", align: "center"},
]);



/**
 * 
 * Funcion que llama al crud 
 */
 function handleUpdate({ mode, item }) {
  
  if (mode === 'add') {
    handleCreateClinic(item);
  } 
  
  else if (mode === 'edit') {
    handleUpdateClinic(item.id , item)
  } 
  
  else if (mode === "delete") {
    confirmDeleteClinic(item.id);
  }

}


/**
 * Metodos del Clinica service que son las llamadas al backend
 * 
 */

// GET Clinic. Obtener los tipos de Clinicas por primera vez
const getClinicFromService = async () => {
  try {
                                                                      //se le pasa la pagina - 1, y los items por paginas
    const { clinic, pagination } = await clinicaService.getClinic(utilDataStore.page - 1, utilDataStore.itemsPerPage); 
    
    const { totalElements, totalPages, currentPage, pageSize } = pagination; //para obtener los datos de la paginacion

    
    clinicaData.value = clinic;           //aqui coges los datos que pediste

    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;      //y aqui  los datos del paginado
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;


  } catch (error) {
    console.error('Error al cargar las Tipos de clinica:', error);
  }
};

// Search Clinic
const searchClinicsFromService = async () => {
  try {


    const { clinic, pagination } = await clinicaService.searchClinic(utilDataStore.searchCriteria); // Ajusta los parámetros de la paginación si es necesario
    const { totalElements, totalPages, currentPage, pageSize, sort, first, last, numberOfElements, pageable, empty, } = pagination;
    
    clinicaData.value = clinic;


    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;
    // Actualizar filtros basados en los datos obtenidos

  } catch (error) {
    console.error('Error al cargar las tipos de clinicas:', error);
  }
};

// DELETE Clinic
const confirmDeleteClinic = async (id) => {
  try {
    await clinicaService.deleteClinic(id); // Llama al servicio de eliminación
    clinicaData.value = clinicaData.value.filter((clinic) => clinic.id !== id);
    console.log(`clinica con ID ${id} eliminado exitosamente.`);
    searchClinicsFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error(`Error al eliminar la clinicas con ID ${id}:`, error);
  }
};

//PUT Clinic
async function handleCreateClinic(newClinic) {
  try {
    console.log(newClinic)
    const createdClinic = await clinicaService.createClinic(newClinic);
    console.log('clinica agregado exitosamente:', createdClinic);
    searchClinicsFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al agregar el Clinica:', error);
  }
}

//editar Clinic
async function handleUpdateClinic(id ,newClinic) {
  try {
    const updatedClinic = await clinicaService.updateClinic(id, newClinic);
    console.log('clinica editado exitosamente:', updatedClinic);
    searchClinicsFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al editar la clinica:', error);
  }
}

//Llamar a la función al montar el componente
//Este metodo nada más que se monta la página se ejecuta
onMounted(() => {
  getClinicFromService();
});




</script>

<style></style>