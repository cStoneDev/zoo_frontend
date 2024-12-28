<template>
    <DataTable title="Lista de Provincias" 
        :headers="provinciaHeaders"
        :items="provinciaData" 
        :items-length="currentPageData"
        :provincia-default="provinciaDefault" 
        @update="searchProvincesFromService"
        @crud="handleUpdate"
        >
        <template #dialog-content="{ item, mode }">
            <ProvinciaFormEdit_View_Add 
                :item="item" 
                :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <ProvinciaFormDelete 
                :item="item" 
                :mode="mode" 
                v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import DataTable from "../../../components/table/Table.vue";
import ProvinciaFormEdit_View_Add from "./components/ProvinciaFormEdit_View_Add.vue";
import ProvinciaFormDelete from "./components/ProvinciaFormDelete.vue";
import {ref, reactive, onMounted } from 'vue';
import provinciaService from "../provincia/provinciaService"; // Asegúrate de importar el servicio correctamente

import { useUtilDataStore } from '/src/stores/utilData.js' //store de pinia para datos de la tabla que cambian como el paginado (para que sean de acceso global)
const utilDataStore = useUtilDataStore();         //el store


const provinciaData = ref([]);        // las provincias del backend

const currentPageData = ref(0);     //datos del paginado que se obtienen cuando pides las provincias
const totalElementsData  = ref(0);  
const totalPagesData  = ref(0);     
const pageSizeData  = ref(0); 


const provinciaDefault = ref({
    id: 0,
    name: ""
})



// Encabezados de la tabla
const provinciaHeaders = ref([

    { title: "Nombre", value: "name", sortable: "false" },
    { title: "Acciones", value: "actions", align: "center"},
]);

/**
 * 
 * Funcion que llama al crud 
 */
 function handleUpdate({ mode, item }) {
  
  if (mode === 'add') {
    handleCreateProvince(item);
  } 
  
  else if (mode === 'edit') {
    handleUpdateProvince(item.id , item)
  } 
  
  else if (mode === "delete") {
    confirmDeleteProvince(item.id);
  }

}


/**
 * Metodos del provincia service que son las llamadas al backend
 * 
 */

// GET Provinces. Obtener los Provincias por primera vez
const getProvincesFromService = async () => {
  try {
                                                                      //se le pasa la pagina - 1, y los items por paginas
    const { provinces, pagination } = await provinciaService.getProvinces(utilDataStore.page - 1, utilDataStore.itemsPerPage); 
    
    const { totalElements, totalPages, currentPage, pageSize } = pagination; //para obtener los datos de la paginacion

    
    provinciaData.value = provinces;           //aqui coges los datos que pediste

    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;      //y aqui  los datos del paginado
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;


  } catch (error) {
    console.error('Error al cargar las Provincias:', error);
  }
};

// Search Province
const searchProvincesFromService = async () => {
  try {


    const { provinces, pagination } = await provinciaService.searchProvinces(utilDataStore.searchCriteria); // Ajusta los parámetros de la paginación si es necesario
    const { totalElements, totalPages, currentPage, pageSize, sort, first, last, numberOfElements, pageable, empty, } = pagination;
    
    provinciaData.value = provinces;


    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;
    // Actualizar filtros basados en los datos obtenidos

  } catch (error) {
    console.error('Error al cargar las provincias:', error);
  }
};

// DELETE Province
const confirmDeleteProvince = async (id) => {
  try {
    await provinciaService.deleteProvince(id); // Llama al servicio de eliminación
    provinciaData.value = provinciaData.value.filter((province) => province.id !== id);
    console.log(`Provincia con ID ${id} eliminado exitosamente.`);
    searchProvincesFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error(`Error al eliminar la Provincia con ID ${id}:`, error);
  }
};

//PUT Province
async function handleCreateProvince(newProvince) {
  try {
    console.log(newProvince)
    const createdProvince = await provinciaService.createProvince(newProvince);
    //provinceData.value.push(createdProvince); // no descomentar ,esto no se usa
    console.log('Provincia agregada exitosamente:', createdProvince);
    searchProvincesFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al agregar la provincia:', error);
  }
}

//editar Province
async function handleUpdateProvince(id ,newProvince) {
  try {
    const updatedProvince = await provinciaService.updateProvince(id, newProvince);
    //provincelData.value.push(createdProvince); // Agrega el provincia creado a la tabla localmente
    console.log('Provincia editado exitosamente:', updatedProvince);
    searchProvincesFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al editar la Provincia:', error);
  }
}

//Llamar a la función al montar el componente
//Este metodo nada más que se monta la página se ejecuta
onMounted(() => {
  getProvincesFromService();
  utilDataStore.resetData();
});


</script>

<style></style>