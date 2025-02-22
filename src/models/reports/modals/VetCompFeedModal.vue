<template>
  <v-dialog v-model="isVisible" max-width="600px">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        Seleccionar parámetros
        <v-btn icon @click="close" class="close-button">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pb-5 pt-14">
        <v-row class="d-flex container align-items-center">
          <v-text-field
            v-model="startDateFormatted"
            label="Fecha de inicio"
            type="text"
            variant="solo"
            single-line
            readonly
            :error-messages="
              startDateError ? ['Formato de fecha inválido'] : []
            "
            :class="{ 'error--text': startDateError }"
          >
          </v-text-field>
          <v-menu
            v-model="startMenu"
            :close-on-content-click="false"
            transition="scale-transition"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                class="ml-3 mb-5"
                icon
                @click="startMenu = true"
                v-bind="props"
                variant="flat"
              >
                <v-icon>mdi-calendar</v-icon>
              </v-btn>
              <v-btn class="ml-3 mb-5" icon variant="flat" @click="cleanStart">
                <v-icon> mdi-delete </v-icon>
              </v-btn>
            </template>
            <v-date-picker
              color="secondary"
              title="Fecha de inicio"
              show-adjacent-months
              v-model="startDate"
              :max="maxStartDate"
              header="Elige una fecha"
              @input="updateStartDate"
            />
          </v-menu>
        </v-row>

        <v-spacer class="mt-5"></v-spacer>

        <v-row class="d-flex container align-items-center">
          <v-text-field
            v-model="endDateFormatted"
            label="Fecha de terminación"
            type="text"
            variant="solo"
            single-line
            readonly
            :error-messages="endDateError ? ['Formato de fecha inválido'] : []"
            :class="{ 'error--text': endDateError }"
          ></v-text-field>

          <v-menu
            v-model="endMenu"
            :close-on-content-click="false"
            transition="scale-transition"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                class="ml-3 mb-5"
                icon
                @click="endMenu = true"
                v-bind="props"
                variant="flat"
              >
                <v-icon>mdi-calendar</v-icon>
              </v-btn>
              <v-btn class="ml-3 mb-5" icon variant="flat" @click="cleanEnd">
                <v-icon> mdi-delete </v-icon>
              </v-btn>
            </template>
            <v-date-picker
              color="secondary"
              title="Fecha de terminación"
              show-adjacent-months
              v-model="endDate"
              :min="minEndDate"
              header="Elige una fecha"
              @input="updateEndDate"
            />
          </v-menu>
        </v-row>

        <!-- Selector para el formato del reporte -->
        <v-row class="d-flex container align-items-center">
          <v-autocomplete
            v-model="selectedFormat"
            :items="formats"
            label="Formato del reporte"
            variant="outlined"
          ></v-autocomplete>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" variant="tonal" @click="close">Cerrar</v-btn>
        <v-btn text color="primary" variant="flat" @click="validarYSeleccionar"
          >Continuar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { ref, computed } from "vue";
  import reportService from "../reportService";
  const formats = ref(["pdf", "csv", "xlsx", "html", "xml", "doc"]);
  const selectedFormat = ref("pdf");

  const isVisible = ref(false);
  const startMenu = ref(false);
  const endMenu = ref(false);
  const startDate = ref(null);
  const endDate = ref(null);
  const startDateError = ref(false);
  const endDateError = ref(false);

  const props = defineProps({
    mode: {
      type: String,
      required: true,
    },
  });

  const formatDateToYYYYMMDD = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const startDateFormatted = computed({
    get: () =>
      startDate.value ? new Date(startDate.value).toLocaleDateString() : "",
    set: (value) => {
      if (validarFecha(value)) {
        startDate.value = value;
      } else {
        startDate.value = null;
      }
    },
  });

  const endDateFormatted = computed({
    get: () =>
      endDate.value ? new Date(endDate.value).toLocaleDateString() : "",
    set: (value) => {
      if (validarFecha(value)) {
        endDate.value = value;
      } else {
        endDate.value = null;
      }
    },
  });

  const open = () => {
    isVisible.value = true;
  };

  const cleanEnd = () => {
    endDate.value = null;
    endDateFormatted.value = "";
    endDateError.value = false;
  };

  const cleanStart = () => {
    startDate.value = null;
    startDateFormatted.value = "";
    startDateError.value = false;
  };

  const close = () => {
    isVisible.value = false;
    startDate.value = null;
    endDate.value = null;
    endDateFormatted.value = "";
    startDateFormatted.value = "";
    startDateError.value = false;
    endDateError.value = false;
  };

  const updateStartDate = (value) => {
    startDate.value = value;
    startMenu.value = false;
  };

  const updateEndDate = (value) => {
    endDate.value = value;
    endMenu.value = false;
  };

  const validarYSeleccionar = async () => {
  startDateError.value = false;
  endDateError.value = false;

  // Validar formato del reporte
  if (!selectedFormat.value) {
    console.error("El formato del reporte es obligatorio.");
    return;
  }

  const formattedStartDate = startDate.value
    ? formatDateToYYYYMMDD(startDate.value)
    : null;
  const formattedEndDate = endDate.value
    ? formatDateToYYYYMMDD(endDate.value)
    : null;

  // Generar el reporte con fechas formateadas o nulas
  await handleObtainReport(props.mode, formattedStartDate, formattedEndDate);
};

  const minEndDate = computed(() => {
    if (startDate.value) {
      const date = new Date(startDate.value);
      date.setDate(date.getDate() + 1); // Añadir un día
      return date.toISOString().split("T")[0];
    }
    return null;
  });

  const maxStartDate = computed(() => {
    if (endDate.value) {
      const date = new Date(endDate.value);
      date.setDate(date.getDate() - 1); // eliminar un día
      return date.toISOString().split("T")[0];
    }
    return null;
  });

  defineExpose({
    openModal: open,
  });

  const handleObtainReport = async (
    mode,
    formattedStartDate,
    formattedEndDate
  ) => {
    try {
      const response = await reportService.obtainReportByDates(
        formattedStartDate,
        formattedEndDate,
        selectedFormat.value,
        mode
      );

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : `reporte.${selectedFormat.value}`;

      if (selectedFormat.value === "pdf" || selectedFormat.value === "html") {
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      } else {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      }
    } catch (error) {
      console.error("Error al generar el reporte:", error);
    }
  };
</script>

<style scoped>
  .close-button {
    position: absolute;
    right: 10px;
    top: 10px;
  }
</style>
