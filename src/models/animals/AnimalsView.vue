<template>
  <DataTable 
    title="Lista de Animales" 
    :headers="animalHeaders" 
    :items="animalData" 
    :itemsLength="currentPageData"
    :animal-default="animalDefault" 
    :filters="animalFilters"
    @update="getAnimalsFromService"
> 
    <template #dialog-content="{ item, mode }">
      <AnimalFormEdit_View_Add :item="item" :mode="mode" v-if="mode == 'edit' || mode == 'view' || mode == 'add'" />
      <AnimalFormDelete :item="item" :mode="mode" v-if="mode == 'delete'" />
    </template>
  </DataTable>
</template>


<script setup>
import DataTable from "../../components/table/Table.vue";
import AnimalFormEdit_View_Add from "./components/AnimalFormEdit_View_Add.vue";
import AnimalFormDelete from "./components/AnimalFormDelete.vue";
import { ref, reactive, onMounted } from "vue";
import animalService from "../animals/animalService"; // Asegúrate de importar el servicio correctamente

import { usePageStore } from '/src/stores/page.js'
// Datos de animales
const animalData = ref([]);

const currentPageData = ref(0);
const totalElementsData  = ref(0);
const totalPagesData  = ref(0);
const pageSizeData  = ref(0);

const itemsPerPage = ref(10);

const pageStore = usePageStore();


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

// Encabezados de la tabla
const animalHeaders = ref([
  { title: "Nombre", value: "name", sortable: "false" },
  { title: "Edad (años)", value: "age", sortable: "false" },
  { title: "Raza", value: "breedName", sortable: "false" },
  { title: "Especie", value: "specieName", sortable: "false" },
  { title: "Peso (kg)", value: "weight", sortable: "false" },
  { title: "Acciones", value: "actions", align: "center" },
]);


<<<<<<< HEAD
// Manejo de actualizaciones desde el hijo
function handleUpdate({ mode, item }) {
  if (mode === 'add') {
    animalData.value.push({ id: Date.now(), ...item });
  } else if (mode === 'edit') {
    const index = animalData.value.findIndex((data) => data.id === item.id);
    if (index !== -1) {
      animalData.value = animalData.value.map((data, i) =>
        i === index ? { ...item } : data
      );
    }
  } else if (mode === "delete") {
    confirmDeleteAnimal(item.id);
    //animalData.value = animalData.value.filter((data) => data.id !== item.id);
  }
}
=======
>>>>>>> cfe8884c24e8c5d618f843505ce1589fd4582a75

// DELETE ANIMAL
const confirmDeleteAnimal = async (id) => {
  try {
    await animalService.deleteAnimal(id); // Llama al servicio de eliminación
    animalData.value = animalData.value.filter((animal) => animal.id !== id);
    console.log(`Animal con ID ${id} eliminado exitosamente.`);
  } catch (error) {
    console.error(`Error al eliminar el animal con ID ${id}:`, error);
  }
};

//TIENES QUE TRABAJAR CON ESTE METODO PARA CREAR UN ANIMAL -> NO SE SI FUNCIONA

//PUT ANIMAL
async function handleCreateAnimal(newAnimal) {
  try {
    const createdAnimal = await createAnimal(newAnimal);
    animalData.value.push(createdAnimal); // Agrega el animal creado a la tabla localmente
    console.log('Animal agregado exitosamente:', createdAnimal);
  } catch (error) {
    console.error('Error al agregar el animal:', error);
  }
}

// GET ANIMALS
const getAnimalsFromService = async () => {
  try {
    const { animals, pagination } = await animalService.getAnimals(0, pageStore.itemsPerPage); // Ajusta los parámetros de la paginación si es necesario
    const { totalElements, totalPages, currentPage, pageSize } = pagination;
    
    console.log("yo pido " + pageStore.itemsPerPage)
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
</script>
