<template>
    <DataTable title="Lista de Especies" 
        :headers="especieHeaders"
        :items="especieData" 
        :items-length="currentPageData"
        :especie-default="especieDefault" 
        @update="searchSpeciesFromService"
        @crud="handleUpdate"
        >
        <template #dialog-content="{ item, mode }">
            <EspecieFormEdit_View_Add 
                :item="item" 
                :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <EspecieFormDelete 
                :item="item" 
                :mode="mode" 
                v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import DataTable from "../../../components/table/Table.vue";
import EspecieFormEdit_View_Add from "./components/EspecieFormEdit_View_Add.vue";
import EspecieFormDelete from "./components/EspecieFormDelete.vue";
import {ref, reactive, onMounted } from 'vue';
import speciesService from "../especie/speciesService"; // Asegúrate de importar el servicio correctamente

import { useUtilDataStore } from '/src/stores/utilData.js' //store de pinia para datos de la tabla que cambian como el paginado (para que sean de acceso global)
const utilDataStore = useUtilDataStore();         //el store

const especieData = ref([]);        // las clincias del backend

const currentPageData = ref(0);     //datos del paginado que se obtienen cuando pides las especies
const totalElementsData  = ref(0);  
const totalPagesData  = ref(0);     
const pageSizeData  = ref(0); 


const especieDefault = ref({
    id: 0,
    name: ""
})

// Encabezados de la tabla
const especieHeaders = ref([

    { title: "Nombre", value: "name", sortable: "false" },
    { title: "Acciones", value: "actions", align: "center"},
]);




/**
 * 
 * Funcion que llama al crud 
 */
 function handleUpdate({ mode, item }) {
  
  if (mode === 'add') {
    handleCreateSpecies(item);
  } 
  
  else if (mode === 'edit') {
    handleUpdateSpecies(item.id , item)
  } 
  
  else if (mode === "delete") {
    confirmDeleteSpecies(item.id);
  }

}


/**
 * Metodos del Species service que son las llamadas al backend
 * 
 */

// GET Species. Obtener las especies por primera vez
const getSpeciesFromService = async () => {
  try {
                                                                      //se le pasa la pagina - 1, y los items por paginas
    const { species, pagination } = await speciesService.getSpecies(utilDataStore.page - 1, utilDataStore.itemsPerPage); 
    
    const { totalElements, totalPages, currentPage, pageSize } = pagination; //para obtener los datos de la paginacion

    
    especieData.value = species;           //aqui coges los datos que pediste

    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;      //y aqui  los datos del paginado
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;


  } catch (error) {
    console.error('Error al cargar las especies:', error);
  }
};

// Search Species
const searchSpeciesFromService = async () => {
  try {


    const { species, pagination } = await speciesService.searchSpecies(utilDataStore.searchCriteria); // Ajusta los parámetros de la paginación si es necesario
    const { totalElements, totalPages, currentPage, pageSize, sort, first, last, numberOfElements, pageable, empty, } = pagination;
    
    especieData.value = species;


    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;
    // Actualizar filtros basados en los datos obtenidos

  } catch (error) {
    console.error('Error al cargar las tipos de especies:', error);
  }
};

// DELETE Species
const confirmDeleteSpecies = async (id) => {
  try {
    await especieService.deleteSpecies(id); // Llama al servicio de eliminación
    especieData.value = especieData.value.filter((species) => species.id !== id);
    console.log(`especie con ID ${id} eliminado exitosamente.`);
    searchSpeciesFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error(`Error al eliminar la especies con ID ${id}:`, error);
  }
};

//PUT Species
async function handleCreateSpecies(newSpecies) {
  try {
    console.log(newSpecies)
    const createdSpecies = await speciesService.createSpecies(newSpecies);
    console.log('especie agregada exitosamente:', createdSpecies);
    searchSpeciesFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al agregar el Especie:', error);
  }
}

//editar Species
async function handleUpdateSpecies(id ,newSpecies) {
  try {
    const updatedSpecies = await speciesService.updateSpecies(id, newSpecies);
    console.log('especie editado exitosamente:', updatedSpecies);
    searchSpeciesFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al editar la especies:', error);
  }
}

//Llamar a la función al montar el componente
//Este metodo nada más que se monta la página se ejecuta
onMounted(() => {
  getSpeciesFromService();
  utilDataStore.resetData();
});




</script>

<style></style>