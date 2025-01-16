import axios from "../../plugins/axios";

const obtainActiveVetReport = async (fileType, provinceName) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/reports/report/active-veterinarians",
      { fileType, provinceName },
      {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob", // Configuración para recibir archivos binarios
      }
    );

    return response; // Retorna toda la respuesta
  } catch (error) {
    console.error(
      "Error al obtener el reporte:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const obtainReportByDates = async (
  fecha_inicio,
  fecha_terminacion,
  fileType,
  mode
) => {
  try {
    // Definir el endpoint según el modo
    let endpoint;
    switch (mode) {
      case "vet":
        endpoint =
          "http://localhost:8080/reports/report/veterinarian-contracts";
        break;
      case "feeder":
        endpoint = "http://localhost:8080/reports/report/food-contracts";
        break;
      case "complementary":
        endpoint =
          "http://localhost:8080/reports/report/complementary-contracts";
        break;
      default:
        throw new Error("Modo inválido");
    }

    // Realizar la solicitud al endpoint correspondiente
    return await axios.post(
      endpoint,
      { fileType, fecha_inicio, fecha_terminacion },
      {
        headers: { "Content-Type": "application/json" },
        responseType: "blob",
      }
    );
  } catch (error) {
    console.error("Error al obtener el reporte:", error);
    throw error;
  }
};

export default {
  obtainActiveVetReport,
  obtainReportByDates,
};
