<template>
  <v-dialog v-model="isVisible" max-width="600px">
    <v-card>
      <v-card-title class="headline">
        Seleccionar nomenclador
        <v-btn icon @click="close" class="close-button" style="font-size: 15px;" >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-select
          v-model="selectedOption"
          :items="options"
          item-value="key"
          item-title="value"
          label="Selecciona una opción"
          required
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>"
        <v-btn color="error" variant="tonal" @click="close">Cerrar</v-btn>
        <v-btn text color="primary" variant="flat" @click="seleccionar">Continuar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isVisible = ref(false);
const selectedOption = ref(null); // Valor seleccionado del select
const options = ref([
  { key: 1, value: 'Clinica' },
  { key: 2, value: 'Especialidad' },
  { key: 3, value: 'Especie' },
  { key: 4, value: 'Provincia' },
  { key: 5, value: 'Raza' },
  { key: 6, value: 'Tipo de proveedor' },
  { key: 7, value: 'Tipo de servicio' }
]);

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
        router.push('/clinica');
        break;
      case 2:
        router.push('/especialidad');
        break;
      case 3:
        router.push('/especie');
        break;
      case 4:
        router.push('/provincia');
        break;
      case 5:
        router.push('/raza');
        break;
      case 6:
        router.push('/tipoproveedor');
        break;
      case 7:
        router.push('/tiposervicio');
        break;
      default:
        // Manejar caso donde no hay coincidencia
        console.error('Opción no válida');
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