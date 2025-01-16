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
        <!-- Selector para el formato del reporte -->
        <v-row class="d-flex container align-items-center">
          <v-autocomplete
            v-model="selectedFormat"
            :items="formats"
            label="Formato del reporte"
            variant="outlined"
            :rules="[v => !!v || 'Debe seleccionar un formato']"
          ></v-autocomplete>
        </v-row>
        <!-- Selector para la provincia -->
        <v-row class="d-flex container align-items-center">
          <v-autocomplete
            v-model="selectedProvince"
            :items="provincesData"
            label="Provincia"
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
import { ref } from "vue";
import reportService from "../reportService";
import provinciaService from "../../Nomenclators/provincia/provinciaService";
import { useUtilDataStore } from '/src/stores/utilData.js' //store de pinia para datos de la tabla que cambian como el paginado (para que sean de acceso global)
const utilDataStore = useUtilDataStore();         //el store

// Formatos disponibles
const formats = ref(["pdf", "csv", "xlsx", "html", "xml", "doc"]);
// Variables reactivas
const selectedFormat = ref("");
const provincesData = ref([]);
const selectedProvince = ref("");

const isVisible = ref(false);

// Abrir modal y cargar provincias
const open = async () => {
  isVisible.value = true;
  await loadProvinces();
};

// Cerrar modal
const close = () => {
  isVisible.value = false;
};

// Cargar provincias desde el servicio
const loadProvinces = async () => {
  try {
                                                                      //se le pasa la pagina - 1, y los items por paginas
    const { provinces, pagination } = await provinciaService.getProvinces(utilDataStore.page - 1, utilDataStore.itemsPerPage + 100); 
    
    const { totalElements, totalPages, currentPage, pageSize } = pagination; //para obtener los datos de la paginacion

    
            
    provincesData.value = provinces.map(province => province.name); //aqui coges los datos que pediste


  } catch (error) {
    console.error('Error al cargar las Provincias:', error);
  }
};

// Validar campos y obtener reporte
const validarYSeleccionar = () => {
  if (!selectedFormat.value) {
    alert("Debe seleccionar un formato");
    return;
  }

  // Obtener el reporte
  handleObtainReport(selectedFormat.value, selectedProvince.value || null);
};
// Obtener reporte
const handleObtainReport = async (format, province) => {
  try {
    // Llamada al servicio para obtener el reporte
    const response = await reportService.obtainActiveVetReport(format, province);

    // Crear un Blob a partir de los datos recibidos
    const blob = new Blob([response.data], { type: response.headers["content-type"] });

    // Extraer el nombre del archivo desde Content-Disposition
    const contentDisposition = response.headers["content-disposition"];
    const filename = contentDisposition
      ? contentDisposition.split("filename=")[1].replace(/"/g, "")
      : `reporte-veterinarios-activos.${format}`;

    if (format === "pdf" || format === "html") {
      // Visualizar directamente en el navegador
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } else {
      // Forzar la descarga del archivo
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    }

    console.log("Reporte generado exitosamente");
  } catch (error) {
    console.error("Error al generar el reporte:", error);
    alert("Hubo un error al generar el reporte. Inténtelo nuevamente.");
  }
};

// Exponer método para abrir el modal
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