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


import provinciaService from "../Nomenclators/provincia/provinciaService";
const provinceData = ref([]);

import tiposervicioService from "../Nomenclators/tiposervicio/tiposervicioService";
const servicetypeData = ref([]);

import tipoproveedorService from "../Nomenclators/tipoproveedor/tipoproveedorService";
const providertypeData = ref([]);


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
        lista: [], 
        label: "Provincia"
    },
    serviceTypeId: {
        lista: [], 
        label: "Tipo de Servicio"
    },
    providerTypeId: {
        lista: [], 
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

const getProvincesFromService = async () => {
  try {
    let allProvinces = []; // Array para acumular todas las razas
    let currentPage = 0; // Comenzamos con la página 0 (o 1, según el backend)
    let totalPages = 1; // Inicializamos totalPages a 1 (para la primera llamada)

    do { // Usamos un bucle do-while para al menos obtener la primera página
        const { provinces, pagination } = await provinciaService.getProvinces(currentPage);
        
        if(provinces){
          allProvinces.push(...provinces); // Agregamos las razas de la página actual a la lista
        }

        totalPages = pagination.totalPages; // Actualizamos el número total de páginas
        currentPage++; // Incrementamos para obtener la siguiente página
    } while (currentPage < totalPages); // Continuamos hasta procesar todas las páginas

    provinceData.value = allProvinces; // Actualizamos provincesData con todas las razas
    console.log(provinceData.value);

    providerFilter.provinceId.lista = allProvinces.map(provinces => ({
        label: provinces.name,
        value: provinces.id
      }));
  } catch (error) {
    console.error('Error al cargar las razas:', error);
  }
};


const getProvidertypesFromService = async () => {
  try {
    let allProvidertypes = []; // Array para acumular todas las razas
    let currentPage = 0; // Comenzamos con la página 0 (o 1, según el backend)
    let totalPages = 1; // Inicializamos totalPages a 1 (para la primera llamada)

    do { // Usamos un bucle do-while para al menos obtener la primera página
        const { providertype, pagination } = await tipoproveedorService.getProvidertype(currentPage);
        
        if(providertype){
          allProvidertypes.push(...providertype); // Agregamos las razas de la página actual a la lista
        }

        totalPages = pagination.totalPages; // Actualizamos el número total de páginas
        currentPage++; // Incrementamos para obtener la siguiente página
    } while (currentPage < totalPages); // Continuamos hasta procesar todas las páginas

    providertypeData.value = allProvidertypes; // Actualizamos providertypeData con todas las razas
    console.log("holaholahola")
    console.log(providertypeData.value);

    providerFilter.providerTypeId.lista = allProvidertypes.map(providertype => ({
        label: providertype.name,
        value: providertype.id
      }));
  } catch (error) {
    console.error('Error al cargar las razas:', error);
  }
};


tiposervicioService
servicetypeData

const getServicetypesFromService = async () => {
  try {
    let allservicetypes = []; // Array para acumular todas las razas
    let currentPage = 0; // Comenzamos con la página 0 (o 1, según el backend)
    let totalPages = 1; // Inicializamos totalPages a 1 (para la primera llamada)

    do { // Usamos un bucle do-while para al menos obtener la primera página
        const { servicetype, pagination } = await tiposervicioService.getServicetype(currentPage);
        
        if(servicetype){
          allservicetypes.push(...servicetype); // Agregamos las razas de la página actual a la lista
        }

        totalPages = pagination.totalPages; // Actualizamos el número total de páginas
        currentPage++; // Incrementamos para obtener la siguiente página
    } while (currentPage < totalPages); // Continuamos hasta procesar todas las páginas

    servicetypeData.value = allservicetypes; // Actualizamos servicetypeData con todas las razas
    console.log(servicetypeData.value);

    providerFilter.serviceTypeId.lista = allservicetypes.map(servicetype => ({
        label: servicetype.name,
        value: servicetype.id
      }));
  } catch (error) {
    console.error('Error al cargar las razas:', error);
  }
};

//Llamar a la función al montar el componente
//Este metodo nada más que se monta la página se ejecuta
onMounted(() => {
  getProvidersFromService();
  getProvincesFromService();
  getProvidertypesFromService();
  getServicetypesFromService();
  utilDataStore.resetData();
});



</script>

<style></style>