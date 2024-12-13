<template>
    <v-dialog v-model="isVisible" max-width="600px">
      <v-card>
        <v-card-title class="headline">Título del Modal</v-card-title>
        <v-card-text>
          Contenido del modal.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="close">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isVisible = ref(false);
  
  const close = () => {
    isVisible.value = false;
  };
  
  const open = () => {
    isVisible.value = true;
  };
  
  defineExpose({
    openModal: open,
  });
  </script>
  