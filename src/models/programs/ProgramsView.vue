<template>
    <DataTable  
        title="Programación" 
        :headers="programHeaders" 
        :items="programationData" 
        :itemsLength="currentPageData"
        :program-default="programDefault" 
        :filters="programationFilters"
        @update="searchProgramationFromService" 
        @crud="handleUpdate"
        >
        <template #dialog-content="{ item, mode }">
            <ProgramFormEdit_View_Add 
                :item="item" 
                :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <ProgramFormDelete 
                :item="item" 
                :mode="mode" 
                v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import DataTable from "../../components/table/Table.vue";
import ProgramFormEdit_View_Add from "./components/ProgramFormEdit_View_Add.vue";
import ProgramFormDelete from "./components/ProgramFormDelete.vue";
import {  ref, reactive, onMounted  } from "vue";


import programationService from "../programs/programationService"; // Asegúrate de importar el servicio correctamente

import { useUtilDataStore } from '/src/stores/utilData.js' //store de pinia para datos de la tabla que cambian como el paginado (para que sean de acceso global)
const utilDataStore = useUtilDataStore();         //el store


const programationData = ref([]);        // la programacion del backend

const currentPageData = ref(0);     //datos del paginado que se obtienen cuando pides los contratos
const totalElementsData  = ref(0);  
const totalPagesData  = ref(0);     
const pageSizeData  = ref(0);       




const programationFilters = reactive({
  speciesId: {
    lista: [1,2,3,4,5],
    label: "Especie"
  },
  minDate: {
     label: "Fecha Mínima"
  },
  maxDate: {
     label: "Fecha Máxima"
  },
  minTime: {
    label: "Hora Mínima"
  },
  maxTime: {
    label: "Hora Máxima"
  },
});

const programDefault = reactive({
    id: 0,
    animalName:"",
    date: "",
    time: "",
    activityId: 0,
    animalId:0,
})
// Encabezados de la tabla
const programHeaders = ref([
    { title: "Animal", value: "animalName", sortable: "false" },
    { title: "Fecha", value: "date", sortable: "false" },
    { title: "Hora", value: "time", sortable: "false" },
    { title: "Acciones", value: "actions", align: "center"},
]);



/**
 * 
 * Funcion que llama a las funciones del crud
 */

 function handleUpdate({ mode, item }) {
  
  if (mode === 'add') {
    handleCreateProgramation(item);
  } 
  
  else if (mode === 'edit') {
    handleUpdateProgramation(item.id , item)
  } 
  
  else if (mode === "delete") {
    confirmDeleteProgramation(item.id);
  }

  
}


/**
 * Metodos del Programacion service que son las llamadas al backend
 * 
 */

// DELETE Programation
const confirmDeleteProgramation = async (id) => {
  try {
    await programationService.deleteProgramation(id); // Llama al servicio de eliminación
    programationtData.value = programationData.value.filter((programation) => programation.id !== id);
    console.log(`Programacion con ID ${id} eliminado exitosamente.`);
    searchProgramationFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error(`Error al eliminar el Programacion con ID ${id}:`, error);
  }
};



//PUT Programation
async function handleCreateProgramation(newProgramation) {
  try {
    console.log(newProgramation)
    const createdProgramation = await programationService.createProgramation(newProgramation);

    console.log('Programacion agregado exitosamente:', createdProgramation);
    searchProgramationFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al agregar el Programacion:', error);
  }
}

//editar Programation
async function handleUpdateProgramation(id ,newProgramation) {
  try {
    const updatedProgramation = await programationService.updateProgramation(id, newProgramation);

    console.log('Programation editado exitosamente:', updatedProgramation);
    searchProgramationFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al editar el Programation:', error);
  }
}

// GET Programation. Obtener los Programation por primera vez
const getProgramationFromService = async () => {
  try {
                                                                      //se le pasa la pagina - 1, y los items por paginas
    const { programation, pagination } = await programationService.getProgramation(utilDataStore.page - 1, utilDataStore.itemsPerPage); 
    
    const { totalElements, totalPages, currentPage, pageSize } = pagination; //para obtener los datos de la paginacion

    
    programationData.value = programation;           //aqui coges los datos que pediste

    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;      //y aqui  los datos del paginado
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;


  } catch (error) {
    console.error('Error al cargar los Programation:', error);
  }
};

// Search Programation
const searchProgramationFromService = async () => {
  try {
    console.log("el search criteria:")
    console.log(utilDataStore.searchCriteria)

    const { programation, pagination } = await programationService.searchProgramation(utilDataStore.searchCriteria); // Ajusta los parámetros de la paginación si es necesario
    const { totalElements, totalPages, currentPage, pageSize, sort, first, last, numberOfElements, pageable, empty, } = pagination;
    
    console.log("los valores")
    console.log(programation)
    programationData.value = programation;


    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;
    // Actualizar filtros basados en los datos obtenidos

    console.log("Busqué con estos valores:")
    console.log(utilDataStore.searchCriteria)
  } catch (error) {
    console.error('Error al cargar los programation:', error);
  }
};

//Llamar a la función al montar el componente
//Este metodo nada más que se monta la página se ejecuta
onMounted(() => {
  getProgramationFromService();
  utilDataStore.resetData();
});




</script>