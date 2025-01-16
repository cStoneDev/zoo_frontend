<template>
  <v-form>
    <!-- <v-text-field v-model="item.id" label="ID" type="number" required :readonly="mode === 'view'"
      :rules="numberRules" /> -->


    <v-autocomplete
      v-model="item.providerId" 
      :items="getFormattedItems(providerData)"
      item-title="label" 
      item-value="value"
      label="Proveedor" 
      type="text"
      required
      :readonly="mode === 'view'"
      no-data-text="No hay más datos disponibles" />

    <v-text-field 
      v-model="item.basePrice" 
      label="Precio base" 
      type="number" 
      required 
      :readonly="mode === 'view'"
      :rules="numberRules" />

    <v-text-field 
      v-model="item.conciliationDate" 
      label="Fecha de conciliación" 
      type="date" 
      required
      :readonly="mode === 'view'" />

    <v-text-field 
      v-model="item.startingDate" 
      label="Fecha de inicio" 
      type="date" 
      required
      :readonly="mode === 'view'" />

    <v-text-field 
      v-model="item.endingDate" 
      label="Fecha final" 
      type="date" 
      required
      :readonly="mode === 'view'" />

    <v-textarea 
      v-model="item.description" 
      label="Descripcion" 
      required 
      :readonly="mode === 'view'"
      :rules="textRules" />

  </v-form>
</template>

<script setup>
import { ref, computed, defineProps, onMounted } from 'vue';
import providerService from '../../providers/providerService';

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

const providerData = ref([]);

const getProviderService = async () => {
  try {
    let allProvider = []; // Array para acumular todas las razas
    let currentPage = 0; // Comenzamos con la página 0 (o 1, según el backend)
    let totalPages = 1; // Inicializamos totalPages a 1 (para la primera llamada)

    do { // Usamos un bucle do-while para al menos obtener la primera página
        const { providers, pagination } = await providerService.getProviders(currentPage);
        
        if(providers){
          allProvider.push(...providers); // Agregamos las razas de la página actual a la lista
        }

        totalPages = pagination.totalPages; // Actualizamos el número total de páginas
        currentPage++; // Incrementamos para obtener la siguiente página
    } while (currentPage < totalPages); // Continuamos hasta procesar todas las páginas

    providerData.value = allProvider; // Actualizamos providerData con todas las razas
    console.log(providerData.value);

        // Establece el valor predeterminado si estamos en modo 'add'
        if (props.mode === 'add' && providerData.value.length > 0) {
      props.item.providerId = providerData.value[0].id; // Selecciona el primer elemento
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

let numberRules = [
  value => {
    if (value <= 0 || value === 0) {
      return 'Debe ser el número mayor que 0.';
    }
    return true;
  }
];

onMounted(() => {
  getProviderService();
});


let textRules = [
  value => {
    if (value?.length >= 10) {
      return true;
    }
    return 'Deben ser más de 10 caracteres';
  }
];
</script>