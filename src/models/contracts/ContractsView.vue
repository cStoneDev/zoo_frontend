<template>
    <DataTable 
        title="Lista de Contratos" 
        :headers="contractHeaders" 
        :items="contractData" 
        :itemsLength="currentPageData"
        :contract-default="contractDefault" 
        :filters="contractFilters"
        @update="searchContractsFromService"
        @crud="handleUpdate"
        >

        <template #dialog-content="{ item, mode }">
            <ContractFormEdit_View_Add 
                :item="item" 
                :mode="mode"
                v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
            <ContractFormDelete 
                :item="item" 
                :mode="mode" 
                v-if="mode == 'delete'" />
        </template>
    </DataTable>
</template>

<script setup>
import DataTable from "../../components/table/Table.vue";
import ContractFormEdit_View_Add from "./components/ContractFormEdit_View_Add.vue";
import ContractFormDelete from "./components/ContractFormDelete.vue";
import {  ref, reactive, onMounted  } from "vue";

import contractService from "../contracts/contractService"; // Asegúrate de importar el servicio correctamente

import { useUtilDataStore } from '/src/stores/utilData.js' //store de pinia para datos de la tabla que cambian como el paginado (para que sean de acceso global)
const utilDataStore = useUtilDataStore();         //el store


const contractData = ref([]);        // los contratos del backend

const currentPageData = ref(0);     //datos del paginado que se obtienen cuando pides los contratos
const totalElementsData  = ref(0);  
const totalPagesData  = ref(0);     
const pageSizeData  = ref(0);       


/**
 * Filtros que tendrá la tabla, los que sean selectores se les agrega su lista
 * debe ser una llamada a los nomencladores supongo
 */
const contractFilters = reactive({
    providerTypeId: {
        lista: [1,2,3,4,5,6], 
        label: "Tipo de proveedor"
    },
    contractState: { 
        // 0 = no filtra, 1 = activo, 2 = no activo, 3 = futuro
        lista: [0, 1, 2, 3],
        label: "Estado de contrato"
    },
    minBasePrice: {
        label: "Precio base mínimo"
    },
    maxBasePrice: {  
        label: "Precio base máximo"
    },

});

const contractDefault = ref({
    id: 0,
    providerId: 0,
    startingDate: "",
    endingDate: "",
    conciliationDate: "",
    description: "",
    basePrice: 0,
})


// Encabezados de la tabla
const contractHeaders = ref([

    //proveedor falta aca
    { title: "Descripción", value: "description", sortable: "false" },
    { title: "Precio Base", value: "basePrice", sortable: "false" },
    { title: "Fecha de conciliación", value: "conciliationDate", sortable: "false" },
    { title: "Fecha de inicio", value: "startingDate", sortable: "false" },
    { title: "Fecha final", value: "endingDate", sortable: "false" },
    { title: "Acciones", value: "actions", align: "center"},
]);


/**
 * 
 * Funcion que llama a las funciones del crud
 */

 function handleUpdate({ mode, item }) {
  
  if (mode === 'add') {
    handleCreateContract(item);
  } 
  
  else if (mode === 'edit') {
    handleUpdateContract(item.id , item)
  } 
  
  else if (mode === "delete") {
    confirmDeleteContract(item.id);
  }

  
}


/**
 * Metodos del contratos service que son las llamadas al backend
 * 
 */

// DELETE Contract
const confirmDeleteContract = async (id) => {
  try {
    await contractService.deleteContract(id); // Llama al servicio de eliminación
    contractData.value = contractData.value.filter((contract) => contract.id !== id);
    console.log(`Contrato con ID ${id} eliminado exitosamente.`);
    searchContractsFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error(`Error al eliminar el contrato con ID ${id}:`, error);
  }
};



//PUT Contract
async function handleCreateContract(newContract) {
  try {
    console.log(newContract)
    const createdContract = await contractService.createContract(newContract);

    console.log('Contrato agregado exitosamente:', createdContract);
    searchContractsFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al agregar el Contrato:', error);
  }
}

//editar Contract
async function handleUpdateContract(id ,newContract) {
  try {
    const updatedContract = await contractService.updateContract(id, newContract);

    console.log('Contract editado exitosamente:', updatedContract);
    searchContractsFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al editar el Contract:', error);
  }
}

// GET Contract. Obtener los Contract por primera vez
const getContractsFromService = async () => {
  try {
                                                                      //se le pasa la pagina - 1, y los items por paginas
    const { contracts, pagination } = await contractService.getContracts(utilDataStore.page - 1, utilDataStore.itemsPerPage); 
    
    const { totalElements, totalPages, currentPage, pageSize } = pagination; //para obtener los datos de la paginacion

    
    contractData.value = contracts;           //aqui coges los datos que pediste

    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;      //y aqui  los datos del paginado
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;


  } catch (error) {
    console.error('Error al cargar los contratos:', error);
  }
};

// Search Contract
const searchContractsFromService = async () => {
  try {


    const { contracts, pagination } = await contractService.searchContracts(utilDataStore.searchCriteria); // Ajusta los parámetros de la paginación si es necesario
    const { totalElements, totalPages, currentPage, pageSize, sort, first, last, numberOfElements, pageable, empty, } = pagination;
    
    console.log("los valores")
    console.log(contracts)
    contractData.value = contracts;


    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;
    // Actualizar filtros basados en los datos obtenidos

    console.log("Busqué con estos valores:")
    console.log(utilDataStore.searchCriteria)
  } catch (error) {
    console.error('Error al cargar los contratos:', error);
  }
};

//Llamar a la función al montar el componente
//Este metodo nada más que se monta la página se ejecuta
onMounted(() => {
  getContractsFromService();
  utilDataStore.resetData();
});



</script>