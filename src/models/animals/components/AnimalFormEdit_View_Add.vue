<template>
  <v-form>
    <v-text-field v-model="item.id" label="ID" type="number" required :readonly="mode === 'view'"
      :rules="numberRules" />

    <v-autocomplete v-model="item.id_raza" :items="[101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111]"
      label="Tipo de Raza" required :readonly="mode === 'view'" no-data-text="No hay más datos disponibles" />

    <v-text-field v-model="item.nombre" label="Nombre" required :readonly="mode === 'view'" />

    <v-text-field v-model="item.edad" label="Edad (años)" type="number" required :readonly="mode === 'view'"
      :rules="numberRules" />

    <v-text-field v-model="item.peso" label="Peso (kg)" type="number" required :readonly="mode === 'view'"
      :rules="numberRules" />

    <v-text-field v-model="item.dias_refugio" label="Días en Zoológico" type="number" required
      :readonly="mode === 'view'" :rules="numberRules" />

  </v-form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import animalService from "../animalService";

// defineProps({
//   item: {
//     type: Object,
//     default: () => ({}),
//   },
//   mode: {
//     type: String,
//     required: true,
//   },
// });

onMounted();

const item = ref({
  id: null,
  id_raza: null,
  nombre: "",
  edad: null,
  peso: null,
  dias_refugio: null,
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
const fetchAnimalData = async () => {
  try {
    const response = await animalService.getAnimals();
    if (response.data && response.data.content && response.data.content.length > 0) {
      const animal = response.data.content[0]; // Toma el primer animal de la lista (ajusta según tus necesidades)
      item.value = {
        id: animal.id,
        id_raza: animal.breedId, // Ajusta según el atributo del backend
        nombre: animal.name,
        edad: animal.age,
        peso: animal.weight,
        dias_refugio: calculateDaysInShelter(animal.entryDate), // Calcula los días en el refugio
      };
      console.log("Datos del animal cargados:", item.value);
    } else {
      console.warn("No hay datos disponibles en la respuesta.");
    }
  } catch (error) {
    console.error("Error al obtener datos del servicio:", error);
  }
};

// Método para calcular los días en el refugio
const calculateDaysInShelter = entryDate => {
  const entry = new Date(entryDate);
  const today = new Date();
  return Math.floor((today - entry) / (1000 * 60 * 60 * 24)); // Diferencia en días
};

// Llamar al método al cargar la pantalla
onMounted(() => {
  console.log("pincha");
  fetchAnimalData();
});

</script>
