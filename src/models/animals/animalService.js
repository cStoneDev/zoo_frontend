import axios from '../../plugins/axios';

//GET ANIMALS
const getAnimals = async (pageNumber = 0, pageSize = 10, sort = 'name,asc', filters = {}) => {
  try {
    const response = await axios.get('http://localhost:8080/animals', {
      params: {
        pageNumber,
        pageSize,
        sort,
        ...filters,
      },
    });

    // Desestructuramos la respuesta para obtener los datos paginados
    const { content, totalElements, totalPages, number } = response.data;

    console.log('Animales recibidos:', content);

    return {
      animals: content, // Lista de animales
      pagination: {
        totalElements,     // Total de elementos (animales)
        totalPages,        // Total de páginas
        currentPage: number, // Página actual
        pageSize,          // Tamaño de la página
      },
    };
  } catch (error) {
    console.error('Error al obtener la lista de animales:', error);
    throw error;
  }
};

//GET ANIMALS BY ID
const getAnimalById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/animals/${id}`);

    const {
      id: animalId,
      name,
      age,
      weight,
      breedName,
      speciesName,
      speciesId,
      breedId,
      entryDate,
    } = response.data;

    console.log('Animal recibido:', response.data);

    return {
      id: animalId,
      name,
      age,
      weight,
      breedName,
      speciesName,
      speciesId,
      breedId,
      entryDate,
    };
  } catch (error) {
    console.error(`Error al obtener el animal con ID ${id}:`, error);
    throw error;
  }
};

//POST SEARCH ANIMALS
const searchAnimals = async (searchCriteria) => {
  try {
    const response = await axios.post('http://localhost:8080/animals/search', searchCriteria, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Desestructuramos la respuesta para obtener los datos paginados
    const {
      totalElements,
      totalPages,
      size,
      content,
      number,
      sort,
      first,
      last,
      numberOfElements,
      pageable,
      empty,
    } = response.data;

    console.log('Resultados de la búsqueda:', content);

    return {
      animals: content, // Lista de animales filtrados
      pagination: {
        totalElements,      // Total de elementos encontrados
        totalPages,         // Total de páginas
        currentPage: number, // Página actual
        pageSize: size,     // Tamaño de la página
        sort,               // Información del ordenamiento
        first,              // Indica si es la primera página
        last,               // Indica si es la última página
        numberOfElements,   // Número de elementos en la página actual
        pageable,           // Información adicional sobre la paginación
        empty,              // Indica si los resultados están vacíos
      },
    };
  } catch (error) {
    console.error('Error al buscar animales con filtros:', error);
    throw error;
  }
};

//POST CREATE ANIMAL
const createAnimal = async (animalData) => {
  try {
    const response = await axios.post('http://localhost:8080/animals', animalData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const {
      id,
      name,
      age,
      weight,
      breedName,
      specieName,
      specieId,
      breedId,
      entryDate,
    } = response.data;

    console.log('Animal creado:', response.data);

    return {
      id,
      name,
      age,
      weight,
      breedName,
      specieName,
      specieId,
      breedId,
      entryDate,
    };
  } catch (error) {
    console.error('Error al crear un nuevo animal:', error);
    throw error;
  }
};

//PUT UPTADE ANIMAL
const updateAnimal = async (id, animalData) => {
  try {
    const response = await axios.put(`http://localhost:8080/animals/${id}`, animalData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Desestructuramos la respuesta para obtener los datos del animal actualizado
    const {
      id: animalId,
      name,
      age,
      weight,
      breedName,
      speciesName,
      speciesId,
      breedId,
      entryDate,
    } = response.data;

    console.log('Animal actualizado:', response.data);

    return {
      id: animalId,
      name,
      age,
      weight,
      breedName,
      speciesName,
      speciesId,
      breedId,
      entryDate,
    };
  } catch (error) {
    console.error(`Error al actualizar el animal con ID ${id}:`, error);
    throw error;
  }
};

//DELETE ANIMAL
const deleteAnimal = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/animals/${id}`);

    console.log(`Animal con ID ${id} eliminado exitosamente.`);
    return response.data; // Si el servidor devuelve algún mensaje de confirmación
  } catch (error) {
    console.error(`Error al eliminar el animal con ID ${id}:`, error);
    throw error;
  }
};

// Exportar todas las funciones
export default {
  getAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  searchAnimals
};
