import axios from "../../plugins/axios";

// GET SPECIES
const getSpecies = async (pageNumber = 0, pageSize = 10) => {
  try {
    const response = await axios.get("http://localhost:8080/species", {
      params: {
        pageNumber,
        pageSize,
      },
    });

    const {
      totalPages,
      totalElements,
      content,
      number, // Página actual
    } = response.data;

    console.log("Especies recibidas:", content);

    return {
      species: content,
      pagination: {
        totalElements,
        totalPages,
        currentPage: number,
        pageSize,
      },
    };
  } catch (error) {
    console.error("Error al obtener las especies:", error);
    throw error;
  }
};

// GET SPECIE BY ID
const getSpeciesById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/species/${id}`);

    const name = response.data;

    console.log("Especie recibida:", name);

    return name;
  } catch (error) {
    console.error(`Error al obtener la especie con ID ${id}:`, error);
    throw error;
  }
};

// POST SEARCH SPECIES
const searchSpecies = async (
  searchField = "",
  pageNumber = 0,
  itemsPerPage = 10
) => {
  try {
    const requestBody = {
      searchField,
      pageNumber,
      itemsPerPage,
    };
    const response = await axios.post(
      "http://localhost:8080/species/search",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const {
      totalPages,
      totalElements,
      content,
      number, // Página actual
    } = response.data;

    console.log("Especies encontradas:", content);

    return {
      species: content,
      pagination: {
        totalElements,
        totalPages,
        currentPage: number,
        itemsPerPage,
      },
    };
  } catch (error) {
    console.error("Error al buscar especies:", error);
    throw error;
  }
};

//POST CREATE SPECIE
const createSpecies = async (speciesData) => {
  try {
    // Realizamos la petición POST para crear la especie
    const response = await axios.post(
      "http://localhost:8080/species",
      speciesData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { id, name } = response.data;

    console.log("Especie creada:", response.data);

    return { id, name };
  } catch (error) {
    console.error("Error al crear la especie:", error);
    throw error;
  }
};

// PUT UPDATE SPECIES
const updateSpecies = async (id, speciesData) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/species/${id}`,
      speciesData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { id: updatedId, name } = response.data;

    console.log("Especie actualizada:", response.data);

    return { id: updatedId, name };
  } catch (error) {
    console.error("Error al actualizar la especie:", error);
    throw error;
  }
};

// DELETE SPECIES
const deleteSpecies = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/species/${id}`);

    console.log(`Especie con ID ${id} eliminada exitosamente.`);

    return response.data;
  } catch (error) {
    console.error(`Error al eliminar la especie con ID ${id}:`, error);
    throw error;
  }
};

// Exportar todas las funciones
export default {
  getSpecies,
  getSpeciesById,
  createSpecies,
  updateSpecies,
  deleteSpecies,
  searchSpecies,
};
