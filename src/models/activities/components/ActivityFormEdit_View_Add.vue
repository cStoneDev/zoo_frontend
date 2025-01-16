<template>
  <v-form>

    <v-textarea 
      v-model="item.description" 
      label="Descripcion" 
      required 
      :readonly="mode === 'view'"
      :rules="textRules" />


    <v-autocomplete 
      v-model="item.contractId" 
      :items="getFormattedItems(contractData)"
      item-title="label" 
      item-value="value"
      label="Contrato" 
      required 
      :readonly="mode === 'view'" 
      no-data-text="No hay más datos disponibles" />

    <v-text-field 
      v-model="item.date" 
      label="Fecha" 
      type="text" 
      required
      :readonly="mode === 'view'" />

    <v-text-field 
      v-model="item.time" 
      label="Hora" 
      type="time" 
      required 
      :readonly="mode === 'view'" />



  </v-form>
</template>

<script setup>
import { ref, computed, defineProps, onMounted } from 'vue';

import contractService from "../../contracts/contractService";

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

const contractData = ref([]);

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

const getContractsFromService = async () => {
  try {
    let allContracts = []; // Array para acumular todas las razas
    let currentPage = 0; // Comenzamos con la página 0 (o 1, según el backend)
    let totalPages = 1; // Inicializamos totalPages a 1 (para la primera llamada)

    do { // Usamos un bucle do-while para al menos obtener la primera página
        const { contracts, pagination } = await contractService.getContracts(currentPage);
        
        if(contracts){
          allContracts.push(...contracts); // Agregamos las razas de la página actual a la lista
        }

        totalPages = pagination.totalPages; // Actualizamos el número total de páginas
        currentPage++; // Incrementamos para obtener la siguiente página
    } while (currentPage < totalPages); // Continuamos hasta procesar todas las páginas

    contractData.value = allContracts; // Actualizamos breedData con todas las razas
    console.log(contractData.value);

        // Establece el valor predeterminado si estamos en modo 'add'
        if (props.mode === 'add' && contractData.value.length > 0) {
      props.item.contractId = contractData.value[0].id; // Selecciona el primer elemento
    }

  } catch (error) {
    console.error('Error al cargar las razas:', error);
  }
};


// Método para formatear los items
const getFormattedItems = (items) => {
  return items.map(item => ({
    value: item.id,
    label: item.description
  }));
};

onMounted(() => {
  getContractsFromService();
});

</script>