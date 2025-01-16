<template>
    <DataTable 
        title="Lista de Actividades" 
        :headers="activityHeaders"
        :items="activitiesData" 
        :itemsLength="currentPageData"
        :activity-default="activityDefault" 
        :filters="activityFilters"
        @update="searchActivitiesFromService"
        @crud="handleUpdate"
        >
        <template #dialog-content="{ item, mode }">
            <ActivityFormEdit_View_Add 
                :item="item" 
                :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <ActivityFormDelete 
                :item="item" 
                :mode="mode" 
                v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import DataTable from "../../components/table/Table.vue";
import ActivityFormEdit_View_Add from "./components/ActivityFormEdit_View_Add.vue";
import ActivityFormDelete from "./components/ActivityFormDelete.vue";
import {  ref, reactive, onMounted  } from 'vue';

import activityService from "../activities/activityService"; // Asegúrate de importar el servicio correctamente
import providerTypeService from "../Nomenclators/tipoproveedor/tipoproveedorService";


import { useUtilDataStore } from '/src/stores/utilData.js' //store de pinia para datos de la tabla que cambian como el paginado (para que sean de acceso global)
const utilDataStore = useUtilDataStore();         //el store


const activitiesData = ref([]);        // los actividades del backend
const providerTypeData = ref([]);

const currentPageData = ref(0);     //datos del paginado que se obtienen cuando pides los contratos
const totalElementsData  = ref(0);  
const totalPagesData  = ref(0);     
const pageSizeData  = ref(0);       



const activityFilters = reactive({
  providerTypeId: {
    lista: [],
    label: "Tipo de Proveedor"
  },

  activitiesState: {
    lista: [
      { label: 'Activo', value: 1 },
      { label: 'No activo', value: 2 },
    ], 
    label: "Estado"
  },

  // contractId: {
  //     lista: [1,2,3], 
  //     label: "Contrato"
  //   },
});


const activityDefault = ref({
    id: 0,
    contractId: 0,
    date: "",
    time: "",
    description: ""
})

// Encabezados de la tabla
const activityHeaders = ref([
//    { title: "ID", value: "id", sortable: "true" },
    { title: "Descripción", value: "description", sortable: "false" },
    { title: "Fecha", value: "date", sortable: "false" },
    { title: "Hora", value: "time", sortable: "false" },
    // { title: "Contrato", value: "contractId", sortable: "false" },
    { title: "Acciones", value: "actions", align: "center"},
]);



/**
 * 
 * Funcion que llama a las funciones del crud
 */

 function handleUpdate({ mode, item }) {
  
  if (mode === 'add') {
    handleCreateActivity(item);
  } 
  
  else if (mode === 'edit') {
    handleUpdateActivity(item.id , item)
  } 
  
  else if (mode === "delete") {
    confirmDeleteActivity(item.id);
  }

  
}


/**
 * Metodos del actividades service que son las llamadas al backend
 * 
 */

// DELETE Activity
const confirmDeleteActivity = async (id) => {
  try {
    await activityService.deleteActivity(id); // Llama al servicio de eliminación
    activitiesData.value = activitiesData.value.filter((activity) => activity.id !== id);
    console.log(`Actividades con ID ${id} eliminado exitosamente.`);
    searchActivitiesFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error(`Error al eliminar el actividades con ID ${id}:`, error);
  }
};



//PUT Activity
async function handleCreateActivity(newActivity) {
  try {
    console.log(newActivity)
    const createdActivity = await activityService.createActivity(newActivity);

    console.log('Actividad agregado exitosamente:', createdActivity);
    searchActivitiesFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al agregar el Actividades:', error);
  }
}

//editar Activity
async function handleUpdateActivity(id ,newActivity) {
  try {
    const updatedActivity = await activityService.updateActivity(id, newActivity);

    console.log('Activity editado exitosamente:', updatedActivity);
    searchActivitiesFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al editar el Activity:', error);
  }
}

// GET Activity. Obtener los Activity por primera vez
const getActivitiesFromService = async () => {
  try {
                                                                      //se le pasa la pagina - 1, y los items por paginas
    const { activities, pagination } = await activityService.getActivity(utilDataStore.page - 1, utilDataStore.itemsPerPage); 
    
    const { totalElements, totalPages, currentPage, pageSize } = pagination; //para obtener los datos de la paginacion

    
    activitiesData .value = activities;           //aqui coges los datos que pediste

    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;      //y aqui  los datos del paginado
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;


  } catch (error) {
    console.error('Error al cargar los actividades:', error);
  }
};

// Search Activity
const searchActivitiesFromService = async () => {
  try {


    const { activities, pagination } = await activityService.searchActivity(utilDataStore.searchCriteria); // Ajusta los parámetros de la paginación si es necesario
    const { totalElements, totalPages, currentPage, pageSize, sort, first, last, numberOfElements, pageable, empty, } = pagination;
    
    console.log("los valores")
    console.log(activities)
    activitiesData.value = activities;


    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;
    // Actualizar filtros basados en los datos obtenidos

    console.log("Busqué con estos valores:")
    console.log(utilDataStore.searchCriteria)
  } catch (error) {
    console.error('Error al cargar los actividades:', error);
  }
};


const getProviderTypeFromService = async () => {
  try {
    let allProviderType = []; // Array para acumular todas las razas
    let currentPage = 0; // Comenzamos con la página 0 (o 1, según el backend)
    let totalPages = 1; // Inicializamos totalPages a 1 (para la primera llamada)

    do { // Usamos un bucle do-while para al menos obtener la primera página
        const { providertype, pagination } = await providerTypeService.getProvidertype(currentPage);
        if(providertype){
          allProviderType.push(...providertype); // Agregamos las razas de la página actual a la lista
        }

        totalPages = pagination.totalPages; // Actualizamos el número total de páginas
        currentPage++; // Incrementamos para obtener la siguiente página
    } while (currentPage < totalPages); // Continuamos hasta procesar todas las páginas

    providerTypeData.value = allProviderType; // Actualizamos breedData con todas las razas
    console.log(providerTypeData.value);

    activityFilters.providerTypeId.lista = allProviderType.map(providerType => ({
        label: providerType.name,
        value: providerType.id
      }));
  } catch (error) {
    console.error('Error al cargar los tipos de proveedor:', error);
  }
};


//Llamar a la función al montar el componente
//Este metodo nada más que se monta la página se ejecuta
onMounted(() => {
  getActivitiesFromService();
  getProviderTypeFromService();
  utilDataStore.resetData();
});



</script>

<style></style>