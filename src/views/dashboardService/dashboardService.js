import axios from "../../plugins/axios";

//GET ANIMALS
const getTopSpecies = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/dashboard/topSpecies"
    );

    const data = response.data;

    const species = Object.entries(data).map(([species, count]) => ({
      species,
      count,
    }));

    console.log("Especies y conteos:", species);

    return species;
  } catch (error) {
    console.error("Error al obtener las especies:", error);
    throw error;
  }
};

// GET MONTHLY VALUES
const getMonthEntries = async (year) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/dashboard/monthEntries",
      {
        params: { year },
      }
    );

    // Obtenemos los datos de la respuesta
    const data = response.data;

    const monthlyValues = Object.entries(data).map(([month, value]) => ({
      month,
      value,
    }));

    console.log(`Valores mensuales para el año ${year}:`, monthlyValues);

    return monthlyValues;
  } catch (error) {
    console.error("Error al obtener los valores mensuales:", error);
    throw error;
  }
};

export default{
    getMonthEntries,
    getTopSpecies,
}
