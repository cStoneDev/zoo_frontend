<template>
  <v-dialog v-model="isVisible" max-width="600px">
    <v-card>
      <v-card-title class="headline">
        Seleccionar parámetros
        <v-btn icon @click="close" class="close-button">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
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

  const seleccionar = () => {
    if (selectedOption.value) {
      switch (selectedOption.value) {
        case 1:
          router.push("/clinica");
          break;
        case 2:
          router.push("/especialidad");
          break;
        case 3:
          router.push("/especie");
          break;
        case 4:
          router.push("/provincia");
          break;
        case 5:
          router.push("/raza");
          break;
        case 6:
          router.push("/tipoproveedor");
          break;
        case 7:
          router.push("/tiposervicio");
          break;
        default:
          // Manejar caso donde no hay coincidencia
          console.error("Opción no válida");
      }
      close(); // Cierra el modal después de la navegación
    }
  };

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
