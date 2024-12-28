<template>
    <DataTable title="Lista de tipo de proveedores" 
        :headers="tipoproveedorHeaders"
        :items="tipoproveedorData" 
        :items-length="currentPageData"
        :tipoproveedor-default="tipoproveedorDefault" 
        @update="searchProvidertypesFromService"
        @crud="handleUpdate"
        >
        <template #dialog-content="{ item, mode }">
            <TipoProveedorFormEdit_View_Add 
                :item="item" 
                :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <TipoProveedorFormDelete 
                :item="item" 
                :mode="mode" 
                v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import DataTable from "../../../components/table/Table.vue";
import TipoProveedorFormEdit_View_Add from "./components/TipoProveedorFormEdit_View_Add.vue";
import TipoProveedorFormDelete from "./components/TipoProveedorFormDelete.vue";
import {ref, reactive, onMounted } from 'vue';
import tipoproveedorService from "../tipoproveedor/tipoproveedorService"; // Asegúrate de importar el servicio correctamente

import { useUtilDataStore } from '/src/stores/utilData.js' //store de pinia para datos de la tabla que cambian como el paginado (para que sean de acceso global)
const utilDataStore = useUtilDataStore();         //el store

const tipoproveedorData = ref([]);        // las clinicas del backend

const currentPageData = ref(0);     //datos del paginado que se obtienen cuando pides las clnicas
const totalElementsData  = ref(0);  
const totalPagesData  = ref(0);     
const pageSizeData  = ref(0); 


const tipoproveedorDefault = ref({
    id: 0,
    name: ""
})



// Encabezados de la tabla
const tipoproveedorHeaders = ref([

    { title: "Nombre", value: "name", sortable: "false" },
    { title: "Acciones", value: "actions", align: "center"},
]);


/**
 * 
 * Funcion que llama al crud 
 */
 function handleUpdate({ mode, item }) {
  
  if (mode === 'add') {
    handleCreateProvidertype(item);
  } 
  
  else if (mode === 'edit') {
    handleUpdateProvidertype(item.id , item)
  } 
  
  else if (mode === "delete") {
    confirmDeleteProvidertype(item.id);
  }

}


/**
 * Metodos del providertype service que son las llamadas al backend
 * 
 */

// GET providertype. Obtener los tipos de proveedores por primera vez
const getProvidertypeFromService = async () => {
  try {
                                                                      //se le pasa la pagina - 1, y los items por paginas
    const { providertype, pagination } = await tipoproveedorService.getProvidertype(utilDataStore.page - 1, utilDataStore.itemsPerPage); 
    
    const { totalElements, totalPages, currentPage, pageSize } = pagination; //para obtener los datos de la paginacion

    
    tipoproveedorData.value = providertype;           //aqui coges los datos que pediste

    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;      //y aqui  los datos del paginado
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;


  } catch (error) {
    console.error('Error al cargar las Tipos de proveedor:', error);
  }
};

// Search providertype
const searchProvidertypesFromService = async () => {
  try {


    const { providertype, pagination } = await tipoproveedorService.searchProvidertype(utilDataStore.searchCriteria); // Ajusta los parámetros de la paginación si es necesario
    const { totalElements, totalPages, currentPage, pageSize, sort, first, last, numberOfElements, pageable, empty, } = pagination;
    
    tipoproveedorData.value = providertype;


    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;
    // Actualizar filtros basados en los datos obtenidos

  } catch (error) {
    console.error('Error al cargar las tipos de proveedores:', error);
  }
};

// DELETE providertype
const confirmDeleteProvidertype = async (id) => {
  try {
    await tipoproveedorService.deleteProvidertype(id); // Llama al servicio de eliminación
    tipoproveedorData.value = tipoproveedorData.value.filter((providertype) => providertype.id !== id);
    console.log(`Tipo de proveedor con ID ${id} eliminado exitosamente.`);
    searchProvidertypesFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error(`Error al eliminar la Tipos de proveedores con ID ${id}:`, error);
  }
};

//PUT providertype
async function handleCreateProvidertype(newProvidertype) {
  try {
    console.log(newProvidertype)
    const createdProvidertype = await tipoproveedorService.createProvidertype(newProvidertype);
    //providertypeData.value.push(createdProvidertype); // no descomentar ,esto no se usa
    console.log('Tipo proveedor agregado exitosamente:', createdProvidertype);
    searchProvidertypesFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al agregar el tipo de proveedor:', error);
  }
}

//editar providertype
async function handleUpdateProvidertype(id ,newProvidertype) {
  try {
    const updatedProvidertype = await tipoproveedorService.updateProvidertype(id, newProvidertype);
    //providertypeData.value.push(createdProvidertype); // Agrega el tipo de proveedor creado a la tabla localmente
    console.log('Tipo de proveedor editado exitosamente:', updatedProvidertype);
    searchProvidertypesFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al editar la Tipo de proveedor:', error);
  }
}

//Llamar a la función al montar el componente
//Este metodo nada más que se monta la página se ejecuta
onMounted(() => {
  getProvidertypeFromService();
  utilDataStore.resetData();
});




</script>

<style></style>