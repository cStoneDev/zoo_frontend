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
      v-model="selected"
      item-value="id"
      return-object
      select-strategy="single"
      show-select
      height="300"
      item-key="id"
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

    <div
      class="container-fluid mb-8 justify-content-start d-flex flex-wrap gap-2"
    >
      <v-btn
        v-for="button in buttons"
        :key="button.text"
        class="mx-2"
        color="primary"
        @click="handleAction(button.mode, animalDefault, button.text)"
      >
        <v-icon left>{{ button.icon }}</v-icon>
        {{ button.text }}
      </v-btn>
    </div>

    <!-- Diálogo Genérico -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span>{{ dialogTitle }}</span>
        </v-card-title>
        <v-divider class="mt-0 mb-0"></v-divider>
        <v-card-text class="pl-4 pr-4 pb-4">
          <slot
            name="dialog-content"
            :item="reactive(animalTemplate)"
            :mode="dialogMode"
          ></slot>
        </v-card-text>
        <v-divider class="mt-0 mb-2"></v-divider>
        <v-card-actions>
          <v-btn
            color="error"
            variant="tonal"
            @click="dialog = false"
            v-if="dialogMode !== 'view'"
            >Cancelar</v-btn
          >
          <v-btn
            text
            color="red"
            variant="flat"
            @click="onSave"
            v-if="dialogMode === 'delete'"
            >Eliminar</v-btn
          >
          <v-btn text color="primary" variant="flat" @click="onSave" v-else
            >Continuar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
  import { reactive, ref } from "vue";
  import { toRaw } from "vue";
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
    animalDefault: {
      type: Object,
      required: true,
    },
  });

  const search = ref("");
  const selected = ref([]);
  const dialog = ref(false);
  const dialogMode = ref("");
  const dialogTitle = ref("");
  let animalTemplate = ref(null); //main selected object, keep an eye on it
  let rawSelected = null; //raw item selected from checkbox

  // Emitimos eventos al componente padre si es necesario
  const emit = defineEmits(["update"]);

  // Maneja la acción de cada botón
  function handleAction(mode, animalDefault, text) {
    dialogMode.value = mode;
    animalTemplate = { ...animalDefault };
    dialogTitle.value = text;
    if (selected != false) {
      rawSelected = selected.value.map((item) => toRaw(item))[0];
      animalTemplate = { ...rawSelected };
    }

    if (rawSelected == null) {
      if (dialogMode.value === "add") {
        animalTemplate = { ...animalDefault };
        dialog.value = true;
      } else {
        dialog.value = false;
      }
    } else {
      dialog.value = true;
      if (dialogMode.value === "add") {
        animalTemplate = { ...animalDefault };
        rawSelected = null;
      }
    }
  }

  // When continue button is pressed
  function onSave() {
    emit("update", { mode: dialogMode.value, item: animalTemplate });
    dialog.value = false;
  }
</script>

<style scoped>
  /* Estilos personalizados si es necesario */
</style>
