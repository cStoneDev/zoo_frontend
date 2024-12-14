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

    <!-- Filtros dinámicos -->
    <div v-if="filters" class="filters-container mb-4">
    <v-row>
      <v-col
        v-for="(filterData, filterName) in filters" :key="filterName" cols="12" sm="6" md="4">
        <component
          v-if="filterName.includes('fecha')"
          is="v-text-field"
          v-model="activeFilters[filterName]"
          :label="filterData.label"
          type="date"
          outlined
          dense
        ></component>
        
        <component
          v-else-if="filterName === 'hora'"
          is="v-text-field"
          v-model="activeFilters[filterName]"
          :label="filterData.label"
          type="time"
          outlined
          dense
        ></component>

        <component
          v-else
          is="v-select"
          v-model="activeFilters[filterName]"
          :label="filterData.label"
          :items="['No', ...filterData.lista]"
          outlined
          dense
        ></component>
      </v-col>
    </v-row>
  </div>
    
    <!-- Tabla de Datos -->
    <v-data-table
      :headers="headers"
      :items="filteredItems"
      :search="search"
      :hover="true"
      v-model="selected"
      item-value="id"
      return-object
      select-strategy="single"
      show-select
      height="360"
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

      <template v-slot:footer.prepend>
        <div id="CRUD-buttons-container" class="row">
          <v-btn
            v-for="button in buttons"
            :key="button.text"
            class="col-2 col-sm-6 col-md-4 col-lg-4 col-xl-2 col-xxl-2 mr-2 ml-4 mb-2"
            color="primary"
            @click="handleAction(button.mode, animalDefault, button.text)"
          >
            <v-icon left>{{ button.icon }}</v-icon>
            {{ button.text }}
          </v-btn>
        </div>
      </template>
    </v-data-table>

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
  import { reactive, ref, computed } from "vue";
  import { toRaw } from "vue";
  import { defineProps, defineEmits } from "vue";


  const props = defineProps({
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
    filters: {
      type: Object,
      required: false,
    },
  });

  const search = ref("");
  const selected = ref([]);
  const dialog = ref(false);
  const dialogMode = ref("");
  const dialogTitle = ref("");
  let animalTemplate = ref(null);
  let rawSelected = null;

  // Estado reactivo para los filtros activos
  const activeFilters = reactive(
  Object.keys(props.filters || {}).reduce((acc, key) => {
    acc[key] = "No"; // Inicializa todos los filtros como "No"
    return acc;
  }, {})
);

// Computed para filtrar los items según los filtros activos
const filteredItems = computed(() => {
  return props.items.filter((item) => {
    return Object.entries(activeFilters).every(([key, value]) => {
      if (value === "No") return true; // No filtra si está en "No"
      if (value === "") return true; // No filtra si está en "" el date o la hora (backspace para borrar lo que hay en el campo de hora)
      return item[key]?.toString() === value.toString();
    });
  });
});



const getComponent = (filterName) => {
  if (filterName === 'fecha') return VDatePicker;
  if (filterName === 'hora') return VTimePicker;
  return VSelect; // Default to v-select for other filters
};

  const emit = defineEmits(["update"]);

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

  function onSave() {
    emit("update", { mode: dialogMode.value, item: animalTemplate });
    dialog.value = false;
  }
</script>

<style scoped>

.filters-container {
  padding: 2%;
}

#CRUD-buttons-container {
  margin-right: 2%;
  width: 100%;
}

@media (min-width: 768px) {
  #CRUD-buttons-container {
    width: 50%;
  }
}


</style>
