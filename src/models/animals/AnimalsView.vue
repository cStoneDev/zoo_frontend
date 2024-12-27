<template>
  <!-- Atributos del datatable -->
  <!-- update y crud son eventos que se transmiten de padre a hijo -->
  <!-- update es el unico que funciona, su objetivo es llamar a la funcion de actualizar(filtrar los datos) -->
  <!-- cada vez que en la tabla se haga algo de paginado o filtrado -->
  <DataTable 
    title="Lista de Animales"         
    :headers="animalHeaders" 
    :items="animalData" 
    :itemsLength="currentPageData"
    :animal-default="animalDefault" 
    :filters="animalFilters"
    @update="searchAnimalsFromService"
    @crud="handleUpdate"
> 
    <template #dialog-content="{ item, mode }">
      <AnimalFormEdit_View_Add 
        :item="item" 
        :mode="mode" 
        v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
      <AnimalFormDelete 
      :item="item" 
      :mode="mode" 
      v-if="mode == 'delete'" />
    </template>
  </DataTable>
</template>


<script setup>
import DataTable from "../../components/table/Table.vue";
import AnimalFormEdit_View_Add from "./components/AnimalFormEdit_View_Add.vue";
import AnimalFormDelete from "./components/AnimalFormDelete.vue";
import { ref, reactive, onMounted } from "vue";
import animalService from "../animals/animalService"; // Asegúrate de importar el servicio correctamente

import { useUtilDataStore } from '/src/stores/utilData.js' //store de pinia para datos de la tabla que cambian como el paginado (para que sean de acceso global)
const utilDataStore = useUtilDataStore();         //el store


const animalData = ref([]);        // los animales del backend

const currentPageData = ref(0);     //datos del paginado que se obtienen cuando pides los animales
const totalElementsData  = ref(0);  
const totalPagesData  = ref(0);     
const pageSizeData  = ref(0);       


/**
 * Filtros que tendrá la tabla, los que sean selectores se les agrega su lista
 * debe ser una llamada a los nomencladores supongo
 */

const animalFilters = reactive({
  breedId: {
    lista: [],
    label: "Raza"
  },
  speciesId: {
    lista: [],
    label: "Especie"
  },
  minAge: {

    label: "Edad Mínima"
  },
  maxAge: {

    label: "Edad Máxima"
  },
  minWeight: {

    label: "Peso Mínimo"
  },
  maxWeight: {
    label: "Peso Máximo"
  },
  minDaysInShelter: {
    label: "Días en refugio mínimo"
  },
  maxDaysInShelter: {
    label: "Días en refugio máximo"
  },
});


const animalDefault = ref({
    id: 0,
    name: "",
    age: 0,
    breedId: 0,
    breedName: "",
    entryDate:"",
    specieId:0,
    specieName:"",
    weight:0,
});



// Encabezados de la tabla (los sortable deben estar en true, hay q implementarlo para enviar eso en la peticion al backend)
const animalHeaders = ref([
  { title: "Nombre", value: "name", sortable: "false" },
  { title: "Edad (años)", value: "age", sortable: "false" },
  { title: "Especie", value: "specieName", sortable: "false" },
  { title: "Raza", value: "breedName", sortable: "false" },
  { title: "Peso (kg)", value: "weight", sortable: "false" },
  { title: "Día de entrada", value: "entryDate", sortable: "false" },
  { title: "Acciones", value: "actions", align: "center" },
]);

/**
 * Metodos del animal service que son las llamadas al backend
 * 
 */

// DELETE ANIMAL
const confirmDeleteAnimal = async (id) => {
  try {
    await animalService.deleteAnimal(id); // Llama al servicio de eliminación
    animalData.value = animalData.value.filter((animal) => animal.id !== id);
    console.log(`Animal con ID ${id} eliminado exitosamente.`);
    searchAnimalsFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error(`Error al eliminar el animal con ID ${id}:`, error);
  }
};



//PUT ANIMAL
async function handleCreateAnimal(newAnimal) {
  try {
    console.log(newAnimal)
    const createdAnimal = await animalService.createAnimal(newAnimal);
    //animalData.value.push(createdAnimal); // Agrega el animal creado a la tabla localmente
    console.log('Animal agregado exitosamente:', createdAnimal);
    searchAnimalsFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al agregar el animal:', error);
  }
}

//editar ANIMAL
async function handleUpdateAnimal(id ,newAnimal) {
  try {
    const updatedAnimal = await animalService.updateAnimal(id, newAnimal);
    //animalData.value.push(createdAnimal); // Agrega el animal creado a la tabla localmente
    console.log('Animal editado exitosamente:', updatedAnimal);
    searchAnimalsFromService(); //para actualizar los cambios en la tabla
  } catch (error) {
    console.error('Error al editar el animal:', error);
  }
}

// GET ANIMALS. Obtener los animales por primera vez
const getAnimalsFromService = async () => {
  try {
                                                                      //se le pasa la pagina - 1, y los items por paginas
    const { animals, pagination } = await animalService.getAnimals(utilDataStore.page - 1, utilDataStore.itemsPerPage); 
    
    const { totalElements, totalPages, currentPage, pageSize } = pagination; //para obtener los datos de la paginacion

    
    animalData.value = animals;           //aqui coges los datos que pediste

    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;      //y aqui  los datos del paginado
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;


  } catch (error) {
    console.error('Error al cargar los animales:', error);
  }
};

// Search ANIMALS
const searchAnimalsFromService = async () => {
  try {


    const { animals, pagination } = await animalService.searchAnimals(utilDataStore.searchCriteria); // Ajusta los parámetros de la paginación si es necesario
    const { totalElements, totalPages, currentPage, pageSize, sort, first, last, numberOfElements, pageable, empty, } = pagination;
    
    animalData.value = animals;


    currentPageData.value = totalElements;
    totalElementsData.value  = totalPages;
    totalPagesData.value  = currentPage;
    pageSizeData.value  = pageSize;
    // Actualizar filtros basados en los datos obtenidos

  } catch (error) {
    console.error('Error al cargar los animales:', error);
  }
};

//Llamar a la función al montar el componente
//Este metodo nada más que se monta la página se ejecuta
onMounted(() => {
  getAnimalsFromService();
});



/**
 * 
 * Funcion que llama a las funciones del crud
 */

function handleUpdate({ mode, item }) {
  
  if (mode === 'add') {
    handleCreateAnimal(item);
  } 
  
  else if (mode === 'edit') {
    handleUpdateAnimal(item.id , item)
  } 
  
  else if (mode === "delete") {
    confirmDeleteAnimal(item.id);
  }

  
}


</script>
