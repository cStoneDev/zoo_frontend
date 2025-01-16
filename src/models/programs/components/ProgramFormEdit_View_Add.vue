<template>
  <v-form>
    
    <v-text-field v-if="mode==='view'"
      v-model="item.animalName" 
      label="Nombre del Animal" 
      required 
      :readonly="mode === 'view'" />

    <v-text-field v-if="mode==='view'"
      v-model="item.date" 
      label="Fecha" 
      required 
      :readonly="mode === 'view'" />
    
    <v-text-field v-if="mode==='view'"
      v-model="item.time" 
      label="Hora" 
      type="time" 
      required 
      :readonly="mode === 'view'" />

    <v-autocomplete v-if="mode!=='view'"
      v-model="item.activityId" 
      :items="getFormattedItems(activityData)"
      item-title="label" 
      item-value="value"
      label="Actividad" 
      required 
      :readonly="mode === 'view'" 
      no-data-text="No hay más datos disponibles" />

    <v-autocomplete v-if="mode!=='view'"
      v-model="item.animalId" 
      :items="getFormattedItems2(animalData)"
      item-title="label" 
      item-value="value" 
      label="Animal" 
      required
      :readonly="mode === 'view'" 
      no-data-text="No hay más datos disponibles" />




  </v-form>
</template>

<script setup>
import { ref, computed, defineProps, onMounted } from 'vue';

import activityService from "../../activities/activityService";
import animalService from "../..//animals/animalService";

let props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  mode: {
    type: String,
    required: true,
  },
});

const activityData = ref([]);
const animalData = ref([]);

let numberRules = [
  value => {
    if (value <= 0 || value === 0) {
      return 'Debe ser el número mayor que 0.';
    }
    return true;
  }
];

let textRules = [
  value => {
    if (value?.length >= 10) {
      return true;
    }
    return 'Deben ser más de 10 caracteres';
  }
];

// Método para formatear 1 los items
const getFormattedItems = (items) => {
  return items.map(item => ({
    value: item.id,
    label: item.description
  }));
};

const getFormattedItems2 = (items) => {
  return items.map(item => ({
    value: item.id,
    label: item.name
  }));
};

const getActivitiesFromService = async () => {
  try {
    let allActivities = []; // Array para acumular todas las razas
    let currentPage = 0; // Comenzamos con la página 0 (o 1, según el backend)
    let totalPages = 1; // Inicializamos totalPages a 1 (para la primera llamada)

    do { // Usamos un bucle do-while para al menos obtener la primera página
        const { activities, pagination } = await activityService.getActivities(currentPage);
        
        if(activities){
          allActivities.push(...activities); // Agregamos las razas de la página actual a la lista
        }

        totalPages = pagination.totalPages; // Actualizamos el número total de páginas
        currentPage++; // Incrementamos para obtener la siguiente página
    } while (currentPage < totalPages); // Continuamos hasta procesar todas las páginas

    activityData.value = allActivities; // Actualizamos breedData con todas las razas
    console.log(activityData.value);

        // Establece el valor predeterminado si estamos en modo 'add'
        if (props.mode === 'add' && activityData.value.length > 0) {
      props.item.activityId = activityData.value[0].id; // Selecciona el primer elemento
    }

  } catch (error) {
    console.error('Error al cargar las razas:', error);
  }
};


const getAnimalsFromService = async () => {
  try {
    let allAnimals = []; // Array para acumular todas las razas
    let currentPage = 0; // Comenzamos con la página 0 (o 1, según el backend)
    let totalPages = 1; // Inicializamos totalPages a 1 (para la primera llamada)

    do { // Usamos un bucle do-while para al menos obtener la primera página
        const { animals, pagination } = await animalService.getAnimals(currentPage);
        
        if(animals){
          allAnimals.push(...animals); // Agregamos las razas de la página actual a la lista
        }

        totalPages = pagination.totalPages; // Actualizamos el número total de páginas
        currentPage++; // Incrementamos para obtener la siguiente página
    } while (currentPage < totalPages); // Continuamos hasta procesar todas las páginas

    animalData.value = allAnimals; // Actualizamos breedData con todas las razas
    console.log(animalData.value);

        // Establece el valor predeterminado si estamos en modo 'add'
        if (props.mode === 'add' && animalData.value.length > 0) {
      props.item.animalId = animalData.value[0].id; // Selecciona el primer elemento
    }

  } catch (error) {
    console.error('Error al cargar las razas:', error);
  }
};

onMounted(() => {
  getActivitiesFromService();
  getAnimalsFromService();
});

</script>