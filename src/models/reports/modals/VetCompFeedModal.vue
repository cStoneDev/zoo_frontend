<template>
  <v-dialog v-model="isVisible" max-width="600px">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        Seleccionar parámetros
        <v-btn icon @click="close" class="close-button">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pb-0 pt-10">
        <v-row justify="space-around">
          <v-date-picker v-model="date" color="primary"></v-date-picker>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="close">Cerrar</v-btn>
        <v-btn color="primary" @click="seleccionar">Seleccionar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  const date = new Date();
  const isVisible = ref(false);
  const close = () => {
    isVisible.value = false;
    selectedOption.value = null;
  };

  const open = () => {
    isVisible.value = true;
  };

  const router = useRouter();

  defineExpose({
    openModal: open,
  });
</script>

<style scoped>
  .close-button {
    position: absolute;
    right: 10px;
    top: 10px;
  }
</style>
