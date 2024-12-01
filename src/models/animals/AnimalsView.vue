<template>
  <DataTable
    title="Lista de Animales"
    :items="animalData"
    :headers="animalHeaders"
    :buttons="animalButtons"
    :animal-default="animalDefault"
    @update="handleUpdate"
  >
    <template #dialog-content="{ item, mode }">
      <AnimalFormEdit_View_Add :item="item" :mode="mode" v-if="mode=='edit'||mode=='view' ||mode=='add'"/>
      <AnimalFormDelete :item="item" :mode="mode" v-if="mode=='delete'"/>
    </template>
  </DataTable>
</template>

<script setup>
  import DataTable from "../../components/table/Table.vue";
  import AnimalFormEdit_View_Add from "./components/AnimalFormEdit_View_Add.vue";
  import AnimalFormDelete from "./components/AnimalFormDelete.vue";
  import { ref } from "vue";

  // Datos de animales
  const animalData = ref([
    {
      id: 1,
      nombre: "León",
      id_raza: 101,
      edad: 5,
      peso: 190.5,
      dias_refugio: 30,
    },
    {
      id: 2,
      nombre: "Tigre",
      id_raza: 102,
      edad: 4,
      peso: 220.0,
      dias_refugio: 15,
    },
    {
      id: 3,
      nombre: "Elefante",
      id_raza: 103,
      edad: 10,
      peso: 600.0,
      dias_refugio: 45,
    },
    {
      id: 4,
      nombre: "Jirafa",
      id_raza: 104,
      edad: 7,
      peso: 800.0,
      dias_refugio: 20,
    },
    {
      id: 5,
      nombre: "Cebra",
      id_raza: 105,
      edad: 3,
      peso: 350.0,
      dias_refugio: 10,
    },
    {
      id: 6,
      nombre: "Hipopótamo",
      id_raza: 106,
      edad: 8,
      peso: 1500.0,
      dias_refugio: 60,
    },
    {
      id: 7,
      nombre: "Rinoceronte",
      id_raza: 107,
      edad: 6,
      peso: 2300.0,
      dias_refugio: 25,
    },
  ]);
  
  const animalDefault = ref({
      id: 0,
      nombre: "",
      id_raza: 0,
      edad: 0,
      peso: 0,
      dias_refugio: 0,
    })
  // Encabezados de la tabla
  const animalHeaders = ref([
    { title: "ID", value: "id", sortable: "true" },
    { title: "Tipo de Raza", value: "id_raza", sortable: "true" },
    { title: "Nombre", value: "nombre", sortable: "true" },
    { title: "Edad (años)", value: "edad", sortable: "true" },
    { title: "Peso (kg)", value: "peso", sortable: "true" },
    { title: "Días en Refugio", value: "dias_refugio", sortable: "true" },
  ]);

  // Configuración de botones CRUD
  const animalButtons = ref([
    {
      text: "Ver",
      icon: "mdi-eye",
      mode: "view",
      
    },
    {
      text: "Editar",
      icon: "mdi-pencil",
      mode: "edit",
      
    },
    {
      text: "Agregar",
      icon: "mdi-plus",
      mode: "add",
      
    },
    {
      text: "Eliminar",
      icon: "mdi-delete",
      mode: "delete",
    },
  ]);

// Manejo de actualizaciones desde el hijo
function handleUpdate({ mode, item }) {
  
  if (mode === 'add') {
    animalData.value.push({ id: Date.now(), ...item });
  } else if (mode === 'edit') {
    const index = animalData.value.findIndex((data) => data.id === item.id);
    if (index !== -1) {
      // Crear un nuevo arreglo con el elemento actualizado
      animalData.value = animalData.value.map((data, i) =>
        i === index ? { ...item } : data
      );
    }
  } else if (mode === "delete") {
      animalData.value = animalData.value.filter((data) => data.id !== item.id);
    }
}



</script>
