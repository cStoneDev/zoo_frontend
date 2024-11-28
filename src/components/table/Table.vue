<template>
  <v-card class="container justify-content-center mt-5 mb-5">
    <v-card-title>
      <span class="headline">{{ title }}</span>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        label="Buscar"
        append-icon="mdi-magnify"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <!-- Tabla de Datos -->
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :hover="true"
      select-strategy="single"
      show-select
      height="300"
      item-key="id"
      @click:row="selectItem"
    >
      <template v-slot:no-data>
        <v-alert>No hay datos disponibles.</v-alert>
      </template>
      <template
        v-slot:item.data-table-select="{
          internalItem,
          isSelected,
          toggleSelect,
        }"
      >
        <v-checkbox-btn
          :model-value="isSelected(internalItem)"
          color="primary"
          @update:model-value="toggleSelect(internalItem)"
        ></v-checkbox-btn>
      </template>
    </v-data-table>

    <div class="container-fluid mb-8 justify-content-start">
      <v-btn
        v-for="button in buttons"
        :key="button.text"
        class="mx-2"
        color="primary"
        @click="handleAction(button.mode)"
      >
        <v-icon left>{{ button.icon }}</v-icon>
        {{ button.text }}
      </v-btn>
    </div>

    <!-- Diálogo Genérico -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title>
          <span class="headline">{{ dialogTitle }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <slot
            name="dialog-content"
            :item="selectedItem"
            :mode="dialogMode"
          ></slot>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text @click="dialog = false">Cancelar</v-btn>
          <v-btn text color="surface-variant" variant="flat" @click="onSave">Continuar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
  import { ref } from "vue";
  import { defineProps, defineEmits } from "vue";

  defineProps({
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    buttons: {
      type: Array,
      required: true,
    },
  });

  const search = ref("");
  const selectedItem = ref(null);
  const dialog = ref(false);
  const dialogMode = ref("");
  const dialogTitle = ref("");

  // Emitimos eventos al componente padre si es necesario
  const emit = defineEmits(["update"]);

  // Selecciona un ítem de la tabla
  function selectItem(item) {
    selectedItem.value = item;
  }

  // Maneja la acción de cada botón
  function handleAction(mode) {
    dialogMode.value = mode;
    dialogTitle.value = mode.charAt(0).toUpperCase() + mode.slice(1);
    dialog.value = true;
  }

  // Lógica cuando se guarda algo en el diálogo
  function onSave() {
    emit("update", { mode: dialogMode.value, item: selectedItem.value });
    dialog.value = false;
  }
</script>

<style scoped>
  /* Estilos personalizados si es necesario */
</style>
