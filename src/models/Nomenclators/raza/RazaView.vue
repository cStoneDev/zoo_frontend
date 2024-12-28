<template>
    <DataTable title="Lista de Razas" 
        :headers="razaHeaders"
        :items="razaData"  
        :items-length="currentPageData"
        :raza-default="razaDefault" 
        @update="searchBreedsFromService"
        @crud="handleUpdate"
        >
        <template #dialog-content="{ item, mode }">
            <RazaFormEdit_View_Add 
                :item="item" 
                :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <RazaFormDelete 
                :item="item" 
                :mode="mode" 
                v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import DataTable from "../../../components/table/Table.vue";
import RazaFormEdit_View_Add from "./components/RazaFormEdit_View_Add.vue";
import RazaFormDelete from "./components/RazaFormDelete.vue";
import {ref, reactive, onMounted } from 'vue';
import razaService from "../raza/razaService"; // Asegúrate de importar el servicio correctamente

import { useUtilDataStore } from '/src/stores/utilData.js' //store de pinia para datos de la tabla que cambian como el paginado (para que sean de acceso global)
const utilDataStore = useUtilDataStore();         //el store


const razaData = ref([]);        // las raza del backend

const currentPageData = ref(0);     //datos del paginado que se obtienen cuando pides los razas
const totalElementsData  = ref(0);  
const totalPagesData  = ref(0);     
const pageSizeData  = ref(0); 


const razaDefault = ref({
    id: 0,
    name: "",
    speciesId: 0,
    speciesName: ""
})


// Encabezados de la tabla
const razaHeaders = ref([

    { title: "Nombre", value: "name", sortable: "false" },
    { title: "Nombre de la especie", value: "speciesName", sortable: "false" },
    { title: "Acciones", value: "actions", align: "center"},
]);

/**
 * 
 * Funcion que llama al crud 
 */
 function handleUpdate({ mode, item }) {
  
  if (mode === 'add') {
    handleCreateBreed(item);
  } 
  
  else if (mode === 'edit') {
    handleUpdateBreed(item.id , item)
  } 
  
  else if (mode === "delete") {
    confirmDeleteBreed(item.id);
  }

}


/**
 * Metodos del razas service que son las llamadas al backend
 * 
 */

// GET Breeds. Obtener los razas por primera vez
const getBreedsFromService = async () => {
  try {
                                                                      //se le pasa la pagina - 1, y los items por paginas
    const { breeds, pagination } = await razaService.getBreeds(utilDataStore.page - 1, utilDataStore.itemsPerPage); 
    
    const { totalElements, totalPages, currentPage, pageSize } = pagination; //para obtener los datos de la paginacion

    
    razaData.value = breeds;           //aqui coges los datos que pediste

    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;      //y aqui  los datos del paginado
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;


  } catch (error) {
    console.error('Error al cargar las razas:', error);
  }
};

// Search Breeds
const searchBreedsFromService = async () => {
  try {


    const { breeds, pagination } = await razaService.searchBreeds(utilDataStore.searchCriteria); // Ajusta los parámetros de la paginación si es necesario
    const { totalElements, totalPages, currentPage, pageSize, sort, first, last, numberOfElements, pageable, empty, } = pagination;
    
    razaData.value = breeds;


    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;
    // Actualizar filtros basados en los datos obtenidos

  } catch (error) {
    console.error('Error al cargar las razas:', error);
  }
};

// DELETE BREEDS
const confirmDeleteBreed = async (id) => {
  try {
    await razaService.deleteBreed(id); // Llama al servicio de eliminación
    razaData.value = razaData.value.filter((breed) => breed.id !== id);
    console.log(`Raza con ID ${id} eliminado exitosamente.`);
    searchBreedsFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error(`Error al eliminar la Raza con ID ${id}:`, error);
  }
};

//PUT BREED
async function handleCreateBreed(newBreed) {
  try {
    console.log(newBreed)
    const createdBreed = await razaService.createBreed(newBreed);
    //breedData.value.push(createdBreed); // no descomentar ,esto no se usa
    console.log('Raza agregada exitosamente:', createdBreed);
    searchBreedsFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al agregar la raza:', error);
  }
}

//editar BREED
async function handleUpdateBreed(id ,newBreed) {
  try {
    const updatedBreed = await razaService.updateBreed(id, newBreed);
    //breedlData.value.push(createdBreed); // Agrega el raza creado a la tabla localmente
    console.log('Raza editado exitosamente:', updatedBreed);
    searchBreedsFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al editar la Raza:', error);
  }
}

//Llamar a la función al montar el componente
//Este metodo nada más que se monta la página se ejecuta
onMounted(() => {
  getBreedsFromService();
});

</script>

<style></style>