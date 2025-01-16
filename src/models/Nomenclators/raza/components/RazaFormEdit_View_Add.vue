<template>
    <v-form>
      <v-text-field 
        v-model="item.name" 
        label="Nombre" 
        required 
        :readonly="mode === 'view'" 
      />
    </v-form>
    <v-autocomplete v-if="mode === 'add' || mode === 'edit' "
      v-model="item.speciesId" 
      :items="getFormattedItems(speciesData)"
      item-title="label" 
      item-value="value"
      label="Especie"
      required 
      :readonly="mode === 'view'" 
    />

    <v-autocomplete v-if="mode === 'view'" 
      v-model="item.speciesName" 
      :items="[101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111]"
      label="Especie" 
      required 
      :readonly="mode === 'view'" 
      no-data-text="No hay más datos disponibles" />
  </template>

  <script setup>
    import { ref, computed, defineProps, onMounted } from 'vue';

    import speciesService from "../../especie/speciesService";

    const speciesData = ref([]);

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

    speciesData.value = allSpecies; // Actualizamos speciesData con todas las razas

            // Establece el valor predeterminado si estamos en modo 'add'
    if (props.mode === 'add' && speciesData.value.length > 0) {
      props.item.speciesId = speciesData.value[0].id; // Selecciona el primer elemento
    }


  } catch (error) {
    console.error('Error al cargar las especies:', error);
  }
};
  
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

  onMounted(() => {
    getSpeciesFromService();
  });

  // Método para formatear los items
const getFormattedItems = (items) => {
  return items.map(item => ({
    value: item.id,
    label: item.name
  }));
};
  </script>
  