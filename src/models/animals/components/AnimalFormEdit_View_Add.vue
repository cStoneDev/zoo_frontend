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
      v-model="item.specieName" 
      :items="[101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111]"
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

    <v-text-field v-if="mode === 'add' || mode === 'edit' "
      v-model="item.breedId" 
      label="id de raza pa testear add " 
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
      type="text" 
      format
      required
      :readonly="mode === 'view'" 
      :rules="numberRules" />



  </v-form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { defineProps} from "vue";
import animalService from "../animalService";

defineProps({
    item: {
      type: Object,
      default: () => ({}),
    },
    mode: {
      type: String,
      required: true,
    },
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
