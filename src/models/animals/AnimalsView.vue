<template>
  <DataTable title="Lista de Animales" :items="animalData" :headers="animalHeaders" :buttons="animalButtons"
    :animal-default="animalDefault" :filters="animalFilters" @update="handleUpdate">
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

// Datos de animales
const animalData = ref([]);

const animalFilters = reactive({
  breedId: {
    lista: [],
    label: "ID raza"
  },
  speciesId: {
    lista: [],
    label: "ID especie"
  },
  minAge: {
    lista: [],
    label: "Edad Mínima"
  },
  maxAge: {
    lista: [],
    label: "Edad Máxima"
  },
  minWeight: {
    lista: [],
    label: "Peso Mínimo"
  },
  maxWeight: {
    lista: [],
    label: "Peso Máximo"
  },
  minDaysInShelter: {
    lista: [],
    label: "Días en refugio mínimo"
  },
  maxDaysInShelter: {
    lista: [],
    label: "Días en refugio máximo"
  },
});

const animalDefault = ref({
  id: 0,
  nombre: "",
  id_raza: 0,
  id_especie: 0,
  edad: 0,
  peso: 0,
  dias_refugio: 0,
});

// Encabezados de la tabla
const animalHeaders = ref([
  { title: "Raza", value: "id_raza", sortable: "true" },
  { title: "Especie", value: "id_especie", sortable: "true" },
  { title: "Nombre", value: "nombre", sortable: "true" },
  { title: "Edad (años)", value: "edad", sortable: "true" },
  { title: "Peso (kg)", value: "peso", sortable: "true" },
  { title: "Días en Zoológico", value: "dias_refugio", sortable: "true" },
  { title: "Acciones", value: "actions", align: "center" },
]);

// Configuración de botones CRUD
const animalButtons = ref([
  { text: "Agregar", icon: "mdi-plus", mode: "add" },
]);

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
    animalData.value = animalData.value.filter((data) => data.id !== item.id);
  }
}

// Obtener animales desde el servicio
const getAnimalsFromService = async () => {
  try {
    const { animals } = await animalService.getAnimals(0, 20); // Ajustar los parámetros de la paginación si es necesario
    animalData.value = animals;

    console.log(animalData);

    // Actualizar filtros basados en los datos obtenidos
    animalFilters.breedId.lista = animals.map(item => item.id_raza).sort((a, b) => a - b);
    animalFilters.speciesId.lista = animals.map(item => item.id_especie).sort((a, b) => a - b);
    animalFilters.minAge.lista = animals.map(item => item.edad).sort((a, b) => a - b);
    animalFilters.maxAge.lista = animals.map(item => item.edad).sort((a, b) => a - b);
    animalFilters.minWeight.lista = animals.map(item => item.peso).sort((a, b) => a - b);
    animalFilters.maxWeight.lista = animals.map(item => item.peso).sort((a, b) => a - b);
    animalFilters.minDaysInShelter.lista = animals.map(item => item.dias_refugio).sort((a, b) => a - b);
    animalFilters.maxDaysInShelter.lista = animals.map(item => item.dias_refugio).sort((a, b) => a - b);
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
