<template>
  <v-form>
    <!-- <v-text-field v-model="item.id" label="ID" type="number" required :readonly="mode === 'view'"
      :rules="numberRules" /> -->

    <v-text-field 
      v-model="item.name" 
      label="Nombre" 
      required 
      :readonly="mode === 'view'" />

    <v-autocomplete v-if="mode === 'view'" 
      v-model="item.speciesId" 
      :items="getFormattedItems(speciesData)"
      item-title="label" 
      item-value="value"
      label="Especie" 
      required 
      :readonly="mode === 'view'" 
      no-data-text="No hay más datos disponibles" />

    <v-autocomplete v-if="mode=== 'view'"
      v-model="item.breedName" 
      :items="[101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111]"
      label="Raza" 
      required 
      :readonly="mode === 'view'" 
      no-data-text="No hay más datos disponibles" />

    <v-autocomplete v-if="mode === 'add' || mode === 'edit' "
      v-model="item.breedId"
      :items="getFormattedItems(breedData)" 
      item-title="label" 
      item-value="value"
      label="Raza " 
      required 
      :readonly="mode === 'view'" />
    
    <v-text-field 
      v-model="item.age" 
      label="Edad (años)" 
      type="number" 
      required 
      :readonly="mode === 'view'"
      :rules="numberRules" />

    <v-text-field 
      v-model="item.weight" 
      label="Peso (kg)" 
      type="number" 
      required 
      :readonly="mode === 'view'"
      :rules="numberRules" />

    <v-text-field 
      v-model="item.entryDate" 
      label="Día de entrada" 
      type="date" 
      format
      required
      :readonly="mode === 'view'" 
      :rules="numberRules" />

  </v-form>
</template>

<script setup>
import { ref, computed, defineProps, onMounted } from 'vue';
import animalService from "../animalService";
import speciesService from "../../Nomenclators/especie/speciesService";
import breedService from "../../Nomenclators/raza/razaService";

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

const speciesData = ref([]);

const breedData = ref([]);


const getSpeciesFromService = async () => {
  try {
    let allSpecies = []; // Array para acumular todas las razas
    let currentPage = 0; // Comenzamos con la página 0 (o 1, según el backend)
    let totalPages = 1; // Inicializamos totalPages a 1 (para la primera llamada)

    do { // Usamos un bucle do-while para al menos obtener la primera página
        const { species, pagination } = await speciesService.getSpecies(currentPage);
        
        if(species){
          allSpecies.push(...species); // Agregamos las razas de la página actual a la lista
        }

        totalPages = pagination.totalPages; // Actualizamos el número total de páginas
        currentPage++; // Incrementamos para obtener la siguiente página
    } while (currentPage < totalPages); // Continuamos hasta procesar todas las páginas

    speciesData.value = allSpecies; // Actualizamos breedData con todas las razas

  } catch (error) {
    console.error('Error al cargar las especies:', error);
  }
};

const getBreedsFromService = async () => {
  try {
    let allBreeds = []; // Array para acumular todas las razas
    let currentPage = 0; // Comenzamos con la página 0 (o 1, según el backend)
    let totalPages = 1; // Inicializamos totalPages a 1 (para la primera llamada)

    do { // Usamos un bucle do-while para al menos obtener la primera página
        const { breeds, pagination } = await breedService.getBreeds(currentPage);
        
        if(breeds){
          allBreeds.push(...breeds); // Agregamos las razas de la página actual a la lista
        }

        totalPages = pagination.totalPages; // Actualizamos el número total de páginas
        currentPage++; // Incrementamos para obtener la siguiente página
    } while (currentPage < totalPages); // Continuamos hasta procesar todas las páginas

    breedData.value = allBreeds; // Actualizamos breedData con todas las razas
    console.log(breedData.value);

        // Establece el valor predeterminado si estamos en modo 'add'
        if (props.mode === 'add' && breedData.value.length > 0) {
      props.item.breedId = breedData.value[0].id; // Selecciona el primer elemento
    }

  } catch (error) {
    console.error('Error al cargar las razas:', error);
  }
};

// Método para formatear los items
const getFormattedItems = (items) => {
  return items.map(item => ({
    value: item.id,
    label: item.name
  }));
};

onMounted(() => {
  getSpeciesFromService();
  getBreedsFromService();
});

let numberRules = [
  value => {
    if (value <= 0 || value === 0) {
      return 'Debe ser el número mayor que 0.';
    }
    return true;
  }
];

// Método para obtener datos desde el servicio
// const fetchAnimalData = async () => {
//   try {
//     const response = await animalService.getAnimals();
//     if (response.data && response.data.content && response.data.content.length > 0) {
//       const animal = response.data.content[0]; // Toma el primer animal de la lista (ajusta según tus necesidades)
//       item.value = {
//         id: animal.id,
//         id_raza: animal.breedId, // Ajusta según el atributo del backend
//         nombre: animal.name,
//         edad: animal.age,
//         peso: animal.weight,
//         dias_refugio: calculateDaysInShelter(animal.entryDate), // Calcula los días en el refugio
//       };
//       console.log("Datos del animal cargados:", item.value);
//     } else {
//       console.warn("No hay datos disponibles en la respuesta.");
//     }
//   } catch (error) {
//     console.error("Error al obtener datos del servicio:", error);
//   }
// };

// // Método para calcular los días en el refugio
// const calculateDaysInShelter = entryDate => {
//   const entry = new Date(entryDate);
//   const today = new Date();
//   return Math.floor((today - entry) / (1000 * 60 * 60 * 24)); // Diferencia en días
// };

// // Llamar al método al cargar la pantalla
// onMounted(() => {
//   console.log("pincha");
//   fetchAnimalData();
// });

</script>
