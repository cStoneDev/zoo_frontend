<template>
    <DataTable 
        title="Lista de Proveedores" 
        :headers="providersHeaders"
        :items="providerData" 
        :itemsLength="currentPageData"
        :provider-default="providerDefault" 
        :filters="providerFilter"
        @update="searchProvidersFromService"
        @crud="handleUpdate"
        >

        <template #dialog-content="{ item, mode }">
            <ProviderFormEdit_View_Add 
                :item="item" 
                :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <ProviderFormDelete 
                :item="item" 
                :mode="mode" 
                v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import DataTable from "../../components/table/Table.vue";
import ProviderFormEdit_View_Add from './components/ProviderFormEdit_View_Add.vue';
import ProviderFormDelete from './components/ProviderFormDelete.vue';
import {  ref, reactive, onMounted  } from 'vue';

import providerService from "../providers/providerService"; // Asegúrate de importar el servicio correctamente

import { useUtilDataStore } from '/src/stores/utilData.js' //store de pinia para datos de la tabla que cambian como el paginado (para que sean de acceso global)
const utilDataStore = useUtilDataStore();         //el store


const providerData = ref([]);        // los proveedores del backend

const currentPageData = ref(0);     //datos del paginado que se obtienen cuando pides los proveedores
const totalElementsData  = ref(0);  
const totalPagesData  = ref(0);     
const pageSizeData  = ref(0);     


/**
 * Filtros que tendrá la tabla, los que sean selectores se les agrega su lista
 * debe ser una llamada a los nomencladores supongo
 */
const providerFilter = reactive({
    provinceId: {
        lista: [1,2,3,4,5,6], 
        label: "Provincia"
    },
    serviceTypeId: {
        lista: [1,2,3,4,5,6], 
        label: "Tipo de Servicio"
    },
    providerTypeId: {
        lista: [1,2,3,4,5,6], 
        label: "Tipo de proveedor"
    }
});

const providerDefault = ref({
  id: 0,
  name: "",
  provinceId: 0,
  serviceTypeId: 0,
  providerTypeId: 0,
  address: "",
  phone: "",
  email: "",
  responsibleName: "",
  provinceName: "",
  serviceTypeName: "",
  providerTypeName: "",
  fax: "",
  cityDistance: 0,
  clinicId: 0,
  specialityId: 0,
  clinicName: "",
  specialityName: "",
});

// Encabezados de la tabla
const providersHeaders = ref([

    { title: "Nombre", value: "name", sortable: "false" },
    { title: "Tipo", value: "providerTypeName", sortable: "false" },
    { title: "Tipo de servicio", value: "serviceTypeName", sortable: "false" },
    { title: "Provincia", value: "provinceName", sortable: "false" },
    { title: "Acciones", value: "actions", align: "center"},

]);


/**
 * 
 * Funcion que llama a las funciones del crud
 */

function handleUpdate({ mode, item }) {


  if (mode === 'add') {
    handleCreateProvider(item);
  } 
  
  else if (mode === 'edit') {
    handleUpdateProvider(item.id , item)
    console.log(item)
  } 
  
  else if (mode === "delete") {
    confirmDeleteProvider(item.id);
  }

  
}


/**
 * Metodos del Provedores service que son las llamadas al backend
 * 
 */

// DELETE Provedores
const confirmDeleteProvider = async (id) => {
  try {
    await providerService.deleteProvider(id); // Llama al servicio de eliminación
    providerData.value = providerData.value.filter((provider) => provider.id !== id);
    console.log(`Provedor con ID ${id} eliminado exitosamente.`);
    searchProvidersFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error(`Error al eliminar el Proveedor con ID ${id}:`, error);
  }
};



//PUT Provider
async function handleCreateProvider(newProvider) {
  try {
    console.log("este es el provider que voya crear")
    console.log(newProvider)
    const createdProvider = await providerService.createProvider(newProvider);

    console.log('Proveedor agregado exitosamente:', createdProvider);
    searchProvidersFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al agregar el Proveedor:', error);
  }
}

//editar Provider
async function handleUpdateProvider(id ,newProvider) {
  try {
    const updatedProvider = await providerService.updateProvider(id, newProvider);

    console.log('Provider editado exitosamente:', updatedProvider);
    searchProvidersFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al editar el Provider:', error);
  }
}

// GET Provider. Obtener los Provider por primera vez
const getProvidersFromService = async () => {
  try {
                                                                      //se le pasa la pagina - 1, y los items por paginas
    const { providers, pagination } = await providerService.getProviders(utilDataStore.page - 1, utilDataStore.itemsPerPage); 
    
    const { totalElements, totalPages, currentPage, pageSize } = pagination; //para obtener los datos de la paginacion

    
    providerData.value = providers;           //aqui coges los datos que pediste

    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;      //y aqui  los datos del paginado
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;


  } catch (error) {
    console.error('Error al cargar los Proveedores:', error);
  }
};

// Search Provider
const searchProvidersFromService = async () => {
  try {


    const { providers, pagination } = await providerService.searchProviders(utilDataStore.searchCriteria); // Ajusta los parámetros de la paginación si es necesario
    const { totalElements, totalPages, currentPage, pageSize, sort, first, last, numberOfElements, pageable, empty, } = pagination;
    
    console.log("los valores")
    console.log(providers)
    providerData.value = providers;


    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;
    // Actualizar filtros basados en los datos obtenidos

    console.log("Busqué con estos valores:")
    console.log(utilDataStore.searchCriteria)
  } catch (error) {
    console.error('Error al cargar los Proveedores:', error);
  }
};

//Llamar a la función al montar el componente
//Este metodo nada más que se monta la página se ejecuta
onMounted(() => {
  getProvidersFromService();
  utilDataStore.resetData();
});



</script>

<style></style>